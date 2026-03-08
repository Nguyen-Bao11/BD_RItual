const input = document.getElementById("input");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

function createMessage(text,type){

const msg = document.createElement("div");
msg.className = "message " + type;

const bubble = document.createElement("div");
bubble.className = "bubble";

bubble.innerText = text;

msg.appendChild(bubble);

chat.appendChild(msg);

chat.scrollTop = chat.scrollHeight;

}

async function sendMessage(){

const text = input.value.trim();

if(!text) return;

createMessage(text,"user");

input.value="";

/* hiệu ứng Siggy đang suy nghĩ */

const thinking = document.createElement("div");
thinking.className="message bot";
thinking.innerHTML=`<div class="bubble typing">Siggy is channeling...</div>`;
chat.appendChild(thinking);

chat.scrollTop = chat.scrollHeight;

try{

const res = await fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({message:text})
});

const data = await res.json();

thinking.remove();

createMessage(data.reply,"bot");

}catch(err){

thinking.remove();

createMessage("Siggy lost the signal...","bot");

}

}

send.onclick=sendMessage;

input.addEventListener("keypress",e=>{
if(e.key==="Enter"){
sendMessage();
}
});
