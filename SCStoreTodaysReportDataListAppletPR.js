//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=SCStoreTodaysReportDataListApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCStoreTodaysReportDataListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCStoreTodaysReportDataListAppletPR");
 define("siebel/custom/SelectComfort/SCStoreTodaysReportDataListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/moment","siebel/custom/SelectComfort/moment-timezone-with-data.min","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCStoreMarkup","siebel/custom/SelectComfort/SC_OUI_Markups",],
  function () {
   SiebelAppFacade.SCStoreTodaysReportDataListAppletPR = (function () {
	  
	var a=true,b=true,c=true,d=true,e=true,f=true,g=true,h=true,i=true,j=true,k=true,l=true,m=true,n=true,o=true,p=true,q=true;
	var InPS = SiebelApp.S_App.NewPropertySet();
	var OutPS = SiebelApp.S_App.NewPropertySet();
	var InPS1 = SiebelApp.S_App.NewPropertySet();
	var OutPS1 = SiebelApp.S_App.NewPropertySet();
	var InPS2 = SiebelApp.S_App.NewPropertySet();
	var OutPS2 = SiebelApp.S_App.NewPropertySet();
	var InPS3 = SiebelApp.S_App.NewPropertySet();
	var OutPS3 = SiebelApp.S_App.NewPropertySet();
	var InPS4 = SiebelApp.S_App.NewPropertySet();
	var OutPS4 = SiebelApp.S_App.NewPropertySet();
	var regcount;
	var todayid='';
	var Service,Service1,Service2,Service3,Service4,CurrentDate,time,time1,date,datetime,datetime1,CurrentDate_Header="",store_name,MachineNameValue,storename;
	var mainmarkup='';
	var storeid = new Array();
	var macinename = new Array();
	var createdby = new Array();
	var store = new Array();
	var cashexpecteed = new Array();
	var checkexpected = new Array();
	var ccexpected = new Array();
	var gcexpected = new Array();
	var bcexpected = new Array();
	var finexpected = new Array();
	var cashactual = new Array();
	var checkactual = new Array();
	var ccactual = new Array();
	var gcactual = new Array();
	var bcactual = new Array();
	var finactual = new Array();
	var comment = new Array();
	var SalesRepFN = new Array();
	var SalesRepLN = new Array();
	var daily_total=0,expected_daily_total=0,actual_daily_total=0,over_short_daily_total=0;
	var total_actual_sales = 0; 
	var v="";
	var rid1,rid2,rid3,rid4;
	var cash_act;
	var check_act;
	var cc_act;
	var gc_act;
	var bc_act;
	var finance_act;
	var cash_exp;
	var check_exp;
	var cc_exp;
	var gc_exp;
	var bc_exp;
	var finance_exp;
	var value_found =0;
	var pm='';
	var appletSeq='';
	var found_machine = false;
	var machine_lovvalue = "";
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
	var StoreMarkup = SiebelJS.Dependency("SiebelApp.SCStoreMarkup");
    var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	

    function SCStoreTodaysReportDataListAppletPR(pm) {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCStoreTodaysReportDataListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCStoreTodaysReportDataListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.Init.apply(this, arguments);
	
	 MachineNameValue = SiebelApp.S_App.GetProfileAttr("MachineInfo");
	 storename = MachineNameValue.indexOf("_");
	 //storename = parseInt(storename)+1;
	 store_name = MachineNameValue.substring(0,storename);
	 MachineNameValue = MachineNameValue.split("_");
	 MachineNameValue = MachineNameValue[0];
	 MachineNameValue = MachineNameValue+"_";
	 
    }

    SCStoreTodaysReportDataListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.ShowUI.apply(this, arguments);
		//hiding tool tip.
		$('div[title="Store Report View"]').attr("title","");
		var a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get("GetFullId");
		$("#"+a).hide();
		//Adding CustomerMarkup 
		customtimermarkup=SC_OUI_Markup.CustomTimer();
		$('#applet1').append(customtimermarkup);
		//loading waiting time
		$(document).ready(function (){
			$("body").bind('Custom.Start', function(ev) {
				SiebelJS.Log("Start");
			  $('#maskoverlay').show();
			});

			$("body").bind('Custom.End', function(ev) {
				SiebelJS.Log("Stop");
				$('#maskoverlay').hide();
			});
		});
		SiebelJS.Log("In show ui function of todays table");
		mainmarkup = StoreMarkup.StoreMainMarkup();
		pm=this.GetPM();
		var Appletid = pm.Get("GetFullId");
		appletSeq = Appletid[Appletid.length -1];
		SiebelJS.Log("todays applet id:"+Appletid);
		SiebelJS.Log("appletSeq:"+appletSeq);
		$('#s_'+Appletid+'_div').hide();
		CurrentDate = new Date();
		//CurrentDate_Header = moment().utc().format("MM/DD/YYYY HH:mmZ");
		CurrentDate_Header = moment(CurrentDate, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY HH:mm");
		SiebelJS.Log(CurrentDate_Header);
		
		var today_recordset=pm.Get("GetRecordSet");
		Sorting_Previous_Data(today_recordset);
		var today_recordset=pm.Get("GetRecordSet");
		//Sorting_Previous_Data(today_recordset);
		//todays table
		var value = Sorting_Tod_Data(today_recordset);
		SiebelJS.Log("after function value is:"+value);
		if(value==1)
		{
			SiebelJS.Log("value 1");
			var markup='';
			markup+='					<div class="SC-Generate-data-contanier clearfix" id="generate">';
			markup+='                            <img src="images/custom/printer.png" />';
			markup+='                            <p> Click Generate Data to proceed</p>';
			markup+='                            <button id="SC-generate-report">Generate Data</button>';
			markup+='                     </div>';
			$("#SC_Today-Report-table").html(markup);
		}
		//$("#sc-search").removeClass("SC-disabled");
    }

    SCStoreTodaysReportDataListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.BindData.apply(this, arguments);
	 
		today_recordset=pm.Get("GetRecordSet");
		Sorting_Previous_Data(today_recordset);
		//var paymentrecords = "";
		//paymentrecords=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		//Payment_details(paymentrecords,"1");
		//$("#trow1").next('tr.showhide').show('slow');
		//$("#trow1 td:nth-child(19)").find("img").attr("src", "images/custom/report-flag-white.png");
		//$("#trow1").addClass("main-bg");
		$(document).ready(function() {
			//on click of taoday table
			//$("#SC-today-report").click(function() {
			$(document).on("click","#SC-today-report",function(){
				$("#SC_Today-Report-table").show();
				 $("#SC-today-report").addClass("store-active");
				 $("#SC-previous-report").removeClass("store-active");
				$("#SC_Previous-Report-table").hide();
				$("#SC-Calendar").hide();
				$("#sc-search").show();
				$("#SC-Store-info").show();
				$(".container-pagination").hide();
			});
			//on click of previous table
			//$("#SC-previous-report").click(function() {
			$(document).on("click","#SC-previous-report",function(){
				$("body").trigger('Custom.Start');
				setTimeout(function() {
					SiebelJS.Log("in prev");
				$("#input_date_id").val("");
				$("#SC_Previous-Report-table").show();
				$("#SC-today-report").removeClass("store-active");
				$("#SC-previous-report").addClass("store-active");
				$("#SC-Calendar").show();
				$("#sc-search").hide();
				$("#SC_Today-Report-table").hide();
				$("#SC-Store-info").hide();
				$(".container-pagination").show();
				var today_recordset=pm.Get("GetRecordSet");
				Sorting_Previous_Data(today_recordset);
				},1000);
				$("body").trigger('Custom.End');	
			});
		});
    }

    SCStoreTodaysReportDataListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.BindEvents.apply(this, arguments);
	 
		$(document).ready(function() {
			//on button click of Home
			$('#SC_HOME').click(function(){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			//RCHATHAR: modiefied for navigating based on responsibility
			var storeUser =  SiebelApp.S_App.GetProfileAttr("SC Store User");
		    if(storeUser=="Y")
		    SiebelApp.S_App.GotoView("User Profile Default View");
		    else
		    SiebelApp.S_App.GotoView("Home Page View (WCC)");
			 /* InPS.SetProperty("View","Home Page View (WCC)"); 
			  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
			  OutPS = Service.InvokeMethod("GotoView",InPS);*/
			});
			//SBOORLA:on click of open Regiser Button
			$("#sc-cash-draw").click(function(){
				SCOUIMethods.OpenCashDrawer();
			});
			//on button click of Contacts
			$("#SC_CONTACTS").click(function(){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
				  InPS.SetProperty("View","SC Contact List View OUI"); 
				  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
				  OutPS = Service.InvokeMethod("GotoView",InPS);	
			});
			//on buttoh click of Accounts
			$("#SC_ACCOUNTS").click(function(){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
				  InPS.SetProperty("View","SC All Accounts List View OUI"); 
				  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
				  OutPS = Service.InvokeMethod("GotoView",InPS);	
			});
			//on button click of SaleOrders
			$("#SC_SALESORDERS").click(function(){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
				  InPS.SetProperty("View","SC Sales Order Search View OUI"); 
				  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
				  OutPS = Service.InvokeMethod("GotoView",InPS);	
			});
		});
		$(document).on("click","#sc-search",function(event){
			event.stopImmediatePropagation();
			var genid_sample = document.getElementsByClassName('main-bg-row')[0].id;
			SiebelJS.Log("genid_sample:"+genid_sample);
			var taid = genid_sample.split("w");
			taid = taid[1];
			var genid = parseInt(taid)-1;
			//{
				$("#sc-search").addClass("SC-disabled");
					$('#custommaskoverlay').show();
					setTimeout(function(){
					var mn_bs = today_recordset[genid]["Machine Name"];
					var rid_bs = today_recordset[genid]["Id"];
					if(mn_bs != null)
					{
						SiebelJS.Log("store name"+mn_bs);
						SiebelJS.Log("rowid"+rid_bs);
						var InPS3 = SiebelApp.S_App.NewPropertySet();
						var OutPS3 = SiebelApp.S_App.NewPropertySet();
						InPS3.SetProperty("bipmachinename",mn_bs);
						InPS3.SetProperty("biprowid",rid_bs);
						var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
						OutPS3 = Service3.InvokeMethod("SC BIP Report",InPS3);
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
						setTimeout(function() {
						$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
						setTimeout(function() {
							$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
						},1000);	
						},1000);
					}
					//SCHERKU: For defect to remove the colour of the row
					if(mn_bs == "R-ALL")
					{
						$("#SC-store-detail-table tbody tr").removeClass("main-bg");
						$("#SC-store-detail-table tbody tr").closest("tr").removeClass("main-bg-row");
						$("#trow1").parent().addClass("main-bg");
						$("#trow1").parent().closest("tr").addClass("main-bg-row");
					}
					$('#custommaskoverlay').hide();	
					},1000);
				//}
			});
		//on click of previous records
		$(document).on("click","#SC_Store-Info-table tbody tr",function(){
			var rowid = $(this).attr('id');
			$('#' + rowid).addClass('highlate-row').siblings().removeClass('highlate-row');
		});
		//on click of todays records
		//$("#SC-store-detail-table tbody tr").on('click', 'td:not(:nth-child(18))', function() {
		$(document).on("click","#SC-store-detail-table tbody tr td:not(:nth-child(18))", function(event){
			$("#sc-search").removeClass("SC-disabled");
			event.stopImmediatePropagation();
			var Machine_Name_Check = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().GetFieldValue("Machine Name");
			var machine_lovvalue = SCOUIMethods.GetLOVs2("[Type]= 'SC_REGISTER_NAME_LOV' and [Active] = 'Y' and [Name]='R-ALL'","");
			if(Machine_Name_Check != machine_lovvalue)
			{
				var currentId=$(this).parent().attr('id');
				var taid = currentId.split("w");
				taid = taid[1];
				if($(this).parent().next('tr').hasClass("showhide") ){	
					var hidden = $(this).parent().next('tr.showhide').is(":visible");
					if (hidden) {
						$(this).parent().removeClass("main-bg");
						$(this).parent().closest("tr").removeClass("main-bg-row");
						$(this).parent().next('tr.showhide').hide('slow');
						$('#' + currentId + " td:nth-child(19)").find("img").attr("src", "images/custom/report_flag.png");
					} 
					else {
						$("#SC-store-detail-table tbody tr").not(this).siblings().next('tr.showhide').hide('slow');
						$('#custommaskoverlay').show();
						setTimeout(function(){
						$(document).find("#s_"+appletSeq+"_l tr#"+taid+"").trigger("click");
						var paymentrecords = "";
						paymentrecords=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
						Payment_details(paymentrecords,taid);
						$('#custommaskoverlay').hide();	
						},500);
						
						$(this).parent().next('tr.showhide').show('slow');
						var selected = $(this).parent().hasClass("main-bg");
						$('#' + currentId + " td:nth-child(19)").find("img").attr("src", "images/custom/report-flag-white.png");
						$("#SC-store-detail-table tbody tr").removeClass("main-bg");
						$("#SC-store-detail-table tbody tr").closest("tr").removeClass("main-bg-row");
						$(this).parent().addClass("main-bg");
						$(this).parent().closest("tr").addClass("main-bg-row");
						
					}
				}
			}
			//SCHERKU: For generating report for the R-ALL record also
			else{
				var currentId=$(this).parent().attr('id');
				var taid = currentId.split("w");
				taid = taid[1];
				$('#custommaskoverlay').show();
				setTimeout(function(){
				$(document).find("#s_"+appletSeq+"_l tr#"+taid+"").trigger("click");
				$('#custommaskoverlay').hide();
				},1000);
				$("#SC-store-detail-table tbody tr").removeClass("main-bg");
				$("#SC-store-detail-table tbody tr").closest("tr").removeClass("main-bg-row");
				$(this).parent().addClass("main-bg");
				$(this).parent().closest("tr").addClass("main-bg-row");
			}
			
		});
		
		//on click of bip image button from previous table
		$(document).on("click",".bip_iamge", function(){
			var bipimageid = this.id;
			SiebelJS.Log("bipimageid:"+bipimageid);
			bipimageid = bipimageid.split("e");
			bipimageid = bipimageid[1];
			var genid = parseInt(bipimageid)-1;
			//for report generation starts
			$('#custommaskoverlay').show();
			setTimeout(function(){
			var today_recordset = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
				var mn_bs = today_recordset[bipimageid]["Machine Name"];
				var rid_bs = today_recordset[bipimageid]["Id"];
				if(mn_bs != null)
				{
					SiebelJS.Log("store name"+mn_bs);
					SiebelJS.Log("rowid"+rid_bs);
					var InPS3 = SiebelApp.S_App.NewPropertySet();
					var OutPS3 = SiebelApp.S_App.NewPropertySet();
					InPS3.SetProperty("bipmachinename",mn_bs);
					InPS3.SetProperty("biprowid",rid_bs);
					var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
					OutPS3 = Service3.InvokeMethod("SC BIP Report",InPS3);
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
					setTimeout(function() {
					$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
					setTimeout(function() {
						$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
					},1000);	
					},1000);
				}	
			$('#custommaskoverlay').hide();	
			},1000);			
		});
		//editing and saving detailed description  field
		$(document).on("focusout","#SC-store-detail-table tr",function(event) {
			//$("body").trigger('Custom.Start');
			//setTimeout(function() {
			event.stopImmediatePropagation();
			var Appletid_str=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().Get("GetFullId");
			SiebelJS.Log("Appletid_str:"+Appletid_str);
			var STR_appletSeq=Appletid_str[Appletid_str.length -1];
			SiebelJS.Log("STR_appletSeq:"+STR_appletSeq);
			var comments_id = $(this).attr('id');
			SiebelJS.Log("comments_id:"+comments_id);
			comments_id = comments_id.split("w");
			comments_id = comments_id[1];
			$("#s_"+STR_appletSeq+"_l tr#"+comments_id).trigger("click");
			
			SiebelJS.Log("comments_id:"+comments_id);
			comments_id = parseInt(comments_id)-1;
			var comment_att = document.getElementById("strcomment"+comments_id).value;
			SiebelJS.Log("comment_att:"+comment_att);
			//comments_id = parseInt(comments_id)+1;
			 //setTimeout(function() {
			//},1000);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetFieldValue("Comments",comment_att);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].InvokeMethod("WriteRecord");
			//},1000);
			//$("body").trigger('Custom.End');
		});
	
		//on click of submit button from generate data popup	
		$(document).on("click","#SC-store-submit",function(){
			
			//setTimeout(function() {
			
			//$("body").trigger('Custom.Start');
			$("#custommaskoverlay").show();
            setTimeout(function(){
				var total = 0;
				//var MachineNameValue1 = SiebelApp.S_App.GetProfileAttr("MachineInfo");
				//var storename1 = MachineNameValue.indexOf("_");
				 //storename = parseInt(storename)+1;
				 //var store_name1 = MachineNameValue.substring(0,storename);
				for(i=0;i<regcount;i++)
				{
					storeid[i] = store_name;
					macinename[i] = $("#R"+i).text();
					createdby[i] = "scherku";
					store[i] = store_name;
					cashexpecteed[i] = $("#table_Row1_r"+i+"").find("#cashe_idr"+i+"").text();
					cashexpecteed[i]=Number(cashexpecteed[i].replace(/[^0-9\.-]+/g,""));
					checkexpected[i] = $("#table_Row2_r"+i+"").find("#checke_idr"+i+"").text();
					checkexpected[i]=Number(checkexpected[i].replace(/[^0-9\.-]+/g,""));
					ccexpected[i] = $("#table_Row3_r"+i+"").find("#cce_idr"+i+"").text();
					ccexpected[i]=Number(ccexpected[i].replace(/[^0-9\.-]+/g,""));
					bcexpected[i] = $("#table_Row4_r"+i+"").find("#bce_idr"+i+"").text();
					bcexpected[i]=Number(bcexpected[i].replace(/[^0-9\.-]+/g,""));
					finexpected[i] =$("#table_Row5_r"+i+"").find("#financee_idr"+i+"").text();
					finexpected[i]=Number(finexpected[i].replace(/[^0-9\.-]+/g,""));
					gcexpected[i] = $("#table_Row6_r"+i+"").find("#gce_idr"+i+"").text();
					gcexpected[i]=Number(gcexpected[i].replace(/[^0-9\.-]+/g,""));
					//SCHERKU: Removing comments condition to submit data properly
					if($("#casha_idr"+i+"").val() != "" && $("#check_idr"+i+"").val() != "" && $("#cca_idr"+i+"").val() != "" && $("#gca_idr"+i+"").val() != "" && $("#bca_idr"+i+"").val() != "" && $("#financea_idr"+i+"").val() != "")
					{
					cashactual[i] = $("#casha_idr"+i+"").val();
					checkactual[i] = $("#checka_idr"+i+"").val();
					ccactual[i] = $("#cca_idr"+i+"").val();
					bcactual[i] = $("#bca_idr"+i+"").val();
					finactual[i] = $("#financea_idr"+i+"").val();
					gcactual[i] = $("#gca_idr"+i+"").val();
					//SBOORLA: Added code for Sales Rep Name
					SalesRepFN[i]=theApplication().GetProfileAttr("First Name");
					SalesRepLN[i]=theApplication().GetProfileAttr("Last Name");
					if($("#commentsr"+i+"").val() != "")
					comment[i] = $("#commentsr"+i+"").val();
					else
					comment[i]=" ";	
					}
					
				}
				
				for(var t=0;t<regcount;t++)
				{
					
				total = total + (cashactual[i]+checkactual[i]+ccactual[i]+bcactual[i]+finactual[i]+gcactual[i]);
				}
				var act = $("#daily-total-expected").val();
				SiebelJS.Log("act:"+act);
				act = Number(act.replace(/[^0-9\.-]+/g,""));
				total = total - act;
				SiebelJS.Log("total:"+total);
				//setTimeout(function() {	
				 InPS1.SetProperty("regcount",regcount); 
				 InPS1.SetProperty("storeid",storeid); 
				 InPS1.SetProperty("machinename",macinename); 
				 InPS1.SetProperty("createdby",createdby); 
				 InPS1.SetProperty("store",store);
				 InPS1.SetProperty("CashExpected",cashexpecteed); 
				 InPS1.SetProperty("CheckExpected",checkexpected);		
				 InPS1.SetProperty("ICExpected",ccexpected); 
				 InPS1.SetProperty("GCExpected",gcexpected);
				 InPS1.SetProperty("FinanceExpected",finexpected);				 				 
				 InPS1.SetProperty("CCExpected",bcexpected); 
				 InPS1.SetProperty("CashActual",cashactual); 
				 InPS1.SetProperty("CheckActual",checkactual); 
				 InPS1.SetProperty("ICActual",ccactual); 
				 InPS1.SetProperty("GCActual",gcactual);
				 InPS1.SetProperty("FinanceActual",finactual); 
				 InPS1.SetProperty("CCActual",bcactual);
				 InPS1.SetProperty("Total",total);				 
				 InPS1.SetProperty("Comments",comment); 
				 //RCHATHAR: ARP242018 For Sales Rep First Name and Sales Rep Last Name
				 InPS1.SetProperty("SalesRepFN",SalesRepFN); 
				 InPS1.SetProperty("SalesRepLN",SalesRepLN);
				 Service1 = SiebelApp.S_App.GetService("SC Store Data BS");
				 OutPS1 = Service1.InvokeMethod("SC storeData",InPS1);
				 $("body").trigger('Custom.Start');
				//setTimeout(function() {
					var FieldQueryPair  =  {"Date":"IS NOT NULL"};
					SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Store Todays Report Data List Applet");
					$("#SC_Today-Report-table").show();
					$("#SC-today-report").addClass("store-active");
					//setTimeout(function() {
					var tod_pm=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM();
					var today_recordset=tod_pm.Get("GetRecordSet");
					var value = Sorting_Tod_Data(today_recordset);
					if(value==1)
					{
						SiebelJS.Log("value 1");
						var markup='';
						markup+='					<div class="SC-Generate-data-contanier clearfix" id="generate">';
						markup+='                            <img src="images/custom/printer.png" />';
						markup+='                            <p> Click Generate Data to proceed</p>';
						markup+='                            <button id="SC-generate-report">Generate Data</button>';
						markup+='                     </div>';
						$("#SC_Today-Report-table").html(markup);
					}
			   //$("body").trigger('Custom.End');
			   $("#custommaskoverlay").hide();
			},1000);
			
			$("#SC-store-details").modal('hide');
			$('.SC-Generate-data-contanier').hide();
		});
		
		
		//on click of generate data button
		$(document).on("click","#SC-generate-report",function(){
				SiebelJS.Log("In generate data");
				
				//new pop up
				$("#SC-generate-popup").modal({
				backdrop: 'static'
				})
				$("#SC-generate-popup").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				})
				$(".modal-backdrop").css('background', '#ffffff');
		});
		$(document).on("click","#SC-proceed-button",function() {
			//$("body").trigger('Custom.Start');
			daily_total=0,expected_daily_total=0,actual_daily_total=0,over_short_daily_total=0
			$("#custommaskoverlay").show();
		    setTimeout(function() {
				var d = moment().utc().format("MM/DD/YYYY HH:mm:ssZ");
				var converted_date = moment(d,"MM/DD/YYYY HH:mm:ssZ").tz('America/Chicago').format("M/D/YYYY");
				var sysDate= moment(d,"MM/DD/YYYY HH:mm:ssZ").tz('America/Chicago').format("M/D/YYYY HH:mm:ss");
				var getsysTime="";
				getsysTime=moment(sysDate,"MM/DD/YYYY HH:mm:ss").format("HH:mm:ss");
				if(getsysTime>"00:00:00" && getsysTime<="05:00:00")
					converted_date = moment(d,"MM/DD/YYYY HH:mm:ssZ").tz('America/Chicago').subtract(1,'days').format("M/D/YYYY");
				SiebelJS.Log("converted_date"+converted_date);
				//var MachineNameValue = "10006";
				$("#SC-generate-popup").modal('hide');
				$("#SC-generate-popup").css({
					"display": "",
					"justify-content": "",
					"align-items": ""
				});		
				
				
				if(MachineNameValue!= "")
				{
					InPS2.SetProperty("vTimestamp1",converted_date);
					InPS2.SetProperty("MachineNameValue",MachineNameValue);
					Service2 = SiebelApp.S_App.GetService("SC Store Data BS");
					OutPS2 = Service2.InvokeMethod("SC Expected Data",InPS2);
					//$("body").trigger('Custom.Start');
					regcount = OutPS2.GetChild(0).GetChildCount();
					var mach_name = "";
					machine_lovvalue = SCOUIMethods.GetLOVs2("[Type]= 'SC_REGISTER_NAME_LOV' and [Active] = 'Y' and [Name]='R-ALL'","");
					
					for(var m = 0;m<regcount;m++)
					{
						mach_name = OutPS2.GetChild(0).GetChild(m).GetProperty("MachineName");
						if(mach_name != null){
						if(mach_name == machine_lovvalue)
							found_machine = true;
						else
						found_machine = false;}
					}
					
					if(found_machine == false)
					{
						$("body").trigger('Custom.Start');
						setTimeout(function(){
						var GenReport=Generate_Report(regcount);
						$("#generatereport").html(GenReport);
						SiebelJS.Log("regcount:"+regcount);
						calculatevalues(regcount);
						$("#SC-store-details").modal({
						backdrop: 'static'
						});
						$("body").trigger('Custom.End');
						},1000);
					}
					//new modification
					else
					{
						$("body").trigger('Custom.Start');
						setTimeout(function(){
						$("#SC-store-details").modal('hide');
						$('.SC-Generate-data-contanier').hide();
						var mach_name = OutPS2.GetChild(0).GetChild(0).GetProperty("MachineName");
						var ccexpected = OutPS2.GetChild(0).GetChild(0).GetProperty("sumcc");
						var cashexpecteed = OutPS2.GetChild(0).GetChild(0).GetProperty("sumcash");
						var checkexpected = OutPS2.GetChild(0).GetChild(0).GetProperty("sumcheck");
						var finexpected = OutPS2.GetChild(0).GetChild(0).GetProperty("sumfin");
						var gcexpected = OutPS2.GetChild(0).GetChild(0).GetProperty("sumgc");
						var bcexpected = OutPS2.GetChild(0).GetChild(0).GetProperty("sumic");
						var storeid = store_name;
						//var macinename = $("#R"+i).text();
						var createdby = "scherku";
						var store = store_name;
						var total = 0;
						var cashactual = 0;	
						var checkactual = 0;	
						var ccactual = 0;	
						var gcactual = 0;	
						var finactual = 0;	
						var bcactual = 0;						
						InPS1.SetProperty("regcount",regcount); 
						InPS1.SetProperty("storeid",storeid); 
						InPS1.SetProperty("machinename",mach_name); 
						InPS1.SetProperty("createdby",createdby); 
						InPS1.SetProperty("store",store);
						InPS1.SetProperty("CashExpected",cashexpecteed); 
						InPS1.SetProperty("CheckExpected",checkexpected);		
						InPS1.SetProperty("CCExpected",ccexpected); 
						InPS1.SetProperty("GCExpected",gcexpected);
						InPS1.SetProperty("FinanceExpected",finexpected);				 				 
						InPS1.SetProperty("ICExpected",bcexpected); 
						InPS1.SetProperty("CashActual",cashactual); 
						InPS1.SetProperty("CheckActual",checkactual); 
						InPS1.SetProperty("CCActual",ccactual); 
						InPS1.SetProperty("GCActual",gcactual);
						InPS1.SetProperty("FinanceActual",finactual); 
						InPS1.SetProperty("ICActual",bcactual);
						InPS1.SetProperty("Total",total);				 
						InPS1.SetProperty("Comments",""); 
						//RCHATHAR: ARP242018 For Sales Rep First Name and Sales Rep Last Name
						InPS1.SetProperty("SalesRepFN",theApplication().GetProfileAttr("First Name")); 
						InPS1.SetProperty("SalesRepLN",theApplication().GetProfileAttr("Last Name")); 
						
						Service1 = SiebelApp.S_App.GetService("SC Store Data BS");
						OutPS1 = Service1.InvokeMethod("SC storeData",InPS1);
						//setTimeout(function() {
						var FieldQueryPair  =  {"Date":"IS NOT NULL"};
						SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Store Todays Report Data List Applet");
						$("#SC_Today-Report-table").show();
						$("#SC-today-report").addClass("store-active");
						//},2000);
						var tod_pm=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM();
						var today_recordset=tod_pm.Get("GetRecordSet");
						var value = Sorting_Tod_Data(today_recordset);
						if(value==1)
						{
							SiebelJS.Log("value 1");
							var markup='';
							markup+='					<div class="SC-Generate-data-contanier clearfix" id="generate">';
							markup+='                            <img src="images/custom/printer.png" />';
							markup+='                            <p> Click Generate Data to proceed</p>';
							markup+='                            <button id="SC-generate-report">Generate Data</button>';
							markup+='                     </div>';
							$("#SC_Today-Report-table").html(markup);
						}
						$("body").trigger('Custom.End');
						},1000);
					}
				}
				else
				{
					window.alert("Machine name is null");
				}
             $("#custommaskoverlay").hide();				
			},1000);
			//$("body").trigger('Custom.End');
		});
		
		//start:click on no button in delete order
		$(document).on("click","#SC-cancel-button",function(){
			//Start loader 
			$("body").trigger('Custom.Start');
			   setTimeout(function(){
			$("#SC-generate-popup").modal('hide');
			$(".SC-SO-add-popup").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			}); 
			var markup='';
			markup+='					<div class="SC-Generate-data-contanier clearfix" id="generate">';
			markup+='                            <img src="images/custom/printer.png" />';
			markup+='                            <p> Click Generate Data to proceed</p>';
			markup+='                            <button id="SC-generate-report">Generate Data</button>';
			markup+='                     </div>';
			$("#SC_Today-Report-table").html(markup);
			$("body").trigger('Custom.End');
				 },1000);
		});
			
		//on click of tabs in the generate data store popup	
		$(document).on("click",".SC-Payment-nav-item",function(){
						
				var str=this.id;
				str=str.split("R");
				str=str[1];
				$("#R"+str).addClass('p-item-active').siblings().removeClass('p-item-active');
				for(var i=0;i<regcount;i++){
					SiebelJS.Log("i value:"+i);
					SiebelJS.Log("str value:"+str);
					if(i==str){
					$("#popuptableidR"+i).show();
					$("#totaltableid"+i).show();
					
					}
					else{
					$("#popuptableidR"+i).hide();
					$("#totaltableid"+i).hide();}
				}
		});
		
		//on click of the date picker from previous reports table
		//$(document).unbind("#SC-Calendar").on("click","#input_date_id",function(){
			$("#input_date_id").datepicker({
				//endDate: "today",
				maxDate: "today",
				onSelect: function (dateText, inst) {
				$("#input_date_id").val(dateText);
				if($("#input_date_id").val() != "")
					$(".delete-icon").show();
					var fvalue= $("#input_date_id").val();
					document.getElementById("input_date_id").disabled = true;
					calendar_function(fvalue);	
				},
				showButtonPanel: true
			});
		//});
		$(document).on("click",".delete-icon",function(){
			SiebelJS.Log("on click of the image");
			$("#input_date_id").val("");
			document.getElementById("input_date_id").disabled = false;
			var fvalue='';
			calendar_function(fvalue);
			$(".delete-icon").hide();
			
		});
		
		//sorting code in previous table
		$(document).on("click",".sort-by",function(){
			var today_recordset=pm.Get("GetRecordSet");
			//code for previous list applet
			if($(this).attr('id')=="storeid-sort"){
			if(a==true){SiebelJS.Log("In asc");pm.ExecuteMethod("OnClickSort", "Store Id", 'asc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);a=false;}
			else{SiebelJS.Log("In dec");pm.ExecuteMethod("OnClickSort", "Store Id", 'desc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);a=true;}
			}
			else if($(this).attr('id')=="machinename-sort"){
			if(b==true){SiebelJS.Log("In asc");pm.ExecuteMethod("OnClickSort", "Machine Name", 'asc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);b=false;}
			else{SiebelJS.Log("In dec");pm.ExecuteMethod("OnClickSort", "Machine Name", 'desc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);b=true;}
			}
			else if($(this).attr('id')=="dateofreport-sort"){
			if(c==true){SiebelJS.Log("In asc");PreTablePM.ExecuteMethod("OnClickSort", "Created By Name", 'asc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);c=false;}
			else{SiebelJS.Log("In dec");PreTablePM.ExecuteMethod("OnClickSort", "Created By Name", 'desc');setTimeout(function(){Sorting_Previous_Data(today_recordset);}, 500);c=true;}
			}
		});	
    }

    SCStoreTodaysReportDataListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCStoreTodaysReportDataListAppletPR.superclass.EndLife.apply(this, arguments);
    }
	function Sorting_Tod_Data(today_recordset)
	{
		var Tod_Markup_New = "";
	    var TodRec=today_recordset;
		//var CurrentDate_NEW = moment().utc().format("M/D/YYYY");
		var CurrentDate_NEW = moment().format("M/D/YYYY");
		//CurrentDate_NEW = moment(CurrentDate_NEW, "MM/DD/YYYY HH:mm:ssZ").tz('America/Chicago').format("M/D/YYYY");
		//var TodRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
			Tod_Markup_New+='<div class="SC-table-with-scroll-main SC-store-table-width">';
			Tod_Markup_New+='                        <table class="SC-table" id="SC-store-detail-table">';
			Tod_Markup_New+='                            <thead>';
			Tod_Markup_New+='                                <tr>';
			Tod_Markup_New+='                                    <th>Store Id</th>';
			Tod_Markup_New+='                                    <th>Machine</th>';
			Tod_Markup_New+='                                    <th>Created by</th>';
			Tod_Markup_New+='                                    <th>Date</th>';
			Tod_Markup_New+='                                    <th>Store</th>';
			Tod_Markup_New+='                                    <th>Cash E</th>';
			Tod_Markup_New+='                                    <th>Check e</th>';
			Tod_Markup_New+='                                    <th>cc e</th>';
			Tod_Markup_New+='                                    <th>gc e</th>';
			Tod_Markup_New+='                                    <th>finance</th>';
			Tod_Markup_New+='                                    <th>ic e</th>';
			Tod_Markup_New+='                                    <th>cash a</th>';
			Tod_Markup_New+='                                    <th>check a</th>';
			Tod_Markup_New+='                                    <th>cc a</th>';
			Tod_Markup_New+='                                    <th>gc a</th>';
			Tod_Markup_New+='                                    <th>finance</th>';
			Tod_Markup_New+='                                    <th>ic a</th>';
			Tod_Markup_New+='                                    <th>comments</th>';
			Tod_Markup_New+='                                    <th>report</th>';
			Tod_Markup_New+='                                </tr>';
			Tod_Markup_New+='                            </thead>';
			Tod_Markup_New+='                            <tbody>';
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSortSpec('SCCreated','DESC');
		SiebelJS.Log("TodRec.length:"+TodRec.length);
		var j,v;
		j=0;
		var value_found =0;
		while(j<TodRec.length){
			v = TodRec[j]["Date"];
			var d=new Date(v);
			d = d.toLocaleDateString("en-US");
			d=moment(d, "MM/DD/YYYY").format("M/D/YYYY");
			SiebelJS.Log("d oldvalue:"+d);
			SiebelJS.Log("CurrentDate_NEW:"+CurrentDate_NEW);
			//SBOORLA:Added code for Defect 762
			var scMachineNameValue = SiebelApp.S_App.GetProfileAttr("MachineInfo");
			var scstorename = scMachineNameValue.indexOf("_");
			var scstore_name = scMachineNameValue.substring(0,scstorename);
			if(d == CurrentDate_NEW&&TodRec[j]["Store Id"]==scstore_name)
			//if(d == CurrentDate_NEW)
			{
				value_found=1;
				//document.getElementById("SC-store-detail-table").style.display = "block";
				SiebelJS.Log("jvalue::"+j);
				SiebelJS.Log("appletSeq"+appletSeq);
				var tr=(j+1);
				SiebelJS.Log("entered into if loop");
				var k="trow"+(j+1);
				Tod_Markup_New+='<tr id='+k+'>';
				var cashe = TodRec[j]["Cash Expected Amt"];
				cashe=Number(cashe.replace(/[^0-9\.-]+/g,""));
				var checke = TodRec[j]["Check Expected Amt"];
				checke=Number(checke.replace(/[^0-9\.-]+/g,""));
				var cce = TodRec[j]["CreditCard Expected Amt"];
				cce=Number(cce.replace(/[^0-9\.-]+/g,""));
				var gce = TodRec[j]["GiftCard Expected Amt"];
				gce=Number(gce.replace(/[^0-9\.-]+/g,""));
				var financee = TodRec[j]["Finance Expected Amt"];
				financee=Number(financee.replace(/[^0-9\.-]+/g,""));
				var ice = TodRec[j]["InnerCircle Expected Amt"];
				ice=Number(ice.replace(/[^0-9\.-]+/g,""));
				var casha = TodRec[j]["Cash Actual Amt"];
				casha=Number(casha.replace(/[^0-9\.-]+/g,""));
				var checka = TodRec[j]["Check Actual Amt"];
				checka=Number(checka.replace(/[^0-9\.-]+/g,""));
				var cca = TodRec[j]["CreditCard Actual Amt"];
				cca=Number(cca.replace(/[^0-9\.-]+/g,""));
				var gca = TodRec[j]["GiftCard Actual Amt"];
				gca=Number(gca.replace(/[^0-9\.-]+/g,""));
				var financea = TodRec[j]["Finance Actual Amt"];
				financea=Number(financea.replace(/[^0-9\.-]+/g,""));
				var ica = TodRec[j]["InnerCircle Actual Amt"];
				ica=Number(ica.replace(/[^0-9\.-]+/g,""));
				
				cashe=parseFloat(cashe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				checke=parseFloat(checke).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				cce=parseFloat(cce).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				gce=parseFloat(gce).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				financee=parseFloat(financee).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				ice=parseFloat(ice).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				casha=parseFloat(casha).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				checka=parseFloat(checka).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				cca=parseFloat(cca).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				gca=parseFloat(gca).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				financea=parseFloat(financea).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				ica=parseFloat(ica).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
				var totalactualsales = 0; 
				if(TodRec[j]["Store Id"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Store Id"]+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Machine Name"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Machine Name"]+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Created By Name"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Created By Name"]+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Date"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Date"]+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Store Name"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Store Name"]+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Cash Expected Amt"] != null){Tod_Markup_New+='<td>$'+cashe+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Check Expected Amt"] != null){Tod_Markup_New+='<td>$'+checke+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["CreditCard Expected Amt"] != null){Tod_Markup_New+='<td>$'+cce+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["GiftCard Expected Amt"] != null){Tod_Markup_New+='<td>$'+gce+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Finance Expected Amt"] != null){Tod_Markup_New+='<td>$'+financee+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["InnerCircle Expected Amt"] != null){Tod_Markup_New+='<td>$'+ice+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Cash Actual Amt"] != null){Tod_Markup_New+='<td>$'+casha+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Check Actual Amt"] != null){Tod_Markup_New+='<td>$'+checka+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["CreditCard Actual Amt"] != null){Tod_Markup_New+='<td>$'+cca+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["GiftCard Actual Amt"] != null){Tod_Markup_New+='<td>$'+gca+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Finance Actual Amt"] != null){Tod_Markup_New+='<td>$'+financea+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["InnerCircle Actual Amt"] != null){Tod_Markup_New+='<td>$'+ica+'</td>';}
				else{Tod_Markup_New+='<td></td>';}
				if(TodRec[j]["Comments"] != "undefined"){Tod_Markup_New+='<td class="comments-col"><textarea name="detdes" class="SC-input  no-padding" id="strcomment'+j+'">'+TodRec[j]["Comments"]+'</textarea></td>';}
				else{Tod_Markup_New+='<td class="comments-col"><textarea name="detdes" class="SC-input  no-padding" id="strcomment'+j+'"></textarea></td>';}
				if(TodRec[j]["Report Generated?"] != null){Tod_Markup_New+='<td><img src="images/custom/report_flag.png" class="so-add-cart"/></td>';}
				else{Tod_Markup_New+='<td><img src="images/custom/report_flag.png" class="so-add-cart"/></td>';}
				Tod_Markup_New+='</tr>';
				Tod_Markup_New+='<tr class="showhide" id='+k+'>';
				var taid = k.split("w");
				taid = taid[1];
				//$('#custommaskoverlay').show();
				//setTimeout(function(){
				//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSelection(taid);
				//$(document).find("#s_"+appletSeq+"_l tr#1").trigger("click");
				//$("#s_"+appletSeq+"_l tr#"+(j+1)+"").trigger("click");
				Tod_Markup_New+='                                    <td class="main-bg" colspan="19">';
				Tod_Markup_New+='                                        <div class="collapse-block store-collapse">';
				Tod_Markup_New+='                                            <div class="SC-head">';
				Tod_Markup_New+='                                                   <p>Order details</p>';
				Tod_Markup_New+='                                              </div>';
				Tod_Markup_New+='                                            <div class="SC-table-with-scroll-main">';
				Tod_Markup_New+='                                                <table class="SC-table">';
				Tod_Markup_New+='                                                    <thead>';
				Tod_Markup_New+='                                                        <tr class="panel-bg">';
				Tod_Markup_New+='                                                            <th class="store-col-width">order number</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">billing name</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">revision number</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">order total</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">cash e</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">check e</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">cc e</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">GC e</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">finance e</th>';
				Tod_Markup_New+='                                                            <th class="store-col-width">ic e</th>';
				Tod_Markup_New+='                                                        </tr>';
				Tod_Markup_New+='                                                    </thead>';
				Tod_Markup_New+='                                                    <tbody id="payments_details_markup'+j+'">';
				/*var paymentrecords = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
				for(var l=0;l<paymentrecords.length;l++){
					SiebelJS.Log("paymentrecordss:"+JSON.stringify(paymentrecords));
					//if(TodRec[j]["Machine Name"] == paymentrecords[l]["Machine Name"])
					//{
					var ordernumber = paymentrecords[l]["Order Number"]!=""?parseFloat(paymentrecords[l]["Order Number"]):"";
					var billingname = paymentrecords[l]["Primary Bill To Last Name"]!=""?paymentrecords[l]["Primary Bill To Last Name"]:"";
					var revision = paymentrecords[l]["Order Revision Number"]!=""?parseFloat(paymentrecords[l]["Order Revision Number"]):"";
					var cashvalue = paymentrecords[l]["Cash Value"]!=""?parseFloat(paymentrecords[l]["Cash Value"]):0.00;
					var checkvalue = paymentrecords[l]["Check Value"]!=""?parseFloat(paymentrecords[l]["Check Value"]):0.00;
					var creditcardvalue = paymentrecords[l]["CreditCard Value"]!=""?parseFloat(paymentrecords[l]["CreditCard Value"]):0.00;
					var financevalue = paymentrecords[l]["Financing Value"]!=""?parseFloat(paymentrecords[l]["Financing Value"]):0.00;
					var giftcardvalue = paymentrecords[l]["GiftCard Value"]!=""?parseFloat(paymentrecords[l]["GiftCard Value"]):0.00;
					var icvalue = paymentrecords[l]["Reward Value"]!=""?parseFloat(paymentrecords[l]["Reward Value"]):0.00;
					var ordertotal = cashvalue+checkvalue+creditcardvalue+financevalue+giftcardvalue+icvalue;
				Tod_Markup_New+='                                                        <tr class="panel-bg">';
				Tod_Markup_New+='                                                            <td>'+ordernumber+'</td>';
				Tod_Markup_New+='                                                            <td>'+billingname+'</td>';
				Tod_Markup_New+='                                                            <td>'+revision+'</td>';
				Tod_Markup_New+='                                                            <td>$'+ordertotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                            <td>$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New+='                                                        </tr>';
					//}
				}*/
				Tod_Markup_New+='                                                    </tbody>';
				Tod_Markup_New+='                                                </table>';
				Tod_Markup_New+='                                            </div>';
				Tod_Markup_New+='                                        </div>';
				Tod_Markup_New+='                                    </td>';
				Tod_Markup_New+='                                </tr>';
				//$('#custommaskoverlay').hide();
				//},1000);
			}							
			j++;
		}
		Tod_Markup_New+='                            </tbody>';
		Tod_Markup_New+='                        </table>';
		Tod_Markup_New+='                   </div>';
		
		if(value_found==1)
			{
			//document.getElementById("sc-search").disabled = false;
			$("#SC_Today-Report-table").html(Tod_Markup_New);
			var Machine_Name_Check = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().GetFieldValue("Machine Name");
			var machine_lovvalue = SCOUIMethods.GetLOVs2("[Type]= 'SC_REGISTER_NAME_LOV' and [Active] = 'Y' and [Name]='R-ALL'","");
				if(Machine_Name_Check != machine_lovvalue)
				{
					//$("#sc-search").removeClass("SC-disabled");
					$("#trow1").next('tr.showhide').show('slow');
					$("#trow1 td:nth-child(19)").find("img").attr("src", "images/custom/report-flag-white.png");
					$("#trow1").addClass("main-bg");
					$("#trow1").addClass("main-bg-row");
					$(document).find("#s_"+appletSeq+"_l tr#1").trigger("click");
					var paymentrecords = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
					var row_val_first = 1;
					Payment_details(paymentrecords,row_val_first);
				}
			}
			else
			{
			return 1;
			}		
	}
	function Payment_details(paymentrecords,taid)
	{
		var Tod_Markup_New_payment = '';
		var pay_row = taid;
			//Tod_Markup_New_payment+='<tr class="showhide" id='+k+'>';
			
				for(var l=0;l<paymentrecords.length;l++){
					SiebelJS.Log("paymentrecordss:"+JSON.stringify(paymentrecords));
					//if(TodRec[j]["Machine Name"] == paymentrecords[l]["Machine Name"])
					//{
					var ordernumber = paymentrecords[l]["Order Number"]!=""?parseFloat(paymentrecords[l]["Order Number"]):"";
					var billingname = paymentrecords[l]["Primary Bill To Last Name"]!=""?paymentrecords[l]["Primary Bill To Last Name"]:"";
					var revision = paymentrecords[l]["Order Revision Number"]!=""?parseFloat(paymentrecords[l]["Order Revision Number"]):"";
					var cashvalue = paymentrecords[l]["Cash Value"]!=""?parseFloat(paymentrecords[l]["Cash Value"]):0.00;
					var checkvalue = paymentrecords[l]["Check Value"]!=""?parseFloat(paymentrecords[l]["Check Value"]):0.00;
					var creditcardvalue = paymentrecords[l]["CreditCard Value"]!=""?parseFloat(paymentrecords[l]["CreditCard Value"]):0.00;
					var financevalue = paymentrecords[l]["Financing Value"]!=""?parseFloat(paymentrecords[l]["Financing Value"]):0.00;
					var giftcardvalue = paymentrecords[l]["GiftCard Value"]!=""?parseFloat(paymentrecords[l]["GiftCard Value"]):0.00;
					var icvalue = paymentrecords[l]["Reward Value"]!=""?parseFloat(paymentrecords[l]["Reward Value"]):0.00;
					var ordertotal = cashvalue+checkvalue+creditcardvalue+financevalue+giftcardvalue+icvalue;
				Tod_Markup_New_payment+='                                                        <tr class="panel-bg">';
				Tod_Markup_New_payment+='                                                            <td>'+ordernumber+'</td>';
				Tod_Markup_New_payment+='                                                            <td>'+billingname+'</td>';
				Tod_Markup_New_payment+='                                                            <td>'+revision+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+ordertotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                            <td>$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
				Tod_Markup_New_payment+='                                                        </tr>';
					//}
				}
				$("#payments_details_markup"+(taid-1)).html(Tod_Markup_New_payment);
	}
	function Sorting_Previous_Data(today_recordset)
	{
		var PreRec=today_recordset;
		var p=0,prev_found=0;
		//var CurrentDate_NEW = moment().utc().format("M/D/YYYY");
		var CurrentDate_NEW = moment().format("M/D/YYYY");
		//CurrentDate_NEW = moment(CurrentDate_NEW, "MM/DD/YYYY HH:mm:ssZ").tz('America/Chicago').format("M/D/YYYY");
		
		var Prev_Markup_New='';
		Prev_Markup_New+='	<div class="SC-table-with-scroll-main SC-store-table-width">';
		Prev_Markup_New+='                        <table class="SC-table" id="SC_Store-Info-table">';
		Prev_Markup_New+='                            <thead>';
		Prev_Markup_New+='                                <tr>';
		Prev_Markup_New+='                                    <th class="sort-by" id="storeid-sort">Store Id</th>';
		Prev_Markup_New+='                                    <th class="sort-by" id="machinename-sort">Store Name</th>';
		Prev_Markup_New+='                                    <th class="sort-by" id="dateofreport-sort">Date Of Report</th>';
		Prev_Markup_New+='                                    <th id="dailytotal-sort">Daily total</th>';
		Prev_Markup_New+='                                    <th>report</th>';
		Prev_Markup_New+='                                </tr>';
		Prev_Markup_New+='                            </thead>';
		Prev_Markup_New+='                            <tbody id="Prev_Table_Data">';
		while(p<PreRec.length){
			var v = PreRec[p]["Date"];
			var d=new Date(v);
			d = d.toLocaleDateString("en-US");
			d=moment(d, "MM/DD/YYYY").format("M/D/YYYY");
			SiebelJS.Log("d oldvalue:"+d);
			if(d < CurrentDate_NEW)
			{
		//for(var i = 0; i < PreRec.length; i++){
			prev_found = 1;
			var j="prow"+(p+1);
			Prev_Markup_New+='<tr id='+j+'>';
			var actualsalesvalue = PreRec[p]["Expected Total"];
			actualsalesvalue=Number(actualsalesvalue.replace(/[^0-9\.-]+/g,""));
			actualsalesvalue=parseFloat(actualsalesvalue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
			var actsa = PreRec[p]["Expected Total"];
			SiebelJS.Log("actsa:"+actsa);
			if(PreRec[p]["Store Id"] != null){Prev_Markup_New+='<td>'+PreRec[p]["Store Id"]+'</td>';}
			else{Prev_Markup_New+='<td></td>';}
			if(PreRec[p]["Machine Name"] != null){Prev_Markup_New+='<td>'+PreRec[p]["Machine Name"]+'</td>';}
			else{Prev_Markup_New+='<td></td>';}
			if(PreRec[p]["Date"] != null){Prev_Markup_New+='<td>'+PreRec[p]["Date"]+'</td>';}
			else{Prev_Markup_New+='<td></td>';}
			if(PreRec[p]["Expected Total"] != null){Prev_Markup_New+='<td>$'+actualsalesvalue+'</td>';}
			else{Prev_Markup_New+='<td></td>';}
			if(PreRec[p]["Report Generated?"] != null){Prev_Markup_New+='<td class="bip_iamge" id="download_image'+p+'"><img src="images/custom/printer-blue.png" class="so-add-cart"/></td>';}
			else{Prev_Markup_New+='<td><img src="images/custom/printer-hex.png" class="so-add-cart sc-disabled"/></td>';}
			Prev_Markup_New+='</tr>';
		//}
		}
		p++;
		//$("#SC_Previous-Report-table").html(Prev_Markup_New);
		}
		Prev_Markup_New+='                            </tbody>';
		Prev_Markup_New+='                        </table>';
		Prev_Markup_New+='						</div>';
		if(prev_found == 1){
		$("#SC_Previous-Report-table").html(Prev_Markup_New);
		SCOUIMethods.PrimaryButton(pm,"SC-Store-Pagination");}
	}
	
	
	function Generate_Report(regcount)
	{
		var expected_value = 0;
		var regcount = regcount;
		var Gen_Report='';
			Gen_Report+='		<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal">&times;</button>';
			Gen_Report+='                      <div class="modal-header">';
			Gen_Report+='                        <div class="store-info">';
			Gen_Report+='                           <p>Sleep Number - Closing Cash Report</p>';
			Gen_Report+='                           <span id="spantime">'+CurrentDate_Header+'</span> ';
			Gen_Report+='                        </div>';
			Gen_Report+='                        <div class="store-info">';
			Gen_Report+='                            <p class="sales-person-name">Salesperson:<span>'+theApplication().GetProfileAttr("Last Name")+' '+theApplication().GetProfileAttr("First Name")+'</span></p>';
			Gen_Report+='                            <span>'+SiebelApp.S_App.GetProfileAttr("MachineInfo").substring(0,storename)+'</span>';
			Gen_Report+='                        </div>';
			Gen_Report+='                    </div> ';
			Gen_Report+='                    <div class="modal-body" id="registers">';
			Gen_Report+='                        <div class="SC-Payment-nav-tabs no-margin">';
			for(var j=0;j<regcount;j++){
			if(j==0){
			Gen_Report+='                            <div class="SC-Payment-nav-item p-item-active" id="R'+j+'">'+OutPS2.GetChild(0).GetChild(j).GetProperty("MachineName")+'</div>';}
			else{
			Gen_Report+='                            <div class="SC-Payment-nav-item" id="R'+j+'">'+OutPS2.GetChild(0).GetChild(j).GetProperty("MachineName")+'</div>';}
			
			}
			Gen_Report+='                        </div>';
			for(var i=0;i<regcount;i++){
				
				var cashvalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash")):0.00;
				var checkvalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck")):0.00;
				var creditcardvalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc")):0.00;
				var financevalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin")):0.00;
				var giftcardvalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc")):0.00;
				var icvalue = OutPS2.GetChild(0).GetChild(i).GetProperty("sumic")!=""?parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumic")):0.00;
				var exptotalvalue = cashvalue+checkvalue+creditcardvalue+financevalue+giftcardvalue+icvalue;	
				if(i==0){
				
				Gen_Report+='                        <div class="SC-table-with-scroll-main SC-store-popup-table" id="popuptableidR'+i+'">';
			Gen_Report+='                        <table class="SC-table" id="store_table_info">';
			Gen_Report+='                            <thead>';
			Gen_Report+='                                <tr class="no-bg">';
			Gen_Report+='                                    <th>receipts</th>';
			Gen_Report+='                                    <th>expected</th>';
			Gen_Report+='                                    <th>actual</th>';
			Gen_Report+='                                    <th>over/short</th>';
			Gen_Report+='                                 </tr>';
			Gen_Report+='                            </thead>';
			Gen_Report+='                            <tbody>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row1_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Cash</td>';
			Gen_Report+='                                    <td class="td-padding" id="cashe_idr'+i+'" value="">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="casha_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash"))) >=0){
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">-$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row2_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Checks</td>';
			SiebelJS.Log("check value:"+checkvalue);
			Gen_Report+='                                    <td class="td-padding" id="checke_idr'+i+'" value="">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="checka_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">-$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                               </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row3_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">CC Certificates</td>';
			Gen_Report+='                                    <td class="td-padding" id="cce_idr'+i+'" value="">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                   <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="cca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">-$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row4_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Bank Cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="bce_idr'+i+'" value="">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="bca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumic"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">-$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row5_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Finance</td>';
			Gen_Report+='                                    <td class="td-padding" id="financee_idr'+i+'" value="">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="financea_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">-$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row6_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Gift cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="gce_idr'+i+'" value="">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="gca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if( (0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="gc_resultr'+i+'">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="gc_resultr'+i+'">-$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                            </tbody>';
			Gen_Report+='                        </table>';
			Gen_Report+='                    	</div>';
			}
			else
			{
			Gen_Report+='                        <div class="SC-table-with-scroll-main SC-store-popup-table" id="popuptableidR'+i+'" style="display:none">';
			Gen_Report+='                        <table class="SC-table" id="store_table_info">';
			Gen_Report+='                            <thead>';
			Gen_Report+='                                <tr class="no-bg">';
			Gen_Report+='                                    <th>receipts</th>';
			Gen_Report+='                                    <th>expected</th>';
			Gen_Report+='                                    <th>actual</th>';
			Gen_Report+='                                    <th>over/short</th>';
			Gen_Report+='                                 </tr>';
			Gen_Report+='                            </thead>';
			Gen_Report+='                            <tbody>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row1_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Cash</td>';
			Gen_Report+='                                    <td class="td-padding" id="cashe_idr'+i+'" value="">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="casha_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash"))) >=0){
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">-$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row2_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Checks</td>';
			Gen_Report+='                                    <td class="td-padding" id="checke_idr'+i+'" value="">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="checka_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">-$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                               </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row3_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">CC Certificates</td>';
			Gen_Report+='                                    <td class="td-padding" id="cce_idr'+i+'" value="">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                   <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="cca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00 - parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">-$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row4_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Bank Cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="bce_idr'+i+'" value="">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="bca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00 - parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumic"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">-$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row5_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Finance</td>';
			Gen_Report+='                                    <td class="td-padding" id="financee_idr'+i+'" value="">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="financea_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00 - parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">-$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row6_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Gift cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="gce_idr'+i+'" value="">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="gca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if((0.00- parseFloat(OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc"))) >= 0){
			Gen_Report+='                                    <td class="td-padding" id="gc_resultr'+i+'">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="gc_resultr'+i+'">-$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                            </tbody>';
			Gen_Report+='                        </table>';
			Gen_Report+='                    	</div>';
			}
			if(i==0)
			{
				
			Gen_Report+='                    <div class="SC-table-with-scroll-main SC-store-total-table" id="totaltableid'+i+'">';
			Gen_Report+='                        <table class="SC-table" id="totals">';
			Gen_Report+='                            <tbody>';
			Gen_Report+='                                <tr class="no-bg" id="totalreg'+i+'">';
			Gen_Report+='                                    <td class="td-padding">TOTAL '+OutPS2.GetChild(0).GetChild(i).GetProperty("MachineName")+'</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="exptotr'+i+'">$'+exptotalvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			expected_value = expected_value+parseFloat(exptotalvalue);
			var scOverShort=0.00-parseFloat(exptotalvalue);
			Gen_Report+='                                    <td class="td-padding pending" id="acttotr'+i+'">$0.00</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="ostotr'+i+'">$'+scOverShort.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                   <tr class="no-bg">';
			Gen_Report+='                                       <td class="td-padding">Comments:</td>';
			Gen_Report+='                                       <td class="td-padding" colspan="3"> <input type="text" class="shipping-input input-width" id="commentsr'+i+'"></td>';
			Gen_Report+='                                   </tr>';
			Gen_Report+='                             </tbody>';
			Gen_Report+='                        </table>';
			Gen_Report+='                    </div>';
			}
			else
			{
				Gen_Report+='                    <div class="SC-table-with-scroll-main SC-store-total-table" id="totaltableid'+i+'" style="display:none">';
			Gen_Report+='                        <table class="SC-table" id="totals">';
			Gen_Report+='                            <tbody>';
			Gen_Report+='                                <tr class="no-bg" id="totalreg">';
			Gen_Report+='                                    <td class="td-padding">TOTAL '+OutPS2.GetChild(0).GetChild(i).GetProperty("MachineName")+'</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="exptotr'+i+'">$'+exptotalvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			expected_value = expected_value+parseFloat(exptotalvalue);
			var scOverShort=0.00-parseFloat(exptotalvalue);
			Gen_Report+='                                    <td class="td-padding pending" id="acttotr'+i+'">$0.00</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="ostotr'+i+'">$'+scOverShort.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                   <tr class="no-bg">';
			Gen_Report+='                                       <td class="td-padding">Comments:</td>';
			Gen_Report+='                                       <td class="td-padding" colspan="3"> <input type="text" class="shipping-input input-width" id="commentsr'+i+'"></td>';
			Gen_Report+='                                   </tr>';
			Gen_Report+='                             </tbody>';
			Gen_Report+='                        </table>';
			Gen_Report+='                    </div>';
			}
			}
			over_short_daily_total=0.00-parseFloat(expected_value);
			Gen_Report+='                   </div>';
			Gen_Report+='                    <div class="modal-footer">';
			Gen_Report+='                      <div class="submit-button">';
			Gen_Report+='                          <button id="SC-store-submit">Submit Data</button>';
			Gen_Report+='                      </div>';
			Gen_Report+='                      <div class="total-price" id="daily-totals">';
			Gen_Report+='                         <p> DAILY TOTAL:</p>';
			Gen_Report+='                         <div class="item-block">';
			Gen_Report+='                             <p class="item-name">expected</p>';
			Gen_Report+='                             <p class="item-value pending" id="daily-total-expected" value="">$'+expected_value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         <div class="item-block">';
			Gen_Report+='                             <p class="item-name">actual</p>';
			Gen_Report+='                             <p class="item-value pending" id="daily-total-actual" value="">$0.00</p>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         <div class="item-block">';
			Gen_Report+='                             <p class="item-name">over/short</p>';
			Gen_Report+='                             <p class="item-value pending" id="daily-total-os" value="">$'+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         </div>';
			return Gen_Report;
			
	}
	function calendar_function(fvalue)
	{
	 var FieldQueryPair;
		var fvalue1=fvalue;
		SiebelJS.Log("fvalue in function:"+fvalue1);
		FieldQueryPair  =  {"Date":fvalue1};
		SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Store Todays Report Data List Applet");
		Sorting_Previous_Data(today_recordset);
		/*pm=this.GetPM();
		var today_recordset=pm.Get("GetRecordSet");
		Sorting_Previous_Data(today_recordset);*/
			
	}
	function calculatevalues(regcount)
	{
		$(document).ready(function() {
		for(var reg=0;reg<regcount;reg++)
			{	
				SiebelJS.Log("reg value:"+reg);
				$("#casha_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var cashexpe =$("#table_Row1_r"+str).find("#cashe_idr"+str).text();
					
					cashexpe = Number(cashexpe.replace(/[^0-9\.-]+/g,""));
					if($("#casha_idr"+str).val() != "")
					{
					//NGOLLA defect NO:682 added toFixed to cashexpe
					var cash_actual = $("#casha_idr"+str).val();
					//var cash_total = (parseFloat(cash_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))-(parseFloat(cashexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var cash_total = (Number(cash_actual.replace(/[^0-9\.-]+/g,"")))-(cashexpe);
					$("#table_Row1_r"+str).find("#cash_resultr"+str).text("$"+parseFloat(cash_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					else{
						$("#table_Row1_r"+str).find("#cash_resultr"+str).text("-$"+parseFloat(cashexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#casha_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#casha_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#casha_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#casha_idr"+str).val());
					expected_daily_total=$("#daily-totals").find("#daily-total-expected").text();
					expected_daily_total=Number(expected_daily_total.replace(/[^0-9\.-]+/g,""));
					daily_total = actual_daily_total - expected_daily_total;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					
					
				});
				$("#casha_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#casha_idr"+str).val()!=""?parseFloat($("#casha_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					actual_daily_total = actual_daily_total - value;
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#casha_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#casha_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				
				
				$("#checka_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var checkexpe = $("#table_Row2_r"+str).find("#checke_idr"+str).text();
					checkexpe = Number(checkexpe.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log("checkexpe:"+parseFloat(checkexpe));
					if($("#checka_idr"+str).val() != "")
					{
					//NGOLLA defect NO:682 added toFixed to over_short_daily_total
					var check_actual = $("#checka_idr"+str).val();
					//var check_total = (parseFloat(check_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))- (parseFloat(checkexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var check_total = (Number(check_actual.replace(/[^0-9\.-]+/g,"")))-(checkexpe);
					SiebelJS.Log("check_total:"+check_total);
					
					$("#table_Row2_r"+str).find("#check_resultr"+str).text("$"+parseFloat(check_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
					else{
						$("#table_Row2_r"+str).find("#check_resultr"+str).text("-$"+parseFloat(checkexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual =  Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os= Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#checka_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#checka_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#checka_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#checka_idr"+str).val());
					daily_total = actual_daily_total - expected_daily_total;
					
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#checka_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				$("#checka_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#checka_idr"+str).val()!=""?parseFloat($("#checka_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log(val_actual);
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#checka_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total - value;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				
				$("#cca_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var ccexpe = $("#table_Row3_r"+str).find("#cce_idr"+str).text();
					ccexpe = Number(ccexpe.replace(/[^0-9\.-]+/g,""));
					if($("#cca_idr"+str).val() != "")
					{
					//NGOLLA defect NO:682 added toFixed to over_short_daily_total
					var cc_actual = $("#cca_idr"+str).val();
					//var cc_total = (parseFloat(cc_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))- (parseFloat(ccexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var cc_total = (Number(cc_actual.replace(/[^0-9\.-]+/g,"")))-(ccexpe);
					$("#table_Row3_r"+str).find("#cc_resultr"+str).text("$"+parseFloat(cc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
					else{
						$("#table_Row3_r"+str).find("#cc_resultr"+str).text("-$"+parseFloat(ccexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#cca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#cca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#cca_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#cca_idr"+str).val());
					daily_total = actual_daily_total - expected_daily_total;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#cca_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				$("#cca_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#cca_idr"+str).val()!=""?parseFloat($("#cca_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log(val_actual);
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#cca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total - value;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				
				$("#bca_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var bcexpe = $("#table_Row4_r"+str).find("#bce_idr"+str).text();
					bcexpe = Number(bcexpe.replace(/[^0-9\.-]+/g,""));
					if($("#bca_idr"+str).val() != "")
					{
					//NGOLLA defect NO:682 added toFixed to over_short_daily_total
					var bc_actual = $("#bca_idr"+str).val();
					//var bc_total = (parseFloat(bc_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))- (parseFloat(bcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var bc_total = (Number(bc_actual.replace(/[^0-9\.-]+/g,"")))-(bcexpe);
					$("#table_Row4_r"+str).find("#bc_resultr"+str).text("$"+parseFloat(bc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
					else{
						$("#table_Row4_r"+str).find("#bc_resultr"+str).text("-$"+parseFloat(bcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#bca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#bca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#bca_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#bca_idr"+str).val());
					daily_total = actual_daily_total - expected_daily_total;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#bca_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				$("#bca_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#bca_idr"+str).val()!=""?parseFloat($("#bca_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log(val_actual);
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#bca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total - value;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				
				$("#financea_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var financeexpe = $("#table_Row5_r"+str).find("#financee_idr"+str).text();
					financeexpe = Number(financeexpe.replace(/[^0-9\.-]+/g,""));
					if($("#financea_idr"+str).val() != "")
					{
						//NGOLLA defect NO:682 added toFixed to over_short_daily_total
					var finance_actual = $("#financea_idr"+str).val();
					//var finance_total = (parseFloat(finance_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))- (parseFloat(financeexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var finance_total = (Number(finance_actual.replace(/[^0-9\.-]+/g,"")))-(financeexpe);
					//var finance_total = $("#financea_idr"+str).val()- parseFloat(financeexpe);
					$("#table_Row5_r"+str).find("#finance_resultr"+str).text("$"+parseFloat(finance_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
					else{
						$("#table_Row5_r"+str).find("#finance_resultr"+str).text("-$"+parseFloat(financeexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#financea_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#financea_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#financea_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#financea_idr"+str).val());
					daily_total = actual_daily_total - expected_daily_total;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#financea_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				$("#financea_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#financea_idr"+str).val()!=""?parseFloat($("#financea_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log(val_actual);
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#financea_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total - value;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				
				$("#gca_idr"+reg).on('focusout', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var gcexpe = $("#table_Row6_r"+str).find("#gce_idr"+str).text();
					gcexpe = Number(gcexpe.replace(/[^0-9\.-]+/g,""));
					if($("#gca_idr"+str).val() != "")
					{
						//NGOLLA defect NO:682 added toFixed to over_short_daily_total
					var gc_actual = $("#gca_idr"+str).val();
					//var gc_total = (parseFloat(gc_actual).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))- (parseFloat(gcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					var gc_total = (Number(gc_actual.replace(/[^0-9\.-]+/g,"")))-(gcexpe);
					//var gc_total = $("#gca_idr"+str).val()- parseFloat(gcexpe);
					$("#table_Row6_r"+str).find("#gc_resultr"+str).text("$"+parseFloat(gc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
					else{
						$("#table_Row6_r"+str).find("#gc_resultr"+str).text("-$"+parseFloat(gcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					}
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
					val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#gca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat($("#gca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total+parseFloat($("#gca_idr"+str).val());
					over_short_daily_total=over_short_daily_total+parseFloat($("#gca_idr"+str).val());
					daily_total = actual_daily_total - expected_daily_total;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
				$("#gca_idr"+reg).on('keyup', function(event){
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
				$("#gca_idr"+reg).on('focusin', function(event){
					var str=this.id;
					str=str.split("r");
					str=str[1];
					var value= $("#gca_idr"+str).val()!=""?parseFloat($("#gca_idr"+str).val()):0;
					SiebelJS.Log(value);
					var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
					val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
					SiebelJS.Log(val_actual);
					var val_ossc = $("#totaltableid"+str).find("#ostotr"+str).text();
					val_ossc = Number(val_ossc.replace(/[^0-9\.-]+/g,""));
					over_short_daily_total=over_short_daily_total - value;
					$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_ossc)-parseFloat($("#gca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					actual_daily_total = actual_daily_total - value;
					$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
					$("#daily-totals").find("#daily-total-os").text("$"+over_short_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
				});
			}
		});				
									
	}
	
    return SCStoreTodaysReportDataListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCStoreTodaysReportDataListAppletPR";
 })
}
