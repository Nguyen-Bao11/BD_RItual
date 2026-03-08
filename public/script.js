const messages = document.getElementById("messages")

function add(text, cls){

const div = document.createElement("div")

div.className = "msg " + cls

div.textContent = text

messages.appendChild(div)

messages.scrollTop = messages.scrollHeight

}

async function send(){

const input = document.getElementById("input")

const text = input.value

if(!text) return

add("You: " + text, "user")

input.value=""

add("Siggy is thinking...", "bot")

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

messages.lastChild.remove()

typeText("Siggy: " + data.reply)

}

function typeText(text){

let i=0

const div=document.createElement("div")

div.className="msg bot"

messages.appendChild(div)

const interval=setInterval(()=>{

div.textContent += text[i]

i++

if(i>=text.length){
clearInterval(interval)
}

},20)

}
