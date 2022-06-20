interface IProduct {
	id?: number
	title: string
	price: number
}

interface IDeliveryToShop {
	to: number
}

interface IAddress {
	city: string
	street: string
	house: number
}

interface IDeliveryToHome {
	date: Date
	to: IAddress
}

type DeliveryOption = IDeliveryToHome | IDeliveryToShop

interface IDeliveryCart {
	date: Date
	to: IAddress | number
}

class Cart {
	private _products: IProduct[] = []
	private _delivery: IDeliveryCart
	private _totalCost: number = 0

	private isProductArray(product: IProduct | IProduct[]): product is IProduct[] {
		return Array.isArray(product as IProduct[])
	}

	public addProduct(product: IProduct | IProduct[]): void {
		if (this.isProductArray(product)) {
			let newArray_products = [
				...this._products,
				...product
			]
			this._products = newArray_products
		} else {
			this._products.push(product)
		}
	}

	public setDelivery(optionToShop: IDeliveryToShop): void
	public setDelivery(optionToHome: IDeliveryToHome): void
	public setDelivery(option: DeliveryOption): void {
		if (typeof option.to !== 'number') {
			this._delivery = option as IDeliveryToHome
		} else {
			this._delivery = {
				date: new Date(),
				to: option.to
			}
		}
	}

	get deliveryInfo() {
		let cartInfo = {
			products: this._products,
			delivery: this._delivery,
			totalCost: this._totalCost

		}
		return cartInfo
	}
}

let cart = new Cart()


cart.addProduct([{ id: 1, title: 'book', price: 100 }, { id: 2, title: 'lamp', price: 50 }])
cart.addProduct([{ id: 3, title: 'cheese', price: 50 }, { id: 4, title: 'apple', price: 33 }, { id: 5, title: 'cat', price: 100 }])
cart.addProduct([{ id: 332, title: 'UFO', price: 13 }])

cart.setDelivery({ date: new Date(), to: { city: 'Moscow', street: 'Krasnoarmeyskaya', house: 5 } })

console.log(cart.deliveryInfo);


