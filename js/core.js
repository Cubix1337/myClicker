//constructors
 function Job(id,name,attackv,imgpath,equipt,skills,jobdesc,empcost) {
  this.id = id;  this.name = name;  this.attackv = attackv;  this.imgpath = imgpath;  this.equipt = equipt;  this.skills = skills;  this.jobdesc = jobdesc;  this.empcost = empcost;
}
function Card(id,name,hp,attack,bounty,imgpath,race,color) {
  this.id = id;  this.name = name;  this.hp = hp;  this.attack = attack;  this.bounty = bounty;  this.imgpath = imgpath;  this.race = race;  this.color= color;
}
function Equiptment(id,name,hpBoon,attackBoon,cost,imgpath,job,color,slot) {
  this.id = id;  this.name = name;  this.hpBoon = hpBoon;  this.attackBoon = attackBoon;  this.cost = cost;  this.imgpath = imgpath;  this.job = job;  this.color= color;  this.slot =slot;
}
function Consumable(id,name,hpBoon,attackBoon,cost,imgpath,job,color){
  this.id = id;  this.name = name;  this.hpBoon = hpBoon;  this.attackBoon = attackBoon;  this.cost = cost;  this.imgpath = imgpath;  this.job = job;  this.color= color;
}
function Skill(id,name,hpBoon,attackBoon,imgpath, desc){
  this.id = id;  this.name = name;  this.hpBoon = hpBoon;  this.attackBoon = attackBoon; this.imgpath = imgpath; this.desc= desc;
//add skill type and bonus effect to it, then resolve them  later
}

//Variables
equips =[
  appleOArcher = new Equiptment(0,"Apple-O-Archer",0,20,500,"apple-o-archer","all","neutral","headgear"),
  sword = new Equiptment(1,"Sword",0,20,500,"sword","all","neutral","weapon"),
]

playerEquips = [];

skills=[
bash= new Skill(0,"Bash",0,2,"bash","Deals 1.5x damage to next enemy"),
swordMastery= new Skill(1,"Sword Mastery",0,2,"swordmastery","Passively increases damage by 2 when a sword is equipt")
]

jobs = [
  novice = new Job (0,"Novice",1,"novicem",[],[skills[0],skills[1]],"The most basic job",0),
  swordsman = new Job (1,"Swordsman",5,"swordm",[],[skills[0]],"The most basic job",5),
  magician = new Job (2,"Magician",2,"magicm",[],[skills[0],skills[1]],"The most basic job",5),
  archer = new Job (3,"Archer",4,"archm",[],[skills[1]],"The most basic job",5),
  acolyte = new Job (4,"Acolyte",3,"acom",[],[skills[0],skills[1]],"The most basic job",5),
  merchant = new Job (5,"Merchant",2,"merchm",[],[skills[0]],"The most basic job",5),
  theif = new Job (6,"Theif",2,"theifm",[],[skills[1]],"A street-rat theif",5),
  knight = new Job (7,"Knight",7,"knightm",[],[skills[0],skills[1]],"A Knight",10),
  crusader = new Job (8,"Crusader",6,"crusaderm",[],[skills[0]],"A Crusader",10)
];

base = 1;
hand = [];
playerHand = document.getElementById("hand");
cards = [
picky = new Card(0,"Picky",5,2,700,"picky","Brute","blue"),
poring = new Card(1,"Poring",3,1,400,"poring","Demi-Human","red")
]

playerConsmables = [];

consumables = [
emperium = new Consumable(0,"Emperium",0,0,1000,"emperium","all","neutral"),
redPot= new Consumable(1,"Red Potion",5,0,100,"redpot","all","neutral"),
orangePot= new Consumable(2,"Orange Potion",10,0,200,"orangepot","all","neutral"),
yellowPot= new Consumable(3,"Yellow Potion",15,0,300,"yellowpot","all","neutral")
]

purchasableItems = [];

MODALIMG = document.getElementById("modal-img");
MODALCONTENT = document.getElementById("modal-content");
BATTLEBOXPLAYER = document.getElementById("battle-box-player")
BATTLEBOXENEMY = document.getElementById("battle-box-enemy")
battleBox = document.getElementById("battle-box");
playerSpriteCont = document.getElementById("player-sprite-container");
playerSprite= document.getElementById("player-sprite");
handIndex = 0;
zenyDisplay = document.getElementsByClassName("zeny")

