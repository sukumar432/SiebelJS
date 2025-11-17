if (typeof(SiebelAppFacade.SCSalesOrderEntryLineItemsPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCSalesOrderEntryLineItemsPM");
 define("siebel/custom/SCSalesOrderEntryLineItemsPM", ["siebel/listpmodel","order!siebel/custom/SelectComfort/SCOrderShipToLineItemMarkup"],
  function () {
   SiebelAppFacade.SCSalesOrderEntryLineItemsPM = (function () {

    function SCSalesOrderEntryLineItemsPM(pm) {
     SiebelAppFacade.SCSalesOrderEntryLineItemsPM.superclass.constructor.apply(this, arguments);
    }
	var SCSalesOrderShipMarkup = SiebelJS.Dependency("SiebelAppFacade.SCOrderShipToLineItemMarkup");
    SiebelJS.Extend(SCSalesOrderEntryLineItemsPM, SiebelAppFacade.ListPresentationModel);

    SCSalesOrderEntryLineItemsPM.prototype.Init = function () {
     SiebelAppFacade.SCSalesOrderEntryLineItemsPM.superclass.Init.apply(this, arguments);
     SiebelJS.Log(this.Get("GetName")+": SCSalesOrderEntryLineItemsPM:      Init method reached.");
	 this.AddMethod( "InvokeMethod",  PreInvokeMethod, { sequence : true, scope: this } );
	 this.AddProperty("SCAllowFrieght","N");
	 var mainMarkup="";
		//code for appending the open ui popup
		mainMarkup+=' <div id="applet1">';
			mainMarkup+=' <div class="container-fluid no-margin no-padding">';
				mainMarkup += '<div class="modal fade sc-c-create-assets in" id="SC-old-Delivery-Type" role="dialog" >';
				mainMarkup += '</div>';
			mainMarkup+='</div>';
		mainMarkup+='</div>';
		$("#_sweclient").append(mainMarkup);
    }

    SCSalesOrderEntryLineItemsPM.prototype.Setup = function (propSet) {
     SiebelJS.Log(this.Get("GetName")+": SCSalesOrderEntryLineItemsPM:      Setup method reached.");
     SiebelAppFacade.SCSalesOrderEntryLineItemsPM.superclass.Setup.apply(this, arguments);
    }
	function PreInvokeMethod(methodName,PsInputArg,ip,returnStructure){
			if(methodName=="SC Calculate Shipping" && this.Get("SCAllowFrieght")=="N"){
				var thisPM=this;
					var inPS="",outPS="",Bservice="", bEligibleAdderCount,orderid,pEligibleAddresses,iEligibleAdderCount;
					inPS = SiebelApp.S_App.NewPropertySet();
					outPS = SiebelApp.S_App.NewPropertySet();
					orderid=SiebelApp.S_App.GetActiveView().GetAppletMap()[this.GetObjName()].GetBusComp().GetParentBusComp().GetFieldValue("Id");
					inPS.SetProperty("OrderId", orderid);
					Bservice = SiebelApp.S_App.GetService("SC Order Management Service");
					outPS = Bservice.InvokeMethod("CheckProductEligibilty", inPS);
					pEligibleAddresses = outPS.GetChild(0).GetChildByType('EligibleAddresses');
					iEligibleAdderCount = parseInt(pEligibleAddresses.GetProperty('EligibleAdder_Count'));
					returnStructure["CancelOperation"]=true;
					returnStructure["ReturnValue"]="";
					if(iEligibleAdderCount){
						SiebelApp.S_App.uiStatus.Free();
						var deliveryTypeMarkup = SCSalesOrderShipMarkup.SelectDeliveryType(pEligibleAddresses);
						$("#SC-old-Delivery-Type").html(deliveryTypeMarkup);
						$("#SC-old-Delivery-Type").modal({
							backdrop: 'static'
						});
						$("#SC-old-Delivery-Type").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
						$(document).on('click', '#SC-old-Delivery-Type .SC-order-DelType input', function(e) {
							e.stopImmediatePropagation();
							var cnt=0;
							$(".SC-order-DelType input[type=radio]:checked").each(function() {
								cnt=cnt+1;
							});
							if(cnt == iEligibleAdderCount){
								$("#update-delivery-type").removeClass("SC-disabled");
								$("#update-delivery-type").attr("style","background: #F63 !important;border: #F63 !important;");
							}
							else{
								$("#update-delivery-type").addClass("SC-disabled");
								$("#update-delivery-type").attr("style","background: #808080!important;border: #808080	!important;");
							}
						});
						$(document).on('click', '#SC-old-Delivery-Type #update-delivery-type', function(e) {
							e.stopImmediatePropagation();
							$("#SC-old-Delivery-Type").modal('hide');
							$(".modal-backdrop").hide();
							var addressId = "", sHUBName, sRegionName;
							var fieldvalues = "";
							var fieldnames = "Shipping";
							var Bservice = '', inPS = '', outPS = '';
							inPS = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("BO", "Order Entry (Sales)");
							inPS.SetProperty("BC", "Order Entry - Line Items");
							inPS.SetProperty("FieldsArray", fieldnames);
							Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
							for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
								addressId = pEligibleAddresses.GetChild(i).GetValue();
								var ele =  document.getElementsByName(addressId);
								for(var j = 0; j < ele.length; j++) { 
									if(ele[j].checked){
										pEligibleAddresses.GetChild(i).SetProperty("SC New Delivery Type",ele[j].value);
										sRegionName = pEligibleAddresses.GetChild(i).GetProperty("Group");
										sHUBName = pEligibleAddresses.GetChild(i).GetProperty("Ship From Location")
										fieldvalues = ele[j].value;
										inPS.SetProperty("ValuesArray", fieldvalues);
										//inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + orderid + "'AND ([Fulfillment Status Code] = 'In Progress') AND [Ship To Address Id]='" + addressId +"' AND [Ship Method] = 'Home Delivery' AND [Request To Cancel] <> 'Y'");
										inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + orderid + "'AND ([Fulfillment Status Code] <> 'Closed' OR [Fulfillment Status Code] <> 'Cancelled') AND [Ship To Address Id]='" + addressId +"' AND [Ship Method] = 'Home Delivery' AND [Request To Cancel] <> 'Y'");
										outPS = Bservice.InvokeMethod("Insert", inPS);
									}
								}
							}
							SiebelApp.S_App.GetActiveView().GetAppletMap()[thisPM.GetObjName()].GetBusComp().GetParentBusComp().InvokeMethod("RefreshRecord");
							
							
							SiebelApp.S_App.uiStatus.Busy({
								target: SiebelApp.S_App.GetTargetViewContainer(),
								mask: true
							});  
							setTimeout(function() {
								if(thisPM.ExecuteMethod("CanInvokeMethod", "SC Calculate Shipping")){
									thisPM.AddProperty("SCAllowFrieght","Y");
									thisPM.ExecuteMethod("InvokeMethod", "SC Calculate Shipping", null, false);
									thisPM.AddProperty("SCAllowFrieght","N");
								}
								SiebelApp.S_App.uiStatus.Free();
							},0);
						});
					}else{
						var fieldvalues = "Home Delivery";
						var fieldnames = "Shipping";
						var Bservice = '', inPS = '', outPS = '';
						inPS = SiebelApp.S_App.NewPropertySet();
						outPS = SiebelApp.S_App.NewPropertySet();
						inPS.SetProperty("BO", "Order Entry (Sales)");
						inPS.SetProperty("BC", "Order Entry - Line Items");
						inPS.SetProperty("FieldsArray", fieldnames);
						Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
						inPS.SetProperty("ValuesArray", fieldvalues);
						inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + orderid + "'AND ([Fulfillment Status Code] = 'In Progress') AND [Ship Method] = 'Home Delivery' AND [Request To Cancel] <> 'Y'");
						outPS = Bservice.InvokeMethod("Insert", inPS);
						SiebelApp.S_App.GetActiveView().GetAppletMap()[thisPM.GetObjName()].GetBusComp().GetParentBusComp().InvokeMethod("RefreshRecord");
							if(thisPM.ExecuteMethod("CanInvokeMethod", "SC Calculate Shipping")){
								thisPM.AddProperty("SCAllowFrieght","Y");
								thisPM.ExecuteMethod("InvokeMethod", "SC Calculate Shipping", null, false);
								thisPM.AddProperty("SCAllowFrieght","N");
							}
						}
			}
			else{
				returnStructure["CancelOperation"]=false;
			}
	}
	
    return SCSalesOrderEntryLineItemsPM;
   }()
  );
  return "SiebelAppFacade.SCSalesOrderEntryLineItemsPM";
 })
}
