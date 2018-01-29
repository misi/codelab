// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';


let constraintList = document.getElementById("constraintList");
let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

for (let constraint in supportedConstraints) {
  if (supportedConstraints.hasOwnProperty(constraint)) {
    let elem = document.createElement("li");

    elem.innerHTML = "<code>" + constraint + "</code>";
    constraintList.appendChild(elem);
  }
};

// See: https://w3c.github.io/mediacapture-main/#types-for-constrainable-properties

// exact => required
// idal => target

const mediaStreamConstraints = {
  video: {
    width: { exact: 640},
    height: { ideal: 480}
  }
}

/*
const mediaStreamConstraints = {
  video: {
    width: {
      min: 640,
      max: 800
    },
    height: {
      min: 480,
      max: 600
    }
  }
};
*/

/*
const mediaStreamConstraints = { video: { facingMode: "user" } };
const mediaStreamConstraints = { video: { facingMode: "environment" } };
*/

navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
.then(function(mediaStream) {
  /* use the stream */
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
   /* handle the error */
  console.error(err);
});
