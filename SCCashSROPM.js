if (typeof(SiebelAppFacade.SCCashSROPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCashSROPM");
 define("siebel/custom/SCCashSROPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.SCCashSROPM = (function () {
 
    function SCCashSROPM(pm) {
     SiebelAppFacade.SCCashSROPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCCashSROPM, SiebelAppFacade.PresentationModel);

    SCCashSROPM.prototype.Init = function () {
     SiebelAppFacade.SCCashSROPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": SCCashSROPM:      Init method reached.");
	 this.AddProperty( "PaymentMethod", "" );
	 this.AddProperty( "PaymentType", "" );
	 this.AddProperty( "PaymentAmount", "" );
	 this.AddProperty( "SCOrderTotal", "" );
    }

    SCCashSROPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": SCCashSROPM:      Setup method reached.");
     SiebelAppFacade.SCCashSROPM.superclass.Setup.apply(this, arguments);
    }

    return SCCashSROPM;
   }()
  );
  return "SiebelAppFacade.SCCashSROPM";
 })
}