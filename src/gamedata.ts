
// CHARACTER DATA  & MOVE DATA
// Boss and party move data *could* be condensed into one "moves" object with how they're written,
// but I kept them separate in case we want to have different mechanics/features implemented for bosses vs party characters.

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
    frb: new Move('Fireball', 'damage', 'single', 50, 0, 0, null),
  }
  
  // boss character object creator 
  function BossChar(name, maxHP, speed, moves){
    this.name = name,
    this.maxHP = maxHP,
    this.speed = speed, 
    this.moves = moves
  }
  
  // boss character objects
  const bossChars = {
    bng: new BossChar('Bingus, the Cat Deity', 500, 100, [bossMoves.swt, bossMoves.pnc, bossMoves.grm]),
  }
  
  // party character object creator
  function PartyChar(role, name, maxHP, phys, magic, speed, moves){
    this.role = role,
    this.name = name, 
    this.maxHP = maxHP, 
    this.phys = phys, 
    this.magic = magic, 
    this.speed = speed, 
    this.moves = moves
  }
  
  // party character objects
  const partyChars = {
    war: new PartyChar('Warrior', 'Beef', 150, 1, 0, 25, [partyMoves.atk]),
    rog: new PartyChar('Rogue', 'Ohoho', 100, 1.25, 0, 85, [partyMoves.atk]),
    clr: new PartyChar('Cleric', 'Silva', 100, 0.75, 1, 35, [partyMoves.atk, partyMoves.hel]),
    wiz: new PartyChar('Wizard', 'Lora Lets', 100, 0.1, 1.5, 50, [partyMoves.frb])
  }
  
export {bossMoves, partyMoves, bossChars, partyChars};