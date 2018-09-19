//Variables and arrays
GOLD = document.getElementById("gold");
HP = document.getElementById("hp");
BUTTON = document.getElementsByClassName("button");
MONNAME = document.getElementById("monName");
MONIMG = document.getElementById("monimg");
INVENTORY = document.getElementById("item-list");
CRAFTING = document.getElementById("craft-list");
UPGRADE = document.getElementById("upgrade-list");
UPGRADEFAIL = document.getElementById("upgrade-fail");
ALERTSUCCESS = document.getElementById("alert-success");
ALERTEQUIP = document.getElementById("equip");
ALERTFAIL = document.getElementById("alert-fail");
ALERTINSF1 = document.getElementById("alert-insufficient-item1");
ALERTINSF2 = document.getElementById("alert-insufficient-item2");
EQUIPMENT = document.getElementById("equipment-list");
TIMER = document.getElementById("timer");
TIMERCONTAINER = document.getElementById("timer-container");
BOSSKILL = document.getElementById("alert-boss-kill");
STATS  = document.getElementById("stats-list");
HPGUAGE = document.getElementById("hp-guage");
HPGUAGEBAR = document.getElementById("guage-bar");
HPGUAGEWIDTH = HPGUAGEBAR.offsetWidth;
QUEST = document.getElementById("quest-pannel");

var currentGold = 0;
var monHP = 0;
var currentMonster = 0;
var singleClickV = 10;
var augmentV = 0;
var bossTimeLimit = 10;
TIMER.innerHTML=bossTimeLimit;

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
busoye = new Monster(4,"Busoye - The holy",30,15,0,3,"busoye",0,"Human","Mob"),
kk = new Monster(5,"Karkeui - The mother of deer",20,10,0,0,"kk",0,"Human","Mob"),
//boses
kaydel = new Monster(6,"Kaydel - The Ultimate Dreidel",2000,1000,0,5,"kaydel",0,"Human","Boss"),
//weisun = new Monster(7,"Weisun - The All-BABA",500,250,0,4,"weisun",0,"Human","Boss"),
kk = new Monster(8,"Karkeui - The Mother of Deer",800,400,0,1,"kkmother",0,"Human","Boss"),
richie = new Monster(9,"Richie - The Groove Master",1000,500,0,2,"richie",0,"Human","Boss"),
bu = new Monster(10,"DisaBu - Not Best Pleased",1400,700,0,4,"disabuu",0,"Human","Boss")
]

function Item(id, name, cost, sellvalue ,quantity, refine, clickAugment, type, imgpath) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.sellvalue = sellvalue;
    this.quantity = quantity;
    this.refine = refine;
    this.clickAugment = clickAugment;
    this.type = type;
    this.imgpath = imgpath;
}

var items = [
wood = new Item(0,"Wood",10,5,0,0,0,"Loot","wood"),
coal = new Item(1,"Coal",10,5,0,0,0,"Loot","coal"),
bronze = new Item(2,"Bronze",20,10,0,0,0,"Loot","bronze"),
steel = new Item(3,"Steel",200,100,0,0,0,"Loot","steel"),
diamond = new Item(4,"Diamond",2000,1000,0,0,0,"Loot","diamond"),
woodenSword = new Item(5,"Wooden Sword",100,50,0,0,10,"Weapon","wooden_sword"),
bronzeSword = new Item(6,"Bronze Sword",100,50,0,0,20,"Weapon","bronze_sword"),
ironSword = new Item(7,"Iron Sword",100,50,0,0,30,"Weapon","iron_sword"),
steelSword = new Item(8,"Steel Sword",100,50,0,0,40,"Weapon","steel_sword"),
diamondSword = new Item(9,"Diamond Sword",100,50,0,0,50,"Weapon","kk")
];

var bossDrops = [
  wood5steel5 = [0,5,3,5],
  wood10steel5 = [0,10,3,5],
  bronze5steel5 = [2,5,3,5],
  bronze10steel5 = [2,10,3,5],
  bronze5wood5 = [2,5,0,5],
  bronze10wood5 = [2,10,0,5]
]
var currentWeapon = 0;
//For stats tracking
var killedMons = 0;
var upgrd1 = 0;
var upgrd2 = 0;
var upgrd3 = 0;
var dps = dpsCalc();
//

var itemList = [];
var dropChance = 10;
var baseRate = 20;

var currentTier = 0;
var timerRun = false;
var timeElapsed = (TIMER.innerHTML);

var timeLimit = setInterval(function(){
if (timerRun == true){setTimeout(function(){TIMER.classList.add ('fader')},50);setTimeout(function(){TIMER.classList.remove ('fader')},1000 );TIMER.innerHTML=TIMER.innerHTML-1;}
if (TIMER.innerHTML==0){alertTrigger(7);var bossKillAlert = document.getElementById("boss-text");bossKillAlert.innerHTML="You failed to kill the boss-man, man.";monsterLoader();timerRun = false;TIMER.innerHTML=bossTimeLimit;TIMERCONTAINER.style.display="none"}
},1000);

