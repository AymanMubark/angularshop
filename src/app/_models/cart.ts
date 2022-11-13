import { CartItem } from "./cartItem";

export interface Cart {
  userName: string;
  totalPrice: number;
  items: CartItem[];
  }