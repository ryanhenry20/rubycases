
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    
    constructor(public items: ShoppingCartItem[]) {}

    get totalItemCount() {
       let count = 0;
        // tslint:disable-next-line:forin
        // tslint:disable-next-line:curly
        for (let productId in this.items)
          count += this.items[productId].quantity;
        return count;

    }

}