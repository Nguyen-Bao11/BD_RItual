const input = document.getElementById("input");
const chat = document.getElementById("chat");

input.addEventListener("keypress", async (e) => {

if(e.key === "Enter"){

const text = input.value;

chat.innerHTML += `<div class="user">You: ${text}</div>`;

input.value="";

const res = await fetch("/chat",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:text
})

});

const data = await res.json();

chat.innerHTML += `<div class="bot">AI: ${data.reply}</div>`;

chat.scrollTop = chat.scrollHeight;

}

});
