//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=SCReportOutputListApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCReportOutputListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCReportOutputListAppletPR");
 define("siebel/custom/SelectComfort/SCReportOutputListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods",],
  function () {
   SiebelAppFacade.SCReportOutputListAppletPR = (function () {
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
    function SCReportOutputListAppletPR(pm) {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCReportOutputListAppletPR, SiebelAppFacade.JQGridRenderer);

    SCReportOutputListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.Init.apply(this, arguments);
    }

    SCReportOutputListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.ShowUI.apply(this, arguments);
	 //hiding tool tip.
		$('div[title="Store Report View"]').attr("title","");
	 pm=this.GetPM();
	 var Appletid = pm.Get("GetFullId");
	 SiebelJS.Log("reports applet id:"+Appletid);
	// mainmarkup = StoreMarkup.StoreMainMarkup();
	// $('#'+Appletid).append(mainmarkup);
	 $('#s_'+Appletid+'_div').hide();
		//loading waiting time
		$(document).ready(function (){
			$("body").bind('Custom.Start', function(ev) {
			  $('#maskoverlay').show();
			  SiebelJS.Log("Start");
			});

			$("body").bind('Custom.End', function(ev) {
				$('#maskoverlay').hide();
				SiebelJS.Log("Stop");
			});
		});
		
		 //on click of generate report button	
		/*$(document).on("click","#sc-search",function(e){
				SiebelJS.Log("in generate report");
				$("body").trigger('Custom.Start');
			    e.preventDefault();
				//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetBusComp().SetSortSpec('SCCreated','DESC');
				$("#SC_Previous-Report-table").show();
				$("#SC-today-report").removeClass("store-active");
				$("#SC-previous-report").addClass("store-active");
				$("#SC_Today-Report-table").hide();
				$("#SC-Store-info").hide();
				//$("body").trigger('Custom.Start');
			   //setTimeout(function(){
				var today_recordset = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
				//var today_recordset=Store_PM.Get("GetRecordSet");
				var mn_bs = today_recordset[0]["Machine Name"];
				//var mn_index = mn_bs.indexOf("_", 0);
				//var mn_substring = mn_bs.substring(0,mn_index);
				var InPS3 = SiebelApp.S_App.NewPropertySet();
				var OutPS3 = SiebelApp.S_App.NewPropertySet();
				InPS3.SetProperty("bipmachinename",mn_bs);
				var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
				OutPS3 = Service3.InvokeMethod("SC BIP Report",InPS3);
				//$("body").trigger('Custom.End');
				// },1000);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
				setTimeout(function() {
					$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
						setTimeout(function() {
							$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
						},1000);	
				},1000);	
				$("body").trigger('Custom.End');
		});*/
		
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
		
	}

    SCReportOutputListAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.BindData.apply(this, arguments);
	   
    }

    SCReportOutputListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.BindEvents.apply(this, arguments);
	 
    }

    SCReportOutputListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCReportOutputListAppletPR.superclass.EndLife.apply(this, arguments);
	 $(document).unbind('');
    }

    return SCReportOutputListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCReportOutputListAppletPR";
 })
}
