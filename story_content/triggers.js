function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6EKlnAhUBGG":
        Script1();
        break;
      case "6ldTy2nNTp9":
        Script2();
        break;
      case "5bkoxRncrWG":
        Script3();
        break;
      case "6LkpUPFsq2X":
        Script4();
        break;
      case "6cDMuFzdflE":
        Script5();
        break;
      case "6U3JSmtcU2e":
        Script6();
        break;
      case "5y0zzZXR2yp":
        Script7();
        break;
      case "68MXXTQlM5f":
        Script8();
        break;
      case "6nMIHTy1sey":
        Script9();
        break;
      case "6HoP1eJktx9":
        Script10();
        break;
      case "621WbNRAgLu":
        Script11();
        break;
      case "6D2ZMCamVzE":
        Script12();
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
