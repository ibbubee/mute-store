export type ProductSize = {
  size: string;
  stock: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  storeType: "gents" | "kids";
  brand?: string;
  style?: string;
  description: string;
  sizes: ProductSize[];
  images: string[];
  featured: boolean;
  trending: boolean;
  newArrival: boolean;
  limitedStock?: boolean;
  tags?: string[];
  material?: string;
  fitType?: string;
  whatsappClicks?: number;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'cod' | 'upi';

export type Order = {
  id: string;
  items: CartItem[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      pincode: string;
    };
  };
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type Coupon = {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  maxDiscount?: number;
  active: boolean;
};

export type Category = {
  id: string;
  name: string;
  label: string;
  slug: string;
  desc?: string;
  image?: string;
  storeType: "gents" | "kids" | "gents_hero" | "kids_hero";
};

export type FilterState = {
  category: string;
  sizes: string[];
  minPrice: number;
  maxPrice: number;
  style: string;
  availability: 'all' | 'instock';
  sort: 'newest' | 'trending' | 'price-asc' | 'price-desc';
};
