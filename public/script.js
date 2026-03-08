const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

/* typing effect */
function typeMessage(text) {

  const msg = document.createElement("div");
  msg.className = "bot";
  chat.appendChild(msg);

  let i = 0;

  function typing() {
    if (i < text.length) {
      msg.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, 25);
    }
  }

  typing();
}

/* welcome message */
window.onload = () => {
  typeMessage("Welcome to the gRitual Fam family!");
};

/* send message to AI */
async function sendMessage() {

  const text = input.value;

  if (!text) return;

  chat.innerHTML += `<div class="user">You: ${text}</div>`;
  input.value = "";

  const thinking = document.createElement("div");
  thinking.className = "bot";
  thinking.innerText = "Siggy is thinking...";
  chat.appendChild(thinking);

  try {

    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();

    thinking.innerText = "Siggy: " + data.reply;

  } catch {

    thinking.innerText = "⚠ Cannot reach server";

  }

  chat.scrollTop = chat.scrollHeight;
}

send.onclick = sendMessage;

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
