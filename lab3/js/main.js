// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';

var videoInputSelect = document.getElementById("videoInputSelect");
var audioInputSelect = document.getElementById("audioInputSelect");
var audioOutputSelect = document.getElementById("audioOutputSelect");
var video = document.querySelector('video');



navigator.mediaDevices.enumerateDevices()
  .then(function (devices){
    console.log(devices);
    devices.forEach(function(deviceInfo) {
      var option = document.createElement('option');
      option.value = deviceInfo.deviceId;
      if (deviceInfo.kind === 'audioinput') {
        option.text = deviceInfo.label ||
          'Microphone ' + (audioInputSelect.length + 1);
        audioInputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'audiooutput') {
        option.text = deviceInfo.label || 'Speaker ' +
          (audioOutputSelect.length + 1);
        audioOutputSelect.appendChild(option);
      } else if (deviceInfo.kind === 'videoinput') {
        option.text = deviceInfo.label || 'Camera ' +
          (videoInputSelect.length + 1);
        videoInputSelect.appendChild(option);
      }

    });
  })
  .catch(errorCallback);
function outputSelected(){
  var audioOutputId = audioOutputSelect.value;
  video.setSinkId(audioOutputId);
};

function inputSelected(){
  if (window.mediaStream){
    let tracks = window.mediaStream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });
  };
  var audioInputId = audioInputSelect.value;
  var videoInputId = videoInputSelect.value;
  var mediaStreamConstraints = {
    audio: { deviceId: audioInputId ? {exact: audioInputId } : undefined },
    video: { deviceId: videoInputId ? {exact: videoInputId } : undefined }
  };

  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(function(mediaStream) {
      window.mediaStream=mediaStream;
      /* use the stream */
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(errorCallback);
};

function errorCallback(err) {
  /* handle the error */
  console.error(err);
};

videoInputSelect.onchange=inputSelected;
audioInputSelect.onchange=inputSelected;
audioOutputSelect.onchange=outputSelected;
