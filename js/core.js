//Variables and arrays
var a = 0;
var currentGold = 0;
var monHP = 0;
var killedMons = 0;
var singleClickV = 10;
var augmentV = 0;
var countMonsDefeated = 0;


function Monster(id, name, hp, gold, killcount, drops, imgpath, monTier, monType, monClass){
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.gold = gold;
    this.killcount = killcount;
    this.drops = drops;
    this.imgpath = imgpath;
    this.monTier = monTier;
    this.monType = monType;
    this.monClass= monClass;
}
var monsters = [
ogre = new Monster(1,"Mike Miller",100,50,0,1,"ogre",0,"Ogre","Mob"),
goblin = new Monster(2,"Charfeeleon",80,40,0,2,"goblin",0,"Goblin","Mob"),
troll = new Monster(3,"Jinxy",60,30,0,3,"troll",0,"Troll","Mob"),
busoye = new Monster(4,"Busoye - The holy",30,15,0,4,"busoye",0,"Human","Mob"),
kk = new Monster(5,"Karkeui - The mother of deer",20,10,0,0,"kk",0,"Human","Mob"),
weisun = new Monster(6,"Weisun - The all BABA",200,100,0,3,"weisun",0,"Human","Boss")
]

function Item(id, name, cost, sellvalue ,quantity, clickAugment, type, imgpath) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.sellvalue = sellvalue;
    this.quantity = quantity;
    this.clickAugment = clickAugment;
    this.type = type;
    this.imgpath = imgpath;
}

var items = [
wood = new Item(0,"Wood",10,5,0,0,"loot","wood"),
coal = new Item(1,"Coal",10,5,0,0,"loot","coal"),
bronze = new Item(2,"Bronze",20,10,0,0,"loot","bronze"),
steel = new Item(3,"Steel",200,100,0,0,"loot","steel"),
diamond = new Item(4,"Diamond",2000,1000,0,0,"loot","diamond"),
woodenSword = new Item(5,"Wooden Sword",100,50,0,10,"weapon","wooden_sword"),
bronzeSword = new Item(6,"Bronze Sword",100,50,0,20,"weapon","bronze_sword"),
ironSword = new Item(7,"Iron Sword",100,50,0,30,"weapon","iron_sword"),
steelSword = new Item(8,"Steel Sword",100,50,0,40,"weapon","steel_sword"),
diamondSword = new Item(9,"Diamond Sword",100,50,0,50,"weapon","kk")
];

var currentMonster = 4;
var upgrd1 = 0;
var upgrd2 = 0;
var upgrd3 = 0;

var currentWeapon = 0;
var itemList = [];
var dropChance = 10;

var currentTier = 0;
var timeLimit = 5;

GOLD = document.getElementById("gold");
HP = document.getElementById("hp");
BUTTON = document.getElementsByClassName("button");
MONNAME = document.getElementById("monName");
MONIMG = document.getElementById("monimg");
INVENTORY = document.getElementById("item-list");
CRAFTING = document.getElementById("craft-list");
ALERTSUCCESS = document.getElementById("alert-success");
ALERTEQUIP = document.getElementById("equip");
ALERTFAIL = document.getElementById("alert-fail");
ALERTINSF1 = document.getElementById("alert-insufficient-item1");
ALERTINSF2 = document.getElementById("alert-insufficient-item2");
EQUIPMENT = document.getElementById("equipment-list");
TIMER = document.getElementById("timer");

//set to ondoc load later
monsterLoader();

function monsterLoader(){
MONIMG.classList.remove('fader')
MONIMG.classList.add ('faderanim')
currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
HP.innerHTML = currentMonster.hp;
MONNAME.innerHTML = currentMonster.name;
MONIMG.setAttribute("src","Images/" + currentMonster.imgpath + ".png");
setTimeout(function(){MONIMG.classList.add ('fader')},50)
}

function bossLoader(){
TIMER.style.display="block";
//tier = currentTier;
for (i = 0; i < monsters.length; i++) {
if (monsters[i].monClass == "Boss"){
  MONIMG.classList.remove('fader')
  MONIMG.classList.add ('faderanim')
  currentMonster = monsters[i];
  HP.innerHTML = currentMonster.hp;
  MONNAME.innerHTML = currentMonster.name;
  MONIMG.setAttribute("src","Images/" + currentMonster.imgpath + ".png");
  setTimeout(function(){MONIMG.classList.add ('fader')},50)
}
}
var timeLimit = setInterval(timer,1000);
function timer (){
if (TIMER.innerHTML==0){clearInterval(timeLimit);monsterLoader()}
  else{TIMER.innerHTML=TIMER.innerHTML-1}
}
}


