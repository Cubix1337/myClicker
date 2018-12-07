//vars

psc1 = document.getElementById("psc1")
psc2 = document.getElementById("psc2")
psc3 = document.getElementById("psc3")
psc4 = document.getElementById("psc4")
psc5 = document.getElementById("psc5")
psc6 = document.getElementById("psc6")

pscs = [psc1,psc2,psc3,psc4,psc5,psc6]

cardIndex = 0;
//classes
var swordsman ={
  name:"Swordsman",
  bonuses:[1,2],
  skills:[1,2],
  availableClasses:[novice,swordsman]
}

var novice ={
  name:"Novice",
  bonuses:[1,2],
  skills:[1,2],
  availableClasses:[swordsman]
}

function Card (id,name,source,summoned,attack,hp,defence,bounty,bonuses,instance,type){
  this.id = id
  this.name = name
  this.source = source
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
var poring = {
  name:"Poring",
  source:"poring.jpg",
  summoned:"poring.gif",
  attack: 1,
  hp: 3,
  defence:0,
  bounty: 100,
  bonuses:[1,2],
  instance:0,
  type:"mob"
}

var picky = {
  name:"Picky",
  source:"picky.jpg",
  summoned:"picky.gif",
  attack: 2,
  hp: 5,
  defence:0,
  bounty: 100,
  instance:0,
  type:"mob"
}

//bonuses
var bonuses= [
/*0*/  {hp: +5},
/*1*/  {hp: +10},
/*2*/  {attack: +5}
]

//skill cards
//equips
//consumables
var redPotion = {
name:"Red Potion",
source: "redPot.jpg",
type: "consumable",
bonuses:[bonuses[0]],
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
activePlayer.hand.push(new Card(newID, original.name, original.source, original.summoned, original.attack, original.hp,original.defence,original.bounty,original.bonuses,original.instance, original.type))
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
  source = document.createAttribute("src");source.value = "images/"+ card.source;
  image.setAttributeNode(source);image.setAttribute("id", card.name.toLowerCase()+(card.instance+1));image.setAttribute("draggable",true);image.setAttribute("ondragstart","drag(event)");
  target = document.getElementById("player-hand");target.appendChild(image);
  card.instance++;
}

function pve(activePlayer,card){
  //make modal canvas later
  modal.style.display = "block";
  let patck = document.getElementById("player-attack");
  let php = document.getElementById("player-hp")
  patck.innerHTML = activePlayer.attack;
  php.innerHTML = activePlayer.hp;
  let eatck = document.getElementById("enemy-attack");
  let ehp = document.getElementById("enemy-hp");
  let esprite = document.getElementById("enemy-sprite");
  esprite.children[0].src="images/"+card.summoned;
  eatck.innerHTML = card.attack;
  ehp.innerHTML = card.hp;
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
}else{console.log("no")}
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
      console.log("skill")
  case "equipment":
      console.log("equipment")
  case "consumable":
      consume(cardOrder[cardEvalIndex])

  default:
      {}
}}

function timerRunner(activePlayer,card){
pve(activePlayer,card);
timerInt = window.setInterval(function (){
if (card.hp !=0 && card.hp >0 && activePlayer.hp > 0) {card.hp = card.hp - activePlayer.attack;console.log("I ran");pve(activePlayer,card);
if (card.hp !=0 && card.hp >0 && activePlayer.hp > 0) {activePlayer.hp = activePlayer.hp - card.attack;pve(activePlayer,card);
}} else if (activePlayer.hp <= 0){console.log("gameOver");clearInterval(timerInt);}else{card.hp = 0;console.log("card is dead");cardEvalIndex++;clearInterval(timerInt);console.log("I cleared");modal.style.display="none";pveCaller(activePlayer)}
},1500)}


function skillUse(card){
}
function consume(card){
  //iterate through bonuses afterwards
'hp' in card.bonuses[0]?activePlayer.hp+=card.bonuses[0].hp:console.log("failed to find hp key in obj");
'attack' in card.bonuses[0]?activePlayer.hp+=card.bonuses[0].hp:console.log("failed to find attack key in obj")

cardEvalIndex++;
pveCaller(activePlayer)
}

//switch could use iteration as arg or helper function to iterate(ineficient)
// switch (value in card.bonuses[0]) {
//   case expression:
//
//     break;
//   default:

function equip(card){

}
