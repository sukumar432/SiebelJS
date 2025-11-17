//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopForm&name=SCOrderEntryOrderFormAppletSales&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR");
 define("siebel/custom/SelectComfort/SCOrderEntryOrderFormAppletSalesPR", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Methods",],
  function () {
   SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR = (function () {
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
    function SCOrderEntryOrderFormAppletSalesPR(pm) {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCOrderEntryOrderFormAppletSalesPR, SiebelAppFacade.PhysicalRenderer);

    SCOrderEntryOrderFormAppletSalesPR.prototype.Init = function () {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.Init.apply(this, arguments);
    }

    SCOrderEntryOrderFormAppletSalesPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.ShowUI.apply(this, arguments);
	 SiebelJS.Log("In show ui of order form applet");
 }

    SCOrderEntryOrderFormAppletSalesPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.BindData.apply(this, arguments);
	 
		//var recset=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().SetSortSpec('Time Generated','DESC');
		//SiebelJS.Log("recset:"+recset.length);
		/*var svcUI = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
		var psIn = SiebelApp.S_App.NewPropertySet(); 
		var psOut = SiebelApp.S_App.NewPropertySet(); 
		psIn.SetProperty("Refresh All","Y"); 
		svcUI.InvokeMethod("RefreshCurrentApplet",psIn,psOut);*/
	
		/*for (var i = 0; i < recset.length; i++) {
			SiebelJS.Log(recset[i]["Time Generated"]);	
		}*/
    }

    SCOrderEntryOrderFormAppletSalesPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.BindEvents.apply(this, arguments);
	 //ui-jqgrid-htable
	  //SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("Drilldown", psn);
	/* $("#s_1_1_0_0_Ctrl").on("click", function() {
		 SiebelJS.Log("on click of button");
		SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order Form Applet (Sales)"].InvokeMethod("SCQuote");
		SiebelJS.Log("after click of button");
		var FieldQueryPair  =  {"Time Generated":"IS NOT NULL"};
		SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Report Output List Applet");
		this.AttachEventHandler(SiebelApp.Constants.get("PHYEVENT_DRILLDOWN_LIST"), 
		function (ReportOutputFileName, 1) {
			SiebelJS.Log("In funciton");
		if (name === "Type")){
			var maxOptyArray = this.Get("mO");
			if (maxOptyArray[1] > this.Get("HigVal")){
			return (false);
			}
			}
			return (true);
		});
	});*/
	
	
    }

    SCOrderEntryOrderFormAppletSalesPR.prototype.EndLife = function () {
     SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR.superclass.EndLife.apply(this, arguments);
    }

    return SCOrderEntryOrderFormAppletSalesPR;
   }()
  );
  return "SiebelAppFacade.SCOrderEntryOrderFormAppletSalesPR";
 })
}
