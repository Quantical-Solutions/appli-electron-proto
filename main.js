const { app, shell, BrowserWindow, globalShortcut } = require('electron');
const Nav = require('electron').Menu;
const path = require('path');
const fs = require('fs'); // Files explorer module
const ipc = require('electron').ipcMain;
let onlineStatusWindow, mainWindow;

/*
=========================================================================
=========================== Starting Window =============================
=========================================================================
 */

function createWindow () {

    const screenElectron = require('electron').screen;
    let mainScreen = screenElectron.getPrimaryDisplay();
    let dimensions = mainScreen.size;

    const win = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor:"inherit",
        show: true,
        frame: true,
        icon: __dirname + '/res/assets/media/img/logo.png',
        fullscreenable:true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    })

    win.loadURL(`file://${__dirname}/index.html`);
    //win.webContents.openDevTools()
}

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
