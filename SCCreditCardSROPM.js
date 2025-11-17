if (typeof(SiebelAppFacade.SCCreditCardSROPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCreditCardSROPM");
 define("siebel/custom/SCCreditCardSROPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.SCCreditCardSROPM = (function () {

    function SCCreditCardSROPM(pm) {
     SiebelAppFacade.SCCreditCardSROPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCCreditCardSROPM, SiebelAppFacade.PresentationModel);

    SCCreditCardSROPM.prototype.Init = function () {
     SiebelAppFacade.SCCreditCardSROPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": SCCreditCardSROPM:      Init method reached.");
	 var pm = this;
	 this.AddProperty( "CreditCardType", "" );
	 this.AddProperty( "CalcGiftCardNumber", "" ); 
	 this.AddProperty( "PaymentAmount", "" );
	 this.AddProperty( "GetGCBalanceFlag", "N" );		
	 this.AddProperty( "CalcCreditCardNumber", "" ); 
	 this.AddProperty( "CalcCVVNumber", "" );
	 this.AddProperty( "CalcExpMonth", "" );
	 this.AddProperty( "CalcExpYear", "" );
	 this.AddProperty( "PaymentsRowID", "" );					
	 this.AddProperty( "AccountNumber", "" );
	 this.AddProperty( "PaymentStatus", "" );
	 this.AddProperty( "AuthorizationCode", "" );
	 this.AddProperty( "SCOrderTotal", "" );
	 this.AddProperty( "PaymentMethod", "" );
	 this.AddProperty( "GiftCardBalance", "" );
	 this.AddProperty("MakeAuthCodeReadOnly","");
	 this.AddProperty("GlobalToken","");
	 this.AddProperty("CustomerName","");
	 this.AddProperty("CustomerReference","");
	 this.AddProperty("StreetAddress","");
	 this.AddProperty("ZipCode","");
	 this.AddProperty("TerminalID","");
	 this.AddProperty("AccessToken","");
	 this.AddProperty("TrackInformation","");
	 this.AddProperty("TokenSerialNumber","");
	 this.AddProperty("FunctionCode","");
	 
	 //Store User Credit Card 
		this.AttachEventHandler("SU_GetToken",
			function() {
				// perform PM processing of button
				console.log("Inside Store user AuthorizeButtonClickinPM");
				if(!this.Get("AccountNumber"))
				{   
					this.ExecuteMethod("SU_GET_GlobalToken");
				}
				else if(this.Get("PaymentStatus") != "Need Verbal Authorization"){						
					console.log("CC Authorize w/ previous token." + this.Get("AccountNumber"));
					this.ExecuteMethod("AUTHORIZE_PAYMENT_LINE", {i4go_uniqueid: this.Get("AccountNumber")});							
				}
			}
		);
		
		// Added to authorize payment line of payment type CreditCard
		this.AttachEventHandler("SU_AUTHORIZE_PAYMENT_LINE",
			function(data) {
				//define a new propertyset and set appropriate input arguments
			    if(this.Get("GlobalToken") != "" || this.Get("FunctionCode") != ""){
					var inPS = SiebelApp.S_App.NewPropertySet();
					var outPS = SiebelApp.S_App.NewPropertySet();
					var service = SiebelApp.S_App.GetService("SC SU Shift4 Payment Auth Service");
					if( service ){
						inPS.SetProperty("i4go_Token",pm.Get("GlobalToken"));
						inPS.SetProperty("Access_Token",pm.Get("AccessToken"));
						inPS.SetProperty("Function_Code",pm.Get("FunctionCode"));
						inPS.SetProperty("Row Id",this.Get("PaymentsRowID"));
						service.InvokeMethod("AuthorizePayment", inPS, outPS);	            
					}	
				}else{
					alert("Failed to get Global Token. Please enter details again");
				}
			}, //end of function AUTHORIZE_PAYMENT_LINE
			{scope: this}
		);
		
		//Added to get Global Token
		this.AddMethod("SU_GET_GlobalToken",
			function(data) {
				var psInput = SiebelApp.S_App.NewPropertySet();
				var psOutput = SiebelApp.S_App.NewPropertySet();
				var service = SiebelApp.S_App.GetService("Workflow Process Manager");
				if( service ){
					psInput.SetProperty("ProcessName","SC Payment Retail GetToken");
					psInput.SetProperty("CustomerName",pm.Get("CustomerName"));
					psInput.SetProperty("StreetAddress",pm.Get("StreetAddress"));
					psInput.SetProperty("ZipCode",pm.Get("ZipCode"));
					psInput.SetProperty("AccessToken",pm.Get("AccessToken"));
					psInput.SetProperty("TokenSerialNumber",pm.Get("TokenSerialNumber"));
					psInput.SetProperty("TrackInformation",pm.Get("TrackInformation"));
					psInput.SetProperty("TerminalID",pm.Get("TerminalID"));
					psOutput = service.InvokeMethod("RunProcess", psInput);
					var gToken = psOutput.GetChild(0).GetProperty("UniqueID");
					pm.SetProperty("GlobalToken",gToken);
					if(gToken!==undefined||gToken!==null||gToken!==""){
						$('[name="'+pm.Get('GetControls')['Payment Type'].GetInputName()+'"]').focus();
					}else{
						$('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
					}
				}
			}, //end of function AUTHORIZE_PAYMENT_LINE
			{scope: this}
		);
	 
    }

    SCCreditCardSROPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": SCCreditCardSROPM:      Setup method reached.");
     SiebelAppFacade.SCCreditCardSROPM.superclass.Setup.apply(this, arguments);
    }

    return SCCreditCardSROPM;
   }()
  );
  return "SiebelAppFacade.SCCreditCardSROPM";
 })
}
