/*********************************************************************************************************
Purpose: Added this following code to get the recent records of the user
Author: Siva ADDALA (SADDALA) : Created on 10 OCT 2017.
**********************************************************************************************************/

if (typeof(SiebelAppFacade.SCRecentRecordContactListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCRecentRecordContactListAppletPR");
 define("siebel/custom/SelectComfort/SCRecentRecordContactListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Markups"],
  function () {
   SiebelAppFacade.SCRecentRecordContactListAppletPR = (function () {
		var pm="", Appletid="",recordSet="";
		var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
		var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
		
    function SCRecentRecordContactListAppletPR(pm) {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCRecentRecordContactListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCRecentRecordContactListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.Init.apply(this, arguments);
    }

    SCRecentRecordContactListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.ShowUI.apply(this, arguments);
		pm = this.GetPM();
		Appletid = pm.Get("GetFullId");
		SiebelJS.Log("In Show UI"+Appletid);
		$('#'+Appletid).hide();
		recordSet=pm.Get("GetRecordSet");
		SiebelJS.Log(JSON.stringify(recordSet));
		var markup=SCOUIMarkups.RecentRecords_block(recordSet);
		SiebelJS.Log("Recent Records:"+markup);
		$("#recents-header").html(markup);
    }
	

    SCRecentRecordContactListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.BindData.apply(this, arguments);
    }

    SCRecentRecordContactListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    SCRecentRecordContactListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCRecentRecordContactListAppletPR.superclass.EndLife.apply(this, arguments);
	 pm=null, Appletid=null,recordSet=null;
    }

    return SCRecentRecordContactListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCRecentRecordContactListAppletPR";
 })
}