function inventoryLoader(){
if (itemList.length === 0){CRAFTING.innerHTML="You've got nothing left!<br><img src='Images/ianbeale.gif'"}
else {
let text =  "<table><tr>";
for (i = 0; i < itemList.length; i++) {
if(itemList[i].type == "loot"){text += "<td>" + "<img src = 'Images/" + itemList[i].imgpath + ".png'" +"<br><br>" + itemList[i].name + ":" + itemList[i].quantity +"</td>";
}
INVENTORY.innerHTML= text;
}
}
}

function equipmentLoader(){
let text =  "<table><tr>";
for (i = 0; i < itemList.length; i++) {
if(itemList[i].type == "weapon"){text += "<td>" + "<img src = 'Images/" + itemList[i].imgpath + ".png'" +"onclick='equipWeapon("+itemList[i].id+")'><br><br>" + itemList[i].name + ":" + itemList[i].quantity +"</td>";EQUIPMENT.innerHTML= text;}
}
}

function equipWeapon(id){
var equipText = document.getElementById("equip-text");
if (id === currentWeapon.id){console.log("you already have this weapon equipt")}
  else{currentWeapon = items[id]
augmentV = currentWeapon.clickAugment;
alertTrigger(5);
equipText.innerHTML= "You have equipped a " + currentWeapon.name + "."
console.log("The weapons bonus is "+currentWeapon.clickAugment+" damage. The current clickLv is " + singleClickV + " plus " + augmentV);
}
}

function recipeLoader(){
let display = recipes.length;
let text =  "<table><tr><th>Item:</th><th>Needed:</th><th>Quantity:</th></tr>"
for (i = 0; i < display; i++) {text +="<tr><td>" + recipes[i].name + ":</td><td>" + items[recipes[i].required[0]].name +"<br>" + items[recipes[i].required[2]].name + "</td><td>" + recipes[i].required[1] +"<br>" +recipes[i].required[3] +"</td><td><button class='button' onclick='craftItem(" + recipes[i].id +")'>Craft</button></td></tr>";}
text += "</table>";
CRAFTING.innerHTML= text;
}

function Recipe (id, name, required, craftedItemId){
  this.id = id;
  this.name = name;
  this.required = required;
  this.craftedItemId = craftedItemId;
}

var recipes = [
woodenSwordRecipe = new Recipe (0,"Wooden Sword",[0,10,3,5],5),
bronzeSwordRecipe = new Recipe (1,"Bronze Sword",[2,10,0,5],6)
]

function craftItem(id){
var successText = document.getElementById("success-text");
var failText = document.getElementById("fail-text");
var insf1Text = document.getElementById("insf1-text");
var insf2Text = document.getElementById("insf2-text");
  var itemtoMake =recipes[id];
  var component1 = itemtoMake.required[0];
  var component2 = itemtoMake.required[2];
  var qty1 = itemtoMake.required[1];
  var qty2 = itemtoMake.required[3];
  console.log(itemtoMake.name + ":")
  console.log(items[component1].name + " : " + qty1)
  console.log(items[component2].name + " : " + qty2);
  if (itemList.includes(items[component1])=== false && itemList.includes(items[component2])=== false){
    failText.innerHTML="You do not posses any of the items needed";alertTrigger(1);
  }
if (itemList.includes(items[component1])=== true && itemList[itemList.indexOf(items[component1])].quantity < qty1)
  {insf1Text.innerHTML="You do not posses enough " + items[component1].name + ".",alertTrigger(2);
console.log("You do not posses enough " + items[component1].name + ".")}
if (itemList.includes(items[component2])=== true && itemList[itemList.indexOf(items[component2])].quantity < qty2)
  {insf2Text.innerHTML="You do not posses enough " + items[component2].name + ".";alertTrigger(3);
console.log("You do not posses enough " + items[component2].name + ".")}
else if (itemList.includes(items[component1])=== true && itemList[itemList.indexOf(items[component1])].quantity >= qty1 && itemList.includes(items[component1])=== true && itemList[itemList.indexOf(items[component2])].quantity >= qty2){
    getItem(itemtoMake.craftedItemId,1);
    removeItem(component1,qty1);
    removeItem(component2,qty2);
    alertTrigger(0);
successText.innerHTML="You have successfully crated a " + itemtoMake.name + ".";}

};

