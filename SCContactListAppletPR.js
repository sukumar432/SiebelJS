/*********************************************************************************************************
Purpose: Added this following code for Contact Search in OpenUI
Author: Siva ADDALA (SADDALA) : Created on 10 OCT 2017.
**********************************************************************************************************/
if (typeof(SiebelAppFacade.SCContactListAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.SCContactListAppletPR");
    define("siebel/custom/SelectComfort/SCContactListAppletPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/bootstrap.min", "siebel/custom/SelectComfort/jquery.validate.min", "siebel/custom/SelectComfort/SC_OUI_Definitions", "siebel/custom/SelectComfort/SC_OUI_Methods", "siebel/custom/SelectComfort/SC_OUI_Markups", "siebel/custom/SelectComfort/SCContactSearchMarkup", "siebel/custom/SelectComfort/SCCreateContactMarkup", "siebel/custom/SelectComfort/SCCreateContactFunctionality", "siebel/custom/SelectComfort/SCErrorCodes"],
        function() {
            SiebelAppFacade.SCContactListAppletPR = (function() {

                var pm = "",
                    appletId = "",
                    appletSeq = "",
                    recordSet = "",
                    FieldQueryPair = "",
                    options = "",
                    i = 0,
                    ActiveView = "",
                    a = true,
                    b = true,
                    c = true,
                    d = true,
                    e = true,
                    f = true,
                    g = "",
                    ca = true;
					cc = true;
                var responsibility = "",
                    currentValue = "",
                    searchCount = 3,
                    refsearchCount = 2,
                    storeNumber = "",
                    StoreLocation = "",
                    recentRecords, iFitRecentRecords, rescentRecordsMarkup = "",
                    refsearchfields = "";
                var LoginId = "",
                    next = 2,
                    refnext = 1,
                    currentValue = "",
                    csearchfields, selectedFieldId = "",
                    recentPM, recentRecId, recentRecSeq, refby = "N",
                    sc_reffid = "",
                    selected_RefConId = "",
                    RefById = "",
                    selected_RefConIndex = "";
                var sFields = ['Email Address','Phone Number', 'Customer Number'];
                var ifitrecentPM, ifitrecentRecId, ifitrecentRecSeq;
                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
                var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
                var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
                var ContactSearchMarkup = SiebelJS.Dependency("SiebelApp.SCContactSearchMarkup");
                var CreateNewCon = SiebelJS.Dependency("SiebelApp.SCCreateContactMarkup");
                var ContactCreatefn = SiebelJS.Dependency("SiebelAppFacade.SCCreateContactFunctionality");
                var ErrorCodesfn = SiebelJS.Dependency("SiebelApp.SCErrorCodes");
                var toolbarflag = "N";

                var InPS = SiebelApp.S_App.NewPropertySet();
                var OutPS = SiebelApp.S_App.NewPropertySet();
                var SearchFields;

                function SCContactListAppletPR(pm) {
                    SiebelAppFacade.SCContactListAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCContactListAppletPR, SiebelAppFacade.JQGridRenderer);

                SCContactListAppletPR.prototype.Init = function() {
                    SiebelAppFacade.SCContactListAppletPR.superclass.Init.apply(this, arguments);
                    localStorage.setItem('whitescreen', 0);
                    SearchFields = localStorage.getItem("SearchFields");
                    //SCOUIMethods.SCGetProfileAttr("Primary responsibility Name,SC Store Number,Login Name,SC Store User,SC Primary Division Type,DISALocFound,Last Name,First Name");
                    localStorage.setItem("SearchFields", "");
                    // Hiding navigation tabs
                    $("#_swescrnbar").hide();
                    $("#_swethreadbar").hide();
                    $("#_sweappmenu").hide();
                    $("#s_vctrl_div").hide();
                    $(".siebui-button-toolbar").hide();
                    $("#_sweview").hide();
                    $(".siebui-button-toolbar").hide();
                    //$("#_swecontent").css("height","99%");
                    $('#_sweview').css("overflow", "auto");
                    $("#CommunicationPanelContainer").css("cssText", "padding-top: 127px !important;");
                    //local storage is for pagination
                    localStorage.setItem('Records', 0);
                    ca = true;
                    refby = "N";
                    var DeviceType = theApplication().GetProfileAttr('Device_Type');
                    var PlatformName = theApplication().GetProfileAttr('Platform Name');
                    //local storage for searchfields count
                    if (localStorage.getItem("SearchCount") == undefined || localStorage.getItem("SearchCount") == null || localStorage.getItem("SearchCount") == 0) {
                        localStorage.setItem('SearchCount', 3);
                    } else {
                        searchCount = localStorage.getItem('SearchCount');
                    }

                    //local storage for searchfields count
                    if (localStorage.getItem("refsearchCount") == undefined || localStorage.getItem("refsearchCount") == null || localStorage.getItem("refsearchCount") == 0) {
                        localStorage.setItem('refsearchCount', 2);
                    } else {
                        refsearchCount = localStorage.getItem('refsearchCount');
                    }
                    pm = this.GetPM();
                    recentPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Recent Record List Applet"].GetPModel().GetRenderer().GetPM();
                    recentRecId = recentPM.Get("GetFullId");
                    recentRecSeq = recentRecId[recentRecId.length - 1];
                    var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                    var scStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    if (scPrimaryDivType != "STORE" && scPrimaryDivType != "SHOW" && scPrimaryDivType != "") {
                        ifitrecentRecId = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC iFit Contact List Applet"].GetFullId();
                        ifitrecentRecId = recentPM.Get("GetFullId");
                        ifitrecentRecSeq = ifitrecentRecId[ifitrecentRecId.length - 1];
                    } else if (scPrimaryDivType != "") {
                        ifitrecentRecId = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetFullId();
                        ifitrecentRecId = recentPM.Get("GetFullId");
                        ifitrecentRecSeq = ifitrecentRecId[ifitrecentRecId.length - 1];
                    } else {
                        // do nothing
                    }

                    responsibility = SCOUIMethods.SCGetProfileAttrValue("Primary responsibility Name");
                    storeNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    LoginId = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                }

                SCContactListAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.SCContactListAppletPR.superclass.ShowUI.apply(this, arguments);
                    $(".whitescreentimer").remove();
                    $("#custommaskoverlay").hide();
                    $("#_sweview").show();
                    //hiding tool tip.
                    $('div[title="All Contacts"]').attr("title", "");
                    $('div[title="My Contacts"]').attr("title", "");
                    $('div[title="My Team' + "'" + 's Contacts"]').attr("title", "");
                    //Refresh Recent Records
                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].InvokeMethod("RefreshRecentRecord");
                    appletId = pm.Get("GetFullId");
                    appletSeq = appletId[appletId.length - 1];
                    recordSet = pm.Get("GetRecordSet");
                    //getting contact Main skeleton Markup
                    var mainmarkup = ContactSearchMarkup.SCContactMarkup();

                    //getting header markup
                    $('#s_' + appletId + '_div').hide();
                    $('#' + appletId).append(mainmarkup);

                    g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC SHM Contact LOY Member List Applet OUI"].GetPModel().Get("GetFullId");
                    $("#" + g).hide();
                    g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC LOY Member Vouchers List Applet OUI"].GetPModel().Get("GetFullId");
                    $("#" + g).hide();
                    //$("#S_A3").hide();		
                    //$("#S_A1").hide();
                    g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC LOY Member List Applet"].GetPModel().Get("GetFullId");
                    $("#" + g).hide();
                    g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Recent Record List Applet"].GetPModel().Get("GetFullId");
                    $("#" + g).hide();
                    var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                    var scStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    if (scPrimaryDivType != "STORE" && scPrimaryDivType != "SHOW" && scPrimaryDivType != "") {
                        g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC iFit Contact List Applet"].GetPModel().Get("GetFullId");
                        $("#" + g).hide();
                    } else if(scPrimaryDivType != "") {
                        g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetPModel().Get("GetFullId");
                        $("#" + g).hide();
                    }else{
						g = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetPModel().Get("GetFullId");
                        $("#" + g).hide();
					}
                    var StoreUser = SCOUIMethods.SCGetProfileAttrValue('SC Store User');
                    var lastName = SCOUIMethods.SCGetProfileAttrValue('Last Name');
                    var firstName = SCOUIMethods.SCGetProfileAttrValue('First Name');
                    var loginName = SCOUIMethods.SCGetProfileAttrValue('Login Name');
                    var divsubtype = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Sub Type');
                    var headermarkup = SCOUIMarkups.Header_block("Contacts", StoreUser, lastName, firstName, loginName, divsubtype);
					
                    //getting strore change markup
                    var storechangemarkup = SCOUIMarkups.StoreChange();

                    //Adding CustomerMarkup 
                    customtimermarkup = SCOUIMarkups.CustomTimer();
                    $('#applet1').append(customtimermarkup);

                    $('.nav-header').html(headermarkup);
					//NTHARRE:02JUL2021:To hide the functionality for store users based on lov - SFSTRY0001090
					var searchExpr = "[Type] = 'SC_IS_STORE_LEAD' AND [Active] = 'Y'";
				 	var sortSpec = "Order By";
					var StoreLead = SCOUIMethods.SCGetOrderLoVs(searchExpr);
					if(StoreUser == "Y" && StoreLead =="No"){
						$("#SC-add-contact-btn").hide();
					}
                    $('#SC-add-storelocation').html(storechangemarkup);

                    //SNARRA:Added CTI Toolbar Issue 
                    if ($("#CommunicationPanelContainer").is(":visible") && (localStorage.getItem('CTIToolbar') == "Y")) {
                        $(".SC-data-container").css("position", "inherit");
                        $("#sc-orange").show();
                        $("#sc-white").hide();
                    }
                    if ($("#CommunicationPanelContainer").is(":visible")) {
                        $("#sc-orange").show();
                        $("#sc-white").hide();
                    }
                    /*[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
                    	  img.setAttribute('src', img.getAttribute('data-src'));
                    	  img.onload = function() {
                    		img.removeAttribute('data-src');
                    	  };
                    	});*/
                    //on button click of Home
                    $("#SC_HOME").click(function() {
                        localStorage.setItem('SearchCount', 3);
                        localStorage.setItem('Next', 2);
                        sFields = ['Email Address','Phone Number', 'Customer Number'];
                        localStorage.setItem('whitescreen', 1);
                        var storeUser = SCOUIMethods.SCGetProfileAttrValue("SC Store User");
                        if (storeUser == "Y")
                            SiebelApp.S_App.GotoView("User Profile Default View");
                        else
                            SiebelApp.S_App.GotoView("Home Page View (WCC)");
                    });

                    //on button click of Accounts
                    $("#SC_ACCOUNTS").click(function() {
                        localStorage.setItem('SearchCount', 3);
                        localStorage.setItem('Next', 2);
                        sFields = ['Postal Code', 'Phone Number', 'Last Name'];
                        SiebelApp.S_App.GotoView("SC All Accounts List View OUI", "", "", "");
                    });

                    //on button click of SaleOrders
                    $("#SC_SALESORDERS").click(function() {
                        localStorage.setItem('SearchCount', 3);
                        localStorage.setItem('Next', 2);
                        sFields = ['Email Address','Phone Number', 'Customer Number'];
                        SiebelApp.S_App.GotoView("SC Sales Order Search View OUI", "", "", "");
                    });

                    //on button click of contact
                    $("#SC_CONTACTS").click(function() {
                        //RCHATHAR: For Defect number 862
                        localStorage.setItem('SearchCount', 3);
                        localStorage.setItem('Next', 2);
                        sFields = ['Email Address','Phone Number', 'Customer Number'];
                        SiebelApp.S_App.GotoView("SC Contact List View OUI", "", "", "");
                    });
                    //SBOORLA:on click of open Regiser Button
                    $("#sc-cash-draw").click(function() {
                        SCOUIMethods.OpenCashDrawer();
                    });
                    // loading waiting time
                    $(document).ready(function() {
                        $("body").bind('Custom.Start', function(ev) {
                            $('#maskoverlay').show();
                        });

                        $("body").bind('Custom.End', function(ev) {
                            $('#maskoverlay').hide();
                        });
                    });

                    //Examples for getting values from definitions
                    //sushma modified for SCTASK0028074
                    csearchfields = SCOUIDefinitions.contactnewsearchfields();
                    refsearchfields = SCOUIDefinitions.referralcontactsearchfields();
                    if (SearchFields == undefined || SearchFields == null || SearchFields.length == 0) {
                        sFields = ['Email Address','Phone Number', 'Customer Number'];
                        next = 2;
                    } else {
                        sFields = localStorage.getItem('sFields');
                        sFields = sFields.split(",");
                        next = parseInt(localStorage.getItem('Next'));
                    }

                    //Contact Search Markup Starts Here
                    var markup = "";
                    markup += '     <div class="container SC-search-container row">';
                    markup += '                 <div class="col-lg-2 col-md-2 no-padding">';
                    markup += '                     <p class="SC-search-title margin-top">Search Contacts</p>';
                    markup += '                 </div>';
                    markup += '                 <div class="col-lg-8 col-md-10">';

                    markup += '                 </div>';
                    markup += '                  <div class="col-lg-2 col-md-2 no-padding sc-set-at-bottom">';
                    markup += '                     <div>';
                    markup += '                         <button class="SC-search-button SC-disabled" id="sc-search">Search</button>';
                    markup += '                     </div>';
                    markup += '                 </div>';
                    markup += '            </div>';
                    markup += '                <div class="container SC-search-container row no-padding">';
                    markup += '                    <div class="col-lg-12 col-md-12" id="searchfields">';
                    if (SearchFields == undefined || SearchFields == null || SearchFields.length == 0) {
                        markup += '                        <form name="search" id="sn-search-fields">';
                        markup += '                            <div id="field">';
                        markup += '                                <select class="select-box con-select-box margin-top " id="field0" name="prof1" style="width:14% !important">';
                        for (i = 0; i < csearchfields.length; i++) {
                            if (i == 0) {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '" selected="selected">' + csearchfields[i] + '</option>';
                            } else {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '">' + csearchfields[i] + '</option>';
                            }
                        }
                        markup += '                                </select>';
                        markup += '                                <input type="text" tabindex="1" id="ifield0" class="search-box con-search-box margin-top" autocomplete="off" style="width:10% !important">';
                        markup += '                                <div id="b1" class="add-more margin-top" style="width:3% !important"></div>';
                        markup += '                            </div>';
                        markup += '                            <div id="field">';
                        markup += '                                <select class="select-box con-select-box margin-top" id="field1" name="prof1" style="width:15% !important">';
                        for (i = 0; i < csearchfields.length; i++) {
                            if (i == 1) {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '" selected="selected">' + csearchfields[i] + '</option>';
                            } else {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '">' + csearchfields[i] + '</option>';
                            }
                        }
                        markup += '                                </select>';
                        markup += '                                <input type="text" tabindex="2" id="ifield1" class="search-box con-search-box margin-top" autocomplete="off" style="width:10% !important">';
                        markup += '                                <div id="b1" class="add-more margin-top add-box" style="width:3% !important"></div>';
                        markup += '                            </div>';
                        //sushma Added for SCTASK0028074
                        markup += '                            <div id="field">';
                        markup += '                                <select class="select-box con-select-box margin-top" id="field2" name="prof1" style="width:17% !important">';
                        for (i = 0; i < csearchfields.length; i++) {
                            if (i == 2) {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '" selected="selected">' + csearchfields[i] + '</option>';
                            } else {
                                markup += '                                    <option id="' + csearchfields[i] + '" value="' + csearchfields[i] + '">' + csearchfields[i] + '</option>';
                            }
                        }
                        markup += '                                </select>';
                        markup += '                                <input type="text" tabindex="3" id="ifield2" class="search-box con-search-box margin-top" autocomplete="off" style="width:10% !important">';
                        markup += '                                <div id="b1" class="add-more margin-top add-box" style="width:3% !important"> <span class="glyphicon glyphicon-plus-sign icon-img add-item" style="display:none"></span></div>';
                        markup += '                            </div>';
                        markup += '                        </form>';
                    } else {
                        markup += SearchFields;
                    }
                    markup += '                    </div>';
                    markup += '                </div>';
                    markup += '                <p class="clearfix"></p>';
                    markup += '                <p class="clearfix no-margin"></p>';
                    markup += '                <div class="container SC-tabs-container">';
                    markup += '                    <ul class="nav nav-pills nav-justified">';
                    view = SiebelApp.S_App.GetActiveView().GetName();

                    if (view == "SC Contact List View OUI") { //all contacts
                        markup += '						<li id="all_contacts"><a href="javascript:void(0)" class="active">All Contacts<img src="images/custom/call-list.png" id="SC_AllContacts_export" class="call-list-icon"></a></li>';;
                        markup += '						<li id="my_contacts"><a href="javascript:void(0)">My Contacts</a></li>';
                        markup += '						<li id="My_teams_contacts"><a href="javascript:void(0)" class="no-margin">My Team\'s Contacts</a></li>';
                    } else if (view == "SC Manager's Contact List View OUI") { //teams	contacts
                        markup += '						<li id="all_contacts"><a href="javascript:void(0)">All Contacts</a></li>';
                        markup += '						<li id="my_contacts"><a href="javascript:void(0)">My Contacts</a></li>';
                        markup += '						<li id="My_teams_contacts"><a href="javascript:void(0)" class="no-margin active">My Team\'s Contacts<img src="images/custom/call-list.png" id="SC_MyTeamContacts_export" class="call-list-icon"></a></li>';
                    } else if (view == "SC Visible Contact List View OUI") { //my contacts
                        markup += '						<li id="all_contacts"><a href="javascript:void(0)">All Contacts</a></li>';
                        markup += '						<li id="my_contacts"><a href="javascript:void(0)" class="active">My Contacts<img src="images/custom/call-list.png" id="SC_myContacts_export" class="call-list-icon"></a></li>';
                        markup += '						<li id="My_teams_contacts"><a href="javascript:void(0)" class="no-margin">My Team\'s Contacts</a></li>';
                    }
                    markup += '                    </ul>';
                    markup += '                </div>';
                    markup += '                <p class="clearfix no-margin"></p>';
                    markup += '                <div class="container data-table-container SC-table-main">';
                    markup += '                    <div class="SC-table-with-scroll-main">';
                    markup += '                        <table class="SC-table" id="SC-table-contact-search">';
                    markup += '                        </table>';
                    markup += '                    </div>';
                    markup += '                </div>';
                    markup += '                <div class="container">';
                    markup += '                    <div class="pagination sc-pagination pull-right" id="SC-CON-Pagination">';
                    markup += '                    </div>';
                    markup += '                </div>';

                    //$('#S_A2').hide();
                    //$('#S_A4').hide();
                    $('#s_' + appletId + '_div').hide();
                    $('#s_S_A1_div').css({
                        position: 'absolute',
                        left: '-1500px'
                    });
                    $('.SC-data-container').append(markup);

                    // hiding the dropdown values
                    $(".con-select-box").each(function() {
                        var value = $(this).val();
                        for (var i = 0; i < sFields.length; i++) {
                            if (value != sFields[i]) {
                                $("#" + $(this).attr("id") + " option[value='" + sFields[i] + "']").wrap("<span>");
                            }
                        }
                        $("#" + $(this).attr("id") + " option[value='" + value + "']").attr('selected', 'selected');
                    });

                    // enabling search box
                    $(".con-search-box").each(function() {
                        if ($(this).val().length != 0 && $(this).val() != "*") {
                            $("#sc-search").removeClass('SC-disabled');
                            return false;
                        } else {
                            $("#sc-search").addClass('SC-disabled');
                        }
                    });

                    // enabling search box
                    //$(".sc-referred-search-box").each(function(){


                    //attaching markup to UI
                    markup = SCTable(pm, recordSet);
                    $('#SC-table-contact-search').html(markup);
                    //SCHERKU: For adding date of first activity field in contact search
                    //Start:Get the order date selected drop down id
                    var dateInptId = "";
                    $(".con-search-box").each(function() {
                        var dateid = $(this).attr("id");
                        if ($("#i" + dateid + " option:selected").text() == "Date Of First Activity")
                            dateInptId = dateid;
                    });
                    //End:Get the order date selected drop down id
                    //Start:Get the order date selected drop down id
                    var dateInptId = "";
                    $(".sc-referred-search-box").each(function() {
                        var dateid = $(this).attr("id");
                        if ($("#i" + dateid + " option:selected").text() == "Date Of First Activity")
                            dateInptId = dateid;
                    });
                    //End:Get the order date selected drop down id
                    //Start:Appending DatePicker For Order Date 
                    $("#i" + dateInptId).datepicker({
                        onSelect: function() {
                            $(".con-search-box").trigger("keyup");
                        },
                        showButtonPanel: true
                    });
                    $("#ui-datepicker-div").focus(function() {
                        $("#i" + dateInptId).datepicker("hide");
                    });
                    //End:Appending DatePicker For Order Date 
                    //Start:on focus out hiding the datepicker
                    $("#i" + dateInptId).focusout(function() {
                        if ($("#i" + dateInptId).hasClass("hasDatepicker"))
                            $("#i" + dateInptId).datepicker("hide");
                    });
                    //End:on focus out hiding the datepicker
                    //local storage
                    /*if(localStorage.getItem('Next')==null||localStorage.getItem('Next')==undefined||localStorage.getItem('Next')==1){
                    	next = 1;
                    }else{
                    	next = localStorage.getItem('Next');
                    }*/

                    //adding search fields onclick of +
                    $(".icon-img").click(function(e) {
                        if (searchCount <= csearchfields.length - 1) {
                            e.preventDefault();
                            next = parseInt(next);
                            var addto = "#ifield" + next;
                            var addRemove = "#ifield" + (next);
                            //SCHERKU: For date of first activity
                            var Orderdate = "N";
                            next = parseInt(next) + 1;
                            var newIn = '<select class="select-box con-select-box margin-top" id="field' + next + '" name="field' + next + '" style="width:14% !important">';
                            for (i = 0; i < csearchfields.length; i++) {
                                newIn += '<option value="' + csearchfields[i] + '">' + csearchfields[i] + '</option>';
                            }

                            newIn += '</select><input type="text" tabindex="' + (next + 1) + '" id="ifield' + next + '" class="search-box con-search-box margin-top" autocomplete="off" style="width:10% !important">';
                            var newInput = $(newIn);

                            var removeBtn = '<div id="remove' + (next - 1) + '" class="remove-me con-remove-me margin-top" style="width:3% !important"> <span id="removeicon" class="glyphicon glyphicon-minus-sign icon-img-remove"></span></div>';
                            var removeButton = $(removeBtn);
                            $(addto).after(newInput);
                            $(addRemove).after(removeButton);

                            for (var j = 0; j < sFields.length; j++) {
                                $("#field" + next + " option[value='" + sFields[j] + "']").wrap("<span>");
                            }

                            var e = document.getElementById("field" + next);
                            var seletedvalue = e.options[e.selectedIndex].value;
                            $("#field" + next + " option[value='" + seletedvalue + "']").attr('selected', 'selected');
                            //SCHERKU: For date of first activity
                            if (seletedvalue == "Date Of First Activity") {
                                Orderdate = 'Y';

                            }
                            $(".con-select-box").each(function() {
                                $(this).attr("id"); //this.id
                                if ($(this).attr("id") != "field" + next) {
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                }
                            });

                            sFields.push(seletedvalue);
                            //SCHERKU: For date of first activity
                            if (Orderdate == 'Y') {
                                //dateInptId="#ifield" + next;
                                $("#ifield" + next).datepicker({
                                    onSelect: function() {
                                        $(".con-search-box").trigger("keyup");

                                    },
                                    showButtonPanel: true
                                });
                            }
                            $(".add-item").hide();
                            $("#pfield" + next - 1).attr('data-source', $(addto).attr('data-source'));
                            $("#count").val(next);
                            searchfields();
                            searchCount++;
                            localStorage.setItem('SearchCount', searchCount);
                            localStorage.setItem('Next', next);
                            localStorage.setItem('sFields', sFields);
                        }
                    });

                    //adding search fields onclick of +
                    //$(".ref-icon-img").click(function(e) {
                    $(document).on('click', '.ref-icon-img', function(e) {
                        if (refsearchCount <= refsearchfields.length - 1) {
                            e.preventDefault();
                            refnext = parseInt(refnext);
                            var addto = "#rcfield" + refnext;
                            var addRemove = "#rcfield" + (refnext);
                            //SCHERKU: For date of first activity
                            var refOrderdate = "N";
                            refnext = parseInt(refnext) + 1;
                            var newIn = '<select class="select-box margin-top sc-select-box" id="cfield' + refnext + '" name="field' + refnext + '">';
                            for (i = 0; i < refsearchfields.length; i++) {
                                newIn += '<option value="' + refsearchfields[i] + '">' + refsearchfields[i] + '</option>';
                            }

                            newIn += '</select><input type="text" tabindex="' + (refnext + 1) + '" id="rcfield' + refnext + '" class="search-box sc-referred-search-box margin-top" autocomplete="off">';
                            var newInput = $(newIn);

                            var removeBtn = '<div id="remove' + (refnext - 1) + '" class="remove-me referred-remove-me margin-top"> <span id="referredremoveicon" class="glyphicon glyphicon-minus-sign icon-img-remove"></span></div>';
                            var removeButton = $(removeBtn);
                            $(addto).after(newInput);
                            $(addRemove).after(removeButton);

                            for (var j = 0; j < sFields.length; j++) {
                                $("#cfield" + refnext + " option[value='" + sFields[j] + "']").wrap("<span>");
                            }

                            var e = document.getElementById("cfield" + refnext);
                            var seletedvalue = e.options[e.selectedIndex].value;
                            $("#cfield" + refnext + " option[value='" + seletedvalue + "']").attr('selected', 'selected');
                            //SCHERKU: For date of first activity
                            if (seletedvalue == "Date Of First Activity") {
                                refOrderdate = 'Y';

                            }
                            $(".sc-select-box").each(function() {
                                $(this).attr("id"); //this.id
                                if ($(this).attr("id") != "cfield" + refnext) {
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                }
                            });

                            sFields.push(seletedvalue);
                            //SCHERKU: For date of first activity
                            if (refOrderdate == 'Y') {
                                //dateInptId="#ifield" + next;
                                $("#rcfield" + refnext).datepicker({
                                    onSelect: function() {
                                        $(".sc-referred-search-box").trigger("keyup");

                                    },
                                    showButtonPanel: true
                                });
                            }
                            $(".ref-icon-img").hide();
                            $("#rcfield" + refnext - 1).attr('data-source', $(addto).attr('data-source'));
                            $("#count").val(refnext);
                            searchfields();
                            refsearchCount++;

                        }
                    });

                    // Removing the search fields onclik of - icon
                    $(document).on('click', '.referred-remove-me', function(e) {
                        e.preventDefault();
                        var idString = this.id.toString();

                        var fieldNum = idString.substring(6, idString.length);
                        var fieldID = "#cfield" + fieldNum;
                        var rfieldID = "#rcfield" + fieldNum;

                        var e = document.getElementById("cfield" + fieldNum);
                        var seletedvalue = e.options[e.selectedIndex].value;
                        $(".sc-select-box").each(function() {
                            if ($(this).attr("id") != "cfield" + parseInt(fieldNum)) {
                                if ($("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").parent().is("span")) {
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").unwrap();
                                }
                            }
                        });

                        var sIndex = sFields.indexOf(seletedvalue);
                        sFields.splice(sIndex, 1);
                        $(this).remove();
                        $(fieldID).remove();
                        $(rfieldID).remove();
                        searchfields();

                        refsearchCount--;
                    });

                    // Removing the search fields onclik of - icon
                    $(document).on('click', '.con-remove-me', function(e) {
                        e.preventDefault();
                        var idString = this.id.toString();

                        var fieldNum = idString.substring(6, idString.length);
                        var fieldID = "#field" + fieldNum;
                        var ifieldID = "#ifield" + fieldNum;

                        var e = document.getElementById("field" + fieldNum);
                        var seletedvalue = e.options[e.selectedIndex].value;
                        $(".con-select-box").each(function() {
                            if ($(this).attr("id") != "field" + parseInt(fieldNum)) {
                                if ($("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").parent().is("span")) {
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").unwrap();
                                }
                            }
                        });

                        var sIndex = sFields.indexOf(seletedvalue);
                        sFields.splice(sIndex, 1);
                        $(this).remove();
                        $(fieldID).remove();
                        $(ifieldID).remove();
                        searchfields();

                        searchCount--;
                        localStorage.setItem('SearchCount', searchCount);
                        localStorage.setItem('Next', next);
                        localStorage.setItem('sFields', sFields);
                    });

                    //on click of search functionality
                    $("#sc-search").click(function(e) {
                        e.stopImmediatePropagation();
                        refby = "N";
                        searchContact(refby);
                    });

                    //on click of search functionality
                    //$("#sc-referredby-con-search").click(function(e) {
                    $(document).on('click', '#sc-referredby-con-search', function(e) {
                        e.stopImmediatePropagation();
                        refby = "Y";
                        searchContact(refby);
                    });


                    //for changing the colour of tabs selected
                    $(".nav-justified a").on('click', function() {
                        $(".nav-justified a").removeClass('active');
                        $(this).addClass('active');
                    });

                    // Go to All Contacts view
                    $("#all_contacts").click(function() {
                        storesearchfields();
                        SiebelApp.S_App.GotoView("SC Contact List View OUI", "", "", "");
                    });

                    // Go to My Contacts view
                    $("#my_contacts").click(function() {
                        storesearchfields();
                        SiebelApp.S_App.GotoView("SC Visible Contact List View OUI", "", "", "");
                    });

                    // Go to My team's Contacts view
                    $("#My_teams_contacts").click(function() {
                        storesearchfields();
                        SiebelApp.S_App.GotoView("SC Manager's Contact List View OUI", "", "", "");
                    });


                    $(document).ready(function() {
                        $('#selectMe').change(function() {
                            $('.group').hide();
                            $('#' + $(this).val()).show();
                        })
                    });

                    //for selecting row colour on table
                    $('.SC-table-body div').on('click', function() {
                        $('.SC-table-body div').removeClass('SC-selected-row');
                        $(this).addClass('SC-selected-row');
                    });

                    // SC-Profile toggle
                    $("#SC-profile").click(function() {
                        //navigation to store report
                        var customerName = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                        var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        if ((customerType == 'STORE' || customerType == 'SHOW') && customerName != "") {
                            /* $(document).on('click', '#storereport', function(){
                            SCOUIMarkups.StoreNavigation();
                            }); */
                            $("#storereport").show();
                        } else {
                            $("#storereport").hide();
                        }
                        $(".SC-Profile-container").toggle();
                    });

                    //on click of logout
                    $("#logout").click(function() {
                        SiebelApp.S_App.LogOff();
                    });
                    //SPATIBAN:MAY 2019 Release:Added code for on click of store closure report button
                    $("#storereport").click(function() {
                        SiebelApp.S_App.GotoView("SC Store Report View", "", "", "");
                    });
                    //Add store Location modal open
                    $("#SC-add-store-location").click(function() {
                        $("#SC-add-storelocation").modal({
                            backdrop: 'static'
                        });
                        if (StoreLocation !== "") {
                            document.getElementById('StoreTitle').innerHTML = StoreLocation;
                            $("#StoreTitle").attr("title", StoreLocation);
                        } else {
                            document.getElementById('StoreTitle').innerHTML = "Add Store Location";
                        }
                    });

                    // on click of the enter in contact search
                    //$(".con-search-box").keyup(function(event) {
                    $(document).on('keyup', '.con-search-box', function(event) {
                        if (event.keyCode === 13) {
                            if (!$("#sc-search").hasClass("SC-disabled")) {
                                refby = "N";
                                searchContact(refby);
                            }
                        }
                    });

                    // on click of the enter in referred contact search
                    //$(".sc-referred-search-box").keyup(function(event) {
                    $(document).on('keyup', '.sc-referred-search-box', function(event) {
                        if (event.keyCode === 13) {
                            if (!$("#sc-referredby-con-search").hasClass("SC-disabled")) {
                                refby = "Y";
                                searchContact(refby);
                            }
                        }
                    });

                    //on click of enter on store search
                    $("#SC-Store-Search").keyup(function(event) {
                        if (event.keyCode === 13) {
                            var value = document.getElementById('SC-Store-Search').value;
                            markup = SCOUIMarkups.StoreChange2(value);
                            $("#SC-storelocation").html(markup);
                        }
                    });


                    //to clear the search fields
                    $(document).on('click', '', function(event) {
                        if ($(event.target).parents('#applet1').length == 0 && event.target.id != "removeicon") {
                            SiebelJS.Log("Reseting Local Storage variables");
                            localStorage.setItem('SearchCount', 3);
                            localStorage.setItem('Next', 2);
                            sFields = ['Email Address','Phone Number', 'Customer Number'];
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
                            SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
                            //StoreLocation = SCOUIMethods.StoreName(LoginId);
                            StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
							
                            if (StoreLocation != "") {
                                document.getElementById('storename').innerHTML = selectstoreid.substring(0, 10);
                                $("#SC-add-store-location").attr("title", "Change Store");
                                $("#storename").attr("title", selectstoreid);
                                $("#StoreTitle").attr("title", selectstoreid);
                                StoreLocation = selectstoreid;								
                                $("#storereport").show();
								//PJAYASHA: Added to check stroe and set feature flag
								var inPS = SiebelApp.S_App.NewPropertySet();
								var outPS = SiebelApp.S_App.NewPropertySet();
								var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
								var StoreId = SCOUIMethods.SCGetProfileAttrValue("SC Store Number") ;//Pavithra: added to check for feature flag on changed store
					            inPS.SetProperty('StoreId',StoreId);
					            if(Bservice)
								{
								 outPS = Bservice.InvokeMethod("ValidateFeatureFlag", inPS);
								 var sFeatureFlag = outPS.GetChild(0).GetProperty('FeatureFlag');
								     
										var sBservice = SiebelApp.S_App.GetService("SessionAccessService");
										var sinPS = SiebelApp.S_App.NewPropertySet();
										var soutPS = SiebelApp.S_App.NewPropertySet();
										sinPS.SetProperty('Name','FeatureFlag');
										sinPS.SetProperty('Value',sFeatureFlag);
										if(sBservice)
											{
												soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
											}
										sinPS.Reset();	
										sinPS.SetProperty('Name','P2PEFlag');
										sinPS.SetProperty('Value',sFeatureFlag);
										if(sBservice)
											{
												soutPS = sBservice.InvokeMethod("SetProfileAttr", sinPS);
											}
												
									 
								} //PJAYASHA: Added to check stroe and set feature flag
                            } else {
                                $("#SC-add-store-location").attr("title", "Add Store");
                                $("#StoreTitle").text('Add Store Location');
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
                    // Getting Store location
                    //StoreLocation = SCOUIMethods.StoreName(LoginId);
                    StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                    if (StoreLocation != "") {
                        document.getElementById('storename').innerHTML = StoreLocation.substring(0, 10);
                        $("#SC-add-store-location").attr("title", "Change Store Location");
                        $("#storename").attr("title", StoreLocation);
                    } else {
                        $("#SC-add-store-location").attr("title", "Add Store Location");
                    }
                    //SPATIBAN:added code for update the user location with DISA Location
                    var scdisaloc = "";
                    scdisaloc = SCOUIMethods.SCGetProfileAttrValue("DISALocFound");
                    if (scdisaloc == "Y") {
                        $("#SC-add-store-location").addClass("SC-readonly");
                    }
                    // pagination
                    //SCOUIMethods.PrimaryButton(pm,"SC-CON-Pagination");


                    //Below code is to sort the fields
                    $(document).on("click", ".sort-by", function() {
                        $("body").trigger('Custom.Start');
                        var sortField;
                        var sortOrder;
                        if ($(this).attr('id') == "sortlastname") {
                            if (a == true) {
                                sortField = "Last Name";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                a = false;
                            } else {
                                sortField = "Last Name";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                a = true;
                            }
                        } else if ($(this).attr('id') == "sortfirsttname") {
                            if (b == true) {
                                sortField = "First Name";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                b = false;
                            } else {
                                sortField = "First Name";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                b = true;
                            }
                        } else if ($(this).attr('id') == "sortaddress") {
                            if (c == true) {
                                sortField = "Personal Street Address";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                c = false;
                            } else {
                                sortField = "Personal Street Address";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                c = true;
                            }
                        } else if ($(this).attr('id') == "sortcity") {
                            if (d == true) {
                                sortField = "Personal City";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                d = false;
                            } else {
                                sortField = "Personal City";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                d = true;
                            }
                        } else if ($(this).attr('id') == "sortstate") {
                            if (e == true) {
                                sortField = "State";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                e = false;
                            } else {
                                sortField = "State";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                e = true;
                            }
                        } else if ($(this).attr('id') == "sortzip") {
                            if (f == true) {
                                sortField = "Personal Postal Code";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                f = false;
                            } else {
                                sortField = "Personal Postal Code";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                f = true;
                            }
                        }
                        //SPATIBAN:24-SEP-2019:Added below code for #ENHC0010372   
                        else if ($(this).attr('id') == "sortcustomerNumber") {
                            if (ca == true) {
                                sortField = "Customer Number";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                ca = false;
                            } else {
                                sortField = "Customer Number";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                ca = true;
                            }
                        }else if($(this).attr('id') == "customercat"){
							if (cc == true) {
                                sortField = "SC Customer Category";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                cc = false;
                            } else {
                                sortField = "SC Customer Category";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                cc = true;
                            }
						} else {
                            SiebelJS.Log("Not Sorted");
                        }

                    });

                    // nullifying Store markup
                    $(".SC-close-popup").click(function() {
                        $("#SC-Store-Search").val('');
                        $("#SC-storelocation").html("");
                    });

                    //navigation to store report

                    /*var customerType = SiebelApp.S_App.GetProfileAttr('SC Primary Division Type');
                    
                    if (customerType == 'STORE' || customerType == 'SHOW') {
                    	//$(document).on('click', '#storereport', function(){
                    		$("#storereport").click(function() {
                    		SCOUIMarkups.StoreNavigation();
                    	});
                    }
                    else{
                    	$("#storereport").hide();
                    }*/

                    // Recent Records
                    recentRecords = recentPM.Get("GetRecordSet");
                    rescentRecordsMarkup = SCOUIMarkups.ContactRecentRecords_block(recentRecords);
                    $("#recents-header").html(rescentRecordsMarkup);

                } //showui close

                // to show data in contacts table
                function SCTable(pm, recordSet) {
                    //SPATIBAN:24-SEP-2019:Updated below code for #ENHC0010372    
                    var sctablemarkup = "";
                    if (recordSet.length > 0) {
                        sctablemarkup += '                            <thead>';
                        sctablemarkup += '                                <tr>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortcustomerNumber">CUSTOMER NUMBER</th>';
						sctablemarkup += '                                    <th class="sort-by" id="customercat">CUSTOMER CATEGORY</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortlastname">LAST NAME</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortfirsttname">FIRST NAME</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortaddress">ADDRESS</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortcity">CITY</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortstate">STATE</th>';
                        sctablemarkup += '                                    <th class="sort-by" id="sortzip">Postal CODE</th>';
                        sctablemarkup += '                                </tr>';
                        sctablemarkup += '                            </thead>';
                        sctablemarkup += '                            <tbody>';
                        for (i = 0; i < recordSet.length; i++) {
                            sctablemarkup += '                                <tr id="row' + (i + 1) + '">';
                            sctablemarkup += '                                    <td title="' + recordSet[i]["Person UId"] + '">' + recordSet[i]["Person UId"] + '</td>';
							sctablemarkup += '                                    <td title="' + recordSet[i]["SN Customer Category Calc"] + '">' + recordSet[i]["SN Customer Category Calc"] + '</td>';
                            sctablemarkup += '                                    <td title="' + recordSet[i]["Last Name"] + '">' + recordSet[i]["Last Name"] + '</td>';
                            sctablemarkup += '                                    <td title="' + recordSet[i]["First Name"] + '" >' + recordSet[i]["First Name"] + '</td>';
                            sctablemarkup += '                                    <td id="personalstreetaddress" title="' + recordSet[i]["Personal Street Address"] + '">' + recordSet[i]["Personal Street Address"] + '<img src="images/custom/mvgicon.png" class="mvg-icon" id="sc-address-mvg' + (i + 1) + '"></td>';
                            sctablemarkup += '                                    <td id="personalcity">' + recordSet[i]["Personal City"] + '</td>';
                            sctablemarkup += '                                    <td id="personalstate">' + recordSet[i]["Personal State"] + '</td>';
                            sctablemarkup += '                                    <td id="personalpostalcode">' + recordSet[i]["Personal Postal Code"] + '</td>';
                            sctablemarkup += '                                </tr>';
                        }
                        sctablemarkup += '                            </tbody>';
                    }
                    return sctablemarkup;
                }

                //Get the Contacts results for referref By 
                function RefByContactSearch(pm, recordset) {
                    var refbymarkup = '';
                    var ContactDetails = "";
                    refbymarkup += '                                <table class="SC-table" id="SC-table-ref-Con">';
                    refbymarkup += '                                    <thead>';
                    refbymarkup += '                                        <tr>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-lastname">last name</th>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-firstname">first name</th>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-address">address</th>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-city">city</th>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-state">state</th>';
                    refbymarkup += '                                            <th class="sort-by" id="sp-zipcode">zipcode</th>';
                    refbymarkup += '                                        </tr>';
                    refbymarkup += '                                    </thead>';
                    refbymarkup += '                                    <tbody>';
                    for (i = 0; i < recordSet.length; i++) {
                        ContactDetails = "";
                        ContactDetails = recordSet[i]["Id"] + '_' + recordSet[i]["First Name"] + '_' + recordSet[i]["Last Name"];
                        refbymarkup += '		<tr id="ref_row' + i + '">';
                        refbymarkup += '      <td><span style="display:none" id="' + i + 'refcondet">' + ContactDetails + '</span>' + recordSet[i]["Last Name"] + '</td>';
                        refbymarkup += '      <td>' + recordSet[i]["First Name"] + '</td>';
                        refbymarkup += '      <td>' + recordSet[i]["Personal Street Address"] + '</td>';
                        refbymarkup += '      <td>' + recordSet[i]["Personal City"] + '</td>';
                        refbymarkup += '      <td>' + recordSet[i]["Personal State"] + '</td>';
                        refbymarkup += '      <td>' + recordSet[i]["Personal Postal Code"] + '</td>';
                        refbymarkup += '  </tr>';
                    }
                    refbymarkup += '                                    </tbody>';
                    refbymarkup += '                                </table>';
                    return refbymarkup;
                }

                // Sneakpeek Record display logic
                function sneakpeek(record) { // [Vamsi:11-01-2018: As per Itti's Comments, to pass record instead of recordset]
                    var VouchersPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC LOY Member Vouchers List Applet OUI"].GetPModel().GetRenderer().GetPM();
                    var vouchersCount = VouchersPM.Get("GetRecordSet");
                    var markup = "";
                    markup += '            <div class="modal-dialog">';
                    markup += '                <div class="modal-content">';
                    markup += '                    <div class="modal-header">';
                    markup += '                        <button type="button" class="close" data-dismiss="modal" id="close-details">&times;</button>';
                    markup += '                        <div class="header-content">';
                    markup += '                            <div class="SC-S-image-container">';
                    if (vouchersCount == 0) {
                        markup += '                                <img id="SC-contact-avatar" class="incomplete" src="images/custom/contact-sneakpeak.png">';
                    } else {
                        markup += '                                <img id="SC-contact-avatar" class="incomplete" src="images/custom/contact-sneakpeak-loyality.png">';
                    }
                    markup += '                            </div>';
                    markup += '                            <div class="SC-S-details-container">';
                    markup += '                                <p class="name no-margin">';
                    if (record["M/M"] != ('' | "" | "undefined")) {
                        markup += record["M/M"] + '. ';
                    }
                    if (record["First Name"] != ('' | "" | "undefined"))
                        markup += record["First Name"] + ' ';
                    if (record["Last Name"] != ('' | "" | "undefined"))
                        markup += record["Last Name"];
                    markup += '</p>';
                    //Added Customer Category field in Sneakpeek Header level
                    markup += '<p class="category no-margin">' + record["SN Customer Category Calc"] + '</p>';
                    markup += '<p class="address no-margin">';
                    if (record["Personal Street Address"] != ('' | "" | "undefined"))
                        markup += record["Personal Street Address"];
                    if (record["Personal City"] != ('' | "" | "undefined"))
                        markup += ', ' + record["Personal City"];
                    if (record["Personal State"] != ('' | "" | "undefined"))
                        markup += ', ' + record["Personal State"];
                    if (record["Personal Postal Code"] != ('' | "" | "undefined"))
                        markup += ', ' + record["Personal Postal Code"];
                    if (record["Country"] != ('' | "" | "undefined"))
                        markup += ', ' + record["Country"];
                    markup += '</p>';
                    markup += '                            </div>';
                    markup += '                        </div>';
                    markup += '                    </div>';
                    markup += '                    <div class="modal-body SC-S-details-body">';
                    if (record["Person UId"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Customer # :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Person UId"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["SN Customer Category Calc"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Customer Category :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["SN Customer Category Calc"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Email Address"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Email :</span>';
                        markup += '                            <span class="SC-S-detail-item-value" title="' + record["Email Address"] + '" >' + record["Email Address"] + '</span>';
                        markup += '                        </div>';
                    }
					 
                    if (record["Cellular Phone #"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Mobile phone number :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Cellular Phone #"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Home Phone #"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Home phone number :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Home Phone #"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Work Phone #"] != ('' | "" | "undefined")) {
                        markup += '						<div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Work phone number :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Work Phone #"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["SC Sleep Number"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Sleep number :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["SC Sleep Number"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Family"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Partner name :</span>';
                        markup += '                            <span class="SC-S-detail-item-value" title="' + record["Family"] + '">' + record["Family"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["SC Partner Sleep Number"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Partner sleep number :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["SC Partner Sleep Number"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Employee Number"] != ('' | "" | "undefined") && Number.isInteger(record["Employee Number"])) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">employee # :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Employee Number"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (record["Preferred Communications"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Preferred Contact Method :</span>';
                        markup += '                            <span class="SC-S-detail-item-value">' + record["Preferred Communications"] + '</span>';
                        markup += '                        </div>';
                    }
                    //Added by SJAKKIDI for displaying community name
                    if (record["Community"] != ('' | "" | "undefined")) {
                        markup += '                        <div class="SC-S-detail-item">';
                        markup += '                            <span class="SC-S-detail-item-label">Community :</span>';
                        markup += '                            <span class="SC-S-detail-item-value" title="' + record["Community"] + '">' + record["Community"] + '</span>';
                        markup += '                        </div>';
                    }
                    if (responsibility == "SC Service Managers" || responsibility == "SC Customer Service") {
                        if (record["SC Blacklisted"] != ('' | "" | "undefined")) {
                            markup += '                        <div class="SC-S-detail-item">';
                            markup += '                            <span class="SC-S-detail-item-label">Blacklisted :</span>';
                            markup += '                            <span class="SC-S-detail-item-value">' + record["SC Blacklisted"] + '</span>';
                            markup += '                        </div>';
                        }
                        if (record["SC Blackisted Reason"] != ('' | "" | "undefined")) {
                            markup += '                        <div class="SC-S-detail-item">';
                            markup += '                            <span class="SC-S-detail-item-label">Blackisted reason" :</span>';
                            markup += '                            <span class="SC-S-detail-item-value">' + record["SC Blackisted Reason"] + '</span>';
                            markup += '                        </div>';
                        }
                    }
                    markup += '                    </div>';
                    markup += '                    <div class="modal-footer SC-S-details-footer">';
                    markup += '                        <button id="sc-snkpk-customer360">Customer 360</button>';
                    markup += '                        <button id="sc-snkpk-finance">Financing</button>';
                    markup += '                        <button id="sc-snkpk-salesorder">New Sales Order</button>';
                    markup += '                    </div>';
                    markup += '                </div>';
                    markup += '            </div>';
                    return markup;
                }


                //Add store Location modal open
                $("#SC-add-store-location").click(function() {
                    $("#SC-add-storelocation").modal({
                        backdrop: 'static'
                    });
                });


                //Add contact modalopen
                $(document).on('click', '#SC-add-contact-btn', function() {
                    setTimeout(function() {
                        $("#SC-add-contact").modal({
                            backdrop: 'static'
                        });
                    }, 50);
                });


                SCContactListAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.SCContactListAppletPR.superclass.BindData.apply(this, arguments);
                    //on click of mvg
                    $(document).on("click", ".mvg-icon", function(e) {
                        e.stopImmediatePropagation();
                        var mvgrowid = this.id;
                        mvgrowid = mvgrowid.split("g");
                        mvgrowid = mvgrowid[1];
                        $("#s_" + appletSeq + "_l tr#" + mvgrowid + "").trigger("click");
                        var view = SiebelApp.S_App.GetActiveView().GetName();
                        if (view == "SC Contact List View OUI") {
                            SiebelJS.Log("in all contacts");
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_MVG"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
                                var Field_Name = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                                SiebelJS.Log("field name value is:" + Field_Name);
                                $('#SiebelField').val(Field_Name);

                                $('#personalstreetaddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Street Address"));
                                $('#personalcity').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal City"));
                                $('#personalstate').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal State"));
                                $('#personalpostalcode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Postal Code"));
                            });
                        } else if (view == "SC Manager's Contact List View OUI") {

                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_MVG"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
                                var Field_Name = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                                SiebelJS.Log("field name value is:" + Field_Name);
                                $('#SiebelField').val(Field_Name);

                                $('#personalstreetaddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Street Address"));
                                $('#personalcity').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal City"));
                                $('#personalstate').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal State"));
                                $('#personalpostalcode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Postal Code"));
                            });
                        } else if (view == "SC Visible Contact List View OUI") {

                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_MVG"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
                                var Field_Name = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetControls()["Personal Street Address"]);
                                SiebelJS.Log("field name value is:" + Field_Name);
                                $('#SiebelField').val(Field_Name);

                                $('#personalstreetaddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Street Address"));
                                $('#personalcity').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal City"));
                                $('#personalstate').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal State"));
                                $('#personalpostalcode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].GetBusComp().GetFieldValue("Personal Postal Code"));
                            });
                        }
                    });

                    //on click of OK on MVG
                    $(document).on('click', 'button[title="Contact Addresses:OK"]', function(e) {
                        e.stopImmediatePropagation();
                        appletInstance = '';
                        appletInstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"];
                        ContactFormApp_BC = '';
                        ContactFormApp_BC = appletInstance.GetBusComp();
                        var newSetAfterCommit_address = '';
                        newSetAfterCommit_address = ContactFormApp_BC.GetRecordSet();

                        $("#personalstreetaddress").val("");
                        $("#personalstreetaddress").val(newSetAfterCommit_address[0]["Personal Street Address"]);
                        $("#personalcity").val("");
                        $("#personalcity").val(newSetAfterCommit_address[0]["Personal City"]);
                        $("#personalstate").val("");
                        $("#personalstate").val(newSetAfterCommit_address[0]["Personal State"]);
                        $("#personalpostalcode").val("");
                        $("#personalpostalcode").val(newSetAfterCommit_address[0]["Personal Postal Code"]);
                    });

                    //end of mvg click button

                    // Getting Record set
                    recordSet = pm.Get("GetRecordSet");
                    if (refby == "Y") {
                        markup = RefByContactSearch(pm, recordSet);
                        //appending markup to table for referred By Contact 
                        if ($("#sc-referredby-con-search").hasClass("SC-disabled")) {
                            var markup = SCOUIMarkups.InitialMessage(pm, "SalesOrder");
                            $("#SC-table-search-referredbycontact-body").html(markup);
                            $("#referredby-contact-pagination").hide();

                        } else {
                            $('#SC-table-search-referredbycontact-body').html(markup);
                            // pagination
                            if (recordSet.length == 0) {
                                markup = SCOUIMarkups.ResultsMessage(pm, FieldQueryPair, "contacts");
                                $("#SC-table-search-referredbycontact-body").html(markup);
                                $("#referredby-contact-pagination").css("cssText", "display: none !important;");
                            } else {
                                SCOUIMethods.PrimaryButton(pm, "referredby-contact-pagination");
                            }
                        }
                    } else {
                        markup = SCTable(pm, recordSet);
                        if ($("#sc-search").hasClass("SC-disabled")) {
                            var markup = SCOUIMarkups.InitialMessage(pm, "SalesOrder");
                            $("#SC-table-contact-search").html(markup);
                            $("#SC-CON-Pagination").hide();

                        } else {
                            $('#SC-table-contact-search').html(markup);
                            // pagination
                            if (recordSet.length == 0) {
                                markup = SCOUIMarkups.ResultsMessage(pm, FieldQueryPair, "contacts");
                                $("#SC-table-contact-search").html(markup);
                                $("#SC-CON-Pagination").css("cssText", "display: none !important;");
                            } else {
                                SCOUIMethods.PrimaryButton(pm, "SC-CON-Pagination");
                            }
                        }
                    }
                    //initial message in search table
                    // SiebelJS.Log("Markup..:"+markup);



                    // sneekpeak code
                    var smarkup = "";
                    srecordset = this.GetPM().Get("GetRecordSet");
                    for (var j = 0; j < recordSet.length; j++) {
                        $("#row" + (j + 1)).dblclick(function() {
                            var str = this.id;
                            str = str.split("w");
                            str = str[1];
                            var k = str - 1;
                            var record = srecordset[k];
                            $("#s_" + appletSeq + "_l tr#" + str + "").trigger("click");
                            smarkup = sneakpeek(record); // [Vamsi:11-01-2018: As per Itti's Comments, to pass record]
                            $("#contact-details").html(smarkup);

                            /*$("#contact-details").modal({
                            	backdrop: 'static'
                            });*/
                            $("#contact-details").modal("show");

                            if (record["SC Sleep Number"] != '' && record["SC Base"] != '' && record["SC Series"] != '' && record["SC Size"] != '') {
                                $("#SC-contact-avatar").removeClass('incomplete');
                            }

                            //on click of customer360 of sneak peak
                            $('#sc-snkpk-customer360').click(function() {
                                $("#contact-details").modal('hide');
                                $('#maskoverlay').show();
                                setTimeout(function() {
                                    FieldQueryPair = {
                                        "First Name": "[Id]='" + recordSet[k]["Id"] + "'"
                                    };
                                    SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, pm.Get("GetName"));
                                    setTimeout(function() {
                                        pm.ExecuteMethod("OnDrillDown", "Last Name", 1);
                                        $('#maskoverlay').hide();
                                    }, 500);
                                }, 50);
                            });

                            //on click of finance of sneak peak
                            //$(document).on('click','#sc-snkpk-finance',function() {
                            $('#sc-snkpk-finance').click(function() {
                                $("#contact-details").modal('hide');
                                $('#maskoverlay').show();
                                setTimeout(function() {
                                    var InPut = "",
                                        OutPut = "",
                                        BService;
                                    InPut = SiebelApp.S_App.NewPropertySet();
                                    OutPut = SiebelApp.S_App.NewPropertySet();
                                    InPut.SetProperty("View", "SC Contact Finance List View OUI");
                                    InPut.SetProperty("Business Component", "Contact");
                                    InPut.SetProperty("Row Id", recordSet[k]["Id"]);
                                    BService = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
                                    OutPut = BService.InvokeMethod("GotoView", InPut);
                                    //SiebelApp.S_App.GotoView("SC Contact Finance List View OUI");
                                    $('#maskoverlay').hide();
                                }, 50);
                            });

                            //on click of salesorder of sneak peak
                            $('#sc-snkpk-salesorder').click(function() {
                                $("#contact-details").modal('hide');
                                $("body").trigger('Custom.Start');
                                setTimeout(function() {
                                    localStorage.setItem('isNewSalesOrder', "Y");
                                    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].InvokeMethod("NewOrder");
                                    $("body").trigger('Custom.End');
                                }, 500);
                            });
                        });
                    }

                    //This is for moving recents scroll in header
                    $(document).on('click', '#scroll', function() {
                        var leftPos = $('div.recent-results').scrollLeft();
                        $("div.recent-results").animate({
                            scrollLeft: leftPos + 300
                        }, 500);
                    });

					//CHANGE FOR IFIT RECENT TAB SHOW OR HIDE FOR SFSTRY0001330
					
					//var showIfitTab = SiebelApp.S_App.GetProfileAttr("ShowIFITTab");
					var SearchSpec = "[Type]= 'SC_IFIT_RECENT' and [Active] = 'Y'";
					var showIfitTab = SCOUIMethods.SCGetOrderLoVs(SearchSpec);
					// ifit Recent Records
					var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
					if((scPrimaryDivType == "STORE" || scPrimaryDivType == "SHOW") && showIfitTab == "ON"){
						iFitRecentRecords = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetBusComp().GetRecordSet();
						rescentRecordsMarkup=SCOUIMarkups.iFitContactRecentRecords_block(iFitRecentRecords);
						$("#ifit-recents-header").html(rescentRecordsMarkup);
					}
					else{
						$("#ifit-recents-header").hide();
					}

                    // ifit Recent Records
                    var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                    var scStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    if (scPrimaryDivType != "STORE" && scPrimaryDivType != "SHOW" && scPrimaryDivType != "") {
                        iFitRecentRecords = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC iFit Contact List Applet"].GetBusComp().GetRecordSet();
                        rescentRecordsMarkup = SCOUIMarkups.iFitContactRecentRecords_block(iFitRecentRecords);
                        $("#ifit-recents-header").html(rescentRecordsMarkup);
                    } else if(scPrimaryDivType != ""){
                        iFitRecentRecords = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetBusComp().GetRecordSet();
                        rescentRecordsMarkup = SCOUIMarkups.iFitContactRecentRecords_block(iFitRecentRecords);
                        $("#ifit-recents-header").html(rescentRecordsMarkup);
                    }else{
						
					}
                    var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                    var scStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                    if (scPrimaryDivType != "STORE") {
                        $("#ifit-recents-header").hide();
                    }
                } // end of bind data

                SCContactListAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.SCContactListAppletPR.superclass.BindEvents.apply(this, arguments);
                    //sushma 19-07-2018:Added for Resizing CTI Toolbar
                    $(document).on('click', '#commPanelDockToShowUnpin', function() {
                        $("#CommunicationPanelContainer").css("cssText", "padding-top: 0px !important;");
                    })
                    $(document).on('click', '#commPanelDockToShowPin', function() {
                        $("#CommunicationPanelContainer").css("cssText", "padding-top: 127px !important;");
                    })
                    $(document).on('click', '#SC-close-add-contact', function() {
                        //SiebelJS.Log("New Contact Closed");
                        $("#SC-add-contact").modal('hide');
                    });
                    //SNARRA 28-02-2019 Added code for CTIToolbar Issue
                    $(".modal").on('show.bs.modal', function() {
                        if ($("#sc-orange").is(":visible")) {
                            toolbarflag = "Y";
                        } else {
                            toolbarflag = "N";
                        }
                    });

                    $(".modal").on('hide.bs.modal', function() {
                        if (toolbarflag == "Y") {
                            $(".SC-data-container").css("position", "inherit");
                            localStorage.setItem('CTIToolbar', "Y");
                        } else {
                            localStorage.setItem('CTIToolbar', "N");
                        }

                    });
                    //SNARRA:29-10-2018 Start: show CTI Toolbar
                    $(document).on('click', '#SC-ANI-CTItool', function() {
                        $(this).find('img').toggle();
                        //Commented for IP23 by peeyush.kumar on Dec 6 2023
          // $('#tb_1')[0].click();
          //Added for IP23 by peeyush.kumar on  Dec 6 2023
          
          $("li[name='Toggle Communication Panel']").click();
                        setTimeout(function() {
                            $('#commPanelDockToShowpin').click();
                        }, 500);
                    });
                    $(document).on('click', '#commPanelCloseToggle', function() {
                        $("#SC-ANI-CTItool").find('img').toggle();
                    });
                    //Start:on paste of search boxes	
                    $(document).on('paste', '.con-search-box', function(event) {
                        setTimeout(function() {
                            $(".con-search-box").trigger("keyup");
                        }, 100);
                    })
                    //End:on paste of search boxes
                    // search fields and search box code
                    $(document).on('keyup', '.con-search-box', function() {
                        selectedFieldId = $(this).attr("id").substring(1, $(this).attr("id").length);
                        var e = document.getElementById(selectedFieldId);
                        var selectedvalue = e.options[e.selectedIndex].value;
                        //SCHERKU: For date of first activity
                        if (selectedvalue == "Date Of First Activity") {
                            this.value = this.value.replace(/[a-zA-Z ]+/g, '');
                        }

                        //NGOLLA commented the code for defect no:737
                        /*if(selectedvalue == "Phone Number" || selectedvalue == "Customer Number" || selectedvalue == "Employee Number"){
                        	this.value = this.value.replace(/[^0-9\.]/g,'');
                        }
                        */
                        //sushma Added for SCTASK0028074
                        if ($(this).attr("id") != "ifield0" && $("#ifield0").val().length != 0 && $("#ifield0").val() != "*" && $(this).attr("id") != "ifield1" && $("#ifield1").val().length != 0 && $("#ifield1").val() != "*" && $(this).val().length != 0 && $(this).val() != "*") {
                            if (searchCount != csearchfields.length) {
                                $(".add-item").show();
                            } else {
                                $("#removeicon").show();
                            }
                        } else if (($(this).attr("id") == "ifield0" || $(this).attr("id") == "ifield1" || $(this).attr("id") == "ifield2") && $("#ifield0").val().length != 0 && $("#ifield1").val().length != 0 && $("#ifield2").val().length != 0) {
                            $(".search-box").each(function() {
                                if ($(this).attr("id") != "ifield0") {
                                    if ($(this).val().length != 0 && $(this).val() != "*") {
                                        $(".add-item").show();
                                    }
                                }
                            });
                        }
                        /* else if($(this).attr("id")=="ifield1"&&$("#ifield1").val().length!=0){
                        			$(".search-box").each(function(){
                        				if($(this).attr("id")!="ifield1"){
                        					if($(this).val().length!=0&&$(this).val()!="*"){
                        						$(".add-item").show();
                        					}
                        				}
                        			});
                        		} */
                        else {
                            $(".add-item").hide();
                        }

                        $(".con-search-box").each(function() {
                            if ($(this).val().length != 0 && $(this).val() != "*") {
                                $("#sc-search").removeClass('SC-disabled');
                                return false;
                            } else {
                                $("#sc-search").addClass('SC-disabled');
                            }
                        });
                    });

                    // dynamic values change for dropdowns
                    $(document).on('click', '.con-select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        //SCHERKU: For adding date of first activity on contact search
                        if ($("#" + currentid).val() == "Date Of First Activity") {
                            $("#i" + currentid).datepicker({
                                onSelect: function() {
                                    $(".con-search-box").trigger("keyup");
                                },
                                showButtonPanel: true
                            });
                            //Start:on focus out hide the datepicker
                            var dateid = "#i" + currentid;
                            $("#i" + currentid).focusout(function() {
                                if ($("#i" + currentid).hasClass("hasDatepicker"))
                                    $(dateid + " ~ .ui-datepicker").hide();
                            });
                            //End:on focus out hide the datepicker
                            //Start:on scroll hiding the datepicker
                            $("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function() {
                                if ($(dateid).hasClass("hasDatepicker"))
                                    $(dateid).datepicker("hide");
                            });
                            //START SNARRA 28/05/2018 Added code for hiding DatePicker on tab
                            $(dateid).on('keypress', function(ev) {
                                if (ev.keyCode === 9) { //tab
                                    if ($(dateid).hasClass("hasDatepicker"))
                                        $("#" + dateid + " ~ .ui-datepicker").hide();

                                }
                            });
                        } else {
                            currentValue = e.options[e.selectedIndex].value;
                            if ($("#i" + currentid).hasClass("hasDatepicker")) {
                                $("#i" + currentid).datepicker("destroy");
                            }
                        }
                    });
                    $(document).on('change', '.con-select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        var seletedvalue = e.options[e.selectedIndex].value;

                        $(".con-select-box").each(function() {
                            $(this).attr("id"); //this.id
                            if ($(this).attr("id") != currentid) {
                                $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                if ($("#" + $(this).attr("id") + " option[value='" + currentValue + "']").parent().is("span")) {
                                    $("#" + $(this).attr("id") + " option[value='" + currentValue + "']").unwrap();
                                }
                            }
                            $("#" + currentid + " option[value='" + seletedvalue + "']").attr('selected', 'selected');
                        });
                        sFields.push(seletedvalue);
                        var sIndex = sFields.indexOf(currentValue);
                        sFields.splice(sIndex, 1);
                    });

                    // dynamic values change for dropdowns
                    $(document).on('click', '.sc-select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        //SCHERKU: For adding date of first activity on contact search
                        if ($("#" + currentid).val() == "Date Of First Activity") {
                            $("#i" + currentid).datepicker({
                                onSelect: function() {
                                    $(".sc-select-box").trigger("keyup");
                                },
                                showButtonPanel: true
                            });
                            //Start:on focus out hide the datepicker
                            var dateid = "#i" + currentid;
                            $("#i" + currentid).focusout(function() {
                                if ($("#i" + currentid).hasClass("hasDatepicker"))
                                    $(dateid + " ~ .ui-datepicker").hide();
                            });
                            //End:on focus out hide the datepicker
                            //Start:on scroll hiding the datepicker
                            $("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function() {
                                if ($(dateid).hasClass("hasDatepicker"))
                                    $(dateid).datepicker("hide");
                            });
                            //START SNARRA 28/05/2018 Added code for hiding DatePicker on tab
                            $(dateid).on('keypress', function(ev) {
                                if (ev.keyCode === 9) { //tab
                                    if ($(dateid).hasClass("hasDatepicker"))
                                        $("#" + dateid + " ~ .ui-datepicker").hide();

                                }
                            });
                        } else {
                            currentValue = e.options[e.selectedIndex].value;
                            if ($("#i" + currentid).hasClass("hasDatepicker")) {
                                $("#i" + currentid).datepicker("destroy");
                            }
                        }
                    });
                    $(document).on('change', '.sc-select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        var seletedvalue = e.options[e.selectedIndex].value;

                        $(".sc-select-box").each(function() {
                            $(this).attr("id"); //this.id
                            if ($(this).attr("id") != currentid) {
                                $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                if ($("#" + $(this).attr("id") + " option[value='" + currentValue + "']").parent().is("span")) {
                                    $("#" + $(this).attr("id") + " option[value='" + currentValue + "']").unwrap();
                                }
                            }
                            $("#" + currentid + " option[value='" + seletedvalue + "']").attr('selected', 'selected');
                        });
                        sFields.push(seletedvalue);
                        var sIndex = sFields.indexOf(currentValue);
                        sFields.splice(sIndex, 1);
                    });

                    // search fields and search box code
                    $(document).on('keyup', '.sc-referred-search-box', function() {
                        selectedFieldId = $(this).attr("id").substring(2, $(this).attr("id").length);
                        var e = document.getElementById("c" + selectedFieldId);
                        var selectedvalue = e.options[e.selectedIndex].value;
                        //SCHERKU: For date of first activity
                        if (selectedvalue == "Date Of First Activity") {
                            this.value = this.value.replace(/[a-zA-Z ]+/g, '');
                        }

                        //NGOLLA commented the code for defect no:737
                        /*if(selectedvalue == "Phone Number" || selectedvalue == "Customer Number" || selectedvalue == "Employee Number"){
                        	this.value = this.value.replace(/[^0-9\.]/g,'');
                        }
                        */
                        if ($(this).attr("id") != "rcfield0" && $("#rcfield0").val().length != 0 && $("#rcfield0").val() != "*" && $(this).val().length != 0 && $(this).val() != "*") {
                            if (refsearchCount != refsearchfields.length) {
                                $(".ref-icon-img").show();
                            } else {
                                $("#referredremoveicon").show();
                            }
                        } else if ($(this).attr("id") == "rcfield0" && $("#rcfield0").val().length != 0) {
                            $(".sc-referred-search-box").each(function() {
                                if ($(this).attr("id") != "rcfield0") {
                                    if ($(this).val().length != 0 && $(this).val() != "*") {
                                        $(".ref-icon-img").show();
                                    }
                                }
                            });
                        } else {
                            $(".ref-icon-img").hide();
                        }

                        $(".sc-referred-search-box").each(function() {
                            if ($(this).val().length != 0 && $(this).val() != "*") {
                                $("#sc-referredby-con-search").removeClass('SC-disabled');
                                return false;
                            } else {
                                $("#sc-referredby-con-search").addClass('SC-disabled');
                            }
                        });
                    });

                    //close the logout model
                    $(document).click(function(e) {
                        if (!$(e.target).closest('#SC-profile, .SC-Profile-container').length) {
                            $(".SC-Profile-container").hide();
                        }
                    });
                    //A
                    $(document).on('click', '.ui-datepicker-prev', function(e) {
                        $('.ui-datepicker-title').append('<button type="button" class="close SC-close-popup blue-bg" id="datepicker-close">&times;</button>');
                    });
                    $(document).on('click', '.ui-datepicker-next', function(e) {
                        $('.ui-datepicker-title').append('<button type="button" class="close SC-close-popup blue-bg" id="datepicker-close">&times;</button>');
                    });
                    // clear local storage on browser close
                    $(window).on('unload', function(event) {
                        SiebelJS.Log("Reseting Local Storage variables");
                        localStorage.setItem('SearchCount', 3);
                        localStorage.setItem('Next', 2);
                        sFields = ['Email Address','Phone Number', 'Customer Number'];
                    });

                    //on click of recent-record on header
                    $(document).on('click', '.contact-recent-record', function(e) {
                        e.stopImmediatePropagation();
                        $('#maskoverlay').show();
                        var id = $(this).attr("id");
                        setTimeout(function() {
                            localStorage.setItem('isiFitRecord', 0);
                            var Bservice = '',
                                inPS = '',
                                outPS = '';
                            inPS = SiebelApp.S_App.NewPropertySet();
                            outPS = SiebelApp.S_App.NewPropertySet();
                            inPS.SetProperty("Name", "RecentRecordId");
                            inPS.SetProperty("Value", id);
                            Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                            outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                            //SiebelJS.Log("Recent Record Id..:"+SCOUIMethods.SCGetProfileAttrValue("RecentRecordId"));
                            SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact List Applet OUI"].InvokeMethod("RecentRecordDrillDown");
                            pm.ExecuteMethod("OnDrillDown", "Last Name", 1);
                            $('#maskoverlay').hide();
                        }, 50);
                    });

                    //on click of ifit-recent-record on header
                    $(document).on('click', '.ifit-contact-recent-record', function(e) {
                        e.stopImmediatePropagation();
                        $('#maskoverlay').show();
                        var id = $(this).attr("id");
                        setTimeout(function() {
                            localStorage.setItem('isiFitRecord', 1);
                            var Bservice = '',
                                inPS = '',
                                outPS = '';
                            inPS = SiebelApp.S_App.NewPropertySet();
                            outPS = SiebelApp.S_App.NewPropertySet();
                            inPS.SetProperty("Name", "RecentRecordId");
                            inPS.SetProperty("Value", id);
                            Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                            outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
                            var scPrimaryDivType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                            var scStoreNumber = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                            if (scPrimaryDivType != "STORE" && scPrimaryDivType != "SHOW") {
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC iFit Contact List Applet"].InvokeMethod("RecentRecordDrillDown");
                            } else {
                                SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].InvokeMethod("RecentRecordDrillDown");
                                ifitrecentPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Retail iFit Contact List Applet"].GetPModel().GetRenderer().GetPM();
                                ifitrecentPM.ExecuteMethod("OnDrillDown", "Id", 1);
                            }
                            $('#maskoverlay').hide();
                        }, 50);
                    });

                    $(document).on('click', '#SC-table-referral-search-contact tr', function() {
                        sc_reffid = $(this).attr('id');
                        selected_RefConId = sc_reffid;
                        selected_RefConIndex = selected_RefConId.replace("ref_row", "");
                        $('#' + sc_reffid).addClass('highlate-row').siblings().removeClass('highlate-row');
                        $("#SC-select-contact-referredby").removeClass('SC-disabled');
                    });

                    $(document).on('click', '#SC-table-contact-search tr', function() {
                        $(this).addClass('cti-active').siblings().removeClass('cti-active');
                        var rowId = this.rowIndex;
                        $("#s_" + appletSeq + "_l tr#" + rowId + "").trigger("click");
                        SCOUIMethods.addAddressMVG();
                    });

                    $(document).on('click', '#SC-select-contact-referredby', function() {
                        $("#SC-select-contact-referredby").addClass('SC-disabled');
                        $("#SC-search-referredby").modal('hide');
                        var rowid = sc_reffid.slice(-1);
                        SiebelJS.Log(rowid);
                        var referedcontactInfo = $("#" + rowid + "refcondet").text();
                        var refconrcd = referedcontactInfo.split('_');
                        RefById = refconrcd[0];
                        var RefbyName = refconrcd[1] + " " + refconrcd[2];
                        $("#Referredby").val(RefbyName);
                        $("#Referredby").parent().val(RefById);
                        $("#Referredby").parent().addClass("is-active is-completed");
                    });
                    //START -- CONTACT CREATION PROCESS
                    //Start: contact create pop up
                    $(document).on('click', '#SC-add-contact-btn', function() {
                        //ContactCreatefn = SiebelJS.Dependency("SiebelAppFacade.SCCreateContactFunctionality");
                        $('#maskoverlay').show();
                        setTimeout(function() {
                            ContactCreatefn.CreateNewContact();
                            //ContactCreatefn.CreateNewContact();
                            $('#maskoverlay').hide();
                        }, 50);
                    });
                    //End: contact create pop up

                    //Start: Create contact modal- closing
                    /*$(document).ready(function() { 				  
                    	$("#SC-close-add-contact").click(function() {
                    		$("#SC-add-contact").modal('hide');						
                    	});
                    });*/
                    //End: Create contact modal-closing

                    //Start: contact field validation & contact creation
                    $(document).on('click', "#gotoContactAccount", function(e) {
                        var ValidateTab1 = ContactCreatefn.ContactFieldValidation1();
						//SWAGH:10132023:SFSTRY0003040
						$("#sc-media-block").hide();
                    });

                    $(document).on('click', "#createContact", function(e) {
                        var conCreate = ContactCreatefn.ContactFieldValidation2("SCContactListAppletPR");
                    });
                    //End: contact field validation & contact creation

                    //Start: Email Validation 
                    $(document).on("click", "#email", function() {
                        var emailValidain = ContactCreatefn.Cont_Create_EmailValidation();
                    });
                    //End: Email Validation

                    //VALLA: 13-JUNE-19 : Start: Mobile Validation
                    $(document).on("click", "#mobilephonecheck", function() {
                        var emailValidain = ContactCreatefn.Cont_Create_MobileValidation();
                    });
                    //End: Mobile Validation

                    //Start: Referred BY 
                    $(document).on("click", "#referredby", function() {
                        var referredBy = ContactCreatefn.Cont_Create_ReferredBY();
                    });
                    //End: Referred BY 

                    //Start: Goto previous page
                    $(document).on('click', "#gotoContactContact", function(event) {
                        var emailValidain = ContactCreatefn.GotoPreviousPage();
                    });
                    //End: Goto previous page


                    //This is for the input box animations. this is required across the app
                    $(document).on('focus', '.SC-input', function() {
                        $(this).parent().addClass("is-active is-completed");
                    });


                    $(document).on('focusout', '.SC-input', function() {
                        if ($(this).val() === "")
                            $(this).parent().removeClass("is-completed");
                        $(this).parent().removeClass("is-active");
                    });


                    //Start: on focus out, change the phone numbeer to US format				

                    SCOUIMethods.PH_USFormat("MobilePhone");
                    SCOUIMethods.PH_USFormat("SecondaryPhone");
                    SCOUIMethods.PH_USFormat("TeritaryPhone");

                    //End: on focus out, change the phone numbeer to US format

                    //END -- CONTACT CREATION PROCESS

                    //Start: Navigate to export view's
                    $("#my_contacts img").click(function(e) {
                        e.stopPropagation();
                        localStorage.setItem('whitescreen', 1);
                        SiebelApp.S_App.GotoView("SC Visible Contact List View", "", "", "");

                    });
                    $("#My_teams_contacts img").click(function(e) {
                        e.stopPropagation();
                        localStorage.setItem('whitescreen', 1);
                        SiebelApp.S_App.GotoView("SC Manager's Contact List Export View", "", "", "");


                    });
                    $("#all_contacts img").click(function(e) {
                        e.stopPropagation();
                        localStorage.setItem('whitescreen', 1);
                        SiebelApp.S_App.GotoView("SC Contact List Export View", "", "", "");

                    });
                    //End: Navigate to export view's
                    $(document).on('click', '#SC-close-referredby', function() {
                        $("#SC-search-referredby").modal('hide');
                    });
					msg="jjjj";
					jQuery.validator.addMethod(
					"regex",
						function(value, element, regexp) 
						{
							if (regexp.constructor != RegExp)
								regexp = new RegExp(regexp);
							else if (regexp.global)
								regexp.lastIndex = 0;
							return this.optional(element) || regexp.test(value);
						},
						""
					 );
					$("#sn-search-fields").validate({
                        rules: {
                            searchphone: {
                                regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                            },
                            searchemailaddress: {
                                regex: /^\d{10}$/
                                
                            },
                        },
                        messages: {
                            messages: {
                            searchphone: 
                                msg
                            ,
                            searchemailaddress: 
                                msg
                            
                        },
                        },
                        tooltip_options: {
                            searchemailaddress: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                            searchphone: {
                                trigger: 'focus',
                                placement: 'bottom',
                                html: true
                            },
                        },
            submitHandler: function (form) {
            console.log("validation success");
            }
        });
                }

                SCContactListAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.SCContactListAppletPR.superclass.EndLife.apply(this, arguments);
                    SearchFields = null;
                    ca = null;
                    $(document).unbind("click");
                    $(document).unbind("keyup");
                    $(document).unbind("focus");
                    $(document).unbind("focusout");
                    if (localStorage.getItem('CTIToolbar') == "N") {
                        $(".SC-data-container").css("position", "absolute");
                    }
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
                        $('#CommunicationPanelContainer').css("padding-top", "0px");
                    }
                }

                //code to search contacts based on the input
                function searchContact(refby) {
					//Spatiban: #STRY0106101:Added below code for validating the inputs
					if(!(refby=="Y")){
						var allowSearch="Y";
						try{
							$(".SC-data-container").find("select[id*='field']").each(function() {
								var fname = $(this).val();
								var fvalue = $(this).next().val();
								fvalue = $.trim(fvalue);
								var phonespec = "";
								if (fname !== "" && fvalue !== "" && fvalue !== undefined && fname !== undefined) {
								   if (fname == "Email Address") {
										 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(fvalue))
										{
											console.log("valid email address");
										}
										else{
											//alert("Please enter a valid Email Address to search.");
																						var iddd=$(this).attr("id")
											$("#i"+iddd).attr("name","searchemailaddress");
											allowSearch="N";
											
										}
									}									
									if (fname == "Phone Number") {
										 if( /^\d{10}$/.test(fvalue))
										{
											console.log("Phone Number is valid");
										}
										else{
											 var iddd=$(this).attr("id")
											$("#i"+iddd).attr("name","searchphone");
											//alert("Please enter 10 digits to search on Phone Number.");
											allowSearch="N";
											
										}
									}
								}
							});
						}
						catch(e){
							console.log(e);
						}
						if(allowSearch=="N"){
							$("#sn-search-fields").submit();
							return false;
						}
					}
					var parentid="SC-data-container"
                    if (refby == "Y") {
						parentid="SC-add-table-popup";
                        referredsearchfields();
                    } else {
						 parentid="SC-data-container";
                        searchfields();
                    }

                    $("body").trigger('Custom.Start');
                    var searchObj = [];
                    var finalObj = {};
                    $("."+parentid).find("select[id*='field']").each(function() {
                        var fname = $(this).val();
                        var fvalue = $(this).next().val();
                        fvalue = $.trim(fvalue);

                        var phonespec = "";
						var emailspec = "";
                        if (fname !== "" && fvalue !== "" && fvalue !== undefined && fname !== undefined) {
                            if (fname == "Phone Number") {
                                if (refby == "Y")
                                    var phone = ["Primary Contact Cellular Phone #", "Primary Contact Home Phone #", "Primary Contact Work Phone #"];
                                else
                                    var phone = ["Cellular Phone #", "Work Phone #", "Home Phone #"];
                                for (i = 0; i < phone.length; i++) {
                                    if (i < phone.length - 1) {
                                        phonespec = phonespec + "[" + phone[i] + "] Like '" + fvalue + "' OR "
                                    } else {
                                        phonespec = phonespec + "[" + phone[i] + "] Like '" + fvalue + "'";
                                    }
                                }
                                if (refby == "Y") {
                                    searchObj.push({
                                        "field_name": "Cellular Phone #",
                                        "value": phonespec
                                    });
                                } else {
                                    searchObj.push({
                                        "field_name": "Mobile Phone #",
                                        "value": phonespec
                                    });
                                }

                            } else if (fname == "Customer Number" || fname == "Employee Number") {
                                fvalue = fvalue + "*";
                                searchObj.push({
                                    "field_name": fname,
                                    "value": fvalue
                                });
                            }
                            //SCHERKU: for date of first activity field
                            else if (fname == "Date Of First Activity") {
                                fvalue = fvalue;
                                searchObj.push({
                                    "field_name": fname,
                                    "value": fvalue
                                });
                            } else if (fname == "Email Address") {
                                fvalue = fvalue;
								//Sukumar Added for Alt Email Address Search
								var email = ["Email Address", "Email Address 2"];
                                for (i = 0; i < email.length; i++) {
                                    if (i < email.length - 1) {
                                        emailspec = emailspec + "[" + email[i] + "] Like '" + fvalue + "' OR "
                                    } else {
                                        emailspec = emailspec + "[" + email[i] + "] Like '" + fvalue + "'";
                                    }
                                }
								//alert(emailspec);
                                searchObj.push({
                                    "field_name": fname,
                                    "value": emailspec
                                });
                            }
                            //VALLA : 15-JAN-2019 : Added to reduce the Performance on Postal Code, State and City Search
                            else if (fname == "Postal Code") {
                                fvalue = fvalue + "*";
                                searchObj.push({
                                    "field_name": "Postal Code",
                                    "value": fvalue
                                });
                            } else if (fname == "State") {
                                fvalue = fvalue.toUpperCase() + "*";
                                searchObj.push({
                                    "field_name": "State",
                                    "value": fvalue
                                });
                            } else if (fname == "City") {
                                fvalue = fvalue.toUpperCase() + "*";
                                searchObj.push({
                                    "field_name": "City",
                                    "value": fvalue
                                });
                            } else {
                                fvalue = fvalue.toUpperCase() + "*";
                                //SJAKKIDI: Start Added for appostrophe text field values
                                fvalue = '"' + fvalue + '"';
                                //SJAKKIDI: End Added for appostrophe text field values
                                searchObj.push({
                                    "field_name": fname,
                                    "value": fvalue
                                });
                            }
                        }
                    });

                    if (searchObj.length > 0) {
                        for (var i = 0; i < searchObj.length; i++) {
                            finalObj[searchObj[i].field_name] = searchObj[i].value;
                        }
                    }

                    FieldQueryPair = finalObj;
                    if (refby == "Y") {
                        SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC LOY Member List Applet");
                    } else {
                        SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Contact List Applet OUI");
                    }
                }

                // to store the html in local storage
                function storesearchfields() {
                    $("input[type=text]").each(function() {
                        $(this).attr("value", $(this).val());
                        if ($(this).hasClass("hasDatepicker")) {
                            $(this).removeClass("hasDatepicker");
                        }
                    });

                    $("select option").each(function() {
                        if ($(this).attr("selected") == "selected")
                            $(this).attr("selected", "true");
                        else
                            $(this).removeAttr("selected");
                    });
                    localStorage.setItem('SearchFields', $('#searchfields').html());
                    localStorage.setItem('sFields', sFields);
                    localStorage.setItem('Next', next);
                }

                // to store the html in local storage
                function searchfields() {
                    $("input[type=text]").each(function() {
                        $(this).attr("value", $(this).val());
                    });

                    $("select option").each(function() {
                        if ($(this).attr("selected") == "selected")
                            $(this).attr("selected", "true");
                        else
                            $(this).removeAttr("selected");
                    });
                }

                function referredsearchfields() {
                    $("#sc-referred-search-box").each(function() {
                        $(this).attr("value", $(this).val());
                    });

                    $("#sc-select-box").each(function() {
                        if ($(this).attr("selected") == "selected")
                            $(this).attr("selected", "true");
                        else
                            $(this).removeAttr("selected");
                    });
                }

                return SCContactListAppletPR;
            }());
            return "SiebelAppFacade.SCContactListAppletPR";
        })
}