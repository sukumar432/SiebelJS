window.parseResponse = function (data) {
	console.log("parseResponse code");
	console.log(data);
	console.log("GetGCBalanceFlag = " + window.PM.Get("GetGCBalanceFlag"));

	if (data.i4go_response !== "SUCCESS") { //Error in sending the data
		console.log("parseResponse and received error code from Shift4 " + data.i4go_responsecode);
		alert("Received Error from Shift4: " + data.i4go_responsetext);
		var controls = window.PM.Get("GetControls");
		$("#" + controls["Authorize"].GetInputName() + "_Ctrl").css('visibility', 'visible');
		return;
	} else if (data.i4go_uniqueid) {
		if (window.PM.Get("GetGCBalanceFlag") == "Y") {
			window.PM.ExecuteMethod("GET_GC_BALANCE", data);
		} else {
			window.PM.ExecuteMethod("AUTHORIZE_PAYMENT_LINE", data); //complete tokenization & authorization
		}
	}

}

if (typeof (SiebelAppFacade.PaymentDetailPM) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.PaymentDetailPM");
	define("siebel/custom/SC_paymentdetailpm", ["siebel/pmodel"], function () {
		SiebelAppFacade.PaymentDetailPM = (function () {
			var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");

			function PaymentDetailPM(proxy) {
				SiebelAppFacade.PaymentDetailPM.superclass.constructor.call(this, proxy);
			}
			SiebelJS.Extend(PaymentDetailPM, SiebelAppFacade.PresentationModel);

			PaymentDetailPM.prototype.SelectionChange = function () {
				var controls = this.Get("GetControls");
				var control = controls["SC Payment Status"];
				var value = this.ExecuteMethod("GetFieldValue", control);
				this.SetProperty("MakeAuthCodeReadOnly", ((value === "Need Verbal Authorization" || value === "Authorized") ? false : true));
				console.log("The value of MakeAuthCodeReadOnly is " + this.Get("MakeAuthCodeReadOnly"));
			}

			PaymentDetailPM.prototype.OnFieldChange = function (control, value) {
				if (control.GetName() === "SC Payment Status") {
					this.SetProperty("MakeAuthCodeReadOnly", ((value === "Need Verbal Authorization" || value === "Authorized") ? false : true));
					console.log("The value of MakeAuthCodeReadOnly is " + this.Get("MakeAuthCodeReadOnly"));
				}
			}

			PaymentDetailPM.prototype.Init = function () {
				SiebelAppFacade.PaymentDetailPM.superclass.Init.apply(this, arguments);
				window.PM = this; //Save reference to PM for later use (in window.parseResponse) after AJAX call.
				var scChatuser = SiebelApp.S_App.GetProfileAttr("SC Chat User");
				var scVoiceUser = theApplication().GetProfileAttr("SC Voice User");
				this.AddProperty("SCStoreUser", SiebelApp.S_App.GetProfileAttr("SC Store User"));
				this.AddProperty("CreditCardType", "");
				this.AddProperty("PaymentAmount", "");
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
				this.AddProperty("MakeAuthCodeReadOnly", "");
				//Start..Venkat R 11/19/2020 for Secure Payments
				this.AddProperty("CaptureStatus", "");
				this.AddProperty("PaymentLink", "");
				//End..Venkat R 11/19/2020 for Secure Payments
				this.AddMethod("ShowSelection", this.SelectionChange, {
					sequence: false,
					scope: this
				});
				this.AddMethod("FieldChange", this.OnFieldChange, {
					sequence: false,
					scope: this
				});
				//Start: spatiban:21/1/20/ for Secure Payments
				this.AddMethod("InvokeMethod", PreInvokeMethod, {
					sequence: true,
					scope: this
				});

				this.AddProperty("SemaPhoneAccNum", "");
				this.AddProperty("SemaPhonepayType", "");
				this.AddProperty("SemaPayId", "");
				this.AddProperty("SemaPhonepayCard", "");
				this.AddProperty("SemaPhonepayCR", "");
				this.AddProperty("SCVoicerUser", scVoiceUser);
				this.AddProperty("SCChatUser", scChatuser);
                //JSHRIKESH added below for Adyen Voice
                this.AddProperty("AdyenAccNum", "");
                this.AddProperty("AdyenInvoiceRef", "");
                this.AddProperty("AdyenAuthCode", "");
                this.AddProperty("AdyenCardSummary", "");
                this.AddProperty("AdyenMerchantRef", "");
                this.AddProperty("AdyenTransAmount", "");
                this.AddProperty("AdyenPaymentStat", "");
                this.AddProperty("AdyenTypeCode", "");
                this.AddProperty("AdyenppErrorMsg", "");
                // End Adyen voice 
				if (scChatuser == "Y") {
					var inPS = SiebelApp.S_App.NewPropertySet();
					var outPS = SiebelApp.S_App.NewPropertySet();
					var Bservice = "";
					Bservice = SiebelApp.S_App.GetService("Communications Client"); //get service
					outPS = Bservice.InvokeMethod("GetSelectedWorkItemInfo", inPS); //invoke the method
					var sCTIActivityId = outPS.GetChild(0).GetProperty("WorkObjectID");
					if (sCTIActivityId != "" && sCTIActivityId != "" && sCTIActivityId != undefined && sCTIActivityId != "undefined") {
						this.AddProperty("SCChatUser", "N");
						this.AddProperty("SCVoicerUser", "Y");
					}
				}
				//End: spatiban:21/1/20/ for Secure Payments
				this.AttachEventHandler("AUTHORIZE_BUTTON_CLICK",
					function () {
						// perform PM processing of button
						console.log("Inside AuthorizeButtonClickinPM");
						if (!this.Get("AccountNumber")) {
							window.i4goServer = SiebelApp.S_App.GetProfileAttr("i4go_server");
							window.i4goCode = SiebelApp.S_App.GetProfileAttr("i4go_code");
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

				this.AddMethod("AUTHORIZE_PAYMENT_LINE",
					function (data) {
						//define a new propertyset and set appropriate input arguments

						var inPS = SiebelApp.S_App.NewPropertySet();
						var outPS = SiebelApp.S_App.NewPropertySet();
						var service = SiebelApp.S_App.GetService("SC Shift4 Payment Auth Service");
						if (service) {
							inPS.SetProperty("i4go_Token", data.i4go_uniqueid);
							inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
							service.InvokeMethod("AuthorizePayment", inPS, outPS);
						}
						//SiebelApp.S_App.uiStatus.Free(); //to remove the wait icon
					}, //end of function AUTHORIZE_PAYMENT_LINE
					{
						scope: this
					}
				);
				//Start: spatiban:21/1/20/ for Secure Payments
				this.AddMethod("CCINVOKEDELETERCD",
					function (data) {

						var SemDelBservice = '',
							semDelinPS = '',
							semDeloutPS = '';
						semDelinPS = SiebelApp.S_App.NewPropertySet();
						semDeloutPS = SiebelApp.S_App.NewPropertySet();
						semDelinPS.SetProperty("BO", "Order Entry");
						semDelinPS.SetProperty("BC", "Payments");
						var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
						semDelinPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
						SemDelBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
						if (SemDelBservice)
							semDeloutPS = SemDelBservice.InvokeMethod("DeleteRecord", semDelinPS);


					}, //end of function CCINVOKEDELETERCD
					{
						scope: this
					}
				);
				this.AddMethod("UPDAESEMAPHONETOKEN",
					function (data) {
						var CreditCardType = this.Get("SemaPhonepayType");
						if (CreditCardType === 'AX') {
							CreditCardType = 'AE';
						} else if (CreditCardType === 'VS') {
							CreditCardType = 'VI';
						} else if (CreditCardType === 'MC') {
							CreditCardType = 'MC';
						} else if (CreditCardType === 'NS') {
							CreditCardType = 'DS';
						}
						var CRNumber = "*#" + this.Get("SemaPhonepayCR");
						var SemBservice = '',
							seminPS = '',
							semoutPS = '';
						seminPS = SiebelApp.S_App.NewPropertySet();
						semoutPS = SiebelApp.S_App.NewPropertySet();
						seminPS.SetProperty("BO", "Order Entry");
						seminPS.SetProperty("BC", "Payments");
						var Farray = ["Account Number", "SC Payment Status", "SC Payment Type Code", "SC Payment Link"];
						//var Farray = ["Account Number"];
						seminPS.SetProperty("FieldsArray", Farray);
						var gvalue = [this.Get("SemaPhoneAccNum"), "In Progress", CreditCardType, CRNumber];
						seminPS.SetProperty("ValuesArray", gvalue);
						var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
						seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
						SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
						if (SemBservice)
							semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

					}, //end of function UPDAESEMAPHONETOKEN
					{
						scope: this
					}
				);
                //Start:JSHRIKESH:2/9/2024:For Adyen Voice
                this.AddMethod("UPDATEPAYMENTADYEN",
                    function (data) {
                        var oDate = new Date();
                        var dd = oDate.getDate();
                        var mm = oDate.getMonth() + 1;
                        var yy = oDate.getFullYear();
                        var hh = oDate.getHours();
                        var min = oDate.getMinutes();
                        var secs = oDate.getSeconds()
                        var currentDate = mm + '/' + dd + '/' + yy + ' ' + hh + ':' + min + ':' + secs;
                        var CreditCardType = this.Get("AdyenTypeCode");
                        if (CreditCardType === 'AMEX') {
                            CreditCardType = 'AE';
                        } else if (CreditCardType === 'VISA') {
                            CreditCardType = 'VI';
                        } else if (CreditCardType === 'MasterCard') {
                            CreditCardType = 'MC';
                        } else if (CreditCardType === 'Discover') {
                            CreditCardType = 'DS';
                        } else if (CreditCardType === 'Diners') {
                            CreditCardType = 'DI';
                        }
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Invoice Ref#", "Authorization Code", "SC Masked Pan", "SC Adyen Merchant Id", "Transaction Amount", "SC Payment Status", "SC Auth Date", "SC Payment Type Code", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), this.Get("AdyenInvoiceRef"), this.Get("AdyenAuthCode"), this.Get("AdyenCardSummary"), this.Get("AdyenMerchantRef"), this.Get("AdyenTransAmount"), this.Get("AdyenPaymentStat"), currentDate, CreditCardType, CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

                    }, {
                        scope: this
                    }
                );
                this.AddMethod("DECLINEPAYMENTADYEN",
                    function (data) {
                        var oDate = new Date();
                        var dd = oDate.getDate();
                        var mm = oDate.getMonth() + 1;
                        var yy = oDate.getFullYear();
                        var hh = oDate.getHours();
                        var min = oDate.getMinutes();
                        var secs = oDate.getSeconds()
                        var currentDate = mm + '/' + dd + '/' + yy + ' ' + hh + ':' + min + ':' + secs;
                        var CreditCardType = this.Get("AdyenTypeCode");
                        if (CreditCardType === 'AMEX') {
                            CreditCardType = 'AE';
                        } else if (CreditCardType === 'VISA') {
                            CreditCardType = 'VI';
                        } else if (CreditCardType === 'MasterCard') {
                            CreditCardType = 'MC';
                        } else if (CreditCardType === 'Discover') {
                            CreditCardType = 'DS';
                        } else if (CreditCardType === 'Diners') {
                            CreditCardType = 'DI';
                        }
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Payment Status", "SC Response", "SC Auth Date", "SC Payment Type Code", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), "Declined", this.Get("AdyenppErrorMsg"), currentDate, CreditCardType, CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

                    }, {
                        scope: this
                    }
                );
                this.AddMethod("REQFAILPAYMENTADYEN",
                    function (data) {
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Payment Status", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), "Request Failed", CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("SemaPayId");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);
                    }, {
                        scope: this
                    }
                ); //END:JSHRIKESH:2/9/2024:For Adyen Voice

                //Start:JSHRIKESH:2/9/2024:For Adyen Voice
                this.AddMethod("UPDATEPAYMENTADYEN",
                    function (data) {
                        var oDate = new Date();
                        var dd = oDate.getDate();
                        var mm = oDate.getMonth() + 1;
                        var yy = oDate.getFullYear();
                        var hh = oDate.getHours();
                        var min = oDate.getMinutes();
                        var secs = oDate.getSeconds()
                        var currentDate = mm + '/' + dd + '/' + yy + ' ' + hh + ':' + min + ':' + secs;
                        var CreditCardType = this.Get("AdyenTypeCode");
                        if (CreditCardType === 'AMEX') {
                            CreditCardType = 'AE';
                        } else if (CreditCardType === 'VISA') {
                            CreditCardType = 'VI';
                        } else if (CreditCardType === 'MasterCard') {
                            CreditCardType = 'MC';
                        } else if (CreditCardType === 'Discover') {
                            CreditCardType = 'DS';
                        } else if (CreditCardType === 'Diners') {
                            CreditCardType = 'DI';
                        }
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Invoice Ref#", "Authorization Code", "SC Masked Pan", "SC Adyen Merchant Id", "Transaction Amount", "SC Payment Status", "SC Auth Date", "SC Payment Type Code", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), this.Get("AdyenInvoiceRef"), this.Get("AdyenAuthCode"), this.Get("AdyenCardSummary"), this.Get("AdyenMerchantRef"), this.Get("AdyenTransAmount"), this.Get("AdyenPaymentStat"), currentDate, CreditCardType, CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

                    }, {
                        scope: this
                    }
                );
                this.AddMethod("DECLINEPAYMENTADYEN",
                    function (data) {
                        var oDate = new Date();
                        var dd = oDate.getDate();
                        var mm = oDate.getMonth() + 1;
                        var yy = oDate.getFullYear();
                        var hh = oDate.getHours();
                        var min = oDate.getMinutes();
                        var secs = oDate.getSeconds()
                        var currentDate = mm + '/' + dd + '/' + yy + ' ' + hh + ':' + min + ':' + secs;
                        var CreditCardType = this.Get("AdyenTypeCode");
                        if (CreditCardType === 'AMEX') {
                            CreditCardType = 'AE';
                        } else if (CreditCardType === 'VISA') {
                            CreditCardType = 'VI';
                        } else if (CreditCardType === 'MasterCard') {
                            CreditCardType = 'MC';
                        } else if (CreditCardType === 'Discover') {
                            CreditCardType = 'DS';
                        } else if (CreditCardType === 'Diners') {
                            CreditCardType = 'DI';
                        }
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Payment Status", "SC Response", "SC Auth Date", "SC Payment Type Code", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), "Declined", this.Get("AdyenppErrorMsg"), currentDate, CreditCardType, CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("GetBusComp").GetFieldValue("Id");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

                    }, {
                        scope: this
                    }
                );
                this.AddMethod("REQFAILPAYMENTADYEN",
                    function (data) {
                        var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                        var SemBservice = '',
                            seminPS = '',
                            semoutPS = '';
                        seminPS = SiebelApp.S_App.NewPropertySet();
                        semoutPS = SiebelApp.S_App.NewPropertySet();
                        seminPS.SetProperty("BO", "Order Entry");
                        seminPS.SetProperty("BC", "Payments");
                        var Farray = ["Account Number", "SC Payment Status", "SC Payment Link"];
                        seminPS.SetProperty("FieldsArray", Farray);
                        var gvalue = [this.Get("AdyenAccNum"), "Request Failed", CRNumber];
                        seminPS.SetProperty("ValuesArray", gvalue);
                        var semapayId = this.Get("SemaPayId");
                        seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                        SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        if (SemBservice)
                            semoutPS = SemBservice.InvokeMethod("Insert", seminPS);
                    }, {
                        scope: this
                    }
                ); //END:JSHRIKESH:2/9/2024:For Adyen Voice

			};

			function PreInvokeMethod(methodName, PsInputArg, ip, returnStructure) {
				if (methodName == "Authorize" && this.Get("SCVoicerUser") == "Y") {
					SiebelApp.S_App.uiStatus.Free();
					returnStructure["CancelOperation"] = true;
					returnStructure["ReturnValue"] = "";
				} else {
					returnStructure["CancelOperation"] = false;
				}
			}
			return PaymentDetailPM;
		}());
		return "SiebelAppFacade.PaymentDetailPM";
	});
}