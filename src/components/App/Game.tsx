import { useState } from "react";

/* 

NOTE: I've tried to pseudocode the logic behind everything implemented thus far.
I hope variable names combined with comments make it fairly readable.
There are a few points where something is hardcoded that won't be as more systems are built. 
I've made an effort to comment for every instance of this.

The lack of styling is intended - I figured it was best to focus primarily on functional game logic.

Boss and party move data *could* be condensed into one "moves" object with how they're written,
but it seems like separating them out is worth it in case we want to have different mechanics/features implemented for bosses and players.

There are a number of comments before the main Game component describing or planning functions that have yet to be written.

Buffs and debuffs are not currently supported. We need a whole "status tracking" system.
There are moves, buffs, and debuffs planned that have not been implemented yet:
https://docs.google.com/spreadsheets/d/1T9uuqdbMwngADsLIWr-WOx_LJgiMs0tZJyaMuB5Xb9I/edit#gid=0

If you 'npm run dev', you'll be able to use Bingus' moves against Beef. Bingus' moves are not implemented properly yet.
Beef doesn't die, he just gets negative health.

*/

// characters, moves, and stats
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

// nameplate component to display character name and a live HP value
function nameplate(char, hp){
  return (
    <div>
        {char.name}: {hp}
    </div>
  )
}

// this takes in all members of the game lobby and returns an array where they are sorted low-high by initiative 
function turnOrder(lobby){
  return lobby.toSorted((a, b) => a.initiative - b.initiative)
}

// turn logic function pseudocode
// base case: check if lobby[0] hp is 0 or if lobby[1...x] is a combined 0. if so, execute game end logic
// 1) check turn variable. if turn variable > turnorder array length, set to 0.
// 2) load character moves from lobby[turn variable] 
// 2.5) APPLY STATUSES TO CALCULATIONS ONCE IMPLEMENTED
// 3) if a move has no targeting options (self or aoe), execute code on appropriate targets using value & type from move multiplied by stats
// 4) if a move has targeting options, load a "target" component with (lobby size) buttons
// 5) when the button is pressed, execute as in #3
// 6) increment turn variable
// 7) repeat

// planned: targeting menu jsx component

// planned: HP logic - cap character HP at their max health, and stop it from going below 0. 

// planned: function for party logic that determines what their automatic path of action should be

// planned: game end check function

// planned: dead party member functionality

// planned: status tracking of cooldowns, buffs, debuffs, alive/dead, designed to plug into calculations for every turn

export default function Game() {
  // needs to be abstracted for a character select - currently just pulling characters straight from the dataset to establish a "lobby"
  const lobby = [bossChars.bng, partyChars.war, partyChars.rog, partyChars.clr]

  // using the maxHP values from character stats to set their HP in state and allow it to update 
  const [bossHP, setBossHP] = useState(lobby[0].maxHP);
  const [p1hp, setp1hp] = useState(lobby[1].maxHP);
  const [p2hp, setp2hp] = useState(lobby[2].maxHP);
  const [p3hp, setp3hp] = useState(lobby[3].maxHP)

  // button that takes in the information from a move passed into it 
  // currently directly targeting p1's hp for testing purposes - check turn logic pseudocode for next steps
  function MoveButton({ move }) {
    return (
      <div id="singleMove" key={move.name}>
        <button onClick={() => setp1hp((p1hp) => p1hp - move.value)}>
          {move.name}: {move.value}
        </button>
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
  
  return (
    <>
      <h1>PARTY SMASHER</h1>  
      {nameplate(lobby[0], bossHP)}
      {nameplate(lobby[1], p1hp)}
      {nameplate(lobby[2], p2hp)}
      {nameplate(lobby[3], p3hp)}
      {/* currently just displaying the actionPlate for the boss, not using turn order functionality */}
      {actionPlate(lobby[0])}
    </>
  );
}