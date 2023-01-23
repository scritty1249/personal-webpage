// Shows the page content after all DOM elements load, and removes the loading animation
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('page').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('loading').style.visibility = "hidden";
            document.getElementById('loading').remove();
            document.getElementById('page').style.visibility = "visible";
        }, 1000);
    }
}