import { cartsModel } from "../../models/carts.model";

class CartsDao {
    constructor() {
        this.model = cartsModel;
    }

    async getAllCarts() {
        return await this.model.find().lean();
    }

    async getCartById(cartId) {
        return await this.model.findById(cartId).lean();
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async updateCart(cartId, updatedCart) {
        return await this.model.findByIdAndUpdate(cartId, updatedCart, { new: true });
    }

    async deleteCart(cartId) {
        return await this.model.findByIdAndDelete(cartId);
    }
}

export default CartsDao;
