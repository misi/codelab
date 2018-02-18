// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';


const mediaStreamConstraints = {
  video: true,
};

/*
const mediaStreamConstraints = { video: { facingMode: "user" } };
const mediaStreamConstraints = { video: { facingMode: "environment" } };
*/

var myStream;

navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
.then(function(mediaStream) {
   /* use the stream */
   myStream=mediaStream;
   var video = document.querySelector('video');
   video.srcObject = mediaStream;
})
.catch(function(err) {
   /* handle the error */
  console.error(err);
});
