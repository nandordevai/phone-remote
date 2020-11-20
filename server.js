const os = require('os');
const https = require('https');
const fs = require('fs');

const express = require('express');
const WebSocket = require('ws');
const QRCode = require('qrcode')

const app = express();
app.use(express.static('assets'));

const port = 3000;

const key = fs.readFileSync(__dirname + '/development.key');
const cert = fs.readFileSync(__dirname + '/development.crt');
const server = https.createServer({ key, cert }, app);

app.get('/', (_, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.get('/m', (_, res) => {
    res.sendFile('mobile.html', { root: __dirname });
});

function getIPAddress() {
    return Object.values(os.networkInterfaces())
        .map(_ => _.filter(_ => _.family === 'IPv4')[0])
        .filter(_ => typeof _ !== 'undefined')
        .filter(_ => !_.internal)[0].address;
}

wss = new WebSocket.Server({ server });
wss.on('connection', function (socket) {
    socket.on('message', function (message) {
        console.log('received: %s', message);
    });

    // socket.send('something');
});

server.listen(port, () => {
    console.log(`Server listening at https://${getIPAddress()}:${port}`);
    QRCode.toFile(
        'assets/qrcode.svg',
        `https://${getIPAddress()}:${port}/m`,
        {
            type: 'svg',
        }
    );
});
