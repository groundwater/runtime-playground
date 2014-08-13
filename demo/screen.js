function Screen(buffer){
  this.buffer = buffer
  this.bytes  = 2
  this.cols   = 80
  this.rows   = 25
  this.color  = 0x0A
  //             row, col
  this.cursor = [ 0 ,  0 ]
}

Screen.prototype.clear = function(){
  var b = this.buffer
  for(var i=0; i<b.length; i++){
    b[i] = 0
  }
}

Screen.prototype.nextChar = function() {
  var row = this.cursor[0]
  var col = this.cursor[1]

  if (row === this.rows) {
    this.cursor[0] = row + 1
    this.cursor[1] = 0
  } else {
    this.cursor[1] = col + 1
  }
}

Screen.prototype.backspace = function () {
  if (this.cursor[1] === 0) return

  this.cursor[1]--
  this.putChar(' ')
}

Screen.prototype.linearChar = function () {
  return this.cursor[0] * this.cols + this.cursor[1]
}

Screen.prototype.newline = function () {
  this.cursor[0]++
  this.cursor[1] = 0
}

Screen.prototype.returnOrClear = function (){
  if (this.cursor[0] >= this.rows - 1) {
    this.clear()
    this.startChar()
    this.cursor[0] = 0
  } else {
    this.returnChar()
  }
}

Screen.prototype.startChar = function(){
  this.cursor[1] = 0
}

Screen.prototype.putChar = function (c) {
  var pos = this.linearChar()
  this.buffer[pos] = this.color << 8 | c.charCodeAt(0)
}

Screen.prototype.writeChar = function (c) {
  var pos = this.linearChar()
  this.buffer[pos] = this.color << 8 | c.charCodeAt(0)
  this.nextChar()
}

Screen.prototype.write = function (line) {
  for(var i=0; i<line.length; i++) {
    var char = line[i]
    if (char === '\n') {
      this.returnOrClear()
    } else {
      this.writeChar(char)
    }
  }
}

module.exports = Screen
