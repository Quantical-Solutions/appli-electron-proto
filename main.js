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
        show: false,
        frame: true,
        fullscreenable:true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    })

    //win.webContents.openDevTools()
    //win.loadURL(`file://${__dirname}/index.html`);

    /*-----SplashScreen-----*/
    let splash = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: dimensions.width,
        height: dimensions.height,
        show:true,
        frame:true,
        fullscreenable:true,
        webPreferences: {
            devTools: true,
            nodeIntegration: true
        }
    });

    //splash.webContents.openDevTools()
    splash.loadURL(`file://${__dirname}/splash.html`);

    var mess = '';
    ipc.on('invokeAction', function(event, message){
        if (message === 'toApp') {

            win.loadURL(`file://${__dirname}/index.html`);
            win.once('ready-to-show', () => {
                splash.close();
                app.dock.show();
                win.show();
            });

        } else if (message === 'toSplash') {

            win.loadURL(`file://${__dirname}/splash.html`);
            win.once('ready-to-show', () => {
                win.close();
                app.dock.show();
                splash.show();
            });
        }

        event.sender.send('actionReply', mess);
    });
}

/*
=========================================================================
============================ App Statements =============================
=========================================================================
 */

if (app) {

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.dock.hide();
            app.quit()
        }
    })

    app.on('activate', () => {
        if (win === null) {
            createWindow()
            app.dock.hide();
        }
    })

    app.on('ready', () => {
        createWindow()
        app.dock.hide();
    });
}
