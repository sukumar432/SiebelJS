/************************************************
Author:: Harish
Purpose:: HTML Markup code for create new contact
Created Date: 
Modified Date: 
**************************************************/

if (typeof (SiebelApp.SCiPadCreateContactMarkup) === "undefined") {

    SiebelJS.Namespace("SiebelApp.SCiPadCreateContactMarkup");
    define("siebel/custom/SelectComfort/SCiPadCreateContactMarkup", ["siebel/phyrenderer", "siebel/custom/SelectComfort/SC_OUI_Methods"], function() {
        SiebelApp.SCiPadCreateContactMarkup = (function() {
            var createConMarkup = new SCiPadCreateContactMarkup();
            var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");

            function SCiPadCreateContactMarkup(pm) {}

            //SiebelJS.Extend(SCCreateContactMarkup, SiebelApp.JQGridRenderer);

            SCiPadCreateContactMarkup.prototype.SCCreateNewContactMarkup = function() {
                var store_user = SC_OUI_Methods.SCGetProfileAttrValue("SC Store User");
                var createCon_Markup = '';

                //<!-- Add contact modal starts here. There is JS snippet for this modal please dont miss that.-->
                // createCon_Markup+='<div class="modal fade SC-create-entity" id="SC-add-contact">';
                createCon_Markup += '<div class="modal-dialog">';
                //   //<!-- Modal content-->
                createCon_Markup += '  <div class="modal-content">';
                createCon_Markup += '     <div class="modal-body SC-create-entity-body no-padding">';
                createCon_Markup += '     <div class="SC-create-entity-left-nav">';
                createCon_Markup += '<img src="images/custom/add-contact-new.png" class="SC-avatar">';
                createCon_Markup += '<div class="SC-create-entity-steps">';
                createCon_Markup += '<div class="SC-contact-contact active">';
                createCon_Markup += '<img src="images/custom/not-completed.png">';
                createCon_Markup += '<p>Contact</p>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="SC-contact-profile">';
                createCon_Markup += '<img src="images/custom/not-completed.png">';
                createCon_Markup += '<p>Profile</p>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="SC-create-entity-right-content">';
                createCon_Markup += ' <div class="SC-create-entity-from">';
                createCon_Markup += '<button type="reset" class="SC-close-popup" id="SC-close-add-contact">&times;</button>';
                createCon_Markup += '<div class="SC-create-entity-from-main-container">';
                createCon_Markup += ' <div class="SC-create-entity-froms-step1-container" id="SC-contact-contact">';
                createCon_Markup += ' <form name="SC-create-entity-from" id="contactform" novalidate="novalidate">';
                createCon_Markup += ' <div class="row no-margin clearfix">';
                createCon_Markup += '  <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="first-name" class="SC-label mandatory">First Name</label>';
                createCon_Markup += '<input type="text" name="firstname" class="SC-input" id="FirstName">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '  <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="middle-name" class="SC-label">Middle Name</label>';
                createCon_Markup += '<input type="text" name="middlename" class="SC-input" id="scMiddleName">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' </div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="last-name" class="SC-label mandatory">Last Name</label>';
                createCon_Markup += '<input type="text" name="lastname" class="SC-input" id="LastName">';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += '  <div class="SC-input-container">';
                createCon_Markup += ' <label for="partner-name" class="SC-label ">Partner Name</label>';
                createCon_Markup += ' <input type="text" name="" class="SC-input" id="PartnerName">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="mobile-phone" id="mobile-label" class="SC-label mandatory">Mobile Phone #</label>';
                createCon_Markup += '<input type="text" name="mobilephone"  class="SC-input" id="MobilePhone">';
                createCon_Markup += '<div class="SC-checkbox">';
                createCon_Markup += ' <input type="checkbox" name="" id="mobilephonecheck" checked="checked" />';
                createCon_Markup += '<label for="mobilephonecheck" id="mobilephonecheckLabel" ></label>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="secondary-name" class="SC-label">Alternate Phone #1</label>';
                createCon_Markup += '<input type="text" name="secondaryphone" class="SC-input" id="SecondaryPhone">';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="tertiary-phone" class="SC-label">Alternate Phone #2</label>';
                createCon_Markup += ' <input type="text" name="tertiaryphone" class="SC-input" id="TeritaryPhone">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="email" class="SC-label mandatory" id="email-label" >Email</label>';
                createCon_Markup += '<input type="text" name="emailEmpty" class="SC-input" id="EmailAddress">';
                createCon_Markup += '<div class="SC-checkbox">';
                createCon_Markup += ' <input type="checkbox" name="" id="email" checked="checked" />';
                createCon_Markup += '<label for="email" id="emailLabel" ></label>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="address" class="SC-label mandatory">Address</label>';
                createCon_Markup += '<input type="text" name="address" class="SC-input" id="AddressLine">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="address" class="SC-label">Apartment/Suite/Unit</label>';
                createCon_Markup += '<input type="text" name="NewAPT" class="SC-input" id="SN-new-con-APT">';
				createCon_Markup += '<div class="tooltip fade bottom" role="tooltip" id="SN-new-con-APTToolTip" style="top: 52px; left: -0.0078125px; display: none;"><div class="tooltip-arrow" style="left: 50%;"></div><div class="tooltip-inner">Please enter Apartment/Suite/Unit</div></div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="row no-margin clearfix">';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
				createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="city" class="SC-label mandatory">City</label>';
                createCon_Markup += '<input type="text" name="city" class="SC-input" id="CityName">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6 ">';
				createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="state" class="SC-label mandatory">State</label>';
                createCon_Markup += '<select class="SC-input" name="state" id="StateName">';
                createCon_Markup += '</select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="row no-margin clearfix">';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
				createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="postal-code" class="SC-label mandatory">Postal Code</label>';
                createCon_Markup += '<input type="text" name="postalcode" class="SC-input" id="PostlCode">';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
				createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
				createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="country" class="SC-label">Country</label>';
                createCon_Markup += '<select class="SC-input" name="" id="CountryName">';
                createCon_Markup += '</select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                //VALLA: 4th July 22: Updated for SFSTRY0002275 - Start
                if (store_user == "Y") {
                    createCon_Markup += '<p class="clearfix">As a store team member, <b>you should be starting all of your leads directly within INDIGO first.</b> After qualifying the lead in INDIGO, a Contact record will automatically be created and sent to Siebel.  Utilize the Siebel search to find the record</p>';
                } else {
                    createCon_Markup += '<p class="clearfix"></p>';
                }
                //VALLA: 4th July 22: Updated for SFSTRY0002275 - End
                createCon_Markup += '<div class="SC-single-button-container set-at-bottom">';
                createCon_Markup += '<button type="submit" class="next" id="gotoContactAccount">NEXT</button>';
                createCon_Markup += '</div>';
                createCon_Markup += '</form>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="SC-create-entity-froms-step2-container" id="SC-contact-profile" style="display: none">';
                createCon_Markup += '<form name="SC-contact-profile-form" id="contactprofileform">';
                createCon_Markup += ' <div class="row no-margin clearfix" id="sc-media-block">';
                createCon_Markup += '  <div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="media-code" class="SC-label mandatory">Media Code</label>';
                /*createCon_Markup+='<input list="MediaCode" name="MediaCode" class="SC-input" id="mediaCodeIPbox" autocomplete="off">';
														createCon_Markup+='<datalist id="MediaCode">';
														createCon_Markup+='</datalist>';*/
                createCon_Markup += '<select class="SC-input" name="mediaCodeIPbox" id="mediaCodeIPbox"> ';
                createCon_Markup += '</select>';
                //createCon_Markup+='</input>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += '<label for="media-code-description" class="SC-label">Media Code Description</label>';
                createCon_Markup += '<input type="text" name="" class="SC-input" id="MediaCodeDiscription" readonly>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Customer Type" class="SC-label">Reason for Visit</label>';
                createCon_Markup += '<select class="SC-input" name="" id="ReasonForVisit">';
                createCon_Markup += ' <option>Buying</option>';
                createCon_Markup += ' </select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="Customer Type" class="SC-label">Customer Type</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="CustomerType" value="C - Customer">';
                createCon_Markup += '<select class="SC-input" name="" id="CustomerType">';
                createCon_Markup += ' <option>C - Customer</option>';
                createCon_Markup += ' <option>I - Intercompany</option>';
                createCon_Markup += ' <option>V - Vendor</option>';
                createCon_Markup += ' <option>Generic Store/ Show Contacts</option>';
                createCon_Markup += '</select>';
                createCon_Markup += '</div>';
                createCon_Markup += ' </div>';

                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += ' <label for="Lead Rank" class="SC-label">Lead Rank</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="LeadRank">';
                createCon_Markup += '<select class="SC-input" name="" id="LeadRank">';
                createCon_Markup += ' </select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Series" class="SC-label">Series</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="Series">';
                createCon_Markup += '<select class="SC-input" name="" id="Series">';
                createCon_Markup += ' </select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += '<div class="SC-input-container">';
                createCon_Markup += ' <label for="Base" class="SC-label">Base</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="Base">';
                createCon_Markup += '<select class="SC-input" name="" id="Base">';
                createCon_Markup += ' </select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Size" class="SC-label">Size</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="Size">';
                createCon_Markup += '<select class="SC-input" name="" id="Size">';
                createCon_Markup += ' </select>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Sleep Number" class="SC-label">Sleep Number</label>';
                //createCon_Markup+='<input type="text" name="" class="SC-input" id="SleepNumber">';
                createCon_Markup += '<select class="SC-input" name="" id="SleepNumber">';
                createCon_Markup += ' </select>';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Partner Sleep Number" class="SC-label">Partner Sleep Number</label>';
                createCon_Markup += '<select class="SC-input" name="" id="PartnerSleepNumber">';
                createCon_Markup += ' </select>';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '<div class="row no-margin clearfix">';
                createCon_Markup += ' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                createCon_Markup += ' <div class="SC-input-container">';
                createCon_Markup += '<label for="Referredby" id="referredby-label" class="SC-label">Referred By</label>';
                createCon_Markup += '<input type="text" name="" class="SC-input" id="Referredby">';
                createCon_Markup += '<div class="SC-checkbox">';
                createCon_Markup += ' <input type="checkbox" name="" id="referredby"  />';
                createCon_Markup += '<label for="referredby" id="RefferedbyLabel" ></label>';
                createCon_Markup += '</div>';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                //VALLA: 4th July 22: Updated for SFSTRY0002275 - Start
                if (store_user == "Y") {
                    createCon_Markup += '<p class="clearfix">As a store team member, <b>you should be starting all of your leads directly within INDIGO first.</b> After qualifying the lead in INDIGO, a Contact record will automatically be created and sent to Siebel.  Utilize the Siebel search to find the record</p>';
                } else {
                    createCon_Markup += '<p class="clearfix"></p>';
                }
                //VALLA: 4th July 22: Updated for SFSTRY0002275 - End
                createCon_Markup += '<div class="SC-two-buttons-container set-at-bottom">';
                createCon_Markup += '<button class="previous" id="gotoContactContact">Previous</button>';
                createCon_Markup += '<button type="submit" class="next" id="createContact">SAVE</button>';
                createCon_Markup += '</div>';
                createCon_Markup += '</form>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += '</div>';
                createCon_Markup += ' </div>';
                createCon_Markup += ' </div>';
                createCon_Markup += '</div>';
                //createCon_Markup+='</div>';
                //<!-- Add contact modal ends here -->

                createCon_Markup += '         <!--SEARCH CONTACTS POPUP STARTS HERE-->';
                createCon_Markup += '            <div class="modal fade SC-add-table-popup" id="SC-search-referredby" role="dialog">';
                createCon_Markup += '                <div class="modal-dialog search-modal-width">';
                createCon_Markup += '                    <div class="modal-content" id="referredby-contact-search" style="min-height:540px !important">';
                createCon_Markup += '                    </div >';
                createCon_Markup += '                </div>';
                createCon_Markup += '            </div>';
                createCon_Markup += '            <!--SEARCH CONTACTS POPUP ENDS HERE-->';

                return createCon_Markup;
            }

            return createConMarkup;
        }());
        return "SiebelApp.SCiPadCreateContactMarkup";
    })
    //close of define
}
