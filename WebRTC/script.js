$(document).ready(function () {
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
})
var myVideo = document.getElementById("myVideo");
const video = document.querySelector('video');
var constrant = {
    audio: true,
    video: true
}
navigator.getUserMedia(constrant, successCallback, errorCallback);


// Adapter.JS adı altında (WebRTC'ye bağlı) bir kütüphane kullandık.
// Firefox'ta çalışmama durumu için direkt pencere - screen ilişkisi yaptık.
if (adapter.browserDetails.browser == 'firefox') {
    adapter.browserShim.shimGetDisplayMedia(window, 'screen');
}

// Start Butonuna bağlı olarak (event yapıyor) DisplayMedia kullanıp videoyu başlatıyor.
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
    navigator.mediaDevices.getDisplayMedia({
            video: true
        })
        .then(successCallback, errorCallback);
});

if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
    startButton.disabled = false;
  } else {
    errorMsg('getDisplayMedia is not supported');
  }

// Ekranınızın anlık görüntüsünü almak için yapılıyor.

const canvas = window.canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 360;

const button = document.getElementById("snapshot");
button.onclick = function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    //DrawImage mantığı js içinde var, webrtc ile alakası yok.
};



function successCallback(stream) {
    // Eğer metod başarılı olursa kamera ve mikrafon akışını tarayıcıya yansıt.
    myVideo.srcObject = stream;
    // Ve başarılı olduğu için çalıştır.
    myVideo.play();
}

function errorCallback(error) {
    // Eğer videoya sorun çıkarsa error mesajı versin.
    console.log(error);
}

var playVideo = () => {
    //Videoyu onclick ile başlat.
    myVideo.play();
}

var pauseVideo = () => {
    //Videoyu onclick ile durdur.
    myVideo.pause();
}
