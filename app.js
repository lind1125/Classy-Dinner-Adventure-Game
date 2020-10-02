// conditional variables for narrative scenarios
let room = 'outside'
let actionReady = false
let leafPile = false
let manShouting = false
let reservation = false
let waiterPresent = false
let usedItems = []

//#####
// action display window
let actionUpdate = document.querySelector('#action-display')
let displayedAction = actionUpdate.children[0]
let displayedTarget = actionUpdate.children[1]
let displayedWith = document.querySelector('#displayed-with')



const clickableWords = document.getElementsByClassName('interactive')
const actionTargets = document.getElementsByClassName('target')
const selectedTargets = document.getElementsByClassName('target selected')
const selectedActions = document.getElementsByClassName('action selected')
console.log(actionTargets)
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
        // selectedActions[0].classList.remove('selected')
        if (selectedActions.length > 0){
            selectedActions[0].classList.remove('selected')
        }
        // selectedTargets[0].classList.remove('selected')
        while(selectedTargets.length > 0){
            selectedTargets[0].classList.remove('selected')
        }
        actionReady = false
        displayedAction.innerText = ''
        displayedTarget.innerText = ''
        displayedWith.style.display = 'none'
        usedItems = []
    }
}


// #### inventory items
class Item {
    constructor (name, inHand=true){
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
        result('No way! You paid good money for this!')
    }
    use(){
        gumWad.inHand = true
        console.log(gumWad.inHand)
        result('You experience a wave of minty freshness that is, like most pleasures in life, sadly fleeting.')
        updateInventory()
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
            this.inHand = false
            result('With great effort, you peel it off your palm. This stuff is like super glue!')
            updateInventory()
        }
        use(){
            console.log(actionReady)
            if(usedItems[0].innerText === 'leaf'){
                this.inHand = false
                leaf.isSticky = true
                leaf.name = 'sticky leaf'
                result('You shove a big wad of gum onto one side of the leaf, ruining its exquisite natural beauty. You monster.')
                updateInventory()
            } else {
                super.use()
            }
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
            updateInventory()
        }
        use(){
            console.log(actionReady)
            if(usedItems[0].innerText === 'wad of chewed gum'){
                gumWad.inHand = false
                this.isSticky = true
                this.name = 'sticky leaf'
                result('You shove a big wad of gum onto one side of the leaf, ruining its exquisite natural beauty. You monster.')
                updateInventory()
            }else { 
                super.use() 
            }
        }
    }
    // jacket subClass
    class Jacket extends Item {
        constructor(name, inHand){
            super(name, inHand)
        }
        grab(){
            this.inHand = false
            result('You remove the jacket.')
            updateInventory()
        }
        drop(){
            this.inHand = false
            result('You remove the jacket.')
            updateInventory()
        }
        use(){
            this.inHand = false
            result('You remove the jacket.')
            updateInventory()
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
                updateInventory()
            } else {
                result('The chef looks up. \"Hey, get away from there! This area is staff only.\" He shuffles you back to your table.')
            }
        }
        drop(){
            result('No way! You would have paid good money for this!')
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
                updateInventory()
            }
            drop(){
                result('No way! You would have paid good money for this!')
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
const gumWad= new chewedGum('wad of chewed gum', false)
const gum = new Packofgum('pack of gum', true) //only one that should start as true!
const leaf = new Leaf('leaf',)
const jacket = new Jacket('jacket')
const bottledWater = new Water('bottled water')
const sparklyLotion = new Lotion('sparkly lotion')
const dict = new Dictionary('French/English dictionary')
    
    
// inventory array
let inventory = [gum, gumWad, leaf, jacket, bottledWater, sparklyLotion, dict]
let inHandArr = []
let inventoryList = document.querySelector('#inventory-list')

// function to display inventory array items in the #inventory div
const displayInventory = () => {   
    for (i=0; i<inventory.length; i++) {
        const item = document.createElement('li')
        item.innerText = inventory[i].name
        item.setAttribute('id', `${inventory[i].name}`)
        item.classList.add('interactive')
        item.classList.add('target')
        if (inventory[i].inHand === false) {
            item.style.display = 'none'
        } else {item.style.display = 'block'}
        
        inventoryList.appendChild(item)
    }
}

//function to clear old inventory
const updateInventory = () => {
    while (inventoryList.firstElementChild){
        inventoryList.removeChild(inventoryList.firstElementChild)
    }
    displayInventory()
}
    
const generateButtons = () => {
    for(i=0; i<clickableWords.length; i++) {
        clickableWords[i].addEventListener('click', makeActive)
    }
    for(i=0; i<actionTargets.length; i++){
        actionTargets[i].addEventListener('click', useWith)
    }
}

const useWith = (e) => {
    if (e.target.classList.contains('selected')){
        usedItems.push(e.target)
    }
}

const makeActive = (e) => {
    if (e.target.classList.contains('action')){
        if (selectedActions.length > 0){
            selectedActions[0].classList.remove('selected')
        }
    } 
    else if (e.target.classList.contains('target')){
        if (selectedTargets.length > 0){
            selectedTargets[0].classList.remove('selected')
        }
    }
    //highlight selected text
    e.target.classList.toggle('selected')
    if (e.target === useBtn){
        displayedWith.style.display = 'block'
    }
    // add it to the display window
    let displayText = e.target.innerText
    if (e.target.classList.contains('selected')){
        if (e.target.classList.contains('action')){
            displayedAction.innerText = displayText
            actionReady = true
        }else if (e.target.classList.contains('target')){
            displayedTarget.innerText = displayText
        }
    }
    if (actionReady === true){
        // firstUsedItem = displayText
        // console.log(firstUsedItem)
        getResults(e.target)
    }
}


const getResults = (target) => {
    // console.log(target.innerText)
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

const gameLoop = () => {
    generateButtons()
        // displayInventory()
}   
document.addEventListener('DOMContentLoaded', ()=>{
    // createInventory()
    displayInventory()
    setInterval(gameLoop, 60)
})
