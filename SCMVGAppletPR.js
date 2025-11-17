/***************************************
Author:: Harish
Created Date:
Modified Date:
Purpose: To customize the Address MVG Applet

***************************************/

if (typeof(SiebelAppFacade.SCMVGAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.SCMVGAppletPR");
    define("siebel/custom/SelectComfort/SCMVGAppletPR", ["siebel/jqgridrenderer"],
        function() {
            SiebelAppFacade.SCMVGAppletPR = (function() {

                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var FieldQueryPair = "";
                var NoOfRecords = "";
                var recordset;
                //SiebelJS.Log("entered into MVG..");

                function SCMVGAppletPR(pm) {
                    SiebelAppFacade.SCMVGAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCMVGAppletPR, SiebelAppFacade.JQGridRenderer);

                SCMVGAppletPR.prototype.Init = function() {
                    //SiebelJS.Log("Shuttle applet init");
                    SiebelAppFacade.SCMVGAppletPR.superclass.Init.apply(this, arguments);
                }

                SCMVGAppletPR.prototype.ShowUI = function() {
                    //SiebelJS.Log("Shuttle applet showui");
                    SiebelAppFacade.SCMVGAppletPR.superclass.ShowUI.apply(this, arguments);
                    var Appletid = this.GetPM().Get("GetFullId");



                    $(".ui-dialog-titlebar").css({
                        "background": "#20558A",
                        "padding": "20px"
                    });
					
										
					$(".ui-dialog-titlebar .ui-dialog-titlebar-close").css({
                        "background": "transparent",
						"color":"#fff",
						"border":"none",
						"font-size":"14px",
						"padding-right":"40px"
                    });
					
					$(".ui-dialog-titlebar .ui-dialog-titlebar-close").text("Close");

                    $(".ui-dialog-titlebar span").css({
                        "color": "#fff",
                        "font-weight": "500",
						"font-size":"20px"
                    });


                    $(document).find(".ui-widget-overlay").css({
                        "background": "#000000",
                        "opacity": "0.8"
                    });

                    $(document).find(".siebui-mvg-btn-modifier").css({
                        "padding-top": "70px",
                        "align-self": "center"
                    });

                    $(document).find("#s_" + Appletid + "_div").css({
                        "display": "flex",
                        "justify-content": "center"
                    });

                    $(".ui-jqgrid-resize").css({
                        "width": "0px"
                    });

                    $("#sieb-ui-popup-mvg-selected").css({
                        "margin-top": "20px"
                    });

                    $(".AppletButtons").css({
                        "background": "transparent",
                        "border-top": "none",
                        "border-bottom": "none"
                    });



                    $(".AppletStylePopup > form").css({
                        "border": "none"
                    })

                    $(".ui-dialog-content").css({
                        "padding": "0px"
                    });

                    $(".ui-dialog-content button").css({
                        "background-color": "#20558a",
                        "border": "1px solid #20558a"
                    });



                    $(".ui-jqgrid .ui-jqgrid-htable thead tr").css({
                        "background": "#BFC3C7"
                    });


                    $(".ui-jqgrid .ui-jqgrid-htable thead tr th div").css({
                        "color": "#4A4A4A",
                        "font-weight": "600",
                        "text-transform": "uppercase",
                        "font-size": "12px"
                    });
                    $(".ui-jqgrid .ui-jqgrid-htable thead tr th span").css({
                        "display": "none"
                    });



                    $(".siebui-popup-title").css({ "padding-top": "10px", "padding-bottom": "10px" });

                    $(".siebui-popup-title span").css({ "color": "#20558A", "padding-left": "10px", "font-size": "18px", "font-weight": "500" });
                    $(".siebui-popup-filter").css({ "padding-left": "7px", "text-align": "left" });
                    $("#sieb-ui-popup-mvg-selected .siebui-popup-filter").css({ "padding-left": "0px", "text-align": "right" });

                    $(".siebui-popup-filter span input").css({ "border-radius": "50px", "border": "1px solid #F0F0F0", "padding-left": "10px" });
					
				
					$(document).on("click",".siebui-icon-newquery",function() {
							$("#sieb-ui-popup-mvg-available").find(".siebui-popup-row-counter").css("display","none");
					});
					
					$(document).on("click",".siebui-icon-undoquery,.siebui-icon-executequery", function() {
						$("#sieb-ui-popup-mvg-available").find(".siebui-popup-row-counter").css("display","inline-block");
					});

                   
					
					$(document).on('click','button[title="Add Address:New"]',function() {
						
						setTimeout(function() {
							$(document).find(".scLabelRight").addClass("siebui-responsive-label-active");
						},1000);
					
					});
					
					$(document).on('focus focusout','.scField',function(){
						$(document).find(".scLabelRight").addClass("siebui-responsive-label-active");
						
					});
					
					$(document).on('keyup','input[placeholder="Street Address"],input[placeholder="Street Address 2"],input[placeholder="City"],input[placeholder="State"],input[placeholder="Postal Code"],input[placeholder="Country"]',function(){
					 if($(this).val() == "") {
					  $(document).find(".scLabelRight").addClass("siebui-responsive-label-active");
					 }
					});
					
					
					
					$(document).on('change','.siebui-ctrl-select,.siebui-ctrl-input',function(){						
						$(this).parent().addClass("siebui-responsive-label-active");
						
					});
					
					//Hiding Calculate HD Price Button
					//$("#s_14_1_306_0_Ctrl").css("display","block");
					$("button[title='Contact Addresses:Calculate HD Price']").css("display","");
					
	
                }

                SCMVGAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.SCMVGAppletPR.superclass.BindData.apply(this, arguments);

                }

                SCMVGAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.SCMVGAppletPR.superclass.BindEvents.apply(this, arguments);
					
					/* //Start: Invoke Calculate HD Price					
						$(document).on('click','button[title="Contact Addresses:Add >"]',function(){							
							
							setTimeout(function(){						
								$('button[title="Contact Addresses:Calculate HD Price"]').trigger('click');
							},200);
							
						});					
					//End: Invoke Calculate HD Price */
					
                }

                SCMVGAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.SCMVGAppletPR.superclass.EndLife.apply(this, arguments);
                }

                return SCMVGAppletPR;
            }());
            return "SiebelAppFacade.SCMVGAppletPR";
        })
}
