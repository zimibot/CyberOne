const { app, BrowserWindow, dialog } = require('electron');
const isDev = require('electron-is-dev');
const checkInternetConnected = require('check-internet-connected');



exports.CreateBrowserWindow =  (options = {}, webPreferences = {}) => {
    let win = new BrowserWindow({
        ...options,
        minWidth: 1120,
        minHeight: 600,
        show: false,
        webPreferences: {
            ...webPreferences,
            nodeIntegration: true,
        },
    });

    win.setMenu(null)
    
    checkInternetConnected()
        .then(() => {
            if (!isDev) {
                win.webContents.once('did-finish-load', function () {
                    win.on('show', () => { win.focus(); });
                    win.show();
                });
            } else {
                win.show();
            }
        })
        .catch(() => {
            dialog.showMessageBox(win, {
                'type': 'error',
                'title': 'Errors',
                'message': "Your internet is offline",
                'buttons': [
                    'Try Again',
                    'Exit'
                ]
            })
                // Dialog returns a promise so let's handle it correctly
                .then((result) => {
                    if (result.response !== 0) {
                        app.quit()
                    }

                    if (result.response === 0) {
                        app.relaunch()
                        app.exit()
                    }
                })
        });



    return win
}