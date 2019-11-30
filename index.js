const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))

const wss = new WebSocket.Server({ port: 3334 })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received', message)

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
