/*
02072018: Sanjeev: Created the PR for Transfer Multiple LOV Popup Applet (used for Logout/Not Ready Reasons for CTI).
	PR invloke the function to update CTI Timer on Ok/Cancel button click from Popup applet.
*/
if(typeof(SiebelAppFacade.SCCTILogoffNotReadyPopupPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCCTILogoffNotReadyPopupPR");
	
	define("siebel/custom/SCCTILogoffNotReadyPopupPR", ["siebel/jqgridrenderer"], function() {
	    SiebelAppFacade.SCCTILogoffNotReadyPopupPR = (function() {
			function SCCTILogoffNotReadyPopupPR(pm) {
				SiebelAppFacade.SCCTILogoffNotReadyPopupPR.superclass.constructor.apply(this, arguments);
	
				var PM = this.GetPM();
				var controls = PM.Get( "GetControls" );
				
				var okBtn = controls["AddRecord"];
				var cancelBtn = controls["CloseApplet"];
				
				$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + okBtn.GetInputName() + "_Ctrl",
					"click",
					{ctx:this, ctrls: controls}, SCCustomCTIFunctions.notReadySignOffOK
				 );
				 
				 $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + cancelBtn.GetInputName() + "_Ctrl",
					"click",
					{ctx:this, ctrls: controls}, SCCustomCTIFunctions.notReadySignOffCancel
				 );
			}
		
			SiebelJS.Extend(SCCTILogoffNotReadyPopupPR, SiebelAppFacade.JQGridRenderer);
			
			SCCTILogoffNotReadyPopupPR.prototype.Init = function () {
				SiebelAppFacade.SCCTILogoffNotReadyPopupPR.superclass.Init.apply(this, arguments);
			}

			SCCTILogoffNotReadyPopupPR.prototype.BindData = function (bRefresh) {
				SiebelAppFacade.SCCTILogoffNotReadyPopupPR.superclass.BindData.apply(this, arguments);
			}

			SCCTILogoffNotReadyPopupPR.prototype.ShowUI = function () {
				SiebelAppFacade.SCCTILogoffNotReadyPopupPR.superclass.ShowUI.apply(this, arguments);			
			}
			
			SCCTILogoffNotReadyPopupPR.prototype.BindEvents = function (controlSet) {
				SiebelAppFacade.SCCTILogoffNotReadyPopupPR.superclass.BindEvents.apply(this, arguments);
			}	
		    return SCCTILogoffNotReadyPopupPR;
			
		}()
		);
		return "SiebelAppFacade.SCCTILogoffNotReadyPopupPR";
	});
}