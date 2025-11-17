/****************************************************
	CREATED BY SCHERKU
	CREATED FOR SC SALES EFFICIENCY OPEN UI
	PURPOSE : To DISPLAY RECENT RECORDS BASED ON RECENT RECORD LIST APPLET
	CREATED ON 10/15/2017
****************************************************/
if (typeof(SiebelAppFacade.SCRecentRecordAccountListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCRecentRecordAccountListAppletPR");
 define("siebel/custom/SelectComfort/SCRecentRecordAccountListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SC_OUI_Markups","siebel/custom/SelectComfort/SCAccountSearchMarkup"],
  function () {
	  var pm="", Appletid="",recordSet="",FieldQueryPair;
	  var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	   var AccountSearchMarkup = SiebelJS.Dependency("SiebelApp.SCAccountSearchMarkup");
	   var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
		var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
   SiebelAppFacade.SCRecentRecordAccountListAppletPR = (function () {

    function SCRecentRecordAccountListAppletPR(pm) {
     SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCRecentRecordAccountListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCRecentRecordAccountListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.Init.apply(this, arguments);
    }

    SCRecentRecordAccountListAppletPR.prototype.ShowUI = function () {
		SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.ShowUI.apply(this, arguments);
	
		pm = this.GetPM();
		Appletid = pm.Get("GetFullId");
		SiebelJS.Log("In Show UI"+Appletid);
		$('#'+Appletid).hide();
		recordSet=pm.Get("GetRecordSet");
		SiebelJS.Log(JSON.stringify(recordSet));
		
		//getting the recordSet and appending it to header block
		var markup=SCOUIMarkups.RecentRecords_block(recordSet);
		$("#recents-header").html(markup);
		if(recordSet.length>0)
		{
			for(i=0;i<recordSet.length;i++){
			$("#"+recordSet[i]["RowId"]).addClass("recent-accsearch-record");
			}
		}
		
    }

    SCRecentRecordAccountListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.BindData.apply(this, arguments);
	 	
    }

    SCRecentRecordAccountListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    SCRecentRecordAccountListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCRecentRecordAccountListAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return SCRecentRecordAccountListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCRecentRecordAccountListAppletPR";
 })
}
