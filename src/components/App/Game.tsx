import { useState } from "react";

/* 

NOTE: I've tried to pseudocode the logic behind everything implemented thus far.
I hope variable names combined with comments make it fairly readable.
There are a few points where something is hardcoded that won't be as more systems are built. 
I've made an effort to comment for every instance of this.

The lack of styling is intended - I figured it was best to focus primarily on functional game logic.

Boss and party move data *could* be condensed into one "moves" object with how they're written,
but it seems like separating them out is worth it in case we want to have different mechanics/features implemented for bosses vs party characters.

There are a number of comments before the main Game component describing or planning functions that have yet to be written.

Buffs and debuffs are not currently supported. We need a whole "status tracking" system.
There are moves, buffs, and debuffs planned that have not been implemented yet:
https://docs.google.com/spreadsheets/d/1T9uuqdbMwngADsLIWr-WOx_LJgiMs0tZJyaMuB5Xb9I/edit#gid=0

If you 'npm run dev', you'll be able to use Bingus' moves against Beef. Bingus' moves are not implemented properly yet.
Beef doesn't die, he just gets negative health.

*/

// CHARACTER DATA  & MOVE DATA
// action/move object creator
function Move(name, type, target, value, castTime, cooldown, effect){
  this.name = name,
  this.type = type,
  this.target = target,
  this.value = value,
  this.castTime = castTime,
  this.cooldown = cooldown,
  this.effect = effect
}

// boss move objects
const bossMoves = {
  swt: new Move('Swat', 'damage', 'aoe', 15, 0, 0, null),
  pnc: new Move('Pounce', 'damage', 'single', 30, 0, 0, null),
  grm: new Move('Groom', 'damage', 'self', 25, 0, 3, null),
}

// party move objects
const partyMoves = {
  atk: new Move('Attack', 'damage', 'single', 20, 0, 0, null),
  hel: new Move('Heal', 'heal', 'single', 25, 1, 2, null),
}

// boss character object creator 
function BossChar(name, maxHP, initiative, moves){
  this.name = name,
  this.maxHP = maxHP,
  this.initiative = initiative, 
  this.moves = moves
}

// boss character objects
const bossChars = {
  bng: new BossChar('Bingus, the Cat Deity', 500, 20, [bossMoves.swt, bossMoves.pnc, bossMoves.grm]),
}

// party character object creator
function PartyChar(role, name, maxHP, phys, magic, initiative, moves){
  this.role = role,
  this.name = name, 
  this.maxHP = maxHP, 
  this.phys = phys, 
  this.magic = magic, 
  this.initiative = initiative, 
  this.moves = moves
}

// party character objects
const partyChars = {
  war: new PartyChar('Warrior', 'Beef', 150, 1, 0, 75, [partyMoves.atk]),
  rog: new PartyChar('Rogue', 'Ohoho', 100, 1.25, 0, 15, [partyMoves.atk]),
  clr: new PartyChar('Cleric', 'Silva', 100, 0.75, 1, 50, [partyMoves.atk, partyMoves.hel]),
}



// JSX COMPONENTS

// nameplate component to display character name and a live HP value
function nameplate(char, hp){
  return (
    <div>
        {char.name}: {hp}
    </div>
  )
}

// returns a component with buttons that allow you to attack a character
function actionPlate(actor){
  let moves = [...actor.moves];
  let content = moves.map(move => <MoveButton key={move.name} move={move} />)
  return (
    <>
      {content}
    </>
  )
}

// button that takes in the information from a move passed into it 
// revisiting the button portion later - doing turn logic first and taking it one component at a time
function MoveButton({ move }) {
  return (
    <div id="singleMove" key={move.name}>
      {/* <button onClick={() => setp1hp((p1hp) => p1hp - move.value)}>
        {move.name}: {move.value}
      </button> */}
    </div>
  )
}

// planned: targeting menu jsx component

// planned: nameplate grouping components for boss & party members

// planned: game end component



// GAME LOGIC 

// this takes in all members of the game lobby and returns an array where they are sorted low-high by initiative 
function turnOrder(lobby){
  // when statuses are implemented, there should be a status check here for cooldowns and statuses which would
  // remove someone from the turn order 
  return lobby.toSorted((a, b) => a.initiative - b.initiative)
}

// planned: move execution logic

// planned: HP logic - cap character HP at their max health, and stop it from going below 0. 

// planned: function for party logic that determines what their automatic path of action should be

// planned: status tracking of dead party, cooldowns, buffs, debuffs, alive/dead, designed to plug into calculations for every turn

// game end check function
function gameOver(bossHP, partyHP){
  if (bossHP === 0) return true;
  else if (partyHP.reduce((acc, curr) => acc + curr, 0) === 0) return true;
  else return false;
}

// turn logic function pseudocode
// base case: check gameOver function. if true, gameEnd logic/component (?)
// 1) check turn variable. if turn variable > turnorder array length, set to 0.
// 2) load character moves from lobby[turn variable] 
// 2.5) APPLY STATUSES TO CALCULATIONS ONCE IMPLEMENTED
// 3) if a move has no targeting options (self or aoe), execute code on appropriate targets using value & type from move multiplied by stats
// 4) if a move has targeting options, load a "target" component with (lobby size) buttons
// 5) when the button is pressed, execute as in #3
// 6) increment turn variable
// 7) repeat

// planned: main game logic which takes in characters in lobby and builds status objects for them, and handles calling all other game logic

// this info object should be used in a function which takes in a character and returns the object with their info attached to char and hp
// this function would be used to set the state for every character in the lobby
// info object: keeps track of character, hp, effects, cast timer/queue, cooldowns, and death
// const charInfo = {
//   char: {},
//   hp: 0,
//   dead: false,
//   fx: [],
//   cast: {},
//   cd: {}
// }
export default function Game() {
  // needs to be abstracted for a character select - currently just pulling characters straight from the dataset to establish a "lobby"
  const lobby = [bossChars.bng, partyChars.war, partyChars.rog, partyChars.clr]

  // STATE DATA
  // uses the maxHP values from character stats to set their HP in state and allow it to update 
  // const [boss, setBoss] = useState(lobby[0].maxHP);
  // const [p1, setp1] = useState(lobby[1].maxHP);
  // const [p2, setp2] = useState(lobby[2].maxHP);
  // const [p3, setp3] = useState(lobby[3].maxHP);

  // setting the current turn in state
  const [turn, setTurn] = useState(0)

  return (
    <>
      <h1>PARTY SMASHER</h1>  
      {/* {nameplate(lobby[0], bossHP)}
      {nameplate(lobby[1], p1hp)}
      {nameplate(lobby[2], p2hp)}
      {nameplate(lobby[3], p3hp)} */}
    </>
  );
}