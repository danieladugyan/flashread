const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, remote} = electron;

let index;

// Wait for app to load.
app.on("ready", function () {
  // Create index window.
  index = new BrowserWindow({width:1280, height:720, title:"Flashread",
                            frame:false, minWidth: 350, minHeight: 250, webPreferences: {
                              nodeIntegration: true
                          }});
  index.loadFile("index.html");
  index.webContents.openDevTools();

  // Quit app when index is closed.
  index.on("close", function () {
    app.quit();
  });
});

// Catch window control button events.
ipcMain.on("button:minimize", function () {
  index.minimize();
});

ipcMain.on("button:minmax", function () {
  if (index.isMaximized()) {
    index.unmaximize();
  } else {
    index.maximize();
  }
});

ipcMain.on("button:close", function () {
  app.quit();
});
