const express = require('express')
const cv = require('opencv4nodejs')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const wCap = new cv.VideoCapture(0);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

let interval = setInterval(() => {
    const frame = wCap.read()
    const image = cv.imencode('.jpg', frame).toString('base64')
    io.emit('image', image)
}, 1000)

app.listen(3000)