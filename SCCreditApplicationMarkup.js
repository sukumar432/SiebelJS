if (typeof(SiebelApp.SCCreditApplicationMarkup) === "undefined") {
 SiebelJS.Namespace("SiebelApp.SCCreditApplicationMarkup");
 define("siebel/custom/SelectComfort/SCCreditApplicationMarkup", ["siebel/phyrenderer","siebel/custom/SelectComfort/bootstrap.min"],
  function () {
   SiebelApp.SCCreditApplicationMarkup = (function ()  {
 var CreditAppMarkup=new SCCreditApplicationMarkup();
 	
    function SCCreditApplicationMarkup(pm) {}
	//SiebelJS.Log("in markup");
 
	SCCreditApplicationMarkup.prototype.SCCreditApp_RootMarkup=function(){
		 var markup=""; 		
			markup+='<div id="applet1">';
			
				//START OF 1ST ROOT
				markup+='<div class="container-fluid no-margin no-padding">';
				    markup+='<div class="main-header-container" id="SC-CreditApp-Header">';
					markup+='<div class="nav-header">'; //comment this if SC_OUI_MARKUPS is not using
					markup+='</div>';//comment this if SC_OUI_MARKUPS is not using
					markup+='</div>'; //close of header
					markup+='<div class="container-fluid no-margin sc-main-data-container SC-data-container extra-padding no-recents" id="SC-CreditApp-HistoryBody">';
					markup+='</div>';
				markup+='</div>'; 
				//END OF 1ST ROOT
				
				//START OF 2nd ROOT
				markup+='<div class="modal fade aff-manual-update" id="aff-manual-update" role="dialog">';
				markup+='</div>'; 
				//CLOSE OF 2nd ROOT
				
				//START OF 3rd ROOT
				markup+='<div class="modal fade SC-add-storelocation" id="SC-add-storelocation" role="dialog">';
				markup+='</div>';
				//END OF 3rd ROOT
				
				//Added by APRAKASH for SFSTRY0001706
				//START OF 4th ROOT
                markup+='<div class="modal fade SC-SO-add-popup" id="SC-RESUBMIT-FINAPP" role="dialog">';
				markup+='</div>';
				//END OF 4th ROOT
				
			markup+='</div>';//Applet Close
		 
		 return markup;
	 };
			 
			 
 
		 SCCreditApplicationMarkup.prototype.SCHeaderMarkup=function(){
			 var headerMarkup= "";
				//headerMarkup+='<div class="nav-header">';//Uncomment this if SC_OUI_MARKUPS is not using
                    headerMarkup+='<div class="logo-block">';
                        headerMarkup+='<div class="logo">';
                            headerMarkup+='<img src="images/custom/sleepnumber.png">';
                        headerMarkup+='</div>';
                    headerMarkup+='</div>';
                    headerMarkup+='<div class="nav-block">';
                        headerMarkup+='<ul>';
                            headerMarkup+='<li>Home</li>';
                            headerMarkup+='<li>Contacts</li>';
                            headerMarkup+='<li>Accounts</li>';
                            headerMarkup+='<li>Sales Order</li>';
                        headerMarkup+='</ul>';
                    headerMarkup+='</div>';
                    headerMarkup+='<div class="profile-block">';
                        headerMarkup+='<div class="add-contact" id="SC-add-contact-btn">';
                            headerMarkup+='<div class="image-block account">';
                                headerMarkup+='<img src="images/custom/fileboard_plus.png" class="credit-app" />';
                            headerMarkup+='</div>';
                            headerMarkup+='<span>New Application</span>';
                        headerMarkup+='</div>';
                        headerMarkup+='<div class="profile">';
                            headerMarkup+='<div class="image-block">';
                                headerMarkup+='<img src="images/custom/profile.png" class="profile-icon">';
                            headerMarkup+='</div>';
                            headerMarkup+='<span>John Doe</span>';
                        headerMarkup+='</div>';
                    headerMarkup+='</div>';
                //headerMarkup+='</div>';//Uncomment this if SC_OUI_MARKUPS is not using
			 return headerMarkup;
		 };
		 
		 
		 SCCreditApplicationMarkup.prototype.SCDataContainer=function(){
			var DC_markup= "";
				DC_markup+='<div class="sc-aff-application-status" id="SC-CreditApp-Status">';
                    DC_markup+='<p class="no-margin">application status for <span id="SC-CreditApp-CustName">Leeloo Dallas - </span><span id="SC-CreditApp-CustNum">3143543513</span></p>';
                    DC_markup+='<p class="no-margin" id="SC-CA-Location">Beverly Hills North</p>';
                DC_markup+='</div>';
                DC_markup+='<div class="SC-table-with-scroll-main" id="SC-credit-history">';
                    DC_markup+='<table class="SC-table" id="SC-CA-HistoryTable">';
                        DC_markup+='<thead>';
                            DC_markup+='<tr>';
                                DC_markup+='<th>Customer Number</th>';
                                DC_markup+='<th>Customer Name</th>';
								//NGOLLA 10-05-2018 Removed this Filed from List
                               // DC_markup+='<th>Location</th>';
                                DC_markup+='<th>Application Date</th>';
                                DC_markup+='<th>Financing Partner</th>';
                                //DC_markup+='<th>Primary Applicant</th>';
								DC_markup+='<th>Application Status</th>';
								DC_markup+='<th>Account Number</th>';
                                DC_markup+='<th>Credit Line</th>';
                                DC_markup+='<th>Application Key</th>';
								DC_markup+='<th>CHANNEL - DEVICE</th>';
								DC_markup+='<th>STORE #</th>';
                            DC_markup+='</tr>';
                        DC_markup+='</thead>';
                        DC_markup+='<tbody id="SC-Credit-History">';
                            
                        DC_markup+='</tbody>';
                    DC_markup+='</table>';
                DC_markup+='</div>';
				
                DC_markup+='<div class="container">';
                    DC_markup+='<div class="pagination sc-pagination pull-right" id="SC-CA-Pagination">';
                        /* DC_markup+='<li><img src="images/previous-set.png" /></li>';
                        DC_markup+='<li><img src="images/previous.png" /></li>';
                        DC_markup+='<li><img src="images/next.png" /></li>';
                        DC_markup+='<li><img src="images/next-set.png" /></li>'; */
                    DC_markup+='</div>';
                DC_markup+='</div>';
				
                DC_markup+='<div class="SC-Credit-info">';
                 DC_markup+='<p class="app-info no-margin"> <b>Note:</b><br><span class="span1">1. Application Date indicates the date the credit application was originally run. If the application date is from three years ago or older, a new application may need to be run</span><br>';
                    DC_markup+='<span class="span2">2. Credit line indicates original credit amount provided; not the current open line of credit</span></p>';
                 DC_markup+='</div>';
            
			return DC_markup;
		 };
		 
 
		 SCCreditApplicationMarkup.prototype.SCModalHeader=function(){
			 var manual_Update_Markup= "";
				manual_Update_Markup+='<div class="modal-dialog">';
                //<!-- Modal content-->
                manual_Update_Markup+='<div class="modal-content">';
                    manual_Update_Markup+='<div class="modal-header">';
                        manual_Update_Markup+='<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SC-CA-manualUpdate-close">&times;</button>';
                        manual_Update_Markup+='<div class="header-content">';
                            manual_Update_Markup+='<p>Application Details</p>';
                        manual_Update_Markup+='</div>';
                        manual_Update_Markup+='<div class="manual-info">';
                            manual_Update_Markup+='<p> Leverage this page to load a credit line increase or if you need to update the customer credit application from pending status.</p>';
                        manual_Update_Markup+='</div>';
                    manual_Update_Markup+='</div>';
                    manual_Update_Markup+='<form name="aff-manual-update-form">';
                        manual_Update_Markup+='<div class="modal-body clearfix">';

                            manual_Update_Markup+='<div class="row no-margin">';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">partner:</label>';
                                        manual_Update_Markup+='<label class="value" id="SC-CA-Patner">Helpcard</label>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">please call:</label>';
                                        manual_Update_Markup+='<label class="value" id="SC-CA-Mobile">1-877-813-8733</label>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">merchant number:</label>';
                                        manual_Update_Markup+='<label class="value" id="SC-CA-MerchantNumber">789653241</label>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                            manual_Update_Markup+='</div>';
                            manual_Update_Markup+='<div class="row no-margin">';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">customer number:</label>';
                                        manual_Update_Markup+='<label class="value" id="SC-CA-CustomerNumb">7896325416</label>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">customer name:</label>';
                                        manual_Update_Markup+='<label class="value" id="SC-CA-CustName">Mohan Reddy</label>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                            manual_Update_Markup+='</div>';
                            manual_Update_Markup+='<div class="row no-margin">';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">account number:</label>';
                                        manual_Update_Markup+='<input type="text" name="SC-CA-AccNumber" class="aff-input extra" id="SC-CA-AccNumber" disabled>';
                                        manual_Update_Markup+=' </div>';
                                manual_Update_Markup+='</div>';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">credit limit:</label>';
                                        manual_Update_Markup+='<input type="text" name="" class="aff-input extra" id="SC-CA-CreditLimit">';
                                        manual_Update_Markup+='<span class="currency">$</span>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                                manual_Update_Markup+='<div class="col-md-4 col-lg-4 col-sm-4">';
                                    manual_Update_Markup+='<div class="aff-value-container">';
                                        manual_Update_Markup+='<label class="label">status:</label>';
                                        manual_Update_Markup+='<select class="aff-input" id="SC-CA-Status">';
                                            manual_Update_Markup+='</select>';
                                    manual_Update_Markup+='</div>';
                                manual_Update_Markup+='</div>';
                            manual_Update_Markup+='</div>';
                        manual_Update_Markup+='</div>';
                    manual_Update_Markup+='</form>';
                    manual_Update_Markup+='<div class="modal-footer">';
                        manual_Update_Markup+='<div class="SC-single-button-container no-padding">';
                            manual_Update_Markup+='<button class="submit" id="SC-CA-ManualUpdate-Save">Save</button>';
                        manual_Update_Markup+='</div>';
                    manual_Update_Markup+='</div>';
                manual_Update_Markup+='</div>';
            manual_Update_Markup+='</div>';
			
			return manual_Update_Markup;
		 };
		 
 
		 SCCreditApplicationMarkup.prototype.SCFinanceHeaderMarkup=function(){
			var headermarkup="";
				/* headermarkup+='<html>';
				headermarkup+='<head>';
				headermarkup+='</head>';
				headermarkup+='<body class="no-margin no-padding">'; */
					//headermarkup+='<div id="applet1">';
						headermarkup+='<div class="container-fluid no-margin no-padding">';
							headermarkup+='<div class="main-header-container">';
								headermarkup+='<div class="nav-header">';
									headermarkup+='<div class="logo-block">';
										headermarkup+='<div class="logo">';
											headermarkup+='<img src="images/custom/sleepnumber.png">';
										headermarkup+='</div>';
									headermarkup+='</div>';
									headermarkup+='<div class="apply-for-finance">';
										headermarkup+='<img src="images/custom/status_apply_for_finance.png" />';
										headermarkup+='<p class="no-margin">Apply for Finance</p>';
									headermarkup+='</div>';
									headermarkup+='<div class="profile-block">';
										headermarkup+='<div class="profile">';
											headermarkup+='<div class="image-block finance-cancel-block">';
												headermarkup+='<img src="images/custom/icon-cancel.png" class="cancel-finance" id="SC-cancel-finance">';
											headermarkup+='</div>';
											headermarkup+='<span>Cancel</span>';
										headermarkup+='</div>';
									headermarkup+='</div>';
								headermarkup+='</div>';
							headermarkup+='</div>';
							headermarkup+='<div class="container-fluid no-margin sc-main-data-container SC-data-container no-recents">';
								headermarkup+='<div class="sc-apply-for-finance-main">';
								headermarkup+='</div>';
							headermarkup+='</div>';
						headermarkup+='</div>';
					//headermarkup+='</div>';
				//headermarkup+='<body>';
				return headermarkup;
				 
			 };
			
			
		 SCCreditApplicationMarkup.prototype.SCCreateNewfinanceMarkup=function(){
				var financemarkup="";
				
			financemarkup+='<div class="sc-apply-for-finance-left">';
				financemarkup+='<div class="sc-aff-step active" id="sc-aff-app">';
					financemarkup+='<img src="images/custom/not-completed.png">';
					financemarkup+='<p>Applicant</p>';
				financemarkup+='</div>';
				financemarkup+='<div class="sc-aff-step" style="display: none;" id="sc-aff-co-app">';
					financemarkup+='<img src="images/custom/not-completed.png">';
					financemarkup+='<p>Co-Applicant</p>';
				financemarkup+='</div>';
				financemarkup+='<div class="sc-aff-step" id="sc-aff-submit">';
					financemarkup+='<img src="images/custom/not-completed.png" id="sc-aff-submit">';
					financemarkup+='<p>Submit</p>';
				financemarkup+='</div>';
			financemarkup+='</div>';
			financemarkup+='<div class="sc-apply-for-finance-right">';
				financemarkup+='<form id="sc-req-credit-amunt">';
					financemarkup+='<div class="sc-apply-for-finance-right-top">';
						financemarkup+='<div class="sc-aff-req-amount" id="sc-requestedcredit">';
							financemarkup+='<p class="no-margin mandatory required">Requested Credit Amount</p>';
							financemarkup+='<span>$</span>';
							financemarkup+='<input type="text" id="reqcre" class="SC-req-amut" name="reqcredamu" tabindex="1" autofocus>';
						financemarkup+='</div>';
						financemarkup+='<div class="sc-aff-req-amount" style="display: none" id="reviewandsubmit">';
							financemarkup+='<p class="no-margin required rands">Review and Submit</p>';
						financemarkup+='</div>';
					financemarkup+='</div>';
				financemarkup+='</form>';
				financemarkup+='<div class="sc-apply-for-finance-right-bottom">';
					financemarkup+='<form name="apply-for-finance-applicant" id="sc-fcc-primary-applicant">';
						financemarkup+='<div class="row no-margin details-and-edit" id="SC-care-info" style="display: none">';
							financemarkup+='<p class="app-title app-info no-margin">Note: Carefully review all data entered for accuracy</p>';
						financemarkup+='</div>';
						financemarkup+='<div class="row no-margin details-and-edit">';
							financemarkup+='<p class="app-title no-margin">Applicant details</p>';
							financemarkup+='<p class="edit-details no-margin" id="edit-applicant-details" style="display: none">Edit</p>';
						financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-active is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory  required">First Name</label>';
								financemarkup+='<input type="text" name="firstname" class="SC-input SC-input-disabled" id="SC_FirstName" value=""  readonly>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-active is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Middle Initial</label>';
								financemarkup+='<input type="text" name="" class="SC-input SC-input-disabled" id="SC_MiddleInitial" value="" readonly>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-active is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label  mandatory required">Last Name</label>';
								financemarkup+='<input type="text" name="lastname" class="SC-input SC-input-disabled" id="SC_LastName" value="" readonly>';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
							financemarkup+='<div class="SC-input-container" id="SC-Address-block">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required"> Mailing Address</label>';
								financemarkup+='<input type="text" name="address" class="SC-input" id="SC_MailingAddress" value="">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Apt/Company/Suite</label>';
								financemarkup+='<input type="text" name="" class="SC-input" id="SC_Apt_Cmp">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">City</label>';
								financemarkup+='<input type="text" name="city" class="SC-input" id="SC_City" value="">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">State/Province</label>';
								financemarkup+='<select class="SC-input" autocomplete="off" id="SC_State" name="state">';
									//financemarkup+='                                             <option></option>'; 
								financemarkup+='</select>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Zip Code</label>';
								financemarkup+='<input type="text" name="zipcode" class="SC-input" id="SC_ZipCode" value="">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">How long at this residence?</label>';
								financemarkup+='<input type="text" name="hlatr" class="SC-input" id="SC_Residence">';
								financemarkup+='<span class="SC-hlatr-years">years</span>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Residential Status</label>';
								financemarkup+='<select class="SC-input" autocomplete="off" id="SC_Residental_Status" name="residentialstatus">';
								    financemarkup+='<option></option>';
									financemarkup+='<option>Rent</option>';
									financemarkup+='<option>Own</option>';
									financemarkup+='<option>Lease</option>';
								financemarkup+='</select>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Home Payment</label>';
								financemarkup+='<input type="text" name="monthlyhomepay" class="SC-input padding-for-currency" id="SC_Monthlypayement">';
								financemarkup+='<span class="currency">$</span>';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Phone Number Type</label>';
								//financemarkup+='<input type="text" name="primaryphone" class="SC-input" id="SC_PrimaryPhone" value="" maxlength="12">';
								financemarkup+='<select class="SC-input" autocomplete="off" id="Phonenumber_Type" name="phonenumbertype" title="Primary Phone">';
									financemarkup+='<option selected="selected" value="MobilePhone">Mobile Phone</option>';
									financemarkup+='<option disabled = true value="HomePhone">Home Phone</option>';
									financemarkup+='<option value="Workphone">Work Phone</option>';
								    financemarkup+='</select>'
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Phone Number</label>';
								financemarkup+='<input type="text" name="secondaryphone" class="SC-input" id="SC_SecondaryPhone" value="" maxlength="12">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label"> Alternate Phone Number Type</label>';
								//financemarkup+='<input type="text" name="primaryphone" class="SC-input" id="SC_AltPrimaryPhone" value="" maxlength="12">';
								financemarkup+='<select class="SC-input" autocomplete="off" id="AltPhonenumber_Type" name="phonenumbertype" title="Primary Phone">';
									financemarkup+='<option disabled = true value="MobilePhone">Mobile Phone</option>';
									financemarkup+='<option selected="selected" value="HomePhone">Home Phone</option>';
									financemarkup+='<option value="Workphone">Work Phone</option>';
								    financemarkup+='</select>'
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label"> Alternate Phone Number</label>';
								financemarkup+='<input type="text" name="altphone" class="SC-input" id="SC_AltSecondaryPhone" value="" maxlength="12">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						/*financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Employer</label>';
								financemarkup+='<input type="text" name="employer" id="SC_Employer" class="SC-input">';
							financemarkup+='</div>';
						financemarkup+='</div>';*/
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Email</label>';
								financemarkup+='<input type="text" name="email" class="SC-input" id="SC_Email" value="">';
							financemarkup+='</div>';
						financemarkup+='</div>';												
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Employer</label>';
								financemarkup+='<input type="text" name="employer" id="SC_Employer" class="SC-input">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container" id="SC-MonthlynetIncome-block">';
								financemarkup+='<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Net Income</label>';
								financemarkup+='<input type="text" name="monthlynetin" class="SC-input padding-for-currency" id="SC_MNI">';
								financemarkup+='<span class="currency">$</span>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container" id="SC-DB-block">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Date of Birth</label>';
								financemarkup+='<input type="text" name="birthdate" class="SC-input padding-for-currency" id="SC_DOB">';
								// financemarkup+='<img src="images/custom/calendar.png" class="calendar" id="SC_DOB_CAL">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Social Security Number</label>';
								financemarkup+='<input type="text" name="socialsecuritynumber" class="SC-input" maxlength="11" id="SC_SSN">';
								financemarkup+='<img src="images/custom/Info1.png" class="Info" id="sc-SocialSecurity-num">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix"  id="sc-sstootltip-num" style="display:none">';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			 </div>';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			 </div>';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			  <div class="SC-SSN-tooltip"><p id="sc-ssn-infotext"></p></div>';
					financemarkup+='			  </div>';
					financemarkup+='			 </div>';
					/* financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Nearest Relative</label>';
								financemarkup+='<input type="text" name="nearrel" class="SC-input" id="SC_NR">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Relative Phone Number</label>';
								financemarkup+='<input type="text" name="rephnum" class="SC-input" id="SC_RPN">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>'; */
					financemarkup+='<div class="sc-aff-footer-items" id="applicant-buttons">';
						financemarkup+='<button id="sc_goto_addcoapp" class="addcoappli">Add Co-Applicant</button>';
						financemarkup+='<button id="sc_goto_gotoreview" class="review pull-right">Next</button>';
					financemarkup+='</div>';
					financemarkup+='<div class="sc-aff-footer-items submit-container" id="submit-block-app" style="display: none">';
						financemarkup+='<div class="terms-and-conditions">';
							financemarkup+='<div class="SC-360-checkbox">';
								financemarkup+='<input type="checkbox" name="" id="app-tac" />';
								financemarkup+='<label for="app-tac" class="editable"></label>';
								financemarkup+='<div id="app-terms-error-block" class="terms-error-block" style="display: none">';
									financemarkup+='<p id="app-terms-error-text" class="alert alert-danger"></p>';
								financemarkup+='</div>';
							financemarkup+='</div>';
							financemarkup+='<label class="no-margin">I have read and accepted Terms and Conditions</label>';
						financemarkup+='</div>';
						financemarkup+='<button id="submit-app" disabled>Submit</button>';
					financemarkup+='</div>';
					financemarkup+='</form>';
					financemarkup+='<div class="SC-dark-line" id="SC-hr-line" style="display: none">';
						financemarkup+='<hr>';
					financemarkup+='</div>';
					financemarkup+='<form name="apply-for-finance-applicant" id="sc-fcc-co-applicant" style="display: none">';
						financemarkup+='<div class="row no-margin details-and-edit">';
							financemarkup+='<p class="app-title no-margin">Co-Applicant details</p>';
							financemarkup+='<p class="edit-details no-margin" id="edit-co-applicant-details" style="display: none">Edit</p>';
						financemarkup+='</div>';
						financemarkup+='<div class="row no-margin clearfix">';
							financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
								financemarkup+='<div class="SC-input-container">';
									financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">First Name</label>';
									financemarkup+='<input type="text" name="firstname" class="SC-input" id="Co_FirstName">';
								financemarkup+='</div>';
							financemarkup+='</div>';
							financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
								financemarkup+='<div class="SC-input-container">';
									financemarkup+='<label for="Do Not Call" class="SC-label">Middle Initial</label>';
									financemarkup+='<input type="text" name="middlename" class="SC-input" id="Co_MiddleInitial" maxlength="1">';
								financemarkup+='</div>';
							financemarkup+='</div>';
							financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
								financemarkup+='<div class="SC-input-container">';
									financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Last Name</label>';
									financemarkup+='<input type="text" name="lastname" class="SC-input" id="Co_LastName">';
								financemarkup+='</div>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="row no-margin clearfix" id="SC-address-info">';
							financemarkup+='<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
								financemarkup+='<div class="SC-input-container no-border-bottom">';
								financemarkup+='<label for="Do Not Call" class="SC-label display-label">Is the address same as that of primary applicant?</label>';
									financemarkup+='<div class="SC-360-checkbox">';
										financemarkup+='<input type="checkbox" name="" id="address" />';
										financemarkup+='<label for="address" class="SC-input editable" id="co-checkbox"></label>';
									financemarkup+='</div>';
								financemarkup+='</div>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="row no-margin clearfix" id="SC-Address">';
							financemarkup+='<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
								financemarkup+='<div class="SC-input-container">';
									financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Mailing Address</label>';
									financemarkup+='<input type="text" name="address" class="SC-input" id="Co_MailingAddr">';
								financemarkup+='</div>';
							financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label">Apt/Company/Suite</label>';
								financemarkup+='<input type="text" name="" class="SC-input" id="Co_Apt_Cmp">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix" id="SC-city">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">City</label>';
								financemarkup+='<input type="text" name="city" class="SC-input" id="Co_City">';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 ">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">State/Province</label>';
								financemarkup+='<select class="SC-input" autocomplete="off" name="state" id="Co_State">';
										//financemarkup+='                                                <option>Option1</option>';
								//financemarkup+='                                                <option>Option2</option>';
									//financemarkup+='                                                <option>Option3</option>';	
								financemarkup+='</select>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Zip Code</label>';
								financemarkup+='<input type="text" name="zipcode" class="SC-input" id="Co_ZipCode">';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Residential Status</label>';
								financemarkup+='<select class="SC-input" autocomplete="off" name="residentialstatus" id="Co_Residental_Status">';
									financemarkup+='<option></option>';
									financemarkup+='<option>Rent</option>';
									financemarkup+='<option>Own</option>';
									financemarkup+='<option>Lease</option>';
								financemarkup+='</select>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">How long at this residence?</label>';
								financemarkup+='<input type="text" name="hlatr" class="SC-input" id="Co_Residence">';
								financemarkup+='<span class="SC-hlatr-years">years</span>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup+='<div class="SC-input-container">';
								financemarkup+='<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Home Payment</label>';
								financemarkup+='<input type="text" name="monthlyhomepay" class="SC-input padding-for-currency" id="Co_MonthlyPay">';
								financemarkup+='<span class="currency">$</span>';
							financemarkup+='</div>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Phone Number Type</label>';
								//financemarkup+='<input type="text" name="phonenumbertype" class="SC-input" id="Co_Phonenumtype" maxlength="12">';
								financemarkup += '<select class="SC-input" autocomplete="off" id="Co_Phonenumtype" name="cophonenumbertype" title="Primary Phone">';
									financemarkup += '<option selected="selected" value="MobilePhone">Mobile Phone</option>';
									financemarkup += '<option disabled = true value="HomePhone">Home Phone</option>';
									financemarkup += '<option value="Workphone">Work Phone</option>';
								financemarkup += '</select>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup+='<div class="SC-input-container">';
							financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Phone Number</label>';
							financemarkup+='<input type="text" name="secondaryphone" class="SC-input" id="Co_SecondaryPhn" maxlength="12">';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup+='<div class="SC-input-container is-completed">';
								financemarkup+='<label for="Do Not Call" class="SC-label"> Alternate Phone Number Type</label>';
								//financemarkup+='<input type="text" name="primaryphone" class="SC-input" id="SC_CoAltPrimaryPhone" value="" maxlength="12">';
								financemarkup+='<select class="SC-input" autocomplete="off" id="AltCOPhonenumber_Type" name="phonenumbertype" title="Primary Phone">';
									financemarkup+='<option disabled = true value="MobilePhone">Mobile Phone</option>';
									financemarkup+='<option selected="selected" value="HomePhone">Home Phone</option>';
									financemarkup+='<option value="Workphone">Work Phone</option>';
								    financemarkup+='</select>'
							financemarkup+='</div>';
						financemarkup+='</div>';
				financemarkup+='</div>';
				financemarkup+='<div class="row no-margin clearfix">';
				financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup+='<div class="SC-input-container">';
							financemarkup+='<label for="Do Not Call" class="SC-label">Alternate Phone Number</label>';
							financemarkup+='<input type="text" name="altphone" class="SC-input" id="Co_AltSecondaryPhn" maxlength="12">';
						financemarkup+='</div>';
					financemarkup+='</div>';
					
				financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup+='<div class="SC-input-container">';
							financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Employer</label>';
							financemarkup+='<input type="text" name="employer" class="SC-input" id="Co_Emp">';
						financemarkup+='</div>';
					financemarkup+='</div>';
					
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup+='<div class="SC-input-container" id="SC-CO-app-MonthlyNet">';
							financemarkup+='<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Net Income</label>';
							financemarkup+='<input type="text" name="monthlynetin" class="SC-input padding-for-currency" id="Co_MNI">';
							financemarkup+='<span class="currency">$</span>';
						financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup+='<div class="row no-margin clearfix">';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup+='<div class="SC-input-container">';
							financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Date of Birth</label>';
							financemarkup+='<input type="text" name="birthdate" class="SC-input padding-for-currency" id="Co_DOB">';
							 //financemarkup+='<img src="images/custom/calendar.png" class="calendar" id="Co_DOB_CAL">';
						financemarkup+='</div>';
					financemarkup+='</div>';
						financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup+='<div class="SC-input-container">';
							financemarkup+='<label for="Do Not Call" class="SC-label mandatory required">Social Security Number</label>';
							financemarkup+='<input type="text" name="socialsecuritynumber" class="SC-input" maxlength="11"id="Co_SSN">';
							financemarkup+='<img src="images/custom/Info1.png" class="Info" id="sc-cosocialsecurity-num">';
						financemarkup+='</div>';
					financemarkup+='</div>';
				financemarkup+='</div>';
				financemarkup+='<div class="row no-margin clearfix"  id="sc-cosstootltip-num" style="display:none">';
				financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			 </div>';
					financemarkup+='			 <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			  <div class="SC-SSN-tooltip"><p id="sc-cossn-infotext"></p></div>';
					financemarkup+='			  </div>';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='			 </div>';
					
					
				   financemarkup+='			 </div>';
				financemarkup+='<div class="sc-aff-footer-items" id="next-step2">';
					financemarkup+='<button id="remvoe-co-applicant">Remove Co-Applicant</button>';
					financemarkup+='<button id="SC-coapplicant-next">Next</button>';
				financemarkup+='</div>';
				financemarkup+='</form>';
				financemarkup+='<div class="sc-aff-footer-items submit-container" id="submit-block-co-app" style="display: none">';
					financemarkup+='<div class="terms-and-conditions">';
						financemarkup+='<div class="SC-360-checkbox">';
							financemarkup+='<input type="checkbox" name="chename" id="co-tac" />';
							financemarkup+='<label for="co-tac" class="editable"></label>';
							financemarkup+='<div id="terms-error-block" class="terms-error-block" style="display: none">';
								financemarkup+='<p id="terms-error-text" class="alert alert-danger"></p>';
							financemarkup+='</div>';
						financemarkup+='</div>';
						financemarkup+='<label class="no-margin">I have read and accepted Terms and Conditions</label>';
					financemarkup+='</div>';
					financemarkup+='<button id="submit-aff" disabled>Submit</button>';
				financemarkup+='</div>';
			financemarkup+='</div>';
			financemarkup+='</div>';


				 return financemarkup;
				 
			 };
			 //Added by APRAKASH FOR SFSTRY0001706
			 SCCreditApplicationMarkup.prototype.SCFinPopupMarkup=function(){
				var finappMarkup= "";
				finappMarkup += '<div class="SC-modal">';                
				finappMarkup +=     '<div class="modal-dialog">';                  
				finappMarkup +=         '<div class="modal-content modal-another-color min-height">';                    
				finappMarkup +=             '<div>';
				finappMarkup +=                 '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal">×</button>';                            
				finappMarkup +=                 '<img src="images/custom/sc-logo.png">';                        
				finappMarkup +=             '</div>';                        
				finappMarkup +=             '<div class="text">';                            
				finappMarkup +=                 '<span class="SC-span-width add-margin">Original application has expired. Please submit a new financing application.</span>'; 
				finappMarkup +=                 '<button type="button" class="SC-ok-button pending-bg button-mt" data-dismiss="modal">OK</button>';
				finappMarkup +=             '</div>';
				finappMarkup +=         '</div>';            
				finappMarkup +=     '</div>';
				finappMarkup += '</div>';
				
				return finappMarkup;
			};
 
  return CreditAppMarkup;
   }()
  );
 return "SiebelApp.SCCreditApplicationMarkup";
 })
}
