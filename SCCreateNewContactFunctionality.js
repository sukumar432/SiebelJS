/*
Author: Harish
Purpose: Create contact functionality
Created Date: 
Modified Date: 01/11/2017

*/


if (typeof(SiebelAppFacade.SCCreateNewContactFunctionality) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCCreateNewContactFunctionality");
 define("siebel/custom/SelectComfort/SCCreateNewContactFunctionality", ["siebel/viewpr","siebel/custom/SelectComfort/SCCreateNewContact","siebel/custom/SelectComfort/SCErrorCodes","siebel/custom/SelectComfort/SC_OUI_Methods"],
  function () {
   SiebelAppFacade.SCCreateNewContactFunctionality = (function () {
	
	var ContactCreateFn = new SCCreateNewContactFunctionality();	
	var CreateNewCon = SiebelJS.Dependency("SiebelApp.SCCreateNewContact");
	var ErrorCodesfn = SiebelJS.Dependency("SiebelApp.SCErrorCodes");
	var SC_OUI_Methods=SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SiebelConstants = SiebelJS.Dependency("SiebelApp.Constants");
	var mappingmediacode={};
	
    function SCCreateNewContactFunctionality(pm) {}
	
    SCCreateNewContactFunctionality.prototype.CreateNewContact = function () {
		
				//START -- Contact Creation Code
				
				var Custom_Q_Service = SiebelApp.S_App.GetService("SC Custom Query Simplified");
				var searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
				//Add contact modalopen				
				var conMarkup = CreateNewCon.SCCreateNewContactMarkup();
				        //**Appending Mark up for contact creation pop up
						
						$("#SC-add-contact").html(conMarkup);
						SiebelJS.Log("Markup appended");
						$("#_sweclient #_swecontent #_sweview").css('position', 'inherit');
						SiebelJS.Log("Create Contact Opened");
						$("#SC-add-contact").modal({
							backdrop: 'static'						
						});
					
			  // $(document).ready(function(){
					
					
						//START -- Custom Logic to get State Values							
						searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
						searchExpr = "[Order By] >= 1 and [Order By] <= 52 and [Type]= 'STATE_ABBREV' and [Active] = 'Y'";
						sortSpec = 'Order By';
						lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
						
						var stateValue = '';
						stateValue +=' <option></option>';
						
						for(var st=0;st<lovArray.length;st++)
						{
							stateValue +=' <option>'+lovArray[st]+'</option>';
						}
						
						$('#StateName').html(stateValue);
						
						//END -- Seting State values 
					
						//START -- Setting Country Values
						
						searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
						searchExpr = "[Type]= 'COUNTRY' AND [Low] IS NOT NULL AND [Active]='Y'";
						sortSpec = 'Order By';
						lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
						
						var countryValue = '';
						countryValue +=' <option></option>';						
						for(var ct=0;ct<lovArray.length;ct++)
						{
							if(lovArray[ct] == 'USA' || lovArray[ct] =='CANADA')
							countryValue +=' <option>'+lovArray[ct]+'</option>';
						}
						
						$('#CountryName').html(countryValue);
						
						//End -- Setting Country Values
					    
						
							
					//START -- custom logic to get the Media code pick values
								var In_q1 = SiebelApp.S_App.NewPropertySet();
								var Out_q2 = SiebelApp.S_App.NewPropertySet();
								
								
								var scChanel = SiebelApp.S_App.GetProfileAttr ('SC Primary Division Type');
								
								if(scChanel == 'SHOW' || scChanel=='STORE')
								{
									var storeNum = SiebelApp.S_App.GetProfileAttr('SC Store Number');
									In_q1.SetProperty("SC Store Number", storeNum);				
									Out_q2 = Custom_Q_Service.InvokeMethod("GetMediaDetails",In_q1);	
								}
								else if(scChanel == 'DIRECT' || scChanel == 'ECOM')
								{
									Out_q2 = Custom_Q_Service.InvokeMethod("GetMediaDetails_CallCenter",In_q1);
								}
								
								var ChildCount_q =Out_q2.GetChildCount();
								SiebelJS.Log("ChildCount_q--"+ChildCount_q);
								
								var Child_1 = Out_q2.GetChild(0);	
								SiebelJS.Log("Child_1--"+JSON.stringify(Child_1));
								var BS_Data = Child_1.GetProperty("OutputRecordSet");
								
								var mediaDetails = BS_Data;
								var mediaDetail_array = mediaDetails.split(";");
								SiebelJS.Log("mediaDetail_array::::--"+mediaDetail_array);
								
								var mediaCodes = new Array;
								var mediaDesc = new Array;
								var mediaCodeId = new Array;
								
								mediaCodes = mediaDetail_array[0].split("|");
								mediaDesc = mediaDetail_array[1].split("|");
								mediaCodeId = mediaDetail_array[2].split("|");
								
								SiebelJS.Log("mediaCodes::::--"+mediaCodes);
								SiebelJS.Log("mediaDesc::::--"+mediaDesc);
								
								
								var mediaCodeValue = '';
								//mediaCodeValue+'<input list="MediaCode" name="MediaCode" class="SC-input" id="mediaCodeIPbox">';
								mediaCodeValue +=' <option></option>';								
								for(var i=0;i<mediaCodes.length;i++)
								{
									mediaCodeValue +=' <option value="'+mediaCodes[i]+'">'+mediaDesc[i]+'</option>';
									mappingmediacode[mediaCodes[i]]=mediaCodeId[i];
								}
								
								$('#MediaCode').html(mediaCodeValue);
								
								$(document).on('change', '#mediaCodeIPbox', function(){
									var options = $('#MediaCode')[0].options;
									var val = $(this).val();
									for (var i=0;i<options.length;i++){
									   if (options[i].value === val) {
										  
										 var mDesc= $('#MediaCode').children('option[value="'+val+'"]').text();
										 $('#MediaCodeDiscription').parent().addClass("is-active is-completed");
										 $("#MediaCodeDiscription").val(mDesc);
										  break;
									   }
									}
								});
								
													
					//END -- Setting up Media code  and description values
					
					
					$('#CustomerType').parent().addClass("is-active is-completed");
					
					//START -- Setting Reason for Visit Values
						var In_Reasn_Visit = SiebelApp.S_App.NewPropertySet();
						var Out_Reasn_Visit = SiebelApp.S_App.NewPropertySet();
						
						In_Reasn_Visit.SetProperty("SearchExpr", "[Type]= 'SC_REASON_VISIT' AND [Active]='Y'");				
						In_Reasn_Visit.SetProperty("SortSpec", "Order By");		
						Out_Reasn_Visit = Custom_Q_Service.InvokeMethod("GetLOVs",In_Reasn_Visit);
						//SiebelJS.Log("OutPS--"+JSON.stringify(Out_State2));
						var ChildCount_R =Out_Reasn_Visit.GetChildCount();
						//SiebelJS.Log("ChildCount_C--"+ChildCount_R);
						
						var Child_Reason = Out_Reasn_Visit.GetChild(0);	
						//SiebelJS.Log("Child_Reason--"+JSON.stringify(Child_Reason));
						var BS_Data_Reason = Child_Reason.GetProperty("LOV_List");
						//SiebelJS.Log("BS_Data_Reason--"+BS_Data_Reason);	
						
						var reasonsArray = new Array;
					
						reasonsArray = BS_Data_Reason.split("|");
						SiebelJS.Log("reasonsArray::"+reasonsArray);
						var reasonValue = '';
						reasonValue +=' <option></option>';						
						for(var r=0;r<reasonsArray.length;r++)
						{
							reasonValue +=' <option>'+reasonsArray[r]+'</option>';
						}
						
						$('#ReasonForVisit').html(reasonValue);
						
						//End -- Setting Reason Values
						
						//START -- Setting LeadRank Values
						
						searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
						searchExpr = "[Type]= 'SC_LEAD_RANK' AND [Active]='Y'";
						sortSpec = '';
						lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
						
						var leadValue = '';
						leadValue +=' <option></option>';						
						for(var r=0;r<lovArray.length;r++)
						{
							leadValue +=' <option>'+lovArray[r]+'</option>';
						}
						
						$('#LeadRank').html(leadValue);
						
						//End -- Setting LeadRank Values
					    
						//START -- Setting Series Values
							
							searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
							searchExpr = "[Type]= 'SC_SERIES_BED' AND [Active]='Y'";
							sortSpec = '';
							lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
							
							var serValue = '';
							serValue +=' <option></option>';						
							for(var r=0;r<lovArray.length;r++)
							{
								serValue +=' <option>'+lovArray[r]+'</option>';
							}
							
							$('#Series').html(serValue);
						
						//End -- Setting series Values
						
						//START -- Setting Base Values
							
							searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
							searchExpr = "[Type]= 'SC_BASE' AND [Active]='Y'";
							sortSpec = '';
							lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
							
							var baseValue = '';
							baseValue +=' <option></option>';						
							for(var b=0;b<lovArray.length;b++)
							{
								baseValue +=' <option>'+lovArray[b]+'</option>';
							}
							
							$('#Base').html(baseValue);
						
						//End -- Base series Values
						
						//START -- Setting Size Values
							
							searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
							searchExpr = "[Type]= 'SC_CON_SIZE' AND [Active]='Y'";
							sortSpec = '';
							lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
							
							var sizeValue = '';
							sizeValue +=' <option></option>';						
							for(var sz=0;sz<lovArray.length;sz++)
							{
								sizeValue +=' <option>'+lovArray[sz]+'</option>';
							}
							
							$('#Size').html(sizeValue);
						
						//End -- Size series Values
						
						//START -- Setting SleepNumber Values
							
							searchExpr = '',sortSpec = '',lovArray = '',lovValue = '';
							searchExpr = "[Type]= 'SC_SLEEP_NUM' AND [Active]='Y'";
							sortSpec = '';
							lovArray = SC_OUI_Methods.GetLOVs(searchExpr,sortSpec);
							
							var slValue = '';
							slValue +=' <option></option>';						
							for(var sl=0;sl<lovArray.length;sl++)
							{
								slValue +=' <option>'+lovArray[sl]+'</option>';
							}
							
							$('#SleepNumber').html(slValue);
						
						//End -- SleepNumber series Values
						
					
				//});//closing document.ready
					
			//}); //Closing button 'SC-add-contact-btn' click
		
		
		//END -- Contact Creation Code
		
		return "";
    };//closing CreateNewContact
	
	SCCreateNewContactFunctionality.prototype.ContactFieldValidation1 = function () {
		//create contct --field validation
			//Start -- Field Validation				
			$(document).ready(function(event) {
				event.preventDefault();
				//var errorCodes = errorcodes();
				var errorCodes = ErrorCodesfn.errorcodes();				
				
				//Start: For Phone Validation 
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
				//End: For Phone Validation 
					
					var isEmailChecked='';					
					var isEmailChecked = $('#email').prop('checked');
					SiebelJS.Log("isEmailChecked:"+isEmailChecked);
					if(isEmailChecked==true)
					{
						var emailVal=$('#EmailAddress').val();
						if( emailVal == '')
						{	
						}
						else{
							$("#EmailAddress").attr('name','emailfield');
						}
					}
					
				$("#contactform").validate({				
					rules: {
						firstname: { required: true },
						lastname: { required: true },
						address: { required: true },
						emailfield: { email: true },
						emailEmpty: { required: true },
						city: { required: true },
						state: { required: true },
						postalcode: { required: true },						
						mobilephone: { regex:/\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ },
						secondaryphone: { regex:/\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ },
						tertiaryphone: { regex:/\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ }
						
					},
					messages: {
						firstname: errorCodes.SC_REQUIRED_FIRST_NAME,
						lastname: errorCodes.SC_REQUIRED_LAST_NAME,
						address: errorCodes.SC_REQUIRED_ADDRESS,
						emailfield: errorCodes.SC_INVALID_EMAIL,
						emailEmpty: errorCodes.SC_REQUIRED_EMAIL,
						city: errorCodes.SC_REQUIRED_CITY,
						state: errorCodes.SC_REQUIRED_STATE,
						postalcode: errorCodes.SC_REUIRED_POSTAL_CODE,
						mobilephone: errorCodes.SC_MOBILE_NUMBER,
						secondaryphone: errorCodes.SC_MOBILE_NUMBER,
						tertiaryphone: errorCodes.SC_MOBILE_NUMBER

					},
					tooltip_options: {
						firstname: { trigger: 'focus', placement: 'bottom', html: true},
						lastname: { trigger: 'focus', placement: 'bottom', html: true },
						address: { trigger: 'focus', placement: 'bottom', html: true },
						emailfield: { trigger: 'focus', placement: 'bottom', html: true },
						emailEmpty: { trigger: 'focus', placement: 'bottom', html: true },
						city: { trigger: 'focus', placement: 'bottom', html: true },
						state: { trigger: 'focus', placement: 'bottom', html: true },
						postalcode: { trigger: 'focus', placement: 'bottom', html: true },
						mobilephone: { trigger: 'focus', placement: 'bottom', html: true },
						secondaryphone: { trigger: 'focus', placement: 'bottom', html: true },
						tertiaryphone: { trigger: 'focus', placement: 'bottom', html: true }

					},


					submitHandler: function(form) {
								event.preventDefault();
								SiebelJS.Log("Next button clicked");
								$("#SC-contact-profile").show();
								$("#SC-contact-contact").hide();								
								
								$(".SC-contact-contact img").attr({
									src: 'images/custom/completed-step.PNG'
								});
								$(".SC-contact-profile img").attr({
									src: 'images/custom/not-completed.png'
								});
								$(".SC-contact-contact").removeClass('active');
								$(".SC-contact-profile").addClass('active');
						
					}//closing submit handler
				});
		//});//Closing of Field Validation for 1st page
		
							
				});//closing document.ready
				
		//End -- Field Validation
		return "";
	};
	
	SCCreateNewContactFunctionality.prototype.ContactFieldValidation2 = function (pr) {
		//This is for validating 2nd page of contact creation and invocation of contact creation process
		var contactId = '';
				var errorCodes = ErrorCodesfn.errorcodes();
				$("#contactprofileform").validate({
					
					rules: {
						
						mediacode: { required: true }

					},
					messages: {
						mediacode: errorCodes.SC_REQUIRED_MEDIA_CODE

					},
					tooltip_options: {
						mediacode: { trigger: 'focus', placement: 'bottom', html: true}

					},
					submitHandler: function(form) {
						event.preventDefault();
						//Start -- logic to save contact.  
							
							var FirstName = '',LastName='',PartnerName='',EmailAddress='',Address='',City='';
							var MediaCodeDiscription='',CustomerType='',ReasonForVisit='',LeadRank='',Series='',Base='',Size='',SleepNumber='';
							var State='',PostalCode='',MobilePhone='',SecondaryPhone='',TeritaryPhone='',Country='',MediaCode='';
							var MobilePhone_USFormat='',SecondaryPhone_USFormat='',TeritaryPhone_USFormat='';
							FirstName 			= $("#FirstName").val();
							SiebelJS.Log("FirstName is: "+FirstName);
							LastName 			= $("#LastName").val();
							SiebelJS.Log("LastName is: "+LastName);
							PartnerName 		= $("#PartnerName").val();
							SiebelJS.Log("PartnerName is: "+PartnerName);
							EmailAddress 		= $("#EmailAddress").val();
							SiebelJS.Log("EmailAddress is: "+EmailAddress);
							Address 			= $("#AddressLine").val();
							SiebelJS.Log("Address is: "+Address);
							City 				= $("#CityName").val();
							SiebelJS.Log("City is: "+City);							
							State 				= $("#StateName").val();
							SiebelJS.Log("State is: "+State);
							PostalCode 			= $("#PostlCode").val();	
							SiebelJS.Log("PostalCode is: "+PostalCode);						
							MobilePhone_USFormat= $("#MobilePhone").val();
							MobilePhone         = MobilePhone_USFormat.replace(/[^0-9]/g,'');
							SiebelJS.Log("MobilePhone is: "+MobilePhone);						
							SecondaryPhone_USFormat= $("#SecondaryPhone").val();
							SecondaryPhone		= SecondaryPhone_USFormat.replace(/[^0-9]/g,'');
							SiebelJS.Log("SecondaryPhone is: "+SecondaryPhone);
							TeritaryPhone_USFormat= $("#TeritaryPhone").val();
							TeritaryPhone		= TeritaryPhone_USFormat.replace(/[^0-9]/g,'');
							SiebelJS.Log("TeritaryPhone is: "+TeritaryPhone);
							Country 			= $("#CountryName").val();
							SiebelJS.Log("Country is: "+Country);							
							MediaCode 			= $("#mediaCodeIPbox").val();
							SiebelJS.Log("MediaCode is: "+MediaCode);							
							MediaCodeDiscription= $("#MediaCodeDiscription").val();
							SiebelJS.Log("MediaCodeDiscription is: "+MediaCodeDiscription);
							CustomerType 		= $("#CustomerType").val();
							SiebelJS.Log("CustomerType is: "+CustomerType);
							ReasonForVisit 		= $("#ReasonForVisit").val();
							SiebelJS.Log("ReasonForVisit is: "+ReasonForVisit);
							LeadRank 			= $("#LeadRank").val();
							SiebelJS.Log("LeadRank is: "+LeadRank);						
							Series 				= $("#Series").val();
							SiebelJS.Log("Series is: "+Series);
							Base 				= $("#Base").val();
							SiebelJS.Log("Base is: "+Base);
							Size 				= $("#Size").val();	
							SiebelJS.Log("Size is: "+Size);
							SleepNumber 		= $("#SleepNumber").val();
							SiebelJS.Log("SleepNumber is: "+SleepNumber);
							var scMediaBuyId=mappingmediacode[MediaCode];
							SiebelJS.Log("scMediaBuyId"+scMediaBuyId);
							
							
							var Bservice = '',inPS = '', outPS = '';
							 
							inPS  = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("CellularNumber",MobilePhone);
							//inPS.SetProperty("Type","C - Customer");
							inPS.SetProperty("EmailAddress",EmailAddress);
							inPS.SetProperty("ContactFirstName",FirstName);
							inPS.SetProperty("HomePhoneNumber",SecondaryPhone);
							inPS.SetProperty("PartnerName",PartnerName);
							inPS.SetProperty("Reason for Visiting",ReasonForVisit);
							inPS.SetProperty("WorkPhoneNumber",TeritaryPhone);
							inPS.SetProperty("ContactLastName",LastName);
							inPS.SetProperty("Media Code Id",scMediaBuyId);
							inPS.SetProperty("MediaCode",MediaCode);
							inPS.SetProperty("LeadRank",LeadRank);
							inPS.SetProperty("Series",Series);
							inPS.SetProperty("Base",Base);
							inPS.SetProperty("Size",Size);
							inPS.SetProperty("SleepNumber",SleepNumber);
							
							inPS.SetProperty("Address Mail to",Address);
							inPS.SetProperty("City",City);
							inPS.SetProperty("State",State);
							inPS.SetProperty("Country",Country);
							inPS.SetProperty("Postal Code",PostalCode);
							
							inPS.SetProperty("ProcessName","SC Create New Contact Flow");
							SiebelJS.Log("Invoking Workflow");
							Bservice = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
							outPS = Bservice.InvokeMethod("RunProcess",inPS); //invoke the method
							SiebelJS.Log("Workflow invoked");
													
							var con_child = outPS.GetChild(0);						
							
							var conId = con_child.GetProperty("ContactId");
							contactId = conId;
							var addId = con_child.GetProperty("AddressId");
							
							$("#SC-add-contact").modal('hide');	
							
							
							if(pr == 'SCContactListAppletPR')
							{
								var fieldQueryPair={"First Name":"Id='"+contactId+"'"};
								SC_OUI_Methods.ExecuteListAppletFrame(SiebelConstants,fieldQueryPair,"SC Contact List Applet OUI");
								
								SiebelApp.S_App.GotoView("SC Contact 360 Degree View OUI");
								
							}
							
							if(pr == 'SCContact360ViewPR')
							{								
								/* var fieldQueryPair={"LastName":"Id='"+contactId+"'"};
								SC_OUI_Methods.ExecuteFormAppletFrame(SiebelConstants,fieldQueryPair,"Contact Form Applet");
								setTimeout(function() {
								 //window.location.reload()
								 SiebelApp.S_App.GotoView("SC Contact 360 Degree View OUI");
								 },500); 
								// SiebelApp.S_App.GotoView("SC Contact 360 Degree View OUI");  */
							}
							
							
							//End -- logic to save contact
								
					   }
					});
				//closing on click function
		return contactId;
	};
	//email validation
	SCCreateNewContactFunctionality.prototype.Cont_Create_EmailValidation = function () {
		
					var isEmailChecked='';					
					var isEmailChecked = $('#email').prop('checked');
					SiebelJS.Log("isEmailChecked:"+isEmailChecked);
					if(isEmailChecked==true)
					{
						
						$('#EmailAddress').removeAttr('disabled');
						$("#email-label").addClass('mandatory');
						$("#EmailAddress").attr('name','emailEmpty');
								
						}
					else{						
						$('#EmailAddress').attr('disabled',true);
						$("#EmailAddress").attr('name','');
						$('#EmailAddress').val('');
						$("#email-label").removeClass('mandatory');
					}
		
		return "";
	};
	
	SCCreateNewContactFunctionality.prototype.GotoPreviousPage = function () {
						event.preventDefault();
						$("#SC-contact-contact").show();
						$("#SC-contact-account").hide();
						$("#SC-contact-profile").hide();

						$(".SC-contact-contact img").attr({
							src: 'images/custom/completed-step.PNG'
						});
						$(".SC-contact-account img").attr({
							src: 'images/custom/completed-step.PNG'
						});
						$(".SC-contact-profile img").attr({
							src: 'images/custom/not-completed.png'
						});

						$(".SC-contact-account").removeClass('active');
						$(".SC-contact-contact").addClass('active');
						$(".SC-contact-profile").removeClass('active');
				
				return "";
	};
	
	
	
    return ContactCreateFn;
   }() //closing function in
  );//closing SCCreateNewContactFunctionality
  return "SiebelAppFacade.SCCreateNewContactFunctionality";
 })//closing define method
}
