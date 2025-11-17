if (typeof(SiebelAppFacade.SCServiceRequestFormAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCServiceRequestFormAppletPR");
 define("siebel/custom/SCServiceRequestFormAppletPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.SCServiceRequestFormAppletPR = (function () {

    function SCServiceRequestFormAppletPR(pm) {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCServiceRequestFormAppletPR, SiebelAppFacade.PhysicalRenderer);

    SCServiceRequestFormAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.Init.apply(this, arguments);
	 $('#_sweview').show();
    }

    SCServiceRequestFormAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.ShowUI.apply(this, arguments);
    }

    SCServiceRequestFormAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.BindData.apply(this, arguments);
    }

    SCServiceRequestFormAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    SCServiceRequestFormAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCServiceRequestFormAppletPR.superclass.EndLife.apply(this, arguments);
    }

    return SCServiceRequestFormAppletPR;
   }()
  );
  return "SiebelAppFacade.SCServiceRequestFormAppletPR";
 })
}
