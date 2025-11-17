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
     //SiebelJS.Log(this.Get("GetName")+": SCSalesOrderEntryLineItemsPM:      Init method reached.");
	 this.AddMethod( "InvokeMethod",  PreInvokeMethod, { sequence : true, scope: this } );
	 this.AddMethod( "InvokeMethod",  InvokeMethod, { sequence : false, scope: this } );
	 this.AddProperty("SCAllowFrieght","N");
	 var mainMarkup="";
		//code for appending the open ui popup
		/*mainMarkup+=' <div id="applet1">';
			mainMarkup+=' <div class="container-fluid no-margin no-padding">';
				mainMarkup += '<div class="modal fade sc-c-create-assets in" id="SC-old-Delivery-Type" role="dialog" >';
				mainMarkup += '</div>';
			mainMarkup+='</div>';
		mainMarkup+='</div>';*/
		mainMarkup=loadModalMarkup();
		$("#_sweclient").append(mainMarkup);
		clickEvents(this);
    }

    SCSalesOrderEntryLineItemsPM.prototype.Setup = function (propSet) {
     //SiebelJS.Log(this.Get("GetName")+": SCSalesOrderEntryLineItemsPM:      Setup method reached.");
     SiebelAppFacade.SCSalesOrderEntryLineItemsPM.superclass.Setup.apply(this, arguments);
    }
	//SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
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
	function PreInvokeMethod(methodName,PsInputArg,ip,returnStructure){
		
			if(methodName=="SC Calculate Shipping" && this.Get("SCAllowFrieght")=="N"){
				var thisPM=this;
					var inPS="",outPS="",Bservice="", bEligibleAdderCount,orderid,pEligibleAddresses,iEligibleAdderCount,bReOptionEligibleAdderCount,sOrderRevisionNum;
					inPS = SiebelApp.S_App.NewPropertySet();
					outPS = SiebelApp.S_App.NewPropertySet();
					orderid=SiebelApp.S_App.GetActiveView().GetAppletMap()[this.GetObjName()].GetBusComp().GetParentBusComp().GetFieldValue("Id");
					sOrderRevisionNum=SiebelApp.S_App.GetActiveView().GetAppletMap()[this.GetObjName()].GetBusComp().GetParentBusComp().GetFieldValue("Revision");
					sOrderRevisionNum=parseInt(sOrderRevisionNum);
					inPS.SetProperty("OrderId", orderid);
					Bservice = SiebelApp.S_App.GetService("SC Order Management Service");
					outPS = Bservice.InvokeMethod("CheckProductEligibilty", inPS);
					pEligibleAddresses = outPS.GetChild(0).GetChildByType('EligibleAddresses');
					iEligibleAdderCount = parseInt(pEligibleAddresses.GetProperty('EligibleAdder_Count'));
					bReOptionEligibleAdderCount =  parseInt(pEligibleAddresses.GetProperty('ReOptionEligAddrs_Cnt'));
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
					}else if(bReOptionEligibleAdderCount && sOrderRevisionNum > 1){
						$("#SC-SO-CF-verify").modal('hide');
						var deliveryTypeMarkup = SCOrderShipMarkup.ReSelectDeliveryTypeOption(pEligibleAddresses);
						$("#custommaskoverlay").hide();
						$("#SC-Delivery-Type").html(deliveryTypeMarkup);	
						$("#SC-Delivery-Type").modal({
							backdrop: 'static'
						});
						$("#SC-Delivery-Type").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
						
						$(document).on('click', '#SC-old-Delivery-Type .SC-order-ReDelType input', function(e) {
							e.stopImmediatePropagation();
							var cnt=0;
							$(".SC-order-ReDelType input[type=radio]:checked").each(function() {
								cnt=cnt+1;
							});
							if(cnt == bReOptionEligibleAdderCount){
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
						
						$(document).on('click', '#update-delivery-type-cancel', function(e) {
							e.stopImmediatePropagation();
							$("#SC-Delivery-Type").modal('hide');
							$("#SC-SO-CF-verify").modal({
							backdrop: 'static'
							});
							$("#SC-SO-CF-verify").css({
								"display": "flex",
								"justify-content": "center",
								"align-items": "center"
							});
							$(".modal-backdrop").css('background', '#ffffff');
							$("#custommaskoverlay").show();
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
						
						$(document).on('click', '#update-delivery-type-option', function(e) {
							e.stopImmediatePropagation();
							setTimeout(function(){
								var deliveryTypeMarkup = SCOrderShipMarkup.ReSelectDeliveryType(pEligibleAddresses);
								$("#SC-Delivery-Type").html(deliveryTypeMarkup);	
								
							},100);
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
						inPS.SetProperty("SearchSpecification", "[Order Header Id] = '" + orderid + "'AND ([Fulfillment Status Code] = 'In Progress' OR [SN Address Update Flag]='Y') AND [Ship Method] = 'Home Delivery' AND [Request To Cancel] <> 'Y'");
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
				return;
			}
	}
	//START:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
	function loadModalMarkup(){
		var mainMarkup="";
		//code for appending the open ui popup
		mainMarkup+=' <div id="applet1">';
			mainMarkup+=' <div class="container-fluid no-margin no-padding">';
				mainMarkup += '<div class="modal fade sc-c-create-assets in" id="SC-old-Delivery-Type" role="dialog" >';
				mainMarkup += '</div>';
				//STARt:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
			/*-- Disposal line Starts here-*/
			mainMarkup+='		<div class="modal fade SC-SO-add-popup" id="SC-SO-Cancel-item-disposal" role="dialog" style="display: none; justify-content: center; align-items: center;">';
			mainMarkup+='            <div class="SC-modal">';
			mainMarkup+='                <div class="modal-dialog cancel-popup">';
			mainMarkup+='                    <!-- Modal content-->';
			mainMarkup+='                    <div class="modal-content less-height">';
			mainMarkup+='                        <div class="icon" style="display: none;">';
			mainMarkup+='                            <span id="SC-SO-Cancel-item-disposal-text"></span>';
			mainMarkup+='                        </div>';
			mainMarkup+='                        <div class="text">';
			mainMarkup+='                            <span class="SC-span-width">Does the customer want to continue with the Disposal Service?</span>';
			mainMarkup+='                            <div class="SC-two-buttons">';
			mainMarkup+='                                <button id="SC-disposal-item-no-button">No</button>';
			mainMarkup+='                                <button class="" id="SC-disposal-item-yes-button" type="button">Yes</button>';
			mainMarkup+='                            </div>';
			mainMarkup+='                        </div>';
			mainMarkup+='                    </div>';
			mainMarkup+='                </div>';
			mainMarkup+='            </div>';
			mainMarkup+='        </div>';
			mainMarkup+='		<div class="modal fade SC-SO-add-popup" id="SC-SO-Cancel-item-disposal2" role="dialog" style="display: none; justify-content: center; align-items: center;">';
			mainMarkup+='            <div class="SC-modal">';
			mainMarkup+='                <div class="modal-dialog cancel-popup">';
			mainMarkup+='                    <!-- Modal content-->';
			mainMarkup+='                    <div class="modal-content less-height">';
			mainMarkup+='                        <div class="text">';
			mainMarkup+='                            <span class="SC-span-width">The DISPOSAL Sku will now be cancelled. Would you like to proceed?</span>';
			mainMarkup+='                            <div class="SC-two-buttons">';
			mainMarkup+='                                <button id="SC-disposal-item-no-button2">No</button>';
			mainMarkup+='                                <button class="" id="SC-disposal-item-yes-button2" type="button">Yes</button>';
			mainMarkup+='                            </div>';
			mainMarkup+='                        </div>';
			mainMarkup+='                    </div>';
			mainMarkup+='                </div>';
			mainMarkup+='            </div>';
			mainMarkup+='        </div>';
			/*Disposal line ends here-*/
			//END:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
			mainMarkup+='</div>';
		mainMarkup+='</div>';
		return mainMarkup;
	}
	
    function clickEvents(linepm){
		var sOrderId=linepm.Get("GetBusComp").GetParentBusComp().GetFieldValue("Id");
	
		$("#SC-disposal-item-yes-button").click(function () {
			$("#SC-SO-Cancel-item-disposal").modal("hide");
		});
		$("#SC-disposal-item-no-button").click(function () {
			$("#SC-SO-Cancel-item-disposal").modal("hide");
			$("#SC-SO-Cancel-item-disposal2").modal({
				backdrop: 'static'
			});
			$(".modal-backdrop").css('background', '#ffffff');
			$("#SC-SO-Cancel-item-disposal2").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
		});
		$("#SC-disposal-item-no-button2").click(function () {
			$("#SC-SO-Cancel-item-disposal2").modal("hide");
		});
		
		$("#SC-disposal-item-yes-button2").click(function () {
			var canlineId=$('#SC-SO-Cancel-item-disposal-text').text(),srcspec="";
			
			$("#SC-SO-Cancel-item-disposal2").modal("hide");
			SiebelApp.S_App.uiStatus.Busy({
				target: SiebelApp.S_App.GetTargetViewContainer(),
				mask: true
			});
			setTimeout(function () {
				canlineId=canlineId.split("___");
				var ResArray = new Array,jsonRes;
				ResArray = canlineId[0].split(";");
				for (var k=0;k< ResArray.length;k++){
					jsonRes = JSON.parse(ResArray[k]);
						srcspec+="[Id]='"+jsonRes["Id"]+"'";
						if(ResArray.length!=k+1)
							srcspec+=" OR ";
				}
				var fieldvalues,fieldnames,inPS,outPS,Bservice;
				fieldvalues=canlineId[1];
				fieldnames="Cancel Reason";
				srcspec="("+srcspec+") AND [Order Header Id] = '" + sOrderId +"'";
				inPS = SiebelApp.S_App.NewPropertySet();
				outPS = SiebelApp.S_App.NewPropertySet();
				inPS.SetProperty("BO","Order Entry (Sales)");
				inPS.SetProperty("BC","Order Entry - Line Items");
				inPS.SetProperty("FieldsArray",fieldnames );
				inPS.SetProperty("ValuesArray",fieldvalues);
				inPS.SetProperty("SearchSpecification",srcspec );
				Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
				outPS = Bservice.InvokeMethod("Insert", inPS);
				SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetPModel().ExecuteMethod("InvokeMethod","NewQuery",null,false);
				SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetPModel().ExecuteMethod("InvokeMethod","ExecuteQuery",null,false);
			SiebelApp.S_App.uiStatus.Free();
			}, 1000);
		});
		
	}
	//END:SPATIBAN:4/2/22: Added below code for #SFSTRY0001722
	return SCSalesOrderEntryLineItemsPM;
   }()
  );
  return "SiebelAppFacade.SCSalesOrderEntryLineItemsPM";
 })
}
