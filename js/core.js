//Variables and arrays
var a = 0;
var currentGold = 0;
var monHP = 0;
var killedMons = 0;
var singleClickV = 10;
var countMonsDefeated = 0;

function Monster(id, name, hp, gold, killcount, drops, imgpath) {
    this.id = id;
    this.name = name;
    this.hp = hp;
    this.gold = gold;
    this.killcount = killcount;
    this.drops = drops;
    this.imgpath = imgpath;
}
var monsters = [
ogre = new Monster(1,"Ogre",100,50,0,1,"ogre"),
goblin = new Monster(2,"Goblin",80,40,0,2,"goblin"),
troll = new Monster(3,"Troll",60,30,0,3,"troll"),
hume = new Monster(4,"Hume",30,15,0,4,"busoye"),
kk = new Monster(5,"Karkeui - The mother of deer",20,10,0,0,"kk"),
weisun = new Monster(6,"Weisun - The all BABA",2000,1,0,3,"weisun")]

function Item(id, name, cost, sellvalue ,quantity, clickaugment, type, imgpath) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.sellvalue = sellvalue;
    this.quantity = quantity;
    this.clickaugment = clickaugment;
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
var dropChance = 5;

GOLD = document.getElementById("gold");
HP = document.getElementById("hp");
BUTTON = document.getElementsByClassName("button");
MONNAME = document.getElementById("monName");
MONIMG = document.getElementById("monimg");
INVENTORY = document.getElementById("item-list");
CRAFTING = document.getElementById("craft-list");
ALERT = document.getElementById("alert-text");
EQUIPMENT = document.getElementById("equipment-list");
//set to ondoc load later
monsterLoader();

function monsterLoader(){
currentMonster = monsters[Math.floor(Math.random() * monsters.length)];
HP.innerHTML = currentMonster.hp;
MONNAME.innerHTML = currentMonster.name;
MONIMG.setAttribute("src","Images/" + currentMonster.imgpath + ".png");
setTimeout(function(){MONIMG.classList.add ('fader')},50)
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
if(itemList[i].type == "weapon"){text += "<td>" + "<img src = 'Images/" + itemList[i].imgpath + ".png'" +"<br><br>" + itemList[i].name + ":" + itemList[i].quantity +"</td>";EQUIPMENT.innerHTML= text;}
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
 var alert = document.getElementById("alert");
  var itemtoMake =recipes[id];
  var component1 = itemtoMake.required[0];
  var component2 = itemtoMake.required[2];
  var qty1 = itemtoMake.required[1];
  var qty2 = itemtoMake.required[3];
  console.log(itemtoMake.name + ":")
  console.log(items[component1].name + " : " + qty1)
  console.log(items[component2].name + " : " + qty2);
if (itemList.includes(items[component1])=== false || itemList.includes(items[component2])=== false){
console.log("You do not posses the required items");
alert.classList.remove('slideanim');
alert.classList.add ('slide');
alert.style.display="block";
alert.style.opacity="1";
alert.style.backgroundColor="red";
ALERT.innerHTML="You do not posses the required materials";
//setTimeout(function(){alert.classList.add ('slide')},50);
}
else if (itemList[itemList.indexOf(items[component1])].quantity >= qty1 && itemList[itemList.indexOf(items[component2])].quantity >= qty2){
getItem(itemtoMake.craftedItemId,1);
removeItem(component1,qty1);
removeItem(component2,qty2);
alert.classList.remove('slideanim');
alert.classList.add ('slide');
alert.style.display="block";
alert.style.backgroundColor="green";
alert.style.opacity="1";
ALERT.innerHTML="You have sucessfully crated an item";
}
else {console.log("You do not posses enough the required items");}
};


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
    disable(0);
    activeCheck();
console.log(currentMonster.name + " has been killed " + currentMonster.killcount + " time(s).");
killedMons++;
getLoot();
MONIMG.classList.remove('fader')
MONIMG.classList.add ('faderanim')
monsterLoader();
}
}

function removeHP(){
killCheck();
HP.innerHTML=HP.innerHTML-singleClickV;
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
if(currentGold>= 200){
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
