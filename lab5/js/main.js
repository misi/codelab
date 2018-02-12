// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';

const mediaStreamConstraints = {
  audio: true,
  video: true
};

var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
var grabButton = document.querySelector('#grab');
var callButton = document.querySelector('#call');
var hangupButton = document.querySelector('#hangup');

var pc1;
var pc2;

var localStream;
//var rtcConfig={iceServers: [{urls: 'stun:ltc.turn.geant.org'}]}
var rtcConfig=null;

function grab() {
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(function(mediaStream) {
     /* use the stream */
    localVideo.srcObject = mediaStream;
    localStream=mediaStream;
    localVideo.onloadedmetadata = function(e) {
      localVideo.play();
    };
    callButton.disabled = false;
    grabButton.disabled = true;
  })
  .catch(function(err) {
    /* handle the error */
    console.error(err);
  });
};



function call(){
  console.log('Call Start');

  callButton.disabled = true;

  var videoTracks = localStream.getVideoTracks();
  var audioTracks = localStream.getAudioTracks();
  if (audioTracks.length > 0) {
    console.log('Actual Audio device: ' + audioTracks[0].label);
  }

  if (videoTracks.length > 0) {
    console.log('Actual Video device: ' + videoTracks[0].label);
  }
  pc1 = new RTCPeerConnection(rtcConfig);
  pc2 = new RTCPeerConnection(rtcConfig);
  console.log('create peer connection objects');


  // signaling state
  var signalingStateLog1 = pc1.signalingState;
  var signalingStateLog2 = pc2.signalingState;

  pc1.onsignalingstatechange = function() {
    if (pc1) {
      signalingStateLog1 += " -> " + pc1.signalingState;
      console.log('PC1 Sinaling: ' + signalingStateLog1);
    };
  };

  pc2.onsignalingstatechange = function() {
    if (pc2) {
      signalingStateLog2 += " -> " + pc2.signalingState;
      console.log('PC2 Sinaling: ' + signalingStateLog2);
    };
  };


  // ice state
  var iceConnectionStateLog1 = pc1.iceConnectionState;
  var iceConnectionStateLog2 = pc2.iceConnectionState;

  pc1.oniceconnectionstatechange = function() {
    if (pc1) {
      iceConnectionStateLog1 += " -> " + pc1.iceConnectionState
      console.log('PC1 ICE: '+ iceConnectionStateLog1);
    };
  };

  pc2.oniceconnectionstatechange = function() {
    if (pc2) {
      iceConnectionStateLog2 += " -> " + pc2.iceConnectionState
      console.log('PC2 ICE: '+ iceConnectionStateLog2);
    };
  };


  pc1.onicecandidate = function (event){
     pc2.addIceCandidate(event.candidate);
     if(event.candidate) console.log('pc1 ICE Candidate: '+event.candidate.candidate);
  }

  pc2.onicecandidate = function (event){
     pc1.addIceCandidate(event.candidate);
     if(event.candidate) console.log('pc2 ICE Candidate: '+event.candidate.candidate);
  }


  pc2.ontrack = function(event) {
    remoteVideo.srcObject = event.streams[0];
    remoteVideo.onloadedmetadata = function(e) {
      remoteVideo.play();
    };
    hangupButton.disabled = false;
  }
  pc2.onnegotiationneeded = () => {
    try {
      console.log("pc2");
    } catch (err) {
      console.error(err);
    }
  };

  // add mediastream
 localStream.getTracks().forEach(track => {pc1.addTrack(track, localStream);});


  var offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

 // init call
 pc1.createOffer(offerOptions).then( offer => {
   pc1.setLocalDescription(offer);
   pc2.setRemoteDescription(offer);
   console.log('Offer: '+offer.sdp);
   pc2.createAnswer().then( answer => {
     pc2.setLocalDescription(answer);
     pc1.setRemoteDescription(answer);
     console.log('Answer: '+answer.sdp);
   });
 });
}

function hangup(){
  pc1.close();
  pc2.close();
  localStream.getTracks().forEach(track => { track.stop();});
  grabButton.disabled = false;
  hangupButton.disabled = true;
}

grabButton.onclick=grab;
callButton.onclick=call;
hangupButton.onclick=hangup;
