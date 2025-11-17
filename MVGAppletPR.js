if (typeof(SiebelAppFacade.MVGAppletPR) === "undefined") {
    SiebelJS.Namespace("SiebelAppFacade.MVGAppletPR");
    define("siebel/custom/SelectComfort/MVGAppletPR", ["siebel/jqgridrenderer"],
        function() {
            SiebelAppFacade.MVGAppletPR = (function() {

                var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
                var FieldQueryPair = "";
                var NoOfRecords = "";
                var recordset;
                SiebelJS.Log("entered into MVG..");

                function MVGAppletPR(pm) {
                    SiebelAppFacade.MVGAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(MVGAppletPR, SiebelAppFacade.JQGridRenderer);

                MVGAppletPR.prototype.Init = function() {
                    SiebelJS.Log("Shuttle applet init");
                    SiebelAppFacade.MVGAppletPR.superclass.Init.apply(this, arguments);
                }

                MVGAppletPR.prototype.ShowUI = function() {
                    SiebelJS.Log("Shuttle applet showui");
                    SiebelAppFacade.MVGAppletPR.superclass.ShowUI.apply(this, arguments);
                    var Appletid = this.GetPM().Get("GetFullId");



                    $(".ui-dialog-titlebar").css({
                        "background": "#20558A",
                        "padding": "20px"
                    });
					
					/* $(".ui-dialog-title").css({
                       "font-size": "20px";
                    }); */
					
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

                    /*var available = "background-color:#FF6633 !important;color:#fff !important";
					var availableBlack = "background-color:#fff !important;color:#000 !important";
                    setTimeout(function() {
                        $("#sieb-ui-popup-mvg-available tr.ui-state-highlight td:not(:first-child)").attr("style", available);
                    }, 100);
					
					$(document).on('click','#sieb-ui-popup-mvg-available tr', function() {
						$("#sieb-ui-popup-mvg-available tr.ui-state-highlight td:not(:first-child)").attr("style", availableBlack);
						$(this).find("td:not(:first-child)").attr("style", available);
						
					});*/
				//Start: To keep the Label text display
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
				//End: To keep the Label text display
				
					//$("#s_14_1_306_0_Ctrl").css("display","none");
					$("button[title='Contact Addresses:Calculate HD Price']").css("display","none");
					
	
                }

                MVGAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.MVGAppletPR.superclass.BindData.apply(this, arguments);

                }

                MVGAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.MVGAppletPR.superclass.BindEvents.apply(this, arguments);
					
					//Start: Invoke Calculate HD Price					
						$(document).on('click','button[title="Contact Addresses:Add >"]',function(){							
							
							setTimeout(function(){						
								$('button[title="Contact Addresses:Calculate HD Price"]').trigger('click');
							},200);
						});					
					//End: Invoke Calculate HD Price
					
                }

                MVGAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.MVGAppletPR.superclass.EndLife.apply(this, arguments);
                }

                return MVGAppletPR;
            }());
            return "SiebelAppFacade.MVGAppletPR";
        })
}
