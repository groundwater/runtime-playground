#!/usr/bin/env node

require('shelljs/global')
require('colors')

config.fatal = true

var read = require('readline-sync')
var temp = require('tempfile')
var argv = require('minimist')(process.argv.slice(2))
var cmd  = argv._.shift()

if (cmd === 'doctor') {
  if (!which('qemu-system-x86_64')) {
    echo('please install qemu'.red)
    echo('on osx try: brew install qemu'.grey)
    echo('not ok'.red)
  }
  else {
    echo('ready to run'.green)
    echo('try: runtime-playground demo'.grey)
    exit(0)
  }
  exit(1)
}
else if (cmd === 'init') {
  var dir = argv._.pop() || process.cwd()
  ok = read.question('Create scaffolding in ' + dir.grey + '\nY/n > ').trim()
  if (ok !== 'n' && ok !== 'N') {
    doInit()
  }
  else {
    echo('Abort: Nothing Created'.yellow)
  }
}
else if (cmd === 'demo') {
  echo('switch to qemu to view your system'.green)
  echo('next: generate scaffolding with `runtime-playground init .`'.grey)
  doQemu(__dirname + '/demo/init.js')
}
else if (cmd === 'run') {
  var file = argv._.shift()
  if (!file) {
    echo('Please specify init file'.red)
    exit(1)
  }
  else if (!test('-e', file)) {
    echo(('File ' + file + ' does not exist').red)
    exit(1)
  }
  else {
    doQemu(file)
  }
}
else {
  echo(cat(__dirname + '/usage.txt').grey)
  exit(1)
}

function doQemu(file) {
  var tempfile   = temp('.js')
  var brfs = __dirname + '/node_modules/brfs'
  var browserify = __dirname + '/node_modules/.bin/browserify -t ' + brfs + ' ' + file + ' -o ' + tempfile

  if (exec(browserify).code !== 0) {
    echo('browserify error'.red)
    exit(1)
  }

  var qemu = [
    'qemu-system-x86_64',
    '-m 512',
    '-smp 1',
    '-s',
    '-boot order=d',
    '-netdev user,id=mynet0,hostfwd=tcp::5555-:80',
    '-device rtl8139,netdev=mynet0,mac=1a:46:0b:ca:bc:7c',
    '-kernel ' + __dirname + '/kernel.bin',
    '-initrd ' + tempfile,
    '-serial stdio',
    '-localtime',
    '-M pc',
  ].join(' ')

  exec(qemu)
}

function doInit() {
  echo('creating scaffolding'.green)
  cp('-R', __dirname + '/scaffolding/*', process.cwd())
}
