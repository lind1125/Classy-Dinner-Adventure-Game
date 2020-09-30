
// inventory items
class Item {
    constructor (name, inHand=false){
        this.name = name;
        this.inHand = inHand;
    }
    walkTo(){
        // default modal "Don't be silly. You can't do that."
        let modal = document.querySelector('#result');
        let span = document.querySelector('.close');
        let content = document.querySelector('.modal-content').children[0]
        content.innerText = 'Don\'t be silly. You can\'t do that.'
        modal.style.display = "block"
        span.onclick = function() {
            modal.style.display = "none";
        }
    }
    lookat(){
        // default modal "Pretty cool"
    }
    talkTo(){
        // default modal "You look ridiculous right now. You know that, right?"
    }
    grab(){
        // default modal "Careful now."
    }
    drop(){
        // default modal "Don't be silly. You can't do that."
    }
    use(){
        // default modal "Don't be silly. You can't do that."
    }
}
// build out all possible inventory items
// chewing gum (in inventory at start of game)
const gum = new Item('chewing gum', true)
const leaf = new Item('leaf', false)
const reservation = new Item('Jackson Party of 2', false) // (invisible?)
const jacket = new Item('jacket', false)
const water = new Item('bottled water', false)
const flour = new Item('flour', false) // (invisible?)
const lotion = new Item('sparkly lotion', false)
const dict = new Item('French/English dictionary', false)
// inventory array
let inventory = [gum, leaf, reservation, jacket, water, flour, lotion, dict]
// action display window
let actionUpdate = document.querySelector('#action-display')
let displayedAction = actionUpdate.children[0]
let displayedTarget = actionUpdate.children[1]

//actions container
const clickableWords = document.getElementsByClassName('interactive')
// action buttons
const walkBtn = document.getElementById('walk-to')
const lookBtn = document.getElementById('look-at')
const talkBtn = document.getElementById('talk-to')
const grabBtn = document.getElementById('grab')
const dropBtn = document.getElementById('drop')
const useBtn = document.getElementById('use')

// function to display inventory array items in the #inventory div
const checkInventory = () => {
    let inventoryList = document.querySelector('ul')

    for (let i=0; i < inventory.length; i++) {
        if (inventory[i].inHand === true){
        const item = document.createElement('li')
        item.innerText = inventory[i].name
        item.classList.add('interactive')
        inventoryList.appendChild(item)
        }
    }
    console.log(inventoryList)
}

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
    checkInventory()
    generateButtons()  
})
