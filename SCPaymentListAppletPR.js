//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=SCPaymentListApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCPaymentListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCPaymentListAppletPR");
 define("siebel/custom/SelectComfort/SCPaymentListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/moment","siebel/custom/SelectComfort/moment-timezone-with-data.min","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCStoreMarkup","siebel/custom/SelectComfort/SC_OUI_Markups",],
  function () {
   SiebelAppFacade.SCPaymentListAppletPR = (function () {
	var a=true,b=true,c=true,d=true,e=true;
	var InPS = SiebelApp.S_App.NewPropertySet();
	var OutPS = SiebelApp.S_App.NewPropertySet();
	/*var InPS1 = SiebelApp.S_App.NewPropertySet();
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
	var recordset;	*/
	var pm="",mainmarkup="",Service,home=0;
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
	var StoreMarkup = SiebelJS.Dependency("SiebelApp.SCStoreMarkup");
    var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");

    function SCPaymentListAppletPR(pm) {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCPaymentListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCPaymentListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.Init.apply(this, arguments);
	 //for white screen
	 localStorage.setItem('whitescreen', 0);
    }

    SCPaymentListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.ShowUI.apply(this, arguments);
		SiebelJS.Log("Welcome");
		 //for white screen
		 $(".whitescreentimer").remove();
		 $("#custommaskoverlay").hide();
		 $('#_sweview').show()
		//hiding tool tip.
		$('div[title="Store Report View"]').attr("title","");
		// loading waiting time
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
		 pm=this.GetPM();
		 var Appletid = pm.Get("GetFullId");
		 SiebelJS.Log("Payments applet id:"+Appletid);
		 mainmarkup = StoreMarkup.StoreMainMarkup();
		 $('#'+Appletid).append(mainmarkup);
		 $('#s_'+Appletid+'_div').hide();
    }

    SCPaymentListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.BindData.apply(this, arguments);
    }

    SCPaymentListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.BindEvents.apply(this, arguments);
	 
		$(document).ready(function() {	
			//code for profile button click starts
			$("#SC-profile").click(function() {
			//$(document).on("click","#SC-profile",function(){
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
			//on button click of Home
			$('#SC_HOME').click(function(){
				localStorage.setItem('whitescreen', 1);
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
				/*InPS.SetProperty("View","Home Page View (WCC)"); 
				Service = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
				OutPS = Service.InvokeMethod("GotoView",InPS);*/
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
    }

    SCPaymentListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCPaymentListAppletPR.superclass.EndLife.apply(this, arguments);
		if(localStorage.getItem('whitescreen')==0){
			$("#_swescrnbar").hide();
			$("#_swethreadbar").hide();
			$("#_sweappmenu").hide();
			$("#s_vctrl_div").hide();
			$(".siebui-button-toolbar").hide();
			$("#_sweview").hide();
			$('#_swecontent').prepend(SC_OUI_Markup.CustomWhiteScreenTimer());
			$("#custommaskoverlay").show();
		}
		else if(localStorage.getItem('whitescreen')==1){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			$("#_sweview").show();
		}
	}

    return SCPaymentListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCPaymentListAppletPR";
 })
}
