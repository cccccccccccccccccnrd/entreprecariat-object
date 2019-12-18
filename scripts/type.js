const keyboard = {
  Q: {
    x: 55,
    y: 1187
  },
  W: {
    x: 163,
    y: 1187
  },
  E: {
    x: 271,
    y: 1187
  },
  R: {
    x: 379,
    y: 1187
  },
  T: {
    x: 487,
    y: 1187
  },
  Y: {
    x: 595,
    y: 1187
  },
  U: {
    x: 703,
    y: 1187
  },
  I: {
    x: 811,
    y: 1187
  },
  O: {
    x: 919,
    y: 1187
  },
  P: {
    x: 1027,
    y: 1187
  },
  A: {
    x: 108,
    y: 1354
  },
  S: {
    x: 216,
    y: 1354
  },
  D: {
    x: 324,
    y: 1354
  },
  F: {
    x: 432,
    y: 1354
  },
  G: {
    x: 540,
    y: 1354
  },
  H: {
    x: 648,
    y: 1354
  },
  J: {
    x: 756,
    y: 1354
  },
  K: {
    x: 864,
    y: 1354
  },
  L: {
    x: 972,
    y: 1354
  },
  Z: {
    x: 216,
    y: 1517
  },
  X: {
    x: 324,
    y: 1517
  },
  C: {
    x: 432,
    y: 1517
  },
  V: {
    x: 540,
    y: 1517
  },
  B: {
    x: 648,
    y: 1517
  },
  N: {
    x: 756,
    y: 1517
  },
  M: {
    x: 864,
    y: 1517
  },
  SHIFT: {
    x: 73,
    y: 1517
  },
  DELETE: {
    x: 1005,
    y: 1517
  },
  SWITCH: {
    x: 73,
    y: 1680
  },
  SLASH: {
    x: 216,
    y: 1680
  },
  SPACE: {
    x: 540,
    y: 1680
  },
  DOT: {
    x: 864,
    y: 1680
  },
  ENTER: {
    x: 1005,
    y: 1680
  }
}

function type(string) {
  switch(string) {
    case 'ENTER':
      ra.tap(keyboard[string].x, keyboard[string].y)
      break
    default:
      string.split('').forEach(function(c) {
        let key
    
        switch(c) {
          case '/':
            key = 'SLASH'
          case ' ':
            key = 'SPACE'
            break
          case '.':
            key = 'DOT'
            break
          default:
            key = c.toUpperCase()
        }
    
        const coords = keyboard[key]
        if (coords) ra.tap(coords.x, coords.y)
      })
  }
  
  sleep(200)
}

const ra = new RootAutomator()

launch('com.android.chrome')
sleep(500)
click('Search')
sleep(500)
type('www.cnrd.computer')
type('ENTER')

events.on('exit', function() {
  ra.exit()
})