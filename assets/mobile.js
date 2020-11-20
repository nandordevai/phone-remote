// const ws = new WebSocket('wss://10.0.1.78:3000'); // FIXME
// ws.onopen = () => {
//     ws.send('mobile connected');
// };

function handleMotionEvent(event) {
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
}

window.addEventListener('devicemotion', handleMotionEvent, true);
document.querySelector('#request').addEventListener('click', () => {
    DeviceOrientationEvent.requestPermission();
});
