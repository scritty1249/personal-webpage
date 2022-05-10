document.addEventListener('DOMContentLoaded', function() { // Style stuff
    // Simulating the SASS file
    let colors = twoRandomClrs()
    simulateSASS(colors)
}, false)

function twoRandomClrs() {
    return [
        '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
        '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
    ]
}

function simulateSASS(clrs) {
    let genres = document.getElementsByClassName('genre')
    for(let i = 0; i < genres.length; i++) {
        if (i % 2 == 0) {
            genres.item(i).style.backgroundColor = clrs[0]
        } else {
            genres.item(i).style.backgroundColor = clrs[1]
        }
    }
}