// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';

var log1 = document.querySelector("#textArea1");
var log2 = document.querySelector("#textArea2");

var input1 = document.querySelector("#input1");
var input2 = document.querySelector("#input2");

var rtcConfig={iceServers: [{urls: 'stun:ltc.turn.geant.org'}]}

//PeerConnection
var pc1 = new RTCPeerConnection(rtcConfig);
var pc2 = new RTCPeerConnection(rtcConfig);

//DataChannel
var dc1;
var dc2;

dc1 = pc1.createDataChannel("chat");

pc1.onicecandidate = function(e){
  if (e.candidate) {
    try {
      pc2.addIceCandidate(e.candidate);
    } catch (er) {
      console.error("AddCandidateError: "+e);
    }
  }
}

pc2.onicecandidate = function(e){
  if (e.candidate) {
    try {
      pc1.addIceCandidate(e.candidate);
    } catch (er) {
      console.error("AddCandidateError: "+e);
    }
  }
}

pc2.ondatachannel = function(e){
  dc2=e.channel;
  dc2.onmessage = function(e) {
    log2.value += e.data;
  }

};


try {
    pc1.createOffer()
    .then(offer => pc1.setLocalDescription(offer))
    .then(() => pc2.setRemoteDescription(pc1.localDescription))
    .then(() => pc2.createAnswer())
    .then(answer => pc2.setLocalDescription(answer))
    .then(() => pc1.setRemoteDescription(pc2.localDescription));
} catch(er){
  console.error("Error during Offer/Answer negotiation: "+er);
}


dc1.onmessage = function(e) {
  log1.value += e.data;
}


input1.onkeypress = function (e){
  if (e.keyCode === 13 || e.which === 13) {
    var msg = "Alice: "+input1.value+"\n";
    log1.value += msg;
    dc1.send(msg);
    input1.value="";
  }
}

input2.onkeypress = function (e){
  if (e.keyCode === 13 || e.which === 13) {
    var msg = "Bob: "+input2.value+"\n";
    log2.value += msg;
    dc2.send(msg);
    input2.value="";
  }
}
