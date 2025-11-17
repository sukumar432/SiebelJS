//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=View&name=SCVisibleContactListView&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCVisibleContactListViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCVisibleContactListViewPR");
 define("siebel/custom/SelectComfort/SCVisibleContactListViewPR", ["siebel/viewpr"],
  function () {
   SiebelAppFacade.SCVisibleContactListViewPR = (function () {

    function SCVisibleContactListViewPR(pm) {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCVisibleContactListViewPR, SiebelAppFacade.ViewPR);

    SCVisibleContactListViewPR.prototype.Init = function () {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.Init.apply(this, arguments);
	 $("#_sweview").hide();
    }

    SCVisibleContactListViewPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.ShowUI.apply(this, arguments);
	 $("#_swescrnbar").show();
		$("#_swethreadbar").show();
		$("#_sweappmenu").show();
		$("#s_vctrl_div").show();
		$(".siebui-button-toolbar").show();
		$("#_sweview").show();
    }

    SCVisibleContactListViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.BindData.apply(this, arguments);
    }

    SCVisibleContactListViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.BindEvents.apply(this, arguments);
    }

    SCVisibleContactListViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCVisibleContactListViewPR.superclass.EndLife.apply(this, arguments);
    }

    return SCVisibleContactListViewPR;
   }()
  );
  return "SiebelAppFacade.SCVisibleContactListViewPR";
 })
}
