const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const screens = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const state = {}

const app = express()
screens.forEach((screen) => {
  app.use(`/${ screen === '0' ? '' : screen }`, express.static(path.join(__dirname, `screens/${ screen }`)))
})

const wss = new WebSocket.Server({ port: 3334 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(message)

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      }
    })
  })
})

app.listen(3333, () => console.log(`server runnin on http://localhost:3333`))
