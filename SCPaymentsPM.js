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


if (typeof (SiebelAppFacade.SCPaymentsPM) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCPaymentsPM");
    define("siebel/custom/SelectComfort/SCPaymentsPM", ["siebel/listpmodel","siebel/custom/SelectComfort/SC_OUI_Methods"],
        function () {
            SiebelAppFacade.SCPaymentsPM = (function () {
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

                function SCPaymentsPM(pm) {
                    SiebelAppFacade.SCPaymentsPM.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCPaymentsPM, SiebelAppFacade.ListPresentationModel);

                SCPaymentsPM.prototype.Init = function () {
                    // Init is called each time the object is initialised.
                    // Add code here that should happen before default processing
                    SiebelAppFacade.SCPaymentsPM.superclass.Init.apply(this, arguments);
                    SiebelJS.Log(this.Get("GetName") + ": SCPaymentsPM:      Init method reached.");
                    // Add code here that should happen after default processing
                    window.PM = this;
                    var pm = this;
                    var appletName = pm.Get("GetName");
                    var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                    this.AddProperty("SCStoreUser", SiebelApp.S_App.GetProfileAttr("SC Store User"));
                    //Start..Venkat R 11/19/2020 for Secure Payments
                    var scChatuser = SiebelApp.S_App.GetProfileAttr("SC Chat User");
                    var scVoiceUser = theApplication().GetProfileAttr("SC Voice User");
                    this.AddProperty("SCChatUser", scChatuser);
                    //this.AddProperty( "SCChatUser", "Y");
                    //End..Venkat R 11/19/2020 for Secure Payments
                    this.AddProperty("StoreVoiceUser", "");
                    this.AddProperty("P2PEFlag", SiebelApp.S_App.GetProfileAttr("P2PEFlag"));
                    this.AddProperty("giftCardFlag", SiebelApp.S_App.GetProfileAttr('GiftCardFlag')); //PJAYASHA:Added feature flag for gift card.
                    this.AddProperty("FeatureFlag", SiebelApp.S_App.GetProfileAttr('FeatureFlag')); //AKSHAY: Added for MKE.
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
                    //Start: spatiban:21/1/20/ for Secure Payments
                    this.AddProperty("SemaPhoneAccNum", "");
                    this.AddProperty("SemaPhonepayType", "");
                    this.AddProperty("SemaPayId", "");
                    this.AddProperty("SemaPhonepayCard", "");
                    this.AddProperty("SCVoicerUser", scVoiceUser);
                    this.AddProperty("SemaPhoneGCAccNum", "");
                    this.AddProperty("SemaPhoneGCpayType", "");
                    this.AddProperty("SemaPayGCId", "");
                    this.AddProperty("SemaPhoneGCpayCard", "");
                    this.AddProperty("SemaPhonepayCR", "");
                    //JSHRIKESH added below for Adyen Voice
                    this.AddProperty("AdyenAccNum", "");
                    this.AddProperty("AdyenInvoiceRef#", "");
                    this.AddProperty("AdyenAuthCode", "");
                    this.AddProperty("AdyenCardSummary", "");
                    this.AddProperty("AdyenMerchantRef", "");
                    this.AddProperty("AdyenTransAmount", "");
                    this.AddProperty("AdyenPaymentStat", "");
                    this.AddProperty("AdyenTypeCode", "");
                    this.AddProperty("AdyenppErrorMsg", "");
                    this.AddProperty("semafoneErrorMessage", "");
                    this.AddProperty("AdyenppErrorCode", "");
                    this.AddProperty("AdyenRefusalReason", "");
                    this.AddProperty("AdyenCurrentAmount", "");
					this.AddProperty("isPhoneOrder", "");
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
                    localStorage.setItem("SCChatUser", this.Get("SCChatUser"));
                    localStorage.setItem("SCVoicerUser", this.Get("SCVoicerUser"));
                    //End: spatiban:21/1/20/ for Secure Payments
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
                                outPS = service.InvokeMethod("AuthorizePayment", inPS);
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
                                service.InvokeMethod("AuthorizePayment", inPS, outPS);
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
                            window.i4goServer = SiebelApp.S_App.GetProfileAttr("i4go_server");
                            window.i4goCode = SiebelApp.S_App.GetProfileAttr("i4go_code");
                            //venkat 12/2/2020 added for secure payment
                            if (window.PM.Get("SCChatUser") != "Y" && window.PM.Get("SCVoicerUser") != "Y" && this.Get("StoreVoiceUser") != "Y" && this.Get("giftCardFlag") != "Y") {
                                this.ExecuteMethod("GET_GC_TOKEN");
                            } else if (window.PM.Get("SCChatUser") == "Y" || window.PM.Get("SCVoicerUser") == "Y" || this.Get("StoreVoiceUser") == "Y") {
                                var inPS = SiebelApp.S_App.NewPropertySet();
                                var outPS = SiebelApp.S_App.NewPropertySet();
                                var service = SiebelApp.S_App.GetService("SC Shift4 Payment Auth Service");
                                if (service) {
                                    inPS.SetProperty("i4go_Token", this.Get("AccountNumber"));
                                    inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
                                    //pavithra added for gift card adyen PT
                                    inPS.SetProperty("GiftCardNumber", this.Get("CalcGiftCardNumber"));
                                    inPS.SetProperty("GiftPin", this.Get("CalcPIN"));
                                    outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
                                    this.SetProperty("GiftCardBalance", outPS.GetChild(0).GetProperty("Balance_Amount"));
                                    if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
                                        $("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
                                        $("#GCBalance").text("$" + Number(pm.Get("GiftCardBalance")).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                                        $("#SC-giftcard-details").show();
                                        if ($("#giftPaymentDue").val() != "")
                                            $("#SC-giftcard").removeClass("SC-disabled");
                                    }
                                }
                            }
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
                                outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
                                this.SetProperty("GiftCardBalance", outPS.GetChild(0).GetProperty("Balance_Amount"));
                                if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
                                    $("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
                                    $("#GCBalance").text("$" + Number(pm.Get("GiftCardBalance")).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                                    $("#SC-giftcard-details").show();
                                    if ($("#giftPaymentDue").val() != "")
                                        $("#SC-giftcard").removeClass("SC-disabled");
                                }
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
                                if (this.Get("GlobalToken") != "" || pm.Get("giftCardFlag") == "Y") {
                                    var inPS = SiebelApp.S_App.NewPropertySet();
                                    var outPS = SiebelApp.S_App.NewPropertySet();
                                    var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
                                    if (service) {
                                        inPS.SetProperty("i4go_Token", this.Get("GlobalToken"));
                                        inPS.SetProperty("Row Id", this.Get("PaymentsRowID"));
                                        //pavithra added for gift card adyen PT
                                        //var stest = pm.Get("PaymentsRowID");	
                                        inPS.SetProperty("GiftCardNumber", this.Get("CalcGiftCardNumber"));
                                        inPS.SetProperty("GiftPin", this.Get("CalcPIN"));
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
                                    //pavithra added for gift card adyen PT
                                    //var stest = this.Get("CalcGiftCardNumber");
                                    //var sTest1 = this.Get("CalcPIN");
                                    inPS.SetProperty("GiftCardNumber", this.Get("CalcGiftCardNumber"));
                                    inPS.SetProperty("GiftPin", this.Get("CalcPIN"));
                                    inPS.SetProperty("Access_Token", this.Get("AccessToken"));
                                    outPS = service.InvokeMethod("GetGiftCardBalance", inPS);
                                    this.SetProperty("GiftCardBalance", outPS.GetChild(0).GetProperty("Balance_Amount"));
                                    this.SetProperty("sGiftCardNumber", outPS.GetChild(0).GetProperty("sGiftCardNumber"));
                                    this.SetProperty("sGiftPin", outPS.GetChild(0).GetProperty("sGiftPin"));
                                    var sTest3 = outPS.GetChild(0).GetProperty("sGiftCardNumber");
                                    if (pm.Get("GiftCardBalance") != undefined && pm.Get("GiftCardBalance") != "" && pm.Get("GiftCardBalance") != null) {
                                        if (pm.Get("CalcGiftCardNumber") == "") {
                                            var sCard = pm.Get("sGiftCardNumber").substr(0, 4);
                                            //sCard=sCard.substr(0,4);

                                            $("#GCNumber").text(pm.Get("sGiftCardNumber").substr(0, 4));
                                        } else {
                                            $("#GCNumber").text(pm.Get("CalcGiftCardNumber"));
                                        }
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
                            if (this.Get("GlobalToken") != "" && giftCardFlag != "Y") {
                                var inPS = SiebelApp.S_App.NewPropertySet();
                                var outPS = SiebelApp.S_App.NewPropertySet();
                                var service = SiebelApp.S_App.GetService("Workflow Process Manager");
                                if (service) {
                                    inPS.SetProperty("AccountNumber", this.Get("GlobalToken"));
                                    inPS.SetProperty("RowId", this.Get("PaymentsRowID"));
                                    //pavithra added for gift card adyen PT
                                    //var stest = pm.Get("PaymentsRowID");	
                                    inPS.SetProperty("GiftCardNumber", this.Get("CalcGiftCardNumber"));
                                    inPS.SetProperty("GiftPin", this.Get("CalcPIN"));
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
                                if (pm.Get("P2PEFlag") == "Y" || pm.Get("giftCardFlag") == "Y") {
                                    var inPS = SiebelApp.S_App.NewPropertySet();
                                    var outPS = SiebelApp.S_App.NewPropertySet();
                                    var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service"); ///store gift card auth flow 
                                    if (service) {
                                        inPS.SetProperty("i4go_Token", pm.Get("AccountNumber"));
                                        inPS.SetProperty("Access_Token", pm.Get("AccessToken"));
                                        inPS.SetProperty("Function_Code", pm.Get("FunctionCode"));
                                        inPS.SetProperty("Row Id", pm.Get("PaymentsRowID"));
                                        //pavithra added for gift card adyen PT:for swipe card
                                        if (pm.Get("CalcGiftCardNumber") == "" && pm.Get("CalcPIN") == "") {
                                            inPS.SetProperty("GiftCardNumber", pm.Get("sGiftCardNumber"));
                                            inPS.SetProperty("GiftPin", pm.Get("sGiftPin"));
                                        } else {
                                            inPS.SetProperty("GiftCardNumber", pm.Get("CalcGiftCardNumber"));
                                            inPS.SetProperty("GiftPin", pm.Get("CalcPIN"));
                                        }
                                        inPS.SetProperty("PaymentAmount", pm.Get("PaymentAmount"));
                                        outPS = service.InvokeMethod("AuthorizePayment", inPS);
                                        pm.SetProperty("AccountNumber", "");
                                    }
                                    if (pm.Get("P2PEFlag") == "Y" && pm.Get("PaymentStatus") != "Need Verbal Authorization") {
                                        var MKESwitchFlag = theApplication().GetProfileAttr("MKESwitchFlag");
                                        //AKSHAY Added isPhoneOrder condition for MKE.
                                        var isPhoneOrder = localStorage.getItem("isPhoneOrder");

                                        if (MKESwitchFlag == "Y" && pm.Get("FeatureFlag") == "Y" && isPhoneOrder == "Y") {
                                            $("#SC-P2PE-Auth-MKE").modal('hide');
                                            $("#SC-P2PE-Auth-MKE").css({
                                                "display": "",
                                                "justify-content": "",
                                                "align-items": ""
                                            });
                                            $("#custommaskoverlay").hide();
                                        } else {
                                            $("#SC-P2PE-Auth").modal('hide');
                                            $("#SC-P2PE-Auth").css({
                                                "display": "",
                                                "justify-content": "",
                                                "align-items": ""
                                            });
                                            $("#custommaskoverlay").hide();
                                        }



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
                                        alert("Failed to get Global Token. Please enter details again"); //need to check :pavi for 13 user
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
                            var semapayId = this.Get("SemaPayId");
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
                    ); //Start:JSHRIKESH:2/9/2024:For Adyen Voice
                    this.AddMethod("UPDATEPAYMENTADYEN",
                        function (data) {
                            var Id = this.Get("GetBusComp").GetFieldValue("Id");
                            var currentDatePS = SCOUIMethods.SCGetCurrentTime(Id);
                            var currentDate = currentDatePS.GetChild(0).GetProperty("currentTime");
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
                            var TransAmount = this.Get("AdyenTransAmount");
                            if (TransAmount != "") {
                                TransAmount = (TransAmount / 100);
                            }
                            var PaymentStatusAdyen = this.Get("AdyenPaymentStat");
                            if (PaymentStatusAdyen == 'Authorised') {
                                PaymentStatusAdyen = 'Authorized';
                            } else if (PaymentStatusAdyen == 'PartiallyAuthorised') {
                                PaymentStatusAdyen = 'Authorized';
                            }
                            if (this.Get("isPhoneOrder") == "Y") {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account1');
                            } else {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account_SycurioChat');
                            }
                            var SemBservice = '',
                                seminPS = '',
                                semoutPS = '';
                            seminPS = SiebelApp.S_App.NewPropertySet();
                            semoutPS = SiebelApp.S_App.NewPropertySet();
                            var Farray = ["Account Number", "SC Invoice Ref#", "Authorization Code", "SC Masked Pan", "SC Adyen Merchant Id", "Transaction Amount", "SC Payment Status", "SC Auth Date", "SC Payment Type Code", "SC Payment Link", "Transaction Type", "SC Card Entry", "SC Add Check Verified"];
                            seminPS.SetProperty("FieldsArray", Farray);
                            var gvalue = [this.Get("AdyenAccNum"), this.Get("AdyenInvoiceRef#"), this.Get("AdyenAuthCode"), this.Get("AdyenCardSummary"), Merchant_id, TransAmount, PaymentStatusAdyen, currentDate, CreditCardType, CRNumber, "Adyen", "KEYED", "Y"];
                            seminPS.SetProperty("ValuesArray", gvalue);
                            var semapayId = this.Get("SemaPayId");
                            seminPS.SetProperty("BO", "Order Entry");
                            seminPS.SetProperty("BC", "Payments");
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
                            var Id = this.Get("GetBusComp").GetFieldValue("Id");
                            var currentDatePS = SCOUIMethods.SCGetCurrentTime(Id);
                            var currentDate = currentDatePS.GetChild(0).GetProperty("currentTime");
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
                            if (this.Get("isPhoneOrder") == "Y") {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account1');
                            } else {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account_SycurioChat');
                            }
                            var TransAmount = this.Get("AdyenCurrentAmount");
                            var failureReason = this.Get("AdyenppErrorMsg")
                            if (this.Get("AdyenppErrorCode") == "") {
                                var failureReason = this.Get("AdyenRefusalReason")

                            }
                            var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                            var SemBservice = '',
                                seminPS = '',
                                semoutPS = '';
                            seminPS = SiebelApp.S_App.NewPropertySet();
                            semoutPS = SiebelApp.S_App.NewPropertySet();
                            var Farray = ["Account Number", "SC Payment Status", "SC Response", "SC Auth Date", "SC Payment Type Code", "SC Payment Link", "Transaction Type", "SC Card Entry", "SC Adyen Merchant Id", "SC Masked Pan", "Transaction Amount", "SC CVV Failed Flag", "SC Add Check Verified"];
                            seminPS.SetProperty("FieldsArray", Farray);
                            var gvalue = [this.Get("AdyenAccNum"), "Declined", failureReason, currentDate, CreditCardType, CRNumber, "Adyen", "KEYED", Merchant_id, this.Get("AdyenCardSummary"), TransAmount, "Y", "N"];
                            seminPS.SetProperty("ValuesArray", gvalue);
                            var semapayId = this.Get("SemaPayId");
                            seminPS.SetProperty("BO", "Order Entry");
                            seminPS.SetProperty("BC", "Payments");
                            seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                            SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                            if (SemBservice)
                                semoutPS = SemBservice.InvokeMethod("Insert", seminPS);
                        }, //end of function DECLINEPAYMENTADYEN
                        {
                            scope: this
                        }
                    );
                    this.AddMethod("REQFAILPAYMENTADYEN",
                        function (data) {
                            if (this.Get("isPhoneOrder") == "Y") {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account1');
                            } else {
                                var Merchant_id = SCOUIMethods.RetrieveLOVValues('SC_ADYEN_MERCHANT_ID', 'Merchant_Account_SycurioChat');
                            }
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
                            var TransAmount = this.Get("AdyenCurrentAmount");
                            var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                            var SemBservice = '',
                                seminPS = '',
                                semoutPS = '';
                            seminPS = SiebelApp.S_App.NewPropertySet();
                            semoutPS = SiebelApp.S_App.NewPropertySet();
                            var Farray = ["SC Payment Status", "SC Response", "SC Payment Link", "Transaction Type", "SC Card Entry", "SC Adyen Merchant Id", "Transaction Amount", "SC Payment Type Code", "SC Masked Pan"];
                            seminPS.SetProperty("FieldsArray", Farray);
                            var gvalue = ["Request Failed", this.Get("semafoneErrorMessage"), CRNumber, "Adyen", "KEYED", Merchant_id, TransAmount, CreditCardType, this.Get("AdyenCardSummary")];
                            seminPS.SetProperty("ValuesArray", gvalue);
                            var semapayId = this.Get("SemaPayId");
                            seminPS.SetProperty("BO", "Order Entry");
                            seminPS.SetProperty("BC", "Payments");
                            seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                            SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                            if (SemBservice)
                                semoutPS = SemBservice.InvokeMethod("Insert", seminPS);
                        }, {
                            scope: this
                        }
                    ); //END:JSHRIKESH:2/9/2024:For Adyen Voice
                    //Start: spatiban:21/1/20/ for Secure Payments
                    this.AddMethod("GCINVOKEDELETERCD",
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


                        }, //end of function GCINVOKEDELETERCD
                        {
                            scope: this
                        }
                    );
                    this.AddMethod("UPDAESEMAPHONEGCTOKEN",
                        function (data) {
                            var GiftCardType = this.Get("SemaPhoneGCpayType");
                            if (GiftCardType == 'YC') {
                                GiftCardType = 'GC';
                            }
                            var CRNumber = "*#" + this.Get("SemaPhonepayCR");
                            var SemBservice = '',
                                seminPS = '',
                                semoutPS = '';
                            seminPS = SiebelApp.S_App.NewPropertySet();
                            seminPS = SiebelApp.S_App.NewPropertySet();
                            seminPS.SetProperty("BO", "Order Entry");
                            seminPS.SetProperty("BC", "Payments");
                            var Farray = ["Account Number", "SC Payment Status", "SC Payment Type Code", "SC Payment Link"];
                            //var Farray = ["Account Number"];
                            seminPS.SetProperty("FieldsArray", Farray);
                            var gvalue = [this.Get("SemaPhoneGCAccNum"), "In Progress", GiftCardType, CRNumber];
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
                }

                SCPaymentsPM.prototype.Setup = function (propSet) {
                    // Setup is called each time the object is initialised.
                    // Add code here that should happen before default processing
                    SiebelJS.Log(this.Get("GetName") + ": SCPaymentsPM:      Setup method reached.");
                    SiebelAppFacade.SCPaymentsPM.superclass.Setup.apply(this, arguments);
                    // Add code here that should happen after default processing
                }

                return SCPaymentsPM;
            }());
            return "SiebelAppFacade.SCPaymentsPM";
        })
}