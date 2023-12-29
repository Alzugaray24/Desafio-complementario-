// CartsDao.js

import { cartsModel } from "../../models/carts.model.js";

class CartsDao {
  constructor() {
    this.model = cartsModel;
  }

  async getAllCarts() {
    return await this.model.find().lean();
  }

  async getCartById(cartId) {
    return await this.model.findById(cartId).populate("products.product").lean();
  }

  async addCart(cart) {
    return await this.model.create(cart);
  }

  async updateCart(cartId, updatedCart) {
    return await this.model.findByIdAndUpdate(cartId, updatedCart, { new: true }).populate("products.product");
  }

  async deleteCart(cartId) {
    return await this.model.findByIdAndDelete(cartId);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const updatedCart = await this.model.findOneAndUpdate(
      { _id: cartId, "products.product": productId },
      { $set: { "products.$.quantity": quantity } },
      { new: true }
    ).populate("products.product");

    return updatedCart;
  }

  async clearCart(cartId) {
    const clearedCart = await this.model.findByIdAndUpdate(cartId, { products: [] }, { new: true }).populate("products.product");

    return clearedCart;
  }

  async removeProductFromCart(cartId, productId) {
    const updatedCart = await this.model.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    ).populate("products.product");

    return updatedCart;
  }
}

export default CartsDao;