function alertTrigger(status){
if (status == 0){
ALERTSUCCESS.style.backgroundColor="green";ALERTSUCCESS.classList.remove('slideanim');ALERTSUCCESS.classList.add ('slide');ALERTSUCCESS.style.display="block";ALERTSUCCESS.style.opacity="1";}
if (status == 1){
ALERTFAIL.classList.remove('slideanim');ALERTFAIL.classList.add ('slide');ALERTFAIL.style.display="block";ALERTFAIL.style.opacity="1";ALERTFAIL.style.backgroundColor="red";}
if (status == 2){
ALERTINSF1.classList.remove('slideanim');ALERTINSF1.classList.add ('slide');ALERTINSF1.style.display="block";ALERTINSF1.style.opacity="1";ALERTINSF1.style.backgroundColor="red";}
if (status == 3){
ALERTINSF2.classList.remove('slideanim');ALERTINSF2.classList.add ('slide');ALERTINSF2.style.display="block";ALERTINSF2.style.opacity="1";ALERTINSF2.style.backgroundColor="red";}
if (status == 4){
ALERTLOOT.style.backgroundColor="green";ALERTLOOT.classList.remove('slideanim');ALERTLOOT.classList.add ('slide');ALERTLOOT.style.display="block";ALERTLOOT.style.opacity="1";}
if (status == 5){
ALERTEQUIP.style.backgroundColor="green";ALERTEQUIP.classList.remove('slideanim');ALERTEQUIP.classList.add ('slide');ALERTEQUIP.style.display="block";ALERTEQUIP.style.opacity="1";}
}


function getItem(id,times){
if (itemList.includes(items[id])){
    items[id].quantity +=times;
  console.log("you already posses this item")} else
    {itemList.push(items[id])
    items[id].quantity +=times;}
  console.log("you gained " + items[id].name)
  console.log(itemList)
};

function removeItem(id,qty){
//if (itemList.includes(items[id])){
items[id].quantity -=qty;
console.log("you lose " + qty +" "+ items[id].name+"(s)");
console.log(itemList);
if (itemList[itemList.indexOf(items[id])].quantity <=0)
{itemList.splice(itemList.indexOf(items[id]), 1);
console.log(itemList)}
}

function killCheck(){
  if (HP.innerHTML <= 0){
    HP.innerHTML = 0;
    currentMonster.killcount++;
    currentGold = currentGold + currentMonster.gold;
    GOLD.innerHTML = currentGold;
    activeCheck();
console.log(currentMonster.name + " has been killed " + currentMonster.killcount + " time(s).");
killedMons++;
getLoot();
monsterLoader();
}
}

function removeHP(){
killCheck();
HP.innerHTML=HP.innerHTML-singleClickV-augmentV;
killCheck();
}

//bugged for now
function autoclickeractivate(){
  setInterval(function(){
  killCheck();
removeHP();
HP.innerHTML=monHP;
},750)
};

function upgrade(level){
var level= level;
currentGold = currentGold - (level *10);
GOLD.innerHTML = currentGold;
singleClickV = singleClickV + (level*5);
}

function activeCheck(){
if(currentGold>= 50 && upgrd1 == 0){
  BUTTON[0].disabled=false;}
  else{BUTTON[0].disabled=true}
if(currentGold>= 100 && upgrd2 == 0){
  BUTTON[1].disabled=false;}
  else{BUTTON[1].disabled=true}
if(currentGold>= 200 && upgrd2 == 0){
  BUTTON[2].disabled=false;}
  else{BUTTON[2].disabled=true}
}
activeCheck();
function disable(level){
var level = level;
BUTTON.item(level).disabled = true;
}

function clickCount(value){
var clicks = value;
if (clicks === 1){upgrd1++;}
else if (clicks === 2){upgrd2++;}
else if (clicks === 3){upgrd3++;}
console.log(upgrd1,upgrd2,upgrd3);
}

function getLoot(index){
let lootText = document.getElementById("loot-text");
index = currentMonster.drops;
if (Math.floor(Math.random() * dropChance) >= 3){
  if (itemList.includes(items[index])){
    items[index].quantity++;
  console.log("you already posses this item")} else
    {itemList.push(items[index])
    items[index].quantity++;}
  console.log("you get item " + items[index].name)
  console.log(itemList)
  }
else {console.log("you don't get item")}
inventoryLoader();
};


var modal = document.getElementById('modal');
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display="none";
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
//  for (i = 0; i < x.length; i++) {
  //  tablinks[i].classList.remove("w3-light-grey");
  //}
  document.getElementById(tabName).style.display = "block";
  //evt.currentTarget.classList.add("w3-light-grey");
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

//useful code
 //onclick="this.parentElement.style.display='none';"


//works!!!!
// for (i = 0; i < itemList.length; i++) {
// if(itemList[i].type == "loot" ){console.log(itemList[i])}
// }
