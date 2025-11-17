/*****************************

Author: Harish Kolla
Created: 28-Nov-2017
Purpose: To develop the Open UI Mark ups for Shipping
Modified: 

*****************************/
if (typeof(SiebelAppFacade.SCOrderShipToLineItemMarkup) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderShipToLineItemMarkup");
 define("siebel/custom/SelectComfort/SCOrderShipToLineItemMarkup", ["siebel/phyrenderer","siebel/custom/SelectComfort/bootstrap.min","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCOrderShipToLineItemMarkup = (function () {
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	var SC_OUI_Methods=SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	
	var ShippingMarkup = new SCOrderShipToLineItemMarkup();
	var lovArray_ShipMethods = '';
	var addList ='';

    function SCOrderShipToLineItemMarkup(pm) {}
    
    SCOrderShipToLineItemMarkup.prototype.ShipOptionsMarkup = function () {
         var ship_Option_Markup = '';
			ship_Option_Markup+='<div class="shipping-header no-margin">';
				ship_Option_Markup+='<p class="SC-SO-common-title">Shipping</p>';
				ship_Option_Markup+='<div class="proceed-and-products-block">';
					ship_Option_Markup+='<button class="b-to-prod" id="SC-Ship-BackToProducts">Back</button>';
					ship_Option_Markup+='<button class="b-to-prod pending-bg" id="SC-RepriceAll-shipping">Reprice All</button>';
					ship_Option_Markup+='<button class="validate" id="SC-ship-validate-order">Next</button>';
				ship_Option_Markup+='</div>';
			ship_Option_Markup+='</div>';
		return ship_Option_Markup;
	 
    };
	
	//Start: Function to set Default Shipping Details
	SCOrderShipToLineItemMarkup.prototype.DefaultShippingMarkup = function (scAccountOrder) {
		var default_Ship_Markup = '';
		//SBOORLA:Added markup for B2B order
		       default_Ship_Markup+='	<form id="SC-default-ship-container">';
			if(scAccountOrder){
				default_Ship_Markup+='<div class="SC-Payment-nav-tabs">';
				default_Ship_Markup+='<div class="SC-Payment-nav-item SC-Shipping-nav-item p-item-active" id="Ship-to-Account-button">Ship To Account</div>';
				default_Ship_Markup+='<div class="SC-Payment-nav-item SC-Shipping-nav-item" id="Ship-to-contact-button">Ship To Contact</div>';
				default_Ship_Markup+='</div>';
				default_Ship_Markup+=' <div id="SC-Ship-to-Account-info">';
				default_Ship_Markup+='                          <div class="default-shipping-container">';
				default_Ship_Markup+='                            <div class="default-shipping-header">';
				default_Ship_Markup+='                                <p class="no-margin">DEFAULT SHIP TO DETAILS</p>';
				default_Ship_Markup+='                           </div>';
				default_Ship_Markup+='                            <div class="default-shipping-contents">';
				default_Ship_Markup+='                                <div class="default-shipping-contents-left default-shipping-contents-info">';
				default_Ship_Markup+='                                    <div class="row no-margin">';
				default_Ship_Markup+='                                        <div class="col-sm-4 col-md-4 col-lg-4 shipping-content-item">';
				default_Ship_Markup+='                                            <p class="add-width">Account Name:</p>';
				default_Ship_Markup+='                                            <label class="overflow" id="scship-Acc-Name"></label>';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                        <div class="col-sm-3 col-md-3 col-lg-3 shipping-content-item">';
				default_Ship_Markup+='                                            <p>Phone:</p>';
				default_Ship_Markup+='                                            <input type="" name="shipdefaultnumber" id="scship-Acc-phone-number" class="shipping-ds-input">';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                        <div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-shippingAddr-sec">';
				default_Ship_Markup+='                                            <p>Address:</p>';
				default_Ship_Markup+='                                            <select class="shipping-dropdown" id="scship-Acc-adr">';
				default_Ship_Markup+='                                            </select>';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                    </div>';
				default_Ship_Markup+='                                    <div class="row no-margin margin-top">';
				default_Ship_Markup+='                                        <div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item">';
				default_Ship_Markup+='                                            <p>Request ship date:</p>';
				default_Ship_Markup+='                                            <label id="ShipAcc-Defalut-RequestShipDate"><span id="ShipAcc-Defalut-RequestShipDate-Val">select</span><input type="image" src="images/custom/calendar.png" class="calendar" id="sc-Accreq-shipdate" width="16" height="16"></label>'
				default_Ship_Markup+='                                        </div>';
				//09Nov24;SL;Added for Tiered Delivery
				default_Ship_Markup+='                                        <div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-Del-Tier">';
				default_Ship_Markup+='                                            <p>Delivery Tier:  </p>';
				default_Ship_Markup+='                                            <select class="shipping-dropdown" id="acc-Delivery-Tier">';
				default_Ship_Markup+='                                            </select>';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                    </div>';
				default_Ship_Markup+='                                </div>';
				default_Ship_Markup+='                            </div>';
				default_Ship_Markup+='                        </div>';
				default_Ship_Markup+='                   </div>';
				default_Ship_Markup+='<div id="SC-Ship-to-Contact-info" class="inactive-tab">';
			}
			default_Ship_Markup+='<div class="default-shipping-container">';
					default_Ship_Markup+='<div class="default-shipping-header">';
						default_Ship_Markup+='<p class="no-margin">DEFAULT SHIP TO DETAILS</p>';
						default_Ship_Markup+='<div class="dropdown display-inline">';
							default_Ship_Markup+='<button class="shipping-button" type="button"  id="SC-add-new-contact" ><img src="images/custom/plus_circle_white.png" class="add-plus"/>New Contact</button>';
						default_Ship_Markup+='</div>';
					default_Ship_Markup+='</div>';
					default_Ship_Markup+='<div class="default-shipping-contents">';
						default_Ship_Markup+='<div class="default-shipping-contents-left">';
							default_Ship_Markup+='<div class="row no-margin">';
							  default_Ship_Markup+='<div class="col-sm-3 col-md-3 col-lg-3 shipping-content-item">';
									default_Ship_Markup+='<p>Name:</p>';
									default_Ship_Markup+='<label id="Ship-Default-Name"></label>';
								default_Ship_Markup+='</div>';
								default_Ship_Markup+='<div class="col-sm-4 col-md-4 col-lg-4 shipping-content-item">';
									default_Ship_Markup+='<p>Delv Phone #:</p>';
									default_Ship_Markup+='<input type="" name="shipdefaultnumber" value="" class="shipping-ds-input" id="Ship-Default-PhNumber" maxlength="14" >';
								default_Ship_Markup+='</div>';
								default_Ship_Markup+='<div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-shippingAddr-sec">';
                                            default_Ship_Markup+='<p>Address:</p>';
                                            default_Ship_Markup+='<select class="shipping-dropdown Ship-ShipToAddress" id="Ship-Default-BillToAddress">';
                                            default_Ship_Markup+='</select>';
                                        default_Ship_Markup+='</div>';
							default_Ship_Markup+='</div>';
							default_Ship_Markup+='<div class="row no-margin margin-top">';
								default_Ship_Markup+='<div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Ship-Date-Div">';
									default_Ship_Markup+='<p>Request Ship Date:  </p>';
									default_Ship_Markup+='<label id="Ship-Defalut-RequestShipDate"><span id="Ship-Defalut-RequestShipDate-Val">select</span><input type="image" src="images/custom/calendar.png" class="calendar" id="Ship-Default-Calander" width="16" height="16"></label>';
									default_Ship_Markup+='</div>';
									//17Sep24;SL;Added for Tiered Delivery
									default_Ship_Markup+='<div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-Del-Tier">';
									default_Ship_Markup+='<p>Delivery Tier:  </p>';
									default_Ship_Markup+='<select class="shipping-dropdown" id="Delivery-Tier">';
									default_Ship_Markup+='</select>';
									default_Ship_Markup+='</div>';
							default_Ship_Markup+='</div>';
						default_Ship_Markup+='</div>';
						default_Ship_Markup+='<div class="default-shipping-contents-right">';
						if(scAccountOrder)
							default_Ship_Markup+='<button class="shipping-button" id="SC-AccChange-contact"><img src="images/custom/profile_white.png" class="add-plus" />Change Contact</button>';
						else
							default_Ship_Markup+='<button class="shipping-button" type="button" id="SC-search-contact"><img src="images/custom/profile_white.png" class="add-plus" />Change Contact</button>';
						default_Ship_Markup+='</div>';
					default_Ship_Markup+='</div>';
				default_Ship_Markup+='</div>';
				if(scAccountOrder)
				default_Ship_Markup+='</div>';
			default_Ship_Markup+='</form>';
			return default_Ship_Markup;
	};
	 
	//End: Function to set Default Shipping Details
	
	//Start: Function to set Shipping Details Line Items
	 SCOrderShipToLineItemMarkup.prototype.ShippingDetails = function () {
		var ship_details_Markup = '';
			ship_details_Markup+='<div class="shipping-header no-margin">';
			ship_details_Markup+='<p class="SC-SO-common-title shipping-title add-margin">SHIPPING DETAILS</p>';
			ship_details_Markup+='</div>';
			ship_details_Markup+='<div class="SC-shipping-table SC-shipping-tablenew" id="SC-shipping-table">';
			ship_details_Markup+='	<div class="table-row header-bg" id="table">';
			//SBOORLA:Added code for defect 632
			ship_details_Markup+='		<div class="column mini cap" id="column">line#';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column big cap" id="column">product';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column big cap">shipping method';
			ship_details_Markup+='			</div>';
			ship_details_Markup+='		<div class="column small cap">Delivery Tier';//17Sep24;SL;Tier Delivery-Renamed Delivery Type to Delivery Tier
			ship_details_Markup+='		   </div>';
			ship_details_Markup+='		<div class="column big cap" style="width: 27%;">';
			ship_details_Markup+='			shipping address';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column small cap" id="sc-line-contact">Contact';
			ship_details_Markup+='		 </div>';
			ship_details_Markup+='		<div class="column small cap">Delivery Phone #';
			ship_details_Markup+='		 </div>';
			ship_details_Markup+='		<div class="column small cap">Scheduled Arrival Date - ATP';
			ship_details_Markup+='		 </div>';
			//ship_details_Markup+='		<div class="column small cap">req. shipping date';Commented for SFSTRY0001757 APRAKASH
			//ship_details_Markup+='		   </div>';Commented for SFSTRY0001757 APRAKASH
			ship_details_Markup+='	</div>';
			ship_details_Markup+='	<div id="TBody-Ship-Details-LineItems">';
			ship_details_Markup+='	</div>'; //close of tbody Id's div
			ship_details_Markup+='</div>'; //close of SC-shipping-table id's div
			ship_details_Markup+='<div class="container"> ';
			ship_details_Markup+='	<div class="pagination sc-pagination pull-right" id="shipping-pagination">'; 
			ship_details_Markup+='	</div>';
			ship_details_Markup+='</div>';
		return ship_details_Markup;
	}; 
	//End: Function to set Shipping Details Line Items
	//ADD NEW CONTACT STARTS HERE
	SCOrderShipToLineItemMarkup.prototype.Shipping_CreateNewContact = function () {
		var ship_AddNewContact = '';
				ship_AddNewContact+='<div class="modal-dialog">';
                    ship_AddNewContact+='<div class="modal-content">';
					ship_AddNewContact+='<form id="SC-SO-Ship-CreateContactForm">';
                        ship_AddNewContact+='<div class="modal-header modal-min-height">';
                            ship_AddNewContact+='<button type="reset" class="close SC-close-popup blue-bg" data-dismiss="modal">&times;</button>';
                            ship_AddNewContact+='<div class="header-content address-header">';
                                ship_AddNewContact+='<div class="sc-head-title">';
                                    ship_AddNewContact+='<div class="sc-icon-text">';
                                        ship_AddNewContact+='<div class="sc-header-text no-padding">';
                                            ship_AddNewContact+='<p>NEW CONTACT</p>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                ship_AddNewContact+='</div>';
                            ship_AddNewContact+='</div>';
                        ship_AddNewContact+='</div>';
                        ship_AddNewContact+='<div class="modal-body modal-contact-body">';
                            ship_AddNewContact+='<div class="modal-input-container clearfix">';
                               ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="firstname" class="SC-label mandatory required">First Name</label>';
                                                ship_AddNewContact+='<input type="text" name="firstname" class="SC-input" id="SC-SO-Ship-FirstName">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="lastname" class="SC-label mandatory required">Last Name</label>';
                                                ship_AddNewContact+='<input type="text" name="lastname" class="SC-input" id="SC-SO-Ship-LastName">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="email" class="SC-label">Email</label>';
                                                ship_AddNewContact+='<input type="text" name="emailEmpty" class="SC-input" id="SC-SO-Ship-EmailAddress">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="address" class="SC-label mandatory required">Address</label>';
                                                ship_AddNewContact+='<input type="text" name="address" class="SC-input" id="SC-SO-Ship-Address">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="phone" class="SC-label">Phone</label>';
                                                ship_AddNewContact+='<input type="text" name="phone" class="SC-input" id="SC-SO-Ship-NewCon-Ph">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="apt" class="SC-label">Apartment/Suite/Unit</label>';
                                                ship_AddNewContact+='<input type="text" name="apt" class="SC-input" id="SC-SO-Ship-Apt">';
												ship_AddNewContact += '                                                <div class="tooltip fade bottom" role="tooltip" id="SN-new-APTToolTip" style="top: 52px; left: -0.0078125px; display: none;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Please enter Apartment/Suite/Unit</div></div>';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="city" class="SC-label mandatory required">City</label>';
                                                ship_AddNewContact+='<input type="text" name="city" class="SC-input" id="SC-SO-Ship-City">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="zipcode" class="SC-label mandatory required">Zip Code</label>';
                                                ship_AddNewContact+='<input type="text" name="zipcode" class="SC-input" id="SC-SO-Ship-ZipCode">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="state" class="SC-label mandatory required">State/Province</label>';
                                                ship_AddNewContact+='<input type="text" name="state" class="SC-input" id="SC-SO-Ship-State">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                              ship_AddNewContact+='</div>';
				ship_AddNewContact+='</div>';
					ship_AddNewContact+='<div class="modal-footer">';
						ship_AddNewContact+='<div class="SC-button">';
							ship_AddNewContact+='<button id="SC-SO-Ship-SaveNewContact">Save Contact</button>';
						ship_AddNewContact+='</div>';
					ship_AddNewContact+='</div>';
					ship_AddNewContact+='</form>';
				ship_AddNewContact+='</div>';
			ship_AddNewContact+='</div>';
		return ship_AddNewContact;
	 };
	//ADD NEW CONTACT ENDS HERE 
	//ADD NEW ADDRESS POPUP STARTS HERE
	SCOrderShipToLineItemMarkup.prototype.Shipping_CreateNewAddress = function () {
		var ship_AddNewAddress = '';
			ship_AddNewAddress += '                <div class="modal-dialog">';
			ship_AddNewAddress += '                    <div class="modal-content">';
			ship_AddNewAddress += '                                <form id="SC-SO-Ship-CreateNewAddress">';
			ship_AddNewAddress += '                        <div class="modal-header">';
			ship_AddNewAddress += '                            <button type="reset" class="close SC-close-popup blue-bg" data-dismiss="modal">&times;</button>';
			ship_AddNewAddress += '                            <div class="header-content address-header">';
			ship_AddNewAddress += '                                <div class="sc-head-title">';
			ship_AddNewAddress += '                                    <div class="sc-icon-text">';
			ship_AddNewAddress += '                                        <div class="sc-header-text no-padding">';
			ship_AddNewAddress += '                                    <p>ADD NEW ADDRESS</p>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                                </div>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                        <div class="modal-body modal-address-body">';
			ship_AddNewAddress += '                            <div class="modal-input-container">';
			ship_AddNewAddress += '                                    <div class="row no-margin clearfix">';
			ship_AddNewAddress += '                                        <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Address" class="SC-label mandatory required">Address</label>';
			ship_AddNewAddress += '                                                <input type="text" name="address" class="SC-input" id="SC-SO-Ship-NA-Address">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Apt" class="SC-label">Apartment/Suite/Unit</label>';
			ship_AddNewAddress += '                                                <input type="text" name=" " class="SC-input" id="SC-SO-Ship-NA-Apt">';
			ship_AddNewAddress += '                                                <div class="tooltip fade bottom" role="tooltip" id="SNAPTToolTip" style="top: 52px; left: -0.0078125px; display: none;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Please enter Apartment/Suite/Unit</div></div>';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                                    <div class="row no-margin clearfix">';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="City" class="SC-label mandatory required">City</label>';
			ship_AddNewAddress += '                                                <input type="text" name="city" class="SC-input" id="SC-SO-Ship-NA-City">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="State" class="SC-label mandatory required">State/Province</label>';
			ship_AddNewAddress += '                                                <input type="text" name="state" class="SC-input" id="SC-SO-Ship-NA-State">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Zipcode" class="SC-label mandatory required">Zip Code</label>';
			ship_AddNewAddress += '                                                <input type="text" name="zipcode" class="SC-input" id="SC-SO-Ship-NA-ZipCode">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                        <div class="modal-footer">';
			ship_AddNewAddress += '                            <div class="SC-button">';
			ship_AddNewAddress += '                                <button id="SC-SO-Ship-SaveNewAddress">Save Address</button>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                                </form>';
			ship_AddNewAddress += '                    </div>';
			ship_AddNewAddress += '                </div>';
			return ship_AddNewAddress;
	 };
	// ADD NEW ADDRESS POPUP ENDS HERE 
	//Calculate fright popup starts here
	 SCOrderShipToLineItemMarkup.prototype.Shipping_Verify = function () {
		var ship_Cal_Freight_verify = '';
			ship_Cal_Freight_verify+='				 <div class="SC-modal">';
			ship_Cal_Freight_verify+='                    <div class="modal-dialog">';
			ship_Cal_Freight_verify+='                      <div class="modal-content modal-another-color">';
			ship_Cal_Freight_verify+='                            <div>';
			ship_Cal_Freight_verify+='                                <img src="images/custom/sc-logo.png">';
			ship_Cal_Freight_verify+='                            </div>';
			ship_Cal_Freight_verify+='                            <div class="text">';
			ship_Cal_Freight_verify+='                                <span class="add-margin">Please wait while we validate your order for shipping to calculate the applicable freight charges and taxes</span>';
			ship_Cal_Freight_verify+='                            </div>';
			ship_Cal_Freight_verify+='                        </div>';
			ship_Cal_Freight_verify+='                    </div>';
			ship_Cal_Freight_verify+='                </div>';
			
			return ship_Cal_Freight_verify;
	 };
	 //Calculate fright popup ends here
	 
	 //Calculate fright success popup starts here
	  SCOrderShipToLineItemMarkup.prototype.Shipping_CF_Success = function () {
			var ship_Cal_Freight_Success = '';
			ship_Cal_Freight_Success+='					 <div class="SC-modal">';
			ship_Cal_Freight_Success+='                    <div class="modal-dialog">';
			ship_Cal_Freight_Success+='                       <div class="modal-content modal-another-color">';
			ship_Cal_Freight_Success+='                            <div class="icon img-color">';
			ship_Cal_Freight_Success+='                                <img src="images/custom/done-blue.png">';
			ship_Cal_Freight_Success+='                            </div>';
			ship_Cal_Freight_Success+='                            <div class="text">';
			ship_Cal_Freight_Success+='                                <p>Success</p>';
			ship_Cal_Freight_Success+='                                <span class="SC-span-width">Your order has been validated, freight charges and taxes calculated.</span>';
			ship_Cal_Freight_Success+='                            </div>';
			ship_Cal_Freight_Success+='                        </div>';
			ship_Cal_Freight_Success+='                    </div>';
			ship_Cal_Freight_Success+='                </div>';
			return ship_Cal_Freight_Success;
	  };
	  //Calculate fright popup ends here
	  
	  //Calculate fright Failure popup starts here
	   SCOrderShipToLineItemMarkup.prototype.Shipping_CF_Failure = function () {
			var ship_Cal_Freight_Fail = '';
			ship_Cal_Freight_Fail+='                <div class="SC-modal">';
			ship_Cal_Freight_Fail+='                    <div class="modal-dialog">';
			ship_Cal_Freight_Fail+='						<div class="modal-content less-height">';
			ship_Cal_Freight_Fail+='                           <div class="text">';
			ship_Cal_Freight_Fail+='                                <span class="SC-span-width add-margin">Please review and fix your order details before proceeding.</span>';
			ship_Cal_Freight_Fail+='                                <button class="SC-ok-button" id="SC-CF-failure-button">ok</button>';
			ship_Cal_Freight_Fail+='                            </div>';
			ship_Cal_Freight_Fail+='                        </div>';
			ship_Cal_Freight_Fail+='                    </div>';
			ship_Cal_Freight_Fail+='                </div>';
			return ship_Cal_Freight_Fail;
			};
		// Calculate fright popup ends here
	//Start:Location is not matched is order location popup
	 SCOrderShipToLineItemMarkup.prototype.StoreLocation_Verify = function () {
		var storelocation_verify_markup = '';
		storelocation_verify_markup+='<div class="SC-modal modal-orange-bg">';
        storelocation_verify_markup+='            <div class="modal-dialog">';
        storelocation_verify_markup+='               <div class="modal-content less-height">';
        storelocation_verify_markup+='                    <div class="text">';
        storelocation_verify_markup+='                        <span class="SC-span-width add-margin" id="SC-order-location-text">The Order Sale Location does not match the Store Register location, click ‘Yes’ to auto-update order sale location</span>';
        storelocation_verify_markup+='                       <div class="SC-two-buttons">';
        storelocation_verify_markup+='                            <button id="Store-no-ship">No</button>';
        storelocation_verify_markup+='                            <button id="store-yes-ship">Yes</button>';
        storelocation_verify_markup+='                        </div>';
        storelocation_verify_markup+='                    </div>';
        storelocation_verify_markup+='                </div>';
        storelocation_verify_markup+='            </div>';
        storelocation_verify_markup+='        </div>';
		return storelocation_verify_markup;
	 };
	 //End:Location is not matched is order location popup
	 
	 //start:loactions are not matched popup
	 SCOrderShipToLineItemMarkup.prototype.MyStoreLocation_Verify = function () {
		var My_storemarkup = '';
		My_storemarkup+='<div class="SC-modal modal-orange-bg">';
        My_storemarkup+='            <div class="modal-dialog">';
		My_storemarkup+='				<div class="modal-content less-height">';
        My_storemarkup+='                    <div class="text">';
        My_storemarkup+='                        <span class="SC-span-width add-margin">The current location does not match the store register location</span>';
        My_storemarkup+='                        <button class="SC-ok-button" id="SC-loc-ok">ok</button>';
        My_storemarkup+='                    </div>';
        My_storemarkup+='                </div>';
        My_storemarkup+='            </div>';
        My_storemarkup+='        </div>';
		return My_storemarkup;
	 };
	 //End:loactions are not matched popup 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.SelectDeliveryType = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Choose Delivery Type for each Ship To Address</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible');
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div class="SC-order-DelType" style="padding-bottom: 10px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span style="color: #0075ff;"><b>Delivery Type: </b></span>';
					/* if(sDeliveryType == 'Home Delivery'){
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery" checked> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					}else if(sDeliveryType == 'Doorstep Delivery'){
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep" checked>';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					}
					else { */
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					// }
					/* DeliveryTypeMarkup +=' 		<div style="float: right; margin-right:100px" id="SC-Add-Disposal">';
					DeliveryTypeMarkup +='       <label>Add Disposal: </label>';
					DeliveryTypeMarkup +=' 		<input style="margin-top: 4px;" type="Checkbox" name="Add Disposal" value="Add Disposal"> '; 
					DeliveryTypeMarkup +=' 		</div>';  */
					DeliveryTypeMarkup +=' </div>';	
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit SC-disabled"  style="background: #808080	!important; border: #808080	!important;" id="update-delivery-type">Next</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.ReSelectDeliveryType = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Choose Delivery Type for each Ship To Address</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible'); //ReOptionEligible
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div class="SC-order-ReDelType" style="padding-bottom: 10px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span style="color: #0075ff;"><b>Delivery Type: </b></span>';
					DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
					DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
					DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
					DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					DeliveryTypeMarkup +=' </div>';	
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit SC-disabled"  style="background: #808080	!important; border: #808080	!important;" id="update-delivery-type">Next</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.ReSelectDeliveryTypeOption = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Do you want to change Home Delivery Type for the below Order Lines?</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible');
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit" style="background: #F63 !important;border: #F63 !important;" id="update-delivery-type-cancel">No</button>';
			DeliveryTypeMarkup+=' <button type="submit" class="submit" id="update-delivery-type-option">Yes</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	  SCOrderShipToLineItemMarkup.prototype.ShippingSummary = function () {
			var shipping_summaryMarkup = '';
			shipping_summaryMarkup +='                        <div class="SC-SO-panel-head" id="SC-SO-ShippingSummary-Header">';
			shipping_summaryMarkup += '                            <div class="SC-SO-panel-title">';
			shipping_summaryMarkup += '                                <button data-toggle="collapse" data-target="#SC-SO-ShippingSummary-Body" id="ship-expand-collapse" class="sc-icon iconClosed"></button>';
			shipping_summaryMarkup += '									<div class="SC-title-button">';
			shipping_summaryMarkup += '                                <p class="no-margin">Shipping</p>';
			shipping_summaryMarkup += '   							</div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                            <div class="SC-SO-details-items">';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">shipments:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value" id="SC-SO-ShipSummary-Shipments"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">default address:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value" id="SC-SO-ShipSummary-DefaultAddress"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">shipping total:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value pending" id="SC-SO-ShipSummary-Total"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                        </div>';
			shipping_summaryMarkup +='                        <div class="SC-SO-panel-body collapse in clearfix no-left-padding" id="SC-SO-ShippingSummary-Body" >';
			shipping_summaryMarkup += '                            <div class="SC-SO-Prod-info-main no-margin-top" id="SC-SO-ShippingSummary-Body-Data">';
			shipping_summaryMarkup += '                                <!--This is cart item start -->';
			shipping_summaryMarkup += '                                <div class="cart-item clearfix no-margin-bottom20">';
			shipping_summaryMarkup += '                                    <div class="SC-SO-Prod-items left-padding">';
			shipping_summaryMarkup += '                                        <div class="title-sku less-padding">';
			shipping_summaryMarkup += '                                            <div class="delete-title">';
			shipping_summaryMarkup += '                                                <p class="product-title no-margin">Shipping Address</p>';
			shipping_summaryMarkup += '                                            </div>';
			shipping_summaryMarkup += '                                        </div>';
			shipping_summaryMarkup += '                                         <div class="header-items header-width header-padding">';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">SHIPPING METHOD</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">START PRICE</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">DISCOUNTS</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">NET PRICE</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">TAX</p>';
			shipping_summaryMarkup += '											 	</div>';
			shipping_summaryMarkup += '												<div class="header-item header-last-item-width">';
			shipping_summaryMarkup += '												<p class="item-title">SHIPPING COST</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '											</div>';
			shipping_summaryMarkup += '                                    </div>';
			shipping_summaryMarkup += ' 									<div class="SC-SO-Prod-addon-items-block left-padding" id="sc-lineitem-ship-summary">';
			shipping_summaryMarkup += '										</div>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                        </div>';
		return shipping_summaryMarkup;
	  
	  };
	  // This is cart item end
	   SCOrderShipToLineItemMarkup.prototype.ShippingSummaryMarkup = function (Addres_Array,scaccountOrder) {
			var totalShipForAllShipMethods=0;
			var shipmentsCount = 0;
			//Added code for defect 623
			var shipping_summaryMarkup = '',shiptoAccId="",shiptoAcCname="";
			SiebelJS.Log(JSON.stringify(Addres_Array));
			if(scaccountOrder){
			shiptoAccId=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Ship To Account Id");
			shiptoAcCname=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Bill To Account");
			}
			for(var iLoop=0; iLoop<Addres_Array.length; iLoop++)
			{
			var newRec = Addres_Array[iLoop];
			SiebelJS.Log("newRec::"+newRec);
			if(newRec!='}'){
				var newRecJSON = JSON.parse(newRec);
				//SBOORLA:Added code for defect 748
				if(newRecJSON["Product Line"]=="MATTRESS" &&newRecJSON["Request To Cancel"]!="Y"){
						$("#SC-SO-ShipSummary-DefaultAddress").html(newRecJSON["SC Ship To Address Name"]);
				}
				if(newRecJSON["Product Line"]=="DELIVERY" &&newRecJSON["Request To Cancel"]!="Y")
				{
					
					var startprice=newRecJSON["Start Price"]!=""?parseFloat(newRecJSON["Start Price"],10):0.00;
					var discounts=newRecJSON["SC Total Line Discounts"]!=""?parseFloat(newRecJSON["SC Total Line Discounts"],10):0.00;
					var netprice=newRecJSON["NRC Sub Total"]!=""?parseFloat(newRecJSON["NRC CxTotal in Header Currency"],10):0.00;
					var tax=newRecJSON["Tax Amount"]!=""?parseFloat(newRecJSON["Tax Amount"],10):0.00;
					shipmentsCount += 1;
					var shitopcontactname=newRecJSON["Ship To First Name"]+" "+newRecJSON["Ship To Last Name"];
					totalShipForAllShipMethods += parseFloat(newRecJSON["SC Line Total NRC"], 10);
					shipping_summaryMarkup += ' 						<div class="SC-SO-Prod-addon-item SC-SO-no-margin no-padding">';
					shipping_summaryMarkup += '                             <div class="SC-SO-Prod-addon-item-name address-flex">';
					if(scaccountOrder){
						if(shiptoAccId=="")
						shipping_summaryMarkup += '                                 <p class="no-padding">'+shitopcontactname+'</p>';
						else
						shipping_summaryMarkup += '                                 <p class="no-padding">'+shiptoAcCname+'</p>';
					
					}else
					shipping_summaryMarkup += '                                 <p class="no-padding">'+shitopcontactname+'</p>';
					shipping_summaryMarkup += '                                 <p class="no-padding">' + newRecJSON["SC Ship To Address Name"] + '</p>';
					shipping_summaryMarkup += '                             </div>';
					shipping_summaryMarkup += '                             <div class="SC-SO-Prod-items">';
					shipping_summaryMarkup += '                                 <div class="header-items header-width">';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					//SPATIBAN:15-june-20: Added code for #STRY0024300
					if(newRecJSON["Shipping"]!=""){
						if(newRecJSON["Shipping"] == "Home Delivery"){
							shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] +'</p>';
						}else{
							shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] + '-'  +newRecJSON["Shipping"]+'</p>';
						}
					}else{
						shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] + '</p>';
					}
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+startprice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+discounts.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+netprice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-last-item-width">';
					if (parseInt(newRecJSON["SC Line Total NRC"], 10) == 0)
					shipping_summaryMarkup += '                                         <p class="item-value">FREE</p>';
					else
					 shipping_summaryMarkup += '                                         <p class="item-value">$' + Number(newRecJSON["SC Line Total NRC"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+ '</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                 </div>';
					shipping_summaryMarkup += '                             </div>';
					shipping_summaryMarkup += '                         </div>';
					
					/*shipping_summaryMarkup += '								<div class="cart-item clearfix no-margin-bottom20">';
					shipping_summaryMarkup += '                                   <div class="SC-SO-Prod-addon-items-block left-padding">';
					shipping_summaryMarkup += '                       <div class="SC-SO-Prod-addon-item SC-SO-no-margin no-padding">';
					shipping_summaryMarkup += '                           <div class="SC-SO-Prod-addon-item-name address-flex">';
					shipping_summaryMarkup += '                                                <p>'+$("#Ship-Default-Name").html()+'</p>';
					shipping_summaryMarkup += '                                                  <p>' + newRecJSON["SC Ship To Address Name"] + '</p>';
					shipping_summaryMarkup += '                                            </div>';
					shipping_summaryMarkup += '                                            <div class="SC-SO-Prod-items intial-align">';
					shipping_summaryMarkup += '                                                <div class="header-items">';
					shipping_summaryMarkup += '                                                    <div class="header-item">';
					shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipType">' + newRecJSON["Ship Method"] + '</p>';
					shipping_summaryMarkup += '                                                    </div>';
					shipping_summaryMarkup += '                                                    <div class="header-item">';
					if (parseInt(newRecJSON["SC Line Total NRC"], 10) == 0)
						shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipCost">FREE</p>';
					else
						shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipCost">$' + newRecJSON["SC Line Total NRC"]+ '</p>';
					shipping_summaryMarkup += '                                                    </div>';
					shipping_summaryMarkup += '                                                </div>';
					shipping_summaryMarkup += '                                            </div>';
					shipping_summaryMarkup += '                                        </div>';
					shipping_summaryMarkup += '                                    </div>';
					shipping_summaryMarkup += '                                </div>';*/
				}
			}
		 }
		  $("#sc-lineitem-ship-summary").html(shipping_summaryMarkup);
		  if(shipmentsCount!=0){
			$("#SC-SO-ShippingSummary").show();  
			$("#SC-SO-ShipSummary-Shipments").html(shipmentsCount);
		  
		  if(totalShipForAllShipMethods == 0)
			var TotalCost = '<label class="item-value pending" id="SC-SO-ShipSummary-Total">FREE</label>';
		  else//NGOLLA defect 747 added code to display amount in 2 decimals
			var TotalCost = '<label class="item-value pending" id="SC-SO-ShipSummary-Total">$'+totalShipForAllShipMethods.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</label>'; 
		  $("#SC-SO-ShipSummary-Total").html(TotalCost);
		  }
	   };
	//Start: Getting LOVs of Shipping Methods
	SCOrderShipToLineItemMarkup.prototype.GetShippingMethods = function (subType) {
		
		var searchExpr = '',
	 	sortSpec = '';
	 	searchExpr = "[Active]='Y' AND [Type]='FS_CARRIER' AND [Parent] = '"+subType+"'";
	 	sortSpec = "";
	 	lovArray_ShipMethods = SC_OUI_Methods.GetLOVs(searchExpr, sortSpec);
	 	//SiebelJS.Log("lovArray::"+lovArray);
	//End: Getting LOVs of Shipping Methods
	return lovArray_ShipMethods;
	};
	SCOrderShipToLineItemMarkup.prototype.GetAddressList = function (conId_Global) {
		//This gets the all addresses
		addList = SC_OUI_Methods.GetContactAddressesList(conId_Global);
		SiebelJS.Log("addList is:" + addList);
		//var addr_JSON = JSON.parse(addList[j]);
		return addList;
	};
	
	//Start: Funtion to get the all addresses of the billingTo contact
	SCOrderShipToLineItemMarkup.prototype.AttachAddresses = function () {
		var addressLine = '';
		for (var j = 0; j < addList.length; j++) {
			if(addList[j] != "")
			{
				var addr_JSON = JSON.parse(addList[j]);
				addressLine += '<option>' + addr_JSON["Address Name"] + '</option>';
			}
		}
		if(addressLine == '')
		addressLine += '<option></option>';
	
		addressLine+='<span class="new-Add-Address"><option class="new-add">ADD NEW ADDRESS</option></span>';
		$(".Ship-ShipToAddress").html("");
		
		
	return 	addressLine
	};
	//End: Funtion to get the all addresses of the billingTo contact
	//Start: Function to set the previously selected addresses
	SCOrderShipToLineItemMarkup.prototype.SetPreSelectedValues = function (linItemsListRS) {
		for (var i = 0; i < linItemsListRS.length; i++) {
			if (linItemsListRS[i]["Product Line"] != 'DELIVERY') {
				//Start: Setting Address
				var preSelectedShipToAddress = '';
				preSelectedShipToAddress = linItemsListRS[i]["SC Ship To Address Name"];
				var dropDown_Id = '';
				dropDown_Id = (i+1) + "Ship-ShipToAddress";
				var output = '';
				output = document.getElementById(dropDown_Id).options;
				for (var j = 0; j < output.length; j++) {
					if (output[j].text.indexOf(preSelectedShipToAddress) != -1) {
						output[j].selected = true;
						break;
					}
				}
				if(preSelectedShipToAddress == "")
				{
					$("#"+dropDown_Id).val("");					
				}
				
				//End: Setting Address

				//Start: Shipping Method
				var preSelectedShippingMethod = '';
				preSelectedShippingMethod = linItemsListRS[i]["Ship Method"];
				dropDown_Id = '';
				dropDown_Id = (i+1) + "Ship-ShippingMethod";
				output = '';
				output = document.getElementById(dropDown_Id).options;
				for (var j = 0; j < output.length; j++) {
					if (output[j].text.indexOf(preSelectedShippingMethod) != -1) {
						output[j].selected = true;
						break;
					}
				}
				if(preSelectedShippingMethod == "")
				{
					$("#"+dropDown_Id).val("");					
				}
				//End: Shipping Method

				//Start: Phone Number
				var phone_Id = '';
				phone_Id = (i+1) + "Ship-ShipToContactPhNum";
				if (linItemsListRS[i]["SC Preferred Contact"] != "") {
					var mblNumb = linItemsListRS[i]["SC Preferred Contact"];
					if (mblNumb.match(/^\d+$/) && mblNumb.length == 10)
						SC_OUI_Methods.PH_USFormat_Save(phone_Id, mblNumb);
					else
						$("#phone_Id").val(mblNumb);
				}
				//End: Phone Number

				//Start: Contact
				var contact_Id = '';
				contact_Id = (i+1) + "Ship-ShipToContact";
				if (linItemsListRS[i]["Ship To First Name"] != "" || linItemsListRS[i]["Ship To Last Name"] != "")
					$("#" + contact_Id).val(linItemsListRS[i]["Ship To First Name"] + " " + linItemsListRS[i]["Ship To Last Name"]);

				//End: Contact

				//Start: Req Ship Date
				var req_shipDt_Id = '';
				req_shipDt_Id = (i+1) + "defaultRequestShipDate";
				if (linItemsListRS[i]["Due Date"] != "")
					$("#" + req_shipDt_Id).val(linItemsListRS[i]["Due Date"]);

				//End: Req Ship Date
			}
		}

	};
	//End: Function to set the previously selected addresses
	//Start: Request Referral Popup starts here
	SCOrderShipToLineItemMarkup.prototype.Request_Referral_Markup = function () {
		var request_referral_markup = "";
		  request_referral_markup+='<div class="SC-modal">';
		  request_referral_markup+=' 	<div class="modal-dialog">';
		  request_referral_markup+=' 		<div class="modal-content modal-another-color less-height">';
		  request_referral_markup+=' 			<div>';
		  request_referral_markup+='					<img src="images/custom/sc-logo.png">';
		  request_referral_markup+=' 			</div>';
		  request_referral_markup+=' 			<div class="text">';
		  request_referral_markup+=' 				<span class="SC-span-width add-margin">Was the customer referred to Sleep Number?</span>';
			  request_referral_markup+='			<div class="SC-two-buttons SC-SO-RR-buttons ">';
			  request_referral_markup+=' 				<button id="referral-yes-button">Yes</button>';
			  request_referral_markup+=' 				<button id="referral-no-button">No</button>';
			  request_referral_markup+=' 			</div>';
		  request_referral_markup+='			</div>';
		  request_referral_markup+=' 		</div>';
		  request_referral_markup+=' 	</div>';
		  request_referral_markup+='</div>';
		return request_referral_markup
	};
  //End: Request Referral Popup starts here
    return ShippingMarkup;
   }()
  );
  return "SiebelAppFacade.SCOrderShipToLineItemMarkup";
 })
}
/*****************************

Author: Harish Kolla
Created: 28-Nov-2017
Purpose: To develop the Open UI Mark ups for Shipping
Modified: 

*****************************/
if (typeof(SiebelAppFacade.SCOrderShipToLineItemMarkup) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCOrderShipToLineItemMarkup");
 define("siebel/custom/SelectComfort/SCOrderShipToLineItemMarkup", ["siebel/phyrenderer","siebel/custom/SelectComfort/bootstrap.min","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCOrderShipToLineItemMarkup = (function () {
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	var SC_OUI_Methods=SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	
	var ShippingMarkup = new SCOrderShipToLineItemMarkup();
	var lovArray_ShipMethods = '';
	var addList ='';

    function SCOrderShipToLineItemMarkup(pm) {}
    
    SCOrderShipToLineItemMarkup.prototype.ShipOptionsMarkup = function () {
         var ship_Option_Markup = '';
			ship_Option_Markup+='<div class="shipping-header no-margin">';
				ship_Option_Markup+='<p class="SC-SO-common-title">Shipping</p>';
				ship_Option_Markup+='<div class="proceed-and-products-block">';
					ship_Option_Markup+='<button class="b-to-prod" id="SC-Ship-BackToProducts">Back</button>';
					ship_Option_Markup+='<button class="b-to-prod pending-bg" id="SC-RepriceAll-shipping">Reprice All</button>';
					ship_Option_Markup+='<button class="validate" id="SC-ship-validate-order">Next</button>';
				ship_Option_Markup+='</div>';
			ship_Option_Markup+='</div>';
		return ship_Option_Markup;
	 
    };
	
	//Start: Function to set Default Shipping Details
	SCOrderShipToLineItemMarkup.prototype.DefaultShippingMarkup = function (scAccountOrder) {
		var default_Ship_Markup = '';
		//SBOORLA:Added markup for B2B order
		       default_Ship_Markup+='	<form id="SC-default-ship-container">';
			if(scAccountOrder){
				default_Ship_Markup+='<div class="SC-Payment-nav-tabs">';
				default_Ship_Markup+='<div class="SC-Payment-nav-item SC-Shipping-nav-item p-item-active" id="Ship-to-Account-button">Ship To Account</div>';
				default_Ship_Markup+='<div class="SC-Payment-nav-item SC-Shipping-nav-item" id="Ship-to-contact-button">Ship To Contact</div>';
				default_Ship_Markup+='</div>';
				default_Ship_Markup+=' <div id="SC-Ship-to-Account-info">';
				default_Ship_Markup+='                          <div class="default-shipping-container">';
				default_Ship_Markup+='                            <div class="default-shipping-header">';
				default_Ship_Markup+='                                <p class="no-margin">DEFAULT SHIP TO DETAILS</p>';
				default_Ship_Markup+='                           </div>';
				default_Ship_Markup+='                            <div class="default-shipping-contents">';
				default_Ship_Markup+='                                <div class="default-shipping-contents-left default-shipping-contents-info">';
				default_Ship_Markup+='                                    <div class="row no-margin">';
				default_Ship_Markup+='                                        <div class="col-sm-4 col-md-4 col-lg-4 shipping-content-item">';
				default_Ship_Markup+='                                            <p class="add-width">Account Name:</p>';
				default_Ship_Markup+='                                            <label class="overflow" id="scship-Acc-Name"></label>';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                        <div class="col-sm-3 col-md-3 col-lg-3 shipping-content-item">';
				default_Ship_Markup+='                                            <p>Phone:</p>';
				default_Ship_Markup+='                                            <input type="" name="shipdefaultnumber" id="scship-Acc-phone-number" class="shipping-ds-input">';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                        <div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-shippingAddr-sec">';
				default_Ship_Markup+='                                            <p>Address:</p>';
				default_Ship_Markup+='                                            <select class="shipping-dropdown" id="scship-Acc-adr">';
				default_Ship_Markup+='                                            </select>';
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                    </div>';
				default_Ship_Markup+='                                    <div class="row no-margin margin-top">';
				default_Ship_Markup+='                                        <div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item">';
				default_Ship_Markup+='                                            <p>Request ship date:</p>';
				default_Ship_Markup+='                                            <label id="ShipAcc-Defalut-RequestShipDate"><span id="ShipAcc-Defalut-RequestShipDate-Val">select</span><input type="image" src="images/custom/calendar.png" class="calendar" id="sc-Accreq-shipdate" width="16" height="16"></label>'
				default_Ship_Markup+='                                        </div>';
				default_Ship_Markup+='                                    </div>';
				default_Ship_Markup+='                                </div>';
				default_Ship_Markup+='                            </div>';
				default_Ship_Markup+='                        </div>';
				default_Ship_Markup+='                   </div>';
				default_Ship_Markup+='<div id="SC-Ship-to-Contact-info" class="inactive-tab">';
			}
			default_Ship_Markup+='<div class="default-shipping-container">';
					default_Ship_Markup+='<div class="default-shipping-header">';
						default_Ship_Markup+='<p class="no-margin">DEFAULT SHIP TO DETAILS</p>';
						default_Ship_Markup+='<div class="dropdown display-inline">';
							default_Ship_Markup+='<button class="shipping-button" type="button"  id="SC-add-new-contact" ><img src="images/custom/plus_circle_white.png" class="add-plus"/>New Contact</button>';
						default_Ship_Markup+='</div>';
					default_Ship_Markup+='</div>';
					default_Ship_Markup+='<div class="default-shipping-contents">';
						default_Ship_Markup+='<div class="default-shipping-contents-left">';
							default_Ship_Markup+='<div class="row no-margin">';
							  default_Ship_Markup+='<div class="col-sm-3 col-md-3 col-lg-3 shipping-content-item">';
									default_Ship_Markup+='<p>Name:</p>';
									default_Ship_Markup+='<label id="Ship-Default-Name"></label>';
								default_Ship_Markup+='</div>';
								default_Ship_Markup+='<div class="col-sm-4 col-md-4 col-lg-4 shipping-content-item">';
									default_Ship_Markup+='<p>Delv Phone #:</p>';
									default_Ship_Markup+='<input type="" name="shipdefaultnumber" value="" class="shipping-ds-input" id="Ship-Default-PhNumber" maxlength="14" >';
								default_Ship_Markup+='</div>';
								default_Ship_Markup+='<div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Sc-shippingAddr-sec">';
                                            default_Ship_Markup+='<p>Address:</p>';
                                            default_Ship_Markup+='<select class="shipping-dropdown Ship-ShipToAddress" id="Ship-Default-BillToAddress">';
                                            default_Ship_Markup+='</select>';
                                        default_Ship_Markup+='</div>';
							default_Ship_Markup+='</div>';
							default_Ship_Markup+='<div class="row no-margin margin-top">';
								default_Ship_Markup+='<div class="col-sm-5 col-md-5 col-lg-5 shipping-content-item" id="Ship-Date-Div">';
									default_Ship_Markup+='<p>Request Ship Date:  </p>';
									default_Ship_Markup+='<label id="Ship-Defalut-RequestShipDate"><span id="Ship-Defalut-RequestShipDate-Val">select</span><input type="image" src="images/custom/calendar.png" class="calendar" id="Ship-Default-Calander" width="16" height="16"></label>';
									default_Ship_Markup+='</div>';
							default_Ship_Markup+='</div>';
						default_Ship_Markup+='</div>';
						default_Ship_Markup+='<div class="default-shipping-contents-right">';
						if(scAccountOrder)
							default_Ship_Markup+='<button class="shipping-button" id="SC-AccChange-contact"><img src="images/custom/profile_white.png" class="add-plus" />Change Contact</button>';
						else
							default_Ship_Markup+='<button class="shipping-button" type="button" id="SC-search-contact"><img src="images/custom/profile_white.png" class="add-plus" />Change Contact</button>';
						default_Ship_Markup+='</div>';
					default_Ship_Markup+='</div>';
				default_Ship_Markup+='</div>';
				if(scAccountOrder)
				default_Ship_Markup+='</div>';
			default_Ship_Markup+='</form>';
			return default_Ship_Markup;
	};
	 
	//End: Function to set Default Shipping Details
	
	//Start: Function to set Shipping Details Line Items
	 SCOrderShipToLineItemMarkup.prototype.ShippingDetails = function () {
		var ship_details_Markup = '';
			ship_details_Markup+='<div class="shipping-header no-margin">';
			ship_details_Markup+='<p class="SC-SO-common-title shipping-title add-margin">SHIPPING DETAILS</p>';
			ship_details_Markup+='</div>';
			ship_details_Markup+='<div class="SC-shipping-table SC-shipping-tablenew" id="SC-shipping-table">';
			ship_details_Markup+='	<div class="table-row header-bg" id="table">';
			//SBOORLA:Added code for defect 632
			ship_details_Markup+='		<div class="column mini cap" id="column">line#';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column big cap" id="column">product';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column big cap">shipping method';
			ship_details_Markup+='			</div>';
			ship_details_Markup+='		<div class="column small cap">Delivery Type';
			ship_details_Markup+='		   </div>';
			ship_details_Markup+='		<div class="column big cap" style="width: 27%;">';
			ship_details_Markup+='			shipping address';
			ship_details_Markup+='		</div>';
			ship_details_Markup+='		<div class="column small cap" id="sc-line-contact">Contact';
			ship_details_Markup+='		 </div>';
			ship_details_Markup+='		<div class="column small cap">Delivery Phone #';
			ship_details_Markup+='		 </div>';
			ship_details_Markup+='		<div class="column small cap">Scheduled Arrival Date - ATP';
			ship_details_Markup+='		 </div>';
			//ship_details_Markup+='		<div class="column small cap">req. shipping date';Commented for SFSTRY0001757 APRAKASH
			//ship_details_Markup+='		   </div>';Commented for SFSTRY0001757 APRAKASH
			ship_details_Markup+='	</div>';
			ship_details_Markup+='	<div id="TBody-Ship-Details-LineItems">';
			ship_details_Markup+='	</div>'; //close of tbody Id's div
			ship_details_Markup+='</div>'; //close of SC-shipping-table id's div
			ship_details_Markup+='<div class="container"> ';
			ship_details_Markup+='	<div class="pagination sc-pagination pull-right" id="shipping-pagination">'; 
			ship_details_Markup+='	</div>';
			ship_details_Markup+='</div>';
		return ship_details_Markup;
	}; 
	//End: Function to set Shipping Details Line Items
	//ADD NEW CONTACT STARTS HERE
	SCOrderShipToLineItemMarkup.prototype.Shipping_CreateNewContact = function () {
		var ship_AddNewContact = '';
				ship_AddNewContact+='<div class="modal-dialog">';
                    ship_AddNewContact+='<div class="modal-content">';
					ship_AddNewContact+='<form id="SC-SO-Ship-CreateContactForm">';
                        ship_AddNewContact+='<div class="modal-header modal-min-height">';
                            ship_AddNewContact+='<button type="reset" class="close SC-close-popup blue-bg" data-dismiss="modal">&times;</button>';
                            ship_AddNewContact+='<div class="header-content address-header">';
                                ship_AddNewContact+='<div class="sc-head-title">';
                                    ship_AddNewContact+='<div class="sc-icon-text">';
                                        ship_AddNewContact+='<div class="sc-header-text no-padding">';
                                            ship_AddNewContact+='<p>NEW CONTACT</p>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                ship_AddNewContact+='</div>';
                            ship_AddNewContact+='</div>';
                        ship_AddNewContact+='</div>';
                        ship_AddNewContact+='<div class="modal-body modal-contact-body">';
                            ship_AddNewContact+='<div class="modal-input-container clearfix">';
                               ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="firstname" class="SC-label mandatory required">First Name</label>';
                                                ship_AddNewContact+='<input type="text" name="firstname" class="SC-input" id="SC-SO-Ship-FirstName">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="lastname" class="SC-label mandatory required">Last Name</label>';
                                                ship_AddNewContact+='<input type="text" name="lastname" class="SC-input" id="SC-SO-Ship-LastName">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="email" class="SC-label">Email</label>';
                                                ship_AddNewContact+='<input type="text" name="emailEmpty" class="SC-input" id="SC-SO-Ship-EmailAddress">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="address" class="SC-label mandatory required">Address</label>';
                                                ship_AddNewContact+='<input type="text" name="address" class="SC-input" id="SC-SO-Ship-Address">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="phone" class="SC-label">Phone</label>';
                                                ship_AddNewContact+='<input type="text" name="phone" class="SC-input" id="SC-SO-Ship-NewCon-Ph">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="apt" class="SC-label">Apartment/Suite/Unit</label>';
                                                ship_AddNewContact+='<input type="text" name="apt" class="SC-input" id="SC-SO-Ship-Apt">';
												ship_AddNewContact += '                                                <div class="tooltip fade bottom" role="tooltip" id="SN-new-APTToolTip" style="top: 52px; left: -0.0078125px; display: none;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Please enter Apartment/Suite/Unit</div></div>';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="city" class="SC-label mandatory required">City</label>';
                                                ship_AddNewContact+='<input type="text" name="city" class="SC-input" id="SC-SO-Ship-City">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12 clearfix">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="zipcode" class="SC-label mandatory required">Zip Code</label>';
                                                ship_AddNewContact+='<input type="text" name="zipcode" class="SC-input" id="SC-SO-Ship-ZipCode">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='<div class="row no-margin clearfix">';
                                        ship_AddNewContact+='<div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
                                            ship_AddNewContact+='<div class="SC-input-container">';
                                                ship_AddNewContact+='<label for="state" class="SC-label mandatory required">State/Province</label>';
                                                ship_AddNewContact+='<input type="text" name="state" class="SC-input" id="SC-SO-Ship-State">';
                                            ship_AddNewContact+='</div>';
                                        ship_AddNewContact+='</div>';
                                    ship_AddNewContact+='</div>';
                              ship_AddNewContact+='</div>';
				ship_AddNewContact+='</div>';
					ship_AddNewContact+='<div class="modal-footer">';
						ship_AddNewContact+='<div class="SC-button">';
							ship_AddNewContact+='<button id="SC-SO-Ship-SaveNewContact">Save Contact</button>';
						ship_AddNewContact+='</div>';
					ship_AddNewContact+='</div>';
					ship_AddNewContact+='</form>';
				ship_AddNewContact+='</div>';
			ship_AddNewContact+='</div>';
		return ship_AddNewContact;
	 };
	//ADD NEW CONTACT ENDS HERE 
	//ADD NEW ADDRESS POPUP STARTS HERE
	SCOrderShipToLineItemMarkup.prototype.Shipping_CreateNewAddress = function () {
		var ship_AddNewAddress = '';
			ship_AddNewAddress += '                <div class="modal-dialog">';
			ship_AddNewAddress += '                    <div class="modal-content">';
			ship_AddNewAddress += '                                <form id="SC-SO-Ship-CreateNewAddress">';
			ship_AddNewAddress += '                        <div class="modal-header">';
			ship_AddNewAddress += '                            <button type="reset" class="close SC-close-popup blue-bg" data-dismiss="modal">&times;</button>';
			ship_AddNewAddress += '                            <div class="header-content address-header">';
			ship_AddNewAddress += '                                <div class="sc-head-title">';
			ship_AddNewAddress += '                                    <div class="sc-icon-text">';
			ship_AddNewAddress += '                                        <div class="sc-header-text no-padding">';
			ship_AddNewAddress += '                                    <p>ADD NEW ADDRESS</p>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                                </div>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                        <div class="modal-body modal-address-body">';
			ship_AddNewAddress += '                            <div class="modal-input-container">';
			ship_AddNewAddress += '                                    <div class="row no-margin clearfix">';
			ship_AddNewAddress += '                                        <div class="col-sm-8 col-md-8 col-lg-8 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Address" class="SC-label mandatory required">Address</label>';
			ship_AddNewAddress += '                                                <input type="text" name="address" class="SC-input" id="SC-SO-Ship-NA-Address">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Apt" class="SC-label">Apartment/Suite/Unit</label>';
			ship_AddNewAddress += '                                                <input type="text" name=" " class="SC-input" id="SC-SO-Ship-NA-Apt">';
			ship_AddNewAddress += '                                                <div class="tooltip fade bottom" role="tooltip" id="SNAPTToolTip" style="top: 52px; left: -0.0078125px; display: none;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Please enter Apartment/Suite/Unit</div></div>';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                                    <div class="row no-margin clearfix">';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="City" class="SC-label mandatory required">City</label>';
			ship_AddNewAddress += '                                                <input type="text" name="city" class="SC-input" id="SC-SO-Ship-NA-City">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="State" class="SC-label mandatory required">State/Province</label>';
			ship_AddNewAddress += '                                                <input type="text" name="state" class="SC-input" id="SC-SO-Ship-NA-State">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                        <div class="col-sm-4 col-md-4 col-lg-4 col-xs-12">';
			ship_AddNewAddress += '                                            <div class="SC-input-container">';
			ship_AddNewAddress += '                                                <label for="Zipcode" class="SC-label mandatory required">Zip Code</label>';
			ship_AddNewAddress += '                                                <input type="text" name="zipcode" class="SC-input" id="SC-SO-Ship-NA-ZipCode">';
			ship_AddNewAddress += '                                            </div>';
			ship_AddNewAddress += '                                        </div>';
			ship_AddNewAddress += '                                    </div>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                        <div class="modal-footer">';
			ship_AddNewAddress += '                            <div class="SC-button">';
			ship_AddNewAddress += '                                <button id="SC-SO-Ship-SaveNewAddress">Save Address</button>';
			ship_AddNewAddress += '                            </div>';
			ship_AddNewAddress += '                        </div>';
			ship_AddNewAddress += '                                </form>';
			ship_AddNewAddress += '                    </div>';
			ship_AddNewAddress += '                </div>';
			return ship_AddNewAddress;
	 };
	// ADD NEW ADDRESS POPUP ENDS HERE 
	//Calculate fright popup starts here
	 SCOrderShipToLineItemMarkup.prototype.Shipping_Verify = function () {
		var ship_Cal_Freight_verify = '';
			ship_Cal_Freight_verify+='				 <div class="SC-modal">';
			ship_Cal_Freight_verify+='                    <div class="modal-dialog">';
			ship_Cal_Freight_verify+='                      <div class="modal-content modal-another-color">';
			ship_Cal_Freight_verify+='                            <div>';
			ship_Cal_Freight_verify+='                                <img src="images/custom/sc-logo.png">';
			ship_Cal_Freight_verify+='                            </div>';
			ship_Cal_Freight_verify+='                            <div class="text">';
			ship_Cal_Freight_verify+='                                <span class="add-margin">Please wait while we validate your order for shipping to calculate the applicable freight charges and taxes</span>';
			ship_Cal_Freight_verify+='                            </div>';
			ship_Cal_Freight_verify+='                        </div>';
			ship_Cal_Freight_verify+='                    </div>';
			ship_Cal_Freight_verify+='                </div>';
			
			return ship_Cal_Freight_verify;
	 };
	 //Calculate fright popup ends here
	 
	 //Calculate fright success popup starts here
	  SCOrderShipToLineItemMarkup.prototype.Shipping_CF_Success = function () {
			var ship_Cal_Freight_Success = '';
			ship_Cal_Freight_Success+='					 <div class="SC-modal">';
			ship_Cal_Freight_Success+='                    <div class="modal-dialog">';
			ship_Cal_Freight_Success+='                       <div class="modal-content modal-another-color">';
			ship_Cal_Freight_Success+='                            <div class="icon img-color">';
			ship_Cal_Freight_Success+='                                <img src="images/custom/done-blue.png">';
			ship_Cal_Freight_Success+='                            </div>';
			ship_Cal_Freight_Success+='                            <div class="text">';
			ship_Cal_Freight_Success+='                                <p>Success</p>';
			ship_Cal_Freight_Success+='                                <span class="SC-span-width">Your order has been validated, freight charges and taxes calculated.</span>';
			ship_Cal_Freight_Success+='                            </div>';
			ship_Cal_Freight_Success+='                        </div>';
			ship_Cal_Freight_Success+='                    </div>';
			ship_Cal_Freight_Success+='                </div>';
			return ship_Cal_Freight_Success;
	  };
	  //Calculate fright popup ends here
	  
	  //Calculate fright Failure popup starts here
	   SCOrderShipToLineItemMarkup.prototype.Shipping_CF_Failure = function () {
			var ship_Cal_Freight_Fail = '';
			ship_Cal_Freight_Fail+='                <div class="SC-modal">';
			ship_Cal_Freight_Fail+='                    <div class="modal-dialog">';
			ship_Cal_Freight_Fail+='						<div class="modal-content less-height">';
			ship_Cal_Freight_Fail+='                           <div class="text">';
			ship_Cal_Freight_Fail+='                                <span class="SC-span-width add-margin">Please review and fix your order details before proceeding.</span>';
			ship_Cal_Freight_Fail+='                                <button class="SC-ok-button" id="SC-CF-failure-button">ok</button>';
			ship_Cal_Freight_Fail+='                            </div>';
			ship_Cal_Freight_Fail+='                        </div>';
			ship_Cal_Freight_Fail+='                    </div>';
			ship_Cal_Freight_Fail+='                </div>';
			return ship_Cal_Freight_Fail;
			};
		// Calculate fright popup ends here
	//Start:Location is not matched is order location popup
	 SCOrderShipToLineItemMarkup.prototype.StoreLocation_Verify = function () {
		var storelocation_verify_markup = '';
		storelocation_verify_markup+='<div class="SC-modal modal-orange-bg">';
        storelocation_verify_markup+='            <div class="modal-dialog">';
        storelocation_verify_markup+='               <div class="modal-content less-height">';
        storelocation_verify_markup+='                    <div class="text">';
        storelocation_verify_markup+='                        <span class="SC-span-width add-margin" id="SC-order-location-text">The Order Sale Location does not match the Store Register location, click ‘Yes’ to auto-update order sale location</span>';
        storelocation_verify_markup+='                       <div class="SC-two-buttons">';
        storelocation_verify_markup+='                            <button id="Store-no-ship">No</button>';
        storelocation_verify_markup+='                            <button id="store-yes-ship">Yes</button>';
        storelocation_verify_markup+='                        </div>';
        storelocation_verify_markup+='                    </div>';
        storelocation_verify_markup+='                </div>';
        storelocation_verify_markup+='            </div>';
        storelocation_verify_markup+='        </div>';
		return storelocation_verify_markup;
	 };
	 //End:Location is not matched is order location popup
	 
	 //start:loactions are not matched popup
	 SCOrderShipToLineItemMarkup.prototype.MyStoreLocation_Verify = function () {
		var My_storemarkup = '';
		My_storemarkup+='<div class="SC-modal modal-orange-bg">';
        My_storemarkup+='            <div class="modal-dialog">';
		My_storemarkup+='				<div class="modal-content less-height">';
        My_storemarkup+='                    <div class="text">';
        My_storemarkup+='                        <span class="SC-span-width add-margin">The current location does not match the store register location</span>';
        My_storemarkup+='                        <button class="SC-ok-button" id="SC-loc-ok">ok</button>';
        My_storemarkup+='                    </div>';
        My_storemarkup+='                </div>';
        My_storemarkup+='            </div>';
        My_storemarkup+='        </div>';
		return My_storemarkup;
	 };
	 //End:loactions are not matched popup 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.SelectDeliveryType = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Choose Delivery Type for each Ship To Address</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible');
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div class="SC-order-DelType" style="padding-bottom: 10px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span style="color: #0075ff;"><b>Delivery Type: </b></span>';
					/* if(sDeliveryType == 'Home Delivery'){
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery" checked> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					}else if(sDeliveryType == 'Doorstep Delivery'){
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep" checked>';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					}
					else { */
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
						DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
						DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
						DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					// }
					/* DeliveryTypeMarkup +=' 		<div style="float: right; margin-right:100px" id="SC-Add-Disposal">';
					DeliveryTypeMarkup +='       <label>Add Disposal: </label>';
					DeliveryTypeMarkup +=' 		<input style="margin-top: 4px;" type="Checkbox" name="Add Disposal" value="Add Disposal"> '; 
					DeliveryTypeMarkup +=' 		</div>';  */
					DeliveryTypeMarkup +=' </div>';	
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit SC-disabled"  style="background: #808080	!important; border: #808080	!important;" id="update-delivery-type">Next</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.ReSelectDeliveryType = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Choose Delivery Type for each Ship To Address</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible'); //ReOptionEligible
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div class="SC-order-ReDelType" style="padding-bottom: 10px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span style="color: #0075ff;"><b>Delivery Type: </b></span>';
					DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Home Delivery"> ';
					DeliveryTypeMarkup +=' <label for="Home Delivery"> Home Delivery</label>';
					DeliveryTypeMarkup +=' <input type="radio" name="'+sAddressId+'" value="Doorstep">';
					DeliveryTypeMarkup +=' <label for="Doorstep"> Doorstep Delivery</label>';
					DeliveryTypeMarkup +=' </div>';	
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit SC-disabled"  style="background: #808080	!important; border: #808080	!important;" id="update-delivery-type">Next</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	 //start:Doorstep Delivery popup
	 SCOrderShipToLineItemMarkup.prototype.ReSelectDeliveryTypeOption = function (pEligibleAddresses) {
		var sDeliveryType,sEligibleAddress, sAddress, sCity, sState, sCountry, sAddressId;
		var DeliveryTypeMarkup = '';
			DeliveryTypeMarkup +=' <div class="modal-dialog" style="width:700px !important">';
			DeliveryTypeMarkup +=' <div class="modal-content">';
			DeliveryTypeMarkup +=' <div class="modal-header">';
			DeliveryTypeMarkup +=' <div class="header-content">';
			DeliveryTypeMarkup +=' <p style="font-size: 25px">Do you want to change Home Delivery Type for the below Order Lines?</p>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' </div>';
			DeliveryTypeMarkup +=' <div class="modal-body clearfix">';
			DeliveryTypeMarkup +=' <div class="row no-margin clearfix">';
			DeliveryTypeMarkup +=' <div class="col-md-12 col-lg-12 col-sm-12">';
			
			for(var i=0; i<pEligibleAddresses.GetChildCount(); i++){
				sEligibleAddress = pEligibleAddresses.GetChild(i).GetProperty('Eligible');
				if(sEligibleAddress == "Y" || pEligibleAddresses.GetChild(i).GetProperty("ReOptionEligible")=="Y"){
					sDeliveryType = pEligibleAddresses.GetChild(i).GetProperty('SC Delivery Type');
					sAddress = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Addr');
					sCity = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To City');
					sState = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To State');
					sCountry = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Country');
					sZipCode = pEligibleAddresses.GetChild(i).GetProperty('SC Ship To Zip');
					sAddressId = pEligibleAddresses.GetChild(i).GetProperty('SC Ship to Addr Id');
					
					DeliveryTypeMarkup +=' <div class="clearfix no-padding margin-top" id="scproductstable" style="display: block;width:650px !important">';
					DeliveryTypeMarkup +=' <div class="SC-table-with-scroll-main">';
					DeliveryTypeMarkup +=' <table class="SC-table" id="SC-product-Summary-list-table">';
					DeliveryTypeMarkup +=' <thead>';
					DeliveryTypeMarkup +=' <tr>';
					DeliveryTypeMarkup +=' <th class="so-product-name">PRODUCT</th>';
					DeliveryTypeMarkup +=' <th>SKU#</th>';
					DeliveryTypeMarkup +=' <th>QTY</th>';
					DeliveryTypeMarkup +=' </tr>';
					DeliveryTypeMarkup +=' </thead>';
					DeliveryTypeMarkup +=' <tbody id="SC_Summary_Products">';  
					
					for (var j=0; j<pEligibleAddresses.GetChild(i).GetChildCount(); j++){
						if(pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("Request To Cancel") != "Y"){
							DeliveryTypeMarkup +=' <tr style="background:dcdcdc;">';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Desc")+'</td>';
							DeliveryTypeMarkup +=' <td>'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product")+'</td>';
							DeliveryTypeMarkup +=' <td class="so-product-quantity">'+pEligibleAddresses.GetChild(i).GetChild(j).GetProperty("SC Product Qty")+'</td>';
							DeliveryTypeMarkup +=' </tr>';
						}
					}
					DeliveryTypeMarkup +=' </tbody>';
					DeliveryTypeMarkup +=' </table>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' <div style="padding-bottom:2px;padding-top:2px;font-size: 15px !important;">';
					DeliveryTypeMarkup +=' <span>Ship To Address : </span> <label>'+sAddress+', '+sCity+', '+sState+', '+sCountry+', '+sZipCode+'</label>';
					DeliveryTypeMarkup +=' </div>';
					
					DeliveryTypeMarkup +=' </div>';
				}
			}
			DeliveryTypeMarkup +=' </div>';	
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='<div class="modal-footer" style="background-color:#fff; margin-top:-5px">';
			DeliveryTypeMarkup+='<div class="SC-two-buttons-container" style="padding:0px;">';
			DeliveryTypeMarkup+=' <button type="submit" class="submit" style="background: #F63 !important;border: #F63 !important;" id="update-delivery-type-cancel">No</button>';
			DeliveryTypeMarkup+=' <button type="submit" class="submit" id="update-delivery-type-option">Yes</button>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+='</div>';
			DeliveryTypeMarkup+=' </div>';
			DeliveryTypeMarkup+='</div>';
		return DeliveryTypeMarkup;
	 };
	 //End:Doorstep Delivery popup
	 
	 
	  SCOrderShipToLineItemMarkup.prototype.ShippingSummary = function () {
			var shipping_summaryMarkup = '';
			shipping_summaryMarkup +='                        <div class="SC-SO-panel-head" id="SC-SO-ShippingSummary-Header">';
			shipping_summaryMarkup += '                            <div class="SC-SO-panel-title">';
			shipping_summaryMarkup += '                                <button data-toggle="collapse" data-target="#SC-SO-ShippingSummary-Body" id="ship-expand-collapse" class="sc-icon iconClosed"></button>';
			shipping_summaryMarkup += '									<div class="SC-title-button">';
			shipping_summaryMarkup += '                                <p class="no-margin">Shipping</p>';
			shipping_summaryMarkup += '   							</div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                            <div class="SC-SO-details-items">';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">shipments:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value" id="SC-SO-ShipSummary-Shipments"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">default address:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value" id="SC-SO-ShipSummary-DefaultAddress"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                                <div class="SC-SO-detail-item">';
			shipping_summaryMarkup += '                                    <label class="item-label">shipping total:</label>';
			shipping_summaryMarkup += '                                    <label class="item-value pending" id="SC-SO-ShipSummary-Total"></label>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                        </div>';
			shipping_summaryMarkup +='                        <div class="SC-SO-panel-body collapse in clearfix no-left-padding" id="SC-SO-ShippingSummary-Body" >';
			shipping_summaryMarkup += '                            <div class="SC-SO-Prod-info-main no-margin-top" id="SC-SO-ShippingSummary-Body-Data">';
			shipping_summaryMarkup += '                                <!--This is cart item start -->';
			shipping_summaryMarkup += '                                <div class="cart-item clearfix no-margin-bottom20">';
			shipping_summaryMarkup += '                                    <div class="SC-SO-Prod-items left-padding">';
			shipping_summaryMarkup += '                                        <div class="title-sku less-padding">';
			shipping_summaryMarkup += '                                            <div class="delete-title">';
			shipping_summaryMarkup += '                                                <p class="product-title no-margin">Shipping Address</p>';
			shipping_summaryMarkup += '                                            </div>';
			shipping_summaryMarkup += '                                        </div>';
			shipping_summaryMarkup += '                                         <div class="header-items header-width header-padding">';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">SHIPPING METHOD</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">START PRICE</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">DISCOUNTS</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">NET PRICE</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '												<div class="header-item header-first-item-width">';
			shipping_summaryMarkup += '													<p class="item-title">TAX</p>';
			shipping_summaryMarkup += '											 	</div>';
			shipping_summaryMarkup += '												<div class="header-item header-last-item-width">';
			shipping_summaryMarkup += '												<p class="item-title">SHIPPING COST</p>';
			shipping_summaryMarkup += '												</div>';
			shipping_summaryMarkup += '											</div>';
			shipping_summaryMarkup += '                                    </div>';
			shipping_summaryMarkup += ' 									<div class="SC-SO-Prod-addon-items-block left-padding" id="sc-lineitem-ship-summary">';
			shipping_summaryMarkup += '										</div>';
			shipping_summaryMarkup += '                                </div>';
			shipping_summaryMarkup += '                            </div>';
			shipping_summaryMarkup += '                        </div>';
		return shipping_summaryMarkup;
	  
	  };
	  // This is cart item end
	   SCOrderShipToLineItemMarkup.prototype.ShippingSummaryMarkup = function (Addres_Array,scaccountOrder) {
			var totalShipForAllShipMethods=0;
			var shipmentsCount = 0;
			//Added code for defect 623
			var shipping_summaryMarkup = '',shiptoAccId="",shiptoAcCname="";
			SiebelJS.Log(JSON.stringify(Addres_Array));
			if(scaccountOrder){
			shiptoAccId=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Ship To Account Id");
			shiptoAcCname=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Bill To Account");
			}
			for(var iLoop=0; iLoop<Addres_Array.length; iLoop++)
			{
			var newRec = Addres_Array[iLoop];
			SiebelJS.Log("newRec::"+newRec);
			if(newRec!='}'){
				var newRecJSON = JSON.parse(newRec);
				//SBOORLA:Added code for defect 748
				if(newRecJSON["Product Line"]=="MATTRESS" &&newRecJSON["Request To Cancel"]!="Y"){
						$("#SC-SO-ShipSummary-DefaultAddress").html(newRecJSON["SC Ship To Address Name"]);
				}
				if(newRecJSON["Product Line"]=="DELIVERY" &&newRecJSON["Request To Cancel"]!="Y")
				{
					
					var startprice=newRecJSON["Start Price"]!=""?parseFloat(newRecJSON["Start Price"],10):0.00;
					var discounts=newRecJSON["SC Total Line Discounts"]!=""?parseFloat(newRecJSON["SC Total Line Discounts"],10):0.00;
					var netprice=newRecJSON["NRC Sub Total"]!=""?parseFloat(newRecJSON["NRC CxTotal in Header Currency"],10):0.00;
					var tax=newRecJSON["Tax Amount"]!=""?parseFloat(newRecJSON["Tax Amount"],10):0.00;
					shipmentsCount += 1;
					var shitopcontactname=newRecJSON["Ship To First Name"]+" "+newRecJSON["Ship To Last Name"];
					totalShipForAllShipMethods += parseFloat(newRecJSON["SC Line Total NRC"], 10);
					shipping_summaryMarkup += ' 						<div class="SC-SO-Prod-addon-item SC-SO-no-margin no-padding">';
					shipping_summaryMarkup += '                             <div class="SC-SO-Prod-addon-item-name address-flex">';
					if(scaccountOrder){
						if(shiptoAccId=="")
						shipping_summaryMarkup += '                                 <p class="no-padding">'+shitopcontactname+'</p>';
						else
						shipping_summaryMarkup += '                                 <p class="no-padding">'+shiptoAcCname+'</p>';
					
					}else
					shipping_summaryMarkup += '                                 <p class="no-padding">'+shitopcontactname+'</p>';
					shipping_summaryMarkup += '                                 <p class="no-padding">' + newRecJSON["SC Ship To Address Name"] + '</p>';
					shipping_summaryMarkup += '                             </div>';
					shipping_summaryMarkup += '                             <div class="SC-SO-Prod-items">';
					shipping_summaryMarkup += '                                 <div class="header-items header-width">';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					//SPATIBAN:15-june-20: Added code for #STRY0024300
					if(newRecJSON["Shipping"]!=""){
						if(newRecJSON["Shipping"] == "Home Delivery"){
							shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] +'</p>';
						}else{
							shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] + '-'  +newRecJSON["Shipping"]+'</p>';
						}
					}else{
						shipping_summaryMarkup += '                                         <p class="item-value">' + newRecJSON["Ship Method"] + '</p>';
					}
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+startprice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+discounts.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+netprice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-first-item-width">';
					shipping_summaryMarkup += '                                         <p class="item-value">$'+tax.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                     <div class="header-item header-last-item-width">';
					if (parseInt(newRecJSON["SC Line Total NRC"], 10) == 0)
					shipping_summaryMarkup += '                                         <p class="item-value">FREE</p>';
					else
					 shipping_summaryMarkup += '                                         <p class="item-value">$' + Number(newRecJSON["SC Line Total NRC"]).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+ '</p>';
					shipping_summaryMarkup += '                                     </div>';
					shipping_summaryMarkup += '                                 </div>';
					shipping_summaryMarkup += '                             </div>';
					shipping_summaryMarkup += '                         </div>';
					
					/*shipping_summaryMarkup += '								<div class="cart-item clearfix no-margin-bottom20">';
					shipping_summaryMarkup += '                                   <div class="SC-SO-Prod-addon-items-block left-padding">';
					shipping_summaryMarkup += '                       <div class="SC-SO-Prod-addon-item SC-SO-no-margin no-padding">';
					shipping_summaryMarkup += '                           <div class="SC-SO-Prod-addon-item-name address-flex">';
					shipping_summaryMarkup += '                                                <p>'+$("#Ship-Default-Name").html()+'</p>';
					shipping_summaryMarkup += '                                                  <p>' + newRecJSON["SC Ship To Address Name"] + '</p>';
					shipping_summaryMarkup += '                                            </div>';
					shipping_summaryMarkup += '                                            <div class="SC-SO-Prod-items intial-align">';
					shipping_summaryMarkup += '                                                <div class="header-items">';
					shipping_summaryMarkup += '                                                    <div class="header-item">';
					shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipType">' + newRecJSON["Ship Method"] + '</p>';
					shipping_summaryMarkup += '                                                    </div>';
					shipping_summaryMarkup += '                                                    <div class="header-item">';
					if (parseInt(newRecJSON["SC Line Total NRC"], 10) == 0)
						shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipCost">FREE</p>';
					else
						shipping_summaryMarkup += '                                                        <p class="item-value" id="SC-SO-ShipSummary-ShipCost">$' + newRecJSON["SC Line Total NRC"]+ '</p>';
					shipping_summaryMarkup += '                                                    </div>';
					shipping_summaryMarkup += '                                                </div>';
					shipping_summaryMarkup += '                                            </div>';
					shipping_summaryMarkup += '                                        </div>';
					shipping_summaryMarkup += '                                    </div>';
					shipping_summaryMarkup += '                                </div>';*/
				}
			}
		 }
		  $("#sc-lineitem-ship-summary").html(shipping_summaryMarkup);
		  if(shipmentsCount!=0){
			$("#SC-SO-ShippingSummary").show();  
			$("#SC-SO-ShipSummary-Shipments").html(shipmentsCount);
		  
		  if(totalShipForAllShipMethods == 0)
			var TotalCost = '<label class="item-value pending" id="SC-SO-ShipSummary-Total">FREE</label>';
		  else//NGOLLA defect 747 added code to display amount in 2 decimals
			var TotalCost = '<label class="item-value pending" id="SC-SO-ShipSummary-Total">$'+totalShipForAllShipMethods.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</label>'; 
		  $("#SC-SO-ShipSummary-Total").html(TotalCost);
		  }
	   };
	//Start: Getting LOVs of Shipping Methods
	SCOrderShipToLineItemMarkup.prototype.GetShippingMethods = function (subType) {
		
		var searchExpr = '',
	 	sortSpec = '';
	 	searchExpr = "[Active]='Y' AND [Type]='FS_CARRIER' AND [Parent] = '"+subType+"'";
	 	sortSpec = "";
	 	lovArray_ShipMethods = SC_OUI_Methods.GetLOVs(searchExpr, sortSpec);
	 	//SiebelJS.Log("lovArray::"+lovArray);
	//End: Getting LOVs of Shipping Methods
	return lovArray_ShipMethods;
	};
	SCOrderShipToLineItemMarkup.prototype.GetAddressList = function (conId_Global) {
		//This gets the all addresses
		addList = SC_OUI_Methods.GetContactAddressesList(conId_Global);
		SiebelJS.Log("addList is:" + addList);
		//var addr_JSON = JSON.parse(addList[j]);
		return addList;
	};
	
	//Start: Funtion to get the all addresses of the billingTo contact
	SCOrderShipToLineItemMarkup.prototype.AttachAddresses = function () {
		var addressLine = '';
		for (var j = 0; j < addList.length; j++) {
			if(addList[j] != "")
			{
				var addr_JSON = JSON.parse(addList[j]);
				addressLine += '<option>' + addr_JSON["Address Name"] + '</option>';
			}
		}
		if(addressLine == '')
		addressLine += '<option></option>';
	
		addressLine+='<span class="new-Add-Address"><option class="new-add">ADD NEW ADDRESS</option></span>';
		$(".Ship-ShipToAddress").html("");
		
		
	return 	addressLine
	};
	//End: Funtion to get the all addresses of the billingTo contact
	//Start: Function to set the previously selected addresses
	SCOrderShipToLineItemMarkup.prototype.SetPreSelectedValues = function (linItemsListRS) {
		for (var i = 0; i < linItemsListRS.length; i++) {
			if (linItemsListRS[i]["Product Line"] != 'DELIVERY') {
				//Start: Setting Address
				var preSelectedShipToAddress = '';
				preSelectedShipToAddress = linItemsListRS[i]["SC Ship To Address Name"];
				var dropDown_Id = '';
				dropDown_Id = (i+1) + "Ship-ShipToAddress";
				var output = '';
				output = document.getElementById(dropDown_Id).options;
				for (var j = 0; j < output.length; j++) {
					if (output[j].text.indexOf(preSelectedShipToAddress) != -1) {
						output[j].selected = true;
						break;
					}
				}
				if(preSelectedShipToAddress == "")
				{
					$("#"+dropDown_Id).val("");					
				}
				
				//End: Setting Address

				//Start: Shipping Method
				var preSelectedShippingMethod = '';
				preSelectedShippingMethod = linItemsListRS[i]["Ship Method"];
				dropDown_Id = '';
				dropDown_Id = (i+1) + "Ship-ShippingMethod";
				output = '';
				output = document.getElementById(dropDown_Id).options;
				for (var j = 0; j < output.length; j++) {
					if (output[j].text.indexOf(preSelectedShippingMethod) != -1) {
						output[j].selected = true;
						break;
					}
				}
				if(preSelectedShippingMethod == "")
				{
					$("#"+dropDown_Id).val("");					
				}
				//End: Shipping Method

				//Start: Phone Number
				var phone_Id = '';
				phone_Id = (i+1) + "Ship-ShipToContactPhNum";
				if (linItemsListRS[i]["SC Preferred Contact"] != "") {
					var mblNumb = linItemsListRS[i]["SC Preferred Contact"];
					if (mblNumb.match(/^\d+$/) && mblNumb.length == 10)
						SC_OUI_Methods.PH_USFormat_Save(phone_Id, mblNumb);
					else
						$("#phone_Id").val(mblNumb);
				}
				//End: Phone Number

				//Start: Contact
				var contact_Id = '';
				contact_Id = (i+1) + "Ship-ShipToContact";
				if (linItemsListRS[i]["Ship To First Name"] != "" || linItemsListRS[i]["Ship To Last Name"] != "")
					$("#" + contact_Id).val(linItemsListRS[i]["Ship To First Name"] + " " + linItemsListRS[i]["Ship To Last Name"]);

				//End: Contact

				//Start: Req Ship Date
				var req_shipDt_Id = '';
				req_shipDt_Id = (i+1) + "defaultRequestShipDate";
				if (linItemsListRS[i]["Due Date"] != "")
					$("#" + req_shipDt_Id).val(linItemsListRS[i]["Due Date"]);

				//End: Req Ship Date
			}
		}

	};
	//End: Function to set the previously selected addresses
	//Start: Request Referral Popup starts here
	SCOrderShipToLineItemMarkup.prototype.Request_Referral_Markup = function () {
		var request_referral_markup = "";
		  request_referral_markup+='<div class="SC-modal">';
		  request_referral_markup+=' 	<div class="modal-dialog">';
		  request_referral_markup+=' 		<div class="modal-content modal-another-color less-height">';
		  request_referral_markup+=' 			<div>';
		  request_referral_markup+='					<img src="images/custom/sc-logo.png">';
		  request_referral_markup+=' 			</div>';
		  request_referral_markup+=' 			<div class="text">';
		  request_referral_markup+=' 				<span class="SC-span-width add-margin">Was the customer referred to Sleep Number?</span>';
			  request_referral_markup+='			<div class="SC-two-buttons SC-SO-RR-buttons ">';
			  request_referral_markup+=' 				<button id="referral-yes-button">Yes</button>';
			  request_referral_markup+=' 				<button id="referral-no-button">No</button>';
			  request_referral_markup+=' 			</div>';
		  request_referral_markup+='			</div>';
		  request_referral_markup+=' 		</div>';
		  request_referral_markup+=' 	</div>';
		  request_referral_markup+='</div>';
		return request_referral_markup
	};
  //End: Request Referral Popup starts here
    return ShippingMarkup;
   }()
  );
  return "SiebelAppFacade.SCOrderShipToLineItemMarkup";
 })
}