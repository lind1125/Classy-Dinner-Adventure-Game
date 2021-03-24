# SEI Project 1: "Classy Dinner Adventure"

### Demo: https://lind1125.github.io/Classy-Dinner-Adventure-Game/

---

## Concept:

A text-based game using a point-and-click interface to interact with the game. Using OOP and DOM Manipulation, clicking particular areas on page in particular sequences will produce specific results. A particular sequence of results will progress the user forward.

The goal of the game is to get into a fancy restaurant and successfully order a meal. You accomplish this goal by acquiring and/or manipulating things and/or people around you. Once you've successfully ordered a meal, you win!

## Technologies Used
* HTML
* CSS
* Javacript
* Written in [VS Code](https://code.visualstudio.com/) 

## Approach:

#### Overview
I first created a puzzle dependency chart to nail down what actions should be taken in what sequence to win the game.

##### Puzzle Dependency Chart for "Classy Dinner Adventure"

<img src="./process_materials/puzzle_dependency_chart.jpg">

I then created a couple of rough wireframes, ultimately combining layout concepts from the two.

#### Wireframe
<img src="./process_materials/wireframe.png" height="75%" width="75%" >

I then built out the interactive inventory objects and the first "room" in order to have a sandbox to figure out the necessary functions for the game to take in input and execute properly.

Once all primary functions were running, I built out the other rooms and interactive objects, structuring the necessary sequence of actions for a win scenario as I went.

#### User stories

As a user, I expect to see a set of action buttons to select how I would like to interact with the other clickable elements on the page. I expect all inventory items to be interactive. I expect clear visual information to denote what other elements on the page are interactive. I expect clear visual information to denote when an element has been selected.


#### Stretch goals

* Improve styling so that text content displays more cleanly
* Expand toggle behavior so that click any non-interactive area on the page clears all selections
* Add additional puzzles and worldbuilding elements (e.g. timed events that occur after being triggered without further user input)
* Additional styling to change the visual elements when user switches rooms 
* Represent inventory items with images as opposed to text.

## Challenges:

I had a very rough time getting the clickable items to behave correctly. First it was a matter of coding the "select" toggle behavior to toggle any previous selected elements of the same type (e.g. user clicks an action, then clicks a different action). I also had an issue where my inventory was duplicating in-hand items. After resolving the toggle issue, it was apparent that similar code structure would solve the inventory issue. 

## Acknowledgements
* Thanks to Taylor Darneille for the assist in getting the click even behavior to work properly for the interface to be used correctly.
* Thanks to Bruno DaSilva for the pep talks
* Thanks to Ron Gilbert for designing many of the games of my childhood that used a similar interface, as well as publishing the design concept known as the [puzzle dependency chart](https://grumpygamer.com/puzzle_dependency_charts)
* Modal box code modified from [W3 Schools](https://www.w3schools.com/howto/howto_css_modals.asp)


### Demo: https://lind1125.github.io/Classy-Dinner-Adventure-Game/
