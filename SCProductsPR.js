if (typeof (SiebelAppFacade.SCProductsPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCProductsPR");
	define("siebel/custom/SelectComfort/SCProductsPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods", "siebel/custom/SelectComfort/SC_OUI_Markups"],
		function () {
			SiebelAppFacade.SCProductsPR = (function () {
				var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
				var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
				var SC_OUI_Markups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
				var FieldQueryPair, recordSet = "",
					prodList = "",
					pm = "",
					AppletSeq, allowNewLine, Appletid = "",
					isStoreUser = "",
					isFirstTime, discProdsCategory = "",
					Service_NetPriceCal = "",
					Child = "",
					DiscountsString = "",
					TotalCount = "",
					sP2PEFlag = "";
				var InPS = SiebelApp.S_App.NewPropertySet();
				var OutPS = SiebelApp.S_App.NewPropertySet();
				var EnrollInPS = SiebelApp.S_App.NewPropertySet();
				var EnrollOutPS = SiebelApp.S_App.NewPropertySet();
				var isFirstTime_p = '',
					desc, ProductId, SKU, Quantity, ID, ProductDesc, ProductPrice, poleDisplayFlag = "N",
					Quantitys = "";
				var margin = 1,
					markup = "",
					OrderId, LineId, isLast = 0,
					nexts = 0;
				var Service, manualdiscreason, manualdiscperc, manualdiscamou, CFG, appletseqorderentry, Size, CustomsizeControl, NewControl, Lov_Disc = "",
					Lov_Perc = "";
				var RootOrderItemId = "",
					RecordSeti, BS_Data1, lineRowID, isLinePick = false,
					LineItemId = "",ControlBoxSku,ClickedShowOkbtn;
					
				function SCProductsPR(pm) {
					SiebelAppFacade.SCProductsPR.superclass.constructor.apply(this, arguments);
				}

				SiebelJS.Extend(SCProductsPR, SiebelAppFacade.JQGridRenderer);

				SCProductsPR.prototype.Init = function () {
					localStorage.setItem('whitescreen', 0);
					SiebelAppFacade.SCProductsPR.superclass.Init.apply(this, arguments);
					ClickedShowOkbtn="N";
					pm = this.GetPM();
					pm.AddProperty("AddReferral", false);
					Appletid = pm.Get("GetFullId");
					//AppletSeq = Appletid[Appletid.length -1];
					AppletSeq = Appletid.split("_A");
					AppletSeq = AppletSeq[1];
					isFirstTime_p = 'N';
					allowNewLine = "Y";

					//SNARRA 26-07-2018 Added for performance POC
					if (localStorage.getItem('isNewSalesOrder') != "Y") {
						RefreshLineItems();
					}

					lineRowID = "";
					appletseqorderentry = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().Get("GetFullId");
					//appletseqorderentry = appletseqorderentry[appletseqorderentry.length - 1];
					appletseqorderentry = appletseqorderentry.split("_A");
					appletseqorderentry=appletseqorderentry[1];
					var ControlSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls();
					//SNARRA:27-09-2018 Added Control for NewRecord
					CustomsizeControl = ControlSet["Breconfig"].GetInputName();
					NewControl = ControlSet["NewRecord"].GetInputName();
					$(document).ready(function () {
						$("body").bind('Custom.timer.Start', function (ev) {
							$('#maskoverlay').show();
							SiebelJS.Log("Start");
						});

						$("body").bind('Custom.timer.End', function (ev) {
							$('#maskoverlay').hide();
							SiebelJS.Log("Stop");
						});
					});
				}

				SCProductsPR.prototype.ShowUI = function () {
					SiebelAppFacade.SCProductsPR.superclass.ShowUI.apply(this, arguments);
					SiebelJS.Log(" In Show UI of Products");
					poleDisplayFlag = "N";
					ProductDesc = "";
					Quantitys = "";
					localStorage.setItem("InvokepoleDisplay", "N");
					$(".whitescreentimer").remove();
					$("#custommaskoverlay").hide();
					//hiding tool tip.
					$('div[title="Line Items"]').attr("title", "");
					//SBOORLA:Added code for Pole Display

					var storeuser = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Store User");
					var storenumber = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC MachineInfo");
					//SPATIBAN:Added code for Revise Flow NewRecord Error
					var revisionNumber = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Revision");
					revisionNumber = revisionNumber != "" ? parseInt(revisionNumber) : 0;
					if (revisionNumber > 1) {
						var Custom_Service = "",
							Input_BS = "",
							Out_BS = "",
							searchfields = "";
						Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
						Input_BS = SiebelApp.S_App.NewPropertySet();
						Out_BS = SiebelApp.S_App.NewPropertySet();
						var sOrderId = localStorage.getItem('OrderId');
						searchfields = "SC Revisable,Order Header Id";
						Input_BS.SetProperty("BO", "PDS Simplified Order");
						Input_BS.SetProperty("BC", "PDS Simplified Order Entry - Line Items");
						Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Parent Order Item Id] IS NULL AND [SC Revisable]='Revisable'");
						Input_BS.SetProperty("SortSpecification", "");
						Input_BS.SetProperty("ReqNoOfRecords", "");
						Input_BS.SetProperty("FieldsArray", searchfields);
						Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
						var Child_BS = Out_BS.GetChild(0);
						var BS_Data = Child_BS.GetProperty("OutputRecordSet");
						if (BS_Data == "}") {
							allowNewLine = "N";
						}
					}
					//Vamsi 28-07-2018 Get All Lovs
					/*var scorderSrchSpec = [],scorderSortSpec = [];
					scorderSrchSpec[0] = "[Type]= 'SC_MANUAL_DISCOUNT_REASON' and [Active] = 'Y'";
					scorderSortSpec[0] = "Order By";
					scorderSrchSpec[1] = "[Type]= 'DISCNT_PERCENT' and [Active] = 'Y'";
					scorderSortSpec[1] = "Order By";
					SC_OUI_Methods.SCSetLoVs(scorderSrchSpec, scorderSortSpec);*/

					//Vamsi 28-07-2018 Get All Profile Attributes
					/*SC_OUI_Methods.SCGetProfileAttr("SC Store User");*/
					isStoreUser = SC_OUI_Methods.SCGetProfileAttrValue("SC Store User");

					//storenumber="10540";
					/*if(storeuser=="Y"&&storenumber!=""&&storenumber!=undefined){
				storenumber=storenumber.split('_');
				storenumber=storenumber[0];
				var Custom_Service="",Input_BS="",Out_BS="";
				Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
				Input_BS = SiebelApp.S_App.NewPropertySet();
				Out_BS = SiebelApp.S_App.NewPropertySet();
				searchfields = "Name,Pole Display";
				Input_BS.SetProperty("BO", "Internal Division");
				Input_BS.SetProperty("BC", "Internal Division");
				Input_BS.SetProperty("SearchSpecification", "[SC Store Number] = '"+storenumber+"'");
				Input_BS.SetProperty("SortSpecification", "");
				Input_BS.SetProperty("ReqNoOfRecords", "");
				Input_BS.SetProperty("FieldsArray", searchfields);
				Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
				var Child_BS = Out_BS.GetChild(0);
				var BS_Data = Child_BS.GetProperty("OutputRecordSet");
			if(BS_Data!="}"){
				var ResArray = new Array;
				ResArray = BS_Data.split(";");
				
				 	jsonRes = JSON.parse(ResArray[0]);
					poleDisplayFlag=jsonRes["Pole Display"];
					SiebelJS.Log("jsonSK"+jsonRes["Pole Display"]);
				}
	}*/
					//SPATIBAN:May 2019 release : added below code to get the control box SKus
					ControlBoxSku=SC_OUI_Methods.SCGetOrderLoVs("[Type]= 'X_SC_CONTROLBOX_SKU' and [Active] = 'Y'");
					poleDisplayFlag = SC_OUI_Methods.SCGetProfileAttrValue("PoleDisplayOUI");
					// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
					sP2PEFlag = SiebelApp.S_App.GetProfileAttr('P2PEFlag');
					if (poleDisplayFlag == "Y" && isStoreUser == "Y") {
						localStorage.setItem("InvokepoleDisplay", "Y");
					}
					$(document).on('click', '#SC-NewLineerror-ok', function () {
						$("#SC-NewLineError-popup").modal('hide');
						$("#SC-NewLineError-popup").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
					});
					//on click of add to cart from the product details popup
					$(document).unbind('#SC-Add-to-cart').on('click', '#SC-Add-to-cart', function () {
						$("#SC-SO-product-details").modal("hide");
						if (allowNewLine == "N") {
							$("#SC-NewLineError-popup").modal({
								backdrop: 'static'
							});
							$("#SC-NewLineError-popup").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
						} else {
							ID = $(this).attr("class").split(" ");
							currentprodId = ID[1].replace("SC", "tr");
							ID = ID[1].split("_");
							ID = ID[1];
							//saddala for popup value not changing issue
							document.getElementById("productdetailstext").innerHTML = "Added " + document.getElementById('long_' + ID).innerHTML;
							SKU = document.getElementById('SKU_' + ID).innerHTML;
							//ProductId=document.getElementById('prod_'+ID).innerHTML;
							OrderId = localStorage.getItem('OrderId');
							Quantity = document.getElementById('quant_' + ID).value;
							CFG = document.getElementById('cfg_' + ID).innerHTML;
							ProductDesc = document.getElementById('long_' + ID).innerHTML;
							ProductPrice = document.getElementById('price_' + ID).innerHTML;
							SiebelJS.Log("After add to cart clicked" + OrderId + " " + Quantity + " " + SKU);
							//SPATIBAN:May 2019 release : added below code to get the control box SKus
							if (ControlBoxSku.indexOf(SKU)!=-1) {
								alert("Read this disclaimer to the customer:\n We no longer manufacture products with Obstruction Sense technology. The replacement component you receive will not have this feature. As a reminder, before adjusting your FlexFitâ„¢ base, always confirm there are no people or pets near the moving parts of the bed.");
							}
							if (SKU == "106683" && isStoreUser != "Y") {
								alert("Only Store User is allowed to Add Gift Cards");
							} else {
								$('#custommaskoverlay').show();
								AddtoCart(OrderId, Quantity, SKU, CFG);
								addedToCart(currentprodId);
								//Null Query 
								FieldQueryPair = {"Id": ""};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							}
						}
					});
				} //show ui


				SCProductsPR.prototype.BindData = function (bRefresh) {
					SiebelAppFacade.SCProductsPR.superclass.BindData.apply(this, arguments);
					SiebelJS.Log("In products bind data");
					if (localStorage.getItem('flowfrom') != "proceed" && localStorage.getItem('addcart') != "addcart") { //it should neither run after proceed is clicked nor afer addtocart is clicked
						pm = this.GetPM();
						if (localStorage.getItem("flowfrom") == "backtoline") {
							localStorage.setItem("flowfrom", "");
						}
						//go is used to got to first set only for one time after bdata got triggered
						if (localStorage.getItem("go") == 0) {
							isLast = 0;
							localStorage.setItem("go", 1);
							/*if(pm.ExecuteMethod("CanInvokeMethod", "GotoFirstSet")){
								pm.ExecuteMethod("InvokeMethod","GotoFirstSet",null,false);
								SiebelJS.Log("in First Set");
							}*/
							(function (proxied) {
								window.alert = function () {
									if (arguments[0].includes("Method GotoFirstSet is not allowed here")) {
										SiebelJS.Log("First Set Supressed");
									} else
										return proxied.apply(this, arguments);
								};
							})(window.alert);
							pm.ExecuteMethod("InvokeMethod", "GotoFirstSet", null, false);
							localStorage.setItem("Records", '9');
							SiebelJS.Log("in First Set ");
						}
						setTimeout(function () {
							$('.SC-SO-noresults-container').hide();
							NoOfRecords = $("#s_" + AppletSeq + "_rc").text();
							TotalCount = NoOfRecords.split(" ");
							recordSet = pm.Get("GetRecordSet");
							nexts = 0;

							if (recordSet.length != 0) {
								if (TotalCount[4] != undefined) {
									/*if(recordSet.length<=9){//checking if applets has records or not
										prodList=showProducts(recordSet);		
										$("#SC_Products").html(prodList);
									}
									else if(TotalCount[4].indexOf("+") > -1){//checking if applet recordSet contains + sign
										localStorage.setItem("Records",TotalCount[2].replace("+",""));
										prodList=showProducts(recordSet);		
										$("#SC_Products").append(prodList);
									}
									else if(localStorage.getItem("Records")<parseInt(TotalCount[4].replace("+",""))){//if the current recordset is changed compared to prev recordset
										localStorage.setItem("Records",TotalCount[2].replace("+",""));
										prodList=showProducts(recordSet);		
										$("#SC_Products").append(prodList);
										hideDuplicates();
									}*/
									if (isLast == 0 && recordSet.length <= 9) { //if applet has less than 10 records
										isLast = 1;
										prodList = showProducts(recordSet, 10);
										$("#SC_Products").html(prodList);
										if (localStorage.getItem("addToOrder") == "Y" && recordSet.length >= 1) {
											//$('#custommaskoverlay').show();
											SiebelJS.Log("After clicking on add to order");
											localStorage.setItem('addToOrder', "N");
											var recordId = recordSet[0];
											addedToCart(recordId["Id"]);
											$('#' + recordId["Id"]).trigger("click");
										}
									} else if (isLast == 0 && !(TotalCount[4].indexOf("+") > 0)) { //if don't contain + symbol it is last recordset and will append  for on last time
										isLast = 1;
										prodList = showProducts(recordSet, 10);
										$("#SC_Products").append(prodList);
										hideDuplicates();
									} else if (isLast == 0 && localStorage.getItem("Records") < parseInt(TotalCount[2])) { //not the old recordset that we already showed
										prodList = showProducts(recordSet, 10);
										$("#SC_Products").append(prodList);
										hideDuplicates();
										localStorage.setItem("Records", parseInt(TotalCount[2]));
									} else if (isLast == 0 && ((TotalCount[4].replace("+", "")) < 9)) { //for dup check appends //mostly need to remove as issu got resolved
										prodList = showProducts(recordSet, TotalCount[4].replace("+", ""));
										$("#SC_Products").append(prodList);
										hideDuplicates();
										isLast = 1;
									}
								}
							} else{
						var newRecordSet=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
						if(newRecordSet[0]["SC Sub-Type"]=="Wholesale"||newRecordSet[0]["SC Sub-Type"]=="QVC"||newRecordSet[0]["SC Sub-Type"]=="Commercial" || newRecordSet[0]["SC Sub-Type"] == "Internal" || newRecordSet[0]["SC Sub-Type"] == "HSN"){
							AccountOrder=true;
						}
						else
							AccountOrder=false;
						
		                if(AccountOrder){
							var notInCatalog=new Array();
							notInCatalog=localStorage.getItem("notInCatalog");
							notInCatalog=notInCatalog.split(";");
							var notInCatalog_length=notInCatalog.length;
							notInCatalog=JSON.parse(notInCatalog);
							if(notInCatalog_length!=0 && AccountOrder){
								prodList=b2b_showProducts(notInCatalog);
								$("#SC_Products").append(prodList);
								hideDuplicates();
								if(localStorage.getItem("addToOrder")=="Y")		
										{			
											//$('#custommaskoverlay').show();
											SiebelJS.Log("After clicking on add to order");		
											localStorage.setItem('addToOrder',"N");		
											//var recordId=recordSet[0];		
											addedToCart(notInCatalog["Id"]);
											$('#'+notInCatalog["Id"]).trigger("click");
										}
							}
							else{
								$("#SC_Products").html("");
								SiebelJS.Log("No Results found in products");
								$("#scnore").text("NO RESULTS FOUND");
								$("#SC-SO-No-Results-found").modal({
									 backdrop: 'static'
								});

								$("#SC-SO-No-Results-found").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
							}	
						}
						
						if(localStorage.getItem("addToOrder")=="Y"){
							    $("#SC_Products").html("");
								SiebelJS.Log("No Results found in products");
								$("#scnore").text("NO RESULTS FOUND");
								$("#SC-SO-No-Results-found").modal({
									 backdrop: 'static'
								});

								$("#SC-SO-No-Results-found").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
								$('#custommaskoverlay').hide();
								localStorage.setItem("addToOrder","N");
						}
					}

							//for lazy loading based on scroll
							$('.SC-data-container').unbind("scroll").scroll(function () {
								pm = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetPModel();
								//if($(window).height() + $(window).scrollTop()== $(document).height()){
								if (Math.round($(this).scrollTop() + $(this).innerHeight(), 10) >= Math.round($(this)[0].scrollHeight, 10) - 2) {
									if (localStorage.getItem("flowfrom") == "backtoline") //if coming from back to line items from shipping ,to  perform lazy loading
										nexts = 0;
									if (localStorage.getItem("go") != "Last" && (nexts == 0)) {
										(function (proxied) {
											window.alert = function () {
												if (arguments[0].includes("Method GotoNextSet is not allowed here")) {
													SiebelJS.Log("In Last Set");
													localStorage.setItem("go", "Last");
												} else
													return proxied.apply(this, arguments);
											};
										})(window.alert);
										pm.ExecuteMethod("InvokeMethod", "GotoNextSet", null, false);
										SiebelJS.Log("In Next Set");
										nexts = 1; //once fresh set came up it shouldn't go to next set unlesss prev is appended 
									}
								}
							});


							//on click of product for product details
							var currentprodId = "";
							$("#SC-SO-product-list-table tbody tr").on('click', 'td:not(:nth-child(1),:nth-child(5))', function () {
								if (!$(this).parent().hasClass("highlate-row")) {
									currentprodId = $(this).parent().attr('id');
									$("#SC-SO-product-list-table tbody tr").removeClass("product-active");
									$(this).addClass("product-active");
									productdetails(currentprodId);
									$("#SC-SO-product-details").modal({
										backdrop: 'static'
									});
								}
							});


							//on click of cart icon to change the background and image
							$("#SC-SO-product-list-table tbody tr td:first-child").on('click', 'button', function () {
								if (allowNewLine == "Y") {
									if (!$(this).parent().parent().parent().hasClass("highlate-row")) {
										currentprodId = $(this).parent().parent().parent().attr('id');
										addedToCart(currentprodId);
										// Null Query
										//FieldQueryPair={"Id":""};
										//SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Entry Line Item List Applet");
									}
								}
							});
						}, 1000);
					} else if (localStorage.getItem("addcart") == "addcart") {
						localStorage.setItem("addcart", "not");
					}
				} //bdata


				SCProductsPR.prototype.BindEvents = function () {
					SiebelAppFacade.SCProductsPR.superclass.BindEvents.apply(this, arguments);
					//var storeuser=SiebelApp.S_App.GetProfileAttr("SC Store User");
					var storeuser = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Store User");
					//SNARRA:29-10-2018 Start: show CTI Toolbar
					$(document).on('click','#SC-ANI-CTItool',function() {
						$(this).find('img').toggle();
						//Commented for IP23 by peeyush.kumar on Dec 18 2023
          // $('#tb_1')[0].click();
          //Added for IP23 by peeyush.kumar on  Dec 19 2023
          $("li[name='Toggle Communication Panel']").click();
						setTimeout(function(){
						 $('#commPanelDockToShowpin').click();
						},500);
					});
					$(document).on('click','#commPanelCloseToggle',function(){
						$("#SC-ANI-CTItool").find('img').toggle();
					});
					//on click of add to cart
					$(document).unbind('.sc-addcart').on('click', '.sc-addcart', function () {
						if (allowNewLine == "N") {
							$("#SC-NewLineError-popup").modal({
								backdrop: 'static'
							});
							$("#SC-NewLineError-popup").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
						} else {
							SiebelJS.Log("before add to cart clicked" + i);
							ID = $(this).closest(".sc-addcart").attr("id");
							document.getElementById("productdetailstext").innerHTML = "Added " + document.getElementById('long_' + ID).innerHTML;
							SKU = document.getElementById('SKU_' + ID).innerHTML;
							//ProductId=document.getElementById('prod_'+ID).innerHTML;
							OrderId = localStorage.getItem('OrderId');
							Quantity = document.getElementById('quant_' + ID).value;
							SiebelJS.Log("After add to cart clicked" + OrderId + " " + Quantity + " " + SKU);
							CFG = document.getElementById('cfg_' + ID).innerHTML;
							ProductDesc = document.getElementById('long_' + ID).innerHTML;
							ProductPrice = document.getElementById('price_' + ID).innerHTML;
							//SPATIBAN:May 2019 release : added below code to get the control box SKus
							if (ControlBoxSku.indexOf(SKU)!=-1) {
								alert("Read this disclaimer to the customer:\n We no longer manufacture products with Obstruction Sense technology. The replacement component you receive will not have this feature. As a reminder, before adjusting your FlexFitâ„¢ base, always confirm there are no people or pets near the moving parts of the bed.");
							}
							if (SKU == "106683" && isStoreUser != "Y") {
								alert("Only Store User is allowed to Add Gift Cards");
							} else {
								$('#custommaskoverlay').show();
								AddtoCart(OrderId, Quantity, SKU, CFG);
							}
						}
					});


					$(document).on("click", "#prod-expand-collapse", function () {
						if ($(this).hasClass("iconClosed")) {
							$("#prod-expand-collapse").addClass('iconOpen');
							$("#prod-expand-collapse").removeClass('iconClosed');
							$("#product-info").show();
						} else {
							$("#prod-expand-collapse").addClass('iconClosed');
							$("#prod-expand-collapse").removeClass('iconOpen');
							$("#product-info").hide();
						}
					});

					//for customize click
					//$(document).find('.customline').click(function() {
					//$(".customline").unbind('.customline').click(function() {
					$(document).unbind('.customline').on("click", ".customline", function (e) {
						LineId = $(this).attr('id');
						//795 SADDALA
						localStorage.setItem("Configfromsales", "Y");
						//SBOORLA:Added code for Defect 656
						$('#custommaskoverlay').show();
						// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
						if (poleDisplayFlag == "Y") {
							localStorage.setItem("InvokepoleDisplay", "Y");
						} else {
							localStorage.setItem("InvokepoleDisplay", "N");
						}
						$('#custommaskoverlay').hide();
						//on click of configurator image getting the row id 
						var appletseqlineitem = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().Get("GetFullId");
						//appletseqlineitem = appletseqlineitem[appletseqlineitem.length - 1];
						appletseqlineitem = appletseqlineitem.split("_A");
						appletseqlineitem=appletseqlineitem[1];
						var tableid = $("#s_" + appletseqlineitem + "_l").find("td[title='" + LineId + "']").parent().attr("id");
						$("#s_" + appletseqlineitem + "_l tr#" + tableid).trigger("click");
						SiebelJS.Log("tableid" + tableid);
						//SNARRA:27-09-2018 Added Control for NewRecord
						$("#" + CustomsizeControl + "_Ctrl").trigger("click");
						$("#s_" + appletseqlineitem + "_1_30_0_Ctrl").trigger('click');
					});


					//on click of customize stop the hide of sweview
					//$(document).unbind("#s_" + appletseqorderentry + "_1_30_0_Ctrl").on("click", "#s_" + appletseqorderentry + "_1_30_0_Ctrl", function () {
					$(document).unbind("#" + CustomsizeControl + "_Ctrl").on("click", "#" + CustomsizeControl + "_Ctrl", function () {
						localStorage.setItem('whitescreen', 1);
					});
					//SPATIBAN:Added code for Show Number
					$(document).on("change", "#SC-show-num", function () {
						var scshownumber = "";
						scshownumber = $("#SC-show-num").val();
						if (scshownumber == "") {
							$("#custommaskoverlay").show();
							setTimeout(function () {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().SetFieldValue("SC Sale Show#", scshownumber);
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("WriteRecord");
								RefreshLineItems();
								$("#custommaskoverlay").hide();
							}, 50);
						} else
							$("#SC-shownum-icon").trigger("click");
					});
					$(document).on("click", "#SC-shownum-icon", function () {
						//var Field_Name = "";
						//ClickedShowOkbtn="Y";
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetControls()["Show#"]);
						/*SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().AttachNotificationHandler("g", function (o) {
							Field_Name = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetControls()["Show#"]);
							$('#SC-show-num').val(Field_Name);
							if (Field_Name != "")
								RefreshLineItems();
						});*/
					});
					$(document).on('click', 'button[title="Show:OK"]', function () {
						ClickedShowOkbtn="Y";
					});
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().AttachPMBinding("FieldChange", function(control,field_value ){
						if(control.GetName()=="Show#"){
							$('#SC-show-num').val(field_value);
							if (field_value != "")
								if(ClickedShowOkbtn=="Y"){
									ClickedShowOkbtn="N";
									RefreshLineItems();
								}
						}
					});
					//for deleting the line item
					$(document).unbind(".deletelineitem").on("click", ".deletelineitem", function () {
						LineId = $(this).attr('id');
						$("body").trigger('Custom.Start');
						setTimeout(function () {
							//delete line item
							//SBOORLA:Added code for Pole Display
							// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
							if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
								var poleJSON = [];
								SC_OUI_Methods.PoleDisplay(poleJSON, "P");
							}
							if (sP2PEFlag == "Y") {
								SC_OUI_Methods.ClearP2PEPoleDisplay(OrderId);
							}
							EnrollInPS.SetProperty("OrderId", OrderId);
							EnrollInPS.SetProperty("Line", LineId);
							Service = SiebelApp.S_App.GetService("SC Cart OUI");
							EnrollOutPS = Service.InvokeMethod("RemoveOrderLine", EnrollInPS);
							EnrollOutPS = Service.InvokeMethod("UpdateMattressFlag", EnrollInPS);
							//VALLA:23-APR-2021:
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("RefreshBusComp");
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "CalculatePriceAll", null, false);
							var caninvoke = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("CanInvokeMethod", "CalculatePriceAll");
							if (caninvoke) {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "CalculatePriceAll", null, false);
							}
							//to get refreshed line items data
							RefreshLineItems();


							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							if ($('#Ship-Option-Markup').is(':visible')) { //if shipping is visible then only do execute list applet frame
								localStorage.setItem('ProceedToShipping', 'Y');
								FieldQueryPair = {
									"SKU #": ""
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							}
							$("body").trigger('Custom.End');
						}, 1000);
					});

					//on click of cancel line item
					$(document).unbind(".cancellineitem").on("click", ".cancellineitem", function () {
						LineId = $(this).attr('id');
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						//setTimeout(function() {
						var cnclrsn = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Cancel Reason");
						$('#SC-Cancel-item-SelectBox').val(cnclrsn);
						if (cnclrsn != "") {
							$('#cancelitemtext').text("Update the Cancel Reason?");
						} else {
							$('#cancelitemtext').text("Cancel Item?");
						}
						$("#SC-SO-Cancel-item").modal({
							backdrop: 'static'
						});
						$(".modal-backdrop").css('background', '#ffffff');

						$("#SC-SO-Cancel-item").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$("#SC-cancel-item-yes-button").addClass("SC-disabled");
						//}, 1000);
						if ($('#Ship-Option-Markup').is(':visible')) { //if shipping is visibel then only do excute list applet frame
							localStorage.setItem('ProceedToShipping', 'Y');
							FieldQueryPair = {
								"SKU #": ""
							};
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						}
					});


					//on change of the value in cancel reason of line
					$("#SC-Cancel-item-SelectBox").change(function () {
						$("#SC-cancel-item-yes-button").removeClass("SC-disabled");
					});

					//on click of the yes button of cancel reason of line
					$("#SC-cancel-item-yes-button").click(function () {
						$("#SC-SO-Cancel-item").modal('hide');
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						var snCancelRsn=$('#SC-Cancel-item-SelectBox').val();
						$("#custommaskoverlay").show();
						setTimeout(function () {
							// VAMSI : 01-DEC-18 : Commented below code for revision Issue (Cancel to Request flag)
							/*var inPS="",outPS="",Bservice="",fieldnames,fieldvalues;
							fieldvalues=$('#SC-Cancel-item-SelectBox').val();
							fieldnames="Cancel Reason"
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("BO","Order Entry (Sales)");
							inPS.SetProperty("BC","Order Entry - Line Items");
							inPS.SetProperty("FieldsArray",fieldnames );
							inPS.SetProperty("ValuesArray",fieldvalues);
							inPS.SetProperty("SearchSpecification","[Order Header Id] = '" + OrderId +"' AND [Id]='"+LineId+"'" );
							Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
							outPS = Bservice.InvokeMethod("Insert", inPS);*///
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().SetFormattedFieldValue("Cancel Reason", $('#SC-Cancel-item-SelectBox').val());
							var cancelControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls()["Cancel Reason"];
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().ExecuteMethod("SetFormattedValue", cancelControl,$('#SC-Cancel-item-SelectBox').val());
							$('#SC-Cancel-item-SelectBox').val("");
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("WriteRecord");
							RefreshLineItems();
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							//SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
							var PrdLineControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls()["Product Line"];
							var PrdLineControlVal=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().ExecuteMethod("GetFormattedFieldValue", PrdLineControl);
							if(snCancelRsn!="" && PrdLineControlVal=="MATTRESS"){
								var Custom_Service = "",Input_BS = "",Out_BS = "",searchfields = "";
								Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
								Input_BS = SiebelApp.S_App.NewPropertySet();
								Out_BS = SiebelApp.S_App.NewPropertySet();
								var sOrderId = localStorage.getItem('OrderId');
								searchfields = "Id";
								Input_BS.SetProperty("BO", "Order Entry (Sales)");
								Input_BS.SetProperty("BC", "Order Entry - Line Items");
								Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Parent Order Item Id] IS NULL AND [SC Cancel Reason Calc]='N' AND [Part Number]='DISPOSAL' AND [Request To Cancel]='N' AND  [Fulfillment Status Code]<>'In Progress'");
								Input_BS.SetProperty("SortSpecification", "Created (DESCENDING)");
								Input_BS.SetProperty("ReqNoOfRecords", "");
								Input_BS.SetProperty("FieldsArray", searchfields);
								Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
								var Child_BS = Out_BS.GetChild(0);
								var BS_Data = Child_BS.GetProperty("OutputRecordSet");
								if (BS_Data != "}") {
									try{
										//BS_Data=JSON.parse(BS_Data);
										snCancelRsn=BS_Data+"___"+snCancelRsn;
										$('#SC-SO-Cancel-item-disposal-text').text(snCancelRsn);
										$("#SC-SO-Cancel-item-disposal").modal({
											backdrop: 'static'
										});
										$(".modal-backdrop").css('background', '#ffffff');

										$("#SC-SO-Cancel-item-disposal").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									}
									catch(e){
									}
								}
						}
							$("#custommaskoverlay").hide();
						}, 1000);
					});

					//on click of no button
					$("#SC-cancel-item-no-button").click(function () {
						$("#SC-SO-Cancel-item").modal("hide");
					});
					//START:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
					$("#SC-disposal-item-yes-button").click(function () {
						$("#SC-SO-Cancel-item-disposal").modal("hide");
					});
					$("#SC-disposal-item-no-button").click(function () {
						$("#SC-SO-Cancel-item-disposal").modal("hide");
						$("#SC-SO-Cancel-item-disposal2").modal({
							backdrop: 'static'
						});
						$(".modal-backdrop").css('background', '#ffffff');
						$("#SC-SO-Cancel-item-disposal2").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
					});
					$("#SC-disposal-item-no-button2").click(function () {
						$("#SC-SO-Cancel-item-disposal2").modal("hide");
					});
					
					$("#SC-disposal-item-yes-button2").click(function () {
						var canlineId=$('#SC-SO-Cancel-item-disposal-text').text();
						
						$("#SC-SO-Cancel-item-disposal2").modal("hide");
						$("#custommaskoverlay").show();
						setTimeout(function () {
							canlineId=canlineId.split("___");
							var ResArray = new Array,jsonRes;
							ResArray = canlineId[0].split(";");
							for (var k=0;k< ResArray.length;k++){
								jsonRes = JSON.parse(ResArray[k]);
								FieldQueryPair = {
									"SKU #": "Id='" + jsonRes["Id"] + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var cancelControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls()["Cancel Reason"];
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().ExecuteMethod("SetFormattedValue", cancelControl,canlineId[1]);
							}
							RefreshLineItems();
							
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("#custommaskoverlay").hide();
						}, 1000);
					});
					//END:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
					//on click of search again button
					$("#SC-noresults-ok").click(function () {
						$("#SC-SO-No-Results-found").modal("hide");
						$("#sc_searchtext").value = "";
					});

					//to show order line item waterfall
					$(document).unbind('.SC-order-line').on("click", ".SC-order-line", function () {
						//$(".SC-order-line").click(function() {
						LineId = $(this).attr('id');
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						setTimeout(function () {
							$("#1_s_" + appletseqorderentry + "_l_Item_Price .drilldown").click();
						}, 1000);
					});


					//on checking of display bed 
					$(document).unbind('.displaybed').on("click", ".displaybed", function () {
						var scbedval = "";
						scbedval = $("#" + $(this).attr('id')).is(':checked') ? 'Y' : 'N';
						LineId = $(this).attr('id');
						$("#custommaskoverlay").show();
						LineId = LineId.split("_");
						LineId = LineId[1];
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						setTimeout(function () {
							//if(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().GetFieldValue("SC Display Bed")=='Y'){
							if (scbedval == 'Y') {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Display Bed", 'N');
							} else {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Display Bed", 'Y');
							}
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
							RefreshLineItems();
							$("#custommaskoverlay").hide();
							//setTimeout(function() {	
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							//}, 5000);
						}, 1000);
					});

					//on click of details of line item
					$(document).unbind(".SC-details-popup").on("click", ".SC-details-popup", function () {
						//$(document).unbind('.SC-details-popup').on("click",".SC-details-popup",function() {
						LineId = $(this).attr('id');
						document.getElementById('schandstoreohq').innerHTML = document.getElementById('storehq_' + LineId).innerHTML;
						document.getElementById('schandplantohq').innerHTML = document.getElementById('planthq_' + LineId).innerHTML;
						document.getElementById('schandstatus').innerHTML = document.getElementById('statushand_' + LineId).innerHTML;
						$("#SC-line-details-hand").modal({
							backdrop: 'static'
						});
					});


					//on click of ok button of pick applet update the line details
					$(document).unbind('.siebui-icon-pickrecord').on("click", ".siebui-icon-pickrecord", function () {
						setTimeout(function () {
							  // SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().InvokeMethod("WriteRecord");
							if (SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Coupon Code Req") == "Y") {
								$("#SC-SO-Coupon-lineitem-popup").modal({
									backdrop: 'static'
								});
								$(".modal-backdrop").css('background', '#ffffff');

								$("#SC-SO-Coupon-lineitem-popup").css({
									"display": "flex",
									"justify-content": "center",
									"align-items": "center"
								});
							} else {

								var lineItemsPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM();
								
								var lineRecords = lineItemsPM.Get("GetRecordSet");
								if (lineRecords.length > 0 && isLinePick == true) {
									//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().SetFieldValue("SC Coupon Code Req", "Y");
									//lineItemsPM.ExecuteMethod("InvokeMethod", "SetCouponCodeReq", null, false);
									//START: 17/4/2023: VALLA: Added Below code for apply Coupon Code for Multiple Line Items
										var Custom_Service = "",Input_BS = "",Out_BS = "",searchfields = "",SNCuponCode;
										try{
											Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
											Input_BS = SiebelApp.S_App.NewPropertySet();
											Out_BS = SiebelApp.S_App.NewPropertySet();
											var sOrderId = localStorage.getItem('OrderId');
											searchfields = "SC Coupon Code";
											Input_BS.SetProperty("BO", "Order Entry (Sales)");
											Input_BS.SetProperty("BC", "Order Entry - Line Items");
											Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Id]='"+lineRecords[0]["Id"]+"'");
											Input_BS.SetProperty("ReqNoOfRecords", "");
											Input_BS.SetProperty("FieldsArray", searchfields);
											Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
											var Child_BS = Out_BS.GetChild(0);
											var BS_Data = Child_BS.GetProperty("OutputRecordSet");
											if (BS_Data != "}") {
												BS_Data=JSON.parse(BS_Data);
												SNCuponCode=BS_Data["SC Coupon Code"];
											}
										}
										catch(e){
											console.log(e);
										}
									if(SNCuponCode=="" || SNCuponCode==null)
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "CalculatePriceAll", null, false);
									//END: 17/4/2023: VALLA: Added Below code for apply Coupon Code for Multiple Line Items
										isLinePick = false;
										var Productcouval = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Prod Prom Name");
										$("#scproductcouponvalue_" + LineItemId).text(Productcouval);
										$("#scproductcouponvalue_" + LineItemId).attr("title", Productcouval);
										$("#scproductcouponvalue_" + LineItemId).show();
										$("#" + LineItemId).show();

								}
							}
							//VAMSI:19-MAR-19::Added code for Production NFL Coupon Issue.
							var couponcodereq = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Coupon Code Req");
							
							/*if(couponcodereq != "Y"){
								
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().ExecuteMethod("InvokeMethod", "CalculatePriceAll", null, false);
							}*/
							
							//SBOORLA:Added code for PoleDisplay
							if (poleDisplayFlag == "Y" && sP2PEFlag != "Y" && couponcodereq == "N") {
								FieldQueryPair = {
									"SKU #": "Id='" + LineId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								poleDisplay(ProductDesc, Quantitys, NRCSubtotal);
							}
							// VAMSI:08-OCT-18: Added the below condtions to Support P2PE pole Display.
							if (poleDisplayFlag == "Y" && sP2PEFlag == "Y" && couponcodereq == "N") {
								FieldQueryPair = {
									"SKU #": "Id='" + LineId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								OrderId = localStorage.getItem('OrderId');
								//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
								var lineItems = [ProductDesc, "QTY: " + Quantitys + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
								//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
								SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
							}
							RefreshLineItems();	
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
						}, 5000);
					});


					//on click if product coupon in line items
					$(document).unbind('.prodcoupon').on("click", ".prodcoupon", function () {
						LineId = $(this).attr('id');
						//VALLA:10/28/2022: Added code to disable the Coupon button from the shipping page
						if(!(document.getElementById("Ship-Option-Markup").style.display=="block")){
							FieldQueryPair = {
								"SKU #": "Id='" + LineId + "'"
							};
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							setTimeout(function () {
								$('#1_Prod_Prom_Name').click();
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls()["Prod Prom Name"]);
								isLinePick = true;
							}, 500);
						}
					});

					$(document).unbind('.scprodcoupon').on("click", ".scprodcoupon", function () {
						$("#custommaskoverlay").show();
						setTimeout(function () {
							if ($(".scprodcoupon").prop('checked')) {
								var Id = $(".scprodcoupon").attr('id');
								var idnum = [];
								idnum = Id.split('_');
								LineItemId = idnum[1];
								FieldQueryPair = {
									"SKU #": "Id='" + idnum[1] + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								setTimeout(function () {
									$('#1_Prod_Prom_Name').click();
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetControls()["Prod Prom Name"]);
									isLinePick = true;
								}, 500);
							}
							$("#custommaskoverlay").hide();
						}, 50);
					});

					$(document).unbind('.scmanualdiscount').on("click", ".scmanualdiscount", function () {
						$("#custommaskoverlay").show();
						setTimeout(function () {
							var Id = $(".scmanualdiscount").attr('id');
							var idnum = [];
							idnum = Id.split('_');
							LineItemId = idnum[1];
							if ($('.scmanualdiscount').prop('checked')) {
								FieldQueryPair = {
									"SKU #": "Id='" + LineItemId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								$("#manualblock_" + LineItemId).toggle();
							}
							$("#custommaskoverlay").hide();
						}, 500);
					});


					//on click of delete in product coupon in line items
					$(document).unbind('.coupdescdel').on("click", ".coupdescdel", function () {
						LineId = $(this).attr('id');
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						$("#custommaskoverlay").show();
						setTimeout(function () {
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().SetFieldValue("Prod Prom Name", "");
							var lineItemsPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM();
							lineItemsPM.ExecuteMethod("InvokeMethod", "DeleteCoupon", null, false);
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().SetFieldValue("SC Coupon Code","");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("WriteRecord");

							RefreshLineItems();
							//SBOORLA:Added code for PoleDisplay
							if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
								FieldQueryPair = {
									"SKU #": "Id='" + LineId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								poleDisplay(ProductDesc, Quantitys, NRCSubtotal);
							}
							// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
							if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
								FieldQueryPair = {
									"SKU #": "Id='" + LineId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								OrderId = localStorage.getItem('OrderId');
								//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
								var lineItems = [ProductDesc, "QTY: " + Quantitys + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
								//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
								SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
							}
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("#custommaskoverlay").hide();
						}, 500);
					});


					//Start code for addons manual discount
					$(document).unbind('.maualdiscaddons').on('click', '.maualdiscaddons', function () {
						LineId = $(this).attr('id');
						LineId = LineId.split('_');
						LineId = LineId[0];
						$("#" + LineId + "_editaddonblock").show();
						//NTHARRE:01-Sep-2021: Added for SFSTRY0001317
						var divtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Type');
						var divsubtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Sub Type');
						if((divtype == "STORE" && divsubtype == "STORE") || (divtype == "DIRECT" && divsubtype =="CSC"))
							$(".addon-manual-discounts").hide();
					});
					//on change of discount amount
					/*$(document).on('focusout', '.SC-manual-addon-per', function (event) {
						var LineItemId = $(this).attr('id');
						LineItemId = LineItemId.split("addd");
						//make discount amt zero
						manualdiscamt = "";
						$('.Manualaddonamt').val("");
						$("#"+LineItemId[0]+"addondiscamount").text(manualdiscamt);
					});
					//on change of discount amount
					$(document).on('focusout', '.Manualaddonamt', function (event) {
						var LineItemId = $(this).attr('id');
						LineItemId = LineItemId.split("addon");
						//make discount pecentage zero
						manualdiscperc = "";
						$('#discount-percentage').val("");
						$("#"+ LineItemId[0]+"adddisper").text(manualdiscperc);
					});*/
					$(document).unbind('.addonsdel').on('click', '.addonsdel', function () {
						var addonDisreason = "",
							sdisamount = "",
							sdisper = "",
							parentlineId = "",
							addonsid = "",
							fieldvalues, fieldnames, PerDisc;
						LineId = $(this).attr('id');
						addonsid = LineId.split('_');
						LineId = addonsid[0];
						parentlineId = addonsid[1];
						PerDisc = addonsid[2];
						addonDisreason = "";
						sdisper = "";
						sdisamount = "";
						$("#custommaskoverlay").show();
						setTimeout(function () {
							var inPS = "",
								outPS = "",
								Bservice = "";
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper;
							fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent";
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("BO", "Order Entry (Sales)");
							inPS.SetProperty("BC", "Order Entry - Line Items");
							inPS.SetProperty("FieldsArray", fieldnames);
							inPS.SetProperty("ValuesArray", fieldvalues);
							inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
							Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
							outPS = Bservice.InvokeMethod("Insert", inPS);
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("RefreshBusComp");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("CalculatePriceAll");
							RefreshLineItems();

							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("#custommaskoverlay").hide();
						}, 500);
					});
					//on click of apply discounts button
					$(document).unbind('.manual-disc-addonsapp').on('click', '.manual-disc-addonsapp', function () {
						var addonDisreason = "",
							sdisamount = "",
							sdisper = "",
							parentlineId = "",
							addonsid = "",
							fieldvalues, fieldnames, PerDisc;
						LineId = $(this).attr('id');
						addonsid = LineId.split('_');
						LineId = addonsid[0];
						parentlineId = addonsid[1];
						PerDisc = addonsid[2];
						$("#custommaskoverlay").show();
						setTimeout(function () {
							//NTHARRE: 13Sep-2021: Added for SFSTRY0001317
							var divtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Type');
							var divsubtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Sub Type');
							if((divtype == "STORE" && divsubtype == "STORE") || (divtype == "DIRECT" && divsubtype =="CSC"))
								addonDisreason = "Policy Adjustment"; //NTHARRE: Hardcoded as per the SFSTRY0001059
							else
							addonDisreason = $("#" + LineId + "adddiscreason").val();
							sdisper = $("#" + LineId + "adddisper").val();
							sdisamount = $("#" + LineId + "addondiscamount").val();
							if (sdisamount == "" && sdisper == "") {
								sdisamount = 0;
							}
							var inPS = "",
								outPS = "",
								Bservice = "";
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							if (addonDisreason == "Remove Manual Discount") {
								addonDisreason = "";
								sdisper = "";
								sdisamount = "";
								fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper + ', N';
								fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent,SC Manual Discount Update Flag";
								inPS = SiebelApp.S_App.NewPropertySet();
								outPS = SiebelApp.S_App.NewPropertySet();
								inPS.SetProperty("BO", "Order Entry (Sales)");
								inPS.SetProperty("BC", "Order Entry - Line Items");
								inPS.SetProperty("FieldsArray", fieldnames);
								inPS.SetProperty("ValuesArray", fieldvalues);
								inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
								Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
								outPS = Bservice.InvokeMethod("Insert", inPS);
							} else {
								if ((sdisamount >= 0) || (sdisper >= 0)) {
									//JCHAKRAB STRY0207171 10/10/2022 
									var LOVValue = "";
									var prodSku = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product");
									var prodClass = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Product Class");
									var prodLine = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product Line");
									//Get L OV exists or not
									var Custom_Service = "",
											Input_BS = "",
											Out_BS = "",
											SearchSpec = "";
										SearchSpec = "([Type] = 'SC_MANUAL_DISC' AND [Active] = 'Y' AND ([Name]='" + prodSku + "' OR [Name]='" + prodClass + "' OR [Name]='" + prodLine + "'))"; 
										Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
										Input_BS = SiebelApp.S_App.NewPropertySet();
										Out_BS = SiebelApp.S_App.NewPropertySet();
										Input_BS.SetProperty("BO", "List Of Values");
										Input_BS.SetProperty("BC", "List Of Values");
										Input_BS.SetProperty("SearchSpecification", SearchSpec);
										Input_BS.SetProperty("SortSpecification", "");
										Input_BS.SetProperty("ReqNoOfRecords", "");
										Input_BS.SetProperty("FieldsArray", "Value");
										Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
										var Child_BS = Out_BS.GetChild(0);
										var BS_Data = Child_BS.GetProperty("OutputRecordSet");
										if (BS_Data != "}") {
											var jsonRes = JSON.parse(BS_Data.split(";")[0]);
											LOVValue = jsonRes["Value"];
										}
									//STRY0207171 ends
									var scmanualadminflag = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Manual Disc Admin");
									if (scmanualadminflag == "Y"&& LOVValue == "") { //STRY0207171 Updated condition
										//Updated BC Name for #STRY0037337
										fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper + ', Y';
										fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent,SC Manual Discount Update Flag";
										inPS = SiebelApp.S_App.NewPropertySet();
										outPS = SiebelApp.S_App.NewPropertySet();
										inPS.SetProperty("BO", "Order Entry (Sales)");
										inPS.SetProperty("BC", "Order Entry - Line Items");
										inPS.SetProperty("FieldsArray", fieldnames);
										inPS.SetProperty("ValuesArray", fieldvalues);
										inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
										Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
										outPS = Bservice.InvokeMethod("Insert", inPS);
									} else {
										var Custom_Service = "",
											Input_BS = "",
											Out_BS = "",
											pinnedIds_Loc = "",
											SearchSpec = "",
											SearchSpec1 = "",
											SearchSpec2 = "",
											SearchSpec3 = "",
											SearchSpec4 = "";
										var ProductLine = addonsid[3];
										var SCProductClassification = addonsid[4];
										var SCProductDetail = addonsid[5];
										var SCProductClass = addonsid[6];
										var SKU = addonsid[7];
										var StartPrice = addonsid[8];
										var SubType = addonsid[9];
										SearchSpec1 = "([Product Line] IS NULL OR [Product Line]='" + ProductLine + "') AND ([Classification] IS NULL OR [Classification]='" + SCProductClassification + "')";
										SearchSpec2 = "([User Responsbility]='Y' OR [Responsibility] IS NULL) AND ([Detail] IS NULL OR [Detail]='" + SCProductDetail + "')";
										SearchSpec3 = "([Product Class] IS NULL OR [Product Class]='" + SCProductClass + "') AND ([Manual Discount Reason]IS NULL OR [Manual Discount Reason]='" + addonDisreason + "')";
										SearchSpec4 = "([Part Number] IS NULL OR [Part Number]='" + SKU + "') AND ([Effective Start Date] IS NULL OR [Effective Start Date]<=today()) AND ([Effective End Date] IS NULL OR [Effective End Date]>=today())";
										SearchSpec5 = "([Order Sub Type] IS NULL OR [Order Sub Type]='" + SubType + "')";
										SearchSpec = SearchSpec1 + "AND" + SearchSpec2 + "AND" + SearchSpec3 + "AND" + SearchSpec4 + "AND" + SearchSpec5;
										Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
										Input_BS = SiebelApp.S_App.NewPropertySet();
										Out_BS = SiebelApp.S_App.NewPropertySet();
										searchfields = "Discount Amount,Discount Percentage";
										Input_BS.SetProperty("BO", "SC Manual Discount");
										Input_BS.SetProperty("BC", "SC Manual Discount");
										Input_BS.SetProperty("SearchSpecification", SearchSpec);
										Input_BS.SetProperty("SortSpecification", "");
										Input_BS.SetProperty("ReqNoOfRecords", "");
										Input_BS.SetProperty("FieldsArray", searchfields);
										Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
										var Child_BS = Out_BS.GetChild(0);
										var BS_Data = Child_BS.GetProperty("OutputRecordSet");
										if (BS_Data != "}") {
											var ResArray = new Array;
											ResArray = BS_Data.split(";");
											jsonRes = JSON.parse(ResArray[0]);
											var DisPer = jsonRes["Discount Percentage"];
											var Disamount = jsonRes["Discount Amount"];

											if (DisPer == "" && Disamount != "") {
												DisPer = (parseFloat(Disamount) / parseFloat(StartPrice)) * 100;
											} else if (DisPer != "" && Disamount == "") {
												Disamount = (parseFloat(StartPrice) * parseFloat(DisPer)) / 100;
											}


											if (sdisper != null && sdisper != "") {
												if (parseFloat(sdisper) <= DisPer) {
													fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper + ', Y';
													fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent,SC Manual Discount Update Flag"
													inPS = SiebelApp.S_App.NewPropertySet();
													outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Order Entry (Sales)");
													inPS.SetProperty("BC", "Order Entry - Line Items");
													inPS.SetProperty("FieldsArray", fieldnames);
													inPS.SetProperty("ValuesArray", fieldvalues);
													inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
													Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
													outPS = Bservice.InvokeMethod("Insert", inPS);

												} else {
													$("#SC-ManualDiscount-error").modal({
														backdrop: 'static'
													});
													$("#SC-ManualDiscount-error").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}

											} else if (sdisamount != null && sdisamount != "") {
												if (parseInt(sdisamount) <= Disamount) {
													fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper + ', Y';
													fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent,SC Manual Discount Update Flag"
													inPS = SiebelApp.S_App.NewPropertySet();
													outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Order Entry (Sales)");
													inPS.SetProperty("BC", "Order Entry - Line Items");
													inPS.SetProperty("FieldsArray", fieldnames);
													inPS.SetProperty("ValuesArray", fieldvalues);
													inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
													Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
													outPS = Bservice.InvokeMethod("Insert", inPS);
												} else {
													$("#SC-ManualDiscount-error").modal({
														backdrop: 'static'
													});
													$("#SC-ManualDiscount-error").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}
											} else if (sdisamount == 0) {
												addonDisreason = "";
												sdisper = "";
												sdisamount = "";
												fieldvalues = addonDisreason + ',' + sdisamount + ',' + sdisper+ ', N';
												fieldnames = "SC Manual Discount Reason,Discount Amount,Discount Percent,SC Manual Discount Update Flag"
												inPS = SiebelApp.S_App.NewPropertySet();
												outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("BO", "Order Entry (Sales)");
												inPS.SetProperty("BC", "Order Entry - Line Items");
												inPS.SetProperty("FieldsArray", fieldnames);
												inPS.SetProperty("ValuesArray", fieldvalues);
												inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Id]='" + LineId + "' AND [Root Order Item Id]='" + parentlineId + "'");
												Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
												outPS = Bservice.InvokeMethod("Insert", inPS);
											}

										} else {
											$("#SC-ManualDiscount-NOSKU").modal({
												backdrop: 'static'
											});
											$("#SC-ManualDiscount-NOSKU").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
										}

									}
								} else {
									$("#SC-ManualDisc-Negative").modal({
										backdrop: 'static'
									});
									$("#SC-ManualDisc-Negative").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
								}
							}
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("RefreshBusComp");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("CalculatePriceAll");
							RefreshLineItems();

							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("body").trigger('Custom.End');
							//}, 1000);
							$("#" + LineId + "_editaddonblock").hide();
							$("#custommaskoverlay").hide();
						}, 500);

					});
					$(document).unbind('.manual-disc-addonscl').on('click', '.manual-disc-addonscl', function () {
						LineId = $(this).attr('id');
						LineId = LineId.split('_');
						LineId = LineId[0];
						$("#" + LineId + "_editaddonblock").hide();

					});
					//End code for addons manual discount

					//on click of manual discount button
					$(document).unbind('.discount-btn').on('click', '.discount-btn', function () {
						//$(document).find('.discount-btn').click(function() {
						LineId = $(this).attr('id');
						FieldQueryPair = {
							"SKU #": "Id='" + LineId + "'"
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						setTimeout(function () {
							$(".manualblock" + LineId).show();
						}, 500);
					});


					//on click of cancel discounts button		
					$(document).on('click', '.CancelDisc', function () {
						$("#manualblock" + LineId).hide();
						$("#ManualDiscountamt_" + LineId).val("");
						$("#ManualDiscountper_" + LineId).text("");
						$("#ManualDiscountRea_" + LineId).text("");
						manualdiscperc = manualdiscamou = manualdiscreason = "";
					});
					$(document).on('click', '.scmanualdisdelete', function () {
						var LineId = $(this).attr('id');
						var Id = LineId.split("_");
						LineId = Id[1];
						$("body").trigger('Custom.Start');
						setTimeout(function () {
							FieldQueryPair = {
								"SKU #": "Id='" + LineId + "'"
							};
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", "");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Percent", "");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Amount - Display", "");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", "");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
							$("#scmanualordervalue_" + LineId).text("");
							$("#scmanualordervalue_" + LineId).hide();
							$("#scmanualcouponval_" + LineId).text("");
							$("#scmanualcouponval_" + LineId).hide();
							$("#scmanualcoupondelete_" + LineId).hide();
							RefreshLineItems();
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("body").trigger('Custom.End');
						}, 1000);

					});
					//on click of apply discounts button
					$(document).on('click', '.Applydisc', function () {
						var details = $(this).attr('id');
						details = details.split("@");
						LineId = details[0];
						$("body").trigger('Custom.Start');
						//var netprice = $(".SC-order-line").text();
						setTimeout(function () {
							FieldQueryPair = {
								"SKU #": "Id='" + LineId + "'"
							};
							//NTHARRE: 13Sep-2021: Added for SFSTRY0001317
							var divtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Type');
							var divsubtype = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Sub Type');
							if((divtype == "STORE" && divsubtype == "STORE") || (divtype == "DIRECT" && divsubtype =="CSC"))
								manualdiscreason = "Policy Adjustment"; //NTHARRE: Hardcoded as per the SFSTRY0001059
							else
							manualdiscreason = $("#ManualDiscountRea_" + LineId).text();
							manualdiscamou = $("#ManualDiscountamt_" + LineId).val();
							manualdiscperc = $("#ManualDiscountper_" + LineId).text();
							if (manualdiscamou == "" && manualdiscperc == "") {
								manualdiscamou = 0;
							}
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							if (manualdiscreason == "Remove Manual Discount") {
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", "");
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Percent", "");
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Amount - Display", "");
								SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
								//VALLA: 21-Nov-2019: Code to set the Manual Discount flag to N.
								var InPS = SiebelApp.S_App.NewPropertySet();
								var OutPS = SiebelApp.S_App.NewPropertySet(); 
								var fieldnames = "SC Manual Discount Update Flag";
								var fieldvalues = "N";
								inPS = SiebelApp.S_App.NewPropertySet();
								outPS = SiebelApp.S_App.NewPropertySet();
								inPS.SetProperty("BO", "Order Entry (Sales)");
								inPS.SetProperty("BC", "Order Entry - Line Items");
								inPS.SetProperty("FieldsArray", fieldnames);
								inPS.SetProperty("ValuesArray", fieldvalues);
								inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
								Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
								outPS = Bservice.InvokeMethod("Insert", inPS);
								$("#scmanualordervalue_" + LineId).hide();
								$("#manualblock" + LineId).hide();
								$("#ManualDiscountamt_" + LineId).val("");
								$("#ManualDiscountper_" + LineId).text("");
								$("#ManualDiscountRea_" + LineId).text("");
								$('#manualcouponcheck_' + LineId).prop('checked', true);
								manualdiscperc = manualdiscamou = manualdiscreason = "";
							} else {
								//JCHAKRAB STRY0207171 10/10/2022 
									var LOVValue = "";
									var prodSku = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product");
									var prodClass = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Product Class");
									var prodLine = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product Line");
									//Get Prod Line as above statement doesnt fetch value
									
									//Get LOV exists or not
									var Custom_Service = "",
											Input_BS = "",
											Out_BS = "",
											SearchSpec = "";
										SearchSpec = "([Type] = 'SC_MANUAL_DISC' AND [Active] = 'Y' AND ([Name]='" + prodSku + "' OR [Name]='" + prodClass + "' OR [Name]='" + prodLine + "'))"; 
										Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
										Input_BS = SiebelApp.S_App.NewPropertySet();
										Out_BS = SiebelApp.S_App.NewPropertySet();
										Input_BS.SetProperty("BO", "List Of Values");
										Input_BS.SetProperty("BC", "List Of Values");
										Input_BS.SetProperty("SearchSpecification", SearchSpec);
										Input_BS.SetProperty("SortSpecification", "");
										Input_BS.SetProperty("ReqNoOfRecords", "");
										Input_BS.SetProperty("FieldsArray", "Value");
										Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
										var Child_BS = Out_BS.GetChild(0);
										var BS_Data = Child_BS.GetProperty("OutputRecordSet");
										if (BS_Data != "}") {
											var jsonRes = JSON.parse(BS_Data.split(";")[0]);
											LOVValue = jsonRes["Value"];
										}
									//STRY0207171 ends
								var scmanualadminflag = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Manual Disc Admin");
								var startprice = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().GetFieldValue("Adjusted List Price - Display");
								if (scmanualadminflag == "Y"&& LOVValue == "") { //STRY0207171 Updated condition
									if (manualdiscreason != null && manualdiscreason != "") {
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", manualdiscreason);
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
									}
									if (manualdiscperc != null) {
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Percent", manualdiscperc);
									}
									if (manualdiscamou != null) {
										SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Amount - Display", manualdiscamou);
									}
									SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
									//VALLA: 21-Nov-2019: Code to set the Manual Discount flag to N.
									var InPS = SiebelApp.S_App.NewPropertySet();
									var OutPS = SiebelApp.S_App.NewPropertySet(); 
									var fieldnames = "SC Manual Discount Update Flag";
									var fieldvalues = "Y";
									inPS = SiebelApp.S_App.NewPropertySet();
									outPS = SiebelApp.S_App.NewPropertySet();
									inPS.SetProperty("BO", "Order Entry (Sales)");
									inPS.SetProperty("BC", "Order Entry - Line Items");
									inPS.SetProperty("FieldsArray", fieldnames);
									inPS.SetProperty("ValuesArray", fieldvalues);
									inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
									Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
									outPS = Bservice.InvokeMethod("Insert", inPS);
								} else {
									if ((manualdiscamou => 0) || (manualdiscperc => 0)) {

										var Custom_Service = "",
											Input_BS = "",
											Out_BS = "",
											pinnedIds_Loc = "",
											SearchSpec = "",
											SearchSpec1 = "",
											SearchSpec2 = "",
											SearchSpec3 = "",
											SearchSpec4 = "",
											SearchSpec5 = "";
										var ProductLine = details[1];
										var SCProductClassification = details[2];
										var SCProductDetail = details[3];
										var SCProductClass = details[4];
										var SKU = details[5];
										var SubType = details[6];
										SearchSpec1 = "([Product Line] IS NULL OR [Product Line]='" + ProductLine + "') AND ([Classification] IS NULL OR [Classification]='" + SCProductClassification + "')";
										SearchSpec2 = "([User Responsbility]='Y' OR [Responsibility] IS NULL) AND ([Detail] IS NULL OR [Detail]='" + SCProductDetail + "')";
										SearchSpec3 = "([Product Class] IS NULL OR [Product Class]='" + SCProductClass + "') AND ([Manual Discount Reason]IS NULL OR [Manual Discount Reason]='" + manualdiscreason + "')";
										SearchSpec4 = "([Part Number] IS NULL OR [Part Number]='" + SKU + "') AND ([Effective Start Date] IS NULL OR [Effective Start Date]<=today()) AND ([Effective End Date] IS NULL OR [Effective End Date]>=today())";
										SearchSpec5 = "([Order Sub Type] IS NULL OR [Order Sub Type]='" + SubType + "')";
										SearchSpec = SearchSpec1 + "AND" + SearchSpec2 + "AND" + SearchSpec3 + "AND" + SearchSpec4 + "AND" + SearchSpec5;
										Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
										Input_BS = SiebelApp.S_App.NewPropertySet();
										Out_BS = SiebelApp.S_App.NewPropertySet();
										searchfields = "Discount Amount,Discount Percentage";
										Input_BS.SetProperty("BO", "SC Manual Discount");
										Input_BS.SetProperty("BC", "SC Manual Discount");
										Input_BS.SetProperty("SearchSpecification", SearchSpec);
										Input_BS.SetProperty("SortSpecification", "");
										Input_BS.SetProperty("ReqNoOfRecords", "");
										Input_BS.SetProperty("FieldsArray", searchfields);
										Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
										var Child_BS = Out_BS.GetChild(0);
										var BS_Data = Child_BS.GetProperty("OutputRecordSet");
										if (BS_Data != "}") {
											var ResArray = new Array;
											ResArray = BS_Data.split(";");
											jsonRes = JSON.parse(ResArray[0]);
											var DisPer = jsonRes["Discount Percentage"];
											var Disamount = jsonRes["Discount Amount"];

											if (DisPer == "" && Disamount != "") {
												DisPer = (parseFloat(Disamount) / parseFloat(startprice)) * 100;
											} else if (DisPer != "" && Disamount == "") {
												Disamount = (parseFloat(startprice) * parseFloat(DisPer)) / 100;
											}

											if (manualdiscperc != null && manualdiscperc != "") {

												if (parseFloat(manualdiscperc) <= DisPer) {
													if (manualdiscreason != null && manualdiscreason != "") {
														//if(manualdiscreason!=null){
														SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", manualdiscreason);
														SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
													}
													SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Percent", manualdiscperc);
													SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
													//VALLA: 21-Nov-2019: Code to set the Manual Discount flag to N.
													var InPS = SiebelApp.S_App.NewPropertySet();
													var OutPS = SiebelApp.S_App.NewPropertySet(); 
													var fieldnames = "SC Manual Discount Update Flag";
													var fieldvalues = "Y";
													inPS = SiebelApp.S_App.NewPropertySet();
													outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Order Entry (Sales)");
													inPS.SetProperty("BC", "Order Entry - Line Items");
													inPS.SetProperty("FieldsArray", fieldnames);
													inPS.SetProperty("ValuesArray", fieldvalues);
													inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
													Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
													outPS = Bservice.InvokeMethod("Insert", inPS);
													$("#scmanualordervalue_" + LineId).text(manualdiscperc + '% -' + manualdiscreason);
													$("#scmanualordervalue_" + LineId).show();
													$("#scmanualcouponval_" + LineId).text(manualdiscperc + '% -' + manualdiscreason);
													$("#scmanualcouponval_" + LineId).show();
													$("#scmanualcoupondelete_" + LineId).show();

												} else {
													$("#SC-ManualDiscount-error").modal({
														backdrop: 'static'
													});
													$("#SC-ManualDiscount-error").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}

											} else if (manualdiscamou != null && manualdiscamou != "") {

												if (parseFloat(manualdiscamou) <= parseFloat(Disamount)) {
													if (manualdiscreason != null && manualdiscreason != "") {
														//if(manualdiscreason!=null){
														SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", manualdiscreason);
														SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
													}
													SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Amount - Display", manualdiscamou);
													SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
													//VALLA: 21-Nov-2019: Code to set the Manual Discount flag to N.
													var InPS = SiebelApp.S_App.NewPropertySet();
													var OutPS = SiebelApp.S_App.NewPropertySet(); 
													var fieldnames = "SC Manual Discount Update Flag";
													var fieldvalues = "Y";
													inPS = SiebelApp.S_App.NewPropertySet();
													outPS = SiebelApp.S_App.NewPropertySet();
													inPS.SetProperty("BO", "Order Entry (Sales)");
													inPS.SetProperty("BC", "Order Entry - Line Items");
													inPS.SetProperty("FieldsArray", fieldnames);
													inPS.SetProperty("ValuesArray", fieldvalues);
													inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
													Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
													outPS = Bservice.InvokeMethod("Insert", inPS);
													$("#scmanualordervalue_" + LineId).text('$' + manualdiscamou + '-' + manualdiscreason);
													$("#scmanualordervalue_" + LineId).show();
													$("#scmanualcouponval_" + LineId).text('$' + manualdiscamou + '-' + manualdiscreason);
													$("#scmanualcouponval_" + LineId).show();
													$("#scmanualcoupondelete_" + LineId).show();
												} else {
													$("#SC-ManualDiscount-error").modal({
														backdrop: 'static'
													});
													$("#SC-ManualDiscount-error").css({
														"display": "flex",
														"justify-content": "center",
														"align-items": "center"
													});
												}
											} else if (manualdiscamou == 0) {
												manualdiscreason = "";
												manualdiscamou = "";
												$("#scmanualordervalue_" + LineId).hide();
												$("#ManualDiscountRea_" + LineId).hide();
												$('#manualcouponcheck_' + LineId).prop('checked', false);
												SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("SC Manual Discount Reason", manualdiscreason);
												SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
												SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetBusComp().SetFieldValue("Discount Amount - Display", manualdiscamou);
												SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].InvokeMethod("WriteRecord");
												//VALLA: 21-Nov-2019: Code to set the Manual Discount flag to N.
												var InPS = SiebelApp.S_App.NewPropertySet();
												var OutPS = SiebelApp.S_App.NewPropertySet(); 
												var fieldnames = "SC Manual Discount Update Flag";
												var fieldvalues = "N";
												inPS = SiebelApp.S_App.NewPropertySet();
												outPS = SiebelApp.S_App.NewPropertySet();
												inPS.SetProperty("BO", "Order Entry (Sales)");
												inPS.SetProperty("BC", "Order Entry - Line Items");
												inPS.SetProperty("FieldsArray", fieldnames);
												inPS.SetProperty("ValuesArray", fieldvalues);
												inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
												Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
												outPS = Bservice.InvokeMethod("Insert", inPS);
											}

										} else {
											$("#SC-ManualDiscount-NOSKU").modal({
												backdrop: 'static'
											});
											$("#SC-ManualDiscount-NOSKU").css({
												"display": "flex",
												"justify-content": "center",
												"align-items": "center"
											});
										}
									} else {
										$("#SC-ManualDisc-Negative").modal({
											backdrop: 'static'
										});
										$("#SC-ManualDisc-Negative").css({
											"display": "flex",
											"justify-content": "center",
											"align-items": "center"
										});
									}
								}
								
							}
							manualdiscperc = manualdiscamou = manualdiscreason = "";
							RefreshLineItems();

							if (poleDisplayFlag == "Y") {
								FieldQueryPair = {
									"SKU #": "Id='" + LineId + "'"
								};
								SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								poleDisplay(ProductDesc, Quantitys, NRCSubtotal);
							}
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("body").trigger('Custom.End');
						}, 50);
						$("#manualblock_" + LineId).hide();
					});

					$(document).on('click', '#SC-No-Manual-Dis', function () {
						$("#SC-ManualDiscount-NOSKU").modal("hide");
						$("#SC-ManualDiscount-NOSKU").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						$('#manualcouponcheck_' + LineItemId).prop('checked', false);
					});
					$(document).on('click', '#SC-ManualDiseerror-ok', function () {
						$("#SC-ManualDiscount-error").modal("hide");
						$("#SC-ManualDiscount-error").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						$('#manualcouponcheck_' + LineItemId).prop('checked', false);
					});

					$(document).on('click', '#SC-ManualNegative-ok', function () {
						$("#SC-ManualDisc-Negative").modal("hide");
						$("#SC-ManualDisc-Negative").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						$('#manualcouponcheck_' + LineItemId).prop('checked', false);
					});

					//on change of manual discount percentage
					$(document).on('change', '.SC-manual-discount-per', function (event) {
						//make discount amount zero
						manualdiscperc = $(this).val();
						$('#ManualDiscountamt_' + LineItemId).val("");
						$("#ManualDiscountper_" + LineItemId).text(manualdiscperc);
						$("#ManualDiscountper_" + LineItemId).show();
						manualdiscamou = "";
						$(this).val("");
					});

					//on change of manual discount percentage
					$(document).on('change', '.SC-manual-discount', function (event) {
						//make discount amount zero
						manualdiscperc = $(this).val();
						$('#ManualDiscountamt_' + LineId).val("");
						$("#ManualDiscountper_" + LineId).text(manualdiscperc);
						manualdiscamou = "";
						$(this).val("");
					});


					//on change of discount amount
					$(document).on('change', '.discountammount', function (event) {
						manualdiscamou = $(this).val();
						//make discount pecentage zero
						manualdiscperc = "";
						$('.SC-manual-discount').val("");
						$("#ManualDiscountper_" + LineId).text(manualdiscperc);
					});

					//on change of discount amount
					$(document).on('focusout', '.manualdiscountammount', function (event) {
						manualdiscamou = $(this).val();
						//make discount pecentage zero
						manualdiscperc = "";
						$('.SC-manual-discount').val("");
						$("#ManualDiscountper_" + LineItemId).text(manualdiscperc);
					});

					//on Click of ok
					$(document).on('click', '#SC-Ok-Discount', function (e) {
						$("#SC-Discount-details").modal('hide');
					});

					//on change of manual discount reason
					$(document).on('change', '.prod-discounts', function (event) {
						//$("#prod-discounts").change(function(event) {
						manualdiscreason = $(this).val();
						if (manualdiscreason == "Remove Manual Discount") {
							$("#applied-discount" + LineId).text("");
							$("#discount-percentage" + LineId).text("");
							$('#discountammount' + LineId).val("");
						} else
							$("#applied-discount" + LineId).text(manualdiscreason);
						$(this).val("");
					});

					$(document).on('change', '.manual-discounts', function (event) {
						//$("#prod-discounts").change(function(event) {
						manualdiscreason = $(this).val();
						$(".SC-manual-discount-per").removeClass("SC-readonly");
						$(".ManualDiscountamt").removeClass("SC-readonly");
						if (manualdiscreason == "Remove Manual Discount") {
							$("#ManualDiscountamt_" + LineItemId).val("");
							$("#ManualDiscountper_" + LineItemId).text("");
							$('#ManualDiscountRea_' + LineItemId).text("Remove Manual Discount");
						} else {
							$("#ManualDiscountRea_" + LineItemId).text(manualdiscreason);
							$("#ManualDiscountRea_" + LineItemId).show();
						}

						$(this).val("");
					});


					$(document).on('change', '.addon-manual-discounts', function (event) {
						//$("#prod-discounts").change(function(event) {
						manualdiscreason = $(this).val();
						$(".SC-manual-addon-per").removeClass("SC-readonly");
						$(".Manualaddonamt").removeClass("SC-readonly");

					});

					//on change of quantity of line items
					$(document).on('change', '.quantitybox', function (event) {
						LineId = $(this).attr('id');
						var qu = $(this).val();
						$("body").trigger('Custom.Start');
						setTimeout(function () {
							FieldQueryPair = {
								"SKU #": "Id='" + LineId + "'"
							};
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");

							$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested").trigger("click");
							$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested").focus();
							$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested input:text").val(qu);
							$("#1_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
							RefreshLineItems();
							//SBOORLA:Added code for PoleDisplay
							// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
							if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								poleDisplay(ProductDesc, Quantitys, NRCSubtotal);
							}
							if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
								ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								OrderId = localStorage.getItem('OrderId');
								//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
								var lineItems = [ProductDesc, "QTY: " + Quantitys + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
								//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
								SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
							}
							//if line details section is closed open it
							if ($('.lineitemsopen').hasClass('iconClosed')) {
								$('.lineitemsopen').click();
							}
							$("body").trigger('Custom.End');
						}, 50);
					});


					//on change of giftcard amount of line items
					$(document).on('change', '.SC-giftcard', function (event) {
						var giftvalue = $(this).val();
						LineId = $(this).attr('id');
						//if (giftvalue <= 0 || giftvalue >= 2000)
							//Added by APRAKASH FOR SFSTRY0001636
						if (giftvalue <= 0 || giftvalue > 2000)
							$(".SC-giftcard").val(0);
						else {
							$("body").trigger('Custom.Start');
							OrderId = localStorage.getItem('OrderId');
							FieldQueryPair = {
								"SKU #": "Id='" + LineId + "'"
							};
							SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
							setTimeout(function () {
								var Bservice = '',
									inPS = '',
									outPS = '';
								inPS = SiebelApp.S_App.NewPropertySet();
								outPS = SiebelApp.S_App.NewPropertySet();
								inPS.SetProperty("BO", "Order Entry (Sales)");
								inPS.SetProperty("BC", "Order Entry - Line Items");
								var Farray = ["Net Price", "Adjusted List Price", "NRC CxTotal", "Unit Price"];
								inPS.SetProperty("FieldsArray", Farray);
								var gvalue = [giftvalue, giftvalue, giftvalue, giftvalue];
								inPS.SetProperty("ValuesArray", gvalue);
								inPS.SetProperty("SearchSpecification", "[Id] = '" + LineId + "'");
								Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
								outPS = Bservice.InvokeMethod("Insert", inPS);
								RefreshLineItems();
								//if line details section is closed open it
								if ($('.lineitemsopen').hasClass('iconClosed')) {
									$('.lineitemsopen').click();
								}
							}, 1000);
							SC_OUI_Methods.ClearP2PEPoleDisplay(OrderId);
							var lineItems = ["GIFT CARD", "QTY: 1 	 PRICE: $" + parseFloat(giftvalue).toFixed(2)]
							SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
						}
					});

					//SBOORLA:Added code for Giftcard Amount
					$(document).on('click', "#sc-gc-cancel", function () {
						$("#SC-SO-GiftCard").modal('hide');
						$("#SC-SO-GiftCard").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
					});
					$(document).on('click', '#sc-gc-ok', function (event) {
						var giftvalue = $(".SC-SO-input-GC").val();
						$("#SC-SO-GiftCard").modal('hide');
						$("#SC-SO-GiftCard").css({
							"display": "",
							"justify-content": "",
							"align-items": ""
						});
						//if (giftvalue <= 0 || giftvalue >= 2000)
							//Added by APRAKASH FOR SFSTRY0001636
						if (giftvalue <= 0 || giftvalue > 2000)
							giftvalue = 0;
						$("#custommaskoverlay").show();
						//FieldQueryPair={"SKU #": "Id='"+lineRowID+"'"};
						//SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Entry Line Item List Applet");
						setTimeout(function () {
							if (giftvalue != "") {
								var Bservice = '',
									inPS = '',
									outPS = '';
								inPS = SiebelApp.S_App.NewPropertySet();
								outPS = SiebelApp.S_App.NewPropertySet();
								inPS.SetProperty("BO", "Order Entry (Sales)");
								inPS.SetProperty("BC", "Order Entry - Line Items");
								var Farray = ["Net Price", "Adjusted List Price", "NRC CxTotal", "Unit Price"];
								inPS.SetProperty("FieldsArray", Farray);
								var gvalue = [giftvalue, giftvalue, giftvalue, giftvalue];
								inPS.SetProperty("ValuesArray", gvalue);
								inPS.SetProperty("SearchSpecification", "[Id] = '" + lineRowID + "'");
								Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified");
								outPS = Bservice.InvokeMethod("Insert", inPS);
								RefreshLineItems();
							}
							if(sP2PEFlag == "Y" && poleDisplayFlag == "Y"){
								OrderId = localStorage.getItem('OrderId');
								SC_OUI_Methods.ClearP2PEPoleDisplay(OrderId);
								var lineItems = ["GIFT CARD", "QTY: 1 	 PRICE: $" + parseFloat(giftvalue).toFixed(2)]
								SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
							}
							$("#custommaskoverlay").hide();
						}, 1000);
					});

					//on click of proceed button
					$(document).on('click', '#sc-proceed', function () {
						nexts=1;
						localStorage.setItem("flowfrom", "proceed");
						localStorage.setItem('ProceedToShipping', 'Y');
						localStorage.setItem("isNewSalesOrder", "N");
						
						//VALLA: Added below code to get the GOP dates of line item.
						var inpPS = "",outPS = "",oBS = "";
						inpPS = SiebelApp.S_App.NewPropertySet();
						outPS = SiebelApp.S_App.NewPropertySet();
						oBS = SiebelApp.S_App.GetService("Workflow Process Manager");
						inpPS.SetProperty("ProcessName", "SC Order Get ATP Scheduled Date From GOP");
						inpPS.SetProperty("Object Id", OrderId);
						outPS = oBS.InvokeMethod("RunProcess", inpPS);
						//VALLA: Added below code to get the OHQ values of line item.
						if(SiebelApp.S_App.GetProfileAttr('CallOHQ')=="Y" && SC_OUI_Methods.SCGetProfileAttrValue("SC Store User")=="Y"){
							var inpPS = "",outPS = "",oBS = "";
							inpPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							oBS = SiebelApp.S_App.GetService("SC Update Order Lines OHQ Details");
							inpPS.SetProperty("OrderId", OrderId);
							inpPS.SetProperty("Type", "NEWITEM");
							outPS = oBS.InvokeMethod("UpdateOHQDetails", inpPS);
							RefreshLineItems();
						}
						//if order details section is open closed it
						if ($('.OrderDetailsclose').hasClass('iconOpen')) {
							$(".OrderDetailsclose").click();
						}
						
						//if line details section is open close it
						if ($('.lineitemsopen').hasClass('iconOpen')) {
							$('.lineitemsopen').click();
						}
						if ($("#Ship-Defalut-RequestShipDate-Val").text() != "select") {
							var Bservice = '',
								inPS = '',
								outPS = '';
							var fieldnames = "Due Date";
							var fieldvalues = "";
							fieldvalues = $("#Ship-Defalut-RequestShipDate-Val").text();
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("BO", "Order Entry (Sales)");
							inPS.SetProperty("BC", "Order Entry - Line Items (Simple)");
							inPS.SetProperty("FieldsArray", fieldnames);
							inPS.SetProperty("ValuesArray", fieldvalues);
							//SBOORLA:Added code for defect 781
							inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Due Date] IS NULL AND [Ship Method]<>'Recd At Store'AND [Fulfillment Status Code]= 'In Progress'");
							Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
							outPS = Bservice.InvokeMethod("Insert", inPS);
							
							//VALLA: Added below code to get the GOP dates of line item.
							var inpPS = "",outPS = "",oBS = "";
							inpPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							oBS = SiebelApp.S_App.GetService("Workflow Process Manager");
							inpPS.SetProperty("ProcessName", "SC Order Get ATP Scheduled Date From GOP");
							inpPS.SetProperty("Object Id", OrderId);
							outPS = oBS.InvokeMethod("RunProcess", inpPS);
						}
						
						
						FieldQueryPair = {
							"SKU #": ""
						};
						SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
						$("#browsecatalogdiv").hide();
						$('.SC-SO-noresults-container').hide();
						$("#sccataloguecategory").hide();
						$("#scproductstable").hide();
						$("#Ship-Option-Markup").show();
						$("#Default-Shipping").show();
						//$("#Shipping-Detils").show();
					});


					$("#SC-select-salesrep").click(function () {
						$("#SC-sales-rep").modal('hide');
						$("#SC-SO-order-complete").modal({
							backdrop: 'static'
						});
						$("#SC-SO-order-complete").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
					});

					//open the BOM Tree
					$(document).on('click', '#SC-product-tree', function () {
						$("#SC-bom-tree").modal({
							backdrop: 'static'
						});

						$(".modal-backdrop").css('background', '#ffffff');

					});
					/*$(document).on('click','.bom-title',function(){
						 var target = $(this).attr("id");
						 if( $(target).is(":visible")){
						   $(target).removeClass('in');
						 }else{
							 $(target).addClass('in'); 
						 }
					});*/

					$(document).on('click', '.bom-title', function () {
						var target = $(this).attr("id");
						var ParentId = "";
						//NGOLLA defect for 633
						ParentId = target.substring(6, target.length);
						if ($("#Body" + ParentId).is(":visible")) {
							$("#Body" + ParentId).hide();
						} else {
							var inPS = "";
							var outPS = "";
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							var fieldnames = "Id,Root Order Item Id,Part Number,Parent Order Item Id,SC Long Description";
							var fieldvalues = "";

							inPS.SetProperty("BO", "Order Entry (Sales)");
							inPS.SetProperty("BC", "Order Entry - Line Items (Simple)");
							inPS.SetProperty("FieldsArray", fieldnames);
							inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Parent Order Item Id]='" + ParentId + "'");
							Bservice = SiebelApp.S_App.GetService("SC Custom Query"); //get service
							outPS = Bservice.InvokeMethod("Query", inPS);
							SiebelJS.Log("outPS" + OutPS);
							var outputRecordSet = "";
							outputRecordSet = outPS.GetChild(0).GetProperty("OutputRecordSet");
							var parentmarkup = "";
							parentmarkup += '                <div class="SC-SO-panel-body no-left-padding background-bg collapse clearfix" id="Body' + ParentId + '">';
							parentmarkup += '                      <div class="row no-margin scroll-x">';
							parentmarkup += '                         <div class="sc-product-tree-structure padding-left">';
							parentmarkup += '                                <div class="branch no-margin lv1">';
							if (outputRecordSet != "}") {
								var childsdataArray = new Array;
								childsdataArray = outputRecordSet.split(";");
								for (var childpr = 0; childpr < childsdataArray.length; childpr++) {
									var childData = '';
									var str = childsdataArray[childpr];
									var found = false;
									str = str.replace(/(".*?")(?!\})/g, function (match) {
										if (found && match.endsWith('"')) return match.substring(0, match.length - 1) + '\\"';
										found = found || match === '"SC Long Description"';

										return match;
									});

									//var obj = JSON.parse(str);
									str = str.replace(/\n/g, "");
									childData = JSON.parse(str);
									// childData = JSON.parse(childsdataArray[childpr]);
									if (childsdataArray.length === 1) {
										parentmarkup += '                                  <div class="entry first" id="BOM' + childData["Id"] + '"><span class="label" title="' + childData["SC Long Description"] + '-' + childData["Part Number"] + '"><span class="glyphicon glyphicon-plus-sign icon-img add-item child' + childpr + '"></span><p>' + childData["SC Long Description"] + '-' + childData["Part Number"] + ' </p></span>';
									} else {
										parentmarkup += '                                  <div class="entry first" id="BOM' + childData["Id"] + '"><span class="label" title="' + childData["SC Long Description"] + '-' + childData["Part Number"] + '"><span class="glyphicon glyphicon-plus-sign icon-img add-item child' + childpr + '"></span><p>' + childData["SC Long Description"] + '-' + childData["Part Number"] + ' </p></span>';
									}

									parentmarkup += '                                </div>';
								}
								parentmarkup += '                      </div>';
								parentmarkup += '                 </div>';
								parentmarkup += '            </div>';
								parentmarkup += '           </div>';
								$("#" + target).parent().append(parentmarkup);
								$("#Body" + ParentId).show();
							} else {
								/* parentmarkup += '                <div class="SC-SO-panel-body no-left-padding background-bg collapse clearfix" id="Body'+ParentId[1]+'">';
                       parentmarkup += '           </div>';*/
								$("#" + target).parent().append(parentmarkup);
								$("#Body" + ParentId).show();
							}
						}

					});
					//On Click of Plus Sign to display the child records for the order line items.
					$(document).on("click", ".glyphicon-plus-sign", function (e) {
						if ($(this).attr("Id") != "referredaddicon") {
							var id = $(this).parent().parent().attr('id');
							var inPS = "";
							var outPS = "";
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							var fieldnames = "Id,Root Order Item Id,Part Number,Parent Order Item Id,SC Long Description";
							var fieldvalues = "";
							var ParentId = "";
							ParentId = id.substring(3, id.length);
							inPS.SetProperty("BO", "Order Entry (Sales)");
							inPS.SetProperty("BC", "Order Entry - Line Items (Simple)");
							inPS.SetProperty("FieldsArray", fieldnames);
							inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + OrderId + "' AND [Parent Order Item Id]='" + ParentId + "'");
							Bservice = SiebelApp.S_App.GetService("SC Custom Query"); //get service
							outPS = Bservice.InvokeMethod("Query", inPS);
							SiebelJS.Log("outPS" + OutPS);
							var outputRecordSet = "";
							outputRecordSet = outPS.GetChild(0).GetProperty("OutputRecordSet");
							if (outputRecordSet != "}") {
								var childsdataArray = new Array;
								childsdataArray = outputRecordSet.split(";");
								var childmarkup = "";
								childmarkup += '                                   <div class="branch lv2" >';
								for (var childf = 0; childf < childsdataArray.length; childf++) {
									var childData = '';
									var str = childsdataArray[childf];

									var found = false;
									str = str.replace(/(".*?")(?!\})/g, function (match) {
										if (found && match.endsWith('"')) return match.substring(0, match.length - 1) + '\\"';
										found = found || match === '"SC Long Description"';

										return match;
									});

									//var obj = JSON.parse(str);
									str = str.replace(/\n/g, "");
									childData = JSON.parse(str);
									if (childsdataArray.length === 1) {
										childmarkup += '                                              <div class="entry first-child" id="BOM' + childData["Id"] + '" title="' + childData["SC Long Description"] + '-' + childData["Part Number"] + '"><span class="label"><span class="glyphicon glyphicon-plus-sign icon-img add-item child"></span><p>' + childData["SC Long Description"] + '-' + childData["Part Number"] + '</p></span></div>';
									} else {
										childmarkup += '                                              <div class="entry" id="BOM' + childData["Id"] + '" title="' + childData["SC Long Description"] + '-' + childData["Part Number"] + '"><span class="label"><span class="glyphicon glyphicon-plus-sign icon-img add-item child"></span><p>' + childData["SC Long Description"] + '-' + childData["Part Number"] + '</p></span></div>';

									}
								}
								childmarkup += '                                     </div>';
								$("#" + id).append(childmarkup);
								$(this).removeClass("glyphicon-plus-sign");
								$(this).addClass("glyphicon-minus-sign");
							} else {
								$(this).removeClass("glyphicon-plus-sign");
							}
						}
					});

					//Start--hide child Nodes
					$(document).on("click", ".glyphicon-minus-sign", function (e) {
						if ($(this).attr("Id") != "referredremoveicon") {
							$(this).parent().siblings().remove();
							$(this).removeClass("glyphicon-minus-sign");
							$(this).addClass("glyphicon-plus-sign");
						}

					}); //End--hide child Nodes


					$(document).on("click", "#sc-line-cp-cancel", function (e) {
						$('#custommaskoverlay').show();
						setTimeout(function () {
							$("#SC-SO-Coupon-lineitem-popup").modal('hide');
							$("#SC-SO-Coupon-lineitem-popup").css({
								"display": "",
								"justify-content": "",
								"align-items": ""
							});
							var lineItemsPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM();
							lineItemsPM.ExecuteMethod("InvokeMethod", "DeleteCoupon", null, false);
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().SetFieldValue("Prod Prom Name","");
							//SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].InvokeMethod("WriteRecord");	
							RefreshLineItems();
							$('#custommaskoverlay').hide();
						}, 500);
					});
					$(document).on("click", "#sc-line-cp-apply", function (e) {
						$('#custommaskoverlay').show();
						var couponCode = document.getElementById("SC-line-Coupon-value").value;
						var orderItemsBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp();
						var couponId = orderItemsBC.GetFieldValue("Prod Prom Id");
						var lineId = orderItemsBC.GetFieldValue("Id");
						var Bservice = '',
							inPS = '',
							outPS = '';
						inPS = SiebelApp.S_App.NewPropertySet();
						outPS = SiebelApp.S_App.NewPropertySet();
						inPS.SetProperty("CouponId", couponId);
						inPS.SetProperty("CouponCode", couponCode);
						Bservice = SiebelApp.S_App.GetService("SC Order Coupons Validation Check");
						outPS = Bservice.InvokeMethod("CouponValidation", inPS);
						var codeReq = outPS.GetChild(0).GetProperty("CodeRequired");
						var errMsg = outPS.GetChild(0).GetProperty("ErrMsg");
						setTimeout(function () {
							$('#custommaskoverlay').show();
							if (codeReq == "N") {
								orderItemsBC.SetFieldValue("SC Coupon Code", couponCode);
								var lineItemsPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM();
								lineItemsPM.ExecuteMethod("InvokeMethod", "SetCouponCodeReq", null, false);
								orderItemsBC.InvokeMethod("WriteRecord");
								$("#SC-SO-Coupon-lineitem-popup").modal('hide');
								$("#SC-SO-Coupon-lineitem-popup").css({
									"display": "",
									"justify-content": "",
									"align-items": ""
								});
								document.getElementById("SC-line-Coupon-value").value = "";
								RefreshLineItems();
								    //VAMSI:19-MAR-19::Added code for Production NFL Coupon Issue.
									if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
										FieldQueryPair = {
											"SKU #": "Id='" + LineId + "'"
										};
										SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
										var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
										Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
										ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
										SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
										poleDisplay(ProductDesc, Quantitys, NRCSubtotal);
									}
									if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
										FieldQueryPair = {
											"SKU #": "Id='" + LineId + "'"
										};
										SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
										var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
										Quantitys = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Quantity Requested");
										ProductDesc = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("SC Calc Long Description");
										OrderId = localStorage.getItem('OrderId');
										//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
										var lineItems = [ProductDesc, "QTY: " + Quantitys + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
										//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
										SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
									}
							} else {
								alert(errMsg);
							}
							$('#custommaskoverlay').hide();
						}, 500);
					});

					$(document).on("click", ".SC-Discount-button", function (e) {
						var id = $(this).attr("Id");
						var idnum = [];
						idnum = id.split('_');
						LineItemId = idnum[1];
						$('.sc-product-coupon-value').attr('id', "scproductcouponvalue_" + idnum[1]);
						$('.scprodcoupon').attr('id', "Productcouponcheck_" + idnum[1]);
						$('.scprodcouponlabel').attr('for', "Productcouponcheck_" + idnum[1]);

						if ($("#ProductCoupon_" + idnum[1]).text() != "no coupons applied") {
							$("#scproductcouponvalue_" + idnum[1]).text($("#ProductCoupon_" + idnum[1]).text());
							$('#Productcouponcheck_' + idnum[1]).prop('checked', true);
							$("#scproductcouponvalue_" + idnum[1]).show();
						} else {
							$("#scproductcouponvalue_" + idnum[1]).text("");
							$('#Productcouponcheck_' + idnum[1]).prop('checked', false);
							$("#scproductcouponvalue_" + idnum[1]).hide();
						}
						$('.sc-manual-coupon-value').attr('id', "scmanualordervalue_" + idnum[1]);
						$('.scmanualdiscount').attr('id', "manualcouponcheck_" + idnum[1]);
						$('.scmanualdiscountlabel').attr('for', "manualcouponcheck_" + idnum[1]);
						$('.Applydisc').attr('id', $("#Applybutton_" + idnum[1]).text());
						$('.CancelDisc').attr('id', "CancelDisc_" + idnum[1]);
						$('.manualblock').attr('id', "manualblock_" + idnum[1]);
						$('.ManualDiscountRea').attr('id', "ManualDiscountRea_" + idnum[1]);
						$('.ManualDiscountper').attr('id', "ManualDiscountper_" + idnum[1]);
						$('.ManualDiscountamt').attr('id', "ManualDiscountamt_" + idnum[1]);
						var manualreason = $("#scmanualcouponval_" + idnum[1]).text();
						var manualreasonname = [];
						manualreasonname = manualreason.split('-');
						if ($("#scmanualcouponval_" + idnum[1]).text() != "no coupons applied") {
							$('#manualcouponcheck_' + idnum[1]).prop('checked', true);
							$("#manualblock_" + idnum[1]).show();
							$("#CancelDisc_" + idnum[1]).hide();
							$("#scmanualordervalue_" + idnum[1]).text($("#scmanualcouponval_" + idnum[1]).text());
							$("#scmanualordervalue_" + idnum[1]).show();
							$("#ManualDiscountRea_" + idnum[1]).text(manualreasonname[1]);
							$("#ManualDiscountRea_" + idnum[1]).show();
							$("#ManualDiscountper_" + idnum[1]).text($("#scmanualdiscountper_" + idnum[1]).text());
							$("#ManualDiscountamt_" + idnum[1]).val($("#scmanualdiscountamount_" + idnum[1]).text());
						} else {
							$("#scmanualordervalue_" + idnum[1]).text("");
							$("#scmanualordervalue_" + idnum[1]).hide();
							$('#manualcouponcheck_' + idnum[1]).prop('checked', false);
							$("#manualblock_" + idnum[1]).hide();
							$("#ManualDiscountRea_" + idnum[1]).text("");
							$("#ManualDiscountper_" + idnum[1]).text("");
							$("#ManualDiscountamt_" + idnum[1]).val("");
						}
						//document.getElementById('schandplantohq').innerHTML=document.getElementById('planthq_'+LineId).innerHTML;
						//document.getElementById('schandstatus').innerHTML=document.getElementById('statushand_'+LineId).innerHTML;
						//discountDetails(idnum[1],Lov_Disc,Lov_Perc);
						$("#SC-Discount-details").modal({
							backdrop: 'static'
						});
						//VALLA:10/28/2022: Added code to disable the Coupon button from the shipping page
						if(document.getElementById("Ship-Option-Markup").style.display=="block")
							$("#Productcouponlabel").addClass("SC-disabled");
						else
							$("#Productcouponlabel").removeClass("SC-disabled");
					});
					if(localStorage.getItem('ComingFromOrder360')=="Y"){
						localStorage.setItem("ComingFromOrder360", "N");
						$(".edit-details").hide();
						if($(".customline").is(":visible"))
							$(".customline").siblings(2).css("cssText", "padding-left: 7% !important;");
						$(".deleteline").hide();
						$(".prodcoupon").hide();
						$(".discount-btn").hide();
						$(".customline").hide();
						$(".displaybed").addClass("SC-readonly");
						$(".quantitybox").addClass("input-readonly");
						$(".amount-width").addClass("input-readonly");
						$(".overflow-title").css("cssText","margin-left:30px !important");
					}

				} //bind events

				SCProductsPR.prototype.EndLife = function () {
					SiebelAppFacade.SCProductsPR.superclass.EndLife.apply(this, arguments);
					localStorage.setItem('comingfrom', "");
					localStorage.setItem('flowfrom', "");
					$(document).unbind();
					if (localStorage.getItem('whitescreen') == 0) {
						$("#_swescrnbar").hide();
						$("#_swethreadbar").hide();
						$("#_sweappmenu").hide();
						$("#s_vctrl_div").hide();
						$(".siebui-button-toolbar").hide();
						$("#_sweview").hide();
						$('#_swecontent').prepend(SC_OUI_Markups.CustomWhiteScreenTimer());
						$("#custommaskoverlay").show();
					} else if (localStorage.getItem('whitescreen') == 1) {
						$("#_swescrnbar").show();
						$("#_swethreadbar").show();
						$("#_sweappmenu").show();
						$("#s_vctrl_div").show();
						$(".siebui-button-toolbar").show();
						$("#_sweview").show();
					}
				}


				//On click of product detailed popup of product
				function productdetails(recordSet) {
					ID = recordSet.split("_");
					ID = ID[1];
					ListPrice = document.getElementById('price_' + ID).innerHTML;
					desc = document.getElementById('long_' + ID).innerHTML;
					SKU = document.getElementById('SKU_' + ID).innerHTML;
					Size = document.getElementById('Size_' + ID).innerHTML;
					markup = "";
					markup += '                        <div class="modal-header">';
					markup += '                            <button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal">Ã—</button>';
					markup += '                            <div class="header-content">';
					markup += '                                <div class="sc-head-title">';
					markup += '                                    <p class="no-margin">SKU#' + SKU + '</p>';
					markup += '                                </div>';
					markup += '                            </div>';
					markup += '                        </div>';
					markup += '                        <div class="modal-body">';
					markup += '                            <div class="SC-SO-product-details-body">';
					markup += '                                <div class="SC-SO-product-info-container">';
					markup += '                                    <div class="SC-SO-product-image">';
					markup += '                                    </div>';
					markup += '                                    <div class="SC-SO-product-details">';
					markup += '                                        <h2>' + desc + '</h2>';
					markup += '                                        <p class="no-margin">list price: <span class="price">' + ListPrice + '</span></p>';
					markup += '                                        <p class="no-margin">dimensions: <span class="size">' + Size + '</span></p>';
					markup += '                                    </div>';
					markup += '                                </div>';
					markup += '                                <div class="SC-SO-product-description">';
					markup += '                                    <p class="no-margin description">Description</p>';
					markup += '                                    <p class="description-content">' + desc + '</p>';
					markup += '                                </div>';
					markup += '                                <div class="SC-single-button-container clearfix less-padding">';
					markup += '                                    <button class="sc-so-cart SC_' + ID + '" id="SC-Add-to-cart">Add to cart</button>';
					markup += '                                </div>';
					markup += '                            </div>';
					markup += '                        </div>';
					$("#scproductdetails").html(markup);
				}

				//to higlight row and show popup that product is added
				function addedToCart(currentId) {
					//if(document.getElementById(currentId.replace("tr","SKU")).innerHTML!="106683"){
					$('#' + currentId).addClass('highlate-row');
					if (document.getElementById(currentId.replace("tr", "cfg")).innerHTML != "Customizable") {
						$("#SC-SO-Add-Product").modal({
							backdrop: 'static'
						});
						//$('#custommaskoverlay').hide();
						//$("body").trigger('Custom.timer.End');
					}

					//$('#'+currentId+" td:first-child").find("img").attr("src", "images/custom/shopping_cart_plus.png");
					$("#SC-SO-Add-Product").css({
						"display": "flex",
						"justify-content": "center",
						"align-items": "center"
					});
					//$('#'+currentId +' td div').addClass('whitebg');
					$(".modal-backdrop").css('background', '#ffffff');
					setTimeout(function () {
						$("#SC-SO-Add-Product").modal('hide');
						//$('#custommaskoverlay').show();
						//$("body").trigger('Custom.timer.Start');
						$('#' + currentId).removeClass('highlate-row');
					}, 2000);
					//}	
				}

				//custom function to add items to cart
				function AddtoCart(OrderId, Quantity, SKU, CFG) {
					localStorage.setItem("addcart", "addcart");
					//$("body").trigger('Custom.Start');
					//$("body").trigger('Custom.timer.Start');
					FieldQueryPair = {
						"SKU #": ""
					};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant, FieldQueryPair, "SC Order Entry Line Item List Applet");
					setTimeout(function () {
						var Rec = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet").length;
						if (Rec == 0) {
							//$("body").trigger('Custom.Start');
							//$("#s_"+appletseqorderentry+"_1_42_0_Ctrl").trigger("click");//hardcoded
							//Start loader 
							//$("body").trigger('Custom.Start');
							//SNARRA:27-09-2018 Added Control for NewRecord
							$("#" + NewControl + "_Ctrl").trigger("click");
							setTimeout(function () {
								$("#1_s_" + appletseqorderentry + "_l_Part_Number").trigger("click");
								$("#1_Part_Number").trigger("click");
								$("#1_s_" + appletseqorderentry + "_l_Part_Number").focus();
								$("#1_s_" + appletseqorderentry + "_l_Part_Number input:text").val(SKU);
								$("#1_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
								$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested").trigger("click");
								$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested").focus();
								$("#1_s_" + appletseqorderentry + "_l_Quantity_Requested input:text").val(Quantity);
								$("#1_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
								$('#_sweview').show();
								//SBOORLA:Added code for defect 656
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								lineRowID = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Id");
								var giftcradPL = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product Line");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
									localStorage.setItem("InvokepoleDisplay", "Y");
									poleDisplay(ProductDesc, Quantity, NRCSubtotal);
								} else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
									localStorage.setItem("InvokepoleDisplay", "Y");
									OrderId = localStorage.getItem('OrderId');
									//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
									var lineItems = [ProductDesc, "QTY: " + Quantity + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
									//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
									SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
								} else {
									localStorage.setItem("InvokepoleDisplay", "N");
								}
								//795 SADDALA
								//if(!($("#s_"+appletseqorderentry+"_1_30_0_Ctrl").attr("disabled")=="disabled")){
								if (!($("#" + CustomsizeControl + "_Ctrl").attr("disabled") == "disabled")) {
									localStorage.setItem("Configfromsales", "Y");
									//$("#s_"+appletseqorderentry+"_1_30_0_Ctrl").trigger('click');
									$("#" + CustomsizeControl + "_Ctrl").trigger('click');
								} else {
									RefreshLineItems();
								}
								//hiding the Loader
								//$("body").trigger('Custom.timer.End');
								$('#custommaskoverlay').hide();
								//SBOORLA:Added code for Gift Card Amount
								if (giftcradPL == "GIFT CARD" && isStoreUser == "Y") {
									$(".SC-SO-input-GC").val("");
									$("#SC-SO-GiftCard").modal({
										backdrop: 'static'
									});
									$("#SC-SO-GiftCard").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
								}
							}, 1500);
						} else if (Rec >= 1) {
							Rec = Rec + 1;
							if (Rec > 10)
								Rec = 10;
							$("#1_s_7_l_Part_Number").trigger("click");
							//$("#s_"+appletseqorderentry+"_1_42_0_Ctrl").trigger("click");
							//SNARRA:27-09-2018 Added Control for NewRecord
							$("#" + NewControl + "_Ctrl").trigger("click");
							setTimeout(function () {
								$("#2_s_" + appletseqorderentry + "_l_Part_Number").trigger("click");
								$("#2_Part_Number").trigger("click");
								$("#2_s_" + appletseqorderentry + "_l_Part_Number").focus();
								$("#2_s_" + appletseqorderentry + "_l_Part_Number input:text").val(SKU);
								$("#2_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
								Rec = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet").length;
								$("#" + Rec + "_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
								$("#" + Rec + "_s_" + appletseqorderentry + "_l_Quantity_Requested").trigger("click");
								$("#" + Rec + "_s_" + appletseqorderentry + "_l_Quantity_Requested").focus();
								$("#" + Rec + "_s_" + appletseqorderentry + "_l_Quantity_Requested input:text").val(Quantity);
								$("#" + Rec + "_s_" + appletseqorderentry + "_l_SC_Product").trigger("click");
								$('#_sweview').show();
								//SBOORLA:Added code for defect 656
								var NRCSubtotal = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("NRC CxTotal in Header Currency");
								lineRowID = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Id");
								var giftcradPL = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp().GetFieldValue("Product Line");
								SiebelJS.Log("NRCSubtotal" + NRCSubtotal);
								// VAMSI:08-OCT-18: Modified the below condtions to Support P2PE pole Display.
								if (poleDisplayFlag == "Y" && sP2PEFlag != "Y") {
									localStorage.setItem("InvokepoleDisplay", "Y");
									poleDisplay(ProductDesc, Quantity, NRCSubtotal);
								} else if (poleDisplayFlag == "Y" && sP2PEFlag == "Y") {
									localStorage.setItem("InvokepoleDisplay", "Y");
									OrderId = localStorage.getItem('OrderId');
									//var lineDetails = SC_OUI_Methods.lineDetailFormat(ProductDesc,Quantitys,NRCSubtotal);
									var lineItems = [ProductDesc, "QTY: " + Quantity + "  " + "PRICE: $" + parseFloat(NRCSubtotal).toFixed(2)]
									//SC_OUI_Methods.P2PEDispalyLineItem(OrderId,lineItems);
									SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId, lineItems);
								} else
									localStorage.setItem("InvokepoleDisplay", "N"); 
								//795 SADDALA
								//if(!($("#s_"+appletseqorderentry+"_1_30_0_Ctrl").attr("disabled")=="disabled")){
								if (!($("#" + CustomsizeControl + "_Ctrl").attr("disabled") == "disabled")) {
									localStorage.setItem("Configfromsales", "Y");
									//$("#s_"+appletseqorderentry+"_1_30_0_Ctrl").trigger('click');
									$("#" + CustomsizeControl + "_Ctrl").trigger('click');
								} else {
									RefreshLineItems();
								}
								//$("body").trigger('Custom.timer.End');
								$('#custommaskoverlay').hide();
								//SBOORLA:Added code for Gift Card Amount
								if (giftcradPL == "GIFT CARD" && isStoreUser == "Y") {
									$(".SC-SO-input-GC").val("");
									$("#SC-SO-GiftCard").modal({
										backdrop: 'static'
									});
									$("#SC-SO-GiftCard").css({
										"display": "flex",
										"justify-content": "center",
										"align-items": "center"
									});
								}
							}, 1500);
						}
					}, 100);
					$("body").unbind('Custom.End');
				}
				//SBOORLA:pole display
				function poleDisplay(ProductDesc, ProQuantity, ProductPrice) {
					var DISA_POLEDISPLAY = "plugin_poledisplay";
					var consts = SiebelJS.Dependency("SiebelApp.Constants");
					consts.set("WS_" + DISA_POLEDISPLAY.toUpperCase() + "_VERSION", "1.0.0");
					var DISAHandler = null;
					callPoleDisplay(ProductDesc, ProQuantity, ProductPrice);

					function callPoleDisplay(ProductDesc, ProQuantity, ProductPrice) {
						console.log("Calling DISA Pole Display PLUGIN with : ");
						var poleHandler = getDISAHandler.call(this);
						// here we create an object containing data which the Java application will read.
						// Neither "Command", nor "GetSysInfo" are DISA specific.
						// The shape and content of the message is entirely up to the developer.
						var msgJSON = {};
						//msgJSON["Command"] = "Ready"; 
						//msgJSON = getLines(OrderId,subTotal);
						msgJSON = {};
						msgJSON = getLinedetails(ProductDesc, ProQuantity, ProductPrice);
						poleHandler.SendMessage(msgJSON);
						// the message is sent asychronously, so once the command is sent, nothing further happens
						// within the PR/PM until a message is received.
					}

					function getDISAHandler() {
						if (DISAHandler === null) {
							(function (proxied) {
								window.alert = function () {
									if (arguments[0].includes("Failed to connect to Desktop Integration Siebel Agent on your machine")) {} else
										return proxied.apply(this, arguments);
								};
							})(window.alert);
							DISAHandler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_POLEDISPLAY);
							// communications with DISA are asynchronous. We define handler functions here to deal with
							// possible responses from DISA, such as a message or communication failure conditions.
							DISAHandler.OnMessage = onWSMessage.bind(this);
							DISAHandler.OnFail = onWSSendFail.bind(this);
							DISAHandler.OnClose = onWSClose.bind(this);
						}
						return DISAHandler;
					}

					function getLinedetails(proDesc, proQuant, proPrice) {
						// Adds other error handling logic 
						var poleInfo = [];
						poleInfo.push({
							"Command": "Ready",
							"ProductDesc": proDesc,
							"Quantity": proQuant,
							"Price": proPrice
						});
						SiebelJS.Log(JSON.stringify(poleInfo));
						var poleData = {};
						poleData["PoleDisplay"] = poleInfo;
						SiebelJS.Log(JSON.stringify(poleData));
						//SiebelApp.S_App.LogOff();
						return poleData;
					}

					function onWSMessage(msg) {
						// this is the result of callDISAPlugin if all goes well
						handleMsg.call(this, msg);
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
					}

					// Called by onWSClose or onWSSendFail event handler
					function handleException(msg) {
						//Add other error handling logic
						console.log("Handle Exception" + msg);
						//alert("Handle Exception" + msg);
					}

				}
				//custom function to show list of products 
				function showProducts(recordSet, len) {
					var markup = '';
					var scsubtype=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Sub-Type");
					if (len == 10)
						len = recordSet.length;
					for (var i = 0; i < len; i++) {
						markup += '                                    <tr id="tr_' + recordSet[i]["Id"] + '">'; //"'+LineId+'"
						markup += '                                        <td class="so-add-to-order-value" style="padding-top: 7px !important; padding-bottom: 5px !important;">';
						markup += '                                            <div class="cart-img">';
						/* markup += '                                                <img src="images/custom/shopping_cart_plus_grey.png" class="so-add-cart" id="' + recordSet[i]["Id"] + '"></div>'; */
						markup+='                                            <button type="button" class="sc-addcart" id="'+recordSet[i]["Id"]+'">Add</button></div>';
						markup += '                                        </td>';
						markup += '                                        <td id=' + "long_" + recordSet[i]["Id"] + '>' + recordSet[i]["Product Long Description"] + '</td>';
						markup += '                                        <td id=' + "Size_" + recordSet[i]["Id"] + '>' + recordSet[i]["SC Size Attrib Val"] + '</td>';
						markup += '                                        <td id=' + "SKU_" + recordSet[i]["Id"] + '>' + recordSet[i]["SKU#"] + '</td>';
						markup += '                                        <td class="so-product-quantity">';
						if ((recordSet[i]["Product Line"] == "MATTRESS" || (recordSet[i]["SKU#"] == "106683")) && (scsubtype!="Wholesale" && scsubtype!="QVC" && scsubtype!="Commercial" && scsubtype!="Internal" && scsubtype!="HSN"))
							markup += '                                        <input type="text" name="" value=1 readonly id=' + "quant_" + recordSet[i]["Id"] + '>';
						else
							markup += '                                        <input type="text" name="" value=1 id=' + "quant_" + recordSet[i]["Id"] + '>';
						markup += '                                        </td>';
						if ((recordSet[i]["List Price"]).includes("."))
							markup += '                                        <td id=' + "price_" + recordSet[i]["Id"] + '>$' + recordSet[i]["List Price"] + '</td>';
						else
							markup += '                                        <td id=' + "price_" + recordSet[i]["Id"] + '>$' + recordSet[i]["List Price"] + '.00</td>';
						if (localStorage.getItem("dupsku") == "N") {
							markup += '                                        <td id=' + "prod_" + recordSet[i]["Id"] + ' style="display:none">' + recordSet[i]["Product Id"] + '</td>';
						}
						markup += '                                        <td id=' + "cfg_" + recordSet[i]["Id"] + ' style="display:none">' + recordSet[i]["Product Def Type Code"] + '</td>';
						markup += '                                    </tr>';
					}
					return markup;
				}
				//end of custom function
				
				//custom function to show list of products for b2b
				function b2b_showProducts(recordSet){
					var markup = '';
					//if(len==10)
					//len=recordSet.length;
					//for(var i = 0; i<len; i++){
						markup+='                                    <tr id="tr_'+recordSet["Id"]+'">';//"'+LineId+'"
						markup+='                                        <td class="so-add-to-order-value" style="padding-top: 7px !important; padding-bottom: 5px !important;">';
						markup+='                                            <div class="cart-img">';
						//markup+='                                                <img src="images/custom/shopping_cart_plus_grey.png" class="so-add-cart" id="'+recordSet["Id"]+'"></div>';
						markup+='													<button type="button" class="sc-addcart" id="'+recordSet["Id"]+'">Add</button></div>';
						markup+='                                        </td>';
						markup+='                                        <td id='+"long_"+recordSet["Id"]+'>'+recordSet["Description"]+'</td>';
						markup+='                                        <td id='+"Size_"+recordSet["Id"]+'>'+" "+'</td>';
						markup+='                                        <td id='+"SKU_"+recordSet["Id"]+'>'+recordSet["Part #"]+'</td>';
						markup+='                                        <td class="so-product-quantity">';
						//if(recordSet["Product Line"]=="MATTRESS"||(recordSet["Part #"]=="106683") )
						//	markup+='                                        <input type="text" name="" value=1 readonly id='+"quant_"+recordSet["Id"]+'>';
						//else
							markup+='                                        <input type="text" name="" value=1 id='+"quant_"+recordSet["Id"]+'>';
						markup+='                                        </td>';
							
						markup+='                                        <td id='+"price_"+recordSet["Id"]+'>$'+0+'.00</td>';
						if(localStorage.getItem("dupsku")=="N"){
							markup+='                                        <td id='+"prod_"+recordSet["Id"]+' style="display:none">'+1234+'</td>';
						}
						markup+='                                        <td id='+"cfg_"+recordSet["Id"]+' style="display:none">'+recordSet["Product Def Type Code"]+'</td>';	
						
						
						markup+='                                    </tr>';     
					 
					return markup;	 
				}
				//end of custom function for b2b

				function hideDuplicates() {
					//Start --Removing duplicate products, that are appending in lst record set
					var seen = {};
					$('#SC-SO-product-list-table tr').each(function () {
						var txt = $(this).text();
						if (seen[txt]) {
							$(this).remove();
							SiebelJS.Log("removed" + txt);
						} else
							seen[txt] = true;
					});
					//End --Removing duplicate products, that are appending in lst record set
				}

				function RefreshLineItems() {
					OrderId = localStorage.getItem('OrderId');
					if (OrderId != null && OrderId != "") {
						InPS.SetProperty("OrderId", OrderId);
						SiebelJS.Log("Invoking Business Service");
						Bservice = SiebelApp.S_App.GetService("SC Get Line Items");
						OutPS = Bservice.InvokeMethod("Query", InPS);
						SiebelJS.Log("exiting Business Service");
						producttree(OutPS);
						//to show refreshed line items
						var Lov1 = SC_OUI_Methods.SCGetOrderLoVs("[Type]= 'SC_MANUAL_DISCOUNT_REASON' and [Active] = 'Y'");
						var Lov2 = SC_OUI_Methods.SCGetOrderLoVs("[Type]= 'DISCNT_PERCENT' and [Active] = 'Y'");
						isStoreUser = SC_OUI_Methods.SCGetProfileAttrValue("SC Store User");
						SC_OUI_Markups.prodmarkup(OutPS, Lov1, Lov2, isStoreUser);
						//to get order total and discounts 
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].InvokeMethod("RefreshBusComp");
						document.getElementById('bottotal').innerHTML = "$" + (parseFloat(Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Order Total")).toFixed(2)) - parseFloat(Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Third Party Tax Amount")).toFixed(2))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						document.getElementById('toptotal').innerHTML = "$" + ((Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Order Total"))) - (Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Third Party Tax Amount")))).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						document.getElementById('topdisc').innerHTML = "$" + Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Current Order Total Item Discount")).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
						document.getElementById('topstart').innerHTML = "$" + Number.parseFloat(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Current Order Total Base Price")).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					}
				}


				//Start-->BOM Tree Markup
				function producttree(outPS) {
					var bomarkup = "";
					bomarkup += '                <div class="SC-SO-main-block">';
					var ChildCount = 0;
					for (var pr = 0; pr < outPS.GetChild(0).GetChildCount(); pr++) {
						RootOrderItemId = outPS.GetChild(0).GetChild(pr).GetProperty("Root Order Item Id");
						bomarkup += '                    <div class="SC-SO-panel container no-padding product-tree">';
						bomarkup += '                        <div class="SC-SO-panel-head head-title bom-title"  id=PARENT' + outPS.GetChild(0).GetChild(pr).GetProperty("Id") + ' >';
						bomarkup += '                           <div class="SC-SO-panel-title">';
						bomarkup += '                             <div class="SC-title-button">';
						bomarkup += '                            <span class="no-margin font-size title-name">' + outPS.GetChild(0).GetChild(pr).GetProperty("SC Calc Long Description") + ' -' + outPS.GetChild(0).GetChild(pr).GetProperty("Part Number") + '</span>';
						bomarkup += '                          </div>';
						bomarkup += '                       </div>';
						bomarkup += '                  </div>';

						bomarkup += '          </div>';
					}
					bomarkup += '           </div>';
					$("#SC-Produc-Tree-Body").html(bomarkup);
				}
				//End--BOM Tree Markup
				
				//Vamsi 10OCT18 Added for P2PE pole display
				function lineDetailFormat(ProductDesc, Quantitys, NRCSubtotal) {
					if (ProductDesc.length >= 18) {
						ProductDesc = ProductDesc.substring(0, 18);
					} else {
						var prefLineLength = 18;
						var diff = prefLineLength - ProductDesc.length;
						for (var i = 0; i < diff; i++) {
							ProductDesc = ProductDesc + ".";
						}
					}
					if (Quantitys.length <= 2) {
						var prefLineLength = 2;
						var diff = prefLineLength - Quantitys.length;
						for (var i = 0; i < diff; i++) {
							Quantitys = " " + Quantitys;
						}
					}
					if (NRCSubtotal.length <= 8) {
						var prefLineLength = 8;
						var diff = prefLineLength - NRCSubtotal.length;
						for (var i = 0; i < diff; i++) {
							NRCSubtotal = " " + NRCSubtotal;
						}
					}
					return ProductDesc + " " + Quantitys + " " + NRCSubtotal;
				}

				return SCProductsPR;
			}());
			return "SiebelAppFacade.SCProductsPR";
		})
}