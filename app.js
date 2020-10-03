//variables for narrative scenarios
let actionReady = false;
let leafPile = false;
let leafStuck = false;
let reservation = false;
let usedItems = [];

//#####
// display window stuff
let room1 = document.querySelector('#room1')
let room2 = document.querySelector('#room2')
let room3 = document.querySelector('#room3')
let room4 = document.querySelector('#room4')
let actionUpdate = document.querySelector("#action-display");
let displayedAction = actionUpdate.children[0];
let displayedTarget = actionUpdate.children[1];
let displayedWith = document.querySelector("#displayed-with");

//interactive elements
const clickableWords = document.getElementsByClassName("interactive");
const actionTargets = document.getElementsByClassName("target");
const selectedTargets = document.getElementsByClassName("target selected");
const selectedActions = document.getElementsByClassName("action selected");
console.log(actionTargets);
// action buttons
const walkBtn = document.getElementById("walk-to");
const lookBtn = document.getElementById("look-at");
const talkBtn = document.getElementById("talk-to");
const grabBtn = document.getElementById("grab");
const dropBtn = document.getElementById("drop");
const useBtn = document.getElementById("use");

//results modal function (what pops up when you perform an action)
const result = (text) => {
  let modal = document.querySelector("#result");
  let span = document.querySelector(".close");
  let content = document.querySelector(".modal-content").children[0];
  content.innerText = `${text}`;
  modal.style.display = "block";
  span.onclick = function () {
    modal.style.display = "none";
    clear()
  };
};

clear = () => {
    if (selectedActions.length > 0) {
        selectedActions[0].classList.remove("selected");
      }
      while (selectedTargets.length > 0) {
        selectedTargets[0].classList.remove("selected");
      }
      actionReady = false;
      displayedAction.innerText = "";
      displayedTarget.innerText = "";
      displayedWith.style.display = "none";
      usedItems = [];
}

// #### inventory items
class Item {
  constructor(name, inHand = false) {
    this.name = name;
    this.inHand = inHand;
  }
  walkTo() {
    // default modal "Don't be silly. You can't do that."
    result("Don't be silly. You can't do that");
  }
  lookAt() {
    // default modal "Pretty cool"
    result("Pretty cool.");
  }
  talkTo() {
    // default modal "You look ridiculous right now. You know that, right?"
    result("You look ridiculous. You know that, right?");
  }
  grab() {
    // default modal "Careful now."
    if (this.inHand === true) {
      result("You already have it.");
    } else result("Careful now.");
  }
  drop() {
    // default modal "Don't be silly. You can't do that."
    result("Don't be silly. You can't do that");
  }
  use() {
    // default modal "Don't be silly. You can't do that."
    result("Don't be silly. You can't do that");
  }
}

//build out all "in-world" targets

