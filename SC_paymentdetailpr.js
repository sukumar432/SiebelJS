// globally rename PaymentDetailPR to the name you desire for your custom class.
// Save the file in siebel/custom/ using the same case for the file name as the class name.
function validateInputCC(thisPM) {
	var retVal = true;
	var errorMessage = "Following Fields are required:\n\n";
	var errorCount = 0;

	if (thisPM.Get("SCStoreUser") == "Y") {
		errorMessage = "Authorizations for Store users is limited to 'Rewards'; Please use POS to Authorize other payment methods"
		retVal = false;
	} else if (thisPM.Get("SCChatUser") != "Y" && thisPM.Get("SCVoicerUser") != "Y") { //Venkat R

		if (!thisPM.Get("CreditCardType")) {
			errorCount++;
			errorMessage += errorCount + ". Payment Type\n"
			retVal = false;
		}
		if (!thisPM.Get("AccountNumber")) {
			if (!thisPM.Get("CalcCreditCardNumber")) {
				errorCount++;
				errorMessage += errorCount + ". Credit Card #\n"
				retVal = false;
			}

			if (!thisPM.Get("CalcCVVNumber")) {
				errorCount++;
				errorMessage += errorCount + ". CVV Number\n"
				retVal = false;
			}

			if (!thisPM.Get("CalcExpMonth")) {
				errorCount++;
				errorMessage += errorCount + ". Expiration Month\n"
				retVal = false;
			}

			if (!thisPM.Get("CalcExpYear")) {
				errorCount++;
				errorMessage += errorCount + ". Expiration Year\n"
				retVal = false;
			}
		}

		if (!thisPM.Get("PaymentAmount") || thisPM.Get("PaymentAmount").slice(1) == "0.00") {
			errorCount++;
			errorMessage += errorCount + ". Payment Amount\n"
			retVal = false;
		} else {
			var PaymentAmount = thisPM.Get("PaymentAmount");
			var OrderTotal = thisPM.Get("SCOrderTotal");

			PaymentAmount = PaymentAmount.replace(/\D/g, "");
			OrderTotal = OrderTotal.replace(/\D/g, "");

			//Comparing the integers is much more robust than comparing floating point/decimal numbers as the comparison of int does not depend on JavaScript, hardware architecture and floating point arithmetic implementation.
			var intPA = parseInt(PaymentAmount);
			var intOT = parseInt(OrderTotal);
			if (intPA > intOT) {
				errorMessage += "Payment Amount cannot exceed Order Total for Authorization\n"
				retVal = false;
			}

			if (thisPM.Get("PaymentAmount").substring(0, 1) == "(") {
				errorMessage += "Negative Payment Amounts cannot be sent for authorization\n"
				retVal = false;
			}
		}

		if (!thisPM.Get("AuthorizationCode") && thisPM.Get("PaymentStatus") == "Need Verbal Authorization") {
			errorMessage = "Please enter Authorization Code for Verbal Authorization\n"
			retVal = false;
		}

	} else if (thisPM.Get("SCChatUser") == "Y" || thisPM.Get("SCVoicerUser") == "Y") {
		/*if(thisPM.Get("GetGCBalanceFlag") != "Y"){
			errorMessage = "Please perform “GC Balance Check” prior to “Authorization” request"
			retVal = false;
		}*/
		if (!thisPM.Get("PaymentAmount") || thisPM.Get("PaymentAmount").slice(1) == "0.00") {
			errorCount++;
			errorMessage += errorCount + ". Payment Amount\n"
			retVal = false;
		} else {
			var PaymentAmount = thisPM.Get("PaymentAmount");
			var OrderTotal = thisPM.Get("SCOrderTotal");
			PaymentAmount = PaymentAmount.replace(/\D/g, "");
			OrderTotal = OrderTotal.replace(/\D/g, "");
			//Comparing the integers is much more robust than comparing floating point/decimal numbers as the comparison of int does not depend on JavaScript, hardware architecture and floating point arithmetic implementation.
			var intPA = parseInt(PaymentAmount);
			var intOT = parseInt(OrderTotal);
			if (intPA > intOT) {
				errorMessage += "Payment Amount cannot exceed Order Total for Authorization"
				retVal = false;
			}
			if (thisPM.Get("PaymentAmount").substring(0, 1) == "(") {
				errorMessage += "Negative Payment Amounts cannot be sent for authorization\n"
				retVal = false;
			}
		}

	}
	if (!retVal) {
		alert(errorMessage);
	}
	return retVal;
}

