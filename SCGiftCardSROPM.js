if (typeof(SiebelAppFacade.SCGiftCardSROPM) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCGiftCardSROPM");
    define("siebel/custom/SCGiftCardSROPM", ["siebel/pmodel"],
        function() {
            SiebelAppFacade.SCGiftCardSROPM = (function() {

                function SCGiftCardSROPM(pm) {
                    SiebelAppFacade.SCGiftCardSROPM.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCGiftCardSROPM, SiebelAppFacade.PresentationModel);

                SCGiftCardSROPM.prototype.Init = function() {
                    SiebelAppFacade.SCGiftCardSROPM.superclass.Init.apply(this, arguments);
                    SiebelJS.Log(this.Get("GetName") + ": SCGiftCardSROPM:      Init method reached.");
                    window.PM = this; //Save reference to PM for later use (in window.parseResponse) after AJAX call.
                    this.AddProperty("SCStoreUser", SiebelApp.S_App.GetProfileAttr("SC Store User"));
                    this.AddProperty("CalcGiftCardNumber", "");
                    this.AddProperty("CalcPIN", "");
                    this.AddProperty("PaymentsRowID", "");
                    this.AddProperty("GetGCBalanceFlag", "N");
                    this.AddProperty("AccountNumber", "");
                    this.AddProperty("SCOrderTotal", "");
                    this.AddProperty("PaymentMethod", "");
                    this.AddProperty("TrackInformation", "");
                    this.AddProperty("TerminalID", "");
                    this.AddProperty("GlobalToken", "");
					this.AddProperty("FunctionCode","");
					
                    this.AttachEventHandler("SU_GET_GC_BALANCE",
                        function() {
                            //define a new propertyset and set appropriate input arguments
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
                                    if (PM.Get("GiftCardBalance") != undefined || PM.Get("GiftCardBalance") != "") {
                                        $("#GCNumber").text(PM.Get("CalcGiftCardNumber"));
                                        $("#GCBalance").text("$" + PM.Get("GiftCardBalance"));
                                        $("#SC-giftcard-details").show();
                                        var controls = this.Get( "GetControls" );
										$("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', false);
										$("#" + controls["Authorize"].GetInputName() + "_Ctrl").css("opacity", 1);
										$("#" + controls["Manual Input"].GetInputName() + "_Ctrl").prop('disabled', true);
										$("#" + controls["Manual Input"].GetInputName() + "_Ctrl").css("opacity", 0.5);
										$("#" + controls["Gift Card Balance"].GetInputName() + "_Ctrl").prop('disabled', true);
										$("#" + controls["Gift Card Balance"].GetInputName() + "_Ctrl").css("opacity", 0.5);
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


                    this.AttachEventHandler("SU_AUTHORIZE_PAYMENT_LINE",
                        function(data) {
                            //define a new propertyset and set appropriate input arguments
							if(this.Get("GlobalToken") != "" || this.Get("FunctionCode") != ""){
								var inPS = SiebelApp.S_App.NewPropertySet();
								var outPS = SiebelApp.S_App.NewPropertySet();
								var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
								if( service ){
									inPS.SetProperty("i4go_Token",PM.Get("GlobalToken"));
									inPS.SetProperty("Access_Token",PM.Get("AccessToken"));
									inPS.SetProperty("Function_Code",PM.Get("FunctionCode"));
									inPS.SetProperty("Row Id",this.Get("PaymentsRowID"));
									service.InvokeMethod("AuthorizePayment", inPS, outPS);		            
								}	
							}else{
								alert("Failed to get Global Token. Please enter details again");
							}
						}, //end of function AUTHORIZE_PAYMENT_LINE
                        {
                            scope: this
                        }
                    );


                    this.AttachEventHandler("SU_GetToken",
                        function() {
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

                    this.AddMethod("SU_GET_GlobalToken",
                        function(data) {
                            var psInput = SiebelApp.S_App.NewPropertySet();
                            var psOutput = SiebelApp.S_App.NewPropertySet();
                            var service = SiebelApp.S_App.GetService("Workflow Process Manager");
                            if (service) {
                                psInput.SetProperty("ProcessName", "SC Payment Retail GetToken");
                                psInput.SetProperty("CustomerName", PM.Get("CustomerName"));
                                psInput.SetProperty("StreetAddress", PM.Get("StreetAddress"));
                                psInput.SetProperty("ZipCode", PM.Get("ZipCode"));
                                psInput.SetProperty("AccessToken", PM.Get("AccessToken"));
                                psInput.SetProperty("TrackInformation", PM.Get("TrackInformation"));
                                psInput.SetProperty("TerminalID", PM.Get("TerminalID"));
                                psOutput = service.InvokeMethod("RunProcess", psInput);
                                var gToken = psOutput.GetChild(0).GetProperty("UniqueID");
                                PM.SetProperty("GlobalToken", gToken);
                            }
                        }, //end of function AUTHORIZE_PAYMENT_LINE
                        {
                            scope: this
                        }
                    );

                }

                SCGiftCardSROPM.prototype.Setup = function(propSet) {
                    SiebelJS.Log(this.Get("GetName") + ": SCGiftCardSROPM:      Setup method reached.");
                    SiebelAppFacade.SCGiftCardSROPM.superclass.Setup.apply(this, arguments);
                }

                return SCGiftCardSROPM;
            }());
            return "SiebelAppFacade.SCGiftCardSROPM";
        })
}