// ROOM 1
// front door
class Door extends Item {
  constructor(name) {
    super(name);
  }
  walkTo() {
    if (reservation === true) {
      result(
        "You confidently walk into the restaurant. The maître d' arches a single eyebrow and asks if you have a reservation. \"Smith, party of two,\" you say. When the maître d' sternly informs you that only complete parties will be seated, you calmly explain that the Pardyovtoo family has a rich and storied history in this city, and that you would not have expected such ignorance at an establishment such as this. The maître d' swiftly apologizes. While leading you to your table, apologetically but still rather forcefully put you in a dinner jacket, as the restaurant (apparently) has a strict dress code."
      );
      changeRooms()
      
    } else {
      result(
        "You confidently walk into the restaurant. The maître d' arches a single eyebrow and asks if you have a reservation. You mutter a series of non-committal syllables while desperately trying to read the upside-down, flowing script written on the reservation sheet. The maître d' forces you back outside through sheer force of upper-class disdain for the underprivileged."
      );
    }
  }
  lookAt() {
    result(
      "The door to the restaurant. A smug-looking maître d' stands at a podium a couple feet inside."
    );
  }
}
// branch
class TreeBranch extends Item {
  constructor(name) {
    super(name);
  }
  walkTo() {
    result("You're already there.");
  }
  lookAt() {
    result("The autumn leaves appear to be barely hanging on.");
  }
  grab() {
    leafPile = true;
    leaf.inHand = true;
    result(
      "You violently shake the tree branch for reasons that are only clear to yourself. A not-insignificant number of leaves fall to the ground between you and the person talking on the phone. One particularly large and narratively-relevant looking leaf falls right into your other hand."
    );
    setTimeout(startBlowing, 15000)
    updateInventory();
  }
  use() {
    this.grab();
  }
}
// gruff, older person
class LeafBlower extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        if (leafPile === true){
            this.lookAt()
        }else {
            result('You wander over to the gruff person resting a leaf blower on their lap. \"The owner of this place hates having any clutter outside the restaurnt, so they\'ve got me on retainer all season to blow away any leaves that end up in front of the place. Nothing can withstand old Aeolus here.\" They chuckle and affetionately pat the leaf blower. It\'s...uncomfortable.')
        }
    }
    lookAt(){
        if (leafPile === true && leafStuck === false){
            result('They are strutting across the sidewalk, gracefully blowing leaves away. You\'ve never seen anyone look so effortlessly happy. It\'s infuriating.')
        } else if (leafPile === true && leafStuck === true) {
            result('The proud, gruff laborer has planted themselves in front of the single sticky leaf, futilely blasting it with their leaf blower. Beads of sweat form on their brow. You\'re watching someone\'s grasp on reality shattering in realtime. The proud laborer glances over to the well-dressed person still shouting into their phone, but the class divide prevent thems from commiserating in their personal struggles.')
        } else {
            result('They sit gruffly at their post, idly running their hand across the barrel of the leaf blower.')
        }
    }
    talkTo(){
        this.walkTo()
    }
}
// well-dressed person
class PhoneTalker extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        if (leafPile === true && leafStuck === false){
            stopBlowing()
        } else if (leafPile === true && leafStuck === true) {
            result('They are covering one ear with one hand while screaming to be heard over the leaf blower. \"WELL, IF YOU DON\'T GET HERE SOON I\'M GONNA HAVE TO GO IN AND USE THE BATHROOM! WHAT?! NO, IT\'LL BE FINE! JUST TELL THEM YOU\'RE WITH SMITH, PARTY OF TWO!\"')
            reservation = true
            leafPile = false
            leafStuck = false
        } else {
            result('\"Don\'t worry about it, baby,\" they say. \"Yes, I got a reservation! It\'s...\"\nThey abruptly stop talking when they notice you eavesdropping. You smile apologetically and step away.')
        }
    }
    lookAt(){
        result('They look sharp. Reeeeeeal sharp. As sharp as a well-financed knife that eats at this kind of restaurant all the time and can create successful similes with little effort.')
    }
    talkTo(){
        this.walkTo()
    }
}
//ROOM 2
//table
class Table extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        if (room2.style.display === 'block'){
            result('You\'re already there.')
        } else {
            room2.style.display = 'block'
            room3.style.display = 'none'
            room4.style.display = 'none'
            clear()
        }
    }
}
//menu
class Menu extends Item {
    constructor(name){
        super(name)

    }
    lookAt(){
        result('An exquisite selection of the finest French cuisine this city has to offer...or so you assume. You can\'t read a word of it! It\'s entirely in French.')
    }
    use(){
        if (usedItems[0].innerText === "server") {
            console.log(server.isPresent)
            console.log(dict.inHand)
            if (server.isPresent === true && dict.inHand === true){
                result(
                'After several desperate flips of the pages of the dictionary, you successfully order off the menu. The server seems unimpressed, but dutifully writes down your order and rushes off to the kitchen.'
                );
                // gameOver()
            } else {
                result('Using an accent that is, at best, cartoonish and is, at worst, extremely offensive, you attempt to read from the menu. The server does not hide their disgust and walks away in a huff.')
            }
        } else {
            super.use();
        }
    }
}

//server
class Server extends Item {
    constructor(name){
        super(name)
        this.isPresent = false

    }
    walkTo(){
        if (this.isPresent === false){
            result('They manage to stay ahead of you just enough to justify ignoring you. You return to you table.')
        } else {
            result('They\'re standing right next to you.')
        }
    }
    lookAt(){
        result('You note with some embarassment that they are wearing nearly the exact same clothes that you came in with.')
    }
    talkTo(){
        if (this.isPresent === false){
            result('The server comes over and gives what could either be a curt smile or an involuntary facial tic.')
            this.isPresent = true
        } else {
            result('The server waits expectantly, glancing very deliberately at the menu.')
        }
    }
    use(){
        if (usedItems[0].innerText === "menu") {
            if (this.isPresent === true && dict.inHand === true){
                result(
                'After several desperate flips of the pages of the dictionary, you successfully order off the menu. The server seems unimpressed, but dutifully writes down your order and rushes off to the kitchen.'
                );
                // gameOver()
            } else {
                result('Using an accent that is, at best, cartoonish and is, at worst, extremely offensive, you attempt to read from the menu. The server does not hide their disgust and walks away in a huff.')
            }
        } else {
            super.use();
        }
    }
}

