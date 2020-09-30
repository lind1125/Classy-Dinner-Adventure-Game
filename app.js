// inventory object - empty array
let inventory = []
//actions container
const clickableWords = document.getElementsByClassName('interactive')
// action buttons
const walkTo = document.getElementById('walk-to')
const pickUp = document.getElementById('pick-up')
const drop = document.getElementById('drop')
const push = document.getElementById('push')
const talkTo = document.getElementById('talk-to')

// add event listeners to all interactive text that sets the clicked action to 'active'
const generateButtons = () => {
    for(i=0; i<clickableWords.length; i++) {
        clickableWords[i].addEventListener('click', makeActive)
    }
}

const makeActive = (e) => {
    //highlight selected text and add it to the display window
    const newClass = e.target.classList
    newClass.toggle('selected')
}


document.addEventListener('DOMContentLoaded', ()=>{
    generateButtons()
})
