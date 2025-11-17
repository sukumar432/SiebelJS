if (typeof(SiebelAppFacade.SCSROOrderEntryLineItemsPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCSROOrderEntryLineItemsPM");
 define("siebel/custom/SCSROOrderEntryLineItemsPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.SCSROOrderEntryLineItemsPM = (function () {

    function SCSROOrderEntryLineItemsPM(pm) {
     SiebelAppFacade.SCSROOrderEntryLineItemsPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCSROOrderEntryLineItemsPM, SiebelAppFacade.ListPresentationModel);

    SCSROOrderEntryLineItemsPM.prototype.Init = function () {
     SiebelAppFacade.SCSROOrderEntryLineItemsPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": SCSROOrderEntryLineItemsPM:      Init method reached.");
	 this.AttachPostProxyExecuteBinding("SCWarrantySimplication", InvokeMethod);
	 //this.AttachPreProxyExecuteBinding("SC Calculate Shipping", InvokeMethod);
	 //this.AddMethod( "InvokeMethod",  InvokeMethod, { sequence : false, scope: this } );
	 this.AddMethod("LeaveField", PreLeaveField, {sequence:false, scope:this});

		var mainMarkup="";
		var installMarkup="";
		//code for appending the open ui popup
		if(!document.getElementById("#SN-Generate-Rplcmnt")){
			/*mainMarkup+=' <div id="applet1">';
			mainMarkup+='<div class="container-fluid no-margin no-padding"><div class="modal fade SC-SO-add-popup in" id="SN-Generate-Rplcmnt" role="dialog"><div class="SC-modal modal-orange-bg">';	
			mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin">Your replacement pump is a re-certified pump that was refurbished. It comes with the same warranty as a brand-new part, and it goes through the same quality checks before it’s packaged and shipped to you. Would you like to proceed with ordering the re-certified pump?</span>';
				mainMarkup+='<span class="SC-span-width add-margin">If "NO" please update the "SKU"</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Generate-Rplcmnt-yes" style="margin-right: 10px;">Yes</button><button id="SN-Generate-Rplcmnt-no">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div></div>';
			mainMarkup+='</div>';*/
			mainMarkup=loadmarkup();
			$("#_sweclient").append(mainMarkup);
		}
		if(!document.getElementById("#SN-Install-Warning")){
			installMarkup=LoadInstallMarkup();
			$("#_sweclient").append(installMarkup);
		}

		//START:SPATIBAN:23-AUG-2022: STRY0194216:Added below code for to display the error message
		var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
		this.AttachEventHandler(siebConsts.get("PHYEVENT_CONTROL_FOCUS"), 
			function (control) {
				var controlName = control.GetName();
				var orderLineBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();
				var LineType = orderLineBC.GetFieldValue("SC Line Type");
				var LineREF = orderLineBC.GetFieldValue("SC Pick Line Ref Number");
				var orderHeaderSubType= orderLineBC.GetParentBusComp().GetFieldValue("SC Sub-Type");
				if(controlName=="Product" && LineType=="Warranty Sale" && LineREF!=null && LineREF!='' && orderHeaderSubType=="Prod Rplcmnt for Ship. Issues"){
					var rowid=SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp().GetSelection();
					rowid=parseInt(rowid)+1;
					$('#'+rowid+'_Product').prop("disabled", true);
				}
			return (true);
		});
	

		this.AttachEventHandler(siebConsts.get("PHYEVENT_INVOKE_PICK"), 
			function (control,inputPS,ai,returnStructure) {
				var controlName = control.GetName();
				var orderLineBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();
				var orderHeaderSubType= orderLineBC.GetParentBusComp().GetFieldValue("SC Sub-Type");
				var LineType = orderLineBC.GetFieldValue("SC Line Type");
				var LineREF = orderLineBC.GetFieldValue("SC Pick Line Ref Number");
				if(controlName=="Product" && LineType=="Warranty Sale" && LineREF!=null && LineREF!='' && orderHeaderSubType=="Prod Rplcmnt for Ship. Issues"){
					alert("The Warranty sale SKU cannot be changed. If no replacement SKU is available, please exchange.");
					returnStructure["CancelOperation"]=true;
					returnStructure["ReturnValue"]="";
				}
				
			return (true);
		});
		
		//END:SPATIBAN:23-AUG-2022: STRY0194216:Added below code for to display the error message
    }

    SCSROOrderEntryLineItemsPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": SCSROOrderEntryLineItemsPM:      Setup method reached.");
     SiebelAppFacade.SCSROOrderEntryLineItemsPM.superclass.Setup.apply(this, arguments);
    }
	//APUJARI:Added For STRY0161483
	function PreLeaveField(control,value ,notLeave, returnStructure) {
		
		if (control.GetName() === "SC Line Ref Number") {
			var thisPM=this;
			var controls=this.Get("GetControls");
			var sPartNum = controls[ "Product" ];
			sPartNum = this.ExecuteMethod( "GetFieldValue", sPartNum );
			var sordSubType=SiebelApp.S_App.GetActiveView().GetAppletMap()[thisPM.GetObjName()].GetBusComp().GetParentBusComp().GetFieldValue("SC Sub-Type");
			if((sordSubType == "Warranty Rplcmnt" || sordSubType == "Prod Rplcmnt for Ship. Issues") && sPartNum == "INSTALL"  && value != ""){

					// setTimeout(function() {
					if(SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Line Item Pick Applet"]){}
					else{
					 thisPM.ExecuteMethod("InvokeMethod", "InstallSKUWarning", null, false);
					SiebelApp.S_App.uiStatus.Free();
					 var flag = SiebelApp.S_App.GetProfileAttr("InstallSkuWarningFlag");
					//var flag = "Y";
					if (flag=="Y"){
						thisPM.Get("GetBusComp").SetFieldValue(control.GetFieldName(), "");
						// var inPropSet = CCFMiscUtil_CreatePropSet();
						// var ai= {};
						// ai.async = true;
						// ai.selfbusy = true;
						// ai.scope = this;
						// ai.mask = true;
						// ai.opdecode = true;
						// thisPM.ExecuteMethod("InvokeMethod", "RefreshRecord", inPropSet, ai);
						// SiebelApp.S_App.uiStatus.Free();
						$("#SN-Install-Warning").modal({
							backdrop: 'static'
						});
						$("#SN-Install-Warning").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
						// First NO Option
						$(document).on('click', '#SN-Install-Warning-no', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Install-Warning").modal('hide');
							$(".modal-backdrop").hide();
							$("#SN-Install-Warning-no-cnfrm").modal({
								backdrop: 'static'
							});
							$("#SN-Install-Warning-no-cnfrm").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
						});
						$(document).on('click', '#SN-Install-Warning-no-cnfrm-ok', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Install-Warning-no-cnfrm").modal('hide');
							$(".modal-backdrop").hide();
						});
						// First YES Option
						$(document).on('click', '#SN-Install-Warning-yes', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Install-Warning").modal('hide');
							$(".modal-backdrop").hide();
							$("#SN-Install-Warning-yes-cnfrm").modal({
								backdrop: 'static'
							});
							$("#SN-Install-Warning-yes-cnfrm").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
						});
						//Warranty Coverage YES Option
						$(document).on('click', '#SN-Warranty-Coverage-yes', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Install-Warning-yes-cnfrm").modal('hide');
							$(".modal-backdrop").hide();
							$("#SN-Warranty-Coverage-yes-cnfrm").modal({
								backdrop: 'static'
							});
							$("#SN-Warranty-Coverage-yes-cnfrm").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
						});
						//Warranty Coverage YES-OK Option
						$(document).on('click', '#SN-Warranty-Coverage-yes-cnfrm-ok', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Warranty-Coverage-yes-cnfrm").modal('hide');
							$(".modal-backdrop").hide();
						});
						//Warranty Coverage NO Option
						$(document).on('click', '#SN-Warranty-Coverage-no', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Install-Warning-yes-cnfrm").modal('hide');
							$(".modal-backdrop").hide();
							$("#SN-Warranty-Coverage-no-cnfrm").modal({
								backdrop: 'static'
							});
							$("#SN-Warranty-Coverage-no-cnfrm").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
						});
						//Warranty Coverage NO-OK Option
						$(document).on('click', '#SN-Warranty-Coverage-no-cnfrm-ok', function(e) {
							e.stopImmediatePropagation();
							$("#SN-Warranty-Coverage-no-cnfrm").modal('hide');
							$(".modal-backdrop").hide();
						});
					}
				}
					// },100);
					//$(thisPM.GetRenderer().GetUIWrapper(control).GetEl(thisPM.GetRenderer().GetSelectedRow())).val('');
					
					returnStructure["CancelOperation"]=true;
					returnStructure["ReturnValue"]="";
					SiebelApp.S_App.uiStatus.Free();
			}
		}
	}//APUJARI:END STRY0161483
	function InvokeMethod(methodName,PsInputArg,PsOutArg){
		
		if(methodName=="SCWarrantySimplication"){
			var thisPM=this;
			var controls=this.Get("GetControls");
			var sPartName = controls[ "Product" ];
		if (typeof sPartName !== "undefined" && sPartName !== null) {
			sPartName = this.ExecuteMethod( "GetFieldValue", sPartName );
		}
		var sLineType = controls[ "SC Line Type" ];
		if (typeof sLineType !== "undefined" && sLineType !== null) {
			sLineType = this.ExecuteMethod( "GetFieldValue", sLineType );
			
		}
		var ordSubType=SiebelApp.S_App.GetActiveView().GetAppletMap()[thisPM.GetObjName()].GetBusComp().GetParentBusComp().GetFieldValue("SC Sub-Type");
		var sRefurbAutoFlg=SiebelApp.S_App.GetProfileAttr("SC Show Refurb Popup"),sDisplayFoamalert=""; 
		SiebelJS.Log("sRefurbAutoFlg : " + sRefurbAutoFlg);
		if(sLineType=="Warranty Sale" && ordSubType=="Warranty Rplcmnt"){
			sDisplayFoamalert= SiebelApp.S_App.GetProfileAttr("SNDisplayFOAMPopup");
			if(sDisplayFoamalert==null || sDisplayFoamalert=="") sDisplayFoamalert="N";
		}
		if(sLineType=="Warranty Sale" && sPartName.charAt(0)=='9' && ordSubType=="Warranty Rplcmnt" && sRefurbAutoFlg=="Y"){
			
			$("#SN-Generate-Rplcmnt").modal({
				backdrop: 'static'
			});
			$("#SN-Generate-Rplcmnt").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$(".modal-backdrop").css('background', '#ffffff');
			//$(document).find("#SN-Generate-Rplcmnt").unbind("click");
			//START:SPATIBAN:14/6/22:STRY0190304:Updated for Refrub popup statement
			$(document).on('click', '#SN-Generate-Rplcmnt-no-cnfrm', function(e) {
				e.stopImmediatePropagation();
				$("#SN-Generate-Rplcmnt-cnfrm").modal('hide');
				$(".modal-backdrop").hide();
			});
			$(document).on('click', '#SN-Generate-Rplcmnt-yes-cnfrm', function(e) {
				e.stopImmediatePropagation();
				$("#SN-Generate-Rplcmnt-cnfrm").modal('hide');
				$(".modal-backdrop").hide();
				SiebelApp.S_App.uiStatus.Busy({
					target: SiebelApp.S_App.GetTargetViewContainer(),
					mask: true
				});  
				setTimeout(function() {
					thisPM.ExecuteMethod("InvokeMethod", "UpdateRefrubSKU", null, false);SiebelApp.S_App.uiStatus.Free();
				},10);
			});
			//END:SPATIBAN:14/6/22:STRY0190304:Updated for Refrub popup statement
			$(document).on('click', '#SN-Generate-Rplcmnt-yes', function(e) {
				e.stopImmediatePropagation();
				$("#SN-Generate-Rplcmnt").modal('hide');
				$(".modal-backdrop").hide();
			});
			$(document).on('click', '#SN-Generate-Rplcmnt-no', function(e) {
				e.stopImmediatePropagation();
				/*$("#SN-Generate-Rplcmnt").modal('hide');
				$(".modal-backdrop").hide();
				SiebelApp.S_App.uiStatus.Busy({
					target: SiebelApp.S_App.GetTargetViewContainer(),
					mask: true
				});  
				setTimeout(function() {
					thisPM.ExecuteMethod("InvokeMethod", "UpdateRefrubSKU", null, false);SiebelApp.S_App.uiStatus.Free();
				},10);*/
				$("#SN-Generate-Rplcmnt").modal('hide');
				$(".modal-backdrop").hide();
				$("#SN-Generate-Rplcmnt-cnfrm").modal({
					backdrop: 'static'
				});
				$("#SN-Generate-Rplcmnt-cnfrm").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
				$(".modal-backdrop").css('background', '#ffffff');
			});
		}
		else if(sLineType=="Warranty Sale" && sDisplayFoamalert != sPartName && sDisplayFoamalert!="N" && ordSubType=="Warranty Rplcmnt"){
			$("#SN-Generate-FoamAlert").modal({
				backdrop: 'static'
			});
			$("#SN-Generate-FoamAlert").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$(".modal-backdrop").css('background', '#ffffff');
			$('#SN-Generate-RplcmntFoam-ok').on("click", function(e) {
				e.stopImmediatePropagation();
				$("#SN-Generate-FoamAlert").modal('hide');
				$(".modal-backdrop").hide();
			});
		}
			return;
		}
		else{
				return;
			}
	}
	function loadmarkup(){
		var mainMarkup="";
		mainMarkup+=' <div id="applet1">';
			mainMarkup+='<div class="container-fluid no-margin no-padding"><div class="modal fade SC-SO-add-popup in" id="SN-Generate-Rplcmnt" role="dialog"><div class="SC-modal modal-orange-bg">';	
			mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin">Your replacement part has been re-certified and refurbished. It comes with the same warranty as a brand-new part, and goes through the same quality checks before it is packaged and shipped to you. Would you like to proceed with ordering the re-certified part?</span>';
				//mainMarkup+='<span class="SC-span-width add-margin">If "NO" please update the "SKU"</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Generate-Rplcmnt-yes" style="margin-right: 10px;">Yes</button><button id="SN-Generate-Rplcmnt-no">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				//START:SPATIBAN:14/6/22:STRY0190304:Updated for Refrub popup statement
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Generate-Rplcmnt-cnfrm" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin">There may be extended lead times to receive your replacement part. Do you prefer to wait for a new part?</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Generate-Rplcmnt-yes-cnfrm" style="margin-right: 10px;">Yes</button><button id="SN-Generate-Rplcmnt-no-cnfrm">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
			//END:SPATIBAN:14/6/22:STRY0190304:Updated for Refrub popup statement
				//START:SPATIBAN:10/22/23: Added below code for #SFSTRY0003059
				mainMarkup+='<div class="container-fluid no-margin no-padding"><div class="modal fade SC-SO-add-popup" id="SN-Generate-FoamAlert" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin">We are upgrading your replacement to our newest foam comfort system. which will look different than your current foam system; it includes an attached base pad which provides improved stability and support.</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Generate-RplcmntFoam-ok">Ok</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>'
				//END:SPATIBAN:10/22/23: Added below code for #SFSTRY0003059
				//STARt:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
			/*-- Disposal line Starts here-*/
			mainMarkup+='		<div class="modal fade SC-SO-add-popup" id="SC-SO-Cancel-item-disposal" role="dialog" style="display: none; justify-content: center; align-items: center;">';
			mainMarkup+='            <div class="SC-modal">';
			mainMarkup+='                <div class="modal-dialog cancel-popup">';
			mainMarkup+='                    <!-- Modal content-->';
			mainMarkup+='                    <div class="modal-content less-height">';
			mainMarkup+='                        <div class="icon" style="display: none;">';
			mainMarkup+='                            <span id="SC-SO-Cancel-item-disposal-text"></span>';
			mainMarkup+='                        </div>';
			mainMarkup+='                        <div class="text">';
			mainMarkup+='                            <span class="SC-span-width">Does the customer want to continue with the Disposal Service?</span>';
			mainMarkup+='                            <div class="SC-two-buttons">';
			mainMarkup+='                                <button id="SC-disposal-item-no-button">No</button>';
			mainMarkup+='                                <button class="" id="SC-disposal-item-yes-button" type="button">Yes</button>';
			mainMarkup+='                            </div>';
			mainMarkup+='                        </div>';
			mainMarkup+='                    </div>';
			mainMarkup+='                </div>';
			mainMarkup+='            </div>';
			mainMarkup+='        </div>';
			mainMarkup+='		<div class="modal fade SC-SO-add-popup" id="SC-SO-Cancel-item-disposal2" role="dialog" style="display: none; justify-content: center; align-items: center;">';
			mainMarkup+='            <div class="SC-modal">';
			mainMarkup+='                <div class="modal-dialog cancel-popup">';
			mainMarkup+='                    <!-- Modal content-->';
			mainMarkup+='                    <div class="modal-content less-height">';
			mainMarkup+='                        <div class="text">';
			mainMarkup+='                            <span class="SC-span-width">The DISPOSAL Sku will now be cancelled. Would you like to proceed?</span>';
			mainMarkup+='                            <div class="SC-two-buttons">';
			mainMarkup+='                                <button id="SC-disposal-item-no-button2">No</button>';
			mainMarkup+='                                <button class="" id="SC-disposal-item-yes-button2" type="button">Yes</button>';
			mainMarkup+='                            </div>';
			mainMarkup+='                        </div>';
			mainMarkup+='                    </div>';
			mainMarkup+='                </div>';
			mainMarkup+='            </div>';
			mainMarkup+='        </div>';
			/*Disposal line ends here-*/
			//END:SPATIBAN:3/8/22: Added below code for #SFSTRY0001722
			mainMarkup+='	</div>';
			mainMarkup+='</div>';
			return mainMarkup;
	}
	function LoadInstallMarkup(){
		var mainMarkup="";
		mainMarkup+=' <div id="applet1">';
			mainMarkup+='<div class="container-fluid no-margin no-padding"><div class="modal fade SC-SO-add-popup in" id="SN-Install-Warning" role="dialog"><div class="SC-modal modal-orange-bg">';	
			mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">Are the component(s) in transit or been delivered to the customer?</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Install-Warning-yes" style="margin-right: 10px;">Yes</button><button id="SN-Install-Warning-no">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				//First NO Option
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Install-Warning-no-cnfrm" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">You must generate replacement for the product that needs to be installed to proceed.</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Install-Warning-no-cnfrm-ok" style="margin-right: 10px;">OK</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				// First YES Option
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Install-Warning-yes-cnfrm" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">Is the customer within warranty coverage for service?</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Warranty-Coverage-yes" style="margin-right: 10px;">Yes</button><button id="SN-Warranty-Coverage-no">No</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				//Warranty Coverage NO Option
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Warranty-Coverage-no-cnfrm" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">You must set up a New Sale with the appropriate service SKU to proceed.</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Warranty-Coverage-no-cnfrm-ok" style="margin-right: 10px;">OK</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
				//Warranty Coverage YES Option
				mainMarkup+='<div class="modal fade SC-SO-add-popup" id="SN-Warranty-Coverage-yes-cnfrm" role="dialog"><div class="SC-modal modal-orange-bg">';	
				mainMarkup+='<div class="modal-dialog">';			
				mainMarkup+='<div class="modal-content less-height">';				
				mainMarkup+='<div class="text">';				
				mainMarkup+='<span class="SC-span-width add-margin" style="font-size:18px;">You must set up a Appeasement order with the appropriate service SKU to proceed.</span>';
				mainMarkup+='<div class="SC-two-buttons"><button id="SN-Warranty-Coverage-yes-cnfrm-ok" style="margin-right: 10px;">OK</button>';
				mainMarkup+='		</div>';
				mainMarkup+='	</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div>';
				mainMarkup+='</div></div>';
			/*Disposal line ends here-*/
			mainMarkup+='	</div>';
			mainMarkup+='</div>';
			return mainMarkup;
	}
    return SCSROOrderEntryLineItemsPM;
   }()
  );
  return "SiebelAppFacade.SCSROOrderEntryLineItemsPM";
 })
}
