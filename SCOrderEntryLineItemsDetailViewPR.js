//Regenerate using:https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=View&name=SCOrderEntryLineItem&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCOrderEntryLineItemPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryLineItemPR");
 define("siebel/custom/SelectComfort/SCOrderEntryLineItemsDetailViewPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCSalesOrderMarkup","siebel/custom/SelectComfort/SCErrorCodes","siebel/custom/SelectComfort/jquery.validate.min","siebel/custom/SelectComfort/bootstrap.min"],
  function () {
   SiebelAppFacade.SCOrderEntryLineItemPR = (function () {
	    var SalesOrderMarkup = SiebelJS.Dependency("SiebelApp.SCSalesOrderMarkup");
		var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
		var SCOrderLineItemList=[];
		var Bservice = '';
		var inPS = '';	
		var outPS = '';
		
		

    function SCOrderEntryLineItemPR(pm) {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCOrderEntryLineItemPR, SiebelAppFacade.ViewPR);

    SCOrderEntryLineItemPR.prototype.Init = function () {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.Init.apply(this, arguments);
    }

    SCOrderEntryLineItemPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.ShowUI.apply(this, arguments);
	 ordersummarymarkup=SalesOrderMarkup.SCOrderSummarymarkup();
	 $("#a_4").html(ordersummarymarkup);
	
	   
	 var OrderFormPMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM();		 
	   OrderFormItemList=OrderFormPMinstance.Get("GetRecordSet");
		
		SiebelJS.Log("Form Applet"+JSON.stringify(OrderFormItemList));
		var orderId=localStorage.getItem('OrderId');
		
				inPS  = SiebelApp.S_App.NewPropertySet();
			    outPS = SiebelApp.S_App.NewPropertySet();
				inPS.SetProperty("OrderId",orderId)
			    SiebelJS.Log("Invoking Business Service");
				Bservice = SiebelApp.S_App.GetService("SC Get Line Items"); //get service
			    outPS = Bservice.InvokeMethod("Query",inPS); //invoke the method
				SiebelJS.Log("childcount"+JSON.stringify(outPS.GetChild(0).GetChildCount()));
				
				for(var ps=0;ps<outPS.GetChild(0).GetChildCount();ps++)
				{
					SiebelJS.Log(outPS.GetChild(0).GetChild(ps).GetProperty("SC Calc Long Description"));
					for(var pr=0;pr<outPS.GetChild(0).GetChild(ps).GetChildCount();pr++)
					{
						
						SiebelJS.Log("child"+outPS.GetChild(0).GetChild(ps).GetChild(pr).GetProperty("SC Calc Long Description"));
					}
					
				}
				var shippingcost= outPS.GetChild(0).GetProperty("Shipping cost");
				var shippinglinediscounts=outPS.GetChild(0).GetProperty("Shipping Line Discounts");
				SiebelJS.Log("Shipping cost"+outPS.GetChild(0).GetProperty("Shipping cost"));
				SiebelJS.Log("Shipping Line Discounts"+outPS.GetChild(0).GetProperty("Shipping Line Discounts"));
	
	
	
		
    }

    SCOrderEntryLineItemPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.BindData.apply(this, arguments);
	 SiebelJS.Log("Binddata----");
    }

    SCOrderEntryLineItemPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.BindEvents.apply(this, arguments);
	 /*$("#taxexempt").click(function(){
		 var sctaxexempt=$("#taxexempt").is(':checked') ? 'Y' : 'N';
		  
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order Form Applet OUI  (Sales)"].GetBusComp().SetFieldValue("Tax Exempt",sctaxexempt);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order Form Applet OUI  (Sales)"].InvokeMethod("WriteRecord");
			var OrderFormPMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order Form Applet OUI  (Sales)"].GetPModel().GetRenderer().GetPM();	
			OrderFormItemList=OrderFormPMinstance.Get("GetRecordSet");
			taxtotal=OrderFormItemList[0]["Third Party Tax Amount"];
			taxtotal = taxtotal.replace(/[$,]/g,"");
			taxtotal=taxtotal==""?0.00:parseFloat(taxtotal);
			ordertotal=OrderFormItemList[0]["Order Total"];
			ordertotal =ordertotal.replace(/[$,]/g,"");
			ordertotal=ordertotal==""?0.00:parseFloat(ordertotal);
			
			  $("#taxtotal").html("$"+taxtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
			 
			  $("#ordertotal").html("$"+ordertotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
		  
	 })*/
    }

    SCOrderEntryLineItemPR.prototype.EndLife = function () {
     SiebelAppFacade.SCOrderEntryLineItemPR.superclass.EndLife.apply(this, arguments);
	 SCOrderLineItemList=null;
	 childjson=null;
	 childobj=null;
	 scshippingcost=null;
	 
    }
    return SCOrderEntryLineItemPR;
   }()
  );
  return "SiebelAppFacade.SCOrderEntryLineItemPR";
 })
}
