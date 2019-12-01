const socket = new WebSocket('ws://localhost:3334')

let touched = false
let lastY = 0

socket.addEventListener('message', (message) => {
  const y = Number(message.data)
  if (window.scrollY === y) return
  window.scrollBy(0, y)
})

window.addEventListener('touchstart', (event) => {
  touched = true
})

window.addEventListener('touchend', (event) => {
  touched = false
})

window.addEventListener('scroll', (event) => {
  const y = window.scrollY
  const d = y - lastY
  lastY = y
  if (!touched) return
  if (socket.readyState === 1) socket.send(d)
})