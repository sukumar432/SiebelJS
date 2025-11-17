/***************************************
Author:: Harish
Created Date:
Modified Date:
Purpose: To customize the Address Associate Applet

***************************************/


if (typeof(SiebelAppFacade.SCAssociateAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCAssociateAppletPR");
    define("siebel/custom/SelectComfort/SCAssociateAppletPR", ["siebel/jqgridrenderer"],
        function() {
            SiebelAppFacade.SCAssociateAppletPR = (function() {

                function SCAssociateAppletPR(pm) {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.constructor.apply(this, arguments);
                }

                SiebelJS.Extend(SCAssociateAppletPR, SiebelAppFacade.JQGridRenderer);

                SCAssociateAppletPR.prototype.Init = function() {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.Init.apply(this, arguments);
                }

                SCAssociateAppletPR.prototype.ShowUI = function() {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.ShowUI.apply(this, arguments);
                    //SiebelJS.Log("Welcome");
                    var Appletid = this.GetPM().Get("GetFullId");
                    //SiebelJS.Log("entered Associate.." + Appletid);
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
                   $("button[title='Contact Addresses:Calculate HD Price']").css("display","none");
					
					

                }

                SCAssociateAppletPR.prototype.BindData = function(bRefresh) {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.BindData.apply(this, arguments);
                }

                SCAssociateAppletPR.prototype.BindEvents = function() {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.BindEvents.apply(this, arguments);
                }

                SCAssociateAppletPR.prototype.EndLife = function() {
                    SiebelAppFacade.SCAssociateAppletPR.superclass.EndLife.apply(this, arguments);
                }

                return SCAssociateAppletPR;
            }());
            return "SiebelAppFacade.SCAssociateAppletPR";
        })
}
