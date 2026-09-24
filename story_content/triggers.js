function ExecuteScript(strId)
{
  switch (strId)
  {
      case "65X3FbAxz5q":
        Script1();
        break;
      case "5xvb4kGMH08":
        Script2();
        break;
      case "5itEzYazU3i":
        Script3();
        break;
      case "6UA1W7EEMaf":
        Script4();
        break;
      case "6UswHXAxOLu":
        Script5();
        break;
      case "6MB0UraHtBp":
        Script6();
        break;
      case "6kEs5c2AF3f":
        Script7();
        break;
      case "67MLjtriGxB":
        Script8();
        break;
      case "65ipISJUfhb":
        Script9();
        break;
      case "6dmlUoNZBq8":
        Script10();
        break;
      case "5XkcDEEBiBZ":
        Script11();
        break;
      case "6KAB1oAgiyR":
        Script12();
        break;
      case "6VicDCQiz0O":
        Script13();
        break;
  }
}

window.InitExecuteScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  const target = object('5wQeYSFnQg6');
const duration = 750;
const easing = 'ease-out';
const id = '68XI2AEmkJg';
const growAmount = 0.2;
player.addForTriggers(
id,
target.animate(
[ {scale: `${1 + growAmount}` } ]
,
  { fill: 'forwards', duration, easing }
)
);
}

};
