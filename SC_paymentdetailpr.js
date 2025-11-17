// globally rename PaymentDetailPR to the name you desire for your custom class.
// Save the file in siebel/custom/ using the same case for the file name as the class name.
function validateInputCC(thisPM) {
    var sPayRowID = ""; //19Nov2024
    var retVal = true;
    var errorMessage = "Following Fields are required:\n\n";
    var errorCount = 0;

    if (thisPM.Get("SCStoreUser") == "Y") {
        errorMessage = "Authorizations for Store users is limited to 'Rewards'; Please use POS to Authorize other payment methods"
        retVal = false;
    } else if (thisPM.Get("SCChatUser") != "Y" && thisPM.Get("SCVoicerUser") != "Y") {
        //Venkat R

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
        	errorMessage = "Please perform ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œGC Balance CheckÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â prior to ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œAuthorizationÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â request"
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

    define("siebel/custom/SC_paymentdetailpr", ["siebel/phyrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods"], function () {
        SiebelAppFacade.PaymentDetailPR = (function () {
            var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
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
                    $("[name=" + controls["Authorization Code"].GetInputName() + "]").css('visibility', 'hidden');
                    $("span#Authorization_Code_Label").parent().fadeOut(500);
                } else {
                    $("[name=" + controls["Authorization Code"].GetInputName() + "]").css('visibility', 'visible');
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
                //dropin start
                var dropinEnv = theApplication().GetProfileAttr("DropinclientEnv");

                function isMyScriptLoaded(url) {
                    var scripts = document.getElementsByTagName('script');
                    for (var i = scripts.length; i--;) {
                        if (scripts[i].src == url) return true;
                    }
                    return false;
                }
                if ((SiebelApp.S_App.GetProfileAttr("SycChatUserFlg") == "Y" && theApplication().GetProfileAttr("SC Primary Division Type") == 'ECOM' && theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS' && sChatUser != "Y") || (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") == "Y" && theApplication().GetProfileAttr("SC Primary Division Type") == 'DIRECT' && (theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS' || theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CSC') && sVoiceUser != "Y")) {
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
                    if (!isMyScriptLoaded('https://checkoutshopper-' + dropinEnv + '.adyen.com/checkoutshopper/sdk/5.68.0/adyen.js')) {
                        var Markup = '<script src="https://checkoutshopper-' + dropinEnv + '.adyen.com/checkoutshopper/sdk/5.68.0/adyen.js" integrity="sha384-U9GX6Oa3W024049K86PYG36/jHjkvUqsRd8Y9cF1CmB92sm4tnjxDXF/tkdcsk6k" crossorigin="anonymous"></script><link rel="stylesheet" href="https://checkoutshopper-' + dropinEnv + '.adyen.com/checkoutshopper/sdk/5.68.0/adyen.css" integrity="sha384-gpOE6R0K50VgXe6u/pyjzkKl4Kr8hXu93KUCTmC4LqbO9mpoGUYsrmeVLcp2eejn" crossorigin="anonymous">';
                        $("head").append(Markup);
                    }
                }
                //dropin end
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
                //PJAYASHA:Control name chane to genreate Link DF-2708:26DEC24
                var sPayMethod = paymentBC.GetFieldValue("Payment Method");
                var sSycChatFlg = theApplication().GetProfileAttr("SycVoiceUserFlg");
                var sLink = paymentBC.GetFieldValue("SC Payment Link");

                if (sChatUser == "Y" && sSycChatFlg == "Y" && sPayMethod == "Credit Card" && sLink == "") {
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["Authorize"].GetInputName() + "_Ctrl span").empty().append("Generate Link");
                } //PJAYASHA:Control name chane to genreate Link DF-2708:26DEC24

                //LikhithaK:31Oct2025:Start:EP-232:Profile Att setting expires At & Current UTC timestamp for PBL User story
                var PBLFlag = SiebelApp.S_App.GetProfileAttr('PayByLinkFlag');
                if (PBLFlag == "Y") {
                    const now = new Date(); //Get the current local date
                    now.setHours(23, 59, 59, 999); // Set the time to the end of the current day (23:59:59.999)
                    const EndOfDayUTCTimestamp = now.toISOString(); // convert to UTC date string
                    console.log("Current day's local end time in UTC string:", EndOfDayUTCTimestamp);

                    const utcDate = new Date(EndOfDayUTCTimestamp);
                    const cstString = utcDate.toLocaleString('en-US', { //UTC to CST timestamp Conversion
                        timeZone: 'America/Chicago'
                    });
                    const cstDate = new Date(cstString);
                    console.log(cstDate);
                    var HH = cstDate.getHours();
                    var MN = cstDate.getMinutes();
                    var SS = cstDate.getSeconds();

                    var sExpiresAtInCentral = cstDate.getMonth() + 1 + "/" + cstDate.getDate() + "/" + cstDate.getFullYear() + " " + HH + ":" + (MN < 10 ? "0" + MN : MN) + ":" + (SS < 10 ? "0" + SS : SS);

                    var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
                    var sinPS = SiebelApp.S_App.NewPropertySet();
                    var soutPS = SiebelApp.S_App.NewPropertySet();
                    sinPS.SetProperty('Name', 'PBLExpiresAt');
                    sinPS.SetProperty('Value', EndOfDayUTCTimestamp);
                    if (sBservice) {
                        soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
                    }
                    var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
                    var sinPS = SiebelApp.S_App.NewPropertySet();
                    var soutPS = SiebelApp.S_App.NewPropertySet();
                    sinPS.SetProperty('Name', 'ExpiresAtInCentral');
                    sinPS.SetProperty('Value', sExpiresAtInCentral);
                    if (sBservice) {
                        soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
                    }
                }
                //LikhithaK:31Oct2025:End:EP-232:Profile Att setting expires At & Current UTC timestamp for PBL User story

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
                        $("[name=" + controls["SC Payment Link"].GetInputName() + "]").css('visibility', 'visible');
                        $("[name=" + controls["SC Semaphone Capture Status"].GetInputName() + "]").css('visibility', 'visible');
                        $("span#SC_Payment_Link_Label").parent().fadeIn(500);
                        $("span#SC_Semaphone_Capture_Status_Label").parent().fadeIn(500);
                    } else {
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
                //LikhithaK:05Sep2024:To Enable Authorize button
                var sPayMethod = paymentBC.GetFieldValue("Payment Method");
                var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
                var sPaymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                var sLink = paymentBC.GetFieldValue("SC Payment Link");
                if (sChatUser == "Y" && sSycChatFlg == "Y" && sPayMethod == "Credit Card" && sLink == "") {
                    $("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', false).css("opacity", 1);
                }
                //LikhithaK:05Sep2024:To Enable Authorize button
                //JSHRIKESH:06Sep2024:To Enable Authorize button
                var sPayMethod = paymentBC.GetFieldValue("Payment Method");
                var sSycVoiceFlg = theApplication().GetProfileAttr("SycVoiceUserFlg");
                if ((sVoiceUser == "Y") && sSycVoiceFlg == "Y" && sPayMethod == "Credit Card") {
                    $("#" + controls["Authorize"].GetInputName() + "_Ctrl").prop('disabled', false).css("opacity", 1);
                }
                //JSHRIKESH:06Sep2024:To Enable Authorize button
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

                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + authorizeButton.GetInputName() + "_Ctrl", "click", {
                        ctx: this,
                        ctrls: controls
                    }, //Pass the 'controls' collection to the event handler in the data object.
                    function (evt) {
                        evt.stopImmediatePropagation();
                        var appletName = PM.Get("GetName");
                        var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                        //
                        function callDropin(paymentId) {
                            const clientKey = theApplication().GetProfileAttr("DropinclientKey");
                            const clientEnv = theApplication().GetProfileAttr("DropinclientEnv");
                            const type = 'dropin';
                            const dropinAmount = {
                                "currency": "USD",
                                "value": (parseFloat($("input[aria-label='Payment Amount']").val().substr(1).replace(",", "")).toFixed(2) * 100).toFixed(0)
                            };
                            var merchantOrderReference = $("input[aria-label='Order #']").val();
                            async function startCheckout() {

                                try {
                                    // Init Sessions
                                    $("#" + evt.data.ctrls["Authorize"].GetInputName() + "_Ctrl").addClass('appletButtonDis').css({
                                        'opacity': '',
                                        'outline': 'none'
                                    });
                                    $("[name=" + evt.data.ctrls["Transaction Amount"].GetInputName() + "]").prop("disabled", true).css({
                                        "color": "#727780",
                                        "background-color": "#dddddd"
                                    });
                                    var bsWfProcMgr = theApplication().GetService("Workflow Process Manager");
                                    var outputs = SiebelApp.S_App.NewPropertySet();
                                    var inputs = SiebelApp.S_App.NewPropertySet();
                                    inputs.SetProperty("ProcessName", "SC Adyen Dropin Create Session WF");
                                    inputs.SetProperty("PaymentId", paymentId);
                                    //1-22Z04UT4
                                    inputs.SetProperty("merchantOrderReference", merchantOrderReference);
                                    inputs.SetProperty("Flow", "createsession");
                                    inputs.SetProperty("Amount", dropinAmount.value);
                                    if (theApplication().GetProfileAttr("SC Primary Division Type") == 'ECOM' && theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS')
                                        inputs.SetProperty("SemaVal", "SC_SEMAPHONE_CHATSWITCH");
                                    else if (theApplication().GetProfileAttr("SC Primary Division Type") == 'DIRECT' && (theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS' || theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CSC'))
                                        inputs.SetProperty("SemaVal", "SC_SEMAPHONE_VOICESWITCH");
                                    else
                                        inputs.SetProperty("SemaVal", "");
                                    outputs = bsWfProcMgr.InvokeMethod("RunProcess", inputs);
                                    var checkoutSessionResponse = {
                                        "id": outputs.childArray[0].childArray[0].propArray.id,
                                        "sessionData": outputs.childArray[0].childArray[0].propArray.sessionData
                                    };
                                    // Create AdyenCheckout using Sessions response

                                    var checkout = await createAdyenCheckout(checkoutSessionResponse);
                                    // Create an instance of Drop-in and mount it
                                    $("div[title='Payment Detail - Credit Card Form Applet'] .siebui-applet-content").parent().append('<div id="dropin"></div>');
                                    $("div[title='Payment Detail - Credit Card Form Applet'] .siebui-applet-content").hide();

                                    checkout.create(type).mount(document.getElementById(type));

                                } catch (error) {
                                    console.error(error);
                                    updatePaymentDetails('Request Failed', 'Y');
                                    //alert("Error occurred. Look at console for details");
                                }
                            }

                            function updatePaymentDetails(dropinStatus, dropinError) {
                                SiebelApp.S_App.GetActiveView().GetApplet('Payment List Applet').InvokeMethod("NewQuery");
                                SiebelApp.S_App.GetActiveView().GetApplet('Payment List Applet').InvokeMethod("ExecuteQuery");
                                var dropinPaymentBS = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                                var dropinUpdateOps = SiebelApp.S_App.NewPropertySet();
                                var dropinUpdateIns = SiebelApp.S_App.NewPropertySet();
                                dropinUpdateIns.SetProperty("BO", "Order Entry");
                                dropinUpdateIns.SetProperty("BC", "Payments");
                                var Farray = ["SC Payment Status", "Transaction Amount", "Transaction Type"];
                                dropinUpdateIns.SetProperty("FieldsArray", Farray);
                                var gvalue = [dropinStatus, dropinAmount.value / 100, "Adyen"];
                                dropinUpdateIns.SetProperty("ValuesArray", gvalue);
                                dropinUpdateIns.SetProperty("SearchSpecification", "[Id] = '" + paymentId + "'");
                                dropinUpdateOps = dropinPaymentBS.InvokeMethod("Insert", dropinUpdateIns);

                                var maxTimeLimit = 0;
                                var getAccount = setInterval(function () {
                                    var sAccountNumber = paymentBC.GetFieldValue("Account Number");
                                    if (sAccountNumber != "" || dropinError == 'Y') {
                                        //SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                        //LikhithaK:12Sep2024:Refresh All applets
                                        var Refreshservice = '',
                                            RefreshinPS = '',
                                            RefreshoutPS = '';
                                        RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshinPS.SetProperty("Refresh All", "Y");
                                        Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                        RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);

                                        $("div[title='Payment Detail - Credit Card Form Applet'] .siebui-applet-content").show();
                                        $("#dropin").remove();

                                        SiebelApp.S_App.GetActiveView().GetApplet('Payment List Applet').InvokeMethod("NewQuery");
                                        SiebelApp.S_App.GetActiveView().GetApplet('Payment List Applet').InvokeMethod("ExecuteQuery");
                                        //LikhithaK:12Sep2024:Refresh All applets
                                        clearInterval(getAccount);
                                    } else {
                                        if (maxTimeLimit >= 30) {
                                            clearInterval(getAccount);
                                        }
                                        SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                        maxTimeLimit += 1;
                                    }
                                }, 2000);

                            }
                            async function createAdyenCheckout(session) {
                                const configuration = {
                                    clientKey: clientKey,
                                    // generate different for production
                                    locale: "en_US",
                                    environment: clientEnv,
                                    // change to live for production
                                    showPayButton: true,
                                    session: session,
                                    paymentMethodsConfiguration: {
                                        card: {
                                            hasHolderName: true,
                                            holderNameRequired: true,
                                            name: "Credit or debit card",
                                            amount: dropinAmount
                                        }
                                    },
                                    onPaymentCompleted: (result, component) => {
                                        handleServerResponse(result, component);
                                    },
                                    onError: (error, component) => {
                                        console.error(error.name, error.message, error.stack, component);
                                        updatePaymentDetails('Request Failed', 'Y');
                                    }
                                };
                                return new AdyenCheckout(configuration);
                            }
                            // Handles responses sent from your server to the client
                            function handleServerResponse(res, component) {
                                if (res.action) {
                                    component.handleAction(res.action);
                                } else {
                                    var dropinStatus = "";
                                    if (res.resultCode === "Authorised")
                                        dropinStatus = "Authorized";
                                    else if (res.resultCode === "Refused")
                                        dropinStatus = "Declined";
                                    else if (res.resultCode !== "Pending" && res.resultCode !== "Received")
                                        dropinStatus = "Request Failed";
                                    updatePaymentDetails(dropinStatus, 'N');
                                }
                            }
                            startCheckout();
                        }
                        var selectedPaymentRowId = paymentBC.GetFieldValue("Id");
                        if (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") == "Y" && theApplication().GetProfileAttr("SC Primary Division Type") == 'DIRECT' && (theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS' || theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CSC') && sVoiceUser != "Y") //voice
                        {
                            callDropin(selectedPaymentRowId);
                        } else if (SiebelApp.S_App.GetProfileAttr("SycChatUserFlg") == "Y" && theApplication().GetProfileAttr("SC Primary Division Type") == 'ECOM' && theApplication().GetProfileAttr("SC Primary Division Sub Type") == 'CS' && sChatUser != "Y") //chat
                        {
                            callDropin(selectedPaymentRowId);
                        } else {
                            //
                            PM = evt.data.ctx.GetPM();
                            $("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'hidden');

                            //Set the property values by reading from controls.
                            PM.SetProperty("PaymentMethod", $("[name=" + evt.data.ctrls["Payment Method"].GetInputName() + "]").val());

                            PM.SetProperty("CreditCardType", $("[name=" + evt.data.ctrls["Payment Type"].GetInputName() + "]").val());

                            PM.SetProperty("PaymentAmount", $("[name=" + evt.data.ctrls["Transaction Amount"].GetInputName() + "]").val());

                            PM.SetProperty("CalcCreditCardNumber", $("[name=" + evt.data.ctrls["SC Credit Card Number"].GetInputName() + "]").val());

                            PM.SetProperty("CalcCVVNumber", $("[name=" + evt.data.ctrls["SC CVV Number"].GetInputName() + "]").val());

                            PM.SetProperty("CalcExpMonth", $("[name=" + evt.data.ctrls["Expiration Month"].GetInputName() + "]").val());

                            PM.SetProperty("CalcExpYear", $("[name=" + evt.data.ctrls["Expiration Year"].GetInputName() + "]").val());

                            //PM.SetProperty("PaymentsRowID", $("[name="+evt.data.ctrls[ "Payment Id" ].GetInputName()+"]").val());
                            PM.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));

                            PM.SetProperty("AccountNumber", $("[name=" + evt.data.ctrls["Account Number"].GetInputName() + "]").val());

                            PM.SetProperty("PaymentStatus", $("[name=" + evt.data.ctrls["SC Payment Status"].GetInputName() + "]").val());

                            PM.SetProperty("AuthorizationCode", $("[name=" + evt.data.ctrls["Authorization Code"].GetInputName() + "]").val());

                            //PM.SetProperty("SCOrderTotal", $("[name="+evt.data.ctrls[ "SC Order Total" ].GetInputName()+"]").val());
                            if (validateInputCC(PM)) {
                                //LikhithaK:Start:Sycurio Chat User Create Payment Link
                                var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
                                if (sSycChatFlg == "Y" && sChatUser == "Y") {

                                    var paymentBC1 = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                                    var sPaymentLink = paymentBC.GetFieldValue("SC Payment Link");
                                    var sAccountNumber = paymentBC.GetFieldValue("Account Number");
                                    console.log("Account Number: " + sAccountNumber);
                                    if (sAccountNumber.length == 0) {
                                        var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                            write = false;
                                        //if (canWrite)
                                        //write = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("WriteRecord");
                                        if (canWrite) {
                                            if (sPaymentLink == "") {
                                                var sPaymentRecordId = paymentBC1.GetFieldValue("Id");
                                                sPayRowID = paymentBC1.GetFieldValue("Id"); //19Nov2024
                                                var orderId = orderBC.GetFieldValue("Id");
                                                var Bservice = '',
                                                    inPS = '',
                                                    outPS = '';
                                                inPS = SiebelApp.S_App.NewPropertySet();
                                                outPS = SiebelApp.S_App.NewPropertySet();
                                                inPS.SetProperty("Object Id", orderId);
                                                inPS.SetProperty("Payment Id", sPaymentRecordId);
                                                inPS.SetProperty("ProcessName", "SC Adyen Get Payment Link WF");
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
                                                $("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');
                                            }

                                        }

                                        sPaymentLink = paymentBC.GetFieldValue("SC Payment Link");
                                        if (sPaymentLink != "") {
                                            //LikhithaK:25Sep2024:Disable of Authorize button
                                            var sPaytMethod = paymentBC.GetFieldValue("Payment Method");
                                            if (sPaytMethod == "Credit Card") {
                                                $("#" + evt.data.ctrls["Authorize"].GetInputName() + "_Ctrl").addClass('appletButtonDis').css({
                                                    'opacity': '',
                                                    'outline': 'none'
                                                });
                                                $("[name=" + evt.data.ctrls["Transaction Amount"].GetInputName() + "]").prop("disabled", true).css({
                                                    "color": "#727780",
                                                    "background-color": "#dddddd"
                                                });
                                            }
                                            //LikhithaK:25Sep2024:Disable of Authorize button
                                            var maxTimeLimit = 0;
                                            var getAccount = setInterval(function () {
                                                var sAccountNumber = paymentBC.GetFieldValue("Account Number");
                                                if (sAccountNumber != "") {
                                                    $("#" + evt.data.ctrls["Authorize"].GetInputName() + "_Ctrl").addClass('appletButtonDis').css('opacity', '');
                                                    //SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                    //LikhithaK:12Sep2024:Refresh All applets
                                                    var Refreshservice = '',
                                                        RefreshinPS = '',
                                                        RefreshoutPS = '';
                                                    RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                                    RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                                    RefreshinPS.SetProperty("Refresh All", "Y");
                                                    Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                                    RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                                    //LikhithaK:12Sep2024:Refresh All applets
                                                    clearInterval(getAccount);
                                                } else {
                                                    if (maxTimeLimit >= 450) {
                                                        clearInterval(getAccount);
                                                    }
                                                    SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                    //$("#" + evt.data.ctrls["Authorize"].GetInputName() + "_Ctrl").addClass('appletButtonDis').css('opacity','');
                                                    maxTimeLimit += 1;
                                                }
                                            }, 2000);
                                            //19Nov2024
                                            var maxTimeLimitRef = 0;
                                            var refreshAllApplets = setInterval(function () {
                                                var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
                                                if (sChatUser == "Y" && sSycChatFlg == "Y") {
                                                    var OrderStatus = orderBC.GetFieldValue("Status");
                                                    var inPS = SiebelApp.S_App.NewPropertySet();
                                                    var outPS = SiebelApp.S_App.NewPropertySet();
                                                    var bService = "";
                                                    inPS.SetProperty("Object Id", sPayRowID);
                                                    SiebelJS.Log("Invoking Business Service");
                                                    bService = SiebelApp.S_App.GetService("SC Adyen Payment Service"); //get service
                                                    outPS = bService.InvokeMethod("FetchSycDigitalIdentifier", inPS); //invoke the method
                                                    var sycDigIdentifier = outPS.GetChild(0).GetProperty("Identifier");
                                                    var sPayMethod = outPS.GetChild(0).GetProperty("PayMethod");
                                                    if (sycDigIdentifier == "Sycurio" && OrderStatus == "In Progress" && sPayMethod == "Credit Card") {
                                                        var Refreshservice = '',
                                                            RefreshinPS = '',
                                                            RefreshoutPS = '';
                                                        RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                                        RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                                        RefreshinPS.SetProperty("Refresh All", "Y");
                                                        Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                                        RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                                        clearInterval(refreshAllApplets);
                                                    } else if (sPayMethod != "Credit Card" || OrderStatus != "In Progress") {
                                                        clearInterval(refreshAllApplets);
                                                    } else {
                                                        if (maxTimeLimitRef > 480) { //19Nov2024_Need to confirm this value
                                                            clearInterval(refreshAllApplets);
                                                        }
                                                        SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                        maxTimeLimitRef += 1;
                                                    }
                                                } else {
                                                    clearInterval(refreshAllApplets);
                                                }
                                            }, 2000);
                                            //19Nov2024//120000
                                        }
                                    }

                                } //LikhithaK:End:Sycurio Chat User Create Payment Link
                                //Handle the click event in the PM
                                else if ((sVoiceUser == "Y") && (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") == "Y")) {
                                    var sPage = "";
                                    var Addition = "";
                                    var Digest = "";
                                    var appletName = PM.Get("GetName");
                                    var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                                    var sPaymentRecordId = paymentBC.GetFieldValue("Id");
                                    var sAccountNumber = paymentBC.GetFieldValue("Account Number");
                                    console.log("Account Number: " + sAccountNumber);
                                    var appletName = PM.Get("GetName");
                                    var controls = PM.Get("GetControls");
                                    var cardPM = PM;
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
                                            var fieldsArray_new = "Id,SC Adyen Voice IFrame URL";
                                            Input.SetProperty("FieldsArray", fieldsArray_new);
                                            var Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                                            Output = Custom_Service.InvokeMethod("Query", Input);
                                            var Child = Output.GetChild(0);
                                            var BS_Data = Child.GetProperty("OutputRecordSet");
                                            if (BS_Data != "}") {
                                                BS_Data = JSON.parse(BS_Data);
                                                sPage = BS_Data["SC Adyen Voice IFrame URL"];

                                            }
                                            console.log("Semaphone url: " + sPage);
                                            if (sPage.length > 0) {
                                                var Add_Params = SCOUIMethods.RetrieveLOVValues('SC_ADDITIONALPARAMETERS_SWITCH', 'Additional Parameters');
                                                if (Add_Params == "Y") {
                                                    var Bservice = '',
                                                        inPS = '',
                                                        outPS = '';
                                                    inPS = SiebelApp.S_App.NewPropertySet();
                                                    outPS = SiebelApp.S_App.NewPropertySet();
                                                    inPS.SetProperty("Object Id", sPaymentRecordId);

                                                    Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
                                                    if (Bservice)
                                                        outPS = Bservice.InvokeMethod("GetCustDetails", inPS);
                                                    var Child = outPS.GetChild(0);
                                                    var Phone = Child.GetProperty("Phone");
                                                    var ShipToAddr = Child.GetProperty("ShipToAddr");
                                                    var ShipCountry = Child.GetProperty("ShipCountry");
                                                    if (ShipCountry == 'USA') {
                                                        ShipCountry = 'US';
                                                    } else if (ShipCountry == 'CANADA') { //LikhithaK:23Apr2025:SFSTRY0003458:Added else if.
                                                        ShipCountry = 'CA';
                                                    }
                                                    var ShipCity = Child.GetProperty("ShipCity");
                                                    var BillState = Child.GetProperty("BillState");
                                                    var ShipState = Child.GetProperty("ShipState");
                                                    var BillHouseNum = Child.GetProperty("BillHouseNum");
                                                    var ShipHouseNum = Child.GetProperty("ShipHouseNum");
                                                    var pStreetName = Child.GetProperty("BillStreetName"); //PJAYASHA:START:send street name 
                                                    var sStreetName = Child.GetProperty("ShipStreetName"); //Likhitha:23/1/2025:Prod fix:To send Ship to Street name instead of bill to street name for &deliveryAddress2 parameter.
                                                    Addition = "&telephoneNumber=" + Phone + "&deliveryAddress1=" + ShipHouseNum + "&deliveryAddress2=" + sStreetName + "&deliveryCity=" + ShipCity + "&deliveryState=" + ShipState + "&deliveryCountry=" + ShipCountry + "&state=" + BillState + "&avs1=" + BillHouseNum;
                                                }
                                                var currentAmount = paymentBC.GetFieldValue("Transaction Amount");
                                                var clientref1 = SCOUIMethods.RetrieveLOVValues('SC_VOICE_URL2', 'clientReferenceAdyen2');
                                                var clientref2 = SCOUIMethods.RetrieveLOVValues('SC_VOICE_URL2', 'clientReferenceAdyen3');
                                                var scClientRef = clientref1 + clientref2;
                                                var Add_Digest = SCOUIMethods.RetrieveLOVValues('SC_12CPAYMENT_STORES', 'Digest');

                                                if (Add_Digest == "Y") {
                                                    var HBservice = '',
                                                        HinPS = '',
                                                        HoutPS = '';
                                                    HinPS = SiebelApp.S_App.NewPropertySet();
                                                    HoutPS = SiebelApp.S_App.NewPropertySet();
                                                    HinPS.SetProperty("Id", sPaymentRecordId);
                                                    HinPS.SetProperty("currentAmount", currentAmount);
                                                    HinPS.SetProperty("scClientRef", scClientRef);

                                                    HBservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
                                                    if (HBservice)
                                                        HoutPS = HBservice.InvokeMethod("hashingMethod", HinPS);
                                                    var Child = HoutPS.GetChild(0);
                                                    var Hash_Value = Child.GetProperty("digest");

                                                    var Digest = "&digest=" + Hash_Value;
                                                }
                                                sPage = sPage + Addition + Digest;
                                                console.log("Semaphone url with updated parameters: " + sPage);
                                                //PJAYASHA:START: To change AVS2 parameter:06DEC24
                                                var avs2Index = sPage.indexOf('&avs2=');
                                                var sPageLength = sPage.length;
                                                var avs3Index = sPage.indexOf('&avs3=');
                                                var sPagePart1 = sPage.substr(0, (avs2Index + 6));
                                                var sPagePart2 = sPage.substr(avs3Index, sPageLength);
                                                sPage = sPagePart1 + pStreetName + sPagePart2;
                                                console.log("Semaphone url with updated avs2: " + sPage);
                                                //PJAYASHA:START: To change AVS2 parameter:06DEC24
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
                                                            if (data["semafoneErrorCode"] == 0 && data["ppErrorCode"] == "" && data["refusalReason"] == "") {
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
                                                                //Added below code for Receipt Text.
                                                                var Id = cardPM.Get("SemaPayId");
                                                                var currentDatePS = SCOUIMethods.SCGetCurrentTime(Id);
                                                                var currentDate = currentDatePS.GetChild(0).GetProperty("currentTime");
                                                                var splitDate = currentDate.split(' ');
                                                                var onlyDate = splitDate[0];
                                                                var onlyTime = splitDate[1];
                                                                var sEmpID = currentDatePS.GetChild(0).GetProperty("scEmpNum");
                                                                var CreditCardType = data["cardScheme"];
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
                                                                var TransAmount = data["authorisedAmountValue"];
                                                                if (TransAmount != "") {
                                                                    TransAmount = (TransAmount / 100);
                                                                }

                                                                var psInputs1 = TheApplication().NewPropertySet();
                                                                var psOutputs1 = TheApplication().NewPropertySet();
                                                                psInputs1.SetProperty("TxnDate", onlyDate);
                                                                psInputs1.SetProperty("TxnTime", onlyTime);
                                                                psInputs1.SetProperty("CardType", CreditCardType);
                                                                psInputs1.SetProperty("posEntryMode", "KEYED");
                                                                //Hard coded for Sycurio
                                                                psInputs1.SetProperty("CardNumber", data["cardSummary"]);
                                                                psInputs1.SetProperty("AuthCode", data["authCode"]);
                                                                psInputs1.SetProperty("TxnAmount", TransAmount);
                                                                psInputs1.SetProperty("PSPReference", data["ppReference"]);
                                                                psInputs1.SetProperty("ContactName", data["cardHolderName"]);
                                                                psInputs1.SetProperty("Clerk", sEmpID);
                                                                var svc1 = TheApplication().GetService("SC Adyen Payment Service");
                                                                psOutputs1 = svc1.InvokeMethod("GenerateReceiptText", psInputs1, psOutputs1);
                                                                var sPayRecptText = psOutputs1.GetProperty("ReceiptTxt");
                                                                var SemBservice = '',
                                                                    seminPS = '',
                                                                    semoutPS = '';
                                                                seminPS = SiebelApp.S_App.NewPropertySet();
                                                                semoutPS = SiebelApp.S_App.NewPropertySet();
                                                                var Farray = ["SC Customer Receipt Text", "SC Merchant Receipt Text", "SC Pmt Receipt Text"];
                                                                seminPS.SetProperty("FieldsArray", Farray);
                                                                var gvalue = [sPayRecptText, sPayRecptText, sPayRecptText];
                                                                seminPS.SetProperty("ValuesArray", gvalue);
                                                                var semapayId = cardPM.Get("SemaPayId");
                                                                seminPS.SetProperty("BO", "Order Entry");
                                                                seminPS.SetProperty("BC", "Payments");
                                                                seminPS.SetProperty("SearchSpecification", "[Id] = '" + semapayId + "'");
                                                                SemBservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                                                                if (SemBservice)
                                                                    semoutPS = SemBservice.InvokeMethod("Insert", seminPS);

                                                            } else if (data["semafoneErrorCode"] == 0 && (data["ppErrorCode"] != "" || data["responseCode"] == "Refused" || data["refusalReason"] != "")) {
                                                                $("#SC-SRO-manual-cc-voice-payment").modal('hide');
                                                                cardPM.SetProperty("AdyenAccNum", data["ppReference"]);
                                                                cardPM.SetProperty("AdyenppErrorCode", data["ppErrorCode"]);
                                                                cardPM.SetProperty("AdyenppErrorMsg", data["ppErrorMessage"]);
                                                                cardPM.SetProperty("AdyenTypeCode", data["cardScheme"]);
                                                                cardPM.SetProperty("AdyenCardSummary", data["cardSummary"]);
                                                                cardPM.SetProperty("AdyenRefusalReason", data["refusalReason"]);
                                                                cardPM.SetProperty("AdyenTransAmount", data["authorisedAmountValue"]);
                                                                cardPM.SetProperty("SemaPhonepayCR", data["semafoneCR"]);
                                                                cardPM.SetProperty("SemaPayId", sPaymentRecordId);
                                                                cardPM.ExecuteMethod("DECLINEPAYMENTADYEN", null, false);
                                                                window.removeEventListener("message", cclistner, false);
                                                                SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                                controls = cardPM.Get("GetControls");
                                                                $("[name=" + controls["Authorize"].GetInputName() + "]").css('display', 'none');
                                                            } else if (data["semafoneErrorCode"] != 0) {
                                                                $("#SC-SRO-manual-cc-voice-payment").modal('hide');
                                                                cardPM.SetProperty("AdyenAccNum", data["ppReference"]);
                                                                cardPM.SetProperty("SemaPayId", sPaymentRecordId);
                                                                cardPM.SetProperty("semafoneErrorMessage", data["semafoneErrorMessage"]);
                                                                cardPM.SetProperty("AdyenCardSummary", data["cardSummary"]);
                                                                cardPM.SetProperty("AdyenTypeCode", data["cardScheme"]);
                                                                cardPM.SetProperty("SemaPhonepayCR", data["semafoneCR"]);
                                                                cardPM.ExecuteMethod("REQFAILPAYMENTADYEN", null, false);
                                                                window.removeEventListener("message", cclistner, false);
                                                                SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                                                controls = cardPM.Get("GetControls");
                                                                $("[name=" + controls["Authorize"].GetInputName() + "]").css('display', 'none');
                                                                alert("We have encountered an issue processing the payment. Please contact a Supervisor/Supervisor on Duty.");

                                                            }
                                                            var Refreshservice = '',
                                                                RefreshinPS = '',
                                                                RefreshoutPS = '';
                                                            RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                                            RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                                            RefreshinPS.SetProperty("Refresh All", "Y");
                                                            Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                                            RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                                            //END:JSHRIKESH:2/9/2024:For Adyen Voice
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
                                } else {
                                    console.log("clicked AUTHORIZE button from CC PR");
                                    PM.OnControlEvent("AUTHORIZE_BUTTON_CLICK");
                                    $("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');
                                }
                            } else {
                                $("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');

                            }
                        }
                        //else
                    });

                //LikhithaK:31Oct2025:Start:Added as part of EP-232
                var PBLFlag = SiebelApp.S_App.GetProfileAttr('PayByLinkFlag');
                var OAppletName = this.GetPM().Get("GetName");
                var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName].GetBusComp();
                var PBLButton = controls["Send Payment Link"];
                var ResendPBLButton = controls["Resend Payment Link"];
                var sAmountCtrl = controls["Transaction Amount"];
                var sEmailCtrl = controls["Email"];
                var sSMSCtrl = controls["SMS"];
                var EmailInpName = sEmailCtrl.GetInputName();
                var SMSInpName = sSMSCtrl.GetInputName();
                var AmountInpName = sAmountCtrl.GetInputName();

                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("change", "input[name='" + AmountInpName + "']",
                    function (evt) {
                        if (PBLFlag == "Y") {
                            var sSMS = paymentBC.GetFieldValue("PBL SMS Flg");
                            var sEmail = paymentBC.GetFieldValue("PBL Email Flg");
                            if (sSMS == "Y" || sEmail == "Y") {
                                var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                    write = false,
                                    sAppName = 'Payment Detail - Credit Card';
                                if (canWrite) {
                                    write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppName].InvokeMethod("WriteRecord");
                                }
                                var sAmount = paymentBC.GetFieldValue("Transaction Amount");


                                if (sAmount == 0) {
                                    alert("Please enter Payment Amount greater than $0.");
                                    paymentBC.SetFieldValue("PBL SMS Flg", "N");
                                    paymentBC.SetFieldValue("PBL Email Flg", "N");
                                    var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                        write = false,
                                        sAppName = 'Payment Detail - Credit Card';
                                    if (canWrite) {
                                        write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppName].InvokeMethod("WriteRecord");
                                    }
                                }
                            }
                        }
                    });
                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("change", "input[name='" + EmailInpName + "'], input[name='" + SMSInpName + "']",
                    function (evt) {
                        if (PBLFlag == "Y") {
                            var $chk = $(evt.target);
                            var isChecked = $(this).prop("checked"); // true/false
                            var label = $(this).attr("aria-label");
                            if (label == "SMS/Text" && isChecked) {
                                var sPhone = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('SC Preferred Contact');
                                if (sPhone == null || sPhone == "") {
                                    alert("Please provide valid Mobile Phone #.");
                                    paymentBC.SetFieldValue("PBL SMS Flg", "N");
                                }
                                var sAmount = paymentBC.GetFieldValue("Transaction Amount");
                                if (sAmount == 0) {
                                    alert("Please enter Payment Amount greater than $0.");
                                    paymentBC.SetFieldValue("PBL SMS Flg", "N");
                                }
                            } else if (label == "Email" && isChecked) {
                                var sEmail = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Primary Bill To Email Address');
                                if (sEmail == null || sEmail == "") {
                                    alert("Please provide valid Email Address.");
                                    paymentBC.SetFieldValue("PBL Email Flg", "N");
                                }
                                var sAmount = paymentBC.GetFieldValue("Transaction Amount");
                                if (sAmount == 0) {
                                    alert("Please enter Payment Amount greater than $0.");
                                    paymentBC.SetFieldValue("PBL Email Flg", "N");
                                }
                            }

                            var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                write = false,
                                sAppName = 'Payment Detail - Credit Card';
                            if (canWrite) {
                                write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppName].InvokeMethod("WriteRecord");
                            }
                            // Check current state
                            var isChecked = $(this).prop("checked"); // true/false

                            if (!isChecked) {
                                // Unchecked → remove outline by blurring
                                setTimeout(function () {
                                    $chk.blur();
                                }, 50);

                            }
                        }
                    }
                );

                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + ResendPBLButton.GetInputName() + "_Ctrl",
                    function (evt) {
                        console.log("Resend Pay By Link button triggered");
                        var maxWaitLimit = 0;
                        var getStatus = setInterval(function () {
                            var sLinkStatus = paymentBC.GetFieldValue("SC Semaphone Capture Status");
                            var sPayStat = paymentBC.GetFieldValue("SC Payment Status");
                            if (sLinkStatus == "Link Resent" || sPayStat != "Entered") {
                                $("#" + ResendPBLButton.GetInputName() + "_Ctrl").addClass('appletButtonDis').css('opacity', '');
                                var Refreshservice = '',
                                    RefreshinPS = '',
                                    RefreshoutPS = '';
                                RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                RefreshinPS.SetProperty("Refresh All", "Y");
                                Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                clearInterval(getStatus);
                            } else {
                                if (maxWaitLimit >= 20) { //2 Min
                                    clearInterval(getStatus);
                                }
                                var applet = SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName];
                                SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName].InvokeMethod("RefreshRecord");
                                maxWaitLimit += 1;
                            }
                        }, 3000);
                    });

                $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + PBLButton.GetInputName() + "_Ctrl",
                    function (evt) {
                        console.log("Pay By Link button triggered");

                        var maxTimeLimit = 0;
                        var linkCheck = setInterval(function () {
                            var sPayLink = paymentBC.GetFieldValue("SC Payment Link");
                            if (sPayLink != "" && sPayLink != null) {
                                clearInterval(linkCheck);
                                var sPaytMethod = paymentBC.GetFieldValue("Payment Method");
                                if (sPaytMethod == "Credit Card") {
                                    $("#" + PBLButton.GetInputName() + "_Ctrl").addClass('appletButtonDis').css({
                                        'opacity': '',
                                        'outline': 'none'
                                    });
                                    $("[name=" + sAmountCtrl.GetInputName() + "]").prop("disabled", true).css({
                                        "color": "#727780",
                                        "background-color": "#dddddd"
                                    });
                                }
                                var maxWaitLimit = 0;
                                var getAccount = setInterval(function () {
                                    var sAccountNumber = paymentBC.GetFieldValue("Account Number");
                                    var sPayStat = paymentBC.GetFieldValue("SC Payment Status");
                                    if (sAccountNumber != "" || sPayStat != "Entered") {
                                        $("#" + PBLButton.GetInputName() + "_Ctrl").addClass('appletButtonDis').css('opacity', '');
                                        var Refreshservice = '',
                                            RefreshinPS = '',
                                            RefreshoutPS = '';
                                        RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshinPS.SetProperty("Refresh All", "Y");
                                        Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                        RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                        clearInterval(getAccount);
                                    } else {
                                        if (maxWaitLimit >= 450) { //15 Min
                                            clearInterval(getAccount);
                                        }
                                        var applet = SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName];
                                        if (applet) {
                                            var bc = applet.GetBusComp();
                                            if (bc && bc.GetFieldValue("Id")) { //record exists
                                                SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName].InvokeMethod("RefreshRecord");
                                            } else {
                                                console.log("No record to refresh");
                                                clearInterval(getAccount);
                                            }
                                        }
                                        maxWaitLimit += 1;
                                    }
                                }, 2000);
                            } else {
                                if (maxTimeLimit >= 5) { //10 sec
                                    clearInterval(linkCheck);
                                    var Refreshservice = '',
                                        RefreshinPS = '',
                                        RefreshoutPS = '';
                                    RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                    RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                    RefreshinPS.SetProperty("Refresh All", "Y");
                                    Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                    RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                }
                                SiebelApp.S_App.GetActiveView().GetAppletMap()[OAppletName].InvokeMethod("RefreshRecord");
                                maxTimeLimit += 1;
                            }
                        }, 2000);
                    });
                //LikhithaK:31Oct2025:End:Added as part of EP-232

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
                    var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
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
                                    var sSycChatFlg = theApplication().GetProfileAttr("SycChatUserFlg");
                                    //LikhithaK:05Sep2024:Bypass Shift4 Link Generation
                                    if (sSycChatFlg != "Y" || theApplication().GetProfileAttr("PayByLinkFlag")!="Y") { //LikhithaK:06Nov2025:EP-232:Added PayByLinkFlag condition to bypass Shift4 flow
                                        //LikhithaK:05Sep2024:Bypass Shift4 Link Generation
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
                            }
                            if (sSycChatFlg != "Y" || theApplication().GetProfileAttr("PayByLinkFlag")!="Y") { //LikhithaK:06Nov2025:EP-232:Added PayByLinkFlag condition to bypass Shift4 flow
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
                        }
                    }, 10);
                } // End..Venkat R for Chat User for Secure Payment
                //Venkat 12/28/2020 Voice User for Secure Payment
                //JSHRIKESH:06Sept2024:Added below condition
                else if ((sVoiceUser == "Y") && (SiebelApp.S_App.GetProfileAttr("SycVoiceUserFlg") != "Y")) {
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
                            var fieldsArray_new = "Id,SC Voice IFrame URL";
                            Input.SetProperty("FieldsArray", fieldsArray_new);
                            var Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                            Output = Custom_Service.InvokeMethod("Query", Input);
                            var Child = Output.GetChild(0);
                            var BS_Data = Child.GetProperty("OutputRecordSet");
                            if (BS_Data != "}") {
                                BS_Data = JSON.parse(BS_Data);
                                sPage = BS_Data["SC Voice IFrame URL"];

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
                }
                //Venkat 12/28/2020 end of Voice User logic for Secure Payment
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
        }());
        return "SiebelAppFacade.PaymentDetailPR";
    });

}




