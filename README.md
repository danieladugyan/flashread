Flashread
===============
**Status: Experimental.**

App that lets you read a text one word at a time to potentially increase reading speed.
![Demo](https://media.giphy.com/media/gIlRePkz3wEGLTmffB/source.gif)

## Installation
Clone the repo and install the dependencies using `npm i`.

## Usage
Run `npm start` to start the app. Go ahead and write some text, adjust your reading speed using the slider (default is 380 WPM) and then press Submit. The text will be displayed one word at a time.

## Build
Run `npm build` to build a windows app with default settings. If you want to build for any other platform, or change the build settings, check out [electron-builder](https://www.electron.build/).

## To-do
- Adjust speed based on punctuation and character count
- Pause playback
- Skip to any part of the text
- Toggle OpenDyslexic typeface
- Keyboard controls: forward, back, pause.
