//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=View&name=SNHomePageView&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.SNHomePageViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SNHomePageViewPR");
 define("siebel/custom/SNHomePageViewPR", ["siebel/viewpr"],
  function () {
   SiebelAppFacade.SNHomePageViewPR = (function () {

    function SNHomePageViewPR(pm) {
     SiebelAppFacade.SNHomePageViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SNHomePageViewPR, SiebelAppFacade.ViewPR);

    SNHomePageViewPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.SNHomePageViewPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    SNHomePageViewPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.SNHomePageViewPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
	 $(document).ready(function() {
    $('[class="siebui-salutation-title"]').html("My Homepage");
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
	var firstname = SiebelApp.S_App.GetUserName(); 
	newdate = "Welcome Back Family " + firstname +". Today is " + n +", "+ month + " " + day +", " + year+".";
	$('[class="siebui-salutation-applet-title"]').replaceWith("<div class='Welcome'›</div>");
	$('[class="Welcome"]').text (newdate);
	$('[class="Welcome"]').css('font-weight','bold');
	});
    }

    SNHomePageViewPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     SiebelAppFacade.SNHomePageViewPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    SNHomePageViewPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.SNHomePageViewPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    SNHomePageViewPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.SNHomePageViewPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }

    return SNHomePageViewPR;
   }()
  );
  return "SiebelAppFacade.SNHomePageViewPR";
 })
}
