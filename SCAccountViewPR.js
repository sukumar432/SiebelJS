//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=View&name=ContactcTest&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCAccountViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCAccountViewPR");
 define("siebel/custom/SelectComfort/SCAccountViewPR", ["siebel/viewpr"],
  function () {
   SiebelAppFacade.SCAccountViewPR = (function () {

    function SCAccountViewPR(pm) {
     SiebelAppFacade.SCAccountViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCAccountViewPR, SiebelAppFacade.ViewPR);

    SCAccountViewPR.prototype.Init = function () {
     SiebelAppFacade.SCAccountViewPR.superclass.Init.apply(this, arguments);
    }

    SCAccountViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCAccountViewPR.superclass.ShowUI.apply(this, arguments);
    }

    SCAccountViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCAccountViewPR.superclass.BindData.apply(this, arguments);
    }

    SCAccountViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCAccountViewPR.superclass.BindEvents.apply(this, arguments);
    }

    SCAccountViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCAccountViewPR.superclass.EndLife.apply(this, arguments);
    }

    return SCAccountViewPR;
   }()
  );
  return "SiebelAppFacade.SCAccountViewPR";
 })
}
