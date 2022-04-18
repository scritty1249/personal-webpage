// Copied from stackoverflow
var siteWidth = 1280;
var siteScale = screen.width /siteWidth;

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+siteScale+'')

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

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function getHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}
// End of segment

var footer = document.getElementsByTagName("footer")[0]
var keyPhrases = [
    "johnson", // Sunday
    "jericho", // Monday
    "purple", // Tuesday
    "tungsten", // Wednesday
    "hot pocket", // Thursday
    "lithium ion", // Friday
    "wig", // Saturday
]

document.addEventListener('DOMContentLoaded', function() { // RUN ON PAGE START

// setting navbar size
    let navs = document.getElementsByTagName("nav")
    for(let nav=0; nav<navs.length; nav++) {
        let childs = navs[nav].childElementCount

        for(let navChild=0; navChild<childs; navChild++) {
            navs[nav].children[navChild].style.width = (100 / childs) + "%"
            if(navs[nav].children[navChild].className.includes('active')) {
                navs[nav].children[navChild].href = "javascript:void(0)" // disables the button for active page
            }
        }
    }
// styling dead links
    let deadLinks = document.getElementsByClassName('dead-link')
    for(let link=0; link<deadLinks.length; link++) {
        deadLinks[link].innerHTML = "<img src='./index_media/images/disconnect.png' width='20px'/>  -" + deadLinks[link].innerHTML +"-"
    }
}, false)

document.addEventListener('scroll', function() {
    if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) 
    {
        window.footer.style.visibility = "hidden"
    } else {
        window.footer.style.visibility = "visible"
    }
}, false)

function updateLogin() {
    let userIn = document.getElementById("login").value.toLowerCase()
    let day = new Date().getDay()
    if( userIn == keyPhrases[day] ) {
        document.getElementById("login").style.boxShadow = ""
        document.getElementById("login").style.border = "3px solid #00be9b"
        window.location.replace('./portal.html')
    } else {
        document.getElementById("login").style.boxShadow = "2px 4px 3.4px #333333" /* offset-x | offset-y | blur-radius | color */
    }
}