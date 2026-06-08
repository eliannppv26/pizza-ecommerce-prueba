'use strict'

/**
 * order controller
 *
 * Crea una sesión de Stripe Checkout a partir de los productos del carrito
 * y guarda la orden en Strapi. Devuelve { stripeSession } al frontend.
 *
 * Requiere en backend-ecommerce/.env:
 *   STRIPE_KEY=sk_test_...        (clave SECRETA de Stripe)
 *   CLIENT_URL=http://localhost:3000   (URL del frontend Next.js)
 */

const { createCoreController } = require('@strapi/strapi').factories

const stripe = require('stripe')(process.env.STRIPE_KEY)

// Construye un nombre descriptivo para la línea de Stripe (incluye tamaño,
// masa, extras y "sin" si es una pizza personalizada).
function describeItem(item) {
  const name = item?.name || 'Producto'
  const parts = []
  if (item?.sizeLabel) parts.push(item.sizeLabel)
  if (item?.crustLabel) parts.push(item.crustLabel)
  if (Array.isArray(item?.extras) && item.extras.length) {
    parts.push('Extra: ' + item.extras.map((e) => e.name).join(', '))
  }
  if (Array.isArray(item?.removed) && item.removed.length) {
    parts.push('Sin: ' + item.removed.join(', '))
  }
  return parts.length ? `${name} (${parts.join(' · ')})` : name
}

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body

    if (!Array.isArray(products) || products.length === 0) {
      return ctx.badRequest('El carrito está vacío.')
    }

    try {
      const line_items = products.map((item) => ({
        price_data: {
          currency: 'mxn',
          product_data: {
            name: describeItem(item),
          },
          // Stripe usa la unidad mínima (centavos): $120.00 -> 12000
          unit_amount: Math.round(Number(item.unitPrice || 0) * 100),
        },
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      }))

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items,
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cart`,
      })

      // Guardamos la orden (publicada para que aparezca en el admin)
      await strapi.documents('api::order.order').create({
        data: {
          stripeid: session.id,
          products,
        },
        status: 'published',
      })

      return { stripeSession: session }
    } catch (err) {
      strapi.log.error('[order.create] Stripe error: ' + err.message)
      ctx.response.status = 500
      return { error: { message: err.message } }
    }
  },
}))
