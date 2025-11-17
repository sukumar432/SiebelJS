if (typeof(SiebelAppFacade.SCContactListOUIPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCContactListOUIPR");
 define("siebel/custom/SelectComfort/SCShipToContactListPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SC_OUI_Markups"],
  function () {
   SiebelAppFacade.SCContactListOUIPR = (function () {
var conSearch_RS,pm,b=true,c=true,d=true,e=true,f=true,g=true,FieldQueryPair="";
var SCOUIMethods=SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
    function SCContactListOUIPR(pm) {
     SiebelAppFacade.SCContactListOUIPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCContactListOUIPR, SiebelAppFacade.JQGridRenderer);

    SCContactListOUIPR.prototype.Init = function () {
     SiebelAppFacade.SCContactListOUIPR.superclass.Init.apply(this, arguments);
	  pm = this.GetPM();
	  
    }

    SCContactListOUIPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCContactListOUIPR.superclass.ShowUI.apply(this, arguments);
	
    }

    SCContactListOUIPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCContactListOUIPR.superclass.BindData.apply(this, arguments);
	 SiebelJS.Log("Bind Data");
		 conSearch_RS=pm.Get("GetRecordSet");
		 if(conSearch_RS.length == 0){
			markup=SCOUIMarkups.ResultsMessage(pm,FieldQueryPair,"contacts");
			$("#SC-table-search-contact-body").html(markup);
		 }
		 else{
			 markup=ContactSearch_GetRecordSearch();
			 $("#shipping-contact-pagination").show();
			 SCOUIMethods.PrimaryButton(pm,'shipping-contact-pagination');
			 $('#SC-table-search-contact-body').html(markup); 
		}

	 
    }

    SCContactListOUIPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCContactListOUIPR.superclass.BindEvents.apply(this, arguments);
		var sShipToContactRecordSet = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetRecordSet();
		var sscAccountOrder;
		if(sShipToContactRecordSet[0]["SC Sub-Type"]=="Wholesale"||sShipToContactRecordSet[0]["SC Sub-Type"]=="QVC"||sShipToContactRecordSet[0]["SC Sub-Type"]=="Commercial" || sShipToContactRecordSet[0]["SC Sub-Type"] == "Internal" || sShipToContactRecordSet[0]["SC Sub-Type"] == "HSN"){
			sscAccountOrder=true;
		}
		else
			sscAccountOrder=false;
		
		$(document).on("click",".sort-by",function(){
		  if(sscAccountOrder){
			var AccountContactPM=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact Shipping List OUI"].GetPModel().GetRenderer().GetPM();
			if($(this).attr('id')=="sp-lastname"){
			if(b==true){SCOUIMethods.SortRecords(AccountContactPM,"Last Name","SortAscending");b=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"Last Name","SortDescending");b=true;}
			}
			else if($(this).attr('id')=="sp-firstname"){
			if(c==true){SCOUIMethods.SortRecords(AccountContactPM,"First Name","SortAscending");c=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"First Name","SortDescending");c=true;}
			}
			else if($(this).attr('id')=="sp-address"){
			if(d==true){SCOUIMethods.SortRecords(AccountContactPM,"Personal Street Address","SortAscending");d=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"Personal Street Address","SortDescending");d=true;}
			}
			else if($(this).attr('id')=="sp-city"){
			if(e==true){SCOUIMethods.SortRecords(AccountContactPM,"Personal City","SortAscending");e=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"Personal City","SortDescending");e=true;}
			}
			else if($(this).attr('id')=="sp-state"){
			if(f==true){SCOUIMethods.SortRecords(AccountContactPM,"Personal State","SortAscending");f=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"Personal State","SortDescending");f=true;}
			}
			else if($(this).attr('id')=="sp-zipcode"){
			if(g==true){SCOUIMethods.SortRecords(AccountContactPM,"Personal Postal Code","SortAscending");g=false;}
			else{SCOUIMethods.SortRecords(AccountContactPM,"Personal Postal Code","SortDescending");g=true;}
			}
			  
			  ContactAccountSearch_GetRecordSearch();
		  }
		  else{
			if($(this).attr('id')=="sp-lastname"){
			if(b==true){SCOUIMethods.SortRecords(pm,"Last Name","SortAscending");b=false;}
			else{SCOUIMethods.SortRecords(pm,"Last Name","SortDescending");b=true;}
			}
			else if($(this).attr('id')=="sp-firstname"){
			if(c==true){SCOUIMethods.SortRecords(pm,"First Name","SortAscending");c=false;}
			else{SCOUIMethods.SortRecords(pm,"First Name","SortDescending");c=true;}
			}
			else if($(this).attr('id')=="sp-address"){
			if(d==true){SCOUIMethods.SortRecords(pm,"Personal Street Address","SortAscending");d=false;}
			else{SCOUIMethods.SortRecords(pm,"Personal Street Address","SortDescending");d=true;}
			}
			else if($(this).attr('id')=="sp-city"){
			if(e==true){SCOUIMethods.SortRecords(pm,"Personal City","SortAscending");e=false;}
			else{SCOUIMethods.SortRecords(pm,"Personal City","SortDescending");e=true;}
			}
			else if($(this).attr('id')=="sp-state"){
			if(f==true){SCOUIMethods.SortRecords(pm,"Personal State","SortAscending");f=false;}
			else{SCOUIMethods.SortRecords(pm,"Personal State","SortDescending");f=true;}
			}
			else if($(this).attr('id')=="sp-zipcode"){
			if(g==true){SCOUIMethods.SortRecords(pm,"Personal Postal Code","SortAscending");g=false;}
			else{SCOUIMethods.SortRecords(pm,"Personal Postal Code","SortDescending");g=true;}
			}
		  }

		});
		$(document).on("click","#shipping-contact-pagination",function(){
			if(sscAccountOrder){
				setTimeout(function() {
					ContactAccountSearch_GetRecordSearch();
				},0);
			}
		});
    }
