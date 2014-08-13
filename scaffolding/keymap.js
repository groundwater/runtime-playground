// right-shift-down 0x36
// right-shift-up   0xb6
// left-shift-down  0x2a
// left-shift-up    0xaa
// delete-down      0x14
// delete-up        0x142
// up-arrow down=0xe0 up=0x48

var shift = false
var keymap = [
  '', '', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '', '\t',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\n', '', 'a', 's',
  'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '`', '', '\\', 'z', 'x', 'c', 'v',
  'b', 'n', 'm', ',', '.', '/', '', '', '', ' ', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
];

var keymapShift = [
  '', '', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '', '\t',
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '\n', '', 'A', 'S',
  'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '~', '', '|', 'Z', 'X', 'C', 'V',
  'B', 'N', 'M', '<', '>', '?', '', '', '', ' ', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
];

function key(code) {
  if (code === 0x36 || code === 0x2a) {
    // shift down
    shift = true
  } else if(code === 0xb6 || code === 0xaa) {
    // shift up
    shift = false
  } else if(code === 0xe) {
    // backspace
    return '\b'
  }

  if (code & 0x80) return;

  code &= 0x7F;

  return shift ? keymapShift[code] : keymap[code];
}

module.exports = key
