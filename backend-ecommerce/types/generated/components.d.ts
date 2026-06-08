import type { Schema, Struct } from '@strapi/strapi';

export interface PizzaCustomization extends Struct.ComponentSchema {
  collectionName: 'components_pizza_customizations';
  info: {
    displayName: 'customization';
    icon: 'handHeart';
  };
  attributes: {
    allow_extra: Schema.Attribute.Boolean;
    allow_remove: Schema.Attribute.Boolean;
  };
}

export interface PizzaPizzaCrustOptions extends Struct.ComponentSchema {
  collectionName: 'components_pizza_pizza_crust_options';
  info: {
    displayName: 'crust-options';
    icon: 'expand';
  };
  attributes: {
    crust_type: Schema.Attribute.Enumeration<
      ['thin', 'thick', 'stuffed', 'gluten_free']
    >;
    extra_price: Schema.Attribute.Decimal;
    sauce_type: Schema.Attribute.Enumeration<
      ['tomato', 'white', 'bbq', 'pesto']
    >;
  };
}

export interface PizzaSizePrice extends Struct.ComponentSchema {
  collectionName: 'components_pizza_size_prices';
  info: {
    displayName: 'size-price';
    icon: 'priceTag';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    size: Schema.Attribute.Enumeration<['small', 'medium', 'large']>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'pizza.customization': PizzaCustomization;
      'pizza.pizza-crust-options': PizzaPizzaCrustOptions;
      'pizza.size-price': PizzaSizePrice;
    }
  }
}
