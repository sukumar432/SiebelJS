if (typeof(SiebelAppFacade.SCOrderEntryLineItemListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryLineItemListAppletPR");
 define("siebel/custom/SelectComfort/SCOrderEntryLineItemListAppletPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCOrderEntryLineItemListAppletPR = (function () {
	var pm="",Appletid="";
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
    var EnrollInPS = SiebelApp.S_App.NewPropertySet();
	var EnrollOutPS = SiebelApp.S_App.NewPropertySet();
	var OrderId=localStorage.getItem('OrderId');
	
	function SCOrderEntryLineItemListAppletPR(pm) {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCOrderEntryLineItemListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCOrderEntryLineItemListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.Init.apply(this, arguments);
	 pm = this.GetPM();
	 SiebelJS.Log("In Init of SC Order Entry List Applet");
    }

    SCOrderEntryLineItemListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.ShowUI.apply(this, arguments);
	 Appletid = pm.Get("GetFullId");
	 SiebelJS.Log("In showui of SC Order Entry List Applet"+Appletid);
    }

    SCOrderEntryLineItemListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.BindData.apply(this, arguments);
	 SiebelJS.Log("Inbdata of Order entry cart");
		
    }

    SCOrderEntryLineItemListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.BindEvents.apply(this, arguments);
    }
	
    SCOrderEntryLineItemListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.EndLife.apply(this, arguments);
    }
    return SCOrderEntryLineItemListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCOrderEntryLineItemListAppletPR";
 })
}
