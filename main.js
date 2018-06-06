const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

let mainWindow
const path = require('path');
const url = require('url');

app.on('ready', createWindow)

function createWindow() {

  const displays = electron.screen.getAllDisplays();

  let secondaryScreen = null;
  let primaryScreen = null;

  for (var i = displays.length - 1; i >= 0; i--) {
    let actualDisplayBound = displays[i].bounds;
    if (actualDisplayBound.x == 0 && actualDisplayBound.y == 0) {
      //console.log("Primary Screen " + i,actualDisplayBound);
      primaryScreen = actualDisplayBound;
    }
    else {
      //console.log("Screen " + i,actualDisplayBound);
      secondaryScreen = actualDisplayBound;
    }

  }

  // Create the browser window.
  if (secondaryScreen != null)
    mainWindow = new BrowserWindow({ width: secondaryScreen.width - 40, height: secondaryScreen.height - 60, x: secondaryScreen.x + 20, y: secondaryScreen.y + 20, frame: true, autoHideMenuBar: true, fullscreen: false, resizable: true, title: 'CashPoint' });
  else
    mainWindow = new BrowserWindow({ width: 1240, height: 990, frame: true, resizable: true, autoHideMenuBar: false, title: 'Hello World' });
  //mainWindow = new BrowserWindow({ width: 1240, height: 1024, frame: true, resizable: true, title: 'CashPoint' })
  //mainWindow = new BrowserWindow({ width: 1920, height: 1040, frame: true, resizable: true, title: 'CashPoint' })

  //mainWindow.setMenu(null)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools. CTRL SHIFT I
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}