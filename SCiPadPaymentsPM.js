window.parseResponse = function (data) {
	console.log("parseResponse code");
	console.log(data);
	console.log("GetGCBalanceFlag = " + window.PM.Get("GetGCBalanceFlag"));

	if (data.i4go_response !== "SUCCESS") { //Error in sending the data
		console.log("parseResponse and received error code from Shift4 " + data.i4go_responsecode);
		alert("Received Error from Shift4: " + data.i4go_responsetext);
		return;
	} else if (data.i4go_uniqueid) {
		if (window.PM.Get("GetGCBalanceFlag") == "Y") {
			window.PM.ExecuteMethod("GET_GC_BALANCE", data);
		} else {
			window.PM.ExecuteMethod("AUTHORIZE_PAYMENT_LINE", data); //complete tokenization & authorization
		}
	}
}

function getAccessBlock() {
	var svc = SiebelApp.S_App.GetService("Workflow Process Manager");
	var psInput = SiebelApp.S_App.NewPropertySet();
	var psOutput = SiebelApp.S_App.NewPropertySet();
	var i4go_server, i4go_accessblock, i4go_response, sLogin;
	sLogin = theApplication().GetProfileAttr("Login Name")
	//sLogin = "USA8032".substring(0,4).toUpperCase();
	if (sLogin == 'USA8') {
		theApplication().SetProfileAttr("CCLogin", "USA800");
	} else {
		theApplication().SetProfileAttr("CCLogin", "SC");
	}
	psInput.SetProperty("ProcessName", "SC Shift4 Get Access Code WF");
	psOutput = svc.InvokeMethod("RunProcess", psInput);

	i4go_accessblock = psOutput.GetChild(0).GetProperty("SC accessblock");
	i4go_server = psOutput.GetChild(0).GetProperty("SC server");
	i4go_response = psOutput.GetChild(0).GetProperty("SC response");
	if (i4go_response == "SUCCESS") {
		theApplication().SetProfileAttr("i4go_server", i4go_server);
		theApplication().SetProfileAttr("i4go_code", i4go_accessblock);
		window.i4goServer = i4go_server;
		window.i4goCode = i4go_accessblock;
	} else {
		SiebelJS.Log("Failed to get Shift4 i4go_accessblock: Check with Siebel Administrator");
	}
}

