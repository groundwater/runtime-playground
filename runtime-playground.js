#!/usr/bin/env node
require('shelljs/global')

var argv = require('minimist')(process.argv.slice(2))
var cmd = argv._.shift()

if (cmd === 'doctor') {
  if (!which('qemu-system-x86_64')) {
    echo('please install qemu')
    echo('- on osx try: brew install qemu')
    echo('not ok')
  }
  else {
    echo('ready to run')
    echo('- try: runtime-playground run init.js')
    exit(0)
  }
  exit(1)
}
else if (cmd === 'init') {
  doInit()
}
else if (cmd === 'demo') {
  doQemu(__dirname + '/demo/init.js')
}
else if (cmd === 'run') {
  var file = argv._.shift()
  if (!file) {
    echo('Please specify init file')
    exit(1)
  }

  doQemu(file)
}
else {
  echo(cat(__dirname + '/usage.txt'))
  exit(1)
}

function doQemu(file) {
  var browserify = __dirname + '/node_modules/.bin/browserify ' + file + ' -o /tmp/runtime-init-bundle.js'

  if (exec(browserify).code !== 0) {
    echo('browserify error')
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
    '-initrd /tmp/runtime-init-bundle.js',
    '-serial stdio',
    '-localtime',
    '-M pc',
  ].join(' ')

  exec(qemu)
}

function doInit() {
  echo('creating scaffolding')
  cp('-R', __dirname + '/scaffolding/*', process.cwd())
}
