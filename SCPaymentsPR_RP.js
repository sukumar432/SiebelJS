if (typeof(SiebelAppFacade.SCPaymentsPR_RP) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCPaymentsPR_RP");
    define("siebel/custom/SelectComfort/SCPaymentsPR_RP", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/SCPaymentsMarkup", "siebel/custom/SelectComfort/bootstrap.min.js", "siebel/custom/SelectComfort/jquery.validate.min","siebel/custom/SelectComfort/SC_OUI_Methods", "siebel/custom/SelectComfort/SC_OUI_Definitions", "siebel/custom/SelectComfort/SC_OUI_Markups", "siebel/custom/SelectComfort/SCErrorCodes"],
        function() {
            SiebelAppFacade.SCPaymentsPR_RP = (function() {
                var SCPaymentMarkup = SiebelJS.Dependency("SiebelApp.SCPaymentsMarkup");
                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
                var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
                var SC_OUI_Markups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
                var SCErrorCodes = SiebelJS.Dependency("SiebelApp.SCErrorCodes");
				
				var machineInfo = "";
                var pm, records, appletName, appletId, appletSeq, errorCodes;
                var orderPM, orderBC, paymentBC, orderRecord, contactId, orderId, orderNumberBS, notCommited = false,isActivityCreated = false,
                    newRecord = false,
                    orderControlSet, cashOverDue = 0;
                var totalDue, firstName, lastName, address, phone, paymentDue, postalCode, country, state, paymentDType, LoginId, StoreLocation, rewardAMT,paySCStoreUser="";
                var salesreprowid, GiftCardCount = 0,
                    GetLineOutps, failedpaymentselected = false,
                    FieldQueryPair, itemsCount = 0;
                var isFinancing="N",
				P2PEFlag = "N";
				var store_receipt="";
				
                function SCPaymentsPR_RP(pm) {
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCPaymentsPR_RP, SiebelAppFacade.JQGridRenderer);

                SCPaymentsPR_RP.prototype.Init = function() {
					isFinancing="N";
                    // Init is called each time the object is initialised.
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.Init.apply(this, arguments);
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCPaymentsPR_RP:      Init method reached.");
						//SCOUIMethods.SCGetProfileAttr("MachineInfo,Login Name,SC Store User,SC Primary Division Sub Type,IP,SC Store Number,DISALocFound"); 
                    orderPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM();
                    orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp();
                    orderControlSet = orderPM.Get("GetControls");
					machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
					LoginId = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                   errorCodes = SCErrorCodes.paymentErrorCodes();
				   P2PEFlag = theApplication().GetProfileAttr("P2PEFlag");
					newRecord = false;
                    localStorage.setItem('whitescreen', 0);
                   
					paySCStoreUser="";
					paySCStoreUser=SCOUIMethods.SCGetProfileAttrValue('SC Store User');
                    //Hiding navigation tabs
                    $("#_swescrnbar").hide();
                    $("#_swethreadbar").hide();
                    $("#_sweappmenu").hide();
                    $("#s_vctrl_div").hide();
                    $(".siebui-button-toolbar").hide();
                    $("#_swecontent").css("height", "99%");
                    $('#_sweview').css("overflow", "auto");
					$(".ui-datepicker-trigger").css({
						"opacity": "0.5",
						"height": "16px",
						"width": "16px",
						"position": "absolute",
						"bottom": "40px",
						"left": "0"
					});
					$('#CommunicationPanelContainer').css("padding-top","77px");
                }

                SCPaymentsPR_RP.prototype.ShowUI = function() {
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.ShowUI.apply(this, arguments);
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCPaymentsPR_RP:      ShowUI method reached.");
                    $(".whitescreentimer").remove();
                    $("#custommaskoverlay").hide();
                    $('#_sweview').show();
                    //hiding tool tip.
                    $('div[title="Payment Lines List Applet"]').attr("title", "");
                    // Add code here that should happen after default processing
                    // $('#_sweview').css("height","unset");
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get("GetFullId")).hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetFullId")).hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Attachment Applet"].GetPModel().Get("GetFullId")).hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().Get("GetFullId")).hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Payments List Applet"].GetPModel().Get("GetFullId")).hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().Get("GetFullId")).hide();
					pm = this.GetPM();
                    records = pm.Get("GetRecordSet");
                    orderRecord = orderPM.Get("GetRecordSet");
                    orderRecord = orderRecord[0];
                    appletName = pm.Get("GetName");
                    appletId = pm.Get("GetFullId");
                    paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetBusComp();
                    appletSeq = appletId[appletId.length - 1];
                    $("#s_" + appletId + "_div").hide();
                    $("#_svf0").css("height", "0%");
                    $('#_sweview').css("overflow", "auto");
					
					//setTimeout(function() {
                        FieldQueryPair = {
                            "Payment Id": ''
                        };
                        SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Payment Sales List Applet OUI");
                    //}, 1000);
					
                    paymentMarkup = SCPaymentMarkup.PaymentMarkup();
                    $("#" + appletId).append(paymentMarkup);
                    //Start:add code for attchments
                    var Attachmentrcdset = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Attachment Applet"].GetPModel().Get("GetRecordSet");
                    SCPaymentMarkup.GetAttchmentrecordset(Attachmentrcdset);
                    //Start:add code for attchments
					customtimermarkup=SC_OUI_Markups.CustomTimer();
					$('#applet1').append(customtimermarkup);
					machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
					
                    //getting strore change markup
                    var userposition = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Sub Type");
                    var storechangemarkup = SC_OUI_Markups.StoreChange();
                    $('#SC-add-storelocation').html(storechangemarkup);

                  // var customerType = SiebelApp.S_App.GetProfileAttr('SC Store User');
                    if (paySCStoreUser == 'Y') {
                        $("#cash-payment").show();
                    } else {
                        $("#cash-payment").hide();
                    }
                    //hiding the Accounts tab  
                    SiebelJS.Log("admin resp" + orderBC.GetFieldValue("SC Payment Admin Responsbility"));
                    if (orderBC.GetFieldValue("SC Payment Admin Responsbility") == "N" && (userposition != "WHOLESALE")) {
                        $("#accounting-payment").hide();
                    }

                    orderId = orderBC.GetFieldValue("Id");
                    orderNumberBS = orderBC.GetFieldValue("Order Number");
                    SiebelJS.Log("Order Id..:" + orderId);
                    totalDue = orderBC.GetFieldValue("SC Total Balance Due");
                    address = orderBC.GetFieldValue("SC Con Bill To Address");
                    state = orderBC.GetFieldValue("Primary Bill To State");
                    postalCode = orderBC.GetFieldValue("Primary Bill To Postal Code");
                    country = orderBC.GetFieldValue("Primary Bill To Country");
                    phone = orderBC.GetFieldValue("SC Preferred Contact");
                    contactId = orderBC.GetFieldValue("Bill To Contact Id");
                    SiebelJS.Log("ContactId..:" + contactId);
					//NGOLLA defect #807 added AccountName for Commercial/Wholesale orders
					if(orderBC.GetFieldValue("Primary Bill To First Name")!="" && orderBC.GetFieldValue("Primary Bill To Last Name")!=""){
                    firstName = orderBC.GetFieldValue("Primary Bill To First Name");
                    lastName = orderBC.GetFieldValue("Primary Bill To Last Name");
                    $("#SC-name").text(firstName + " " + lastName);
					}else{
					 AccountName = orderBC.GetFieldValue("Bill To Account");
					 $("#SC-name").text(AccountName);	
					}
                    if (phone.length != 0) {
                        phone = "(" + phone.substring(0, 3) + ")" + phone.substring(3, 6) + " -" + phone.substring(6, 10);
                        $("#SC-phone").text(phone);
                    } else {
                        $("#SC-phone").text('');
                    }
                    if (state.length != 0) {
                        address = address + ', ' + state;
                    }
                    if (postalCode.length != 0) {
                        address = address + ', ' + postalCode;
                    }
                    if (country.length != 0) {
                        address = address + ', ' + country;
                    }
                    $("#SC-address").text(address);

                    var inPS = SiebelApp.S_App.NewPropertySet();
                    var outPS = SiebelApp.S_App.NewPropertySet();
                    var bService = "";
                    inPS.SetProperty("OrderId", orderId);

                    SiebelJS.Log("Invoking Business Service");
                    bService = SiebelApp.S_App.GetService("SC Get Line Items"); //get service
                    outPS = bService.InvokeMethod("Query", inPS); //invoke the method
                    //saddala for giftcard activation
                    //GetLineOutps = bService.InvokeMethod("Query", inPS); //invoke method
					GetLineOutps=outPS;
                    var shippingcost = outPS.GetChild(0).GetProperty("Shipping cost");
                    var shippinglinediscounts = outPS.GetChild(0).GetProperty("Shipping Line Discounts");
                    var summaryMarkup = SCOUIMethods.OrderSummary(orderPM, shippingcost, shippinglinediscounts);

                    $("#SC-Order-Summary").html(summaryMarkup);
                    //START -- Custom Logic to get State Values							
                    var stateArray = SCOUIMethods.SCGetOrderLoVs("[Order By] >= 1 and [Order By] <= 52 and [Type]= 'SC_DRIVER_LICENCE_STATE' and [Active] = 'Y'")
                    var stateValue = '';
                    stateValue += ' <option></option>';
                    for (var st = 0; st < stateArray.length; st++) {
                        stateValue += ' <option>' + stateArray[st] + '</option>';
                    }
                    $("#driverlicencedate").html(stateValue);
                    //END -- Custom Logic to get State Values	
                    //hiding the rewards 
                    for (var pr = 0; pr < outPS.GetChild(0).GetChildCount(); pr++) {
                        if (outPS.GetChild(0).GetChild(pr).GetProperty("SC Calc Long Description") == "GIFT CARD") {
                            $("#reward-payment").hide();
                            //saddala for giftcard activation
                            GiftCardCount++;
                        }
                    }
                    var paymentdetails = PaymentDetials(records);
                    $("#SC-payment-details").append(paymentdetails);


                    $(".SC-Payment-nav-item").click(function(event) {
                        var currentItemId = this.id;
						if(((currentItemId == "financing-payment") && (isFinancing=="Y"))|| ($("#financing-payment").hasClass("p-item-active")&& $("#SC-finance-payment").text()!="Select" && $("#financeaccountnumber").val()=="")) {
							 if(($("#financing-payment").hasClass("p-item-active")&& $("#SC-finance-payment").text()!="Select") && $("#financeaccountnumber").val()==""){
								$("#sc-finance-Details").submit();
							 }
							 else{
								 $("#sc-financing-popup").modal({
											backdrop: 'static'
								 });
								$("#sc-financing-popup").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$(".modal-backdrop").css('background', '#ffffff');
							 }
						}else{
                        var canNewRecord = pm.ExecuteMethod("CanInvokeMethod", "NewRecord");
                        $(".SC-Payment-nav-item").removeClass("p-item-active");
                        if (canNewRecord) {
                            //SBOORLA:Added condition for Defect 757
                            if (currentItemId != "check-payment") {
                                $(this).addClass("p-item-active");
                                $(".payment-data").removeClass('active-tab');
                                $("#" + currentItemId + "-data").addClass('active-tab');
                            }
                            // Vamsi : #707 Payment type, new records and cash issue
                            if (failedpaymentselected == true && currentItemId != "check-payment") {
                                $(".SC-Payment-nav-item").removeClass("p-item-active");
                                $(this).addClass("p-item-active");

                                $(".payment-data").removeClass('active-tab');
                                $("#" + currentItemId + "-data").addClass('active-tab');
                            } else if (currentItemId != "check-payment") {
                                $(".SC-Payment-nav-item").removeClass("p-item-active");
                                $(this).addClass("p-item-active");

                                $(".payment-data").removeClass('active-tab');
                                $("#" + currentItemId + "-data").addClass('active-tab');

                                if (newRecord == false) {
                                    SiebelJS.Log("New Record");
                                    newRecord = true;
                                    pm.ExecuteMethod("InvokeMethod", "NewRecord", null, false);
                                    SiebelJS.Log("After New Record");
                                }
                            }
							
							$("#Creditcard-Number").prop('readonly', true);
							$("#creditCVV").prop('readonly', true);
							$("#giftcardNumber").prop('readonly', true);
							$("#giftcardPIN").prop('readonly', true);
                            if (this.id == "credit-card-paymnet") {
                                var accountNumber = paymentBC.GetFieldValue("Account Number");
                                $("#Creditcard-Number").attr("name", "creditCardNum");
                                $("#creditCVV").attr("name", "creditcvv");
                                $("#creditExpM").attr("name", "creditExpMonth");
                                $("#creditExpY").attr("name", "creditExpYear");

                                //$("#Creditcard-Number").prop('readonly', false);
                                //$("#creditCVV").prop('readonly', false);
                                $("#creditExpM").prop('readonly', false);
                                $("#creditExpY").prop('readonly', false);
                                $("#creditPaymentDue").prop('readonly', false);
								if(paySCStoreUser != 'Y'){
									 $("#SC-credit-payment").prop('readonly', false);
								}
                                $("#CCManualInput").prop('readonly', false);
								$("#creditExpM").css("pointer-events","all");
								$("#creditExpY").css("pointer-events","all");
								$("#cc-manual-auth").prop('disabled', 'disabled');
								
                                $("#Creditcard-Number").val("");
                                $("#creditCVV").val("");
                                $("#creditExpM").val("");
                                $("#creditExpY").val("");
                                $("#paymentDue").val("");
                                $("#creditPayType").val("");

                                var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#Creditcard-Number").prop('readonly', true);
                                    $("#creditCVV").prop('readonly', true);
                                    $("#creditExpM").prop('readonly', true);
                                    $("#creditExpY").prop('readonly', true);
                                    $("#creditPaymentDue").prop('readonly', true);
									if(paySCStoreUser != 'Y'){
									  $("#SC-credit-payment").prop('readonly', true);	
									}
                                    $("#CCManualInput").prop('readonly', true);
                                }
								if(paySCStoreUser == "Y"){
									$("#Creditcard-Number").prop('readonly', true);
                                    $("#creditCVV").prop('readonly', true);
                                    $("#creditExpM").prop('readonly', true);
									$("#creditExpM").css("pointer-events","none");
                                    $("#creditExpY").prop('readonly', true);
									$("#creditExpY").css("pointer-events","none");
								}
								var detailsMarkup = CreditCardDetails();
                                $('#SC-CreditDetails').html(detailsMarkup);

                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Credit Card");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    paymentBC.SetFieldValue("Account Number", "");
                                }
                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
                               // var customerType = "";
							    records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                if (paySCStoreUser == 'Y' && paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization" && paymentBC.GetFieldValue('Authorization Code') == "") {
                                    $("#CCAuthCode").focus();
                                } else if (paySCStoreUser == 'Y' && P2PEFlag != "Y" && paymentStatus == "Entered") {
                                    $("#credit-hidden").focus();
                                } else {
                                    $("#Creditcard-Number").focus();
                                }
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#creditPaymentDue").val(paymentDue);
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
								if(paySCStoreUser != "Y"){
									 if (paymentDType != "") {
                                    document.getElementById('SC-credit-payment').innerText = paymentDType;
									} else {
										document.getElementById('SC-credit-payment').innerText = 'Select';
									}
								}
                               
                                SiebelJS.Log("paymentDType..:" + paymentDType);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
								/*if (storeUser == "Y" && paymentStatus == "Need Verbal Authorization") {
									paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
									$("#cc-manual-auth").prop("checked","checked");
								}else{
									paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									$("#cc-manual-auth").removeAttr("checked");
								}*/
								if(P2PEFlag != "Y"){
									if(paySCStoreUser != "Y"){
										if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="" && document.getElementById("SC-credit-payment").innerText!="Select")
											$("#SC-CreditCard").removeClass("SC-disabled");
										else
											$("#SC-CreditCard").addClass("SC-disabled");
									}else{
										if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="")
										   $("#SC-CreditCard").removeClass("SC-disabled");
										else
											$("#SC-CreditCard").addClass("SC-disabled");
									}
									
									if(paymentBC.GetFieldValue("SC Payment Status") == "Need Verbal Authorization")
										$("#SC-CreditCard").removeClass("SC-disabled");
								}	
							}

                            if (this.id == "giftcard-payment") {
                                $("#SC-giftcard-details").hide();
								if (P2PEFlag != "Y") {
								 $("#SC-giftcard").addClass("SC-disabled");
								}
								$("#giftPaymentDue").val("");
                                $("#giftcardNumber").val("");
                                $("#giftcardPIN").val("");

                                //$("#giftcardNumber").prop('readonly', false);
                                //$("#giftcardPIN").prop('readonly', false);
                                $("#SC-gift-payment").prop('readonly', false);
                                $("#GCManualInput").prop('readonly', false);
								$("#gc-manual-auth").prop('disabled', 'disabled');

                                $("#giftcardNumber").attr("name", "giftcardNumber");
                                $("#giftcardPIN").attr("name", "giftcardPIN");
                                var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#giftcardNumber").prop('readonly', true);
                                    $("#giftcardPIN").prop('readonly', true);
                                    $("#SC-gift-payment").prop('readonly', true);
                                    $("#GCManualInput").prop('readonly', true);
									$("#SC-giftcard").removeClass("SC-disabled");
                                }
								if(paySCStoreUser == "Y"){
									$("#giftcardNumber").prop('readonly', true);
                                    $("#giftcardPIN").prop('readonly', true);
                                    $("#SC-gift-payment").prop('readonly', true);
								}

                                var detailsMarkup = GiftCardDetails();
                                $('#sc-giftcardTxnDetails').html(detailsMarkup);
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Gift Card");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    paymentBC.SetFieldValue("Account Number", "");
                                }
                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
                                //var customerType = SiebelApp.S_App.GetProfileAttr('SC Store User');
								records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                if (paySCStoreUser == 'Y' && paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization" && paymentBC.GetFieldValue('Authorization Code') == "") {
                                    $("#GCAuthCode").focus();
                                } else if (paySCStoreUser == 'Y' && P2PEFlag != "Y" && paymentStatus == "Entered") {
                                    $("#Gift-hidden").focus();
                                } else {
                                    $("#giftcardNumber").focus();
                                }
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#giftPaymentDue").val(paymentDue);
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                if (paymentDType != "") {
                                    document.getElementById('SC-gift-payment').innerText = paymentDType;
                                } else {
                                    document.getElementById('SC-gift-payment').innerText = 'Select';
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
								/*if (storeUser == "Y" && paymentStatus == "Need Verbal Authorization") {
									paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
									$("#gc-manual-auth").prop("checked","checked");
								}else{
									paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									$("#gc-manual-auth").removeAttr("checked");
								}*/
                            }

                            if (this.id == "check-payment") {

                                $("#checknumber").val("");
                                $("#bankrouting").val("");
                                $("#DOBVALUE").val("");
                                $("#driverlicence").val("");
                                $("#driverlicencedate").val("");
                                $("#checkPaymentDue").val("");
                                $("#Payment-method").val("");
                                $("#ck-dep-str").val("off");

                                $("#bankaccountnumber").prop('readonly', false);
                                $("#DOB-img").prop('readonly', false);
                                $("#checknumber").prop('readonly', false);
                                $("#bankrouting").prop('readonly', false);
                                $("#DOBVALUE").prop('readonly', false);
                                $("#driverlicence").prop('readonly', false);
                                $("#driverlicencedate").prop('readonly', false);
                                $("#checkPaymentDue").prop('readonly', false);
                                $("#Payment-method").prop('readonly', false);
                                $("#SC-check-payment").prop('readonly', false);
                                $("#ck-dep-str").prop('disabled', 'disabled');
						
                                //var isStoreUser = SiebelApp.S_App.GetProfileAttr("SC Store User");
                                if (paySCStoreUser != "Y" && orderBC.GetFieldValue("SC Payment Admin Responsbility") == "N") {
                                    $("#SC-SO-Cash-open-popup").modal({
                                        backdrop: 'static'
                                    });
                                    $("#SC-SO-Cash-open-popup").css({
                                        "display": "flex",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    });
                                    $(".modal-backdrop").css('background', '#ffffff');
                                } else {
                                    if (failedpaymentselected == false) {
                                        $(".SC-Payment-nav-item").removeClass("p-item-active");
                                        $(this).addClass("p-item-active");
                                        $(".payment-data").removeClass('active-tab');
                                        $("#" + currentItemId + "-data").addClass('active-tab');
                                        if (newRecord == false) {
                                            SiebelJS.Log("New Record");
                                            newRecord = true;
                                            pm.ExecuteMethod("InvokeMethod", "NewRecord", null, false);
                                            SiebelJS.Log("After New Record");
                                        }
                                    } else if (failedpaymentselected == true) {
                                        $(".SC-Payment-nav-item").removeClass("p-item-active");
                                        $(this).addClass("p-item-active");
                                        $(".payment-data").removeClass('active-tab');
                                        $("#" + currentItemId + "-data").addClass('active-tab');
                                    } else {
                                        // Do nothing..
                                    }

                                    var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                   // var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                    if (paymentStatus != "Entered") {
                                        $("#bankaccountnumber").prop('readonly', true);
                                        $("#DOB-img").prop('readonly', true);
                                        $("#checknumber").prop('readonly', true);
                                        $("#bankrouting").prop('readonly', true);
                                        $("#DOBVALUE").prop('readonly', true);
                                        $("#driverlicence").prop('readonly', true);
                                        $("#driverlicencedate").prop('readonly', true);
                                        $("#checkPaymentDue").prop('readonly', true);
                                        $("#Payment-method").prop('readonly', true);
                                        $("#SC-check-payment").prop('readonly', true);
                                    }

                                    $("#bankaccountnumber").val("");
                                    if (failedpaymentselected == false)
                                        $("#checknumber").val("");
                                    else
                                        $("#checknumber").val(paymentBC.GetFieldValue("SC Check Number"));
                                    $("#bankrouting").val("");
                                    $("#DOBVALUE").text("");
                                    $("#driverlicence").val("");
                                    $("#driverlicencedate").val("");
                                    $("#checkPaymentDue").val("");
                                    $("#Payment-method").val("");
                                    SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                    var Bservice = '',
                                        inPS = '',
                                        outPS = '';
                                    inPS = SiebelApp.S_App.NewPropertySet();
                                    outPS = SiebelApp.S_App.NewPropertySet();
                                    inPS.SetProperty("Name", "SCPayMethod");
                                    inPS.SetProperty("Value", "Check");
                                    Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                    outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                    if (failedpaymentselected != true) {
                                        paymentBC.SetFieldValue("SC Payment Type Code", "");
                                        paymentBC.SetFieldValue("Account Number", "");
                                    }
                                    pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
									pm.ExecuteMethod("InvokeMethod", "PickCheckPayType", null, false);
									records = pm.Get("GetRecordSet");
									var pendingTxns = failedPendingTxnDetials(records);
									$("#SC-failed-payment-details").html(pendingTxns);
                                    $("#bankrouting").focus();
                                    paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                    $("#checkPaymentDue").val(paymentDue);
                                    paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                    if (paymentDType != "") {
                                        document.getElementById('SC-check-payment').innerText = paymentDType;
                                    } else {
                                        document.getElementById('SC-check-payment').innerText = 'Select';
                                    }
                                    SiebelJS.Log("paymentDType..:" + paymentDType);

                                    if (failedpaymentselected != true) {
                                        paymentBC.SetFieldValue("SC Credit Card Number", "");
                                        paymentBC.SetFieldValue("SC CVV Number", "");
                                        paymentBC.SetFieldValue("SC Expiration Month", "");
                                        paymentBC.SetFieldValue("Expiration Year", "");
                                        paymentBC.SetFieldValue("SC Voucher Number", "");
                                        paymentBC.SetFieldValue("SC Bank Account Number", "");
                                        paymentBC.SetFieldValue("SC Check Number", "");
                                        paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                        paymentBC.SetFieldValue("SC Drivers License Number", "");
                                        paymentBC.SetFieldValue("SC Drivers License State", "");
                                        paymentBC.SetFieldValue("SC Date Of Birth", "");
										//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
										//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                    }
									/*if (storeUser == "Y" && paymentStatus == "Entered") {
										paymentBC.SetFieldValue("SC Deposited at Store", "Y");
										$("#ck-dep-str").prop("checked","checked");
									}else{
										paymentBC.SetFieldValue("SC Deposited at Store", "N");
										$("#ck-dep-str").removeAttr("checked");
									}*/
                                    var detailsMarkup = CheckDetails();
                                    $('#sc-check-payment-details').html(detailsMarkup);
									if($("#bankaccountnumber").val()=="" || $("#checknumber").val()=="" || $("#bankrouting").val()=="" || $("#DOB-img").val()=="" || $("#driverlicence").val() == "" || $("#driverlicencedate").val() == "" || $("#checkPaymentDue").val() =="" || document.getElementById("SC-check-payment").innerText=="Select")
										$("#SC-Check").addClass("SC-disabled");
                                }
                            }

                            if (this.id == "financing-payment") {
                                $("#financeaccountnumber").val("");
                                $("#financePaymentDue").val("");

                                $("#financeaccountnumber").prop('readonly', false);
                                $("#financePaymentDue").prop('readonly', false);
                                $("#SC-finance-payment").prop('readonly', false);
								$("#fc-manual-auth").prop('disabled', 'disabled');
                                
								var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#financeaccountnumber").prop('readonly', true);
                                    $("#financePaymentDue").prop('readonly', true);
                                    $("#SC-finance-payment").prop('readonly', true);
                                }

                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Financing");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    //Vamsi ICX : 15042018 : Inactivate the below line for #773
                                    //paymentBC.SetFieldValue("Account Number","");
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
                                //var customerType = SiebelApp.S_App.GetProfileAttr('SC Store User');
								records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                if (paySCStoreUser == 'Y' && paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization" && paymentBC.GetFieldValue('Authorization Code') == "") {
                                    $("#FinanceAuthCode").focus();
                                } else {
                                    $("#financeaccountnumber").focus();
                                }
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#financePaymentDue").val(paymentDue);
                                $("#financeaccountnumber").val(paymentBC.GetFieldValue("Account Number"));
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                if (paymentDType != "") {
                                    document.getElementById('SC-finance-payment').innerText = paymentDType;
                                } else {
                                    document.getElementById('SC-finance-payment').innerText = 'Select';
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
								/*if (storeUser == "Y" && paymentStatus == "Need Verbal Authorization") {
									paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
									$("#fc-manual-auth").prop("checked","checked");
								}else{
									paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									$("#fc-manual-auth").removeAttr("checked");
								}*/
								
                                var detailsMarkup = FinanceDetails();
                                $('#financing-payment-details').html(detailsMarkup);
								if($("#financeaccountnumber").val() == "" || $("#financePaymentDue").val() == "" || document.getElementById("SC-finance-payment").innerHTML=="Select")
									$("#SC-financing").addClass("SC-disabled");
								else
									$("#SC-financing").removeClass("SC-disabled");
								if(paymentBC.GetFieldValue("SC Payment Status") == "Need Verbal Authorization")
									$("#SC-financing").removeClass("SC-disabled");
                            }

                            if (this.id == "reward-payment") {
                                $("#sc-reward-type-input").val("");
                                $("#rewardaccountnumber").val("");
                                $("#rewardPaymentDue").val("");
                                $("#financeaccountnumber").val("");
                                $("#financePaymentDue").val("");

                                $("#sc-reward-type-input").prop('readonly', false);
                                $("#rewardaccountnumber").prop('readonly', false);
                                $("#rewardPaymentDue").prop('readonly', false);
                                $("#financeaccountnumber").prop('readonly', false);
                                $("#financePaymentDue").prop('readonly', false);
                                $("#SC-reward-payment").prop('readonly', false);

                                var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                               // var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#sc-reward-type-input").prop('readonly', true);
                                    $("#rewardaccountnumber").prop('readonly', true);
                                    $("#rewardPaymentDue").prop('readonly', true);
                                    $("#financeaccountnumber").prop('readonly', true);
                                    $("#financePaymentDue").prop('readonly', true);
                                    $("#SC-reward-payment").prop('readonly', true);
                                }

                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Reward");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    paymentBC.SetFieldValue("Account Number", "");
                                }
                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
								records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#rewardPaymentDue").val(paymentDue);
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                if (paymentDType != "") {
                                    document.getElementById('SC-reward-payment').innerText = paymentDType;
                                } else {
                                    document.getElementById('SC-reward-payment').innerText = 'Select';
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
                                var detailsMarkup = ACRDetails();
                                $('#reward-payment-details').html(detailsMarkup);
                                $("#sc-reward-type-input").focus();
								if($("#sc-reward-type-input").val()=="" || $("#rewardaccountnumber").val()=="" || $("#rewardPaymentDue").val()=="" || document.getElementById("SC-reward-payment").innerText=="Select"){
									$("#SC-reward").addClass("SC-disabled");
								}
								
                            }

                            if (this.id == "accounting-payment") {
                                $("#accountPaymentDue").val("");
                                $("#accountPaymentDue").prop('readonly', false);
                                $("#SC-account-payment").prop('readonly', false);

                                var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#accountPaymentDue").prop('readonly', true);
                                    $("#SC-account-payment").prop('readonly', true);
                                }
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Accounting");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    paymentBC.SetFieldValue("Account Number", "");
                                }
                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
								records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                $("#accountPaymentDue").focus();
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#accountPaymentDue").val(paymentDue);
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                if (paymentDType != "") {
                                    document.getElementById('SC-account-payment').innerText = paymentDType;
                                } else {
                                    document.getElementById('SC-account-payment').innerText = 'Select';
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
                                var detailsMarkup = ACRDetails();
                                $('#accounting-payment-details').html(detailsMarkup);
								if($("#accountPaymentDue").val()=="" || document.getElementById("SC-account-payment").innerText=="Select"){
									$("#SC-accounting").addClass("SC-disabled");
								}
                            }

                            if (this.id == "cash-payment") {
                                $("#cashPaymentDue").val("");
                                $("#cashPaymentDue").prop('readonly', false);
                                $("#SC-cash-payment").prop('readonly', false);
                                $("#ch-dep-str").prop("disabled","disabled");
								
                                var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                                //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                if (paymentStatus != "Entered") {
                                    $("#cashPaymentDue").prop('readonly', true);
                                    $("#SC-cash-payment").prop('readonly', true);
                                }
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                var Bservice = '',
                                    inPS = '',
                                    outPS = '';
                                inPS = SiebelApp.S_App.NewPropertySet();
                                outPS = SiebelApp.S_App.NewPropertySet();
                                inPS.SetProperty("Name", "SCPayMethod");
                                inPS.SetProperty("Value", "Cash");
                                Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Payment Type Code", "");
                                    paymentBC.SetFieldValue("Account Number", "");
                                }
                                pm.ExecuteMethod("InvokeMethod", "PickPaymentMethod", null, false);
								records = pm.Get("GetRecordSet");
								var pendingTxns = failedPendingTxnDetials(records);
								$("#SC-failed-payment-details").html(pendingTxns);
                                $("#cashPaymentDue").focus();
                                paymentDue = paymentBC.GetFieldValue("Transaction Amount");
                                $("#cashPaymentDue").val(paymentDue);
                                paymentDType = paymentBC.GetFieldValue("SC Payment Type Code");
                                if (paymentDType != "") {
                                    document.getElementById('SC-cash-payment').innerText = paymentDType;
                                } else {
                                    document.getElementById('SC-cash-payment').innerText = 'Select';
                                }
                                SiebelJS.Log("paymentDType..:" + paymentDType);

                                if (failedpaymentselected != true) {
                                    paymentBC.SetFieldValue("SC Credit Card Number", "");
                                    paymentBC.SetFieldValue("SC CVV Number", "");
                                    paymentBC.SetFieldValue("SC Expiration Month", "");
                                    paymentBC.SetFieldValue("Expiration Year", "");
                                    paymentBC.SetFieldValue("SC Voucher Number", "");
                                    paymentBC.SetFieldValue("SC Bank Account Number", "");
                                    paymentBC.SetFieldValue("SC Check Number", "");
                                    paymentBC.SetFieldValue("SC Bank Routing Num", "");
                                    paymentBC.SetFieldValue("SC Drivers License Number", "");
                                    paymentBC.SetFieldValue("SC Drivers License State", "");
                                    paymentBC.SetFieldValue("SC Date Of Birth", "");
									//paymentBC.SetFieldValue("Manual Authorization Flag", "N");
									//paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }
								/*if (storeUser == "Y" && paymentStatus == "Entered") {
                                    paymentBC.SetFieldValue("SC Deposited at Store", "Y");
									$("#ch-dep-str").prop("checked","checked");
								}else{
									paymentBC.SetFieldValue("SC Deposited at Store", "N");
									$("#ch-dep-str").removeAttr("checked");
								}*/
                                var detailsMarkup = ACRDetails();
                                $('#cash-payment-details').html(detailsMarkup);
								if($("#cashPaymentDue").val()=="" || document.getElementById("SC-cash-payment").innerText=="Select"){
									$("#SC-cash").addClass("SC-disabled");
								}
                            }
                        }
                        failedpaymentselected = false;
					  }
                    });

                    $(".paymenttype").click(function(event) {
                        //$(document).on("click",".paymenttype",function(){
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        var id = this.id;
                        setTimeout(function() {
							(function(proxied) {
								  window.alert = function() {
									if(arguments[0].includes("If you have selected Non Stackable Finance option"))
									{
										//SiebelJS.log("entered..");
										$("#sc-financing-error-popup").modal({
											backdrop: 'static'
										});
										$("#sc-financing-error-popup").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									}
									else
									return proxied.apply(this, arguments);
								  };
								})(window.alert); 
                            SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["Payment Type"]);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().AttachNotificationHandler("g", function(o) {
                                var paymentType = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["Payment Type"]);
                                //method to supress alerts on pagination
								                              

							   if (paymentType != "" && id!="") {
                                    $(id).html(paymentType);
                                    document.getElementById(id).innerText = paymentType;
                                    SiebelJS.Log("paymentType...:" + paymentType);
									//SBOORLA: Added code for refreshing the header form Applet
									if(id=="SC-finance-payment"){
										//setTimeout(function() {
											var inPS = SiebelApp.S_App.NewPropertySet();
											var outPS = SiebelApp.S_App.NewPropertySet();
											var bService = "";
											inPS.SetProperty("OrderId", orderId);
											SiebelJS.Log("Invoking Business Service");
											bService = SiebelApp.S_App.GetService("SC Get Line Items"); //get service
											outPS = bService.InvokeMethod("Query", inPS); //invoke the method
											var shippingcost = outPS.GetChild(0).GetProperty("Shipping cost");
											var shippinglinediscounts = outPS.GetChild(0).GetProperty("Shipping Line Discounts");
											var summaryMarkup = SCOUIMethods.OrderSummary(orderPM, shippingcost, shippinglinediscounts);
											$("#SC-Order-Summary").html(summaryMarkup);
											newRecord=false;
											id="";
										//},1000);
										if($("#financeaccountnumber").val() != "" && $("#financePaymentDue").val() != "" && document.getElementById("SC-finance-payment").innerHTML!="Select")
											$("#SC-financing").removeClass("SC-disabled");
										else
											$("#SC-financing").addClass("SC-disabled");
									}
									if(id=="SC-reward-payment"){
										if($("#sc-reward-type-input").val()!="" && $("#rewardaccountnumber").val()!="" && $("#rewardPaymentDue").val()!="" && document.getElementById("SC-reward-payment").innerText!="Select"){
											$("#SC-reward").removeClass("SC-disabled");
										}
										else
											$("#SC-reward").addClass("SC-disabled");
										id="";
									}
									
									if(id=="SC-credit-payment" && paySCStoreUser != "Y" && P2PEFlag != "Y"){
										//if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && $("#creditPaymentDue").val() && $("#creditExpM").val() !="" && $("#creditExpM").val() != null && $("#creditExpY").val()!= null && $("#creditExpY").val()!="" && document.getElementById("SC-credit-payment").innerText!="Select")
										 if ($("#Creditcard-Number").val() != "" && $("#creditCVV").val() != "" && $("#creditPaymentDue").val() && $("#creditExpM").val() != "" && $("#creditExpM").val() != null && $("#creditExpY").val() != null && $("#creditExpY").val() != "")	
										    $("#SC-CreditCard").removeClass("SC-disabled");
										else
											$("#SC-CreditCard").addClass("SC-disabled");
										id="";
									}
								}
							});
                            //hiding the Loader
							
                            $("body").trigger('Custom.End');
                        }, 1000);
                    });
					$(document).on("click","#Creditcard-Number,#creditCVV",function(){
						if(paySCStoreUser == "Y"){
							$("#Creditcard-Number").prop('readonly', true);
							$("#creditCVV").prop('readonly', true);
						}
						else{
							$("#Creditcard-Number").prop('readonly', false);
							$("#creditCVV").prop('readonly', false);
						}
					});
					$(document).on("click","#giftcardNumber,#giftcardPIN",function(){
						if(paySCStoreUser == "Y"){
							$("#giftcardNumber").prop('readonly', true);
							$("#giftcardPIN").prop('readonly', true);
						}
						else{
							$("#giftcardNumber").prop('readonly', false);
							$("#giftcardPIN").prop('readonly', false);
						}
					});																										 
					$(document).on("change", "#sc-reward-type-input,#rewardaccountnumber,#rewardPaymentDue", function() {
							if($("#sc-reward-type-input").val()!="" && $("#rewardaccountnumber").val()!="" && $("#rewardPaymentDue").val()!="" && document.getElementById("SC-reward-payment").innerText!="Select"){
									$("#SC-reward").removeClass("SC-disabled");
							}
							else
							$("#SC-reward").addClass("SC-disabled");
							
					});
					$(document).on("change", "#accountPaymentDue", function() {
							if($("#accountPaymentDue").val()!="" && document.getElementById("SC-account-payment").innerText!="Select"){
								$("#SC-accounting").removeClass("SC-disabled");
							}
							else
								$("#SC-accounting").addClass("SC-disabled");
							
					});
					$(document).on("change", "#cashPaymentDue", function() {
							if($("#cashPaymentDue").val()!="" && document.getElementById("SC-cash-payment").innerText!="Select"){
								$("#SC-cash").removeClass("SC-disabled");
							}
							else
								$("#SC-cash").addClass("SC-disabled");
							
					});
					$(document).on("change", "#giftPaymentDue", function() {
							if($("#giftPaymentDue").val()=="")
								$("#SC-giftcard").addClass("SC-disabled");
							else
								$("#SC-giftcard").removeClass("SC-disabled");
							
					});
					$(document).on("change", "#financeaccountnumber,#financePaymentDue", function() {
						if($("#financeaccountnumber").val() != "" && $("#financePaymentDue").val() != "" && document.getElementById("SC-finance-payment").innerText!="Select")
							$("#SC-financing").removeClass("SC-disabled");
						else
							$("#SC-financing").addClass("SC-disabled");
						if(paymentBC.GetFieldValue("SC Payment Status") == "Need Verbal Authorization")
							$("#SC-financing").removeClass("SC-disabled");
					});
					$(document).on("change", "#bankaccountnumber,#checknumber,#bankrouting,#DOB-img,#driverlicence,#driverlicencedate,#checkPaymentDue", function() {
						if($("#bankaccountnumber").val()!="" && $("#checknumber").val()!="" && $("#bankrouting").val()!="" && $("#DOB-img").val()!="" && $("#driverlicence").val() != "" && $("#driverlicencedate").val() != "" && $("#checkPaymentDue").val()!="" && document.getElementById("SC-check-payment").innerText!="Select")
							$("#SC-Check").removeClass("SC-disabled");
						else
							$("#SC-Check").addClass("SC-disabled");
					});
					$(document).on("change","#Creditcard-Number,#creditCVV,#creditExpM,#creditExpY,#creditPaymentDue", function() {
						if (! $('#Creditcard-Number').is('[readonly]') ){
						    if (P2PEFlag != "Y") {
								if(paySCStoreUser != "Y"){
										if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="" && document.getElementById("SC-credit-payment").innerText!="Select")
											$("#SC-CreditCard").removeClass("SC-disabled");
										else
											$("#SC-CreditCard").addClass("SC-disabled");
								}else{
									if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="")
									   $("#SC-CreditCard").removeClass("SC-disabled");
									else
										$("#SC-CreditCard").addClass("SC-disabled");
								}
							} else {
								$("#SC-CreditCard").removeClass("SC-disabled");
							}
							if(paymentBC.GetFieldValue("SC Payment Status") == "Need Verbal Authorization")
								$("#SC-CreditCard").removeClass("SC-disabled");
						}
					});
                    $(document).on("click", "#sc-reward-type", function() {
                        SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["SC Voucher Number"]);
                        SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().AttachNotificationHandler("g", function(o) {
                            var rewardType = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["SC Voucher Number"]);
                            var accountNumber = SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName].GetControls()["Account Number"]);
                            $('#sc-reward-type-input').val(rewardType);
                            $('#rewardaccountnumber').val(accountNumber);
                            SiebelJS.Log("paymentType...:" + rewardType);
							var scRwdAmt="";
							scRwdAmt=paymentBC.GetFieldValue("Transaction Amount")==""?0.00:parseFloat(paymentBC.GetFieldValue("Transaction Amount"));
							$('#rewardPaymentDue').val(scRwdAmt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"));
                            setTimeout(function() {
                                $('#rewardaccountnumber').val(paymentBC.GetFieldValue("Account Number"));
								var scRwdAmt="";
								scRwdAmt=paymentBC.GetFieldValue("Transaction Amount")==""?0.00:parseFloat(paymentBC.GetFieldValue("Transaction Amount"));
								$('#rewardPaymentDue').val(scRwdAmt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"));
								if($("#sc-reward-type-input").val()!="" && $("#rewardaccountnumber").val()!="" && $("#rewardPaymentDue").val()!="" && document.getElementById("SC-reward-payment").innerText!="Select"){
									$("#SC-reward").removeClass("SC-disabled");
								}
								else
									$("#SC-reward").addClass("SC-disabled");
                            }, 1000);
                        });
                    });

                    //on click of date of birth in check details
                   /* $("#DOB-img").datepicker({
                        maxDate: 0,
                        changeYear: true,
                        yearRange: "-100:+0",
                        changeMonth: true,
						showButtonPanel: true
                    });*/
					
					$("#DOB-img").datepicker({
						maxDate: 0,
						changeYear: true,
						yearRange: "-100:+0",
						changeMonth: true,
						showOn: 'button',
						buttonText: 'Show Date',
						buttonImageOnly: true,
						buttonImage: 'images/custom/calendar.png',
						showButtonPanel: true
					});
					$(".ui-datepicker-trigger").css({
						    "opacity": "0.5",
							"height": "16px",
							"width": "16px",
							"position": "absolute",
							"bottom": "40px",
							"left": "0"
					});
					$(document).on('keypress', '#DOB-img', function () {
						var dateofbirth=$('#DOB-img').val();
						if (dateofbirth.length===2){
							dateofbirth=dateofbirth+"/";
						}else if(dateofbirth.length===5){
							dateofbirth=dateofbirth+"/";
						}
						$(this).val(dateofbirth);
					});
                    $(document).on("click", "#DOBVALUE", function() {
                        $("#DOB-img").focus();
                    });
					//Start:on focus out hiding the datepicker
					/*$("#DOB-img").focusout(function(){
						$('#DOB-img').datepicker("hide");
					});*/
					//End:on focus out hiding the datepicker
					//Start:on scroll hiding the datepicker
						$("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function ()
						{
							$('#DOB-img').datepicker("hide");
						});
					  //End:on scroll hiding the datepicker
                    //Start:On click Of Edit Order Button
                    $(document).on("click", "#Sc-Editorder-payments", function() {
                        if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet")[0]["Revision"] > 1)
                            localStorage.setItem("ComingFromPayments", "Y");
                        SiebelApp.S_App.GotoView("SC Create Sales Order View OUI", "", "", "");
                    });
                    //End:On click Of Edit Order Button

                    $("#SC-check-card-balance").click(function() {
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
                           var cardNumber = "",
								pin = "";
							if (P2PEFlag != "Y") {
								cardNumber = $("#giftcardNumber").val();
								pin = $("#giftcardPIN").val();
							}
                            var amountPay = $("#giftPaymentDue").val();
							
							var write = false;
							var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
							if (canWrite) {
								write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
							}
							
                            pm.SetProperty("PaymentMethod", "Gift Card");
                            pm.SetProperty("GiftCardType", paymentBC.GetFieldValue("SC Payment Type Code"));
                            pm.SetProperty("CalcGiftCardNumber", cardNumber);
                            pm.SetProperty("CalcPIN", pin);
                            pm.SetProperty("PaymentAmount", amountPay);
                            pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
                            pm.SetProperty("AccountNumber", paymentBC.GetFieldValue("Account Number"));
                            pm.SetProperty("GetGCBalanceFlag", "Y");
							
						    //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                            if (paySCStoreUser == 'Y') {
                                pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
                                var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
                                pm.SetProperty("AccessToken", AccessToken);
								paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
								if(P2PEFlag == "Y" && paymentStatus != "Need Verbal Authorization"){
									$("#custommaskoverlay").show();
									$("#SC-P2PE-GCCheckBal").modal({
										backdrop: 'static'
									});
									$("#SC-P2PE-GCCheckBal").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
								$(".modal-backdrop").css('background', '#ffffff');
								}
								setTimeout(function () {
									pm.OnControlEvent("SU_GET_GC_BALANCE");
								},1000);
                            } else {
                                pm.OnControlEvent("GETGCBALANCE_BUTTON_CLICK");
                            }
                            //hiding the Loader
                            $("body").trigger('Custom.End');
                        }, 1000);
                    });

                    //Start: On Click of Authorize button
                    $(".authorise-button, .auth-button").click(function(event) {
						//$(this).addClass("SC-disabled");
						var auth_button_id=$(this).attr("id");
						$("#"+auth_button_id).addClass("SC-disabled");
                        event.preventDefault();
                        var Bservice = '',
                            inPS = '',
                            outPS = '';
                        inPS = SiebelApp.S_App.NewPropertySet();
                        outPS = SiebelApp.S_App.NewPropertySet();
                        inPS.SetProperty("Name", "SC_PAYMENT_COMMIT");
                        inPS.SetProperty("Value", "Y");
                        Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                        Bservice.InvokeMethod("SetProfileAttr", inPS, outPS);

                        if ($(this).attr("id") == "SC-CreditCard") {
                            //Start loader 
                            var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
                            if (paymentStatus == "Need Verbal Authorization") {
                                $("#Creditcard-Number").removeAttr("name");
                                $("#creditCVV").removeAttr("name");
                                $("#creditExpM").removeAttr("name");
                                $("#creditExpY").removeAttr("name");
                                $("#creditCardDetails").submit();
                            } else {
                                $("#creditCardDetails").submit();
                            }
                        }

                        if ($(this).attr("id") == "SC-Check") {
                            //Start loader 
                            $("#sc-check-Details").submit();
                        }

                        if ($(this).attr("id") == "SC-giftcard") {
                            var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
                            if (paymentStatus == "Need Verbal Authorization") {
                                $("#giftcardNumber").removeAttr("name");
                                $("#giftcardPIN").removeAttr("name");
                                $('#SC-GiftCard-Details').submit();
                            } else {
                                $('#SC-GiftCard-Details').submit();
                            }
                        }

                        if ($(this).attr("id") == "SC-financing") {
                            //Start loader 
                            var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
                            if (paymentStatus == "Need Verbal Authorization") {
                                $("#giftcardNumber").removeAttr("name");
                                $("#giftcardPIN").removeAttr("name");
                                $("#sc-finance-Details").submit();
                            } else {
                                $("#sc-finance-Details").submit();
                            }
                        }

                        if ($(this).attr("id") == "SC-accounting") {
                            //Start loader 
                            $("#sc-Accounting-Details").submit();
                        }

                        if ($(this).attr("id") == "SC-reward") {
                            //Start loader 
                            //code for get the reward Amount
                            if ($("#sc-reward-type-input").val() != "") {
                                var Input = SiebelApp.S_App.NewPropertySet();
                                var Output = SiebelApp.S_App.NewPropertySet();
                                Input.SetProperty("BO", "Contact");
                                Input.SetProperty("BC", "LOY Voucher");
                                Input.SetProperty("SearchSpecification", "Voucher Number ='" + $("#sc-reward-type-input").val() + "'");
                                var fieldsArray_new = "Product Name,Voucher Number";
                                Input.SetProperty("FieldsArray", fieldsArray_new);
                                var Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                                Output = Custom_Service.InvokeMethod("Query", Input);

                                var Child = Output.GetChild(0);
                                var BS_Data = Child.GetProperty("OutputRecordSet");
                                BS_Data = JSON.parse(BS_Data);
                                var prod_id = BS_Data["Product Name"];
                                //Added code for defect 684 and 685
                                rewardAMT = parseFloat(prod_id);
                            }
                            $("#sc-Innercricle-Details").submit();
                        }

                        if ($(this).attr("id") == "SC-cash") {
                            //Start loader 
                            $("body").trigger('Custom.Start');
							setTimeout(function() {
                                var cashPayment = $("#cashPaymentDue").val();
								var defaultTxnAmount = paymentBC.GetFieldValue("Transaction Amount");
								//var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                /*var depositAtStore = $('input[name="ch-dep-str"]:checked').val();
								  if (depositAtStore == "on") {
                                    paymentBC.SetFieldValue("SC Deposited at Store", "Y");
                                } else {
                                    paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }*/
                                cashOverDue = cashPayment - defaultTxnAmount;
                                //var machineInfo = SiebelApp.S_App.GetProfileAttr('MachineInfo');
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                //10042018:Vamsi: for cash over due-amountPay
                                if (cashOverDue >= 0) {
                                    paymentBC.SetFieldValue("Transaction Amount", defaultTxnAmount);
                                } else {
                                    paymentBC.SetFieldValue("Transaction Amount", cashPayment);
                                }
								 //paymentBC.SetFieldValue("Machine Name", machineInfo);
								if(paySCStoreUser=='Y'){
								machineInfo="";
								machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
								if(machineInfo ==""||machineInfo==undefined){
									 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
								}else{
										 paymentBC.SetFieldValue("Machine Name", machineInfo);
									}
										
					            }
                                //07042018:VAMSI:for #674
                                var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                if (canWrite) {
                                    var write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                }
                                var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                if (caninvoke) {
                                    pm.ExecuteMethod("InvokeMethod", "Authorize", null, false);
                                    if (paymentBC.GetFieldValue("SC Payment Status") === "Authorized") {
                                        if (cashOverDue > 0) {
                                            cashOverDue = Number(cashOverDue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                                            SiebelJS.Log("Cash Over Due..:" + cashOverDue);
                                            $("#changeBackOk").click(function() {
                                                $("#SC-SO-Cash-Overdue").modal('hide');
                                            });
                                            $("#SC-SO-Cash-Overdue").modal({
                                                backdrop: 'static'
                                            });
                                            $("#cashTaken").text("$" + cashPayment);
                                            $("#changeBackText").text("$" + cashOverDue);

                                        }
                                        SCOUIMethods.OpenCashDrawer();
										if(paymentBC.GetFieldValue("SC Payment Status") == "Authorized" && paySCStoreUser == "Y" ){
											paymentBC.SetFieldValue("SC Deposited at Store", "Y");
											var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
											if(canWrite){
												SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
											}
										}
                                    }

                                } else {
                                    $("#unatuhOk").click(function() {
                                        $("#SC-CalFreigthMsg").modal('hide');
                                    });
                                    $("#SC-CalFreigthMsg").modal({
                                        backdrop: 'static'
                                    });
                                }
                                newRecord = false;
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
							
                           
                        }

                    });
                    //Start:submit handler for Financing
                    $("#sc-finance-Details").validate({
                        rules: {
                            FINAmt: {
                                min: 0.001,
                            },
                            FINAcc: {
                                required: true,
                            },
                        },
                        messages: {
                            FINAmt: {
                                min: errorCodes.SC_INVALID_PaymentAmount
                            },
                            FINAcc: {
                                required: errorCodes.SC_REQUIRED_ACCOUNTNUMBER
                            }
                        },
                        tooltip_options: {
                            FINAmt: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            FINAcc: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                        },
                        submitHandler: function(form) {
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                // Vamsi : #664 Verbal Auth
                                var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
                                if (paymentStatus != "Authorized" && paymentStatus != "Entered") {
                                    var finAuthCode = $("#FinanceAuthCode").val();
									if(finAuthCode != null && finAuthCode != undefined && finAuthCode !=""){
										var accountNumber = $("#financeaccountnumber").val();
										var financePaymentDue = $("#financePaymentDue").val();
										SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
										var adminMode = paymentBC.InvokeMethod("SetAdminMode", true);
										paymentBC.SetFieldValue("Transaction Amount", financePaymentDue);
										paymentBC.SetFieldValue("Account Number", accountNumber);
										paymentBC.SetFieldValue("Authorization Code", finAuthCode);
										//paymentBC.SetFieldValue("Machine Name", machineInfo);
										if(paySCStoreUser=='Y'){
											machineInfo="";
											machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
											if(machineInfo ==""||machineInfo==undefined){
												 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
											}else{
													 paymentBC.SetFieldValue("Machine Name", machineInfo);
												}
										
									    }
										//paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
										paymentBC.SetFieldValue("SC Payment Status", "Authorized");
										var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
										if (canWrite) {
											var write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
										}
										if(paymentBC.GetFieldValue("SC Payment Status") == "Authorized"){
											paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
											var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
											if(canWrite){
												SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
											}
										}
									}
                                } else {
                                    var accountNumber = $("#financeaccountnumber").val();
                                    var financePaymentDue = $("#financePaymentDue").val();
                                    SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                    var adminMode = paymentBC.InvokeMethod("SetAdminMode", true);
                                    paymentBC.SetFieldValue("Account Number", accountNumber);
                                    SiebelJS.Log("Account Number..:" + paymentBC.GetFieldValue("Account Number"));
                                    paymentBC.SetFieldValue("Transaction Amount", financePaymentDue);
									 //paymentBC.SetFieldValue("Machine Name", machineInfo);
									if(paySCStoreUser=='Y'){
										machineInfo="";
										machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
										if(machineInfo ==""||machineInfo==undefined){
											 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
										}else{
												 paymentBC.SetFieldValue("Machine Name", machineInfo);
											}
										
									 }
                                    SiebelJS.Log("Transaction Amount..:" + paymentBC.GetFieldValue("Transaction Amount"));
                                    var write = false;
                                    var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                    if (canWrite) {
                                        write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                    }
                                    if (write) {
                                        var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                        SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                        if (caninvoke) {
                                            pm.ExecuteMethod("InvokeMethod", "Authorize", null, false);
                                        } else {
                                            $("#unatuhOk").click(function() {
                                                $("#SC-CalFreigthMsg").modal('hide');
                                            });
                                            $("#SC-CalFreigthMsg").modal({
                                                backdrop: 'static'
                                            });
                                        }
                                        newRecord = false;
                                    }
                                }
								$("#SC-finance-payment").text("Select");
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }
                    });
                    //End:submit handler for Financing
                    //Start:submit handler for Accounting
                    $("#sc-Accounting-Details").validate({
                        rules: {
                            ACCPayAmt: {
                                min: 0.001,
                            }
                        },
                        messages: {
                            ACCPayAmt: {
                                min: errorCodes.SC_INVALID_PaymentAmount
                            }
                        },
                        tooltip_options: {
                            ACCPayAmt: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            }

                        },
                        submitHandler: function(form) {
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                var amountPay = $("#accountPaymentDue").val();
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                paymentBC.SetFieldValue("Transaction Amount", amountPay);
								 //paymentBC.SetFieldValue("Machine Name", machineInfo);
								if(paySCStoreUser=='Y'){
									machineInfo="";
									machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
									if(machineInfo ==""||machineInfo==undefined){
										 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
									}else{
											 paymentBC.SetFieldValue("Machine Name", machineInfo);
										}
										
							     }
                                var write = false;
                                var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                if (canWrite) {
                                    write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                }
                                var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                if (caninvoke) {
                                    pm.ExecuteMethod("InvokeMethod", "Authorize", null, false);
                                } else {
                                    $("#unatuhOk").click(function() {
                                        $("#SC-CalFreigthMsg").modal('hide');
                                    });
                                    $("#SC-CalFreigthMsg").modal({
                                        backdrop: 'static'
                                    });
                                }
                                newRecord = false;
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }

                    });
                    //End:submit handler for Accounting
                    //Start:submit handler for inner circle reward
                    $("#sc-Innercricle-Details").validate({
                        rules: {
                            SCInnRWD: {
                                required: true,
                            },
                            INNAccNum: {
                                required: true,
                            },
                            INNPayAmt: {
                                min: 0.001,
                                max: function() {
                                    return (rewardAMT);
                                },
                            }
                        },
                        messages: {
                            SCInnRWD: {
                                required: errorCodes.SC_REQUIRED_INNERCRICLEREWARD
                            },
                            INNAccNum: {
                                required: errorCodes.SC_INNERCRICLEREWARD
                            },
                            INNPayAmt: {
                                min: errorCodes.SC_INVALID_PaymentAmount,
                                max: errorCodes.SC_REWARD_AMOUNT
                            }
                        },
                        tooltip_options: {
                            SCInnRWD: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            INNAccNum: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            INNPayAmt: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            }

                        },
                        submitHandler: function(form) {
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                var amountPay = $("#rewardPaymentDue").val();
                                //var rewardType = $('#sc-reward-type-input').val();
                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                paymentBC.SetFieldValue("Transaction Amount", amountPay);
								 //paymentBC.SetFieldValue("Machine Name", machineInfo);
								if(paySCStoreUser=='Y'){
									machineInfo="";
									machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
									if(machineInfo ==""||machineInfo==undefined){
										 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
									}else{
											 paymentBC.SetFieldValue("Machine Name", machineInfo);
										}
										
							     }
                                //paymentBC.SetFieldValue("Transaction Amount", rewardType);
                                var write = false;
                                var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                if (canWrite) {
                                    write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                }
                                var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                if (caninvoke) {
                                    pm.ExecuteMethod("InvokeMethod", "Authorize", null, false);
                                } else {
                                    $("#unatuhOk").click(function() {
                                        $("#SC-CalFreigthMsg").modal('hide');
                                    });
                                    $("#SC-CalFreigthMsg").modal({
                                        backdrop: 'static'
                                    });
                                }
                                newRecord = false;
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }

                    });
                    //End:submit handler for inner circle reward
                    //start:on click of Authorize button in check
                    $("#sc-check-Details").validate({
                        rules: {
                            checkbankacc: {
                                required: true,
                            },
                            checkbankrouting: {
                                required: true,
                            },
                            scchecknumber: {
                                required: true,
                            },
                            checkdrivinglic: {
                                required: true,
								regex:/^[A-Za-z0-9]+$/
                            },
                            checkdrivinglicstate: {
                                required: true,
                            },
                            checkDOB: {
                                required: true,
                            },
                            transamt: {
                                //max: 6000.00,
                                min: 0.001,
                            }
                        },
                        messages: {
                            checkbankacc: {
                                required: errorCodes.SC_REQUIRED_ACCOUNTNUMBER
                            },
                            checkbankrouting: {
                                required: errorCodes.SC_REQUIRED_BANKROUTING
                            },
                            scchecknumber: {
                                required: errorCodes.SC_REQUIRED_CHECKNUMBER
                            },
                            checkdrivinglic: {
                                required: errorCodes.SC_REQUIRED_DRIVINGLICENSE,
								regex:errorCodes.SC_REGEX_DRIVINGLICENSE
                            },
                            checkdrivinglicstate: {
                                required: errorCodes.SC_REQUIRED_DRIVINGLICENSESTATE
                            },
                            checkDOB: {
                                required: errorCodes.SC_REQUIRED_DOB
                            },
                            transamt: {
                                max: errorCodes.SC_TRANSCATION_AMOUNT,
                                min: errorCodes.SC_INVALID_PaymentAmount
                            }
                        },
                        tooltip_options: {
                            checkbankacc: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            checkbankrouting: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            scchecknumber: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            checkdrivinglic: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            checkdrivinglicstate: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            transamt: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            checkDOB: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            }
                        },
                        submitHandler: function(form) {
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                var bankaccountnumber = $("#bankaccountnumber").val();
                                var checknumber = $("#checknumber").val();
                                var bankrouting = $("#bankrouting").val();
                                var driverlicence = $("#driverlicence").val();
                                var driverlicencestate = $("#driverlicencedate").val();
                                var checkPaymentDue = $("#checkPaymentDue").val();
                                var Paymentmethod = $("#Payment-method").val();
                                var DOBVALUE = $("#DOB-img").val();
                                var checkPaymentDue = $("#checkPaymentDue").val();
                                var depositAtStore = $('input[name="ck-dep-str"]:checked').val();

                                SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                paymentBC.SetFieldValue("SC Bank Account Number", bankaccountnumber);
                                paymentBC.SetFieldValue("SC Check Number", checknumber);
                                paymentBC.SetFieldValue("SC Bank Routing Num", bankrouting);
                                paymentBC.SetFieldValue("SC Drivers License Number", driverlicence);
                                paymentBC.SetFieldValue("SC Drivers License State", driverlicencestate);
                                paymentBC.SetFieldValue("SC Date Of Birth", DOBVALUE);
                                paymentBC.SetFieldValue("Transaction Amount", checkPaymentDue);
								// paymentBC.SetFieldValue("Machine Name", machineInfo);
								if(paySCStoreUser=='Y'){
									machineInfo="";
									machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
									if(machineInfo ==""||machineInfo==undefined){
										 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
									}else{
											 paymentBC.SetFieldValue("Machine Name", machineInfo);
										}
										
							     }
                                /*if (depositAtStore == "on") {
                                    paymentBC.SetFieldValue("SC Deposited at Store", "Y");
                                } else {
                                    paymentBC.SetFieldValue("SC Deposited at Store", "N");
                                }*/
                               // var storeuser = "";
                                //storeuser = SiebelApp.S_App.GetProfileAttr("SC Store User");
                                if (paySCStoreUser === 'Y') {
                                    var write = false;
                                    var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                    if (canWrite) {
                                        write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                    }
                                }
                                var IDTypeCode = driverlicencestate;
                                var IDNumber = driverlicence;
                                SiebelJS.Log("Write..:" + write);
                                var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                if (caninvoke) {
                                    if (paySCStoreUser == 'Y') {
                                       
										if($("#SC-check-payment").text()=="CC"){
										   $("#sc-cashier-check-popup").modal({
												backdrop: 'static'
											});
											$("#sc-cashier-check-popup").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
											$(".modal-backdrop").css('background', '#ffffff');
											paymentBC.SetFieldValue("SC Payment Status", "Authorized");
										}else{
											 pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
											var AccessToken =  SiebelApp.S_App.GetProfileAttr("SCAccessToken");
											//var TokenSerialNumber = "404077";
											var CustomerRef = paymentBC.GetFieldValue("SC Contact Id");
											var empNum = paymentBC.GetFieldValue("SC Emp Num");
											//SiebelJS.Log("CustomerRef" + CustomerRef);
											//SiebelJS.Log("empNum" + empNum);
											//var terminalID = SiebelApp.S_App.GetProfileAttr('IP');
											//var balance = $('#giftbeforeactivate').text();
											pm.SetProperty("CheckAccountNumber", bankaccountnumber);
											pm.SetProperty("CheckDOB", DOBVALUE);
											pm.SetProperty("AccessToken", AccessToken);
											//pm.SetProperty("TokenSerialNumber", TokenSerialNumber);
											//pm.SetProperty("TerminalID", terminalID);
											pm.SetProperty("ManualCheckNumber", checknumber);
											pm.SetProperty("TransitRoutingNumber", bankrouting);
											pm.SetProperty("IDTypeCode", IDTypeCode);
											pm.SetProperty("IDNumber", IDNumber);
											pm.SetProperty("Clerk", empNum);
											pm.SetProperty("CheckAmount", checkPaymentDue);
											pm.SetProperty("CustomerReference", CustomerRef);
											pm.SetProperty("ObjectId", paymentBC.GetFieldValue("Id"));
											 pm.OnControlEvent("SC_CHECK_AUTHORIZE");
										}
                                       
										if(paymentBC.GetFieldValue("SC Payment Status") == "Authorized"){
											paymentBC.SetFieldValue("SC Deposited at Store", "Y");
											var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
											if(canWrite){
												SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
											}
										}
                                    } else{
                                        pm.ExecuteMethod("InvokeMethod", "Authorize", null, false);
									}
								} else {
                                    $("#unatuhOk").click(function() {
                                        $("#SC-CalFreigthMsg").modal('hide');
                                    });
                                    $("#SC-CalFreigthMsg").modal({
                                        backdrop: 'static'
                                    });
                                }
                                newRecord = false;
                                notCommited = false;
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }

                    });
                    //End:on click of Authorize button in Check
                    //start:on click of Authorize button in Credit-Card
                    $("#creditCardDetails").validate({
                        rules: {
                            creditCardNum: {
                                required: true,
                                maxlength: 20
                            },
                            creditcvv: {
                                required: true,
                            },
                            creditExpMonth: {
                                required: true,
                                maxlength: 2
                            },
                            creditExpYear: {
                                required: true,
                                maxlength: 4
                            },
                            creditAmount: {
                                required: true,
                                min: 0.001
                            }
                        },
                        messages: {
                            creditCardNum: {
                                required: errorCodes.SC_INVALID_CCNumber,
                            },
                            creditcvv: {
                                required: errorCodes.SC_INVALID_CVV,
                            },
                            creditExpMonth: {
                                required: errorCodes.SC_INVALID_ExpMonth,
                            },
                            creditExpYear: {
                                required: errorCodes.SC_INVALID_ExpYear,
                            },
                            creditAmount: {
                                required: errorCodes.SC_INVALID_PaymentAmount,
                                min: errorCodes.SC_INVALID_PaymentAmount
                            }
                        },
                        tooltip_options: {
                            creditCardNum: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            creditcvv: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            creditExpMonth: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            creditExpYear: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            creditAmount: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            }
                        },
                        submitHandler: function(form) {
                           $("body").trigger('Custom.Start');
							setTimeout(function () {
								// Vamsi : #664 Verbal Auth
								var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
								if(paymentStatus == "Need Verbal Authorization"){
									var ccAuthCode = $("#CCAuthCode").val();
									if (ccAuthCode != null && ccAuthCode != undefined && ccAuthCode != "") {
										paymentBC.SetFieldValue("Authorization Code", ccAuthCode);
										//paymentBC.SetFieldValue("Machine Name", machineInfo);
										if (paySCStoreUser == 'Y') {
											machineInfo = "";
											machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
											if (machineInfo != "" || machineInfo != undefined) {
												paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number") + '_Other');
											} else {
												paymentBC.SetFieldValue("Machine Name", machineInfo);
											}

										}
										//paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
										var write = false;
										var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
										if (canWrite) {
											write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
											var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
										}
									}
								}
								if (paymentStatus == "Need Verbal Authorization" && P2PEFlag != "Y") {
									pm.SetProperty("PreStatus", "Need Verbal Authorization");
									var ccAuthCode = $("#CCAuthCode").val();
									if (ccAuthCode != null && ccAuthCode != undefined && ccAuthCode != "") {
										var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
										if (caninvoke) {
											//var isStoreUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
											if (paySCStoreUser == "Y") {
												pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
												var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
												pm.SetProperty("AccessToken", AccessToken);
												pm.SetProperty("FunctionCode", "05");
												pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
												pm.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
											} else {
												pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
												pm.OnControlEvent("CC_NEED_VERBAL_AUTH");
											}
											if (pm.Get("PreStatus") == "Need Verbal Authorization") {
												if (paymentBC.GetFieldValue("SC Payment Status") == "Authorized") {
													paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
													var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
													if (canWrite) {
														SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
													}
												}
												pm.SetProperty("PreStatus", "");
											}
											$("#SC-CreditCard").removeClass("SC-disabled");
										}
									}
								} else {
									var amountPay = $("#creditPaymentDue").val();
									if (P2PEFlag != "Y") {
										var cardNumber = $("#Creditcard-Number").val();
										var cvv = $("#creditCVV").val();
										var expMonth = $("#creditExpM").val();
										var expYear = $("#creditExpY").val();
										if (paySCStoreUser != "Y") {
											var payType = $("#SC-credit-payment").text();
										}
										SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
										paymentBC.SetFieldValue("SC Credit Card Number", cardNumber);
										paymentBC.SetFieldValue("SC CVV Number", cvv);
										paymentBC.SetFieldValue("SC Expiration Month", expMonth);
										paymentBC.SetFieldValue("Expiration Year", expYear);
									}
									var total = orderBC.GetFieldValue("Order Total");
									SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
									paymentBC.SetFieldValue("Transaction Amount", amountPay);
									//paymentBC.SetFieldValue("Machine Name", machineInfo);
									if (paySCStoreUser == 'Y') {
										machineInfo = "";
										machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
										if (machineInfo == "" || machineInfo == undefined) {
											paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number") + '_Other');
										} else {
											paymentBC.SetFieldValue("Machine Name", machineInfo);
										}

									}
									var write = false;
									var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
									if (canWrite) {
										write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
									}
									var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
									SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
									if (caninvoke) {
										pm.SetProperty("PaymentMethod", paymentBC.GetFieldValue("Payment Method"));
										pm.SetProperty("CreditCardType", paymentBC.GetFieldValue("SC Payment Type Code"));
										pm.SetProperty("PaymentAmount", amountPay);
										pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
										pm.SetProperty("AccountNumber", paymentBC.GetFieldValue("Account Number"));
										pm.SetProperty("PaymentStatus", paymentBC.GetFieldValue("SC Payment Status"));
										pm.SetProperty("AuthorizationCode", paymentBC.GetFieldValue("Authorization Code"));
										pm.SetProperty("SCOrderTotal", total);
										//var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
										if (paySCStoreUser == 'Y') {
											pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
											var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
											pm.SetProperty("AccessToken", AccessToken);
											pm.SetProperty("FunctionCode", "");
											if(P2PEFlag == "Y" && paymentStatus != "Need Verbal Authorization"){
												$("#custommaskoverlay").show();
												$("#SC-P2PE-Auth").modal({
													backdrop: 'static'
												});
												$("#SC-P2PE-Auth").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
											}
											setTimeout(function () {
												pm.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
											},1000);
										} else {
											pm.SetProperty("CalcCreditCardNumber", cardNumber);
											pm.SetProperty("CalcCVVNumber", cvv);
											pm.SetProperty("CalcExpMonth", expMonth);
											pm.SetProperty("CalcExpYear", expYear);
											pm.OnControlEvent("CS_AUTHORIZE_BUTTON_CLICK");
										}
										$("#SC-CreditCard").removeClass("SC-disabled");
									} else {
										$("#unatuhOk").click(function () {
											$("#SC-CalFreigthMsg").modal('hide');
										});
										$("#SC-CalFreigthMsg").modal({
											backdrop: 'static'
										});
									}
								}
								notCommited = false;
								newRecord = false;
								$(".active-tab").each(function () {
									$('#' + this.id).removeClass("active-tab");
								});
								//hiding the Loader
								$("body").trigger('Custom.End');
							}, 1000);
                        }

                    });
                    //End:on click of Authorize button in Credit-Card

                    //start:on click of Authorize button in Credit-Card
                    $("#SC-GiftCard-Details").validate({
                        rules: {
                            giftcardNumber: {
                                required: true,
                                maxlength: 20
                            },
                            giftcardPIN: {
                                required: true,
                                maxlength: 4
                            },
                            giftPaymentDue: {
                                required: true,
                                min: 0.001
                            }
                        },
                        messages: {
                            giftcardNumber: {
                                required: errorCodes.SC_INVALID_GCNumber,
                            },
                            giftcardPIN: {
                                required: errorCodes.SC_INVALID_PIN,
                            },
                            giftPaymentDue: {
                                required: errorCodes.SC_INVALID_PaymentAmount,
                                min: errorCodes.SC_INVALID_PaymentAmount
                            }
                        },
                        tooltip_options: {
                            giftcardNumber: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            giftcardPIN: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            giftPaymentDue: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            }
                        },
                        submitHandler: function(form) {
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                // Vamsi : #664 Verbal Auth
                                var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
                                if (paymentStatus == "Need Verbal Authorization") {
									pm.SetProperty("PreStatus","Need Verbal Authorization");
                                    var gcAuthCode = $("#GCAuthCode").val();
									if(gcAuthCode!=null && gcAuthCode!=undefined && gcAuthCode!=""){
									//paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
										paymentBC.SetFieldValue("Authorization Code", gcAuthCode);
										//paymentBC.SetFieldValue("Machine Name", machineInfo);
										 if(paySCStoreUser=='Y'){
											machineInfo="";
											machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
											if(machineInfo ==""||machineInfo==undefined){
												 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
											}else{
													 paymentBC.SetFieldValue("Machine Name", machineInfo);
												}
										
							             }
										var write = false;
										var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
										if (canWrite) {
											write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
										}
										var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
										if (caninvoke) {
											//var isStoreUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
											if (paySCStoreUser == "Y") {
												pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
												var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
												pm.SetProperty("AccessToken", AccessToken);
												pm.SetProperty("FunctionCode", "05");
												pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
												pm.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
											} else {
												pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
												pm.OnControlEvent("CC_NEED_VERBAL_AUTH");
											}
											if(pm.Get("PreStatus") == "Need Verbal Authorization"){
												if(paymentBC.GetFieldValue("SC Payment Status") == "Authorized"){
													paymentBC.SetFieldValue("Manual Authorization Flag", "Y");
													var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
													if(canWrite){
														SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
													}
												}
												pm.SetProperty("PreStatus","");
											}
											$("#SC-giftcard").removeClass("SC-disabled");
										}
								  }
                                } else {
                                    var cardNumber = $("#giftcardNumber").val();
                                    var pin = $("#giftcardPIN").val();
                                    var amountPay = $("#giftPaymentDue").val();
                                    SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                                    paymentBC.SetFieldValue("SC Credit Card Number", cardNumber);
                                    paymentBC.SetFieldValue("SC CVV Number", pin);
                                    paymentBC.SetFieldValue("Transaction Amount", amountPay);
									//paymentBC.SetFieldValue("Machine Name", machineInfo);
									 if(paySCStoreUser=='Y'){
										machineInfo="";
										machineInfo = SCOUIMethods.SCGetProfileAttrValue('MachineInfo');
										if(machineInfo ==""||machineInfo==undefined){
											 paymentBC.SetFieldValue("Machine Name", orderBC.GetFieldValue("SC Location Store Number")+'_Other');
										}else{
												 paymentBC.SetFieldValue("Machine Name", machineInfo);
											}
										
							        }
                                    var write = false;
                                    var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                                    if (canWrite) {
                                        write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                                    }
                                    var caninvoke = pm.ExecuteMethod("CanInvokeMethod", "Authorize");
                                    SiebelJS.Log("CanInvoke of Auth..:" + caninvoke);
                                    if (caninvoke) {
                                        pm.SetProperty("PaymentMethod", paymentBC.GetFieldValue("Payment Method"));
                                        pm.SetProperty("GiftCardType", paymentBC.GetFieldValue("SC Payment Type Code"));
                                        pm.SetProperty("CalcGiftCardNumber", amountPay);
                                        pm.SetProperty("CalcPIN", pin);
                                        pm.SetProperty("PaymentAmount", amountPay);
                                        pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
                                        pm.SetProperty("AccountNumber", paymentBC.GetFieldValue("Account Number"));
                                        pm.SetProperty("SCOrderTotal", orderBC.GetFieldValue("Order Total"));
                                        pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
                                        var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
                                        pm.SetProperty("AccessToken", AccessToken);
                                        pm.SetProperty("GetGCBalanceFlag", "N");
                                        //var storeUser = SiebelApp.S_App.GetProfileAttr('SC Store User');
                                        if (paySCStoreUser == 'Y') {
                                            pm.SetProperty("FunctionCode", "");
                                            if(P2PEFlag == "Y"){
												$("#custommaskoverlay").show();
												$("#SC-P2PE-Auth").modal({
													backdrop: 'static'
												});
												$("#SC-P2PE-Auth").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
											}
											setTimeout(function () {
												pm.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
											},1000);
                                        } else {
                                            pm.OnControlEvent("CS_AUTHORIZE_BUTTON_CLICK");
                                        }
										$("#SC-giftcard").removeClass("SC-disabled");
                                    } else {
                                        $("#unatuhOk").click(function() {
                                            $("#SC-CalFreigthMsg").modal('hide');
                                        });
                                        $("#SC-CalFreigthMsg").modal({
                                            backdrop: 'static'
                                        });
                                    }
                                }
                                newRecord = false;
                                $(".active-tab").each(function() {
                                    $('#' + this.id).removeClass("active-tab");
                                });
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }
                    });
                    //End:on click of Authorize button in Credit-Card


                    $("#credit-hidden").change(function() {
                        var x = document.getElementById("credit-hidden");
                        var cardInfo = document.getElementById("Creditcard-Number");
                        var cardcvv = document.getElementById("creditCVV");
                        var len = x.value.length;
                        if (len < 25) {
                            x.value = "";
                            document.getElementById("credit-hidden").focus();
                        } else {
							 $("#SC-SO-GetAuth-Token").modal({
							   backdrop: 'static'
							 });
							$("#SC-SO-GetAuth-Token").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
                            var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
                            cardcvv.value = "***";
                            // vamsi ICX: 5APR18 : #626 Card Swipe
                            var expInfo = token.split('^');
                            expInfo = expInfo[2];
                            var year = expInfo.substring(0, 2);
                            var yearobj = document.getElementById("creditExpY");
                            yearobj.value = "20" + year;
                            var month = expInfo.substring(2, 4);
                            var monthobj = document.getElementById("creditExpM");
                            monthobj.value = month;
							 $('#credit-hidden').blur();

                        }
                    });

                    $("#Gift-hidden").change(function() {
                        var x = document.getElementById("Gift-hidden");
                        var cardInfo = document.getElementById("giftcardNumber");
                        var pin = document.getElementById("giftcardPIN");
                        var len = x.value.length;
                        if (len < 16) {
                            x.value = "";
                           if (P2PEFlag != "Y") {
								document.getElementById("Gift-hidden").focus();
							}
                        } else {
							 $("#SC-SO-GetAuth-Token").modal({
							   backdrop: 'static'
							 });
							$("#SC-SO-GetAuth-Token").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
                            var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
                            pin.value = "****";
							$('#Gift-hidden').blur();
                        }
                    });

                   $("#credit-hidden").blur(function() {
                        var x = document.getElementById("credit-hidden");
                        var cardInfo = document.getElementById("Creditcard-Number");
                        var cardcvv = document.getElementById("creditCVV");
                        var len = x.value.length;
                        if (len < 25) {
                            x.value = "";
                            document.getElementById("credit-hidden").focus();
                        } else {
                            var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
                            cardcvv.value = "***";
                            // Vamsi ICX: 5APR18 : #626 Card Swipe
                            var expInfo = token.split('^');
                            expInfo = expInfo[2];
                            var year = expInfo.substring(0, 2);
                            var yearobj = document.getElementById("creditExpY");
                            yearobj.value = "20" + year;
                            var month = expInfo.substring(2, 4);
                            var monthobj = document.getElementById("creditExpM");
                            monthobj.value = month;
                            SiebelJS.Log("Year...:" + year);
                            SiebelJS.Log("Month..:" + month);
                            var CustomerName = firstName + " " + lastName;
                            var TrackInfo = $("#credit-hidden").val();
                            var StreetAddress = orderBC.GetFieldValue("SC Con Bill To Address") + " " + state;
                            var ZipCode = postalCode;
                            var total = orderBC.GetFieldValue("Order Total");
                            var loctionId = paymentBC.GetFieldValue("SC Sale Location Id");
                            //pm.ExecuteMethod("InvokeMethod","GetAccessToken", null, false);
                            //var AccessToken = theApplication().GetProfileAttr("SCAccessToken");
                            //var TokenSerialNumber = paymentBC.GetFieldValue("SC Shift4 API Serial Number");
                            //var AccessToken = "4B2BC0EE-D777-4D3C-A01A-011EF3D854E4";
                            //var TokenSerialNumber = "404077";
							var PaymentId = paymentBC.GetFieldValue("Id");
                            var TerminalID = SCOUIMethods.SCGetProfileAttrValue('IP');
							pm.SetProperty("PaymentsRowID", PaymentId);
                            pm.SetProperty("TrackInformation", TrackInfo);
                            pm.SetProperty("CustomerName", CustomerName);
                            pm.SetProperty("StreetAddress", StreetAddress);
                            pm.SetProperty("ZipCode", ZipCode);
                            pm.SetProperty("AccessToken", "");
                            pm.SetProperty("TokenSerialNumber", "");
                            pm.SetProperty("TerminalID", TerminalID);
                            x.value = "";
						   pm.OnControlEvent("SU_AUTHORIZE_BUTTON_CLICK");
                          }
						if (P2PEFlag != "Y") {  
							if(paySCStoreUser != "Y"){
								if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="" && document.getElementById("SC-credit-payment").innerText!="Select")
									$("#SC-CreditCard").removeClass("SC-disabled");
								else
									$("#SC-CreditCard").addClass("SC-disabled");
							}else{
								if($("#Creditcard-Number").val()!="" && $("#creditCVV").val() !="" && ($("#creditExpM").val() !="" || $("#creditExpM").val() != null) && ($("#creditExpY").val()!= null || $("#creditExpY").val()!="") && $("#creditPaymentDue").val()!="")
								   $("#SC-CreditCard").removeClass("SC-disabled");
								else
									$("#SC-CreditCard").addClass("SC-disabled");
							}
						}
						
                    });

                    $("#Gift-hidden").blur(function() {
						
                        var x = document.getElementById("Gift-hidden");
                        var cardInfo = document.getElementById("giftcardNumber");
                        var pin = document.getElementById("giftcardPIN");
                        var len = x.value.length;
                        if (len < 16) {
                            x.value = "";
                            if (P2PEFlag != "Y") {
								document.getElementById("Gift-hidden").focus();
							}
                        } else {
							 var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
                            pin.value = "****";
                            var CustomerName = firstName + " " + lastName;
                            var TrackInfo = $("#Gift-hidden").val();
                            var StreetAddress = orderBC.GetFieldValue("SC Con Bill To Address") + " " + state;
                            var ZipCode = postalCode;
                            var loctionId = paymentBC.GetFieldValue("SC Sale Location Id");
                            //var AccessToken = "4B2BC0EE-D777-4D3C-A01A-011EF3D854E4";
                            //var TokenSerialNumber = "404077";
                            //pm.ExecuteMethod("InvokeMethod","GetAccessToken", null, false);
                            //var AccessToken = theApplication().GetProfileAttr("SCAccessToken");
							var PaymentId = paymentBC.GetFieldValue("Id");
							var TerminalID = SCOUIMethods.SCGetProfileAttrValue('IP');
							pm.SetProperty("PaymentsRowID", PaymentId);
                            pm.SetProperty("TrackInformation", TrackInfo);
                            pm.SetProperty("CustomerName", CustomerName);
                            pm.SetProperty("StreetAddress", StreetAddress);
                            pm.SetProperty("ZipCode", ZipCode);
                            pm.SetProperty("AccessToken", "");
                            pm.SetProperty("TokenSerialNumber", "");
                            pm.SetProperty("TerminalID", TerminalID);
                            x.value = "";
                            pm.OnControlEvent("SU_GETGC_TOKEN");
							
                        }
						
                    });

                    $("#giftcard-token").blur(function() {
                        var x = document.getElementById("giftcard-token");
                        var cardInfo = document.getElementById("activate-GC-Number");
                        var len = x.value.length;
                        if (len < 25) {
                            x.value = "";
                            document.getElementById("giftcard-token").focus();
                        } else {
                            var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
							var CustomerName = firstName + " " + lastName;
                            var TrackInfo = $("#giftcard-token").val();
							pm.SetProperty("TrackInformation", TrackInfo);
                            var StreetAddress = orderBC.GetFieldValue("SC Con Bill To Address") + " " + state;
                            var ZipCode = postalCode;
                            var loctionId = paymentBC.GetFieldValue("SC Sale Location Id");
                            var PaymentId = paymentBC.GetFieldValue("Id");
							var TerminalID = SCOUIMethods.SCGetProfileAttrValue('IP');
							pm.SetProperty("PaymentsRowID", PaymentId);
                            pm.SetProperty("TrackInformation", TrackInfo);
                            pm.SetProperty("CustomerName", CustomerName);
                            pm.SetProperty("StreetAddress", StreetAddress);
                            pm.SetProperty("ZipCode", ZipCode);
                            pm.SetProperty("AccessToken", "");
                            pm.SetProperty("TokenSerialNumber", "");
                            pm.SetProperty("TerminalID", TerminalID);
                            x.value = "";
                            //pm.OnControlEvent("SU_GETGC_TOKEN");
                        }
					});
					
					$("#giftcard-token").change(function() {
                        var x = document.getElementById("giftcard-token");
                        var cardInfo = document.getElementById("activate-GC-Number");
                        var len = x.value.length;
                        if (len < 25) {
                            x.value = "";
                            document.getElementById("giftcard-token").focus();
                        } else {
                            var token = x.value;
                            var cardNumber = token.substring(2, 6);
                            cardNumber = "**** **** **** " + cardNumber;
                            cardInfo.value = cardNumber;
                        }
					});

                    //Code for launching 4Go applicaion on clicking manual input button
                    $("#CCManualInput ,#GCManualInput ,#sc-gc-manual-input").click(function(e) {
						//pm.ExecuteMethod("InvokeMethod","Launch4Go", null, false);
                        SCOUIMethods.Invoke4Go();
                    });
					
					$("#sc-clear-form").click(function() {
						$("#giftcard-token").val("");
						$("#activate-GC-Number").val("");
						$("#giftcard-token").focus();
					});

                    //Authorization popup
                    $("#SC-Authorise-button").click(function() {
                        $("#SC-auth-success").modal({
                            backdrop: 'static'
                        });

                        $("#SC-auth-success").css({
                            "display": "flex",
                            "justify-content": "center",
                            "align-items": "center"
                        });
                        $(".modal-backdrop").css('background', '#ffffff');

                        setTimeout(function() {
                            $("#SC-auth-success").modal('hide');
                            $("#SC-auth-success").css({
                                "display": "",
                                "justify-content": "",
                                "align-items": ""
                            });
                        }, 2000);
                    });

                    $("#SC-Add-payment-button").click(function() {
                        $("#SC-failed-payment-details").show();
                    });

                    $("#salesrepfirst").click(function() {
                        SC_OUI_Markups.SCSalesRepTable(Dataarray, "firstset");
                    });
                    $("#salesrepprev").click(function() {
                        SC_OUI_Markups.SCSalesRepTable(Dataarray, "prevset");
                    });
                    $("#salesrepnext").click(function() {
                        SC_OUI_Markups.SCSalesRepTable(Dataarray, "nextset");
                    });
                    $("#salesreplast").click(function() {
                        SC_OUI_Markups.SCSalesRepTable(Dataarray, "lastset");
                    });


                    //on click of submit of payments 
                    $("#SC-submit-select-payment").click(function() {
                        console.log(selectpaymentId);
                        $("#SC-payments-type").modal('hide');
                    });
					
                    //on click of refund button
                    $("#SC-refund").click(function() {
                        $(this).hide();
                        SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].InvokeMethod("SCGenerateRefund");
                        $("#SC-complete").show();
                        $("#SC-complete").removeClass("displaynone");
                        localStorage.setItem("comingfrom", "refundbtn");
                    });
					//Start:Code for Focus out of Finance Account number
					$(document).on("focusout", "#financeaccountnumber", function() {
                        if ($(this).val() != "") {
							$("#custommaskoverlay").show();	 
							setTimeout(function() {
								var accountNumber = $("#financeaccountnumber").val();
								SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
								paymentBC.SetFieldValue("Account Number", accountNumber);
								$("#custommaskoverlay").hide();
							},2000);
						}
					});
					//End:Code for Focus out of Finance Account number
					
                    //Start:on focus out of Reward Type input field
                    $(document).on("focusout", "#sc-reward-type-input", function() {
                        if ($(this).val() != "") {
                            SiebelJS.Log($(this).val());
                            SiebelApp.S_App.GetActiveView().SetActiveApplet(SiebelApp.S_App.GetActiveView().GetAppletMap()[appletName]);
                            paymentBC.SetFieldValue("SC Voucher Number", $(this).val());
                            /*(function(proxied) {
                                window.alert = function() {
                                    if (arguments[0].includes("Wrong field values or value types detected")) {
                                        return true;
                                        SiebelJS.Log("supressed");
                                    } else
                                        return proxied.apply(this, arguments);
                                };
                            })(window.alert);*/
                            var write = false;
                            var canWrite = pm.ExecuteMethod("CanInvokeMethod", "WriteRecord");
                            //if (canWrite) {
                            //    write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
                            //}
                            SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("PicKICAccountNumber");
                            if (paymentBC.GetFieldValue("Account Number")=="") {
                                $("#sc-reward-type").trigger("click");
                            }
                            $('#rewardaccountnumber').val(paymentBC.GetFieldValue("Account Number"));
							//SPATIBAN:Added code for Setting Transaction Amount
							var scRwdAmt="";
							scRwdAmt=paymentBC.GetFieldValue("Transaction Amount")==""?0.00:parseFloat(paymentBC.GetFieldValue("Transaction Amount"));
							$('#rewardPaymentDue').val(scRwdAmt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"));
							if($("#sc-reward-type-input").val()!="" && $("#rewardaccountnumber").val()!="" && $("#rewardPaymentDue").val()!="" && document.getElementById("SC-reward-payment").innerText!="Select"){
									$("#SC-reward").removeClass("SC-disabled");
							}
							else
								$("#SC-reward").addClass("SC-disabled");
                        }
                    });
                    //End:on focus out of Reward Type input field

                    var salesreprowid;
                    //highlating the row in commisionable sales rep popup
                    $(document).on('click', '#sc-sales-rep-table tr', function() {
                        salesreprowid = $(this).attr('id');
                        $('#' + salesreprowid).addClass('highlate-row').siblings().removeClass('highlate-row');
                        $("#SC-select-salesrep").removeClass('SC-disabled');
                    });


                    //$(".sc-sales-search-box").keyup(function(event) {
                    $(document).on("click", "#sc-search-salesrep", function() {
                        if ((document.getElementById('sc-sales-fst').value != "" || document.getElementById('sc-sales-login').value != '' || document.getElementById('sc-sales-lst').value != '')) {
                            //Start loader 
                            $("body").trigger('Custom.Start');
                            setTimeout(function() {
                                var searchSpec = "";
                                var InPS = SiebelApp.S_App.NewPropertySet();
                                var OutPS = SiebelApp.S_App.NewPropertySet();
                                var Service = SiebelApp.S_App.GetService("SC Get Employee");
								var empsearchSpec="[Employee Type Code]='Employee'";
                                if (document.getElementById('sc-sales-fst').value != '') {
                                    searchSpec = '([First Name] Like "*' + document.getElementById('sc-sales-fst').value + '*" OR [First Name] Like "*' + document.getElementById('sc-sales-fst').value.toUpperCase() + '*" AND '+empsearchSpec+')';
                                }
                                if (document.getElementById('sc-sales-login').value != '' && searchSpec == "") {
                                    searchSpec += '([Login Name] Like "*' + document.getElementById('sc-sales-login').value + '*" OR [Login Name] Like "*' + document.getElementById('sc-sales-login').value.toUpperCase() + '*" AND '+empsearchSpec+')'
                                } else if (document.getElementById('sc-sales-login').value != '' && searchSpec != "") {
                                    searchSpec += ' AND ([Login Name] Like "*' + document.getElementById('sc-sales-login').value + '*" OR [Login Name] Like "*' + document.getElementById('sc-sales-login').value.toUpperCase() + '*" AND '+empsearchSpec+')'
                                }
                                if (document.getElementById('sc-sales-lst').value != '' && searchSpec == "") {
                                    searchSpec += '[Last Name] Like "*' + document.getElementById('sc-sales-lst').value + '*" OR [Last Name] Like "*' + document.getElementById('sc-sales-lst').value.toUpperCase() + '*" AND '+empsearchSpec+''
                                } else if (document.getElementById('sc-sales-lst').value != '' && searchSpec != "") {
                                    searchSpec += ' AND ([Last Name] Like "*' + document.getElementById('sc-sales-lst').value + '*" OR [Last Name] Like "*' + document.getElementById('sc-sales-lst').value.toUpperCase() + '*" AND '+empsearchSpec+')'
                                }

                                InPS.SetProperty("SearchExpr", searchSpec);
                                OutPS = Service.InvokeMethod("GetEmployee", InPS);
                                var Child = OutPS.GetChild(0);
                                var BS_Data = Child.GetProperty("Count");
                                if (BS_Data > 0) {
                                    BS_Data = Child.GetProperty("FieldValues");
                                    Dataarray = BS_Data.split(',');
                                    var seen = {};
                                    var out = [];
                                    var len = Dataarray.length;
                                    var j = 0;
                                    for (var i = 0; i < len; i++) {
                                        var item = Dataarray[i];
                                        if (seen[item] !== 1) {
                                            seen[item] = 1;
                                            out[j++] = item;
                                        }
                                    }
                                    Dataarray = out;
                                    SC_OUI_Markups.SCSalesRepTable(Dataarray, "neww");
                                } else {
                                    $("#sc-sales-rep-table").html("");
                                }
                                //hiding the Loader
                                $("body").trigger('Custom.End');
                            }, 1000);
                        }
                    });
					$(document).on('click', '#SC-receipt-ok', function() {
						$("#SC-Receipt-Error").modal('hide');
                        $("#SC-Receipt-Error").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
						var Recordo = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
						
						if (Recordo[0]["SC Tax Verification Pending"] === 'Y' && Recordo[0]["Tax Exempt"] === 'Y') {
							$("#SC-SO-order-hold").modal({
								backdrop: 'static'
							});
							$("#SC-SO-order-hold").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
						} else if (Recordo[0]["Status"] == "Hold") {
							$("#SC-SO-order-just-hold").modal({
								backdrop: 'static'
							});
							$("#SC-SO-order-just-hold").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
						} else if (Recordo[0]["Status"] == "Siebel Error") {
							$("#SC-SO-order-sibel-error").modal({
								backdrop: 'static'
							});
							$("#SC-SO-order-sibel-error").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
						}
						else if (Recordo[0]["Status"] == "Oracle Error") {
							$("#SC-SO-order-oracle-error").modal({
								backdrop: 'static'
							});
							$("#SC-SO-order-oracle-error").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
						}else if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get('GetRecordSet').length > 0) {
							//$("body").trigger('Custom.Start');
							setTimeout(function() {
								if(Recordo[0]["Status"]!="Oracle Error" && Recordo[0]["Status"]!="Siebel Error" && Recordo[0]["Status"] !="Hold" && Recordo[0]["SC Tax Verification Pending"] != 'Y' && Recordo[0]["Tax Exempt"] != 'Y'){
									/*if (itemsCount > 0) {
										$("#SC-SO-schedule-hd").modal({
											backdrop: 'static'
										});
										$("#SC-SO-schedule-hd").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else {*/
										//else go with isn't success
									   // $(".modal-backdrop").css('background', '#ffffff');
										SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
									//}
								}
								//hiding the Loader
								$("body").trigger('Custom.End');
							}, 1000);
						} 
					});
					var waitTime=SCOUIMethods.SCGetOrderLoVs("[Type]= 'SC_SETTIMEOUT_RECEIPT' and [Active] = 'Y' AND [Name]='TimeOut'");	
                    waitTime=parseInt(waitTime);
					//open generate Receipt popup
                    //open generate Receipt popup for non P2PE store users
					$(document).on('click', '#SC-generate-receipt', function () {
						$("#SC-SO-order-complete").modal('hide');
						$("#SC-SO-order-complete").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						generate_receipt("Original");
					});
					//on click of generate store receipt pop up for P2PE store users
					
					$(document).on('click', '#SC-generate-store-receipt', function () {
						/* $("#SC-SO-store-receipt").modal({
							backdrop: 'static'
						}); */
						$("#SC-SO-store-receipt").modal('hide');
						$("#SC-SO-store-receipt").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						store_receipt="Y";
						generate_receipt("Merchant");
						SiebelJS.Log("After generate receipt in store");
					});
					
					//on click of generate customer receipt pop up for P2PE store users
					$(document).on('click', '#SC-generate-customer-receipt', function () {
						$("#SC-SO-customer-receipt").modal('hide');
						$("#SC-SO-customer-receipt").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						SiebelJS.Log("before generate receipt");
						generate_receipt("Customer");
						SiebelJS.Log("After generate receipt");
					});
					var waitTime=SCOUIMethods.SCGetOrderLoVs("[Type]= 'SC_SETTIMEOUT_RECEIPT' and [Active] = 'Y' AND [Name]='TimeOut'");	
                    waitTime=parseInt(waitTime);
					//Code for generating reciept starts
					function generate_receipt(receipt_mode){
						SiebelJS.Log("receipt mode:" + receipt_mode);
						SiebelJS.Log("bip id:" + orderId);
						SiebelJS.Log("bip ordernumber:" + orderNumberBS);
						//$("body").trigger('Custom.Start');
						$("#custommaskoverlay").show();
						setTimeout(function () {
							if (orderId != null) {
								orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp();
								var SC_reportName = "",
									reportStatus = "";
								var InPS3 = SiebelApp.S_App.NewPropertySet();
								var OutPS3 = SiebelApp.S_App.NewPropertySet();
								InPS3.SetProperty("bipordernumber", orderNumberBS);
								InPS3.SetProperty("biporderrowid", orderId);
								InPS3.SetProperty("receiptmode",receipt_mode);
								var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
								var OrderSubType=orderBC.GetFieldValue("SC Sub-Type")
								if(OrderSubType == "Wholesale" || OrderSubType == "Commercial" || OrderSubType == "QVC" || OrderSubType == "Internal")
									OutPS3 = Service3.InvokeMethod("SC WC Reciept Generation", InPS3);
								else
									OutPS3 = Service3.InvokeMethod("SC Reciept Generation", InPS3);
								setTimeout(function() {
								//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
								//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "RefreshBusComp", null, false);
								//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "RefreshAppletUI", null, false);
								var scReportName=theApplication().GetProfileAttr("ReportName");
								scReportName='"'+scReportName+'"';
								FieldQueryPair={"Report Name": scReportName};
								SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Report Output List Applet");
								$("#custommaskoverlay").hide();
								var scReportrcdlen=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get('GetRecordSet').length
								if(scReportrcdlen==0){
									$("#SC-Receipt-Error").modal({
										backdrop: 'static'
									});
									$("#SC-Receipt-Error").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								}
								else{
								reportStatus = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().GetFieldValue("Status");
								
								if (reportStatus != "Success") {
									$("#SC-Receipt-Error").modal({
										backdrop: 'static'
									});
									$("#SC-Receipt-Error").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								} else {
									SC_reportName = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().GetFieldValue("ReportOutputFileName");
									//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "RefreshBusComp", null, false);
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
									setTimeout(function () {
										$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
										setTimeout(function () {
											$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
											//var storeuser = "";
											//storeuser = SiebelApp.S_App.GetProfileAttr("SC Store User");
											setTimeout(function () {
											if (paySCStoreUser == 'Y') {
												if(P2PEFlag == "Y"){
													autoPrint(SC_reportName);
												}else{
													SCOUIMethods.AutoPrint(SC_reportName);
												}
											}
											if(receipt_mode == "Merchant"){
												$("#SC-SO-store-receipt").modal('hide');
												$("#SC-SO-customer-receipt").modal({
													backdrop: 'static'
												});
												$("#SC-SO-customer-receipt").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
											}
											else
											invokeafterAutoprint(receipt_mode);
											}, 1000);
										}, 1000);
									}, 1000);

									//Code for generating reciept ends

									//saddala added if generate receipt isn't wokring
									//code for popups to be displayed starts from here
									/* SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
									var Recordo = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
									// if(localStorage.getItem("comingfrom")=="refundbtnsubmit"){
									//	localStorage.setItem("comingfrom","");
									//	$(".modal-backdrop").css('background', '#ffffff');
									//	SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
									//} 
									if (Recordo[0]["SC Tax Verification Pending"] === 'Y' && Recordo[0]["Tax Exempt"] === 'Y') {
										$("#SC-SO-order-hold").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-hold").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									} else if (Recordo[0]["Status"] == "Hold") {
										$("#SC-SO-order-just-hold").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-just-hold").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (Recordo[0]["Status"] == "Siebel Error") {
										$("#SC-SO-order-sibel-error").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-sibel-error").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (Recordo[0]["Status"] == "Oracle Error") {
										$("#SC-SO-order-oracle-error").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-oracle-error").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get('GetRecordSet').length > 0) {
										//Start loader 
										//$("body").trigger('Custom.Start');
										setTimeout(function () {
											if (Recordo[0]["Status"] != "Oracle Error" && Recordo[0]["Status"] != "Siebel Error" && Recordo[0]["Status"] != "Hold" && Recordo[0]["SC Tax Verification Pending"] != 'Y' && Recordo[0]["Tax Exempt"] != 'Y') {
												//if (itemsCount > 0 && (receipt_mode == "Original" || receipt_mode == "Customer")) {
												//	$("#SC-SO-schedule-hd").modal({
													//	backdrop: 'static'
													//});
													//$("#SC-SO-schedule-hd").css({
													//	"display": "flex",
													//	"justify-content": "center",
													//	"align-items": "center"
													//});
												//}else {
													if(receipt_mode == "Original" || receipt_mode == "Customer"){
														SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
													}else if (receipt_mode == "Merchant" && OrderSubType != "Wholesale" && OrderSubType != "Commercial" && OrderSubType != "QVC" && OrderSubType != "Internal"){
														$("#SC-SO-store-receipt").modal('hide');
														$("#SC-SO-customer-receipt").modal({
															backdrop: 'static'
														});
														$("#SC-SO-customer-receipt").css({
															"display": "flex",
															"justify-content": "center",
															"align-items": "center"
														});
														$(".modal-backdrop").css('background', '#ffffff');
													}else{
														SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
													}
												//}
											}
											//hiding the Loader
											$("body").trigger('Custom.End');
										}, 1000);
									} else {
										//else show this not success full popup
										$("#SC-SO-generate-receipt").modal({
											backdrop: 'static'
										});
										$("#SC-SO-generate-receipt").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									} */
								}
							}
							}, waitTime);
						}
					$("body").trigger('Custom.End');
						}, 10);
						}
	function invokeafterAutoprint(receipt_mode){
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "RefreshBusComp", null, false);
									var Recordo = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
									/* if(localStorage.getItem("comingfrom")=="refundbtnsubmit"){
										localStorage.setItem("comingfrom","");
										$(".modal-backdrop").css('background', '#ffffff');
										SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
									} */
									if (Recordo[0]["SC Tax Verification Pending"] === 'Y' && Recordo[0]["Tax Exempt"] === 'Y') {
										$("#SC-SO-order-hold").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-hold").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									} else if (Recordo[0]["Status"] == "Hold") {
										$("#SC-SO-order-just-hold").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-just-hold").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (Recordo[0]["Status"] == "Siebel Error") {
										$("#SC-SO-order-sibel-error").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-sibel-error").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (Recordo[0]["Status"] == "Oracle Error") {
										$("#SC-SO-order-oracle-error").modal({
											backdrop: 'static'
										});
										$("#SC-SO-order-oracle-error").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									} else if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get('GetRecordSet').length > 0) {
										//Start loader 
										//$("body").trigger('Custom.Start');
										//setTimeout(function () {
											//if (Recordo[0]["Status"] != "Oracle Error" && Recordo[0]["Status"] != "Siebel Error" && Recordo[0]["Status"] != "Hold" && Recordo[0]["SC Tax Verification Pending"] != 'Y' && Recordo[0]["Tax Exempt"] != 'Y') {
												/*if (itemsCount > 0 && (receipt_mode == "Original" || receipt_mode == "Customer")) {
													$("#SC-SO-schedule-hd").modal({
														backdrop: 'static'
													});
													$("#SC-SO-schedule-hd").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}else {*/
													if(receipt_mode == "Original" || receipt_mode == "Customer"){
														SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
													}else if (receipt_mode == "Merchant" && OrderSubType != "Wholesale" && OrderSubType != "Commercial" && OrderSubType != "QVC" && OrderSubType != "Internal"){
														$("#SC-SO-store-receipt").modal('hide');
														$("#SC-SO-customer-receipt").modal({
															backdrop: 'static'
														});
														$("#SC-SO-customer-receipt").css({
															"display": "flex",
															"justify-content": "center",
															"align-items": "center"
														});
														$(".modal-backdrop").css('background', '#ffffff');
													}else{
														SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
													}
												//}
											//}
											//hiding the Loader
											$("body").trigger('Custom.End');
										//}, 1000);
									} else {
										//else show this not success full popup
										$("#SC-SO-generate-receipt").modal({
											backdrop: 'static'
										});
										$("#SC-SO-generate-receipt").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									}
	}
	//start: function is used for without Order Receipt genartion 
	function noReceipt(){
		$("#custommaskoverlay").show();
		setTimeout(function () {
			//code for popups to be displayed starts from here
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
			var Recordo = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
			
			if (Recordo[0]["SC Tax Verification Pending"] === 'Y' && Recordo[0]["Tax Exempt"] === 'Y') {
				$("#SC-SO-order-hold").modal({
					backdrop: 'static'
				});
				$("#SC-SO-order-hold").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
				$(".modal-backdrop").css('background', '#ffffff');
			} else if (Recordo[0]["Status"] == "Hold") {
				$("#SC-SO-order-just-hold").modal({
					backdrop: 'static'
				});
				$("#SC-SO-order-just-hold").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
			} else if (Recordo[0]["Status"] == "Siebel Error") {
				$("#SC-SO-order-sibel-error").modal({
					backdrop: 'static'
				});
				$("#SC-SO-order-sibel-error").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
			} else if (Recordo[0]["Status"] == "Oracle Error") {
				$("#SC-SO-order-oracle-error").modal({
					backdrop: 'static'
				});
				$("#SC-SO-order-oracle-error").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
			} 
			else if (Recordo[0]["Status"] != "Oracle Error" && Recordo[0]["Status"] != "Siebel Error" && Recordo[0]["Status"] != "Hold" && Recordo[0]["SC Tax Verification Pending"] != 'Y' && Recordo[0]["Tax Exempt"] != 'Y') {
				/*if (itemsCount > 0) {
					$("#SC-SO-schedule-hd").modal({
						backdrop: 'static'
					});
					$("#SC-SO-schedule-hd").css({
						"display": "flex",
						"justify-content": "center",
						"align-items": "center"
					});
				}else {*/
						$("#custommaskoverlay").hide();
						SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
							
					//}
			}
			else {
				$("#custommaskoverlay").hide();
				SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
							
			}
			$("#custommaskoverlay").hide();
		}, 100);
	}
	//End: function is used for without Order Receipt genartion
					//on click of no button in Generate Receipt Popup
					$(document).on('click', '#SC-generate-receipt-no', function() {
                        $("#SC-SO-order-complete").modal('hide');
                        $("#SC-SO-order-complete").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //Code for generating reciept starts
                        SiebelJS.Log("bip id:" + orderId);
                        SiebelJS.Log("bip ordernumber:" + orderNumberBS);
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
                            if (orderId != null) {
                                orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp();
                               /* var SC_reportName = "";
                                var InPS3 = SiebelApp.S_App.NewPropertySet();
                                var OutPS3 = SiebelApp.S_App.NewPropertySet();
                                InPS3.SetProperty("bipordernumber", orderNumberBS);
                                InPS3.SetProperty("biporderrowid", orderId);
                                var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
                                OutPS3 = Service3.InvokeMethod("SC Reciept Generation", InPS3);
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
                                SC_reportName = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().GetFieldValue("ReportOutputFileName");
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
                                setTimeout(function() {
                                    $(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
                                    setTimeout(function() {
                                        $(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
										//var storeuser = "";
										//storeuser = SiebelApp.S_App.GetProfileAttr("SC Store User");
										if (paySCStoreUser == 'Y') {
											SCOUIMethods.AutoPrint(SC_reportName);
										}
                                    }, 1000);
                                }, 1000);*/
                                
                                //Code for generating reciept ends

                                //saddala added if generate receipt isn't wokring
                                //code for popups to be displayed starts from here
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
                                var Recordo = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
                                /* if(localStorage.getItem("comingfrom")=="refundbtnsubmit"){
                                	localStorage.setItem("comingfrom","");
                                	$(".modal-backdrop").css('background', '#ffffff');
                                	SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                                } */
                                if (Recordo[0]["SC Tax Verification Pending"] === 'Y' && Recordo[0]["Tax Exempt"] === 'Y') {
                                    $("#SC-SO-order-hold").modal({
                                        backdrop: 'static'
                                    });
                                    $("#SC-SO-order-hold").css({
                                        "display": "flex",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    });
                                    $(".modal-backdrop").css('background', '#ffffff');
                                } else if (Recordo[0]["Status"] == "Hold") {
                                    $("#SC-SO-order-just-hold").modal({
                                        backdrop: 'static'
                                    });
                                    $("#SC-SO-order-just-hold").css({
                                        "display": "flex",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    });
                                } else if (Recordo[0]["Status"] == "Siebel Error") {
                                    $("#SC-SO-order-sibel-error").modal({
                                        backdrop: 'static'
                                    });
                                    $("#SC-SO-order-sibel-error").css({
                                        "display": "flex",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    });
                                }
								else if (Recordo[0]["Status"] == "Oracle Error") {
									$("#SC-SO-order-oracle-error").modal({
										backdrop: 'static'
									});
									$("#SC-SO-order-oracle-error").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
                                }
								//else if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get('GetRecordSet').length > 0) {
                                    // Business Service
									/*else if((orderBC.GetFieldValue("SC Sub-Type") === "Sale") && (orderBC.GetFieldValue("SC Location Type") === "STORE") && (orderBC.GetFieldValue("Revision") == 1)&& (orderBC.GetFieldValue("Status") === "Booked")) {
											if(orderId!=null && orderId!=""){
												var inPS = SiebelApp.S_App.NewPropertySet();
												var outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("OrderId",orderId);
												SiebelJS.Log("Invoking Business Service");
												Bservice = SiebelApp.S_App.GetService("SC Get Line Items");
												outPS = Bservice.InvokeMethod("Query",inPS); 
												for(var pr=0;pr<outPS.GetChild(0).GetChildCount();pr++){
		                                         if((outPS.GetChild(0).GetChild(pr).GetProperty("SC Product Primary Product Line")=="MATTRESS")&& (isActivityCreated != true)){
													 //start--Create Activity Plan after Submitting the Order
													var inPS = SiebelApp.S_App.NewPropertySet();
													var outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Contact");
													inPS.SetProperty("BC", "Activity Plan");
													inPS.SetProperty("ContactId", contactId);
													inPS.SetProperty("Template", "SC Insider Follow-Up");
													Bservice = SiebelApp.S_App.GetService("SC Create Activity Plan Service"); //get service
													outPS = Bservice.InvokeMethod("Create", inPS);
													var isActivityCreated = true;
													//End--Create Activity Plan after Submitting the Order
												 }else{
													 isActivityCreated = false;
												 }
											 }
											}
										}*/
                                    //Start loader 
                                    //$("body").trigger('Custom.Start');
                                    setTimeout(function() {
										if(Recordo[0]["Status"]!="Oracle Error" && Recordo[0]["Status"]!="Siebel Error" && Recordo[0]["Status"] !="Hold" && Recordo[0]["SC Tax Verification Pending"] != 'Y' && Recordo[0]["Tax Exempt"] != 'Y'){
											/*if (itemsCount > 0) {
												$("#SC-SO-schedule-hd").modal({
													backdrop: 'static'
												});
												$("#SC-SO-schedule-hd").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
											} else {*/
												//else go with isn't success
											   // $(".modal-backdrop").css('background', '#ffffff');
												SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
											//}
										}
                                        //hiding the Loader
                                        $("body").trigger('Custom.End');
                                    }, 1000);
                              /*  } else {
                                    //else show this not success full popup
                                    $("#SC-SO-generate-receipt").modal({
                                        backdrop: 'static'
                                    });
                                    $("#SC-SO-generate-receipt").css({
                                        "display": "flex",
                                        "justify-content": "center",
                                        "align-items": "center"
                                    });
                                    $(".modal-backdrop").css('background', '#ffffff');
                                }*/
                            }
                            $("body").trigger('Custom.End');
                        }, 1000);
                    });

                    //to open hd schedule popup
                    $(document).on('click', '#SC-generate-ok', function() {
                        // Business Service

                        $("#SC-SO-generate-receipt").modal('hide');
                        $("#SC-SO-generate-receipt").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        })
                        /*if (itemsCount > 0) {
                            $("#SC-SO-schedule-hd").modal({
                                backdrop: 'static'
                            });
                            $("#SC-SO-schedule-hd").css({
                                "display": "flex",
                                "justify-content": "center",
                                "align-items": "center"
                            });
                        } else {*/
                            //else go with isn't success
                           // $(".modal-backdrop").css('background', '#ffffff');
                            SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                        //}
                    });

                    //to open order hold popup
                    $(document).on('click', '#SC-proceed-delivery', function() {
                        $("#SC-SO-schedule-hd").modal('hide');
                        $("#SC-SO-schedule-hd").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });

                        FieldQueryPair = {
                            "SR #": ""
                        };
                        SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Field Service List Applet");
                        setTimeout(function() {
                            var Reco = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().Get("GetRecordSet");
                            if (Reco.length > 0) {
                                //if success the drill down on the SR created
								invokeBookNow();
                                /*localStorage.setItem('whitescreen', 1);
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().ExecuteMethod("OnDrillDown", "SR Number", 1);*/
                            } else {
                                //else fail of hd delivery SR didn't get created show this
                                $("#SC-SO-SR-hold").modal({
                                    backdrop: 'static'
                                });
                                $("#SC-SO-SR-hold").css({
                                    "display": "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                });
                            }
                        }, 2000);
                    });
					//code for on change of reason in HD unSchedule Popup
					$("#SC-SO-UnSchedule-item-SelectBox").change(function() {
						 if ($("#SC-SO-UnSchedule-item-SelectBox").val()) {
							 $("#sc-unschedule-Ok").removeClass("SC-disabled");
						 } 
					});
					//code for on click  of cnacel button  in HD unSchedule Popup
					$("#sc-unschedule-Cancel").click(function(){
						$("#SC-SO-UnSchedule-popup").modal('hide');
						$("#SC-SO-Schedule-popup").modal({
							backdrop: 'static'
						});
						$("#SC-SO-Schedule-popup").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
					});
					
					$("#sc-unschedule-Ok").click(function(){
						$("#SC-SO-UnSchedule-popup").modal('hide');
						$('#maskoverlay').show();
						setTimeout(function() {
							var Bservice = '', inPS = '', outPS = '';
							var fieldnames="Status";
							var fieldvalues=$("#SC-SO-UnSchedule-item-SelectBox").val();
							var SRid=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetBusComp().GetFieldValue("SR Number");
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("BO","Service Request");
							inPS.SetProperty("BC","Service Request");
							inPS.SetProperty("FieldsArray",fieldnames );
							inPS.SetProperty("ValuesArray",fieldvalues);
							inPS.SetProperty("SearchSpecification","[SR Number]='"+SRid+"'");
							Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
							outPS = Bservice.InvokeMethod("Insert", inPS);
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetBusComp().SetFieldValue("Status",$("#SC-SO-UnSchedule-item-SelectBox").val());
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].InvokeMethod("WriteRecord");
							if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
								noReceipt();
							else{
								if(P2PEFlag == "Y"){
									$("#SC-SO-store-receipt").modal({
											backdrop: 'static'
										});
										$("#SC-SO-store-receipt").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									}
								else{
									$("#SC-SO-order-complete").modal({
										backdrop: 'static'
									});
									$("#SC-SO-order-complete").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								}
							}
							$('#maskoverlay').hide();
						}, 50);
					});
					var sHDSched;
					$("#sc-hd-booknow").click(function(){
						var MobileNum = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetBusComp().GetFieldValue("SC Mobile Phone#");
						if($('#sHDOptinFlag').is(":checked")){
							if(MobileNum != null && MobileNum.length > 0){
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetBusComp().SetFieldValue("SC HD Optin Flag","Y");
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].InvokeMethod("WriteRecord");
								var SRRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().Get("GetRecordSet");
								var SRRowId = SRRecordSet[0]["Id"];
								var BService = '', SR_inPS = '', SR_outPS = '';
								SR_inPS = SiebelApp.S_App.NewPropertySet();
								SR_outPS = SiebelApp.S_App.NewPropertySet();
								SR_inPS.SetProperty("Object Id", SRRowId);
								SR_inPS.SetProperty("ProcessName", "SC Send HD Opt In to Responsys WF");
								BService = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
								SR_outPS = BService.InvokeMethod("RunProcess", SR_inPS); //invoke the method
							}else{
								alert("Mobile Number is required for HD Text Opt In.  Please add a mobile number to the contact before selecting HD Text Opt In");
							}
						}
						invokeBookNow();
					});
					$("#SC-Add-Note").keyup(function(){
						if ($("#SC-Add-Note").val()!="") {
							 $("#SC-send-button").removeClass("SC-disabled");
						 }
						 else
							$("#SC-send-button").addClass("SC-disabled"); 
					});
					$("#SC-send-button").click(function(){
						$('#maskoverlay').show();
						setTimeout(function() {
							var SRid=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetBusComp().GetFieldValue("SR Number");
							var BService = '', SR_inPS = '', SR_outPS = '';
							SR_inPS = SiebelApp.S_App.NewPropertySet();
							SR_outPS = SiebelApp.S_App.NewPropertySet();
							SR_inPS.SetProperty("SRNumber", SRid);
							SR_inPS.SetProperty("Note", $("#SC-Add-Note").val());
							SR_inPS.SetProperty("ProcessName", "SC Create SR Note WF");
							BService = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
							SR_outPS = BService.InvokeMethod("RunProcess", SR_inPS); //invoke the method
							$('#maskoverlay').hide();
						}, 50);
					});
					//Start :code for on click of No Button in HD Schedule Popup
					$("#sc-schedule-no").click(function(){
						$("#SC-SO-Schedule-popup").modal('hide');
						$('#maskoverlay').show();
						sHDSched="no";
						setTimeout(function() {
							FieldQueryPair = {
								"SR #": ""
							};
							SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Field Service List Applet");
							var Reco = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().Get("GetRecordSet");
							if (Reco.length > 0) {
								$("#SC-SO-UnSchedule-item-SelectBox").val("");
								$("#sc-unschedule-Ok").addClass("SC-disabled");
								$("#SC-SO-UnSchedule-popup").modal({
									backdrop: 'static'
								});
								$("#SC-SO-UnSchedule-popup").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$(".modal-backdrop").css('background', '#ffffff');	
							}
							else{
								 $("#SC-SO-SR-hold").modal({
										backdrop: 'static'
									});
									$("#SC-SO-SR-hold").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
							}
							 $('#maskoverlay').hide();
						}, 50);
					});
					//End :code for on click of No Button in HD Schedule Popup
					//Start :code for on click of Yes Button in HD Schedule Popup
					$("#sc-schedule-yes").click(function(){
						$("#SC-SO-Schedule-popup").modal('hide');
						sHDSched="yes";
						$('#maskoverlay').show();
						setTimeout(function() {
							FieldQueryPair = {
								"SR #": ""
							};
							SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Field Service List Applet");
							var Reco = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().Get("GetRecordSet");
							if (Reco.length > 0) {
								$("#SC-Add-Note").val("");
								$("#SC-SO-SelectSchedule-popup").modal({
									backdrop: 'static'
								});
								$("#SC-SO-SelectSchedule-popup").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$(".modal-backdrop").css('background', '#ffffff');
							}
							else{
								$("#SC-SO-SR-hold").modal({
										backdrop: 'static'
									});
									$("#SC-SO-SR-hold").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
							}
							$('#maskoverlay').hide();
						}, 50);
				});
				//end :code for on click of Yes Button in HD Schedule Popup
                    //on click of ok on on hold popup tax exempt
                    $(document).on('click', '#SC-order-hold', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-order-hold").modal('hide');
                        $("#SC-SO-order-hold").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //$(".modal-backdrop").css('background', '#ffffff');
                        SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                    });

                    //on click of sbl error ok button
                    $(document).on('click', '#SC-order-siebel-OK', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-order-sibel-error").modal('hide');
                        $("#SC-SO-order-sibel-error").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //$(".modal-backdrop").css('background', '#ffffff');
                        SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                    });
					
					
					
					//on click of orcl error ok button
                    $(document).on('click', '#SC-order-oracle-OK', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-order-oracle-error").modal('hide');
                        $("#SC-SO-order-oracle-error").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //$(".modal-backdrop").css('background', '#ffffff');
                        SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                    });

                    //on click of just hold after generate reciept
                    $(document).on('click', '#SC-order-just-hold', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-order-just-hold").modal('hide');
                        $("#SC-SO-order-just-hold").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //$(".modal-backdrop").css('background', '#ffffff');
                        SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
                    });

                    //on click of close of retry
                    //saddala for #652
                    $(document).on('click', '#SC-cancel-retry', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-SR-hold").modal('hide');
                        $("#SC-SO-SR-hold").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //$(".modal-backdrop").css('background', '#ffffff');
                        //SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
						if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
								noReceipt();
							else{
								if(P2PEFlag == "Y"){
									$("#SC-SO-store-receipt").modal({
											backdrop: 'static'
										});
										$("#SC-SO-store-receipt").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									}
								else{
									$("#SC-SO-order-complete").modal({
										backdrop: 'static'
									});
									$("#SC-SO-order-complete").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								}
							}
                    });


                    //on click of OK button on SR didn't get created popup
                    //saddala for #652
                    $(document).on('click', '#SC-SR-hold-retry', function() {
                        //Close the popup and navigate to 360
                        $("#SC-SO-SR-hold").modal('hide');
                        $("#SC-SO-SR-hold").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });

                        FieldQueryPair = {
                            "SR #": ""
                        };
                        SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Field Service List Applet");
                        setTimeout(function() {
                            var Reco = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().Get("GetRecordSet");
                            if (Reco.length > 0) {
                                //if success the drill down on the SR created
								//invokeBookNow();
								if(sHDSched == "yes"){
									$("#SC-Add-Note").val("");
									$("#SC-SO-SelectSchedule-popup").modal({
									backdrop: 'static'
									});
									$("#SC-SO-SelectSchedule-popup").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								}
								else if(sHDSched == "no"){
									$("#SC-SO-UnSchedule-item-SelectBox").val("");
									$("#sc-unschedule-Ok").addClass("SC-disabled");
									$("#SC-SO-UnSchedule-item-SelectBox").val("");
									$("#sc-unschedule-Ok").addClass("SC-disabled");
									$("#SC-SO-UnSchedule-popup").modal({
										backdrop: 'static'
									});
									$("#SC-SO-UnSchedule-popup").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
									
								}
								else
									invokeBookNow();
									sHDSched="";
                               /* localStorage.setItem('whitescreen', 1);
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service List Applet"].GetPModel().ExecuteMethod("OnDrillDown", "SR Number", 1);*/
                            } else {
                                //else fail of hd delivery SR didn't get created show this
                                $("#SC-SO-SR-hold").modal({
                                    backdrop: 'static'
                                });
                                $("#SC-SO-SR-hold").css({
                                    "display": "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                });
                            }
                        }, 1000);

                    });
					function invokeBookNow(){
						var HDSRPM=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().GetRenderer().GetPM();
						var CanInvokebooknow=HDSRPM.ExecuteMethod("CanInvokeMethod", "SCFSBookNow");
						if(CanInvokebooknow){
							HDSRPM.ExecuteMethod("InvokeMethod", "SCFSBookNow", null, false);
							$(".ui-dialog-titlebar-close").hide();
							HDSRPM.AttachNotificationHandler(consts.get("SWE_PROP_BC_NOTI_GENERIC"), function (propSet){
								var type = propSet.GetProperty(consts.get("SWE_PROP_NOTI_TYPE"));
								if (type === "ClosePopup"){
									$("#SC-SO-SelectSchedule-popup").modal('hide');
									$(".ui-dialog-titlebar-close").show();
									if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
											noReceipt();
									else{
										if(P2PEFlag == "Y"){
											$("#SC-SO-store-receipt").modal({
													backdrop: 'static'
												});
												$("#SC-SO-store-receipt").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
											}
										else{
											$("#SC-SO-order-complete").modal({
												backdrop: 'static'
											});
											$("#SC-SO-order-complete").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
											$(".modal-backdrop").css('background', '#ffffff');
										}
									}
								}
							});
						}
						else{
							if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
								noReceipt();
							else{
								if(P2PEFlag == "Y"){
									$("#SC-SO-store-receipt").modal({
											backdrop: 'static'
										});
										$("#SC-SO-store-receipt").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
										$(".modal-backdrop").css('background', '#ffffff');
									}
								else{
									$("#SC-SO-order-complete").modal({
										backdrop: 'static'
									});
									$("#SC-SO-order-complete").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
									$(".modal-backdrop").css('background', '#ffffff');
								}
							}
						}
					}
                    var DupGiftcard = GiftCardCount,
                        cardseen;
                    //on selecting sales rep generate receipt to be opened
                    $("#SC-select-salesrep").click(function() {
						$(this).addClass('SC-disabled');
						$("#SC-sales-rep").modal('hide');
						$("#SC-SO-Add-SalesRep").modal({
                             backdrop: 'static'
                         });
						 $("#SC-SO-Add-SalesRep").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
							$("#custommaskoverlay").show();
						 //for generate reciept
                        setTimeout(function() {
                            var loginid = $("#" + salesreprowid + " td:nth-child(1)").text();
                            var InPS = SiebelApp.S_App.NewPropertySet();
                            var OutPS = SiebelApp.S_App.NewPropertySet();
                            var Service = SiebelApp.S_App.GetService("SC Get Employee");
                            InPS.SetProperty("OrderId", orderId);
                            InPS.SetProperty("LoginId", loginid);
                            OutPS = Service.InvokeMethod("SetEmployee", InPS);
							//SPATIBAN: added code Non-quota Sales Credit
							var Custom_Service="",Input_BS="",Out_BS="",searchfields;
							Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
							Input_BS = SiebelApp.S_App.NewPropertySet();
							Out_BS = SiebelApp.S_App.NewPropertySet();
							searchfields = "SC Sales Credit Type";
							Input_BS.SetProperty("BO", "Order Entry (Sales)");
							Input_BS.SetProperty("BC", "SC Order Sales Team");
							Input_BS.SetProperty("SearchSpecification", "[SC Order Id]='"+orderId+"' AND [SC Sales Credit Type]=LookupValue('SC_SALE_CREDIT_TYPE', 'Non-quota Sales Credit')")
							Input_BS.SetProperty("SortSpecification", "");
							Input_BS.SetProperty("ReqNoOfRecords", "");
							Input_BS.SetProperty("FieldsArray", searchfields);
							Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
							var Child_BS = Out_BS.GetChild(0);
							var BS_Data = Child_BS.GetProperty("OutputRecordSet");
							if(BS_Data=="}"){
								var InPS = "",OutPS="",Service="";
								InPS = SiebelApp.S_App.NewPropertySet();
								OutPS = SiebelApp.S_App.NewPropertySet();
								Service = SiebelApp.S_App.GetService("SC Order Management Service");
								InPS.SetProperty("OrderId", orderId);
								OutPS = Service.InvokeMethod("GetCSCReferral", InPS);
							}
							
							

                            var refreshRec = orderBC.InvokeMethod("RefreshRecord");
                            SiebelJS.Log("Refresh Record..:" + refreshRec);

                            var canSubmitRecord = pm.ExecuteMethod("CanInvokeMethod", "SubmitOrder");
                            SiebelJS.Log("canSubmitRecord...:" + canSubmitRecord);

                            var BCReadOnly = orderBC.GetFieldValue("SC BC ReadOnly");
                            SiebelJS.Log("BC Readonly..:" + BCReadOnly);
                            var VerifiedFlag = orderBC.GetFieldValue("SC Verified Flag");
                            SiebelJS.Log("BC VerifiedFlag..:" + VerifiedFlag);
                            var BalanceDue = orderBC.GetFieldValue("SC Total Balance Due");
                            SiebelJS.Log("BalanceDue..:" + BalanceDue);

                            //click on submit order button on the header applet
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("SubmitOrder");
                            //hiding the Loader
                            //for #578 added functionality to check if the order is submitted from EBS
                            var myVar = setInterval(function() {
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
                                if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Status") != "In Progress") {
                                    clearInterval(myVar);
                                    $("#SC-sales-rep").modal('hide');
									$('#custommaskoverlay').hide();

                                    var voiderror = false;
                                    var FieldQueryPair = {
                                        "Id": ""
                                    };
                                    SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Validation Message - Payments List Applet");
                                    validatemessagepaymentlist = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Payments List Applet"].GetBusComp().GetRecordSet();
                                    SiebelJS.Log("validatemessage::" + JSON.stringify(validatemessagepaymentlist));
                                    for (var err = 0; err < validatemessagepaymentlist.length; err++) {
                                        if (validatemessagepaymentlist[err]["Message Code"] == "SC_VOID_ORDER_SUBMIT") {
                                            voiderror = true;
                                        }
                                    }
                                    if (voiderror == true) {
                                        $("#SC-Payerror-popup").modal({
                                            backdrop: 'static'
                                        });
                                        $("#SC-Payerror-popup").css({
                                            "display": "flex",
                                            "justify-content": "center",
                                            "align-items": "center"
                                        });
                                        $(".modal-backdrop").css('background', '#ffffff');
                                    } else if (GiftCardCount <= 0) { //if there are no gift cards				
                                        //for which popup should show up
                                        var Record = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
                                        //if order is on hold show that pop up
                                       /* if (Record[0]["SC Tax Verification Pending"] === 'Y' && Record[0]["Tax Exempt"] === 'Y') {
                                            $("#SC-SO-order-hold").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-hold").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                            $(".modal-backdrop").css('background', '#ffffff');
                                        }  else if (Record[0]["Status"] == "Hold") {
                                            $("#SC-SO-order-just-hold").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-just-hold").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                        }  else*/ if (Record[0]["Status"] == "Siebel Error") {
                                            $("#SC-SO-order-sibel-error").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-sibel-error").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                        }
										else if (Record[0]["Status"] == "Oracle Error") {
											$("#SC-SO-order-oracle-error").modal({
												backdrop: 'static'
											});
											$("#SC-SO-order-oracle-error").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
                                        }else {
											/*if((orderBC.GetFieldValue("SC Sub-Type") === "Sale") && (orderBC.GetFieldValue("SC Location Type") === "STORE") && (orderBC.GetFieldValue("Revision") == 1)&& (orderBC.GetFieldValue("Status") === "Booked") ) {
											if(orderId!=null && orderId!=""){
												var inPS = SiebelApp.S_App.NewPropertySet();
												var outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("OrderId",orderId);
												SiebelJS.Log("Invoking Business Service");
												Bservice = SiebelApp.S_App.GetService("SC Get Line Items");
												outPS = Bservice.InvokeMethod("Query",inPS); 
												for(var pr=0;pr<outPS.GetChild(0).GetChildCount();pr++){
		                                         if((outPS.GetChild(0).GetChild(pr).GetProperty("SC Product Primary Product Line")=="MATTRESS")&& (isActivityCreated != true)){
													 //start--Create Activity Plan after Submitting the Order
													var inPS = SiebelApp.S_App.NewPropertySet();
													var outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Contact");
													inPS.SetProperty("BC", "Activity Plan");
													inPS.SetProperty("ContactId", contactId);
													inPS.SetProperty("Template", "SC Insider Follow-Up");
													Bservice = SiebelApp.S_App.GetService("SC Create Activity Plan Service"); //get service
													outPS = Bservice.InvokeMethod("Create", inPS);
													var isActivityCreated = true;
													//End--Create Activity Plan after Submitting the Order
												 }else{
													 isActivityCreated = false;
												 }
											 }
											}
										}*/
											if (Record[0]["Status"] != "Oracle Error" && Record[0]["Status"] != "Siebel Error" && Record[0]["Status"] != "Hold" && Record[0]["SC Tax Verification Pending"] != 'Y' && Record[0]["Tax Exempt"] != 'Y' && itemsCount > 0) {
												
												$("#SC-SO-Schedule-popup").modal({
													backdrop: 'static'
												});
												$("#SC-SO-Schedule-popup").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
											}
											else{
												//if order is completed show that poup
											   if(P2PEFlag == "Y"){
												$("#SC-SO-store-receipt").modal({
													backdrop: 'static'
												});
												$("#SC-SO-store-receipt").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
												}
												else{
													$("#SC-SO-order-complete").modal({
														backdrop: 'static'
													});
													$("#SC-SO-order-complete").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
													$(".modal-backdrop").css('background', '#ffffff');
												}
											}
                                        }
                                    } else {
                                        //printing first gift card info on the activation cards
                                        for (var j = 0; j < GetLineOutps.GetChild(0).GetChildCount(); j++) {
                                            if (GetLineOutps.GetChild(0).GetChild(j).GetProperty("SC Calc Long Description") == "GIFT CARD") {
                                                cardseen = j;
                                                $('#giftbeforeactivate').text("$" + GetLineOutps.GetChild(0).GetChild(j).GetProperty("Unit Price - Display"));
                                                $('#giftafteractivate').text("Gift card balance $" + GetLineOutps.GetChild(0).GetChild(j).GetProperty("Unit Price - Display"));
                                                j = GetLineOutps.GetChild(0).GetChildCount();
                                                //showing the giftcard modal
                                                $("#Activate-gift-card").modal({
                                                    backdrop: 'static'
                                                });
                                            }
                                        }
                                        setTimeout(function() {
                                            $("#giftcard-token").focus();
                                        }, 100);
                                    }
								 }
								$("#SC-SO-Add-SalesRep").modal('hide');
								$("#SC-SO-Add-SalesRep").css({
									"display": "",
									"justify-content": "",
									"align-items": ""
								});
								$("#custommaskoverlay").hide();
                            }, 1000);
							
                        }, 1000);

                       
                    });
					//Get GiftCard Balance before Activation
					//vamsi ICX : Inactivated, below logic is takencare at fusion side
					/*$("#sc-activate-balance").click(function() {
						pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
                        var AccessToken =  SiebelApp.S_App.GetProfileAttr("SCAccessToken");
                        var terminalID = SCOUIMethods.SCGetProfileAttrValue('IP');
						var customerReference = orderBC.GetFieldValue("SC Primary Bill Contact Customer Number");
                        var TrackInfo = $("#giftcard-token").val();
                        pm.SetProperty("CustomerReference", customerReference);
                        pm.SetProperty("TrackInformation", TrackInfo);
                        pm.SetProperty("AccessToken", AccessToken);
                        pm.SetProperty("PaymentsRowID", paymentBC.GetFieldValue("Id"));
						pm.OnControlEvent("SU_GET_GC_ACT_BALANCE");
                     });*/
					
                    //open giftcard Activation success popup
                    $("#sc-activate-card").click(function() {
                        //var accessToken = "29648B61-F9A2-4BE1-BDCA-E1DFD2F9B7E5";
                        pm.ExecuteMethod("InvokeMethod", "GetAccessToken", null, false);
                        var AccessToken = SiebelApp.S_App.GetProfileAttr("SCAccessToken");
                        var terminalID = SCOUIMethods.SCGetProfileAttrValue('IP');
                        var balance = $('#giftbeforeactivate').text();
                        balance = balance.replace("$", "");
                        var customerReference = orderBC.GetFieldValue("SC Primary Bill Contact Customer Number");
                        var TrackInfo = $("#giftcard-token").val();
                        pm.SetProperty("CustomerReference", customerReference);
						pm.SetProperty("ObjectId", paymentBC.GetFieldValue("Id"));
                        //pm.SetProperty("TrackInformation", TrackInfo);
                        pm.SetProperty("AccessToken", AccessToken);
                        pm.SetProperty("TerminalID", terminalID);
                        pm.SetProperty("IYCBalance", balance);
						if(P2PEFlag == "Y"){
							$("#custommaskoverlay").show();
								$("#SC-P2PE-GCActivate").modal({
									backdrop: 'static'
								});
								$("#SC-P2PE-GCActivate").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$(".modal-backdrop").css('background', '#ffffff');
						}
						setTimeout(function(){
							if(P2PEFlag == "Y"){
									pm.OnControlEvent("SU_GIFTCARD_ACTIVATE_CLICK");
							}else{
								 pm.OnControlEvent("SU_GIFTCARD_ACTIVATE_CLICK");
							}
							if (pm.Get("CardActivated") == "Y") {
								$("#Activate-gift-card").modal('hide');
								$("#SC-SO-gift-card").modal({
									backdrop: 'static'
								});
								$("#SC-SO-gift-card").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$(".modal-backdrop").css('background', '#ffffff');
								setTimeout(function() {
									if (DupGiftcard > 1) {
										$("#SC-SO-gift-card").modal('hide');
										$("#SC-SO-gift-card").css({
											"display": "",
											"justify-content": "",
											"align-items": ""
										});
										for (var j = 0; j < GetLineOutps.GetChild(0).GetChildCount(); j++) {
											if (GetLineOutps.GetChild(0).GetChild(j).GetProperty("SC Calc Long Description") == "GIFT CARD" && cardseen < j) {
												$('#giftbeforeactivate').text(GetLineOutps.GetChild(0).GetChild(j).GetProperty("Unit Price - Display"));
												$('#giftafteractivate').text("Gift card balance $" + GetLineOutps.GetChild(0).GetChild(j).GetProperty("Unit Price - Display"));
												cardseen = j;
											}
										}
										DupGiftcard--;
										$("#Activate-gift-card").modal({
											backdrop: 'static'
										});
										$("#giftcard-token").focus();
									} else {
										//to hide activated gift card popup
										$("#SC-SO-gift-card").modal('hide');
										$("#SC-SO-gift-card").css({
											"display": "",
											"justify-content": "",
											"align-items": ""
										});

										//for which popup should show up
										var Record = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
										//if order is on hold show that pop up
										if (Record[0]["SC Tax Verification Pending"] === 'Y' && Record[0]["Tax Exempt"] === 'Y') {
											$("#SC-SO-order-hold").modal({
												backdrop: 'static'
											});
											$("#SC-SO-order-hold").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
											$(".modal-backdrop").css('background', '#ffffff');
										} else { //if order is completed show that poup
											if (Record[0]["Status"] != "Oracle Error" && Record[0]["Status"] != "Siebel Error" && Record[0]["Status"] != "Hold" && Record[0]["SC Tax Verification Pending"] != 'Y' && Record[0]["Tax Exempt"] != 'Y' && itemsCount > 0) {
													
													$("#SC-SO-Schedule-popup").modal({
														backdrop: 'static'
													});
													$("#SC-SO-Schedule-popup").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
											}
											else{
												if(P2PEFlag == "Y"){
													$("#SC-SO-store-receipt").modal({
															backdrop: 'static'
														});
													$("#SC-SO-store-receipt").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}else{
													$("#SC-SO-order-complete").modal({
															backdrop: 'static'
														});
													$("#SC-SO-order-complete").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}
												$(".modal-backdrop").css('background', '#ffffff');
											}
										}
									}
								}, 5000);
							}
						},500);
					});

                    //saddala for gift card activation
                    //to open order complete popup
                    $("#SC-complete").click(function() {
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
							//SBOORLA:Added code for Pole Dispaly
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag != "Y") {
								var poleJSON = [];
								SCOUIMethods.PoleDisplay(poleJSON, "P");
							}
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag == "Y") {
								SCOUIMethods.ClearP2PEPoleDisplay(orderId);
							}
                            //saddala for calculating no of items
                            var InPS = SiebelApp.S_App.NewPropertySet();
                            var OutPS = SiebelApp.S_App.NewPropertySet();
                            var Service = SiebelApp.S_App.GetService("SC HomeDelivery Items Check");
                            SiebelJS.Log("In BC..:" + orderId);
                            InPS.SetProperty("OrderId", orderId);
                            OutPS = Service.InvokeMethod("HomeDelivery", InPS);
                            var Child = OutPS.GetChild(0);
                            itemsCount = Child.GetProperty("NoOfItems");

                            //revise flow submit order and show gnrt receipt popup
                            if (localStorage.getItem("comingfrom") == "refundbtn") {
                                localStorage.setItem("comingfrom", "refundbtnsubmit");
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("SubmitOrder");
                                var myVar = setInterval(function() {
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
                                    if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Status") != "In Progress") {
                                        clearInterval(myVar);
                                        $("body").trigger('Custom.End');
                                        //for which popup should show up
                                        var Record = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
                                        var voiderror = false;
                                        var FieldQueryPair = {
                                            "Id": ""
                                        };
                                        SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Validation Message - Payments List Applet");
                                        validatemessagepaymentlist = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Payments List Applet"].GetBusComp().GetRecordSet();
                                        SiebelJS.Log("validatemessage::" + JSON.stringify(validatemessagepaymentlist));
                                        for (var err = 0; err < validatemessagepaymentlist.length; err++) {
                                            if (validatemessagepaymentlist[err]["Message Code"] == "SC_VOID_ORDER_SUBMIT") {
                                                voiderror = true;
                                            }
                                        }
                                        if (voiderror == true) {
                                            $("#SC-Payerror-popup").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-Payerror-popup").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                            $(".modal-backdrop").css('background', '#ffffff');
                                        }/* else if (Record[0]["SC Tax Verification Pending"] === 'Y' && Record[0]["Tax Exempt"] === 'Y') { //if order is on hold show that pop up
                                            $("#SC-SO-order-hold").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-hold").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                            $(".modal-backdrop").css('background', '#ffffff');
                                        } else if (Record[0]["Status"] == "Hold") {
                                            $("#SC-SO-order-just-hold").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-just-hold").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                        } */ else if (Record[0]["Status"] == "Siebel Error") {
                                            $("#SC-SO-order-sibel-error").modal({
                                                backdrop: 'static'
                                            });
                                            $("#SC-SO-order-sibel-error").css({
                                                "display": "flex",
                                                "justify-content": "center",
                                                "align-items": "center"
                                            });
                                        }
										else if (Record[0]["Status"] == "Oracle Error") {
											$("#SC-SO-order-oracle-error").modal({
												backdrop: 'static'
											});
											$("#SC-SO-order-oracle-error").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
                                        }else {
										   /* if((orderBC.GetFieldValue("SC Sub-Type") === "Sale") && (orderBC.GetFieldValue("SC Location Type") === "STORE") && (orderBC.GetFieldValue("Revision") == 1)&& (orderBC.GetFieldValue("Status") === "Booked")) {
											if(orderId!=null && orderId!=""){
												var inPS = SiebelApp.S_App.NewPropertySet();
												var outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("OrderId",orderId);
												SiebelJS.Log("Invoking Business Service");
												Bservice = SiebelApp.S_App.GetService("SC Get Line Items");
												outPS = Bservice.InvokeMethod("Query",inPS); 
												for(var pr=0;pr<outPS.GetChild(0).GetChildCount();pr++){
		                                         if((outPS.GetChild(0).GetChild(pr).GetProperty("SC Product Primary Product Line")=="MATTRESS")&& (isActivityCreated != true)){
													 //start--Create Activity Plan after Submitting the Order
													var inPS = SiebelApp.S_App.NewPropertySet();
													var outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Contact");
													inPS.SetProperty("BC", "Activity Plan");
													inPS.SetProperty("ContactId", contactId);
													inPS.SetProperty("Template", "SC Insider Follow-Up");
													Bservice = SiebelApp.S_App.GetService("SC Create Activity Plan Service"); //get service
													outPS = Bservice.InvokeMethod("Create", inPS);
													var isActivityCreated = true;
													//End--Create Activity Plan after Submitting the Order
												 }else{
													 isActivityCreated = false;
												 }
											 }
											}
										}*/
										if (Record[0]["Status"] != "Oracle Error" && Record[0]["Status"] != "Siebel Error" && Record[0]["Status"] != "Hold" && Record[0]["SC Tax Verification Pending"] != 'Y' && Record[0]["Tax Exempt"] != 'Y' && itemsCount > 0) {
													
													$("#SC-SO-Schedule-popup").modal({
														backdrop: 'static'
													});
													$("#SC-SO-Schedule-popup").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
										}
										else{
											if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
												noReceipt();	
											else{
												//if order is completed show that poup
												$("#SC-SO-order-complete").modal({
													backdrop: 'static'
												});
												$("#SC-SO-order-complete").css({
													"display": "flex",
													"justify-content": "center",
													"align-items": "center"
												});
												$(".modal-backdrop").css('background', '#ffffff');
												
												}
										}
										}
									}
								}, 1000);
                            
								} else { //not revise process
                                $("body").css("cursor", "progress");
                                var storeNumber = SCOUIMethods.SCGetProfileAttrValue('SC Store Number');
                                SiebelJS.Log("Store Number..:" + storeNumber);

                                //for store user show Salesrep popup
								//SBOORLA: Added condidtion if revision number is equal to 0ne 
                                if (paySCStoreUser == 'Y' && orderBC.GetFieldValue("Revision") == 1) {
                                    var InPS = SiebelApp.S_App.NewPropertySet();
                                    var OutPS = SiebelApp.S_App.NewPropertySet();
									var Service = SiebelApp.S_App.GetService("SC Get Employee");
                                    var empsearchSpec="[Employee Type Code]='Employee'";
									InPS.SetProperty("SearchExpr", "[SC Division Name] Like '" + storeNumber + "*' AND "+empsearchSpec+"");
                                    OutPS = Service.InvokeMethod("GetEmployee", InPS);
                                    var Child = OutPS.GetChild(0);
                                    var BS_Data = Child.GetProperty("Count");
                                    if (BS_Data > 0) {
                                        BS_Data = Child.GetProperty("FieldValues");
                                        Dataarray = BS_Data.split(',');
                                        var seen = {};
                                        var out = [];
                                        var len = Dataarray.length;
                                        var j = 0;
                                        for (var i = 0; i < len; i++) {
                                            var item = Dataarray[i];
                                            if (seen[item] !== 1) {
                                                seen[item] = 1;
                                                out[j++] = item;
                                            }
                                        }
                                        Dataarray = out;
                                        SC_OUI_Markups.SCSalesRepTable(Dataarray, "neww");
                                    } else {
                                        $("#sc-sales-rep-table").html("");
                                    }
                                    $("body").css("cursor", "default");
                                    $("body").trigger('Custom.End');
                                    $("#SC-sales-rep").modal({
                                        backdrop: 'static'
                                    });
                                }
                                //for other user than store dont show sales rep popup
                                else {
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("SubmitOrder");
                                    var myVar = setInterval(function() {
                                        SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
                                        if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Status") != "In Progress") {
                                            clearInterval(myVar);
                                            $("body").css("cursor", "default");
											var Record = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
                                            var voiderror = false;
                                            var FieldQueryPair = {
                                                "Id": ""
                                            };
                                            SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Validation Message - Payments List Applet");
                                            validatemessagepaymentlist = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Payments List Applet"].GetBusComp().GetRecordSet();
                                            SiebelJS.Log("validatemessage::" + JSON.stringify(validatemessagepaymentlist));
                                            for (var err = 0; err < validatemessagepaymentlist.length; err++) {
                                                if (validatemessagepaymentlist[err]["Message Code"] == "SC_VOID_ORDER_SUBMIT") {
                                                    voiderror = true;
                                                }
                                            }
                                            if (voiderror == true) {
                                                $("#SC-Payerror-popup").modal({
                                                    backdrop: 'static'
                                                });
                                                $("#SC-Payerror-popup").css({
                                                    "display": "flex",
                                                    "justify-content": "center",
                                                    "align-items": "center"
                                                });
                                                $(".modal-backdrop").css('background', '#ffffff');
                                            }/* else if (Record[0]["SC Tax Verification Pending"] === 'Y' && Record[0]["Tax Exempt"] === 'Y') {
                                                $("body").trigger('Custom.End');
                                                $("#SC-SO-order-hold").modal({
                                                    backdrop: 'static'
                                                });
                                                $("#SC-SO-order-hold").css({
                                                    "display": "flex",
                                                    "justify-content": "center",
                                                    "align-items": "center"
                                                });
                                                $(".modal-backdrop").css('background', '#ffffff');
                                            } else if (Record[0]["Status"] == "Hold") {
                                                $("#SC-SO-order-just-hold").modal({
                                                    backdrop: 'static'
                                                });
                                                $("#SC-SO-order-just-hold").css({
                                                    "display": "flex",
                                                    "justify-content": "center",
                                                    "align-items": "center"
                                                });
                                            } */ else if (Record[0]["Status"] == "Siebel Error") {
                                                $("#SC-SO-order-sibel-error").modal({
                                                    backdrop: 'static'
                                                });
                                                $("#SC-SO-order-sibel-error").css({
                                                    "display": "flex",
                                                    "justify-content": "center",
                                                    "align-items": "center"
                                                });
                                            }
											else if (Record[0]["Status"] == "Oracle Error") {
                                                $("#SC-SO-order-oracle-error").modal({
                                                    backdrop: 'static'
                                                });
                                                $("#SC-SO-order-oracle-error").css({
                                                    "display": "flex",
                                                    "justify-content": "center",
                                                    "align-items": "center"
                                                });
                                            }else {
												/*if((orderBC.GetFieldValue("SC Sub-Type") === "Sale") && (orderBC.GetFieldValue("SC Location Type") === "STORE") && (orderBC.GetFieldValue("Revision") == 1)&& (orderBC.GetFieldValue("Status") === "Booked")) {
											    if(orderId!=null && orderId!=""){
												var inPS = SiebelApp.S_App.NewPropertySet();
												var outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("OrderId",orderId);
												SiebelJS.Log("Invoking Business Service");
												Bservice = SiebelApp.S_App.GetService("SC Get Line Items");
												outPS = Bservice.InvokeMethod("Query",inPS); 
												for(var pr=0;pr<outPS.GetChild(0).GetChildCount();pr++){
		                                         if((outPS.GetChild(0).GetChild(pr).GetProperty("SC Product Primary Product Line")=="MATTRESS")&& (isActivityCreated != true)){
													 //start--Create Activity Plan after Submitting the Order
													var inPS = SiebelApp.S_App.NewPropertySet();
													var outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Contact");
													inPS.SetProperty("BC", "Activity Plan");
													inPS.SetProperty("ContactId", contactId);
													inPS.SetProperty("Template", "SC Insider Follow-Up");
													Bservice = SiebelApp.S_App.GetService("SC Create Activity Plan Service"); //get service
													outPS = Bservice.InvokeMethod("Create", inPS);
													var isActivityCreated = true;
													//End--Create Activity Plan after Submitting the Order
												 }else{
													 isActivityCreated = false;
												 }
											 }
											}
										}*/
												//if order is completed show that poup
                                                $("body").trigger('Custom.End');
												if (Record[0]["Status"] != "Oracle Error" && Record[0]["Status"] != "Siebel Error" && Record[0]["Status"] != "Hold" && Record[0]["SC Tax Verification Pending"] != 'Y' && Record[0]["Tax Exempt"] != 'Y' && itemsCount > 0) {
													
													$("#SC-SO-Schedule-popup").modal({
														backdrop: 'static'
													});
													$("#SC-SO-Schedule-popup").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}
												else{
													if(orderBC.GetFieldValue("SC Sub-Type")=="Wholesale")
														noReceipt();	
													else{
													$("#SC-SO-order-complete").modal({
														backdrop: 'static'
													});
													$("#SC-SO-order-complete").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
													$(".modal-backdrop").css('background', '#ffffff');
													}
												}
                                            }
                                        }
                                    }, 1000);
                                }
                            }
                            //hiding the Loader

                        }, 1000);
                    });

                    $("#order360").click(function() {
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        // vamsi ICX: 15APR2018 : Inactivate the below code for #792
                        if (newRecord) {
                            var canUndo = pm.ExecuteMethod("CanInvokeMethod", "UndoRecord");
                            if (canUndo) {
                                var undoRecord = pm.ExecuteMethod("InvokeMethod", "UndoRecord", null, false);
                                newRecord = false;
                            }
                        }
						newRecord = false;
                        setTimeout(function() {
							//SBOORLA:Added code for Pole Dispaly
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag != "Y") {
								var poleJSON = [];
								SCOUIMethods.PoleDisplay(poleJSON, "P");
							}
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag == "Y") {
								SCOUIMethods.ClearP2PEPoleDisplay(orderId);
							}
                            var InPut = SiebelApp.S_App.NewPropertySet();
                            var OutPut = SiebelApp.S_App.NewPropertySet();
                            InPut.SetProperty("View", "SC Contact 360 Degree View OUI");
                            InPut.SetProperty("Business Component", "Contact");
                            InPut.SetProperty("Row Id", contactId);
                            var BService = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
                            OutPut = BService.InvokeMethod("GotoView", InPut);
                            //hiding the Loader
                            $("body").trigger('Custom.End');
                        }, 1000);
                    });

                    $(document).on('click', '#deleteorder', function() {
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
							newRecord = false;
                            var deleteOrder = orderPM.ExecuteMethod("CanInvokeMethod", "DeleteRecord");
                            if (deleteOrder) {
                                $("body").trigger('Custom.End');
                                $("#SC-SO-Delete-order").modal({
                                    backdrop: 'static'
                                })
                                $("#SC-SO-Delete-order").css({
                                    "display": "flex",
                                    "justify-content": "center",
                                    "align-items": "center"
                                })
                                $(".modal-backdrop").css('background', '#ffffff');
                            }
                            //hiding the Loader

                        }, 1000);
                    });

                    $(document).on("click", "#SC-yes-button", function() {
                        $("#SC-SO-Delete-order").modal('hide');
                        $("#SC-SO-Delete-order").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
							//SBOORLA:Added code for Pole Dispaly
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag != "Y") {
								var poleJSON = [];
								SCOUIMethods.PoleDisplay(poleJSON, "P");
							}
							if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag == "Y") {
								SCOUIMethods.ClearP2PEPoleDisplay(orderId);
							}
                            var deleteOrder = orderPM.ExecuteMethod("CanInvokeMethod", "DeleteRecord");

                            var recordDeleted = orderPM.ExecuteMethod("InvokeMethod", "DeleteRecord", null, false);
                            if (recordDeleted) {
                                SiebelApp.S_App.GotoView("SC Sales Order Search View OUI");
                            }
                            //hiding the Loader
                            $("body").trigger('Custom.End');
                        }, 1000);

                    });

                    $(document).on("click", "#SC-no-button", function() {
                        $("#SC-SO-Delete-order").modal('hide');
                        $(".SC-SO-add-popup").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                    });


                    $(document).on("click", "#saveandexit", function() {
						//SNARRA:Added code to check the PaymentDue before exit the Payments Page
						if(orderBC.GetFieldValue("SC Total Balance Due")==0){
							$("#SC-SO-Saveexit-popup").modal({
								backdrop: 'static'
							});
							$("#SC-SO-Saveexit-popup").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');	
						}else{
                        //Start loader 
							setTimeout(function() {
								newRecord = false;
								//SBOORLA:Added code for Pole Dispaly
								if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag != "Y") {
									var poleJSON = [];
									SCOUIMethods.PoleDisplay(poleJSON, "P");
								}
								if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag == "Y") {
									SCOUIMethods.ClearP2PEPoleDisplay(orderId);
								}
								pm.ExecuteMethod("InvokeMethod", "ClearEnteredPayments", null, false);
								SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
								//hiding the Loader
								$("body").trigger('Custom.End');
							}, 100);
						}
                    });
                     $("#sc-saveexit-yes").click(function() {
						 $("#SC-SO-Saveexit-popup").modal('hide');
							$("#SC-SO-Saveexit-popup").css({
								"display": "",
								"justify-content": "",
								"align-items": ""
							});
						 $("body").trigger('Custom.Start');
							setTimeout(function() {
								newRecord = false;
								//SBOORLA:Added code for Pole Dispaly
								if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag != "Y") {
								var poleJSON = [];
								SCOUIMethods.PoleDisplay(poleJSON, "P");
								}
								if (localStorage.getItem("InvokepoleDisplay") == 'Y' && P2PEFlag == "Y") {
									SCOUIMethods.ClearP2PEPoleDisplay(orderId);
								}
								pm.ExecuteMethod("InvokeMethod", "ClearEnteredPayments", null, false);
								SiebelApp.S_App.GotoView("SC Sales Order 360 Degree View OUI");
								//hiding the Loader
								$("body").trigger('Custom.End');
							}, 100);  
						 
					 });
					  $("#sc-saveexit-no").click(function() {
						  $("#SC-SO-Saveexit-popup").modal('hide');
							$("#SC-SO-Saveexit-popup").css({
								"display": "",
								"justify-content": "",
								"align-items": ""
							});
						 
					 });
                    //Add store Location modal open
                    $("#SC-add-store-location").click(function() {
                        //StoreLocation = SCOUIMethods.StoreName(LoginId);
						StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                        $("#SC-add-storelocation").modal({
                            backdrop: 'static'
                        });
                        if (StoreLocation != "") {
                            document.getElementById('StoreTitle').innerHTML = StoreLocation;
                        } else {
                            document.getElementById('StoreTitle').innerHTML = "Add Store Location";
                        }
                    });

                    //on click of enter on store search
                    $("#SC-Store-Search").keyup(function(event) {
                        if (event.keyCode === 13) {
                            var value = document.getElementById('SC-Store-Search').value;
                            var markup = SC_OUI_Markups.StoreChange2(value);
                            $("#SC-storelocation").html(markup);
                        }
                    });

                    //on selecting the store for change of store
                    var selectstoreid = "";
                    $(document).on('click', '#SC-storelocation tr', function() {
                        $(this).addClass('cti-active').siblings().removeClass('cti-active');
                        selectstoreid = $(this).attr('id');
                    });

                    //on click of the store
                    $(document).on('click', '#SC-selectstore', function() {
                        $("#SC-Store-Search").val("");
                        selectstoreid = $("#" + selectstoreid + " td:first-child").text();
                        if (selectstoreid.length != 0) {
                            SCOUIMethods.SetStore(selectstoreid);
							SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id");
							StoreLocation=SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                            //StoreLocation = SCOUIMethods.StoreName(LoginId);
                            if (StoreLocation != "") {
                                document.getElementById('storename').innerHTML = selectstoreid.substring(0, 10);
                                $("#SC-add-store-location").attr("title", "Change Store");
                                $("#storename").attr("title", selectstoreid);
                                StoreLocation = selectstoreid;
                            } else {
                                $("#SC-add-store-location").attr("title", "Add Store");
                            }
                        }
                        $("#SC-add-storelocation").modal('hide');
                        $("#SC-storelocation").html("");
                    });

                    // Getting Store location
                   // StoreLocation = SCOUIMethods.StoreName(LoginId);
					StoreLocation=SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                    if (StoreLocation != "") {
                        document.getElementById('storename').innerHTML = StoreLocation.substring(0, 10);
                        $("#SC-add-store-location").attr("title", "Change Store Location");
                        $("#storename").attr("title", StoreLocation);
                    } else {
                        $("#SC-add-store-location").attr("title", "Add Store Location");
                    }
					//SPATIBAN:added code for update the user location with DISA Location
					var scdisaloc="";
					scdisaloc=SCOUIMethods.SCGetProfileAttrValue("DISALocFound");
					if(scdisaloc=="Y"){
						$("#SC-add-store-location").addClass("SC-readonly");
					}
                    //Add store Location modal open
                    $("#SC-add-store-location").click(function() {
                        $("#SC-add-storelocation").modal({
                            backdrop: 'static'
                        });
                    });
                }

                SCPaymentsPR_RP.prototype.BindData = function(bRefresh) {
                    // BindData is called each time the data set changes.
                    // This is where you'll bind that data to user interface elements you might have created in ShowUI
                    // Add code here that should happen before default processing
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCPaymentsPR_RP:      BindData method reached.");
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.BindData.apply(this, arguments);
                     $("#custommaskoverlay").show();
					setTimeout(function(){
                    //records = pm.Get("GetRecordSet");
                    records = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].GetPModel().Get("GetRecordSet");
                    var paymentdetails = PaymentDetials(records);
                    $("#SC-payment-details").html(paymentdetails);

                    var pendingTxns = failedPendingTxnDetials(records);
                    $("#SC-failed-payment-details").html(pendingTxns);

                    var paymentMethod = paymentBC.GetFieldValue("Payment Method");
                    if (paymentMethod == "Credit Card") {
                        var detailsMarkup = CreditCardDetails();
                        $('#SC-CreditDetails').html(detailsMarkup);
                    } else if (paymentMethod == "Gift Card") {
                        var detailsMarkup = GiftCardDetails();
                        $('#sc-giftcardTxnDetails').html(detailsMarkup);
                    } else if (paymentMethod == "Check") {
                        var detailsMarkup = CheckDetails();
                        $('#sc-check-payment-details').html(detailsMarkup);
                    } else if (paymentMethod == "Financing") {
                        var detailsMarkup = FinanceDetails();
                        $('#financing-payment-details').html(detailsMarkup);
                    } else if (paymentMethod == "Reward") {
                        var detailsMarkup = ACRDetails();
                        $('#reward-payment-details').html(detailsMarkup);
                    } else if (paymentMethod == "Accounting") {
                        var detailsMarkup = ACRDetails();
                        $('#accounting-payment-details').html(detailsMarkup);
                    } else {
                        var detailsMarkup = ACRDetails();
                        $('#cash-payment-details').html(detailsMarkup);
                    }
					var sOrderRecord = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetRecordSet");
                    var canInvGenRef = pm.ExecuteMethod("CanInvokeMethod", "SCGenerateRefund");
                    SiebelJS.Log("Refund Invoke..:" + canInvGenRef);
                    if (canInvGenRef) {
                        $("#SC-refund").css("display", "block");
                        $("#SC-complete").addClass("displaynone");
                    } else {
                        var caninvSubOrd = orderPM.ExecuteMethod("CanInvokeMethod", orderControlSet["BSubmit"].GetMethodName());
                        if (caninvSubOrd &&(sOrderRecord[0]["Status"]=="In Progress" || sOrderRecord[0]["Status"]=="Siebel Error" || sOrderRecord[0]["Status"]=="Oracle Error" || sOrderRecord[0]["Status"]=="Hold")) {
                            $("#SC-complete").removeClass("SC-disabled");
                        } else {
                            $("#SC-complete").addClass("SC-disabled");
                        }
                    }
						$("#custommaskoverlay").hide();
					},1000);
					
                }

                SCPaymentsPR_RP.prototype.BindEvents = function() {
                    // BindEvents is where we add UI event processing.
                    // Add code here that should happen before default processing
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCPaymentsPR_RP:      BindEvents method reached.");
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.BindEvents.apply(this, arguments);
					//Start: For Driving License Validation
						jQuery.validator.addMethod(
							"regex",
							function (value, element, regexp) {
							if (regexp.constructor != RegExp)
								regexp = new RegExp(regexp);
							else if (regexp.global)
								regexp.lastIndex = 0;
							return this.optional(element) || regexp.test(value);
						},
							"");
					 //SNARRA:29-10-2018 Start: show CTI Toolbar
					$(document).on('click','#SC-ANI-CTItool',function() {
						$(this).find('img').toggle();
						$('#tb_1')[0].click();
						setTimeout(function(){
						 $('#commPanelDockToShowpin').click();
						},500);
					});
					$(document).on('click','#commPanelCloseToggle',function(){
						$("#SC-ANI-CTItool").find('img').toggle();
					});
					//SNARRA 30-07-2018 Added code for finance nonstackable error popup
					 $(document).on('click','#sc-financing-error-ok',function(){
				       $("#sc-financing-error-popup").modal("hide");
					   $("#sc-financing-error-popup").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						localStorage.setItem("ComingFromPayments", "Y");
                        SiebelApp.S_App.GotoView("SC Create Sales Order View OUI", "", "", "");
      				});
					
					//SNARRA 01-08-2018 Added code for finance popup for new record
					 $(document).on('click','#sc-financing-ok',function(){
				       $("#sc-financing-popup").modal("hide");
					   $("#sc-financing-popup").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
					});
					
					 $(document).on('click','#sc-cashier-check-ok',function(){
				       $("#sc-cashier-check-popup").modal("hide");
					   $("#sc-cashier-check-popup").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
					});
					//sushma 19-07-2018:Added for Resizing CTI Toolbar
				   $(document).on('click','#commPanelDockToShowUnpin',function(){
					 $("#CommunicationPanelContainer").css("cssText", "padding-top: 0px !important;");
				   });
				   $(document).on('click','#commPanelDockToShowPin',function(){
					   $("#CommunicationPanelContainer").css("cssText", "padding-top: 77px !important;");
					});
                    // Add code here that should happen after default processing
                    //on click of ok button check ,drafts popup
					var sc_pay_void=0;
						//on click of quote button
						$(document).on("click","#SC-Quote-Payments",function(e){
							var clickedid=this.id;
							$("body").trigger('Custom.Start');
							e.preventDefault();
							var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp();
							var orderSubType = orderBC.GetFieldValue("SC Sub-Type");
							setTimeout(function() {
							
								// VALLA : 10ARP2018 : #712 Coded for Whole Sale and Commercial
								if(orderSubType ==  "Wholesale" || orderSubType == "Commercial"){
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("SCWCCreateQuote");
								}else{
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("SCCreateQuote");
								}
							SiebelJS.Log("in bind datareports button click");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
							
							setTimeout(function() {
								$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
								setTimeout(function() {
									$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
								},1000);	
								},1000);	
								$("body").trigger('Custom.End');
							},1000);
							
						});
                    //vamsi:06APR18:  #649 Handling esc key
                    $(document).keyup(function(e) {
                        if (e.keyCode == 27) { // escape key maps to keycode '27'
                            newRecord = false;
                            $(".active-tab").each(function() {
                                $('#' + this.id).removeClass("active-tab");
                            });
                        }
                    });

                    //NGollA defect for 663
                    $(document).on('click', '#SC-Clear-store', function() {
                        SCOUIMethods.SetStore("");
                        //StoreLocation = SCOUIMethods.StoreName(LoginId);
						SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id");
						StoreLocation=SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                        $("#storename").text('Add Store');
                        $("#StoreTitle").text('Add Store Location');
                        $("#StoreTitle").attr("title", "Add Store Location");
                    });

                    $(document).on("click", "#SC-check-ok", function() {
                        $("#SC-SO-Cash-open-popup").modal('hide');
                        $("#SC-SO-Cash-open-popup").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                    });

                    //on click of ok of void payment error of submit
                    $(document).on("click", "#SC-pay-error-ok", function() {
                        $("#SC-Payerror-popup").modal('hide');
                        $("#SC-Payerror-popup").css({
                            "display": "",
                            "justify-content": "",
                            "align-items": ""
                        });
                        $(".modal-backdrop").css('background', '#ffffff');
                    });
                    //on click of void button
                    //added code for defect 635
                    $(document).on("click", ".sc-pay-void,.sc-line-pay-void", function() {
                        var lineid = $(this).attr('id');
						var line_row_id = lineid.split("s");
						line_row_id=line_row_id[0];
                        //var line_row_id = lineid.charAt(0);
                        SiebelJS.Log(line_row_id);
						sc_pay_void=line_row_id;
						$("#SC-SO-void-popup").modal({
							backdrop: 'static'
						});
						$("#SC-SO-void-popup").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
                    });

                    //on click of delete payment 
					//SBOORLA:on click of yes button in void popup
					$(document).on("click", "#sc-void-yes", function() {
						$("body").trigger('Custom.Start');
						setTimeout(function() {
							$("#s_" + appletSeq + "_l tr#" + sc_pay_void + "").trigger("click");
							//var isStoreUser = SiebelApp.S_App.GetProfileAttr("SC Store User");
							if(paySCStoreUser == "Y"){
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].InvokeMethod("StoreVoidPayment");
							}else{
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].InvokeMethod("Void");
							}
							$("#SC-SO-void-popup").modal('hide');
							$("#SC-SO-void-popup").css({
								"display": "",
								"justify-content": "",
								"align-items": ""
							});
							$("body").trigger('Custom.End');
						},1000);
					});
					//SBOORLA:on click of no button in void popup
					$(document).on("click", "#sc-void-no", function() {
						$("#SC-SO-void-popup").modal('hide');
						$("#SC-SO-void-popup").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
					});
					
                    //#600 by saddala to delete payments
                    $(document).on("click", ".pay-delete", function() {
                        var lineid = $(this).attr('id');
						if($(".pay-delete").hasClass("financing")){
						  isFinancing="N";	
						}
						var line_row_id = lineid.split("v");
						line_row_id=line_row_id[0];
                        //var line_row_id = lineid.charAt(0);
                        SiebelJS.Log(line_row_id);
                        $("#s_" + appletSeq + "_l tr#" + line_row_id + "").trigger("click");
                        var canDelete = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].GetPModel().ExecuteMethod("CanInvokeMethod", "DeleteRecord");
                        if (canDelete) {
                            var deleteRecord = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].GetPModel().ExecuteMethod("InvokeMethod", "DeleteRecord", null, false);
                            SiebelJS.Log("DeleteRecord..:" + deleteRecord);
                            newRecord = false;
                            $(".active-tab").each(function() {
                                $('#' + this.id).removeClass("active-tab");
                            });
                            $(".SC-Payment-nav-item").each(function() {
                                $('#' + this.id).removeClass("p-item-active");
                            });
                        }
                    });

                    $(document).on("click", "#SC-Quote-Payments", function() {
                        SiebelJS.Log("Create Quote");
                        var createQuote = orderPM.ExecuteMethod("CanInvokeMethod", "SCCreateQuote");
                        if (createQuote) {
                            var recordDeleted = orderPM.ExecuteMethod("InvokeMethod", "SCCreateQuote", null, false);
                        }
                    });
                    $(document).on("click", ".sc-failed-payment-row", function() {
                        var paymentsid = (this.id).split('-');
                        paymentsid = paymentsid[1];
                        SiebelJS.Log("click on failed payments ");
                        var recordsp = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].GetPModel().Get("GetRecordSet");
                        SiebelJS.Log(paymentsid);
                        $("#s_" + appletSeq + "_l tr#" + paymentsid + "").trigger("click");
                        //to differentiate new payment or revising the payment
                        failedpaymentselected = true;

                        switch (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Sales List Applet OUI"].GetBusComp().GetFieldValue("Payment Method")) {
                            case 'Credit Card':
                                $('#credit-card-paymnet').click();
                                break;
                            case 'Gift Card':
                                $('#giftcard-payment').click();
                                break;
                            case 'Financing':
								isFinancing="N";
                                $('#financing-payment').click();
                                break;
                            case 'Accounting':
                                $('#accounting-payment').click();
                                break;
                            case 'Cash':
                                $('#cash-payment').click();
                                break;
                            case 'Reward':
                                $('#reward-payment').click();
                                break;
                            case 'Check':
                                $('#check-payment').click();
                                break;
                        }
                    });
                }

                SCPaymentsPR_RP.prototype.EndLife = function() {
                    // EndLife is where we perform any required cleanup.
                    // Add code here that should happen before default processing
                    SiebelJS.Log(this.GetPM().Get("GetName") + ": SCPaymentsPR_RP:      EndLife method reached.");
                    SiebelAppFacade.SCPaymentsPR_RP.superclass.EndLife.apply(this, arguments);
                    localStorage.setItem("comingfrom", "");
                    if (newRecord == true) {
                        var canUndo = pm.ExecuteMethod("CanInvokeMethod", "UndoRecord");
                        if (canUndo) {
                            var undoRecord = pm.ExecuteMethod("InvokeMethod", "UndoRecord", null, false);
                        }
                    }
					newRecord = false;
                    var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
                    if (paymentStatus == "Entered") {
                        var canUndo = pm.ExecuteMethod("CanInvokeMethod", "UndoRecord");
                        if (canUndo) {
                            var undoRecord = pm.ExecuteMethod("InvokeMethod", "UndoRecord", null, false);
                        }
                    }
                    if (localStorage.getItem('whitescreen') == 0) {
                        $("#_swescrnbar").hide();
                        $("#_swethreadbar").hide();
                        $("#_sweappmenu").hide();
                        $("#s_vctrl_div").hide();
                        $(".siebui-button-toolbar").hide();
                        $("#_sweview").hide();
                        $('#_swecontent').prepend(SC_OUI_Markups.CustomWhiteScreenTimer());
                        $("#custommaskoverlay").show();
                    } else if (localStorage.getItem('whitescreen') == 1) {
                        $("#_swescrnbar").show();
                        $("#_swethreadbar").show();
                        $("#_sweappmenu").show();
                        $("#s_vctrl_div").show();
                        $(".siebui-button-toolbar").show();
                        $("#_sweview").show();
						$('#CommunicationPanelContainer').css("padding-top","0px");
                    }
                    $(document).unbind();
					$("#SC-SR-hold-retry").unbind("click");
					$("#SC-generate-receipt").unbind("click");
					$("#SC-generate-store-receipt").unbind("click");
					$("#SC-generate-customer-receipt").unbind("click");
                } //end life

                function PaymentDetials(records) {
                    Markup = '';
                    Markup += '<div class="row">';
                    Markup += '<div class="payment-due-item">';
                    Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    Markup += '</div>';
                    Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    Markup += '<div class="payment-label">';
                    Markup += '<label class="no-margin main-label">Payment Due:</label>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '<div class="col-md-4 col-lg-4 col-sm-4 no-padding">';
                    var balanceDue = orderBC.GetFieldValue("SC Total Balance Due");
                    //saddala for #677
                    balanceDue = Number(balanceDue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                    if (parseFloat(balanceDue) < 0) {
                        balanceDue = balanceDue.replace("-", "");
                        Markup += '<p class="no-margin due-amount">$(' + balanceDue + ')</p>';

                    } else {
                        Markup += '<p class="no-margin due-amount">$' + balanceDue + '</p>';
                    }
                    if (parseFloat(balanceDue) <= 0) {
                        //payment Due is zero disable the create quote button
                        $("#SC-Quote-Payments").addClass("SC-disabled");
                    } else {
                        //payment Due is greater than zero enable the create quote button
                        $("#SC-Quote-Payments").removeClass("SC-disabled");
                    }

                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '</div>';
					var payrcdlen="";
					payrcdlen=records.length;
                    for (var i = 0; i < payrcdlen; i++) {
                        if (records[i]['SC Payment Status'] == 'Settled' || records[i]['SC Payment Status'] == 'Authorized') {
                            Markup += '<div class="row" id="seq-' + records[i]['Line Number'] + '">';
                            Markup += '<div class="payment-due-item">';
                            Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                            Markup += '</div>';
                            Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                            Markup += '<div class="payment-label">';
                            var transAmt = "";
                            transAmt = records[i]["Transaction Amount"];
                            transAmt = transAmt.replace(/[$,]/g, "");
                            transAmt = parseInt(transAmt);
                            if (((records[i]["Payment Method"] == "Credit Card" || records[i]["Payment Method"] == "Gift Card") && records[i]["SC Void Enable"] == "Y" && transAmt >= 0 && records[i]["SC Enable Delete"] == "N" && records[i]["SC CVV Failed Flag"] == "N" && records[i]["SC Admin View"] == "N") || (records[i]["SC Allow Refund Void"] == "Y"))
                                Markup += '<img src="images/custom/minus-circle-orange.png" class="circle-icon sc-pay-void" id="' + (i + 1) + 'sc-pay-void">';
                            else
                                Markup += '<img src="images/custom/minus-circle-orange.png" class="circle-icon" style="display: none" id="' + (i + 1) + 'sc-pay-void">';
                            Markup += '<label class="no-margin item-name">' + records[i]['Payment Method'] + '</label>';
                            Markup += '</div>';
                            Markup += '</div>';
                            Markup += '<div class="col-md-4 col-lg-4 col-sm-4 no-padding">';
                            Markup += '<p class="no-margin due-amount item-value">' + records[i]['Transaction Amount'] + '</p>';
                            Markup += '</div>';
                            Markup += '</div>';
                            Markup += '</div>';
                        }
                    }
                    $(".sc-pay-void").css({
                        "pointer-events": 'all'
                    });
                    return Markup;
                }

                function failedPendingTxnDetials(records) {
                    $('#SC-failed-payment-details').hide();
                    Markup = '';
                    Markup += '<div class="payment-panel-body clearfix">';
                    Markup += '<div class="heading">';
                    Markup += '<p style="color:#20558a;font-weight:600">Payments</p>';
                    Markup += '</div>';
                    Markup += '<div class="row">';
                    Markup += '<div class="failed-pay-rows">';
                    Markup += '<div class="col-md-3 col-lg-3 col-sm-3 add-width">';
                    Markup += ' <p style="color:#20558a;font-weight:600">PAYMENT METHOD</p>';
                    Markup += '</div>';
                    Markup += '<div class="col-md-3 col-lg-3 col-sm-3">';
                    Markup += ' <p style="color:#20558a;font-weight:600">PAYMENT STATUS</p>';
                    Markup += '</div>';
                    Markup += '<div class="col-md-3 col-lg-3 col-sm-3">';
                    Markup += ' <p style="color:#20558a;font-weight:600">DATE AND TIME</p>';
                    Markup += '</div>';
                    Markup += '<div class="col-md-3 col-lg-3 col-sm-3">';
                    Markup += ' <p style="color:#20558a;font-weight:600">AMOUNT</p>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '</div>';
					var payrcdlen="";
					payrcdlen=records.length;
                    for (var i = 0; i < payrcdlen; i++) {
                       // if (records[i]['SC Payment Status'] != 'Settled' && records[i]['SC Payment Status'] != 'Authorized') {
                            SiebelJS.Log("Payment Status..:" + records[i]['SC Payment Status']);
                            $('#SC-failed-payment-details').show();
                            Markup += '<div class="row">';
                            Markup += '<div class="failed-pay-rows failed-pay-data">';
                            Markup += '<div class="col-md-3 col-lg-3 col-sm-3" style="cursor:pointer;display:flex;padding-left:0px">';
                            var transAmt = "";
                            transAmt = records[i]["Transaction Amount"];
                            transAmt = transAmt.replace(/[$,]/g, "");
                            transAmt = parseInt(transAmt);
                            if (records[i]['SC Payment Status'] == 'Entered'){
								if(records[i]["Payment Method"] == 'Financing'){
								  isFinancing="Y";
							     Markup += '<p><img src="images/custom/delete-blue.png" style="height:18px;width:18px;margin-right:2px" class="cross-img pay-delete financing" id="' + (i + 1) + 'void"></p>';
								}else{
									isFinancing="N";
								    Markup += '<p><img src="images/custom/delete-blue.png" style="height:18px;width:18px;margin-right:2px" class="cross-img pay-delete" id="' + (i + 1) + 'void"></p>';
								}
								Markup += '<p><img src="images/custom/edit_fill.png" style="background-color:#20558a!important; border:#20558a!important;border-radius:100%;height:20px !important;width:20px!important;padding:5px!important;margin-right:5px!important" class="blue-bg sc-failed-payment-row" style="background-color:#20558a!important" id="seq-' + (i + 1) + '"><span class="sc-failed-payment-row" style="color:#000" id="seq-'+(i+1)+'">' + records[i]["Payment Method"] + '<span></p>';
							   Markup += '</div>';
							}
						   else {
                                if ((((records[i]["Payment Method"] == "Credit Card" || records[i]["Payment Method"] == "Gift Card") && records[i]["SC Void Enable"] == "Y" && transAmt >= 0 && records[i]["SC Enable Delete"] == "N" && records[i]["SC CVV Failed Flag"] == "N" && records[i]["SC Admin View"] == "N") || (records[i]["SC Allow Refund Void"] == "Y")) && (records[i]['SC Payment Status'] != 'Declined')){
                                   if (records[i]['SC Payment Status']=='Need Verbal Authorization'){
                                     Markup += '<p style="color:#000"><img src="images/custom/blue_void.png" style="height:18px;width:18px;margin-right:2px" class="cross-img pay-delete sc-line-pay-void sc-failed-payment-row" id="' + (i + 1) + 'sc-pay-void"></p>';
						           	Markup += '<p><img src="images/custom/edit_fill.png" style="background-color:#20558a!important; border:#20558a!important;border-radius:100%;height:20px !important;width:20px!important;padding:5px!important;margin-right:2px!important" class="sc-failed-payment-row" id="seq-' + (i + 1) + '"></p>';
						           } else{
									   		 Markup += '<p style="margin-left:14px"><img src="images/custom/icon-cancel.png" class="cross-img pay-delete" style="display: none" id=' + (i + 1) + '"void"></p>';
				                 	      Markup += '<p style="color:#000"><img src="images/custom/blue_void.png" style="height:18px;width:18px;margin-right:2px" class="cross-img pay-delete sc-line-pay-void sc-failed-payment-row" id="' + (i + 1) + 'sc-pay-void"></p>';
						           }
							}else{
									if (records[i]['SC Payment Status']=='Need Verbal Authorization'){
										    Markup += '<p style="margin-left:14px"><img src="images/custom/icon-cancel.png" class="cross-img pay-delete" style="display: none" id=' + (i + 1) + '"void"></p>';
				                 		    Markup += '<p><img src="images/custom/edit_fill.png" style="background-color:#20558a!important; border:#20558a!important;border-radius:100%;height:20px !important;width:20px!important;padding:5px!important;margin-right:2px!important" class="sc-failed-payment-row" id="seq-' + (i + 1) + '"></p>';
									}else
                                    Markup += '<p style="margin-left:40px"><img src="images/custom/icon-cancel.png" class="cross-img pay-delete" style="display: none" id=' + (i + 1) + '"void"></p>';
								}
									 Markup += '<p><span class="sc-failed-payment-row" style="color:#000">' + records[i]["Payment Method"] + '<span></p></div>';
                    	   }
                            Markup += '<div class="col-md-3 col-lg-3 col-sm-3 sc-failed-payment-row" id="seq-' + (i + 1) + '" style="cursor:pointer">';
                            Markup += '<p style="color:#000">' + records[i]['SC Payment Status'] + '</p>';
							if((records[i]['SC Payment Status'] != 'Entered')&&(records[i]["Payment Method"] == 'Financing'))
								isFinancing="N";
                            Markup += '</div>';
                            Markup += '<div class="col-md-3 col-lg-3 col-sm-3 sc-failed-payment-row" id="seq-' + (i + 1) + '" style="cursor:pointer">';
                            Markup += ' <p style="color:#000">' + records[i]['Payment Date'] + '</p>';
                            Markup += '</div>';
                            Markup += '<div class="col-md-3 col-lg-3 col-sm-3 sc-failed-payment-row" style="cursor:pointer">';
                            Markup += '<p style="color:#000">' + records[i]['Transaction Amount'] + '</p>';
                            Markup += '</div>';
                            Markup += '</div>';
                            Markup += '</div>';
                        //}
                    }
                    Markup += '</div>';

                    return Markup;
                }

                function CreditCardDetails() {
                    Markup = "";
                    Markup += '<div class="payment-panel-body clearfix">';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase mandatory">PAYMENT STATUS:</label>';
                    Markup += '<label class="input-title man-input">' + paymentBC.GetFieldValue('SC Payment Status') + '</label>';
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">INVOICE REFERENCE #:</label>';
                    if (paymentBC.GetFieldValue('SC Invoice Ref#').length != 0) {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Invoice Ref#') + '</label>';
                    } else {
                        Markup += '<label class="input-title"></label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">ADDRESS VERIFIED:</label>';
                    Markup += '<div class="SC-checkbox-grey-square">';

                    if (paymentBC.GetFieldValue["SC Add Check Verified"] == "Y") {
                        Markup += '<input type="checkbox" id="cc-address-verified" name="" class="input-checkbox" checked="checked" disabled="disabled">';
                    } else {
                        Markup += '<input type="checkbox" id="cc-address-verified" name="" class="input-checkbox" disabled="disabled">';
                    }

                    Markup += '<label for="cc-address-verified"></label>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">authorization CODE:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization") {
                        Markup += '<input type="text" name="ccAuthCode" id="CCAuthCode" style="background:#fff;margin-bottom:0px !important" class="input-box big">';
                    } else {
                        if (paymentBC.GetFieldValue('Authorization Code').length != 0) {
                            Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Authorization Code') + '</label>';
                        } else {
                            Markup += '<label class="input-title"></label>';
                        }
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">AUTHORIZATION DATE:</label>';
                    if (paymentBC.GetFieldValue('SC Auth Date').length != 0) {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Auth Date') + '</label>';
                    } else {
                        Markup += '<label class="input-title"></label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Account Number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">CVV FAILED:</label>';
                    Markup += '<div class="SC-checkbox-grey-square">';

                    if (paymentBC.GetFieldValue["SC CVV Failed Flag"] == "Y") {
                        Markup += '<input type="checkbox" id="cc-ccv-failed" name="cc-ccv-failed" class="input-checkbox" checked="checked" disabled="disabled">';
                    } else {
                        Markup += '<input type="checkbox" id="cc-ccv-failed" name="cc-ccv-failed" class="input-checkbox" disabled="disabled">';
                    }

                    Markup += '<label for="cc-ccv-failed"></label>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">PAYMENT RECEIPT TEXT:</label>';
                    if (paymentBC.GetFieldValue('SC Pmt Receipt Text').length != 0) {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Invoice Ref#') + '</label>';
                    } else {
                        Markup += '<label class="input-title"></label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">SETTLEMENT AMOUNT:</label>';
                    if (paymentBC.GetFieldValue('SC Settled Amount').length != 0) {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Settled Amount') + '</label>';
                    } else {
                        Markup += '<label class="input-title"></label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">SETTLEMENT DATE:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Settlement Date').length != 0) {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Settlement Date') + '</label>';
                    } else {
                        Markup += '<label class="input-title"></label>';
                    }
                    Markup += ' </div>';
					//NGOLLA:defect N0 802
					Markup += '<div class="input-group">';
					Markup += '<label class="input-title">manual authorization</label>';
					Markup += '<div class="SC-checkbox-grey-square">';
						Markup += '<input type="checkbox" id="cc-manual-auth" name="cc-manual-auth" class="input-checkbox" disabled="disabled">';
						Markup += '<label for="cc-manual-auth"></label>';
					Markup += '</div>';
				Markup += '</div>';
                    Markup += '</div>';
                    return Markup;
                }

                function GiftCardDetails() {
                    Markup = "";
                    Markup += '<div class="payment-panel-body clearfix">';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title  input-uppercase mandatory">payment status:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "") {
                        Markup += '<label class="input-title man-input"></label>';
                    } else {
                        Markup += '<label class="input-title man-input">' + paymentBC.GetFieldValue('SC Payment Status') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">invoice reference#:</label>';
                    if (paymentBC.GetFieldValue('SC Invoice Ref#') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Invoice Ref#') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">authorization code:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization") {
                        Markup += '<input type="text" name="gcAuthCode" id="GCAuthCode" style="background:#fff;margin-bottom:0px !important" class="input-box big">';
                    } else {
                        if (paymentBC.GetFieldValue('Authorization Code').length != 0) {
                            Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Authorization Code') + '</label>';
                        } else {
                            Markup += '<label class="input-title"></label>';
                        }
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Authorization date:</label>';
                    if (paymentBC.GetFieldValue('SC Auth Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Auth Date') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Account Number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">address verified:</label>';
                    Markup += '<div class="SC-checkbox-grey-square">';

                    if (paymentBC.GetFieldValue["SC Add Check Verified"] == "Y") {
                        Markup += '<input type="checkbox" id="gc-address-verified" name="gc-address-verified" class="input-checkbox" checked="checked" disabled="disabled">';
                    } else {
                        Markup += '<input type="checkbox" id="manual-auth" name="" class="input-checkbox" disabled="disabled">';
                    }

                    Markup += '<label for="gc-address-verified"></label>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">payment receipt text:</label>';
                    if (paymentBC.GetFieldValue('SC Pmt Receipt Text') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Pmt Receipt Text') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement amount:</label>';
                    if (paymentBC.GetFieldValue('SC Settled Amount') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Settled Amount') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement date:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Settlement Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Settlement Date') + '</label>';
                    }

                    Markup += ' </div>';
					//NGOLLA:defect N0 802
					Markup += '<div class="input-group">';
					Markup += '<label class="input-title">manual authorization</label>';
					Markup += '<div class="SC-checkbox-grey-square">';
					Markup += '<input type="checkbox" id="gc-manual-auth" name="gc-manual-auth" class="input-checkbox" disabled="disabled">';
					Markup += '<label for="gc-manual-auth"></label>';
					Markup += '</div>';
				    Markup += '</div>';
                    Markup += '</div>';
                    return Markup;
                }

                function CheckDetails() {
                    Markup = "";
                    Markup += ' <div class="payment-panel-body clearfix">';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title mandatory input-uppercase">Payment status:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "") {
                        Markup += '<label class="input-title man-input"></label>';
                    } else {
                        Markup += '<label class="input-title man-input">' + paymentBC.GetFieldValue('SC Payment Status') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">invoice reference#:</label>';
                    if (paymentBC.GetFieldValue('SC Invoice Ref#') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Invoice Ref#') + '</label>';
                    }

                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">account number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }

                    Markup += ' </div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">authorization code:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "Need Verbal Authorization" && paymentBC.GetFieldValue('Authorization Code') == "") {
                        Markup += '<input type="text" name="checkAuthCode" id="CheckAuthCode" style="background:#fff" class="input-box big">';
                    } else {
                        if (paymentBC.GetFieldValue('Authorization Code').length != 0) {
                            Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Authorization Code') + '</label>';
                        } else {
                            Markup += '<label class="input-title"></label>';
                        }
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Authorization date:</label>';
                    if (paymentBC.GetFieldValue('SC Auth Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Auth Date') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Account Number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">payment receipt text:</label>';
                    if (paymentBC.GetFieldValue('SC Pmt Receipt Text') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Pmt Receipt Text') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement amount:</label>';
                    if (paymentBC.GetFieldValue('SC Settled Amount') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Settled Amount') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement date:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Settlement Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Settlement Date') + '</label>';
                    }
                    Markup += ' </div>';
					//NGOLLA:defect N0 802
					 Markup += '<div class="input-group">';
				   Markup += ' <label class="input-title">deposited at store</label>';
				   Markup += '<div class="SC-checkbox-grey-square">';
					if(paymentBC.GetFieldValue('SC Deposited at Store') == "Y"){
				   Markup += '<input type="checkbox" id="ck-dep-str" name="ck-dep-str" class="input-checkbox" checked="checked" disabled="disabled">';
					}else{
				   Markup += '<input type="checkbox" id="ck-dep-str" name="ck-dep-str" class="input-checkbox" disabled="disabled">';
					}
					 Markup += '<label for="ck-dep-str"></label>';
					Markup += '</div>';
					Markup += '</div>';
					Markup += '<div class="input-group">';
					Markup += '<label class="input-title">manual authorization</label>';
					Markup += '<div class="SC-checkbox-grey-square">';
					if(paymentBC.GetFieldValue('Manual Authorization Flag')=="Y"){
					Markup += '<input type="checkbox" id="ck-manual-auth" name="ck-manual-auth" class="input-checkbox" checked="checked" disabled="disabled">';
					}else{
					Markup += '<input type="checkbox" id="ck-manual-auth" name="ck-manual-auth" class="input-checkbox" disabled="disabled">';
					}
					Markup += '<label for="ck-manual-auth"></label>';
					Markup += '</div>';
				    Markup += '</div>';
                    Markup += '</div>';
                    return Markup;
                }

                function FinanceDetails() {
                    Markup = "";
                    Markup += '<div class="payment-panel-body clearfix">';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title mandatory input-uppercase">payment status:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "") {
                        Markup += '<label class="input-title man-input"></label>';
                    } else {
                        Markup += '<label class="input-title man-input">' + paymentBC.GetFieldValue('SC Payment Status') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title input-uppercase">address verified:</label>';
                    Markup += '<div class="SC-checkbox-grey-square">';
                    if (paymentBC.GetFieldValue["SC Add Check Verified"] == "Y") {
                        Markup += '<input type="checkbox" id="fc-address-verified" name="fc-address-verified" class="input-checkbox" checked="checked" disabled="disabled">';
                    } else {
                        Markup += '<input type="checkbox" id="fc-address-verified" name="fc-address-verified" class="input-checkbox" disabled="disabled">';
                    }
                    Markup += '<label for="fc-address-verified"></label>';
                    Markup += '</div>';
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title input-uppercase">authorization code:</label>';
                   if (paymentBC.GetFieldValue('SC Payment Status') != "Authorized" && paymentBC.GetFieldValue('SC Payment Status') != "Entered") {
                        Markup += '<input type="text" name="financeAuthCode" id="FinanceAuthCode" style="background:#fff;margin-bottom:0px !important" class="input-box big">';
                    } else {
                        if (paymentBC.GetFieldValue('Authorization Code').length != 0) {
                            Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Authorization Code') + '</label>';
                        } else {
                            Markup += '<label class="input-title"></label>';
                        }
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title input-uppercase">Authorization date:</label>';
                    if (paymentBC.GetFieldValue('SC Auth Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Auth Date') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Account Number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title mandatory input-uppercase">Disclaimer:</label>';
                    if (paymentBC.GetFieldValue('SC Financing Disclaimer') == "") {
                        Markup += '<input type="text" name="" class="input-box in-big">';
                    } else {
                        Markup += '<input type="text" name="" class="input-box in-big" value="' + paymentBC.GetFieldValue('SC Financing Disclaimer') + '">';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title input-uppercase">settlement amount:</label>';
                    if (paymentBC.GetFieldValue('SC Settled Amount') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Settled Amount') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group input-min-height">';
                    Markup += '<label class="input-title input-uppercase">settlement date:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Settlement Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Settlement Date') + '</label>';
                    }

                    Markup += ' </div>';
					//NGOLLA:defect N0 802
					Markup += '<div class="input-group">';
					Markup += '<label class="input-title">manual authorization</label>';
					Markup += '<div class="SC-checkbox-grey-square">';
					if(paymentBC.GetFieldValue('Manual Authorization Flag')=="Y"){
					Markup += '<input type="checkbox" id="fc-manual-auth" name="" class="input-checkbox" checked="checked" disabled="disabled">';
					}else{
					Markup += '<input type="checkbox" id="fc-manual-auth" name="" class="input-checkbox" disabled="disabled">';
					}
					Markup += '<label for="fc-manual-auth"></label>';
					Markup += '</div>';
				    Markup += '</div>';
                    Markup += '  </div>';
                    return Markup;
                }

                function ACRDetails() {
                    Markup = "";
                    Markup += '<div class="payment-panel-body clearfix">';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Payment status:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Status') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Status') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">authorization code:</label>';
                    if (paymentBC.GetFieldValue('Authorization Code') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Authorization Code') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">authorization date:</label>';
                    if (paymentBC.GetFieldValue('SC Auth Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Auth Date') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">Account Number:</label>';
                    if (paymentBC.GetFieldValue('Account Number') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('Account Number') + '</label>';
                    }
                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement amount:</label>';
                    if (paymentBC.GetFieldValue('SC Settled Amount') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Settled Amount') + '</label>';
                    }

                    Markup += '</div>';
                    Markup += '<div class="input-group">';
                    Markup += '<label class="input-title input-uppercase">settlement date:</label>';
                    if (paymentBC.GetFieldValue('SC Payment Settlement Date') == "") {
                        Markup += '<label class="input-title"></label>';
                    } else {
                        Markup += '<label class="input-title">' + paymentBC.GetFieldValue('SC Payment Settlement Date') + '</label>';
                    }
                    Markup += '</div>';
					//NGOLLA:defect N0 802
					Markup += '<div class="input-group">';
					Markup += '<label class="input-title">Deposited at store</label>';
					Markup += '<div class="SC-checkbox-grey-square">';
					if(paymentBC.GetFieldValue('SC Deposited at Store')=="Y"){
						Markup += '<input type="checkbox" id="ch-dep-str" name="ch-dep-str" class="input-checkbox" checked="checked" disabled="disabled">';
					}else{
						Markup += '<input type="checkbox" id="ch-dep-str" name="ch-dep-str" class="input-checkbox" disabled="disabled">';
					}
					Markup += '<label for="ch-dep-str"></label>';
					Markup += '</div>';
					Markup += '</div>';
                    Markup += '</div>';

                    return Markup;
                }
				
				
				function autoPrint(fileName){
					var siebConsts  = SiebelJS.Dependency( "SiebelApp.Constants" );
							var DISA_PLUGIN = "plugin_print";
							siebConsts.set("WS_"+DISA_PLUGIN.toUpperCase()+"_VERSION", "1.0.0");
							var DISAPrintHandler = null,alertFirstTime="Y";;
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
									 (function(proxied) {
										  window.alert = function() {
											if(arguments[0].includes("Failed to connect to Desktop Integration Siebel Agent on your machine"))
											{
											}
											else
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
								handleMsg.call(this,msg);
							 
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
								if(alertFirstTime=="Y"){
									alertFirstTime="N";
								alert("There is an issue with the software that auto prints from Siebel (DISA). Please contact the Service Desk.");
								}
							}
					}


                return SCPaymentsPR_RP;
            }());
            return "SiebelAppFacade.SCPaymentsPR_RP";
        })
}