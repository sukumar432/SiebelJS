if (typeof (SiebelAppFacade.SCSROOrderEntryLineItemsPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCSROOrderEntryLineItemsPR");
    define("siebel/custom/SCSROOrderEntryLineItemsPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods"],
        function () {
            SiebelAppFacade.SCSROOrderEntryLineItemsPR = (function () {
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
                var siebConsts = SiebelJS.Dependency("SiebelApp.Constants");
                var poleDisplayFlag = "N",
                    orderHeaderBC;
                var poleTaxTotal = 0.00,
                    ItesmDiscount = 0.00;
                var subTotal, totalDiscounts, orderTotal, taxTotal;
                var recordDeleted = "N";
                var activeViewName = "";
                var sP2PEFlag = "";
                var controls, sInvokePoleDisplay = "";
                var FeatureFlag = "";
                // VAMSI:08-OCT-18: Modified the below conditions to Support P2PE pole Display.
                sP2PEFlag = SiebelApp.S_App.GetProfileAttr('P2PEFlag');
                FeatureFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');

                function SCSROOrderEntryLineItemsPR(pm) {
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCSROOrderEntryLineItemsPR, SiebelAppFacade.JQGridRenderer);

                SCSROOrderEntryLineItemsPR.prototype.Init = function () {
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.Init.apply(this, arguments);
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCSROOrderEntryLineItemsPR:      Init method reached.");
                    activeViewName = SiebelApp.S_App.GetActiveView().GetName();
                    if (activeViewName == "Order Entry - Line Items Detail View") {
                        orderHeaderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()['SC Order Entry - Line Item List Applet'].GetBusComp().GetParentBusComp();
                        //orderHeaderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
                    }
                    sInvokePoleDisplay = "N";
                }

                SCSROOrderEntryLineItemsPR.prototype.ShowUI = function () {
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCSROOrderEntryLineItemsPR:      ShowUI method reached.");
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.ShowUI.apply(this, arguments);
                    $(".whitescreentimer").remove();
                    $("#custommaskoverlay").hide();
                    $("#_swescrnbar").show();
                    $("#_swethreadbar").show();
                    $("#_sweappmenu").show();
                    $("#s_vctrl_div").show();
                    $(".siebui-button-toolbar").show();
                    $("#_sweview").show();
                    controls = this.GetPM().Get("GetControls");
                    //controls["NRC CxTotal"]
                    if (activeViewName == "Order Entry - Line Items Detail View") {
                        var storeuser = SiebelApp.S_App.GetProfileAttr("SC Store User");
                        var storenumber = SiebelApp.S_App.GetProfileAttr("SCStoreName");
                        //storenumber="10540";

                        //LIKHITHA:Added below code for Terminal UI.
                        if (FeatureFlag == "Y")
                            storenumber = JSON.parse(localStorage.ProfileAttr)['SC Store Number'];

                        if (storeuser == "Y" && storenumber != "" && storenumber != undefined) {
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
                            markup += '<div class="modal fade SC-add-terminals in" id="SC-add-terminal-tile" role="dialog" style="display: none; justify-content: center; align-items: center;">            <div class="modal-dialog">                            <div class="modal-content">                    <div class="modal-header">                                              <div class="header-content">                            <div class="sc-head-title">                                <div class="img-sorce"><img src="images/custom/Adyen_S1E2L.png"></div>                                <p class="no-margin overflow-title" id="TerminalTitle">Select Terminal</p>                                 <button id="SC-save-terminal">Save</button>                            </div>                        </div>                    </div>                    <div class="modal-body">                        <div class="row no-margin">                            <div class="col-md-12 col-lg-12 col-sm-12 sc-add-border">                                <div class="SC-add-terminal">                                                                       <select class="sc-add-input" id="terminal-list" style="pointer-events: all; ">                                            <option class="SC-SO-Option" selected="selected">Select Terminal</option>';

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

                    }
                }

                SCSROOrderEntryLineItemsPR.prototype.BindData = function (bRefresh) {
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCSROOrderEntryLineItemsPR:      BindData method reached.");
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.BindData.apply(this, arguments);
                }

                SCSROOrderEntryLineItemsPR.prototype.BindEvents = function () {
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCSROOrderEntryLineItemsPR:      BindEvents method reached.");
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.BindEvents.apply(this, arguments);
                    //Likhitha added below for Terminal UI offline changes.
                    this.GetPM().AttachPreProxyExecuteBinding("PostChanges", function (methodName, inputPS, outputPS) {

                        if (FeatureFlag == "Y" && poleDisplayFlag == "Y") {
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

                            }
                        }
                    });

                    $(document).on('click', '#SC-terminal-offline-ok', function () {
                        $('#SC-terminal-offline-popup').css('display', '');
                        $("#SC-terminal-offline-popup").modal('hide');
                        SCOUIMethods.SCnGetDisplayTerminals();
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

                            var CallverifydisposalSKUinSave = SiebelApp.S_App.GetProfileAttr('CallverifydisposalSKUinSave');
                            invokePoleDisplayforlineItem();
                            if (CallverifydisposalSKUinSave == "Y") {
                                var lineBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();
                                verifydisposalSKU(lineBC);
                            }

                            var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
                            var sinPS = SiebelApp.S_App.NewPropertySet();
                            var soutPS = SiebelApp.S_App.NewPropertySet();
                            sinPS.SetProperty('Name', 'CallverifydisposalSKUinSave');
                            sinPS.SetProperty('Value', 'N');
                            if (sBservice) {
                                soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
                            }
                            setTimeout(() => {
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].InvokeMethod("RefreshRecord");
                            }, 100);

                        }
						window.SCInactivityTimeService.CallSCInactivity();
                    });

                    this.GetPM().AttachPostProxyExecuteBinding("PostChanges", function (methodName, inputPS, outputPS) {

                        sInvokePoleDisplay = "N";

                        //LIKHITHA: Added below codition for terminal UI.
                        var inPS = SiebelApp.S_App.NewPropertySet();
                        var outPS = SiebelApp.S_App.NewPropertySet();
                        var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
                        var OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');

                        inPS.SetProperty('Order Number', OrderNum);

                        if (Bservice) {
                            outPS = Bservice.InvokeMethod("GetTerminalId", inPS);
                        }
                        var TermId = outPS.GetChild(0).GetProperty('TerminalId');

                        if ((FeatureFlag == "Y" && poleDisplayFlag == "Y" && TermId != "") || (FeatureFlag != "Y")) {
                            invokePoleDisplayforlineItem();
                        } else


                        if (methodName == "PostChanges" && inputPS.propArray.hasOwnProperty("SWEPOC") && inputPS.propArray["SWEPOC"] == "Cancel Reason") {
                            var lineBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();
                            var sCancelRsn = lineBC.GetFieldValue("Cancel Reason");
                            if (sCancelRsn != "" && lineBC.GetFieldValue("SC Line Type") != "Product Owned") {

                                if (FeatureFlag == "Y" && poleDisplayFlag == "Y" && TermId == "") {
                                    var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
                                    var sinPS = SiebelApp.S_App.NewPropertySet();
                                    var soutPS = SiebelApp.S_App.NewPropertySet();
                                    sinPS.SetProperty('Name', 'CallverifydisposalSKUinSave');
                                    sinPS.SetProperty('Value', 'Y');
                                    if (sBservice) {
                                        soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
                                    }
                                } else
                                    verifydisposalSKU(lineBC);
                            }
                        }
                    });
                    this.GetPM().AttachPostProxyExecuteBinding("UndoRecord", function (methodName, inputPS, outputPS) {
                        sInvokePoleDisplay = "N";
                    });
                    this.GetPM().AttachEventHandler(siebConsts.get("PHYEVENT_INVOKE_PICK"),
                        function (control) {
                            var controlName = control.GetName();
                            if (controlName == "Product" || controlName == "Asset Number")
                                sInvokePoleDisplay = "Y";
                            return (true);
                        });
                    this.GetPM().AttachPMBinding("FieldChange", function (control, field_value) {
                        var ctrlname = control.GetName();
                        if (ctrlname == "Product" && sInvokePoleDisplay == "Y") {
                            sInvokePoleDisplay = "N";
                            invokePoleDisplayforlineItem();
                        }
                    });
                    /*this.GetPM().AttachEventHandler(siebConsts.get("PHYEVENT_COLUMN_BLUR"), 
          function (rowIndex, control, value) {
            var controlName = control.GetName();
            if(controlName == "Product"){
                if(poleDisplayFlag=="Y"){
                    localStorage.setItem("InvokepoleDisplay","Y");
                    var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Item List Applet"].GetBusComp();
                    var NRCSubtotal;
                    var Quantity = orderBC.GetFieldValue("Quantity Requested");
                    var ProductDesc = orderBC.GetFieldValue("SC Calc Long Description");
                    var LineType = orderBC.GetFieldValue("SC Line Type");
                    if(LineType == "Product Owned"){
                        NRCSubtotal = orderBC.GetFieldValue("SC Line Total");
                    }else{
                        NRCSubtotal = orderBC.GetFieldValue("SC SRO NRC CxTotal - Display");
                    }
                    NRCSubtotal = NRCSubtotal!=""?parseFloat(NRCSubtotal):0.00;
                    if(NRCSubtotal < 0){
                        NRCSubtotal = 0 - NRCSubtotal;
                        NRCSubtotal = "("+NRCSubtotal+")";
                    }
                    if(sP2PEFlag == "Y"){
                        var lineItems = [ProductDesc,"QTY:"+Quantity+"	"+"PRICE:$"+NRCSubtotal]
                        SCOUIMethods.ClearP2PEPoleDisplay(OrderId);
                        SCOUIMethods.P2PEDispalyMultiLineItems(OrderId,lineItems);
                    }else{
                        poleDisplay(ProductDesc,Quantity,NRCSubtotal);
                    }
                 }
                 else{
                    localStorage.setItem("InvokepoleDisplay","N");
                 }
             }
            return (true);
          });*/

                    this.GetPM().AttachPreProxyExecuteBinding("DeleteRecord", function (methodName, inputPS, outputPS) {
                        if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
                            var poleInfo, Operation;
                            poleInfo = {};
                            Operation = "DeleteLineItem";
                            localStorage.setItem("InvokepoleDisplay", "Y");
                            poleDisplay2(poleInfo, Operation);
                        } else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
                            var OrderId = orderHeaderBC.GetFieldValue("Id");
                            SCOUIMethods.ClearP2PEPoleDisplay(OrderId);
                        } else {
                            localStorage.setItem("InvokepoleDisplay", "N");
                        }
                        recordDeleted = "Y";
                        sInvokePoleDisplay = "N";
                    });

                    //SPATIBAN:JUNE2019:Added logic to trigger UPT 
                    this.GetPM().AttachPostProxyExecuteBinding("SCWarrantySimplication", function (methodName, inputPS, outputPS) {
                        if (localStorage.getItem("EnableUPT") == "Y")
                            SCOUIMethods.SCInvokeUPT("SCWarrantySimplicationEnd");
                    });
                    this.GetPM().AttachPostProxyExecuteBinding("SC Calculate Shipping", function (methodName, inputPS, outputPS) {
                        //SPATIBAN:JUNE2019:Added logic to trigger UPT
                        if (localStorage.getItem("EnableUPT") == "Y")
                            SCOUIMethods.SCInvokeUPT("SC Calculate ShippingEnd");
                        if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
                            var poleJSON = [];
                            var subpoleJSON = [];
                            var ProductTypeCode = SCOUIMethods.GetLOVs2("[Type]= 'PROD_CD' and [Active] = 'Y' and [Name]='Promotion'", "");
                            var OrderId = orderHeaderBC.GetFieldValue("Id");
                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var outPS = SiebelApp.S_App.NewPropertySet();
                            var service = SiebelApp.S_App.GetService("SC SRO Get Line Items");
                            inPS.SetProperty("OrderId", OrderId);
                            outPS = service.InvokeMethod("Query", inPS);
                            var lineItems = outPS.GetChild(0);
                            for (var i = 0; i < lineItems.GetChildCount(); i++) {
                                var NRCSubTotal = lineItems.GetChild(i).GetProperty("NRC Sub Total") != "" ? parseFloat(lineItems.GetChild(i).GetProperty("NRC Sub Total")) : 0.00;
                                var TaxAmount = lineItems.GetChild(i).GetProperty("Tax Amount") != "" ? parseFloat(lineItems.GetChild(i).GetProperty("Tax Amount")) : 0.00;
                                var Price = NRCSubTotal + TaxAmount;
                                Price = Price.toFixed(2);
                                if (lineItems.GetChild(i).GetProperty("SC Line Type") == "Product Owned") {
                                    Price = 0 - Price;
                                }
                                if (Price < 0) {
                                    Price = 0 - Price;
                                    Price = Price != "" ? parseFloat(Price).toFixed(2) : 0.00;
                                    Price = "(" + Price + ")";
                                } else {
                                    Price = Price != "" ? parseFloat(Price).toFixed(2) : 0.00;
                                }

                                if (lineItems.GetChild(i).GetProperty("Request To Cancel") != "Y" && lineItems.GetChild(i).GetProperty("Product Type Code") != ProductTypeCode) {
                                    if (lineItems.GetChild(i).GetProperty("Product Line") != "DELIVERY") {
                                        poleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetProperty("Quantity Requested"),
                                            "Price": Price
                                        });
                                    } else {
                                        subpoleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetProperty("Quantity Requested"),
                                            "Price": Price
                                        });
                                    }
                                    for (var j = 0; j < lineItems.GetChild(i).GetChildCount(); j++) {
                                        var cNRCSubTotal = lineItems.GetChild(i).GetChild(j).GetProperty("NRC Sub Total") != "" ? parseFloat(lineItems.GetChild(i).GetChild(j).GetProperty("NRC Sub Total")) : 0.00;
                                        var cTotalTax = lineItems.GetChild(i).GetChild(j).GetProperty("Tax Amount") != "" ? parseFloat(lineItems.GetChild(i).GetChild(j).GetProperty("Tax Amount")) : 0.00;
                                        var cPrice = cNRCSubTotal + cPrice;
                                        cPrice = cPrice.toFixed(2);
                                        poleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetChild(j).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetChild(j).GetProperty("Quantity Requested"),
                                            "Price": cPrice
                                        });
                                    }
                                }
                            }

                            for (var p = 0; p < subpoleJSON.length; p++) {
                                poleJSON.push({
                                    "Command": "Ready",
                                    "ProductDesc": subpoleJSON[p]["ProductDesc"],
                                    "Quantity": subpoleJSON[p]["Quantity"],
                                    "Price": subpoleJSON[p]["Price"]
                                });
                            }
                            poleDisplay2(poleJSON, "LineDetails");
                        } else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
                            var poleJSON = [];
                            var subpoleJSON = [];
                            var ProductTypeCode = SCOUIMethods.GetLOVs2("[Type]= 'PROD_CD' and [Active] = 'Y' and [Name]='Promotion'", "");
                            var OrderId = orderHeaderBC.GetFieldValue("Id");
                            var inPS = SiebelApp.S_App.NewPropertySet();
                            var outPS = SiebelApp.S_App.NewPropertySet();
                            var service = SiebelApp.S_App.GetService("SC SRO Get Line Items");
                            inPS.SetProperty("OrderId", OrderId);
                            outPS = service.InvokeMethod("Query", inPS);
                            var lineItems = outPS.GetChild(0);
                            for (var i = 0; i < lineItems.GetChildCount(); i++) {
                                var NRCSubTotal = lineItems.GetChild(i).GetProperty("NRC Sub Total") != "" ? parseFloat(lineItems.GetChild(i).GetProperty("NRC Sub Total")) : 0.00;
                                var TaxAmount = lineItems.GetChild(i).GetProperty("Tax Amount") != "" ? parseFloat(lineItems.GetChild(i).GetProperty("Tax Amount")) : 0.00;
                                var Price = NRCSubTotal + TaxAmount;
                                Price = Price.toFixed(2);

                                if (lineItems.GetChild(i).GetProperty("SC Line Type") == "Product Owned") {
                                    Price = 0 - Price;
                                }

                                if (Price < 0) {
                                    Price = 0 - Price;
                                    Price = Price != "" ? parseFloat(Price).toFixed(2) : 0.00;
                                    Price = "(" + Price + ")";
                                } else {
                                    Price = Price != "" ? parseFloat(Price).toFixed(2) : 0.00;
                                }

                                if (lineItems.GetChild(i).GetProperty("Request To Cancel") != "Y" && lineItems.GetChild(i).GetProperty("Product Type Code") != ProductTypeCode) {
                                    if (lineItems.GetChild(i).GetProperty("Product Line") != "DELIVERY") {
                                        poleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetProperty("Quantity Requested"),
                                            "Price": Price
                                        });
                                    } else {
                                        subpoleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetProperty("Quantity Requested"),
                                            "Price": Price
                                        });
                                    }
                                    for (var j = 0; j < lineItems.GetChild(i).GetChildCount(); j++) {
                                        var cNRCSubTotal = lineItems.GetChild(i).GetChild(j).GetProperty("NRC Sub Total") != "" ? parseFloat(lineItems.GetChild(i).GetChild(j).GetProperty("NRC Sub Total")) : 0.00;
                                        var cTotalTax = lineItems.GetChild(i).GetChild(j).GetProperty("Tax Amount") != "" ? parseFloat(lineItems.GetChild(i).GetChild(j).GetProperty("Tax Amount")) : 0.00;
                                        var cPrice = cNRCSubTotal + cPrice;
                                        cPrice = cPrice.toFixed(2);
                                        poleJSON.push({
                                            "Command": "Ready",
                                            "ProductDesc": lineItems.GetChild(i).GetChild(j).GetProperty("SC Calc Long Description"),
                                            "Quantity": lineItems.GetChild(i).GetChild(j).GetProperty("Quantity Requested"),
                                            "Price": cPrice
                                        });
                                    }
                                }
                            }
                            /*for(var p=0;p<subpoleJSON.length;p++){
                                poleJSON.push({ 
                                    "Command" : "Ready",
                                    "ProductDesc"  :subpoleJSON[p]["ProductDesc"],
                                    "Quantity"     : subpoleJSON[p]["Quantity"],
                                    "Price"       : subpoleJSON[p]["Price"]
                                });	
                            }*/
                            SCOUIMethods.ClearP2PEPoleDisplay(OrderId);
                            SCOUIMethods.SROLineDetailsP2PEDisplay(OrderId, poleJSON, subpoleJSON);
                        } else {
                            localStorage.setItem("InvokepoleDisplay", "N");
                        }
                        sInvokePoleDisplay = "N";
                    });
                    var sOrderId = this.GetPM().Get("GetBusComp").GetParentBusComp().GetFieldValue("Id");
                    $("#SC-disposal-item-yes-button").click(function () {
                        $("#SC-SO-Cancel-item-disposal").modal("hide");
                    });
                    $("#SC-disposal-item-no-button").click(function () {
                        $("#SC-SO-Cancel-item-disposal").modal("hide");
                        $("#SC-SO-Cancel-item-disposal2").modal({
                            backdrop: 'static'
                        });
                        $(".modal-backdrop").css('background', '#ffffff');
                        $("#SC-SO-Cancel-item-disposal2").css({
                            "display": "flex",
                            "justify-content": "center",
                            "align-items": "center"
                        });
                    });
                    $("#SC-disposal-item-no-button2").click(function () {
                        $("#SC-SO-Cancel-item-disposal2").modal("hide");
                    });

                    $("#SC-disposal-item-yes-button2").click(function () {
                        var canlineId = $('#SC-SO-Cancel-item-disposal-text').text(),
                            srcspec = "";

                        $("#SC-SO-Cancel-item-disposal2").modal("hide");
                        SiebelApp.S_App.uiStatus.Busy({
                            target: SiebelApp.S_App.GetTargetViewContainer(),
                            mask: true
                        });
                        setTimeout(function () {
                            canlineId = canlineId.split("___");
                            var ResArray = new Array,
                                jsonRes;
                            ResArray = canlineId[0].split(";");
                            for (var k = 0; k < ResArray.length; k++) {
                                jsonRes = JSON.parse(ResArray[k]);
                                srcspec += "[Id]='" + jsonRes["Id"] + "'";
                                if (ResArray.length != k + 1)
                                    srcspec += " OR ";
                            }
                            var fieldvalues, fieldnames, inPS, outPS, Bservice;
                            fieldvalues = canlineId[1];
                            fieldnames = "Cancel Reason";
                            srcspec = "(" + srcspec + ") AND [Order Header Id] = '" + sOrderId + "'";
                            inPS = SiebelApp.S_App.NewPropertySet();
                            outPS = SiebelApp.S_App.NewPropertySet();
                            inPS.SetProperty("BO", "Order Entry (Sales)");
                            inPS.SetProperty("BC", "Order Entry - Line Items");
                            inPS.SetProperty("FieldsArray", fieldnames);
                            inPS.SetProperty("ValuesArray", fieldvalues);
                            inPS.SetProperty("SearchSpecification", srcspec);
                            Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
                            outPS = Bservice.InvokeMethod("Insert", inPS);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetPModel().ExecuteMethod("InvokeMethod", "NewQuery", null, false);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetPModel().ExecuteMethod("InvokeMethod", "ExecuteQuery", null, false);
                            SiebelApp.S_App.uiStatus.Free();
                        }, 1000);
                    });

                }

                SCSROOrderEntryLineItemsPR.prototype.EndLife = function () {
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCSROOrderEntryLineItemsPR:      EndLife method reached.");
                    SiebelAppFacade.SCSROOrderEntryLineItemsPR.superclass.EndLife.apply(this, arguments);
                
                }

                function verifydisposalSKU(lineBC) {
                    var Custom_Service = "",
                        Input_BS = "",
                        Out_BS = "",
                        searchfields = "",
                        sOrderId;
                    var sCancelRsn = lineBC.GetFieldValue("Cancel Reason");
                    Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                    Input_BS = SiebelApp.S_App.NewPropertySet();
                    Out_BS = SiebelApp.S_App.NewPropertySet();
                    sOrderId = lineBC.GetParentBusComp().GetFieldValue("Id");
                    searchfields = "Product Line";
                    Input_BS.SetProperty("BO", "Order Entry (Sales)");
                    Input_BS.SetProperty("BC", "Order Entry - Line Items");
                    Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Id]='" + lineBC.GetFieldValue("Id") + "'");
                    Input_BS.SetProperty("SortSpecification", "");
                    Input_BS.SetProperty("ReqNoOfRecords", "");
                    Input_BS.SetProperty("FieldsArray", searchfields);
                    Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
                    var Child_BS = Out_BS.GetChild(0);
                    var BS_Data = Child_BS.GetProperty("OutputRecordSet");
                    if (BS_Data != "}") {
                        BS_Data = JSON.parse(BS_Data);
                        if (BS_Data["Product Line"] == "MATTRESS") {
                            Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                            Input_BS = SiebelApp.S_App.NewPropertySet();
                            Out_BS = SiebelApp.S_App.NewPropertySet();
                            searchfields = "Id";
                            Input_BS.SetProperty("BO", "Order Entry (Sales)");
                            Input_BS.SetProperty("BC", "Order Entry - Line Items");
                            Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Parent Order Item Id] IS NULL AND [SC Cancel Reason Calc]='N' AND [Part Number]='DISPOSAL' AND [Request To Cancel]='N' AND  [Fulfillment Status Code]<>'In Progress'");
                            Input_BS.SetProperty("SortSpecification", "Created (DESCENDING)");
                            Input_BS.SetProperty("ReqNoOfRecords", "");
                            Input_BS.SetProperty("FieldsArray", searchfields);
                            Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
                            var Child_BS = Out_BS.GetChild(0);
                            var BS_Data = Child_BS.GetProperty("OutputRecordSet");
                            if (BS_Data != "}") {
                                sCancelRsn = BS_Data + "___" + sCancelRsn;
                                $('#SC-SO-Cancel-item-disposal-text').text(sCancelRsn);
                                $("#SC-SO-Cancel-item-disposal").modal({
                                    backdrop: 'static'
                                });
                                $(".modal-backdrop").css('background', '#ffffff');
                                $("#SC-SO-Cancel-item-disposal").css({
                                    "display": "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                });
                                SiebelApp.S_App.uiStatus.Free();
                            }
                        }
                        SiebelApp.S_App.uiStatus.Free();
                    }
                    SiebelApp.S_App.uiStatus.Free();
                }
				
				
				
                function invokePoleDisplayforlineItem() {
                    if (activeViewName == "Order Entry - Line Items Detail View") {
                        if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
                            localStorage.setItem("InvokepoleDisplay", "Y");
                            var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Item List Applet"].GetBusComp();
                            var NRCSubtotal;
                            var Quantity = orderBC.GetFieldValue("Quantity Requested");
                            var ProductDesc = orderBC.GetFieldValue("SC Calc Long Description");
                            var LineType = orderBC.GetFieldValue("SC Line Type");
                            if (LineType == "Product Owned") {
                                NRCSubtotal = orderBC.GetFieldValue("SC Line Total");
                            } else {
                                NRCSubtotal = orderBC.GetFieldValue("SC SRO NRC CxTotal - Display");
                            }
                            NRCSubtotal = NRCSubtotal != "" ? parseFloat(NRCSubtotal) : 0.00;
                            if (NRCSubtotal < 0) {
                                NRCSubtotal = 0 - NRCSubtotal;
                                NRCSubtotal = "$(" + NRCSubtotal + ")";
                            }
                            poleDisplay(ProductDesc, Quantity, NRCSubtotal);
                        } else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
                            localStorage.setItem("InvokepoleDisplay", "Y");
                            var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Item List Applet"].GetBusComp();
                             setTimeout(() => {                          
                            var NRCSubtotal;
                            var Quantity = orderBC.GetFieldValue("Quantity Requested");
                            var OrderId = orderHeaderBC.GetFieldValue("Id");
                            var ProductDesc = orderBC.GetFieldValue("SC Calc Long Description");
                            var LineType = orderBC.GetFieldValue("SC Line Type");
                            
                            if (LineType == "Product Owned") {
                                NRCSubtotal = orderBC.GetFieldValue("SC Line Total");
                            } else {
                                NRCSubtotal = orderBC.GetFieldValue("SC SRO NRC CxTotal - Display");
                            }
                            NRCSubtotal = NRCSubtotal != "" ? parseFloat(NRCSubtotal) : 0.00;
                            if (NRCSubtotal < 0) {
                                NRCSubtotal = 0 - NRCSubtotal;
                                NRCSubtotal = NRCSubtotal != "" ? parseFloat(NRCSubtotal) : 0.00;
                                NRCSubtotal = "(" + NRCSubtotal + ")";
                            }
                              
                            var lineItems = [ProductDesc, "QTY: " + Quantity + "	  " + "PRICE: $" + NRCSubtotal]
                            SCOUIMethods.ClearP2PEPoleDisplay(OrderId);
                            SCOUIMethods.P2PEDispalyMultiLineItems(OrderId, lineItems);
                                          }, 1000);
                        } else {
                            localStorage.setItem("InvokepoleDisplay", "N");
                        }
                    }
                }

                function poleDisplay(ProductDesc, ProQuantity, ProductPrice) {
                    var DISA_POLEDISPLAY = "plugin_poledisplay";
                    var consts = SiebelJS.Dependency("SiebelApp.Constants");
                    consts.set("WS_" + DISA_POLEDISPLAY.toUpperCase() + "_VERSION", "1.0.0");
                    var DISAHandler = null;
                    callPoleDisplay(ProductDesc, ProQuantity, ProductPrice);

                    function callPoleDisplay(ProductDesc, ProQuantity, ProductPrice) {
                        console.log("Calling DISA Pole Display PLUGIN with : ");
                        var poleHandler = getDISAHandler.call(this);
                        // here we create an object containing data which the Java application will read.
                        // Neither "Command", nor "GetSysInfo" are DISA specific.
                        // The shape and content of the message is entirely up to the developer.
                        var msgJSON = {};
                        //msgJSON["Command"] = "Ready"; 
                        //msgJSON = getLines(OrderId,subTotal);
                        msgJSON = getLinedetails(ProductDesc, ProQuantity, ProductPrice);
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

                    function getLinedetails(proDesc, proQuant, proPrice) {
                        // Adds other error handling logic 
                        var poleInfo = [];
                        poleInfo.push({
                            "Command": "Ready",
                            "ProductDesc": proDesc,
                            "Quantity": proQuant,
                            "Price": proPrice
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
                        subTotal = subTotal.toFixed(2);
                        taxTotal = taxTotal.toFixed(2);
                        orderTotal = orderTotal.toFixed(2);
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
                return SCSROOrderEntryLineItemsPR;
            }());
            return "SiebelAppFacade.SCSROOrderEntryLineItemsPR";
        })
}