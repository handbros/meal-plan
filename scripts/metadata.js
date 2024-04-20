let version = "1.27.10"

function isDevMode() {
    return (window.location.hostname.toLowerCase() != "handbros.github.io")
}

document.getElementById("mpov-version").innerHTML = version;
document.getElementById("mpov-status").innerHTML = isDevMode() ? "개발판" : "배포판"
document.getElementById("mpov-provider").innerHTML = "공식 빌드"