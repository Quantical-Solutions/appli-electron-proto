/*
========================================================
====================== Script Utils ====================
========================================================
 */

const { remote } = require('electron');
let ipcModal = require('electron').ipcRenderer;
let ipcLogin = require('electron').ipcRenderer;
let db;

let login = document.querySelector('#login-body'),
    main = document.querySelector('#matrix-body'),
    setContentContainer = (main) ? '#matrix-main' : '#login-main',
    setStartSectionMenuItem = (main) ? '#carnet-menu' : '#login-menu',
    setStartSection = (main) ? '#carnet' : '#login';

window.navigation = window.navigation || {}, function(n) {
    navigation.menu = {
        constants: {
            sectionTemplate: '.section-template',
            contentContainer: setContentContainer,
            startSectionMenuItem: setStartSectionMenuItem,
            startSection: setStartSection
        },

        importSectionsToDOM: function() {
            const links = document.querySelectorAll('link[rel="import"]')
            Array.prototype.forEach.call(links, function (link) {
                let template = link.import.querySelector(navigation.menu.constants.sectionTemplate)
                let clone = document.importNode(template.content, true)
                document.querySelector(navigation.menu.constants.contentContainer).appendChild(clone)
            })
        },

        setMenuOnClickEvent: function () {
            document.body.addEventListener('click', function (event) {
                if (event.target.dataset.section) {
                    navigation.menu.hideAllSections()
                    navigation.menu.showSection(event)
                }
            })
        },

        showSection: function(event) {
            const sectionId = event.target.dataset.section
            $('#' + sectionId).show()
            $('#' + sectionId + ' section').show()
        },

        showStartSection: function() {
            $(this.constants.startSectionMenuItem).click()
            $(this.constants.startSection).show()
            $(this.constants.startSection + ' section').show()
        },

        hideAllSections: function() {
            $(this.constants.contentContainer + ' section').hide()
        },

        init: function() {
            this.importSectionsToDOM()
            this.setMenuOnClickEvent()
            this.showStartSection()
        }
    };

    n(function() {
        navigation.menu.init()
    })

}(jQuery);

let goToApp = document.querySelector('#launch-app')
let goToLogin = document.querySelector('#launch-login')
if (goToApp) {
    goToApp.onclick = function(ev) {
        ipcLogin.send('invokeAction', 'toApp');
    }
}
if (goToLogin) {
    goToLogin.onclick = function(ev) {
        ipcLogin.send('invokeAction', 'toLogin');
    }
}

function remoteGetDB(table) {

    ipcLogin.once('actionReply', function (event, response) {
        generateData(response)
    });
    ipcLogin.send('invokeActionDB', ['read', table]);
}

function remoteUpdateDB(table, obj) {

    ipcLogin.once('actionReply', function (event, response) {
        generateData(obj)
    });
    ipcLogin.send('invokeActionDB', ['write', table, obj]);
}

function generateData(obj) {

    db = obj
    console.log(db)
}

/*
========================================================
==================== Script JavaScript =================
========================================================
 */

let showModals = document.querySelectorAll('.show-modals')
let closeModals = document.querySelectorAll('.close-modals')
let exitApp = document.querySelector('#exit')
let popin = remote.getCurrentWindow()

for (let i = 0; i < showModals.length; i++) {
    showModals[i].addEventListener('click', function(ev){
        let elmt = ev.currentTarget,
            data = elmt.dataset.fn;
        ipcModal.send('invokeActionModal', data);
    });

}

for (let i = 0; i < closeModals.length; i++) {
    closeModals[i].addEventListener('click', function(ev){
        popin.close();
    });
}

function openModal() {
    var data = showModals[i].dataset.fn
    ipcModal.send('invokeActionModal', data);
}

if (exitApp) {
    exitApp.addEventListener('click', function(ev){
        ipcModal.send('invokeActionCloseApp', 'close');
    });
}

if (document.querySelector('#splash-body')) {

    remoteGetDB('traveler')
    var json = {"text": "un petit sexe"}
    remoteUpdateDB('traveler', json)
}
