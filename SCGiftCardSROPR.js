// globally rename GiftCardDetailPR to the name you desire for your custom class.
// Save the file in siebel/custom/ using the same case for the file name as the class name.
function validateInputGC(thisPM){
	var retVal = true;
	var errorMessage = "Following Fields are required:\n\n";
	var errorCount = 0;
	
	
	if(thisPM.Get("GetGCBalanceFlag") == "N" && !thisPM.Get("AccountNumber")){
		errorMessage = "Please perform “GC Balance Check” prior to “Authorization” request"
		retVal = false;
	}
	else{
		if(!thisPM.Get("GiftCardType")){				
			errorCount++;
			errorMessage += errorCount + ". Payment Type\n"
			retVal = false;
		}
		if(thisPM.Get("GetGCBalanceFlag") == "Y" && !thisPM.Get("AccountNumber") && !thisPM.Get("CalcGiftCardNumber")){
			errorCount++;
			errorMessage += errorCount + ". Gift Card#\n"
			retVal = false;
		}			
		if(!thisPM.Get("CalcPIN")){
			errorCount++;
			errorMessage += errorCount + ". PIN #\n"
			retVal = false;
		}			
		if (thisPM.Get("GetGCBalanceFlag") == "N"){ //Added for defect #3295
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
					errorMessage += "Payment Amount cannot exceed Order Total for Authorization"
					retVal = false;							
				}
				if (thisPM.Get("PaymentAmount").substring(0,1) == "("){
					errorMessage += "Negative Payment Amounts cannot be sent for authorization\n"
					retVal = false;							
				}	
			}				
		}
	}
	
	if(!retVal){
		alert(errorMessage);
	}
	return retVal;
}


