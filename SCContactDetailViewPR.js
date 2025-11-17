if (typeof(SiebelAppFacade.SCContactDetailViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCContactDetailViewPR");
 define("siebel/custom/SelectComfort/SCContactDetailViewPR", ["siebel/phyrenderer"],
  function () {
   SiebelAppFacade.SCContactDetailViewPR = (function () {

    function SCContactDetailViewPR(pm) {
     SiebelAppFacade.SCContactDetailViewPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCContactDetailViewPR, SiebelAppFacade.PhysicalRenderer);

    
    SCContactDetailViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCContactDetailViewPR.superclass.BindData.apply(this, arguments);
		try 
		{
			 var conPM = this.GetPM(),Appletid = conPM.Get("IsResponsive") ? conPM.Get("GetListId") : conPM.Get("GetFullId");
			 var ConRecSet = conPM.Get("GetRecordSet");
			 var controls = conPM.Get("GetControls");
			 var CrowdtwistIdCtrl = controls[ "SC CrowdTwist UserId" ];
			 var CustCatgryCtrl = controls["Customer Category"];
			 var BaseCtrl = controls["Base"];
			 var SizeCtrl = controls["Size"];
			 var SeriesCtrl = controls["Series"];
			 var SleepNumberCtrl = controls["Sleep Number"];
			 var SubCommCtrl = controls["SC Sub Community"];
			 
			if (typeof CrowdtwistIdCtrl !== "undefined" && CrowdtwistIdCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "SC CrowdTwist UserId" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			if (typeof BaseCtrl !== "undefined" && BaseCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "Base" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			if (typeof SizeCtrl !== "undefined" && SizeCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "Size" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			if (typeof SeriesCtrl !== "undefined" && SeriesCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "Series" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			if (typeof SleepNumberCtrl !== "undefined" && SleepNumberCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "Sleep Number" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			 if (typeof SubCommCtrl !== "undefined" && SubCommCtrl !== null)
			  $('#s_'+Appletid+'_div').find("table").find("tr").find("td").find("[name="+conPM.Get( "GetControls" )[ "SC Sub Community" ].GetInputName()+"]").parent().parent().parent().addClass("displaynone"); 
			  
			 $('#s_'+Appletid+'_div').find("table").attr("style", "margin-left:115px !important;");
			 var ICimgMarkup="";
			 ICimgMarkup+=' <div class="SC-Profile-Section" style="width: 12%;position: absolute;margin: 20px -10px !important;">';
			 if (typeof CustCatgryCtrl !== "undefined" && CustCatgryCtrl !== null){
				 if(ConRecSet[0]["SN Customer Category Calc"] == "Smart Sleeper"){
					 //Modified the field with calc field
					ICimgMarkup+=' <div class="SC-Venilla-profile-section">';
					ICimgMarkup +='<img src="images/custom/contact360-loyality.png" id="SC-Contact-Img" class="incomplete">';
					ICimgMarkup +=' </div>';
					if(ConRecSet[0]["Community"] != "" && ConRecSet[0]["Community"] != null && ConRecSet[0]["SC Sub Community"] != "" && ConRecSet[0]["SC Sub Community"] != null)
					ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+' - '+ConRecSet[0]["SC Sub Community"]+'</p>';
					else
					ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+'</p>';
					ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Check.png" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">'+ConRecSet[0]["SN Customer Category Calc"]+'</span></p>';
				 }
				 else{
					ICimgMarkup+=' <div class="SC-Venilla-profile-section">';
					ICimgMarkup +='<img src="images/custom/contact360.png" id="SC-Contact-Img" class="incomplete">';
					ICimgMarkup +=' </div>';
					if(ConRecSet[0]["Community"] != "" && ConRecSet[0]["Community"] != null && ConRecSet[0]["SC Sub Community"] != "" && ConRecSet[0]["SC Sub Community"] != null)
					ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+' - '+ConRecSet[0]["SC Sub Community"]+'</p>';
					else
					ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+'</p>';
					ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">'+ConRecSet[0]["SN Customer Category Calc"]+'</span></p>';
				 }
			 }
			 else{
				ICimgMarkup+=' <div class="SC-Venilla-profile-section">';
				ICimgMarkup +='<img src="images/custom/contact360.png" id="SC-Contact-Img" class="incomplete">';
				ICimgMarkup +=' </div>';
				if(ConRecSet[0]["Community"] != "" && ConRecSet[0]["Community"] != null && ConRecSet[0]["SC Sub Community"] != "" && ConRecSet[0]["SC Sub Community"] != null)
				ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+' - '+ConRecSet[0]["SC Sub Community"]+'</p>';
				else
				ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin">'+ConRecSet[0]["Community"]+'</p>'
				ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">'+ConRecSet[0]["SN Customer Category Calc"]+'</span></p>';
			 }
			 
			// if (typeof CrowdtwistIdCtrl !== "undefined" && CrowdtwistIdCtrl !== null){
			 if(ConRecSet[0]["SC CrowdTwist UserId"] != "" && ConRecSet[0]["SC CrowdTwist UserId"] != null && ConRecSet[0]["SC CrowdTwist UserId"] != undefined)
				ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Check.png" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">Sleep Number Rewards Member</span></p>';
			 else
				ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Cross.png" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">Sleep Number Rewards Member</span></p>';
			// }
			// else
			//	ICimgMarkup +='<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Cross.png" id="SC-profile-Insider" class=""><span class="SC-profile-checkmarks">Sleep Number Rewards Member</span></p>';
			// ICimgMarkup +=' </div>';	
				//$('#s_'+Appletid+'_div').find("table").parent().prepend(ICimgMarkup);
				
			if ((ConRecSet[0]["SC Series"] != '') && (ConRecSet[0]["SC Base"] != '') && (ConRecSet[0]["SC Size"] != '') && (ConRecSet[0]["SC Sleep Number"] != '')) {
				$("#SC-Contact-Img").removeClass("incomplete");
			 } 
			 else {
				$("#SC-Contact-Img").addClass("incomplete");
			 }
			//Sukumar added for Digital Product Asset
			  if(ConRecSet[0]["User Type"]== "Digital Products Active")
			   {
				  $("#SC-product-Insider").attr("src","images/custom/IC-Insider-Check.png");
				 ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Check.png" id="SC-product-Insider" class=""><span class="SC-profile-checkmarks">Digital Products</p>';  
			   }
			   if(ConRecSet[0]["User Type"]== "Digital Products Cancelled")
			   {
				   $("#SC-product-Insider").attr("src","images/custom/IC-Insider-Cross.png");
					ICimgMarkup += '<p class="SC-Venilla-profile-name customer-name no-margin"><img src="images/custom/IC-Insider-Cross.png" id="SC-product-Insider" class=""><span class="SC-profile-checkmarks">Digital Products</p>';  
			   }
               $(".SC-360-profile-name").html(ICimgMarkup);
			   if(ConRecSet[0]["User Type"]== "Digital Products Active")
			   {
				  $("#SC-product-Insider").attr("src","images/custom/IC-Insider-Check.png");
			   }
			   if(ConRecSet[0]["User Type"]== "Digital Products Cancelled")
			   {
				   $("#SC-product-Insider").attr("src","images/custom/IC-Insider-Cross.png");
			   }

			 ICimgMarkup +=' </div>';	
				$('#s_'+Appletid+'_div').find("table").parent().prepend(ICimgMarkup);
			 
			//Calling BS to get Inner Circle Rewards
			var oSvc = SiebelApp.S_App.GetService("SC Custom Query");
			var Input_BS = SiebelApp.S_App.NewPropertySet();
			var Out_BS = SiebelApp.S_App.NewPropertySet();
			var searchfields = "Id,Product Name,SC Status,Voucher Number,Voucher Issued Date,Expiration Date";
			var sContactId = ConRecSet[0]["Id"];
			Input_BS.SetProperty("BO", "Contact");
			Input_BS.SetProperty("BC", "LOY Voucher");
			Input_BS.SetProperty("SearchSpecification", "[SC LOY Member Contact Id] ='"+sContactId+"' AND [SC Status] = 'Active'");
			Input_BS.SetProperty("SortSpecification", "");
			Input_BS.SetProperty("ReqNoOfRecords", "");
			Input_BS.SetProperty("FieldsArray", searchfields);
			//nothing new until here, but where's the output PS?
			if(oSvc){
				var config = {};
				config.async = true;
				config.scope = this;
				config.cb = function(){
					var Out_BS = arguments[2];
					var Child_BS = Out_BS.GetChild(0);
					var BS_Data = Child_BS.GetProperty("OutputRecordSet");
					if(BS_Data!="}"){
					  //parse output property set
					  $("#SC-Contact-Img").attr("src","images/custom/contact360-loyality.png");
					}
					else{
						 $("#SC-Contact-Img").attr("src","images/custom/contact360.png");
					}
				}
			   oSvc.InvokeMethod("Query", Input_BS, config); 
			}
		}
		catch(e){
			//do nothing
		}
		
			 
    }

    

    SCContactDetailViewPR.prototype.EndLife = function () {
     SiebelAppFacade.SCContactDetailViewPR.superclass.EndLife.apply(this, arguments);
    }

    return SCContactDetailViewPR;
   }()
  );
  return "SiebelAppFacade.SCContactDetailViewPR";
 })
}
