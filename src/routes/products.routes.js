import productDao from "../daos/dbManager/products.dao.js";
import { Router } from "express"

const productRouter = Router();
const products = new productDao();

productRouter.get("/", async(req,res)=> {
    try {
        const mostrarProductos = await products.getAllProducts();
        res.render("products", {mostrarProductos})
    } catch (error) {
        console.error("Error al obtener todos los productos:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

productRouter.post("/", async (req, res) => {
    try {
        const nuevoProducto = req.body;
        const productoCreado = await products.createProduct(nuevoProducto);
  
        res.status(201).json({
            status: "success",
            producto: productoCreado,
        });
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
  });

productRouter.put("/:id", async(req,res)=> {
    try {
        const { id } = req.params
        const nuevoProducto = req.body

        const existeProducto = await products.getProductById(id);
        if (!existeProducto) {
            return res.status(404).json({ error: "El producto no se encontro" });
        }

        const productoActualizado = await products.updateProduct(id, nuevoProducto)
        res.status(201).json({
            status: "success",
            nuevo_Producto: productoActualizado,
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

productRouter.delete("/:id", async(req,res)=> {
    try {
        const { id } = req.params
        const productoEliminado = await products.deleteProduct(id)
        res.status(201).json({
            status:"success",
            producto: productoEliminado
        })

    } catch (error) {
        console.error("Error al borrar el producto:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


export default productRouter;