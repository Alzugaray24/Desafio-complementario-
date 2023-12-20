const socket = io();
const button = document.getElementById("buttonChat");
const input = document.getElementById("message");
const chatbox = document.getElementById("chatbox");
let usuario = "";

document.addEventListener("DOMContentLoaded", function () {
  Swal.fire({
    title: "Ingrese su nombre",
    input: "text",
    inputPlaceholder: "Escriba su nombre",
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonText: "Aceptar",
    preConfirm: (name) => {
      if (!name || name.trim() === "") {
        Swal.showValidationMessage("Por favor, ingrese su nombre");
      }
      usuario = name;
      return name;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(`¡Hola, ${result.value}!`);
    }
  });
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const valorInput = input.value.trim();
    
    if (valorInput !== "") {
      socket.emit("mensaje_nuevo", { user: usuario, message: valorInput });
      input.value = "";
    }
  }
});

socket.on("nuevo_chat", async (data) => {
    // Obtener el elemento chatbox
    const chatbox = document.getElementById("chatbox");
  
    // Iterar sobre los nuevos mensajes y agregarlos al chatbox
    await data.forEach((message) => {
      if (message.user && message.message) {
        // Crear un nuevo elemento <p> para el mensaje
        const newMessage = document.createElement("p");
        newMessage.innerHTML = `<b>${message.user}:</b> ${message.message}`;
  
        // Agregar el nuevo mensaje al chatbox
        chatbox.appendChild(newMessage);
      }
    });
  });
  
