if (typeof(SiebelAppFacade.CustomPostload) == "undefined") {
	Namespace('SiebelAppFacade.CustomPostload');

	(function () {
		SiebelApp.EventManager.addListner("postload", OnPostload, this);
		function OnPostload() {
			try
			{
				SiebelJS.Log ("Custom Postloader is Alive!");
				var currview = SiebelApp.S_App.GetActiveView().GetName();
				var fitFlag = SiebelApp.S_App.GetProfileAttr('FeatureFlag');
				
				
				// add code here
				 $(document).ready(function() {
					var ActiveScreenNm = $('li[aria-controls="s_sctrl_tabScreen_noop"]').filter('.ui-tabs-active').find('a').text();
					
					 if(currview=="Home Page View (WCC)")
					{
					var profileAttrib = SiebelApp.S_App.GetProfileAttr("Primary Responsibility Name");
					if(profileAttrib =="SC XO BookNow Only")
					{
						$('[title="My Active Quotes List Applet"]').hide();
					}
					}
					 $("#HTMLMessageBar").css("display","none");
					 $("#siebui-toolbar-automation").css("display","none");
					 if(fitFlag == "Y" && SiebelApp.S_App.GetAppName() === "Siebel Universal Agent")
					 {
						 if(ActiveScreenNm == 'Service Orders' && currview != "Order Entry - My Orders View" && currview != "Order Entry - All Orders View")
						 {
							 window.ServiceOrderNumberTerm = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');
							 window.ServiceOrderIdTerm = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Id');
							 
							 if(window.isServiceOrderTimoutSet == "N")
							 {
								 window.isServiceOrderTimoutSet = "Y";
								 var sBservice1 = SiebelApp.S_App.GetService("SC Adyen Payment Service");
									var sinPS1 = SiebelApp.S_App.NewPropertySet();
									var soutPS1 = SiebelApp.S_App.NewPropertySet();
									sinPS1.SetProperty("LookupType", 'SC_12CPAYMENT_STORES');
									sinPS1.SetProperty("LookupName", 'SCSessionTimeout');
								 
									 if (sBservice1) {
										soutPS1 = sBservice1.InvokeMethod("RetrieveLOV", sinPS1);
									  }
									  var Child = soutPS1.GetChild(0);
									var LOV_val = Child.GetProperty("LOVValue");
									window.SCSessionTimeoutParamService = (LOV_val-3)*60*1000;
								 var sctimeoutsession = window.SCSessionTimeoutParamService;
								 localStorage.setItem("sctimeoutsession", sctimeoutsession);
								 
								 //AKSHAY: added below function to track inactivity.
								 window.SCInactivityTimeService = {
									resetTimer: function() {
										clearTimeout(window.scinactivetimerservice);
										window.scinactivetimerservice = setTimeout(function(){
											console.log('Inacivity Logout Service Fired!!');
										
											var inPS = SiebelApp.S_App.NewPropertySet();
											var outPS = SiebelApp.S_App.NewPropertySet();
											var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
											
											window.ServiceOrderNumberTerm = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');
											window.ServiceOrderIdTerm = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Id');
											
											inPS.SetProperty('Order Number', window.ServiceOrderNumberTerm);
											inPS.SetProperty('Terminal Id', 'FROMPOSTLOAD');
											inPS.SetProperty('Terminal Name', window.ServiceOrderIdTerm);

											if (Bservice)
											{
											outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS, outPS);
											}
										}, localStorage.getItem("sctimeoutsession"));
										//console.log("Postlod timeout reset!!");
									},
								 
								 CallSCInactivity:  function() {
									
									
									window.onload = window.SCInactivityTimeService.resetTimer;
									// DOM Events
									document.getElementById('_sweclient').addEventListener('mousemove',function(){
										window.SCInactivityTimeService.resetTimer();
									});
									document.getElementById('_sweclient').addEventListener('keydown',function(){
										window.SCInactivityTimeService.resetTimer();
									});
								}
							 }
								
								if($('[aria-labelledby^="Terminal_Name"]').val() != "" && $('[aria-labelledby^="Terminal_Name"]').val() != null)
								{
									window.SCInactivityTimeService.CallSCInactivity();
								}
							 }
						 }else{
							 window.isServiceOrderTimoutSet = "N";
							 window.SCInactivityTimeService = ()=> {}
							 clearTimeout(window.scinactivetimerservice);
							 if(window.ServiceOrderNumberTerm != "" && window.ServiceOrderNumberTerm != undefined && window.ServiceOrderNumberTerm != "undefined")
							 {
										var inPS = SiebelApp.S_App.NewPropertySet();
										var outPS = SiebelApp.S_App.NewPropertySet();
										var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
										
										inPS.SetProperty('Order Number', window.ServiceOrderNumberTerm);
										inPS.SetProperty('Terminal Id', 'FROMPOSTLOAD');
										inPS.SetProperty('Terminal Name', window.ServiceOrderIdTerm);

										if (Bservice)
										{
											outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS, outPS);
										}
										window.ServiceOrderNumberTerm = "";
							 }else{
								 
							 }
							 
						 }
					 }
					 
				 });
				 
				$(window).on("beforeunload", function(e)
				{
					var isPhoneOrder = localStorage.getItem("isPhoneOrder");
					if(isPhoneOrder == "Y")
					{
						localStorage.setItem("isPhoneOrder", "N");
					}
					//LikhithaK:16Apr2025:SFSTRY0003441:Start
					var sPoleDisplayConfBypass = localStorage.getItem("PoleDisplayConfBypass");
					if(sPoleDisplayConfBypass == "Y")
					{
						localStorage.setItem("PoleDisplayConfBypass", "N");
					}
					//LikhithaK:16Apr2025:SFSTRY0003441:End
					
					if(fitFlag == "Y")
					{
						var OrderNum = "";
						var OrderId = "";
					  if (SiebelApp.S_App.GetAppName() === "Siebel Universal Agent" && window.performance.navigation.type != 1)
					  {
						
						e.stopPropagation();
						e.stopImmediatePropagation();
						var ActiveScreen = $('li[aria-controls="s_sctrl_tabScreen_noop"]').filter('.ui-tabs-active').find('a').text();
						var curViewNm = SiebelApp.S_App.GetActiveView().GetName();
						if(curViewNm == "SC Create Sales Order View OUI" || curViewNm == "SC Order Entry - Payment View Sales OUI")
						{
							 OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('SC Sales Order Entry Form Applet OUI').GetBusComp().GetFieldValue('Order Number');
							 
							 OrderId = SiebelApp.S_App.GetActiveView().GetApplet('SC Sales Order Entry Form Applet OUI').GetBusComp().GetFieldValue('Id');
							
						}else{
							if(ActiveScreen == 'Service Orders')
							{
								OrderNum = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Order Number');
								
								OrderId = SiebelApp.S_App.GetActiveView().GetApplet('Order Entry - Order Form Applet').GetBusComp().GetFieldValue('Id');
							}
						}
						
						 
						
						  if(OrderNum == null || OrderNum == "" || OrderNum == undefined || OrderNum == "undefined")
									{
										
									}	else{
										var inPS = SiebelApp.S_App.NewPropertySet();
										var outPS = SiebelApp.S_App.NewPropertySet();
										var Bservice = SiebelApp.S_App.GetService("SC Adyen Payment Service");
										
										inPS.SetProperty('Order Number', OrderNum);
										inPS.SetProperty('Terminal Id', 'FROMPOSTLOAD');
										inPS.SetProperty('Terminal Name', OrderId);

										if (Bservice)
										{
											outPS = Bservice.InvokeMethod("UpdateTerminalId", inPS, outPS);
										}
									}
									
									
						 
							}
						}
					});
					
					
				
				if(currview=="Home Page View (WCC)" || currview=="LOY Home Page View")
				{
				  $(document).ready(function() {

					
					$('[class="siebui-salutation-title"]').html("My Homepage");
					$("#cal_prev_button").css("padding","0px 0px 0px 5px");
					$("#cal_next_button").css("padding","0px 5px 0px 0px");
					$("#cal_prev_button").css("margin-bottom","5px");
					$("#cal_next_button").css("margin-bottom","5px");
					  //$(".btn-icon siebui-icon-calendar").css("font-size","x-large");
					  $(".btn-icon siebui-icon-calendar").css("padding"," 0px 10px");
					     
					var d = new Date();
					var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday");
					var n = weekday[d.getDay()];
					var day = d.getUTCDate();
					var year = d.getUTCFullYear();
					if (day < 10)
					{
						day = "0" + day;
					}
					var monthl = new Array("January", "February", "March", "April", "May", "June","July", "August","September","October","November","December");
					var month = monthl[d.getUTCMonth()];
					var firstname = SiebelApp.S_App.GetProfileAttr("UpgradeFirstName");
					var lastName  = SiebelApp.S_App.GetProfileAttr("UpgradeLastName");
					newdate = "Welcome Back " + firstname +" "+ lastName +". Today is " + n +", "+ month + " " + day +", " + year+".";
					$('[class="siebui-salutation-applet-title"]').replaceWith("<div class='Welcome'›</div>");
					$('[class="Welcome"]').text (newdate);
					$('[class="Welcome"]').css('font-weight','bold');
					
					  
				  });
				}
				

			if(currview=="SC Sales Order Search View OUI")
			{
				//SNARRA:29-10-2018 Start: show CTI Toolbar
		        $(document).on("click", "#SC-ANI-CTItool", function () {
		        $(this).find("img").toggle();
		        //Commented for IP23 by peeyush.kumar on Dec 5 2023
		        // $('#tb_1')[0].click();
		        //Added for IP23 by peeyush.kumar on  Dec 5 2023
		        $("li[name='Toggle Communication Panel']").click();
		        setTimeout(function () {
		        $("#commPanelDockToShowpin").click();
		        }, 500);
		        });
			}

				
			}
			catch(error){
				//YashodeepJ
			}
		}
	}());
}
