# runtimejs playground

> runtime playground lets you write kernel-space javascript,
> powered by npm and browserify

## install

1. get pre-requisites (on osx)

  ```bash
  brew install qemu
  ```
2. install runtime playground

  ```bash
  npm install -g runtime-playground
  ```

## usage

1. check if your system is ready

  ```bash
  runtime-playground doctor
  ```

2. run the demo

  ```bash
  runtime-playground demo
  ```

3. initialize a new project

  ```bash
  runtime-playground init
  ```

  this creates a scaffolding in your current directory.
  you can edit these files and run them with the `run` command.

4. run your project

  ```bash
  runtime-playground run init.js
  ```
