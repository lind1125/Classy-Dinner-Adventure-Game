// inventory object - empty array
let inventory = []
// action display window
let actionUpdate = document.querySelector('#action-display')
let displayedAction = actionUpdate.children[0]
let displayedTarget = actionUpdate.children[1]

//actions container
const clickableWords = document.getElementsByClassName('interactive')
// action buttons
const walkTo = document.getElementById('walk-to')
const lookAt = document.getElementById('look-at')
const talkTo = document.getElementById('talk-to')
const grab = document.getElementById('grab')
const drop = document.getElementById('drop')
const use = document.getElementById('use')

// add event listeners to all interactive text that sets the clicked action to 'active'
const generateButtons = () => {
    for(i=0; i<clickableWords.length; i++) {
        clickableWords[i].addEventListener('click', makeActive)
    }
}

const makeActive = (e) => {
    //highlight selected text 
    e.target.classList.toggle('selected')
    // add it to the display window
    let displayText = e.target.innerText
    if (e.target.classList.contains('selected')){
        if (e.target.classList.contains('action')) {
            displayedAction.innerText = displayText
        }else {
            displayedTarget.innerText = displayText
        }
    }else {
        displayedAction.innerText = ''
        displayedTarget.innerText = ''
    }  
}


document.addEventListener('DOMContentLoaded', ()=>{
    generateButtons()
})
