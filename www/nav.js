window.onload = function() { // Add new elements before styling
    // styling dead links
    let deadLinks = document.getElementsByClassName('dead-link')
    for (let link = 0; link < deadLinks.length; link++) {
        deadLinks[link].innerHTML = "<img src='./index_media/images/disconnect.png' width='22px'/>  &nbsp;" + deadLinks[link].innerHTML + "&nbsp;"
        deadLinks[link].href = "./404.html"
    }
    
    // setting active tabs
    setActiveTab()
}

document.addEventListener('DOMContentLoaded', function() { // Style stuff
    setActiveTab()
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

function setActiveTab() {
    // set current active page in navbar
    let currentName = window.parent.location.pathname.split('/').pop()
    let navLinks = document.getElementsByTagName('nav')[0].children
    if (currentName == 'portal.html') { currentName = 'login.html'} // set portal and login page to the same thing
    if ( window.parent.location.pathname == '/' ) { currentName = 'index.html' }
    if (currentName == '404.html') {
        for (let i=0; i<navLinks.length; i++) {
            if (navLinks[i].classList.contains('dead-link')) {
                navLinks[i].classList.add("active")
                navLinks[i].href = "javascript:void(0)" // disables the button for dead pages
            }
        }
    } else {
        for (let i=0; i<navLinks.length; i++) {
            if (navLinks[i].hasAttribute('href')) {
                let linkName = navLinks[i].href.split('/').pop()
                if (linkName == currentName) {
                    navLinks[i].classList.add("active")
                }
            }
        }
    }
}
