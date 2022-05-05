notMyShit = {
    // NONE OF THIS CODE IS MINE
    // EVERYTHING HAS BEEN PASTED INTO HERE WITH
    // ONLY SLIGHT MODIFICATIONS, IF ANY
    // I did set the names of everything myself
    // though- variables included.      :)

    loadFile: function(filePath) { // Source: https://stackoverflow.com/questions/36921947/read-a-server-side-file-using-javascript
        var result = null;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();
        if (xmlhttp.status==200) {
          result = xmlhttp.responseText;
        }
        return result;
    },
    getText: function(urlText) { // Source: https://stackoverflow.com/questions/28828029/html-read-txt-file-from-url-location-in-javascript
        // read text from URL location
        var request = new XMLHttpRequest();
        request.open('GET', urlText, true);
        request.send(null);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                if (type.indexOf("text") !== 1) {
                    return request.responseText;
                }
            }
        }
        request.send(null)
    },
    setViewport: function() { 
        var siteWidth = 1280;
        var siteScale = screen.width / siteWidth;
        document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + siteScale + '')
    },
    sha256: function sha256(ascii) { // Source: https://geraintluff.github.io/sha256/
        function rightRotate(value, amount) {
            return (value >>> amount) | (value << (32 - amount));
        };

        var mathPow = Math.pow;
        var maxWord = mathPow(2, 32);
        var lengthProperty = 'length'
        var i, j; // Used as a counter across the whole file
        var result = ''

        var words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;

        // caching results is optional - remove/add slash from front of this line to toggle
        // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
        // (we actually calculate the first 64, but extra values are just ignored)
        var hash = sha256.h = sha256.h || [];
        // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
        var k = sha256.k = sha256.k || [];
        var primeCounter = k[lengthProperty];

        var isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) {
                    isComposite[i] = candidate;
                }
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }

        ascii += '\x80' // Append Ƈ' bit (plus zero padding)
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return; // ASCII check: only accept characters in range 0-255
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
        words[words[lengthProperty]] = (asciiBitLength)

        // process each chunk
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
            var oldHash = hash;
            // This is now the undefinedworking hash", often labelled as variables a...g
            // (we have to truncate as well, otherwise extra entries at the end accumulate
            hash = hash.slice(0, 8);

            for (i = 0; i < 64; i++) {
                var i2 = i + j;
                // Expand the message into 64 words
                // Used below if 
                var w15 = w[i - 15],
                    w2 = w[i - 2];

                // Iterate
                var a = hash[0],
                    e = hash[4];
                var temp1 = hash[7] +
                    (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                    +
                    ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                    +
                    k[i]
                    // Expand the message schedule if needed
                    +
                    (w[i] = (i < 16) ? w[i] : (
                        w[i - 16] +
                        (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                        +
                        w[i - 7] +
                        (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                    ) | 0);
                // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                    +
                    ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

                hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
                hash[4] = (hash[4] + temp1) | 0;
            }

            for (i = 0; i < 8; i++) {
                hash[i] = (hash[i] + oldHash[i]) | 0;
            }
        }

        for (i = 0; i < 8; i++) {
            for (j = 3; j + 1; j--) {
                var b = (hash[i] >> (j * 8)) & 255;
                result += ((b < 16) ? 0 : '') + b.toString(16);
            }
        }
        return result;
    }
}

const isTouchScreen = ('ontouchstart' in window ) ||( navigator.maxTouchPoints > 0 ) || ( navigator.msMaxTouchPoints > 0 )
const keyUrl = 'https://storage.cloud.google.com/personal-webpage-media/data/keys.txt'
const fuckingWindows = '\r\n'
const currentDay = new Date().getDay()
const angerTolerance = 20
var keyPhrases = loadKeyPhrases(keyUrl).split(fuckingWindows)
var keyPresses = 0


const delay = millis => new Promise((resolve, reject) => { setTimeout(_ => resolve(), millis) })

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

notMyShit.setViewport()
var footer = document.getElementsByTagName("footer")[0]

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

    // Insert footer data
    let footer = document.getElementsByTagName('footer')[0]
    footer.innerHTML = notMyShit.loadFile('./footer.html')

    // Initalize Youtube API if iframes (assumed to be video players) exist on the page
    initYT()
}

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

function loadKeyPhrases(keyFile) {
    if (window.location.pathname.split('/').pop() == "login.html") {
        // Load up the keys
        let rawFile = String(notMyShit.getText(keyFile))
        console.log(rawFile)
        return rawFile
    } else {
        console.log("Couldn't get keys")
        return "empty"
    }
}

function getCurrentFile() {
    let path = this.window.location.href
    return path.split("/").pop()
}

