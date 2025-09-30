import { Product } from "./product-types";

export interface IAddToCartType {
  // userId: string;
  productId: string;
  quantity: number;
}

export interface AddToCartResponseType {
  message: string;
}

export interface CartItem {
  _id: string;
  productId: Product;
  quantity: number;
}

// Response
export interface GetCartItemsResponse {
  message: string;
  cartItems: CartItem[];
}
