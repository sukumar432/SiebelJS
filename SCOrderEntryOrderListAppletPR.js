/****************************************************
	CREATED BY SCHERKU
	CREATED FOR SC SALES EFFICIENCY OPEN UI
	CREATED ON 10/10/2017

****************************************************/
if (typeof(SiebelAppFacade.SCOrderEntryOrderListAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryOrderListAppletPR");
    define("siebel/custom/SelectComfort/SCOrderEntryOrderListAppletPR", ["siebel/jqgridrenderer", "siebel/phyrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods", "siebel/custom/SelectComfort/SCSalesOrderSearchMarkup", "siebel/custom/SelectComfort/SC_OUI_Definitions", "siebel/custom/SelectComfort/SC_OUI_Markups", "siebel/custom/SelectComfort/bootstrap.min", "siebel/custom/SelectComfort/jquery.validate.min", "siebel/custom/SelectComfort/SCErrorCodes"],
        function() {
            SiebelAppFacade.SCOrderEntryOrderListAppletPR = (function() {
                var pm = "",
                    Appletid = "",
                    recordset = "",
                    controlset = "",
                    headermarkup = "",
                    mainmarkup = "",
                    storechangemarkup = "",
                    a = "",
                    ssearchfields = "",
                    FieldQueryPair, i = 0,
                    StoreLocation = "",
                    LoginId;
                var b = true,
                    c = true,
                    d = true,
                    e = true,
                    f = true,
                    g = true,
                    h = true,
                    i = true,
                    j = true,
                    k = true,
                    l = true,
                    m = true,
                    n = true,
                    o = true,
                    p = true,
                    q = true,
                    r = true,
                    s = true,
                    t = true,
                    u = true,
                    v = true,
                    w = true,
                    x = true,
                    y = true,
                    z = true,
                    a1 = true,
                    b1 = true,
                    c1 = true,
                    d1 = true;
                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
                var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
                var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
                var SCSalesOrder = SiebelJS.Dependency("SiebelApp.SCSalesOrderSearchMarkup");
                var sFields = [],
                    next = 1,
                    searchCount = 2,
                    scstoreUser;;
                var OrderSearchFields;
				var orderIdlen = 0;

                function SCOrderEntryOrderListAppletPR(pm) {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCOrderEntryOrderListAppletPR, SiebelAppFacade.JQGridRenderer);
                SCOrderEntryOrderListAppletPR.prototype.Init = function() {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.Init.apply(this, arguments);
                    sFields = ['Order #', 'Order Date'];
                    //SCOUIMethods.SCGetProfileAttr("Primary responsibility Name,SC Store Number,Login Name,SC Store User,SC Primary Division Type,DISALocFound,First Name,Last Name");
                    LoginId = SCOUIMethods.SCGetProfileAttrValue("Login Name");
                    OrderSearchFields = localStorage.getItem("OrderSearchFields");
                    localStorage.setItem('OrderSearchFields', "");
                    pm = this.GetPM();
                    localStorage.setItem('whitescreen', 0);
                    $("#_sweview").hide();
                }

                SCOrderEntryOrderListAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.ShowUI.apply(this, arguments);
                    $(".whitescreentimer").remove();
                    $("#custommaskoverlay").hide();
                    $("#_sweview").show();
                    scstoreUser = SCOUIMethods.SCGetProfileAttrValue("SC Store User");
                    //hiding tool tip.
                    $('div[title="All Sales Orders"]').attr("title", "");
                    $('div[title="My Sales Orders"]').attr("title", "");


                    SiebelJS.Log("In Show UI" + Appletid);
                    Appletid = pm.Get("GetFullId");
                    recordset = pm.Get("GetRecordSet");
                    mainmarkup = SCSalesOrder.SCSalesOrderSearchMarkup();
                    var StoreUser = SCOUIMethods.SCGetProfileAttrValue('SC Store User');
                    var lastName = SCOUIMethods.SCGetProfileAttrValue('Last Name');
                    var firstName = SCOUIMethods.SCGetProfileAttrValue('First Name');
                    var loginName = SCOUIMethods.SCGetProfileAttrValue('Login Name');
                    var divsubtype = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Sub Type');
					var bIsAllSalesPilot = SCOUIMethods.AllSalesOrderPilot();
					
                    headermarkup = SCOUIMarkups.Header_block("SalesOrder", StoreUser, lastName, firstName, loginName, divsubtype);
                    storechangemarkup = SCOUIMarkups.StoreChange();
                    ssearchfields = SCOUIDefinitions.salesordersearchfields();

                    $("#_swescrnbar").hide();
                    $("#_swethreadbar").hide();
                    $(".siebui-button-toolbar").hide();
                    $("#_sweappmenu").hide();
                    $('#' + Appletid).append(mainmarkup);
                    $('.nav-header').html(headermarkup);
                    $('#SC-add-storelocation').html(storechangemarkup);

                    //Home button click function
                    $("#SC_HOME").click(function() {
                        localStorage.setItem('SearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order Number', 'Order Date'];
                        localStorage.setItem('whitescreen', 1);
                        $("#_swescrnbar").show();
                        $("#_swethreadbar").show();
                        $("#_sweappmenu").show();
                        $("#s_vctrl_div").show();
                        $(".siebui-button-toolbar").show();
                        if (scstoreUser == "Y")
                            SiebelApp.S_App.GotoView("User Profile Default View");
                        else
                            SiebelApp.S_App.GotoView("Home Page View (WCC)");
                    });

                    //Contacts button click function
                    $("#SC_CONTACTS").click(function() {
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        localStorage.setItem('SearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order Number', 'Order Date'];
                        SiebelApp.S_App.GotoView("SC Contact List View OUI");
                    });

                    /* //SalesOrder button click function
                    $("#SC_SALESORDERS").click(function(){
                    	
                    	SiebelApp.S_App.GotoView("SC Order Entry - All Orders View (Sales)");			  	  
                    }); */

                    //on button click of Accounts should go to parent view
                    $("#SC_ACCOUNTS").click(function() {
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        localStorage.setItem('SearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order Number', 'Order Date'];
                        SiebelApp.S_App.GotoView("SC All Accounts List View OUI");
                    });
                    
					//on button click of SalesOrder should go to parent view
                    $("#SC_SALESORDERS").click(function() {
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        localStorage.setItem('SearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order Number', 'Order Date'];
						SiebelApp.S_App.GotoView("SC Sales Order Search View OUI");
						/*if(bIsAllSalesPilot == "Y"){
							SiebelApp.S_App.GotoView("SC Order Entry - My Teams Orders View (Sales) OUI");
						}else{
							SiebelApp.S_App.GotoView("SC Sales Order Search View OUI");
						}*/
                    });
                    //SBOORLA:on click of open Regiser Button
                    $("#sc-cash-draw").click(function() {
                        SCOUIMethods.OpenCashDrawer();
                    });
                    //local storage is for pagination
                    localStorage.setItem('Records', 0);
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
					
					view = SiebelApp.S_App.GetActiveView().GetName();
					
                    //Markup for SalesOrder Search 
                    markup = "";
                    markup += '<div class="container SC-search-container row no-top-padding">';
                    markup += '           <div class="col-lg-2 col-md-2 no-padding">';
                    markup += '               <p class="SC-search-title margin-top">Search Sales Order</p>';
                    markup += '           </div>';
                    markup += '                            <div class="col-lg-8 col-md-10" id="searchfields">';
                    if (OrderSearchFields == undefined || OrderSearchFields == null || OrderSearchFields.length == 0){
                        markup += '                                <form name="search">';
                        markup += '                                   <div id="field">';
                        markup += '                                <select class="select-box scordersrc-select-box margin-top " id="field0" name="prof1">';
                        for (a = 0; a < ssearchfields.length; a++) {
                            if (a == 0) {
								if(ssearchfields[a] == "Order #"){
									markup += '<option id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '" selected="selected">' + ssearchfields[a] + '</option>';
								}else{
									markup += '<option class="searchhide" id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '" selected="selected">' + ssearchfields[a] + '</option>';
								}
                                
                            } else {
                               if(ssearchfields[a] == "Order #"){
									markup += '<option id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '">' + ssearchfields[a] + '</option>';
								}else{
									markup += '<option class="searchhide" id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '">' + ssearchfields[a] + '</option>';
								}
                                
                            }
                        }
                        markup += '                                </select>';
                        markup += '                                <input type="text" tabindex="1" id="ifield0" autocomplete="off" class="search-box margin-top">';
                        markup += '                                <div id="b1" class="add-more margin-top "></div>';
                        markup += '                            </div>';
                        markup += '                            <div id="field" class="searchhide">';
                        markup += '                                <select class="select-box scordersrc-select-box margin-top" id="field1" name="prof1">';
                        for (a = 0; a < ssearchfields.length; a++) {
                            if (a == 1) {
                                markup += '                                    <option id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '" selected="selected">' + ssearchfields[a] + '</option>';
                            } else {
                                markup += '                                    <option id="' + ssearchfields[a] + '" value="' + ssearchfields[a] + '">' + ssearchfields[a] + '</option>';
                            }
                        }
                        markup += '                                </select>';
                        markup += '                                <input type="text" tabindex="2" id="ifield1" autocomplete="off" class="search-box margin-top">';
                        markup += '                                <div id="b1" class="add-more margin-top add-box"> <span class="glyphicon glyphicon-plus-sign icon-img add-item" style="display:none"></span></div>';
                        markup += '                            </div>';
                        markup += '                        </form>';
                    } else {
                        markup += OrderSearchFields;
                    }
					
                    
					markup += '                    </div>';
                    markup += '            <div class="col-lg-2 col-md-2 no-padding sc-set-at-bottom">';
                    markup += '                <div>';
                    markup += '                    <button class="SC-search-button pull-right SC-disabled" id="sc-search">Search</button>';
                    markup += '                </div>';
                    markup += '            </div>';
                    markup += '        </div>';
                    markup += '        <p class="clearfix"></p>';
                    markup += '        <p class="clearfix no-margin"></p>';
                    markup += '        <div class="container SC-tabs-container">';
                    markup += '            <ul class="nav nav-pills nav-justified">';
                    
					if (view == "SC Sales Order Search View OUI") { //All Sales Orders
						markup += '				<li id="SC_Allsalesorders"><a href="javascript:void(0)" class="active">All Sales Orders<img src="images/custom/call-list.png" id="SC_Export_All_Orders" class="call-list-icon"></a></li>';
						markup += '				<li id="SC_Mysalesorders"><a href="javascript:void(0)"> My Sales Orders</a></li>';
						markup += '				<li id="SC_MyTeamSalesOrder"><a href="javascript:void(0)">My Teams Sales Orders</a></li>';
					} else if (view == "SC Order Entry - My Orders View (Sales) OUI") { //My Sales Orders
						markup += '				<li id="SC_Allsalesorders"><a href="javascript:void(0)" >All Sales Orders</a></li>';
						markup += '				<li id="SC_Mysalesorders"><a href="javascript:void(0)" class="active"> My Sales Orders</a></li>';
						markup += '				<li id="SC_MyTeamSalesOrder"><a href="javascript:void(0)">My Teams Sales Orders</a></li>';
					} else if (view == "SC Order Entry - My Teams Orders View (Sales) OUI" || view == "SC My Teams Orders List View (Sales) OUI") { // My Team Sales Orders
						markup += '				<li id="SC_Allsalesorders"><a href="javascript:void(0)">All Sales Orders</a></li>';
						markup += '				<li id="SC_Mysalesorders"><a href="javascript:void(0)"> My Sales Orders</a></li>';
						markup += '				<li id="SC_MyTeamSalesOrder"><a href="javascript:void(0)" class="active">My Teams Sales Orders</a></li>';
					}
                    
					markup += '           </ul>';
                    markup += '        </div>';
                    markup += '        <p class="clearfix no-margin"></p>';
                    markup += '        <div class="container data-table-container SC-table-main">';
                    markup += '            <div class="SC-table-with-scroll-main">';
                    markup += '             <table class="SC-table" id="SC-table-salesorder-search">';
                    markup += '                </table>';
                    markup += '           </div>';
                    markup += '       </div>';
                    markup += '       <div class="container">';
                    markup += '                    <div class="pagination sc-pagination pull-right" id="salespagination">';
                    markup += '                    </div>';
                    markup += '      </div>';

                    //$("#_swescrnbar").hide();
                    //$("#_swethreadbar").hide();
                    //$("#_sweappmenu").hide();
                    //$("#s_vctrl_div").hide();
                    // $(".siebui-button-toolbar").hide();
                    $("#_swecontent").css("height", "100%");
                    $("#_sweview").css("height", "100%");
                    //$('.SC-data-container').append(markup);
                    $('#s_' + Appletid + '_div').hide();
                    $('.SC-data-container').html(markup);
                    //$("#_sweview").css("cssText", "height:100% !important;");
					
					if(view == "SC Sales Order Search View OUI" && scstoreUser == "Y"){
						$('.searchhide').css('display','none');
						if ($("#field0 option[value='Order #']").parent().is("span")) {
							$("#field0 option[value='Order #']").unwrap("<span>");
						}
						$('#SC_Export_All_Orders').hide();
					}else{
						$('.searchhide').css('display','block');
						$('#SC_Export_All_Orders').show();
					}
					
                    SCTable(pm, recordset);
                    //SBOORLA:Added code for defect 604
                    //Start:Get the order date selected drop down id
                    var dateInptId = "";
                    $(".scordersrc-select-box").each(function() {
                        var dateid = $(this).attr("id");
                        if ($("#" + dateid + " option:selected").text() == "Order Date")
                            dateInptId = dateid;
                    });
                    //End:Get the order date selected drop down id
                    // hiding the dropdown values
                    //$( "#field1 option[value='Order #']" ).wrap( "<span>" );
                    //$("#field1 option[value='Order #']" ).attr('selected', 'selected');
                    $(".select-box").each(function() {
                        var value = $(this).val();
                        for (var i = 0; i < sFields.length; i++) {
                            if (value != sFields[i]) {
                                $("#" + $(this).attr("id") + " option[value='" + sFields[i] + "']").wrap("<span>");
                            }
                        }
                        $("#" + $(this).attr("id") + " option[value='" + value + "']").attr('selected', 'selected');
                    });

                    //local storage
                    if (localStorage.getItem('OrderNext') == null || localStorage.getItem('OrderNext') == undefined || localStorage.getItem('OrderNext') == 1) {
                        next = 1;
                    } else {
                        next = localStorage.getItem('OrderNext');
                    }

                    //Start:Appending DatePicker For Order Date 
                    $("#i" + dateInptId).datepicker({
                        onSelect: function() {
                            $(".search-box").trigger("keyup");
                        },
                        showButtonPanel: true
                    });
                    //End:Appending DatePicker For Order Date 
                    //Start:on focus out hiding the datepicker
                    $("#i" + dateInptId).focusout(function() {
                        if ($("#ifield1").hasClass("hasDatepicker"))
                            $("#ifield1 ~ .ui-datepicker").hide();
                    });
                    //End:on focus out hiding the datepicker
                    //Start:on scroll hiding the datepicker
                    $("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function() {
                        if ($("#i" + dateInptId).hasClass("hasDatepicker"))
                            $("#i" + dateInptId).datepicker("hide");
                    });
                    //End:on scroll hiding the datepicker
                    //START NGOLLA 10/05/2018 Added code for hiding DatePicker on tab
                    $("#i" + dateInptId).on('keydown', function(ev) {
                        if (ev.keyCode === 9) { //tab
                            if ($("#i" + dateInptId).hasClass("hasDatepicker"))
                                $("#i" + dateInptId).datepicker("hide");
                        }
                    });
                    //END NGOLLA 10/05/2018 Added code for hiding DatePicker on tab
                    //Start:enabling search box
                    $(".search-box").each(function() {
                        if ($(this).val().length != 0 && $(this).val() != "*") {
                            $("#sc-search").removeClass('SC-disabled');
                            return false;
                        } else {
                            $("#sc-search").addClass('SC-disabled');
                        }
                    });
                    //End:enabling search box
                    //adding search fields onclick of +
                    $(".icon-img").click(function(e) {
                        if (searchCount <= ssearchfields.length - 1) {
                            e.preventDefault();
                            next = parseInt(next);
                            var addto = "#ifield" + next;
                            var addRemove = "#ifield" + (next);
                            var Orderdate = "N";
                            next = parseInt(next) + 1;
                            
							var newIn = '<select class="select-box scordersrc-select-box margin-top searchhide" autocomplete="off" id="field' + next + '" name="field' + next + '">';
                            for (i = 0; i < ssearchfields.length; i++) {
                                newIn += '<option value="' + ssearchfields[i] + '">' + ssearchfields[i] + '</option>';
							}
							
                            newIn += '</select><input type="text" tabindex="' + (next + 1) + '" id="ifield' + next + '" autocomplete="off" class="search-box margin-top">';
                            var newInput = $(newIn);
                            var removeBtn = '<div id="remove' + (next - 1) + '" class="remove-me margin-top"> <span id="removeicon" class="glyphicon glyphicon-minus-sign icon-img-remove"></span></div>';
                            var removeButton = $(removeBtn);
                            $(addto).after(newInput);
                            $(addRemove).after(removeButton);
                            
							for (var j = 0; j < sFields.length; j++) {
                                $("#field" + next + " option[value='" + sFields[j] + "']").wrap("<span>");
                            }
							
                            var e = document.getElementById("field" + next);
                            var seletedvalue = e.options[e.selectedIndex].value;
                            $("#field" + next + " option[value='" + seletedvalue + "']").attr('selected', 'selected');
                            if (seletedvalue == "Order Date") {
                                Orderdate = 'Y';
							}
							
                            $(".select-box").each(function() {
                                $(this).attr("id"); //this.id
                                SiebelJS.Log($(this).attr("id"));
                                if ($(this).attr("id") != "field" + next) {
                                    SiebelJS.Log($(this).attr("id"));
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                }
                            });

                            sFields.push(seletedvalue);
                            if (Orderdate == 'Y') {
                                $("#ifield" + next).datepicker({
                                    onSelect: function() {
                                        $(".search-box").trigger("keyup");
                                    },
                                    showButtonPanel: true
                                });
                            }
							
                            $(".add-item").hide();
                            $("#pfield" + next - 1).attr('data-source', $(addto).attr('data-source'));
                            $("#count").val(next);
                            searchCount++;
                            localStorage.setItem('OrderSearchCount', searchCount);
                            localStorage.setItem('OrderNext', next);
                            localStorage.setItem('OrdersFields', sFields);
                        }
                    });


                    // Removing the search fields onclik of - icon
                    $(document).unbind('.remove-me').on('click', '.remove-me', function(e) {
                        e.preventDefault();
                        var idString = this.id.toString();

                        var fieldNum = idString.substring(6, idString.length);
                        var fieldID = "#field" + fieldNum;
                        var ifieldID = "#ifield" + fieldNum;

                        var e = document.getElementById("field" + fieldNum);
                        var seletedvalue = e.options[e.selectedIndex].value;
                        $(".select-box").each(function() {
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
                        searchCount--;

                        $("select option").each(function() {
                            if ($(this).attr("selected") == "selected")
                                $(this).prop("selected", true);
                            else
                                $(this).removeAttr("selected");
                        });
                    });
					
					if(view == "SC Sales Order Search View OUI" && scstoreUser == "Y"){
						$('.searchhide').css('display','none');
						if ($("#field0 option[value='Order #']").parent().is("span")) {
							$("#field0 option[value='Order #']").unwrap("<span>");
						}
						$('#field0').val('Order #');
						$('#SC_Export_All_Orders').hide();
					}else{
						$('.searchhide').css('display','block');
						$('#SC_Export_All_Orders').show();
					}
					
					if(view == "SC Sales Order Search View OUI" && scstoreUser == "Y"){
						if(OrderSearchFields != "" && OrderSearchFields != undefined && OrderSearchFields != null && OrderSearchFields.length != 0){
							$("#sc-search").click();
						}
					}
					

                    $(document).ready(function() {
                        $('#selectMe').change(function() {
                            $('.group').hide();
                            $('#' + $(this).val()).show();
                        })
                    });
                    //Start:on paste of search boxes	
                    $(document).on('paste', '.search-box', function(event) {
                        setTimeout(function() {
                            $(".search-box").trigger("keyup");
                        }, 100);
                    })
                    //End:on paste of search boxes
                    $(document).on('keyup', '.search-box', function(event) {
                        //when enter is pressed in search boxes
                        if (event.keyCode === 13) {
                            if (!$("#sc-search").hasClass("SC-disabled"))
                                $("#sc-search").trigger("click");
                        }
                        selectedFieldId = $(this).attr("id").substring(1, $(this).attr("id").length);
                        var e = document.getElementById(selectedFieldId);
                        var selectedvalue = e.options[e.selectedIndex].value;
                        //NGOLLA commented the code for defect no:737
                        /*if(selectedvalue == "Order #" || selectedvalue == "Ship To Customer Number" || selectedvalue == "Bill To Customer Number" || selectedvalue == "Ship to Secondary Phone #1" || selectedvalue == "Ship To Mobile Phone" || selectedvalue == "Ship to Secondary Phone #2" || selectedvalue == "Total Balance Due" || selectedvalue == "Order Total"){
                        	this.value = this.value.replace(/[^0-9\.]/g,'');
                        }*/
                        if (selectedvalue == "Order Date" || selectedvalue == "Status As Of") {
                            this.value = this.value.replace(/[a-zA-Z ]+/g, '');
                        }

                        //for hiding and showing '+' and '-' icons	
                        if ($(this).attr("id") != "ifield0" && $("#ifield0").val().length != 0 && $("#ifield0").val() != "*" && $(this).val().length != 0 && $(this).val() != "*") {
                            if (searchCount != ssearchfields.length) {
                                $(".add-item").show();
                            } else {
                                $("#removeicon").show();
                            }
                        } else if ($(this).attr("id") == "ifield0" && $("#ifield0").val().length != 0) {
                            $(".search-box").each(function() {
                                if ($(this).attr("id") != "ifield0") {
                                    if ($(this).val().length != 0 && $(this).val() != "*") {
                                        $(".add-item").show();
                                    }
                                }
                            });
                        } else {
                            $(".add-item").hide();
                        }

                        // enabling search box
                        $(".search-box").each(function() {
                            if ($(this).val().length != 0 && $(this).val() != "*") {
                                $("#sc-search").removeClass('SC-disabled');
                                return false;
                            } else {
                                $("#sc-search").addClass('SC-disabled');
                            }
                        });
                    });
                    //to clear the search fields
                    $(document).on('click', '.nav-block', function() {
                        SiebelJS.Log("Reseting Local Storage variables");
                        localStorage.setItem('SearchCount', 2);
                        localStorage.setItem('Next', 1);
                        sFields = ['Order Number', 'Order Date'];

                    });
                    //on click of order number
                    $(document).on("click", "#searchordernumdrilldown", function() {
                        var trid = $(this).closest('tr').prop('class');
                        /* var rowvalue = trid.split("w");
						rowvalue=rowvalue[1];
						var tableid = $("#"+Appletid).find(".ui-jqgrid-bdiv table").attr("id");//new
						SiebelJS.Log(tableid);
						$("#"+tableid+" #"+rowvalue+"").trigger("click"); */

                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        $("#_sweview").css("overflow", "auto");
                        trid = trid.split(" ");
                        trid = trid[0];
                        var FieldQueryPair = {
                            "Order Date": "Id='" + trid + "'"
                        };
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
						var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                        if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI")
							SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC My Teams Orders List Applet (Sales) OUI");
						else
							SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Order Entry - Order List Applet (Sales) OUI");
						 setTimeout(function() {
							if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI"){
								var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC My Teams Orders List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
							}
							else{
								var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
							}
                            Order_PMinstance.ExecuteMethod("OnDrillDown", 'Order Number', 0);
                            //Reseting Local Storage variables
                            localStorage.setItem('OrderSearchCount', 2);
                            localStorage.setItem('OrderNext', 1);
                            sFields = ['Order #', 'Order Date']
                        }, 1000);
                    });
                    //Start: on Select record changing the color
                    $(document).on('click', '#SC-table-salesorder-search tr', function() {
                        $(this).addClass('cti-active').siblings().removeClass('cti-active');
                    });
                    //End: on Select record changing the color
                    //on click of Bill to Last Name 
                    $(document).on("click", "#billtoLNdrilldown", function(e) {
                        e.stopPropagation();
                        var trid = $(this).closest('tr').prop('id');
                        var rowvalue = trid.split("w");
                        rowvalue = rowvalue[1];
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        $("#_sweview").css("overflow", "auto");
                        var tableid = $("#" + Appletid).find(".ui-jqgrid-bdiv table").attr("id"); //new
                        SiebelJS.Log(tableid);
                        $("#" + tableid + " #" + rowvalue + "").trigger("click");
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                        if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI")
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC My Teams Orders List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
						else
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
							
                        Order_PMinstance.ExecuteMethod("OnDrillDown", 'SC Primary Bill To Last Name', rowvalue);
                        //Reseting Local Storage variables
                        localStorage.setItem('OrderSearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order #', 'Order Date']
                    });

                    //on click of Ship TO Last Name
                    $(document).on("click", "#shiptoLNdrilldown", function(e) {
                        e.stopPropagation();
                        var trid = $(this).closest('tr').prop('id');
                        var rowvalue = trid.split("w");
                        rowvalue = rowvalue[1];
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        $("#_sweview").css("overflow", "auto");
                        var tableid = $("#" + Appletid).find(".ui-jqgrid-bdiv table").attr("id"); //new
                        SiebelJS.Log(tableid);
                        $("#" + tableid + " #" + rowvalue + "").trigger("click");
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                        if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI")
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC My Teams Orders List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
						else
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
						Order_PMinstance.ExecuteMethod("OnDrillDown", 'SC Primary Ship To Last Name', rowvalue);
                        //Reseting Local Storage variables
                        localStorage.setItem('OrderSearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order #', 'Order Date']
                    });

                    //on click of Bill To Account
                    $(document).on("click", "#billtoaccountdrilldown", function(e) {
                        e.stopPropagation();
                        var trid = $(this).closest('tr').prop('id');
                        var rowvalue = trid.split("w");
                        rowvalue = rowvalue[1];
                        $("#_swecontent").css("cssText", "height:none;");
                        $("#_sweview").css("cssText", "height:none;");
                        $("#_sweview").css("overflow", "auto");
                        var tableid = $("#" + Appletid).find(".ui-jqgrid-bdiv table").attr("id"); //new
                        SiebelJS.Log(tableid);
                        $("#" + tableid + " #" + rowvalue + "").trigger("click");
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
                        if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI")
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC My Teams Orders List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
                        else
							var Order_PMinstance = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (Sales) OUI"].GetPModel().GetRenderer().GetPM();
						
						Order_PMinstance.ExecuteMethod("OnDrillDown", 'SC Bill To Account', rowvalue);
                        //Reseting Local Storage variables
                        localStorage.setItem('OrderSearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order #', 'Order Date']
                    });

                    //Search button click function
                    $("#sc-search").click(function(event) {
                        orderIdlen = 0;
						var searchObj = [];
                        var finalObj = {};
                        $("body").trigger('Custom.Start');
                        
						$("select[id*='field']").each(function() {
                            var fname = $(this).val();
							if (fname == "Bill To LN") {
                                fname = "Bill To Last Name";
                            } else if (fname == "Bill To Customer #") {
                                fname = "Bill To Customer Number";
                            } else if (fname == "Bill To FN") {
                                fname = "Bill To First Name";
                            } else if (fname == "Ship To FN") {
                                fname = "Ship To First Name";
                            } else if (fname == "Ship To LN") {
                                fname = "Ship To Last Name";
                            } else if (fname == "Ship To Customer #") {
                                fname = "Ship To Customer Number";
                            }else if (fname == "Alternate Phone #1") {
                                fname = "Ship to Secondary Phone #1";
                            }else if (fname == "Mobile Phone#") {
                                fname = "Ship To Mobile Phone";
                            }
                            var fvalue = $(this).next().val();
                            fvalue = $.trim(fvalue);
							
							if(fname == "Order #"){
								orderIdlen = fvalue.length;
							}

                            if (fname !== "" && fvalue !== "" && fvalue !== undefined && fname !== undefined) {
                                if (fname == "Order Date" || fname == "Status As Of" || fname == "Total Balance Due" || fname == "Order Total") {
                                    fvalue = fvalue;
								} else {
                                    //SJAKKIDI: Start Added for appostrophe text field values
                                    fvalue = '"' + fvalue + '*" OR ' + '"' + fvalue.toUpperCase() + '*"';

                                }
                                searchObj.push({
                                    "field_name": fname,
                                    "value": fvalue
                                });
                            }
                        });
                        if (searchObj.length > 0) {
                            for (var i = 0; i < searchObj.length; i++) {
                                finalObj[searchObj[i].field_name] = searchObj[i].value;
                            }
                        }
                        SiebelJS.Log(finalObj);
                        FieldQueryPair = finalObj;
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
						if( view == "SC Sales Order Search View OUI" && (customerType == "STORE" || customerType == "SHOW")){
							if(orderIdlen == 11){
								SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Order Entry - Order List Applet (Sales) OUI");
								
							}else{
								$("body").trigger('Custom.End');
							}
						}else{
							var ActiveView = SiebelApp.S_App.GetActiveView().GetName();
							if (customerType == 'STORE' && ActiveView == "SC My Teams Orders List View (Sales) OUI")
								SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC My Teams Orders List Applet (Sales) OUI");
							else
								SCOUIMethods.ExecuteListAppletFrame(SiebelConstant, FieldQueryPair, "SC Order Entry - Order List Applet (Sales) OUI");
								
						}
					});

                    //onclick of profile
                    $("#SC-profile").click(function() {
                        //navigation to store report
                        var customerName = SCOUIMethods.SCGetProfileAttrValue("SC Store Number");
                        var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
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
                        SiebelJS.Log("in log");
                        SiebelApp.S_App.LogOff();
                    });


                    //Code to remove logout popup
                    $(document).click(function(e) {
                        if (!$(e.target).closest('#SC-profile, .SC-Profile-container').length) {
                            $(".SC-Profile-container").hide();
                        }
                    });


                    //StoreLocation = SCOUIMethods.StoreName(LoginId);
                    StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");


                    //on selecting the store for change of store
                    var selectstoreid = "";
                    $("#SC-storelocation tr").click(function() {
                        $(this).addClass('cti-active').siblings().removeClass('cti-active');
                        selectstoreid = $(this).attr('id');

                        SiebelJS.Log("Clicked on select store row" + selectstoreid);
                    });

                    //on click of enter on store search
                    $("#SC-Store-Search").keyup(function(event) {
                        if (event.keyCode === 13) {
                            $("#SC-storelocation").show();
                            var value = document.getElementById('SC-Store-Search').value;
                            markup = SCOUIMarkups.StoreChange2(value);
                            $("#SC-storelocation").html(markup);
                            $("#SC-storelocation tr").click(function() {
                                $(this).addClass('cti-active').siblings().removeClass('cti-active');
                                selectstoreid = $(this).attr('id');
                                SiebelJS.Log("Clicked on select store row" + selectstoreid);
                            });
                        }
                    });

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

                    //Add store Location modal open
                    $("#SC-add-store-location").click(function() {
                        //StoreLocation = SCOUIMethods.StoreName(LoginId);
                        StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
                        $("#SC-add-storelocation").modal({
                            backdrop: 'static'
                        });
                        if (StoreLocation != "") {
                            document.getElementById('StoreTitle').innerHTML = StoreLocation;
                            $("#StoreTitle").attr("title", StoreLocation);
                        } else {
                            document.getElementById('StoreTitle').innerHTML = "Add Store Location";
                        }
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

                    // nullifying Store markup
                    $(".SC-close-popup").click(function() {
                        $("#SC-Store-Search").val('');
                        $("#SC-storelocation").html("");
                    });


                    //Below code is to sort the fields
                    $(document).on("click", ".sort-by", function() {
                        var sortField;
                        var sortOrder;


                        if ($(this).attr('id') == "sortstore") {
                            if (d == true) {
                                sortField = "SC Store #";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                d = false;
                            } else {
                                sortField = "SC Store #";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                d = true;
                            }
                        } else if ($(this).attr('id') == "sortbilltoaccount") {
                            if (g == true) {
                                sortField = "SC Bill To Account";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                g = false;
                            } else {
                                sortField = "SC Bill To Account";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                g = true;
                            }
                        } else if ($(this).attr('id') == "sortorder") {
                            if (l == true) {
                                sortField = "Order Number";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                l = false;
                            } else {
                                sortField = "Order Number";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                l = true;
                            }
                        } else if ($(this).attr('id') == "sortorderdate") {
                            if (m == true) {
                                sortField = "Order Date";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                m = false;
                            } else {
                                sortField = "Order Date";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                m = true;
                            }
                        } else if ($(this).attr('id') == "sortstatus") {
                            if (p == true) {
                                sortField = "Status";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                p = false;
                            } else {
                                sortField = "Status";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                p = true;
                            }
                        } else if ($(this).attr('id') == "sortholdreason") {
                            if (q == true) {
                                sortField = "SC Hold Reason";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                q = false;
                            } else {
                                sortField = "SC Hold Reason";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                q = true;
                            }
                        } else if ($(this).attr('id') == "sortbilllastname") {
                            if (r == true) {
                                sortField = "SC Primary Bill To Last Name";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                r = false;
                            } else {
                                sortField = "SC Primary Bill To Last Name";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                r = true;
                            }
                        } else if ($(this).attr('id') == "sortshiplastname") {
                            if (s == true) {
                                sortField = "SC Primary Ship To Last Name";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                s = false;
                            } else {
                                sortField = "SC Primary Ship To Last Name";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                s = true;
                            }
                        } else if ($(this).attr('id') == "sortshipfirstname") {
                            if (t == true) {
                                sortField = "SC Primary Ship To First Name";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                t = false;
                            } else {
                                sortField = "SC Primary Ship To First Name";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                t = true;
                            }
                        } else if ($(this).attr('id') == "sortshipaddress") {
                            if (u == true) {
                                sortField = "SC Con Ship To Address";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                u = false;
                            } else {
                                sortField = "SC Con Ship To Address";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                u = true;
                            }
                        } else if ($(this).attr('id') == "sortshipcity") {
                            if (v == true) {
                                sortField = "SC Primary Ship To City";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                v = false;
                            } else {
                                sortField = "SC Primary Ship To City";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                v = true;
                            }
                        } else if ($(this).attr('id') == "sortshipstate") {
                            if (w == true) {
                                sortField = "SC Primary Ship To State";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                w = false;
                            } else {
                                sortField = "SC Primary Ship To State";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                w = true;
                            }
                        } else if ($(this).attr('id') == "sortshippostalcode") {
                            if (x == true) {
                                sortField = "SC Primary Ship To Postal Code";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                x = false;
                            } else {
                                sortField = "SC Primary Ship To Postal Code";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                x = true;
                            }
                        } else if ($(this).attr('id') == "sortshipsecondary1") {
                            if (y == true) {
                                sortField = "SC Primary Ship To Home Phone";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                y = false;
                            } else {
                                sortField = "SC Primary Ship To Home Phone";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                y = true;
                            }
                        } else if ($(this).attr('id') == "sortmobilephone") {
                            if (z == true) {
                                sortField = "SC Primary Ship To Cellular Phone";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                z = false;
                            } else {
                                sortField = "SC Primary Ship To Cellular Phone";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                z = true;
                            }
                        } else if ($(this).attr('id') == "sortbillemailaddress") {
                            if (b1 == true) {
                                sortField = "SC Primary Bill To Email Address";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                b1 = false;
                            } else {
                                sortField = "SC Primary Bill To Email Address";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                b1 = true;
                            }
                        } else if ($(this).attr('id') == "sortpo") {
                            if (c1 == true) {
                                sortField = "SC Purchase Order Number";
                                sortOrder = "SortAscending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                c1 = false;
                            } else {
                                sortField = "SC Purchase Order Number";
                                sortOrder = "SortDescending";
                                SCOUIMethods.SortRecords(pm, sortField, sortOrder);
                                c1 = true;
                            }
                        } else {
                            SiebelJS.Log("Not Sorted");
                        }

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

                } //show ui close




                SCOrderEntryOrderListAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.BindData.apply(this, arguments);

                    markup = "";
                    recordset = pm.Get("GetRecordSet");
                    $("body").trigger('Custom.End');
                    //initial message in search table
                    if ($("#sc-search").hasClass("SC-disabled")) {
                        var markup = SCOUIMarkups.InitialMessage(pm, "SalesOrder");
                        $("#SC-table-salesorder-search").html(markup);
                        $("#salespagination").hide();
                    } else if (recordset.length == 0) {
                        markup = SCOUIMarkups.ResultsMessage(pm, FieldQueryPair, "SalesOrder");
                        $('#SC-table-salesorder-search').html(markup);
                        $("#salespagination").hide();
                    } else {
                        SCOUIMethods.PrimaryButton(pm, "salespagination");
                        SCTable(pm, recordset);
                    }
                }

                SCOrderEntryOrderListAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.BindEvents.apply(this, arguments);

                    // dynamic values change for dropdowns
                    $(document).on('click', '.select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        currentValue = e.options[e.selectedIndex].value;

                    });
                    //SNARRA:29-10-2018 Start: show CTI Toolbar
                    $(document).on('click', '#SC-ANI-CTItool', function() {
                        $(this).find('img').toggle();
                        $('#tb_1')[0].click();
                        setTimeout(function() {
                            $('#commPanelDockToShowpin').click();
                        }, 500);
                    });
                    $(document).on('click', '#commPanelCloseToggle', function() {
                        $("#SC-ANI-CTItool").find('img').toggle();
                    });
                    //on click of export button
                    $(document).on("click", "#SC_Export_All_Orders", function(e) {
                        localStorage.setItem('whitescreen', 1);
                        e.stopPropagation();
                        $("#_swescrnbar").show();
                        $("#_swethreadbar").show();
                        $("#_sweappmenu").show();
                        $("#s_vctrl_div").show();
                        $(".siebui-button-toolbar").show();
                        SiebelApp.S_App.GotoView("SC Order Entry - All Orders Export View OUI", "", "", "");
                    });
                    //on click of All orders
                    $(document).on("click", "#SC_Allsalesorders", function(e) {
                        storesearchfields();
                        SiebelApp.S_App.GotoView("SC Sales Order Search View OUI", "", "", "");
                    });
                    //on click of my orders
                    $(document).on("click", "#SC_Mysalesorders", function(e) {
                        storesearchfields();
                        SiebelApp.S_App.GotoView("SC Order Entry - My Orders View (Sales) OUI", "", "", "");
                    });
                    //on click of my team orders
                    $(document).on("click", "#SC_MyTeamSalesOrder", function(e) {
                        storesearchfields();
						var customerType = SCOUIMethods.SCGetProfileAttrValue("SC Primary Division Type");
                        if (customerType == 'STORE')
							SiebelApp.S_App.GotoView("SC My Teams Orders List View (Sales) OUI", "", "", "");
						else
							SiebelApp.S_App.GotoView("SC Order Entry - My Teams Orders View (Sales) OUI", "", "", "");
				    });
                    //SBOORLA: changed class name  for defect 604 
                    $(document).on('change', '.scordersrc-select-box', function() {
                        var currentid = this.id;
                        var e = document.getElementById(currentid);
                        var seletedvalue = e.options[e.selectedIndex].value;
                        $(".select-box").each(function() {
                            $(this).attr("id"); //this.id
                            if ($(this).attr("id") != currentid) {
                                if (!($("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").parent().is("span")))
                                    $("#" + $(this).attr("id") + " option[value='" + seletedvalue + "']").wrap("<span>");
                                SiebelJS.Log("Id:" + $(this).attr("id"));
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
                    //SBOORLA: changed class name  for defect 604
                    $(document).on('change', '.scordersrc-select-box', function() {
                        var id = $(this).attr('id');
                        $("#i" + id).val("");
                    });
                    // clear local storage on browser close
                    $(window).on('unload', function(event) {
                        SiebelJS.Log("Reseting Local Storage variables");
                        localStorage.setItem('OrderSearchCount', 2);
                        localStorage.setItem('OrderNext', 1);
                        sFields = ['Order #', 'Order Date']
                    });
                    //SBOORLA: changed class name  for defect 604
                    //Start: Code for Date Picker On Order Date
                    $(document).on('change', '.scordersrc-select-box', function() {
                        var id = $(this).attr('id');
                        SiebelJS.Log(id);
                        if ($("#" + id).val() == "Order Date") {
                            $("#i" + id).datepicker({
                                onSelect: function() {
                                    $(".search-box").trigger("keyup");
                                },
                                showButtonPanel: true
                            });
                            //Start:on focus out hide the datepicker
                            var dateid = "#i" + id;
                            $("#i" + id).focusout(function() {
                                if ($("#i" + id).hasClass("hasDatepicker"))
                                    $(dateid + " ~ .ui-datepicker").hide();
                            });
                            //End:on focus out hide the datepicker
                        } else {
                            if ($("#i" + id).hasClass("hasDatepicker")) {
                                $("#i" + id).datepicker("destroy");
                            }
                        }
                    });
                    //End: Code for Date Picker On Order Date
                }
                // to show data in Sales Order table
                function SCTable(pm, recordset) {
                    if (recordset.length >= 1) {
                        var sctablemarkup = "";
                        sctablemarkup += '                            <thead>';
                        sctablemarkup += '                              <tr>';
                        sctablemarkup += '                                <th class="sort-by" id="sortorder">Order #</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortorderdate">Order Date</th>';
                        sctablemarkup += ' 								<th>Bill to Customer #</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortbilllastname">Bill to LN</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortbilltoaccount">Bill To Account</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortpo"> PO#</th>';
                        sctablemarkup += '                                <th>Order Total</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortstore">Store #</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortstatus">Status</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortholdreason">Hold Reason</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshiplastname">Ship To LN</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshipfirstname">Ship To FN</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshipaddress">Ship To Address</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshipcity">Ship To City</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshipstate">Ship To State</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshippostalcode">Ship To Postal Code</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortshipsecondary1">Ship to Secondary Phone #1</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortmobilephone">Ship To Mobile Phone</th>';
                        sctablemarkup += '                                <th class="sort-by" id="sortbillemailaddress">Bill To Email Address</th>';

                        sctablemarkup += '                               </tr>';
                        sctablemarkup += '                            </thead>';
                        sctablemarkup += '                              <tbody>';
                        for (i = 0; i < recordset.length && i < 10; i++) {
                            sctablemarkup += '                                 <tr id="row' + (i + 1) + '" class="' + recordset[i]["Id"] + '">';
                            if (recordset[i]["Order Number"] != null) {
                                sctablemarkup += '                                   <td><a href="javascript:void(0)" id="searchordernumdrilldown">' + recordset[i]["Order Number"] + '</a></td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Order Date"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Order Date"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["SC Bill To Customer Number"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["SC Bill To Customer Number"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Bill To Last Name"] != null) {
                                sctablemarkup += '                                   <td><a href="javascript:void(0)" id="billtoLNdrilldown">' + recordset[i]["Primary Bill To Last Name"] + '</a></td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Bill To Account"] != null) {
                                if (scstoreUser != "Y")
                                    sctablemarkup += '                                   <td><a href="javascript:void(0)" id="billtoaccountdrilldown">' + recordset[i]["Bill To Account"] + '</a></td>';
                                else
                                    sctablemarkup += '                                   <td>' + recordset[i]["Bill To Account"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["SC Purchase Order Number"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["SC Purchase Order Number"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Order Total"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Order Total"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["SC Location Store Number"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["SC Location Store Number"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Status"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Status"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Delivery Block"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Delivery Block"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To Last Name"] != null) {
                                sctablemarkup += '                                   <td><a href="javascript:void(0)" id="shiptoLNdrilldown">' + recordset[i]["Primary Ship To Last Name"] + '</a></td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To First Name"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To First Name"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["SC Con Ship To Address"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["SC Con Ship To Address"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To City"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To City"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To State"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To State"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To Postal Code"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To Postal Code"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To Home Phone"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To Home Phone"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Ship To Cellular Phone"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Ship To Cellular Phone"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            if (recordset[i]["Primary Bill To Email Address"] != null) {
                                sctablemarkup += '                                   <td>' + recordset[i]["Primary Bill To Email Address"] + '</td>';
                            } else {
                                sctablemarkup += '                                   <td></td>';
                            }
                            sctablemarkup += '                                 </tr>';
                        }
                        sctablemarkup += '                              </tbody>';
                        $('#SC-table-salesorder-search').html(sctablemarkup);
                    }
                }

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
                    localStorage.setItem('OrderSearchFields', $('#searchfields').html());
                }

                SCOrderEntryOrderListAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.SCOrderEntryOrderListAppletPR.superclass.EndLife.apply(this, arguments);
                    sFields = null;
                    if (localStorage.getItem('whitescreen') == 0) {
                        $("#_swescrnbar").hide();
                        $("#_swethreadbar").hide();
                        $("#_sweappmenu").hide();
                        $("#s_vctrl_div").hide();
                        $(".siebui-button-toolbar").hide();
                        $("#_sweview").hide();
                        //$("#_swecontent").css("height","auto");
                        $('#_swecontent').prepend(SCOUIMarkups.CustomWhiteScreenTimer());
                        $("#custommaskoverlay").show();
                    } else if (localStorage.getItem('whitescreen') == 1) {
                        $("#_swescrnbar").show();
                        $("#_swethreadbar").show();
                        $("#_sweappmenu").show();
                        $("#s_vctrl_div").show();
                        $(".siebui-button-toolbar").show();
                        //$("#_swecontent").css("height","auto");
                        $("#_sweview").show();
                    }
                    //unbind Events
                    $(document).unbind("click");
                    $(document).unbind("keyup");
                }

                return SCOrderEntryOrderListAppletPR;
            }());
            return "SiebelAppFacade.SCOrderEntryOrderListAppletPR";
        })
}