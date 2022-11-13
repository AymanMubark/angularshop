import { CartItem } from "./cartItem"

export interface orderAdd {
    userName?: string
    phone?: string
    email?: string
    apartment?: string
    firstName?: string
    lastName?: string
    total?: number
    tax?: number
    region?: string
    city?: string
    details?: string
    zipCode?: string
    note?: string
    orderDetails?: CartItem[]
  }