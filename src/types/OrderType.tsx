import ProductType from "./ProductType";

interface OrderType {
    id : number,
    orderDateTime : Date,
    totalPrice : number,
    orderedProducts : ProductType[]
}

export default OrderType