// ROOM 3 Kitchen
class Kitchen extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        if (room3.style.display === 'block'){
            result('You\'re already there.')
        } else {
            room2.style.display = 'none'
            room3.style.display = 'block'
            room4.style.display = 'none'
            clear()
        }
    }
    lookAt(){
        if (room3.style.display === 'block'){
            result('Yep, it\'s a kitchen.')
        } else {
            result('You\'re too far away.')
        }
    }
}

//ROOM 4 Restroom
class Restroom extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        if (room4.style.display === 'block'){
            result('You\'re already there.')
        } else {
            room2.style.display = 'none'
            room3.style.display = 'none'
            room4.style.display = 'block'
            clear()
        }
    }
    lookAt(){
        if (room4.style.display === 'block'){
            result('Yep, it\'s a restroom.')
        } else {
            result('You\'re too far away.')
        }
    }
}

class Attendant extends Item {
    constructor(name){
        super(name)
    }
    walkTo(){
        result('You notice that right at the top of the attendant\'s pile of reading materials is a French\/English dictionary! "Got yer eye on that, do ya?" the attendant croaks. "Tell you what, I\'ll let you keep it if you do me a favor. I\'m mighty parched and could use some water. But given my high-class surroundings, I\'ll only drink the fancy stuff. Deal?"')
    }
    lookAt(){
        this.walkTo()
    }
    talkTo(){
        this.walkTo()
    }
    use(){
        if (usedItems[0].innerText === "sparkling water"){
            bottledWater.inHand = false
            dict.inHand = true
            result('The attendant nods appreciately. Now, THIS is a classy beverage. Cheers, mate. Enjoy the book.')
            updateInventory()
        } else if (usedItems[0].innerText === "bottled water") {
            result('The attendant snorts derisively. "No, no, this here\'s not fancy. Get me the SPARKLING stuff."')
        }else {
            super.use()
        }
    }
}

// Inventory items
//ROOM 1
// chewing gum (in inventory at start of game)
class PackOfGum extends Item {
    constructor(name, inHand) {
        super(name, inHand);
    }
    lookAt() {
        result("A full pack of unchewed gum. A lot of potential here.");
    }
    drop() {
        result("No way! You paid good money for this!");
    }
    use() {
        gumWad.inHand = true;
        console.log(gumWad.inHand);
        result(
            "You experience a wave of minty freshness that is, like most pleasures in life, sadly fleeting."
        );
        updateInventory();
    }
}
//build chewed gum subclass
class ChewedGum extends Item {
    constructor(name, inHand) {
        super(name, inHand);
    }
    lookAt() {
        result("A sticky wad of gum.");
    }
    drop() {
        this.inHand = false;
        result(
            "With great effort, you peel it off your palm. This stuff is like super glue!"
            );
        updateInventory();
    }
    use() {
        console.log(actionReady);
        if (usedItems[0].innerText === "leaf") {
            this.inHand = false;
            leaf.isSticky = true;
            leaf.name = "sticky leaf";
            result(
            "You shove a big wad of gum onto one side of the leaf, ruining its exquisite natural beauty. You monster."
            );
            updateInventory();
        } else {
            super.use();
        }
    }
}
            
//build Leaf subclass
class Leaf extends Item {
    constructor(name, inHand, isSticky = false) {
        super(name, inHand);
        this.isSticky = isSticky;
    }
    // walkTo(){}
    lookAt() {
        result("It's a leaf.");
    }
    // talkTo(){}
    grab() {
        this.inHand = true;
        result("You pick up the leaf.");
    }
    drop() {
        this.inHand = false;
        if (this.isSticky === true) {
        leafStuck = true;
        result("It plummets to the ground with a splat, gum-side down. It looks like a perfectly innocent leaf.");
        } else {
            result("It floats gracefully to the ground.");
        }
        updateInventory();
    }
    use() {
        if (usedItems[0].innerText === "wad of chewed gum") {
            gumWad.inHand = false;
            this.isSticky = true;
            this.name = "sticky leaf";
            result(
            "You shove a big wad of gum onto one side of the leaf, ruining its exquisite natural beauty. You monster."
            );
            updateInventory();
        } else {
            super.use();
        }
    }
}
// jacket subClass
class Jacket extends Item {
    constructor(name, inHand) {
        super(name, inHand);
    }
    grab() {
        this.inHand = false;
        result("You remove the jacket.");
        updateInventory();
    }
    drop() {
        this.inHand = false;
        result("You remove the jacket.");
        updateInventory();
    }
}

