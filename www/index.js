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

const keyUrl = 'https://raw.githubusercontent.com/scritty1249/personal-webpage/7b065522ebdb5d3a1fe6f7f1ff17091217427a79/www/keys.txt'
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

// const checkText = async() => { // No longer needed
//     async function loading() {
//         const data = await fetch(keyUrl)
//         const sanitizedData = (data.text())
//         let loadKeys = (await sanitizedData).split('\n\r') // Fuck windows
//         return loadKeys
//     }
//     loading().then(loadKeys => {
//         console.log("loaded keys")
//         let userIn = notMyShit.sha256(document.getElementById("login").value.toLowerCase())
//         let loginBox = document.getElementById("login")
//         let day = new Date().getDay()
//         if (notMyShit.sha256(userIn) == loadKeys[day]) {
//             loginBox.style.boxShadow = ""
//             loginBox.style.border = "3px solid #00be9b"
//             window.location.replace('./portal.html')
//         } else {
//             loginBox.style.boxShadow = "2px 4px 3.4px #333333" /* offset-x | offset-y | blur-radius | color */
//             console.log("no match:\n" + userIn.length + "\n" + loadKeys[day] + "\n" + userIn + "\nagainst:\n" + loadKeys)
//         }
//     })
// }

window.onload = function() { // Add new elements before styling
    // Allowing CORS for the navbar html file
    let corsHeader = document.createElement('meta')
    let originPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/") + 1)
    corsHeader.setAttribute('http-equiv', 'Access-Control-Allow-Origin')
    corsHeader.setAttribute('content', originPath + "nav.html")
    document.getElementsByTagName("head")[0].appendChild(corsHeader)
    console.log("Set header: " + String(corsHeader))

    // styling dead links
    let deadLinks = document.getElementsByClassName('dead-link')
    for (let link = 0; link < deadLinks.length; link++) {
        deadLinks[link].innerHTML = "<img src='./index_media/images/disconnect.png' width='20px'/>  &nbsp;" + deadLinks[link].innerHTML + "&nbsp;"
    }

    // Insert footer data
    let footer = document.getElementsByTagName('footer')[0]
    footer.innerHTML = notMyShit.loadFile('./footer.html')
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

// document.addEventListener('scroll', function() { // Doesn't work, but doesn't have to either
//     if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
//         document.getElementsByTagName('footer')[0] = "hidden"
//     } else {
//         document.getElementsByTagName('footer')[0] = "visible"
//     }
// }, false)

// function fuckingCORS(url) { // Runs CORS preflight check (no longer needed)
//     var xhr = new XMLHttpRequest()
//     xhr.open("GET", url, true)
//     xhr.responseType = 'application/json'
//     xhr.setRequestHeader('credentials', 'include')
//     xhr.onload = function() {
//         if (xhr.status == 200) {
//             console.log('CORS preflight success')
//         } else {
//             console.log('CORS preflight failure')
//             console.log(xhr.response)
//         }
//     }
// }

function loadKeyPhrases(keyFile) {
    // Load up the keys
    let rawFile = String(notMyShit.loadFile(keyFile))
    return rawFile
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

function testing() {
    console.log(this)
    alert(this)
}