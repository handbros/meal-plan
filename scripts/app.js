window.addEventListener('load', () => {
    alert("danger", "<strong>공지사항</strong> 현재 체계 개발이 진행중인 관계로 원활한 서비스 이용이 어려울 수 있습니다.", true);
});

function alert(type, message, isDismissible = false) {
    let oldElement = document.getElementById("alert");
    if (oldElement != null) {
        oldElement.remove()
    }

    let newElement = `<div id="alert" class="alert alert-${type} ${isDismissible ? "alert-dismissible" : ""} fade show" role="alert"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill mb-1" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901"/></svg>${message} ${isDismissible ? "<button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='close'></button>" : ""}</div>`
    let newElementNode = new DOMParser().parseFromString(newElement, "text/html").body.firstElementChild;

    let workArea = document.getElementById("workarea");
    workArea.insertBefore(newElementNode, workArea.firstChild);
}