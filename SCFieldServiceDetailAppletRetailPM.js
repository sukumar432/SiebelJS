if (typeof(SiebelAppFacade.SCFieldServiceDetailAppletRetailPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCFieldServiceDetailAppletRetailPM");
 define("siebel/custom/SelectComfort/SCFieldServiceDetailAppletRetailPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.SCFieldServiceDetailAppletRetailPM = (function () {
	   var siebConsts = SiebelJS.Dependency( "SiebelApp.Constants" );

    function SCFieldServiceDetailAppletRetailPM(pm) {
     SiebelAppFacade.SCFieldServiceDetailAppletRetailPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCFieldServiceDetailAppletRetailPM, SiebelAppFacade.PresentationModel);

    SCFieldServiceDetailAppletRetailPM.prototype.Init = function () {
     SiebelAppFacade.SCFieldServiceDetailAppletRetailPM.superclass.Init.apply(this, arguments);
	 //JCHAKRAB:29/09/22: Added below code for #STRY0145371
	 var installMarkup;
	 if(!document.getElementById("#SN-Book-Warning")){
			installMarkup=LoadBookWarningMarkup();
			$("#_sweclient").append(installMarkup);
		}
		this.AttachEventHandler(siebConsts.get("PHYEVENT_INVOKE_CONTROL"),
			function (methodName, PsInputArg,ai,returnStructure) {
				if (methodName == "SCFSBookNow"){
					var thisPM=this;
					var hdsrBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();
					var stat = hdsrBC.GetFieldValue("Status");
					var shipToState = hdsrBC.GetFieldValue("Personal State");
					var revNumber = hdsrBC.GetFieldValue("SC HD ReScheduled Number");
					
					if ((stat=="SCHEDULED" || stat=="CONFIRMED") && (shipToState == "NY" || shipToState == "NJ")){
						$("#SN-Book-Warning").modal({
							backdrop: 'static'
						});
						$("#SN-Book-Warning").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
						//Warranty Coverage YES-OK Option
						$(document).on('click', '#SN-Book-Warning-yes', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Book-Warning").modal('hide');
							$(".modal-backdrop").hide();
							$("#SN-Warranty-Coverage-yes-cnfrm-book").modal({
							backdrop: 'static'
						});
						$("#SN-Warranty-Coverage-yes-cnfrm-book").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
							$(".modal-backdrop").css('background', '#ffffff');
						});
						//OK Option
						$(document).on('click', '#SN-Warranty-Coverage-yes-cnfrm-ok', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Warranty-Coverage-yes-cnfrm-book").modal('hide');
							$(".modal-backdrop").hide();
							thisPM.ExecuteMethod("InvokeMethod", "SCFSBookNowCreateActivity");
						});
						//NO Option
						$(document).on('click', '#SN-Book-Warning-no', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Book-Warning").modal('hide');
							$(".modal-backdrop").hide();
							thisPM.ExecuteMethod("InvokeMethod", "SCFSBookNowNoCreateActivity");
						});
						returnStructure["CancelOperation"]=true;
						returnStructure["ReturnValue"]="";
						SiebelApp.S_App.uiStatus.Free();
					}
				}
			});
		//ends #STRY0145371
    }

    SCFieldServiceDetailAppletRetailPM.prototype.Setup = function (propSet) {
    SiebelAppFacade.SCFieldServiceDetailAppletRetailPM.superclass.Setup.apply(this, arguments);
    }
		//JCHAKRAB:29/09/22: Added below code for #STRY0145371
		function LoadBookWarningMarkup(){
		var mainMarkup="";
		mainMarkup+=' <div id="applet1">';
			mainMarkup+='<div class="container-fluid no-margin no-padding"><div class="modal fade SC-SO-add-popup in" id="SN-Book-Warning" role="dialog"><div class="SC-modal modal-orange-bg">';	
			mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">Did Sleep Number miss or delay the original delivery date?</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Book-Warning-yes" style="margin-right: 10px;">Yes</button><button id="SN-Book-Warning-no">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				//YES Option
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Warranty-Coverage-yes-cnfrm-book" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">There are laws in your state that require us to let you know of your right to cancel your order for a full refund or agree on a new delivery date since we couldn’t make the originally scheduled date.  We know you value the proven quality sleep our products deliver so while we really hope you won’t choose to cancel, we are obligated to tell you of this right.</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Warranty-Coverage-yes-cnfrm-ok" style="margin-right: 10px;">OK</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
			mainMarkup+='	</div>';
			mainMarkup+='</div>';
			return mainMarkup;
	}
	// STRY0145371 function LoadBookWarningMarkup ends
    return SCFieldServiceDetailAppletRetailPM;
   }()
  );
  return "SiebelAppFacade.SCFieldServiceDetailAppletRetailPM";
 })
}