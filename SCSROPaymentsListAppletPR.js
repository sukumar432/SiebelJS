
if (typeof(SiebelAppFacade.SCSROPaymentsListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCSROPaymentsListAppletPR");
 define("siebel/custom/SCSROPaymentsListAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/bootstrap.min.js", "siebel/custom/SelectComfort/jquery.validate.min"],
  function () {
   SiebelAppFacade.SCSROPaymentsListAppletPR = (function () {
	
	
	
	function SCSROPaymentsListAppletPR(pm) {
     SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.constructor.apply(this, arguments);
	}
	SiebelJS.Extend(SCSROPaymentsListAppletPR, SiebelAppFacade.JQGridRenderer);

	SCSROPaymentsListAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.Init.apply(this, arguments);
		
		if(!document.getElementById("#SC-AccoutLookup-popup")){
			var PaymentsMarkup="";
			PaymentsMarkup=LoadPaymentsMarkup();
			$("#_sweclient").append(PaymentsMarkup);
		}   
	}

    SCSROPaymentsListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.ShowUI.apply(this, arguments);
	 		

    }

    SCSROPaymentsListAppletPR.prototype.BindData = function (bRefresh) {
		
		SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.BindData.apply(this, arguments);

    }

    SCSROPaymentsListAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.BindEvents.apply(this, arguments);
		
		  var PaymentsPM=this.GetPM();
		  var controls =  this.GetPM().Get( "GetControls" );
	      var AccountLookup = controls[ "SC Btn Account Lookup" ];	
	      $("#" + AccountLookup.GetInputName() + "_Ctrl").on('click', function(e){
			var orderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[PaymentsPM.GetObjName()].GetBusComp().GetParentBuscomp();
			
				$("#SC-AccoutLookup-popup").modal({
					backdrop: 'static'
				});
				$("#SC-AccoutLookup-popup").css({
					"display": "flex",
					"justify-content": "center",
					"align-items": "center"
				});
				$(".modal-backdrop").css('background', '#ffffff');
				$(".fin-set1").parent().hide();
				$(".fin-set2").parent().show();
				$("#fin-lookupMethod").val('Phone');
				$("#fin-phoneNumber").val(orderBC.GetFieldValue("SC Preferred Contact").replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
				$("#fin-firstName").val(orderBC.GetFieldValue("Primary Bill To First Name"));
				$("#fin-lastName").val(orderBC.GetFieldValue("Primary Bill To Last Name"));
				$("#fin-zipCode").val(orderBC.GetFieldValue("Primary Bill To Postal Code").split("-")[0]);
				$("#fin-ssn4").val("");
		});
		$("#sc-fin-lookup-close").click( function(e) {
			$("#SC-AccoutLookup-popup").modal('hide');
			$("#SC-AccoutLookup-popup").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
		});
				
		$("#SC-FinLookup-Cancel").click( function(e) {
			$("#SC-AccoutLookup-popup").modal('hide');
			$("#SC-AccoutLookup-popup").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
		});
		$("#SC-FinLookup-Submit").click( function(e) {
			$("#sc-fin-Acc-Lookup-Details").submit();
		});
		$("#SC-FinLookup-Accept").click( function(e) {
			if(SiebelApp.S_App.GetActiveView().GetName()=="SC Order Entry - Payment View - Admin"){
				var AccNumControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Admin"].GetControls()["AccountNumber"];
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Detail - Admin"].GetPModel().ExecuteMethod("SetFormattedValue", AccNumControl,$("#sn-fin-AccNumber").val());
			}else{
			var AccNumControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Details - Financing"].GetControls()["Payment Account Number"];
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Payment Details - Financing"].GetPModel().ExecuteMethod("SetFormattedValue", AccNumControl,$("#sn-fin-AccNumber").val());
			}
			
			$("#SC-AccoutLookup-Response").modal('hide');
			$("#SC-AccoutLookup-Response").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
		});
		$("#SC-FinLookup-Reject").click( function(e) {
			$("#SC-AccoutLookup-Response").modal('hide');
			$("#SC-AccoutLookup-Response").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
			
			$("#SC-AccoutLookup-popup").modal({
				backdrop: 'static'
			});
			$("#SC-AccoutLookup-popup").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$(".modal-backdrop").css('background', '#ffffff');
			
		});
		$("#SC-SYNAccLookup-NotFound-ok").click( function(e) {
			$("#SC-SYNAccLookup-NotFound").modal('hide');
			$("#SC-SYNAccLookup-NotFound").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
			
			$("#SC-AccoutLookup-popup").modal({
				backdrop: 'static'
			});
			$("#SC-AccoutLookup-popup").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$(".modal-backdrop").css('background', '#ffffff');
			
		});
		$("#SC-SYNAccLookup-Error-ok").click( function(e) {
			$("#SC-SYNAccLookup-Error").modal('hide');
			$("#SC-SYNAccLookup-Error").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});
			
			$("#SC-AccoutLookup-popup").modal({
				backdrop: 'static'
			});
			$("#SC-AccoutLookup-popup").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$(".modal-backdrop").css('background', '#ffffff');
			
		});
		//Start:submit handler for Finance Account Lookup
			jQuery.validator.addMethod(
					"regex",
						function(value, element, regexp) 
						{
							if (regexp.constructor != RegExp)
								regexp = new RegExp(regexp);
							else if (regexp.global)
								regexp.lastIndex = 0;
							return this.optional(element) || regexp.test(value);
						},
						""
					 );	
			$("#sc-fin-Acc-Lookup-Details").validate({
				rules: {
					finfirstName: { required: true, maxlength: 25 },
					finlastName: { required: true, maxlength: 25 },
					finssn4: { required: true, minlength: 4, maxlength: 4, regex: /^\d{4}$/ },
					finzipCode: { required: true, minlength: 5, maxlength: 5,  regex: /^\d{5}$/  },
					finphoneNumber: { required: true, regex: /^\d{3}-\d{3}-\d{4}$/ }
				},
				messages: {
					finfirstName: {
						required: "First name is required.",
						maxlength: "First name should not exceed 25 characters."
					},
					finlastName: {
						required: "Last name is required.",
						maxlength: "Last name should not exceed 25 characters."
					},
					finzipCode: {
						required: "Zip code is required.",
						minlength: "Zip code should have 5 digits.",
						maxlength: "Zip code should have 5 digits.",
						regex: "Input is not valid. Please enter exactly five digits."
					},
					finphoneNumber: {
						required: "Phone number is required.",
						regex: "Phone number format is invalid. Should be like XXX-XXX-XXXX."
					},
					finssn4: {
						required: "SSN last 4 digits are required.",
						minlength: "SSN should have 4 digits.",
						maxlength: "SSN should have 4 digits.",
						regex: "Input is not valid. Please enter exactly four digits."
					},
				},
				tooltip_options: {
					finfirstName: { trigger: 'focus', placement: 'bottom', html: true },
					finlastName: { trigger: 'focus', placement: 'bottom', html: true },
					finzipCode: { trigger: 'focus', placement: 'bottom', html: true },
					finphoneNumber: { trigger: 'focus', placement: 'bottom', html: true },
					finssn4: { trigger: 'focus', placement: 'bottom', html: true }
				},
				submitHandler: function(form) {
					$("#SC-AccoutLookup-popup").modal('hide');
					
					var BService = SiebelApp.S_App.GetService("PRM ANI Utility Service");
					var Input = SiebelApp.S_App.NewPropertySet();
					var GetSyfAccDetailsReqOut = SiebelApp.S_App.NewPropertySet();
					Input.SetProperty("Hierarchy Name", "GetSyfAccountDetailsRequest");
					GetSyfAccDetailsReqOut = BService.InvokeMethod("CreateEmptyPropSet", Input);
					
					var GetSyfAccDetailsReqIOIn = GetSyfAccDetailsReqOut.GetChild(0).GetChild(0).GetChild(0).GetChild(0);
					if(GetSyfAccDetailsReqIOIn.GetType() == "GetSyfAccountDetailsRequest"){
						if($("#fin-lookupMethod").val()!="Phone"){
							GetSyfAccDetailsReqIOIn.SetProperty("firstName", $("#fin-firstName").val());
							GetSyfAccDetailsReqIOIn.SetProperty("lastName", $("#fin-lastName").val());
							GetSyfAccDetailsReqIOIn.SetProperty("ssn4", $("#fin-ssn4").val());
							GetSyfAccDetailsReqIOIn.SetProperty("zipCode", $("#fin-zipCode").val());
						}else{
							GetSyfAccDetailsReqIOIn.SetProperty("phoneNumber", $("#fin-phoneNumber").val().replace(/\D/g, ''));
						}
						GetSyfAccDetailsReqIOIn.SetProperty("merchantNumber", SiebelApp.S_App.GetProfileAttr("SCGEMerchantId"));
					}
					
					GetSyfAccDetailsReqOut = GetSyfAccDetailsReqOut.GetChild(0).GetChild(0);
					GetSyfAccDetailsReqOut.SetType("SiebelMessage");
					
					var WF_Service="",Input_BS="",Out_BS="";
					var scOrderLovValues=[],lovvalues="";
					WF_Service = SiebelApp.S_App.GetService("Workflow Process Manager");
					Input_BS = SiebelApp.S_App.NewPropertySet();
					Out_BS = SiebelApp.S_App.NewPropertySet();
					Input_BS.AddChild(GetSyfAccDetailsReqOut);
					Input_BS.SetProperty("ProcessName", "SN Get Finance Lookup Info");
					Out_BS = WF_Service.InvokeMethod("RunProcess", Input_BS);
					
					var wfOutput = Out_BS.GetChild(0);
					var errorcode = wfOutput.GetProperty("Error Code");
					var errormessage = wfOutput.GetProperty("Error Message");
					
					if(errormessage == null || errormessage == ""){
						$("#sn-fin-firstName").val(wfOutput.GetProperty("FirstName"));
						$("#sn-fin-AccNumber").val(wfOutput.GetProperty("AccountNumber"));
						var activationRequired = wfOutput.GetProperty("ActivationRequired");
						var statusValue = (activationRequired === "false") ? "Active" : "Inactive";
						$("#sn-fin-status").val(statusValue);
						$("#sn-fin-addrline1").val(wfOutput.GetProperty("AddressLine1"));
						$("#sn-fin-state").val(wfOutput.GetProperty("State"));
						$("#sn-fin-phn").val(wfOutput.GetProperty("PhoneNumber"));
						
						$("#sn-fin-lastName").val(wfOutput.GetProperty("LastName"));
						$("#sn-fin-CrdLimt").val(wfOutput.GetProperty("CreditLine"));
						$("#sn-fin-expirydate").val(wfOutput.GetProperty("ExpirationMonth") +"/"+ wfOutput.GetProperty("ExpirationYear"));
						$("#sn-fin-city").val(wfOutput.GetProperty("City"));
						$("#sn-fin-zipcode").val(wfOutput.GetProperty("ZipCode"));
						
						$("#SC-AccoutLookup-Response").modal({
							backdrop: 'static'
						});
						$("#SC-AccoutLookup-Response").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
					}else if(errormessage == "Account Not Found"){
						$("#SC-SYNAccLookup-NotFound").modal({
							backdrop: 'static'
						});
						$("#SC-SYNAccLookup-NotFound").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						document.getElementById("AccLookupResponse").textContent = "No Account was found. Please try again.";
						$(".modal-backdrop").css('background', '#ffffff');
					}else if(errormessage == "Accounts closed"){
						$("#SC-SYNAccLookup-NotFound").modal({
							backdrop: 'static'
						});
						$("#SC-SYNAccLookup-NotFound").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						document.getElementById("AccLookupResponse").textContent = "Synchrony Private Label Account has been closed.  Please either apply for a new Sleep Number Synchrony account or contact Synchrony for any concerns.";
						$(".modal-backdrop").css('background', '#ffffff');
					}else{
						$("#SC-SYNAccLookup-Error").modal({
							backdrop: 'static'
						});
						$("#SC-SYNAccLookup-Error").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						});
						$(".modal-backdrop").css('background', '#ffffff');
					}
				}
			});
			//End:submit handler for Finance Account Lookup
				
			$("#fin-lookupMethod").change( function(e) {
				if($("#fin-lookupMethod").val()=="Phone"){
					$(".fin-set1").parent().hide();
					$(".fin-set2").parent().show();
				}
				else{
					$(".fin-set2").parent().hide();
					$(".fin-set1").parent().show();
				}
			});
	}

    SCSROPaymentsListAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCSROPaymentsListAppletPR.superclass.EndLife.apply(this, arguments);
    }
	function LoadPaymentsMarkup(){
		var PaymentsMarkup="";
			PaymentsMarkup+=' <div id="applet1">';
            PaymentsMarkup+='<div class="modal fade SC-S-sneakpeak" id="SC-AccoutLookup-popup" role="dialog">';
			PaymentsMarkup+='	<div class="modal-dialog search-modal-width sr-width">';
			PaymentsMarkup+='		<div class="modal-content sr-width">';
			PaymentsMarkup+='			<div class="modal-header add-height">';
			PaymentsMarkup+='				<button type="button" class="close" data-dismiss="modal" id="sc-fin-lookup-close">×</button>';
			PaymentsMarkup+='				<div class="header-content SC-header-start">';
			PaymentsMarkup+='					<div class="SC-S-image-container">';
			PaymentsMarkup+='						<img src="images/custom/sc-logo.png">';
			PaymentsMarkup+='					</div>';
			PaymentsMarkup+='					<div class="SC-S-details-container">';
			PaymentsMarkup+='						<p class="name no-margin">Synchrony Account Lookup</p>';
			PaymentsMarkup+='					</div>';
			PaymentsMarkup+='				</div>';
			PaymentsMarkup+='			</div>';
			PaymentsMarkup+= '			<div class="modal-body no-padding" style="margin-top: 25px;!important">';
			PaymentsMarkup+='				<form name="FinanceAccountLookupDetails" id="sc-fin-Acc-Lookup-Details">';
			PaymentsMarkup += '				<div class="row no-margin clearfix">';
			PaymentsMarkup+='                <div>';
			PaymentsMarkup+='                    <div class="col-sm-2 col-md-2 col-lg-2 col-xs-12" style="margin-bottom: 25px">';
			PaymentsMarkup+='                        <label for="lookupMethod" class="SC-label mandatory" style="height:2rem">Lookup Method</label>';
			PaymentsMarkup+='                    </div>';
			PaymentsMarkup+='                    <div class="col-sm-6 col-md-6 col-lg-6 col-xs-12" style="margin-bottom: 25px">';
			PaymentsMarkup+='                        <select class="select-box con-select-box margin-top valid" id="fin-lookupMethod" name="lookupMethod" style="width:100% !important; height:2rem">';
			PaymentsMarkup+='                            <option id="method3" value="Phone">Phone Number</option>';
			PaymentsMarkup+='                            <option id="method2" value="4-SSN-Name-Zip">4-digit SSN, First Name, Last Name & Zip Code</option>';
			PaymentsMarkup+='                        </select>';
			PaymentsMarkup+='                    </div>';
			PaymentsMarkup+='                </div>';
			PaymentsMarkup += '					<div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="firstName" class="SC-label fin-set1 mandatory">First Name</label>';
			PaymentsMarkup += '							<input type="text" name="finfirstName" class="SC-input" id="fin-firstName">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="phoneNumber" class="SC-label fin-set2 mandatory">Phone Number</label>';
			PaymentsMarkup += '							<input type="text" name="finphoneNumber" class="SC-input" id="fin-phoneNumber">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="ssn4" class="SC-label fin-set1 mandatory">Last 4 Digits of SSN</label>';
			PaymentsMarkup += '							<input type="text" name="finssn4" class="SC-input" id="fin-ssn4">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '					</div>';
			PaymentsMarkup += '					<div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="lastName" class="SC-label fin-set1 mandatory">Last Name</label>';
			PaymentsMarkup += '							<input type="text" name="finlastName" class="SC-input" id="fin-lastName">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="zipCode" class="SC-label fin-set1 mandatory">Zip Code</label>';
			PaymentsMarkup += '							<input type="text" name="finzipCode" class="SC-input" id="fin-zipCode">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '					</div>';
			PaymentsMarkup += '				</div>';
			PaymentsMarkup += '				</form>';
			PaymentsMarkup += '			</div>';
			PaymentsMarkup+='			<div class="modal-footer sn-footer">';
			PaymentsMarkup+='				<div class="SC-button">';
			PaymentsMarkup+='					<button id="SC-FinLookup-Cancel" class="" style="margin-right: 10px;background: #F63;border: 1px solid #F63;">Cancel</button>';	
			PaymentsMarkup+='					<button id="SC-FinLookup-Submit" class="">Submit</button>';
			PaymentsMarkup+='				</div>';
			PaymentsMarkup+='			</div>';
			PaymentsMarkup+='		</div>';
			PaymentsMarkup+='	</div>';
			PaymentsMarkup+=' </div>';
			//Start:Code for Account Lookup Request
			PaymentsMarkup+='<div class="modal fade SC-S-sneakpeak" id="SC-AccoutLookup-Response" role="dialog">';
			PaymentsMarkup+='	<div class="modal-dialog search-modal-width sr-width" style="max-height: 730px !important;">';
			PaymentsMarkup+='		<div class="modal-content sr-width" style="max-height:730px !important;">';
			PaymentsMarkup+='			<div class="modal-header add-height">';
			PaymentsMarkup+='				<button type="button" class="close" data-dismiss="modal" id="sc-fin-lookup-close">×</button>';
			PaymentsMarkup+='				<div class="header-content SC-header-start">';
			PaymentsMarkup+='					<div class="SC-S-image-container">';
			PaymentsMarkup+='						<img src="images/custom/sc-logo.png">';
			PaymentsMarkup+='					</div>';
			PaymentsMarkup+='					<div class="SC-S-details-container">';
			PaymentsMarkup+='						<p class="name no-margin">Synchrony Account Lookup</p>';
			PaymentsMarkup+='					</div>';
			PaymentsMarkup+='				</div>';
			PaymentsMarkup+='			</div>';
			PaymentsMarkup+= '			<div class="modal-body no-padding" style="margin-top: 25px;!important">';
			PaymentsMarkup+= '			<div class="row no-margin clearfix">';
			PaymentsMarkup+='           	<div class="col-sm-2 col-md-2 col-lg-2 col-xs-12" style="margin-bottom: 25px">';
			PaymentsMarkup+='               	 <label for="lookupMethod" class="" style="height:2rem">Lookup Response</label>';
			PaymentsMarkup+='           	</div>';
			PaymentsMarkup+='           </div>';
			PaymentsMarkup += '				<div class="row no-margin clearfix">';
			PaymentsMarkup += '					<div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="firstName" class="SC-label">First Name</label>';
			PaymentsMarkup += '							<input type="text" name="firstName" class="SC-input SC-readonly" id="sn-fin-firstName">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="AccNumber" class="SC-label">Account Number </label>';
			PaymentsMarkup += '							<input type="text" name="AccNumber" class="SC-input SC-readonly" id="sn-fin-AccNumber">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="status" class="SC-label">Account Status</label>';
			PaymentsMarkup += '							<input type="text" name="status" class="SC-input SC-readonly" id="sn-fin-status">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="addrline1" class="SC-label">Address Line 1</label>';
			PaymentsMarkup += '							<input type="text" name="addrline1" class="SC-input SC-readonly" id="sn-fin-addrline1">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="state" class="SC-label">State</label>';
			PaymentsMarkup += '							<input type="text" name="state" class="SC-input SC-readonly" id="sn-fin-state">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="phn" class="SC-label">Phone Number</label>';
			PaymentsMarkup += '							<input type="text" name="phn" class="SC-input SC-readonly" id="sn-fin-phn">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '					</div>';
			PaymentsMarkup += '					<div class="col-sm-6 col-md-6 col-lg-6 col-xs-12">';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="lastName" class="SC-label">Last Name</label>';
			PaymentsMarkup += '							<input type="text" name="lastName" class="SC-input SC-readonly" id="sn-fin-lastName">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="zipCode" class="SC-label">Available Credit Limit</label>';
			PaymentsMarkup += '							<input type="text" name="zipCode" class="SC-input SC-readonly" id="sn-fin-CrdLimt">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="zipCode" class="SC-label">Expiry Date</label>';
			PaymentsMarkup += '							<input type="text" name="zipCode" class="SC-input SC-readonly" id="sn-fin-expirydate">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="city" class="SC-label">City</label>';
			PaymentsMarkup += '							<input type="text" name="city" class="SC-input SC-readonly" id="sn-fin-city">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '						<div class="SC-input-container is-active is-completed">';
			PaymentsMarkup += '							<label for="zipcode" class="SC-label">ZipCode</label>';
			PaymentsMarkup += '							<input type="text" name="zipcode" class="SC-input SC-readonly" id="sn-fin-zipcode">';
			PaymentsMarkup += '						</div>';
			PaymentsMarkup += '					</div>';
			PaymentsMarkup += '				</div>';
			PaymentsMarkup += '			</div>';
			PaymentsMarkup+='			<div class="modal-footer sn-footer">';
			PaymentsMarkup+='				<div class="SC-button">';
			PaymentsMarkup+='					<button id="SC-FinLookup-Reject" class="" style="margin-right: 10px;background: #F63;border: 1px solid #F63;">Reject</button>';	
			PaymentsMarkup+='					<button id="SC-FinLookup-Accept" class="">Accept</button>';
			PaymentsMarkup+='				</div>';
			PaymentsMarkup+='			</div>';
			PaymentsMarkup+='		</div>';
			PaymentsMarkup+='	</div>';
			PaymentsMarkup+=' </div>';
			//End:Code for Account Lookup Request
			//Start:Synchrony Account lookup NotFound popup starts here
			PaymentsMarkup+='<div class="modal fade SC-SO-add-popup" id="SC-SYNAccLookup-NotFound" role="dialog">';
            PaymentsMarkup+='    <div class="SC-modal modal-orange-bg">';
            PaymentsMarkup+='        <div class="modal-dialog">';
            PaymentsMarkup+='            <div class="modal-content less-height">';
            PaymentsMarkup+='               <div class="text">';
            PaymentsMarkup+='                   <span id ="AccLookupResponse" class="SC-span-width add-margin"></span>';
            PaymentsMarkup+='                    <button class="SC-ok-button" id="SC-SYNAccLookup-NotFound-ok">ok</button>';
            PaymentsMarkup+='                </div>';
            PaymentsMarkup+='           </div>';
            PaymentsMarkup+='       </div>';
            PaymentsMarkup+='    </div>';
            PaymentsMarkup+='</div>';
			//End:Synchrony Account lookup NotFound popup starts here
			//Start:Synchrony Account lookup Error popup starts here
			PaymentsMarkup+='<div class="modal fade SC-SO-add-popup" id="SC-SYNAccLookup-Error" role="dialog">';
            PaymentsMarkup+='    <div class="SC-modal modal-orange-bg">';
            PaymentsMarkup+='        <div class="modal-dialog">';
            PaymentsMarkup+='            <div class="modal-content less-height">';
            PaymentsMarkup+='               <div class="text">';
            PaymentsMarkup+='                   <span class="SC-span-width add-margin">Error in SYF Account Lookup Process. Please try again.<span>';
            PaymentsMarkup+='                    <button class="SC-ok-button" id="SC-SYNAccLookup-Error-ok">ok</button>';
            PaymentsMarkup+='                </div>';
            PaymentsMarkup+='           </div>';
            PaymentsMarkup+='       </div>';
            PaymentsMarkup+='    </div>';
            PaymentsMarkup+='</div>';
			//End:Synchrony Account lookup NotFound popup starts here
			PaymentsMarkup+=' </div>';
			return PaymentsMarkup;
			
       }
	return SCSROPaymentsListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCSROPaymentsListAppletPR";
 })
}