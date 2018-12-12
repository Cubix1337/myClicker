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
var skills= [
/*0*/{name:"Bash",image: "bash.gif",bonuses:[bonuses[0],bonuses[2]], cooldown:2},
]
//classes
var swordsman ={
  name:"Swordsman",
  bonuses:[1,2],
  skills:[1,2],
  availableClasses:[novice,swordsman],
  image: "images/swordm.gif"
}

var novice ={
  name:"Novice",
  bonuses:[1,2],
  skills:[skills[0]],
  availableClasses:[swordsman],
  image: "images/novicem.jpg"
}

function Card (id,name,image,summoned,attack,hp,defence,bounty,bonuses,instance,type){
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
bonuses:[bonuses[0],bonuses[2]],
instance:0
}

//player objects
var player = {
  name:"Tony",
  hp:20,
  maxHP:20,
  attack:1,
  class: novice,
  hand:[],
  deck: [poring,picky,redPotion],
}

var activePlayer = player
var inPlayPlayer=[];

function objClone(original){
let newID = original.name.toLowerCase() + original.instance
activePlayer.hand.push(new Card(newID, original.name, original.image, original.summoned, original.attack, original.hp,original.defence,original.bounty,original.bonuses,original.instance, original.type))
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

function pve(activePlayer,card){
//make modal canvas later
updateHP(card);
modal.style.display="block";
  setTimeout(function(){
  let esprite = document.getElementById("enemy-sprite");
  esprite.children[0].src="images/"+card.summoned;
  let psprite = document.getElementById("player-sprite").children[0];
psprite.classList.remove('attackanim');esprite.children[0].classList.remove('attackanim');esprite.children[0].classList.remove('deathanim')
},800)}

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
      cardEvalIndex<5? timerRunner(activePlayer,cardOrder[cardEvalIndex]):console.log(">5")
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

function timerRunner(activePlayer,card){
pve(activePlayer,card);
let psprite = document.getElementById("player-sprite").children[0];
let esprite = document.getElementById("enemy-sprite").children[0];
psprite.classList.remove('attackanim');
esprite.classList.remove('attackanim');
timerInt = window.setInterval(function (){
if (card.hp !=0 && card.hp >0 && activePlayer.hp > 0) {card.hp = card.hp - activePlayer.attack;psprite.classList.add('attackanim');pve(activePlayer,card)}
if (card.hp !=0 && card.hp >0 && activePlayer.hp > 0) {activePlayer.hp = activePlayer.hp - card.attack;esprite.classList.add('attackanim');pve(activePlayer,card)}
if (activePlayer.hp <= 0){console.log("gameOver");clearInterval(timerInt)};
if (card.hp<=0){card.hp = 0;updateHP(card);esprite.classList.add('deathanim');cardEvalIndex++;clearInterval(timerInt);pveCaller(activePlayer)}
},2000)}

function skillUse(skill){
  for (var i = 0; i < card.bonuses.length; i++) {
  'hp' in card.bonuses[i]?activePlayer.hp+=card.bonuses[i].hp:console.log("failed to find hp key in obj");
  'attack' in card.bonuses[i]?activePlayer.attack *= card.bonuses[i].attack:console.log("failed to find attack key in obj")
  }
cardEvalIndex++;
}
function consume(card){
  for (var i = 0; i < card.bonuses.length; i++) {
  'hp' in card.bonuses[i]?activePlayer.hp+=card.bonuses[i].hp:console.log("failed to find hp key in obj");
  'attack' in card.bonuses[i]?activePlayer.attack+=card.bonuses[i].attack:console.log("failed to find attack key in obj")
  }
cardEvalIndex++;
pveCaller(activePlayer)
}

function updateHP(card){
let patck = document.getElementById("player-attack");let php = document.getElementById("player-hp");patck.innerHTML = activePlayer.attack;php.innerHTML = activePlayer.hp;let eatck = document.getElementById("enemy-attack");let ehp = document.getElementById("enemy-hp");eatck.innerHTML = card.attack;ehp.innerHTML = card.hp;
}

function equip(card){

}

function playerHeaderPopulator(){
let phead = document.getElementById("player-header");
phead.innerHTML="<img src='"+player.class.image+"'><p>Name: "+player.name+"</p><p>HP: "+player.hp+"</p><p>Class: "+player.class.name+"</p><p>Zeny: "
phead.innerHTML+="<div id='skillBar'><img src='images/"+activePlayer.class.skills[0].image+"'><img src='images/"+activePlayer.class.skills[0].image+"'><div>"
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
//
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


function timerCall(card){
  pve(activePlayer,card);
timerInit(card)
}

function timerInit(card){    
  modal.style.display="block"
  let psprite = document.getElementById("player-sprite").children[0];
  let esprite = document.getElementById("enemy-sprite").children[0];
newTimer = window.setInterval(function (){
  setTimeout(function () {psprite.classList.remove('attackanim')},500)
  setTimeout(function () {esprite.classList.remove('attackanim')},500)
  console.log("sprites had class removed")
switch (card.hp > 0) {
  case card.hp !=0 && card.hp >0 && activePlayer.hp > 0:
    card.hp-activePlayer.attack <=0? card.hp = 0:card.hp-=activePlayer.attack;updateHP(card);psprite.classList.add('attackanim')
    if (card.hp >0){
        activePlayer.hp -=card.attack;
      updateHP(card);esprite.classList.add('attackanim')      
      console.log(activePlayer.hp);
    } else{
      card.hp=0;console.log("card dead");esprite.style.opacity=0;
      setTimeout(function () {clearInterval(newTimer);console.log("timer is stopped")}, 1000);
    }
    break;
  default:{}
}},2000)
}


function checker(v){
let x = Math.floor(Math.random() *100);
x>v? console.log(x+" procced"):console.log("didnt")
}
