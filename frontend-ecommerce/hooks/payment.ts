import axios from "axios"

// Cliente HTTP hacia el backend de Strapi. El endpoint /api/orders es público
// (no requiere token), así que no enviamos cabecera de autorización.
export const makePaymentRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})
