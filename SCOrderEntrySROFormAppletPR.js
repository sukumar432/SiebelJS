if (typeof (SiebelAppFacade.SCOrderEntrySROFormAppletPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCOrderEntrySROFormAppletPR");
	define("siebel/custom/SCOrderEntrySROFormAppletPR", ["siebel/phyrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods"],
		function () {
			SiebelAppFacade.SCOrderEntrySROFormAppletPR = (function () {
				var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
				var orderBC, orderId = "",
					orderNumber = "",
					poleDisplayFlag = "N",
					sP2PEFlag = "";
				var poleTaxTotal = 0.00,
					ItesmDiscount = 0.00;
				var subTotal, totalDiscounts, orderTotal, taxTotal;
				var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');
				// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
				sP2PEFlag = SiebelApp.S_App.GetProfileAttr('P2PEFlag');

				function SCOrderEntrySROFormAppletPR(pm) {
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.constructor.apply(this, arguments);
				}

				SiebelJS.Extend(SCOrderEntrySROFormAppletPR, SiebelAppFacade.PhysicalRenderer);

				SCOrderEntrySROFormAppletPR.prototype.Init = function () {
					// Init is called each time the object is initialised.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.Init.apply(this, arguments);
					SiebelJS.Log(this.GetPM().Get("GetName") + ": SCOrderEntrySROFormAppletPR:      Init method reached.");
					// Add code here that should happen after default processing
					orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
				}

				SCOrderEntrySROFormAppletPR.prototype.ShowUI = function () {
					// ShowUI is called when the object is initially laid out.
					// Add code here that should happen before default processing
					SiebelJS.Log(this.GetPM().Get("GetName") + ": SCOrderEntrySROFormAppletPR:      ShowUI method reached.");
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.ShowUI.apply(this, arguments);
					// Add code here that should happen after default processing
					if (SiebelApp.S_App.GetActiveView().GetName() == "Order Entry - Payment View") {
						$("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].GetPModel().Get("GetFullId")).hide();
					}
					if (SiebelApp.S_App.GetActiveView().GetName() == "SC Exchange Order Step Bill2 Ship2 View") {
						var ExchangeOrder = SiebelApp.S_App.GetProfileAttr('FromSRExchange');
						var poleDisplayFlg = SiebelApp.S_App.GetProfileAttr('PoleDisplayOUI');
						var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');
						if (ExchangeOrder == "Y" && poleDisplayFlg == "Y" && fitFlag == "Y") {
							var orderNum = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp().GetFieldValue("Order Number");
							var term_id = SiebelApp.S_App.GetProfileAttr('TerminalSelectedForService');
							var term_Nm = SiebelApp.S_App.GetProfileAttr('TerminalNmSelectedForService');
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");

							inPS.SetProperty('Order Number', orderNum);
							inPS.SetProperty('Terminal Id', term_id);
							inPS.SetProperty('Terminal Name', term_Nm);

							if (Bservice) {
								outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS);
							}

							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var Bservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");

							inPS.SetProperty('RefreshAll', 'Y');

							if (Bservice) {
								outPS = Bservice.InvokeMethod("RefreshCurrentApplet", inPS);

							}


							var sBservice1 = SiebelApp.S_App.GetService("SessionAccessService");
							var sinPS1 = SiebelApp.S_App.NewPropertySet();
							var soutPS1 = SiebelApp.S_App.NewPropertySet();
							sinPS1.SetProperty('Name', 'FromSRExchange');
							sinPS1.SetProperty('Value', 'N');
							if (sBservice1) {
								soutPS1 = sBservice1.InvokeMethod("SetProfileAttr", sinPS1);
							}
						}
					}
					orderId = orderBC.GetFieldValue("Id");
					orderNumber = orderBC.GetFieldValue("Order Number");
					var storeuser = SiebelApp.S_App.GetProfileAttr("SC Store User");
					var storenumber = SiebelApp.S_App.GetProfileAttr("SCStoreName");
					//storenumber="10540";
					if (storeuser == "Y" && storenumber != "" && storenumber != undefined) {
						var service = "",
							inputs = "",
							outputs = "";
						service = SiebelApp.S_App.GetService("SC Custom Query");
						inputs = SiebelApp.S_App.NewPropertySet();
						outputs = SiebelApp.S_App.NewPropertySet();
						var searchfields = "Name,Pole Display";
						inputs.SetProperty("BO", "Internal Division");
						inputs.SetProperty("BC", "Internal Division");
						inputs.SetProperty("SearchSpecification", "[SC Store Number] = '" + storenumber + "'");
						inputs.SetProperty("SortSpecification", "");
						inputs.SetProperty("ReqNoOfRecords", "");
						inputs.SetProperty("FieldsArray", searchfields);
						outputs = service.InvokeMethod("Query", inputs);
						var childs = outputs.GetChild(0);
						var records = childs.GetProperty("OutputRecordSet");
						if (records != "}") {
							var resultArray = new Array;
							resultArray = records.split(";");
							jsonRes = JSON.parse(resultArray[0]);
							poleDisplayFlag = jsonRes["Pole Display"];
							SiebelJS.Log("jsonSK" + jsonRes["Pole Display"]);
						}
					}
					SiebelJS.Log("PoleDisplayFlag..:" + poleDisplayFlag);
					if (poleDisplayFlag == "Y") {
						localStorage.setItem("InvokepoleDisplay", "Y");
					}
					if (SiebelApp.S_App.GetActiveView().GetName() == "Order Entry - Payment View") {
						if (poleDisplayFlag == "Y" && localStorage.getItem("InvokeOrderpoleDisplay") == "Y" && sP2PEFlag != "Y") {
							//var  orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
							var poleJSON = [];
							var totalDiscounts;
							orderTotal = orderBC.GetFieldValue("Order Total");
							orderTotal = orderTotal.replace(/[$,]/g, "");
							orderTotal = orderTotal == "" ? 0.00 : parseFloat(orderTotal).toFixed(2);
							taxTotal = orderBC.GetFieldValue("Third Party Tax Amount");
							taxTotal = taxTotal.replace(/[$,]/g, "");
							taxTotal = taxTotal == "" ? 0.00 : parseFloat(taxTotal).toFixed(2);
							subTotal = orderTotal - taxTotal;
							subTotal = subTotal == "" ? 0.00 : parseFloat(subTotal).toFixed(2)
							poleDisplay2(poleJSON, "OrderTotal");
						} else if (poleDisplayFlag == "Y" && localStorage.getItem("InvokeOrderpoleDisplay") == "Y" && sP2PEFlag == "Y") {
							orderTotal = orderBC.GetFieldValue("Order Total");
							orderTotal = orderTotal.replace(/[$,]/g, "");
							orderTotal = orderTotal == "" ? 0.00 : parseFloat(orderTotal).toFixed(2);
							taxTotal = orderBC.GetFieldValue("Third Party Tax Amount");
							taxTotal = taxTotal.replace(/[$,]/g, "");
							taxTotal = taxTotal == "" ? 0.00 : parseFloat(taxTotal).toFixed(2);
							subTotal = orderTotal - taxTotal;
							subTotal = subTotal == "" ? 0.00 : parseFloat(subTotal).toFixed(2);
							poleInfo = [];
							if (subTotal < 0) {
								subTotal = 0 - subTotal;
								subTotal = subTotal == "" ? 0.00 : parseFloat(subTotal).toFixed(2);
								subTotal = "(" + subTotal + ")";
							} else {
								subTotal = subTotal == "" ? 0.00 : parseFloat(subTotal).toFixed(2);
							}
							if (taxTotal < 0) {
								taxTotal = 0 - taxTotal;
								taxTotal = taxTotal == "" ? 0.00 : parseFloat(taxTotal).toFixed(2);
								taxTotal = "(" + taxTotal + ")";
							} else {
								taxTotal = taxTotal == "" ? 0.00 : parseFloat(taxTotal).toFixed(2);
							}
							if (orderTotal < 0) {
								orderTotal = 0 - orderTotal;
								orderTotal = orderTotal == "" ? 0.00 : parseFloat(orderTotal).toFixed(2);
								orderTotal = "(" + orderTotal + ")";
							} else {
								orderTotal = orderTotal == "" ? 0.00 : parseFloat(orderTotal).toFixed(2);
							}
							poleInfo.push("SubTotal: $" + subTotal);
							poleInfo.push("TaxTotal: $" + taxTotal);
							poleInfo.push("------------------------------");
							poleInfo.push("OrderTotal: $" + orderTotal);
							SCOUIMethods.ClearP2PEPoleDisplay(orderId);
							SCOUIMethods.P2PEDispalyMultiLineItems(orderId, poleInfo);
						} else {
							localStorage.setItem("InvokeOrderpoleDisplay", "N");
						}
					}
				}

				SCOrderEntrySROFormAppletPR.prototype.BindData = function (bRefresh) {
					// BindData is called each time the data set changes.
					// This is where you'll bind that data to user interface elements you might have created in ShowUI
					// Add code here that should happen before default processing
					SiebelJS.Log(this.GetPM().Get("GetName") + ": SCOrderEntrySROFormAppletPR:      BindData method reached.");
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.BindData.apply(this, arguments);
					// Add code here that should happen after default processing
				}

				SCOrderEntrySROFormAppletPR.prototype.BindEvents = function () {
					// BindEvents is where we add UI event processing.
					// Add code here that should happen before default processing
					SiebelJS.Log(this.GetPM().Get("GetName") + ": SCOrderEntrySROFormAppletPR:      BindEvents method reached.");
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.BindEvents.apply(this, arguments);
					// Add code here that should happen after default processing

					var PM = this.GetPM();
					var controls = PM.Get("GetControls");
					var submitButton = controls["BSubmit"];
					orderId = orderBC.GetFieldValue("Id");
					orderNumber = orderBC.GetFieldValue("Order Number");
					/*$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + submitButton.GetInputName() + "_Ctrl",
		"click",
		{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
		function(evt){*/
					//LikhithaK:Start:EP-21:Identifier for Order Submission in iPad
					$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + submitButton.GetInputName() + "_Ctrl",
						function (evt) {
							var sIPadOrder = SiebelApp.S_App.GetProfileAttr('Device');
							if (sIPadOrder == 'Tablet') {
								var fieldnames = 'SC Ipad Identifier';
								var fieldvalues = 'iPad';
								var Bservice = '',
									inPS = '',
									outPS = '';
								inPS = SiebelApp.S_App.NewPropertySet();
								outPS = SiebelApp.S_App.NewPropertySet();
								inPS.SetProperty("BO", "Order Entry");
								inPS.SetProperty("BC", "Order Entry - Orders");
								inPS.SetProperty("FieldsArray", fieldnames);
								inPS.SetProperty("ValuesArray", fieldvalues);
								inPS.SetProperty("SearchSpecification", "[Id] = '" + orderId + "'");
								Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
								outPS = Bservice.InvokeMethod("Insert", inPS);
							}
						});
					//LikhithaK:End:EP-21:Identifier for Order Submission in iPad

					this.GetPM().AttachPMBinding("FieldChange", function (control, field_value) {
						var ctrlname = control.GetName();
						var finPromoApplied = SiebelApp.S_App.GetProfileAttr('FinPromoApplied');
						if (ctrlname == "SC Total Balance Due" && finPromoApplied == "Y") {
							var Bservice = '',
								inPS = '',
								outPS = '';
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("Name", "FinPromoApplied");
							inPS.SetProperty("Value", "N");
							Bservice = SiebelApp.S_App.GetService("SessionAccessService");
							outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
							alert("You have selected a Financing payment option. The order total is now being updated to appropriately reflect the finance payment discounts.");
						}
					});

					this.GetPM().AttachPostProxyExecuteBinding("ABOSubmitOrderSvc", function (methodName, inputPS, outputPS) {
						//SPATIBAN:JUNE2019:Added logic to trigger UPT
						if (localStorage.getItem("EnableUPT") == "Y")
							SCOUIMethods.SCInvokeUPT("ABOSubmitOrderSvcEnd");
						var newStatus = orderBC.GetFieldValue("Status");
						if (newStatus != "Siebel Error" && newStatus != "In Progress" && newStatus != "Payment In Progress") {
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("SC CTI UI Service");
							outPS = service.InvokeMethod("IsCustomUI", inPS);
							var Result = outPS.GetChild(0).GetProperty("Result");
							var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
							if (Result == 1 && storeUser == "Y") {
								var SC_reportName = "";
								var timeInterval = setInterval(function () {
									SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].InvokeMethod("RefreshBusComp");
									var newStatus = orderBC.GetFieldValue("Status");
									if (newStatus != "Siebel Error" && newStatus != "In Progress" && newStatus != "Payment In Progress") {
										clearInterval(timeInterval);
										//SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].InvokeMethod("RefreshBusComp");
										var inPS = SiebelApp.S_App.NewPropertySet();
										var outPS = SiebelApp.S_App.NewPropertySet();
										var service = SiebelApp.S_App.GetService("SC Store Data BS");
										inPS.SetProperty("biporderrowid", orderId);
										inPS.SetProperty("bipordernumber", orderNumber);
										if (sP2PEFlag == "Y") {
											inPS.SetProperty("receiptmode", "Customer");
										} else {
											inPS.SetProperty("receiptmode", "Original");
										}
										outPS = service.InvokeMethod("SC SRO Reciept Generation", inPS);
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].InvokeMethod("RefreshAppletUI");
										SC_reportName = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].GetBusComp().GetFieldValue("ReportOutputFileName");
										/*$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
										$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
										$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
										SCOUIMethods.AutoPrint(SC_reportName);*/

										//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
										setTimeout(function () {
											$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
											setTimeout(function () {
												$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
												//SCOUIMethods.AutoPrint(SC_reportName);
												if (fitFlag != "Y") {
													autoPrint(SC_reportName);
												} else {
													autoPrint(SC_reportName);
													autoPrint(SC_reportName);
												}

											}, 2000);
										}, 3000);

										if (sP2PEFlag == "Y") {
											if (fitFlag != "Y") {
												setTimeout(function () {
													inPS.SetProperty("receiptmode", "Merchant");
													outPS = service.InvokeMethod("SC SRO Reciept Generation", inPS);
													SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].InvokeMethod("RefreshAppletUI");
													SC_reportName = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].GetBusComp().GetFieldValue("ReportOutputFileName");
													/*$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
													$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
													$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
													SCOUIMethods.AutoPrint(SC_reportName);*/
													//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
													setTimeout(function () {
														$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
														setTimeout(function () {
															$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
															//SCOUIMethods.AutoPrint(SC_reportName);

															autoPrint(SC_reportName);
														}, 2000);
													}, 3000);
												}, 4000);
											}
										}
									}
								}, 1000);
							}
						}
					});
					//SPATIBAN:27-MAY-2019:Added below code for to track UPT
					var sActiveName = SiebelApp.S_App.GetActiveView().GetName();
					if (sActiveName == "SC Warranty Order Step Discounts View") {
						var LineItemPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Warranty Order Step Discounts Applet"].GetPModel().GetRenderer().GetPM();
						LineItemPM.AttachPostProxyExecuteBinding("SC Calculate Shipping", function (methodName, inputPS, outputPS) {
							if (localStorage.getItem("EnableUPT") == "Y")
								SCOUIMethods.SCInvokeUPT("SC Calculate Shipping End");
						});
						LineItemPM.AttachPostProxyExecuteBinding("SCVerify", function (methodName, inputPS, outputPS) {
							if (localStorage.getItem("EnableUPT") == "Y")
								SCOUIMethods.SCInvokeUPT("SCVerify End");
						});
					}
					/* 		if(sActiveName=="SC Warranty Order Step New Product View"){
								var LineItemPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Warranty Order Step New Product Applet"].GetPModel().GetRenderer().GetPM();
								LineItemPM.AttachPostProxyExecuteBinding("SCWarrantySimplication", function(methodName, inputPS, outputPS){
									if(localStorage.getItem("EnableUPT")=="Y")
									SCOUIMethods.SCInvokeUPT("SCWarrantySimplication End");
								});
							} */
					this.GetPM().AttachPreProxyExecuteBinding("QuotesAndOrdersValidate", function (methodName, inputPS, outputPS) {
						//SPATIBAN:JUNE2019:Added logic to trigger UPT
						if (localStorage.getItem("EnableUPT") == "Y")
							SCOUIMethods.SCInvokeUPT("QuotesAndOrdersValidateEnd");
						localStorage.setItem("InvokeOrderpoleDisplay", "Y");
					});

					this.GetPM().AttachPreProxyExecuteBinding("ABOSubmitOrderSvc", function (methodName, inputPS, outputPS) {
						if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
							var poleInfo, Operation;
							poleInfo = {};
							Operation = "DeleteLineItem";
							localStorage.setItem("InvokepoleDisplay", "Y");
							poleDisplay2(poleInfo, Operation);
						} else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
							SCOUIMethods.ClearP2PEPoleDisplay(orderId);
						} else {
							localStorage.setItem("InvokepoleDisplay", "N");
						}
					});
				}

				SCOrderEntrySROFormAppletPR.prototype.EndLife = function () {
					// EndLife is where we perform any required cleanup.
					// Add code here that should happen before default processing
					SiebelJS.Log(this.GetPM().Get("GetName") + ": SCOrderEntrySROFormAppletPR:      EndLife method reached.");
					SiebelAppFacade.SCOrderEntrySROFormAppletPR.superclass.EndLife.apply(this, arguments);
					// Add code here that should happen after default processing
				}

				function poleDisplay2(poleInfo, Operation) {
					var DISA_POLEDISPLAY = "plugin_poledisplay";
					var consts = SiebelJS.Dependency("SiebelApp.Constants");
					consts.set("WS_" + DISA_POLEDISPLAY.toUpperCase() + "_VERSION", "1.0.0");
					var DISAHandler = null;
					//subTotal=subTotal.toFixed(2);
					callPoleDisplay(poleInfo);

					function callPoleDisplay(poleInfo) {
						console.log("Calling DISA Pole Display PLUGIN with : ");
						var poleHandler = getDISAHandler.call(this);
						// here we create an object containing data which the Java application will read.
						// Neither "Command", nor "GetSysInfo" are DISA specific.
						// The shape and content of the message is entirely up to the developer.
						var msgJSON = {};
						//msgJSON["Command"] = "Ready"; 
						if (Operation == "OrderTotal")
							msgJSON = getOrderTotal();
						if (Operation == "LineDetails")
							msgJSON = getLineDetails(poleInfo);
						if (Operation == "DeleteLineItem")
							msgJSON = nulliflyPole(poleInfo);
						poleHandler.SendMessage(msgJSON);
						// the message is sent asychronously, so once the command is sent, nothing further happens
						// within the PR/PM until a message is received.
					}

					function getDISAHandler() {
						if (DISAHandler === null) {
							DISAHandler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_POLEDISPLAY);
							// communications with DISA are asynchronous. We define handler functions here to deal with
							// possible responses from DISA, such as a message or communication failure conditions.
							DISAHandler.OnMessage = onWSMessage.bind(this);
							DISAHandler.OnFail = onWSSendFail.bind(this);
							DISAHandler.OnClose = onWSClose.bind(this);
						}
						return DISAHandler;
					}

					function getLineDetails(poleInfo) {
						SiebelJS.Log(JSON.stringify(poleInfo));
						var poleData = {};
						poleData["PoleDisplay"] = poleInfo;
						SiebelJS.Log(JSON.stringify(poleData));
						//SiebelApp.S_App.LogOff();
						return poleData;
					}

					function getOrderTotal() {
						//subTotal = subTotal.toFixed(2);
						subTotal = subTotal == "" ? 0.00 : parseFloat(subTotal).toFixed(2);
						//taxTotal = taxTotal.toFixed(2);
						taxTotal = taxTotal == "" ? 0.00 : parseFloat(taxTotal).toFixed(2);
						//orderTotal = orderTotal.toFixed(2);
						orderTotal = orderTotal == "" ? 0.00 : parseFloat(orderTotal).toFixed(2);
						poleInfo = [];
						poleInfo.push({
							"Command": "Ready",
							"SubTotal": subTotal,
							"Tax": taxTotal
						});
						poleInfo.push({
							"Command": "Ready",
							"Total": orderTotal
						});
						SiebelJS.Log(JSON.stringify(poleInfo));
						var poleData = {};
						poleData["PoleDisplay"] = poleInfo;
						SiebelJS.Log(JSON.stringify(poleData));
						//SiebelApp.S_App.LogOff();
						return poleData;
					}

					function nulliflyPole(poleInfo) {
						poleInfo = [];
						poleInfo.push({
							"Command": "Ready",
						});
						SiebelJS.Log(JSON.stringify(poleInfo));
						var poleData = {};
						poleData["PoleDisplay"] = poleInfo;
						SiebelJS.Log(JSON.stringify(poleData));
						//SiebelApp.S_App.LogOff();
						return poleData;
					}

					function onWSMessage(msg) {
						// this is the result of callDISAPlugin if all goes well
						handleMsg.call(this, msg);
					}
					// Normally this indicates something wrong with communication attempt to operator at DISA
					// Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
					// Maybe because the version number at two sides are not matched, operator version should be equal or newer
					// Reset state or other variables if necessary
					function onWSSendFail() {
						handleException("Failed to send message to DISA");
					}
					// This indicates Siebel OpenUI with DISA connection was lost
					// Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
					// Maybe because DISA exited (by user) or crashed
					// Reset state or other variables if necessary
					function onWSClose() {
						handleException("Connection to DISA was lost");
					}

					// Called by onWSMessage event handler
					function handleMsg(msg) {
						// Log the message received
						console.log("JSON message received: " + JSON.stringify(msg) + "");
					}

					// Called by onWSClose or onWSSendFail event handler
					function handleException(msg) {
						//Add other error handling logic
						console.log("Handle Exception" + msg);
						alert("Handle Exception" + msg);
					}
				}

				function autoPrint(fileName) {
					var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
					var DISA_PLUGIN = "plugin_print";
					siebConsts.set("WS_" + DISA_PLUGIN.toUpperCase() + "_VERSION", "1.0.0");
					var DISAPrintHandler = null,
						alertFirstTime = "Y";;
					//Invoke Disa AutoPrint
					disaPrint(fileName);

					function disaPrint(fileName) {
						console.log("Calling DISA PLUGIN with : ");
						//console.log(myContent);
						var handler = getDISAPrintHandler.call(this);
						// here we create an object containing data which the Java application will read.

						var msgJSON = {};
						msgJSON["Command"] = "Ready";
						msgJSON["FileName"] = fileName;
						msgJSON["PrintOnce"] = "Y";
						handler.SendMessage(msgJSON);
					}
					//DISA Handler
					function getDISAPrintHandler() {
						if (DISAPrintHandler === null) {
							(function (proxied) {
								window.alert = function () {
									if (arguments[0].includes("Failed to connect to Desktop Integration Siebel Agent on your machine")) {} else
										return proxied.apply(this, arguments);
								};
							})(window.alert);
							DISAPrintHandler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_PLUGIN);
							// communications with DISA are asynchronous. We define handler functions here to deal with
							// possible responses from DISA, such as a message or communication failure conditions.
							DISAPrintHandler.OnMessage = onWSMessage.bind(this);
							DISAPrintHandler.OnFail = onWSSendFail.bind(this);
							DISAPrintHandler.OnClose = onWSClose.bind(this);
						}
						return DISAPrintHandler;
					}

					function onWSMessage(msg) {
						// this is the result of callDISAPlugin if all goes well
						handleMsg.call(this, msg);

					}

					// Normally this indicates something wrong with communication attempt to operator at DISA
					// Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
					// Maybe because the version number at two sides are not matched, operator version should be equal or newer
					// Reset state or other variables if necessary
					function onWSSendFail() {
						handleException("Failed to send message to DISA");
					}

					// This indicates Siebel OpenUI with DISA connection was lost
					// Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
					// Maybe because DISA exited (by user) or crashed
					// Reset state or other variables if necessary
					function onWSClose() {
						handleException("Connection to DISA was lost");
					}

					// Called by onWSMessage event handler

					function handleMsg(msg) {
						// Log the message received
						console.log("JSON message received: " + JSON.stringify(msg) + "");
						// Pass the message to the PR
						//console.log("DISAResponse", msg);
					}

					// Called by onWSClose or onWSSendFail event handler
					function handleException(msg) {
						// Add other error handling logic
						console.log("Handle Exception" + msg);
						if (alertFirstTime == "Y") {
							alertFirstTime = "N";
							alert("There is an issue with the software that auto prints from Siebel (DISA). Please contact the Service Desk.");
						}
					}
				}

				return SCOrderEntrySROFormAppletPR;
			}());
			return "SiebelAppFacade.SCOrderEntrySROFormAppletPR";
		})

}

