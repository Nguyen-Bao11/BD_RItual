const input = document.getElementById("input")
const send = document.getElementById("send")
const chat = document.getElementById("chat")

async function sendMessage(){

const text = input.value

if(!text) return

chat.innerHTML += `<div class="user">You: ${text}</div>`

input.value=""

const res = await fetch("/chat",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

})

const data = await res.json()

chat.innerHTML += `<div class="bot">Siggy: ${data.reply}</div>`

chat.scrollTop = chat.scrollHeight

}

send.onclick = sendMessage

input.addEventListener("keypress",(e)=>{

if(e.key==="Enter") sendMessage()

})
