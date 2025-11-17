/*
12-Oct-2018 GOPURX: Created for CHG0034367 to make status readonly of CTI activity during CTI session
*/
if (typeof(SiebelAppFacade.SCActivityFormAppletPR) === "undefined") {

	SiebelJS.Namespace("SiebelAppFacade.SCActivityFormAppletPR");

	define("siebel/custom/SCActivityFormAppletPR", ["siebel/phyrenderer"],
		function () {
		SiebelAppFacade.SCActivityFormAppletPR = (function () {
				var sCTIActivityId;
				function SCActivityFormAppletPR(pm) {
				SiebelAppFacade.SCActivityFormAppletPR.superclass.constructor.apply(this, arguments);
				this.GetPM().AddMethod( "ShowSelection",  SelectionChange, { sequence : false, scope : this } );
			}
			SiebelJS.Extend(SCActivityFormAppletPR, SiebelAppFacade.PhysicalRenderer);

			
			function SelectionChange(){
					var controls,StatusControl,sCurrActId,sBCReadOnly,TypeControl,sActTypeval,DoneFlag;
					controls = this.GetPM().Get( "GetControls" );
					StatusControl = controls[ "Status" ];
					TypeControl = controls[ "Type" ];
					DoneFlag=controls["Done Flag"];
					sCurrActId=$("[name="+controls[ "RowId" ].GetInputName()+"]").val();
					sBCReadOnly=$("[name="+controls[ "BCReadOnly" ].GetInputName()+"]").val();
					sActTypeval=$("[name="+controls[ "Type" ].GetInputName()+"]").val();
					//sCTIActivityId="1-C1M0Q41";
					//SiebelJS.Log("SCActivityFormAppletPR - SelectionChange: "+sCTIActivityId+"---"+sCurrActId );
					//Spatiban:05/05/21:Updated below code for #STRY0034436
					if( sCTIActivityId===sCurrActId || sBCReadOnly==='Y' || sActTypeval=="SMS" || sActTypeval=="Delivery" || sActTypeval=="Time Frame Call") {
						//SiebelJS.Log("SelectionChange-inside if"+StatusControl.GetInputName());
						$('[name="'+StatusControl.GetInputName()+'"]').attr('readonly', true);
						$('[name="'+StatusControl.GetInputName()+'"]').prop("disabled", true);
						//SPATIBAN:26-SEP-19:Added below code for to make Activity type readonly of CTI generated activity during CTI session
						$('[name="'+TypeControl.GetInputName()+'"]').attr('readonly', true);
						$('[name="'+TypeControl.GetInputName()+'"]').prop("disabled", true);
						$('[name="'+DoneFlag.GetInputName()+'"]').attr('readonly', true);
						$('[name="'+DoneFlag.GetInputName()+'"]').prop("disabled", true);
					}
					else
					{
						//var x=$('[name="'+StatusControl.GetInputName()+'"]').attr('readonly');
						//var y=$('[name="'+StatusControl.GetInputName()+'"]').prop("disabled");
						$('[name="'+StatusControl.GetInputName()+'"]').attr('readonly', false);
						$('[name="'+StatusControl.GetInputName()+'"]').prop("disabled", false);
						//SPATIBAN:26-SEP-19:Added below code for to make Activity type readonly of CTI generated activity during CTI session
						$('[name="'+TypeControl.GetInputName()+'"]').attr('readonly', false);
						$('[name="'+TypeControl.GetInputName()+'"]').prop("disabled", false);
						$('[name="'+DoneFlag.GetInputName()+'"]').attr('readonly', false);
						$('[name="'+DoneFlag.GetInputName()+'"]').prop("disabled", false);
					}
					
			}
			SCActivityFormAppletPR.prototype.Init = function () {
				SiebelAppFacade.SCActivityFormAppletPR.superclass.Init.apply(this, arguments);
				var inPS  = SiebelApp.S_App.NewPropertySet();
				var outPS = SiebelApp.S_App.NewPropertySet();
				var Bservice="";
				Bservice = SiebelApp.S_App.GetService("Communications Client"); //get service
				outPS = Bservice.InvokeMethod("GetSelectedWorkItemInfo",inPS); //invoke the method
				//SiebelJS.Log("childcount"+JSON.stringify(outPS.GetChild(0).GetProperty("WorkObjectID")));
				sCTIActivityId= outPS.GetChild(0).GetProperty("WorkObjectID");
			}

			SCActivityFormAppletPR.prototype.BindData = function (bRefresh) {
				SiebelAppFacade.SCActivityFormAppletPR.superclass.BindData.apply(this, arguments);
			}

			SCActivityFormAppletPR.prototype.ShowUI = function () {
				SiebelAppFacade.SCActivityFormAppletPR.superclass.ShowUI.apply(this, arguments);
				$("[name="+this.GetPM().Get( "GetControls" )[ "RowId" ].GetInputName()+"]").css('visibility', 'hidden');
				$("[name="+this.GetPM().Get( "GetControls" )[ "BCReadOnly" ].GetInputName()+"]").css('visibility', 'hidden');
				}

			SCActivityFormAppletPR.prototype.BindEvents = function (controlSet) {
				SiebelAppFacade.SCActivityFormAppletPR.superclass.BindEvents.apply(this);  
			}

			return SCActivityFormAppletPR;
		}
			());
		return "SiebelAppFacade.SCActivityFormAppletPR";
	});
}