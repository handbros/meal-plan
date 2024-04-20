var rippleEffect = (function(){
    var className, ripple;
    
    className = 'btn';
    ripple = document.createElement("div")
    ripple.classList.add('ripple')
    
    document.addEventListener('mousedown', function(e) {
        var parent = e.target.parentElement
        if (e.target.classList.contains(className)) {
            ripple.setAttribute("style", "top: " + e.offsetY + "px; left: " + e.offsetX + "px");
            e.target.appendChild(ripple)
        } else if (parent.target.classList.contains(className)) {
            ripple.setAttribute("style", "top: " + e.offsetY + "px; left: " + e.offsetX + "px");
            parent.appendChild(ripple)
        }
    })
})();

function navigate(navigationSource) {
    var offcanvas = document.getElementById("offcanvasSideBar");
    var openedCanvas = bootstrap.Offcanvas.getInstance(offcanvas);
    openedCanvas.hide();

    setTimeout(() => location.href = navigationSource, 100);
}