How Game Logic Works:
function main() {
     while(running) {
         processInput()
         update()
         draw()
}

data: existing data that is not modified in-game except by status, but should always start the same way

components: take in data and pump out jsx components, but these jsx components only trigger functions written elsewhere

game logic: 
  1) select characters for lobby. one boss, four party members. the four party members can be 1-4 players*.
  2) create lobby. characters get a state object: character, hp, effects, cast timer, cooldown
  3) gameplay loop logic
    a) check character stats for speed, resolve statuses and any duplicate speed values
    b) create turn queue
    c) if the player is the character whose turn it is, give them a jsx component with turn buttons (and targeting if necessary)
    d) else, show player who is taking their turn and what happens
    e) when a turn button is pressed, execute a function that goes through all the move data and resolves it based on target
    f) check at the end of every turn whether the boss is dead AND whether the entire party is dead. if so, end screen
    g) else, use a character update function to tick effects/cooldowns/casts, and update stats
    h) when the end of the turn array is reached, because f is really a base case, just start back at 3a
  4) end screen has a button that takes everyone in a lobby back to step 1

in terms of game logic, 1 and 3c-e are processInput. everything else is update. draw comes later
* when we get around to multiplayer