availableCells = [];
sCells = document.getElementsByClassName("summon-cell")
pCells = [sCells[0],sCells[1],sCells[2],sCells[3],sCells[4],sCells[5],sCells[6],sCells[7]];
eCells = [sCells[8],sCells[9],sCells[10],sCells[11],sCells[12],sCells[13],sCells[14],sCells[15]];

playerDeck= [];
enemyDeck = [];
inPlayPlayer = ["","","",""];
inPlayPlayerIndex = 0;
inPlayEnemy = [];
activeDeck = playerDeck;
turn = "player";
player = jobs[0];
playerHealth = 20;
enemy = inPlayPlayer[0];
enemyHealth = 20;
mobHealth =0;
timerRunning = false;
enemyPlayer = jobs[0];
playerZeny = 3000;
enemyZeny = 0;
playerEmps = 5;
enemyEmps = 0;
availableClasses = [];
availableClassesIndex = 0;

//main code begins
function assembleDeck(){
  playerDeck.push(cards[0],cards[1])
}

function cardRender(card){
image = document.createElement("IMG");
source = document.createAttribute("src")
source.value = "images/"+ card.imgpath+".jpg";
image.setAttributeNode(source)
target = document.createElement("DIV");
containerId = document.createAttribute("id")
containerId.value = "cardcontainers"+handIndex;
target.setAttribute("class", "cardcontainers");
target.setAttributeNode(containerId);
target.appendChild(image)
target.addEventListener('click',selectCard,false)
image.addEventListener('wheel', zoomIn,false)

handIndex++
}

function cardDraw() {
drawnCard =  activeDeck[Math.floor(Math.random() *activeDeck.length)]
console.log(drawnCard)
cardRender(drawnCard)
playerHand.appendChild(target);
hand.push(drawnCard)
}

assembleDeck();

function selectCard(e){
selectedCard = e.target;
selectedCard.style.border="1px solid blue";
console.log(selectedCard);
availableCellsChecker()
console.log(selectedCard.parentElement)
}

function placeCard(e){
p = e.target;
console.log(p);
if (turn == "player")  {
for (var i = 0; i < pCells.length; i++) {
pCells[i].removeEventListener('click',placeCard,false);
pCells[i].style.border="1px solid black";
}
  }

if (turn == "enemy")  {
for (var i = 0; i < eCells.length; i++) {
eCells[i].removeEventListener('click',placeCard,false);
eCells[i].style.border="none";}
    }
selectedCard.style.border="none";
playerHand.removeChild(selectedCard.parentElement)
p.appendChild(selectedCard)
getCardObj(selectedCard)
inPlayPlayer[p.id-1] = hand[handPos]
hand.splice(handPos,1)
console.log(hand)
}

function availableCellsChecker(){
  if (turn == "player")  {
  for (var i = 0; i < pCells.length; i++) {
    if(pCells[i].hasChildNodes() == false){
      pCells[i].addEventListener('click',placeCard,false);
      pCells[i].style.border="1px solid blue";
      }
    }
  }
  if (turn == "enemy"){
  for (var i = 0; i < eCells.length; i++) {
    if(eCells[i].hasChildNodes() == false){
      eCells[i].addEventListener('click',placeCard,false)
      }
    }
  }
}

//multi-purpose array obj property search
function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i].attr == value) {
            console.log[i];
        }
    }
    return -1;
}

function getCardObj(target){
let src = target.getAttribute("src")
src = src.slice(7,(src.length-4))
console.log(src)
var i;
for (var i = 0; i < hand.length; i++) {
  if(hand[i].imgpath == src){handPos = i;}
}
}
//  SCROLL WHEEL EVENT LISTENER
function zoomIn(e) {
if (e.deltaY < 0) {
  console.log(e)
  console.log(e.target)
document.getElementById('modal').style.display='block';
MODALIMG.src = e.target.src;
modalContent.style.animationName = "zoom";
}};

var modalContent = document.getElementById('modal-content');
var modal = document.getElementById('modal');
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display="none";
}
}
window.onwheel = function(event) {
if (event.deltaY > 0) {

modalContent.style.animationName = "zoom-out";
function hide(){
modal.style.display="none";
}
setTimeout(hide,400);
}
}

