// conditional variables for narrative scenarios
let room = 'outside'
let actionReady = false
let leafPile = false
let manShouting = false
let reservation = false
let waiterPresent = false

//#####
// action display window
let actionUpdate = document.querySelector('#action-display')
let displayedAction = actionUpdate.children[0]
let displayedTarget = actionUpdate.children[1]
let displayedWith = document.querySelector('#displayed-with')
let selectedWord = document.getElementsByClassName('selected')


//actions container
const clickableWords = document.getElementsByClassName('interactive')
// action buttons
const walkBtn = document.getElementById('walk-to')
const lookBtn = document.getElementById('look-at')
const talkBtn = document.getElementById('talk-to')
const grabBtn = document.getElementById('grab')
const dropBtn = document.getElementById('drop')
const useBtn = document.getElementById('use')

//results modal function (what pops up when you perform an action)
const result = (text) => {
    let modal = document.querySelector('#result');
    let span = document.querySelector('.close');
    let content = document.querySelector('.modal-content').children[0]
    content.innerText = `${text}`
    modal.style.display = "block"
    span.onclick = function() {
        modal.style.display = "none";
    }
}


// #### inventory items
class Item {
    constructor (name, inHand=false){
        this.name = name;
        this.inHand = inHand;
    }
    walkTo(){
        // default modal "Don't be silly. You can't do that."
        result('Don\'t be silly. You can\'t do that')
    }
    lookAt(){
        // default modal "Pretty cool"
        result('Pretty cool.')
    }
    talkTo(){
        // default modal "You look ridiculous right now. You know that, right?"
        result('You look ridiculous. You know that, right?')
    }
    grab(){
        // default modal "Careful now."
        if(this.inHand === true){
            result('You already have it.')
        }else result('Careful now.')
    }
    drop(){
        // default modal "Don't be silly. You can't do that."
        result('Don\'t be silly. You can\'t do that')
    }
    use(){
        // default modal "Don't be silly. You can't do that."
        result('Don\'t be silly. You can\'t do that')
    }
}
// build out all possible inventory items
// chewing gum (in inventory at start of game)
class Packofgum extends Item {
    constructor(name, inHand){
        super(name, inHand)
    }
    lookAt(){
        result('A full pack of unchewed gum. A lot of potential here.')
    }
    drop(){
        result('Hey, you paid good money for this!')
    }
    use(){
        gumWad.inHand = true
        result('You experience a blast of freshness but, like most pleasures in life, it\'s sadly fleeting.')
    }
}
//build chewed gum subclass
class chewedGum extends Item {
    constructor(name, inHand){
        super(name, inHand)
    }
        lookAt(){
            result('A sticky wad of gum.')
        }
        drop(){
            result('With great effort, you peel it off your palm. This stuff is like super glue!')
        }
        use(){
            
        }
    }  
    //build Leaf subclass
    class Leaf extends Item {
        constructor(name, inHand, isSticky=false){
            super(name, inHand)
            this.isSticky = isSticky
        }
        // walkTo(){}
        lookAt(){
            result('It\'s a leaf.')
        }
        // talkTo(){}
        grab(){
            this.inHand = true
            result('You pick up the leaf.')
        }
        drop(){
            this.inHand = false
            if (this.isSticky === true){
                result('It plummets to the ground with a splat.')
            } else {
                result('It floats away on the wind.')
            }
        }
        // use(){
            //if with element is gumWad, isSticky becomes true and  this.name becomes "sticky leaf" 
        // }
    }
    // jacket subClass
    class Jacket extends Item {
        constructor(name, inHand){
            super(name, inHand)
        }
        grab(){
            this.inHand = false
            result('You remove the jacket.')
        }
        drop(){
            this.inHand = false
            result('You remove the jacket.')
        }
        use(){
            this.inHand = false
            result('You remove the jacket.')
        }
    }
    //build water subclass
    class Water extends Item {
        constructor(name, inHand, isSparkly = false){
            super(name, inHand)
            this.isSparkly = isSparkly
        }
        // walkTo(){}
        lookAt(){
            result('Eau de Mediocre: A working-class flat water packaged in a 1\% bottle')
        }
        // talkTo(){}
        grab(){
            if (jacket.inHand === true){
                this.inHand = true
                result('You pick up a bottle of water.')
            } else {
                result('The chef looks up. \"Hey, get away from there! This area is staff only.\" He shuffles you back to your table.')
            }
        }
        drop(){
            result('Hey, you would have paid good money for this!')
        }
        // use(){
            //if (with element is lotion) {
                // isSparkly becomes true and this.name becomes "sparkling water"
            // } else if (with element is bathroomAttendant and isSparkly is true) {
            //     this.inHand = false
            //     dict.inHand = true
            //     result('The attendant nods appreciately. Now, THIS is a classy beverage. Cheers, mate. Enjoy the book.')
            // }
            // else {
            //     result('Refreshing!')
            // }
            // }
        }
        
        //build lotion subclass
        class Lotion extends Item {
            constructor(name, inHand){
                super(name, inHand)
            }
            // walkTo(){}
            // lookAt(){}
            // talkTo(){}
            grab(){
                this.inHand = true
                result('\"Hey, look over there!\" you shout. The woman turns for a moment, and you swipe the bottle of lotion. When she turns back, she furrows her brow for a moment, shrugs, and pulls another bottle of lotion out of her bag.')
            }
            drop(){
                result('Hey, you would have paid good money for this!')
            }
            // use(){
                //if with element is water, run water.use()
                // } else {
                //     result('Your skin is absolutely GLOWING, and you make a mental note to work on your skincare routine.')
                // }
        }
    
    //build dict subclass
    class Dictionary extends Item {
        constructor(name, inHand){
            super(name, inHand)
        }
        // walkTo(){}
        lookAt(){
            result('\"Learn French on the Toilet\" by Jacques Cologne.')
        }
        // talkTo(){}
        // grab(){}
        drop(){
            result('After all that?!')
        }
        // use(){
            // if location equals table and waiter equals present, run win function
        // } else {
            // result('Oh, is THAT what that word means? No wonder they were so mad.')
        // }
    }
    

    //#### inventory object variables
    const gumWad= new chewedGum('wad of chewed gum', true)
    const gum = new Packofgum('pack of gum', true) //only one that should start as true!
    const leaf = new Leaf('leaf', true)
    const jacket = new Jacket('jacket', true)
    const bottledWater = new Water('bottled water', true)
    const sparklyLotion = new Lotion('sparkly lotion', true)
    const dict = new Dictionary('French/English dictionary', true)
    
    
