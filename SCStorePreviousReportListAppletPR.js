//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=SCStorePreviousReportListAppletPR&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCStorePreviousReportListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCStorePreviousReportListAppletPR");
 define("siebel/custom/SelectComfort/SCStorePreviousReportListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCStoreMarkup","siebel/custom/SelectComfort/SC_OUI_Markups",],
  function () {
   SiebelAppFacade.SCStorePreviousReportListAppletPR = (function () {
	var a=true,b=true,c=true,d=true,e=true;
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
	var Tod_Markup_New = "";
	var pm='';
	
	var regcount;
	var Service,Service1,Service2,Service3,Service4,CurrentDate,time,time1,date,datetime,datetime1;
	var mainmarkup='';
	//var markup='';
	//var TodRec='';
	//var fvalue;
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
	var daily_total=0,expected_daily_total=0,actual_daily_total=0,over_short_daily_total=0;
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
	var recordset;	
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
	var StoreMarkup = SiebelJS.Dependency("SiebelApp.SCStoreMarkup");
    var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	

    function SCStorePreviousReportListAppletPR(pm) {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCStorePreviousReportListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCStorePreviousReportListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.Init.apply(this, arguments);
	 SiebelJS.Log("in init function of prev table");
    }

    SCStorePreviousReportListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.ShowUI.apply(this, arguments);
	 SiebelJS.Log("in show ui function of prev table");
	 mainmarkup = StoreMarkup.StoreMainMarkup();
	pm=this.GetPM();
	var Appletid = pm.Get("GetFullId");
	SiebelJS.Log("previous applet id:"+Appletid);
	//$('#'+Appletid).append(mainmarkup);
	$('#s_'+Appletid+'_div').hide();
	document.getElementById("sc-search").disabled = true;
	
	CurrentDate = new Date();
	date = CurrentDate.toLocaleDateString("en-US");
	time1 = CurrentDate.toLocaleTimeString('en-GB');
	time = time1.slice(0, -3);
	datetime1 = date+" "+time1;
	datetime = date+" "+time;
	
	//var pm=this.GetPM();
		//var Appletid = pm.Get("GetFullId");
		var recordset=pm.Get("GetRecordSet");
		
    }

    SCStorePreviousReportListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.BindData.apply(this, arguments);
		var recordset=pm.Get("GetRecordSet");
		var prev_markup='';
					prev_markup+='	<div class="SC-table-with-scroll-main SC-store-table-width">';
					prev_markup+='                        <table class="SC-table" id="SC_Store-Info-table">';
					prev_markup+='                            <thead>';
					prev_markup+='                                <tr>';
					prev_markup+='                                    <th class="sort-by" id="storeid-sort">Store Id</th>';
					prev_markup+='                                    <th class="sort-by" id="machinename-sort">Store Name</th>';
					prev_markup+='                                    <th class="sort-by" id="dateofreport-sort">Date Of Report</th>';
					prev_markup+='                                    <th class="sort-by" id="dailytotal-sort">Daily total</th>';
					prev_markup+='                                    <th>report</th>';
					prev_markup+='                                </tr>';
					prev_markup+='                            </thead>';
					prev_markup+='                            <tbody id="Prev_Table_Data">';
					prev_markup+='                            </tbody>';
					prev_markup+='                        </table>';
					prev_markup+='	</div>';
			$("#SC_Previous-Report-table").html(prev_markup);
			var rec=Sorting_Previous_Data(recordset);
		 $(document).ready(function() {
		//on click of taoday table
		$("#SC-today-report").click(function() {
        $("#SC_Today-Report-table").show();
         $("#SC-today-report").addClass("store-active");
         $("#SC-previous-report").removeClass("store-active");
        $("#SC_Previous-Report-table").hide();
		$("#SC-Calendar").hide();
		$("#sc-search").show();
		$("#SC-Store-info").show();
		});
		//on click of previous table
		$("#SC-previous-report").click(function() {
			SiebelJS.Log("in prev");
		$("#input_date_id").val("");
        $("#SC_Previous-Report-table").show();
        $("#SC-today-report").removeClass("store-active");
        $("#SC-previous-report").addClass("store-active");
		$("#SC-Calendar").show();
		$("#sc-search").hide();
        $("#SC_Today-Report-table").hide();
		$("#SC-Store-info").hide();
		
		//calling previous report table
			var prev_markup='';
					prev_markup+='	<div class="SC-table-with-scroll-main SC-store-table-width">';
					prev_markup+='                        <table class="SC-table" id="SC_Store-Info-table">';
					prev_markup+='                            <thead>';
					prev_markup+='                                <tr>';
					prev_markup+='                                    <th class="sort-by" id="storeid-sort">Store Id</th>';
					prev_markup+='                                    <th class="sort-by" id="machinename-sort">Store Name</th>';
					prev_markup+='                                    <th class="sort-by" id="dateofreport-sort">Date Of Report</th>';
					prev_markup+='                                    <th class="sort-by" id="dailytotal-sort">Daily total</th>';
					prev_markup+='                                    <th>report</th>';
					prev_markup+='                                </tr>';
					prev_markup+='                            </thead>';
					prev_markup+='                            <tbody id="Prev_Table_Data">';
					prev_markup+='                            </tbody>';
					prev_markup+='                        </table>';
					prev_markup+='	</div>';
			
			$("#SC_Previous-Report-table").html(prev_markup);
			var rec=Sorting_Previous_Data(recordset);
			//PreRec
		});
			
	 });
		
		//on click of the date picker from previous reports table
		$(document).unbind("#input_date_id").on("click","#input_date_id",function(){
					//var fvalue="";	
					//calendar_function(fvalue);
		//document.getElementById("input_date_id").disabled = false;					
		 $("#input_date_id").datepicker({
						onSelect: function (dateText, inst) {
						$("#input_date_id").val(dateText);
						if($("#input_date_id").val() != "")
							$(".delete-icon").show();
							var fvalue= $("#input_date_id").val();
							document.getElementById("input_date_id").disabled = true;
							calendar_function(fvalue);
							
				 }
				
			});
		});
		
		
		$(document).on("click",".delete-icon",function(){
			SiebelJS.Log("on click of the image");
			$("#input_date_id").val("");
			document.getElementById("input_date_id").disabled = false;
			var fvalue='';
			calendar_function(fvalue);
			$(".delete-icon").hide();
			
		});
		
	
		
    }

    SCStorePreviousReportListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.BindEvents.apply(this, arguments);
	 var recordset=pm.Get("GetRecordSet");
	 var prev_markup='';
					prev_markup+='	<div class="SC-table-with-scroll-main SC-store-table-width">';
					prev_markup+='                        <table class="SC-table" id="SC_Store-Info-table">';
					prev_markup+='                            <thead>';
					prev_markup+='                                <tr>';
					prev_markup+='                                    <th class="sort-by" id="storeid-sort">Store Id</th>';
					prev_markup+='                                    <th class="sort-by" id="machinename-sort">Store Name</th>';
					prev_markup+='                                    <th class="sort-by" id="dateofreport-sort">Date Of Report</th>';
					prev_markup+='                                    <th class="sort-by" id="dailytotal-sort">Daily total</th>';
					prev_markup+='                                    <th>report</th>';
					prev_markup+='                                </tr>';
					prev_markup+='                            </thead>';
					prev_markup+='                            <tbody id="Prev_Table_Data">';
					prev_markup+='                            </tbody>';
					prev_markup+='                        </table>';
					prev_markup+='	</div>';
			$("#SC_Previous-Report-table").html(prev_markup);
	 var rec = Sorting_Previous_Data(recordset);
	 //highlating the selected row
		//$("#SC_Store-Info-table tbody tr").on('click', function() {
		$(document).on("click","#SC_Store-Info-table tbody tr",function(){
			var rowid = $(this).attr('id');
			//$('#' + rowid).addClass('highlate-row');
			$('#' + rowid).addClass('highlate-row').siblings().removeClass('highlate-row');
		});
		//});
		
		$(document).on("click","#SC_Store-Info-table tbody tr , td:not(:nth-child(4))",function(){
			SiebelJS.Log("on click of previous table tr");
			var rowid = $(this).attr('id');
			SiebelJS.Log("rowid:"+rowid);
			//$('#' + rowid).addClass('highlate-row');
			$('#' + rowid).addClass('highlate-row').siblings().removeClass('highlate-row');
		});

		//code for profile button click starts
		 $("#SC-profile").click(function() {
			 $(".SC-Profile-container").toggle();
		 });
		 $(document).click(function(e) {
			if (!$(e.target).closest('#SC-profile, .SC-Profile-container').length) {
           $(".SC-Profile-container").hide();
			}
		});
	    //on click of logout
	    $("#logout").click(function() {
			   SiebelApp.S_App.LogOff();
		});
		$(document).ready(function() {
		//on button click of Home
		$('#SC_HOME').click(function(){
		$("#_swescrnbar").show();
		$("#_swethreadbar").show();
		$("#_sweappmenu").show();
		$("#s_vctrl_div").show();
		$(".siebui-button-toolbar").show();
			  InPS.SetProperty("View","Home Page View (WCC)"); 
			  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
			  OutPS = Service.InvokeMethod("GotoView",InPS);
		});
		//on button click of Contacts
		$("#SC_CONTACTS").click(function(){
		$("#_swescrnbar").show();
		$("#_swethreadbar").show();
		$("#_sweappmenu").show();
		$("#s_vctrl_div").show();
		$(".siebui-button-toolbar").show();
			  InPS.SetProperty("View","Visible Contact List View"); 
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
			  InPS.SetProperty("View","Visible Contact List View"); 
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
			  InPS.SetProperty("View","Order Entry - My Teams Orders View (Sales)"); 
			  Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
			  OutPS = Service.InvokeMethod("GotoView",InPS);	
		});
		});
		//on click of generate report button	
		$(document).on("click","#sc-search",function(){
				SiebelJS.Log("in generate report");
				//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSortSpec('SCCreated','DESC');
				$("#SC_Previous-Report-table").show();
				$("#SC-today-report").removeClass("store-active");
				$("#SC-previous-report").addClass("store-active");
				$("#SC_Today-Report-table").hide();
				$("#SC-Store-info").hide();
				InPS3.SetProperty("actualsales",daily_total); 
				Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
				OutPS3 = Service3.InvokeMethod("SC Previous Data",InPS3);
				SiebelJS.Log("daily_total:"+daily_total);
				
				var prev_markup='';
					prev_markup+='	<div class="SC-table-with-scroll-main SC-store-table-width">';
					prev_markup+='                        <table class="SC-table" id="SC_Store-Info-table">';
					prev_markup+='                            <thead>';
					prev_markup+='                                <tr>';
					prev_markup+='                                    <th class="sort-by" id="storeid-sort">Store Id</th>';
					prev_markup+='                                    <th class="sort-by" id="machinename-sort">Store Name</th>';
					prev_markup+='                                    <th class="sort-by" id="dateofreport-sort">Date Of Report</th>';
					prev_markup+='                                    <th class="sort-by" id="dailytotal-sort">Daily total</th>';
					prev_markup+='                                    <th>report</th>';
					prev_markup+='                                </tr>';
					prev_markup+='                            </thead>';
					prev_markup+='                            <tbody id="Prev_Table_Data">';
					prev_markup+='                            </tbody>';
					prev_markup+='                        </table>';
					prev_markup+='	</div>';
			
			$("#SC_Previous-Report-table").html(prev_markup);
			var rec=Sorting_Previous_Data(recordset);
			document.getElementById("sc-search").disabled = true;
				
		});
			 
	   //code for downloading bip report
	   $(document).on("click","#so-add-cart",function(){
			//var PreRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
			//downloading_report(PreRec);
			var id=this.id;
			SiebelJS.Log("id value for image:"+id);
	   });
	   
		//sorting code in previous table
		$(document).on("click",".sort-by",function(){
			var PreTablePM=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM();
			//code for previous list applet
			if($(this).attr('id')=="storeid-sort"){
			if(a==true){SiebelJS.Log("In asc");PreTablePM.ExecuteMethod("OnClickSort", "Store Id", 'asc');setTimeout(function(){Sorting_Previous_Data();}, 500);a=false;}
			else{SiebelJS.Log("In dec");PreTablePM.ExecuteMethod("OnClickSort", "Store Id", 'desc');setTimeout(function(){Sorting_Previous_Data();}, 500);a=true;}
			}
			else if($(this).attr('id')=="machinename-sort"){
			if(b==true){SiebelJS.Log("In asc");PreTablePM.ExecuteMethod("OnClickSort", "Store Name", 'asc');setTimeout(function(){Sorting_Previous_Data();}, 500);b=false;}
			else{SiebelJS.Log("In dec");PreTablePM.ExecuteMethod("OnClickSort", "Store Name", 'desc');setTimeout(function(){Sorting_Previous_Data();}, 500);b=true;}
			}
			else if($(this).attr('id')=="dateofreport-sort"){
			if(c==true){SiebelJS.Log("In asc");PreTablePM.ExecuteMethod("OnClickSort", "Report Date", 'asc');setTimeout(function(){Sorting_Previous_Data();}, 500);c=false;}
			else{SiebelJS.Log("In dec");PreTablePM.ExecuteMethod("OnClickSort", "Report Date", 'desc');setTimeout(function(){Sorting_Previous_Data();}, 500);c=true;}
			}
			else if($(this).attr('id')=="dailytotal-sort"){
			if(d==true){SiebelJS.Log("In asc");PreTablePM.ExecuteMethod("OnClickSort", "Actual Sales", 'asc');setTimeout(function(){Sorting_Previous_Data();}, 500);d=false;}
			else{SiebelJS.Log("In dec");PreTablePM.ExecuteMethod("OnClickSort", "Actual Sales", 'desc');setTimeout(function(){Sorting_Previous_Data();}, 500);d=true;}
			}
		});
	 		
    }

    SCStorePreviousReportListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCStorePreviousReportListAppletPR.superclass.EndLife.apply(this, arguments);
    }
	
	function Sorting_Previous_Data(recordset)
	{
		var PreRec=recordset;
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSortSpec('SCCreated','ASC');
		var Prev_Markup_New = "";
			SiebelJS.Log("PreRec.length"+PreRec.length);
			for(var i = 0; i < PreRec.length; i++){
				var j="prow"+(i+1);
				Prev_Markup_New+='<tr id='+j+'>';
					var actualsalesvalue = PreRec[i]["Actual Sales"];
					actualsalesvalue=Number(actualsalesvalue.replace(/[^0-9\.-]+/g,""));
					actualsalesvalue=parseFloat(actualsalesvalue).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					if(PreRec[i]["Store Id"] != null){Prev_Markup_New+='<td>'+PreRec[i]["Store Id"]+'</td>';}
					else{Prev_Markup_New+='<td></td>';}
					if(PreRec[i]["Machine Name"] != null){Prev_Markup_New+='<td>'+PreRec[i]["Machine Name"]+'</td>';}
					else{Prev_Markup_New+='<td></td>';}
					if(PreRec[i]["Date of Report"] != null){Prev_Markup_New+='<td>'+PreRec[i]["Date of Report"]+'</td>';}
					else{Prev_Markup_New+='<td></td>';}
					if(PreRec[i]["Actual Sales"] != null){Prev_Markup_New+='<td>$'+actualsalesvalue+'</td>';}
					else{Prev_Markup_New+='<td></td>';}
					if(PreRec[i]["BIP Report Id"] != null){Prev_Markup_New+='<td id="download_image'+i+'"><img src="../images/custom/printer-blue.png" class="so-add-cart"/></td>';}
					else{Prev_Markup_New+='<td><img src="../images/custom/printer-hex.png" class="so-add-cart sc-disabled"/></td>';}
					Prev_Markup_New+='</tr>';
				}
		$("#Prev_Table_Data").html(Prev_Markup_New);
		return PreRec;
	}
	
	function calendar_function(fvalue)
	{
	 var FieldQueryPair;
		var fvalue1=fvalue;
		SiebelJS.Log("fvalue in function:"+fvalue1);
		FieldQueryPair  =  {"Date of Report":fvalue1};
		SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Store Previous Report List Applet");
							
						 
	}
	function downloading_report(PreRec)
	{
		var recset = PreRec;
		for(var i=0;i<recset;i++)
		{
			$("#download_image"+i).on('click', function(event){
				var id=this.id;
				SiebelJS.Log("id value for download report:"+id);
			});
		}
	}


    return SCStorePreviousReportListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCStorePreviousReportListAppletPR";
 })
}
