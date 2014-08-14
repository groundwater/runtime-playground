var fs = require('fs')
var Screen = require('./screen.js')
var map = require('./keymap.js')

// location and dimensions of VGA frame buffer
var start = 0xB8000
var bytes = 2
var cols  = 80
var rows  = 25
var size  = cols * rows * bytes

// initialize display based on frame buffer
var display = new Uint16Array(buff(start, size))
var screen  = new Screen(display)

var banner = fs.readFileSync(__dirname + '/banner.txt', 'utf8')
screen.write(banner)
screen.newline()

// welcome message
screen.write(' Welcome to Runtime')
prompt()

// run loop
while(true) {
  var num
    , key

  if (1 === poll()) // check for keyboard events
  if (num = inb(0x60)) // get key pressed
  if (key = map(num)) // convert key code to character
  if (key === '\n') prompt() // special handle newline
  else if (key === '\b') screen.backspace() // special handle backspace
  else if (key) screen.write(key) // write key to screen
  else screen.write('.') // write unknown characters as '.'
}

//---

function prompt() {
  screen.newline()
  screen.write(' >')
}