//build water subclass
class Water extends Item {
  constructor(name, inHand, isSparkly = false) {
    super(name, inHand);
    this.isSparkly = isSparkly;
  }
  lookAt() {
    result(
      "Eau de Mediocre: A working-class flat water packaged in a 1% bottle"
    );
  }
  // talkTo(){}
  grab() {
    if (jacket.inHand === false) {
      this.inHand = true;
      result("You pick up a bottle of water.");
      updateInventory();
    } else {
      result(
        'The chef looks up. "Hey, get away from there! This area is staff only." He shuffles you back to your table.'
      );
      table.walkTo()
    }
  }
  drop() {
    result("No way! You would have paid good money for this!");
  }
  use() {
    if (usedItems[0].innerText === "sparkly lotion") {
        sparklyLotion.inHand = false;
        this.isSparkly = true;
        this.name = "sparkling water";
        result(
        "You squeeze the contents of the entire bottle of lotion into the bottle. The water is a little thicker than might be ideal, but it glints in the light like a precious gem."
        );
        updateInventory();
    } else if (usedItems[0].innerText === "attendant" && this.name === "sparkling water"){
        this.inHand = false
        dict.inHand = true
        result('The attendant nods appreciately. Now, THIS is a classy beverage. Cheers, mate. Enjoy the book.')
        updateInventory()
    } else {
        super.use();
        }
    }
}
//build lotion subclass
class Lotion extends Item {
    constructor(name, inHand) {
    super(name, inHand);
    }
    lookAt(){
        result('The bottle reads: \n"DIAMOND DUST"\n (Contains no real diamonds\nMay contain up to 90% dust)')
    }
    grab() {
        this.inHand = true;
        result(
        '"Hey, look over there!" you shout. The person at the sink turns for a moment, and you swipe the bottle of lotion. When they turn back, they furrow their brow for a moment, shrug, and pull another bottle of lotion out of their bag.'
        );
        updateInventory();
    }
    drop() {
        result("No way! You would have paid good money for this!");
    }
    use(){
        if (usedItems[0].innerText === "bottled water") {
            this.inHand = false;
            bottledWater.isSparkly = true;
            bottledWater.name = "sparkling water";
            result(
            "You squeeze the contents of the entire bottle of lotion into the bottle. The water is a little thicker than might be ideal, but it glints in the light like a precious gem."
            );
            updateInventory();
        } else {
            result('Your skin is absolutely GLOWING. You make a mental note to work on your skincare routine.')
        }
    }
}
//build dict subclass
class Dictionary extends Item {
    constructor(name, inHand) {
        super(name, inHand);
    }

    lookAt() {
        result('"Learn French on the Toilet" by Jacques Cologne.');
    }
    // grab(){}
    drop() {
    result("After all that?!");
  }
  // use(){
  // if location equals table and waiter equals present, run win function
  // } else {
  // result('Oh, is THAT what that word means? No wonder they were so mad.')
  // }
}

//#### inventory object variables
//ROOM 1
const gumWad = new ChewedGum("wad of chewed gum");
const gum = new PackOfGum("pack of gum", true); //only one that should start as true!
const leaf = new Leaf("leaf");
//ROOM 2
const jacket = new Jacket("jacket");
//ROOM 3
const bottledWater = new Water("bottled water");
//ROOM 4
const sparklyLotion = new Lotion("sparkly lotion");
const dict = new Dictionary("French/English dictionary");

//initialized in-world targets
//ROOM 1
const frontDoor = new Door("front door");
const branch = new TreeBranch("branch");
const gruffPerson = new LeafBlower('gruff older person')
const phonePerson = new PhoneTalker('well-dressed person')
//ROOM 2
const table = new Table('table')
const server = new Server('server')
const menu = new Menu('menu')
//ROOM 3
const kitchen = new Kitchen('kitchen')
//ROOM 4
const restroom = new Restroom('restroom')
const attendant = new Attendant('attendant')

