//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=View&name=SCContactListExportView&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCContactListExportViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCContactListExportViewPR");
 define("siebel/custom/SelectComfort/SCContactListExportViewPR", ["siebel/viewpr"],
  function () {
   SiebelAppFacade.SCContactListExportViewPR = (function () {

    function SCContactListExportViewPR(pm) {
     SiebelAppFacade.SCContactListExportViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCContactListExportViewPR, SiebelAppFacade.ViewPR);

    SCContactListExportViewPR.prototype.Init = function () {
     SiebelAppFacade.SCContactListExportViewPR.superclass.Init.apply(this, arguments);
	 $("#_sweview").hide();
    }

    SCContactListExportViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCContactListExportViewPR.superclass.ShowUI.apply(this, arguments);
	 $("#_swescrnbar").show();
		$("#_swethreadbar").show();
		$("#_sweappmenu").show();
		$("#s_vctrl_div").show();
		$(".siebui-button-toolbar").show();
		$("#_sweview").show();
    }

    SCContactListExportViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCContactListExportViewPR.superclass.BindData.apply(this, arguments);
    }

    SCContactListExportViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCContactListExportViewPR.superclass.BindEvents.apply(this, arguments);
    }

    SCContactListExportViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCContactListExportViewPR.superclass.EndLife.apply(this, arguments);
    }

    return SCContactListExportViewPR;
   }()
  );
  return "SiebelAppFacade.SCContactListExportViewPR";
 })
}
