//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=View&name=SCManagersContactListExportView&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCManagersContactListExportViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCManagersContactListExportViewPR");
 define("siebel/custom/SelectComfort/SCManagersContactListExportViewPR", ["siebel/viewpr"],
  function () {
   SiebelAppFacade.SCManagersContactListExportViewPR = (function () {

    function SCManagersContactListExportViewPR(pm) {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCManagersContactListExportViewPR, SiebelAppFacade.ViewPR);

    SCManagersContactListExportViewPR.prototype.Init = function () {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.Init.apply(this, arguments);
	 $("#_sweview").hide();
    }

    SCManagersContactListExportViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.ShowUI.apply(this, arguments);
	 $("#_swescrnbar").show();
		$("#_swethreadbar").show();
		$("#_sweappmenu").show();
		$("#s_vctrl_div").show();
		$(".siebui-button-toolbar").show();
		$("#_sweview").show();
    }

    SCManagersContactListExportViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.BindData.apply(this, arguments);
    }

    SCManagersContactListExportViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.BindEvents.apply(this, arguments);
    }

    SCManagersContactListExportViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCManagersContactListExportViewPR.superclass.EndLife.apply(this, arguments);
    }

    return SCManagersContactListExportViewPR;
   }()
  );
  return "SiebelAppFacade.SCManagersContactListExportViewPR";
 })
}