//battle related
function mobBattle(unit){
enemy = inPlayPlayer[inPlayPlayerIndex];
BATTLEBOXPLAYER.src = player.imgpath+".gif";
BATTLEBOXENEMY.src = "images/"+enemy.imgpath+".gif";
battleBox.style.display = "block";

 patk = document.getElementById("player-attack")
 php = document.getElementById("player-health")
 eatk = document.getElementById("enemy-attack")
 ehp = document.getElementById("enemy-health")

patk.innerText = player.attackv;
php.innerText = playerHealth;
eatk.innerText = enemy.attack;
ehp.innerText = enemy.hp;
mobHealth = ehp.innerText;
let goldDropped = document.getElementsByClassName('grid-item')[2];
goldDropped.innerText="Gold: "+enemy.bounty;
}

function playerBattle(){
  enemy = enemyPlayer;
  BATTLEBOXPLAYER.src = player.imgpath+".gif";
  BATTLEBOXENEMY.src = enemy.imgpath+".gif";
  battleBox.style.display = "block";
  patk.innerText = player.attackv;
  php.innerText = playerHealth;
  eatk.innerText = enemy.attackv;
  ehp.innerText = enemyHealth;
  enemyHealth = ehp.innerText;
}

function pvpTrigger(){
fightTimer = setInterval(pvp,1500);
playerBattle();
}

function pvp(){
timerRunning = true;

if (playerHealth >0 && enemyHealth >0){
  BATTLEBOXPLAYER.classList.add("attackanim");
  BATTLEBOXENEMY.classList.add("attackanim");
  php.innerText = removeHP(playerHealth,enemy.attackv);
  playerHealth = php.innerText;
  ehp.innerText = removeHP(enemyHealth,player.attackv);
  enemyHealth = ehp.innerText;
  playerDeadCheck();
  console.log("1 loop ran");
  setTimeout(function(){BATTLEBOXPLAYER.classList.remove("attackanim");BATTLEBOXENEMY.classList.remove("attackanim")},800);
}
if (enemyHealth <=0){timerRunning =false;clearInterval(fightTimer);
console.log("timer stopped");
setTimeout(function(){battleBox.style.animationName ="zoom-out";},1000);
setTimeout(function(){battleBox.style.display="none";battleBox.style.animationName = "none"},1700);
}
}

function fightTrigger(){
fightTimer = setInterval(runFight,1500)
mobBattle(enemy);}

function runFight(){
timerRunning = true;
if (playerHealth >0 && mobHealth >0){
  BATTLEBOXPLAYER.classList.add("attackanim");
  BATTLEBOXENEMY.classList.add("attackanim");
  let damagePlayer = document.getElementById("damagePlayer");
  let damageEnemy = document.getElementById("damageEnemy");
  damagePlayer.classList.add("damage-dealt"); damagePlayer.innerText = enemy.attack;
  damageEnemy.classList.add("damage-dealt"); damageEnemy.innerText = player.attackv;
  php.innerText = removeHP(playerHealth,enemy.attack);
  playerHealth = Number(php.innerText);
  ehp.innerText = removeHP(mobHealth,player.attackv);
  mobHealth = ehp.innerText;
  playerDeadCheck();
  console.log("1 loop ran");
  setTimeout(function(){BATTLEBOXPLAYER.classList.remove("attackanim");BATTLEBOXENEMY.classList.remove("attackanim");damagePlayer.classList.remove("damage-dealt");damageEnemy.classList.remove("damage-dealt");},800);
}
if (mobHealth <=0){timerRunning =false;clearInterval(fightTimer);
console.log("timer stopped");acquireZeny();inPlayPlayerIndex++;
setTimeout(function(){battleBox.style.animationName ="zoom-out";},1000);
setTimeout(function(){battleBox.style.display="none";battleBox.style.animationName = "none"},1700);
setTimeout(function(){moveUnit()},1700);
setTimeout(function(){cardChecker()},2700);
}
}

function turnRunner(){
  if (inPlayPlayerIndex < 4){
    mobBattle(enemy);fightTrigger();
  }else{shopTrigger();console.log("elapsed")}
}

