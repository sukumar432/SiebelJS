function validateInputCash(thisPM){
	var retVal = true;
	var errorMessage = "Following Fields are required:\n\n";
	var errorCount = 0;
	
		if(!thisPM.Get("PaymentType")){
			errorCount++;
			errorMessage += errorCount + ". Payment Type\n"
			retVal = false;
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
			/*var intPA = parseInt(PaymentAmount);
			var intOT = parseInt(OrderTotal);
			if (intPA > intOT){
				errorMessage += "Payment Amount cannot exceed Order Total for Authorization\n"
				retVal = false;							
			}*/

			if (thisPM.Get("PaymentAmount").substring(0,1) == "("){
				errorMessage += "Negative Payment Amounts cannot be sent for authorization\n"
				retVal = false;							
			}
		}
	
	if(!retVal){
		alert(errorMessage);
	}
	return retVal;
}

if (typeof(SiebelAppFacade.SCCashSROPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCashSROPR");
 define("siebel/custom/SCCashSROPR", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCCashSROPR = (function () {
	var orderPM,orderPM,paymentBC;
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var totalDue="",cashTaken=0,cashBack=0;
    function SCCashSROPR(pm) {
     SiebelAppFacade.SCCashSROPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCCashSROPR, SiebelAppFacade.PhysicalRenderer);

    SCCashSROPR.prototype.Init = function () {
     SiebelAppFacade.SCCashSROPR.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCashSROPR:      Init method reached.");
	 orderPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetPModel().GetRenderer().GetPM();
	 orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Order Form Applet"].GetBusComp();
	 paymentBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Cash - SRO"].GetBusComp();
	 
    }

    SCCashSROPR.prototype.ShowUI = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCashSROPR:      ShowUI method reached.");
     SiebelAppFacade.SCCashSROPR.superclass.ShowUI.apply(this, arguments);
	 var PM = this.GetPM();
	 var controls = PM.Get( "GetControls" );
	 var canInvoke = PM.ExecuteMethod("CanInvokeMethod","Authorize");
	 if(canInvoke){
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',false).css({'opacity':1});
	 }else{
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',true);
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;opacity:0.5");
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("opacity", 0.5);
	 }
	 totalDue = $("[name="+controls[ "TransactionAmount" ].GetInputName()+"]").val();
    }

    SCCashSROPR.prototype.BindData = function (bRefresh) {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCashSROPR:      BindData method reached.");
     SiebelAppFacade.SCCashSROPR.superclass.BindData.apply(this, arguments);
	 var PM = this.GetPM();
	 var controls = PM.Get( "GetControls" );
	 totalDue = $("[name="+controls[ "TransactionAmount" ].GetInputName()+"]").val();
	 var canInvoke = PM.ExecuteMethod("CanInvokeMethod","Authorize");
	 if(canInvoke){
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',false).css({'opacity':1,'color':'#fff !important'});
	 }else{
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").prop('disabled',true);
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("cssText", "color: #ffffff !important;opacity:0.5");
		$("#" + controls[ "Authorize" ].GetInputName() + "_Ctrl").css("opacity", 0.5);
	 }
	 
    }

    SCCashSROPR.prototype.BindEvents = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCashSROPR:      BindEvents method reached.");
     SiebelAppFacade.SCCashSROPR.superclass.BindEvents.apply(this, arguments);
		var PM = this.GetPM();
		var controls = PM.Get( "GetControls" );
	    var authorizeButton = controls[ "Authorize" ];
		
		$("#s_" + this.GetPM().Get("GetFullId") + "_div").parent().delegate("#" + authorizeButton.GetInputName() + "_Ctrl",
		"click",
		{ctx:this, ctrls: controls}, //Pass the 'controls' collection to the event handler in the data object.
		function(evt){
			PM = evt.data.ctx.GetPM();		
			//Set the property values by reading from controls.
			PM.SetProperty("PaymentMethod",
			 $("[name="+evt.data.ctrls[ "PaymentMethod" ].GetInputName()+"]").val());	
			
			PM.SetProperty("PaymentType",
			 $("[name="+evt.data.ctrls[ "SCPaymentTypeCode" ].GetInputName()+"]").val());	

			PM.SetProperty("PaymentAmount",
			 $("[name="+evt.data.ctrls[ "TransactionAmount" ].GetInputName()+"]").val());
			
			PM.SetProperty("SCOrderTotal",orderBC.GetFieldValue("Order Total"));
			
			if(validateInputCash(PM)){
				var txnAmount =  $("[name="+evt.data.ctrls[ "TransactionAmount" ].GetInputName()+"]").val();
				txnAmount = txnAmount.replace(/\D/g, "");
				totalDue = totalDue.replace(/\D/g, "");
				if(txnAmount > totalDue){
					var cashOverDue = txnAmount - totalDue;
				    cashOverDue = cashOverDue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
					paymentBC.SetFieldValue("Transaction Amount",(totalDue)/100)
					var write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
					var caninvoke = PM.ExecuteMethod("CanInvokeMethod","Authorize");
					SiebelJS.Log("CanInvoke of Auth..:"+caninvoke);
					if(caninvoke){
						PM.ExecuteMethod("InvokeMethod","Authorize", null, false);
						alert("Cash Taken:"+(txnAmount)/100+"\nCash Balance Due:"+(cashOverDue)/100);
						if(paymentBC.GetFieldValue("SC Payment Status")==="Authorized"){
							SCOUIMethods.OpenCashDrawer();
						}
					}
				}else{
					var write = SiebelApp.S_App.GetActiveView().GetActiveApplet().InvokeMethod("WriteRecord");
					var caninvoke = PM.ExecuteMethod("CanInvokeMethod","Authorize");
					SiebelJS.Log("CanInvoke of Auth..:"+caninvoke);
					if(caninvoke){
						PM.ExecuteMethod("InvokeMethod","Authorize", null, false);
						if(paymentBC.GetFieldValue("SC Payment Status")==="Authorized"){
							SCOUIMethods.OpenCashDrawer();
						}
					}
				}
			}
		});
	 
    }

    SCCashSROPR.prototype.EndLife = function () {
     SiebelJS.Log(this.GetPM().Get("GetName")+": SCCashSROPR:      EndLife method reached.");
     SiebelAppFacade.SCCashSROPR.superclass.EndLife.apply(this, arguments);
	}

    return SCCashSROPR;
   }()
  );
  return "SiebelAppFacade.SCCashSROPR";
 })
}