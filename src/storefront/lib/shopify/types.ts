export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
  startCursor: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export enum UnitPriceMeasurementMeasuredType {
  AREA = "AREA",
  LENGTH = "LENGTH",
  VOLUME = "VOLUME",
  WEIGHT = "WEIGHT",
}

export enum UnitPriceMeasurementMeasuredUnit {
  CL = "CL",
  CM = "CM",
  G = "G",
  KG = "KG",
  L = "L",
  M = "M",
  M2 = "M2",
  M3 = "M3",
  MG = "MG",
  ML = "ML",
  MM = "MM",
}

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
  unitPrice?: Money;
  unitPriceMeasurement?: {
    measuredType: UnitPriceMeasurementMeasuredType;
    quantityUnit: UnitPriceMeasurementMeasuredUnit;
    quantityValue: number;
    referenceUnit: UnitPriceMeasurementMeasuredUnit;
    referenceValue: number;
  };
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  totalInventory: number;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  vendor: string;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage?: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductAvailabilityOperation = {
  data: { product: Pick<ShopifyProduct, "availableForSale" | "variants" | "totalInventory" | "priceRange"> };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: { id: string }[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    first?: number;
  };
};

export type ShopifyProductSearchOperation = {
  data: {
    search: Connection<ShopifyProduct> & {
      pageInfo: PageInfo
      totalCount: number
    };
  };
  variables: {
    query: string;
    first: number;
    reverse?: boolean;
    sortKey: string;
    types?: string[];
    after?: string;
    before?: string;
  };
};

export interface ShopifyWebhookOrder {
  id: number;
  admin_graphql_api_id: string;
  app_id: number;
  browser_ip: string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number;
  checkout_token: string;
  client_details: {
    accept_language: null | string;
    browser_height: null | number;
    browser_ip: string;
    browser_width: null | number;
    session_hash: null | string;
    user_agent: string;
  };
  closed_at: null | string;
  confirmation_number: string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_subtotal_price: string;
  current_subtotal_price_set: ShopifyWebhookPriceSet;
  current_total_additional_fees_set: null | object;
  current_total_discounts: string;
  current_total_discounts_set: ShopifyWebhookPriceSet;
  current_total_duties_set: null | object;
  current_total_price: string;
  current_total_price_set: ShopifyWebhookPriceSet;
  current_total_tax: string;
  current_total_tax_set: ShopifyWebhookPriceSet;
  customer_locale: string;
  device_id: null | number;
  discount_codes: any[];
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  landing_site: null | string;
  landing_site_ref: null | string;
  location_id: null | number;
  merchant_of_record_app_id: null | number;
  name: string;
  note: null | string;
  note_attributes: { name: string, value: string }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | object;
  original_total_duties_set: null | object;
  payment_gateway_names: string[];
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: string;
  referring_site: null | string;
  source_identifier: string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: ShopifyWebhookPriceSet;
  tags: string;
  tax_exempt: boolean;
  tax_lines: ShopifyWebhookTaxLine[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_discounts: string;
  total_discounts_set: ShopifyWebhookPriceSet;
  total_line_items_price: string;
  total_line_items_price_set: ShopifyWebhookPriceSet;
  total_outstanding: string;
  total_price: string;
  total_price_set: ShopifyWebhookPriceSet;
  total_shipping_price_set: ShopifyWebhookPriceSet;
  total_tax: string;
  total_tax_set: ShopifyWebhookPriceSet;
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number;
  billing_address: ShopifyWebhookAddress;
  customer: ShopifyWebhookCustomer;
  discount_applications: any[];
  fulfillments: any[];
  line_items: ShopifyWebhookLineItem[];
  payment_terms: null | object;
  refunds: any[];
  shipping_address: ShopifyWebhookAddress;
  shipping_lines: any[];
}

interface ShopifyWebhookPriceSet {
  shop_money: ShopifyWebhookMoney;
  presentment_money: ShopifyWebhookMoney;
}

interface ShopifyWebhookMoney {
  amount: Money;
  currency_code: string;
}

interface ShopifyWebhookTaxLine {
  price: string;
  rate: number;
  title: string;
  price_set: ShopifyWebhookPriceSet[];
  channel_liable: boolean;
}

interface ShopifyWebhookAddress {
  first_name: string;
  address1: string;
  phone: string;
  city: string;
  zip: string;
  province: null | string;
  country: string;
  last_name: string;
  address2: null | string;
  company: string;
  latitude: null | number;
  longitude: null | number;
  name: string;
  country_code: string;
  province_code: null | string;
}

interface ShopifyWebhookCustomer {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  state: string;
  note: null | string;
  verified_email: boolean;
  multipass_identifier: null | string;
  tax_exempt: boolean;
  phone: null | string;
  email_marketing_consent: {
    state: string;
    opt_in_level: string;
    consent_updated_at: string;
  };
  sms_marketing_consent: null | object;
  tags: string;
  currency: string;
  tax_exemptions: any[];
  admin_graphql_api_id: string;
  default_address: ShopifyWebhookAddress;
}

export interface ShopifyWebhookLineItem {
  id: number;
  admin_graphql_api_id: string;
  current_quantity: number;
  fulfillable_quantity: number;
  fulfillment_service: string;
  fulfillment_status: null | string;
  gift_card: boolean;
  grams: number;
  name: string;
  price: string;
  price_set: ShopifyWebhookPriceSet[];
  product_exists: boolean;
  product_id: number;
  properties: any[];
  quantity: number;
  requires_shipping: boolean;
  sku: string;
  taxable: boolean;
  title: string;
  total_discount: string;
  total_discount_set: ShopifyWebhookPriceSet[];
  variant_id: number;
  variant_inventory_management: string;
  variant_title: null | string;
  vendor: string;
  tax_lines: ShopifyWebhookTaxLine[];
  duties: any[];
  discount_allocations: any[];
}