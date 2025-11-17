if (typeof(SiebelApp.SCStoreMarkup) === "undefined") {
 SiebelJS.Namespace("SiebelApp.SCStoreMarkup");
 define("siebel/custom/SelectComfort/SCStoreMarkup", ["siebel/phyrenderer","siebel/jqgridrenderer","siebel/custom/SelectComfort/moment","siebel/custom/SelectComfort/moment-timezone-with-data.min",],
  function () {
   SiebelApp.SCStoreMarkup = (function ()  {
	var StoreMarkup=new SCStoreMarkup();
	function SCStoreMarkup(pm) {}
	SCStoreMarkup.prototype.StoreMainMarkup=function(){
	var markup="";
	var CurrentDate_Header = new Date();
	//CurrentDate = new Date();
	//var CurrentDate_Header = moment().utc().format("MM/DD/YYYY HH:mmZ");
	CurrentDate_Header = moment(CurrentDate_Header, "MM/DD/YYYY HH:mmZ").format("MM/DD/YYYY HH:mm");
	//var MachineNameValue = SiebelApp.S_App.GetProfileAttr("MachineInfo");
	var MachineNameValue = SiebelApp.S_App.GetProfileAttr("MachineInfo");
	 var storename = MachineNameValue.indexOf("_");
	 //storename = parseInt(storename)+1;
	 var store_name = MachineNameValue.substring(0,storename);
	//var date = CurrentDate.toLocaleDateString("en-US");
	//var time = CurrentDate.toLocaleTimeString('en-GB');
	//var datetime;
	//time = time.slice(0, -3);
	//datetime = date+" "+time;
	markup+='<html>';
	markup+='<head>';
	markup+='</head>';
	markup+='<body class="no-margin no-padding">';
    markup+='<div id="applet1">';
    markup+='<div class="container-fluid no-margin no-padding">';
	markup+='<div class="main-header-container">';
	markup+='	<div class="nav-header">';
	markup+='					<div class="logo-block">';
	markup+='                        <div class="logo">';
	markup+='                            <img src="images/custom/sleepnumber.png">';
	markup+='                        </div>';
	markup+='                    </div>';
	markup+='                    <div class="nav-block">';
	markup+='                        <ul>';
	markup+='                            <li id="SC_HOME">Home</li>';
	markup+='                            <li id="SC_CONTACTS">Contacts</li>';
	//markup+='                            <li id="SC_ACCOUNTS">Accounts</li>';
	markup+='                            <li id="SC_SALESORDERS">Sales Order</li>';
	markup+='                        </ul>';
	markup+='                    </div>';
	markup+='                    <div class="profile-block">';
	markup+='                        <div class="profile" id="SC-profile">';
	markup+='                            <div class="image-block">';
	markup+='                                <img src="images/custom/profile.png" class="profile-icon">';
	markup+='                            </div>';
	markup+='                            <span>'+theApplication().GetProfileAttr("Last Name")+' '+theApplication().GetProfileAttr("First Name")+'</span>';
	markup+='							<div class="SC-Profile-container" style="display: none">';
	markup+='                            <div class="SC-Profile-container-body">';
	markup+='                                <p>User ID : '+theApplication().GetProfileAttr("Login Name")+'</p>';
	markup+='                        		<hr class="no-margin">';
	//markup+='						 		 <button id="storereport">Store Closing Report</button>';
	markup+='                                <button id="logout">Logout</button>';
	markup+='                            </div>';
	markup+='                        </div>';
	markup+='                    </div>';
	markup+='	</div>';
	markup+='</div>';
	markup+='</div>';
	markup+='<div class="container-fluid no-margin sc-main-data-container SC-data-container no-padding">';
	markup+='	<div class="container SC-store-container row no-top-padding">';
	markup+='                   <div class="SC-store-name-details-block">';
	markup+='                      <div class="store-name"> ';
	markup+='                      Store:'+store_name+'';
	markup+='                      </div> ';
	markup+='                      <div class="store-datetime" id="storedatetime">';
	markup+='                          date and time:'+CurrentDate_Header+'';
	markup+='                      </div>';
	markup+='                   </div>';
	markup+='                   <div class="SC-store-generate-button">';
	markup+='                        <button class="" id="sc-search">GENERATE REPORT</button>';
	markup+=' 				<div class="input-box-calendar" style="display: none" id="SC-Calendar">';
    markup+='                    <input type="text" name="" class="input-box padding-for-calendar" id="input_date_id" placeholder="Select Date">';
    markup+='                  <img src="images/custom/calendar-grey.png" class="calendar-icon">';
	markup+='                  <img src="images/custom/delete-red.png" class="delete-icon" style="display:none">';
    markup+='              </div>';
	markup+='                   </div>';
	markup+='</div>';
	markup+='<p class="clearfix"></p>';
	markup+='<p class="clearfix no-margin"></p>';
	markup+='<div class="container SC-tabs-container SC-width no-padding">';
	markup+='                    <ul class="nav nav-pills nav-justified">';
	markup+='                        <li><a href="javascript:void(0)" class="no-margin store-active" id="SC-today-report">Todays Report</a></li>';
	markup+='                        <li><a href="javascript:void(0)" class="no-margin" id="SC-previous-report">Previous Report</a></li>';
	markup+='                    </ul>';
	markup+='                    <div class="SC-line"></div>';
	markup+='</div>';
	markup+='<p class="clearfix no-margin"></p>';
	markup+='<div class="container data-table-container SC-store-table" id="SC_Today-Report-table">';
	//markup+='					<div class="SC-table-with-scroll-main SC-store-table-width" id="tod-str-table" style="display:none">';
	//markup+='					</div>';
	
	markup+='</div>';
	markup+='<div class="SC-Store-info" id="SC-Store-info">';
    markup+='<p class="app-info no-margin"> <b>Note:</b><span class="span">Registers with no sales today will not be listed on this report.</span></p>';
    markup+='</div>';
	
	markup+='<div class="container data-table-container SC-store-table" id="SC_Previous-Report-table" style="display:none">';
	markup+='</div>';
	markup+='                <div class="container-pagination" style="display:none">';
	markup+='					<div class="pagination sc-pagination pull-right" id="SC-Store-Pagination">';
	markup+='                    </div>';
	markup+='                </div>';
	markup+='</div>';	
	markup+='<div class="modal fade SC-store-popup" id="SC-store-details">';
	markup+='   <div class="modal-dialog">';
    markup+=' 		<div class="modal-content">';
	markup+='			<div class="modal-body SC-create-entity-body no-padding" id="generatereport">';
	markup+='			</div>';
    markup+='		</div>';
	markup+='	</div>';
	markup+='</div>';
	//new pop up
	markup += '<div class="modal fade SC-SO-add-popup " id="SC-generate-popup" role="dialog">';
	markup += '<div class="SC-modal">';
	markup += '                    <div class="modal-dialog">';
	markup += '                        <!-- Modal content-->';
	markup += '                        <div class="modal-content modal-orange">';
	/*markup += '                            <div class="icon">';
	markup += '                                <img src="images/custom/delete-red.png">';
	markup += '                            </div>';*/
	markup += '                            <div class="text">';
	markup += '                                <span class="SC-span-width add-padding">Do not proceed until all orders have been entered for the day</span>';
	markup += '                                <div class="SC-two-buttons add-padding-top">';
	markup += '                                   <button  id="SC-proceed-button">Proceed</button>';
	markup += '                                   <button class="add-margin" id="SC-cancel-button">Cancel</button> ';
	markup += '                                </div>';
	markup += '                            </div>';
	markup += '                        </div>';
	markup += '                    </div>';
	markup += '</div>';
	markup += '</div>';
	//new pop up
	markup+='</div>';
	markup+='</div>';
	markup+='</body>';
	markup+='</html>';
	
	return markup;
	};
    
	return StoreMarkup;
   }()
  );
 return "SiebelApp.SCStoreMarkup";
 })
}

