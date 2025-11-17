//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopList&name=AddCtrol&userprops=&comments=Yes&logging=No
if (typeof(SiebelAppFacade.AddCtrolPR) === "undefined") {

  SiebelJS.Namespace("SiebelAppFacade.AddCtrolPR");
  define("siebel/custom/AddCtrolPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.AddCtrolPR = (function () {
  
    function AddCtrolPR(pm) {
     SiebelAppFacade.AddCtrolPR.superclass.constructor.apply(this, arguments);
    }
  
    SiebelJS.Extend(AddCtrolPR, SiebelAppFacade.JQGridRenderer);
  
    AddCtrolPR.prototype.Init = function () {
     // Init is called each time the object is initialised.
     // Add code here that should happen before default processing
     SiebelAppFacade.AddCtrolPR.superclass.Init.apply(this, arguments);
     // Add code here that should happen after default processing
    }
  
    AddCtrolPR.prototype.ShowUI = function () {
     // ShowUI is called when the object is initially laid out.
     // Add code here that should happen before default processing
     SiebelAppFacade.AddCtrolPR.superclass.ShowUI.apply(this, arguments);
     // Add code here that should happen after default processing
  
  var appletId = this.GetPM().Get("GetPlaceholder");
    SiebelJS.Log("ShowUI appletId:"+appletId);
  
    $("#pager_"+appletId+"_center tr").prepend(" ");
  
  
  }
  
    AddCtrolPR.prototype.BindData = function (bRefresh) {
     // BindData is called each time the data set changes.
     // This is where you'll bind that data to user interface elements you might have created in ShowUI
     // Add code here that should happen before default processing
     

     SiebelAppFacade.AddCtrolPR.superclass.BindData.apply(this, arguments);
     // Add code here that should happen after default processing
  
    }
  
    AddCtrolPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.AddCtrolPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing

     $('[id^="next_pager_s_"]').removeClass('ui-state-disabled');
     $('[id^="last_pager_s_"]').removeClass('ui-state-disabled');
     $('[id^="first_pager_s"]').removeClass('ui-state-disabled');
     $('[id^="prev_pager_s_"]').removeClass('ui-state-disabled');
     $('[id^="next_pager_s_"]').attr('id', '');
     $('[id^="last_pager_s_"]').attr('id', '');
     $('[id^="first_pager_s"]').attr('id', '');
     $('[id^="prev_pager_s_"]').attr('id', '');
     var pm = this.GetPM();
     var placeHolder = "s_" + pm.Get("GetFullId") + "_div";
     var that = this;
     var appletFullId = this.GetPM().Get("GetFullId");
     //var pm = this.GetPM();
     var appletPlaceHolder = $("#s_" + appletFullId + "_div"); // example: "s_S_A5" 
 
 
 
     $('[title="Next record Set"]').on("click", function (e) {
 
      if (pm!= undefined &&  pm!= "") {
        if(pm.ExecuteMethod("CanInvokeMethod", "GotoNext"))
            pm.ExecuteMethod("InvokeMethod", "GotoNext");
      }
      e.stopImmediatePropagation();
 
 
     });
     $('[title="Previous record Set"]').on("click", function (e) {
 
      if (pm!= undefined && pm!= "") {
        if(pm.ExecuteMethod("CanInvokeMethod", "GotoPrevious"))
       pm.ExecuteMethod("InvokeMethod", "GotoPrevious");
      }
      e.stopImmediatePropagation();
 
 
     });
 
 
     $('[title="First record set"]').on("click", function (e) {
 
      if (pm!= undefined && pm!= "" ) {
        if(pm.ExecuteMethod("CanInvokeMethod", "GotoPreviousSet"))
            pm.ExecuteMethod("InvokeMethod", "GotoPreviousSet");
      }
      e.stopImmediatePropagation();
 
     });
 
     $('[title="Last record set"]').on("click", function (e) {
 
      if (pm!= undefined && pm!= "") {
        if(pm.ExecuteMethod("CanInvokeMethod", "GotoNextSet"))
       pm.ExecuteMethod("InvokeMethod", "GotoNextSet");
      }
      e.stopImmediatePropagation();
 
     });

    }
  
    AddCtrolPR.prototype.EndLife = function () {
     // EndLife is where we perform any required cleanup.
     // Add code here that should happen before default processing
     SiebelAppFacade.AddCtrolPR.superclass.EndLife.apply(this, arguments);
     // Add code here that should happen after default processing
    }
  
    return AddCtrolPR;
   }()
  );
  return "SiebelAppFacade.AddCtrolPR";
  })
  }