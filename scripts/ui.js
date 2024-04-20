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
    } else if(parent && parent.className){
        if(!parent.classList.contains(className)){
            return findClassFromParent(parent.parentNode, className);
        }else {
            return true;
        }
    }
}