if (typeof (SiebelAppFacade.PaymentDetailPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.PaymentDetailPR");

	define("siebel/custom/SC_paymentdetailpr", ["siebel/phyrenderer"],
		function () {
			SiebelAppFacade.PaymentDetailPR = (function () {

					//Venkat R 11/19/2020 for Secure Payment
					var orderBC, paymentBC, appletName, sChatUser = "",
						sVoiceUser = "",
						CcCardPM;

					function PaymentDetailPR(pm) {
						SiebelAppFacade.PaymentDetailPR.superclass.constructor.apply(this, arguments);
						this.GetPM().AttachPMBinding("MakeAuthCodeReadOnly", this.MakeAuthCodeReadOnly, {
							scope: this
						});
					}
					SiebelJS.Extend(PaymentDetailPR, SiebelAppFacade.PhysicalRenderer);

					PaymentDetailPR.prototype.MakeAuthCodeReadOnly = function () {
						var PM = this.GetPM();
						var controls = PM.Get("GetControls");
						var makeReadonly = PM.Get("MakeAuthCodeReadOnly");
						if (makeReadonly) {
							$("[name=" + controls["Authorization Code"].GetInputName() + "]")
								.css('visibility', 'hidden');
							$("span#Authorization_Code_Label").parent().fadeOut(500);
						} else {
							$("[name=" + controls["Authorization Code"].GetInputName() + "]")
								.css('visibility', 'visible');
							$("span#Authorization_Code_Label").parent().fadeIn(500);
						}
					}

					PaymentDetailPR.prototype.Init = function () {
						SiebelAppFacade.PaymentDetailPR.superclass.Init.apply(this, arguments);
						//Venkat 10/26/2020 for Secure Payment added sChatUser variable
						//sChatUser = theApplication().GetProfileAttr("SC Chat User");
						//sVoiceUser = theApplication().GetProfileAttr("SC Voice User");
						//sChatUser = "Y";
						var ccPM = this.GetPM();
						CcCardPM = ccPM;
						//ccPM.AddProperty( "SCVoicerUser",sVoiceUser);
						var ccPM = this.GetPM();
						sChatUser = ccPM.Get("SCChatUser");
						sVoiceUser = ccPM.Get("SCVoicerUser");
						var oBO = SiebelApp.S_App.GetActiveBusObj().GetName();
						if (oBO == "Order Entry (Sales)") {
							orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet (Sales)"].GetBusComp();
						} else {
							if (SiebelApp.S_App.GetActiveView().GetAppletMap().hasOwnProperty("Order Entry - Order Form Applet"))
								orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
							else if (SiebelApp.S_App.GetActiveView().GetAppletMap().hasOwnProperty("SC SRO Order Entry - Order Wholesale Form Applet"))
								orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SRO Order Entry - Order Wholesale Form Applet"].GetBusComp();
						}
					}

					PaymentDetailPR.prototype.BindData = function (bRefresh) {
						SiebelAppFacade.PaymentDetailPR.superclass.BindData.apply(this, arguments);
						/*var Appletid = PM.Get("IsResponsive") ? PM.Get("GetListId") : PM.Get("GetFullId");
						$("#s_"+Appletid+"_div").find("[name="+PM.Get( "GetControls" )[ "SC CVV Number" ].GetInputName()+"]").attr("type", "text");
						$("#s_"+Appletid+"_div").find("[name="+PM.Get( "GetControls" )[ "SC CVV Number" ].GetInputName()+"]").attr("autocomplete", "off");
						$("#s_"+Appletid+"_div").find("[name="+PM.Get( "GetControls" )[ "SC CVV Number" ].GetInputName()+"]").attr("style", "text-security:disc; -webkit-text-security:disc;");*/

					}

					PaymentDetailPR.prototype.ShowUI = function () {
						SiebelAppFacade.PaymentDetailPR.superclass.ShowUI.apply(this, arguments);
						//Start..Venkat R 11/19/2020 for Chat User for Secure Payment

						var appletName = this.GetPM().Get("GetName");
						var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();

						if (sChatUser == "Y" || sVoiceUser == "Y") {
							var controls = this.GetPM().Get("GetControls");
							$("[name=" + controls["SC Credit Card Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["SC CVV Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Month"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Year"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Authorization Code"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Payment Type"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("#" + controls["Payment Type"].GetInputName() + "_icon").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							if (sChatUser == "Y") {
								//LikhithaK:02Sep2024:Sycurio ChatUser-Hide Authorize button-Start
								var sPayMethod = paymentBC.GetFieldValue("Payment Method"); 
								var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
								if (sSycChatFlg == "Y" && sPayMethod == "Credit Card")
									{
										$("[name="+controls["Authorize"].GetInputName()+"]").css('visibility', 'hidden');
									}  
						else{
								//LikhithaK:02Sep2024:Sycurio ChatUser-Hide Authorize button-End
								$("[name=" + controls["SC Payment Link"].GetInputName() + "]").css('visibility', 'visible');
								$("[name=" + controls["SC Semaphone Capture Status"].GetInputName() + "]").css('visibility', 'visible');
								$("span#SC_Payment_Link_Label").parent().fadeIn(500);
								$("span#SC_Semaphone_Capture_Status_Label").parent().fadeIn(500);
							} 
						}else {
								$("[name=" + controls["SC Payment Link"].GetInputName() + "]").css('visibility', 'hidden');
								$("[name=" + controls["SC Semaphone Capture Status"].GetInputName() + "]").css('visibility', 'hidden');
								$("span#SC_Payment_Link_Label").parent().fadeOut(500);
								$("span#SC_Semaphone_Capture_Status_Label").parent().fadeOut(500);
							}
							var sAccountNumber = paymentBC.GetFieldValue("Account Number");
							console.log("Account Number: " + sAccountNumber);
							if (sAccountNumber.length == 0) {
								$("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', true).css("opacity", 0.3);
							}
						} else {
							var controls = this.GetPM().Get("GetControls");
							$("[name=" + controls["SC Payment Link"].GetInputName() + "]").css('visibility', 'hidden');
							$("[name=" + controls["SC Semaphone Capture Status"].GetInputName() + "]").css('visibility', 'hidden');
							$("span#SC_Payment_Link_Label").parent().fadeOut(500);
							$("span#SC_Semaphone_Capture_Status_Label").parent().fadeOut(500);
						}
						// End ..Venkat R 11/19/2020 for Chat User for Secure Payment
						//Venkat R 01/06/2021 Added for Voice User iFrame Popup
						if (!$("#_sweclient").hasClass("sc-sro-creditcardsemaphone")) {
							var mainMarkup = "";
							mainMarkup += ' <div id="applet1" class="sc-sro-creditcardsemaphone">';
							mainMarkup += ' <div class="container-fluid no-margin no-padding">';
							mainMarkup += ' <div class="modal fade sc-create-manual-asset" id="SC-SRO-manual-cc-voice-payment" role="dialog">';
							mainMarkup += ' </div>';
							mainMarkup += '</div>';
							mainMarkup += '</div>';
							$("#_sweclient").append(mainMarkup);
						}
						// End..Venkat R 01/06/2021 Added for Voice User iFrame Popup
					}

					PaymentDetailPR.prototype.BindEvents = function (controlSet) {
						SiebelAppFacade.PaymentDetailPR.superclass.BindEvents.apply(this);
						var PM = this.GetPM();
						var controls = PM.Get("GetControls");
						var authorizeButton = controls["Authorize"];
						var PaymentLineId = controls["Payment Id"];
						var SCOrderTotal = controls["SC Order Total"];
						var AuthorizationCode = controls["Authorization Code"];
						var SCPmtStatus = controls["SC Payment Status"];

						if (PaymentLineId != undefined) {
							$("[name=" + PaymentLineId.GetInputName() + "]").css('visibility', 'hidden');
						}
						if (SCOrderTotal != undefined) {
							$("[name=" + SCOrderTotal.GetInputName() + "]").css('visibility', 'hidden');
						}

						$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + authorizeButton.GetInputName() + "_Ctrl",
							"click", {
								ctx: this,
								ctrls: controls
							}, //Pass the 'controls' collection to the event handler in the data object.
							function (evt) {
								evt.stopImmediatePropagation();
								var appletName = PM.Get("GetName");
								var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();

								PM = evt.data.ctx.GetPM();
								$("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'hidden');

								//Set the property values by reading from controls.
								PM.SetProperty("PaymentMethod",
									$("[name=" + evt.data.ctrls["Payment Method"].GetInputName() + "]").val());

								PM.SetProperty("CreditCardType",
									$("[name=" + evt.data.ctrls["Payment Type"].GetInputName() + "]").val());

								PM.SetProperty("PaymentAmount",
									$("[name=" + evt.data.ctrls["Transaction Amount"].GetInputName() + "]").val());

								PM.SetProperty("CalcCreditCardNumber",
									$("[name=" + evt.data.ctrls["SC Credit Card Number"].GetInputName() + "]").val());

								PM.SetProperty("CalcCVVNumber",
									$("[name=" + evt.data.ctrls["SC CVV Number"].GetInputName() + "]").val());

								PM.SetProperty("CalcExpMonth",
									$("[name=" + evt.data.ctrls["Expiration Month"].GetInputName() + "]").val());

								PM.SetProperty("CalcExpYear",
									$("[name=" + evt.data.ctrls["Expiration Year"].GetInputName() + "]").val());

								//PM.SetProperty("PaymentsRowID", $("[name="+evt.data.ctrls[ "Payment Id" ].GetInputName()+"]").val());
								PM.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));

								PM.SetProperty("AccountNumber",
									$("[name=" + evt.data.ctrls["Account Number"].GetInputName() + "]").val());

								PM.SetProperty("PaymentStatus",
									$("[name=" + evt.data.ctrls["SC Payment Status"].GetInputName() + "]").val());

								PM.SetProperty("AuthorizationCode",
									$("[name=" + evt.data.ctrls["Authorization Code"].GetInputName() + "]").val());

								//PM.SetProperty("SCOrderTotal", $("[name="+evt.data.ctrls[ "SC Order Total" ].GetInputName()+"]").val());

								if (validateInputCC(PM)) {
									//Handle the click event in the PM
									console.log("clicked AUTHORIZE button from CC PR");
									PM.OnControlEvent("AUTHORIZE_BUTTON_CLICK");
									$("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');
								} else {
									$("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');

								}
							});

						// Venkat R for Chat User for Secure Payment
						if (sChatUser == "Y") {
							var appletName = this.GetPM().Get("GetName");
							var controls = this.GetPM().Get("GetControls");
							$("[name=" + controls["SC Credit Card Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["SC CVV Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Month"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Year"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Authorization Code"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Payment Type"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("#" + controls["Payment Type"].GetInputName() + "_icon").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});

							setTimeout(function () {
								var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
								var sPaymentLink = paymentBC.GetFieldValue("SC Payment Link");
								var sAccountNumber = paymentBC.GetFieldValue("Account Number");
								console.log("Account Number: " + sAccountNumber);
								if (sAccountNumber.length == 0) {
									var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
										write = false;
									if (canWrite)
										write = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("WriteRecord");
									if (write) {
										if (sPaymentLink == "") {
											var sPaymentRecordId = paymentBC.GetFieldValue("Id");
											var orderId = orderBC.GetFieldValue("Id");
											var Bservice = '',
												inPS = '',
												outPS = '';
											inPS = SiebelApp.S_App.NewPropertySet();
											outPS = SiebelApp.S_App.NewPropertySet();
											inPS.SetProperty("Object Id", orderId);
											inPS.SetProperty("Payment Id", sPaymentRecordId);
											inPS.SetProperty("ProcessName", "SC Get Payment Link WF");
											Bservice = SiebelApp.S_App.GetService("Workflow Process Manager");
											outPS = Bservice.InvokeMethod("RunProcess", inPS);
											var Refreshservice = '',
												RefreshinPS = '',
												RefreshoutPS = '';
											RefreshinPS = SiebelApp.S_App.NewPropertySet();
											RefreshoutPS = SiebelApp.S_App.NewPropertySet();
											RefreshinPS.SetProperty("Refresh All", "Y");
											//Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
											//RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
											SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
										}
									}

									sPaymentLink = paymentBC.GetFieldValue("SC Payment Link");
									if (sPaymentLink != "") {
										var maxTimeLimit = 0;
										var getAccount = setInterval(function () {
											var sAccountNumber = paymentBC.GetFieldValue("Account Number");
											if (sAccountNumber != "") {
												$("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', false).css("opacity", 1);
												SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
												clearInterval(getAccount);
											} else {
												if (maxTimeLimit >= 30) {
													clearInterval(getAccount);
												}
												SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
												maxTimeLimit += 1;
											}
										}, 10000);
									}
								}
							}, 10);
						} // End..Venkat R for Chat User for Secure Payment
						//Venkat 12/28/2020 Voice User for Secure Payment
						else if (sVoiceUser == "Y") {
							var sPage = "";
							var appletName = this.GetPM().Get("GetName");
							var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
							var sPaymentRecordId = paymentBC.GetFieldValue("Id");
							var sAccountNumber = paymentBC.GetFieldValue("Account Number");
							console.log("Account Number: " + sAccountNumber);
							var appletName = this.GetPM().Get("GetName");
							var controls = this.GetPM().Get("GetControls");
							var cardPM = this.GetPM();
							$("[name=" + controls["SC Credit Card Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["SC CVV Number"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Month"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Expiration Year"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Authorization Code"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("[name=" + controls["Payment Type"].GetInputName() + "]").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							$("#" + controls["Payment Type"].GetInputName() + "_icon").prop("disabled", true).css({
								"color": "#727780",
								"background-color": "#dddddd"
							});
							if (sAccountNumber.length == 0 && paymentBC.GetFieldValue("SC Payment Status") == "Entered") {
								var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
									write = false;
								//var write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
								if (canWrite)
									write = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("WriteRecord");
								if (write) {
									var sPaymentRecordId = paymentBC.GetFieldValue("Id");
									var Input = SiebelApp.S_App.NewPropertySet();
									var Output = SiebelApp.S_App.NewPropertySet();
									Input.SetProperty("BO", "Order Entry (Sales)");
									Input.SetProperty("BC", "Payments");
									Input.SetProperty("SortSpecification", "");
									Input.SetProperty("ReqNoOfRecords", "");
									Input.SetProperty("SearchSpecification", "Id ='" + sPaymentRecordId + "'");
                                    var fieldsArray_new = "Id,SC Voice IFrame URL,SC Adyen Voice IFrame URL";
									Input.SetProperty("FieldsArray", fieldsArray_new);
									var Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
									Output = Custom_Service.InvokeMethod("Query", Input);
									var Child = Output.GetChild(0);
									var BS_Data = Child.GetProperty("OutputRecordSet");
									if (BS_Data != "}") {
										BS_Data = JSON.parse(BS_Data);
                                        if (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") == "Y") {
                                            sPage = BS_Data["SC Adyen Voice IFrame URL"];
                                        } else {
										sPage = BS_Data["SC Voice IFrame URL"];
									}
                                    }
									console.log("Semaphone url: " + sPage);
									if (sPage.length > 0) {
										var wmainMarkup = "";
										wmainMarkup += '<iframe id="SC-manual-payment-Modal-frame"  src="' + sPage + '"></iframe>';
										$("#SC-SRO-manual-cc-voice-payment").html(wmainMarkup);
										$("#SC-SRO-manual-cc-voice-payment").modal({
											backdrop: 'static'
										});
										$.ajax({
											type: 'GET',
											url: sPage,
											dataType: 'application/json',
											mode: 'cors',
											statusCode: {
												404: function (responseObject, textStatus, jqXHR) {
													alert("We have encountered an issue processing the payment. Please contact a Supervisor/Supervisor on Duty.");
													$("#SC-SRO-manual-cc-voice-payment").modal('hide');
													window.removeEventListener("message", cclistner, false);
													cardPM.ExecuteMethod("CCINVOKEDELETERCD", null, false);
													setTimeout(function () {
														cardPM.ExecuteMethod("InvokeMethod", "ExecuteQuery", null, false);
													}, 300);
												},
											}
										});
										//window.addEventListener('message', (event) => {
										var cclistner = function (event) {
											event.stopImmediatePropagation();
											console.log(event);
											var data = {}
											try {
												data = JSON.parse(event.data);
												console.log(data);
												if (data.isSubmitted) {
                                                    //Start:JSHRIKESH:2/9/2024:For Adyen Voice
                                                    if (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") == "Y") {

                                                        if (data["semafoneErrorCode"] == 0 && data["ppErrorCode"] == "") {
                                                            $("#SC-SRO-manual-cc-voice-payment").modal('hide');
                                                            cardPM.SetProperty("AdyenAccNum", data["ppReference"]);
                                                            cardPM.SetProperty("AdyenInvoiceRef#", data["ppReference"]);
                                                            cardPM.SetProperty("AdyenAuthCode", data["authCode"]);
                                                            cardPM.SetProperty("AdyenCardSummary", data["cardSummary"]);
                                                            cardPM.SetProperty("AdyenMerchantRef", data["merchantReference"]);
                                                            cardPM.SetProperty("AdyenTransAmount", data["authorisedAmountValue"]);
                                                            cardPM.SetProperty("AdyenPaymentStat", data["responseCode"]);
                                                            cardPM.SetProperty("AdyenTypeCode", data["cardScheme"]);
                                                            cardPM.SetProperty("SemaPhonepayCR", data["semafoneCR"]);
                                                            cardPM.SetProperty("SemaPayId", sPaymentRecordId);
                                                            cardPM.ExecuteMethod("UPDATEPAYMENTADYEN", null, false);
                                                            window.removeEventListener("message", cclistner, false);
                                                            SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                            controls = cardPM.Get("GetControls");
                                                            $("[name=" + controls["Authorize"].GetInputName() + "]").css('display', 'none');

                                                        } else if (data["semafoneErrorCode"] == 0 && data["ppErrorCode"] != "") {
                                                            $("#SC-SRO-manual-cc-voice-payment").modal('hide');
                                                            cardPM.SetProperty("AdyenAccNum", data["ppReference"]);
                                                            cardPM.SetProperty("AdyenppErrorMsg", data["ppErrorMessage"]);
                                                            cardPM.SetProperty("AdyenTypeCode", data["cardScheme"]);
                                                            cardPM.SetProperty("SemaPhonepayCR", data["semafoneCR"]);
                                                            cardPM.SetProperty("SemaPayId", sPaymentRecordId);
                                                            cardPM.ExecuteMethod("DECLINEPAYMENTADYEN", null, false);
                                                            window.removeEventListener("message", cclistner, false);
                                                            SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                            controls = cardPM.Get("GetControls");
                                                            $("[name=" + controls["Authorize"].GetInputName() + "]").css('display', 'none');
                                                            alert("Payment is declined, please try again.");


                                                        } else if (data["semafoneErrorCode"] != 0) {
                                                            $("#SC-SRO-manual-cc-voice-payment").modal('hide');
                                                            cardPM.SetProperty("AdyenAccNum", data["ppReference"]);
                                                            cardPM.SetProperty("SemaPayId", sPaymentRecordId);
                                                            cardPM.ExecuteMethod("REQFAILPAYMENTADYEN", null, false);
                                                            window.removeEventListener("message", cclistner, false);
                                                            SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                            controls = cardPM.Get("GetControls");
                                                            $("[name=" + controls["Authorize"].GetInputName() + "]").css('display', 'none');
                                                            alert("Payment request failed.");

                                                        }
                                                        //END:JSHRIKESH:2/9/2024:For Adyen Voice

                                                    } else {
													if (data["token"] != "" && data["semafoneErrorCode"] == 0) {
														$("#SC-SRO-manual-cc-voice-payment").modal('hide');
														cardPM.SetProperty("SemaPhoneAccNum", data["token"]);
														cardPM.SetProperty("SemaPhonepayType", data["cardType"]);
														cardPM.SetProperty("SemaPhonepayCard", data["lastFour"]);
														cardPM.SetProperty("SemaPhonepayCR", data["semafoneCR"]);
														cardPM.SetProperty("SemaPayId", sPaymentRecordId);
														cardPM.ExecuteMethod("UPDAESEMAPHONETOKEN", null, false);
														window.removeEventListener("message", cclistner, false);
														SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
														controls = cardPM.Get("GetControls");
														$("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', false).css("opacity", 1);
													} else {
														$("#SC-SRO-manual-cc-voice-payment").modal('hide');
														window.removeEventListener("message", cclistner, false);
														alert("We have encountered an issue processing the payment. Please contact a Supervisor/Supervisor on Duty.");
														SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
													}
												}
												// Check if the form was cancelled
												if (data.cancel) {
													//if(confirm("Are you Sure you want to delete the Selected Record")){
													cardPM.ExecuteMethod("CCINVOKEDELETERCD", null, false);
													$("#SC-SRO-manual-cc-voice-payment").modal('hide');
													window.removeEventListener("message", cclistner, false);
													setTimeout(function () {
														cardPM.ExecuteMethod("InvokeMethod", "ExecuteQuery", null, false);
													}, 500);

													//}

                                                    }
												}
											} catch (e) {
												console.log(e);
											}
											// Check if the form was submitted
											//});
										}
										window.addEventListener("message", cclistner);

									}
								}
							}
						} //Venkat 12/28/2020 end of Voice User logic for Secure Payment
					}

					PaymentDetailPR.prototype.EndLife = function () {
						SiebelAppFacade.PaymentDetailPR.superclass.EndLife.apply(this, arguments);
						/*if(getAccount != undefined){
							clearInterval(getAccount);
						}*/
						if ($("#SC-SRO-manual-cc-voice-payment").hasClass("in")) {

							$("#SC-SRO-manual-cc-voice-payment").modal('hide');
							$(".modal-backdrop").remove();
							if (CcCardPM.ExecuteMethod("CanInvokeMethod", "DeleteRecord"))
								CcCardPM.ExecuteMethod("CCINVOKEDELETERCD", null, false);

						}
						$(".sc-sro-creditcardsemaphone").remove();
					}

					return PaymentDetailPR;
				}
				());
			return "SiebelAppFacade.PaymentDetailPR";
		});
}