//set to ondoc load later
monsterLoader();

function monsterLoader(){
HPGUAGE.style.width = HPGUAGEWIDTH;
MONIMG.classList.remove('fader')
MONIMG.classList.add ('faderanim')
let filtered = monsters.filter(function(el) {return el.monClass === "Mob";});
currentMonster = filtered[Math.floor(Math.random() * filtered.length)];
HP.innerHTML = currentMonster.hp;
MONNAME.innerHTML = currentMonster.name;
MONIMG.setAttribute("src","Images/" + currentMonster.imgpath + ".png");
setTimeout(function(){MONIMG.classList.add ('fader')},50)
}

function bossLoader(){
TIMERCONTAINER.style.display="inline-block";
HPGUAGE.style.width = HPGUAGEWIDTH;
let filtered = monsters.filter(function(el) {return el.monClass == "Boss";});
currentMonster = filtered[Math.floor(Math.random() * filtered.length)];
MONIMG.classList.remove('fader')
MONIMG.classList.add ('faderanim')
HP.innerHTML = currentMonster.hp;
MONNAME.innerHTML = currentMonster.name;
MONIMG.setAttribute("src","Images/" + currentMonster.imgpath + ".gif");
  setTimeout(function(){MONIMG.classList.add ('fader')},50);
  timerRun = true;
}
//}}

function statsLoader(){
dpsCalc();
STATS.innerHTML="<table><tr><td>DPS:</td><td>"+dps+"</td></tr>"+"<tr><td>Total Monsters Killed: </td><td>"+killedMons+"</td></tr>"
}


function inventoryLoader(){
if (itemList.length === 0){CRAFTING.innerHTML="You've got nothing left!<br><img src='Images/ianbeale.gif'"}
else {
let text =  "<table><tr>";
for (i = 0; i < itemList.length; i++) {
if(itemList[i].type == "Loot"){text += "<td>" + "<img src = 'Images/" + itemList[i].imgpath + ".png'" +"<br><br>" + itemList[i].name + ":" + itemList[i].quantity +"</td>";
}
INVENTORY.innerHTML= text;
}
}
}

function equipmentLoader(){
let text =  "<table><tr>";
//for (i = 0; i < itemList.length; i++) {
//if(itemList[i].type == "weapon"){text += "<td>" + "<img src = 'Images/" + itemList[i].imgpath + ".png'" +"onclick='equipWeapon("+itemList[i].id+")'><br><br>" + itemList[i].name + ":" + itemList[i].quantity +"</td>";EQUIPMENT.innerHTML= text;}
let filtered = itemList.filter(function(el) {return el.type == "Weapon";});
if (filtered.length >0){
for (i = 0; i < filtered.length; i++) {
text += "<td onclick='this.children[1].classList.add(\"equipt-item\"),this.children[1].classList.remove(\"equipt-hidden\")' style='position:relative'>" + "<img src = 'Images/" + filtered[i].imgpath + ".png'" +"onclick='equipWeapon("+filtered[i].id+")'><span class='equipt-hidden'>E</span><br><br>" + filtered[i].name + ":" + filtered[i].quantity +"</td>";
}
}else{text = "<p>You've got no equipment left!<br><img src='Images/ianbeale.gif'></p>";}
EQUIPMENT.innerHTML= text;
}

// let target = filtered[i].innerHTML= document.getElementsByClassName('equipt-hidden')
// this.children[0].classList.add('equip-item').classList.remove('equip-hidden')
// onclick=

function upgradeLoader(){
if(currentWeapon===0){UPGRADE.innerHTML="<p>You've got nothing to upgrade!<br><img src='Images/ianbeale.gif'></p>";}
else{
let text =  "<p>Upgrade your "+ currentWeapon.name +" here</p><table><tr><td style='position:relative'><img src = 'Images/" + currentWeapon.imgpath + ".png'><span class='equipt-show'>+"+currentWeapon.refine+"</span>"  + "<br><button class='button' onclick='upgradeWeapon()'>Upgrade</button></div>";
UPGRADE.innerHTML= text;
}
}

function upgradeWeapon(){
let upgradeFailText = document.getElementById("upgrade-fail-text");
if (currentWeapon === 0){console.log("You have no weapon")}
else {if(currentWeapon.refine <=4){bonusRate=100}
  if(currentWeapon.refine >=5 && currentWeapon.refine<=6){bonusRate=40}
  if(currentWeapon.refine >=7 && currentWeapon.refine<=8){bonusRate=20}
  if(currentWeapon.refine ==9){bonusRate=-30};
let chance = Math.floor(Math.random() * 100) + bonusRate + baseRate;console.log(currentWeapon.refine);console.log(chance);
if(chance <=80){upgradeFailText.innerHTML="Your +"+currentWeapon.refine+" "+currentWeapon.name+" has broken!";alertTrigger(8);currentWeapon.refine = 0;removeItem(items.indexOf(currentWeapon),1);currentWeapon=0;upgradeLoader();}
else{currentWeapon.refine++;upgradeLoader();}
}
}

