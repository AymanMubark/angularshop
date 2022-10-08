import { OrderDetail } from "./OrderDetail"

export interface Order {
    id: string
    orderId: string
    createdDate: string
    status: string
    phone: string
    email: string
    firstName: string
    lastName: string
    total: number
    tax: number
    region: string
    city: string
    details: string
    zipCode: string
    note: string
    orderDetails: OrderDetail[]
}