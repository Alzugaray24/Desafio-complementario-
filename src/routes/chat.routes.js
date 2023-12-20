import ChatDao from "../daos/dbManager/chat.dao.js";
import { Router } from "express";

const chatRouter = Router();
const chat = new ChatDao();

chatRouter.get("/", async (req, res) => {
    try {
        const mostrarChat = await chat.getChat();
        res.render("chat", { mostrarChat });
    } catch (error) {
        console.error("Error al obtener todos los mensajes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

chatRouter.post("/", async (req, res) => {
    try {
        const mensaje = req.body;
        const nuevoMensaje = await chat.addMessage(mensaje);
  
        res.status(201).json({
            status: "success",
            message: nuevoMensaje,
        });
    } catch (error) {
        console.error("Error al enviar el mensaje", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

chatRouter.put("/:id", async (req, res) => {
    try {
        const messageId = req.params.id;
        const updatedMessage = req.body;

        const updatedMessageResult = await chat.updateMessage(messageId, updatedMessage);

        res.status(200).json({
            status: "success",
            message: updatedMessageResult,
        });
    } catch (error) {
        console.error("Error al actualizar el mensaje", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

chatRouter.delete("/:id", async (req, res) => {
    try {
        const messageId = req.params.id;
        const deletedMessage = await chat.deleteMessage(messageId);

        res.status(200).json({
            status: "success",
            message: deletedMessage,
        });
    } catch (error) {
        console.error("Error al eliminar el mensaje", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default chatRouter;
