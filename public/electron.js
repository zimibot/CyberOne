

const { app, BrowserWindow, dialog, autoUpdater } = require('electron');
const { CreateIndex } = require('./helper');
const { NsisUpdater } = require('electron-updater')
const log = require('electron-log');


autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const dialogs = (text) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Update'],
        title: text,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    };

    dialog.showMessageBox(dialogOpts, (response) => {
        app.quit()
    });
}
app.whenReady().then(() => {
    // const options = {
    //     provider: 'generic',
    //     url: 'http://157.245.49.164:8080/update/1.2.6/'
    // }

    // const autoUpdater = new NsisUpdater(options)


    // autoUpdater.checkForUpdatesAndNotify()

    // autoUpdater.on('checking-for-update', () => {
    //     dialogs('Checking for update...');
    // });
    // autoUpdater.on('update-available', () => {
    //     dialogs('Update available.');
    // });
    // autoUpdater.on('update-not-available', () => {
    //     dialogs('update-not-available.');
    //     CreateIndex()
    // });
    // autoUpdater.on('update-downloaded', () => {
    //     dialogs('Update success download.');
    // });
    
    CreateIndex()
});



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bars to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});