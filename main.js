//vars
psc1 = document.getElementById("psc1")
psc2 = document.getElementById("psc2")
psc3 = document.getElementById("psc3")
psc4 = document.getElementById("psc4")
psc5 = document.getElementById("psc5")
pscs = [psc1,psc2,psc3,psc4,psc5]

cardIndex = 0;

//bonuses
var bonuses= [
/*0*/  {hp: 5},
/*1*/  {hp: 10},
/*2*/  {attack: 5},
/*3*/  {attack: 2}
]
//skills
var skills = [
bash = {name:"Bash",image: "bash.gif", effectType:"attackAug", skillClass:"Active", v:1, cooldown:2, desc:"Your next attack deals 2x damage"},
doubleAttack = {name:"Double Attack",image: "doubleattack.gif", effectType:"attackAug", skillClass:"Passive", v:1, desc:"Passively has a 50% chance to deal 2x damage on any physical attack", chance:50}
]

//classes
var swordsman ={
  name:"Swordsman",
  skills:[bash],
  availableClasses:[novice,swordsman],
  image: "images/swordm.gif",
  sprite: "images/swordm.gif",
  properties:[]
}

var novice ={
  name:"Novice",
  skills:[bash],
  availableClasses:[swordsman],
  image: "images/novicem.jpg",
  sprite: "images/novicem.gif",
  properties:[],
  desc:"Starter class"
}

var theif ={
  name:"Theif",
  skills:[doubleAttack],
  availableClasses:[novice],
  image: "images/thiefm.jpg",
  sprite: "images/theifm.gif",
  properties:[],
  desc:"Steals things"
}


function Card (id,name,image,summoned,attack,hp,defence,bounty,bonuses,instance,type,v, effectType){
  this.id = id
  this.name = name
  this.image = image
  this.summoned = summoned
  this.attack = attack
  this.hp = hp
  this.defence = defence
  this.bounty = bounty
  this.bonuses = bonuses
  this.instance = instance
  this.type = type
  this.v = v
  this.effectType = effectType
}

//cards
  //mobs
var poring = {name:"Poring",image:"poring.jpg",summoned:"poring.gif",attack: 1,hp: 3,defence:0,bounty: 100,bonuses:[1,2],instance:0,type:"mob"}
var picky = {name:"Picky",image:"picky.jpg",summoned:"picky.gif",attack: 2,hp: 5,defence:0,bounty: 100,instance:0,type:"mob"}

//equips
//consumables
var redPotion = {
name:"Red Potion",
image: "redpot.jpg",
type: "consumable",
effectType:"hpGain",
v:5,
instance:0,
summoned: "items/redpot.jpg"
}

//player objects
var player = {
  name:"Tony",
  hp:20,
  maxHP:20,
  attack:1,
  attackAug:0,
  class: theif,
  hand:[],
  deck: [poring,picky,redPotion],
}

var activePlayer = player
var inPlayPlayer=[];

function objClone(original){
let newID = original.name.toLowerCase() + original.instance
activePlayer.hand.push(new Card(newID, original.name, original.image, original.summoned, original.attack, original.hp,original.defence,original.bounty,original.bonuses,original.instance, original.type, original.v, original.effectType))
}

var enemy = {
  deck:[]
}

console.log(player.hand)

var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function allowDrop(ev) {ev.preventDefault()}
function drag(ev) {ev.dataTransfer.setData("text", ev.target.id);}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // Summons as gif when placed: var src = ev.target.children[0].src;src = src.replace("jpg","gif");ev.target.children[0].setAttribute("src",src)
}

function drawCard(activePlayer){
  var drawnCard;
  drawnCard = activePlayer.deck[Math.floor(Math.random() *activePlayer.deck.length)]
console.log(drawnCard)
  cardRender(drawnCard);
  objClone(drawnCard);
}

function cardRender(card){
  image = document.createElement("IMG");
  source = document.createAttribute("src");source.value = "images/"+ card.image;
  image.setAttributeNode(source);image.setAttribute("id", card.name.toLowerCase()+(card.instance+1));image.setAttribute("draggable",true);image.setAttribute("ondragstart","drag(event)");
  target = document.getElementById("player-hand");target.appendChild(image);
  card.instance++;
}

var cardOrder = [];
var cardEvalIndex = 0;
function inPlaySorter(){
  for (var i = 0; i < pscs.length; i++) {
    if (pscs[i].hasChildNodes() == true){cardOrder.push(getCardObj(pscs[i].children[0].id));}
}
console.log(cardOrder)
}

function getCardObj(target){
let src = document.getElementById(target);
var i;var handPos;
for (var i = 0; i < activePlayer.hand.length; i++) {
  if(activePlayer.hand[i].id == src.id){handPos = i;}
}return activePlayer.hand[handPos];
//hand pos is an index
}

function evaluator(){
if (cardOrder.length > cardEvalIndex){
return cardOrder[cardEvalIndex].type
}else{console.log("no");modal.style.display="none";}
}

function pveCaller(activePlayer){
cardOrder = []
inPlaySorter();
switch(evaluator(activePlayer)) {
  case "mob":
      cardEvalIndex<5? timerInit(cardOrder[cardEvalIndex]):console.log(">5")
      break;
  case "mvp":
      console.log("mvp")
      break;
  case "skill":
      skillUse(cardOrder[cardEvalIndex])
  case "equipment":
      console.log("equipment")
  case "consumable":
      consume(cardOrder[cardEvalIndex])

  default:
      {}
}}