//Get the Contacts result
	function ContactSearch_GetRecordSearch(){
		var rcdLen="";
		var newRecord = '';
		var ContactDetails="";
		newRecord+='                                <table class="SC-table" id="SC-table-search-contact">';
		newRecord+='                                    <thead>';
		newRecord+='                                        <tr>';
		newRecord+='                                            <th class="sort-by" id="sp-lastname">last name</th>';
		newRecord+='                                            <th class="sort-by" id="sp-firstname">first name</th>';
		newRecord+='                                            <th class="sort-by" id="sp-address">address</th>';
		newRecord+='                                            <th class="sort-by" id="sp-city">city</th>';
		newRecord+='                                            <th class="sort-by" id="sp-state">state</th>';
		newRecord+='                                            <th class="sort-by" id="sp-zipcode">zipcode</th>';
		newRecord+='                                        </tr>';
		newRecord+='                                    </thead>';
		newRecord+='                                    <tbody>';
		rcdLen=conSearch_RS.length;
		for (var loop=0; loop<rcdLen; loop++)
		{
			ContactDetails="";
			ContactDetails=conSearch_RS[loop]["Primary Personal Address Id"]+'_'+conSearch_RS[loop]["Id"]+'_'+conSearch_RS[loop]["First Name"]+'_'+conSearch_RS[loop]["Last Name"]+'_'+conSearch_RS[loop]["Cellular Phone #"];
			newRecord += '		<tr id="SC-Conta-Search-Rcd'+loop+'">';
			newRecord += '      <td><span style="display:none" id="'+loop+'shiprcdset">'+ContactDetails+'</span>'+conSearch_RS[loop]["Last Name"]+'</td>';
			newRecord += '      <td>'+conSearch_RS[loop]["First Name"]+'</td>';
			newRecord += '      <td>'+conSearch_RS[loop]["Personal Street Address"]+'</td>';
			newRecord += '      <td>'+conSearch_RS[loop]["Personal City"]+'</td>';
			newRecord += '      <td>'+conSearch_RS[loop]["Personal State"]+'</td>';
			newRecord += '      <td>'+conSearch_RS[loop]["Personal Postal Code"]+'</td>';
			newRecord += '  </tr>';
		}
		newRecord+='                                    </tbody>';
		newRecord+='                                </table>';
		return newRecord;
	}
	
		//$("#SC-table-search-contact-body").html(recordsList);
		
	function ContactReferralSearch_GetRecordSearch(){
		var rcdLen="";
		var newRecord = '';
		var ContactDetails="";
		newRecord+='                                <table class="SC-table" id="SC-table-referral-search-contact">';
		newRecord+='                                    <thead>';
		newRecord+='                                        <tr>';
		newRecord+='                                            <th class="sort-by" id="ir-lastname">last name</th>';
		newRecord+='                                            <th class="sort-by" id="ir-firstname">first name</th>';
		newRecord+='                                            <th class="sort-by" id="ir-address">address</th>';
		newRecord+='                                            <th class="sort-by" id="ir-city">city</th>';
		newRecord+='                                            <th class="sort-by" id="ir-state">state</th>';
		newRecord+='                                            <th class="sort-by" id="ir-zipcode">zipcode</th>';
		newRecord+='                                        </tr>';
		newRecord+='                                    </thead>';
		newRecord+='                                    <tbody>';
		rcdLen=conReferralSearch_RS.length;
		for (var loop=0; loop<rcdLen; loop++)
		{
			ContactDetails="";
			ContactDetails=conReferralSearch_RS[loop]["Id"]+'_'+conReferralSearch_RS[loop]["Primary Contact First Name"]+'_'+conReferralSearch_RS[loop]["Primary Contact Last Name"];
			newRecord += '		<tr id="ref_row'+loop+'">';
			newRecord += '      <td><span style="display:none" id="'+loop+'refcondet">'+ContactDetails+'</span>'+conReferralSearch_RS[loop]["Primary Contact Last Name"]+'</td>';
			newRecord += '      <td>'+conReferralSearch_RS[loop]["Primary Contact First Name"]+'</td>';
			newRecord += '      <td>'+conReferralSearch_RS[loop]["Contact Street Address"]+'</td>';
			newRecord += '      <td>'+conReferralSearch_RS[loop]["City"]+'</td>';
			newRecord += '      <td>'+conReferralSearch_RS[loop]["State"]+'</td>';
			newRecord += '      <td>'+conReferralSearch_RS[loop]["Postal Code"]+'</td>';
			newRecord += '  </tr>';
		}
		newRecord+='                                    </tbody>';
		newRecord+='                                </table>';
		return newRecord;
	}
	function ContactAccountSearch_GetRecordSearch(){
		var AccountContactPM=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact Shipping List OUI"].GetPModel().GetRenderer().GetPM();
		var AccconSearch_RS=AccountContactPM.Get("GetRecordSet");
		var rcdLen="";
		var newRecord = '';
		var ContactDetails="";
		newRecord+='                                <table class="SC-table" id="SC-table-search-contact">';
		newRecord+='                                    <thead>';
		newRecord+='                                        <tr>';
		newRecord+='                                            <th class="sort-by" id="sp-lastname">last name</th>';
		newRecord+='                                            <th class="sort-by" id="sp-firstname">first name</th>';
		newRecord+='                                            <th class="sort-by" id="sp-address">address</th>';
		newRecord+='                                            <th class="sort-by" id="sp-city">city</th>';
		newRecord+='                                            <th class="sort-by" id="sp-state">state</th>';
		newRecord+='                                            <th class="sort-by" id="sp-zipcode">zipcode</th>';
		newRecord+='                                        </tr>';
		newRecord+='                                    </thead>';
		newRecord+='                                    <tbody>';
		rcdLen=AccconSearch_RS.length;
		for (var loop=0; loop<rcdLen; loop++)
		{
			ContactDetails="";
			ContactDetails=AccconSearch_RS[loop]["Primary Personal Address Id"]+'_'+AccconSearch_RS[loop]["Contact Id"]+'_'+AccconSearch_RS[loop]["First Name"]+'_'+AccconSearch_RS[loop]["Last Name"]+'_'+AccconSearch_RS[loop]["Cellular Phone #"];
			newRecord += '		<tr id="SC-Conta-Search-Rcd'+loop+'">';
			newRecord += '      <td><span style="display:none" id="'+loop+'shiprcdset">'+ContactDetails+'</span>'+AccconSearch_RS[loop]["Last Name"]+'</td>';
			newRecord += '      <td>'+AccconSearch_RS[loop]["First Name"]+'</td>';
			newRecord += '      <td>'+AccconSearch_RS[loop]["Personal Street Address"]+'</td>';
			newRecord += '      <td>'+AccconSearch_RS[loop]["Personal City"]+'</td>';
			newRecord += '      <td>'+AccconSearch_RS[loop]["Personal State"]+'</td>';
			newRecord += '      <td>'+AccconSearch_RS[loop]["Personal Postal Code"]+'</td>';
			newRecord += '  </tr>';
		}
		newRecord+='                                    </tbody>';
		newRecord+='                                </table>';
		 $('#SC-table-search-contact-body').html(newRecord); 
	}
		
    SCContactListOUIPR.prototype.EndLife = function () {
     SiebelAppFacade.SCContactListOUIPR.superclass.EndLife.apply(this, arguments);
    }

    return SCContactListOUIPR;
   }()
  );
  return "SiebelAppFacade.SCContactListOUIPR";
 })
}
