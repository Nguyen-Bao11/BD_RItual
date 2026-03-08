const chat = document.getElementById("chat")
const input = document.getElementById("input")
const send = document.getElementById("send")

function addMessage(text, user){

const msg = document.createElement("div")
msg.className = "message"

if(user){
msg.innerHTML = "<b>You:</b> " + text
}else{
msg.innerHTML = "<b>Siggy:</b> " + text
}

chat.appendChild(msg)
chat.scrollTop = chat.scrollHeight
}

send.onclick = () => {

const text = input.value

if(!text) return

addMessage(text,true)

input.value=""

setTimeout(()=>{
addMessage("Siggy is thinking... 🔮",false)
},500)

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
