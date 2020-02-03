const path = require('path')
const express = require('express')
const WebSocket = require('ws')

const state = {
  scrollTop: '',
  screenAmount: 7,
  topbarTextOffset: 0
}

const app = express()

app.use('/:id', express.static(path.join(__dirname, 'screens')))

const wss = new WebSocket.Server({ port: 3334 })

wss.on('connection', (ws) => {
  console.log('new connection', wss.clients.size)
  /* state.screenAmount = wss.clients.size */
  topbar()

  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    console.log(msg)

    switch(msg.type) {
      case 'setup':
        console.log('setup')
        break
      case 'scroll':
        if (state.scrollTop === msg.payload) {
          return state.scrollTop = msg.payload
        }
        state.scrollTop = msg.payload
        broadcast(JSON.stringify(msg), ws)
        break
    }
  })
})

function broadcast(msg, ws) {
  if (ws) {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  } else {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg)
      }
    })
  }
}

let topbarInterval
function topbar() {
  if (topbarInterval) {
    clearInterval(topbarInterval)
  }

  const topbarTextOffsetWidth = ((360 + 100) * state.screenAmount) + 200
  topbarInterval = setInterval(() => {
    const msg = {
      type: 'topbar-scroll',
      payload: state.topbarTextOffset
    }
    
    broadcast(JSON.stringify(msg))

    state.topbarTextOffset = state.topbarTextOffset < topbarTextOffsetWidth * -1 ? topbarTextOffsetWidth : state.topbarTextOffset - 2
  }, 30)
}

topbar()

app.listen(3333, () => console.log(`server runnin on http://localhost:3333`))
