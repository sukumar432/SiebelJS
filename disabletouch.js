if (typeof (SiebelAppFacade.DisableTouch) == "undefined") {
 Namespace('SiebelAppFacade.DisableTouch');
 (function(){
 SiebelApp.EventManager.addListner( "AppInit", OAppInit, this );
 function OAppInit( ){
 try{
 if(navigator.maxTouchPoints >= 10){
 SiebelAppFacade.DecisionManager.IsTouch=function(){return 
false;}
 $("html").removeClass("touchevents");
 console.log("Disabled Touch");
 }
 }
 catch(error)
 {
 //No-Op
 }
 }
 }());
}