const socket = new WebSocket('ws://localhost:3334')

socket.addEventListener('message', (message) => {
  const y = Number(message.data)
  if (window.scrollY !== y) {
    window.scrollTo(0, y)
  }
})

window.addEventListener('scroll', (event) => {
  const y = window.scrollY
  console.log(y)
  socket.send(y)
})