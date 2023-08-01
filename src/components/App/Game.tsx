import { useState } from "react";
import * as gamedata from "../../gamedata"
import { current } from "@reduxjs/toolkit";
/* 

NOTE: The lack of styling is intended - I figured it was best to focus primarily on functional game logic.
Styling would also be pointless if all the interactivity is moved over to a rendering engine once we get to that point.

There are a number of comments before the main Game component describing or planning functions that have yet to be written.

Buffs and debuffs are not currently supported. We need a whole "status tracking" system.
There are moves, buffs, and debuffs planned that have not been implemented yet:
https://docs.google.com/spreadsheets/d/1T9uuqdbMwngADsLIWr-WOx_LJgiMs0tZJyaMuB5Xb9I/edit#gid=0

*/

// JSX COMPONENTS

// planned: character select 

// nameplate component to display character name and a live HP value
function nameplates(lobby){
  return (
    <>
      <div>{lobby[0].char.name}: {lobby[0].hp}</div>
      <div>{lobby[1].char.name}: {lobby[1].hp}</div>
      <div>{lobby[2].char.name}: {lobby[2].hp}</div>
      <div>{lobby[3].char.name}: {lobby[3].hp}</div>
      <div>{lobby[4].char.name}: {lobby[4].hp}</div>
    </>
  )
}

// action plate is the component that lets the player interact with the game 
function actionPlate(player){
  if (!player.char) return (<>Waiting...</>)

  let moves = [...player.moves];
  let content = moves.map(move => <MoveButton key={move.name} move={move} />)
  return (
    <>
      {content}
    </>
  )
}

// button that takes in the information from a move passed into it 
// need to revisit - should just be a button that executes logic of other functions passed in to make moving data to server cleaner
function MoveButton({ move }) {
  return (
    <div id="singleMove" key={move.name}>
      {/* <button onClick={() => setp1hp((p1hp) => p1hp - move.value)}>
        {move.name}: {move.value}
      </button> */}
    </div>
  )
}

// planned: game end component



// GAME LOGIC 

// planned: character select 

// planned: function to sort out turn priority by speed, and if speed is equal, resolve turn order

// this takes in all members of the game lobby and returns an array where they are sorted low-high by speed 
function newTurnOrder(lobby){
  return lobby.toSorted((a, b) => b.stats.speed - a.stats.speed)
}

// planned: function for party logic that determines what their automatic path of action should be

// game end check function
function gameOver(lobby){
  if (lobby[0].dead) return true;
  if (lobby[1].dead && lobby[2].dead && lobby[3].dead && lobby[4].dead) return true;
  else return false;
}

// this is an object for every lobby member kept in state which keeps track of character, hp, effects, cast timer/queue, cooldowns, and death
function newStatus(charId){
  const charInfo = {
    char: charId,
    stats: {
      speed: charId.speed,
      phys: charId.phys,
      magic: charId.magic
    },
    hp: charId.maxHP,
    dead: false,
    fx: {},
    cast: {},
    cd: {}
  }
  return charInfo;
}

// this is the function which runs every turn that updates state for every character in the lobby
// question: which values actually need to be passed in here?
// question: can there be an array of characters in state for whom this update needs to tick, to reduce unnecessary executions?
function updateStatus(set, status, move, source, target){
  // needs logic for separate pointers and values
  // consider where "type" on moves determines value passed in
  // if pointer is hp, update hp value accordingly
  // if (pointer === "hp"){

  // }
  // if pointer is dead, boolean. etc
}

/* turn logic: select move & targets, update status on all characters, check if game is over. if it is, set gameOver to true
question: how does this share data with the action plate?
action plate is a collection of buttons and nothing else
action plate could:
  1) set data that this reads
  2) directly invoke this function with data it passes along from button presses (move selected and target)
*/
function turnLogic(player){

}



export default function Game() {
  // STATE DATA
  // using the new status function to build an object that keeps track of each character in state
  // these will need to be abstracted to pull from data that they get from character select, not hard coded
  const [boss, setBoss] = useState(newStatus(gamedata.bossChars.bng));
  const [p1, setp1] = useState(newStatus(gamedata.partyChars.war));
  const [p2, setp2] = useState(newStatus(gamedata.partyChars.rog));
  const [p3, setp3] = useState(newStatus(gamedata.partyChars.clr));
  const [p4, setp4] = useState(newStatus(gamedata.partyChars.wiz));

  const [isGameOver, setIsGameOver] = useState(false)

  const [currentPlayer, setCurrentPlayer] = useState({})

  const lobby = [boss, p1, p2, p3, p4];

  while(isGameOver === false){
    let turnOrder = newTurnOrder(lobby);
    for(let turn = 0; turn < turnOrder.length; turn++){
      setCurrentPlayer(lobby[turn]);
      turnLogic(turnOrder[turn]);
      if (gameOver(lobby)) setIsGameOver(true);
    }

  }

  return (
    <>
      <h1>PARTY SMASHER</h1>  
      {nameplates(lobby)}
      {actionPlate(currentPlayer)}
    </>
  );
}