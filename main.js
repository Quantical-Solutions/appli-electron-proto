/*
=========================================================================
============================ Params setters =============================
=========================================================================
 */

const { app, shell, BrowserWindow, globalShortcut } = require('electron');
const Nav = require('electron').Menu;
const path = require('path');
const fs = require('fs'); // Files explorer module
const ipc = require('electron').ipcMain;
let onlineStatusWindow, win;

/*
=========================================================================
============================ Create Windows =============================
=========================================================================
 */

function createWindow () {

    let mainScreen = require('electron').screen.getPrimaryDisplay();
    let dimensions = mainScreen.size;

    win = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor:"inherit",
        show: true,
        frame: true,
        fullscreenable:true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    })

    //win.webContents.openDevTools()
    win.loadURL(`file://${__dirname}/index.html`);
}

/*
=========================================================================
============================ App Statements =============================
=========================================================================
 */

if (app) {

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

    app.on('ready', () => {
        createWindow();
    });
}
