var txtLower = "";
var price = 0;
var prdctName = "";
var money = 0;
var payMethod = "";
var change = 0;

var hour = 0, minute = 0;

var numOfEntry = 0;

var hasSetPrice = false;
var hasSetPayMeth = false;
var toMoneyOut = false;

var currColor = "";

var selectedProd = "";
var selectedModePay = "";

var tot_pr_IceTube = 0,
  tot_pr_NewCon = 0,
  tot_pr_Liters = 0,
  tot_pr_Round = 0,
  tot_pr_Slim = 0,
  tot_pr_MoneyIn = 0;
var tot_MoneyOut = 0;
var moneyOut = "";

var tot_Cash = 0,
  tot_Check = 0,
  tot_Card = 0;

var total = 0;


//specific price or money
function numConcat(numVal) {
  if (txtLower == "0") txtLower = numVal;
  else txtLower += numVal;

  document.getElementById("outputLower").value = txtLower;

  hasSetPrice = true;
}


//product to buy
function currProd(prodName) {
  var txtUpper = document.getElementById("outputUpper").value;
  if (txtUpper != "") return;
  if (!hasSetPrice) return;

  selectedProd = prodName;
  prdctName = prodName;
  price = parseFloat(txtLower);

  setColor(prodName);

  if (prodName == "Money-Out") {
    toMoneyOut = true;
    payMethod = "No Payment";
    defMoneyOut();
    return;
  }

  if (isNaN(Number(price)) || price == 0) {
    txtLower = "";
    document.getElementById("outputLower").value = txtLower;
    return;
  }

  document.getElementById("outputUpper").value = prdctName + " -> " + price;
  clearLowerText();

  enableBtnPayMeth(false);
}

function defMoneyOut() {
  if (total < price) {
    toMoneyOut = false;
    alert("Amount of grand total cannot be less than money out, try again!");
    return;
  }

  btnDisableEnable(true);
  document.getElementById("outputUpper").value = prdctName + " -> " + price;
  document.getElementById("outputLower").value = "";
  var toEnter = document.getElementById("btnEnter");
  toEnter.disabled = false;
}

function enableBtnPayMeth(toDisable) {
  var btnPayMeth = ["CASH", "CHECK", "CARD"];
  for (var i = 0; i < btnPayMeth.length; i++) {
    if (!toDisable) document.getElementById(btnPayMeth[i]).disabled = false;
    else document.getElementById(btnPayMeth[i]).disabled = true;
  }
}


//clear the value of lower text area
function clearLowerText() {
  document.getElementById("outputLower").value = "";
  txtLower = "";
}


// delete the number from right to left
function del() {
  txtLower = "";
  var currVal = document.getElementById("outputLower").value;
  var newVal = "";
  for (var i = 0; i < currVal.length - 1; i++) {
    newVal += currVal[i];
  }
  document.getElementById("outputLower").value = newVal;
  txtLower = newVal;
}


//choose payment method
function setPayMeth(payMeth) {
  payMethod = payMeth;
  money = parseFloat(txtLower);
  if (isNaN(Number(money))) return;
  else document.getElementById("outputLower").value = payMeth + " -> " + money;
  hasSetPayMeth = true;
  selectedModePay = payMeth;
  isSufficientMoney();
}


//check if the money entered is enough
function isSufficientMoney() {
  if (money < price) {
    alert("The Payment Method cannot be less than the transaction, try again!");
    clearLowerText();
    return;
  }
  var toEnter = document.getElementById("btnEnter");
  toEnter.disabled = false;
  btnDisableEnable(true);
  change = money - price;
}


//make all buttons disable/enable except the enter 
function btnDisableEnable(toDisable) {
  var myBTN = ["btn0", "btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9",
    "btnDot", "btnDel",
    "btnIceTube", "btnNewContainer", "btnLiters", "btnRound", "btnSlim",
    "btnMoneyIn", "btnMoneyOut", "btnVoid",
    "CASH", "CHECK", "CARD"];
  for (var i = 0; i < myBTN.length; i++) {
    var currBtn = document.getElementById(myBTN[i]);
    if (toDisable) currBtn.disabled = true;
    else currBtn.disabled = false;
  }
}


//event for enter
function enter_CLick() {
  makeAnEntry();
  showSubTotalMoney(selectedModePay);

  showSubPrice(selectedProd);
  showOverAllTotal();


  showRestart();
  var toEnter = document.getElementById("btnEnter");
  toEnter.disabled = true;
  numOfEntry++;

  var labelEntry = document.getElementById("lblEntry");
  labelEntry.innerHTML = "(" + numOfEntry + ")";

  if (!toMoneyOut) document.getElementById("outputLower").value = "Change" + " -> " + change.toFixed(2);

  document.getElementById("outputUpper").value = "";
  document.getElementById("outputLower").style.textAlign = "center";
}


//create a multiple div  according to user number of entries
function makeAnEntry() {
  var date = new Date();
  hour = date.getHours();
  minute = date.getMinutes();

  var motherDiv = document.getElementById("entries");
  var childrenDiv = document.createElement("div");
  childDivCssAttribute(childrenDiv);

  motherDiv.appendChild(childrenDiv);
}

