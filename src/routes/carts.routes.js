import CartsDao from "../daos/dbManager/carts.dao.js";
import { Router } from "express";

const cartsRouter = Router();
const carts = new CartsDao();

cartsRouter.get("/", async (req, res) => {
  try {
    const mostrarCarts = await carts.getAllCarts();
    res.render("carts", { mostrarCarts });
  } catch (error) {
    console.error("Error al obtener todos los carritos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await carts.getCartById(cartId);

    res.status(200).json({
      status: "success",
      cart,
    });
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const cart = req.body;
    const nuevoCart = await carts.addCart(cart);

    res.status(201).json({
      status: "success",
      cart: nuevoCart,
    });
  } catch (error) {
    console.error("Error al agregar el carrito", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.put("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const updatedCart = req.body;

    const updatedCartResult = await carts.updateCart(cartId, updatedCart);

    res.status(200).json({
      status: "success",
      cart: updatedCartResult,
    });
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    const updatedCart = await carts.updateProductQuantity(
      cartId,
      productId,
      quantity
    );

    res.status(200).json({
      status: "success",
      cart: updatedCart,
    });
  } catch (error) {
    console.error(
      "Error al actualizar la cantidad del producto en el carrito",
      error
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.delete("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    const clearedCart = await carts.clearCart(cartId);

    res.status(200).json({
      status: "success",
      cart: clearedCart,
    });
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const updatedCart = await carts.removeProductFromCart(cartId, productId);

    res.status(200).json({
      status: "success",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default cartsRouter;
