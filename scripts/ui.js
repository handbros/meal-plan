window.addEventListener('load', () => {
    // Note: Add event listeners to detect network connection changes.
    displayNetworkStatus(navigator.onLine);

    window.addEventListener("online", () => {
        displayNetworkStatus(true);
    });
    
    window.addEventListener("offline", () => {
        displayNetworkStatus(false);
    });

    // Note: If the 'isAlertClosed' is true, do not open the alert.
    if (sessionStorage.getItem("isAlertClosed") != "true") {
        openAlert("danger", "<strong>공지사항</strong> 현재 체계 개발이 진행중입니다. 원활한 서비스 이용이 어려울 수 있습니다.", true);
    }
});

const { setItem, getItem, removeItem, clear, length, key } = sessionStorage;

var rippleEffect = (function(){
    var className, ripple;
    
    className = 'btn';
    ripple = document.createElement("div")
    ripple.classList.add('ripple')
    
    document.addEventListener('mousedown', function(e) {
        var parent = e.target.parentElement
        if (findClassFromParent(e.target.parentNode, className) == true ? true : false) {
            ripple.setAttribute("style", "top: " + e.target.parentNode.offsetY + "px; left: " + e.target.parentNode.offsetX + "px");
            e.target.appendChild(ripple)
        } else if (e.target.classList.contains(className)) {
            ripple.setAttribute("style", "top: " + e.offsetY + "px; left: " + e.offsetX + "px");
            e.target.appendChild(ripple)
        }
    })
})();

function findClassFromParent(parent, className) {           
    if (parent && !parent.className) {
        return findClassFromParent(parent.parentNode, className);
    } else if (parent && parent.className){
        if (!parent.classList.contains(className)){
            return findClassFromParent(parent.parentNode, className);
        }else {
            return true;
        }
    }
}

function displayNetworkStatus(isOnline) {
    let badgeOnline = `<span class="badge rounded-pill text-bg-success ms-1" style="font-size: 0.5em">ONLINE</span>`;
    let badgeOffline = `<span class="badge rounded-pill text-bg-dark ms-1" style="font-size: 0.5em">OFFLINE</span>`;
    let badgeNode = new DOMParser().parseFromString(isOnline ? badgeOnline : badgeOffline, "text/html").body.firstElementChild;
    
    let navbarHeader = document.getElementById("navbar-header");
    navbarHeader.lastChild.after(badgeNode);
}

function openAlert(type, message, isDismissible = false) {
    let oldElement = document.getElementById("alert");
    if (oldElement != null) {
        oldElement.remove()
    }

    let newElement = `<div id="alert" class="alert alert-${type} ${isDismissible ? "alert-dismissible" : ""} fade show" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill mb-1" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/></svg>${message} ${isDismissible ? "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='close' onclick='closeAlert()'></button>" : ""}</div>`
    let newElementNode = new DOMParser().parseFromString(newElement, "text/html").body.firstElementChild;

    let workArea = document.getElementById("workarea");
    workArea.insertBefore(newElementNode, workArea.firstChild);
}

function closeAlert() {
    sessionStorage.setItem("isAlertClosed", true);
}