function updateLogin() {
    // Get value in the textarea
    let loginBox = document.getElementById("login")
    let userIn = notMyShit.sha256(loginBox.value.toLowerCase())
    if (keyPhrases[currentDay] == userIn) {
        loginBox.style.boxShadow = ""
        loginBox.style.border = "4.5px solid #00be9b"
        window.location.replace('./portal.html')
    } else {
        loginBox.style.boxShadow = "2px 4px 3.4px #333333" /* offset-x | offset-y | blur-radius | color */
        console.log(userIn + " | " + keyPhrases[currentDay])
    }
    keyPresses += 1
    let teaserMessage = document.getElementById("teaser")
    // Update the number of keypresses
    if (keyPresses > angerTolerance + 60) {
        alert("Just... stop")
        window.location.replace('./index.html')
    } else if (keyPresses > angerTolerance + 30) {
        teaserMessage.innerText = "Jesus christ- " + (keyPresses) + " times you've slammed that empty head of yours onto the keyboard, and every single one of them was wrong."
    } else if (keyPresses > angerTolerance + 20) {
        teaserMessage.innerText = "Come on... Who is in Paris?"
    } else if (keyPresses > angerTolerance) {
        teaserMessage.innerText = "Wow, you're really bad at this!"
    }
}

function testing() { // Testing responses
    console.log(this)
    alert(this)
}

// Working with YouTube API
// [!]: every time the player is called, it MUST be referred to by document.getElementById
//      attempting to assign the object to a variable seems to break the code...
const defaultPlayerId = 'ytplayer'
const initYT = function() { // Makes youtube iframes work, call before using anything with YT API
    let tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    console.log("Injected YoutubeAPI script")
     // Identify touchscreen/mobile browsers
     console.log("Touch browser: " + (isTouchScreen))
    if ( !(isTouchScreen) ) {
        document.getElementById('ytplayer').style.pointerEvents = "none"
    } else { // remove all the fancy stuff for the mobile browers, since im lazy and want to take a break :)
        document.getElementById('ytprogress').remove()
        document.getElementById('ytcontrols').remove()
    }
}

var playerTime = 0
var player
var playerElement
var playerState = -1
function onYouTubeIframeAPIReady() {
    player = new YT.Player('ytplayer', {
        playerVars: {
            'playsinline': 1,
            'enablejsapi': 1,
            'iv_load_policy': 3,
            'rel': 0,
            'cc_load_policy': 0,
            'autoplay': 0,
            'controls': 1,
            'modestbranding': 1,
            'html5': 1,
            'autoplay': 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': fuckYoutube
        },

    });
}

function onPlayerReady(event) {
    playerElement = document.getElementById('ytplayer')

    // Notify user when video is loaded
    playerElement.style.boxShadow = "4px 5px 5.3px #2e2d2d" /* offset-x | offset-y | blur-radius | color */
    console.log("Youtube iframe loaded")

    // Tracking time
    setInterval(updateTime, 100); // delay in milliseconds

    // Setting up seek bar

}

function fuckYoutube() {
    alert("poop")
}

function pausePlay() {
    if (playerState == 2 || playerState == -1 || playerState == 3) { // paused
        player.playVideo()
        playerElement.style.boxShadow = ""
        delay(100)
    } else {
        player.pauseVideo()
        playerElement.style.boxShadow = "4px 5px 5.3px #2e2d2d" /* offset-x | offset-y | blur-radius | color */
        delay(100)
    }
    updateProgBar()
}

function restartPlayer() {
    if (playerState != -1) {
        player.seekTo(0)
    }
}

function jumpPlayer(direction, skipover=10) {
    if (direction.toLowerCase().includes('back')) { skipover = skipover * -1 }
    let now = getTimestamp()
    player.seekTo(now + skipover, true)
}

function getTimestamp() {
    return player.getCurrentTime()
}

function onPlayerStateChange(event) {
    /* 
        [   List of playerstate codes: ]
    -1: Not started
     0: Ended
     1: Playing
     2: Paused
     3: Buffering
     4: Video cued
    */
    playerState = event.data
    console.log(playerState)

    // Display progress bar
    let progBar = document.getElementById('ytprogress')
    progBar.style.opacity = "100%"
    updateProgBar() // [!] Poor implementation - causes an unacceptable amount of lag
}

function updateProgBar() {
    let ytbar = document.getElementById('ytprogress')
    ytbar.value = (player.getCurrentTime() / player.getDuration()) * 100
    playerTime = toString(Math.floor(player.getCurrentTime()))

    updateSeekBar()
}
    

function updateTime() {
    let oldTime = playerTime;
    if(player && player.getCurrentTime()) { // If player is playing AND time has value
        playerTime = player.getCurrentTime()
    }
    if(playerTime !== oldTime) {
        updateProgBar()
    }
}

function slideSeek() {
    let seekHeader = document.getElementById('ytprogress')
    let playerCurrent = (player.getCurrentTime() / player.getDuration()) * 100
    let playerBuffered = player.getVideoLoadedFraction() * 100
    let skipTo = (seekHeader.value / 100) * player.getDuration()

    player.seekTo(skipTo, true)
}

function updateSeekBar() {
    if ( !(isTouchScreen) ) {
        let ytbar = document.getElementById('ytprogress')
        let value = (ytbar.value-ytbar.min)/(ytbar.max-ytbar.min)*100
        // left gradient start | left gradient end | right gradient start | right gradient end
        ytbar.style.background = 'linear-gradient(to right, #00be9b 0%, #00be9b ' + value + '%, #181818 ' + value + '%, #181818 100%)'
    }
}