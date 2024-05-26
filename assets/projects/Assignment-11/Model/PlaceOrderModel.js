export default class PlaceOrderModel {
    constructor(order_id, orderItems, netTotal, discount, finalTotal) {
        this._order_id = order_id;
        this._orderItems = orderItems;
        this._netTotal = netTotal;
        this._discount = discount;
        this._finalTotal = finalTotal;
    }

    get order_id() {
        return this._order_id;
    }

    set order_id(value) {
        this._order_id = value;
    }

    get orderItems() {
        return this._orderItems;
    }

    set orderItems(value) {
        this._orderItems = value;
    }

    get netTotal() {
        return this._netTotal;
    }

    set netTotal(value) {
        this._netTotal = value;
    }

    get discount() {
        return this._discount;
    }

    set discount(value) {
        this._discount = value;
    }

    get finalTotal() {
        return this._finalTotal;
    }

    set finalTotal(value) {
        this._finalTotal = value;
    }
}
