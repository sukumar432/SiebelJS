/*
Author:: Harish
Purpose:: HTML Markup code for create new contact
Created Date: 
Modified Date: 01/11/2017
*/



if (typeof(SiebelApp.SCCreateNewContact) === "undefined") {

 SiebelJS.Namespace("SiebelApp.SCCreateNewContact");
 define("siebel/custom/SelectComfort/SCCreateNewContact", ["siebel/phyrenderer"],
  function () {
   SiebelApp.SCCreateNewContact = (function () {
	var createConMarkup = new SCCreateNewContact();
	
    function SCCreateNewContact(pm) {}

    //SiebelJS.Extend(SCCreateNewContact, SiebelApp.JQGridRenderer);

    SCCreateNewContact.prototype.SCCreateNewContactMarkup = function () {
    
	 var createCon_Markup = '';
	 
				//<!-- Add contact modal starts here. There is JS snippet for this modal please dont miss that.-->
       // createCon_Markup+='<div class="modal fade SC-create-entity" id="SC-add-contact">';
            createCon_Markup+='<div class="modal-dialog">';
             //   //<!-- Modal content-->
              createCon_Markup+='  <div class="modal-content">';
               createCon_Markup+='     <div class="modal-body SC-create-entity-body no-padding">';
                   createCon_Markup+='     <div class="SC-create-entity-left-nav">';
                            createCon_Markup+='<img src="images/custom/Avatar.png" class="SC-avatar">';
                            createCon_Markup+='<div class="SC-create-entity-steps">';
                                createCon_Markup+='<div class="SC-contact-contact active">';
                                    createCon_Markup+='<img src="images/custom/not-completed.png">';
                                    createCon_Markup+='<p>Contact</p>';
                                createCon_Markup+='</div>';
                                createCon_Markup+='<div class="SC-contact-profile">';
                                    createCon_Markup+='<img src="images/custom/not-completed.png">';
                                    createCon_Markup+='<p>Profile</p>';
                                createCon_Markup+='</div>';
                            createCon_Markup+='</div>';
                        createCon_Markup+='</div>';
                        createCon_Markup+='<div class="SC-create-entity-right-content">';
                           createCon_Markup+=' <div class="SC-create-entity-from">';
                                createCon_Markup+='<button type="button" class="SC-close-popup" data-dismiss="modal" id="SC-close-add-contact">&times;</button>';
                                createCon_Markup+='<div class="SC-create-entity-from-main-container">';
                                   createCon_Markup+=' <div class="SC-create-entity-froms-step1-container" id="SC-contact-contact">';
                                       createCon_Markup+=' <form name="SC-create-entity-from" id="contactform" novalidate="novalidate">';
                                           createCon_Markup+=' <div class="row no-margin clearfix">';
                                              createCon_Markup+='  <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                        createCon_Markup+='<label for="first-name" class="SC-label mandatory">First Name</label>';
                                                        createCon_Markup+='<input type="text" name="firstname" class="SC-input" id="FirstName">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="last-name" class="SC-label mandatory">Last Name</label>';
                                                        createCon_Markup+='<input type="text" name="lastname" class="SC-input" id="LastName">';
                                                   createCon_Markup+=' </div>';
                                                createCon_Markup+='</div>';
                                           createCon_Markup+=' </div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                  createCon_Markup+='  <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="partner-name" class="SC-label ">Partner Name</label>';
                                                       createCon_Markup+=' <input type="text" name="" class="SC-input" id="PartnerName">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';                                                
												createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="mobile-phone" class="SC-label">Mobile Phone#</label>';
                                                        createCon_Markup+='<input type="text" name="mobilephone"  class="SC-input" id="MobilePhone">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';                                               
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="secondary-name" class="SC-label">Secondary Phone#1</label>';
                                                        createCon_Markup+='<input type="text" name="secondaryphone" class="SC-input" id="SecondaryPhone">';
                                                   createCon_Markup+=' </div>';
                                                createCon_Markup+='</div>';
												createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="tertiary-phone" class="SC-label">Secondary Phone#2</label>';
                                                       createCon_Markup+=' <input type="text" name="tertiaryphone" class="SC-input" id="TeritaryPhone">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="email" class="SC-label mandatory" id="email-label" >Email</label>';
                                                        createCon_Markup+='<input type="text" name="emailEmpty" class="SC-input" id="EmailAddress">';
                                                        createCon_Markup+='<div class="SC-checkbox">';
                                                           createCon_Markup+=' <input type="checkbox" name="" id="email" checked="checked" />';
                                                            createCon_Markup+='<label for="email" id="emailLabel" ></label>';
                                                        createCon_Markup+='</div>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="address" class="SC-label mandatory">Address</label>';
                                                        createCon_Markup+='<input type="text" name="address" class="SC-input" id="AddressLine">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="city" class="SC-label mandatory">City</label>';
                                                        createCon_Markup+='<input type="text" name="city" class="SC-input" id="CityName">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="state" class="SC-label mandatory">State</label>';
                                                        //createCon_Markup+='<input type="text" name="state" class="SC-input" id="StateName">';
														createCon_Markup +='<select class="SC-input" name="state" id="StateName">';														
														createCon_Markup +='</select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                           createCon_Markup+=' <div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="postal-code" class="SC-label mandatory">Postal Code</label>';
                                                        createCon_Markup+='<input type="text" name="postalcode" class="SC-input" id="PostlCode">';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="country" class="SC-label">Country</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="CountryName">';
														createCon_Markup +='<select class="SC-input" name="" id="CountryName">';														
														createCon_Markup +='</select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<p class="clearfix"></p>';
                                            createCon_Markup+='<div class="SC-single-button-container set-at-bottom">';
                                                createCon_Markup+='<button type="submit" class="next" id="gotoContactAccount">NEXT</button>';
                                            createCon_Markup+='</div>';
                                        createCon_Markup+='</form>';
                                    createCon_Markup+='</div>';
                                    createCon_Markup+='<div class="SC-create-entity-froms-step2-container" id="SC-contact-profile" style="display: none">';
                                        createCon_Markup+='<form name="SC-contact-profile-form" id="contactprofileform">';
                                           createCon_Markup+=' <div class="row no-margin clearfix" >';
                                              createCon_Markup+='  <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="media-code" class="SC-label mandatory">Media Code</label>';
                                                        //createCon_Markup+='<input type="text" name="mediacode" class="SC-input">';
														//createCon_Markup +='<select class="SC-input" name="mediacode" id="MediaCode">';														
														//createCon_Markup +='</select>';
														createCon_Markup+='<input list="MediaCode" name="MediaCode" class="SC-input" id="mediaCodeIPbox" autocomplete="off">';
														createCon_Markup+='<datalist id="MediaCode">';
														createCon_Markup+='</datalist>';
														//createCon_Markup+='</input>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                        createCon_Markup+='<label for="media-code-description" class="SC-label">Media Code Description</label>';
                                                        createCon_Markup+='<input type="text" name="" class="SC-input" id="MediaCodeDiscription" readonly>';														
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
												 createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                        createCon_Markup+='<label for="Customer Type" class="SC-label">Reason for Visit</label>';
                                                        createCon_Markup+='<select class="SC-input" name="" id="ReasonForVisit">';
														createCon_Markup +=' <option>Buying</option>';
                                                       createCon_Markup+=' </select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="Customer Type" class="SC-label">Customer Type</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="CustomerType" value="C - Customer">';
														createCon_Markup +='<select class="SC-input" name="" id="CustomerType">';
															createCon_Markup +=' <option>C - Customer</option>';														
															createCon_Markup +=' <option>I - Intercompany</option>';
															createCon_Markup +=' <option>V - Vendor</option>';
															createCon_Markup +=' <option>Generic Store/ Show Contacts</option>';
														createCon_Markup +='</select>';
                                                    createCon_Markup+='</div>';
                                               createCon_Markup+=' </div>';
                                               
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="Lead Rank" class="SC-label">Lead Rank</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="LeadRank">';
														 createCon_Markup+='<select class="SC-input" name="" id="LeadRank">';														
                                                       createCon_Markup+=' </select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                                createCon_Markup+='<div class="col-md-6 col-lg-6 col-sm-6">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                        createCon_Markup+='<label for="Series" class="SC-label">Series</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="Series">';
														createCon_Markup+='<select class="SC-input" name="" id="Series">';														
                                                       createCon_Markup+=' </select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                    createCon_Markup+='<div class="SC-input-container">';
                                                       createCon_Markup+=' <label for="Base" class="SC-label">Base</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="Base">';
														createCon_Markup+='<select class="SC-input" name="" id="Base">';														
                                                       createCon_Markup+=' </select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                        createCon_Markup+='<label for="Size" class="SC-label">Size</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="Size">';
														createCon_Markup+='<select class="SC-input" name="" id="Size">';														
                                                       createCon_Markup+=' </select>';
                                                    createCon_Markup+='</div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="row no-margin clearfix">';
                                               createCon_Markup+=' <div class="col-md-6 col-lg-6 col-sm-6 ">';
                                                   createCon_Markup+=' <div class="SC-input-container">';
                                                        createCon_Markup+='<label for="Sleep Number" class="SC-label">Sleep Number</label>';
                                                        //createCon_Markup+='<input type="text" name="" class="SC-input" id="SleepNumber">';
														createCon_Markup+='<select class="SC-input" name="" id="SleepNumber">';														
                                                       createCon_Markup+=' </select>';
                                                   createCon_Markup+=' </div>';
                                                createCon_Markup+='</div>';
                                            createCon_Markup+='</div>';
                                            createCon_Markup+='<div class="SC-two-buttons-container set-at-bottom">';
                                                createCon_Markup+='<button class="previous" id="gotoContactContact">Previous</button>';
                                                createCon_Markup+='<button type="submit" class="next" id="createContact">SAVE</button>';
                                            createCon_Markup+='</div>';
                                        createCon_Markup+='</form>';
                                    createCon_Markup+='</div>';
                                createCon_Markup+='</div>';
                            createCon_Markup+='</div>';
                        createCon_Markup+='</div>';
                   createCon_Markup+=' </div>';
               createCon_Markup+=' </div>';
            createCon_Markup+='</div>';
        //createCon_Markup+='</div>';
        //<!-- Add contact modal ends here -->
	 
		//createCon_Markup+='<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.11.1/jquery.validate.min.js"></script>';
		//createCon_Markup+='<script src="/jquery-validate.bootstrap-tooltip.min.js"></script>';
		//createCon_Markup+='<script src="/jquery.validate.min.js"></script>';
		//createCon_Markup+='<script type="text/javascript" src="../JS/errorcodes.js"></script>';
		//createCon_Markup+='<script type="text/javascript" src="../JS/contact.js"></script>';
	 return createCon_Markup;
    }
	
    return createConMarkup;
   }()
  );
  return "SiebelApp.SCCreateNewContact";
 })//close of define
}
