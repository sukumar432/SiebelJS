if (typeof(SiebelAppFacade.SCCTIInfoPM) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCTIInfoPM");
 define("siebel/custom/SelectComfort/SCCTIInfoPM", ["siebel/listpmodel"],
  function () {
   SiebelAppFacade.SCCTIInfoPM = (function () {

    function SCCTIInfoPM(pm) {
     SiebelAppFacade.SCCTIInfoPM.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCCTIInfoPM, SiebelAppFacade.ListPresentationModel);

    SCCTIInfoPM.prototype.Init = function () {
     SiebelAppFacade.SCCTIInfoPM.superclass.Init.apply(this, arguments);
	 
	 SiebelJS.Log("SCANI...:"+SiebelApp.S_App.GetProfileAttr("SCANI"));
	 ActivityId = SiebelApp.S_App.GetProfileAttr("SCANI")
     this.AddProperty("CustomerNumber", "" );
	 this.AddProperty("ActivityId", "" );
	 this.AddProperty("ContactId", "" );
	}

    SCCTIInfoPM.prototype.Setup = function (propSet) {
     SiebelAppFacade.SCCTIInfoPM.superclass.Setup.apply(this, arguments);
     // Add code here that should happen after default processing
	 this.AddMethod("getCustomerNumber",
		function() {
			var controls = this.Get("GetControls");
			var control = controls["Customer Number"];
			var value = this.ExecuteMethod("GetFieldValue", control);
			CustomerNumber = value;
			SiebelJS.Log("Selected Customer Number...:"+CustomerNumber);
		}
	  );
	  
	 this.AddMethod("submitRecord",
		function() {
			ActivityId = SiebelApp.S_App.GetProfileAttr("CTI_ACT_ID");
			SiebelJS.Log("Selected Customer Number...:"+CustomerNumber);
			
			var Bservice1 = '',inPS1 = '', outPS1 = '';
			inPS1  = SiebelApp.S_App.NewPropertySet();
			outPS1 = SiebelApp.S_App.NewPropertySet();
			inPS1.SetProperty("BusObj","Contact");
			inPS1.SetProperty("BusComp","Contact");
			inPS1.SetProperty("Person UId",CustomerNumber);
			inPS1.SetProperty("QueryFields","Person UId");
			inPS1.SetProperty("ValueFields","Id");
			Bservice1 = SiebelApp.S_App.GetService("Inbound E-mail Database Operations");
			var output = Bservice1.InvokeMethod("FindRecord",inPS1);
			var child_Series = output.GetChild(0);
			ContactId = child_Series.GetProperty("Id");
			this.SetProperty("ContactId",ContactId);
			
			SiebelJS.Log("Selected Contact Id...:"+ContactId);
			
			var Bservice1 = '',inPS1 = '', outPS1 = '';
			inPS1  = SiebelApp.S_App.NewPropertySet();
			outPS1 = SiebelApp.S_App.NewPropertySet();
			inPS1.SetProperty("Select Contact Id",ContactId);
			inPS1.SetProperty("ProcessName","SC Contact CTI Activity Creation");
			Bservice1 = SiebelApp.S_App.GetService("Workflow Process Manager");
			var output = Bservice1.InvokeMethod("RunProcess",inPS1,outPS1);
			
			SiebelJS.Log("After setting the Primary Contact Id");
			
			
			var bsCTI = SiebelApp.S_App.GetService("Communications Client"); 
			var psInp = SiebelApp.S_App.NewPropertySet(); 
			var psOut = SiebelApp.S_App.NewPropertySet(); 
			
			psOut = bsCTI.InvokeMethod("GetSelectedWorkItemInfo", psInp); 
			var strWorkItmId = psOut.GetChild(0).GetProperty("WorkItemID"); 
			
			if(strWorkItmId !=  null || strWorkItmId != "" )
			{
				bsCTI = SiebelApp.S_App.GetService("Communications Session Manager"); 
				psInp = SiebelApp.S_App.NewPropertySet(); 
				psOut = SiebelApp.S_App.NewPropertySet();
				
				psInp.SetProperty("WorkItemID", strWorkItmId);
				psInp.SetProperty("ContactId", ContactId);
				
				psOut = bsCTI.InvokeMethod("SetWorkItemAttr", psInp);
				//Start:SPATIBAN:19-JAN-2023: Added below code for CTI enchanment
				var activityId = SiebelApp.S_App.GetProfileAttr("CTI_ACT_ID");
				if(activityId !=  null && activityId != "" && $("#sn-Verified").text()=="YES"){
					var BCTIservice = '',inPSCTI = '', outPSCTI = '';
					inPSCTI  = SiebelApp.S_App.NewPropertySet();
					outPS = SiebelApp.S_App.NewPropertySet();
					inPSCTI.SetProperty("BusObj","SC Simplified Action");
					inPSCTI.SetProperty("BusComp","SC Simplified Action");
					inPSCTI.SetProperty("Id",activityId);
					inPSCTI.SetProperty("Field: SN Verified","Y"); 
					BCTIservice = SiebelApp.S_App.GetService("Inbound E-mail Database Operations");
					BCTIservice.InvokeMethod("UpdateRecord",inPSCTI,outPSCTI);
				}
				//END:SPATIBAN:19-JAN-2023: Added below code for CTI enchanment
			}
			
			inPS  = SiebelApp.S_App.NewPropertySet();
			outPS = SiebelApp.S_App.NewPropertySet();
			inPS.SetProperty("Name","ALLOW_NAVIGATION");
			inPS.SetProperty("Value","Y");
		    Bservice = SiebelApp.S_App.GetService("SessionAccessService");
			Bservice.InvokeMethod("SetProfileAttr",inPS,outPS);
			
			SiebelJS.Log("After setting the ALLOW_NAVIGATION Attr");
		}
	  );
	  
	}

    return SCCTIInfoPM;
   }()
  );
  return "SiebelAppFacade.SCCTIInfoPM";
 })
}
