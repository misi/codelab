// Strict mode changes previously accepted "bad syntax" into real errors.
'use strict';

var gum = document.querySelector('#gum');
var vod = document.querySelector('#vod');
var grabButton = document.querySelector('#grab');
var recordButton = document.querySelector('#record');
var stopButton = document.querySelector('#stop');
var replayButton = document.querySelector('#replay');
var formatSelect = document.querySelector('#format');

var localStream=null;
var mediaRecorder=null;

var chunks = [];

const mediaStreamConstraints = {
  audio: true,
  video: true
};

var types = ["video/webm\;codecs=vp9",
             "video/webm\;codecs=vp8",
             "video/webm\;codecs=daala",
             "video/webm\;codecs=h264"];

for (var i in types) {
  if (MediaRecorder.isTypeSupported(types[i])){
    console.log("Yes, \""+types[i] + "\" is probably supported..");
    var option = document.createElement('option');
    option.value = option.text = types[i];
    formatSelect.appendChild(option);
  } else {
    console.log("Unfortunately \""+types[i] + "\" not yet supported. :(");
  };
};

function grab() {
  navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
  .then(function(mediaStream) {
    /* use the stream */
    var video = document.querySelector('#gum');
    video.srcObject = mediaStream;
    localStream=mediaStream;
    video.onloadedmetadata = function(e) {
      video.play();
      grabButton.disabled=true;
      recordButton.disabled=false;
    };
  })
  .catch(function(err) {
    /* handle the error */
    console.error(err);
  });
};

function record() {
  formatSelect.disabled=true;
  recordButton.disabled=true;
  var mediaRecorderOptions={};
  mediaRecorderOptions.mimeType = formatSelect.value;
  try {
    mediaRecorder = new MediaRecorder(localStream, mediaRecorderOptions);
  } catch (e) {
    console.error("Error during mediarecorder creation using format(" + format + "): " + e);
    alert("Error during mediarecorder creation using format(" + format + ")");
  }
  mediaRecorder.ondataavailable = dataAvailable;
  mediaRecorder.start(25); // collect 25ms of data
  stopButton.disabled=false;
};

function dataAvailable(e){
  chunks.push(e.data);
};

function replay() {
  vod.controls = true;
  var buffer = new Blob(chunks, {type: 'video/webm'});
  var recordingUrl = window.URL.createObjectURL(buffer);
  vod.src = recordingUrl;
  //Add download link
  var a = document.createElement('a');
  var linkText = document.createTextNode("!!! Download Recording !!!");
  a.appendChild(linkText);
  a.href = recordingUrl;
  a.title = "!!! Download Recording !!!"
  a.download = 'recorded.webm';
  document.querySelector('#download').appendChild(a);
};

function stop() {
  stopButton.disabled = true;
  mediaRecorder.stop();
  replayButton.disabled = false;
};

// Add buttons eventhandles
grabButton.onclick = grab;
recordButton.onclick = record;
stopButton.onclick = stop;
replayButton.onclick = replay;
