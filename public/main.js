// Make connection
const socket = io.connect("http://localhost:4000");

// Query the DOM
const message = document.querySelector(".message");
const handle = document.querySelector(".name");
const btn = document.querySelector(".send");
const output = document.querySelector(".output");
const feedback = document.querySelector(".feedback p");
const chatMessage = document.createElement("p");
const strong = document.createElement("strong");
const emphasize = document.createElement("em");

// Emit events
btn.addEventListener("click", _ => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
  handle.disabled = true;
});

// emit typing status
message.addEventListener("keydown", _ => socket.emit("typing", handle.value));

// Listen for events
socket.on("chat", data => {
  feedback.textContent = "";
  strong.textContent = data.handle;
  chatMessage.textContent = data.message;
  chatMessage.insertBefore(strong, chatMessage.firstChild);
  output.appendChild(chatMessage.cloneNode(true));
});

// Listen typing event
socket.on("typing", data => {
  feedback.textContent = `${data} is typing a message`;
});
