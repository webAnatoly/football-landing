let videoFrame = document.querySelector('#video-frame');
function checkFocus(element) {
  let focused = false;
  if (document.activeElement === element) {
    focused = true;
  }
  return focused;
}

// window.setInterval(handler, 100);

// document.addEventListener('click', function() {
//   if (checkFocus(iframe)) {
//     setZindex(iframe, 10);
//   } else {
//     setZindex(iframe, 1);
//   }
// });
// iframe.addEventListener('mouseover', function() {
//   if (checkFocus(iframe)) {
//     setZindex(iframe, 10);
//   } else {
//     setZindex(iframe, 1);
//   }
// });



// 1. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '219',
    width: '360',
    videoId: 'CYU0h6pCrxA',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  // event.target.playVideo();
}

function onPlayerStateChange(event) {
  if (event.data == 1 || event.data == 2) {
    console.log(videoFrame.classList);
    videoFrame.classList.add('big-zindex');
    console.log(videoFrame.classList);
    // videoFrame.style.zIndex = '999';
  }
}

function stopVideo() {
  player.stopVideo();
}
