if (typeof(SiebelApp.SCANIContactsMarkup) === "undefined") {

 SiebelJS.Namespace("SiebelApp.SCANIContactsMarkup");
 define("siebel/custom/SelectComfort/SCANIContactsMarkup", ["siebel/phyrenderer"],
  function () {
   SiebelApp.SCANIContactsMarkup = (function () {
	var SCANIContactsMarkupobj=new SCANIContactsMarkup();
    function SCANIContactsMarkup(pm) {}
	 
    //Method returning Member Basic Information Markup
	SCANIContactsMarkup.prototype.SCANIInfoMarkup=function(){
	var currec="",obj="",scCTIProfileAttr="";
	scCTIProfileAttr=localStorage.getItem("ProfileAttr");
	scCTIProfileAttr=JSON.parse(scCTIProfileAttr);
	Markup = '';
		Markup += '<body class="no-margin no-padding">';
		Markup += '<!-- this is the starting point for making markup. -->';
		Markup += '<div id="applet1">';
			Markup += '<div class="container-fluid no-margin no-padding">';
				Markup += '<!-- Header starts here/ make a common function for this header. so you can use anywhere in the app -->';
				Markup += '<div class="main-header-container">';
					Markup += '<div class="nav-header">';
						Markup += '<div class="logo-block">';
							Markup += '<div class="logo">';
								Markup += '<img src="images/custom/sleepnumber.png">';
							Markup += '</div>';
						Markup += '</div>';
						Markup += '<div class="profile-block">';
								Markup += '<div class="add-contact" id="SC-add-contact-btn">';
								Markup += '<div class="image-block account" id="SC-ANI-CTItool">';
									Markup += '<img src="images/custom/cti-toolbar-orange-new.png" class="add-icon" id="sc-orange" style="display:none"/>';
									Markup += '<img src="images/custom/cti-toolbar-white-new.png" class="add-icon" id="sc-white" />';
								Markup += '</div>';
								Markup += '<span>CTI Toolbar</span>';
							Markup += ' </div>';
							Markup += '<div class="add-contact" id="SC-add-contact-btn">';
								Markup += '<div class="image-block account">';
									Markup += '<img src="images/custom/add-contact-new.png" class="add-icon" id="SC-ANI-AddContact"/>';
								Markup += '</div>';
								Markup += '<span>Add Contact</span>';
							Markup += ' </div>';
							/*Markup += '<!-- <div class="add-account" id="add-acc-account">';
								Markup += '<div class="image-block account">';
									Markup += '<img src="images/custom/add-account.png" class="add-icon account-icon" />';
								Markup += '</div>';
								Markup += '<span id="SC-add-account-btn">Add Account</span>';
							Markup += '</div> -->';*/
							Markup+='                        <div class="profile" id="SC-profile">';
							Markup+='                            <div class="image-block">';
							Markup+='                                <img src="images/custom/profile.png" class="profile-icon">';
							Markup+='                            </div>';
							Markup+='                            <span>'+scCTIProfileAttr["Last Name"]+' '+scCTIProfileAttr["First Name"]+'</span>';
							Markup+='                        </div>';
							Markup+='                        <div class="SC-Profile-container" style="display: none">';
							Markup+='                        <div class="SC-Profile-container-body">';
							Markup+='                        <p>User ID :<span>'+scCTIProfileAttr["Login Name"]+'</span></p>';
							Markup+='                        <hr class="no-margin">';
							Markup+='                        <button id="logout">Logout</button>';
							Markup+='                    	</div>';
							Markup+='                </div>';
						Markup += '</div>';
					Markup += '</div>';
				Markup += '</div>';
				Markup += '<!-- Header ends here -->';
				Markup += '<div class="container-fluid no-margin sc-main-data-container SC-data-container no-recents sc-cti-main">';
					Markup += '<div class="sc-cti-sub-header">';
						Markup += '<div class="sc-cti-agent-state">';
							Markup += '<div class="sc-cti-call-block">';
								Markup += '<img src="images/custom/Icon-Call.png">';
							Markup += '</div>';
							Markup += '<p id="agent-status" class="no-margin">Agent state: Voice active</p>';
						Markup += '</div>';
						Markup += '<div class="sc-cti-ani">';
							Markup += '<div> <label class="title">ANI:</label>';
						   Markup += ' <label class="value" id="ANI"></label></div>';
						   Markup += '<div> <label class="title">Alt ANI:</label>';
						   Markup += ' <label class="value" id="sn-ALt-ANI"></label></div>';
						   Markup += '<div><label class="title">IVR:</label>';
							Markup += '<label class="value" id="IVR" style="margin-left: 3px;"></label></div>'
							if(scCTIProfileAttr["SC Primary Division Sub Type"]=="CSC"){
								Markup += '<div class="sc-cti-mc">';
								Markup += '<label class="title">Media Code :</label>';
								Markup += '<label class="value" id="Media_Code" style="margin-left: 3px;"></label>';
								Markup += '</div>';
							}
						Markup += '</div>';
						Markup += '<div class="sc-cti-ver">';
							Markup += '<div> <label class="title">Verified:</label>';
						   Markup += ' <label class="value" id="sn-Verified"></label></div>';
						   Markup += '<div> <label class="title">Zip Code:</label>';
						   Markup += ' <label class="value" id="sn-zip-code"></label></div>';
						   Markup += '<div><label class="title">Queue: </label>';
							Markup += '<label class="value" id="Queue" style="margin-left: 3px;"></label></div>';
							if(scCTIProfileAttr["SC Primary Division Sub Type"]=="CSC"){
								Markup += '<div class="sc-cti-mcd">';
								Markup += '<label class="title">Media Code Desc :</label>';
								Markup += '<label class="value" id="Media_Code_Desc" style="margin-left: 3px;"></label>';
								Markup += '</div>';
							}
						Markup += '</div>';
						/*Markup += '<div class="sc-cti-ivr">';
							Markup += '<div><label class="title">IVR :</label>';
							Markup += '<label class="value" id="IVR"></label></div>'
							Markup += '<div><label class="title">Queue :</label>';
							Markup += '<label class="value" id="Queue"></label></div>';
						Markup += '</div>';*/
						/*Markup += '<div class="sc-cti-ani">';
							Markup += '<label class="title">ANI :</label>';
						   Markup += ' <label class="value" id="ANI"></label>';
						Markup += '</div>';*/
						/*Markup += '<div class="sc-cti-dnis">';
							Markup += '<label class="title">DNIS :</label>';
							Markup += '<label class="value" id="DNIS"></label>';
						Markup += '</div>';*/
						/*if(scCTIProfileAttr["SC Primary Division Sub Type"]=="CSC"){
							Markup += '<div class="sc-cti-mc">';
							Markup += '<label class="title">Media Code :</label>';
							Markup += '<label class="value" id="Media_Code"></label>';
						    Markup += '</div>';
						    Markup += '<div class="sc-cti-mcd">';
							Markup += '<label class="title">Media Code Desc :</label>';
							Markup += '<label class="value" id="Media_Code_Desc"></label>';
						    Markup += '</div>';
						}else{
							Markup += '<div class="sc-cti-is">';
							Markup += '<label class="title">Interaction Source :</label>';
							Markup += '<label class="value" id="Interaction_Source"></label>';
						    Markup += '</div>';	
						}
						Markup += '<div class="sc-cti-ivr">';
							Markup += '<label class="title">IVR :</label>';
							Markup += '<label class="value" id="IVR"></label>';
						Markup += '</div>';
						Markup += '<div class="sc-cti-queue">';
							Markup += '<label class="title">Queue :</label>';
							Markup += '<label class="value" id="Queue"></label>';
						Markup += '</div>';*/
						Markup += '<div class="sc-cti-close">';
							//Markup += '<img src="images/custom/icon-close.png" id="SC-exit-ani-btn">';
						Markup += '<button id="SC-exit-ani-btn">Exit ANI</button>';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<div class="sc-cti-contacts SC-card-design container">';
						Markup += ' <div id="SC-card-header" class="card-header">'; 	
                        
                        Markup += '</div>';
						
						Markup += '<div class="card-body SC-table-with-scroll-main">';
							Markup += '<table class="SC-table" id="SC-ANI-Contacts">';
								
							Markup += '</table>';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="container-fluid no-margin no-padding">';
						Markup += '<div class="pagination sc-pagination pull-right" id="SC-CON-Pagination">';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="sc-cti-contacts SC-card-design container">';
						Markup += '<div class="card-header">';
							Markup += '<p class="no-margin">Assets</p>';
						Markup += '</div>';
						Markup += '<div class="card-body SC-table-with-scroll-main">';
							Markup += '<table class="SC-table" id="SC-ANI-Asserts">';
								
							Markup += '</table>';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="container-fluid no-margin no-padding">';
						Markup += '<div class="pagination sc-pagination pull-right" id="SC-ASSERT-Pagination">';
							
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="sc-cti-contacts SC-card-design container">';
						Markup += '<div class="card-header">';
							Markup += '<p class="no-margin">Digital Product Assets</p>';
						Markup += '</div>';
						Markup += '<div class="card-body SC-table-with-scroll-main">';
							Markup += '<table class="SC-table" id="SC-ANI-Digital-Assets">';
								
							Markup += '</table>';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="container-fluid no-margin no-padding">';
						Markup += '<div class="pagination sc-pagination pull-right" id="SC-DIGITAL-ASSERT-Pagination">';
							
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="sc-cti-contacts SC-card-design container">'
						Markup += '<div class="card-header">';
							Markup += '<p class="no-margin">Orders</p>';
						Markup += '</div>';
						Markup += '<div class="card-body SC-table-with-scroll-main">';
							Markup += '<table class="SC-table" id="SC-ANI-Orders">';
								
							Markup += '</table>';
						Markup += '</div>';
					Markup += '</div>';
					Markup += '<p class="clearfix no-margin"></p>';
					Markup += '<div class="container-fluid no-margin no-padding">';
						Markup += '<div class="pagination sc-pagination pull-right" id="SC-ORDER-Pagination">';
							
						Markup += '</div>';
					Markup += '</div>';
				Markup += '</div>';
			Markup += '</div>';
			Markup += '<div class="modal fade SC-exit-ANI" id="sc-exit-ani" role="dialog">';
			Markup += '</div>';
			Markup +='      <div class="modal fade SC-create-entity" id="SC-add-contact">';
			Markup +='        <!--add con-->';
			Markup +='		</div>';
			Markup += '</div>';
		//Markup += '<script type="text/javascript" src="../JS/cti.js"></script>';
	Markup += '</body>';
	return(Markup);
	};
	return SCANIContactsMarkupobj;
   }()
  );
  
 return "SiebelApp.SCANIContactsMarkup";
 })
}
