const VERSION = "1.48.31"

window.addEventListener('load', () => {
    document.getElementById("mpov-version").innerHTML = VERSION;
    document.getElementById("mpov-status").innerHTML = app.isDevMode ? "개발판" : "배포판"
    document.getElementById("mpov-provider").innerHTML = "공식 빌드"
});