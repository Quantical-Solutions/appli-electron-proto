/*
=========================================================================
============================ Params setters =============================
=========================================================================
 */

const { app, BrowserWindow } = require('electron')
const Nav = require('electron').Menu
const ipc = require('electron').ipcMain
const path = require('path')
const dblocation = path.join(__dirname, 'db')
const explorer = require('fs')
let win

app.commandLine.appendSwitch('--ignore-gpu-blacklist')

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
        backgroundColor: '#191919',
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

    /*-----Splash Screen-----*/
    let splash = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: dimensions.width*2/3,
        height: dimensions.height*2/3,
        backgroundColor: '#191919',
        show:true,
        frame:true,
        fullscreenable:false,
        webPreferences: {
            devTools: true,
            //enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    /*-----Login Screen-----*/
    let login = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: '#191919',
        show:false,
        frame:true,
        fullscreenable:true,
        webPreferences: {
            devTools: true,
            //enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    //login.webContents.openDevTools()

    //login.webContents.openDevTools()
    splash.loadURL(`file://${__dirname}/splash.html`)

    var mess = '';
    ipc.on('invokeAction', function(event, message){

        if (message === 'toApp') {

            win = new BrowserWindow({
                titleBarStyle: 'hidden',
                width: dimensions.width,
                height: dimensions.height,
                backgroundColor: '#191919',
                show: false,
                frame: true,
                fullscreenable:true,
                webPreferences: {
                    devTools: true,
                    //enableRemoteModule: true,
                    nodeIntegration: true
                }
            })

            win.loadURL(`file://${__dirname}/index.html`)
            win.once('ready-to-show', () => {

                if (!login.isDestroyed()) {

                    login.close()
                }

                app.dock.show()
                win.show()
                //modal('test', 480, 336);
            });

        } else if (message === 'toLogin') {

            login = new BrowserWindow({
                titleBarStyle: 'hidden',
                width: dimensions.width,
                height: dimensions.height,
                show:false,
                frame:true,
                backgroundColor: '#191919',
                fullscreenable:true,
                webPreferences: {
                    devTools: true,
                    //enableRemoteModule: true,
                    nodeIntegration: true
                }
            });

            login.loadURL(`file://${__dirname}/login.html`)
            login.once('ready-to-show', () => {

                if (!splash.isDestroyed()) {

                    splash.close()

                } else if (!win.isDestroyed()) {

                    win.close()
                }

                app.dock.show()
                login.show()
            });
        }

        event.sender.send('actionReply', mess)
    });

    ipc.on('invokeActionModal', function(event, type){

        modal(
            type,
            dimensions.width*2/3,
            dimensions.height*2/3
        )
        event.sender.send('actionReply', mess)
    });

    ipc.on('invokeActionViewer', function(event, data){

        dicomViewer(
            dimensions.width,
            dimensions.height
        )
    });

    ipc.on('invokeActionCloseApp', function(event){
        app.quit()
    });

    ipc.on('invokeActionDB', function(event, array){

        var type = array[0],
            table = array[1]

        if (type === 'read') {

            mess = getDB(table)

        } else if (type === 'write') {

            var obj = array[2]
            updateDB(table, obj)
            mess = obj
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
            app.dock.hide()
        }
    })

    app.on('ready', () => {
        createWindow()
        app.dock.hide()
    });
}

/*
=========================================================================
=========================== Paramètres POP-UP ===========================
=========================================================================
*/

let newWindow = null

function modal(type, width, height) {

    if (newWindow) {
        newWindow.focus()
        return
    }

    newWindow = new BrowserWindow({
        modal:false,
        height: height,
        resizable: false,
        width: width,
        titleBarStyle: 'hidden',
        backgroundColor: '#191919',
        minimizable: false,
        fullscreenable: false,
        frame:true,
        draggable: true,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            devTools: true
        }
    });

    //newWindow.webContents.openDevTools()
    newWindow.loadURL(`file://${__dirname}/res/modals/` + type.toLowerCase() + `.html`)

    newWindow.on('closed', () => {
        newWindow = null;
    });

    newWindow.on('ready', () => {
        //
    });
}

/*
=========================================================================
============================= Dicom Viewer ==============================
=========================================================================
*/

let viewer = null

function dicomViewer(width, height) {

    if (viewer) {
        viewer.focus()
        return
    }

    viewer = new BrowserWindow({
        modal:false,
        height: height,
        resizable: true,
        width: width,
        backgroundColor: '#191919',
        titleBarStyle: 'hidden',
        minimizable: false,
        fullscreenable: true,
        frame:true,
        draggable: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            devTools: true
        }
    });

    //viewer.webContents.openDevTools()
    viewer.loadURL(`file://${__dirname}/data/dav/viewers/mobile/index.html`)

    viewer.on('closed', () => {
        viewer = null
    });

    viewer.on('ready', () => {
        //
    });
}

/*
=================================================================================
================================ Local Storage Init =============================
=================================================================================
 */

function getDB(table) {

    let file = explorer.readFileSync((dblocation + '/' + table + '.json'), 'utf-8')
    if (file) {
        try {
            let obj = JSON.parse(file)
            return obj
        } catch (e) {
            console.log("Parsing error:", e)
        }
    }
}

function updateDB(table, obj) {

    let json = JSON.stringify(obj)

    try {
        explorer.writeFile(dblocation + '/' + table + '.json', json, (err) => {
            if (err) {
                console.log("An error occurred creating the file " + err.message)
            }
            console.log("The file has been successfully saved")
            return obj
        });
    } catch (e) {
        console.log("Parsing error:", e)
    }
}
