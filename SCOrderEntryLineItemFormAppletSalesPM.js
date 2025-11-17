if (typeof(SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM");
 define("siebel/custom/SCOrderEntryLineItemFormAppletSalesPM", ["siebel/pmodel"],
  function () {
   SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM = (function () {

    function SCOrderEntryLineItemFormAppletSalesPM(pm) {
     SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCOrderEntryLineItemFormAppletSalesPM, SiebelAppFacade.PresentationModel);

    SCOrderEntryLineItemFormAppletSalesPM.prototype.Init = function () {
     SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM.superclass.Init.apply(this, arguments);
     //SiebelJS.Log(this.Get("GetName")+": SCOrderEntryLineItemFormAppletSalesPM:      Init method reached.");
	 //SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
	 this.AddMethod( "InvokeMethod",  InvokeMethod, { sequence : false, scope: this } );
	}

    SCOrderEntryLineItemFormAppletSalesPM.prototype.Setup = function (propSet) {
     //SiebelJS.Log(this.Get("GetName")+": SCOrderEntryLineItemFormAppletSalesPM:      Setup method reached.");
     SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM.superclass.Setup.apply(this, arguments);
    }
	//START:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
	function InvokeMethod(methodName,PsInputArg,ip,returnStructure){
		if(methodName=="PostChanges" && PsInputArg.propArray.hasOwnProperty("SWEPOC") && PsInputArg.propArray["SWEPOC"]=="Cancel Reason"){
			var lineBC=this.Get("GetBusComp");
			var sCancelRsn=lineBC.GetFieldValue("Cancel Reason");
			if(sCancelRsn!=""){
				returnStructure["CancelOperation"]=true;
				returnStructure["ReturnValue"]="";
				var Custom_Service = "",Input_BS = "",Out_BS = "",searchfields = "",sOrderId;
				Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
				Input_BS = SiebelApp.S_App.NewPropertySet();
				Out_BS = SiebelApp.S_App.NewPropertySet();
				sOrderId=lineBC.GetParentBusComp().GetFieldValue("Id");
				searchfields = "Product Line";
				Input_BS.SetProperty("BO", "Order Entry (Sales)");
				Input_BS.SetProperty("BC", "Order Entry - Line Items");
				Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Id]='"+lineBC.GetFieldValue("Id")+"'");
				Input_BS.SetProperty("SortSpecification", "");
				Input_BS.SetProperty("ReqNoOfRecords", "");
				Input_BS.SetProperty("FieldsArray", searchfields);
				Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
				var Child_BS = Out_BS.GetChild(0);
				var BS_Data = Child_BS.GetProperty("OutputRecordSet");
				if (BS_Data != "}") {
					BS_Data=JSON.parse(BS_Data);
					if(BS_Data["Product Line"]=="MATTRESS"){
						Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
						Input_BS = SiebelApp.S_App.NewPropertySet();
						Out_BS = SiebelApp.S_App.NewPropertySet();
						searchfields = "Id";
						Input_BS.SetProperty("BO", "Order Entry (Sales)");
						Input_BS.SetProperty("BC", "Order Entry - Line Items");
						Input_BS.SetProperty("SearchSpecification", "[Order Header Id] = '" + sOrderId + "' AND [Parent Order Item Id] IS NULL AND [SC Cancel Reason Calc]='N' AND [Part Number]='DISPOSAL' AND [Request To Cancel]='N' AND  [Fulfillment Status Code]<>'In Progress'");
						Input_BS.SetProperty("SortSpecification", "Created (DESCENDING)");
						Input_BS.SetProperty("ReqNoOfRecords", "");
						Input_BS.SetProperty("FieldsArray", searchfields);
						Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
						var Child_BS = Out_BS.GetChild(0);
						var BS_Data = Child_BS.GetProperty("OutputRecordSet");
						if (BS_Data != "}") {
							sCancelRsn=BS_Data+"___"+sCancelRsn;
							$('#SC-SO-Cancel-item-disposal-text').text(sCancelRsn);
							$("#SC-SO-Cancel-item-disposal").modal({
								backdrop: 'static'
							});
							$(".modal-backdrop").css('background', '#ffffff');
							$("#SC-SO-Cancel-item-disposal").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							SiebelApp.S_App.uiStatus.Free();
						}
					}
					SiebelApp.S_App.uiStatus.Free();
				}
				SiebelApp.S_App.uiStatus.Free();
			}
			return;
		}
		else{
			SiebelApp.S_App.uiStatus.Free();
			return;
		}
		
	}
	//END:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
    return SCOrderEntryLineItemFormAppletSalesPM;
   }()
  );
  return "SiebelAppFacade.SCOrderEntryLineItemFormAppletSalesPM";
 })
}
