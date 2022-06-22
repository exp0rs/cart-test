"use strict";
class Cart {
    constructor() {
        this._products = [];
        this._totalCost = 0;
    }
    isProductArray(product) {
        return Array.isArray(product);
    }
    addProduct(product) {
        if (this.isProductArray(product)) {
            const newArrayProducts = [
                ...this._products,
                ...product
            ];
            this._products = newArrayProducts;
        }
        else {
            this._products.push(product);
        }
    }
    setDelivery(option) {
        if (typeof option.to !== 'number') {
            this._delivery = option;
        }
        else {
            this._delivery = {
                date: new Date(),
                to: option.to
            };
        }
    }
    calcTotalCost(products) {
        const totalCost = products.reduce((prev, cur) => {
            return prev + cur.price;
        }, 0);
        return this._totalCost = totalCost;
    }
    get deliveryInfo() {
        this.calcTotalCost(this._products);
        let cartInfo = {
            products: this._products,
            delivery: this._delivery,
            totalCost: this._totalCost
        };
        return cartInfo;
    }
}
let cart = new Cart();
cart.addProduct([{ id: 1, title: 'book', price: 100 }, { id: 2, title: 'lamp', price: 50 }]);
cart.addProduct([{ id: 3, title: 'cheese', price: 50 }, { id: 4, title: 'apple', price: 33 }, { id: 5, title: 'cat', price: 100 }]);
cart.addProduct([{ id: 332, title: 'UFO', price: 13 }]);
cart.setDelivery({ date: new Date(), to: { city: 'Moscow', street: 'Krasnoarmeyskaya', house: 5 } });
console.log(cart.deliveryInfo);
