export interface Category {
  _id: string;
  name: string;
  // add more fields as per your category model
}

export interface Review {
  userId: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Variant {
  type: string; // e.g., "color", "size"
  value: string;
}

export interface Product {
  _id: string;
  sellerId: string;
  title: string;
  description: string;
  originalPrice: number;
  offerPrice: number;
  categoryId: Category; // Replace with appropriate type
  brand: string;
  images: string[]; // assuming it's an array of image URLs
  stock: number;
  rating: number;
  reviews: Review[]; // Define `Review` type if needed
  tags: string[];
  sku: string;
  variants: Variant[]; // Define `Variant` type if needed
  isFeatured: boolean;
  sold: number;
  deliveryInfo: string;
  returnPolicy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  quantity?: number;
}

export interface ProductsApiResponseType {
  message: string;
  products: Product[];
}
