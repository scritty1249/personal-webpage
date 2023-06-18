// Shows the page content after all DOM elements load, and removes the loading animation
document.onreadystatechange = function () {
    var state = document.readyState;
    var pageDOM = document.getElementById("page");
    if (state == "interactive") {
        pageDOM.style.transform = "translate(0, -100vh)";
        pageDOM.style.visibility = "hidden";
    } else if (state == "complete") {
        var loadedDOM = document.getElementById("loaded");
        var loadingDOM = document.getElementById("loading");
        loadedDOM.style.transitionDuration = "1s";
        loadedDOM.style.height = "200vh";
        loadedDOM.style.width = "200vh";
        loadedDOM.style.transitionDuration = "none";
        setTimeout(function () {
            loadingDOM.style.visibility = "hidden";
            loadingDOM.remove();
            pageDOM.style.visibility = "visible";
            pageDOM.style.transitionDuration = "1s";
            pageDOM.style.transform = "translate(0, 0)";
            pageDOM.style.transitionDuration = "none";
        }, 600);
        var targets = document.getElementsByClassName("copy-btn");
        for (var i = 0; i < targets.length; i++) {
            targets[i].addEventListener("click", (e) => {
                copyText(e.target);
            })
        }
    }
};


function copyText(target) {
    try {
        navigator.clipboard.writeText(target.textContent);
    } catch {
        target.focus();
        target.select();
    }
}