function cardChecker(){
if (inPlayPlayerIndex > 3){
  shopTrigger();afterTurnCleanse("player");
}

else if (inPlayPlayer[inPlayPlayerIndex].constructor.name=="Consumable")
{
  cardActivate(inPlayPlayer[inPlayPlayerIndex])
  consumeItem();
  inPlayPlayerIndex++;
  setTimeout(function(){moveUnit()},1700);
  setTimeout(function(){cardChecker()},2700);
}

else if(inPlayPlayer[inPlayPlayerIndex].constructor.name=="Card")
 {turnRunner();
  console.log("monster");
}
else{
  console.log("empty cell");inPlayPlayerIndex++;
  setTimeout(function(){moveUnit()},1000);
  setTimeout(function(){cardChecker()},2000)
}
}

function consumeItem(){
  playerHealth = playerHealth + inPlayPlayer[inPlayPlayerIndex].hpBoon;
  console.log(playerHealth);
  player.attackv = player.attackv + inPlayPlayer[inPlayPlayerIndex].attackBoon;
  console.log(player.attackv);
}

function afterTurnCleanse(whose){
  if (whose == "player"){
    inPlayPlayer = ["","","",""];
} else {
  inPlayEnemy = ["","","",""];}

for (var i = 0; i < pCells.length; i++) {
  if (pCells[i].hasChildNodes()){
  pCells[i].removeChild(pCells[i].childNodes[0]);}
}
inPlayPlayerIndex=0;
moveUnit();
}

function cardActivate(card){
let modal = document.getElementById("activate-modal")
  let target = document.getElementById('activate-modal-img');
  let content = document.getElementById('activate-content');
  target.setAttribute("src","images/"+card.imgpath+".jpg");
  modal.style.display="block";
if (inPlayPlayer[inPlayPlayerIndex].constructor.name=="Consumable")
 {console.log("I run")
   content.innerText= "You gained "+inPlayPlayer[inPlayPlayerIndex].hpBoon+"hp. You now have "+(playerHealth+inPlayPlayer[inPlayPlayerIndex].hpBoon)+"hp."}

  setTimeout(function(){modal.style.animationName ="zoom-out";},1000);
  setTimeout(function(){modal.style.display="none";modal.style.animationName = "none"},1700);
}

function removeHP(unit,ammount){
unit = (unit - ammount);
  return unit;
}

function playerDeadCheck(){
  if(playerHealth <=0){timerRunning =false;alert("Game over yeahhhhh!!!")}
}

function acquireZeny(){
  playerZeny += inPlayPlayer[inPlayPlayerIndex].bounty;
  updateZeny();
}

function moveUnit(){
  if(base < 4){
playerSpriteCont.style.left = ""+(100*base)+"px";
base++;
}else{base = 0;playerSpriteCont.style.left ="0px"}
}

//shop related

function shopTrigger(){
//add phase Animation alert style slide-in
document.getElementById('shop-menu-modal').style.display="block";updateZeny();
}

function shopPopulator(type){
if (type == 'items'){
  var items1 = document.getElementById('items1');
  var items2 = document.getElementById('items2');
  var items3 = document.getElementById('items3');
  items1.children[0].children[1].innerHTML="Name: "+consumables[0].name+"<br>Cost: "+consumables[0].cost+"z"
  items2.children[1].src= "images/"+consumables[1].imgpath+".gif";
  items2.children[0].children[1].innerHTML="Name: "+consumables[1].name+"<br>Cost: "+consumables[1].cost+"z"
  items3.children[1].src= "images/"+consumables[2].imgpath+".gif";
  items3.children[0].children[1].innerHTML="Name: "+consumables[2].name+"<br>Cost: "+consumables[2].cost+"z"
purchasableItems[0] = consumables[0];
purchasableItems[1] = consumables[1];
purchasableItems[2] = consumables[2];

}
if (type == "weapons"){
  var weapons1 = document.getElementById('weapons1');
  var weapons2 = document.getElementById('weapons2');
  var weapons3 = document.getElementById('weapons3');

}
if (type == "armours"){
  var armours1 = document.getElementById('armours1');
  var armours2 = document.getElementById('armours2');
  var armours3 = document.getElementById('armours3');
}
}

