const { CreateBrowserWindow } = require("./BrowserWindow");
const path = require('path');
const isDev = require('electron-is-dev');
const url = require('url')


exports.CreateIndex = () => {
    let win = CreateBrowserWindow()
    let urlPath = url.format({
        pathname: path.join(__dirname, '../index.html'),
        slashes: true
    })
    win.loadURL(
        isDev
            ? 
            // `file:///C:/Users/funtsu/Documents/mss/build/index.html`
            `file:///D:/mss_project/build/index.html`
            // ? `http://localhost:8000/`
            : urlPath
    );
    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }
}