//change the attribute kf children divisions in entry div
function childDivCssAttribute(childrenDiv) {
  childrenDiv.innerHTML = prdctName + " >> " + price.toFixed(2) + "<br>"
    + payMethod + " >> " + money.toFixed(2) + "<br>"
    + "Change " + " >> " + change.toFixed(2) + "<br>"
    + "Time " + " >> " + hour + ":" + minute + "<br>";
  var design = childrenDiv.style;

  design.fontWeight = "bold";
  design.width = 'auto';
  design.height = 'auto';
  design.marginTop = '5px';
  design.padding = '10px';
  design.border = '1px Solid black';
  design.borderRadius = '10px';
  design.overflow = 'auto';

  switch (currColor) {
    case "cYellow":
      design.backgroundColor = 'yellow';
      break;
    case "cSkyblue":
      design.backgroundColor = 'rgb(0, 153, 255)';
      break;
    case "cGreen":
      design.backgroundColor = 'rgb(166, 243, 89)';
      break;
    case "cPink":
      design.backgroundColor = 'rgb(238, 108, 134)';
      break;
  }
}


//change the color
function setColor(idName) {
  if (idName == "5-8 Liters" || idName == "Round Container" || idName == "Slim Container") currColor = "cYellow";
  else if (idName == "Ice Tube" || idName == "New Container") currColor = "cSkyblue";
  else if (idName == "Money-In") currColor = "cGreen";
  else if (idName == "Money-Out") currColor = "cPink";
}

//update the summary, subtotal of all products
function showSubPrice(idName) {
  var lblID = "";
  var showPrc = 0;
  switch (idName) {
    case "Ice Tube":
      lblID = "lblIceTube";
      tot_pr_IceTube += price;
      showPrc = tot_pr_IceTube;
      break;
    case "New Container":
      lblID = "lblNewContainer";
      tot_pr_NewCon += price;
      showPrc = tot_pr_NewCon;
      break;
    case "5-8 Liters":
      lblID = "lblLiters";
      tot_pr_Liters += price;
      showPrc = tot_pr_Liters;
      break;
    case "Round Container":
      lblID = "lblRound";
      tot_pr_Round += price;
      showPrc = tot_pr_Round;
      break;
    case "Slim Container":
      lblID = "lblSlim";
      tot_pr_Slim += price;
      showPrc = tot_pr_Slim;
      break;
    case "Money-In":
      lblID = "lblMoney-In";
      tot_pr_MoneyIn += price;
      showPrc = tot_pr_MoneyIn;
      break;
    case "Money-Out":
      lblID = "lblMoney-Out";
      tot_MoneyOut += price;
      showPrc = tot_MoneyOut;
      break;
  }

  var minus = "";
  if (toMoneyOut) minus = "-";
  document.getElementById(lblID).innerHTML = minus + showPrc.toFixed(2);
}
//update the summary, subtotal of all money paid
function showSubTotalMoney(thisName) {
  var lblID = "";
  var showMoney = 0;
  switch (thisName) {
    case "Cash":
      lblID = "lblCash";
      if (toMoneyOut) tot_Cash -= price;
      tot_Cash += price;
      showMoney = tot_Cash;
      break;
    case "Check":
      lblID = "lblCheck";
      if (toMoneyOut) tot_Check -= price;
      tot_Check += price;
      showMoney = tot_Check;
      break;
    case "Card":
      lblID = "lblCard";
      if (toMoneyOut) tot_Card -= price;
      tot_Card += price;
      showMoney = tot_Card;
      break;
  }

  document.getElementById(lblID).innerHTML = showMoney.toFixed(2) + "";
}

function showOverAllTotal() {
  if (toMoneyOut) {
    total -= price;
    document.getElementById("lblTotal").innerHTML = total.toFixed(2) + "";
    return;
  }
  total = (tot_pr_IceTube + tot_pr_NewCon + tot_pr_Liters + tot_pr_Round + tot_pr_Slim + tot_pr_MoneyIn) - tot_MoneyOut;
  document.getElementById("lblTotal").innerHTML = total.toFixed(2) + "";

}

//restart buton will show
function showRestart() {
  var resartDiv = document.getElementById('btnRestart');
  resartDiv.style.display = 'block';
}


//restart buton will hide
function hideRestart() {
  setToDefault();
  var resartDiv = document.getElementById('btnRestart');
  resartDiv.style.display = 'none';
}


//ibalik lahat sa dati sheeeeeesh
function setToDefault() {
  txtLower = "";
  price = 0;
  prdctName = "";
  money = 0;
  payMethod = "";
  change = 0;
  hour = 0, minute = 0;

  hasSetPrice = false;
  hasSetPayMeth = false;
  toMoneyOut = false;

  document.getElementById("outputUpper").value = "";
  document.getElementById("outputLower").value = "";
  document.getElementById("outputLower").style.textAlign = "right";

  var toEnter = document.getElementById("btnEnter");
  toEnter.disabled = true;
  btnDisableEnable(false);
  enableBtnPayMeth(true);
}