function purchase(item){
if (playerZeny >= purchasableItems[item].cost){
    playerZeny -= purchasableItems[item].cost;
      if (item != 0)
        {cardRender(purchasableItems[item]);hand.push(purchasableItems[item]);cardRender(purchasableItems[item]);playerHand.appendChild(target);updateZeny();}
        else {
          playerEmps++;updateZeny();
        }
} else{alert("You have insufficient Zeny to purchase this item.");}
}

function updateZeny(){
  for (var i = 0; i < zenyDisplay.length; i++) {
    zenyDisplay[i].innerHTML = playerZeny+"z";
  }
}

function availableClassesEvaluator(){
  if (player.name=="Novice"){
    console.log(player.name)
    availableClasses.push(jobs[1],jobs[2],jobs[3],jobs[4],jobs[5],jobs[6])
  }
  if (player.name=="Swordsman"){
    console.log(player.name)
    availableClasses.push(jobs[7],jobs[8])
  }

}

document.getElementsByClassName("tablink")[0].click();

function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  document.getElementById(tabName).style.display = "flow-root";
}

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.opacity="0";
    setTimeout(function(){div.style.display='none';},600);
  }
}

function classCarousel(direction){
var a,b,c,d;
a = document.getElementById("class1")
b = document.getElementById("class2")
c = document.getElementById("class3")
d = document.getElementById("class-desc")
e = document.getElementById("class-stats")
f = document.getElementById("class-skills")

if (direction == 'initial'){
  a.src = "";
  b.src = availableClasses[availableClassesIndex].imgpath+".gif";
  c.src = availableClasses[availableClassesIndex+1].imgpath+".gif";
}

if (direction == "right" && availableClassesIndex < availableClasses.length-1){
  availableClassesIndex++;
}

if (direction == "left" && availableClassesIndex>0){
  availableClassesIndex--;
}

if (availableClassesIndex ==0) {
a.src = "";
b.src = availableClasses[availableClassesIndex].imgpath+".gif";
}else {
  a.src = availableClasses[availableClassesIndex-1].imgpath+".gif";
}
b.src = availableClasses[availableClassesIndex].imgpath+".gif";

if (availableClassesIndex >=availableClasses.length-1){
c.src = "";
}else{c.src = availableClasses[availableClassesIndex+1].imgpath+".gif"}

d.innerHTML = "<h2>"+availableClasses[availableClassesIndex].name+"</h2>"+"<p>"+availableClasses[availableClassesIndex].jobdesc;+"</p>";
e.innerHTML = "<p>Attack: "+availableClasses[availableClassesIndex].attackv+"</p>";

var i = 0;
var skillText = "";
for (var i = 0; i < availableClasses[availableClassesIndex].skills.length; i++) {
  skillText+= '<div class="popup"><span class="popuptext" id="sk'+i+'pop"></span><img src="'+availableClasses[availableClassesIndex].skills[i].imgpath+'.gif" id="sk'+i+'"class="popup" onclick="skillPopup('+i+')"></div>'
 }
f.innerHTML = skillText;
}

function skillPopup(skillID) {
    var idName = "sk"+skillID+"pop";
    console.log(idName);
    var popup = document.getElementById(idName);
    console.log(skillID);
    console.log(popup);
    popup.classList.toggle("fader");
    popup.innerHTML=skills[skillID].desc;
}



function classChangeModalLoader(){
availableClasses = [];
availableClassesIndex = 0;
var i = document.getElementById("class-change-modal");
i.style.display = "block";
var t = document.getElementById("class-change-carousel");
t.style.display="flex";
availableClassesEvaluator();
classCarousel('initial');
}

function classSelect(){
  if (playerEmps >=5){
    player = availableClasses[availableClassesIndex];
    playerSprite.src = player.imgpath+".gif";
    playerEmps = playerEmps-5;
    availableClasses = [];
  } else{document.getElementById('confirmation-modal').style.display="none";alert("You have insufficient Emps")}
console.log(playerEmps)
}

function confirmationTrigger(){
document.getElementById('confirmation-modal').style.display="block"
document.getElementById('confirmation-modal-text').innerHTML="<p> Are you sure you wish to change to this class? This cannot be undone.</p>"
}
