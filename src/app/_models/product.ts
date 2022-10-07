import { Category } from "./category"
import { ProductChoice } from "./productChoice"
import { ProductImage } from "./productImage"
import { ProductInformation } from "./productInformation"

export interface Product {
    id: string
    name: string
    description: string
    fullDescription: string
    sku: string
    price: number
    oldPrice: number
    category: Category
    productImages: ProductImage[]
    productChoices: ProductChoice[]
    productInformations: ProductInformation[]
  }