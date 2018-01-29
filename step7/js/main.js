// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';
const room="testroom";

var log1 = document.querySelector("#textArea1");
var log2 = document.querySelector("#textArea2");

var input1 = document.querySelector("#input1");
var input2 = document.querySelector("#input2");

var signaling=new URL(window.location.href);
signaling.port = 8080;
signaling.pathname = '/';
console.log('Signaling Server: '+signaling);

var socket1 = io(signaling.href);
var socket2 = io(signaling.href);

socket1.on('connect', () =>{
  console.log("Alice / socket1 ready");
  socket1.emit('room',room);
});

socket2.on('connect', () =>{
  console.log("Bob / socket2 ready");
  socket2.emit('room',room);
});


socket1.on('message', msg =>{
  log1.value += msg;
});

socket2.on('message', msg =>{
  log2.value += msg;
});


input1.onkeypress = function (e){
  if (e.keyCode === 13 || e.which === 13) {
    var msg = "Alice: "+input1.value+"\n";
    log1.value += msg;
    socket1.emit('message',msg);
    input1.value="";
  }
}

input2.onkeypress = function (e){
  if (e.keyCode === 13 || e.which === 13) {
    var msg = "Bob: "+input2.value+"\n";
    log2.value += msg;
    socket2.emit('message',msg);
    input2.value="";
  }
}
