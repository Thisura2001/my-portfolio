export default class CustomerModel {
    constructor(customerId, customerName, salary, address) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._salary = salary;
        this._address = address;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get customerName() {
        return this._customerName;
    }

    set customerName(value) {
        this._customerName = value;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        this._salary = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }
}