// inventory array
let inventory = [gum, gumWad, leaf, jacket, bottledWater, sparklyLotion, dict]

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
}


const makeActive = (e) => {
    //highlight selected text
    e.target.classList.toggle('selected')
    // add it to the display window
    let displayText = e.target.innerText
    if (e.target.classList.contains('selected')){
        if (e.target.classList.contains('action')) {
            displayedAction.innerText = displayText
            actionReady = true
        }else {
            displayedTarget.innerText = displayText
        }
    }else {
        actionReady = false
        displayedAction.innerText = ''
        displayedTarget.innerText = ''
    }
    if (actionReady === true){
        getResults(e.target)
    }
}
// Use with function {
    // if use button is selected and an inventory button is selected display 'with' in display
    // }
    
const getResults = (target) => {
    if (walkBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].walkTo()
            }
        }
    }else if (lookBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].lookAt()
            }
        }
    }else if (talkBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].talkTo()
            }
        }
    } else if (grabBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].grab()
            }
        }
    } else if (dropBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].drop()
            }
        }
    } else if (useBtn.classList.contains('selected')) {
        for (i=0; i<inventory.length; i++){
            if (inventory[i].name === target.innerText) {
                inventory[i].use()
            }
        }
    }
}

        // add event listeners to all interactive text that sets the clicked action to 'active'
        const generateButtons = () => {
            for(i=0; i<clickableWords.length; i++) {
                clickableWords[i].addEventListener('click', makeActive)
                // clickableWords[i].addEventListener('click', getResults)
            }
        }
        
document.addEventListener('DOMContentLoaded', ()=>{
    checkInventory()
    generateButtons()  
})
