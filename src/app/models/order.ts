import {ShoppingCart} from "./shoppingcart";


export class Order {
    orderDetails: any[] = [];
    cartTotal: number = 0;
    orderId: string = '';
    orderDate: Date = new Date();
}
