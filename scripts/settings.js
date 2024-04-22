let settings = {

};

window.addEventListener('load', () => {
    let settingsJson = window.localStorage.getItem("MPOV_SETTINGS");

    if (settingsJson != null) {
        settings = JSON.parse(settingsJson);
    }
});

window.addEventListener('pagehide', () => {
    let settingsJson = JSON.stringify(settings);
    window.localStorage.setItem("MPOV_SETTINGS", settingsJson);
});