// interactive targets array
let interactiveTargets = [
  frontDoor,
  branch,
  gruffPerson,
  phonePerson,
  gum,
  gumWad,
  leaf,
  table,
  menu,
  server,
  kitchen,
  restroom,
  jacket,
  bottledWater,
  attendant,
  sparklyLotion,
  dict,
];
let inHandArr = [];
let inventoryList = document.querySelector("#inventory-list");

//functions to set leafblower conditions
startBlowing = () => {
    result('The wielder of the leaf blower takes a quick, sharp breath and stands. They pull the ripcord on the leaf blower, and you are hit with a wall of sound as they begin their task. It\'s like standing next to a foghorn. The well-dressed person on the phone appears to be struggling to be heard.')
}
stopBlowing = () => {
    result('With every leaf successfully cleared, the proud laborer shuts off the machine. All is quiet again, except for the well-dressed person on the phone. \"DID YOU HEAR ME?! I SAID THE RESEVERATION IS UNDER...\"\nThey stop talking as they notice people are staring. They look deeply embarassed, despite having more money than you. It rules.')
    leafPile = false
}

// function to display inventory array items in the #inventory div
const displayInventory = () => {
  for (i = 0; i < interactiveTargets.length; i++) {
    const item = document.createElement("li");
    item.innerText = interactiveTargets[i].name;
    item.setAttribute("id", `${interactiveTargets[i].name}`);
    item.classList.add("interactive");
    item.classList.add("target");
    if (interactiveTargets[i].inHand === false) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
    inventoryList.appendChild(item);
  }
};

//function to clear old inventory
const updateInventory = () => {
  while (inventoryList.firstElementChild) {
    inventoryList.removeChild(inventoryList.firstElementChild);
  }
  displayInventory();
};

const generateButtons = () => {
  for (i = 0; i < clickableWords.length; i++) {
    clickableWords[i].addEventListener("click", makeActive);
  }
  for (i = 0; i < actionTargets.length; i++) {
    actionTargets[i].addEventListener("click", useWith);
  }
};

const useWith = (e) => {
  if (e.target.classList.contains("selected")) {
    usedItems.push(e.target);
  }
};

const makeActive = (e) => {
  if (e.target.classList.contains("action")) {
    if (selectedActions.length > 0) {
      selectedActions[0].classList.remove("selected");
    }
  } else if (e.target.classList.contains("target")) {
    if (selectedTargets.length > 0) {
      selectedTargets[0].classList.remove("selected");
    }
  }
  //highlight selected text
  e.target.classList.toggle("selected");
  if (e.target === useBtn) {
    displayedWith.style.display = "block";
  }
  // add it to the display window
  let displayText = e.target.innerText;
  if (e.target.classList.contains("selected")) {
    if (e.target.classList.contains("action")) {
      displayedAction.innerText = displayText;
      actionReady = true;
    } else if (e.target.classList.contains("target")) {
      displayedTarget.innerText = displayText;
    }
  }
  if (actionReady === true) {
    // firstUsedItem = displayText
    // console.log(firstUsedItem)
    getResults(e.target);
  }
};

const getResults = (target) => {
  console.log(target.innerText);
  if (walkBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].walkTo();
      }
    }
  } else if (lookBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].lookAt();
      }
    }
  } else if (talkBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].talkTo();
      }
    }
  } else if (grabBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].grab();
      }
    }
  } else if (dropBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].drop();
      }
    }
  } else if (useBtn.classList.contains("selected")) {
    for (i = 0; i < interactiveTargets.length; i++) {
      if (interactiveTargets[i].name === target.innerText) {
        interactiveTargets[i].use();
      }
    }
  }
};

changeRooms = () => {
        gum.inHand = false
        gumWad.inHand = false
        leaf.inHand= false
        jacket.inHand = true
        room1.style.display = 'none'
        room2.style.display = 'block'
        updateInventory()
        clear()
    }

const gameLoop = () => {
  generateButtons();
  if (leafPile === true && leafStuck === false){
    const displayLeafEnd = setTimeout(stopBlowing, 60000)

  }else if (leafPile === true && leafStuck === true){
      const displayLeafStruggle = setTimeout(gruffPerson.lookAt, 180000)
  }
};
document.addEventListener("DOMContentLoaded", () => {
  displayInventory();
  setInterval(gameLoop, 60);
  changeRooms()
});
