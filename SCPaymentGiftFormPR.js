/*LIKHITHA: Created for terminal UI changes.*/
if (typeof (SiebelAppFacade.SCPaymentGiftFormPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCPaymentGiftFormPR");
    define("siebel/custom/SelectComfort/SCPaymentGiftFormPR", ["siebel/phyrenderer", "siebel/custom/SelectComfort/bootstrap.min.js", "siebel/custom/SelectComfort/SC_OUI_Methods"],
        function () {
            SiebelAppFacade.SCPaymentGiftFormPR = (function () {

                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

                function SCPaymentGiftFormPR(pm) {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCPaymentGiftFormPR, SiebelAppFacade.PhysicalRenderer);

                SCPaymentGiftFormPR.prototype.Init = function () {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.Init.apply(this, arguments);
                }

                SCPaymentGiftFormPR.prototype.ShowUI = function () {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.ShowUI.apply(this, arguments);

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
                    markup += '<div class="modal fade SC-add-terminals in" id="SC-add-terminal-tile" role="dialog" style="display: none; justify-content: center; align-items: center;">            <div class="modal-dialog">                            <div class="modal-content">                    <div class="modal-header">                                              <div class="header-content">                            <div class="sc-head-title">                                <div class="img-sorce"><img src="images/custom/Adyen_S1E2L.png"></div>                                <p class="no-margin overflow-title" id="TerminalTitle">Select Terminal</p>                                 <button id="SC-save-terminal">Save</button>                            </div>                        </div>                    </div>                    <div class="modal-body">                        <div class="row no-margin">                            <div class="col-md-12 col-lg-12 col-sm-12 sc-add-border">                                <div class="SC-add-terminal">                                                                       <select class="sc-add-input" id="terminal-list" style="pointer-events: all; ">                                            <option class="SC-SO-Option" selected="selected">Select Terminal</option>';

                    markup += '</select>                             </div>                            </div>                        </div>                        <p class="clearfix sc-bg-red" id="sc-terminal-error"></p>                        <div class="SC-table-with-scroll-main" id="SC-storelocation">                    </div>                </div>            </div></div></div>';
                    //SHARATH:End: Added below code for terminal US.
                    markup += '<div class="add-contact" id="SC-terminal-tile" style="display:none">';
                    markup += '<div class="image-block account">';
                    markup += '<img src="images/custom/Adyen_S1E2L.png" class="add-icon">                            </div>';
                    markup += '<span>No Terminal Available</span>';
                    markup += '</div></div></div>';

                    if ($('#applet1 #SC-terminal-offline-popup').length > 0 && $('#applet1 #SC-add-terminal-tile').length > 0) {

                    } else {
                        $('html body').prepend(markup);
                    }
                }

                SCPaymentGiftFormPR.prototype.BindData = function (bRefresh) {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.BindData.apply(this, arguments);
                }

                SCPaymentGiftFormPR.prototype.BindEvents = function () {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.BindEvents.apply(this, arguments);

                    var PM = this.GetPM();
                    var controls = PM.Get("GetControls");
                    var exchangeButton = controls["Authorize"];

                    $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().on("click", "#" + exchangeButton.GetInputName() + "_Ctrl",

                        function (evt) {
                            evt.stopImmediatePropagation();
                            var poleDisplayFlg = SiebelApp.S_App.GetProfileAttr('PoleDisplayOUI');
                            var fitFlag = SiebelApp.S_App.GetProfileAttr('GiftCardFlag');


                            if (fitFlag == "Y") {
                                if (poleDisplayFlg == "N") {
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
                                        SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Gift Card"].InvokeMethod('Authorize');
                                    }
                                }
                            } else {
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Gift Card"].InvokeMethod('Authorize');
                            }

                        });


                    //Start: SHARATH: added below code for terminal US
                    $(document).on('click', '#SC-save-terminal', function (event) {
                        event.stopImmediatePropagation();
                        var terminalSelected = $('#terminal-list').val();
                        if (terminalSelected == "Select Terminal") {
                            $('p.sc-bg-red').text('Select a terminal to proceed.');
                            $('#terminal-list').css('border-color', 'red');

                        } else {
                            var termId = $('#terminal-list option:selected').attr('term-id');
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

                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Gift Card"].InvokeMethod('Authorize');

                        }
                    });

                    $(document).on('click', '#SC-terminal-offline-ok', function () {
                        $('#SC-terminal-offline-popup').css('display', '');
                        $("#SC-terminal-offline-popup").modal('hide');
                        SCOUIMethods.SCnGetDisplayTerminals();
                    });
                }

                SCPaymentGiftFormPR.prototype.EndLife = function () {
                    SiebelAppFacade.SCPaymentGiftFormPR.superclass.EndLife.apply(this, arguments);
                }

                return SCPaymentGiftFormPR;
            }());
            return "SiebelAppFacade.SCPaymentGiftFormPR";
        })
}
