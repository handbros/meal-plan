'use strict';

let deferredInstallPrompt = null;

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
    // CODELAB: Add code to save event & show the install button.
    deferredInstallPrompt = evt;
}

/**
 * Event handler for butInstall - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
    // CODELAB: Add code show install prompt & hide the install button.
    deferredInstallPrompt.prompt();

    // CODELAB: Log user response to prompt.
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt', choice);
            } else {
                console.log('User dismissed the A2HS prompt', choice);
            }
            deferredInstallPrompt = null;
        });
}

// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', onAfterAppInstalled);

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function onAfterAppInstalled(evt) {
    // CODELAB: Add code to log the event
    console.log('The application was installed.', evt);

    // FLAG: If the installation is complete.

}

window.addEventListener('load', () => {
    let installButton = document.getElementById('btn-install');
    installButton.addEventListener('click', installPWA);

    let divLoading = document.getElementById('div-loading');
    setTimeout(() => divLoading.style.display = 'none', Math.floor(Math.random() * (1500 - 500)) + 500);
});