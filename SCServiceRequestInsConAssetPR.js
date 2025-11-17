/*LIKHITHA: Created this file for terminal popup on exchange*/
if (typeof (SiebelAppFacade.SCServiceRequestInsConAssetPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCServiceRequestInsConAssetPR");
	define("siebel/custom/SelectComfort/SCServiceRequestInsConAssetPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/bootstrap.min.js", "siebel/custom/SelectComfort/SC_OUI_Methods"],
		function () {
			SiebelAppFacade.SCServiceRequestInsConAssetPR = (function () {

				var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

				function SCServiceRequestInsConAssetPR(pm) {
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.constructor.apply(this, arguments);
				}

				SiebelJS.Extend(SCServiceRequestInsConAssetPR, SiebelAppFacade.JQGridRenderer);

				SCServiceRequestInsConAssetPR.prototype.Init = function () {
					// Init is called each time the object is initialised.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.Init.apply(this, arguments);
					// Add code here that should happen after default processing
				}

				SCServiceRequestInsConAssetPR.prototype.ShowUI = function () {
					// ShowUI is called when the object is initially laid out.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.ShowUI.apply(this, arguments);
					// Add code here that should happen after default processing

					//start:LIKHITHA - Terminal offline Popup
					var markup = '<div id="applet1">        <div class="container-fluid no-margin no-padding">  <div class="modal fade SC-SO-add-popup" id="SC-terminal-offline-popup" role="dialog">';
					markup += '	<div class="SC-modal modal-orange-bg">';
					markup += '            <div class="modal-dialog">';
					markup += '				<div class="modal-content less-height">';
					markup += '                    <div class="text">';
					markup += '                        <span class="SC-span-width add-margin">The selected terminal is offline. Please select another terminal to proceed.</span>';
					markup += '                        <button class="SC-ok-button" id="SC-terminal-offline-ok">OK</button>';
					markup += '                    </div>';
					markup += '                </div>';
					markup += '            </div>';
					markup += '	</div>';
					markup += '</div>';
					//End:SHARATH - Terminal offline Popup

					//SHARATH:Start: Added below code for terminal US.
					markup += '<div class="modal fade SC-add-terminals in" id="SC-add-terminal-tile" role="dialog" style="display: none; justify-content: center; align-items: center;">            <div class="modal-dialog">                            <div class="modal-content">                    <div class="modal-header">                                              <div class="header-content">                            <div class="sc-head-title">                                <div class="img-sorce"><img src="images/custom/Adyen_S1E2L.png"></div>                                <p class="no-margin overflow-title" id="TerminalTitle">Select Terminal</p>                                 <button id="SC-save-terminal-EX">Save</button>                            </div>                        </div>                    </div>                    <div class="modal-body">                        <div class="row no-margin">                            <div class="col-md-12 col-lg-12 col-sm-12 sc-add-border">                                <div class="SC-add-terminal">                                                                       <select class="sc-add-input" id="terminal-list" style="pointer-events: all; ">                                            <option class="SC-SO-Option" selected="selected">Select Terminal</option>';

					markup += '</select>                             </div>                            </div>                        </div>                        <p class="clearfix sc-bg-red" id="sc-terminal-error"></p>                        <div class="SC-table-with-scroll-main" id="SC-storelocation">                    </div>                </div>            </div></div></div>';
					//SHARATH:End: Added below code for terminal US.
					markup += '<div class="add-contact" id="SC-terminal-tile" style="display:none">';
					markup += '<div class="image-block account">';
					markup += '<img src="images/custom/Adyen_S1E2L.png" class="add-icon">                            </div>';
					markup += '<span>No Terminal Available</span>';
					markup += '</div></div></div>';

					$('#applet1 #SC-add-terminal-tile').remove();
					$('#applet1 #SC-terminal-offline-popup').remove();
					$('#applet1 #SC-add-terminal-tile').remove();

					$('html body').prepend(markup);
				}

				SCServiceRequestInsConAssetPR.prototype.BindData = function (bRefresh) {
					// BindData is called each time the data set changes.
					// This is where you'll bind that data to user interface elements you might have created in ShowUI
					// Add code here that should happen before default processing
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.BindData.apply(this, arguments);
					// Add code here that should happen after default processing
				}

				SCServiceRequestInsConAssetPR.prototype.BindEvents = function () {
					// BindEvents is where we add UI event processing.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.BindEvents.apply(this, arguments);
					// Add code here that should happen after default processing

					var PM = this.GetPM();
					var controls = PM.Get("GetControls");
					var exchangeButton = controls["SC Exchange"];

					$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + exchangeButton.GetInputName() + "_Ctrl",

						function (evt) {
							evt.stopImmediatePropagation();
							var poleDisplayFlg = SiebelApp.S_App.GetProfileAttr('PoleDisplayOUI');
							var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');
							var DupFlg = SiebelApp.S_App.GetActiveView().GetAppletMap()["SIS OM Products & Services Root List Applet (Service) - Contact"].GetBusComp().GetFieldValue("SC SRO Duplicate Flag");
							if (fitFlag == "Y" && DupFlg != "Y") {
								if (poleDisplayFlg == "Y") {
									//LikhithaK:EP-21:Start:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
									var sIPadOrder = SiebelApp.S_App.GetProfileAttr('Device');
									var sPoleConfBypass = localStorage.getItem('PoleDisplayConfBypass');
									if(sPoleConfBypass=="Y" && sIPadOrder=='Tablet')
									{
										localStorage.setItem("PoleDisplayConfBypass", "N");
									}
									//LikhithaK:EP-21:End:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
									SCOUIMethods.SCnGetDisplayTerminals();
								} else {
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SIS OM Products & Services Root List Applet (Service) - Contact"].InvokeMethod('SCExchange');
								}
							} else {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SIS OM Products & Services Root List Applet (Service) - Contact"].InvokeMethod('SCExchange');
							}

						});


					//Start: SHARATH: added below code for terminal US
					$(document).on('click', '#SC-save-terminal-EX', function (event) {
						event.stopImmediatePropagation();
						var terminalSelected = $('#terminal-list').val();
						if (terminalSelected == "Select Terminal") {
							$('p.sc-bg-red').text('Select a terminal to proceed.');
							$('#terminal-list').css('border-color', 'red');

						} else {
							var termId = $('#terminal-list option:selected').attr('term-id');
							var termNm = $('#terminal-list option:selected').attr('term-name');
							$('#SC-terminal-tile span').text(termId);

							$("#SC-add-terminal-tile").modal('hide');
							$("#SC-storelocation").html("");

							var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
							var sinPS = SiebelApp.S_App.NewPropertySet();
							var soutPS = SiebelApp.S_App.NewPropertySet();
							sinPS.SetProperty('Name', 'TerminalSelectedForService');
							sinPS.SetProperty('Value', termId);

							if (sBservice) {
								soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
							}

							var Bservice = SiebelApp.S_App.GetService("SessionAccessService");
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty('Name', 'TerminalNmSelectedForService');
							inPS.SetProperty('Value', termNm);
							if (Bservice) {
								outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
							}
							/*
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
							var OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('SC Sales Order Entry Form Applet OUI').GetBusComp().GetFieldValue('Order Number');
							inPS.SetProperty('Order Number',OrderNum);
							inPS.SetProperty('Terminal Id',termId);
							
							if(Bservice)
								{
									outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS);
								}
								
								var inPS = SiebelApp.S_App.NewPropertySet();
								var outPS = SiebelApp.S_App.NewPropertySet();
								var Bservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");

								inPS.SetProperty('RefreshAll','Y');

								if(Bservice)
									{
										outPS = Bservice.InvokeMethod("RefreshCurrentApplet", inPS);
										
									}
								*/
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SIS OM Products & Services Root List Applet (Service) - Contact"].InvokeMethod('SCExchange');

							var sBservice1 = SiebelApp.S_App.GetService("SessionAccessService");
							var sinPS1 = SiebelApp.S_App.NewPropertySet();
							var soutPS1 = SiebelApp.S_App.NewPropertySet();
							sinPS1.SetProperty('Name', 'FromSRExchange');
							sinPS1.SetProperty('Value', 'Y');
							if (sBservice1) {
								soutPS1 = sBservice1.InvokeMethod("SetProfileAttr", sinPS1);
							}
							
							
						}
					});
				}

				SCServiceRequestInsConAssetPR.prototype.EndLife = function () {
					// EndLife is where we perform any required cleanup.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCServiceRequestInsConAssetPR.superclass.EndLife.apply(this, arguments);
					// Add code here that should happen after default processing
				}
				
				

				return SCServiceRequestInsConAssetPR;
			}());
			return "SiebelAppFacade.SCServiceRequestInsConAssetPR";
		})
}
