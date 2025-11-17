if (typeof(SiebelAppFacade.SCContactFinanceListViewPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCContactFinanceListViewPR");
    define("siebel/custom/SelectComfort/SCContactFinanceListViewPR", ["siebel/viewpr", "siebel/custom/SelectComfort/SCCreditApplicationMarkup", "siebel/custom/SelectComfort/bootstrap.min", "siebel/custom/SelectComfort/jquery.validate.min", "siebel/custom/SelectComfort/SC_OUI_Markups", "siebel/custom/SelectComfort/SC_OUI_Methods", "siebel/custom/SelectComfort/SCErrorCodes"],
        function() {
            SiebelAppFacade.SCContactFinanceListViewPR = (function() {
                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var CreditAppMarkup = SiebelJS.Dependency("SiebelApp.SCCreditApplicationMarkup");
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
                var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
                var pm, SCErrorCodes = SiebelJS.Dependency("SiebelApp.SCErrorCodes");
                var contactRecordSet = '',
                    historyRecordSet = '',
                    locationName = '',
                    financeListAplet_PM = '',
                    financeBC;
                var SC_FirstName = '',
                    SC_MiddleInitial = '',
                    SC_LastName = '',
                    SC_MailingAddress, SC_Apt_Cmp, SC_City, SC_State, SC_ZipCode, SC_Residenceyears, SC_Monthlypayement = "",
                    SC_PrimaryPhone, SC_SecondaryPhone, SC_Email, SC_Employer, SC_EmpPhone, SC_MNI, SC_DOB, SC_SSN, SC_NR, SC_RPN, SC_Phone_Type = "";
                var Co_FirstName = '',
                    Co_MiddleInitial = '',
                    Co_LastName = '',
                    Co_MailingAddr, Co_Apt_Cmp, Co_City, Co_State, Co_ZipCode, Co_Residental_Status, Co_Residenceyears, Co_MonthlyPay, Co_PrimaryPhn, Co_SecondaryPhn, Co_Emp, Co_MNI, Co_DOB, Co_SSN, SC_CoPhone_Type = "",
                    Co_EmpPhn = "";
                var isJointAccount = '',
                    customerNumber, SCShowDivId = '',
                    SCGEMerchantId = '',
                    SCHCMerchantId = '',
                    contactRecord;
                var selectedIndex = '',
                    rowId = '';
                var sFirstFinId = "";

                function SCContactFinanceListViewPR(pm) {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCContactFinanceListViewPR, SiebelAppFacade.ViewPR);

                SCContactFinanceListViewPR.prototype.Init = function() {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.Init.apply(this, arguments);

                    $("#_swescrnbar").hide();
                    $("#_swethreadbar").hide();
                    $(".siebui-button-toolbar").hide();
                    $("#_sweappmenu").hide();
                    $("#_sweview").hide();
                    $("#s_vctrl_div").hide();
                    //SCOUIMethods.SCGetProfileAttr("SC Store Number,Login Name,SC Store User,SCHCMerchantId,SCGEMerchantId,SC Primary Division Type,SC Primary Division Sub Type,SC Primary Division Id,DISALocFound,Last Name,First Name");
                    //for white screen
                    localStorage.setItem('whitescreen', 0);
                    $(".ui-datepicker-trigger").css({
                        "opacity": "0.5",
                        "height": "16px",
                        "width": "16px",
                        "position": "absolute",
                        "bottom": "12px",
                        "left": "0"
                    });
                }

                SCContactFinanceListViewPR.prototype.ShowUI = function() {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.ShowUI.apply(this, arguments);
                    $(".whitescreentimer").remove();
                    $("#custommaskoverlay").hide();
                    $("#_sweview").show();
                    pm = this.GetPM();
                    financeListAplet_PM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetPModel().GetRenderer().GetPM();
                    financeBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetBusComp();
                    contactRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Form Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
                    contactRecord = contactRecordSet[0];
                    //SiebelJS.Log("contactRecordSet@@:"+JSON.stringify(contactRecordSet));

                    //Start: Appending Main root markup
                    var mainMarkup = CreditAppMarkup.SCCreditApp_RootMarkup();
                    //$(mainMarkup).insertAfter("#_sweview");
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Form Applet"].GetPModel().Get("GetFullId")).append(mainMarkup);
                    
                    $('#s_' + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Form Applet"].GetPModel().Get("GetFullId") + '_div').hide();
                    $("#" + SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetPModel().Get("GetFullId")).hide();
                    //End: Appending Main root markup

                    //Start: Appending Header markup
                    var StoreUser = SCOUIMethods.SCGetProfileAttrValue('SC Store User');
                    var lastName = SCOUIMethods.SCGetProfileAttrValue('Last Name');
                    var firstName = SCOUIMethods.SCGetProfileAttrValue('First Name');
                    var loginName = SCOUIMethods.SCGetProfileAttrValue('Login Name');
                    var headerMarkup = SCOUIMarkups.Header_block("CreditApp", StoreUser, lastName, firstName, loginName);
                    $(".nav-header").html(headerMarkup);
                    //End: Appending Header markup

                    //Start: Appending Body markup
                    var bodyMarkup = CreditAppMarkup.SCDataContainer();
                    $("#SC-CreditApp-HistoryBody").html(bodyMarkup);
                    SCOUIMethods.PrimaryButton(financeListAplet_PM, 'SC-CA-Pagination');

                    //End: Appending Body markup

                    //Start: Appending History Records
                    CreditHistory_GetRecords();
                    //End: Appending History Records

                    //Adding CustomerMarkup 
                    customtimermarkup = SCOUIMarkups.CustomTimer();
                    $('#applet1').append(customtimermarkup);

                    // loading waiting time
                    $(document).ready(function() {
                        $("body").bind('Custom.Start', function(ev) {
                            $('#maskoverlay').show();
                            SiebelJS.Log("Start");
                        });

                        $("body").bind('Custom.End', function(ev) {
                            $('#maskoverlay').hide();
                            SiebelJS.Log("Stop");
                        });
                    });

                    //Adding CustomerMarkup 
                    customtimermarkup = SCOUIMarkups.CustomTimer();
                    $('#applet1').append(customtimermarkup);

                    //Start: Appending Manual Update form
                    var manualUpdateMarkup = CreditAppMarkup.SCModalHeader();
                    $("#aff-manual-update").html(manualUpdateMarkup);
                    //End: Appending Manual Update form

                    $(document).on("click", "#SC-cancel-finance", function() {
                        SiebelApp.S_App.GotoView("SC Contact Finance List View OUI");
                    });

                    //navigation to store report
                    /*var customerType = SiebelApp.S_App.GetProfileAttr('SC Primary Division Type');
                    if (customerType == 'STORE' || customerType == 'SHOW') {
                    	$(document).on('click', '#storereport', function(){
                    		SCOUIMarkups.StoreNavigation();
                    	});
                    }
                    else{
                    $("#storereport").hide();}*/

                } //End of ShowUI

                SCContactFinanceListViewPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.BindData.apply(this, arguments);

                    //Start: Setting Name and Customer Id
                    $("#SC-CreditApp-CustName").html(contactRecord["Full Name"] + ' - ');
                    $("#SC-CreditApp-CustNum").html(contactRecord["Person UId"]);
                    customerNumber = contactRecord["Person UId"];
                    //End: Setting Name and Customer Id

                    //saddala for goto contactRecord
                    $(document).on("click", "#gotoContact", function(e) {
                        $('#maskoverlay').show();
                        setTimeout(function() {
                            var InPS = SiebelApp.S_App.NewPropertySet();
                            var OutPS = SiebelApp.S_App.NewPropertySet();
                            var Service = '';
                            InPS.SetProperty("View", "SC Contact 360 Degree View OUI");
                            Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
                            OutPS = Service.InvokeMethod("GotoView", InPS);
                            $('#maskoverlay').hide();
                        }, 50);
                    });
					//NTHARRE:17-05-2021:Added for goto Recent Order -STRY0033869
					$(document).on("click", "#gotoOrder360", function(e) {
                        $('#maskoverlay').show();
                        setTimeout(function() {
                        var FinPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetPModel().GetRenderer().GetPM();
						if(FinPM.ExecuteMethod("CanInvokeMethod","RecentOrder"))
							FinPM.ExecuteMethod("InvokeMethod","RecentOrder",null,false);
							
                            $('#maskoverlay').hide();
                        }, 50);
                    });
                    //Start: Get Store Loction
                    var strType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");

                    if (strType == 'STORE')
                        var strSubType = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    else
                        var strSubType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Sub Type");

                    locationName = strType + " " + strSubType;
                    //End: Get Store Location 

                    //Setting Store Location at Header Level
                    $("#SC-CA-Location").html(locationName);
                    $(".SC-CA-TD-Location").html(locationName);
                } //End of BindData

                SCContactFinanceListViewPR.prototype.BindEvents = function() {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.BindEvents.apply(this, arguments);

                    //Start: highlighting record
                    $(document).on("click", "#SC-credit-history tbody tr", function(e) {
                        $("#SC-credit-history tbody tr").not(this).popover('hide');
                        var selected = $(this).hasClass("credit-active");
                        $("#SC-credit-history tbody tr").removeClass("credit-active");
                        $(this).addClass("credit-active");

                        //selected row id 
                        rowId = this.getAttribute('id');
                        selectedIndex = rowId.replace("row", "");

                        //Start: Enabling Account Number field for Synchrony
                        if (($("#" + rowId).find(".SC-CA-TD-AppStatus").text().toLowerCase() == "HOST ERROR".toLowerCase() || $("#" + rowId).find(".SC-CA-TD-AppStatus").text().toLowerCase() == "DECLINE".toLowerCase()) && $("#" + rowId).find(".SC-CA-TD-PartnerName").text().toLowerCase() == "SYNCHRONY".toLowerCase()) {
                            $("#SC-CA-AccNumber").prop('disabled', false);

                        } else {
                            $("#SC-CA-AccNumber").prop('disabled', true);
                        }
                        //End: Enabling Account Number field for Synchrony

                        //Start: Disabling Status
                        if ($("#" + rowId).find(".SC-CA-TD-AppStatus").text().toLowerCase() == "APPROVED".toLowerCase()) {
                            $("#SC-CA-Status").prop('disabled', true);
                        }
                        //End: Disabling Status

                    });

                    //kavya:02-08-2019 SocialSecurity number Info toggle


                    //Start: highlighting record

                    $(document).click(function(e) {
                        if (!$(e.target).closest('#SC-credit-history tbody tr').length) {
                            $("#SC-credit-history tbody tr").popover('hide');
                            $("#SC-credit-history tbody tr").removeClass("credit-active");
                        }
                    });
                    //kavya:02-08-2019 SocialSecurity number Info toggle
                    $(document).on("click", "#sc-SocialSecurity-num,#SC_SSN", function(e) {
                        var Name = ConFormApp_RS[0]["First Name"] + " " + ConFormApp_RS[0]["Last Name"];
                        $("#sc-ssn-infotext").text("Enter SSN for " + Name);
                        $("#sc-sstootltip-num").toggle();

                    });
                    $(document).on("click", "#sc-cosocialsecurity-num,#Co_SSN", function(e) {
                        var firstName = $("#Co_FirstName").val();
                        var lastName = $("#Co_LastName").val();
                        $("#sc-cossn-infotext").text("Enter SSN for " + firstName + '  ' + lastName);
                        $("#sc-cosstootltip-num").toggle();

                    });


                    //Start: Giving Option
                    $("#SC-credit-history tbody tr").popover({
                        trigger: "click",
                        placement: "top"
                    });
                    //End: Giving Option
                    /*$(document).ready(function() {
		  $("#txtDate").datepicker({
			 showOn: 'button',
       	    buttonText: 'Show Date',
        	 buttonImageOnly: true,
			 buttonImage: 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif'

		  });

		});​*/


                    //Start: manual update form 
                    $(document).on('click', '.edit-app', function(event) {
                        event.preventDefault();
                        //Based on this id we can get the row data.
                        var currentRowId = $(this).parentsUntil().find(".popover").prev("tr").attr("id");
                        $("#aff-manual-update").modal({
                            backdrop: "static"
                        });

                        //Start: Defaulting Values
                        $("#SC-CA-Patner").html($("#" + rowId).find(".SC-CA-TD-PartnerName").text());
                        //$("#SC-CA-Mobile").html(contactRecord["Cellular Phone #"]); 
                        $("#SC-CA-MerchantNumber").html(historyRecordSet[selectedIndex]["SC MerchantId"]);
                        $("#SC-CA-CustomerNumb").html(contactRecord["Person UId"]);
                        $("#SC-CA-CustName").html(contactRecord["Full Name"]);
                        $("#SC-CA-AccNumber").val(historyRecordSet[selectedIndex]["SC Account Number"]);
                        $("#SC-CA-CreditLimit").val(historyRecordSet[selectedIndex]["SC Credit Amount"]);
                        //End: Defaulting Values

                        //Start: Get Application Status values
                        var searchExpr = "[Type]= 'SC_CA_APP_STATUS' AND [Active]='Y'";
                        var sortSpec = '';
                        var lovArray = SCOUIMethods.SCGetOrderLoVs(searchExpr);

                        var lovValue = '';
                        lovValue += ' <option>' + historyRecordSet[selectedIndex]["SC Application Status"] + '</option>';
                        for (var r = 0; r < lovArray.length; r++) {
                            if (historyRecordSet[selectedIndex]["SC Application Status"] != lovArray[r])
                                lovValue += '<option>' + lovArray[r] + '</option>';
                        }
                        $("#SC-CA-Status").html(lovValue);
                        //Start: Get Application Status values
                    });
                    //End: manual update form 


                    //Start: For Phone Validation
                    jQuery.validator.addMethod(
                        "regex",
                        function(value, element, regexp) {
                            if (regexp.constructor != RegExp)
                                regexp = new RegExp(regexp);
                            else if (regexp.global)
                                regexp.lastIndex = 0;
                            return this.optional(element) || regexp.test(value);
                        },
                        "");
                    //End: For Phone Validation
                    //US phone format
                    var phonenumber;
                    $(document).on('keypress', '#SC_EmpPhone', function() {
                        phonenumber = $('#SC_EmpPhone').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });
                    //US phone format
                    $(document).on('keypress', '#SC_RPN', function() {
                        phonenumber = $('#SC_RPN').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });
                    //US phone format
                    $(document).on('keypress', '#SC_PrimaryPhone', function() {
                        phonenumber = $('#SC_PrimaryPhone').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });
                    //US phone format
                    $(document).on('keypress', '#SC_SecondaryPhone', function() {
                        phonenumber = $('#SC_SecondaryPhone').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });

                    $(document).on('keypress', '#SC_AltSecondaryPhone', function() {
                        phonenumber = $('#SC_AltSecondaryPhone').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });

                    //US phone format
                    $(document).on('keypress', '#Co_PrimaryPhn', function() {
                        phonenumber = $('#Co_PrimaryPhn').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });
                    //US phone format
                    $(document).on('keypress', '#Co_SecondaryPhn', function() {
                        phonenumber = $('#Co_SecondaryPhn').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });

                    $(document).on('keypress', '#Co_AltSecondaryPhn', function() {
                        phonenumber = $('#Co_AltSecondaryPhn').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });


                    //US phone format
                    $(document).on('keypress', '#Co_EmpPhn', function() {
                        phonenumber = $('#Co_EmpPhn').val();
                        if (phonenumber.length === 3) {
                            phonenumber = phonenumber + "-";
                        } else if (phonenumber.length === 7) {
                            phonenumber = phonenumber + "-";
                        }
                        $(this).val(phonenumber);
                    });
                    //SSN Format
                    $(document).on('keypress', '#SC_SSN', function() {
                        var ssnnumber = $('#SC_SSN').val();
                        if (ssnnumber.length === 3) {
                            ssnnumber = ssnnumber + "-";
                        } else if (ssnnumber.length === 6) {
                            ssnnumber = ssnnumber + "-";
                        }
                        $(this).val(ssnnumber);
                    });
                    //SSN Format
                    $(document).on('keypress', '#Co_SSN', function() {
                        var ssnnumber = $('#Co_SSN').val();
                        if (ssnnumber.length === 3) {
                            ssnnumber = ssnnumber + "-";
                        } else if (ssnnumber.length === 6) {
                            ssnnumber = ssnnumber + "-";
                        }
                        $(this).val(ssnnumber);
                    });
                    //Date & Time Format
                    $(document).on('keypress', '#SC_DOB', function() {
                        var dateofbirth = $('#SC_DOB').val();
                        if (dateofbirth.length === 2) {
                            dateofbirth = dateofbirth + "/";
                        } else if (dateofbirth.length === 5) {
                            dateofbirth = dateofbirth + "/";
                        }
                        $(this).val(dateofbirth);
                    });



                    //Date & Time format for Co-applicant
                    $(document).on('keypress', '#Co_DOB', function() {
                        var dateofbirth = $('#Co_DOB').val();
                        if (dateofbirth.length === 2) {
                            dateofbirth = dateofbirth + "/";
                        } else if (dateofbirth.length === 5) {
                            dateofbirth = dateofbirth + "/";
                        }
                        $(this).val(dateofbirth);
                    });


                    //on mouseover show tooltips
                    $(document).on('mouseover', '#SC-Address-block', function() {
                        $('#SC_MailingAddress').tooltip({
                            'trigger': 'focus',
                            'title': 'Street Address provided must be a physical address; not a P.O. Box',
                            placement: 'bottom'
                        });
                    });
                    $(document).on('mouseover', '#SC_MNI', function() {
                        $('#SC_MNI').tooltip({
                            'trigger': 'focus',
                            'title': 'Monthly Net Income from all sources. Alimony, child support or separate maintenance income should be included if relied upon for credit.        If spouse/partner is applying for their own credit line, their income cannot be included in the monthly net income amount.',
                            placement: 'bottom'
                        });
                    });
                    $(document).on('mouseover', '#Co_MNI', function() {
                        $('#Co_MNI').tooltip({
                            'trigger': 'focus',
                            'title': 'Co-applicant income should not be included in the primary applicants monthly net income.',
                            placement: 'bottom'
                        });
                    });
                    //SC_State
                    /*$(document).on('focusout', '#SC_State', function () {
				 	$("#SC_State").trigger("click");
					$(this).data('select2').open();
		 });*/
                    //Start: Saving Manual updated form
                    $(document).on('click', "#SC-CA-ManualUpdate-Save", function() {

                        var MU_AccNum = $("#SC-CA-AccNumber").val();
                        var MU_CreditLine = $("#SC-CA-CreditLimit").val();
                        var MU_Status = $("#SC-CA-Status").val();
                        var SC_Partner = $("#SC-CA-Patner").text();
						//if (MU_Status == "APPROVED") {
						var SC_AvailAmt = MU_CreditLine;
						var currentdate = new Date(); 
						var SC_Datetime = (currentdate.getMonth()+1) + "/"
										+ currentdate.getDate() + "/"
										//+ (currentdate.getMonth()+1)  + "/" 
										+ currentdate.getFullYear() + " "  
										+ currentdate.getHours() + ":"  
										+ currentdate.getMinutes() + ":" 
										+ currentdate.getSeconds();
						//}
                        // financeBC.SetFieldValue("SC Account Number",MU_AccNum);
                        // financeBC.SetFieldValue("SC Credit Amount",MU_CreditLine);
                        // financeBC.SetFieldValue("SC Application Status",MU_Status);
                        // financeListAplet_PM.ExecuteMethod("InvokeMethod","WriteRecord", null, false);

                        var Custom_Service_Simplified = '',
                            In_Status = '',
                            Out_Status = '',
                            status_fields = '',
                            status_values = '';
                        Custom_Service_Simplified = SiebelApp.S_App.GetService("SC Custom Query Simplified");
                        In_Status = SiebelApp.S_App.NewPropertySet();
                        Out_Status = SiebelApp.S_App.NewPropertySet();
						if (MU_Status == "APPROVED") {
                        status_fields = "SC Account Number,SC Credit Amount,SC Application Status,SC Available Amount,SC Synchrony Last Refresh,SC Synchrony Status";
                        status_values = MU_AccNum + "," + MU_CreditLine + "," + MU_Status + "," + SC_AvailAmt + "," + SC_Datetime+",Account Found";
						} else {
							status_fields = "SC Account Number,SC Credit Amount,SC Application Status";
							status_values = MU_AccNum + "," + MU_CreditLine + "," + MU_Status;
						}

                        In_Status.SetProperty("BO", "Contact");
                        In_Status.SetProperty("BC", "SC Contact Finance OUI");
                        In_Status.SetProperty("SearchSpecification", "[Id] = '" + historyRecordSet[selectedIndex]["Id"] + "'");
                        In_Status.SetProperty("FieldsArray", status_fields);
                        In_Status.SetProperty("ValuesArray", status_values);
                        Out_Status = Custom_Service_Simplified.InvokeMethod("Insert", In_Status);
			// If Save is successful, refresh the record in BC && refresh the cache.  Not the right way to do this but that is how the curent app is designed to work
			if (Out_Status.propArray["Status"] === "OK") {
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetPModel().ExecuteMethod("InvokeMethod", "RefreshBusComp");
				historyRecordSet = "";
				historyRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetBusComp().GetRecordSet();
			}
                        //Get New Data
                        var Custom_Service = '',
                            In_Status = '',
                            Out_Status = '',
                            status_fields = '',
                            status_values = '',
                            Child_St = '',
                            BS_Data_Status = '',
                            statusJSON = '';
                        Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
                        In_Status = SiebelApp.S_App.NewPropertySet();
                        Out_Status = SiebelApp.S_App.NewPropertySet();
                        status_fields = "SC Account Number,SC Credit Amount,SC Application Status";
                    
                        In_Status.SetProperty("BO", "Contact");
                        In_Status.SetProperty("BC", "SC Contact Finance OUI");
                        In_Status.SetProperty("SearchSpecification", "[Id] = '" + historyRecordSet[selectedIndex]["Id"] + "'");
                        In_Status.SetProperty("FieldsArray", status_fields);
                        Out_Status = Custom_Service.InvokeMethod("Query", In_Status);

                        Child_St = Out_Status.GetChild(0);
                        BS_Data_Status = Child_St.GetProperty("OutputRecordSet");
                        statusJSON = JSON.parse(BS_Data_Status);
						console.log("Sukumar:",statusJSON["SC Account Number"]);
                        //SBOORLA:Added code for dispalying Credit Amount US Format
                        var scCrAmt = "";
                        scCrAmt = statusJSON["SC Credit Amount"];
                        scCrAmt = scCrAmt == "" ? 0.00 : parseFloat(scCrAmt);
                        $("#" + rowId).find(".SC-CA-TD-AccountNumber").html(statusJSON["SC Account Number"]);
                        $("#" + rowId).find(".SC-CA-TD-CreditAmount").html('$' + scCrAmt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
                        $("#" + rowId).find(".SC-CA-TD-AppStatus").html(statusJSON["SC Application Status"]);
						//$("#" + rowId).find(".SC-CA-TD-AppStatus").html(statusJSON["SC Synchrony Last Refresh"]);
						//$("#" + rowId).find(".SC-CA-TD-AppStatus").html(statusJSON["SC Available Amount"]);

                        $(".aff-manual-update").modal('hide');
						//Added  FOR DECLINED BY APRAKASH FOR SFSTRY0001706
						if (SC_Partner == "Synchrony" && (MU_Status == "Decline" || MU_Status.toUpperCase() == "DECLINED")) {
							var finCurrentDate = new Date(SC_Datetime);
							var finGetTime = finCurrentDate.getTime();
							var finAppDate = historyRecordSet[selectedIndex]["SC Application Date"];
							var finAppReqDate = new Date(finAppDate);
							var finAppGetTime = finAppReqDate.getTime();
							var Difference = finGetTime - finAppGetTime;
							var sHours = ((Difference/1000)/3600);
								if(sHours > 48){
									var fin_markup = CreditAppMarkup.SCFinPopupMarkup();
									$("#SC-RESUBMIT-FINAPP").html(fin_markup);
																		
									$(document).on('click', "#SC_FIN_RESUBMIT_CLOSE", function() {										
										$("#SC-RESUBMIT-FINAPP").modal('hide');
									});
									
									$("#SC-RESUBMIT-FINAPP").modal({
										backdrop: 'static'
									})
						
									$("#SC-RESUBMIT-FINAPP").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									})
									$(".modal-backdrop").css('background', '#ffffff');									
									
								}
								//Phanindra Tentu Deactivated as part of SFSTRY0001864 on 14-03-2022
								/*else{
									submitHCApplication();
								}*/
                            
                        }//END

                    });
                    //End: Saving Manual updated form


                    //Start: Refresh status
                    $(document).on('click', '#SC-CA-Refresh', function() {
                        //Start loader 
                        $("body").trigger('Custom.Start');
                        setTimeout(function() {
                            GetApplictionStatus();
                            //hiding the Loader
                            $("body").trigger('Custom.End');
                        }, 1000);
                    });
                    //End: Refresh status


                    //Start-- Select Store Logic
                    var StoreLocation = '',
                        LoginId = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                    var storeChangeMarkup = SCOUIMarkups.StoreChange();
                    $("#SC-add-storelocation").html(storeChangeMarkup);
                    //Add store Location modal open
                    $(document).on('click', '#SC-add-store-location', function() {
                        SiebelJS.Log("Store Button Clicked");
                        $("#SC-add-storelocation").modal({
                            backdrop: 'static'
                        });
                        //NGollA defect for 663
                        if (StoreLocation !== "") {
                            document.getElementById('StoreTitle').innerHTML = StoreLocation;
                            $("#StoreTitle").attr("title", StoreLocation);
                        } else {
                            document.getElementById('StoreTitle').innerHTML = "Add Store Location";
                        }
                    });



                    //on selecting the store for change of store
                    var selectstoreid = "";
                    $("#SC-storelocation tr").click(function() {
                        $(this).addClass('cti-active').siblings().removeClass('cti-active');
                        selectstoreid = $(this).attr('id');
                    });

                    //on click of enter on store search
                    $("#SC-Store-Search").keyup(function(event) {
                        if (event.keyCode === 13) {
                            var value = document.getElementById('SC-Store-Search').value;
                            markup = SCOUIMarkups.StoreChange2(value);
                            $("#SC-storelocation").html(markup);
                            $("#SC-storelocation tr").click(function() {
                                $(this).addClass('cti-active').siblings().removeClass('cti-active');
                                selectstoreid = $(this).attr('id');

                            });
                        }
                    });

                    //This is for store selection
                    $(document).on('click', "#SC-selectstore", function(e) {
                        $("#SC-Store-Search").val("");
                        selectstoreid = $("#" + selectstoreid + " td:first-child").text();
                        if (selectstoreid.length != 0) {
                            SCOUIMethods.SetStore(selectstoreid);
                            SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
                            //StoreLocation = SCOUIMethods.StoreName(LoginId);
                            StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                            if (StoreLocation != "") {
                                document.getElementById('storename').innerHTML = selectstoreid.substring(0, 10);
                                $("#SC-add-store-location").attr("title", "Change Store");
                                $("#storename").attr("title", selectstoreid);
                                StoreLocation = selectstoreid;
                                $("#storereport").show();
                            } else {
                                $("#SC-add-store-location").attr("title", "Add Store");
                            }
                        }
                        $("#SC-add-storelocation").modal('hide');
                        $("#SC-storelocation").html("");
                    });

                    //NGollA defect for 663
                    $(document).on('click', '#SC-Clear-store', function() {
                        SCOUIMethods.SetStore("");
                        SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
                        //StoreLocation = SCOUIMethods.StoreName(LoginId);
                        StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                        $("#storename").text('Add Store');
                        $("#StoreTitle").text('Add Store Location');
                        $("#StoreTitle").attr("title", "Add Store Location");
                    });

                    /*var Bservice1 = '', inPS1 = '', outPS1 = '';
                    inPS1 = SiebelApp.S_App.NewPropertySet();
                    outPS1 = SiebelApp.S_App.NewPropertySet();
                    inPS1.SetProperty("BusObj", "Employee");
                    inPS1.SetProperty("BusComp", "Employee");
                    inPS1.SetProperty("Login Name", LoginId);
                    inPS1.SetProperty("QueryFields", "Login Name");
                    inPS1.SetProperty("ValueFields", "SC Current Location");
                    Bservice1 = SiebelApp.S_App.GetService("Inbound E-mail Database Operations");
                    outPS1 = Bservice1.InvokeMethod("FindRecord", inPS1);
                    var child_Series = outPS1.GetChild(0);
                    StoreLocation = child_Series.GetProperty("SC Current Location");*/
                    StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");

                    if (StoreLocation != "") {
                        document.getElementById('storename').innerHTML = StoreLocation.substring(0, 10);
                        $("#SC-add-store-location").attr("title", "Change Store");
                        $("#storename").attr("title", StoreLocation);
                    } else {
                        $("#SC-add-store-location").attr("title", "Add Store");
                    }
                    //SPATIBAN:added code for update the user location with DISA Location
                    var scdisaloc = "";
                    scdisaloc = SCOUIMethods.SCGetProfileAttrValue("DISALocFound");
                    if (scdisaloc == "Y") {
                        $("#SC-add-store-location").addClass("SC-readonly");
                    }
                    //close SC-close-popup blue-bg
                    $(".SC-close-popup").click(function() {
                        $("#SC-Store-Search").val('');
                    });
                    //End of select store markups
                    //End-- Select Store Logic


                    //Start: Log out button logic
                    $("#SC-profile").click(function() {
                        //navigation to store report
                        var customerName = SCOUIMethods.SCGetProfileAttrValue('SC Store Number');
                        var customerType = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Type');
                        if ((customerType == 'STORE' || customerType == 'SHOW') && customerName != "") {
                            $(document).on('click', '#storereport', function() {
                                SCOUIMarkups.StoreNavigation();
                            });
                        } else {
                            $("#storereport").hide();
                        }
                        $(".SC-Profile-container").toggle();
                    });
                    //on click of logout
                    $("#logout").click(function() {
                        SiebelApp.S_App.LogOff();
                    });
                    //End: Log out button logic
                    //SBOORLA:on click of open Regiser Button
                    $("#sc-cash-draw").click(function() {
                        SCOUIMethods.OpenCashDrawer();
                    });

                    //Start: Navigating to other screens
                    //To Contacts Home Screen
                    $(document).on("click", "#SC_HOME", function() {
                        //for whitescreen
                        localStorage.setItem('whitescreen', 1);
                        SiebelApp.S_App.GotoView("Contact Screen Homepage View", "Contact Home");
                    });

                    //To Contacts List View
                    $(document).on("click", "#SC_CONTACTS", function() {
                        SiebelApp.S_App.GotoView("SC Contact List View OUI");
                    });

                    //To Accounts List View
                    $(document).on("click", "#SC_ACCOUNTS", function() {
                        SiebelApp.S_App.GotoView("SC All Accounts List View OUI");
                    });

                    //To Sales Order View 
                    $(document).on("click", "#SC_SALESORDERS", function() {
                        SiebelApp.S_App.GotoView("SC Sales Order Search View OUI");
                    });
                    //Start: Navigating to other screens

                    //Pagination
                    $(document).on('click', "#SC-CA-Pagination", function() {
                        //SiebelJS.Log("pagination");

                        setTimeout(function() {
                            CreditHistory_GetRecords();
                            $("#SC-credit-history tbody tr").popover({
                                trigger: "click",
                                placement: "top"
                            });
                        }, 500);

                    });

                    ////START: CREATE NEW APPLICATION
                    var financeheadermarkup = CreditAppMarkup.SCFinanceHeaderMarkup();
                    var newfinancemarkup = CreditAppMarkup.SCCreateNewfinanceMarkup();
                    var errorCodes = SCErrorCodes.errorcodes();

                    var Con_Form_App_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Form Applet"].GetPModel().GetRenderer().GetPM();
                    var ConFormApp_RS = Con_Form_App_PMinstance.Get("GetRecordSet");
                    var StatevaluesArray = SCOUIMethods.SCGetOrderLoVs("[Order By] >= 1 and [Order By] <= 52 and [Type]= 'STATE_ABBREV' and [Active] = 'Y'");
                    var stateValue = '';
                    var coapp_Statevalue = ""
                    coapp_Statevalue += ' <option></option>';
                    stateValue += ' <option>' + ConFormApp_RS[0]["Personal State"] + '</option>';
                    for (var st = 0; st < StatevaluesArray.length; st++) {
                        if (StatevaluesArray[st] != ConFormApp_RS[0]["Personal State"])
                            stateValue += ' <option>' + StatevaluesArray[st] + '</option>';
                        coapp_Statevalue += ' <option>' + StatevaluesArray[st] + '</option>';
                    }

                    //start:click on new application
                    $(document).on('click', "#SC-add-CA-btn", function() {
                        $("#applet1").html(financeheadermarkup);
                        $(".sc-apply-for-finance-main").html(newfinancemarkup);
                        $("#submit-app").removeClass("SC-disabled");
                        var fsname = ConFormApp_RS[0]["First Name"];
                        fsname = fsname.replace(/[^a-zA-Z]/g, ' ');
                        fsname = fsname.replace(/ /g, '');
                        $("#SC_FirstName").val(fsname);

                        if (ConFormApp_RS[0]["Middle Name"] == "" || ConFormApp_RS[0]["Middle Name"] == '' || ConFormApp_RS[0]["Middle Name"] == 'undefined' || ConFormApp_RS[0]["Middle Name"] == 'UNDEFINED') {
                            $("#SC_MiddleInitial").parent().removeClass("is-completed");
                        } else {
                            var mname = ConFormApp_RS[0]["Middle Name"];
                            mname = mname.replace(/[^a-zA-Z]/g, ' ');
                            mname = mname.replace(/ /g, '');
                            $("#SC_MiddleInitial").val(mname.substring(0, 1));
                        }

                        var lsname = ConFormApp_RS[0]["Last Name"];
                        lsname = lsname.replace(/[^a-zA-Z]/g, ' ');
                        lsname = lsname.replace(/ /g, '');
                        $("#SC_LastName").val(lsname);
                        if (ConFormApp_RS[0]["Personal Street Address"] != "" && ConFormApp_RS[0]["Personal Street Address"] != '') {
                            $("#SC_MailingAddress").val(ConFormApp_RS[0]["Personal Street Address"]);
                            $("#SC_MailingAddress").parent().addClass("is-active is-completed");
                        }
                        if (ConFormApp_RS[0]["Personal City"] != "" || ConFormApp_RS[0]["Personal City"] != '') {
                            $("#SC_City").val(ConFormApp_RS[0]["Personal City"]);
                            $("#SC_City").parent().addClass("is-active is-completed");
                        }
                        if (ConFormApp_RS[0]["Personal State"] != "" && ConFormApp_RS[0]["Personal State"] != '') {
                            $("#SC_State").html(ConFormApp_RS[0]["Personal State"]);
                            $("#SC_State").parent().addClass("is-active is-completed");
                            $("#SC_State").append(stateValue);
                        } else {
                            $("#SC_State").html('<option></option>');
                            $("#SC_State").append(stateValue);
                        }
                        if (ConFormApp_RS[0]["Personal Postal Code"] != "" && ConFormApp_RS[0]["Personal Postal Code"] != '') {
                            $("#SC_ZipCode").val(ConFormApp_RS[0]["Personal Postal Code"]);
                            $("#SC_ZipCode").parent().addClass("is-active is-completed");
                        }
                        if (ConFormApp_RS[0]["Cellular Phone #"] != "" && ConFormApp_RS[0]["Cellular Phone #"] != '') {
                            PH_US_Format("SC_PrimaryPhone", ConFormApp_RS[0]["Cellular Phone #"]);
                            //$("#SC_PrimaryPhone").val(ConFormApp_RS[0]["Cellular Phone #"]);
                            $("#SC_PrimaryPhone").parent().addClass("is-active is-completed");
                        }
                        if (ConFormApp_RS[0]["Home Phone #"] != "" && ConFormApp_RS[0]["Home Phone #"] != '') {
                            PH_US_Format("SC_SecondaryPhone", ConFormApp_RS[0]["Home Phone #"]);
                            //$("#SC_SecondaryPhone").val(ConFormApp_RS[0]["Home Phone #"]);
                            $("#SC_SecondaryPhone").parent().addClass("is-active is-completed");
                        }
                        if (ConFormApp_RS[0]["Email Address"] != "" && ConFormApp_RS[0]["Email Address"] != '') {
                            $("#SC_Email").val(ConFormApp_RS[0]["Email Address"]);
                            $("#SC_Email").parent().addClass("is-active is-completed");
                        }
                        $('#Co_State').html(coapp_Statevalue);
                        /*$("#SC_DOB").datepicker({
                        	maxDate: 0,
                        	changeYear: true,
                        	yearRange: "-100:+0",
                        	changeMonth: true,
                        	showOn: 'button',
                        	buttonText: 'Show Date',
                        	buttonImageOnly: true,
                        	onSelect: function (dateText, inst) {
                        	}
                        });*/
                        $("#SC_DOB").datepicker({
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
                            "bottom": "12px",
                            "left": "0"
                        });
                        /*$("#Co_DOB").datepicker({
                        	maxDate: 0,
                        	changeYear: true,
                        	yearRange: "-100:+0",
                        	changeMonth: true,
                        	showOn: 'button',
                        	buttonText: 'Show Date',
                        	 buttonImageOnly: true,
                        	onSelect: function (dateText, inst) {
                        	}
                        });*/
                        $("#Co_DOB").datepicker({
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

                        //VALLA : 23-OCT-19 : Finance Phone Changes
                        var Phonenumber_Type = select = document.getElementById('Phonenumber_Type');
                        var AltPhonenumber_Type = select = document.getElementById('AltPhonenumber_Type');

                        Phonenumber_Type.onchange = function() {
                            preventDupes.call(this, AltPhonenumber_Type, this.selectedIndex);
                        };
                        AltPhonenumber_Type.onchange = function() {
                            preventDupes.call(this, Phonenumber_Type, this.selectedIndex);
                        };
                        var Co_Phonenumtype = select = document.getElementById('Co_Phonenumtype');
                        var AltCOPhonenumber_Type = select = document.getElementById('AltCOPhonenumber_Type');

                        Co_Phonenumtype.onchange = function() {
                            preventDupes.call(this, AltCOPhonenumber_Type, this.selectedIndex);
                        };
                        AltCOPhonenumber_Type.onchange = function() {
                            preventDupes.call(this, Co_Phonenumtype, this.selectedIndex);
                        };
                    });
                    //end:click on new application

                    $("#SC-hr-line").hide();
                    var targetid = "",
                        enabledcoApp = false;

                    //This is for the input box animations. this is required across the app
                    $(document).on("focus", ".SC-input", function() {
                        $(this).parent().addClass("is-active is-completed");
                    });

                    $(document).on("focusout", ".SC-input", function() {
                        if ($(this).val() === "")
                            $(this).parent().removeClass("is-completed");
                        $(this).parent().removeClass("is-active");
                    });

                    //start:datepicker on DOB fields
                    /*$(document).on("click", "#Co_DOB_CAL", function () {
                    	$('#Co_DOB').datepicker("option", "disabled",false);
                    	$("#Co_DOB").focus();
                    });*/
                    /*$(document).on("click", "#Co_DOB", function () {
                    	$('#Co_DOB').datepicker("option", "disabled", true);
                    });	*/
                    /*$(document).on("focus", "#SC_DOB", function () {
                    	//$('#SC_DOB').datepicker("destroy");
                    	//$(this).removeAttr("disabled");
                    });	*/
                    //start:datepicker on DOB fields
                    /*$(document).on("click", "#SC_DOB_CAL", function () {
                    	//$('#SC_DOB').datepicker("option", "disabled",false);
                    	$('#SC_DOB').datepicker();
                    	//$("#SC_DOB").focus();
                    });*/
                    //end:datepicker on DOB fields
                    //Start:on scroll hiding the datepicker
                    $("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function() {
                        $('#SC_DOB').datepicker("hide");
                        $('#Co_DOB').datepicker("hide");
                    });
                    //End:on scroll hiding the datepicker
                    //Start - Remove Co-Applicant
                    $(document).on("click", "#remvoe-co-applicant", function(event) {
                        event.preventDefault();
                        enabledcoApp = false;
                        $("#edit-applicant-details").hide();
                        $("#SC-care-info").hide();
                        $("#sc-fcc-primary-applicant").find('.required').addClass('mandatory');
                        $("#sc-fcc-co-applicant").find(".SC-input").val("");
                        $("#sc-fcc-co-applicant").find(".SC-input").parent().removeClass("is-active is-completed");
                        $("#sc-fcc-primary-applicant").find(".SC-input-container").css({
                            "pointer-events": 'all',
                            "border-bottom": "2px solid #F0F0F0"
                        });
                        $("#sc_goto_addcoapp").show();
                        $("#sc-fcc-primary-applicant").show();
                        $("#sc-aff-co-app").hide();
                        $("#sc-fcc-co-applicant").hide();
                        $("#sc-aff-app").addClass('active');
                        $("#sc-aff-co-app").removeClass('active');
                        $("#applicant-buttons").show();
                        $("#address").prop('checked', false);
                    });
                    //End - Remove Co-Applicant

                    //start:click on edit applicant page
                    $(document).on("click", "#edit-applicant-details", function() {
                        /* Act on the event */
                        $("#sc-fcc-primary-applicant").show();
                        $("#sc-requestedcredit").show();
                        $("#SC-care-info").hide();
                        $("#SC-hr-line").hide();
                        $("#sc-fcc-co-applicant").hide();
                        $("#submit-block-co-app").hide();
                        $("#submit-block-app").hide();
                        $("#applicant-buttons").show();
                        $("#sc-aff-app").addClass('active');
                        $("#sc-aff-submit").removeClass('active');
                        $("#sc-aff-co-app").removeClass('active');
                        $("#sc-fcc-primary-applicant").find('.required').addClass('mandatory');
                        $("#sc-fcc-primary-applicant").find(".SC-input-container").css({
                            "pointer-events": 'all',
                            "border-bottom": "2px solid #F0F0F0"
                        });
                        if (enabledcoApp) {
                            $("#sc_goto_addcoapp").hide();
                            $('.sc-aff-footer-items').css({
                                'justify-content': 'flex-end'
                            });
                        } else {
                            $("#sc_goto_addcoapp").show();
                        }
                        $(this).hide();
                    });
                    //end:click on edit applicant page

                    //start:click on edit coapplicantpage
                    $(document).on("click", "#edit-co-applicant-details", function() {
                        /* Act on the event */
                        $('.sc-aff-footer-items').css({
                            'justify-content': 'space-between'
                        });
                        $("#co-checkbox").addClass('editable');
                        $("#sc-fcc-primary-applicant").hide();
                        //$("#SC-address-info").show();
                        $("#SC-care-info").hide();
                        $("#SC-hr-line").hide();
                        $("#sc-requestedcredit").show();
                        $("#submit-block-co-app").hide();
                        $("#next-step2").show();
                        $("#sc-aff-co-app").show();
                        $("#sc-fcc-co-applicant").show();
                        $("#sc-aff-app").removeClass('active');
                        $("#sc-aff-submit").removeClass('active');
                        $("#sc-aff-co-app").addClass('active');
                        $("#sc-fcc-co-applicant").find('.required').addClass('mandatory');
                        $("#sc-fcc-co-applicant").find(".SC-input-container").css({
                            "pointer-events": 'all',
                            "border-bottom": "2px solid #F0F0F0"
                        });
                        $(this).hide();
                    });
                    //end:click on edit coapplicantpage
                    $(document).on('click', '.edit-app', function(event) {
                        event.preventDefault();
                        //Based on this id we can get the row data.
                        var currentRowId = $(this).parentsUntil().find(".popover").prev("tr").attr("id");
						//Start : Added for making Account Number Editable
						$("#SC-CA-Status").change(function () 
							{ 
								var selectedVal = $(this).children("option:selected").val();
								if (selectedVal === "APPROVED") {
						        $(".modal-body #SC-CA-AccNumber").prop('disabled', false);
							} else {
                                $(".modal-body #SC-CA-AccNumber").prop('disabled', true);
								}
							}
						);//End
            $('form[name="aff-manual-update-form"]').validate({
                rules: {
                    "SC-CA-AccNumber": {
                        isValidAccntNum: true
                    }
                },
                tooltip_options: {
                    "SC-CA-AccNumber": {
                        trigger: 'focus',
                        placement: 'bottom',
                        html: true
                    }
                },
                submitHandler: function(form) {
                }
            });
            $.validator.addMethod("isValidAccntNum", function(value, element) {
                if (historyRecordSet[selectedIndex]["SC Account Type"] === "Helpcard") {
                    if ($("#SC-CA-AccNumber").val().length < 7 || $("#SC-CA-AccNumber").val().length > 8) {
                        return false;
                    } else {
                        return true;
                    }
                } else if (historyRecordSet[selectedIndex]["SC Account Type"] === "Synchrony") {
                    if ($("#SC-CA-AccNumber").val().length <= 15 || $("#SC-CA-AccNumber").val().length >= 17) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }, function(value,element){
                if (historyRecordSet[selectedIndex]["SC Account Type"] === "Helpcard") {
                    if ($("#SC-CA-AccNumber").val().length < 7 || $("#SC-CA-AccNumber").val().length > 8) {
                        //return "Account Number Should Be Minimum 7 Digits And Maximum 8 Digits";
						return(errorCodes.SC_FINACCHELPCARD_LEN);
                    } 
					else {
                        return "";
                    }
                } else if (historyRecordSet[selectedIndex]["SC Account Type"] === "Synchrony") {
                    if ($("#SC-CA-AccNumber").val().length <= 15 || $("#SC-CA-AccNumber").val().length >= 17) {
                        //return "Account Number Should Be 16 Digits";
						return(errorCodes.SC_FINACCSYNCHRONY_LEN);
                    } 
                    else {
                        return "";
                    }
                }
            });
			$("#aff-manual-update").modal({
                            backdrop: "static"
                        });
                    });
                    $("#sc-exit-ani-close,#sc-exit-ani-close-btn").click(function(event) {
                        $("#sc-exit-ani").modal('hide');
                    });
                    var validateForm = {
                        addcoapp: function() {
                            enabledcoApp = true;
                            $("#sc-fcc-primary-applicant").hide();
                            $("#sc-aff-co-app").show();
                            $('.SC-req-amut').css({
                                "pointer-events": 'none'
                            });
                            $("#sc-fcc-co-applicant").show();
                            $("#sc-fcc-co-applicant").show();
                            $("#SC-address-info").show();
                            $("#sc-aff-app").removeClass('active');
                            $("#sc-aff-co-app").addClass('active');
                            $("#edit-co-applicant-details").hide();
                            $("#next-step2").show();

                        },
                        gotoreview: function() {
                            $("#sc-fcc-co-applicant").hide();
                            //$("#SC-address-info").hide();
                            $("#SC-care-info").show();
                            $("#edit-co-applicant-details").show();
                            $("#submit-block-app").show();
                            $("#edit-applicant-details").show();
                            $("#sc-fcc-primary-applicant").show();
                            $("#applicant-buttons").hide();
                            $("#sc-aff-app").removeClass('active');
                            $("#sc-aff-co-app").removeClass('active');
                            $("#sc-aff-submit").addClass('active');
                            $("#next-step2").hide();

                            $("#sc-fcc-primary-applicant").find(".SC-input-container").css({
                                "pointer-events": 'none',
                                "border-bottom": "transparent"
                            });
                            $("#sc-fcc-primary-applicant").find("label").removeClass('mandatory');
                            $("#reviewandsubmit").show();
                            $("#sc-requestedcredit").hide();
                            if (enabledcoApp) {
                                $("#sc-fcc-co-applicant").show();
                                $("#submit-block-app").hide();
                                $("#submit-block-co-app").show();
                            } else {
                                $("#sc-fcc-co-applicant").hide();
                            }
                        }
                    };

                    //start:on click of next button in applicant page
                    $(document).on("click", "#sc_goto_gotoreview,#sc_goto_addcoapp", function() {
                        $("#submit-app").prop("disabled", false);
                        $("#sc-fcc-primary-applicant").validate({
                            rules: {
                                firstname: {
                                    required: true,
                                    maxlength: 20
                                },
                                lastname: {
                                    required: true,
                                    maxlength: 25
                                },
                                birthdate: {
                                    required: true,
                                    maxlength: 10,
                                    minlength: 10,
                                    regex: /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[./-]\d{4})$/
                                },
                                socialsecuritynumber: {
                                    required: true,
                                    regex: /\d{3}-?\d{2}-?\d{4}$/,
                                    maxlength: 11
                                    //minlength: 11
                                },
                                residentialstatus: {
                                    required: true
                                },
                                hlatr: {
                                    required: true,
                                    regex: /^[0-9]*$/
                                },
                                wtbja: {
                                    required: true
                                },
                                employer: {
                                    required: true,
                                    maxlength: 40
                                },
                                employerphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                monthlynetin: {
                                    required: true,
                                    number: true,
                                    maxlength: 8
                                },
                                nearrel: {
                                    maxlength: 40
                                },
                                monthlyhomepay: {
                                    required: true,
                                    number: true
                                },
                                secondaryphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                altphone: {
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                rephnum: {
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                address: {
                                    required: true,
                                    maxlength: 75
                                },
                                apt: {
                                    required: true
                                },
                                city: {
                                    required: true
                                },
                                state: {
                                    required: true
                                },
                                zipcode: {
                                    required: true,
                                    maxlength: 14
                                },
                                primaryphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                email: {
                                    email: true
                                }
                            },
                            messages: {
                                firstname: {
                                    required: errorCodes.SC_REQUIRED_FIRST_NAME,
                                    maxlength: errorCodes.SC_FIRST_NAME_MAX_LENGTH
                                },
                                lastname: {
                                    required: errorCodes.SC_REQUIRED_LAST_NAME,
                                    maxlength: errorCodes.SC_LAST_NAME_MAX_LENGTH
                                },
                                birthdate: {
                                    required: errorCodes.SC_REQUIRED_BIRTH_DATE,
                                    maxlength: errorCodes.SC_BIRTH_DATE_LENGTH,
                                    minlength: errorCodes.SC_BIRTH_DATE_LENGTH,
                                    regex: errorCodes.SC_BIRTH_DATE_LENGTH
                                },
                                socialsecuritynumber: {
                                    required: errorCodes.SC_REQUIRED_SOCIAL_SECURITY_NUMBER,
                                    regex: errorCodes.SC_SOCIAL_SECURITY_MAX_LENGTH,
                                    maxlength: errorCodes.SC_SOCIAL_SECURITY_MAX_LENGTH
                                },
                                residentialstatus: errorCodes.SC_REQUIRED_RESIDENTIAL_STATUS,
                                hlatr: {
                                    required: errorCodes.SC_REQUIRED_HLATR,
                                    regex: errorCodes.SC_INTEGER_HLATR
                                },
                                wtbja: errorCodes.SC_REQUIRED_WTBJA,
                                employer: {
                                    required: errorCodes.SC_REQUIRED_EMPLOYER,
                                    maxlength: errorCodes.SC_EMPOLYER_MAX_LENGTH
                                },
                                employerphone: { //SADDALA for #574 tooltip
                                    required: errorCodes.SC_REQUIRED_PHONE_EMPL,
                                    regex: errorCodes.SC_REQUIRED_PHONE_EMPL,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                monthlynetin: {
                                    required: errorCodes.SC_REQUIRED_MONTHLY_NET_INCOME,
                                    number: errorCodes.SC_NUMBERS_ONLY,
                                    maxlength: errorCodes.SC_NET_INCOME_MAX_LENGTH
                                },
                                nearrel: {
                                    maxlength: errorCodes.SC_REALTIVE_NAME_MAX_LENGTH
                                },
                                monthlyhomepay: {
                                    required: errorCodes.SC_REQUIRED_MONTHLY_HOME_PAYMENT,
                                    number: errorCodes.SC_NUMBERS_ONLY
                                },
                                secondaryphone: {
                                    required: errorCodes.SC_CELL_PHONE,
                                    regex: errorCodes.SC_CELL_PHONE,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                altphone: {
                                    regex: errorCodes.SC_CELL_PHONE,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                rephnum: {
                                    regex: errorCodes.SC_EMPLOYER_PHONE_NUMBER,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                address: {
                                    required: errorCodes.SC_REQUIRED_ADDRESS,
                                    maxlength: errorCodes.SC_LAST_NAME_MAX_LENGTH
                                },
                                apt: errorCodes.SC_REQUIRED_APT,
                                city: errorCodes.SC_REQUIRED_CITY,
                                state: errorCodes.SC_REQUIRED_STATE,
                                zipcode: {
                                    required: errorCodes.SC_REUIRED_POSTAL_CODE,
                                    maxlength: errorCodes.SC_ZIP_CODE_MAX_LENGTH
                                },
                                primaryphone: { //SADDALA for #574 tooltip
                                    required: errorCodes.SC_REQUIRED_PHONE_CUST,
                                    regex: errorCodes.SC_REQUIRED_PHONE_CUST,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                email: errorCodes.SC_INVALID_EMAIL,
                            },
                            tooltip_options: {
                                firstname: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                lastname: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                birthdate: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                socialsecuritynumber: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                residentialstatus: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                hlatr: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                wtbja: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                employer: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                employerphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                monthlynetin: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                nearrel: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                monthlyhomepay: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                secondaryphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                altphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                rephnum: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                address: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                apt: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                city: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                state: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                zipcode: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                primaryphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                email: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                }
                            },
                            submitHandler: function(form) {
                                //if ($("#reqcre").val() !== "") {
                                //		validateForm[targetid]();
                                //	} else {
                                //validation for Req credit amunt
                                $("#sc-req-credit-amunt").submit();
                                //	}

                            }

                        });
                        //start:validation for Request Credit Amount
                        $("#sc-req-credit-amunt").validate({
                            rules: {
                                reqcredamu: {
                                    required: true,
                                    number: true,
                                    maxlength: 26
                                },
                            },
                            messages: {
                                reqcredamu: {
                                    required: errorCodes.SC_REQUIRED_REQ_CRE_AMT,
                                    number: errorCodes.SC_NUMBERS_ONLY,
                                    maxlength: errorCodes.SC_REQ_CREDIT_MAX_LENGTH
                                }
                            },
                            tooltip_options: {
                                reqcredamu: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                }
                            },
                            submitHandler: function(form) {
                                validateForm[targetid]();
                            }
                        });
                        //end:validation for Request Credit Amount
                    });

                    //end:on click of next button in applicant page
                    $(document).on("click", '*[id^=sc_goto_]', function(event) {
                        targetid = $(this).attr('id').split("sc_goto_")[1];
                        $(".ui-datepicker-trigger").css({
                            "opacity": "0.5",
                            "height": "16px",
                            "width": "16px",
                            "position": "absolute",
                            "bottom": "12px",
                            "left": "0"
                        });

                    });
                    //start:on click of next button in applicant page
                    //start:app submit button validation
                    $(document).on("click", "#submit-app, #app-tac", function() {
                        if ($("#app-tac").prop("checked")) {

                            $("#app-terms-error-block").hide();
                        } else {
                            $("#app-terms-error-block").show();
                            $("#app-terms-error-text").text("Please accept Terms & Conditions to proceed");
                        }
                    });
                    //end:app submit button validation

                    //start:co-app submit button validation
                    $(document).on("click", "#submit-aff, #co-tac", function() {
                        if ($("#co-tac").prop("checked")) {

                            $("#terms-error-block").hide();
                        } else {
                            $("#terms-error-block").show();
                            $("#terms-error-text").text("Please accept Terms & Conditions to proceed");
                        }
                    });
                    //end:co-app submit button validation
                    //validations for Co-Applicant Page
                    $(document).on("click", "#SC-coapplicant-next", function() {
                        $("#submit-app").prop("disabled", false);
                        $("#sc-fcc-co-applicant").validate({
                            rules: {
                                firstname: {
                                    required: true,
                                    maxlength: 20,
                                    regex: /^[a-zA-Z]*$/
                                },
                                middlename: {
                                    regex: /^[a-zA-Z]*$/
                                },
                                lastname: {
                                    required: true,
                                    maxlength: 25,
                                    regex: /^[a-zA-Z]*$/
                                },
                                birthdate: {
                                    required: true,
                                    maxlength: 10,
                                    minlength: 10,
                                    regex: /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[./-]\d{4})$/
                                },
                                socialsecuritynumber: {
                                    required: true,
                                    regex: /\d{3}-?\d{2}-?\d{4}$/,
                                    maxlength: 11
                                    //minlength: 11
                                },
                                residentialstatus: {
                                    required: true
                                },
                                hlatr: {
                                    required: true,
                                    regex: /^[0-9]*$/
                                },
                                wtbja: {
                                    required: true
                                },
                                employer: {
                                    required: true,
                                    maxlength: 40
                                },
                                employerphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                monthlynetin: {
                                    required: true,
                                    number: true,
                                    maxlength: 8
                                },
                                nearrel: {
                                    maxlength: 40
                                },
                                monthlyhomepay: {
                                    required: true,
                                    number: true
                                },
                                secondaryphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                altphone: {
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                rephnum: {
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                address: {
                                    required: true,
                                    maxlength: 75
                                },
                                apt: {
                                    required: true
                                },
                                city: {
                                    required: true
                                },
                                state: {
                                    required: true
                                },
                                zipcode: {
                                    required: true,
                                    maxlength: 14
                                },
                                primaryphone: {
                                    required: true,
                                    regex: /\d{3}-?\d{3}-?\d{4}$/,
                                    maxlength: 12,
                                    minlength: 12
                                },
                                email: {
                                    email: true
                                }
                            },
                            messages: {
                                firstname: {
                                    required: errorCodes.SC_REQUIRED_FIRST_NAME,
                                    maxlength: errorCodes.SC_FIRST_NAME_MAX_LENGTH,
                                    regex: errorCodes.SC_NAME_REGEX
                                },
                                middlename: {
                                    regex: errorCodes.SC_NAME_REGEX
                                },
                                lastname: {
                                    required: errorCodes.SC_REQUIRED_LAST_NAME,
                                    maxlength: errorCodes.SC_LAST_NAME_MAX_LENGTH,
                                    regex: errorCodes.SC_NAME_REGEX
                                },
                                birthdate: {
                                    required: errorCodes.SC_REQUIRED_BIRTH_DATE,
                                    maxlength: errorCodes.SC_BIRTH_DATE_LENGTH,
                                    minlength: errorCodes.SC_BIRTH_DATE_LENGTH,
                                    regex: errorCodes.SC_BIRTH_DATE_LENGTH
                                },
                                socialsecuritynumber: {
                                    required: errorCodes.SC_REQUIRED_SOCIAL_SECURITY_NUMBER,
                                    regex: errorCodes.SC_SOCIAL_SECURITY_MAX_LENGTH,
                                    maxlength: errorCodes.SC_SOCIAL_SECURITY_MAX_LENGTH
                                },
                                residentialstatus: errorCodes.SC_REQUIRED_RESIDENTIAL_STATUS,
                                hlatr: {
                                    required: errorCodes.SC_REQUIRED_HLATR,
                                    regex: errorCodes.SC_INTEGER_HLATR
                                },
                                wtbja: errorCodes.SC_REQUIRED_WTBJA,
                                employer: {
                                    required: errorCodes.SC_REQUIRED_EMPLOYER,
                                    maxlength: errorCodes.SC_EMPOLYER_MAX_LENGTH
                                },
                                employerphone: { //SADDALA for #574 tooltip
                                    required: errorCodes.SC_REQUIRED_PHONE_EMPL,
                                    regex: errorCodes.SC_REQUIRED_PHONE_EMPL,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                monthlynetin: {
                                    required: errorCodes.SC_REQUIRED_MONTHLY_NET_INCOME,
                                    number: errorCodes.SC_NUMBERS_ONLY,
                                    maxlength: errorCodes.SC_NET_INCOME_MAX_LENGTH
                                },
                                nearrel: {
                                    maxlength: errorCodes.SC_REALTIVE_NAME_MAX_LENGTH
                                },
                                monthlyhomepay: {
                                    required: errorCodes.SC_REQUIRED_MONTHLY_HOME_PAYMENT,
                                    number: errorCodes.SC_NUMBERS_ONLY
                                },
                                secondaryphone: {
                                    required: errorCodes.SC_CELL_PHONE,
                                    regex: errorCodes.SC_CELL_PHONE,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                altphone: {
                                    regex: errorCodes.SC_CELL_PHONE,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                rephnum: {
                                    regex: errorCodes.SC_EMPLOYER_PHONE_NUMBER,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                address: {
                                    required: errorCodes.SC_REQUIRED_ADDRESS,
                                    maxlength: errorCodes.SC_LAST_NAME_MAX_LENGTH
                                },
                                apt: errorCodes.SC_REQUIRED_APT,
                                city: errorCodes.SC_REQUIRED_CITY,
                                state: errorCodes.SC_REQUIRED_STATE,
                                zipcode: {
                                    required: errorCodes.SC_REUIRED_POSTAL_CODE,
                                    maxlength: errorCodes.SC_ZIP_CODE_MAX_LENGTH
                                },
                                primaryphone: { //SADDALA for #574 tooltip
                                    required: errorCodes.SC_REQUIRED_PHONE_CUST,
                                    regex: errorCodes.SC_REQUIRED_PHONE_CUST,
                                    maxlength: errorCodes.SC_PHONE_NUMBER_MAX_LENGTH
                                },
                                email: errorCodes.SC_INVALID_EMAIL
                            },
                            tooltip_options: {
                                firstname: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                middlename: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                lastname: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                birthdate: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                socialsecuritynumber: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                residentialstatus: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                hlatr: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                wtbja: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                employer: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                employerphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                monthlynetin: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                nearrel: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                monthlyhomepay: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                secondaryphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                altphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                rephnum: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                address: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                apt: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                city: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                state: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                zipcode: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                primaryphone: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                },
                                email: {
                                    trigger: 'focus',
                                    placement: 'bottom',
                                    html: true
                                }
                            },
                            submitHandler: function(form) {
                                if ($("#reqcre").val() !== "") {
                                    $("#sc-fcc-co-applicant").show();
                                    $("#SC-hr-line").show();
                                    $("#SC-care-info").show();
                                    $("#submit-block-co-app").show();
                                    $("#edit-applicant-details").show();
                                    $("#edit-co-applicant-details").show();
                                    $("#sc-fcc-primary-applicant").show();
                                    $("#applicant-buttons").hide();
                                    $("#sc-aff-app").removeClass('active');
                                    $("#sc-aff-co-app").removeClass('active');
                                    $("#sc-aff-submit").addClass('active');
                                    //$("#SC-address-info").hide();
                                    $("#next-step2").hide();
                                    $(".SC-input-container").css({
                                        "pointer-events": 'none',
                                        "border-bottom": "transparent"
                                    });
                                    $("label").removeClass('mandatory');
                                    $("#co-checkbox").removeClass('editable');

                                    $("#reviewandsubmit").show();
                                    $("#sc-requestedcredit").hide();
                                } else {
                                    //validation for Req credit amunt
                                    $("#sc-req-credit-amunt").submit();
                                }

                            }
                        });
                    });
                    $("#SC-credit-history tbody tr").popover({
                        trigger: "click",
                        placement: "top"
                    });

                    $(document).on("click", "#SC-credit-history tbody tr", function(e) {
                        $("#SC-credit-history tbody tr").not(this).popover('hide');
                        var selected = $(this).hasClass("credit-active");
                        $("#SC-credit-history tbody tr").removeClass("credit-active");
                        $(this).addClass("credit-active");

                    });

                    $('#SC-credit-history').on('hidden.bs.popover', function(e) {
                        $(e.target).data("bs.popover").inState.click = false;
                    });

                    //start:user checks the checkbox of address, address fields in readonly mode
                    $(document).on("click", "#address", function() {
                        if ($('#address').is(":checked")) {
                            $("#Co_MailingAddr").val($("#SC_MailingAddress").val());
                            $("#Co_Apt_Cmp").val($("#SC_Apt_Cmp").val());
                            $("#Co_City").val($("#SC_City").val());
                            $("#Co_State").html('<option>' + $("#SC_State").val() + '<option>');
                            $("#Co_ZipCode").val($("#SC_ZipCode").val());
                            $("#Co_MailingAddr").parent().addClass("is-active is-completed");
                            if ($("#SC_City").val() != "" && $("#SC_City").val() != '')
                                $("#Co_Apt_Cmp").parent().addClass("is-active is-completed");
                            $("#Co_City").parent().addClass("is-active is-completed");
                            $("#Co_State").parent().addClass("is-active is-completed");
                            $("#Co_ZipCode").parent().addClass("is-active is-completed");
                            $("#Co_MailingAddr").css({
                                "pointer-events": 'none',
                            });
                            $("#Co_State").css({
                                "pointer-events": 'none',
                            });
                            $("#Co_Apt_Cmp").css({
                                "pointer-events": 'none',
                            });
                            $("#Co_City").css({
                                "pointer-events": 'none',
                            });
                            $("#Co_ZipCode").css({
                                "pointer-events": 'none',
                            });

                        } else {
                            $("#Co_MailingAddr").css({
                                "pointer-events": 'all',
                            });
                            $("#Co_State").css({
                                "pointer-events": 'all',
                            });
                            $("#Co_City").css({
                                "pointer-events": 'all',
                            });
                            $("#Co_Apt_Cmp").css({
                                "pointer-events": 'all',
                            });
                            $("#Co_ZipCode").css({
                                "pointer-events": 'all',
                            });
                            $("#Co_MailingAddr").val("");
                            $("#Co_Apt_Cmp").val("");
                            $("#Co_City").val("");
                            $('#Co_State').html(coapp_Statevalue);
                            $("#Co_ZipCode").val("");
                            $("#Co_MailingAddr").parent().removeClass("is-active is-completed");
                            $("#Co_Apt_Cmp").parent().removeClass("is-active is-completed");
                            $("#Co_City").parent().removeClass("is-active is-completed");
                            $("#Co_State").parent().removeClass("is-active is-completed");
                            $("#Co_ZipCode").parent().removeClass("is-active is-completed");
                        }
                    });
                    //end:user checks the checkbox of address, address fields in readonly mode
                    $(document).on("click", "#app-tac", function() {
                        if ($("#app-tac").is(":checked"))
                            $("#submit-app").prop("disabled", false);
                        else
                            $("#submit-app").prop("disabled", true);
                    });
                    $(document).on("click", "#co-tac", function() {
                        if ($("#co-tac").is(":checked"))
                            $("#submit-aff").prop("disabled", false);
                        else
                            $("#submit-aff").prop("disabled", true);
                    });

                    $(document).on("mouseover", "#SC-Address-block", function() {
                        $('#SC-Address-info').tooltip({
                            'trigger': 'focus',
                            'title': 'Street Address provided must be a physical address; not a P.O. Box',
                            placement: 'bottom'
                        });
                    });

                    $(document).on("mouseover", "#SC-MonthlynetIncome-block", function() {
                        $('#SC-Mnt').tooltip({
                            'trigger': 'focus',
                            'title': 'Monthly Net Income from all sources. Alimony, child support or separate maintenance income should be included if relied upon for credit.        If spouse/partner is applying for their own credit line, their income cannot be included in the monthly net income amount.',
                            placement: 'bottom'
                        });
                    });
                    $(document).on("mouseover", "#SC-CO-app-MonthlyNet", function() {
                        $('#SC-Co-MNET-Income').tooltip({
                            'trigger': 'focus',
                            'title': 'Co-applicant income should not be included in the primary applicants monthly net income.',
                            placement: 'bottom'
                        });
                    });

                    //start:onclick applicant submit button
                    $(document).on("click", "#submit-app", function() {
                        $("#submit-app").prop("disabled", true);
                        $("#submit-app").addClass("SC-disabled");
                        $("#maskoverlay").show();
                        SC_FirstName = $("#SC_FirstName").val();
                        SC_MiddleInitial = $("#SC_MiddleInitial").val();
                        SC_LastName = $("#SC_LastName").val();
                        SC_MailingAddress = $("#SC_MailingAddress").val();
                        SC_Apt_Cmp = $("#SC_Apt_Cmp").val();
                        SC_City = $("#SC_City").val();
                        SC_State = $("#SC_State").val();
                        SC_ZipCode = $("#SC_ZipCode").val();
                        SC_ZipCode = SC_ZipCode.replace("-", "");
                        SC_Residenceyears = $("#SC_Residence").val();
                        SC_Residental_Status = $("#SC_Residental_Status").val();
                        //SC_Monthlypayement = $("#SC_Monthlypayement").val();
                        SC_Monthlypayement = document.getElementById('SC_Monthlypayement').value;
                        //SC_PrimaryPhone = $("#SC_PrimaryPhone").val();
                        //SC_PrimaryPhone = SC_PrimaryPhone.replace(/\D+/g, "");
                        SC_PrimaryPhone = "";
                        SC_SecondaryPhone = "";
                        SC_EmpPhone = "";
                        SC_Phone_Type = $("#Phonenumber_Type").val();
                        var PhoneNumber = $("#SC_SecondaryPhone").val();
                        PhoneNumber = PhoneNumber.replace(/\D+/g, "");
						if (SC_Phone_Type == "MobilePhone") {
                            SC_SecondaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "HomePhone") {
                            SC_PrimaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "Workphone") {
                            SC_EmpPhone = PhoneNumber;
                        } else {
                            SC_PrimaryPhone = "";
                            SC_SecondaryPhone = "";
                            SC_EmpPhone = "";
                        }
						
						SC_Phone_Type = $("#AltPhonenumber_Type").val();
                        var PhoneNumber = $("#SC_AltSecondaryPhone").val();
						PhoneNumber = PhoneNumber.replace(/\D+/g, "");
                        if (SC_Phone_Type == "MobilePhone") {
                            SC_SecondaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "HomePhone") {
                            SC_PrimaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "Workphone") {
                            SC_EmpPhone = PhoneNumber;
                        } else {
                            SC_PrimaryPhone = "";
                            SC_SecondaryPhone = "";
                            SC_EmpPhone = "";
                        }
						
                        SC_Email = $("#SC_Email").val();
                        SC_Employer = $("#SC_Employer").val();
                        //SC_EmpPhone = $("#SC_EmpPhone").val();
                        //SC_EmpPhone = SC_EmpPhone.replace(/\D+/g, "");
                        //SC_MNI = $("#SC_MNI").val();
                        SC_MNI = document.getElementById('SC_MNI').value;
                        SC_DOB = $("#SC_DOB").val();
                        SC_SSN = $("#SC_SSN").val();
                        SC_SSN = SC_SSN.replace(/\D+/g, "");
                        //SC_NR = $("#SC_NR").val();
                        //SC_RPN = $("#SC_RPN").val();
                        //SC_RPN = SC_RPN.replace(/\D+/g, "");
                        isJointAccount = 'N';
                        submitApplication();
                    });
                    //end:onclick applicant submit button

                    //start:click on submit button for both applicant and coapplicant details
                    $(document).on("click", "#submit-aff", function() {
                        $("#submit-app").prop("disabled", true);
                        SC_FirstName = $("#SC_FirstName").val();
                        SC_MiddleInitial = $("#SC_MiddleInitial").val();
                        SC_LastName = $("#SC_LastName").val();
                        SC_MailingAddress = $("#SC_MailingAddress").val();
                        SC_Apt_Cmp = $("#SC_Apt_Cmp").val();
                        SC_City = $("#SC_City").val();
                        SC_State = $("#SC_State").val();
                        SC_ZipCode = $("#SC_ZipCode").val();
                        SC_ZipCode = SC_ZipCode.replace("-", "");
                        SC_Residenceyears = $("#SC_Residence").val();
                        SC_Residental_Status = $("#SC_Residental_Status").val();
                        //SC_Monthlypayement = $("#SC_Monthlypayement").val();
                        SC_Monthlypayement = document.getElementById('SC_Monthlypayement').value;
                        //SC_PrimaryPhone = $("#SC_PrimaryPhone").val();
                        //SC_PrimaryPhone = SC_PrimaryPhone.replace(/\D+/g, "");
                        SC_PrimaryPhone = "";
                        SC_SecondaryPhone = "";
                        SC_EmpPhone = "";
                        SC_Phone_Type = $("#Phonenumber_Type").val();
                        var PhoneNumber = $("#SC_SecondaryPhone").val();
                        PhoneNumber = PhoneNumber.replace(/\D+/g, "");
                        if (SC_Phone_Type == "MobilePhone") {
                            SC_SecondaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "HomePhone") {
                            SC_PrimaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "Workphone") {
                            SC_EmpPhone = PhoneNumber;
                        } else {
                            SC_PrimaryPhone = "";
                            SC_SecondaryPhone = "";
                            SC_EmpPhone = "";
                        }
                        SC_Phone_Type = $("#AltPhonenumber_Type").val();
                        var PhoneNumber = $("#SC_AltSecondaryPhone").val();
                        PhoneNumber = PhoneNumber.replace(/\D+/g, "");
                        if (SC_Phone_Type == "MobilePhone") {
                            SC_SecondaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "HomePhone") {
                            SC_PrimaryPhone = PhoneNumber;
                        } else if (SC_Phone_Type == "Workphone") {
                            SC_EmpPhone = PhoneNumber;
                        } else {
                            SC_PrimaryPhone = "";
                            SC_SecondaryPhone = "";
                            SC_EmpPhone = "";
                        }
                        SC_Email = $("#SC_Email").val();
                        SC_Employer = $("#SC_Employer").val();
                        //SC_EmpPhone = $("#SC_EmpPhone").val();
                        //SC_EmpPhone = SC_EmpPhone.replace(/\D+/g, "");
                        //SC_MNI = $("#SC_MNI").val();
                        SC_MNI = document.getElementById('SC_MNI').value;
                        SC_DOB = $("#SC_DOB").val();
                        SC_SSN = $("#SC_SSN").val();
                        SC_SSN = SC_SSN.replace(/\D+/g, "");
                        //SC_NR = $("#SC_NR").val();
                        //SC_RPN = $("#SC_RPN").val();
                        //SC_RPN = SC_RPN.replace(/\D+/g, "");

                        isJointAccount = 'Y';
                        Co_FirstName = $("#Co_FirstName").val();
                        Co_MiddleInitial = $("#Co_MiddleInitial").val();
                        Co_LastName = $("#Co_LastName").val();
                        Co_MailingAddr = $("#Co_MailingAddr").val();
                        Co_Apt_Cmp = $("#Co_Apt_Cmp").val();
                        Co_City = $("#Co_City").val();
                        Co_State = $("#Co_State").val();
                        Co_ZipCode = $("#Co_ZipCode").val();
                        Co_ZipCode = Co_ZipCode.replace("-", "");
                        Co_Residental_Status = $("#Co_Residental_Status").val();
                        Co_Residenceyears = $("#Co_Residence").val();
                        //Co_MonthlyPay = $("#Co_MonthlyPay").val();
                        Co_MonthlyPay = document.getElementById('Co_MonthlyPay').value;
                        // Co_PrimaryPhn = $("#Co_PrimaryPhn").val();
                        // Co_PrimaryPhn = Co_PrimaryPhn.replace(/\D+/g, "");
                        // Co_SecondaryPhn = $("#Co_SecondaryPhn").val();
                        // Co_SecondaryPhn = Co_SecondaryPhn.replace(/\D+/g, "");
                        Co_Emp = $("#Co_Emp").val();
                        // Co_EmpPhn = $("#Co_EmpPhn").val();
                        // Co_EmpPhn = Co_EmpPhn.replace(/\D+/g, "");
                        Co_PrimaryPhn = "";
                        Co_SecondaryPhn = "";
                        Co_EmpPhn = "";
                        
						SC_CoPhone_Type = $("#Co_Phonenumtype").val();
                        var CoPhoneNumber = $("#Co_SecondaryPhn").val();
                        // VALLA : 10_AUG_2020 : Added the below code to send the Primary Phone number in Primary Phone Field irrespetive of phone type
						if(CoPhoneNumber != ""){
							CoPhoneNumber = CoPhoneNumber.replace(/\D+/g, "");
							Co_PrimaryPhn = CoPhoneNumber;
						}
						// VALLA : 10_AUG_2020 : commented the below code to send the Primary Phone number in Primary Phone Field irrespetive of phone type
						/*if (SC_CoPhone_Type == "MobilePhone") {
                            Co_SecondaryPhn = CoPhoneNumber;
                        } else if (SC_CoPhone_Type == "HomePhone") {
                            Co_PrimaryPhn = CoPhoneNumber;
                        } else if (SC_CoPhone_Type == "Workphone") {
                            Co_EmpPhn = CoPhoneNumber;
                        } else {
                            Co_PrimaryPhn = "";
                            Co_SecondaryPhn = "";
                            Co_EmpPhn = "";
                        }*/
                        
						SC_CoPhone_Type = $("#AltCOPhonenumber_Type").val();
                        var PhoneNumber = $("#Co_AltSecondaryPhn").val();
                        // VALLA : 10_AUG_2020 : Added the below code to send the Alterantive Phone number in Secondary Phone Field irrespetive of phone type
						if(PhoneNumber != ""){
							PhoneNumber = PhoneNumber.replace(/\D+/g, "");
							Co_SecondaryPhn = PhoneNumber;
						}
                        
						// VALLA : 10_AUG_2020 : commented the below code to send the Alterantive Phone number in Secondary Phone Field irrespetive of phone type
                        /*if (SC_CoPhone_Type == "MobilePhone") {
                            Co_SecondaryPhn = PhoneNumber;
                        } else if (SC_CoPhone_Type == "HomePhone") {
                            Co_PrimaryPhn = PhoneNumber;
                        } else if (SC_CoPhone_Type == "Workphone") {
                            Co_EmpPhn = PhoneNumber;
                        } else {
                            Co_PrimaryPhn = "";
                            Co_SecondaryPhn = "";
                            Co_EmpPhn = "";
                        }*/
                        
						//Co_MNI = $("#Co_MNI").val();
                        Co_MNI = document.getElementById('Co_MNI').value;
                        Co_DOB = $("#Co_DOB").val();
                        Co_SSN = $("#Co_SSN").val();
                        Co_SSN = Co_SSN.replace(/\D+/g, "");
                        submitApplication();
                    });
                    //end:click on submit button for both applicant and coapplicant details
                    //submit-app
                    //submit-aff


                    ////END: CREATE NEW APPLICATION


                } //End of BindEvents

                SCContactFinanceListViewPR.prototype.EndLife = function() {
                    SiebelAppFacade.SCContactFinanceListViewPR.superclass.EndLife.apply(this, arguments);

                    $(".ui-datepicker-trigger").css({
                        "opacity": "0",
                        "height": "0px",
                        "width": "0px",
                        "position": "",
                        "bottom": "0px",
                        "left": "0"
                    });
                    //window.location.reload();
                    //for whitescreen
                    if (localStorage.getItem('whitescreen') == 0) {
                        $("#_swescrnbar").hide();
                        $("#_swethreadbar").hide();
                        $("#_sweappmenu").hide();
                        $("#s_vctrl_div").hide();
                        $(".siebui-button-toolbar").hide();
                        $("#_sweview").hide();
                        $('#_swecontent').prepend(SCOUIMarkups.CustomWhiteScreenTimer());
                        $("#custommaskoverlay").show();
                    } else if (localStorage.getItem('whitescreen') == 1) {
                        $("#_swescrnbar").show();
                        $("#_swethreadbar").show();
                        $("#_sweappmenu").show();
                        $("#s_vctrl_div").show();
                        $(".siebui-button-toolbar").show();
                        $("#_sweview").show();
                    }
                    $(document).unbind();
                    $(document).unbind("click");
                    $(document).unbind("keyup");
                }
                //Start: To get the Credit app history Records
                function CreditHistory_GetRecords() {
                    var recordSet = '';
                    var scCrAmt = "";
                    historyRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetBusComp().GetRecordSet();
                    //var data_Contenet = "<div class='edit-status-block'><img src='images/custom/edit.png' class='edit-app'><div class='divider'></div><img src='images/custom/arrow_repeat-fff.png' id='SC-CA-Refresh'></div>";
                    for (var l = 0; l < historyRecordSet.length; l++) {
                        if (l == 0) {
                            sFirstFinId = historyRecordSet[l]["Id"];
                        }
                        var newRecord = '';
                        var data_Contenet = '';
                        /*if ((historyRecordSet[l]["SC Application Status"] == "DECLINE") || (historyRecordSet[l]["SC Application Status"] == "Decline") || (historyRecordSet[l]["SC Application Status"] == "APPROVED") || (historyRecordSet[l]["SC Application Status"] == "Approve")){
							data_Contenet += "<div class='edit-status-block'><img src='images/custom/edit.png' style='pointer-events:none;opacity:0.09' class='edit-app'><div class='divider'></div>";
							data_Contenet += "<img src='images/custom/arrow_repeat-fff.png' style='pointer-events:none;opacity:0.09' id='SC-CA-Refresh'>";
						}
						else{
                            data_Contenet += "<div class='edit-status-block'><img src='images/custom/edit.png' class='edit-app'><div class='divider'></div>";
							data_Contenet += "<img src='images/custom/arrow_repeat-fff.png' id='SC-CA-Refresh'>";
						}*/
						//Added condition for SFSTRY0001454 //Start
						if ((historyRecordSet[l]["SC Application Status"] == "CALL NOW") || (historyRecordSet[l]["SC Application Status"] == "CALL LATER") || (historyRecordSet[l]["SC Application Status"] == "REFERRED") || (historyRecordSet[l]["SC Application Status"] == "Pending")){
							data_Contenet += "<div class='edit-status-block'><img src='images/custom/edit.png' class='edit-app'><div class='divider'></div>";
							data_Contenet += "<img src='images/custom/arrow_repeat-fff.png' id='SC-CA-Refresh'>";
						}
						else{
                            data_Contenet += "<div class='edit-status-block'><img src='images/custom/edit.png' style='pointer-events:none;opacity:0.09' class='edit-app'><div class='divider'></div>";
							data_Contenet += "<img src='images/custom/arrow_repeat-fff.png' style='pointer-events:none;opacity:0.09' id='SC-CA-Refresh'>";
						}//End
						data_Contenet += "</div>";
                        newRecord += '<tr data-toggle="popover" data-html="true" id="row' + l + '" data-content="' + data_Contenet + '">';
                        newRecord += '<td class="SC-CA-TD-CustNumber">' + contactRecord["Person UId"] + '</td>';
                        newRecord += '<td class="SC-CA-TD-FullName">' + contactRecord["Full Name"] + '</td>';
                        //newRecord+='<td class="SC-CA-TD-Location"></td>';
                        newRecord += '<td class="SC-CA-TD-AppDate">' + historyRecordSet[l]["SC Application Date"] + '</td>';
                        newRecord += '<td class="SC-CA-TD-PartnerName">' + historyRecordSet[l]['SC Account Type'] + '</td>';
						 newRecord += '<td class="SC-CA-TD-AppStatus">' + historyRecordSet[l]["SC Application Status"] + '</td>';
                        if ((historyRecordSet[l]["SC Application Status"] == "DECLINE") || (historyRecordSet[l]["SC Application Status"] == "Decline") || (historyRecordSet[l]["SC Application Status"] == "APPROVED") || (historyRecordSet[l]["SC Application Status"] == "Approve")) {
                            $("#SC-CA-Refresh").css({
                                "pointer-events": "none"
                            });
                        }
                        //newRecord += '<td class="SC-CA-TD-PrimaryApplicant">' + contactRecord["Full Name"] + '</td>';
						//console.log("Sukumar",historyRecordSet[l]['SC Account Number']);
						let value = historyRecordSet[l]['SC Account Number'];
						const lastFour = value.slice(-4);
						const masked = value.slice(0, -4).replace(/./g, '•');
						value = (masked + lastFour);
						//console.log("Sukumar",value);
                       // newRecord += '<td class="SC-CA-TD-AccountNumber">' + historyRecordSet[l]['SC Account Number'] + '</td>';
						 newRecord += '<td class="SC-CA-TD-AccountNumber">' + value + '</td>';
                        //SBOORLA:Added code for displaying the credit amount in US Currency format
                        scCrAmt = "";
                        scCrAmt = historyRecordSet[l]["SC Credit Amount"];
                        scCrAmt = scCrAmt.replace(/[$,]/g, "");
                        scCrAmt = scCrAmt == "" ? 0.00 : parseFloat(scCrAmt);
                        newRecord += '<td class="SC-CA-TD-CreditAmount">$' + scCrAmt.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '</td>';
                        newRecord += '<td class="SC-CA-TD-AppKey">' + historyRecordSet[l]["SC Application Key"] + '</td>';
                        newRecord += '<td class="SC-CA-TD-AppKey">' + historyRecordSet[l]["SC Fin Device Type"] + '</td>';
                        newRecord += '<td class="SC-CA-TD-AppRefNum">' + historyRecordSet[l]["Store Number"] + '</td>';
                        newRecord += '</tr>';
                        recordSet += newRecord;
                    }
                    $("#SC-Credit-History").html(recordSet);
                };
                //End: To get the Credit app history Records

                // To Submit Application to the fusion by web service call
                function submitApplication() {
                    // $('#maskoverlay').show();
                    setTimeout(function() {
                        var d = new Date(),
                            month = (d.getMonth() + 1),
                            day = d.getDate(),
                            year = d.getFullYear(),
                            hour = d.getHours(),
                            mins = d.getMinutes(),
                            seconds = d.getSeconds();
                        if (month <= 9) {
                            month = '0' + month;
                        }
                        if (day <= 9) {
                            day = '0' + day;
                        }
                        if (hour <= 9) {
                            hour = '0' + hour;
                        }
                        if (mins <= 9) {
                            mins = '0' + mins;
                        }
                        if (seconds <= 9) {
                            seconds = '0' + seconds;
                        }

                        var applicationTime = year + "-" + month + "-" + day + "T" + hour + ":" + mins + ":" + seconds;

                        var empID = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                        var divisonId = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Id");
                        var hcMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCHCMerchantId");
                        var geMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCGEMerchantId");
                        var locationId = "";
                        //Start: Get Store Location							  
                        var locationType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        if (locationType == 'STORE')
                            locationId = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                        else
                            locationId = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Sub Type");
                        //End: Get Store Location						

                        var BService = SiebelApp.S_App.GetService("PRM ANI Utility Service");
                        var Input = SiebelApp.S_App.NewPropertySet();
                        var PrimaryOut = SiebelApp.S_App.NewPropertySet();
                        Input.SetProperty("Hierarchy Name", "SavePrimaryApplicant");
                        PrimaryOut = BService.InvokeMethod("CreateEmptyPropSet", Input);

                        var PrimaryIOIn = PrimaryOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);

                        if (PrimaryIOIn.GetType() == "SavePrimaryApplicant") {
                            SC_MailingAddress = SC_MailingAddress.substring(0, 40);
                            PrimaryIOIn.SetProperty("Address1", SC_MailingAddress);
                            PrimaryIOIn.SetProperty("Address2", "");
                            PrimaryIOIn.SetProperty("ApplicationDate", applicationTime);
                            if (isJointAccount == 'Y') {
                                PrimaryIOIn.SetProperty("ApplicationType", "JOINT");
                            } else {
                                PrimaryIOIn.SetProperty("ApplicationType", "SINGLE");
                            }
                            SC_City = SC_City.substring(0, 16);
                            PrimaryIOIn.SetProperty("City", SC_City);
                            customerNumber = customerNumber.substring(0, 20);
                            PrimaryIOIn.SetProperty("CustomerNumber", customerNumber);
                            PrimaryIOIn.SetProperty("DateOfBirth", SC_DOB);
                            SC_Email = SC_Email.substring(0, 40);
                            PrimaryIOIn.SetProperty("Email", SC_Email);
                            SC_Employer = SC_Employer.substring(0, 40);
                            PrimaryIOIn.SetProperty("EmployerName", SC_Employer);
                            if (SC_EmpPhone != "" && SC_EmpPhone.length > 0) {
                                SC_EmpPhone = SC_EmpPhone.substring(0, 10);
                                PrimaryIOIn.SetProperty("EmployerPhone", SC_EmpPhone);
                            } else {
                                PrimaryIOIn.SetProperty("EmployerPhone", "");
                            }
                            SC_FirstName = SC_FirstName.substring(0, 20)
                            PrimaryIOIn.SetProperty("FirstName", SC_FirstName);
                            SC_Residenceyears = SC_Residenceyears.substring(0, 3);
                            PrimaryIOIn.SetProperty("HowLongAtAddress", SC_Residenceyears);
                            var str = "";
                            /*str = SC_MNI;
                            str = str.split(".");
                            var strmain=str[0].substring(0,8);
                            if(str[1]== undefined || str[1] == "" ){
                            	SC_MNI = strmain+"."+00;
                            }else{
                            		var strdeci=str[1].substring(0,2);
                            SC_MNI = strmain+"."+strdeci;
                            }*/
                            SC_MNI = SC_MNI == "" ? 0.00 : parseFloat(SC_MNI);
                            PrimaryIOIn.SetProperty("Income", SC_MNI.toFixed(2));
                            SC_LastName = SC_LastName.substring(0, 25);
                            PrimaryIOIn.SetProperty("LastName", SC_LastName);
                            locationId = locationId.substring(0, 8);
                            PrimaryIOIn.SetProperty("LocationId", locationId);
                            locationType = locationType.substring(0, 8);
                            PrimaryIOIn.SetProperty("LocationType", locationType);
                            SC_MiddleInitial = SC_MiddleInitial.substring(0, 1);
                            PrimaryIOIn.SetProperty("MiddleInitial", SC_MiddleInitial);
                            /*var str2 = "";
			str2 = SC_Monthlypayement;
			str2 = str2.split(".");
			var strmain=str2[0].substring(0,10);
			if(str2[1] == undefined || str2[1] == "" ){
				 SC_Monthlypayement = strmain+"."+00;
       	    }else{
              var strdeci=str2[1].substring(0,2);
			  SC_Monthlypayement = strmain+"."+strdeci;			 
			}*/
                            SC_Monthlypayement = SC_Monthlypayement == "" ? 0.00 : parseFloat(SC_Monthlypayement);
                            PrimaryIOIn.SetProperty("MonthlyHomePayment", SC_Monthlypayement.toFixed(2));
                            if (SC_PrimaryPhone != "" && SC_PrimaryPhone.length > 0) {
                                SC_PrimaryPhone = SC_PrimaryPhone.substring(0, 10);
                                PrimaryIOIn.SetProperty("PrimaryPhone", SC_PrimaryPhone);
                            } else {
                                PrimaryIOIn.SetProperty("PrimaryPhone", "");
                            }
                            /* SC_NR = SC_NR.substring(0,40);
                            PrimaryIOIn.SetProperty("RelativeName",SC_NR);
                            SC_RPN = SC_RPN.substring(0,10);
                            PrimaryIOIn.SetProperty("RelativePhone",SC_RPN); */
                            var REQ_CRE = $("#reqcre").val();
                            /*var str1 = "";
			//
			str1 = document.getElementById('reqcre').value;
			str1 = str1;
			str1 = str1.split(".");
			var strmain=str1[0].substring(0,8);
			if(str1[1] == undefined || str1[1] == "" ){
					var REQ_CRE = strmain+"."+00;
			}else{
				var strdeci=str1[1].substring(0,2);
			   var REQ_CRE = strmain+"."+strdeci;
            }*/
                            REQ_CRE = REQ_CRE == "" ? 0.00 : parseFloat(REQ_CRE);
                            PrimaryIOIn.SetProperty("RequestedCreditLine", REQ_CRE.toFixed(2));
                            if (SC_Residental_Status == "Own") {
                                PrimaryIOIn.SetProperty("ResidentialStatus", "O");
                            } else if (SC_Residental_Status == "Rent") {
                                PrimaryIOIn.SetProperty("ResidentialStatus", "R");
                            } else if (SC_Residental_Status == "Lease") {
                                PrimaryIOIn.SetProperty("ResidentialStatus", "L");
                            } else {
                                PrimaryIOIn.SetProperty("ResidentialStatus", "");
                            }
                            SC_SSN = SC_SSN.substring(0, 9);
                            PrimaryIOIn.SetProperty("SSN", SC_SSN);
                            empID = empID.substring(0, 8);
                            PrimaryIOIn.SetProperty("SalesRepId", empID);
                            if (SC_SecondaryPhone != "" && SC_SecondaryPhone.length > 0) {
                                SC_SecondaryPhone = SC_SecondaryPhone.substring(0, 10);
                                PrimaryIOIn.SetProperty("SecondaryPhone", SC_SecondaryPhone);
                            } else {
                                PrimaryIOIn.SetProperty("SecondaryPhone", "");
                            }
                            SC_State = SC_State.substring(0, 2);
                            PrimaryIOIn.SetProperty("State", SC_State);
                            SC_ZipCode = SC_ZipCode.substring(0, 9);
                            PrimaryIOIn.SetProperty("Zip", SC_ZipCode);

                        }
                        PrimaryOut = PrimaryOut.GetChild(0).GetChild(0);
                        PrimaryOut.SetType("PrimaryAppInputIO");

                        var CoAppOut;
                        if (isJointAccount == 'Y') {
                            CoAppOut = SiebelApp.S_App.NewPropertySet();
                            Input.SetProperty("Hierarchy Name", "SaveCoApplicant");
                            CoAppOut = BService.InvokeMethod("CreateEmptyPropSet", Input);
                            var CoAppInIO = CoAppOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);

                            if (CoAppInIO.GetType() == "SaveCoApplicant") {
                                Co_MailingAddr = Co_MailingAddr.substring(0, 40);
                                CoAppInIO.SetProperty("Address1", Co_MailingAddr);
                                CoAppInIO.SetProperty("Address2", "");
                                CoAppInIO.SetProperty("ApplicationDate", applicationTime);
                                Co_City = Co_City.substring(0, 16);
                                CoAppInIO.SetProperty("City", Co_City);
                                customerNumber = customerNumber.substring(0, 20);
                                CoAppInIO.SetProperty("CustomerNumber", customerNumber);
                                CoAppInIO.SetProperty("DateOfBirth", Co_DOB);
                                Co_Emp = Co_Emp.substring(0, 40);
                                CoAppInIO.SetProperty("EmployerName", Co_Emp);
                                if (Co_EmpPhn != "" && Co_EmpPhn.length > 0) {
                                    Co_EmpPhn = Co_EmpPhn.substring(0, 10);
                                    CoAppInIO.SetProperty("EmployerNumber", Co_EmpPhn);
                                } else {
                                    CoAppInIO.SetProperty("EmployerNumber", "");
                                }
                                Co_FirstName = Co_FirstName.substring(0, 20);
                                CoAppInIO.SetProperty("FirstName", Co_FirstName);
                                Co_Residenceyears = Co_Residenceyears.substring(0, 3);
                                CoAppInIO.SetProperty("HowLongAtAddress", Co_Residenceyears);
                                /*var str = "";
				str = Co_MNI;
				str = str.split(".");
				var strmain=str[0].substring(0,8);
				if(str[1]=="undefined" || str[1]==""){
					Co_MNI = strmain+"."+00;
			   }else{
			    var strdeci=str[1].substring(0,2);
				Co_MNI = strmain+"."+strdeci;
				}*/
                                Co_MNI = Co_MNI == "" ? 0.00 : parseFloat(Co_MNI);
                                CoAppInIO.SetProperty("Income", Co_MNI.toFixed(2));
                                Co_LastName = Co_LastName.substring(0, 25);
                                CoAppInIO.SetProperty("LastName", Co_LastName);
                                Co_MiddleInitial = Co_MiddleInitial.substring(0, 1);
                                CoAppInIO.SetProperty("MiddleInitial", Co_MiddleInitial);
                                /*var str = "";
				str = Co_MonthlyPay+'';
				str = str.split(".");
				var strmain=str[0].substring(0,8);
				if(str[1]=="undefined" || str[1]==""){
					Co_MonthlyPay = strmain+"."+00;
			     }else{
				 	var strdeci=str[1].substring(0,2);
				Co_MonthlyPay = strmain+"."+strdeci;	
				}*/
                                Co_MonthlyPay = Co_MonthlyPay == "" ? 0.00 : parseFloat(Co_MonthlyPay);
                                CoAppInIO.SetProperty("MonthlyHomePayment", Co_MonthlyPay.toFixed(2));
                                if (Co_PrimaryPhn != "" && Co_PrimaryPhn.length > 0) {
                                    Co_PrimaryPhn = Co_PrimaryPhn.substring(0, 10);
                                    CoAppInIO.SetProperty("PrimaryPhone", Co_PrimaryPhn);
                                } else {
                                    CoAppInIO.SetProperty("PrimaryPhone", "");
                                }
                                if (Co_Residental_Status == "Own") {
                                    CoAppInIO.SetProperty("ResidentialStatus", "O");
                                } else if (Co_Residental_Status == "Rent") {
                                    CoAppInIO.SetProperty("ResidentialStatus", "R");
                                } else if (Co_Residental_Status == "Lease") {
                                    CoAppInIO.SetProperty("ResidentialStatus", "L");
                                } else {
                                    CoAppInIO.SetProperty("ResidentialStatus", "");
                                }
                                Co_SSN = Co_SSN.substring(0, 9);
                                CoAppInIO.SetProperty("SSN", Co_SSN);
                                if (Co_SecondaryPhn != "" && Co_SecondaryPhn.length > 0) {
                                    Co_SecondaryPhn = Co_SecondaryPhn.substring(0, 10);
                                    CoAppInIO.SetProperty("SecondaryPhone", Co_SecondaryPhn);
                                } else {
                                    CoAppInIO.SetProperty("SecondaryPhone", "");
                                }
                                Co_State = Co_State.substring(0, 2);
                                CoAppInIO.SetProperty("State", Co_State);
                                Co_ZipCode = Co_ZipCode.substring(0, 9);
                                CoAppInIO.SetProperty("Zip", Co_ZipCode);
                            }
                            CoAppOut = CoAppOut.GetChild(0).GetChild(0);
                            CoAppOut.SetType("CoAppInIO");
                        }

                        var SubmitOut = SiebelApp.S_App.NewPropertySet();
                        Input.SetProperty("Hierarchy Name", "SubmitNewApplication");
                        SubmitOut = BService.InvokeMethod("CreateEmptyPropSet", Input);
                        var SubmitAppInIO = SubmitOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);

                        if (SubmitAppInIO.GetType() == "SubmitNewApplication") {
                            SC_FirstName = SC_FirstName.substring(0, 20);
                            SubmitAppInIO.SetProperty("ApplicantFirstName", SC_FirstName);
                            SC_LastName = SC_LastName.substring(0, 25);
                            SubmitAppInIO.SetProperty("ApplicantLastName", SC_LastName);
                            SC_MiddleInitial = SC_MiddleInitial.substring(0, 1);
                            SubmitAppInIO.SetProperty("ApplicantMiddleInitial", SC_MiddleInitial);
                            SubmitAppInIO.SetProperty("ApplicationDate", applicationTime);
                            Co_FirstName = Co_FirstName.substring(0, 20);
                            SubmitAppInIO.SetProperty("CoApplicantFirstName", Co_FirstName);
                            Co_LastName = Co_LastName.substring(0, 25);
                            SubmitAppInIO.SetProperty("CoApplicantLastName", Co_LastName);
                            Co_MiddleInitial = Co_MiddleInitial.substring(0, 1);
                            SubmitAppInIO.SetProperty("CoApplicantMiddleInitial", Co_MiddleInitial);
                            customerNumber = customerNumber.substring(0, 20);
                            SubmitAppInIO.SetProperty("CustomerNumber", customerNumber);
                            divisonId = divisonId.substring(0, 25);
                            SubmitAppInIO.SetProperty("DivisionId", divisonId);
                            SubmitAppInIO.SetProperty("HelpcardMerchantId", hcMerchantId);
                            locationId = locationId.substring(0, 8);
                            SubmitAppInIO.SetProperty("LocationId", locationId);
                            locationType = locationType.substring(0, 8);
                            SubmitAppInIO.SetProperty("LocationType", locationType);
                            empID = empID.substring(0, 8);
                            SubmitAppInIO.SetProperty("SalesRepId", empID);
                            SubmitAppInIO.SetProperty("SynchronyMerchantId", geMerchantId);
							var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                            var DeviceType = scPrimaryDivType + " - Desktop";
							SubmitAppInIO.SetProperty("InProductCode", DeviceType);
                        }
                        SubmitOut = SubmitOut.GetChild(0).GetChild(0);
                        SubmitOut.SetType("SubmitAppInIO");

                        BService = SiebelApp.S_App.GetService("Workflow Process Manager");
                        var wInput = SiebelApp.S_App.NewPropertySet();
                        var wPrimaryOut = SiebelApp.S_App.NewPropertySet();

                        wInput.AddChild(PrimaryOut);
                        wInput.AddChild(CoAppOut);
                        wInput.AddChild(SubmitOut);

                        wInput.SetProperty("IsCoApplicant", isJointAccount);
                        wInput.SetProperty("Object Id", contactRecord['Id']);
                        wInput.SetProperty("Division Id", divisonId);
                        wInput.SetProperty("ProcessName", "SC Finance Application Submit");
                        wPrimaryOut = BService.InvokeMethod("RunProcess", wInput);
                        var sCurrentFirstFindId = "";
                        var rFinRecordSet;
                        var retry = 0;
                        var bRecordUpdate = false;
                        SiebelJS.Log("PreviousId..:" + sFirstFinId);
                        var FieldQueryPair = {
                            "Account Number": "[Id] IS NOT NULL"
                        };
                        do {
                            sleepFor(3000);
                            //SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].InvokeMethod("RefreshBusComp");
                            var inPropSet = CCFMiscUtil_CreatePropSet();
                            //Define the inPropSet property set with the information that InvokeMethod sends as input to the method that it calls.
                            var ai = {};
                            ai.async = false;
                            ai.selfbusy = true;
                            ai.scope = this;
                            ai.mask = true;
                            ai.opdecode = true;
                            ai.errcb = function() {
                                SiebelJS.Log("Error while doing invoking Refresh BusComp after invoking service");
                                retry++;
                            };
                            ai.cb = function() {
                                SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Contact Finance List Applet OUI");
                                rFinRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetBusComp().GetRecordSet();
                                if (rFinRecordSet.length >= 1) {
                                    sCurrentFirstFindId = rFinRecordSet[0]["Id"];
                                    SiebelJS.Log("CurrentId..:" + sCurrentFirstFindId);
                                    if (sFirstFinId != sCurrentFirstFindId) {
                                        var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                                        var DeviceType = scPrimaryDivType + " - Desktop";
                                        var sStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                                        var fieldnames = "SC Fin Device Type,Store Number";
                                        var fieldvalues = DeviceType + "," + sStoreNumber;
                                        inPS = SiebelApp.S_App.NewPropertySet();
                                        outPS = SiebelApp.S_App.NewPropertySet();
                                        inPS.SetProperty("BO", "Contact");
                                        inPS.SetProperty("BC", "SC Contact Finance OUI");
                                        inPS.SetProperty("FieldsArray", fieldnames);
                                        inPS.SetProperty("ValuesArray", fieldvalues);
										var i = 0;
										do{
											sCurrentFirstFindId = rFinRecordSet[i]["Id"];
											inPS.SetProperty("SearchSpecification", "[Id] = '" + sCurrentFirstFindId + "'");
											Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
											outPS = Bservice.InvokeMethod("Insert", inPS);
											i++;
										}while(rFinRecordSet[i] != undefined && rFinRecordSet.length > 1 && sFirstFinId != rFinRecordSet[i]["Id"]);
										bRecordUpdate = true;
                                    }
                                }
                                retry++;
                                if (bRecordUpdate || retry == 3) {
                                    SiebelApp.S_App.GotoView("SC Contact Finance List View OUI");
                                }
                            };
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Finance List Applet OUI"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "RefreshBusComp", inPropSet, ai);
                        } while (!bRecordUpdate);

                        //$("body").trigger('Custom.End')
                        $('#maskoverlay').hide();
                    }, 50);
                };

                function sleepFor(sleepDuration) {
                    var now = new Date().getTime();
                    while (new Date().getTime() < now + sleepDuration) {
                        /* do nothing */
                    }
                }

                //VALLA : 23-OCT-19 : Finance Phone Change
                function preventDupes(select, index) {
                    var options = select.options,
                        len = options.length;
                    while (len--) {
                        options[len].disabled = false;
                    }
                    select.options[index].disabled = true;
                }

                // To get Application Status by fusion web service call
                function GetApplictionStatus() {

                    var empID = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                    var divisonId = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Id");
                    var hcMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCHCMerchantId");
                    var geMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCGEMerchantId");

                    var BService = SiebelApp.S_App.GetService("PRM ANI Utility Service");
                    var Input = SiebelApp.S_App.NewPropertySet();
                    var AppStatusOut = SiebelApp.S_App.NewPropertySet();
                    Input.SetProperty("Hierarchy Name", "CheckApplicationStatus");
                    AppStatusOut = BService.InvokeMethod("CreateEmptyPropSet", Input);

                    var AppStatusIOIn = AppStatusOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);
                    if (AppStatusIOIn.GetType() == "CheckApplicationStatus") {

                        var appDate = historyRecordSet[selectedIndex]["SC Application Date"];
                        var date = appDate.split(" ");
                        var datearray = date[0].split("/");
                        appDate = datearray[2] + '-' + datearray[0] + '-' + datearray[1] + "T" + date[1];

                        AppStatusIOIn.SetProperty("AccountNumber", historyRecordSet[selectedIndex]["SC Account Number"]);
                        AppStatusIOIn.SetProperty("ApplicationDate", appDate);
                        AppStatusIOIn.SetProperty("ApplicationKeyNumber", historyRecordSet[selectedIndex]["SC Application Key"]);
                        AppStatusIOIn.SetProperty("ApplicationRefNumber", historyRecordSet[selectedIndex]["SC Name"]);
                        AppStatusIOIn.SetProperty("CustomerNumber", customerNumber);
                        AppStatusIOIn.SetProperty("DivisionId", divisonId);
                        if (historyRecordSet[selectedIndex]["SC Account Type"] == "Synchrony") {
                            AppStatusIOIn.SetProperty("ApplicationMerchantId", historyRecordSet[selectedIndex]["SC MerchantId"]);
                            AppStatusIOIn.SetProperty("HelpcardMerchantId", hcMerchantId);
                        } else {
                            AppStatusIOIn.SetProperty("ApplicationMerchantId", geMerchantId);
                            AppStatusIOIn.SetProperty("HelpcardMerchantId", hcMerchantId);
                        }
                        AppStatusIOIn.SetProperty("FinancingPartner", historyRecordSet[selectedIndex]["SC Account Type"]);
                        AppStatusIOIn.SetProperty("SalesRep", empID);
                    }
                    AppStatusOut = AppStatusOut.GetChild(0).GetChild(0);
                    AppStatusOut.SetType("CheckAppStatusIOIn");

                    var BService = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var wInput = SiebelApp.S_App.NewPropertySet();
                    var wOutput = SiebelApp.S_App.NewPropertySet();
                    wInput.AddChild(AppStatusOut);
                    wInput.SetProperty("AppRecordId", historyRecordSet[selectedIndex]["Id"]);
                    wInput.SetProperty("ProcessName", "SC Finance Get Application Status");
                    wOutput = BService.InvokeMethod("RunProcess", wInput);

                }
				//Phanindra Tentu Deactivated as part of SFSTRY0001864 on 14-03-2022
                /*function submitHCApplication() {

                    var empID = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                    var divType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                    var divisonId = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Id");
                    var hcMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCHCMerchantId");
                    var geMerchantId = SCOUIMethods.SCGetProfileAttrValue("SCGEMerchantId");

                    var BService = SiebelApp.S_App.GetService("PRM ANI Utility Service");
                    var Input = SiebelApp.S_App.NewPropertySet();
                    var AppStatusOut = SiebelApp.S_App.NewPropertySet();
                    Input.SetProperty("Hierarchy Name", "SubmitToHelpcard");
                    AppStatusOut = BService.InvokeMethod("CreateEmptyPropSet", Input);

                    var AppStatusIOIn = AppStatusOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);
                    if (AppStatusIOIn.GetType() == "SubmitToHelpcard") {

                        var appDate = historyRecordSet[selectedIndex]["SC Application Date"];
                        var date = appDate.split(" ");
                        var datearray = date[0].split("/");
                        appDate = datearray[2] + '-' + datearray[0] + '-' + datearray[1] + "T" + date[1];

                        AppStatusIOIn.SetProperty("ApplicationDate", appDate);
                        AppStatusIOIn.SetProperty("CustomerNumber", customerNumber);
                        AppStatusIOIn.SetProperty("HelpcardMerchantId", hcMerchantId);
                        AppStatusIOIn.SetProperty("LocationId", divisonId);
                        AppStatusIOIn.SetProperty("LocationType", divType);
                        AppStatusIOIn.SetProperty("SalesRepId", empID);
						var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        var DeviceType = scPrimaryDivType + " - Desktop";
						AppStatusIOIn.SetProperty("InProductCode", DeviceType);
                    }
                    AppStatusOut = AppStatusOut.GetChild(0).GetChild(0);
                    AppStatusOut.SetType("HelpCard IO Out");

                    var BService = SiebelApp.S_App.GetService("Workflow Process Manager");
                    var wInput = SiebelApp.S_App.NewPropertySet();
                    var wOutput = SiebelApp.S_App.NewPropertySet();
                    wInput.AddChild(AppStatusOut);
                    wInput.SetProperty("AppRecordId", historyRecordSet[selectedIndex]["Id"]);
                    wInput.SetProperty("ProcessName", "SC Finance Application HC Submit");
                    wOutput = BService.InvokeMethod("RunProcess", wInput);

                }*/

                //Start: Save phone number to US Format	
                PH_US_Format = function(id, mblNumb) {
                    if (mblNumb != '') {
                        var USFormt_mblNum = '';
                        USFormt_mblNum = mblNumb.substring(0, mblNumb.length - 7) + "-" + mblNumb.substring(3, mblNumb.length - 4) + "-" + mblNumb.substring(6, mblNumb.length);
                        $("#" + id).val(USFormt_mblNum);
                    } else {
                        $("#" + id).val(mblNumb);
                    }
                };

                return SCContactFinanceListViewPR;
            }());
            return "SiebelAppFacade.SCContactFinanceListViewPR";
        })
}
