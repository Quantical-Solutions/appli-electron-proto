const { remote } = require('electron');

let closeModals = document.querySelectorAll('.close-modals')
let popin = remote.getCurrentWindow()

for (let i = 0; i < closeModals.length; i++) {
    closeModals[i].addEventListener('click', function(ev){
        popin.close();
    });
}