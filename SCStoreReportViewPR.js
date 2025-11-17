//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=View&name=SCStoreReportView&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCStoreReportViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCStoreReportViewPR");
 define("siebel/custom/SelectComfort/SCStoreReportViewPR", ["siebel/viewpr","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCStoreMarkup","siebel/custom/SelectComfort/SC_OUI_Markups",],
  function () {
   SiebelAppFacade.SCStoreReportViewPR = (function () {
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
	
	
	var regcount;
	var Service,Service1,Service2,Service3,Service4,CurrentDate,time,time1,date,datetime,datetime1;
	var markup='';
	var TodRec='';
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
	var previous_recordset='';
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
		
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
	var StoreMarkup = SiebelJS.Dependency("SiebelApp.SCStoreMarkup");
    var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	//SiebelJS.Log("StoreMarkup"+StoreMarkup);
    function SCStoreReportViewPR(pm) {
		 SiebelAppFacade.SCStoreReportViewPR.superclass.constructor.apply(this, arguments);
		
    }

    SiebelJS.Extend(SCStoreReportViewPR, SiebelAppFacade.ViewPR);

    SCStoreReportViewPR.prototype.Init = function () {
     SiebelAppFacade.SCStoreReportViewPR.superclass.Init.apply(this, arguments);
    }

    SCStoreReportViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCStoreReportViewPR.superclass.ShowUI.apply(this, arguments);
	 SiebelJS.Log("Welcome");
	 var mainmarkup = StoreMarkup.StoreMainMarkup();
	 $("#_sweview").hide();
	 $(mainmarkup).insertAfter("#_sweview");
	// $("#sc-search").disabled = true;
	document.getElementById("sc-search").disabled = true;
	
	CurrentDate = new Date();
	date = CurrentDate.toLocaleDateString("en-US");
	time1 = CurrentDate.toLocaleTimeString('en-GB');
	time = time1.slice(0, -3);
	datetime1 = date+" "+time1;
	datetime = date+" "+time;
		
    }
	
    SCStoreReportViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCStoreReportViewPR.superclass.BindData.apply(this, arguments);
	 //calling todays table if record exists display else display generate data
	 var Tod_Report='';
					Tod_Report+='<div class="SC-table-with-scroll-main SC-store-table-width">';
					Tod_Report+='                        <table class="SC-table" id="SC-store-detail-table" style="display:none">';
					Tod_Report+='                            <thead>';
					Tod_Report+='                                <tr>';
					Tod_Report+='                                    <th class="sort-by">Store Id</th>';
					Tod_Report+='                                    <th class="sort-by">Machine</th>';
					Tod_Report+='                                    <th class="sort-by">Created by</th>';
					Tod_Report+='                                    <th class="sort-by">Date</th>';
					Tod_Report+='                                    <th class="sort-by">Store</th>';
					Tod_Report+='                                    <th class="sort-by">Cash E</th>';
					Tod_Report+='                                    <th class="sort-by">Check e</th>';
					Tod_Report+='                                    <th class="sort-by">cc e</th>';
					Tod_Report+='                                    <th class="sort-by">gc e</th>';
					Tod_Report+='                                    <th class="sort-by">finance</th>';
					Tod_Report+='                                    <th class="sort-by">ic e</th>';
					Tod_Report+='                                    <th class="sort-by">cash a</th>';
					Tod_Report+='                                    <th class="sort-by">check a</th>';
					Tod_Report+='                                    <th class="sort-by">cc a</th>';
					Tod_Report+='                                    <th class="sort-by">gc a</th>';
					Tod_Report+='                                    <th class="sort-by">finance</th>';
					Tod_Report+='                                    <th class="sort-by">ic a</th>';
					Tod_Report+='                                    <th class="sort-by">comments</th>';
					Tod_Report+='                                    <th class="sort-by">report</th>';
					Tod_Report+='                                </tr>';
					Tod_Report+='                            </thead>';
					Tod_Report+='                            <tbody id="Tod_Table_Data">';
					Tod_Report+='                            </tbody>';
					Tod_Report+='                        </table>';
					Tod_Report+='                   </div>';
					$("#SC_Today-Report-table").html(Tod_Report);
					
					var value = Sorting_Tod_Data();
					SiebelJS.Log("after function value is:"+value);
					if(value == 1)
					{
						markup+='					<div class="SC-Generate-data-contanier clearfix" id="generate">';
						markup+='                            <img src="../images/custom/printer.png" />';
						markup+='                            <p> Click Generate Data to proceed</p>';
						markup+='                            <button id="SC-generate-report">Generate Data</button>';
						markup+='                     </div>';
						$("#SC_Today-Report-table").html(markup);
					}
			previous_recordset=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");		
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
			var rec=Sorting_Previous_Data(previous_recordset);
			
			
			
		//on click of submit button from generate data popup	
		$(document).on("click","#SC-store-submit",function(){
			$("#SC-store-details").modal('hide');
			$('.SC-Generate-data-contanier').hide();
				
				for(i=0;i<regcount;i++)
				{
					storeid[i] = "12345";
					macinename[i] = $("#R"+i).text();
					createdby[i] = "scherku";
					store[i] = "North Hollywood";
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
					
					
					SiebelJS.Log("cashexpecteed[i]:"+cashexpecteed[i]);
					SiebelJS.Log("checkexpected[i]:"+checkexpected[i]);
					SiebelJS.Log("ccexpected[i] :"+ccexpected[i] );
					SiebelJS.Log("bcexpected[i]:"+bcexpected[i]);
					SiebelJS.Log("finexpected[i]:"+finexpected[i]);
					SiebelJS.Log("gcexpected[i]:"+gcexpected[i]);
					
					if($("#casha_idr"+i+"").val() != "" && $("#check_idr"+i+"").val() != "" && $("#cca_idr"+i+"").val() != "" && $("#gca_idr"+i+"").val() != "" && $("#bca_idr"+i+"").val() != "" && $("#financea_idr"+i+"").val() != "" && $("#commentsr"+i+"").val() != ""){
					cashactual[i] = $("#casha_idr"+i+"").val();
					checkactual[i] = $("#checka_idr"+i+"").val();
					ccactual[i] = $("#cca_idr"+i+"").val();
					bcactual[i] = $("#bca_idr"+i+"").val();
					finactual[i] = $("#financea_idr"+i+"").val();
					gcactual[i] = $("#gca_idr"+i+"").val();
					comment[i] = $("#commentsr"+i+"").val();
					
					SiebelJS.Log("cashactual[i]:"+cashactual[i]);
					SiebelJS.Log("checkactual[i]:"+checkactual[i]);
					SiebelJS.Log("ccactual[i] :"+ccactual[i] );
					SiebelJS.Log("bcactual[i]:"+bcactual[i]);
					SiebelJS.Log("finactual[i]:"+finactual[i]);
					SiebelJS.Log("gcactual[i]:"+gcactual[i]);
					}
					
				}
					
				 InPS1.SetProperty("regcount",regcount); 
				 InPS1.SetProperty("storeid",storeid); 
				 InPS1.SetProperty("machinename",macinename); 
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
				 InPS1.SetProperty("Comments",comment); 
				 
				 Service1 = SiebelApp.S_App.GetService("SC Store Data BS");
				 OutPS1 = Service1.InvokeMethod("SC storeData",InPS1);
		 
			$("#SC_Today-Report-table").show();
			$("#SC-today-report").addClass("store-active");
			var Tod_Report='';
			Tod_Report+='<div class="SC-table-with-scroll-main SC-store-table-width">';
			Tod_Report+='                        <table class="SC-table" id="SC-store-detail-table">';
			Tod_Report+='                            <thead>';
			Tod_Report+='                                <tr>';
			Tod_Report+='                                    <th class="sort-by">Store Id</th>';
			Tod_Report+='                                    <th class="sort-by">Machine</th>';
			Tod_Report+='                                    <th class="sort-by">Created by</th>';
			Tod_Report+='                                    <th class="sort-by">Date</th>';
			Tod_Report+='                                    <th class="sort-by">Store</th>';
			Tod_Report+='                                    <th class="sort-by">Cash E</th>';
			Tod_Report+='                                    <th class="sort-by">Check e</th>';
			Tod_Report+='                                    <th class="sort-by">cc e</th>';
			Tod_Report+='                                    <th class="sort-by">gc e</th>';
			Tod_Report+='                                    <th class="sort-by">finance</th>';
			Tod_Report+='                                    <th class="sort-by">ic e</th>';
			Tod_Report+='                                    <th class="sort-by">cash a</th>';
			Tod_Report+='                                    <th class="sort-by">check a</th>';
			Tod_Report+='                                    <th class="sort-by">cc a</th>';
			Tod_Report+='                                    <th class="sort-by">gc a</th>';
			Tod_Report+='                                    <th class="sort-by">finance</th>';
			Tod_Report+='                                    <th class="sort-by">ic a</th>';
			Tod_Report+='                                    <th class="sort-by">comments</th>';
			Tod_Report+='                                    <th class="sort-by">report</th>';
			Tod_Report+='                                </tr>';
			Tod_Report+='                            </thead>';
			Tod_Report+='                            <tbody id="Tod_Table_Data">';
			Tod_Report+='                            </tbody>';
			Tod_Report+='                        </table>';
			
			Tod_Report+='                   </div>';
			
			$("#SC_Today-Report-table").html(Tod_Report);
			Sorting_Tod_Data();
			
			
		});
		
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
			var PreRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
			$("#SC_Previous-Report-table").html(prev_markup);
			var rec=Sorting_Previous_Data(PreRec);
			//PreRec
		});
			
	 });
		
		//on click of the date picker from previous reports table
		$(document).unbind("#input_date_id").on("click","#input_date_id",function(){
			 $("#input_date_id").datepicker({
				onSelect: function (dateText, inst) {
				$("#input_date_id").val(dateText);
				if($("#input_date_id").val() != "")
					var fvalue= $("#input_date_id").val();
				}
			});
		});
		
		
		$(document).on("click",".delete-icon",function(){
			SiebelJS.Log("on click of the image");
			$("#input_date_id").val("");
			var fvalue='';
			calendar_function(fvalue);
			
		});
		
	
    }
	

    SCStoreReportViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCStoreReportViewPR.superclass.BindEvents.apply(this, arguments);
	
		//highlating the selected row
		//$("#SC_Store-Info-table tbody tr").on('click', function() {
		$(document).on("click","#SC_Store-Info-table tbody tr",function(){
			SiebelJS.Log("on click of previous table tr");
			var rowid = $(this).attr('id');
			SiebelJS.Log("rowid:"+rowid);
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
			var storeUser =  SiebelApp.S_App.GetProfileAttr("SC Store User");
			if(storeUser=="Y")
				InPS.SetProperty("View","User Profile Default View");
			else
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
		//on click of generate data button
		$(document).on("click","#SC-generate-report",function(){
				SiebelJS.Log("In generate data");
				InPS2.SetProperty();
				Service2 = SiebelApp.S_App.GetService("SC Store Data BS");
				OutPS2 = Service2.InvokeMethod("SC Expected Data",InPS2);
			    regcount = OutPS2.GetChild(0).GetChildCount();
				var GenReport=Generate_Report(regcount);
				$("#generatereport").html(GenReport);
				SiebelJS.Log("regcount:"+regcount);
				calculatevalues(regcount);
				$("#SC-store-details").modal({
				backdrop: 'static'
				});
				
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
			var PreRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Previous Report List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
			$("#SC_Previous-Report-table").html(prev_markup);
			var rec=Sorting_Previous_Data(PreRec);
			document.getElementById("sc-search").disabled = true;
				
		});
			
		//on click of the rows in todays table to expand and collapse the rows	
		$(document).on("click","#SC-store-detail-table tbody tr , td:not(:nth-child(18))", function(){
			if($(this).parent().next('tr').hasClass("showhide") ){
			var hidden = $(this).parent().next('tr.showhide').is(":visible");
			if (hidden) {
				$(this).parent().removeClass("main-bg");
				$(this).parent().next('tr.showhide').hide('slow');

			} else {
				$("#SC-store-detail-table tbody tr").not(this).siblings().next('tr.showhide').hide('slow');
				$(this).parent().next('tr.showhide').show('slow');
				var selected = $(this).parent().hasClass("main-bg");
				$("#SC-store-detail-table tbody tr").removeClass("main-bg");
				$(this).parent().addClass("main-bg");

			}
			}
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

    SCStoreReportViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCStoreReportViewPR.superclass.EndLife.apply(this, arguments);
	 setTimeout(function(){ 
	   window.location.reload(true);
	  }, 200);
    }
	
	function Sorting_Tod_Data()
	{
		var Tod_Markup_New = "";
	    var pr;
		InPS2.SetProperty();
		Service2 = SiebelApp.S_App.GetService("SC Store Data BS");
		OutPS2 = Service2.InvokeMethod("SC Expected Data",InPS2);
		var TodRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		
		//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSortSpec('SCCreated','DESC');
		SiebelJS.Log("TodRec.length:"+TodRec.length);
		var j,v;
		j=0;
		var value_found =0;
		while(j<TodRec.length){
					
					v = TodRec[j]["Date"];
					var d=new Date(v);
					d = d.toLocaleDateString("en-US");
					SiebelJS.Log("d value:"+d);
					SiebelJS.Log("date value:"+date);
					
					if(d == date)
					{
						value_found=1;
						document.getElementById("SC-store-detail-table").style.display = "block";
						
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
						
						if(TodRec[j]["Store Id"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Store Id"]+'</td>';}
						else{Tod_Markup_New+='<td></td>';}
						if(TodRec[j]["Machine Name"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Machine Name"]+'</td>';}
						else{Tod_Markup_New+='<td></td>';}
						if(TodRec[j]["Created By"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Created By"]+'</td>';}
						else{Tod_Markup_New+='<td></td>';}
						if(TodRec[j]["Created"] != null){Tod_Markup_New+='<td>'+TodRec[j]["Created"]+'</td>';}
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
						Tod_Markup_New+='<td class="comments-col"><textarea name="detdes" class="SC-input  no-padding">'+TodRec[j]["Comments"]+'</textarea></td>';
						if(TodRec[j]["Report Generated?"] != null){Tod_Markup_New+='<td><img src="../images/custom/report_flag.png" class="so-add-cart"/></td>';}
						else{Tod_Markup_New+='<td><img src="../images/custom/report_flag.png" class="so-add-cart"/></td>';}
						Tod_Markup_New+='</tr>';
						
						/*Tod_Markup_New+='<tr class="showhide">';
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
						Tod_Markup_New+='                                                    <tbody>';
						for(var regcnt=0;regcnt<OutPS2.GetChild(0).GetChildCount();regcnt++){
							if(TodRec[j]["SC Machine Name"] == OutPS2.GetChild(0).GetChild(regcnt).GetProperty("MachineName"))
							{
								pr = regcnt;
							}
						}
						for(var r=0;r<OutPS2.GetChild(0).GetChild(pr).GetChildCount();r++){
							var ordernumber = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Order Number")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Order Number")):"";
							var billingname = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Billing Account")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Billing Account")):"";
							var revision = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Revision")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("Revision")):"";
							var cashvalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcash")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcash")):0.00;
							var checkvalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcheck")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcheck")):0.00;
							var creditcardvalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcc")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumcc")):0.00;
							var financevalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumfin")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumfin")):0.00;
							var giftcardvalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumgc")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumgc")):0.00;
							var icvalue = OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumic")!=""?parseFloat(OutPS2.GetChild(0).GetChild(pr).GetChild(r).GetProperty("sumic")):0.00;
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
						Tod_Markup_New+='                                                    </tbody>';
						}
						Tod_Markup_New+='                                                </table>';
						Tod_Markup_New+='                                            </div>';
						Tod_Markup_New+='                                        </div>';
						Tod_Markup_New+='                                    </td>';
						Tod_Markup_New+='                                </tr>';*/
               		}				
			j++;
		}
		
		if(value_found == 1)
			{
			document.getElementById("sc-search").disabled = false;
			$("#Tod_Table_Data").html(Tod_Markup_New);
			}
			else
			{
			return 1;
			}
					
	}
	
	
	function Sorting_Previous_Data(PreRec1)
	{
			var PreRec=PreRec1;
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
	
	function Generate_Report(regcount)
	{
		var expected_value = 0;
		var regcount = regcount;
		var Gen_Report='';
			Gen_Report+='                      <div class="modal-header">';
			Gen_Report+='                        <div class="store-info">';
			Gen_Report+='                           <p>Sleep Number - Closing Cash Report</p>';
			Gen_Report+='                           <span id="spantime">'+datetime+'</span> ';
			Gen_Report+='                        </div>';
			Gen_Report+='                        <div class="store-info">';
			Gen_Report+='                            <p class="sales-person-name">Salesperson:<span>'+theApplication().GetProfileAttr("Last Name")+' '+theApplication().GetProfileAttr("First Name")+'</span></p>';
			Gen_Report+='                            <span>10691 lubbock- Lubbock TX</span>';
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
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash") >=0){
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">-$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row2_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Checks</td>';
			SiebelJS.Log("check value:"+checkvalue);
			Gen_Report+='                                    <td class="td-padding" id="checke_idr'+i+'" value="">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="checka_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">-$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                               </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row3_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">CC Certificates</td>';
			Gen_Report+='                                    <td class="td-padding" id="cce_idr'+i+'" value="">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'')+'</td>';
			Gen_Report+='                                   <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="cca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">-$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row4_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Bank Cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="bce_idr'+i+'" value="">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="bca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumic") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">-$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row5_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Finance</td>';
			Gen_Report+='                                    <td class="td-padding" id="financee_idr'+i+'" value="">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="financea_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">-$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row6_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Gift cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="gce_idr'+i+'" value="">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="gca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc") >= 0){
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
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcash") >=0){
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cash_resultr'+i+'">-$'+cashvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                   </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row2_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Checks</td>';
			Gen_Report+='                                    <td class="td-padding" id="checke_idr'+i+'" value="">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="checka_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcheck") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="check_resultr'+i+'">-$'+checkvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                               </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row3_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">CC Certificates</td>';
			Gen_Report+='                                    <td class="td-padding" id="cce_idr'+i+'" value="">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                   <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="cca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumcc") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="cc_resultr'+i+'">-$'+creditcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                <tr class="no-bg" id="table_Row4_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Bank Cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="bce_idr'+i+'" value="">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="bca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumic") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="bc_resultr'+i+'">-$'+icvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row5_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Finance</td>';
			Gen_Report+='                                    <td class="td-padding" id="financee_idr'+i+'" value="">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="financea_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumfin") >= 0){
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}
			else{
			Gen_Report+='                                    <td class="td-padding" id="finance_resultr'+i+'">-$'+financevalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';}	
			Gen_Report+='                                 </tr>';
			Gen_Report+='                                 <tr class="no-bg" id="table_Row6_r'+i+'">';
			Gen_Report+='                                    <td class="td-padding">Gift cards</td>';
			Gen_Report+='                                    <td class="td-padding" id="gce_idr'+i+'" value="">$'+giftcardvalue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			Gen_Report+='                                    <td class="td-padding"><input type="text" name="qty'+i+'" class="shipping-input padding-for-currency" id="gca_idr'+i+'" value="0.00"><span class="currency">$</span></td>';
			if(OutPS2.GetChild(0).GetChild(i).GetProperty("sumgc") >= 0){
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
			Gen_Report+='                                    <td class="td-padding pending" id="acttotr'+i+'">$0.00</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="ostotr'+i+'">$0.00</td>';
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
			Gen_Report+='                                    <td class="td-padding pending" id="acttotr'+i+'">$0.00</td>';
			Gen_Report+='                                    <td class="td-padding pending" id="ostotr'+i+'">$0.00</td>';
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
			Gen_Report+='                             <p class="item-value pending" id="daily-total-os" value="">$0.00</p>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         </div>';
			Gen_Report+='                         </div>';
			return Gen_Report;
			
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
										var cash_total = $("#casha_idr"+str).val()-parseFloat(cashexpe);
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
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(cash_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#casha_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(cash_total);
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
										actual_daily_total = actual_daily_total - value;
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
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
										var check_total = parseFloat($("#checka_idr"+str).val())- parseFloat(checkexpe);
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
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(check_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#checka_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(check_total);
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
										SiebelJS.Log(val_actual);
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total - value;
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
									});
									
									$("#cca_idr"+reg).on('focusout', function(event){
										var str=this.id;
										str=str.split("r");
										str=str[1];
										var ccexpe = $("#table_Row3_r"+str).find("#cce_idr"+str).text();
										ccexpe = Number(ccexpe.replace(/[^0-9\.-]+/g,""));
										if($("#cca_idr"+str).val() != "")
										{
										var cc_total = $("#cca_idr"+str).val()- parseFloat(ccexpe);
										$("#table_Row3_r"+str).find("#cc_resultr"+str).text("$"+parseFloat(cc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
										else{
											$("#table_Row3_r"+str).find("#cc_resultr"+str).text("-$"+parseFloat(ccexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										}
										var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
										var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
										val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
										val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#cca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(cc_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#cca_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(cc_total);
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
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total - value;
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
									});
									
									$("#bca_idr"+reg).on('focusout', function(event){
										var str=this.id;
										str=str.split("r");
										str=str[1];
										var bcexpe = $("#table_Row4_r"+str).find("#bce_idr"+str).text();
										bcexpe = Number(bcexpe.replace(/[^0-9\.-]+/g,""));
										if($("#bca_idr"+str).val() != "")
										{
										var bc_total = $("#bca_idr"+str).val()- parseFloat(bcexpe);
										$("#table_Row4_r"+str).find("#bc_resultr"+str).text("$"+parseFloat(bc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
										else{
											$("#table_Row4_r"+str).find("#bc_resultr"+str).text("-$"+parseFloat(bcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										}
										var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
										var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
										val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
										val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#bca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(bc_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#bca_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(bc_total);
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
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total - value;
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
									});
									
									$("#financea_idr"+reg).on('focusout', function(event){
										var str=this.id;
										str=str.split("r");
										str=str[1];
										var financeexpe = $("#table_Row5_r"+str).find("#financee_idr"+str).text();
										financeexpe = Number(financeexpe.replace(/[^0-9\.-]+/g,""));
										if($("#financea_idr"+str).val() != "")
										{
										var finance_total = $("#financea_idr"+str).val()- parseFloat(financeexpe);
										$("#table_Row5_r"+str).find("#finance_resultr"+str).text("$"+parseFloat(finance_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
										else{
											$("#table_Row5_r"+str).find("#finance_resultr"+str).text("-$"+parseFloat(financeexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										}
										var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
										var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
										val_actual = Number(val_actual.replace(/[^0-9\.-]+/g,""));
										val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#financea_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(finance_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#financea_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(finance_total);
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
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total - value;
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
									});
									
									$("#gca_idr"+reg).on('focusout', function(event){
										var str=this.id;
										str=str.split("r");
										str=str[1];
										var gcexpe = $("#table_Row6_r"+str).find("#gce_idr"+str).text();
										gcexpe = Number(gcexpe.replace(/[^0-9\.-]+/g,""));
										if($("#gca_idr"+str).val() != "")
										{
										var gc_total = $("#gca_idr"+str).val()- parseFloat(gcexpe);
										$("#table_Row6_r"+str).find("#gc_resultr"+str).text("$"+parseFloat(gc_total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));}
										else{
											$("#table_Row6_r"+str).find("#gc_resultr"+str).text("-$"+parseFloat(gcexpe).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										}
										var val_actual = $("#totaltableid"+str).find("#acttotr"+str).text();
										var val_os = $("#totaltableid"+str).find("#ostotr"+str).text();
										val_actual =Number(val_actual.replace(/[^0-9\.-]+/g,""));
										val_os=Number(val_os.replace(/[^0-9\.-]+/g,""));
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)+parseFloat($("#gca_idr"+str).val())).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										$("#totaltableid"+str).find("#ostotr"+str).text("$"+(parseFloat(val_os)+parseFloat(gc_total)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total+parseFloat($("#gca_idr"+str).val());
										over_short_daily_total=over_short_daily_total+parseFloat(gc_total);
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
										$("#totaltableid"+str).find("#acttotr"+str).text("$"+(parseFloat(val_actual)-value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
										actual_daily_total = actual_daily_total - value;
										$("#daily-totals").find("#daily-total-actual").text("$"+actual_daily_total.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
									});
				}
		});				
									
	}
	function calendar_function(fvalue)
	{
		                  var FieldQueryPair;
							var fvalue1=fvalue;
							SiebelJS.Log("fvalue in function:"+fvalue1);
							FieldQueryPair  =  {"Date of Report":fvalue1};
							SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Store Previous Report List Applet");
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
					var rec=Sorting_Previous_Data(previous_recordset);
						 
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
  return SCStoreReportViewPR;
   }()
  );
  return "SiebelAppFacade.SCStoreReportViewPR";
 })
}
