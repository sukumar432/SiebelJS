//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=AssociateApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.AssociateAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.AssociateAppletPR");
    define("siebel/custom/SelectComfort/AssociateAppletPR", ["siebel/jqgridrenderer"],
        function() {
            SiebelAppFacade.AssociateAppletPR = (function() {

                function AssociateAppletPR(pm) {
                    SiebelAppFacade.AssociateAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(AssociateAppletPR, SiebelAppFacade.JQGridRenderer);

                AssociateAppletPR.prototype.Init = function() {
                    SiebelAppFacade.AssociateAppletPR.superclass.Init.apply(this, arguments);
                }

                AssociateAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.AssociateAppletPR.superclass.ShowUI.apply(this, arguments);
                    SiebelJS.Log("Welcome");
                    var Appletid = this.GetPM().Get("GetFullId");
                    SiebelJS.Log("entered Associate.." + Appletid);
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
                    $(".ui-jqgrid .ui-jqgrid-htable thead tr th:hover").css({ "background": "#BFC3C7" });
                    /*var style = "background-color:#FFB79F !important";

                    $("#sieb-ui-popup-mvg-selected .ui-state-highlight td").attr("style", style);*/

					//$("#s_14_1_306_0_Ctrl").css("display","none");
					
					$("button[title='Contact Addresses:Calculate HD Price']").css("display","none");
					
					

                }

                AssociateAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.AssociateAppletPR.superclass.BindData.apply(this, arguments);
                }

                AssociateAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.AssociateAppletPR.superclass.BindEvents.apply(this, arguments);
                }

                AssociateAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.AssociateAppletPR.superclass.EndLife.apply(this, arguments);
                }

                return AssociateAppletPR;
            }());
            return "SiebelAppFacade.AssociateAppletPR";
        })
}
