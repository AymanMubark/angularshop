import { Product } from "./product";


export interface OrderDetail {
    id: string;
    productId: string;
    product: Product;
    price: number;
    quantity: number;
    sku: string;
}
