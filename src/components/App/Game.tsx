import { useState } from "react";

// characters, moves, and stats
// action/move creator
function Move(name, type, target, value, castTime, cooldown, effect){
  this.name = name,
  this.type = type,
  this.target = target,
  this.value = value,
  this.castTime = castTime,
  this.cooldown = cooldown,
  this.effect = effect
}

// boss move data
const bossMoves = {
  swt: new Move('Swat', 'damage', 'aoe', 15, 0, 0, null),
  pnc: new Move('Pounce', 'damage', 'single', 30, 0, 0, null),
  grm: new Move('Groom', 'damage', 'self', 25, 0, 3, null),
}

// party move data
const partyMoves = {
  atk: new Move('Attack', 'damage', 'single', 20, 0, 0, null),
  hel: new Move('Heal', 'heal', 'single', 25, 1, 2, null),
}

// boss character creator 
function BossChar(name, maxHP, initiative, moves){
  this.name = name,
  this.maxHP = maxHP,
  this.initiative = initiative, 
  this.moves = moves
}

// boss character data
const bossChars = {
  bng: new BossChar('Bingus, the Cat Deity', 500, 20, [bossMoves.swt, bossMoves.pnc, bossMoves.grm]),
}

// party character creator
function PartyChar(role, name, maxHP, phys, magic, initiative, moves){
  this.role = role,
  this.name = name, 
  this.maxHP = maxHP, 
  this.phys = phys, 
  this.magic = magic, 
  this.initiative = initiative, 
  this.moves = moves
}

// party character data
const partyChars = {
  war: new PartyChar('Warrior', 'Beef', 150, 1, 0, 75, [partyMoves.atk]),
  rog: new PartyChar('Rogue', 'Ohoho', 100, 1.25, 0, 15, [partyMoves.atk]),
  clr: new PartyChar('Cleric', 'Silva', 100, 0.75, 1, 50, [partyMoves.atk, partyMoves.hel]),
}

// nameplate components to display character names and the updating HP value
function nameplate(char, hp){
  return (
    <div>
        {char.name}: {hp}
    </div>
  )
}

// targeting logic

// targeting component

// party AI that determines what their automatic path of action should be

// takes in all members of the game lobby and sorts the party array by order of initiative 
function turnOrder(lobby){
  return lobby.toSorted((a, b) => a.initiative - b.initiative)
}

export default function Game() {
  // needs to be abstracted - currently just pulling characters straight from the dataset to establish lobby
  const lobby = [bossChars.bng, partyChars.war, partyChars.rog, partyChars.clr]

  // using the maxHP values on character stats to set their HP in state and allow it to update 
  const [bossHP, setBossHP] = useState(lobby[0].maxHP);
  const [p1hp, setp1hp] = useState(lobby[1].maxHP);
  const [p2hp, setp2hp] = useState(lobby[2].maxHP);
  const [p3hp, setp3hp] = useState(lobby[3].maxHP)

  // button that takes in the information from a move passed into it 
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
  // content = planes.map(plane => <PlaneEntry key={plane.id} plane={plane} />)
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
      <h1>Party Smasher</h1>  
      {nameplate(lobby[0], bossHP)}
      {nameplate(lobby[1], p1hp)}
      {nameplate(lobby[2], p2hp)}
      {nameplate(lobby[3], p3hp)}
      {actionPlate(lobby[0])}
    </>
  );
}