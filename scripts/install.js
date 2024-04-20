'use strict';

// Check the current environment.
const UA = window.navigator.userAgent || window.navigator.vendor || window.opera
const TYPE = getEnvironment();

function getEnvironment() {
    var ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('kakaotalk') > -1) {
        return "kakaotalk";
    } else if (ua.indexOf('android') > -1) {
        return "android";
    } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) {
        return "ios";
    } else {
        return "other";
    }
}

let deferredInstallPrompt = null;
const installButton = document.getElementById('btn-install');
const notInstallableNotice = document.getElementById('notice-not-installable');

if (TYPE != 'other') {
    installButton.addEventListener('click', installPWA);
    notInstallableNotice.style.display = 'none';
} else {
    installButton.style.display = 'none';
}

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
    installButton.removeAttribute('hidden');
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

    // Close the current window.
    if (TYPE == 'kakaotalk') {
        window.location.href = (/iPad|iPhone|iPod/.test(UA)) ? 'kakaoweb://closeBrowser' : 'kakaotalk://inappbrowser/close';
    } else if (type == 'ios') {
        window.open(", '_self', ");
        window.close();
    } else {
        window.open('about:blank','_self').self.close();
    }
}