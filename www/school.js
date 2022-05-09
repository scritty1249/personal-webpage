// Defining functions and variables
const queryParams = new URLSearchParams(window.location.search)
const isTouchScreen = ('ontouchstart' in window ) ||( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 )
function setViewport() { 
    var siteWidth = 1280;
    var siteScale = screen.width / siteWidth;
    document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + siteScale + '')
}
function createAssignment(queryDetails) {
    let schoolClassName = queryDetails[0]
    let schoolAssignmentName = queryDetails[1]
    let schoolAssignmentTitle = schoolAssignmentName.replace(/[_-]/g, " "); 
    let assignmentIFrame = document.createElement('iframe')
    assignmentIFrame.src = window.location.origin + '/school-assignments/' + schoolClassName + '/' + schoolAssignmentName + '/main.html'
    assignmentIFrame.title = schoolAssignmentTitle
    assignmentIFrame.width = '90%'
    assignmentIFrame.height = '1080px'
    assignmentIFrame.id = 'assignment-iframe'

    return assignmentIFrame
}
function setIFrameSize(assignmentIFrame) {
    let height = assignmentIFrame.contentWindow.document.body.scrollHeight
    let width = assignmentIFrame.contentWindow.document.body.scrollWidth
    console.log("Width: " + toString(width) + "\nHeight: " + toString(height))
    assignmentIFrame.width = width
    assignmentIFrame.height = height
}
function getAssignment() {
    let schoolClassName = queryParams.get('class')
    let schoolAssignmentName = queryParams.get('assignment')
    return [schoolClassName, schoolAssignmentName]
}
function checkRef() {
    return (queryParams.has('class') && queryParams.has('assignment'))
}

// Loading screen
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('page').style.visibility = "hidden";
    } else if (state == 'complete') {
        setTimeout(function () {
            document.getElementById('interactive');
            document.getElementById('loading').style.visibility = "hidden";
            document.getElementById('page').style.visibility = "visible";
        }, 1000);
    }
}

// Preparing webpage (pre load)
window.onload = function() { // Add new elements before styling
    // Allowing CORS for the navbar html file
    let corsHeader = document.createElement('meta')
    let originPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1)
    corsHeader.setAttribute('http-equiv', 'Access-Control-Allow-Origin')
    corsHeader.setAttribute('content', originPath + "./nav.html")
    document.getElementsByTagName("head")[0].appendChild(corsHeader)
    console.log("Set header: " + String(corsHeader))

    // Styling dead links
    let deadLinks = document.getElementsByClassName('dead-link')
    for (let link = 0; link < deadLinks.length; link++) {
        deadLinks[link].innerHTML = "<img src='./index_media/images/disconnect.png' width='20px'/>  &nbsp;" + deadLinks[link].innerHTML + "&nbsp;"
    }

    // Check for valid assignment URL + loading assignment iframe
    console.log(window.location.search)
    if (checkRef()) {
        document.getElementById('404-msg').remove()
        document.getElementById('assignment').appendChild( createAssignment(getAssignment()) )
        setIFrameSize(document.getElementById('assignment-iframe'))
    } else {
        document.getElementById('assignment').remove()
    }

}

// Setting up webpage (post load)
document.addEventListener('DOMContentLoaded', function() { // Style stuff
    // setting navbar size
    let navs = document.getElementsByTagName("nav")
    for (let nav = 0; nav < navs.length; nav++) {
        let childs = navs[nav].childElementCount

        for (let navChild = 0; navChild < childs; navChild++) {
            navs[nav].children[navChild].style.width = (100 / childs) + "%"
            if (navs[nav].children[navChild].className.includes('active')) {
                navs[nav].children[navChild].href = "javascript:void(0)" // disables the button for active page
            }
        }
    }
}, false)