if (typeof(SiebelAppFacade.SCGiftCardSROPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCGiftCardSROPR");
 define("siebel/custom/SCGiftCardSROPR", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCGiftCardSROPR = (function () {
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	
	var orderPM,orderBo,paymentBC;
	var orderId="",orderNumber="",totalDue="",firstName="",lastName="",address="",state="",postalCode="",country="",phone="",contactId="",pm;
    function SCGiftCardSROPR(pm) {
     SiebelAppFacade.SCGiftCardSROPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCGiftCardSROPR, SiebelAppFacade.PhysicalRenderer);

    SCGiftCardSROPR.prototype.Init = function () {
     SiebelAppFacade.SCGiftCardSROPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCGiftCardSROPR:      Init method reached.");
	 orderPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetPModel().GetRenderer().GetPM();
	 orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
	 paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Gift Card - SRO"].GetBusComp();
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

    SCGiftCardSROPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCGiftCardSROPR:      ShowUI method reached.");
     SiebelAppFacade.SCGiftCardSROPR.superclass.ShowUI.apply(this, arguments);
	 pm = this.GetPM();
	 var controls = pm.Get( "GetControls" );
	  $('[name="'+controls['SC RPS Card Input Field'].GetInputName()+'"]').css("opacity",0);
	  $('[name="'+controls[ "SC Credit Card Number" ].GetInputName() +'"]').prop('readonly','readonly');
	  $('[name="'+controls[ "VerificationNumber" ].GetInputName() +'"]').prop('readonly','readonly');
	  
	 var canGetBalance = pm.ExecuteMethod("CanInvokeMethod","GiftCardBalance");
	  if(canGetBalance){
		  $("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		  $("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		  $("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
		  $("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		  $("#" + controls[ "Gift Card Balance" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
		  $("#" + controls[ "Gift Card Balance" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
	  }else{
		  $("#" + controls[ "Gift Card Balance" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		  $("#" + controls[ "Gift Card Balance" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		  $("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',false).css("opacity",1);
		  $("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
		  $("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").prop('disabled',true).css("opacity",0.5);
		  $("#" + controls[ "Manual Input" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;");
	  }
	 
	 $('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
	 
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
				$('[name="'+pm.Get('GetControls')['SC RPS Card Input Field'].GetInputName()+'"]').focus();
			  }
			}else{
			  var cardNumber = cardInfo.substring(2,6);
			  cardNumber = "**** **** **** "+cardNumber;
			  $('[name="'+pm.Get('GetControls')['SC Credit Card Number'].GetInputName()+'"]').val(cardNumber);
			  $('[name="'+pm.Get('GetControls')['VerificationNumber'].GetInputName()+'"]').val("****");
			  
			  paymentBC.SetFieldValue("SC Credit Card Number", cardNumber);
			  paymentBC.SetFieldValue("SC CVV Number", "***");
			 
			  pm.SetProperty("CalcGiftCardNumber",cardNumber);
			  pm.SetProperty("CalcPIN","***");
			  
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
			$('[name="'+orderPM.Get('GetControls')['OrderNumber'].GetInputName()+'"]').focus();
		}
	 }, 1000);
    }

    SCGiftCardSROPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCGiftCardSROPR:      BindData method reached.");
     SiebelAppFacade.SCGiftCardSROPR.superclass.BindData.apply(this, arguments);
	  var PM = this.GetPM();
	  var controls = PM.Get( "GetControls" );
	  $('[name="'+controls[ "SC Credit Card Number" ].GetInputName() +'"]').prop('readonly','readonly');
	  $('[name="'+controls[ "VerificationNumber" ].GetInputName() +'"]').prop('readonly','readonly');
	  $('[name="'+controls[ "SCPaymentTypeCode" ].GetInputName() +'"]').prop('readonly','readonly');
	  $('[name="'+controls[ "PaymentMethod" ].GetInputName() +'"]').prop('readonly','readonly');
	}

    SCGiftCardSROPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCGiftCardSROPR:      BindEvents method reached.");
     SiebelAppFacade.SCGiftCardSROPR.superclass.BindEvents.apply(this, arguments);
	 
		var PM = this.GetPM();
		var controls = PM.Get( "GetControls" );
		var giftcardbalance = controls[ "Gift Card Balance" ];
		var authorizeButton = controls[ "Authorize" ];				
		var PaymentLineId = controls[ "Payment Id" ];	
		var SCOrderTotal = controls[ "SC Order Total" ];
		var ManualInput = controls[ "Manual Input" ];		
		
		$("[name="+PaymentLineId.GetInputName()+"]").css('visibility', 'hidden');		
		$("[name="+SCOrderTotal.GetInputName()+"]").css('visibility', 'hidden');
		
		$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + giftcardbalance.GetInputName() + "_Ctrl",
			"click",
			{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
			function(evt){
				//PM = evt.data.ctx.GetPM();
				var PM = pm;	
				var controls = PM.Get( "GetControls" );
				//Set the property values by reading from controls.
				PM.SetProperty("PaymentMethod",
				 $("[name="+controls[ "PaymentMethod" ].GetInputName()+"]").val());	
				
				PM.SetProperty("GiftCardType",
				 $("[name="+controls[ "SCPaymentTypeCode" ].GetInputName()+"]").val());	

				PM.SetProperty("CalcGiftCardNumber",
				 $("[name="+controls[ "SC Credit Card Number" ].GetInputName()+"]").val());				

				PM.SetProperty("CalcPIN",
				 $("[name="+controls[ "VerificationNumber" ].GetInputName()+"]").val());

				PM.SetProperty("PaymentAmount",
				 $("[name="+controls[ "TransactionAmount" ].GetInputName()+"]").val());

				PM.SetProperty("PaymentsRowID",
				 $("[name="+controls[ "Payment Id" ].GetInputName()+"]").val());

				PM.SetProperty("AccountNumber",
				 $("[name="+controls[ "AccountNumber" ].GetInputName()+"]").val());

				PM.SetProperty("GetGCBalanceFlag", "Y");					
																
				//Validate user inputs in PR
				if(validateInputGC(PM)){
					//Handle the click event in the PM
					console.log("clicked INQUIRY BALANCE button from GC PR");				
					PM.OnControlEvent ("SU_GET_GC_BALANCE");
				}
			});

		$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + authorizeButton.GetInputName() + "_Ctrl",
			"click",
			{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
			function(evt){
				var PM = pm;	
				var controls = PM.Get( "GetControls" );
				//Set the property values by reading from controls.
				PM.SetProperty("PaymentMethod",
				 $("[name="+controls[ "PaymentMethod" ].GetInputName()+"]").val());	

				PM.SetProperty("GiftCardType",
				 $("[name="+controls[ "SCPaymentTypeCode" ].GetInputName()+"]").val());	

				PM.SetProperty("CalcGiftCardNumber",
				 $("[name="+controls[ "SC Credit Card Number" ].GetInputName()+"]").val());				
				
				$("[name="+controls[ "VerificationNumber" ].GetInputName()+"]").val("***")
				
				PM.SetProperty("CalcPIN",
				 $("[name="+controls[ "VerificationNumber" ].GetInputName()+"]").val());				

				PM.SetProperty("PaymentAmount",
				 $("[name="+controls[ "TransactionAmount" ].GetInputName()+"]").val());

				PM.SetProperty("PaymentsRowID",
				 $("[name="+controls[ "Payment Id" ].GetInputName()+"]").val());
																																		
				PM.SetProperty("AccountNumber",
				 $("[name="+controls[ "AccountNumber" ].GetInputName()+"]").val());
				
				//Capture SC Order Total for defect #3287
				PM.SetProperty("SCOrderTotal",
				 $("[name="+controls[ "SC Order Total" ].GetInputName()+"]").val());	

				PM.SetProperty("GetGCBalanceFlag", "N");
				
				PM.ExecuteMethod("InvokeMethod","GetAccessToken", null, false);
				var AccessToken = theApplication().GetProfileAttr("SCAccessToken");
				PM.SetProperty("AccessToken",AccessToken);
				var paymentStatus = paymentBC.GetFieldValue('SC Payment Status');
				if( paymentStatus == "Need Verbal Authorization"){	
					PM.SetProperty("FunctionCode","05");
					var write = PM.ExecuteMethod("InvokeMethod","WriteRecord", null, false);
					PM.SetProperty("PaymentsRowID",paymentBC.GetFieldValue("Id"));
					PM.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
				}else{
					//Validate user inputs in PR
					if(!validateInputGC(PM)){
						console.log("Failed UI validations for GC Authorize");
					}else{
						PM.SetProperty("FunctionCode","");
						var write = PM.ExecuteMethod("InvokeMethod","WriteRecord", null, false);
						PM.OnControlEvent("SU_AUTHORIZE_PAYMENT_LINE");
						$('[name="'+orderPM.Get('GetControls')['OrderNumber'].GetInputName()+'"]').focus();
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

    SCGiftCardSROPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCGiftCardSROPR:      EndLife method reached.");
     SiebelAppFacade.SCGiftCardSROPR.superclass.EndLife.apply(this, arguments);
    }

    return SCGiftCardSROPR;
   }()
  );
  return "SiebelAppFacade.SCGiftCardSROPR";
 })
}
