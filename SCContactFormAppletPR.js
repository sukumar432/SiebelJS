/*********************************************************************************************************
Purpose: Added this following code for the Open UI Contact Form Applet
Author: Siva ADDALA (SADDALA) : Created on 10 OCT 2017.
**********************************************************************************************************/

if (typeof(SiebelAppFacade.SCContactFormAppletPR) === "undefined") {
 SiebelJS.Namespace("SiebelAppFacade.SCContactFormAppletPR");
 define("siebel/custom/SelectComfort/SCContactFormAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.SCContactFormAppletPR = (function () {
	   var pm="",Appletid="";

    function SCContactFormAppletPR(pm) {
     SiebelAppFacade.SCContactFormAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCContactFormAppletPR, SiebelAppFacade.PhysicalRenderer);

    SCContactFormAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCContactFormAppletPR.superclass.Init.apply(this, arguments);
    }

    SCContactFormAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCContactFormAppletPR.superclass.ShowUI.apply(this, arguments);
		pm = this.GetPM();
		Appletid = pm.Get("GetFullId");
		//SiebelJS.Log("In Show UI"+Appletid);
		//$('#'+Appletid).hide();
    }

    SCContactFormAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCContactFormAppletPR.superclass.BindData.apply(this, arguments);
    }

    SCContactFormAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCContactFormAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    SCContactFormAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCContactFormAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return SCContactFormAppletPR;
   }()
  );
  return "SiebelAppFacade.SCContactFormAppletPR";
 })
}
