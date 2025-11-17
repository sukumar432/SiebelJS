/****************************************************
	Created By: SCHERKU
	Purpose:  SC SALES EFFICIENCY OPEN UI
	Created Date:
	Modified Date: 

****************************************************/
if (typeof (SiebelApp.SCSalesOrder360Markup) === "undefined") {
    SiebelJS.Namespace("SiebelApp.SCSalesOrder360Markup");
    define("siebel/custom/SelectComfort/SCSalesOrder360Markup", ["siebel/viewpr", "siebel/custom/SelectComfort/SC_OUI_Definitions", "siebel/custom/SelectComfort/SC_OUI_Methods"], function() {
        SiebelApp.SCSalesOrder360Markup = (function() {
            var SalesOrder360 = new SCSalesOrder360Markup();
            var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
            var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

            function SCSalesOrder360Markup(pm) {}
            var InPSs = SiebelApp.S_App.NewPropertySet();
            var OutPSs = SiebelApp.S_App.NewPropertySet();
            var Servicea = SiebelApp.S_App.GetService("SC HasResponsibility");
            OutPSs = Servicea.InvokeMethod("CheckResp", InPSs);
            var Childa = OutPSs.GetChild(0);
            var BSDatas = Childa.GetProperty("Result");
            var sP2PEFlag = SiebelApp.S_App.GetProfileAttr('P2PEFlag');
            var StoreUser = SCOUIMethods.SCGetProfileAttrValue('SC Store User');
            var divsubtype = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Sub Type');
            //Method returning Search Markup
            SCSalesOrder360Markup.prototype.SalesOrder360Markup = function() {
                var Salesordermarkup = "", SNHrefId;
                Salesordermarkup += '<body class="no-margin no-padding">';
                Salesordermarkup += '    <div id="applet1">';
                Salesordermarkup += '        <div class="container-fluid no-margin no-padding">';
                Salesordermarkup += '            <div class="main-header-container">';
                Salesordermarkup += '                <div class="nav-header">';
                /*Salesordermarkup += '                    <div class="logo-block">';
					Salesordermarkup += '                        <div class="back-to-list">';
					Salesordermarkup += '                            <div class="add-account">';
					Salesordermarkup += '                                <div id="salesorder-back-button">';
					Salesordermarkup += '                                     <img src="images/custom/back-button.png" class="back">';
					Salesordermarkup += '                                </div>';
					Salesordermarkup += '                                <span>Order Search</span>';
					Salesordermarkup += '                            </div>';
					Salesordermarkup += '                        </div>';
					Salesordermarkup += '                        <div class="logo">';
					Salesordermarkup += '                        </div>';
					Salesordermarkup += '                    </div>';*/
                Salesordermarkup += '                    <div class="logo-block">';
                Salesordermarkup += '                        <div class="logo">';
                Salesordermarkup += '                            <img src="images/custom/sleepnumber.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                    <div class="nav-block">';
                Salesordermarkup += '                        <ul>';
                Salesordermarkup += '							<li id="SC_HOME">Home</li>';
                Salesordermarkup += '							<li id="SC_CONTACTS">Contacts</li>';
                if (StoreUser != "Y")
                    Salesordermarkup += '							<li id="SC_ACCOUNTS">Accounts</li>';
                Salesordermarkup += '							<li class="active" id="SC_SALESORDERS">Sales Order</li>';
                Salesordermarkup += '                        </ul>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                    <div class="profile-block">';
                if (divsubtype == "CSC" || divsubtype == "CS") {
                    Salesordermarkup += '   <div class="add-contact">';
                    Salesordermarkup += '<div class="image-block account" id="SC-ANI-CTItool" style="background:#F63!important">';
                    Salesordermarkup += '<img src="images/custom/cti-toolbar-blue-new.png" id="sc-blue" class="add-icon" style="display:none"/>';
                    Salesordermarkup += '<img src="images/custom/cti-toolbar-white-new.png" id="sc-white" class="add-icon"/>';
                    Salesordermarkup += '</div>';
                    Salesordermarkup += '<span>CTI Toolbar</span>';
                    Salesordermarkup += ' </div>';
                }
                //Condition for P2PEFlag
                var deviceType = theApplication().GetProfileAttr('Device');
                if (sP2PEFlag == "Y" || deviceType == "Tablet") {
                    Salesordermarkup += '                        <div class="add-account" id="customerreciept" style="display:none">';
                    Salesordermarkup += '                            <div class="image-block change-bg">';
                    //Salesordermarkup += '                                <img src="images/custom/Printer-white.png" class="order-360" id="customer-recp-gen">';
                    Salesordermarkup += '                                <img src="images/custom/Printer-white.png" class="order-360" id="reciept-generation">';
                    Salesordermarkup += '                            </div>';
                    Salesordermarkup += '                            <span>Customer Receipt</span>';
                    Salesordermarkup += '                        </div>';
                    Salesordermarkup += '                        <div class="add-account" id="storereciept" style="display:none">';
                    Salesordermarkup += '                            <div class="image-block change-bg">';
                    Salesordermarkup += '                                <img src="images/custom/Printer-white.png" class="order-360" id="store-recp-gen">';
                    Salesordermarkup += '                            </div>';
                    Salesordermarkup += '                            <span>Store Receipt</span>';
                    Salesordermarkup += '                        </div>';
                } else {
                    Salesordermarkup += '                        <div class="add-account" id="reciept_order360" style="display:none">';
                    Salesordermarkup += '                            <div class="image-block change-bg">';
                    Salesordermarkup += '                                <img src="images/custom/Printer-white.png" class="order-360" id="reciept-generation">';
                    Salesordermarkup += '                            </div>';
                    Salesordermarkup += '                            <span>Order Receipt</span>';
                    Salesordermarkup += '                        </div>';
                }
                //RCHATHAR: For defect nubmer 860
                /*Salesordermarkup+='                        <div class="add-account" id="quote_order360" style="display:none">';
					Salesordermarkup+='                            <div class="image-block">';
					Salesordermarkup+='                                <img src="images/custom/inbox_paper_round.png" class="order-360" id="Quote_image">';
					Salesordermarkup+='                            </div>';
					Salesordermarkup+='                            <span>Quote</span>';
					Salesordermarkup+='                        </div>';*/
                //VALLA: Added code for Digital signature POC
                /* Salesordermarkup += '                        <div class="add-account" id="order_signature" >';
					Salesordermarkup += '                            <div class="image-block change-bg">';
					Salesordermarkup += '                                <img src="images/custom/edit.png" class="order-360">';
					Salesordermarkup += '                            </div>';
					Salesordermarkup += '                            <span>Signature</span>';
					Salesordermarkup += '                        </div>'; */
                Salesordermarkup += '                        <div class="add-account" id="Revise_order360" style="display:none">';
                Salesordermarkup += '                            <div class="image-block change-bg">';
                Salesordermarkup += '                                <img src="images/custom/edit.png" class="order-360">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <span>Revise</span>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="add-account" id="resume_order360" style="display:none">';
                Salesordermarkup += '                            <div class="image-block change-bg">';
                Salesordermarkup += '                                <img src="images/custom/white-fileboard.png" class="order-360">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <span>Resume</span>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    <div>';
                //NTHARRE:29-JUN-2021:Added disabled class for STRY0122298
                Salesordermarkup += '                        <div class="add-account SC-disabled" id="delete_Order360" style="display:none">';
                Salesordermarkup += '                            <div class="image-block change-bg">';
                Salesordermarkup += '                                <img src="images/custom/delete_order_white.png" class="deleteicon-360">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <span>Delete</span>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '            <div class="container-fluid no-margin no-padding">';
                Salesordermarkup += '                <div class="SC-360-main-container SC-data-container">';
                Salesordermarkup += '                    <div class="SC-360-left-container order-360bg">';
                Salesordermarkup += '                        <div class="SC-360-profile-section">';
                Salesordermarkup += '                            <div class="SC-360-profile-section-bg">';
                Salesordermarkup += '                                <img src="images/custom/cart_round.png">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <p class="SC-360-profile-name order-number-title no-margin">Order Number</p>';
                Salesordermarkup += '                        <p class="SC-360-profile-name no-margin order-number" id="SC_Order_Number"></p>';
                Salesordermarkup += '                        <div class="SC-360-actions less-margin">';
                Salesordermarkup += '                            <button class="SC-360-action-btn from-order" id="SC-SO-360-Apply-Finance">Apply for Financing</button>';
                Salesordermarkup += '                            <button class="SC-360-action-btn from-order SC-disabled" id="sc-resubmit-sleep">Resubmit SleepIQ Profile</button>';
                Salesordermarkup += '                            <button class="SC-360-action-btn from-order" id="sc360-refresh">Refresh</button>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="SC-360-nav-container">';
                Salesordermarkup += '                            <div class="SC-360-nav-item margin-top">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/list-blue active.png" class="SC-360-nav-item-image">';
                //Salesordermarkup += '                                    <p class="for-order order-active" id="orderdetails"><a href="#sc-salesorder360-orderdetails">Order details</a> </p>';
                SNHrefId = "'sc-salesorder360-orderdetails'";
                Salesordermarkup += '                                    <p class="for-order order-active" id="orderdetails"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Order details</a></p>';
                Salesordermarkup += '                                </div>';
                //Salesordermarkup+='                                <img src="images/custom/pinned-order.png" class="SC-360-nav-item-pin-image" id="order-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <div class="SC-360-nav-item">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/script-blue active.png" class="SC-360-nav-item-image" id="lineimg">';
                //Salesordermarkup += '                                    <p class="for-order order-active" id="linedetails"><a href="#Line_details_Applet">Line details</a></p>';
                SNHrefId = "'Line_details_Applet'";
                Salesordermarkup += '                                    <p class="for-order order-active" id="linedetails"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Line details</a></p>';
                Salesordermarkup += '                                </div>';
                //Salesordermarkup+='                                <img src="images/custom/pin-order.png" class="SC-360-nav-item-pin-image inactive" id="line-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <div class="SC-360-nav-item">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/dollar.png" class="SC-360-nav-item-image SC-360-dollar-img" id="payimg">';
                //Salesordermarkup += '                                    <p class="for-order add-padding" id="payementdetails"><a href="#Payment-Details-Applet">Payment details</a> </p>';
                SNHrefId = "'Payment-Details-Applet'";
                Salesordermarkup += '                                    <p class="for-order add-padding" id="payementdetails"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Payment details</a></p>';
                Salesordermarkup += '                                </div>';
                Salesordermarkup += '								  <img src="images/custom/plus_circle_360.png" class="SC-360-add-icon inactive" id="sc-payments-new" style="display:none">';
                Salesordermarkup += '                                <img src="images/custom/pin-order.png" class="SC-360-nav-item-pin-image SC-order360-pin-image inactive" id="pay-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <div class="SC-360-nav-item">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/truck_round.png" class="SC-360-nav-item-image" id="HRImg">';
                //Salesordermarkup += '                                    <p class="for-order" id="HDSR"><a href="#HomeDelivery-SR-Applet">Home delivery SR</a> </p>';
                SNHrefId = "'HomeDelivery-SR-Applet'";
                Salesordermarkup += '                                    <p class="for-order" id="HDSR"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Home delivery SR</a></p>';
                Salesordermarkup += '                                </div>';
                Salesordermarkup += '                                <img src="images/custom/pin-order.png" class="SC-360-nav-item-pin-image SC-order360-pin-image inactive" id="hr-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <div class="SC-360-nav-item">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/attachment-clips.png" class="SC-360-nav-item-image SC-360-dollar-img" id="attimg">';
                //Salesordermarkup += '                                    <p class="for-order add-padding" id="attachmentdetails"><a href="#Attachment-Details-Applet">Attachments</a> </p>';
                SNHrefId = "'attachmentdetails'";
                Salesordermarkup += '                                    <p class="for-order add-padding" id="attachmentdetails"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Attachments</a></p>';
                Salesordermarkup += '                                </div>';
                Salesordermarkup += '                                <img src="images/custom/pin-order.png" class="SC-360-nav-item-pin-image SC-order360-pin-image inactive" id="att-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                            <div class="SC-360-nav-item margin-bottom">';
                Salesordermarkup += '                                <div class="SC-360-nav-item-name-container">';
                Salesordermarkup += '                                    <img src="images/custom/financing-icon-white.png" class="SC-360-nav-item-image" style="height:30px !important;width:30px !important" id="mdimg">';
                //Salesordermarkup += '                                    <p class="for-order add-padding" id="manualdiscounts" style="padding-left:7px !important"><a href="#Manual-Discounts-Applet">Manual Discounts</a> </p>';
                SNHrefId = "'Manual-Discounts-Applet'";
                Salesordermarkup += '                                    <p class="for-order add-padding" id="manualdiscounts"  style="padding-left:7px !important"><a onclick="javascript: document.getElementById(' + SNHrefId + ').scrollIntoView();" href="#">Manual Discounts</a></p>';
                Salesordermarkup += '                                </div>';
                Salesordermarkup += '                                <img src="images/custom/pin-order.png" class="SC-360-nav-item-pin-image SC-order360-pin-image inactive" id="md-pin">';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                    <div class="SC-360-right-container" id="Order-360-right-container">';
                Salesordermarkup += '                        <div class="SC-360-card" id="sc-salesorder360-orderdetails">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="SC-360-card" id="Line_details_Applet" >';
                Salesordermarkup += '                         </div>';
                Salesordermarkup += '                        <div class="SC-360-card Order-360-card" id="Payment-Details-Applet" style="display:none">';
                Salesordermarkup += '                          </div>';
                Salesordermarkup += '                         <div class="SC-360-card Order-360-card" id="Payment-History-Applet" style="display:none">';
                Salesordermarkup += '                          </div>';
                Salesordermarkup += '                         <div class="SC-360-card Order-360-card" id="HomeDelivery-SR-Applet" style="display:none">';
                Salesordermarkup += '                         </div>';
                Salesordermarkup += '                         <div class="SC-360-card Order-360-card" id="Attachment-Details-Applet" style="display:none">';
                Salesordermarkup += '                         </div>';
                Salesordermarkup += '                         <div class="SC-360-card Order-360-card" id="Manual-Discounts-Applet" style="display:none">';
                Salesordermarkup += '                         </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '            <div class="modal fade SC-SO-order-line-details" id="SC-SO-order-line-details" role="dialog">';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '            <div class="modal fade SC-SO-order-line-details" id="SC-order-addon-line-details" role="dialog">';
                Salesordermarkup += '            </div>';
                //NGOLLA PaymentCreation POPUP
                Salesordermarkup += '            <div class="modal fade sc-c-create-assets" id="SC-Payment-Creation" role="dialog">';
                Salesordermarkup += '  <div class="modal-dialog">';
                // <!-- Modal content-->
                Salesordermarkup += ' <div class="modal-content">';
                Salesordermarkup += '  <div class="modal-header">';
                //Markup_360+=' <button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SC-360-contact-fr-close">×</button>';
                Salesordermarkup += ' <div class="header-content">';
                Salesordermarkup += '  <p>Create Payment Line</p>';
                Salesordermarkup += '   </div>';
                Salesordermarkup += '      </div>';
                Salesordermarkup += '<form name="sc-create-payment-line-from" id="sc-create-payment-line">';
                Salesordermarkup += ' <div class="modal-body clearfix">';
                Salesordermarkup += '  <div class="row no-margin">';
                Salesordermarkup += ' <div class="col-md-6 col-lg-6 col-sm-6" >';
                Salesordermarkup += ' <div class="SC-input-container" id="srtypelable">';
                Salesordermarkup += '<label for="Customer Type" class="SC-label mandatory">Payment Method</label>';
                Salesordermarkup += '<select class="SC-input" name="paymentmethod" id="SC-Payment-method">';
                Salesordermarkup += ' </select>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '<div class="col-md-6 col-lg-6 col-sm-6" style="height:75px">';
                Salesordermarkup += ' <div class="SC-input-container" style="border-bottom:0px;display: flex;">';
                Salesordermarkup += ' <label for="Customer Type" class="SC-label mandatory">Payment Type</label>';
                Salesordermarkup += '<input type="button" name="paymenttype"  class="selectbutton" id="SC-select-payment" style="margin-left:10px;margin-top:10px" value="Select">';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '<div class="row no-margin" id="SC-Account-Number" style="display:none">';
                Salesordermarkup += ' <div class="col-md-6 col-lg-6 col-sm-6">';
                Salesordermarkup += ' <div class="SC-input-container">';
                Salesordermarkup += '<label for="Customer Type" class="SC-label mandatory">Account Number</label>';
                Salesordermarkup += '<input type="text" name="" id="scaccountnumber" class="SC-input">';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '<div class="modal-footer">';
                Salesordermarkup += ' <div class="SC-two-buttons-container">';
                Salesordermarkup += '<input type="button" class="cancelbutton" id="SCPayments-cancel" value="Cancel" style="cursor:pointer">';
                Salesordermarkup += '<button  class="submit" id="SCPaymentLine">Submit</button>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</div>';
                Salesordermarkup += '</form>';
                Salesordermarkup += ' </div>';
                Salesordermarkup += ' </div>';
                Salesordermarkup += '            </div>';
                //NGOLLA PaymentCreation POPUP
                Salesordermarkup += '            <div class="modal fade SC-SO-add-popup " id="SC-SO-Delete-payment-line" role="dialog">';
                Salesordermarkup += '        </div>';

                Salesordermarkup += ' <div class="modal fade SC-SO-add-popup" id="SC-SO-Delete-order" role="dialog">';
                Salesordermarkup += '            <div class="SC-modal">';
                Salesordermarkup += '                <div class="modal-dialog">';
                Salesordermarkup += '                    <div class="modal-content modal-red-bg">';
                Salesordermarkup += '                        <div class="icon">';
                Salesordermarkup += '                            <img src="images/custom/delete-red.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="text">';
                Salesordermarkup += '                            <p>Delete Order?</p>';
                Salesordermarkup += '                            <span class="SC-span-width">Are you sure you want to delete this order? This action cannot be undone.</span>';
                Salesordermarkup += '                            <div class="SC-two-buttons">';
                Salesordermarkup += '                                <button id="SC-delete-no">No</button>';
                Salesordermarkup += '                                <button id="SC-delete-yes">Yes</button>';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '        </div>';
                /*<!--Start--Addded popup on CreateReceipt button --> */
                Salesordermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-salesorder-Receipt" role="dialog">';
                Salesordermarkup += '<div class="SC-modal">';
                Salesordermarkup += '<div class="modal-dialog">';
                Salesordermarkup += '					<!-- Modal content-->';
                Salesordermarkup += '<div class="modal-content modal-another-color">';
                Salesordermarkup += '							<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" style="display:block" id="SC-salesOrderreceipt-close">&times;</button>';
                Salesordermarkup += '    			 		<div >';
                Salesordermarkup += '                  	 <img src="images/custom/sc-logo.png">';
                Salesordermarkup += '               </div>';
                Salesordermarkup += '					<div class="text">';
                Salesordermarkup += ' 					<span class="add-margin">Select Receipt Option</span>';
                Salesordermarkup += '							<div class="SC-two-buttons">';
                Salesordermarkup += '								<button id="sc-emailrcpt" class="SC-Create">Email</button>';
                Salesordermarkup += '								<button id="sc-printrcpt" class="SC-Create">Print</button>';
                Salesordermarkup += '								<button id="sc-bothrcpt" class="SC-Create">Email/Print</button>';
                Salesordermarkup += '							</div>';
                Salesordermarkup += '						</div>'
                Salesordermarkup += '					</div>';
                Salesordermarkup += '				</div>';
                Salesordermarkup += '			</div>';
                Salesordermarkup += '		</div>';
                /*<!--End--Addded popup on CreateReceipt button-->*/

                /*<!--Start--Addded popup on sendemailReceipt button-->*/
                Salesordermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-sendrcpt-message-popup" role="dialog">';
                Salesordermarkup += '  <div class="SC-modal">';
                Salesordermarkup += '   <div class="modal-dialog">';
                Salesordermarkup += '     <div class="modal-content modal-another-color">';
                Salesordermarkup += '		  <button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" style="display:block" id="SC-sales-sendemailrcpt-close">&times;</button>';
                Salesordermarkup += '        <div>';
                Salesordermarkup += '                <img src="images/custom/sc-logo.png" class="sc-order-icon">';
                Salesordermarkup += '         </div>';
                Salesordermarkup += '          <div class="text">';
                Salesordermarkup += '            <span class="add-margin"> This request will be sent to</span>';
                Salesordermarkup += '             <div class="main-email">';
                Salesordermarkup += '               <div class="email-id">';
                Salesordermarkup += '                  <input type="text" id="SC-Remailaddr" class="emialnot sc-upemailadd" value="">';
                Salesordermarkup += '                   <img src="images/custom/revise-orange.png" id="SC-qeditemailadress" class="email-img">';
                Salesordermarkup += '               </div>';
                Salesordermarkup += '                  <div id="email-id-popup" class="error">';
                Salesordermarkup += '                      <span id="email-id-popup4" class="email-id-contact">This email address will be updated on the contact</span>';
                Salesordermarkup += '                      <span id="email-id-popup5" class="emial-id-valid">Email address is required to complete this request.Please enter contact email address</span>';
                Salesordermarkup += '                      <span id="email-id-popup6" class="emial-id-validate">Please enter valid email address</span>';
                Salesordermarkup += '                  </div>';
                Salesordermarkup += '                  </div>';
                Salesordermarkup += '                <div class="SC-two-buttons" style="margin-bottom: 10px !important">';
                Salesordermarkup += '               <button id="SC-Send-emailrcpt" style="margin-right: 10px !important">Send Email</button>';
                Salesordermarkup += '               <button id="sc-Cancelrcpt-button">Cancel</button>';
                Salesordermarkup += '          </div>';
                Salesordermarkup += '         </div>'
                Salesordermarkup += '       </div>';
                Salesordermarkup += '      </div>';
                Salesordermarkup += '    </div>';
                Salesordermarkup += '    </div>';

                /*<!--End--Addded popup on sendemailReceipt button-->*/

                Salesordermarkup += ' <div class="modal fade SC-SO-add-popup" id="SC-SO-Delete-att" role="dialog">';
                Salesordermarkup += '            <div class="SC-modal">';
                Salesordermarkup += '                <div class="modal-dialog">';
                Salesordermarkup += '                    <div class="modal-content modal-red-bg">';
                Salesordermarkup += '                        <div class="icon">';
                Salesordermarkup += '                            <img src="images/custom/delete-box.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="text">';
                Salesordermarkup += '                            <p>Delete attachment?</p>';
                Salesordermarkup += '                            <span class="SC-span-width">Are you sure you want to delete this attachment? This action cannot be undone.</span>';
                Salesordermarkup += '                            <div class="SC-two-buttons">';
                Salesordermarkup += '                                <button id="SC-delete-no-att">No</button>';
                Salesordermarkup += '                                <button id="SC-delete-yes-att">Yes</button>';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '        </div>';
                Salesordermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-resume-order" role="dialog">';
                Salesordermarkup += '            <div class="SC-modal">';
                Salesordermarkup += '                <div class="modal-dialog">';
                Salesordermarkup += '                    <div class="modal-content modal-another-color min-height"">';
                Salesordermarkup += '                        <div>';
                Salesordermarkup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal">×</button>';
                Salesordermarkup += '                            <img src="images/custom/sc-logo.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="text">';
                Salesordermarkup += '                            <span class="SC-span-width add-margin">In order to proceed please reprice the order</span>';
                Salesordermarkup += '                            <button class="SC-ok-button pending-bg button-mt" id="SC-Reprice-order-button">REPRICE ORDER</button>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '        </div>';
                //Start:#CHG0034381:code for revision reason popup modal popup
                Salesordermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-revise-order" role="dialog">';
                Salesordermarkup += '            <div class="SC-modal">';
                Salesordermarkup += '                <div class="modal-dialog cancel-popup">';
                Salesordermarkup += '					<div class="modal-content modal-orange-bg">';
                Salesordermarkup += '                        <div class="icon add-margin">';
                Salesordermarkup += '                            <img src="images/custom/revise-orange.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="text">';
                Salesordermarkup += '                             <span class="SC-span-width">Please select the Revision Reason and Revision Reason Type to proceed</span>';
                Salesordermarkup += '							 <select class="SC-select-box SC-Rev-Reason-box" id="SC-Revise-reason-SelectBox">';
                Salesordermarkup += '                              </select>';
                Salesordermarkup += '							<select class="SC-select-box SC-Rev-Reason-box SC-disabled" id="SC-Revise-subreason-SelectBox">';
                Salesordermarkup += '                            </select>';
                Salesordermarkup += '							 <div class="SC-two-buttons">';
                Salesordermarkup += '                                <button id="SC-revise-no-button">No</button>';
                Salesordermarkup += '                                <button class="SC-disabled" id="SC-revise-yes-button" type="button">Yes</button>';
                Salesordermarkup += '                            </div>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '        </div>';
                //End code for revision reason popup modal popup
                //saddala
                Salesordermarkup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-hold-revise" role="dialog">';
                Salesordermarkup += '            <div class="SC-modal">';
                Salesordermarkup += '                <div class="modal-dialog">';
                Salesordermarkup += '                    <div class="modal-content modal-another-color min-height"">';
                Salesordermarkup += '                        <div>';
                Salesordermarkup += '<button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal">×</button>';
                Salesordermarkup += '                            <img src="images/custom/sc-logo.png">';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                        <div class="text">';
                Salesordermarkup += '                            <span class="SC-span-width add-margin">On Hold orders cannot be resumed. Please clear the Hold Reason to proceed</span>';
                Salesordermarkup += '                            <button class="SC-ok-button pending-bg button-mt" id="SC-resume-hold-ok">OK</button>';
                Salesordermarkup += '                        </div>';
                Salesordermarkup += '                    </div>';
                Salesordermarkup += '                </div>';
                Salesordermarkup += '            </div>';
                Salesordermarkup += '        </div>';
                //saddala
                Salesordermarkup += '        </div>';
                Salesordermarkup += '    </div>';
                Salesordermarkup += '</body>';
                return (Salesordermarkup);
            }

            //Start:method for orderDetails Markup
            SCSalesOrder360Markup.prototype.SalesOrder360orderdetailstMarkup = function(OrderDetailrecords) {
                $("#SC_Order_Number").text(OrderDetailrecords[0]["Order Number"]);
                var preConValue;
                //var HoldReasonArray = SCOUIMethods.GetLOVs("[Type]= 'SAP_SO_HEADER_DELIV_BLOCK' and [Active] = 'Y'","Order By");

                var order_Det_markup = "";
                order_Det_markup += '<form name="SC-360-Cd-Validation" id="customerformvalidation">';
                order_Det_markup += '                                <div class="SC-360-card-header">'
                order_Det_markup += '                                    <div class="SC-360-title-and-icon">';
                order_Det_markup += '                                        <div class="icon-and-title">';
                order_Det_markup += '                                            <div class="icon-and-title">';
                order_Det_markup += '                                                <img src="images/custom/list_blue.png" class="sales-order-icon">';
                order_Det_markup += '                                                <p class="no-margin">Order Details</p>';
                order_Det_markup += '                                                <img src="images/custom/about_record.png" class="info-icon" id="Button">';
                order_Det_markup += '                                            </div>';
                order_Det_markup += '                                        </div>';
                order_Det_markup += '                                        <div class="SC-360-save-container" id="SC-360-od-save" style="display: none;">';
                order_Det_markup += '                                            <p class="no-margin save-changes">Save changes ? </p>';
                order_Det_markup += '                                            <img type="button" name="submit" class="SC-vali-img" src="images/custom/done.png" border="0" alt="Submit" id="SC-od-save" style="margin-left: 0px !important" />';
                order_Det_markup += '                                            <img src="images/close.png" id="SC-od-close">';
                order_Det_markup += '                                        </div>';
                order_Det_markup += '                                    </div>';
                order_Det_markup += '                                    <span class="SC-360-edit" id="SC-360-order-details-edit">Edit</span>';
                order_Det_markup += '                                </div>';
                order_Det_markup += '                                <div class="SC-360-card-body clearfix">';
                order_Det_markup += '                                    <form name="SC-360-customer-details">';
                order_Det_markup += '                                        <div class="row no-margin no-padding clearfix">';
                order_Det_markup += '                                            <div class="col-md-6 col-lg-6">';
                order_Det_markup += '                                                <p class="SC-360-card-body-head">Order Header</p>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">source order:</label>';
                if (OrderDetailrecords[0]["SC Ext Order Number"] == undefined) {
                    order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC-source-order" value="">';
                } else {
                    order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC-source-order" value="' + OrderDetailrecords[0]["SC Ext Order Number"] + '">';
                }
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">order date:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" value="' + OrderDetailrecords[0]["Order Date"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">sub type:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" value="' + OrderDetailrecords[0]["SC Sub-Type"] + '">';
                order_Det_markup += '                                                </div>';
                if (OrderDetailrecords[0]["Bill To Account"] != "") {
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">PO number:</label>';
                    //RCHATHAR: For defect number 710 added id
                    if (OrderDetailrecords[0]["SC Purchase Order Number"] == undefined) {
                        order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC-po-order" value="">';
                    } else {
                        order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC-po-order" value="' + OrderDetailrecords[0]["SC Purchase Order Number"] + '">';
                    }
                    order_Det_markup += '                                                </div>';
                }
                //RCHATHAR: For defect nubmer 710 added id
                order_Det_markup += '                                                <div class="SC-360-item" id="SC_360_Status">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">status:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC_Statusid" value="' + OrderDetailrecords[0]["Status"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += ' 												<div class="SC-360-item" style="position:relative">';
                order_Det_markup += '														<label class="SC-360-item-label no-margin">sales order team:</label>';
                order_Det_markup += '														<input type="text" name="" class="SC-360-item-value" id="salesorderteamtext" value="' + OrderDetailrecords[0]["SC Sales Team Login"] + '">';
                order_Det_markup += '														<img src="images/custom/mvg.png" class="mvg-icon" id="sales-order-360-team-mvg">';
                order_Det_markup += '													</div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">channel:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="order360-channel" value="' + OrderDetailrecords[0]["SC Location Type"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">sub-channel:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="order360-sub-channel" value="' + OrderDetailrecords[0]["SC Location Sub-Channel"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item" style="position:relative">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">sale-location:</label>';
                //RCHATHAR: For defect number 710 added id
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC_Salelocationid" title="' + OrderDetailrecords[0]["SC Sale Location"] + '" value="' + OrderDetailrecords[0]["SC Sale Location"] + '">';
                order_Det_markup += '                                        <img src="images/custom/search-icon.png" class="location-search-icon mvg-icon" id="SC-sales-location-icon-id" style="display:none;height:20px !important">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">store/show#:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="order360-store-show" title="' + OrderDetailrecords[0]["SC Location Store Number"] + '" value="' + OrderDetailrecords[0]["SC Location Store Number"] + '">';
                order_Det_markup += '                                                </div>';
                //SPATIBAN:Added code for CR #CHG0034565
                if (OrderDetailrecords[0]["SC Manual Order Reason"] != "") {
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">manual order reason:</label>';
                    order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" title="' + OrderDetailrecords[0]["SC Manual Order Reason"] + '" value="' + OrderDetailrecords[0]["SC Manual Order Reason"] + '">';
                    order_Det_markup += '                                                </div>';
                }
                if (OrderDetailrecords[0]["SC Manual Comments"] != "") {
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">manual order comments:</label>';
                    order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" title="' + OrderDetailrecords[0]["SC Manual Comments"] + '" value="' + OrderDetailrecords[0]["SC Manual Comments"] + '">';
                    order_Det_markup += '                                                </div>';
                }
                order_Det_markup += '                                                <div class="SC-360-item" style="position:relative">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">show number:</label>';
                //RCHATHAR: For defect number 710
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC_Showid" value="' + OrderDetailrecords[0]["SC Sale Show#"] + '">';
                order_Det_markup += '                                        <img src="images/custom/search-icon.png" class="location-show-icon mvg-icon" id="SC-show-icon-id" style="display:none;height:20px !important">';
                order_Det_markup += '                                                </div>';
                /*order_Det_markup+='                                                <div class="SC-360-item">';
					order_Det_markup+='                                                    <label class="SC-360-item-label no-margin">order revision number:</label>';
					order_Det_markup+='                                                    <input type="text" name="" class="SC-360-item-value" value="'+OrderDetailrecords[0]["Revision"]+'">';
					order_Det_markup+='                                                </div>';*/
                //SCHERKU: defect no:710
                /*order_Det_markup+='                                                <div class="SC-360-item">';
					order_Det_markup+='                                                    <label class="SC-360-item-label no-margin">PO #:</label>';
					order_Det_markup+='                                                    <input type="text" name="" class="SC-360-item-value SC-360-od" id="SC-po-order" value="'+OrderDetailrecords[0]["SC Purchase Order Number"]+'">';
					order_Det_markup+='                                                </div>';*/
                /*order_Det_markup+='                                                <div class="SC-360-item">';
					order_Det_markup+='                                                    <label class="SC-360-item-label no-margin">Tax Verification Pending:</label>';
					order_Det_markup+='                                                    <input type="text" name="" class="SC-360-item-value SC-360-od" id="SC-tax-order" value="'+OrderDetailrecords[0]["SC Tax Verification Pending"]+'">';
					order_Det_markup+='                                                </div>';*/

                order_Det_markup += '                                            </div>';
                order_Det_markup += '                                            <div class="col-md-6 col-lg-6">';
                order_Det_markup += '                                                <p class="SC-360-card-body-head">Billing Details</p>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">billing last Name:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" title="' + OrderDetailrecords[0]["Primary Bill To Last Name"] + '" value="' + OrderDetailrecords[0]["Primary Bill To Last Name"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">billing first Name:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" title="' + OrderDetailrecords[0]["Primary Bill To First Name"] + '" value="' + OrderDetailrecords[0]["Primary Bill To First Name"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">billing address:</label>';
                order_Det_markup += '                                                    <a class="SC-360-item-value removeline" title="' + OrderDetailrecords[0]["SC Con Bill To Address"] + '">' + OrderDetailrecords[0]["SC Con Bill To Address"] + '</a>';
                order_Det_markup += '                                                </div>';
                if (OrderDetailrecords[0]["Bill To Account"] != "") {
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">account:</label>';
                    if (SiebelApp.S_App.GetProfileAttr("SC Store User") == "Y")
                        order_Det_markup += '                                                    <a class="SC-360-item-value SC-readonly" id="sc-360-goto-contact">' + OrderDetailrecords[0]["Bill To Account"] + '</a>';
                    else
                        order_Det_markup += '                                                    <a class="SC-360-item-value add-color" id="sc-360-goto-contact">' + OrderDetailrecords[0]["Bill To Account"] + '</a>';
                    order_Det_markup += '                                                </div>';
                } else {
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">contact:</label>';
                    order_Det_markup += '                                                    <a class="SC-360-item-value add-color" id="sc-360-goto-contact">' + OrderDetailrecords[0]["SC Primary Bill To Last Name DD"] + '</a>';
                    order_Det_markup += '                                                </div>';
                }
                //Start:#CHG0034381:code for revision Reasons
                order_Det_markup += '											<p class="SC-360-card-body-head">Revision Details</p>';
                order_Det_markup += '							 				<div class="SC-360-item">';
                order_Det_markup += '												<label class="SC-360-item-label no-margin">order revision number:</label>';
                order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="' + OrderDetailrecords[0]["Revision"] + '" title="' + OrderDetailrecords[0]["Revision"] + '">';
                order_Det_markup += '											</div>';
                order_Det_markup += '											<div class="SC-360-item">';
                order_Det_markup += '												<label class="SC-360-item-label no-margin">last reason:</label>';
                order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="' + OrderDetailrecords[0]["Revision Reason"] + '" title="' + OrderDetailrecords[0]["Revision Reason"] + '">';
                order_Det_markup += '											</div>';
                order_Det_markup += '											<div class="SC-360-item">';
                order_Det_markup += '												<label class="SC-360-item-label no-margin">last reason type:</label>';
                order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="' + OrderDetailrecords[0]["Revision Reason Type"] + '" title="' + OrderDetailrecords[0]["Revision Reason Type"] + '">';
                order_Det_markup += '											</div>';
                //NTHARRE:03Sep2021: Added below code for Manual order Sub Reason on order 360
                var divtype = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Type');
                var divsubtype = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Sub Type');
                if ((divtype == "STORE" && divsubtype == "STORE") || (divtype == "DIRECT" && divsubtype == "CSC")) {
                    if (OrderDetailrecords[0]["SC Manual Order Reason"] != "" && OrderDetailrecords[0]["SC Manual Order Sub Reason"] != "") {
                        if (OrderDetailrecords[0]["SC Sub-Type"] == "QVC") {
                            // for space issue added condition
                            order_Det_markup += '											<div class="SC-360-item">';
                            order_Det_markup += '												<label class="SC-360-item-label no-margin"></label>';
                            order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="">';
                            order_Det_markup += '											</div>';
                        }
                        order_Det_markup += '											<div class="SC-360-item">';
                        order_Det_markup += '												<label class="SC-360-item-label no-margin"></label>';
                        order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="">';
                        order_Det_markup += '											</div>';
                        order_Det_markup += '											<div class="SC-360-item">';
                        order_Det_markup += '												<label class="SC-360-item-label no-margin">Manual Order Sub Reason:</label>';
                        order_Det_markup += '												<input type="text" name="" class="SC-360-item-value"  value="' + OrderDetailrecords[0]["SC Manual Order Sub Reason"] + '" title="' + OrderDetailrecords[0]["SC Manual Order Sub Reason"] + '">';
                        order_Det_markup += '											</div>';
                    }
                }
                //End:code for revision reasons
                if (OrderDetailrecords[0]["SC Sub-Type"] == "QVC") {
                    order_Det_markup += '                                                <p class="SC-360-card-body-head">Sold Details</p>';
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">QVC Notification Status:</label>';
                    if (OrderDetailrecords[0]["SC QVC Notification Status"] != undefined)
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value SC-360-od" title="' + OrderDetailrecords[0]["SC QVC Notification Status"] + '" id="SC_QVC_STATUS_360" value="' + OrderDetailrecords[0]["SC QVC Notification Status"] + '">';
                    else
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value SC-360-od"  id="" value="">';
                    order_Det_markup += '                                                </div>';
                    order_Det_markup += '                                                <div class="SC-360-item">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Sold To First Name:</label>';
                    if (OrderDetailrecords[0]["SC Pay To First Name"] != undefined)
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_SlodToFirstname" value="' + OrderDetailrecords[0]["SC Pay To First Name"] + '">';
                    else
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_SlodToFirstname" value="">';
                    order_Det_markup += '                                                </div>';
                    order_Det_markup += '                                                <div class="SC-360-item" style="position:relative">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Sold To Last Name:</label>';
                    if (OrderDetailrecords[0]["SC Pay To Last Name"] != undefined)
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_SoldToLastname" value="' + OrderDetailrecords[0]["SC Pay To Last Name"] + '">';
                    else
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_SoldToLastname" value="">';
                    order_Det_markup += '     <img src="images/custom/search.png" class="mvg-icon" id="sc-add-lastname" style="display:none;height:30px;width:30px">';
                    order_Det_markup += '                                                </div>';
                    order_Det_markup += '                                                <div class="SC-360-item" style="position:relative">';
                    order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Sold To Address:</label>';
                    if (OrderDetailrecords[0]["SC Pay To Contact Address"] != undefined)
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_Sold_Address" title="' + OrderDetailrecords[0]["SC Pay To Contact Address"] + '" value="' + OrderDetailrecords[0]["SC Pay To Contact Address"] + '">';
                    else
                        order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" id="SC_Sold_Address" value="">';
                    order_Det_markup += '														<img src="images/custom/mvg.png" class="mvg-icon" id="sales-order-360-Address" style="display:none;">';
                    order_Det_markup += '                                                </div>';
                }
                order_Det_markup += '                                            </div>';
                order_Det_markup += '                                        </div>';
                order_Det_markup += '                                        <div class="row no-margin no-padding clearfix">';
                order_Det_markup += '                                            <div class="col-md-6 col-lg-6">';
                order_Det_markup += '                                                <p class="SC-360-card-body-head">Hold and Cancel Details</p>';
                order_Det_markup += '                                                <div class="SC-360-item checkbox-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">hold flag:</label>';
                order_Det_markup += '														<div class="SC-360-checkbox">';
                if (OrderDetailrecords[0]["Hold Flag"] == "Y")
                    order_Det_markup += '                                          				 <input type="checkbox" name="" id="sc-hold-flg-360" checked/>';
                else
                    order_Det_markup += '                                           				<input type="checkbox" name="" id="sc-hold-flg-360">';
                //SBOORLA:Added code for Defect 671
                order_Det_markup += '                                            				<label for="sc-hold-flg-360" class="SC-360-cusin" id="sc-360-hold"></label>';
                order_Det_markup += '                                        				</div>';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">on hold for:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC_OnHoldFor_360" value="' + OrderDetailrecords[0]["SC Days On Hold"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item" id="SC-360-HoldReason">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">hold reason:</label>';
                /*order_Det_markup+=' 											<select class="SC-360-item-value select-dropdown SC-360-od" id="On-hold-reason">';
		order_Det_markup+='                                            	<option class="SC-SO-Option" title="'+OrderDetailrecords[0]["Delivery Block"]+'" >'+OrderDetailrecords[0]["Delivery Block"]+'</option>';
        for(var hr=0;hr<HoldReasonArray.length;hr++){
			if(HoldReasonArray[hr]!=OrderDetailrecords[0]["Delivery Block"])
				order_Det_markup +=' <option value="'+HoldReasonArray[hr]+'">'+HoldReasonArray[hr]+'</option>';
			}
			//order_Det_markup +=' <option value=""></option>';
		order_Det_markup+='                                           	</select>';*/
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" id="SC_HoldReason_360" value="' + OrderDetailrecords[0]["Delivery Block"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">cancellation reason:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" title="' + OrderDetailrecords[0]["Cancel Reason"] + '" value="' + OrderDetailrecords[0]["Cancel Reason"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item checkbox-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Tax Verification Pending:</label>';
                order_Det_markup += '														<div class="SC-360-checkbox">';
                if (OrderDetailrecords[0]["SC Tax Verification Pending"] == "Y")
                    order_Det_markup += '                                          				 <input type="checkbox" name="" id="SC_TVP_360" checked="checked"/>';
                else
                    order_Det_markup += '                                           				<input type="checkbox" name="" id="SC_TVP_360">';
                order_Det_markup += '                                            				<label for="SC_TVP_360" class="SC-360-cusin" id="sc-360-Tax"></label>';
                order_Det_markup += '                                        				</div>';
                order_Det_markup += '                                            	</div>';
                order_Det_markup += '                                        </div>';
                order_Det_markup += '                                            <div class="col-md-6 col-lg-6">';
                order_Det_markup += '                                                <p class="SC-360-card-body-head">Referral Details</p>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">OM use only:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value SC-360-od" title="' + OrderDetailrecords[0]["Comments"] + '" id="SC_OMUseOnly_360" value="' + OrderDetailrecords[0]["Comments"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">referred by insider:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" value="' + OrderDetailrecords[0]["SC Referred By"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Sleep IQ status:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value SC-360-od" id="SC_SleepIQStatus_360" value="' + OrderDetailrecords[0]["SC SleepIQ Status"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Error Description:</label>';
                order_Det_markup += '                                                    <input type="text" name="firstname" class="SC-360-item-value" title="' + OrderDetailrecords[0]["Back Office Error Text"] + '" value="' + OrderDetailrecords[0]["Back Office Error Text"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                                <div class="SC-360-item">';
                order_Det_markup += '                                                    <label class="SC-360-item-label no-margin">Sleep IQ Msg:</label>';
                order_Det_markup += '                                                    <input type="text" name="" class="SC-360-item-value" title="' + OrderDetailrecords[0]["SC SleepIQ Message"] + '" value="' + OrderDetailrecords[0]["SC SleepIQ Message"] + '">';
                order_Det_markup += '                                                </div>';
                order_Det_markup += '                                            </div>';
                order_Det_markup += '                                        </div>';
                order_Det_markup += '                                    </form>';
                order_Det_markup += '                                </div>';
                order_Det_markup += '                            </form>';
                order_Det_markup += '                            <div class="SC-360-card-footer">';
                order_Det_markup += '                                <div class="SC-360-card-footer-head">';
                order_Det_markup += '                                    <div class="SC-360-card-footer-title">';
                order_Det_markup += '                                        <p>Order Summary</p>';
                order_Det_markup += '                                    </div>';
                order_Det_markup += '                                    <div class="SC-360-card-footer-value">';
                order_Det_markup += '                                        <p>Order Total:<span id="oder360total"></span></p>';
                order_Det_markup += '                                    </div>';
                order_Det_markup += '                                </div>';
                order_Det_markup += '                                <div class="SC-360-card-footer-body">';
                order_Det_markup += '                                    <div class="SC-SO-Prod-info-main no-margin-top clearfix" id="SC_order360_summary">';
                order_Det_markup += '                                    </div>';
                order_Det_markup += '                                </div>';
                order_Det_markup += '                            </div>';
                return order_Det_markup;
            }
            //end:method for orderDetails Markup

            //Start: method for Line Details
            SCSalesOrder360Markup.prototype.SalesOrder360linedetailsAppletMarkup = function() {
                var linedetailsmarkup = "";
                linedetailsmarkup += ' <div class="SC-360-card-header">';
                linedetailsmarkup += '                                <div class="SC-360-title-and-icon">';
                linedetailsmarkup += '                                    <div class="icon-and-title">';
                linedetailsmarkup += '                                        <img src="images/custom/script-tblue.png" class="sales-order-icon">';
                linedetailsmarkup += '                                        <p class="no-margin">Line Details</p>';
                linedetailsmarkup += '                                    </div>';
                linedetailsmarkup += '                                    <div class="SC-360-save-container search-save" id="SC-360-cn-save" style="display: none;">';
                linedetailsmarkup += '                                        <img src="images/custom/arrow-right.png" id="SC-cn-save" class="more-width-save">';
                linedetailsmarkup += '                                        <img src="images/custom/close.png" id="SC-cn-close" class="more-width-close">';
                linedetailsmarkup += '                                    </div>';
                linedetailsmarkup += '                                </div>';
                linedetailsmarkup += '                            </div>';
                linedetailsmarkup += '                            <div class="SC-360-card-body clearfix">';
                linedetailsmarkup += '                                <div class="SC-table-with-scroll-main">';
                linedetailsmarkup += '                                    <table class="SC-table" id="SC-Order-line-table">';
                linedetailsmarkup += '                                          <thead>';
                linedetailsmarkup += '                                            <tr>';
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="LineNumber">Line</th>';
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="PartNumber">Sku#</th>';
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="QuantityRequested">Qty</th>';
                linedetailsmarkup += '                                                <th class="min-width-th-col">Product</th>';
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="SCFulfillmentStatusCode">Status</th>';
                //SPATIBAN:15-june-20: Added code for #STRY0024300
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="ShipMethod">Ship via & Delivery Type</th>';
                linedetailsmarkup += '                                                <th class="min-width-th-col">Line total</th>';
                linedetailsmarkup += '                                                <th class="sort-by min-width-th-col" id="SN-ATP-DATE">Scheduled Arrival Date - ATP</th>';
                linedetailsmarkup += '                                                <th class="min-width-th-col">Details</th>';
                linedetailsmarkup += '                                                <th class="min-width-th-col">Track</th>';
                //NGOLLA :Defect #693
                linedetailsmarkup += '                                                <th class="min-width-th-col">ADD-ON</th>';
                //RCHATHAR: Modified for defect number=653
                linedetailsmarkup += '                                                <th class="min-width-th-col"></th>';
                linedetailsmarkup += '                                            </tr>';
                linedetailsmarkup += '                                        </thead>';
                linedetailsmarkup += '                                     <tbody id="sc-LineDetails-Rcd">';
                linedetailsmarkup += '                                     </tbody>';
                linedetailsmarkup += '                                    </table>';
                linedetailsmarkup += '                                </div>';
                linedetailsmarkup += '                            </div>';
                linedetailsmarkup += '<div class="clearfix">';
                linedetailsmarkup += '<div class="pagination sc-pagination pull-right" id="SC-Linedetails-pagination">';
                linedetailsmarkup += '</div>';
                linedetailsmarkup += '</div>';
                return linedetailsmarkup;
            }
            //end: method for Line Details

            //Start: method for Payment Details
            SCSalesOrder360Markup.prototype.SalesOrder360paymentdetailsAppletMarkup = function() {
                var paymentdetailssmarkup = "";
                //paymentdetailssmarkup += '                      <div class="SC-360-card" id="consolidated_notes_card">';
                paymentdetailssmarkup += '                            <div class="SC-360-card-header">';
                paymentdetailssmarkup += '                                <div class="SC-360-title-and-icon">';
                paymentdetailssmarkup += '                                    <div class="icon-and-title">';
                paymentdetailssmarkup += '                                        <img src="images/custom/dollar-blue.png" class="sales-order-icon">';
                paymentdetailssmarkup += '                                        <p class="no-margin">Payment Details</p>';
                paymentdetailssmarkup += '                                    </div>';
                paymentdetailssmarkup += '                                    <div class="SC-360-save-container search-save" id="SC-360-cn-save" style="display: none;">';
                paymentdetailssmarkup += '                                        <img src="images/custom/arrow-right.png" id="SC-cn-save" class="more-width-save">';
                paymentdetailssmarkup += '                                        <img src="images/custom/close.png" id="SC-cn-close" class="more-width-close">';
                paymentdetailssmarkup += '                                    </div>';
                paymentdetailssmarkup += '                                </div>';
                paymentdetailssmarkup += '                            </div>';
                paymentdetailssmarkup += '                            <div class="SC-360-card-body clearfix">';
                paymentdetailssmarkup += '                                <div class="SC-table-with-scroll-main">';
                paymentdetailssmarkup += '                                    <table class="SC-table add-table" id="SC-payment-details-table">';
                paymentdetailssmarkup += '                                        <thead>';
                paymentdetailssmarkup += '                                            <tr>';
                paymentdetailssmarkup += '                                                <th class="sort-by fourth-th" id="PaymentMethod">Method</th>';
                paymentdetailssmarkup += '                                                <th class="sort-by second-th" id="PaymentDate">date and time</th>';
                paymentdetailssmarkup += '                                                <th class="sort-by five-th" id="SCPaymentStatus">status</th>';
                paymentdetailssmarkup += '                                                <th class="sort-by five-th" id="SCPaymentType">type</th>';
                paymentdetailssmarkup += '                                                <th class="max-th">Details</th>';
                paymentdetailssmarkup += '                                                <th class="sort-by second-th" id="TransactionAmount">Amount</th>';
                paymentdetailssmarkup += '                                                <th class="five-th">Delete</th>';
                paymentdetailssmarkup += '                                            </tr>';
                paymentdetailssmarkup += '                                        </thead>';
                paymentdetailssmarkup += '                                        <tbody id="sc-PaymenyDetails-rcd">';
                paymentdetailssmarkup += '                                        </tbody>';
                paymentdetailssmarkup += '                                    </table>';
                paymentdetailssmarkup += '                                </div>';
                paymentdetailssmarkup += '<div class="clearfix">';
                paymentdetailssmarkup += '<div class="pagination sc-pagination pull-right" id="Payment-Details-pagination">';
                paymentdetailssmarkup += '</div>';
                paymentdetailssmarkup += '</div>';
                paymentdetailssmarkup += '                            </div>';

                return paymentdetailssmarkup;
            }
            //end: method for Payment Details

            //Start: method for Payment History
            SCSalesOrder360Markup.prototype.SalesOrder360paymenthistoryAppletMarkup = function() {
                var paymenthistorymarkup = "";
                paymenthistorymarkup += '               <div class="SC-360-card-header">';
                paymenthistorymarkup += '                    <div class="SC-360-title-and-icon">';
                paymenthistorymarkup += '                        <div class="icon-and-title">';
                paymenthistorymarkup += '                            <img src="images/custom/clock-blue.png" class="sales-order-icon">';
                paymenthistorymarkup += '                            <p class="no-margin">Payment History</p>';
                paymenthistorymarkup += '                        </div>';
                paymenthistorymarkup += '                        <div class="SC-360-save-container search-save" id="SC-360-cn-save" style="display: none;">';
                paymenthistorymarkup += '                            <img src="images/custom/arrow-right.png" id="SC-cn-save" class="more-width-save">';
                paymenthistorymarkup += '                            <img src="images/custom/close.png" id="SC-cn-close" class="more-width-close">';
                paymenthistorymarkup += '                        </div>';
                paymenthistorymarkup += '                    </div>';
                paymenthistorymarkup += '                </div>';
                paymenthistorymarkup += '                <div class="SC-360-card-body clearfix">';
                paymenthistorymarkup += '                    <div class="SC-table-with-scroll-main">';
                paymenthistorymarkup += '                        <table class="SC-table">';
                paymenthistorymarkup += '                            <thead>';
                paymenthistorymarkup += '                                <tr>';
                paymenthistorymarkup += '                                    <th>Field</th>';
                paymenthistorymarkup += '                                    <th>New value</th>';
                paymenthistorymarkup += '                                    <th>old value</th>';
                paymenthistorymarkup += '                                    <th class="sort-by" id="SCDate">date</th>';
                paymenthistorymarkup += '                                    <th class="sort-by" id="RecordId">record id</th>';
                paymenthistorymarkup += '                                    <th class="sort-by" id="EmployeeLogin">employee login</th>';
                paymenthistorymarkup += '                                    <th class="sort-by" id="EmployeeId">employee id</th>';
                paymenthistorymarkup += '                                </tr>';
                paymenthistorymarkup += '                            </thead>';
                paymenthistorymarkup += '                            <tbody id="sc-Paymenthistory-rcd">';
                paymenthistorymarkup += '                            </tbody>';
                paymenthistorymarkup += '                        </table>';
                paymenthistorymarkup += '                    </div>';
                paymenthistorymarkup += '					<div class="clearfix">';
                paymenthistorymarkup += '					<div class="pagination sc-pagination pull-center" id="Payment-History-pagination">';
                paymenthistorymarkup += '					</div>';
                paymenthistorymarkup += '					</div>';
                paymenthistorymarkup += '                </div>';

                return paymenthistorymarkup;
            }
            //end: method for Payment History
            //start:HomeDelivery SR markup
            SCSalesOrder360Markup.prototype.SalesOrderHomeDeliverySRMarkup = function() {
                var HomeDeliverySrmarkup = "";
                HomeDeliverySrmarkup += '<div class="SC-360-card-header">';
                HomeDeliverySrmarkup += '                                <div class="SC-360-title-and-icon">';
                HomeDeliverySrmarkup += '                                    <div class="icon-and-title">';
                HomeDeliverySrmarkup += '                                        <img src="images/custom/truck_round_blue.png" class="sales-order-icon">';
                HomeDeliverySrmarkup += '                                        <p class="no-margin">Home Delivery SR</p>';
                HomeDeliverySrmarkup += '                                    </div>';
                HomeDeliverySrmarkup += '                                    <div class="SC-360-save-container search-save" id="SC-360-cn-save">';
                HomeDeliverySrmarkup += '                                        <button class="SC-SO-search-button proceed" id="sc-goto-activities">Go To Activities</button>';
                HomeDeliverySrmarkup += '                                    </div>';
                HomeDeliverySrmarkup += '                                </div>';
                HomeDeliverySrmarkup += '                            </div>';
                HomeDeliverySrmarkup += '                            <div class="SC-360-card-body clearfix">';
                HomeDeliverySrmarkup += '                                <div class="SC-table-with-scroll-main">';
                HomeDeliverySrmarkup += '                                    <table class="SC-table">';
                HomeDeliverySrmarkup += '                                        <thead>';
                HomeDeliverySrmarkup += '                                            <tr>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="dateopened">Date Opened</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="ordernumber">order #</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="srnumber">sr#</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="HDstatus">Status</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="HDPlannedstartDate">planned start date</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="HDStartDate">schedule start date</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="HDrescheduled">rescheduled</th>';
                HomeDeliverySrmarkup += '                                                <th class="sort-by" id="Hdrescheduledreason">rescheduled Reason</th>';
                HomeDeliverySrmarkup += '                                            </tr>';
                HomeDeliverySrmarkup += '                                        </thead>';
                HomeDeliverySrmarkup += '                                        <tbody id="SC-homedeliver-Sr-records">';
                HomeDeliverySrmarkup += '                                        </tbody>';
                HomeDeliverySrmarkup += '                                    </table>';
                HomeDeliverySrmarkup += '                                </div>';
                HomeDeliverySrmarkup += '                            </div>';
                HomeDeliverySrmarkup += '<div class="clearfix">';
                HomeDeliverySrmarkup += '<div class="pagination sc-pagination pull-right" id="HD-SR-pagination">';
                HomeDeliverySrmarkup += '</div>';
                HomeDeliverySrmarkup += '</div>';
                return HomeDeliverySrmarkup;
            }
            //End:HomeDelivery SR markup
            //start of attachments
            SCSalesOrder360Markup.prototype.SalesOrder360attachmentsmarkup = function() {
                var attachmentsmarkup = "";
                attachmentsmarkup += ' <div class="SC-360-card-header">';
                attachmentsmarkup += '                                <div class="SC-360-title-and-icon">';
                attachmentsmarkup += '                                    <div class="icon-and-title">';
                attachmentsmarkup += '                                        <img src="images/custom/attachment-selected.png" class="sales-order-icon">';
                attachmentsmarkup += '                                        <p class="no-margin">Attachments</p>';
                attachmentsmarkup += '                                    </div>';
                attachmentsmarkup += '                                    <div class="SC-360-save-container search-save" id="SC-360-cn-save">';
                attachmentsmarkup += '                                        <button class="SC-SO-search-button proceed" id="sc-new-attachment">Add Attachment</button>';
                attachmentsmarkup += '                                    </div>';
                attachmentsmarkup += '                                </div>';
                attachmentsmarkup += '                            </div>';
                attachmentsmarkup += '                            <div class="SC-360-card-body clearfix">';
                attachmentsmarkup += '                                <div class="SC-table-with-scroll-main">';
                attachmentsmarkup += '                                    <table class="SC-table" id="SC-Order-att-table">';
                attachmentsmarkup += '                                          <thead>';
                attachmentsmarkup += '                                            <tr>';
                attachmentsmarkup += '                                                <th class="sort-by" id="attachmentname">Attachment Name</th>';
                attachmentsmarkup += '                                                <th class="sort-by" id="sizeatt">Size(In Bytes)</th>';
                attachmentsmarkup += '                                                <th class="sort-by" id="typeatt">Type</th>';
                attachmentsmarkup += '                                                <th class="sort-by" id="modifiedatt">Modified</th>';
                attachmentsmarkup += '                                                <th class="sort-by" id="commentsatt">Comments</th>';
                attachmentsmarkup += '                                                <th class="min-width id="deleteatt">Delete</th>';
                attachmentsmarkup += '                                            </tr>';
                attachmentsmarkup += '                                        </thead>';
                attachmentsmarkup += '                                     <tbody id="sc-attachments-Rcd">';
                attachmentsmarkup += '                                     </tbody>';
                attachmentsmarkup += '                                    </table>';
                attachmentsmarkup += '                                </div>';
                attachmentsmarkup += '<div class="clearfix">';
                attachmentsmarkup += '<div class="pagination sc-pagination pull-right" id="SC-Attachments-pagination">';
                attachmentsmarkup += '</div>';
                attachmentsmarkup += '</div>';
                attachmentsmarkup += '                            </div>';

                return attachmentsmarkup;
            }
            //end of attachments
            //SNARRA:01/06/2018 START:Added Markup code for Manual discount List Applet
            SCSalesOrder360Markup.prototype.SalesOrder360Manualdiscountmarkup = function() {
                var manualdiscountsmarkup = "";
                manualdiscountsmarkup += ' <div class="SC-360-card-header">';
                manualdiscountsmarkup += '                                <div class="SC-360-title-and-icon">';
                manualdiscountsmarkup += '                                    <div class="icon-and-title">';
                manualdiscountsmarkup += '                                        <img src="images/custom/financing-icon.png">';
                manualdiscountsmarkup += '                                        <p class="no-margin">Manual Discounts</p>';
                manualdiscountsmarkup += '                                    </div>';
                manualdiscountsmarkup += '                                </div>';
                manualdiscountsmarkup += '                            </div>';
                manualdiscountsmarkup += '                            <div class="SC-360-card-body clearfix">';
                manualdiscountsmarkup += '                                <div class="SC-table-with-scroll-main">';
                manualdiscountsmarkup += '                                    <table class="SC-table" >';
                manualdiscountsmarkup += '                                          <thead>';
                manualdiscountsmarkup += '                                            <tr>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mdordernumber">Order Number</th>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mdline">Line</th>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mdsku">SKU</th>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mddiscount">Discount Reason</th>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mdqty">QTY</th>';
                manualdiscountsmarkup += '                                                <th class="min-width" id="mddiscountamount">Discount Amount</th>';
                manualdiscountsmarkup += '                                                <th class="sort-by" id="mdtda">Total Discount Amount</th>';
                manualdiscountsmarkup += '                                                <th class="min-width" id="mduser">User</th>';
                manualdiscountsmarkup += '                                                <th class="min-width" id="mddate">Date</th>';
                manualdiscountsmarkup += '                                            </tr>';
                manualdiscountsmarkup += '                                        </thead>';
                manualdiscountsmarkup += '                                     <tbody id="sc-manuladiscount-Records">';
                manualdiscountsmarkup += '                                     </tbody>';
                manualdiscountsmarkup += '                                    </table>';
                manualdiscountsmarkup += '                                </div>';
                manualdiscountsmarkup += '<div class="clearfix">';
                manualdiscountsmarkup += '<div class="pagination sc-pagination pull-right" id="SC-manualdiscount-pagination">';
                manualdiscountsmarkup += '</div>';
                manualdiscountsmarkup += '</div>';
                manualdiscountsmarkup += '                            </div>';

                return manualdiscountsmarkup;
            }
            //SNARRA:01/06/2018 END:Added Markup code for Manula discount List Applet
            //Start: method for Delete POPup
            SCSalesOrder360Markup.prototype.SalesOrder360DeletePopup = function() {
                var Deletepopup = "";
                Deletepopup += '<div class="SC-modal">';
                Deletepopup += '                    <div class="modal-dialog">';
                Deletepopup += '                        <!-- Modal content-->';
                Deletepopup += '                        <div class="modal-content modal-red-bg">';
                Deletepopup += '                            <div class="icon">';
                Deletepopup += '                                <img src="images/custom/delete-red.png">';
                Deletepopup += '                            </div>';
                Deletepopup += '                            <div class="text">';
                Deletepopup += '                                <p>Delete Payment Line?</p>';
                Deletepopup += '                                <span class="SC-span-width">Are you sure you want to delete this payment line?</span>';
                Deletepopup += '                                <div class="SC-two-buttons">';
                Deletepopup += '                                   <button  id="SC-no-button">No</button>';
                Deletepopup += '                                   <button  id="SC-yes-button">Yes</button> ';
                Deletepopup += '                                </div>';
                Deletepopup += '                            </div>';
                Deletepopup += '                        </div>';
                Deletepopup += '                    </div>';
                Deletepopup += '                </div>';
                return Deletepopup;
            }
            //end: method for Delete Popup

            return SalesOrder360;
        }());
        return "SiebelApp.SCSalesOrder360Markup";
    })
}
