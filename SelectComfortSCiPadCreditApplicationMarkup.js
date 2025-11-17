if (typeof(SiebelApp.SCiPadCreditApplicationMarkup) === "undefined") {
    SiebelJS.Namespace("SiebelApp.SCiPadCreditApplicationMarkup");
    define("siebel/custom/SelectComfort/SCiPadCreditApplicationMarkup", ["siebel/phyrenderer", "siebel/custom/SelectComfort/bootstrap.min"],
        function() {
            SiebelApp.SCiPadCreditApplicationMarkup = (function() {
                var CreditAppMarkup = new SCiPadCreditApplicationMarkup();

                function SCiPadCreditApplicationMarkup(pm) {}
                //SiebelJS.Log("in markup");

                SCiPadCreditApplicationMarkup.prototype.SCCreditApp_RootMarkup = function() {
                    var markup = "";
                    markup += '<div id="applet1">';

                    //START OF 1ST ROOT
                    markup += '<div class="container-fluid no-margin no-padding">';
                    markup += '<div class="main-header-container" id="SC-CreditApp-Header">';
                    markup += '<div class="nav-header">'; //comment this if SC_OUI_MARKUPS is not using
                    markup += '</div>'; //comment this if SC_OUI_MARKUPS is not using
                    markup += '</div>'; //close of header
                    markup += '<div class="container-fluid no-margin sc-main-data-container SC-data-container extra-padding no-recents" id="SC-CreditApp-HistoryBody">';
					//markup += '<div class="container-fluid no-margin sc-main-data-container extra-padding no-recents" id="SC-CreditApp-HistoryBody">';
                    markup += '</div>';
                    markup += '</div>';
                    //END OF 1ST ROOT

                    //START OF 2nd ROOT
                    markup += '<div class="modal fade aff-manual-update" id="aff-manual-update" role="dialog">';
                    markup += '</div>';
                    //CLOSE OF 2nd ROOT

                    //START OF 3rd ROOT
                    markup += '<div class="modal fade SC-add-storelocation" id="SC-add-storelocation" role="dialog">';
                    markup += '</div>';
                    //END OF 3rd ROOT

                    //SNARRA 26-07-2019 Added code for finance popups

                    markup += '<div class="modal fade SC-SO-add-popup" id="SC-finance-join" role="dialog">';
                    markup += ' <div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += ' <div class="modal-content modal-another-color">';
                    markup += '<div>';
                    markup += '<img src="images/custom/sc-logo.png" class="sc-order-icon">';
                    markup += '</div>';
                    markup += '<div class="text">';
                    markup += ' <span class="add-margin">Does the customer want to apply for a joint application?</span>';
                    markup += '<div class="SC-two-buttons">';
                    markup += '<button id="sc-join-yes-button" style="margin-right: 10px !important">Yes</button>';
                    markup += '<button id="sc-join-no-button">No</button>';
                    markup += '</div>';
                    markup += '</div>'
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';

                    markup += '<div class="modal fade aff-manual-update" id="app-info-popup" role="dialog">';
                    markup += '</div>';

                    //<!-- check Finance credit term popup starts here-->
                    markup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-CT-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content modal-another-color finance-height">';
					markup += '<div class="modal-header noborder">';
                    markup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" style="display:none" id="SC-disclosure-close">&times;</button>';
					markup += '</div>';
                    markup += '<div class="text">';
                    markup += '<p class="Info">Did you receive the Synchrony Bank Credit Terms and Disclosures document?</p>';
                    markup += '<span class="SC-span-width add-margin justify">Federal Law requires Synchrony bank to obtain, verify and record information that identifies you when you open an account. Synchrony bank will use your name, address, date of birth, and other information for this purpose. By applying, you agree that if approved, Synchrony bank may provide you with a Sleep Number Credit Card.</span>';
                    markup += '<div class="SC-two-buttons">';
                    markup += '<button id="sc-appyes-button" style="margin-right: 10px !important">Yes</button>';
                    markup += '<button id="sc-appno-button">No</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    //<!--check Finance  credit term popup ends here-->
                    //<!-- check Finance credit term popup starts here-->
                    markup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-Yes-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content modal-another-color finance-popup">';
                    markup += '<div class="text">';
                    markup += '<p class="Info">Notice from Sleep Number</p>';
                    markup += '<span class="textspan add-margin">This is an application for a Sleep Number credit card account issued by Synchrony Bank ("SYNCB"). If this application is not approved by SYNCB, you agree that Sleep Number may provide all your information from this application to Vive Financial, PO Box 708670, Sandy UT 84070-8670 for the purpose of processing your request for credit. You acknowledge you have received the Vive Financial terms and conditions and authorize Vive Financial (or their service providers) to make inquiries they consider necessary (including request reports from consumer reporting agencies and other sources) in evaluating your request for credit. The rates, fees, and other credit terms provided with this application apply only to the Sleep Number credit card account offered by SYNCB. Other credit products may pull credit reports and have different rates, fees and terms.</span>';
                    markup += '<button class="SC-ok-button button-mg" id="SC-yes-okay">OK</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    //<!--check Finance  credit term popup ends here-->
                    //<!-- check Finance  credit term no popup starts here-->
                    markup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-CTN-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content less-height modal-another-color">';
                    markup += '<div class="text">';
                    markup += '<span class="SC-span-width add-margin">The sales associate must provide you the Credit Terms and Disclosure document for the credit application to proceed.</span>';
                    markup += '<button class="SC-ok-button" id="SC-CTN-okay">OK</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    //<!--  check Finance  credit term no ends here-->

                    markup += '<div class="modal fade SC-SO-add-popup" id="SC-Control-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content less-height modal-another-color">';
                    markup += '<div class="text">';
                    markup += '<span class="SC-span-width add-margin">Please pivot the iPad screen to be in customer view, but remain in control of this device.</span>';
                    markup += '<button class="SC-ok-button" id="SC-Control-okay">OK</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
					
					//<!--check finance credit amount popup application-->
					markup += '<div class="modal fade SC-SO-add-popup" id="SC-Credit-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content less-height modal-another-color">';
                    markup +='<form name="creditform" id="creditform">';
					markup += '<div class="text">';
                    markup +='<span class="SC-span-width-credit-amount">Please Enter Requested Credit Amount</span>'
				    markup +='<input id="SC-credit-appli" type="tel" inputmode="numeric" pattern="[0-9]*" name="CreditAmount" class="SC-inputamount padding-for-currency">'
					markup +='<span class="currency">$</span>';
                    markup += '<button type="submit" class="SC-ok-button" id="SC-next">Next</button>';
					markup += '</div>';
					markup +='</form>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
					//<!--check finance credit amount popup end here-->
					
					markup += '<div class="modal fade SC-SO-add-popup" id="SC-Control-BackToRep-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content less-height modal-another-color">';
                    markup += '<div class="text">';
                    markup += '<span class="SC-span-width add-margin">Please see sales associate for next steps in completing your transaction.</span>';
                    markup += '<button class="SC-ok-button" id="SC-Control-BackToRep-okay">OK</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
					
					markup += '<div class="modal fade SC-SO-add-popup" id="SC-canc-application-popup" role="dialog">';
                    markup += '<div class="SC-modal">';
                    markup += '<div class="modal-dialog">';
                    markup += '<div class="modal-content less-height modal-another-color">';
					markup += '<div class="text">';
                    markup +='<span class="SC-span-width-credit-amount">Please Enter Password</span>';
				    markup +='<input Id="SC-canc-application" type="password" name="" class="inputbox">';
					markup +='<span class="SC-span-width-credit-amount addcolor" id="passcode-error" style="display:none">Please Enter Valid Password</span>';
                    markup += '<button class="SC-ok-button" id="SC-application-canc">Next</button>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
                    markup += '</div>';
					
                    markup += '</div>'; //Applet Close
                    return markup;
                };



                SCiPadCreditApplicationMarkup.prototype.SCHeaderMarkup = function() {
                    var headerMarkup = "";
                    //headerMarkup+='<div class="nav-header">';//Uncomment this if SC_OUI_MARKUPS is not using
                    headerMarkup += '<div class="logo-block">';
                    headerMarkup += '<div class="logo">';
                    headerMarkup += '<img src="images/custom/sleepnumber.png">';
                    headerMarkup += '</div>';
                    headerMarkup += '</div>';
                    headerMarkup += '<div class="nav-block">';
                    headerMarkup += '<ul>';
                    headerMarkup += '<li>Home</li>';
                    headerMarkup += '<li>Contacts</li>';
                    headerMarkup += '<li>Accounts</li>';
                    headerMarkup += '<li>Sales Order</li>';
                    headerMarkup += '</ul>';
                    headerMarkup += '</div>';
                    headerMarkup += '<div class="profile-block">';
                    headerMarkup += '<div class="add-contact" id="SC-add-contact-btn">';
                    headerMarkup += '<div class="image-block account">';
                    headerMarkup += '<img src="images/custom/fileboard_plus.png" class="credit-app" />';
                    headerMarkup += '</div>';
                    headerMarkup += '<span>New Application</span>';
                    headerMarkup += '</div>';
                    headerMarkup += '<div class="profile">';
                    headerMarkup += '<div class="image-block">';
                    headerMarkup += '<img src="images/custom/profile.png" class="profile-icon">';
                    headerMarkup += '</div>';
                    headerMarkup += '<span>John Doe</span>';
                    headerMarkup += '</div>';
                    headerMarkup += '</div>';
                    //headerMarkup+='</div>';//Uncomment this if SC_OUI_MARKUPS is not using
                    return headerMarkup;
                };


                SCiPadCreditApplicationMarkup.prototype.SCDataContainer = function() {
                    var DC_markup = "";
                    DC_markup += '<div class="sc-aff-application-status" id="SC-CreditApp-Status">';
                    DC_markup += '<p class="no-margin">application status for <span id="SC-CreditApp-CustName">Leeloo Dallas - </span><span id="SC-CreditApp-CustNum">3143543513</span></p>';
                    DC_markup += '<p class="no-margin" id="SC-CA-Location">Beverly Hills North</p>';
                    DC_markup += '</div>';
                    DC_markup += '<div class="SC-table-with-scroll-main" id="SC-credit-history">';
                    DC_markup += '<table class="SC-table" id="SC-CA-HistoryTable">';
                    DC_markup += '<thead>';
                    DC_markup += '<tr>';
                    DC_markup += '<th>Customer Number</th>';
                    DC_markup += '<th>Customer Name</th>';
                    //NGOLLA 10-05-2018 Removed this Filed from List
                    // DC_markup+='<th>Location</th>';
                    DC_markup += '<th>Application Date</th>';
                    DC_markup += '<th>Financing Partner</th>';
                    DC_markup += '<th>Primary Applicant</th>';
                    DC_markup += '<th>Account Number</th>';
                    DC_markup += '<th>Credit Line</th>';
                    DC_markup += '<th>Application Status</th>';
                    DC_markup += '<th>Application Key</th>';
                    DC_markup += '<th>Application Reference #</th>';
					/*DC_markup+='<th>Primary Applicant ID</th>';
					DC_markup+='<th>Secondary Applicant ID</th>';
					DC_markup+='<th>Primary Acceptance</th>';
					DC_markup+='<th>Secondary Acceptance</th>';
					DC_markup+='<th>Disclosure</th>'; */
                    DC_markup += '</tr>';
                    DC_markup += '</thead>';
                    DC_markup += '<tbody id="SC-Credit-History">';

                    DC_markup += '</tbody>';
                    DC_markup += '</table>';
                    DC_markup += '</div>';

                    DC_markup += '<div class="container">';
                    DC_markup += '<div class="pagination sc-pagination pull-right" id="SC-CA-Pagination">';
                    /* DC_markup+='<li><img src="images/previous-set.png" /></li>';
                    DC_markup+='<li><img src="images/previous.png" /></li>';
                    DC_markup+='<li><img src="images/next.png" /></li>';
                    DC_markup+='<li><img src="images/next-set.png" /></li>'; */
                    DC_markup += '</div>';
                    DC_markup += '</div>';

                    DC_markup += '<div class="SC-Credit-info">';
                    DC_markup += '<p class="app-info no-margin"> <b>Note:</b><br><span class="span1">1. Application Date indicates the date the credit application was originally run. If the application date is from three years ago or older, a new application may need to be run</span><br>';
                    DC_markup += '<span class="span2">2. Credit line indicates original credit amount provided; not the current open line of credit</span></p>';
                    DC_markup += '</div>';

                    return DC_markup;
                };


                SCiPadCreditApplicationMarkup.prototype.SCModalHeader = function() {
                    var manual_Update_Markup = "";
                    manual_Update_Markup += '<div class="modal-dialog">';
                    //<!-- Modal content-->
                    manual_Update_Markup += '<div class="modal-content">';
                    manual_Update_Markup += '<div class="modal-header">';
                    manual_Update_Markup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SC-CA-manualUpdate-close">&times;</button>';
                    manual_Update_Markup += '<div class="header-content">';
                    manual_Update_Markup += '<p>Application Details</p>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="manual-info">';
                    manual_Update_Markup += '<p> Leverage this page to load a credit line increase or if you need to update the customer credit application from pending status.</p>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<form name="aff-manual-update-form">';
                    manual_Update_Markup += '<div class="modal-body clearfix">';

                    manual_Update_Markup += '<div class="row no-margin">';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">partner:</label>';
                    manual_Update_Markup += '<label class="value" id="SC-CA-Patner">Helpcard</label>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">please call:</label>';
                    manual_Update_Markup += '<label class="value" id="SC-CA-Mobile">1-877-813-8733</label>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">merchant number:</label>';
                    manual_Update_Markup += '<label class="value" id="SC-CA-MerchantNumber">789653241</label>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="row no-margin">';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">customer number:</label>';
                    manual_Update_Markup += '<label class="value" id="SC-CA-CustomerNumb">7896325416</label>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">customer name:</label>';
                    manual_Update_Markup += '<label class="value" id="SC-CA-CustName">Mohan Reddy</label>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="row no-margin">';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">account number:</label>';
                    manual_Update_Markup += '<input type="text" name="" class="aff-input extra" id="SC-CA-AccNumber" disabled>';
                    manual_Update_Markup += ' </div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">credit limit:</label>';
                    manual_Update_Markup += '<input type="text" name="" class="aff-input extra" id="SC-CA-CreditLimit">';
                    manual_Update_Markup += '<span class="currency">$</span>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    manual_Update_Markup += '<div class="aff-value-container">';
                    manual_Update_Markup += '<label class="label">status:</label>';
                    manual_Update_Markup += '<select class="aff-input" id="SC-CA-Status">';
                    manual_Update_Markup += '</select>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</form>';
                    manual_Update_Markup += '<div class="modal-footer">';
                    manual_Update_Markup += '<div class="SC-single-button-container no-padding">';
                    manual_Update_Markup += '<button class="submit" id="SC-CA-ManualUpdate-Save">Save</button>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';
                    manual_Update_Markup += '</div>';

                    return manual_Update_Markup;
                };


                SCiPadCreditApplicationMarkup.prototype.SCFinanceHeaderMarkup = function(hcMerchantId) {
                    var headermarkup = "";
                    /* headermarkup+='<html>';
                    headermarkup+='<head>';
                    headermarkup+='</head>';
                    headermarkup+='<body class="no-margin no-padding">'; */
                    //headermarkup+='<div id="applet1">';
                    headermarkup += '<div class="container-fluid no-margin no-padding">';
                    headermarkup += '<div class="main-header-container">';
                    headermarkup += '<div class="nav-header">';
                    headermarkup += '<div class="logo-block">';
                    headermarkup += '<div class="logo">';
                    headermarkup += '<img src="images/custom/sleepnumber.png">';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '<div class="apply-for-finance">';
                    headermarkup += '<img src="images/custom/status_apply_for_finance.png" />';
                    headermarkup += '<p class="no-margin">Apply for Finance</p>';
                    headermarkup += '</div>';
                    headermarkup += '<div class="profile-block">';
                    headermarkup += '<div class="profile">';
                    headermarkup += '<div class="image-block finance-cancel-block">';
                    headermarkup += '<img src="images/custom/icon-cancel.png" class="cancel-finance" id="SC-cancel-finance">';
                    headermarkup += '</div>';
                    headermarkup += '<span>Cancel</span>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '<div class="container-fluid no-margin sc-main-data-container SC-data-container no-recents">';
					//headermarkup += '<div class="container-fluid no-margin sc-main-data-container no-recents">';
                    headermarkup += '<div class="sc-apply-for-finance-main">';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    //<!--Starts: New Signature popup -->
                    headermarkup += '<div class="modal fade sc-sign-popup" id="SC-SO-sign-popup" role="dialog">';
                    headermarkup += '<div class="modal-dialog">';
                    // <!-- Modal content-->
                    headermarkup += '<div class="modal-content">';
					 headermarkup+='<div class="modal-header noborder">';
                    headermarkup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal"  id="SC-sign-popup-close">&times;</button>';
					headermarkup+='</div>';
                    headermarkup += '<div class="modal-body clearfix">';
                    headermarkup += '<p class="terms" style="margin-left: 25%;"">SYNCHRONY BANK TERMS AND CONDITIONS</p>';
                    headermarkup += '<ul>';
					headermarkup += '<li>I ask Synchrony Bank ("SYNCB") to issue me a SYNCB Credit Card (the "Card") and I agree: </li>';
                    headermarkup += '<li> To the SYNCB Credit Card agreement ("Agreement"). </li>';
                    headermarkup += "<li>I am providing the information in this application to SYNCB and to dealers/merchants/retailers that accept the Card and program sponsors (and their respective affiliates), and I consent to SYNCB's providing information about me to dealers/merchants/retailers that accept the Card and program sponsors (and their respective affiliates) for their own business purposes.</li>";
                    headermarkup += '<li>SYNCB may obtain credit reports and other information, including employment and income, about me to evaluate my application and for other purposes.</li>';
                    headermarkup += "<li>SYNCB, and any other owner or service of my account, may contact me about my account, including through text messages, automatic telephone dialing systems and/or artificial or prerecorded voice calls for informational, servicing or collection related communications, as provided in the Address/Phone Change and Consent To Communications provision's of the Agreement. I also agree to update my contact information.</li>";
                    headermarkup += "<li>The Agreement will govern my account and includes: <b>(1) a resolving a dispute with arbitration provision that limits my rights unless: (a) I reject the provision by following provision's instructions or (b) I am covered by the Notice for Active Duty Military Members and their Dependents set forth in the Agreement; </b>and (2) makes each applicant responsible for paying the entire amount of credit extended.</li>";
                    headermarkup += '</ul>';
                    headermarkup += '<p class="credit"><b>Federal law requires SYNCB to obtain, verify, and record information that identifies you when you open an account. SYNCB will use your name, address, date of birth, and other information for this purpose.</b></p>';
					headermarkup += '<p class="credit">If you apply with a joint applicant, each of you will be jointly and individually responsible for obligations under the Agreement and by signing below, you each agree that you intend to apply for joint credit.</p>';
                    // headermarkup+='<p class="terms">Insert this language:</p>';	
                    headermarkup += '<div class="check-info" id="appcredittermsblock">';
                    headermarkup += '<div class="Order-value SC-checkbox-white-square">';
                    headermarkup += '<input type="checkbox" name="chename" id="sign-act" />';
                    headermarkup += '<label for="sign-act" class="SC-360-cusin"></label>';
                    headermarkup += '</div><p class="credit" id="appcreditterms">I agree that I have read and agree to the above provision of the Credit Terms.</p>';
                    headermarkup += ' </div>';
                    headermarkup += '<div class="check-info" id="coappcrdittermsblock">';
                    headermarkup += '<div class="Order-value SC-checkbox-white-square">';
                    headermarkup += '<input type="checkbox" name="checkname" id="sig-cact" />';
                    headermarkup += '<label for="sig-cact" class="SC-360-cusin"></label>';
                    headermarkup += '</div><p class="credit" id="coapplcreditterms">I agree that I have read and agree to the above provision of the Credit Terms.</p>';
                    headermarkup += ' </div>';
                    headermarkup += '<div class="check-info marginrl">';
                    headermarkup += '<button class="SC-sign-button SC-disabled" id="SC-sign-submit">Continue</button>';
                    headermarkup += ' </div>';
                    headermarkup += ' </div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>'; 
					//<!--Ends: New Signature popup-- >
					
					//<!--Starts: New vive Signature popup -->
                    headermarkup += '<div class="modal fade sc-sign-popup" id="SC-vive-sign-popup" role="dialog">';
                    headermarkup += '<div class="modal-dialog">';
                    // <!-- Modal content-->
                    headermarkup += '<div class="modal-content">';
					 headermarkup+='<div class="modal-header noborder">';
                    headermarkup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal"  id="SC-vive-popup-close">&times;</button>';
					headermarkup+='</div>';
                    headermarkup += '<div class="modal-body clearfix">';
                    headermarkup += '<p class="terms" style="margin-left: 22%;">VIVE FINANCIAL TERMS AND CONDITIONS</p>';
                    headermarkup += '<ul>';
					headermarkup += '<li>If Synchrony Bank declines your application, Sleep Number may send your application information to Vive Financial. Below are the terms and conditions for Vive Financial: </li>';
                    //var sHCMerchantId = theApplication().GetProfileAttr("SCHCMerchantId");
					
					headermarkup += '<li style="height:100px;width:90%"><iframe src="https://losapi.hccrediteca.com/api/merchantappagreement/'+ hcMerchantId +'" style="height:100px;width:90%;background:#fff" title="Merchant Appagreement"></iframe><li>';
					headermarkup += '<li><div class="check-info" style="padding:5px">';
                    headermarkup += '<div class="Order-value SC-checkbox-white-square">';
                    headermarkup += '<input type="checkbox" name="mapp" id="sign-vive-MApp" />';
                    headermarkup += '<label for="sign-vive-MApp" class="SC-360-cusin"></label>';
                    headermarkup += '</div><p class="credit" id="">I agree to the above disclosure.</p>';
                    headermarkup += ' </div></li>';
					
					headermarkup += '<li style="height:100px;width:90%"><iframe src="https://losapi.hccrediteca.com/api/merchanteconsent/'+ hcMerchantId +'" style="height:100px;width:90%;background:#fff" title="Merchant Econsent"></iframe></li>';
					headermarkup += '<li><div class="check-info" style="padding:5px">';
                    headermarkup += '<div class="Order-value SC-checkbox-white-square">';
                    headermarkup += '<input type="checkbox" name="mecon" id="sign-vive-MEcon" />';
                    headermarkup += '<label for="sign-vive-MEcon" class="SC-360-cusin"></label>';
                    headermarkup += '</div><p class="credit" id="">I agree to the above Consent to receive information electronically.</p>';
                    headermarkup += ' </div></li>';

					headermarkup += '<li style="height:100px;width:90%"><iframe src="https://losapi.hccrediteca.com/api/merchantterms/'+ hcMerchantId +'" style="height:100px;width:90%;background:#fff" title="Merchant Terms"></iframe></li>';
					headermarkup += '<li><div class="check-info" style="padding:5px">';
                    headermarkup += '<div class="Order-value SC-checkbox-white-square">';
                    headermarkup += '<input type="checkbox" name="mterms" id="sig-vive-MTerms"/>';
                    headermarkup += '<label for="sig-vive-MTerms" class="SC-360-cusin"></label>';
                    headermarkup += '</div><p class="credit" id="">I have read and agree to the above terms and conditions.</p>';
                    headermarkup += ' </div></li>';
					
					headermarkup += '</ul>';
				    headermarkup += '<div class="check-info marginrl">';
                    headermarkup += '<button class="SC-sign-button SC-disabled" id="SC-vive-submit">Submit</button>';
                    headermarkup += ' </div>';
                    headermarkup += ' </div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>'; 
					//<!--Ends: New vive Signature popup-- >
					
					
					//<!--Finance Application Processing Popup-->
					headermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-Fin-Processing-popup" role="dialog">';
                    headermarkup += '<div class="SC-modal">';
                    headermarkup += '<div class="modal-dialog">';
                    headermarkup += '<div class="modal-content less-height modal-another-color">';
                    headermarkup += '<div class="text">';
                    headermarkup += '<span class="SC-span-width add-margin">Please wait while we submit your application</span>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
					
					//<!--Finance Application Status Popup-->
					headermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-Status-Confirm-popup" role="dialog">';
                    headermarkup += '<div class="SC-modal">';
                    headermarkup += '<div class="modal-dialog">';
                    headermarkup += '<div class="modal-content less-height modal-another-color">';
                    headermarkup += '<div class="text">';
                    headermarkup += '<span class="SC-span-width add-margin" id ="Fin-Status-Text"></span>';
                    headermarkup += '<button class="SC-ok-button" id="SC-Status-Confirm-okay">OK</button>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
					
					//<!--check finance passcode popup application-->
					headermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-Control-BackToRep-popup" role="dialog">';
                    headermarkup += '<div class="SC-modal">';
                    headermarkup += '<div class="modal-dialog">';
                    headermarkup += '<div class="modal-content less-height modal-another-color">';
                    headermarkup += '<div class="text">';
                    headermarkup += '<span class="SC-span-width add-margin">Please see sales associate for next steps in completing your transaction.</span>';
                    //headermarkup += '<span class="SC-span-width add-margin">Please hand device back to the sales associate.Thank you.</span>';
                    headermarkup += '<button class="SC-ok-button" id="SC-Control-BackToRep-okay">OK</button>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
						
					headermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-confirm-cancel-popup" role="dialog">';
                    headermarkup += '<div class="SC-modal">';
                    headermarkup += '<div class="modal-dialog">';
                    headermarkup += '<div class="modal-content less-height modal-another-color">';
                    headermarkup += '<div class="text">';
                    headermarkup += '<span class="SC-span-width add-margin">Are you sure you want to cancel your application?</span>';
					headermarkup += '<div class="SC-two-buttons">';
					headermarkup += '<button id="sc-confirm-cancel-yes-button" style="margin-right: 10px !important">Yes</button>';
					headermarkup += '<button id="sc-confirm-cancel-no-button">No</button>';
					headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
					
				    headermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-canc-application-popup" role="dialog">';
                    headermarkup += '<div class="SC-modal">';
                    headermarkup += '<div class="modal-dialog">';
                    headermarkup += '<div class="modal-content less-height modal-another-color">';
					//headermarkup += '<div class="modal-header noborder">';
                    //headermarkup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal"  id="SC-can-close">&times;</button>';
					//headermarkup += '</div>';
                    headermarkup += '<div class="text">';
                    headermarkup +='<span class="SC-span-width-credit-amount">Please Enter Password</span>';
				    headermarkup +='<input Id="SC-canc-application" type="password" name="" class="inputbox">';
					headermarkup +='<span class="SC-span-width-credit-amount addcolor" id="passcode-error" style="display:none">Please Enter Valid Password</span>';
                    headermarkup += '<button class="SC-ok-button" id="SC-application-canc">Next</button>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
				//<!--End pass code applicant popup-->
                        headermarkup += '<div id="custommaskoverlay" class="siebui-custom-mask-overlay" style="width: 100%;height: 100%;top: 0px;left: 0px;position: absolute;display: none;">';
                    headermarkup += '<div id="custom-mask-img" class="siebui-custom-mask-outer" style="">';
                    headermarkup += '<div class="siebui-custom-mask-inner">';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '</div>';
                    headermarkup += '<div class="overlay" id="custom-backdrop" style="display:none">';
                    headermarkup += '</div>';
                    //headermarkup+='</div>';
                    //headermarkup+='<body>';
                    return headermarkup;

                };


                SCiPadCreditApplicationMarkup.prototype.SCCreateNewfinanceMarkup = function() {
                    var financemarkup = "";

                    financemarkup += '<div class="sc-apply-for-finance-left">';
                    financemarkup += '<div class="sc-aff-step active" id="sc-aff-app">';
                    financemarkup += '<img src="images/custom/not-completed.png">';
                    financemarkup += '<p>Applicant</p>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-aff-step" style="display: none;" id="sc-aff-co-app">';
                    financemarkup += '<img src="images/custom/not-completed.png">';
                    financemarkup += '<p>Co-Applicant</p>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-aff-step" id="sc-aff-submit">';
                    financemarkup += '<img src="images/custom/not-completed.png" id="sc-aff-submit">';
                    financemarkup += '<p>Submit</p>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-apply-for-finance-right">';
                    financemarkup += '<form id="sc-req-credit-amunt">';
                    financemarkup += '<div class="sc-apply-for-finance-right-top" style="display:none">';
                    financemarkup += '<div class="sc-aff-req-amount" id="sc-requestedcredit">';
                    financemarkup += '<p class="no-margin mandatory required">Requested Credit Amount</p>';
                    financemarkup += '<span>$</span>';
                    financemarkup += '<input id="reqcre" class="SC-req-amut" name="reqcredamu" tabindex="1" autofocus>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-aff-req-amount" style="display: none" id="reviewandsubmit">';
                    financemarkup += '<p class="no-margin required rands">Review and Submit</p>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</form>';
                    financemarkup += '<div class="sc-apply-for-finance-right-bottom no-padding">';
                    financemarkup += '<form name="apply-for-finance-applicant" id="sc-fcc-primary-applicant">';
                    financemarkup += '<div class="row no-margin details-and-edit paddingtlr" id="SC-care-info" style="display: none">';
                    financemarkup += '<p class="app-title app-info no-margin">Note: Carefully review all data entered for accuracy</p>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin details-and-edit paddingtlr">';
                    financemarkup += '<p class="app-title no-margin">Applicant details</p>';
                    financemarkup += '<p class="edit-details no-margin" id="edit-applicant-details" style="display: none">Edit</p>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container is-active is-completed">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory  required">First Name</label>';
                    financemarkup += '<input type="text" name="firstname" class="SC-input SC-input-disabled" id="SC_FirstName" value=""  readonly>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container is-active is-completed">';
                    financemarkup += '<label for="Do Not Call" class="SC-label">Middle Initial</label>';
                    financemarkup += '<input type="text" name="" class="SC-input SC-input-disabled" id="SC_MiddleInitial" value="" readonly>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container is-active is-completed">';
                    financemarkup += '<label for="Do Not Call" class="SC-label  mandatory required">Last Name</label>';
                    financemarkup += '<input type="text" name="lastname" class="SC-input SC-input-disabled" id="SC_LastName" value="" readonly>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
                    financemarkup += '<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
                    financemarkup += '<div class="SC-input-container" id="SC-Address-block">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required"> Mailing Address</label>';
                    financemarkup += '<input type="text" name="address" class="SC-input" id="SC_MailingAddress" value="">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label">Apt/Company/Suite</label>';
                    financemarkup += '<input type="text" name="" class="SC-input" id="SC_Apt_Cmp">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">City</label>';
                    financemarkup += '<input type="text" name="city" class="SC-input" id="SC_City" value="">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">State/Province</label>';
                    financemarkup += '<select class="SC-input" autocomplete="off" id="SC_State" name="state">';
                    //financemarkup+='                                             <option></option>'; 
                    financemarkup += '</select>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Zip Code</label>';
                    financemarkup += '<input type="text" name="zipcode" class="SC-input" id="SC_ZipCode" value="">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
					
					financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
							financemarkup += '<div class="SC-input-container">';
								financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Residential Status</label>';
								financemarkup += '<select class="SC-input" autocomplete="off" id="SC_Residental_Status" name="residentialstatus">';
									financemarkup += '<option></option>';
									financemarkup += '<option>Rent</option>';
									financemarkup += '<option>Own</option>';
									financemarkup += '<option>Buying</option>';
								financemarkup += '</select>';
							financemarkup += '</div>';
						financemarkup += '</div>';
					
					financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container is-completed">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Phone Number Type</label>';
                    //financemarkup += '<input type="text" name="primaryphone" class="SC-input" id="SC_PrimaryPhone" value="" maxlength="12">';
                    //financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-phone-info">';
					financemarkup += '<select class="SC-input" autocomplete="off" id="Phonenumber_Type" name="phonenumbertype" title="Primary Phone">';
					financemarkup +='<option selected="selected" value="MobilePhone">Mobile Phone</option>';
					financemarkup +='<option disabled = true value="HomePhone">Home Phone</option>';
					financemarkup +='<option value="Workphone">Work Phone</option>';
					financemarkup += '</select>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
					
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container paddinglr">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Phone Number#</label>';
                    financemarkup += '<input type="text" name="secondaryphone" class="SC-input" id="SC_SecondaryPhone" value="" maxlength="12">';
                    financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-homephone-info">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    
					financemarkup += '</div>';
					
                   /* financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-businesstootltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-phone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';*/
					
					
					financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-tootltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-phone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
					
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup += '<div class="SC-input-container is-completed">';
							financemarkup += '<label for="Do Not Call" class="SC-label"> Alternate Phone Number Type</label>';
							//financemarkup +='<input type="text" name="primaryphone" class="SC-input" id="SC_AltPrimaryPhone" value="" maxlength="12">';
							financemarkup += '<select class="SC-input" autocomplete="off" id="AltPhonenumber_Type" name="phonenumbertype" title="Primary Phone">';
							financemarkup += '<option disabled = true value="MobilePhone">Mobile Phone</option>';
							financemarkup += '<option selected="selected" value="HomePhone">Home Phone</option>';
							financemarkup += '<option value="Workphone">Work Phone</option>';
							financemarkup += '</select>'
							financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup += '<div class="SC-input-container">';
								financemarkup += '<label for="Do Not Call" class="SC-label"> Alternate Phone Number</label>';
								financemarkup += '<input type="text" name="altphone" class="SC-input" id="SC_AltSecondaryPhone" value="" maxlength="12">';
								financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-alterphone-info">';
							financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
							financemarkup += '<div class="SC-input-container">';
								financemarkup += '<label for="Do Not Call" class="SC-label">Email Address</label>';
								financemarkup += '<input type="text" name="email" class="SC-input" id="SC_Email" value="">';
								financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-email-info">';
							financemarkup += '</div>';
						financemarkup += '</div>';
						
					financemarkup += '</div>';	
					
					financemarkup += '<div class="row no-margin clearfix paddinglr"  id="SC-alterphonenum-tooltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-homephone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
					
					financemarkup += '<div class="row no-margin clearfix paddinglr"  id="SC-email-tooltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-homephone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
                    
					financemarkup += '<div class="row no-margin clearfix paddinglr">';
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup += '<div class="SC-input-container" id="SC-MonthlynetIncome-block">';
						financemarkup += '<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Net Income</label>';
						financemarkup += '<input type="text" name="monthlynetin" class="SC-input padding-for-currency padding-for-info"  id="SC_MNI">';
						financemarkup += '<span class="currency">$</span>';
						financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-MNI-info">';
						financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup += '<div class="SC-input-container" id="SC-DB-block">';
						financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Date of Birth</label>';
						financemarkup += '<input type="text" name="birthdate" class="SC-input padding-for-currency" id="SC_DOB">';
						// financemarkup+='<img src="images/custom/calendar.png" class="calendar" id="SC_DOB_CAL">';
						financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup += '<div class="SC-input-container">';
						financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Social Security Number or ITIN</label>';
						financemarkup += '<input type="text" name="socialsecuritynumber" class="SC-input" maxlength="11" id="SC_SSN">';
						financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-SocialSecurity-num">';
						financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-MNItootltip-info" style="display:none">';
						financemarkup += '<div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
						financemarkup += '<div class="SC-MNI-tooltip"><p>Alimony, child support or separate maintenance income need not be included unless relied upon for credit. You may include the monthly amount that you have available to spend from your assets. MARRIED WI residents only: If you are applying for an individual account and your spouse is also a WI resident, combine your and your spouses financing information</p></div>';
						financemarkup += '</div>';
						financemarkup += '</div>';
                    financemarkup += '</div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-sstootltip-num" style="display:none">';
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup += '</div>';
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup += '</div>';
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup += '<div class="SC-SSN-tooltip"><p id="sc-ssn-infotext"></p></div>';
						financemarkup += '</div>';
                    financemarkup += '</div>';
					
                    /* financemarkup+='<div class="row no-margin details-and-edit">';
                     financemarkup+='               <p class="app-title no-margin">HELPcard Fields</p>';
                    financemarkup+='           </div>'; */
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr highlaterow">';
						financemarkup += '<div class="row no-margin clearfix paddinglr">';
							financemarkup += '<div class="col-sm-10 col-md-10 col-lg-10 col-xs-10">';
							financemarkup += '<div class="SC-Vive-Info-tooltip" id= "SC-Vive-Info-tooltip" style="display:none"><p style="float:right; font-weight:600; color:#585858f5">Shaded fields required by Vive Financial only</p></div>';
							financemarkup += '</div>';
							financemarkup += '<div class="col-sm-2 col-md-2 col-lg-2 col-xs-2">';
								financemarkup += '<img src="images/custom/Info1.png" class="Info" style="height:20px; width:20px" id="SC-Vive-Info">';
							financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup += '<div class="SC-input-container borderbottom">';
						financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">How long at this residence?</label>';
						financemarkup += '<input type="text" name="hlatr" class="SC-input" id="SC_Residence">';
						financemarkup += '<span class="SC-hlatr-years">years</span>';
						financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
						financemarkup += '<div class="SC-input-container borderbottom">';
						financemarkup += '<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Home Payment</label>';
						financemarkup += '<input type="text" name="monthlyhomepay" class="SC-input padding-for-currency" id="SC_Monthlypayement">';
						financemarkup += '<span class="currency">$</span>';
						financemarkup += '</div>';
						financemarkup += '</div>';
						
						financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
						financemarkup += '<div class="SC-input-container borderbottom">';
						financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Employer</label>';
						financemarkup += '<input type="text" name="employer" id="SC_Employer" class="SC-input">';
						financemarkup += '</div>';
						financemarkup += '</div>';
					financemarkup += '</div>';

                    //VALLA:25-JULY-19 Commented the below code to remove Nearest Relative and Relative Phone Number for ipad finance
                    /*financemarkup+='<div class="row no-margin clearfix">';
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
                    financemarkup += '<div class="sc-aff-footer-items displayinline paddinglr" id="applicant-buttons">';
                    /* financemarkup+='<button id="sc_goto_addcoapp" class="addcoappli">Add Co-Applicant</button>';  */
                    financemarkup += '<button id="sc_goto_gotoreview" class="review pull-right">Next</button>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-aff-footer-items submit-container paddinglr" id="submit-block-app" style="display: none">';
                    //kavya 12-08-2019  commented the below code to Remove checkbox for ipad finance
                    /*financemarkup+='<div class="terms-and-conditions">';
                    	financemarkup+='<div class="SC-360-checkbox">';
                    		financemarkup+='<input type="checkbox" name="" id="app-tac" />';
                    		financemarkup+='<label for="app-tac" class="editable"></label>';
                    		financemarkup+='<div id="app-terms-error-block" class="terms-error-block" style="display: none">';
                    			financemarkup+='<p id="app-terms-error-text" class="alert alert-danger"></p>';
                    		financemarkup+='</div>';
                    	financemarkup+='</div>';
                    	financemarkup+='<label class="no-margin">I have read and accepted Terms and Conditions</label>';
                    financemarkup+='</div>';*/
                    financemarkup += '<button id="submit-app" disabled>Next</button>';
                    financemarkup += '</div>';
                    financemarkup += '</form>';
                    financemarkup += '<div class="SC-dark-line" id="SC-hr-line" style="display: none">';
                    financemarkup += '<hr>';
                    financemarkup += '</div>';
                    financemarkup += '<form name="apply-for-finance-applicant" id="sc-fcc-co-applicant" style="display: none">';
                    financemarkup += '<div class="row no-margin details-and-edit paddingtlr">';
                    financemarkup += '<p class="app-title no-margin">Co-Applicant details</p>';
                    financemarkup += '<p class="edit-details no-margin" id="edit-co-applicant-details" style="display: none">Edit</p>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">First Name</label>';
                    financemarkup += '<input type="text" name="firstname" class="SC-input" id="Co_FirstName">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label">Middle Initial</label>';
                    financemarkup += '<input type="text" name="middlename" class="SC-input" id="Co_MiddleInitial" maxlength="1">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Last Name</label>';
                    financemarkup += '<input type="text" name="lastname" class="SC-input" id="Co_LastName">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr" id="SC-address-info">';
                    financemarkup += '<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
                    financemarkup += '<div class="SC-input-container no-border-bottom">';
                    financemarkup += '<label for="Do Not Call" class="SC-label display-label">Is the address same as that of primary applicant?</label>';
                    financemarkup += '<div class="SC-360-checkbox">';
                    financemarkup += '<input type="checkbox" name="" id="address" />';
                    financemarkup += '<label for="address" class="SC-input editable" id="co-checkbox"></label>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr" id="SC-Address">';
                    financemarkup += '<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Mailing Address</label>';
                    financemarkup += '<input type="text" name="address" class="SC-input" id="Co_MailingAddr">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label">Apt/Company/Suite</label>';
                    financemarkup += '<input type="text" name="" class="SC-input" id="Co_Apt_Cmp">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr" id="SC-city">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">City</label>';
                    financemarkup += '<input type="text" name="city" class="SC-input" id="Co_City">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 ">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">State/Province</label>';
                    financemarkup += '<select class="SC-input" autocomplete="off" name="state" id="Co_State">';
                    financemarkup += '</select>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Zip Code</label>';
                    financemarkup += '<input type="text" name="zipcode" class="SC-input" id="Co_ZipCode">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Residential Status</label>';
                    financemarkup += '<select class="SC-input" autocomplete="off" name="residentialstatus" id="Co_Residental_Status">';
                    financemarkup += '<option></option>';
                    financemarkup += '<option>Rent</option>';
                    financemarkup += '<option>Own</option>';
                    financemarkup += '<option>Buying</option>';
                    financemarkup += '</select>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
                    financemarkup += '<div class="SC-input-container" id="SC-CO-app-MonthlyNet">';
                    financemarkup += '<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Net Income</label>';
                    financemarkup += '<input type="text" name="monthlynetin" class="SC-input padding-for-currency padding-for-info" id="Co_MNI">';
                    financemarkup += '<span class="currency">$</span>';
                    financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-coMNI-info">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
					financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Date of Birth</label>';
                    financemarkup += '<input type="text" name="birthdate" class="SC-input padding-for-currency" id="Co_DOB">';
                    //financemarkup+='<img src="images/custom/calendar.png" class="calendar" id="Co_DOB_CAL">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-cobusinesstootltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-homephone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
                    financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-COMNItootltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-MNI-tooltip"><p>Alimony, child support or separate maintenance income need not be included unless relied upon for credit. You may include the monthly amount that you have available to spend from your assets. MARRIED WI residents only: If you are applying for an individual account and your spouse is also a WI resident, combine your and your spouses financing information.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
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
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Phone Number#</label>';
                    financemarkup += '<input type="text" name="secondaryphone" class="SC-input" id="Co_SecondaryPhn" maxlength="12">';
                    financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-cohomephone-info">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
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
                    financemarkup += '</div>';
					
					financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-cotootltip-info" style="display:none">';
                    financemarkup += '			 <div class="col-sm-12 col-md-12 col-lg-12 col-xs-12">';
                    financemarkup += '			  <div class="SC-phone-tooltip"><p>You authorize Synchrony bank to contact you at each phone number you have provided. By providing a phone number and/or email address, you agree to receive account updates and information, including text messages from Synchrony bank. Standard text messaging rates may apply.</p></div>';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
					
                    financemarkup += '<div class="row no-margin clearfix paddinglr">';
					financemarkup+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup+='<div class="SC-input-container">';
					financemarkup+='<label for="Do Not Call" class="SC-label">Alternate Phone Number</label>';
					financemarkup+='<input type="text" name="altphone" class="SC-input" id="Co_AltSecondaryPhn" maxlength="12">';
					financemarkup+='</div>';
					financemarkup+='</div>';
					financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Social Security Number or ITIN</label>';
                    financemarkup += '<input type="text" name="socialsecuritynumber" class="SC-input" maxlength="11"id="Co_SSN">';
                    financemarkup += '<img src="images/custom/Info1.png" class="Info" id="sc-cosocialsecurity-num">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
					financemarkup += '</div>';
					
					financemarkup += '<div class="row no-margin clearfix paddinglr"  id="sc-cosstootltip-num" style="display:none">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '			 </div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
					financemarkup += '			  <div class="SC-SSN-tooltip"><p id="sc-cossn-infotext"></p></div>';
                    financemarkup += '			 </div>';
					financemarkup += '			 <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '			  </div>';
                    financemarkup += '			 </div>';
					
					
					
                    /* financemarkup+='<div class="row no-margin details-and-edit ">';
                        financemarkup+='               <p class="app-title no-margin">HELPcard Fields</p>';
                       financemarkup+='                 <p class="edit-details no-margin" id="edit-cohelpcard-details" style="display: none">Edit</p>';
                        financemarkup+='           </div>'; */
                    financemarkup += '<div class="row no-margin clearfix paddinglr highlaterow">';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
                    financemarkup += '<div class="SC-input-container borderbottom">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">How long at this residence?</label>';
                    financemarkup += '<input type="text" name="hlatr" class="SC-input" id="Co_Residence">';
                    financemarkup += '<span class="SC-hlatr-years">years</span>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 is-completed">';
                    financemarkup += '<div class="SC-input-container borderbottom">';
                    financemarkup += '<label for="Do Not Call" class="SC-label extra-padding mandatory required">Monthly Home Payment</label>';
                    financemarkup += '<input type="text" name="monthlyhomepay" class="SC-input padding-for-currency" id="Co_MonthlyPay">';
                    financemarkup += '<span class="currency">$</span>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                    financemarkup += '<div class="SC-input-container borderbottom">';
                    financemarkup += '<label for="Do Not Call" class="SC-label mandatory required">Employer</label>';
                    financemarkup += '<input type="text" name="employer" class="SC-input" id="Co_Emp">';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '<div class="sc-aff-footer-items displayflex paddinglr" id="next-step2">';
                    /* financemarkup+='<button id="remvoe-co-applicant">Remove Co-Applicant</button>'; */
                    financemarkup += '<button id="SC-coapplicant-next">Next</button>';
                    financemarkup += '</div>';
                    financemarkup += '</form>';
                    financemarkup += '<div class="sc-aff-footer-items submit-container paddinglr" id="submit-block-co-app" style="display: none">';
                    //kavya:12-08-2019 removed checkbox
                    /*financemarkup+='<div class="terms-and-conditions">';
                    	financemarkup+='<div class="SC-360-checkbox">';
                    		financemarkup+='<input type="checkbox" name="chename" id="co-tac" />';
                    		financemarkup+='<label for="co-tac" class="editable"></label>';
                    		financemarkup+='<div id="terms-error-block" class="terms-error-block" style="display: none">';
                    			financemarkup+='<p id="terms-error-text" class="alert alert-danger"></p>';
                    		financemarkup+='</div>';
                    	financemarkup+='</div>';
                    	financemarkup+='<label class="no-margin">I have read and accepted Terms and Conditions</label>';
                    financemarkup+='</div>';*/
                    financemarkup += '<button id="submit-aff">Next</button>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';
                    financemarkup += '</div>';


                    return financemarkup;

                };

                SCiPadCreditApplicationMarkup.prototype.SCFinancepopup = function() {
                    var financepopup = "";
                    financepopup += '<div class="modal-dialog">';
                    financepopup += '<div class="modal-content">';
                    financepopup += '<div class="modal-header height60">';
                    financepopup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SC-360-contact-fr-close">&times;</button>';
                    financepopup += '<div class="header-content addpadding">';
                    financepopup += '<p>Primary Applicant ID Information</p>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<form name="aff-manual-update-form" id="sc-finance-app">';
                    financepopup += '<div class="modal-body no-padding clearfix" style="padding:0px !important">';
                    financepopup += '<div class="row no-margin clearfix paddingtop lpadding">';
                    financepopup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Primary ID Type</label>';
                    financepopup += '<select class="aff-input" name="primaryidtype" id="SC_applicant_PrimaryId">';
                    financepopup += '</select>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Issuing State</label>';
                    financepopup += '<select class="aff-input" name="isuuingstate" id="SC_fin_IssueState">';
                    financepopup += '</Select>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="col-md-2 col-lg-2 col-sm-2">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Exp. Month</label>';
                    financepopup += '<select class="aff-input" name="PPEM" id="PPEM">';
                    financepopup += '<option>01</option>';
                    financepopup += '<option>02</option>';
                    financepopup += '<option>03</option>';
                    financepopup += '<option>04</option>';
                    financepopup += '<option>05</option>';
                    financepopup += '<option>06</option>';
                    financepopup += '<option>07</option>';
                    financepopup += '<option>08</option>';
                    financepopup += '<option>09</option>';
                    financepopup += '<option>10</option>';
                    financepopup += '<option>11</option>';
                    financepopup += '<option>12</option>';
                    financepopup += '</select>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="col-md-2 col-lg-2 col-sm-2">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Exp. Year</label>';
                    financepopup += '<input type="number" id="PPEY" name="PPEY" class="aff-input">';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="row no-margin fheader clearfix SCConcoApplicant">';
                    financepopup += '<div class="col-md-12 col-lg-12 col-sm-12 fcol">';
                    financepopup += '<p>Co-Applicant ID Information</p>';
                    financepopup += '</div>';
                    financepopup += '</div>';

                    financepopup += '<div class="row no-margin clearfix  paddingtop lpadding SCConcoApplicant">';
                    financepopup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Primary ID Type</label>';
                    financepopup += '<select class="aff-input" name="coprimaryidtype" id="SC_co_applicant_PrimaryId">';
                    financepopup += '</select>';
                    financepopup += '</div>';
                    financepopup += '</div>';

                    financepopup += '<div class="col-md-4 col-lg-4 col-sm-4">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Issuing State</label>';
                    //financepopup+='<input type="text" name="coisuuingstate" class="aff-input">';
                    financepopup += '<select class="aff-input" name="coisuuingstate" id="SC_fin_co_IssueState">';
                    financepopup += '</Select>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += ' <div class="col-md-2 col-lg-2 col-sm-2">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Exp. Month</label>';
                    financepopup += '<select class="aff-input" name="SPEM" id="SPEM">';
                    financepopup += '<option>01</option>';
                    financepopup += '<option>02</option>';
                    financepopup += '<option>03</option>';
                    financepopup += '<option>04</option>';
                    financepopup += '<option>05</option>';
                    financepopup += '<option>06</option>';
                    financepopup += '<option>07</option>';
                    financepopup += '<option>08</option>';
                    financepopup += '<option>09</option>';
                    financepopup += '<option>10</option>';
                    financepopup += '<option>11</option>';
                    financepopup += '<option>12</option>';
                    financepopup += '</select>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="col-md-2 col-lg-2 col-sm-2">';
                    financepopup += '<div class="aff-value-container">';
                    financepopup += '<label class="label mandatory">Exp. Year</label>';
                    financepopup += '<input type="number" name="SPEY" id="SPEY" class="aff-input">';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '<div class="modal-footer">';
                    financepopup += '<div class="SC-single-button-container no-padding">';
                    financepopup += '<button type="submit" id="finance-button">Next</button>';
                    financepopup += '</div>';
                    financepopup += '</div>';
                    financepopup += '</form>';
                    financepopup += '</div>';
                    financepopup += '</div>';

                    return financepopup;
                };

                return CreditAppMarkup;
            }());
            return "SiebelApp.SCiPadCreditApplicationMarkup";
        })
}