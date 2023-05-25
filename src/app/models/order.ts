import {ShoppingCart} from "./shoppingcart";


export class Order {
    orderDetails: ShoppingCart[] = [];
    cartTotal: number = 0;
    orderId: string = '';
    orderDate: Date = new Date();
}
