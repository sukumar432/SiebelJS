/*********************************************
Author: Harish
Purpose: Logics for contact 360 
Created Date: 
Modified Date: 

**********************************************/


if (typeof(SiebelAppFacade.SCContact360ViewPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCContact360ViewPM");
 define("siebel/custom/SelectComfort/SCContact360ViewPM", ["siebel/viewpm"],
  function () {
   SiebelAppFacade.SCContact360ViewPM = (function () {

    function SCContact360ViewPM(pm) {
     SiebelAppFacade.SCContact360ViewPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCContact360ViewPM, SiebelAppFacade.ViewPM);

    SCContact360ViewPM.prototype.Init = function () {
     SiebelAppFacade.SCContact360ViewPM.superclass.Init.apply(this, arguments);
	 SiebelJS.Log("Local--Contact 360 View PM --Init");
	 
    }

    SCContact360ViewPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.SCContact360ViewPM.superclass.Setup.apply(this, arguments);
	 
	 SiebelJS.Log("Local--Contact 360 View PM --Setup");
    }

    return SCContact360ViewPM;
   }()
  );
  return "SiebelAppFacade.SCContact360ViewPM";
 })
}