if (typeof (SiebelAppFacade.SCiPadPaymentsPM) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCiPadPaymentsPM");
	define("siebel/custom/SelectComfort/SCiPadPaymentsPM", ["siebel/listpmodel"],
		function () {
			SiebelAppFacade.SCiPadPaymentsPM = (function () {

				function SCiPadPaymentsPM(pm) {
					SiebelAppFacade.SCiPadPaymentsPM.superclass.constructor.apply(this, arguments);
				}

				SiebelJS.Extend(SCiPadPaymentsPM, SiebelAppFacade.ListPresentationModel);

				SCiPadPaymentsPM.prototype.Init = function () {
					// Init is called each time the object is initialised.
					// Add code here that should happen before default processing
					SiebelAppFacade.SCiPadPaymentsPM.superclass.Init.apply(this, arguments);
					SiebelJS.Log(this.Get("GetName") + ": SCiPadPaymentsPM:      Init method reached.");
					// Add code here that should happen after default processing
					window.PM = this;
					var pm = this;
					var appletName = pm.Get("GetName");
					var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
					//LikhithaK:Start:SFSTRY0003472:Terminal UI Changes
					var sIpadFeatureFlag = SiebelApp.S_App.GetProfileAttr('IpadFeatureFlag');
					if (sIpadFeatureFlag == "Y") {
						this.AddProperty("SCStoreUser", SiebelApp.S_App.GetProfileAttr("SC Store User"));
						this.AddProperty("FeatureFlag", SiebelApp.S_App.GetProfileAttr('IpadFeatureFlag')); //Added for MKE
						this.AddProperty("sMKESwitchFlag", SiebelApp.S_App.GetProfileAttr('MKESwitchFlag'));
					} else {
						//LikhithaK:End:SFSTRY0003472:Terminal UI Changes
						//this.AddProperty( "SCStoreUser", SiebelApp.S_App.GetProfileAttr("SC Store User"));
						this.AddProperty("SCStoreUser", "N");
					} //LikhithaK:SFSTRY0003472:Added
					this.AddProperty("P2PEFlag", SiebelApp.S_App.GetProfileAttr("P2PEFlag"));
					this.AddProperty("CreditCardType", "");
					this.AddProperty("CalcGiftCardNumber", "");
					this.AddProperty("PaymentAmount", "");
					this.AddProperty("GetGCBalanceFlag", "N");
					this.AddProperty("CalcCreditCardNumber", "");
					this.AddProperty("CalcCVVNumber", "");
					this.AddProperty("CalcExpMonth", "");
					this.AddProperty("CalcExpYear", "");
					this.AddProperty("PaymentsRowID", "");
					this.AddProperty("AccountNumber", "");
					this.AddProperty("PaymentStatus", "");
					this.AddProperty("AuthorizationCode", "");
					this.AddProperty("SCOrderTotal", "");
					this.AddProperty("PaymentMethod", "");
					this.AddProperty("GiftCardBalance", "");
					this.AddProperty("MakeAuthCodeReadOnly", "");
					this.AddProperty("GlobalToken", "");
					this.AddProperty("ContactId", "");
					this.AddProperty("CustomerName", "");
					this.AddProperty("CustomerReference", "");
					this.AddProperty("IYCBalance", "");
					this.AddProperty("StreetAddress", "");
					this.AddProperty("ZipCode", "");
					this.AddProperty("TerminalID", "");
					this.AddProperty("AccessToken", "");
					this.AddProperty("PreStatus", "");
					this.AddProperty("TrackInformation", "");
					this.AddProperty("TokenSerialNumber", "");
					this.AddProperty("TrackInformation", "");
					this.AddProperty("ReceiptText");
					this.AddProperty("FunctionCode");
					this.AddProperty("isPhoneOrder", ""); //LikhithaK:SFSTRY0003472:Terminal UI Changes
					this.AddMethod("ShowSelection", this.SelectionChange, {
						sequence: false,
						scope: this
					});
					this.AddMethod("FieldChange", this.OnFieldChange, {
						sequence: false,
						scope: this
					});

					this.AttachEventHandler("CS_AUTHORIZE_BUTTON_CLICK",
						function () {
							// perform PM processing of button
							console.log("Inside AuthorizeButtonClickinPM");
							if (!this.Get("AccountNumber")) {
								getAccessBlock();
								//window.i4goServer = SiebelApp.S_App.GetProfileAttr("i4go_server");
								//window.i4goCode = SiebelApp.S_App.GetProfileAttr("i4go_code");   					
								console.log("ACCESS BLOCK and SERVER: ");
								console.log(window.i4goCode, window.i4goServer);
								this.ExecuteMethod("GET_TOKEN");
							} else if (this.Get("PaymentStatus") != "Need Verbal Authorization") {
								console.log("CC Authorize w/ previous token." + this.Get("AccountNumber"));
								this.ExecuteMethod("AUTHORIZE_PAYMENT_LINE", {
									i4go_uniqueid: this.Get("AccountNumber")
								});
							}
						}
					);

					this.AddMethod("GET_TOKEN",
						function () {

							var CreditCardType = this.Get("CreditCardType");
							if (CreditCardType === 'AE') {
								CreditCardType = 'AX';
							} else if (CreditCardType === 'VI') {
								CreditCardType = 'VS';
							} else if (CreditCardType === 'MC') {
								CreditCardType = 'MC';
							} else if (CreditCardType === 'DS') {
								CreditCardType = 'NS';
							}
							var myContent = {};
							myContent['fuseaction'] = 'account.jsonpPostCardEntry';
							myContent['i4Go_AccessBlock'] = window.i4goCode; //The value comes from the first call to https://access.shift4test.com
							myContent['i4Go_CardType'] = CreditCardType;
							myContent['i4Go_CardNumber'] = this.Get("CalcCreditCardNumber");
							myContent['i4Go_ExpirationMonth'] = this.Get("CalcExpMonth");
							myContent['i4Go_ExpirationYear'] = this.Get("CalcExpYear");
							myContent['i4Go_CVV2Code'] = this.Get("CalcCVVNumber");

							console.log("Calling SHIFT4 with myContent = ");
							console.log(myContent);

							$.ajax({
								url: window.i4goServer, //The value is from the first call to https://access.shift4test.com. Normally it is https://i4go01.shift4test.com or https://i4go02.shift4test.com
								type: 'GET',
								dataType: 'script',
								timeout: 25000,
								data: myContent,

								error: function (jqXHR, textStatus, errorThrown) {
									alert("Error in tokenization: " + errorThrown);
								},
							});

						}, {
							scope: this
						}
					);
					//code for check Authrorization
					this.AttachEventHandler("SC_CHECK_AUTHORIZE",
						function () {
							// perform PM processing of button
							var psInput = SiebelApp.S_App.NewPropertySet();
							var psOutput = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("Workflow Process Manager");
							if (service) {
								if (pm.Get("P2PEFlag") == "Y") {
									psInput.SetProperty("ProcessName", "SC P2PE Payment Validation Check WorkFlow");
								} else {
									psInput.SetProperty("ProcessName", "SC Payment Retail Validation Check WorkFlow");
								}
								psInput.SetProperty("BankAccountNumber", pm.Get("CheckAccountNumber"));
								psInput.SetProperty("AccessToken", pm.Get("AccessToken"));
								psInput.SetProperty("CheckDOB", pm.Get("CheckDOB"));
								psInput.SetProperty("ManualCheckNumber", pm.Get("ManualCheckNumber"));
								psInput.SetProperty("BankRoutingNum", pm.Get("TransitRoutingNumber"));
								psInput.SetProperty("DriversLicenseState", pm.Get("IDTypeCode"));
								psInput.SetProperty("DriversLicenseNumber", pm.Get("IDNumber"));
								psInput.SetProperty("Clerk", pm.Get("Clerk"));
								psInput.SetProperty("CustomerReference", pm.Get("CustomerReference"));
								psInput.SetProperty("CheckAmount", pm.Get("CheckAmount"));
								psInput.SetProperty("Object Id", pm.Get("ObjectId"));
								psOutput = service.InvokeMethod("RunProcess", psInput);
								//var gToken = psOutput.GetChild(0).GetProperty("UniqueID");
							}
						}
					);
					this.AddMethod("AUTHORIZE_PAYMENT_LINE",
						function (data) {
							//define a new propertyset and set appropriate input arguments

							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("SC Shift4 Payment Auth Service");
							if (service) {
								inPS.SetProperty("i4go_Token", data.i4go_uniqueid);
								inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
								var ai = {};
								ai.async = true;
								ai.selfbusy = true;
								ai.scope = this;
								ai.mask = true;
								ai.opdecode = true;
								ai.errcb = function () {
									//Code occurs here for the method that Siebel Open UI runs if the AJAX call fails
									SiebelJS.Log("In Refresh BC Error");
								};
								ai.cb = function () {

								}
								service.InvokeMethod("AuthorizePayment", inPS, ai);
								//outPS = service.InvokeMethod("AuthorizePayment", inPS);
							}
							//SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					this.AttachEventHandler("CS_VERBAL_AUTH_PAYMENT_LINE",
						function (data) {
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("SC Shift4 Payment Auth Service");
							if (service) {
								inPS.SetProperty("i4go_Token", data.i4go_uniqueid);
								inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
								var ai = {};
								ai.async = true;
								ai.selfbusy = true;
								ai.scope = this;
								ai.mask = true;
								ai.opdecode = true;
								ai.errcb = function () {
									//Code occurs here for the method that Siebel Open UI runs if the AJAX call fails
									SiebelJS.Log("In Refresh BC Error");
								};
								ai.cb = function () {

								}
								service.InvokeMethod("AuthorizePayment", inPS, ai);
								//service.InvokeMethod("AuthorizePayment", inPS, outPS);		            
							}
							//SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					this.AddMethod("GET_GC_TOKEN",
						function () {

							var GiftCardType = this.Get("GiftCardType");
							if (GiftCardType === 'GC') {
								GiftCardType = 'YC';
							}

							var myContent = {};
							myContent['fuseaction'] = 'account.jsonpPostCardEntry';
							myContent['i4Go_AccessBlock'] = window.i4goCode; //The value comes from the first call to https://access.shift4test.com
							myContent['i4Go_CardType'] = GiftCardType;
							myContent['i4Go_CardNumber'] = this.Get("CalcGiftCardNumber");
							myContent['i4Go_CVV2Code'] = this.Get("CalcPIN");
							myContent['i4Go_ExpirationMonth'] = '12';
							myContent['i4Go_ExpirationYear'] = '25';

							$.ajax({
								url: window.i4goServer, //The value is from the first call to https://access.shift4test.com. Normally it is https://i4go01.shift4test.com or https://i4go02.shift4test.com
								type: 'GET',
								dataType: 'script',
								timeout: 25000,
								data: myContent,

								error: function (jqXHR, textStatus, errorThrown) {
									alert("Error in tokenization: " + errorThrown);
								},
							});

						}, {
							scope: this
						}
					);

					this.AttachEventHandler("GETGCBALANCE_BUTTON_CLICK",
						function () {
							// perform PM processing of button
							console.log("GetGCBalanceButtonClickinPM");
							//window.i4goServer=SiebelApp.S_App.GetProfileAttr("i4go_server");
							//window.i4goCode=SiebelApp.S_App.GetProfileAttr("i4go_code");
							getAccessBlock();
							this.ExecuteMethod("GET_GC_TOKEN");
						}
					);

					this.AddMethod("GET_GC_BALANCE",
						function (data) {
							//define a new propertyset and set appropriate input arguments
							var inPS = SiebelApp.S_App.NewPropertySet();
							var outPS = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("SC Shift4 Payment Auth Service");
							if (service) {
								inPS.SetProperty("i4go_Token", data.i4go_uniqueid);
								inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
								var ai = {};
								ai.async = false;
								ai.selfbusy = true;
								ai.scope = this;
								ai.mask = true;
								ai.opdecode = true;
								ai.errcb = function () {
									//Code occurs here for the method that Siebel Open UI runs if the AJAX call fails
									SiebelJS.Log("In Refresh BC Error");
								};
								ai.cb = function () {
									var outPropSet = arguments[2];
									if (outPropSet != null) {
										var outPS = outPropSet.GetChildByType('ResultSet');
										pm.SetProperty("GiftCardBalance", outPS.GetProperty("Balance_Amount"));
										if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
											$("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
											$("#GCBalance").text("$" + Number(pm.Get("GiftCardBalance")).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
											$("#SC-giftcard-details").show();
											if ($("#giftPaymentDue").val() != "")
												$("#SC-giftcard").removeClass("SC-disabled");
										}
									}
								}
								service.InvokeMethod("GetGiftCardBalance", inPS, ai);
								//outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
								//this.SetProperty("GiftCardBalance",outPS.GetChild(0).GetProperty("Balance_Amount"));
							}
							//SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					// Store User Gift Card 
					this.AttachEventHandler("SU_GETGC_TOKEN",
						function () {
							// perform PM processing of button
							console.log("GetGCBalanceButtonClickinPM");
							PM.ExecuteMethod("SU_GET_GlobalToken");
							if (pm.Get("GlobalToken") == "" || pm.Get("GlobalToken") == undefined || pm.Get("GlobalToken") == null) {
								alert("GlobalToken could not received. Please Retry");
							}
						}
					);

					this.AttachEventHandler("SU_GET_GC_BALANCE",
						function () {
							//define a new propertyset and set appropriate input arguments
							SiebelApp.S_App.uiStatus.Busy({
								target: SiebelApp.S_App.GetTargetViewContainer(),
								mask: !0
							});
							if (pm.Get("P2PEFlag") != "Y") {
								if (this.Get("GlobalToken") != "") {
									var inPS = SiebelApp.S_App.NewPropertySet();
									var outPS = SiebelApp.S_App.NewPropertySet();
									var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
									if (service) {
										inPS.SetProperty("i4go_Token", this.Get("GlobalToken"));
										inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
										inPS.SetProperty("Access_Token", this.Get("AccessToken"));
										outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
										this.SetProperty("GiftCardBalance", outPS.GetChild(0).GetProperty("Balance_Amount"));
										if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
											$("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
											$("#GCBalance").text("$" + pm.Get("GiftCardBalance"));
											$("#SC-giftcard-details").show();
											if ($("#giftPaymentDue").val() != "")
												$("#SC-giftcard").removeClass("SC-disabled");
										}
									}
								} else {
									alert("Failed to get Global Token. Please enter details again");
								}
							} else {
								var inPS = SiebelApp.S_App.NewPropertySet();
								var outPS = SiebelApp.S_App.NewPropertySet();
								var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
								if (service) {
									inPS.SetProperty("i4go_Token", this.Get("GlobalToken"));
									inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
									inPS.SetProperty("Access_Token", this.Get("AccessToken"));
									outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
									this.SetProperty("GiftCardBalance", outPS.GetChild(0).GetProperty("Balance_Amount"));
									if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
										$("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
										$("#GCBalance").text("$" + pm.Get("GiftCardBalance"));
										$("#SC-giftcard-details").show();
										if ($("#giftPaymentDue").val() != "")
											$("#SC-giftcard").removeClass("SC-disabled");
									}
								}
								if (pm.Get("P2PEFlag") == "Y" && pm.Get("PaymentStatus") != "Need Verbal Authorization") {
									$("#SC-P2PE-GCCheckBal").modal('hide');
									$("#SC-P2PE-GCCheckBal").css({
										"display": "",
										"justify-content": "",
										"align-items": ""
									});
									$("#custommaskoverlay").hide();
								}
							}
							SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					this.AttachEventHandler("SU_GET_GC_ACT_BALANCE",
						function () {
							//define a new propertyset and set appropriate input arguments
							if (this.Get("GlobalToken") != "") {
								var inPS = SiebelApp.S_App.NewPropertySet();
								var outPS = SiebelApp.S_App.NewPropertySet();
								var service = SiebelApp.S_App.GetService("Workflow Process Manager");
								if (service) {
									inPS.SetProperty("AccountNumber", this.Get("GlobalToken"));
									inPS.SetProperty("RowId", this.Get("PaymentsRowID"));
									inPS.SetProperty("AccessToken", this.Get("AccessToken"));
									inPS.SetProperty("ContactId", this.Get("CustomerReference"));
									inPS.SetProperty("ProcessName", "SC SU Gift Card Activate Check Balance WF");
									outPS = service.InvokeMethod("RunProcess", inPS);
									var errorIndicator = outPS.GetChild(0).GetProperty("ErrorIndicator");
									var balanceAmount = outPS.GetChild(0).GetProperty("IYCAvailableBalance");
									var errorMsg = outPS.GetChild(0).GetProperty("Error Message");
									if (errorIndicator == "Y") {
										$("#sc-activate-card").removeClass("SC-disabled");
									} else {
										if (balanceAmount >= 0.00) {
											alert("Gift Card has been already activated. Please use inactivated Gift Card to activate");
										}
									}
								}
							} else {
								alert("Failed to get Global Token. Please enter details again");
							}
							//SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);


					this.AttachEventHandler("SU_GC_AUTHORIZE_BUTTON_CLICK",
						function () {
							PM.ExecuteMethod("SU_AUTHORIZE_PAYMENT_LINE");
						}, //end of function AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					//Store User Credit Card 
					this.AttachEventHandler("SU_AUTHORIZE_BUTTON_CLICK",
						function () {
							// perform PM processing of button
							console.log("Inside Store user AuthorizeButtonClickinPM");
							if (!this.Get("AccountNumber")) {
								PM.ExecuteMethod("SU_GET_GlobalToken");
							} else if (this.Get("PaymentStatus") != "Need Verbal Authorization") {
								console.log("CC Authorize w/ previous token." + this.Get("AccountNumber"));
								this.ExecuteMethod("AUTHORIZE_PAYMENT_LINE", {
									i4go_uniqueid: this.Get("AccountNumber")
								});
							}
						}
					);

					this.AttachEventHandler("SU_AUTHORIZE_PAYMENT_LINE",
						function (data) {
							var globalToken = pm.Get("GlobalToken");
							var functionCode = pm.Get("FunctionCode");
							$("#custommaskoverlay").show();
							setTimeout(function () {
								if (pm.Get("P2PEFlag") == "Y") {
									var inPS = SiebelApp.S_App.NewPropertySet();
									var outPS = SiebelApp.S_App.NewPropertySet();
									var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
									if (service) {
										inPS.SetProperty("i4go_Token", pm.Get("AccountNumber"));
										inPS.SetProperty("Access_Token", pm.Get("AccessToken"));
										inPS.SetProperty("Function_Code", pm.Get("FunctionCode"));
										inPS.SetProperty("Row Id", pm.Get("PaymentsRowID"));
										outPS = service.InvokeMethod("AuthorizePayment", inPS);
										pm.SetProperty("AccountNumber", "");
									}
									if (pm.Get("P2PEFlag") == "Y" && pm.Get("PaymentStatus") != "Need Verbal Authorization") {
										//LikhithaK:Start:SFSTRY0003472:Terminal UI Changes
										var isPhoneOrder = localStorage.getItem("isPhoneOrder"); 
										if (pm.Get("sMKESwitchFlag") == "Y" && pm.Get("FeatureFlag") == "Y" && isPhoneOrder == "Y") {
											$("#SC-P2PE-Auth-MKE").modal('hide');
											$("#SC-P2PE-Auth-MKE").css({
												"display": "",
												"justify-content": "",
												"align-items": ""
											});
											$("#custommaskoverlay").hide();
										} else {
											//LikhithaK:End:SFSTRY0003472:Terminal UI Changes
											$("#SC-P2PE-Auth").modal('hide');
											$("#SC-P2PE-Auth").css({
												"display": "",
												"justify-content": "",
												"align-items": ""
											});
											$("#custommaskoverlay").hide();
										} //LikhithaK:SFSTRY0003472:Terminal UI Changes
									}
								} else {
									//define a new propertyset and set appropriate input arguments
									if (((globalToken != "" && globalToken != undefined)) || (functionCode != "" && functionCode != undefined)) {
										var inPS = SiebelApp.S_App.NewPropertySet();
										var outPS = SiebelApp.S_App.NewPropertySet();
										var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
										if (service) {
											if (pm.Get("GlobalToken") != "") {
												inPS.SetProperty("i4go_Token", pm.Get("GlobalToken"));
											} else if (pm.Get("AccountNumber") != "") {
												inPS.SetProperty("i4go_Token", pm.Get("AccountNumber"));
											}
											inPS.SetProperty("Access_Token", pm.Get("AccessToken"));
											//Vamsi : #664 Verbal Auth
											inPS.SetProperty("Function_Code", pm.Get("FunctionCode"));
											inPS.SetProperty("Row Id", pm.Get("PaymentsRowID"));
											outPS = service.InvokeMethod("AuthorizePayment", inPS);
											pm.SetProperty("AccountNumber", "");
										}
									} else {
										alert("Failed to get Global Token. Please enter details again");
									}
								}
								SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
							}, 1000);
						}, //end of function SU_AUTHORIZE_PAYMENT_LINE
						{
							scope: this
						}
					);

					this.AddMethod("SU_GET_GlobalToken",
						function (data) {
							var psInput = SiebelApp.S_App.NewPropertySet();
							var psOutput = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("Workflow Process Manager");
							if (service) {
								SiebelApp.S_App.uiStatus.Busy({
									target: SiebelApp.S_App.GetTargetViewContainer(),
									mask: !0
								});
								psInput.SetProperty("ProcessName", "SC Payment Retail GetToken");
								psInput.SetProperty("CustomerName", pm.Get("CustomerName"));
								psInput.SetProperty("StreetAddress", pm.Get("StreetAddress"));
								psInput.SetProperty("ZipCode", pm.Get("ZipCode"));
								psInput.SetProperty("AccessToken", pm.Get("AccessToken"));
								psInput.SetProperty("TokenSerialNumber", pm.Get("TokenSerialNumber"));
								psInput.SetProperty("TrackInformation", pm.Get("TrackInformation"));
								psInput.SetProperty("TerminalID", pm.Get("TerminalID"));
								psOutput = service.InvokeMethod("RunProcess", psInput);
								var gToken = psOutput.GetChild(0).GetProperty("UniqueID");
								pm.SetProperty("GlobalToken", gToken);
								SiebelApp.S_App.uiStatus.Free();
								$("#SC-SO-GetAuth-Token").modal('hide');
								$("#SC-SO-GetAuth-Token").css({
									"display": "",
									"justify-content": "",
									"align-items": ""
								});
							}
						}, //end of function SU_GET_GlobalToken
						{
							scope: this
						}
					);

					this.AttachEventHandler("SU_GIFTCARD_ACTIVATE_CLICK",
						function () {
							var psInput = SiebelApp.S_App.NewPropertySet();
							var psOutput = SiebelApp.S_App.NewPropertySet();
							var service = SiebelApp.S_App.GetService("Workflow Process Manager");
							if (service) {
								//Vamsi: 01-OCT-18 : Modified below code to support for P2PE changes
								if (pm.Get("P2PEFlag") != "Y") {
									psInput.SetProperty("ProcessName", "SC Payment Retail ActivateGiftCard");
									psInput.SetProperty("TokenSerialNumber", pm.Get("TokenSerialNumber"));
									psInput.SetProperty("TrackInformation", pm.Get("TrackInformation"));
									psInput.SetProperty("TerminalID", pm.Get("TerminalID"));
								} else {
									psInput.SetProperty("ProcessName", "SC P2PE Payment Retail ActivateGiftCard");
								}
								psInput.SetProperty("Object Id", pm.Get("ObjectId"));
								psInput.SetProperty("RequestorReference", pm.Get("ObjectId"));
								psInput.SetProperty("CustomerReference", pm.Get("CustomerName"));
								psInput.SetProperty("IYCBalance", pm.Get("IYCBalance"));
								psInput.SetProperty("AccessToken", pm.Get("AccessToken"));
								psOutput = service.InvokeMethod("RunProcess", psInput);
								var gToken = psOutput.GetChild(0).GetProperty("UniqueID");
								var receiptText = psOutput.GetChild(0).GetProperty("ReceiptText");
								var fusionError = psOutput.GetChild(0).GetProperty("Error Message");
								var Errors = psOutput.GetChild(0).type;
								if (Errors == 'Errors') {
									pm.SetProperty("CardActivated", "N");
									alert("Activation Failed. Please Retry");
								} else {
									pm.SetProperty("GlobalToken", gToken);
									pm.SetProperty("ReceiptText", receiptText);
									if (fusionError != "") {
										pm.SetProperty("CardActivated", "N");
									} else if (pm.Get("ReceiptText") !== null && pm.Get("ReceiptText") != undefined && pm.Get("ReceiptText") != "") {
										pm.SetProperty("CardActivated", "Y");
									} else {
										pm.SetProperty("CardActivated", "N");
									}
								}
								if (pm.Get("P2PEFlag") == "Y") {
									$("#SC-P2PE-GCActivate").modal('hide');
									$("#SC-P2PE-GCActivate").css({
										"display": "",
										"justify-content": "",
										"align-items": ""
									});
									$("#custommaskoverlay").hide();
								}
							}

						}, //end of function SU_GIFTCARD_ACTIVATE_CLICK
						{
							scope: this
						}
					);

					this.AttachEventHandler("CC_NEED_VERBAL_AUTH",
						function (data) {
							var svc1 = SiebelApp.S_App.GetService("Workflow Process Manager");
							var psInput1 = SiebelApp.S_App.NewPropertySet();
							var psOutput1 = SiebelApp.S_App.NewPropertySet();
							psInput1.SetProperty("ProcessName", "SC Payment Need Verbal Auth WF");
							psInput1.SetProperty("Object Id", this.Get("PaymentsRowID"));
							psOutput1 = svc1.InvokeMethod("RunProcess", psInput1);
						}, //end of function CC_NEED_VERBAL_AUTH
						{
							scope: this
						}
					);
				}

				SCiPadPaymentsPM.prototype.Setup = function (propSet) {
					// Setup is called each time the object is initialised.
					// Add code here that should happen before default processing
					SiebelJS.Log(this.Get("GetName") + ": SCiPadPaymentsPM:      Setup method reached.");
					SiebelAppFacade.SCiPadPaymentsPM.superclass.Setup.apply(this, arguments);
					// Add code here that should happen after default processing
				}

				return SCiPadPaymentsPM;
			}());
			return "SiebelAppFacade.SCiPadPaymentsPM";
		})
}