function effectApply(effect){
  switch (effect.effectType){
  case "hpGain":
  activePlayer.hp += effect.v;
  console.log("You have gained "+effect.v+" hp. Your current hp is: "+activePlayer.hp+".");
  break;
  case "attackAug":
  activePlayer.attackAug = effect.v*activePlayer.attack;
  console.log("You have gained "+activePlayer.attackAug+" attack. Your current attack is: "+(activePlayer.attackAug+activePlayer.attack)+".");
  // cardEvalIndex++;
  }
}

function skillUse(effect){
effectApply(effect);
effect.cooldown = 2;
}

function consume(card){
  let esprite = document.getElementById("enemy-sprite").children[0];
  let eatck = document.getElementById("enemy-attack")
  eatck.style.visibility="hidden";
  let patck = document.getElementById("player-attack")
  let ehp = document.getElementById("enemy-hp")
  ehp.style.visibility="hidden";
  let php = document.getElementById("player-hp")
  esprite.src="images/"+card.summoned;esprite.style.opacity=1;esprite.classList.remove('deathanim');esprite.classList.add("attackanim")
  modal.style.display="block";
  effectApply(card);
cardEvalIndex++;
console.log("card comsumed")
setTimeout(function(){patck.innerHTML = activePlayer.attack;php.innerHTML = activePlayer.hp},1500);
setTimeout(function(){pveCaller(activePlayer);eatck.style.visibility="visible";
ehp.style.visibility="visible";
},2000);
}

function updateHP(card){
let patck = document.getElementById("player-attack");let php = document.getElementById("player-hp");patck.innerHTML = activePlayer.attack+activePlayer.attackAug;php.innerHTML = activePlayer.hp;let eatck = document.getElementById("enemy-attack");let ehp = document.getElementById("enemy-hp");eatck.innerHTML = card.attack;ehp.innerHTML = card.hp;
}

function equip(card){

}

function playerHeaderPopulator(){
let phead = document.getElementById("player-header");
phead.innerHTML="<img id ='player-header-image' src='"+player.class.image+"'><p>Name: "+player.name+"</p><p>HP: "+player.hp+"</p><p>Class: "+player.class.name+"</p><p>Zeny: </p><div id='skill-bar'></div>";
let pskills = document.getElementById("skill-bar");
for (var i = 0; i < activePlayer.class.skills.length; i++) {
pskills.innerHTML+= "<img onclick='skillUse("+activePlayer.class.skills[i].name.toLowerCase()+")' src='images/"+activePlayer.class.skills[i].image+"'>"
}
}

playerHeaderPopulator()
//phaser
// var config = {
//        type: Phaser.AUTO,
//        width: 850,
//        height: 250,
//        backgroundColor: '#ffffff',
//        scene: {
//            preload: preload,
//            create: create,
//            update: update
//        },
//        parent:'divider'
//    };
//    var game = new Phaser.Game(config);var anim;var sprite;var progress;var frameView;
//
//    function preload ()
//    {
//      this.load.spritesheet('drops', 'images/drops.png', { frameWidth: 41, frameHeight: 39 });
//      this.load.image('novicem','images/novicem.gif')
//    }
//    function create ()
//    {
//      var config = {
//        key: 'static',
//        frames: this.anims.generateFrameNumbers('drops'),
//        frameRate: 10,
//        repeat: -1
//    };
//    anim = this.anims.create(config);
//    console.log(anim);
//    sprite = this.add.sprite(250, 125, 'drops').setScale(1);
//    console.log(sprite);
//    sprite.anims.load('static');
//    sprite.anims.play('static');
//    this.add.image(450, 125, 'novicem').setOrigin(0, 0);
//    }
//
//    function update ()
//    {}

function timerInit(card){
  let esprite = document.getElementById("enemy-sprite").children[0];
  let psprite = document.getElementById("player-sprite").children[0];
  esprite.src="images/"+card.summoned;esprite.style.opacity=1;esprite.classList.remove('deathanim')
  psprite.src= activePlayer.class.sprite;
  updateHP(card);
  modal.style.display="block";
//combat engine
  newTimer = window.setInterval(function (){
  setTimeout(function () {psprite.classList.remove('attackanim')},500)
  setTimeout(function () {esprite.classList.remove('attackanim')},500)
switch (card.hp > 0) {
  case card.hp !=0 && card.hp >0 && activePlayer.hp > 0:
    card.hp-activePlayer.attack <=0 ? card.hp = 0:card.hp-= damageCalc();updateHP(card);activePlayer.attackAug = 0;psprite.classList.add('attackanim')
    if (card.hp >0){
      activePlayer.hp = activePlayer.hp -= card.attack;
      updateHP(card);esprite.classList.add('attackanim')
      activePlayer.hp<=0 ?   setTimeout(function () {alert("omae wa mou shindeiru")},1000) && clearInterval(newTimer):console.log(activePlayer.hp);
    } else{
      card.hp=0;console.log("card dead");esprite.style.opacity=0;
      setTimeout(function () {clearInterval(newTimer);cardEvalIndex++;pveCaller(activePlayer)}, 1000);
    }
    case activePlayer.hp <=0:

    break;
  default:{}
}},1500)
}

function passiveCheck(){
var result =""
for (var i = 0; i < activePlayer.class.skills.length; i++) {
activePlayer.class.skills[i].skillClass=="Passive" && activePlayer.class.skills[i].effectType=="attackAug" ? result = activePlayer.class.skills[i]:console.log(false)
}
return result;
}

function damageCalc(){
activePlayer.attackAug = 0;
let result = passiveCheck();
if (checker(result.chance)==true){
effectApply(result)}
let dmg = activePlayer.attack+activePlayer.attackAug
return (dmg);
}

function checker(chance){
let proc = false;
let x = Math.floor(Math.random() *100);
x>chance? proc =true: proc = false;
return proc;
}
