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
  
  var pm = this.GetPM();
  
  var appletId = pm.Get("GetFullId");
  var placeholder = pm.Get("GetPlaceholder");
  var that=this;
  
  SiebelJS.Log("placeholder:"+placeholder);
  
 $(document)
  .on("click",$("#pager_"+placeholder)
  .find(".ui-icon-seek-next"), function() {
  //pm.ExecuteMethod("InvokeMethod", "GotoFirstSet");
  //pm.ExecuteMethod("InvokeMethod", "GotoPreviousSet");
  if (pm.ExecuteMethod("CanInvokeMethod", "GotoNext")) {
    pm.ExecuteMethod("InvokeMethod", "GotoNext");
  }
  
  })
  .end();

  if (pm.ExecuteMethod("CanInvokeMethod", "GotoNext")) {
    $("#next_pager02_"+placeholder).removeClass("ui-state-disabled");
}
else {
    $("#next_pager02_"+placeholder).addClass("ui-state-disabled");
}
    }
  
    AddCtrolPR.prototype.BindEvents = function () {
     // BindEvents is where we add UI event processing.
     // Add code here that should happen before default processing
     SiebelAppFacade.AddCtrolPR.superclass.BindEvents.apply(this, arguments);
     // Add code here that should happen after default processing
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