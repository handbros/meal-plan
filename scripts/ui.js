// ==================================================
// ALERT
// ==================================================
function openAlert(type, message, isDismissible = false) {
    let oldElement = document.getElementById("alert");
    if (oldElement) {
        oldElement.remove()
    }

    let newElement = `<div id="alert" class="alert alert-${type} ${isDismissible ? "alert-dismissible" : ""} fade show" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill mb-1" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/></svg>${message} ${isDismissible ? "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='close' onclick='closeAlert()'></button>" : ""}</div>`
    let newElementNode = new DOMParser().parseFromString(newElement, "text/html").body.firstElementChild;

    let workArea = document.getElementById("workarea");
    if (workArea) {
        workArea.insertBefore(newElementNode, workArea.firstChild);
    }
}

function closeAlert() {
    window.sessionStorage.setItem("MPOV_IS_ALERT_CLOSED", true);
}

// ==================================================
// STATUS
// ==================================================
function displayNetworkStatus(isOnline) {
    let oldElement = document.getElementById("netstatus-badge");
    if (oldElement) {
        oldElement.remove()
    }

    let badgeOnline = `<span id="netstatus-badge" class="badge rounded-pill text-bg-success ms-1" style="font-size: 0.5em">ONLINE</span>`;
    let badgeOffline = `<span id="netstatus-badge" class="badge rounded-pill text-bg-dark ms-1" style="font-size: 0.5em">OFFLINE</span>`;
    let badgeNode = new DOMParser().parseFromString(isOnline ? badgeOnline : badgeOffline, "text/html").body.firstElementChild;

    let navbarHeader = document.getElementById("navbar-header");
    if (navbarHeader) {
        navbarHeader.lastChild.after(badgeNode);
    }
}

// ==================================================
// ANIMATIONS
// ==================================================
function rippleAnimationHandler(e) {
    // Find a button(parent).
    var button = e.target.closest(".btn");
    if (!button) {
        return;
    }

    // Remove the ripple animation(BEFORE).
    var oldElement = document.getElementById("ripple-animation");
    if (oldElement) {
        oldElement.remove();
    }

    // Show the ripple animation.
    var ripple = document.createElement("div");
    ripple.id = "ripple-animation"
    ripple.classList.add("ripple");

    var xpos = e.offsetX - (button.getBoundingClientRect().left - e.target.getBoundingClientRect().left);
    var ypos = e.offsetY - (button.getBoundingClientRect().top - e.target.getBoundingClientRect().top);
    ripple.setAttribute("style", "top: " + ypos + "px; left: " + xpos + "px");
    button.appendChild(ripple);

    // Remove the ripple animation(AFTER).
    setTimeout(() => {if (ripple) { ripple.remove()}}, 1000);
    clearTimeout();
}

window.addEventListener('load', () => {
    // Note: Add ripple animation handler.
    document.addEventListener("mousedown", rippleAnimationHandler);

    // Note: If the 'is_alert_closed' is true, do not open the alert.
    if (window.sessionStorage.getItem("MPOV_IS_ALERT_CLOSED") != "true") {
        openAlert("danger", "<strong>공지사항</strong> 현재 체계 개발이 진행중입니다. 원활한 서비스 이용이 어려울 수 있습니다.", true);
    }
});