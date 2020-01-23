const url = window.location.hostname === 'localhost' ? 'ws://localhost:3334' : 'ws://192.168.0.100:3334'
const socket = new WebSocket(url)

const id = window.location.pathname.replace(/^\/|\/$/g, '')
const section = document.getElementById(id)
const topbarText = document.getElementById('topbar-text')

const screenWidth = 360
const dividerWidth = 100

document.title = `${id} * interface`
console.log(id)

let touched = false
let interval

socket.addEventListener('message', (message) => {
  const msg = JSON.parse(message.data)

  switch(msg.type) {      
    case 'scroll':
      const y = Number(msg.payload)
      if (section.scrollTop === y) return
      console.log(y)
      section.scrollTo(0, y)
      break
    case 'topbar-scroll':
      const offset = Number(msg.payload)
      topbarText.style.transform = `translateX(${ offset }px)`
      break
  }
})

window.addEventListener('touchstart', (event) => {
  clearInterval(interval)
  touched = true

  interval = setTimeout(() => {
    touched = false
  }, 200)
})

window.addEventListener('touchmove', (event) => {
  touched = true
})

window.addEventListener('touchend', (event) => {
  clearInterval(interval)
  touched = true

  interval = setTimeout(() => {
    touched = false
  }, 200)
})

section.addEventListener('scroll', (event) => {
  if (!touched) {
    return
  }

  const msg = {
    id: id,
    type: 'scroll',
    payload: Math.floor(section.scrollTop)
  }

  if (socket.readyState === 1) {
    socket.send(JSON.stringify(msg))
  }
})

setTimeout(() => {
  const x = Number(id) === 1 ? 0 : ((id * screenWidth) + ((id - 1) * dividerWidth)) - screenWidth
  window.scroll(x, 0)
  console.log(x)
}, 10)