// globally rename PaymentDetailPR to the name you desire for your custom class.
// Save the file in siebel/custom/ using the same case for the file name as the class name.
function validateInputCC(thisPM){
	var retVal = true;
	var errorMessage = "Following Fields are required:\n\n";
	var errorCount = 0;
	
	if(!thisPM.Get("CreditCardType")){
			errorCount++;
			errorMessage += errorCount + ". Payment Type\n"
			retVal = false;
		}
		if (!thisPM.Get("AccountNumber")) {
			if(!thisPM.Get("CalcCreditCardNumber")){
				errorCount++;
				errorMessage += errorCount + ". Credit Card #\n"
				retVal = false;
			}

			if(!thisPM.Get("CalcCVVNumber")){
				errorCount++;
				errorMessage += errorCount + ". CVV Number\n"
				retVal = false;
			}

			if(!thisPM.Get("CalcExpMonth")){
				errorCount++;
				errorMessage += errorCount + ". Expiration Month\n"
				retVal = false;
			}

			if(!thisPM.Get("CalcExpYear")){
				errorCount++;
				errorMessage += errorCount + ". Expiration Year\n"
				retVal = false;
			}
		}

		if(!thisPM.Get("PaymentAmount") || thisPM.Get("PaymentAmount").slice(1) == "0.00"){
			errorCount++;
			errorMessage += errorCount + ". Payment Amount\n"
			retVal = false;
		}
		else{
			var PaymentAmount = thisPM.Get("PaymentAmount");
			var OrderTotal = thisPM.Get("SCOrderTotal");

			PaymentAmount = PaymentAmount.replace(/\D/g, ""); 
			OrderTotal = OrderTotal.replace(/\D/g, ""); 

			//Comparing the integers is much more robust than comparing floating point/decimal numbers as the comparison of int does not depend on JavaScript, hardware architecture and floating point arithmetic implementation.
			var intPA = parseInt(PaymentAmount);
			var intOT = parseInt(OrderTotal);
			if (intPA > intOT){
				errorMessage += "Payment Amount cannot exceed Order Total for Authorization\n"
				retVal = false;							
			}

			if (thisPM.Get("PaymentAmount").substring(0,1) == "("){
				errorMessage += "Negative Payment Amounts cannot be sent for authorization\n"
				retVal = false;							
			}
		}

		if(!thisPM.Get("AuthorizationCode") && thisPM.Get("PaymentStatus") == "Need Verbal Authorization"){
				errorMessage = "Please enter Authorization Code for Verbal Authorization\n"
				retVal = false;
		}

	if(!retVal){
		alert(errorMessage);
	}
	return retVal;
}

