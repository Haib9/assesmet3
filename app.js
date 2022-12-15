//Require the express moule
const express = require(“express”);

//create a new express application
const app = express()

//require the http module
const http = require(“http”).Server(app)

// require the socket.io module
const io = require(“socket.io”);

const port = 500;

const socket = io(http);
//create an event listener
//database connection
const  Chat  = require("./models/Chat");
const  connect  = require("./dbconnect");
const  bodyParser  = require("body-parser");
const  chatRouter  = require("./route/chatroute");

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);

//To listen to messages
socket.on(“connection”, (socket)=>{
console.log(“user connected”);
});

//wire up the server to listen to our port 500
http.listen(port, ()=>{
console.log(“connected to port: ”+ port)
});
//setup event listener
socket.on("connection", socket  =>  {
    console.log("user connected");
    socket.on("disconnect", function() {
    console.log("user disconnected");
    });  
    socket.on("chat message", function(msg) {
        console.log("message: "  +  msg);
        //broadcast message to everyone in port:5000 except yourself.
    socket.broadcast.emit("received", { message: msg  });

    //save chat to the database
    connect.then(db  =>  {
    console.log("connected correctly to the server");

    let  chatMessage  =  new Chat({ message: msg, sender: "Anonymous"});
    chatMessage.save();
    });
    });
});
(function() {
    fetch("/chats")
    .then(data  =>  {
    return  data.json();
    })
.then(json  =>  {
json.map(data  =>  {
let  li  =  document.createElement("li");
let messages = docuemtn.getElementById("messages")
let  span  =  document.createElement("span");
messages.appendChild(li).append(data.message);

    messages
    .appendChild(span)
    .append("by "  +  data.sender  +  ": "  +  formatTimeAgo(data.createdAt));
});
});
})();
(function(){
    socket.on("received", data  =>  {
    let  li  =  document.createElement("li");
    let  span  =  document.createElement("span");
    var  messages  =  document.getElementById("messages");
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append("by "  +  "anonymous"  +  ": "  +  "just now");
    });
    })
    //isTyping event
messageInput.addEventListener("keypress", () =>  {
    socket.emit("typing", { user: "Someone", message: "is typing..."  });
    });
    socket.on("notifyTyping", data  =>  {
    typing.innerText  =  data.user  +  "  "  +  data.message;
    console.log(data.user  +  data.message);
    });
    //stop typing
    messageInput.addEventListener("keyup", () =>  {
    socket.emit("stopTyping", "");
    });
    socket.on("notifyStopTyping", () =>  {
    typing.innerText  =  "";
    
    });
    //Someone is typing

 socket.on("typing", data => { 

    socket.broadcast.emit("notifyTyping", { user: data.user, message: data.message }); }); 

//when soemone stops typing

socket.on("stopTyping", () => { socket.broadcast.emit("notifyStopTyping"); });
