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

cartsRouter.put("/:id", async (req, res) => {
    try {
        const cartId = req.params.id;
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

cartsRouter.delete("/:id", async (req, res) => {
    try {
        const cartId = req.params.id;
        const deletedCart = await carts.deleteCart(cartId);

        res.status(200).json({
            status: "success",
            cart: deletedCart,
        });
    } catch (error) {
        console.error("Error al eliminar el carrito", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default cartsRouter;
