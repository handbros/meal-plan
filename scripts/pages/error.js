window.addEventListener('load', () => {
    var code = new URLSearchParams(location.search).get("code");
    var message = new URLSearchParams(location.search).get("message");

    if (code) {
        document.getElementById("code").innerHTML = code;
    }

    if (message) {
        document.getElementById("message").innerHTML = message;
    }
});