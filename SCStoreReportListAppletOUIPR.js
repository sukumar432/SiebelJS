if (typeof(SiebelAppFacade.SCStoreReportListAppletOUIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCStoreReportListAppletOUIPR");
 define("siebel/custom/SelectComfort/SCStoreReportListAppletOUIPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/moment","siebel/custom/SelectComfort/moment-timezone-with-data.min","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCStoreReportMarkupOUI","siebel/custom/SelectComfort/SC_OUI_Markups"],
  function () {
   SiebelAppFacade.SCStoreReportListAppletOUIPR = (function () {
		var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
		var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");	
		var StoreMarkup = SiebelJS.Dependency("SiebelApp.SCStoreReportMarkupOUI");
		var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
		var pm="",sFirstTime,todayDate,scselecteddate,recordSet="";
    function SCStoreReportListAppletOUIPR(pm) {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCStoreReportListAppletOUIPR, SiebelAppFacade.JQGridRenderer);

    SCStoreReportListAppletOUIPR.prototype.Init = function () {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.Init.apply(this, arguments);
		sFirstTime="Y";
		todayDate="Y";
		// Hiding navigation tabs
		$("#_swescrnbar").hide();
		$("#_swethreadbar").hide();
		$("#_sweappmenu").hide();
		$("#s_vctrl_div").hide();
		$(".siebui-button-toolbar").hide();
		$("#_sweview").hide();
		$(".siebui-button-toolbar").hide();
		//$("#_swecontent").css("height","99%");
		$('#_sweview').css("overflow","auto");
	 	//SCOUIMethods.SCGetProfileAttr("SC Store Number,SCStoreName,Login Name,SC Store User,Last Name,First Name,MachineInfo");

    }

    SCStoreReportListAppletOUIPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.ShowUI.apply(this, arguments);
	 	var mainmarkup="",appletSeq="",Appletid="";
		mainmarkup = StoreMarkup.StoreMainMarkup();
		sFirstTime="Y";
		todayDate="Y";
		recordSet="";
		pm=this.GetPM();
		Appletid = pm.Get("GetFullId");
		appletSeq = Appletid[Appletid.length -1];
		SiebelJS.Log("todays applet id:"+Appletid);
		SiebelJS.Log("appletSeq:"+appletSeq);
		$('#s_'+Appletid+'_div').hide();
		$("#"+Appletid).append(mainmarkup);
		var a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get("GetFullId");
		$("#"+a).hide();
		a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment List Applet"].GetPModel().Get("GetFullId");
		$("#"+a).hide();
		customtimermarkup=SC_OUI_Markup.CustomTimer();
		$('#applet1').append(customtimermarkup);
		$("#scLoginuserId").text(SCOUIMethods.SCGetProfileAttrValue("Login Name"));
		var fisrtName=SCOUIMethods.SCGetProfileAttrValue("First Name");
		var LastName=SCOUIMethods.SCGetProfileAttrValue("Last Name");
		$("#loginInfo").text(fisrtName+' '+LastName);
		var machineinfo=SCOUIMethods.SCGetProfileAttrValue("MachineInfo");
		machineinfo=machineinfo.split("_");
		machineinfo=machineinfo[0];
		var tosysDate = new Date();
		var gettodaydate=moment(tosysDate, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY");
		$("#SC-Calendar").val(gettodaydate);
		//var d = new Date();
		//date=moment(d, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY");
		$("#sc-store-machinename").html('Store:'+machineinfo);
		 //on button click of Home
		$("#SC_STORE_HOME").click(function(){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			$("#_sweview").show();
			SiebelApp.S_App.GotoView("User Profile Default View");
		});
		scselecteddate="";
		
		
		//on button click of SaleOrders
		$("#SC_SALESORDERS").click(function(){
			localStorage.setItem('SearchCount',2);
			localStorage.setItem('Next',1);
			SiebelApp.S_App.GotoView("SC Sales Order Search View OUI","","","");
		});
		
	 	//on button click of contact
		$("#SC_CONTACTS").click(function(){
			localStorage.setItem('SearchCount',2);
			localStorage.setItem('Next',1);
			SiebelApp.S_App.GotoView("SC Contact List View OUI","","","");
		});
		$("#SC-Calendar").datepicker({
			maxDate: 0,
			changeMonth: true,
			changeYear: true,
			showButtonPanel: true,
			format: 'mm-dd-yyyy',
			onSelect: function (dateText, inst) {
				console.log(dateText);
				scselecteddate=dateText;
				var tosysDate = new Date();
				var gettodaydate=moment(tosysDate, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY");
				$('#maskoverlay').show();
			setTimeout(function(){
				if(dateText==gettodaydate && todayDate=="Y"){
					$("#SC-generate-report").trigger("click");
				}
				else{
					var sysDate = new Date();
					/*var getdate=moment(sysDate, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY");
					getdate=getdate+' 00:00:00';*/
					var Offset=sysDate.getTimezoneOffset();
					var startdate = moment(dateText,"MM/DD/YYYY HH:mm:ss").add(Offset,'minutes').format("M/D/YYYY HH:mm:ss");
					var enddate = moment(startdate,"MM/DD/YYYY HH:mm:ss").add(1,'days').format("M/D/YYYY HH:mm:ss");
					var StartDateHours=moment(startdate, "MM/DD/YYYY HH:mm:ss").format("HH");
					if(StartDateHours<12){
						startdate='"'+startdate+' AM"';
						enddate='"'+enddate+' AM"';
					}
					else
					{
						startdate='"'+startdate+'"';
						enddate='"'+enddate+'"';
					}
					if(todayDate=="Y"){
						$("#SC-Store-Generate-block").hide();
						$("#SC-Store-Report-table").show();
					}
					var FieldQueryPair={"Report Start Date":startdate,"Report End Date":enddate};
					SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Store Todays Report Data List Applet");
				}
				if(dateText!=gettodaydate && todayDate!="Y")
				$('#maskoverlay').hide();
			},500);
			}
		});
		//Start:on scroll hiding the datepicker
	$("html, body").on("DOMMouseScroll MouseScrollEvent MozMousePixelScroll wheel scroll", function ()
	{
		$('#SC-Calendar').datepicker("hide");
	});
	//End:on scroll hiding the datepicker
		$("#SC-generate-report").click(function(){
			$("#SC-SO-ST-Generation").modal({
            backdrop: 'static'
			});
			$("#SC-SO-ST-Generation").css({
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
			});
			$('#maskoverlay').show();
			todayDate="N";
			var sysDate = new Date();
			var getdate=moment(sysDate, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY");
			scselecteddate=getdate;
			getdate=getdate+' 00:00:00';
			var Offset=sysDate.getTimezoneOffset();
			var startdate = moment(getdate,"MM/DD/YYYY HH:mm:ss").add(Offset,'minutes').format("M/D/YYYY HH:mm:ss");
			var enddate = moment(startdate,"MM/DD/YYYY HH:mm:ss").add(1,'days').format("M/D/YYYY HH:mm:ss");
			setTimeout(function(){
			var Service,InPS="",OutPS="";
			InPS = SiebelApp.S_App.NewPropertySet();
			OutPS = SiebelApp.S_App.NewPropertySet();
			InPS.SetProperty("vTimestamp1",startdate);
			InPS.SetProperty("vTimestamp2",enddate);
			InPS.SetProperty("MachineNameValue",machineinfo);
			Service = SiebelApp.S_App.GetService("SC Store Data BS");
			OutPS = Service.InvokeMethod("SC Expected Data",InPS);
			$("#SC-SO-ST-Generation").modal('hide'); 
			$("#SC-Store-Generate-block").hide();
			$("#SC-Store-Report-table").show();
			var StartDateHours=moment(startdate, "MM/DD/YYYY HH:mm:ss").format("HH");
			if(StartDateHours<12){
			startdate='"'+startdate+' AM"';
			enddate='"'+enddate+' AM"';
			}
			else
			{
				startdate='"'+startdate+'"';
				enddate='"'+enddate+'"';
			}
			//startdate='"'+startdate+'"';
			//enddate='"'+enddate+'"';
			var FieldQueryPair={"Report Start Date":startdate,"Report End Date":enddate};
			SCOUIMethods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Store Todays Report Data List Applet");
			$('#maskoverlay').hide();
			},500);
		});
		$("#SC-profile").click(function() {
			$(".SC-Profile-container").toggle();
		});
		$("#sclogout").click(function() {
			SiebelApp.S_App.LogOff();
		});
		//on click of print Store closing Report
		$("#sc-print-Receipt").click(function(){
			$('#custommaskoverlay').show();
			setTimeout(function(){
			//var today_recordset = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Store Todays Report Data List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
				var rcdlen=recordSet.length;
				var StoreIdfilename="";
				if(rcdlen!=0)
				StoreIdfilename = recordSet[0]["Store Id"];
				var srcspec="";
				var rcdlen=recordSet.length;
				for(var i=0;i<rcdlen;i++){
					if((rcdlen-1)==i)
					srcspec+=unescape("([Id] = %22%22" + recordSet[i]["Id"] + "%22%22)");
					else
					srcspec+=unescape("([Id] = %22%22" + recordSet[i]["Id"] + "%22%22) OR ");
					
				}
				var bookmark=unescape("%27SC Store Report Data%27.Search = %22"+srcspec+"%22");
				if(StoreIdfilename!="")
				{
					//SiebelJS.Log("store name"+mn_bs);
					//SiebelJS.Log("rowid"+rid_bs);
					var InPS3 = SiebelApp.S_App.NewPropertySet();
					var OutPS3 = SiebelApp.S_App.NewPropertySet();
					InPS3.SetProperty("bipmachinename",StoreIdfilename);
					//InPS3.SetProperty("biprowid",rid_bs);
					//InPS3.SetProperty("Created",recdate);
					InPS3.SetProperty("Bookmark",bookmark);
					var Service3 = SiebelApp.S_App.GetService("SC Store Data BS");
					OutPS3 = Service3.InvokeMethod("SC BIP Report",InPS3);
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].InvokeMethod("RefreshAppletUI");
					var reportStatus = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().GetFieldValue("Status");
					if(reportStatus =="Success"){
						var SC_reportName = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetBusComp().GetFieldValue("ReportOutputFileName");
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().ExecuteMethod("OnDrillDown", 'Report Name', 1);
						setTimeout(function() {
						$(".ui-dialog-buttonset button:nth-child(2)").trigger('click');
						setTimeout(function() {
							$(".ui-dialog-buttonset button:nth-child(3)").trigger('click');
							autoPrint(SC_reportName);
						},1000);	
						},1000);
					}
				}	
			$('#custommaskoverlay').hide();	
			},500);			
		});
    }

    SCStoreReportListAppletOUIPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.BindData.apply(this, arguments);
	 if(sFirstTime=="N"){
		  var rcdmarkup="",scActualCash="",scActualCheck="";
		 // Getting Record set
		 recordSet=pm.Get("GetRecordSet");
		 var len=recordSet.length;
			if(len==0){
				 $("#sc-print-Receipt").hide();
				 $("#SC-store-detail-table").hide();
				 $("#sc-nostore-results").show();
				 $("#no-results-text").text('"'+scselecteddate+'"');
			}
		 else{
				$("#sc-print-Receipt").show();
				$("#sc-nostore-results").hide();
				$("#SC-store-detail-table").show();
			}
		 for(var i=0;i<len;i++){
			 scActualCash=recordSet[i]["Cash Expected Amt"];
			 scActualCash=scActualCash.replace(/[$,]/g,"");
			 scActualCash=scActualCash!=""?parseFloat(scActualCash):0.00;
			 scActualCheck=recordSet[i]["Check Expected Amt"];
			 scActualCheck=scActualCheck.replace(/[$,]/g,"");
			 scActualCheck=scActualCheck!=""?parseFloat(scActualCheck):0.00;
			 rcdmarkup+='<tr>';
			 rcdmarkup+='<td>'+recordSet[i]["Store Id"]+'</td>';
			 rcdmarkup+='<td>'+recordSet[i]["Register ID"]+'</td>';
			 rcdmarkup+='<td>$'+scActualCash.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			 rcdmarkup+='<td>$'+scActualCheck.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</td>';
			 rcdmarkup+='</tr>';
		 }
		 $("#sc-store-records").html(rcdmarkup);
	 }
	 sFirstTime="N";
    }

    SCStoreReportListAppletOUIPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.BindEvents.apply(this, arguments);
	 $("#_sweview").show();
	 $('#custommaskoverlay').hide();
	 $('#maskoverlay').hide();
	 
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
    SCStoreReportListAppletOUIPR.prototype.EndLife = function () {
     SiebelAppFacade.SCStoreReportListAppletOUIPR.superclass.EndLife.apply(this, arguments);
	 $(document).unbind("click");
    }

    return SCStoreReportListAppletOUIPR;
   }()
  );
  return "SiebelAppFacade.SCStoreReportListAppletOUIPR";
 })
}
