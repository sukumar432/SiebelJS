if (typeof (SiebelAppFacade.SCPaymentCreditFormPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCPaymentCreditFormPR");
    define("siebel/custom/SelectComfort/SCPaymentCreditFormPR", ["siebel/phyrenderer", "siebel/custom/SelectComfort/bootstrap.min.js", "siebel/custom/SelectComfort/SC_OUI_Methods"],
        function () {
            SiebelAppFacade.SCPaymentCreditFormPR = (function () {

                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

                var poleDisplayFlg = SiebelApp.S_App.GetProfileAttr('PoleDisplayOUI');
                var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');

                var IsiPad = SiebelApp.S_App.GetProfileAttr('Device'); //LikhithaK:07Oct2025:Added as part of EP-182
                var PBLFlag = SiebelApp.S_App.GetProfileAttr('PayByLinkFlag'); //LikhithaK:07Oct2025:Added as part of EP-182

                function SCPaymentCreditFormPR(pm) {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCPaymentCreditFormPR, SiebelAppFacade.PhysicalRenderer);

                SCPaymentCreditFormPR.prototype.Init = function () {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.Init.apply(this, arguments);
                }

                SCPaymentCreditFormPR.prototype.ShowUI = function () {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.ShowUI.apply(this, arguments);
                    if (PBLFlag == "Y") {
                        //LikhithaK:18sep2025:Start:EP-189:Profile Att setting expires At & Current UTC timestamp for PBL User story
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
                    //LikhithaK:18sep2025:End:EP-189:Profile Att setting expires At & Current UTC timestamp for PBL User story

                    if (fitFlag == "Y") {
                        var offlinePopup = $('#applet1 #SC-terminal-offline-popup').length;
                        var TerminalTile = $('#applet1 #SC-add-terminal-tile').length;
                        var TerminalMenuItem = $('#applet1 #SC-terminal-tile').length;
                        var offlinePopupParent = $('#applet1 #SC-terminal-offline-popup').parent;

                        var markup = '<div id="applet1">        <div class="container-fluid no-margin no-padding">';

                        markup += '<div class="modal fade SC-SO-add-popup" id="SC-terminal-offline-popup" role="dialog">';
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
                        markup += '<div class="modal fade SC-add-terminals in" id="SC-add-terminal-tile" role="dialog" style="display: none; justify-content: center; align-items: center;">            <div class="modal-dialog">                            <div class="modal-content">                    <div class="modal-header">                                              <div class="header-content">                            <div class="sc-head-title">                                <div class="img-sorce"><img src="images/custom/Adyen_S1E2L.png"></div>                                <p class="no-margin overflow-title" id="TerminalTitle">Select Terminal</p>                                 <button id="SC-save-terminal-CC">Save</button>                            </div>                        </div>                    </div>                    <div class="modal-body">                        <div class="row no-margin">                            <div class="col-md-12 col-lg-12 col-sm-12 sc-add-border">                                <div class="SC-add-terminal">                                                                       <select class="sc-add-input" id="terminal-list" style="pointer-events: all; ">                                            <option class="SC-SO-Option" selected="selected">Select Terminal</option>';

                        markup += '</select>                             </div>                            </div>                        </div>                        <p class="clearfix sc-bg-red" id="sc-terminal-error"></p>                        <div class="SC-table-with-scroll-main" id="SC-storelocation">                    </div>                </div>            </div></div></div>';
                        //SHARATH:End: Added below code for terminal US.

                        markup += '<div class="add-contact" id="SC-terminal-tile" style="display:none">';
                        markup += '<div class="image-block account">';
                        markup += '<img src="images/custom/Adyen_S1E2L.png" class="add-icon">                            </div>';
                        markup += '<span>No Terminal Available</span>';
                        markup += '</div>';

                        markup += '</div></div>';

                        $('#applet1 #SC-add-terminal-tile').remove();
                        $('#applet1 #SC-terminal-offline-popup').remove();
                        $('#applet1 #SC-add-terminal-tile').remove();

                        $('html body').prepend(markup);
                    }


                }

                SCPaymentCreditFormPR.prototype.BindData = function (bRefresh) {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.BindData.apply(this, arguments);
                }

                SCPaymentCreditFormPR.prototype.BindEvents = function () {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.BindEvents.apply(this, arguments);

                    var PM = this.GetPM();
                    var controls = PM.Get("GetControls");
                    var exchangeButton = controls["Authorize"];

                    //LikhithaK:05May2025:SFSTRY0003467
                    var appletName = this.GetPM().Get("GetName");
                    var paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                    var PBLButton = controls["Send Payment Link"];
                    var ResendPBLButton = controls["Resend Payment Link"]; //LikhithaK:30Oct2025:Added as part of EP-238
                    var sAmountCtrl = controls["Transaction Amount"];
                    var sEmailCtrl = controls["Email"];
                    var sSMSCtrl = controls["SMS"];
                    var EmailInpName = sEmailCtrl.GetInputName();
                    var SMSInpName = sSMSCtrl.GetInputName();
                    var AmountInpName = sAmountCtrl.GetInputName();

                    //LikhithaK:07Oct2025:Start:Added as part of EP-182
                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("change", "input[name='" + AmountInpName + "']",
                        function (evt) {
                            if (PBLFlag == "Y") {
                                var sSMS = paymentBC.GetFieldValue("PBL SMS Flg");
                                var sEmail = paymentBC.GetFieldValue("PBL Email Flg");
                                if (sSMS == "Y" || sEmail == "Y") {
                                    var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                        write = false,
                                        sAppName = 'SC Payment Detail - Credit Card - P2PE SRO';
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
                                            sAppName = 'SC Payment Detail - Credit Card - P2PE SRO';
                                        if (canWrite) {
                                            write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppName].InvokeMethod("WriteRecord");
                                        }
                                    }
                                }
                            }
                        });
                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("change", "input[name='" + EmailInpName + "'], input[name='" + SMSInpName + "']",
                        function (evt) {
                            if (IsiPad != 'Tablet' && PBLFlag == "Y") {
                                var $chk = $(evt.target);
                                //LikhithaK:Start:Added as part of EP-225
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
                                //LikhithaK:End:Added as part of EP-225

                                var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                    write = false,
                                    sAppName = 'SC Payment Detail - Credit Card - P2PE SRO';
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

                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on(
                        "click touchend",
                        "div.ui-switch",
                        function (evt) {
                            if (IsiPad == 'Tablet' && PBLFlag == "Y") {
                                var label = $(this).attr("aria-label");
                                //LikhithaK:Start:Added as part of EP-225
                                var isChecked = $(this).attr("aria-checked");

                                if (label == "SMS/Text" && isChecked == "true") {
                                    var sPhone = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('SC Preferred Contact');
                                    if (sPhone == null || sPhone == "") {
                                        alert("Please provide valid Mobile Phone #.");
                                        paymentBC.SetFieldValue("PBL SMS Flg", "N");
                                        isChecked = "false";
                                    }
                                    var sAmount = paymentBC.GetFieldValue("Transaction Amount");
                                    if (sAmount == 0) {
                                        alert("Please enter Payment Amount greater than $0.");
                                        paymentBC.SetFieldValue("PBL SMS Flg", "N");
                                        isChecked = "false";
                                    }
                                } else if (label == "Email" && isChecked == "true") {
                                    var sEmail = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Primary Bill To Email Address');
                                    if (sEmail == null || sEmail == "") {
                                        alert("Please provide valid Email Address.");
                                        paymentBC.SetFieldValue("PBL Email Flg", "N");
                                        isChecked = "false";
                                    }
                                    var sAmount = paymentBC.GetFieldValue("Transaction Amount");
                                    if (sAmount == 0) {
                                        alert("Please enter Payment Amount greater than $0.");
                                        paymentBC.SetFieldValue("PBL Email Flg", "N");
                                        isChecked = "false";
                                    }
                                }
                                //LikhithaK:End:Added as part of EP-225
                                if (label == "SMS/Text" || label == "Email") {
                                    var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                        write = false,
                                        sAppName = 'SC Payment Detail - Credit Card - P2PE SRO';
                                    if (canWrite) {
                                        write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppName].InvokeMethod("WriteRecord");
                                    }
                                }
                                if (isChecked = "false") {
                                    // Unchecked → remove outline by blurring
                                    setTimeout(function () {
                                        document.activeElement.blur();
                                    }, 50);
                                }
                            }
                        }
                    );
                    //LikhithaK:07Oct2025:End:Added as part of EP-182
                    //LikhithaK:30Oct2025:Start:Added as part of EP-238
                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + ResendPBLButton.GetInputName() + "_Ctrl",
                        function (evt) {
                            //evt.stopImmediatePropagation();
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
                                    var applet = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName];
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                    maxWaitLimit += 1;
                                }
                            }, 3000);
                        });
                    //LikhithaK:30Oct2025:End:Added as part of EP-238
                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + PBLButton.GetInputName() + "_Ctrl",
                        function (evt) {
                            //evt.stopImmediatePropagation();
                            console.log("Pay By Link button triggered");

                            var oBO = SiebelApp.S_App.GetActiveBusObj().GetName();
                            var sOrderId = "";
                            if (oBO == "Order Entry") {
                                if (SiebelApp.S_App.GetActiveView().GetAppletMap().hasOwnProperty("SC Payment Detail - Credit Card - P2PE SRO"))
                                    var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
                            }
                            sOrderId = orderBC.GetFieldValue("Id");
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
                                            var applet = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName];
                                            if (applet) {
                                                var bc = applet.GetBusComp();
                                                if (bc && bc.GetFieldValue("Id")) { //record exists
                                                    SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
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
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                    maxTimeLimit += 1;
                                }
                            }, 2000);
                        });
                    //LikhithaK:05May2025:SFSTRY0003467

                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + exchangeButton.GetInputName() + "_Ctrl",

                        function (evt) {
                            evt.stopImmediatePropagation();
                            var ActiveViewNm = SiebelApp.S_App.GetActiveView().GetName();
                            var canInvoke = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].CanInvokeMethod('P2PEAuthorize');
                            if (ActiveViewNm == "Order Entry - Payment View") {
                                var poleDisplayFlg = SiebelApp.S_App.GetProfileAttr('PoleDisplayOUI');
                                var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');



                                if (fitFlag == "Y") {
                                    if (poleDisplayFlg == "N") {
                                        //LikhithaK:EP-21:Start:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
                                        var sIPadOrder = SiebelApp.S_App.GetProfileAttr('Device');
                                        var sPoleConfBypass = localStorage.getItem('PoleDisplayConfBypass');
                                        if (sPoleConfBypass == "Y" && sIPadOrder == 'Tablet') {
                                            localStorage.setItem("PoleDisplayConfBypass", "N");
                                        }
                                        //LikhithaK:EP-21:End:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
                                        SCOUIMethods.SCnGetDisplayTerminals();
                                    } else {
                                        var inPS = SiebelApp.S_App.NewPropertySet();
                                        var outPS = SiebelApp.S_App.NewPropertySet();
                                        var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
                                        var OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');

                                        inPS.SetProperty('Order Number', OrderNum);

                                        if (Bservice) {
                                            outPS = Bservice.InvokeMethod("GetTerminalId", inPS);
                                        }
                                        var termId = outPS.GetChild(0).GetProperty('TerminalId');
                                        SiebelJS.Log("termId: " + termId);
                                        if (termId == "") {

                                            $('#SC-terminal-tile').css('display', 'none');
                                            $("#SC-terminal-offline-popup").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-terminal-offline-popup").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                            $(".modal-backdrop").css('background', '#ffffff');

                                            //SC_OUI_Methods.ResetTerminalProfileAttrib();

                                        } else {
                                            setTimeout(() => {
                                                var canInvoke = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].CanInvokeMethod('P2PEAuthorize');
                                                if (canInvoke)
                                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].InvokeMethod('P2PEAuthorize');
                                            }, 200);
                                        }
                                    }
                                } else {
                                    setTimeout(() => {
                                        var canInvoke = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].CanInvokeMethod('P2PEAuthorize');
                                        if (canInvoke)
                                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].InvokeMethod('P2PEAuthorize');
                                    }, 200);

                                }
                            } else {
                                if (canInvoke)
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].InvokeMethod('P2PEAuthorize');
                            }

                            //LikhithaK:Start:EP-21:PartialAuth popup iPad Service Orders

                            var sIPadOrder = SiebelApp.S_App.GetProfileAttr('Device');
                            if (sIPadOrder == 'Tablet') {
                                var canWrite = PM.ExecuteMethod("CanInvokeMethod", "WriteRecord"),
                                    write = false,
                                    sAppletName = 'SC Payment Detail - Credit Card - P2PE SRO';
                                if (canWrite) {
                                    write = SiebelApp.S_App.GetActiveView().GetAppletMap()[sAppletName].InvokeMethod("WriteRecord");
                                }
                                var maxTimeLimit = 0;
                                var AuthCheck = setInterval(function () {
                                    var sPayStatus = paymentBC.GetFieldValue("SC Payment Status");
                                    if (sPayStatus != "Entered") {

                                        var CCPartialAuthAmt = SiebelApp.S_App.GetProfileAttr('CCPartialAuthAmt');
                                        if (CCPartialAuthAmt != "" && CCPartialAuthAmt != null) {
                                            alert("Authorized for an amount other than requested amount,  Authorized Amount:  $" + CCPartialAuthAmt);
                                        }
                                        var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
                                        var sinPS = SiebelApp.S_App.NewPropertySet();
                                        var soutPS = SiebelApp.S_App.NewPropertySet();
                                        sinPS.SetProperty('Name', 'CCPartialAuthAmt');
                                        sinPS.SetProperty('Value', '');
                                        if (sBservice) {
                                            soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
                                        }

                                        var Refreshservice = '',
                                            RefreshinPS = '',
                                            RefreshoutPS = '';
                                        RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                        RefreshinPS.SetProperty("Refresh All", "Y");
                                        Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                        RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);

                                        clearInterval(AuthCheck);
                                    } else {
                                        if (maxTimeLimit >= 40) { //120 sec
                                            clearInterval(AuthCheck);
                                            var Refreshservice = '',
                                                RefreshinPS = '',
                                                RefreshoutPS = '';
                                            RefreshinPS = SiebelApp.S_App.NewPropertySet();
                                            RefreshoutPS = SiebelApp.S_App.NewPropertySet();
                                            RefreshinPS.SetProperty("Refresh All", "Y");
                                            Refreshservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");
                                            RefreshoutPS = Refreshservice.InvokeMethod("RefreshCurrentApplet", RefreshinPS);
                                        }
                                        SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].InvokeMethod("RefreshRecord");
                                        maxTimeLimit += 1;
                                    }
                                }, 3000);
                            }
                            //LikhithaK:End:EP-21:PartialAuth popup iPad Service Orders

                        });


                    //Start: SHARATH: added below code for terminal US
                    $(document).on('click', '#SC-save-terminal-CC', function (event) {
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

                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var outPS = SiebelApp.S_App.NewPropertySet();
                            var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
                            var OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');
                            inPS.SetProperty('Order Number', OrderNum);
                            inPS.SetProperty('Terminal Id', termId);
                            inPS.SetProperty('Terminal Name', termNm);

                            if (Bservice) {
                                outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS);
                            }

                            var Ctrl = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetControls()['Terminal Name'];

                            SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetPModel().ExecuteMethod("SetFormattedValue", Ctrl, termNm);

                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var outPS = SiebelApp.S_App.NewPropertySet();
                            var Bservice = SiebelApp.S_App.GetService("FINS Teller UI Navigation");

                            inPS.SetProperty('RefreshAll', 'Y');

                            if (Bservice) {
                                outPS = Bservice.InvokeMethod("RefreshCurrentApplet", inPS);
                            }

                            setTimeout(() => {
                                window.SCInactivityTimeService.CallSCInactivity();
                                var canInvoke = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].CanInvokeMethod('P2PEAuthorize');
                                if (canInvoke)
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - P2PE SRO"].InvokeMethod('P2PEAuthorize');
                            }, 200);
                        }

                    });

                    $(document).on('click', '#SC-terminal-offline-ok', function () {
                        $('#SC-terminal-offline-popup').css('display', '');
                        $("#SC-terminal-offline-popup").modal('hide');
                        //LikhithaK:EP-21:Start:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
                        var sIPadOrder = SiebelApp.S_App.GetProfileAttr('Device');
                        var sPoleConfBypass = localStorage.getItem('PoleDisplayConfBypass');
                        if (sPoleConfBypass == "Y" && sIPadOrder == 'Tablet') {
                            localStorage.setItem("PoleDisplayConfBypass", "N");
                        }
                        //LikhithaK:EP-21:End:Resetting local storage variable PoleDisplayConfBypass for iPad service orders
                        SCOUIMethods.SCnGetDisplayTerminals();
                    });
                }

                SCPaymentCreditFormPR.prototype.EndLife = function () {
                    SiebelAppFacade.SCPaymentCreditFormPR.superclass.EndLife.apply(this, arguments);
                }



                return SCPaymentCreditFormPR;
            }());
            return "SiebelAppFacade.SCPaymentCreditFormPR";
        })

}