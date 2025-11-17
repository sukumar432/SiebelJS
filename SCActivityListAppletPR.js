/*
12-Oct-2018 GOPURX: Created for CHG0034367 to make status readonly of CTI activity during CTI session
*/
if (typeof(SiebelAppFacade.SCActivityListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCActivityListAppletPR");
 define("siebel/custom/SCActivityListAppletPR", ["siebel/jqgridrenderer"],
  function () {
   SiebelAppFacade.SCActivityListAppletPR = (function () {
	
	var sCTIActivityId="",appletSequence="",thispm,sActiveName="";
	
	function SCActivityListAppletPR(pm) {
     SiebelAppFacade.SCActivityListAppletPR.superclass.constructor.apply(this, arguments);
	}
	SiebelJS.Extend(SCActivityListAppletPR, SiebelAppFacade.JQGridRenderer);

	SCActivityListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCActivityListAppletPR.superclass.Init.apply(this, arguments);
		 var appletId = this.GetPM().Get("GetFullId");
		 appletSequence = appletId[appletId.length - 1];
		 sActiveName=SiebelApp.S_App.GetActiveView().GetName();
		 var inPS  = SiebelApp.S_App.NewPropertySet();
		 var outPS = SiebelApp.S_App.NewPropertySet();
		 var Bservice="";
		 Bservice = SiebelApp.S_App.GetService("Communications Client"); //get service
		 outPS = Bservice.InvokeMethod("GetSelectedWorkItemInfo",inPS); //invoke the method
		 //SiebelJS.Log("childcount"+JSON.stringify(outPS.GetChild(0).GetProperty("WorkObjectID")));
		 sCTIActivityId= outPS.GetChild(0).GetProperty("WorkObjectID");
		 thispm=this.GetPM();
	}

    SCActivityListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCActivityListAppletPR.superclass.ShowUI.apply(this, arguments);
	 try{
		$("[name="+this.GetPM().Get( "GetControls" )[ "ActivityId" ].GetInputName()+"]").css('visibility', 'hidden');
	 }
	 catch(e){
		 console.log(e);
	 }
		//SiebelJS.Log(JSON.stringify(this.GetPM().Get( "GetControls" )));
		//SiebelJS.Log('in bind rowid'+rowid);
    }

    SCActivityListAppletPR.prototype.BindData = function (bRefresh) {
		var rowid="";
		SiebelAppFacade.SCActivityListAppletPR.superclass.BindData.apply(this, arguments);
	 
		 $("#s_"+appletSequence+"_l tr").click(function(e) {
			rowid = $(this).attr("id");
			setTimeout(function() {
			var controls = thispm.Get( "GetControls" );
			var sCurrActId;
			try{
			sCurrActId=$("[name="+thispm.Get( "GetControls" )[ "ActivityId" ].GetInputName()+"]").val();
			}
			catch(e){
				console.log(e);
			}
			var sCurrActType=thispm.ExecuteMethod("GetFieldValue", controls[ "Type" ]);
			//SiebelJS.Log('sCurrActId'+sCurrActId);
			//SiebelJS.Log('in bind rowid'+rowid);
			//sCTIActivityId="1-C1M0Q41";
			//Spatiban:05/05/21:Updated below code for #STRY0034436
			if( (sCTIActivityId===sCurrActId) ||((sActiveName=="All Activity List View" || sActiveName=="Activity List View" || sActiveName=="Manager's Activity List View" || sActiveName=="Activity To Do List View" || sActiveName=="Delegated Activity List View" || sActiveName=="SC FSC All Activity List View" || sActiveName=="Activity Default Chart View" || sActiveName=="Other's Activity List View") && (sCurrActType=="SMS" || sCurrActType=="Delivery" || sCurrActType=="Time Frame Call"))) {
				$('#'+rowid+'_Status').attr('readonly', true);
				$('#'+rowid+'_Status').prop("disabled", true);
				//SPATIBAN:26-SEP-19:Added below code for to make Activity type readonly of CTI generated activity during CTI session
				$('#'+rowid+'_Type').attr('readonly', true);
				$('#'+rowid+'_Type').prop("disabled", true);
			}
			},0)
		 });
    }

    SCActivityListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCActivityListAppletPR.superclass.BindEvents.apply(this, arguments);
	}

    SCActivityListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCActivityListAppletPR.superclass.EndLife.apply(this, arguments);
    }
	
	return SCActivityListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCActivityListAppletPR";
 })
}