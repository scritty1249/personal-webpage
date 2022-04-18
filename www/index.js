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

var sha256 = function sha256(ascii) { // Source: https://geraintluff.github.io/sha256/
    function rightRotate(value, amount) {
        return (value>>>amount) | (value<<(32 - amount));
    };
    
    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty]*8;
    
    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
            k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
        }
    }
    
    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty]%64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j>>8) return; // ASCII check: only accept characters in range 0-255
        words[i>>2] |= j << ((3 - i)%4)*8;
    }
    words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
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
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e&hash[5])^((~e)&hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                        w[i - 16]
                        + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) // s0
                        + w[i - 7]
                        + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)) // s1
                    )|0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2])); // maj
            
            hash = [(temp1 + temp2)|0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1)|0;
        }
        
        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i])|0;
        }
    }
    
    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i]>>(j*8))&255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};
// End of segment

var footer = document.getElementsByTagName("footer")[0]
var keyPhrases = getTxTFile('https://raw.githubusercontent.com/scritty1249/personal-webpage/main/www/keys.txt').slice(0, 7) // 7 days a week, don't read more lines than this

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

function getTxtFile(url) { // Returns an array of each line
    let rawFile = new XMLHttpRequest()
    let textLines = []
    rawFile.open("GET", url, false)
    rawFile.onreadystatechange = function() }
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0) {
                let textResponse = rawFile.responseText
                console.log("got keyphrases: " + textResponse)
                textLines = textResponse.split('\n')
                
            } else {
                console.log("GET request did not return 200 or 0.")
            }
        }
        rawFile.send(null)
        return textLines
}

function updateLogin() {
    let userIn = document.getElementById("login").value.toLowerCase()
    let day = new Date().getDay()
    if( sha256(userIn) == keyPhrases[day] ) {
        document.getElementById("login").style.boxShadow = ""
        document.getElementById("login").style.border = "3px solid #00be9b"
        window.location.replace('./portal.html')
    } else {
        document.getElementById("login").style.boxShadow = "2px 4px 3.4px #333333" /* offset-x | offset-y | blur-radius | color */
    }
}
