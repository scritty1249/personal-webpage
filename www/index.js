// Copied from stackoverflow
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('page').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('loading').style.visibility = "hidden";
            document.getElementById('page').style.visibility = "visible";
            //init() // Broken
        }, 1000);
    }
}
// End of segment
function init() {
    let elements = document.body.getElementsByClassName("growtext")

    for(let i=0; i<elements.length; i++) { // iterate through each target element
        let element = toString(elements[i].innerHTML)
        let characters = ""
        for(let k=0; k<element.length; k++) {
            characters = characters + "<span class='growletter'>" + element[k] + "</span>"
        }

        elements[i].innerHTML = characters
    }
}