function equipWeapon(id){
var equipText = document.getElementById("equip-text");
if (id === currentWeapon.id){console.log("you already have this weapon equipt")}
  else{currentWeapon = items[id]
augmentV = currentWeapon.clickAugment;
alertTrigger(5);
equipText.innerHTML= "You have equipped a " + currentWeapon.name + ".";
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
if (status == 6){
BOSSKILL.style.backgroundColor="green";BOSSKILL.classList.remove('slideanim');BOSSKILL.classList.add ('slide');BOSSKILL.style.display="block";BOSSKILL.style.opacity="1";}
if (status == 7){
BOSSKILL.style.backgroundColor="red";BOSSKILL.classList.remove('slideanim');BOSSKILL.classList.add ('slide');BOSSKILL.style.display="block";BOSSKILL.style.opacity="1";}
if (status == 8){
UPGRADEFAIL.classList.remove('slideanim');UPGRADEFAIL.classList.add ('slide');UPGRADEFAIL.style.display="block";UPGRADEFAIL.style.opacity="1";UPGRADEFAIL.style.backgroundColor="red";}
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
itemList[itemList.indexOf(items[id])].quantity -=qty;
console.log("you lose " + qty +" "+ items[id].name+"(s)");
console.log(itemList);
if (itemList[itemList.indexOf(items[id])].quantity <=0)
{itemList.splice(itemList.indexOf(items[id]), 1);
console.log(itemList)}
}

function killCheck(){
  if (HP.innerHTML <= 0){
    HP.innerHTML = 0;
    HPGUAGE.style.width = 0;
    var toggle = false;
    do {
        MONIMG.setAttribute("onClick",null);
        setTimeout(function(){toggle==true;},500)
    }
    while (toggle=false)
    currentMonster.killcount++;
    currentGold = currentGold + currentMonster.gold;
    GOLD.innerHTML = currentGold;
    activeCheck();
console.log(currentMonster.name + " has been killed " + currentMonster.killcount + " time(s).");
killedMons++;
getLoot();
if (timerRun == true){timerRun =false;alertTrigger(6);TIMERCONTAINER.style.display="none";bossDrop();
var bossKillAlert = document.getElementById("boss-text");bossKillAlert.innerHTML="<h2>"+currentMonster.name+" has been defeated!</h2><p> You have obtained:</p><h3>"+currentMonster.gold+" gold</h3><p><img src='Images/"+items[bossDrops[currentMonster.drops][0]].imgpath+".png'</img></p><h3>"+bossDrops[currentMonster.drops][1]+"x "+items[bossDrops[currentMonster.drops][0]].name+"</h3><img src='Images/"+items[bossDrops[currentMonster.drops][2]].imgpath+".png'</img></p><h3>"+bossDrops[currentMonster.drops][3]+"x "+items[bossDrops[currentMonster.drops][2]].name+"</h3><p>This feat was acheived in "+ (bossTimeLimit-TIMER.innerHTML) +" seconds.</p><h2> Waow!</h2>";
;TIMER.innerHTML=bossTimeLimit}
setTimeout(function(){monsterLoader();MONIMG.setAttribute("onClick","removeHP(),killCheck()");HPGUAGE.style.width = HPGUAGEWIDTH;},500);
}
}

function bossDrop(){
getItem(bossDrops[currentMonster.drops][0],bossDrops[currentMonster.drops][1]);
getItem(bossDrops[currentMonster.drops][2],bossDrops[currentMonster.drops][3]);
};

function dpsCalc(){
  if (currentWeapon!==0){dps=singleClickV+augmentV+currentWeapon.refine*5;}
  else {
    dps=singleClickV+augmentV;
  }
}

function removeHP(){
dpsCalc();
HP.innerHTML=HP.innerHTML-dps;
//width per HP unit
var widthHp =HPGUAGEWIDTH/currentMonster.hp;
HPGUAGE.style.width = HP.innerHTML*widthHp;
}

//bugged for now due to interaction with bosses
function autoclickeractivate(){
setInterval(function(){
  if (HP.innerHTML > 0){removeHP();killCheck();};
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
if(currentGold>= 200 && upgrd3 == 0){
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

function Quest(copy1,objective,copy2,counter,type, completed) {
    this.copy1 = copy1;
    this.objective = objective1;
    this.copy2 = copy2;
    this.counter = counter;
    this.type = type;
    this.completed = completed;
}

var killHuman10 = new Quest("Kill 10x Humans",10,"Humans Killed:",0,"hunting",false);
var currentQuest = 0;
var nextQuest = 0;

function questLoader(){
QUEST.innerHTML="<p>"+currentQuest.copy1+"</p><p><span>"+currentQuest.copy2+" </span><"+currentQuest.counter+"</span></p>"
/*writes to+updates quest pannel*/
}

function questRunner(index){
let index = nextQuest;
if (currentQuest[nextQuest]){}

}

function questChecker{
// validate completion of quest
//must add 1 to nextQuest
}




//useful code
 //onclick="this.parentElement.style.display='none';"
