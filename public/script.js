const chat = document.getElementById("chat")
const input = document.getElementById("input")
const send = document.getElementById("send")

input.addEventListener("keydown", function(e) {

if (e.key === "Enter" && !e.shiftKey) {
e.preventDefault()
send.click()
}

})

function addMessage(text, user){

const chat = document.getElementById("chat")

const msg = document.createElement("div")
msg.className = "message"

if(user){
msg.classList.add("user")
msg.innerHTML = `
<div class="bubble">${text}</div>
`
}
else{
msg.innerHTML = `
<div class="bot-icon">●</div>
<div class="bubble">${text}</div>
`
}

chat.appendChild(msg)
chat.scrollTop = chat.scrollHeight

}

send.onclick = () => {

const text = input.value

if(!text) return

hideIntro()

addMessage(text,true)

input.value=""

botTyping()

fetch("/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:text
})
})
.then(res=>res.json())
.then(data=>{

removeTyping()
addMessage(data.reply,false)

})
.catch(err=>{
removeTyping()
addMessage("Siggy lost connection to the arcane realm... ⚡",false)
})

}

/* particles */

tsParticles.load("tsparticles",{
particles:{
number:{value:60},
color:{value:"#a78bfa"},
links:{
enable:true,
color:"#a78bfa",
distance:150
},
move:{
enable:true,
speed:1
},
size:{
value:2
}
}
})

let startedChat = false

function hideIntro(){
if(startedChat) return
startedChat = true

const intro = document.querySelector(".title-zone")
if(intro){
intro.classList.add("hide")
}
}

function botTyping(){

const chat = document.getElementById("chat")

const typing = document.createElement("div")
typing.className = "message bot typing"
typing.id = "typing"

typing.innerHTML = `
<div class="bot-icon">●</div>
<div class="bubble">Bot đang trả lời...</div>
`

chat.appendChild(typing)
chat.scrollTop = chat.scrollHeight

}

function removeTyping(){

const typing = document.getElementById("typing")

if(typing){
typing.remove()
}

}