if (typeof(SiebelAppFacade.SCCreditCardSROPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCreditCardSROPR");
 define("siebel/custom/SCCreditCardSROPR", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCCreditCardSROPR = (function () {
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var orderPM,orderBo,paymentBC;
	var orderId="",orderNumber="",totalDue="",firstName="",lastName="",address="",state="",postalCode="",country="",phone="",contactId="";
    function SCCreditCardSROPR(pm) {
     SiebelAppFacade.SCCreditCardSROPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCCreditCardSROPR, SiebelAppFacade.PhysicalRenderer);

    SCCreditCardSROPR.prototype.Init = function () {
     SiebelAppFacade.SCCreditCardSROPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCreditCardSROPR:      Init method reached.");
	 orderPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetPModel().GetRenderer().GetPM();
	 orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
	 paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Credit Card - SRO"].GetBusComp();
	 orderId = orderBC.GetFieldValue("Id");
	 orderNumber = orderBC.GetFieldValue("Order Number");
	 totalDue = orderBC.GetFieldValue("SC Total Balance Due");
	 firstName = orderBC.GetFieldValue("Primary Bill To First Name");
	 lastName = orderBC.GetFieldValue("Primary Bill To Last Name");
	 address = orderBC.GetFieldValue("SC Con Bill To Address");
	 state = orderBC.GetFieldValue("Primary Bill To State");
	 postalCode = orderBC.GetFieldValue("Primary Bill To Postal Code");
	 country = orderBC.GetFieldValue("Primary Bill To Country");
	 phone = orderBC.GetFieldValue("SC Preferred Contact");
	 contactId = orderBC.GetFieldValue("Bill To Contact Id");
	 customerNumber = orderBC.GetFieldValue("SC Primary Bill To Contact Customer Number");
	}

    SCCreditCardSROPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCreditCardSROPR:      ShowUI method reached.");
     SiebelAppFacade.SCCreditCardSROPR.superclass.ShowUI.apply(this, arguments);
	 
	 var pm = this.GetPM();
	 $('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
	 $('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').css("opacity",0);
	 var controls = pm.Get( "GetControls" );
	 var authorizeButton = controls[ "Authorize" ];				
	 var PaymentLineId = controls[ "Payment Id" ];	
	 var SCOrderTotal = controls[ "SC Order Total" ];
	 
	 var authCode = $('[name="'+pm.Get('GetControls')['Authorization Code'].GetInputName()+'"]').val();
	 var canInvoke = pm.ExecuteMethod("CanInvokeMethod","Authorize");
	 if(canInvoke){
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
	 }else{
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
	 }
	 
	 $("[name="+PaymentLineId.GetInputName()+"]").css('visibility', 'hidden');		
	 $("[name="+SCOrderTotal.GetInputName()+"]").css('visibility', 'hidden');
	 setTimeout(function(){
		var paymentStatus = paymentBC.GetFieldValue("SC Payment Status");
		if(paymentStatus == "Entered"){
			$('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
			
			$('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').blur(function(){
				var cardInfo = $('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').val();
				SiebelJS.Log("CardInfo..:"+cardInfo);
				var len = cardInfo.length;
				if(len<25){
				  $('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').val("");
				  if(paymentStatus == "Entered"){
					//alert("Please swipe the Credit Card or do Manual Input");
					$('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
				  }
				}else{
				  var cardNumber = cardInfo.substring(2,6);
				  cardNumber = "**** **** **** "+cardNumber;
				  var expInfo = cardInfo.split('^');
				  expInfo = expInfo[2];
				  var year = expInfo.substring(0,2);
				  var month = expInfo.substring(2,4);
				  
				  $('[name="'+pm.Get('GetControls')['SC Credit Card Number'].GetInputName()+'"]').val(cardNumber);
				  $('[name="'+pm.Get('GetControls')['SC CVV Number'].GetInputName()+'"]').val("****");
				  $('[name="'+pm.Get('GetControls')['Expiration Year'].GetInputName()+'"]').val("20"+year);
				  $('[name="'+pm.Get('GetControls')['Expiration Month'].GetInputName()+'"]').val(month);
				  
				  paymentBC.SetFieldValue("SC Credit Card Number", cardNumber);
				  paymentBC.SetFieldValue("SC CVV Number", "***");
				  paymentBC.SetFieldValue("SC Expiration Month", month);
				  paymentBC.SetFieldValue("Expiration Year", "20"+year);
				  
				  pm.SetProperty("CalcCreditCardNumber",cardNumber);
				  pm.SetProperty("CalcCVVNumber","***");
				  pm.SetProperty("CalcExpMonth",month);
				  pm.SetProperty("CalcExpYear","20"+year);
				  
				  var CustomerName = firstName+" "+lastName;
				  var StreetAddress = address+" "+state;
				  var ZipCode = postalCode;
				  var total = orderBC.GetFieldValue("Order Total");
				  var loctionId = paymentBC.GetFieldValue("SC Sale Location Id");
				  pm.ExecuteMethod("InvokeMethod","GetAccessToken", null, false);
				  var AccessToken = theApplication().GetProfileAttr("SCAccessToken");
				  var TerminalID = SiebelApp.S_App.GetProfileAttr("IP");
				 
				  pm.SetProperty("TrackInformation",cardInfo);
				  pm.SetProperty("CustomerReference",customerNumber);
				  pm.SetProperty("CustomerName",CustomerName);
				  pm.SetProperty("StreetAddress",StreetAddress);
				  pm.SetProperty("ZipCode",ZipCode);
				  pm.SetProperty("AccessToken",AccessToken);
				  pm.SetProperty("TerminalID",TerminalID);
				  pm.OnControlEvent("SU_GetToken");
			}
		 });
		}else{
			$('[name="'+pm.Get('GetControls')['SC Credit Card Number'].GetInputName()+'"]').focus();
		}
	  }, 1000);
	}

    SCCreditCardSROPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCreditCardSROPR:      BindData method reached.");
     SiebelAppFacade.SCCreditCardSROPR.superclass.BindData.apply(this, arguments);
	 
	 var pm = this.GetPM();
	 var controls = pm.Get( "GetControls" );
	 $('[name="'+controls[ "SC Credit Card Number" ].GetInputName() +'"]').prop('readonly','readonly');
	 $('[name="'+controls[ "SC CVV Number" ].GetInputName() +'"]').prop('readonly','readonly');
	 $('[name="'+controls[ "Expiration Month" ].GetInputName() +'"]').prop('readonly','readonly');
	 $('[name="'+controls[ "Expiration Month" ].GetInputName() +'"]').prop('disabled','disabled');
	 $('[name="'+controls[ "Expiration Year" ].GetInputName() +'"]').prop('readonly','readonly');
	 $('[name="'+controls[ "Expiration Year" ].GetInputName() +'"]').prop('disabled','disabled');
	 $('[name="'+controls[ "Payment Type" ].GetInputName() +'"]').prop('readonly','readonly');
	 $('[name="'+controls[ "Payment Method" ].GetInputName() +'"]').prop('readonly','readonly');
	
 	 var authCode = $('[name="'+pm.Get('GetControls')['Authorization Code'].GetInputName()+'"]').val();
	 var canInvoke = pm.ExecuteMethod("CanInvokeMethod","Authorize");
	 if(canInvoke){
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
	 }else{
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		$("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
	 }
	 
    }

    SCCreditCardSROPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCreditCardSROPR:      BindEvents method reached.");
     SiebelAppFacade.SCCreditCardSROPR.superclass.BindEvents.apply(this, arguments);
	 
	 var PM = this.GetPM();
	 var controls = PM.Get( "GetControls" );
	 var authorizeButton = controls[ "Authorize" ];
	 var ManualInput = controls[ "Manual Input" ];
	 
	 $("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + authorizeButton.GetInputName() + "_Ctrl",
		"click",
		{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
		function(evt){
			$("#" + authorizeButton.GetInputName() + "_Ctrl").unbind("click");
			PM = evt.data.ctx.GetPM();
			//$("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'hidden');						
			var amountPay = paymentBC.GetFieldValue("Transaction Amount");
			paymentBC.SetFieldValue("Transaction Amount", amountPay);
			var machineInfo = SiebelApp.S_App.GetProfileAttr('MachineInfo');
			paymentBC.SetFieldValue("Machine Name", machineInfo);
			//var paymentType = $('[name="'+PM.Get('GetControls')['SC Payment Type Code'].GetInputName()+'"]').val();
			
			PM.SetProperty("PaymentMethod",paymentBC.GetFieldValue("Payment Method"));
			PM.SetProperty("CreditCardType",paymentBC.GetFieldValue("SC Payment Type Code"));
			PM.SetProperty("PaymentAmount",paymentBC.GetFieldValue("Transaction Amount"));
			PM.SetProperty("PaymentsRowID",paymentBC.GetFieldValue("Id"));
			PM.SetProperty("AccountNumber",paymentBC.GetFieldValue("Account Number"));
			PM.SetProperty("PaymentStatus",paymentBC.GetFieldValue("SC Payment Status"));
			PM.SetProperty("AuthorizationCode",paymentBC.GetFieldValue("Authorization Code"));
			PM.SetProperty("SCOrderTotal",orderBC.GetFieldValue("Order Total"));
			PM.ExecuteMethod("InvokeMethod","GetAccessToken", null, false);
			var AccessToken = theApplication().GetProfileAttr("SCAccessToken");
			PM.SetProperty("AccessToken",AccessToken);
			
			var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
			if( paymentStatus == "Need Verbal Authorization"){
				var write = PM.ExecuteMethod("InvokeMethod","WriteRecord", null, false);
				PM.SetProperty("FunctionCode","05");
				PM.SetProperty("PaymentsRowID",paymentBC.GetFieldValue("Id"));
				PM.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
			}else{
				if(validateInputCC(PM)){
					//Handle the click event in the PM
					var write = PM.ExecuteMethod("InvokeMethod","WriteRecord", null, false);
					console.log("clicked AUTHORIZE button from CC PR");					
					PM.OnControlEvent ("SU_AUTHORIZE_PAYMENT_LINE");
					$("#" + authorizeButton.GetInputName() + "_Ctrl").unbind("click");
					$('[name="'+orderPM.Get('GetControls')['OrderNumber'].GetInputName()+'"]').focus();
				}
				else{
					$("#" + authorizeButton.GetInputName() + "_Ctrl").css('visibility', 'visible');							
				}
			}
		});
		
		$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + ManualInput.GetInputName() + "_Ctrl",
		"click",
		{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
		function(evt){
			SCOUIMethods.Invoke4Go();					
		});
	 
	}

    SCCreditCardSROPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCreditCardSROPR:      EndLife method reached.");
     SiebelAppFacade.SCCreditCardSROPR.superclass.EndLife.apply(this, arguments);
    }

    return SCCreditCardSROPR;
   }()
  );
  return "SiebelAppFacade.SCCreditCardSROPR";
 })
}
