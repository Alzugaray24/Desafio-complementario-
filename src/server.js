import express from "express";
import http from "http";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { __dirname } from "./dirname.js";
import viewsRouter from "./routes/views.routes.js";
import productRouter from "./routes/products.routes.js";
import chatRouter from "./routes/chat.routes.js";
import ChatDao from "./daos/dbManager/chat.dao.js";
import cartsRouter from "./routes/carts.routes.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const PORT = 8080;
const password = 123;

mongoose
  .connect(
    `mongodb+srv://CoderUser:${password}@codercluster.tnznf0l.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database: " + error);
    process.exit();
  });

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/chats", chatRouter);
app.use("/api/carts", cartsRouter);

const chat = new ChatDao()

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("mensaje_nuevo", async (data) => {
    try {
      const nuevoChat = await chat.addMessage(data);

      // Convierte el objeto a un array de objetos
      const chatArray = Object.values(nuevoChat);

      // Emite el nuevo chat al cliente
      socket.emit("nuevo_chat", chatArray);
    } catch (error) {
      console.error("Error al añadir mensaje:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
