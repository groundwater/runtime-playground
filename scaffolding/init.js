/*
  welcome to your very first javascript kernel

  here is what you need to know to get started:

  1. pure javascript npm modules _should_ work
  2. there are builtin globals to access the system

    - buff(start: Int, len: Int) -> ArrayBuffer

      Allocates a buffer at address `start` of length `len`.
      You can allocate buffers anywhere in memory, and write to them.
      This _can_ mess up your system; you have access to everything.

    - eval(code: String) -> Value

      Execute code in the current context, returning the result.

    - inb(code: Integer) -> Int

      Issue an `in` assembly command.
      To query the keyboard for the last keypress use `inb(0x60)`.

    - poll() -> Int

      Grab any outstanding interrupts, or undefined.

  3. The VGA frame buffer is at address 0xB8000,
     has 80 columns, 25 rows, and is 2 bytes per cell.

     To allocate a TypedArray backed by the vga frame buffer, use:

     ```
     var start = 0xB8000
     var bytes = 2
     var cols  = 80
     var rows  = 25
     var size  = cols * rows * bytes
     var display = new Uint16Array(buff(start, size))
     ```

  I hope you have fun!

*/

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

// welcome message
screen.write('Welcome to Runtime')
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
