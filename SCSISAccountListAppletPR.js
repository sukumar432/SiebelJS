/****************************************************
	CREATED BY SCHERKU
	CREATED FOR SC SALES EFFICIENCY OPEN UI
	CREATED ON 10/10/2017
****************************************************/
if (typeof(SiebelAppFacade.SCSISAccountListAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCSISAccountListAppletPR");
 define("siebel/custom/SelectComfort/SCSISAccountListAppletPR",["siebel/phyrenderer","siebel/custom/SelectComfort/bootstrap.min","siebel/custom/SelectComfort/jquery.validate.min","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SC_OUI_Definitions","siebel/custom/SelectComfort/SC_OUI_Markups","siebel/custom/SelectComfort/SCAccountSearchMarkup","siebel/custom/SelectComfort/SCErrorCodes"],
  function () {
   SiebelAppFacade.SCSISAccountListAppletPR = (function () {
	var pm="", Appletid="",recordset="",controlset="",AppletSeq="",Acccreation=0,scAccsalesorder=0,currentValue="",FieldQueryPair="",searchCount=2,StoreLocation="",srecordset,K,i,j,a,b=true,c=true,d=true,e=true,f=true,g=true,h=true,l=true,m=true,n=true,o=true,p=true,storechangemarkup="",markup="",smarkup="",headermarkup,asearchfields,mainmarkup,ActiveView="",view;
	var LoginId;
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	var SCOUIMethods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SCOUIMarkups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
	var AccountSearchMarkup = SiebelJS.Dependency("SiebelApp.SCAccountSearchMarkup");
	var SCErrorCodes= SiebelJS.Dependency("SiebelApp.SCErrorCodes");
	var InPS = SiebelApp.S_App.NewPropertySet();
	var OutPS = SiebelApp.S_App.NewPropertySet();
	var sFields = ['Account Number','Account Name'],next=1,recor=0;

    function SCSISAccountListAppletPR(pm) {
     SiebelAppFacade.SCSISAccountListAppletPR.superclass.constructor.apply(this, arguments);
    }
    SiebelJS.Extend(SCSISAccountListAppletPR, SiebelAppFacade.JQGridRenderer);
    SCSISAccountListAppletPR.prototype.Init = function () {
		SiebelJS.Log("Iam in show ui in list applet");
		SiebelAppFacade.SCSISAccountListAppletPR.superclass.Init.apply(this, arguments);
		//SCOUIMethods.SCGetProfileAttr("SC Store Number,Login Name,SC Store User,SC Primary Division Type,Last Name,First Name");
		LoginId = SCOUIMethods.SCGetProfileAttrValue("Login Name");
		pm = this.GetPM();
		$("#_swescrnbar").hide();
		$("#_swethreadbar").hide();
		$("#_sweappmenu").hide();
		$("#s_vctrl_div").hide();
		$(".siebui-button-toolbar").hide();
		$("#_sweview").hide();
		localStorage.setItem('whitescreen', 0);
    }

     SCSISAccountListAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCSISAccountListAppletPR.superclass.ShowUI.apply(this, arguments);
		$(".whitescreentimer").remove();
		$("#custommaskoverlay").hide();
		$("#_sweview").show();
		//hiding tool tip
		$('div[title="All Accounts"]').attr("title","");
		//Refresh the recent records
		SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].InvokeMethod("AccountRecentRecordsRefresh");
		/*FieldQueryPair={"Name":"IS NOT NULL"};
		SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Account List Applet OUI");*/
		//getting applet id hiding it and appending the markups 
		Appletid = pm.Get("GetFullId");
		//to hide account entry form entry applet oui
		$("#"+SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().Get("GetFullId")).hide();
		recordset=pm.Get("GetRecordSet");
		AppletSeq = Appletid[Appletid.length -1];
		var StoreUser =  SCOUIMethods.SCGetProfileAttrValue('SC Store User');
		var lastName = SCOUIMethods.SCGetProfileAttrValue('Last Name');
		var firstName = SCOUIMethods.SCGetProfileAttrValue('First Name');
		var loginName = SCOUIMethods.SCGetProfileAttrValue('Login Name');
	    headermarkup=SCOUIMarkups.Header_block("Accounts",StoreUser,lastName,firstName,loginName);
	    mainmarkup=AccountSearchMarkup.SCAccountMarkup();
		storechangemarkup=SCOUIMarkups.StoreChange();
		asearchfields = SCOUIDefinitions.accountsearchfields();
		SiebelJS.Log("Iam in show ui in list applet");
		$('#'+Appletid).append(mainmarkup);
		$('.nav-header').html(headermarkup);
		$('#SC-add-storelocation').html(storechangemarkup);
		
		$("#sc-store-close-id").addClass("SC-close-accsearch-popup");
		$("#SC-add-store-location").addClass("sc-add-store-Accsearch");
		$("#SC-Store-Search").addClass("sc-storesearch-Accsearch");
		$("#SC-storelocation").addClass("sc-storeloaction-Accsearch");
		//Home button click function
		$("#SC_HOME").click(function(){
			sFields = ['Account Number','Account Name'];
			localStorage.setItem('whitescreen', 1);
			SiebelJS.Log("In SC HOME");
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			var storeUser =  SCOUIMethods.SCGetProfileAttrValue("SC Store User");
			if(storeUser=="Y")
			SiebelApp.S_App.GotoView("User Profile Default View");
			else
			SiebelApp.S_App.GotoView("Home Page View (WCC)");			  			  
		}); 
		
		//Adding CustomerMarkup 
		customtimermarkup=SCOUIMarkups.CustomTimer();
		$('#applet1').append(customtimermarkup);
		
		//Contacts button click function
		$("#SC_CONTACTS").click(function(){
			sFields = ['Account Number','Account Name'];
			SiebelApp.S_App.GotoView("SC Contact List View OUI","","","");			  
		});
		
		//SalesOrder button click function
		$("#SC_SALESORDERS").click(function(){
			sFields = ['Account Number','Account Name'];
			SiebelApp.S_App.GotoView("SC Sales Order Search View OUI","","","");			  	  
		});
		
		//on button click of Accounts should go to parent view
		$("#SC_ACCOUNTS").click(function(){
			sFields = ['Account Number','Account Name'];
			SiebelApp.S_App.GotoView("SC All Accounts List View OUI","","","");
		});
		//SBOORLA:on click of open Regiser Button
		$("#sc-cash-draw").click(function(){
			SCOUIMethods.OpenCashDrawer();
		});
		// loading waiting time
		$(document).ready(function (){
			$("body").bind('Custom.Start', function(ev) {
			  $('#maskoverlay').show();
			  SiebelJS.Log("Start");
			});

			$("body").bind('Custom.End', function(ev) {
				$('#maskoverlay').hide();
				SiebelJS.Log("Stop");
			});
		});
		
		//Markup for Accounts Search 
		markup="";
		markup+='                 <div class="container SC-search-container row">';
		markup+='                    <div class="col-lg-2 col-md-2 no-padding">';
		markup+='                       <p class="SC-search-title margin-top">Search Accounts</p>';
		markup+='                    </div>';
		markup+='                            <div class="col-lg-8 col-md-10" id="searchfields">';
		markup+='                                <form name="search">';
		markup+='                                   <div id="field">';
		markup+='                                <select class="select-box margin-top select-Accsearch-box" id="field0" name="prof1">';
		for(a=0;a<asearchfields.length;a++){
		markup+='                                    <option id="'+asearchfields[a]+'" value="'+asearchfields[a]+'">'+asearchfields[a]+'</option>';
		}
		markup+='                                </select>';
		markup+='                                <input type="text" tabindex="1" id="ifield0"  autocomplete="off" class="search-box margin-top search-accsearch-box">';
		markup+='                                <div id="b1" class="add-more margin-top "></div>';
		markup+='                            </div>';
		markup+='                            <div id="field">';
		markup+='                                <select class="select-box margin-top select-Accsearch-box" id="field1" name="prof1">';
		for(a=0;a<asearchfields.length;a++){
		markup+='                                    <option id="'+asearchfields[a]+'" value="'+asearchfields[a]+'">'+asearchfields[a]+'</option>';
		}
		markup+='                                </select>';
		markup+='                                <input type="text" tabindex="2" id="ifield1" autocomplete="off" class="search-box margin-top search-accsearch-box">';
		markup+='                                <div id="b1" class="add-more margin-top add-box"> <span class="glyphicon glyphicon-plus-sign icon-img add-item icon-Accsearch-img" style="display:none"></span></div>';
		markup+='                            </div>';
		markup+='                        </form>';
		markup+='                    </div>';
		markup+='                   <div class="col-lg-2 col-md-2 no-padding sc-set-at-bottom">';
		markup+='                        <div>';
		markup+='                            <button class="SC-search-button pull-right margin-top SC-disabled"  id="sc-acc-search" >Search</button>';
		markup+='                        </div>';
		markup+='                    </div>';
		markup+='                </div>';
		markup+='                        <p class="clearfix "></p>';
		markup+='                <p class="clearfix no-margin"></p>';
		markup+='                <div class="container SC-tabs-container">';
		markup+='                    <ul class="nav nav-pills nav-justified">';
		markup+='                        <li><a href="javascript:void(0)" class="no-margin">Accounts</a></li>';
		markup+='                    </ul>';
		markup+='                </div>';
		markup+='           <div class="container sc-acc-data-table-container SC-table-main">';
		markup+='              <div class="SC-table-with-scroll-main">';
		markup+='                 <table class="SC-table" id="SC-table-account-search">';
		markup+='                   </table>';
		markup+='              </div>';
		markup+='           </div>';
		markup+='                <div class="container">';
		markup+='                    <div class="pagination sc-pagination pull-right" id="accpagination">';
		markup+='                    </div>';
		markup+='                </div>';
	
		$("#_swescrnbar").hide();
		$("#_swethreadbar").hide();
		$("#_sweappmenu").hide();
		$("#s_vctrl_div").hide();
		$(".siebui-button-toolbar").hide();
		//$("#_swecontent").css("height","99%");
		$('#_sweview').css("overflow","auto"); 
	    $('#s_'+Appletid+'_div').hide();
	    $('.SC-data-container').html(markup);
		
		// hiding Acc Number in the 2nd dropdown box
		$( "#field1 option[value='Account Number']" ).wrap( "<span>" );
		$(".select-Accsearch-box").each(function(){
			var value = $(this).val();
			 for(var i=0;i<sFields.length;i++){
				 if(value!=sFields[i]){
					  $( "#"+$(this).attr("id")+" option[value='"+sFields[i]+"']" ).wrap( "<span>" );
				 }
			 }
		  $( "#"+$(this).attr("id")+" option[value='"+value+"']" ).attr('selected', 'selected');
		});
		
		
		//adding search fields onclick of +
		$(".icon-Accsearch-img").click(function(e) {
		SiebelJS.Log("searchCount:"+searchCount);
		SiebelJS.Log("next:"+next);
		SiebelJS.Log("searchCount:"+searchCount);
		SiebelJS.Log("next:"+next);
		 if(searchCount<=asearchfields.length-1){
			e.preventDefault();
			next = parseInt(next);
			var addto = "#ifield" + next;
			var addRemove = "#ifield" + (next);
			next = parseInt(next) + 1;
			var newIn = '<select class="select-box margin-top select-Accsearch-box " autocomplete="off" id="field' + next + '" name="field' + next + '">';
			for(i=0;i<asearchfields.length;i++){
			 newIn+='<option value="'+asearchfields[i]+'">'+asearchfields[i]+'</option>';
			}
			
			newIn+='</select><input type="text" tabindex="'+(next+1)+'" id="ifield' + next + '" autocomplete="off" class="search-box margin-top search-accsearch-box">';
			var newInput = $(newIn);
			
			var removeBtn = '<div id="remove' + (next - 1) + '" class="remove-me margin-top remove-Accosearch-me"> <span id="removeicon" class="glyphicon glyphicon-minus-sign icon-img-remove"></span></div>';
			var removeButton = $(removeBtn);
			$(addto).after(newInput);
			$(addRemove).after(removeButton);
			
			for(var j=0;j<sFields.length;j++){
				$( "#field"+next+" option[value='"+sFields[j]+"']" ).wrap( "<span>");
			}
			
			var e = document.getElementById("field"+next);
			var seletedvalue = e.options[e.selectedIndex].value;
			$("#field"+next+" option[value='"+seletedvalue+"']").attr('selected', 'selected');
			
			$(".select-Accsearch-box").each(function(){
				$(this).attr("id"); //this.id
				SiebelJS.Log($(this).attr("id"));
				if($(this).attr("id")!="field"+next){
					SiebelJS.Log($(this).attr("id"));
					$( "#"+$(this).attr("id")+" option[value='"+seletedvalue+"']" ).wrap( "<span>" );
				}
			});
			
			sFields.push(seletedvalue);
			$(".add-item").hide();
			$("#pfield" + next - 1).attr('data-source', $(addto).attr('data-source'));
			$("#count").val(next);
			searchCount++;
			
			}
		});
		
		// Removing the search fields onclik of - icon
		$(document).unbind('.remove-Accosearch-me').on('click','.remove-Accosearch-me',function(e){
            e.preventDefault();
			var idString = this.id.toString();
			
            var fieldNum = idString.substring(6, idString.length);
            var fieldID = "#field" + fieldNum;
            var ifieldID = "#ifield" + fieldNum;
			
			var e = document.getElementById("field"+fieldNum);
			var seletedvalue = e.options[e.selectedIndex].value;
			$(".select-Accsearch-box").each(function(){
			SiebelJS.Log("Id:"+$(this).attr("id"));
			if($(this).attr("id")!="field"+parseInt(fieldNum)){
				 if ( $( "#"+$(this).attr("id")+" option[value='"+seletedvalue+"']" ).parent().is( "span" ) ){
					$( "#"+$(this).attr("id")+" option[value='"+seletedvalue+"']" ).unwrap();
				}
			 }
			});
			
			var sIndex = sFields.indexOf(seletedvalue);
			sFields.splice(sIndex,1);
			$(this).remove();
            $(fieldID).remove();
            $(ifieldID).remove();
			searchCount--;
			
			$("select option").each(function(){
				if ($(this).attr("selected")=="selected")
					$(this).prop("selected",true);
				else
					$(this).removeAttr("selected");
				});
		});
		
		//to show data on the Accounts table
		 SCTable(pm,recordset);
		
		//for changing the row colour on table
 		$('.SC-table-body div').on('click',function(){
		  $('.SC-table-body div').removeClas7s('SC-selected-row');
		  $(this).addClass('SC-selected-row');
		});
		$(document).on('click', '#SC-table-account-search tr', function(){
			$(this).addClass('cti-active').siblings().removeClass('cti-active');    
				var rowId=this.rowIndex;
				$("#s_"+AppletSeq+"_l tr#"+rowId+"").trigger("click");
		});


		//Sneakpeak modal close
		$("#acc-close-details").click(function() {
			$("#account-details").modal('hide');
		});
		
		//to clear the search fields
		$(document).on('click','',function(event){
		 if($(event.target).parents('#applet1').length==0&&event.target.id!="removeicon"){
			sFields = ['Account Number','Account Name'];			
		 }
		});
		
		//onclick of profile
		$("#SC-profile").click(function() {
			//navigation to store report
		   var customerName = SCOUIMethods.SCGetProfileAttrValue('SC Store Number');
		   var customerType = SCOUIMethods.SCGetProfileAttrValue('SC Primary Division Type');
		   if ((customerType == 'STORE' || customerType == 'SHOW') && customerName!= "") {
			$(document).on('click', '#storereport', function(){
			SCOUIMarkups.StoreNavigation();
			});
		   }
		   else{
			$("#storereport").hide();}
			$(".SC-Profile-container").toggle();
		});
		
		//on click of logout
		$("#logout").click(function() {
			SiebelJS.Log("in log");
			SiebelApp.S_App.LogOff();
		});
		
		
        //Code to remove logout popup
          $(document).click(function(e) {
			if (!$(e.target).closest('#SC-profile, .SC-Profile-container').length) {
				$(".SC-Profile-container").hide();
			}
		});
	
		//for pagination of the Accounts Search Results
		//SCOUIMethods.PrimaryButton(pm,"accpagination");
		
		 $("#sc-acc-search").click(function(event) {
			$("body").trigger('Custom.Start');
			var searchObj = [];
			var finalObj = {};
			$("select[id*='field']").each(function() {
				//SiebelJS.Log("Search function starts here");
				var fname = $(this).val();
				if(fname=="Account Number")
				{
					fname="Customer Number";
				}
				if(fname=="Address")
				{
					fname="Address (Mail To)";
				}
				
				var fvalue = $(this).next().val();
				fvalue = $.trim(fvalue);

				if (fname !== "" && fvalue !== "" && fvalue !== undefined && fname !== undefined) {
					//RCHATHAR: Start Added for appostrophe text field values
					fvalue='"'+fvalue+'*"'+" OR "+'"'+fvalue.toUpperCase()+'*"';
					searchObj.push({
							"field_name": fname,
							"value": fvalue
							});
				}
			});

			if (searchObj.length > 0) {
				for (var i = 0; i < searchObj.length; i++) {
					finalObj[searchObj[i].field_name] = searchObj[i].value;
				}
			}
			SiebelJS.Log(finalObj);
			FieldQueryPair  = finalObj;
			SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,"SC Account List Applet OUI");
			});
		
		
		//This is for moving recents scroll in header
		$(document).on('click', '#scroll', function () {
			var leftPos = $('div.recent-results').scrollLeft();
			$("div.recent-results").animate({
				scrollLeft: leftPos + 300
			}, 500);
		});
		
		//Add store Location modal open
		$(".sc-add-store-Accsearch").click(function(){
			$("#SC-add-storelocation").modal({
				backdrop: 'static'
			});
			if(StoreLocation !== ""){
				document.getElementById('StoreTitle').innerHTML = StoreLocation;
				$("#StoreTitle").attr("title",StoreLocation);
			}else{
				document.getElementById('StoreTitle').innerHTML = "Add Store Location";
			}
		});
		
		//on selecting the store for change of store
		 var selectstoreid="";
		$(".sc-storeloaction-Accsearch tr").click(function() {
			$(this).addClass('cti-active').siblings().removeClass('cti-active');
			selectstoreid=$(this).attr('id');
		});
		
		//on click of enter on store search
		$(".sc-storesearch-Accsearch").keyup(function(event) {
			if (event.keyCode === 13) {
				var value=document.getElementById('SC-Store-Search').value;
				markup=SCOUIMarkups.StoreChange2(value);
				$("#SC-storelocation").html(markup);
				$("#SC-selectstore").addClass("sc-slectstore-Accsearch");
				$(".sc-storeloaction-Accsearch tr").click(function() {
				$(this).addClass('cti-active').siblings().removeClass('cti-active');
				selectstoreid=$(this).attr('id');
				});
			}
		});
		
		//on click of the store
		$(document).on("click",".sc-slectstore-Accsearch", function(e) {
			$("#SC-Store-Search").val("");
		    selectstoreid=$("#"+selectstoreid+" td:first-child").text();
			SCOUIMethods.SetStore(selectstoreid);
			SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
			//StoreLocation = SCOUIMethods.StoreName(LoginId);
			StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
				if(StoreLocation!=""){
				document.getElementById('storename').innerHTML = selectstoreid.substring(0,10);
				$("#SC-add-store-location").attr("title","Change Store");
				$("#storename").attr("title",selectstoreid);
				$("#StoreTitle").attr("title",selectstoreid);
				StoreLocation = selectstoreid;
				$("#storereport").show();
			}else{
				 $("#SC-add-store-location").attr("title","Add Store");
			}
			$("#SC-add-storelocation").modal('hide');
			$("#SC-storelocation").html("");
			});
		
		//NGollA defect for 663
		$(document).on('click','#SC-Clear-store',function(){
				SCOUIMethods.SetStore("");
				SCOUIMethods.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
				//StoreLocation = SCOUIMethods.StoreName(LoginId);
				StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI");
				$("#storename").text('Add Store');
				$("#StoreTitle").text('Add Store');
				$("#StoreTitle").attr("title","Add Store Location");
				});
		
		//getting the store name
		// StoreLocation = SCOUIMethods.StoreName(LoginId);
		StoreLocation = SCOUIMethods.SCGetProfileAttrValue("SC Store Name OUI"); 
		 
		 //setting appropriate values
		 if(StoreLocation!=""){
			document.getElementById('storename').innerHTML = StoreLocation.substring(0,10);
			$("#SC-add-store-location").attr("title","Change Store");
			$("#storename").attr("title",StoreLocation);
		 }else{
			 $("#SC-add-store-location").attr("title","Add Store");
		 }
		 
		 //to nullify when close store is done
		 $(".SC-close-accsearch-popup").click(function() {
			 $("#SC-Store-Search").val('');
			 $("#SC-storelocation").html("");
		  });
		 //Start:on paste of search boxes	
		$(document).on('paste','.search-accsearch-box',function(event){
			//enable and disable functionality of search box
			setTimeout(function(){
			$(".search-accsearch-box").each(function(){
				 if($(this).val().length!=0&&$(this).val()!="*"){
					 $("#sc-acc-search").removeClass('SC-disabled');
					  return false;
				 }else{
					 $("#sc-acc-search").addClass('SC-disabled');
				 }
				});
			},100);
		})
		//End:on paste of search boxes
		 
		 //when enter is pressed in search boxes
		 $(document).on('keyup','.search-accsearch-box',function(event){
			if (event.keyCode === 13) {
				$("#sc-acc-search").trigger("click");
				}
				
			//for hiding and showing '+' and '-' icons	
			if($(this).attr("id")!="ifield0"&&$("#ifield0").val().length!=0&&$("#ifield0").val()!="*"&&$(this).val().length!=0&&$(this).val()!="*"){
				if(searchCount!=asearchfields.length){
					$(".add-item").show();
				}else{
					$("#removeicon").show();
				}
			}else if($(this).attr("id")=="ifield0"&&$("#ifield0").val().length!=0){
				$(".search-accsearch-box").each(function(){
					if($(this).attr("id")!="ifield0"){
						if($(this).val().length!=0&&$(this).val()!="*"){
							$(".add-item").show();
						}
					}
				});
			}else{
				$(".add-item").hide();
			}
			
			//enable and disable functionality of search box
			$(".search-accsearch-box").each(function(){
				 if($(this).val().length!=0&&$(this).val()!="*"){
					 $("#sc-acc-search").removeClass('SC-disabled');
					  return false;
				 }else{
					 $("#sc-acc-search").addClass('SC-disabled');
				 }
				});
			});
		 
		  // dynamic values change for dropdowns
		  $(document).on('click','.select-Accsearch-box',function(){
				var currentid = this.id;
				var e = document.getElementById(currentid);
				currentValue = e.options[e.selectedIndex].value;
		  });
	  
		  $(document).on('change','.select-Accsearch-box',function(){
				var currentid = this.id;
				var e = document.getElementById(currentid);
				var seletedvalue = e.options[e.selectedIndex].value;
				$(".select-Accsearch-box").each(function(){
				 $(this).attr("id"); //this.id
				 if($(this).attr("id")!=currentid){
					 $( "#"+$(this).attr("id")+" option[value='"+seletedvalue+"']" ).wrap( "<span>" );
					 SiebelJS.Log("Id:"+$(this).attr("id"));
					 if ( $( "#"+$(this).attr("id")+" option[value='"+currentValue+"']" ).parent().is( "span" ) ){
						$( "#"+$(this).attr("id")+" option[value='"+currentValue+"']" ).unwrap();
					}
				 }
				 $( "#"+currentid+" option[value='"+seletedvalue+"']" ).attr('selected', 'selected');
				});
				sFields.push(seletedvalue);
				var sIndex = sFields.indexOf(currentValue);
				sFields.splice(sIndex,1);
		 });
		 
		//navigation to store report
		/*var customerType = SiebelApp.S_App.Attr('SC Primary Division Type');
		if (customerType == 'STORE' || customerType == 'SHOW') {
			$(document).on('click', '#storereport', function(){
				SCOUIMarkups.StoreNavigation();
			});
		}
		else{
		$("#storereport").hide();
		}*/
	 } //show ui close
	
	
	//this function returns the tablemarkup for Account Search
	function SCTable(pm,recordset){
		if(recordset.length>0){
		var sctablemarkup="";
		sctablemarkup+='                            <thead>';
		sctablemarkup+='                              <tr>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortaccnumber">ACC.NUMBER</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortaccname">ACC.NAME</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortphonenumber">PHONE NUMBER</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortworkphone">WORK PH.EXT</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sorttollfreephone">TOLL FREE.PH</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortmainfax">MAIN FAX#</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortemail">EMAIL</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortaddress">ADDRESS</th>'; 
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortcity">CITY</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortstate">STATE</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortpostalcode">POSTAL CODE</th>';
		sctablemarkup+='                                 <th class="sort-by sort-accsearh-by" id="sortcountry">COUNTRY</th>';
		sctablemarkup+='                               </tr>';
		sctablemarkup+='                            </thead>';
		sctablemarkup+='                              <tbody>';
		for(i = 0; i < recordset.length&& i<10; i++){
		sctablemarkup+='                                 <tr id="acc-row'+(i+1)+'">';
		sctablemarkup+='                                   <td>'+recordset[i]["Location"]+'</td>';
		sctablemarkup+='                                   <td title="'+recordset[i]["Name"]+'">'+recordset[i]["Name"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["Main Phone Number"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["SC Work Phone Ext"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["SC Toll Free Number"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["Main Fax Number"]+'</td>';
		sctablemarkup+='                                   <td title="'+recordset[i]["Main Email Address"]+'">'+recordset[i]["Main Email Address"]+'</td>';
		sctablemarkup+='                                   <td title="'+recordset[i]["Street Address"]+'">'+recordset[i]["Street Address"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["City"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["State"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["Postal Code"]+'</td>';
		sctablemarkup+='                                   <td>'+recordset[i]["Country"]+'</td>';
		sctablemarkup+='                                 </tr>';
		}
		sctablemarkup+='                              </tbody>';
		//initial message in search table
		if($("#sc-acc-search").hasClass("SC-disabled")) 
		{
			 var markup=SCOUIMarkups.InitialMessage(pm,"accounts");
			 $("#SC-table-account-search").html(markup);
			 $("#accpagination").hide();
	 
		}
		else{
		$('#SC-table-account-search').html(sctablemarkup);
		SCOUIMethods.PrimaryButton(pm,"accpagination");}
	    
		}
		}
	
	//this function adds markups of sneakpeek
	function sneakpeek(k,recordset){
		var markup="";
		markup+='             <div class="modal-dialog">';
		markup+='                <!-- Modal content-->';
		markup+='                <div class="modal-content">';
		markup+='                    <div class="modal-header">';
		markup+='                        <button type="button" class="close" data-dismiss="modal" id="acc-close-details">&times;</button>';
		markup+='                        <div class="header-content">';
		markup+='                            <div class="SC-S-image-container">';
		markup+='                                <img src="images/custom/Avatar.png">';
		markup+='                            </div>';
		markup+='                        <div class="SC-S-details-container">';
		markup+='                                <p class="name no-margin" title="'+recordset[k]["Name"]+'">'
		if(recordset[k]["Name"]!=(''|""|"undefined"))
		markup+=recordset[k]["Name"]+'</p>';
	   //Added title for Address 
				 var addressTitle="";
				 if(recordset[k]["Street Address"]!=(''|""|"undefined"))
				addressTitle+=recordset[k]["Street Address"]+',';
				if(recordset[k]["City"]!=(''|""|"undefined"))
				addressTitle+=recordset[k]["City"]+',';
				if(recordset[k]["State"]!=(''|""|"undefined"))
				addressTitle+=recordset[k]["State"]+',';
				if(recordset[k]["Postal Code"]!=(''|""|"undefined"))
				addressTitle+=recordset[k]["Postal Code"]+'.';
		markup+='   <p class="address no-margin" title="'+addressTitle+'" >'
		if(recordset[k]["Street Address"]!=(''|""|"undefined"))
		markup+=recordset[k]["Street Address"]+',';
		if(recordset[k]["City"]!=(''|""|"undefined"))
		markup+=recordset[k]["City"]+',';
		if(recordset[k]["State"]!=(''|""|"undefined"))
		markup+=recordset[k]["State"]+',';
		if(recordset[k]["Postal Code"]!=(''|""|"undefined"))
		markup+=recordset[k]["Postal Code"]+'.';
	
		if(recordset[k]["Location"]!=(''|""|"undefined"))
		markup+='                <p class="address no-margin" id="SC-Acc-no">Acc. number :'+recordset[k]["Location"]+'</p>';						   
		markup+='                       </div>';
		markup+='                        </div>';
		markup+='                    </div>';
		markup+='                    <div class="modal-body SC-S-details-body">';
										   if(recordset[k]["Main Phone Number"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-phone-number">';
		markup+='                            <span class="SC-S-detail-item-label">Phone Number :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["Main Phone Number"]+'</span>'
		markup+='                        </div>';
										   }
										   if(recordset[k]["SC Work Phone Ext"]!= (''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item"  id="SC-work-phone-ext">';
		markup+='                            <span class="SC-S-detail-item-label">Work Phone Extension :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["SC Work Phone Ext"]+'</span>';
		markup+='                        </div>';
										   }
											if(recordset[k]["SC Toll Free Number"]!= (''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item"  id="SC-toll-free-phone">';
		markup+='                            <span class="SC-S-detail-item-label">Toll free Phone Number :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["SC Toll Free Number"]+'</span>';
		markup+='                        </div>'; 
										   }
										   if(recordset[k]["Main Fax Number"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-main-fax">';
		markup+='                        <span class="SC-S-detail-item-label">Main Fax :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["Main Fax Number"]+'</span>';
		markup+='                        </div>';
										   }
										   if(recordset[k]["Main Email Address"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-email">';
		markup+='                            <span class="SC-S-detail-item-label">Email :</span>';
		markup+='                            <span class="SC-S-detail-item-value" title="'+recordset[k]["Main Email Address"]+'">'+recordset[k]["Main Email Address"]+'</span>';
		markup+='                        </div>';
										   }
										   /* if(recordset[k]["Postal Code"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-postal-code">';
		markup+='                            <span class="SC-S-detail-item-label">Postal code :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["Postal Code"]+'</span>';
		markup+='                        </div>';
										   } */
										   if(recordset[k]["Account Type Code"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-customer-type">';
		markup+='                            <span class="SC-S-detail-item-label">Customer type:</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["Account Type Code"]+'</span>';
		markup+='                        </div>';
										   }
										   if(recordset[k]["SC Customer Subtype"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-customer-subtype">';
		markup+='                            <span class="SC-S-detail-item-label">Customer Subtype :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["SC Customer Subtype"]+'</span>';
		markup+='                        </div>';
										   }
											if(recordset[k]["SC Tax Exempt"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-tax-exempt">';
		markup+='                            <span class="SC-S-detail-item-label">Tax Exempt:</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["SC Tax Exempt"]+'</span>';
		markup+='                        </div>';
										   }
										   if(recordset[k]["SC URL"]!=(''|""|"undefined")){
		markup+='                        <div class="SC-S-detail-item" id="SC-url">';
		markup+='                            <span class="SC-S-detail-item-label">URL :</span>';
		markup+='                            <span class="SC-S-detail-item-value" title="'+recordset[k]["SC URL"]+'">'+recordset[k]["SC URL"]+'</span>';
		markup+='                        </div>';
										   }
										   if(recordset[k]["CUT Full Name"]!=('undefined'|''|"")){
		markup+='                        <div class="SC-S-detail-item" id="SC-primary-contact">';
		markup+='                            <span class="SC-S-detail-item-label">Primary Contact :</span>';
		markup+='                            <span class="SC-S-detail-item-value" title="'+recordset[k]["CUT Full Name"]+'">'+recordset[k]["CUT Full Name"]+'</span>';
		markup+='                        </div>';
										   }
										   if(recordset[k]["SC Recent Order"]!=(''|""|"undefined")){						
		markup+='                        <div class="SC-S-detail-item" id="SC-recent-order">';
		markup+='                            <span class="SC-S-detail-item-label">Recent Order :</span>';
		markup+='                            <span class="SC-S-detail-item-value">'+recordset[k]["SC Recent Order"]+'</span>';
		markup+='                        </div>';
										   }
		markup+='                    </div>';
		markup+='           				<div class="modal-footer SC-S-details-footer ">';
        markup+='              					<button id="sc-account">Account360</button>';
		markup+='                 				<button id="sc-Acc-salesorder">New Sales Order</button>';
		markup+='                        </div>';
		markup+='                    </div>';
		markup+='                </div>';
		markup+='            </div>';
		return markup;
		}

    SCSISAccountListAppletPR.prototype.BindData = function (bRefresh) {
    
     SiebelAppFacade.SCSISAccountListAppletPR.superclass.BindData.apply(this, arguments);
	 
	 
	    recordset=pm.Get("GetRecordSet");
	    markup=SCOUIMarkups.ResultsMessage(pm,FieldQueryPair,"accounts");
	    $("#SC-table-account-search").html(markup);
	    SiebelJS.Log("FieldQueryPair: in bdata"+JSON.stringify(FieldQueryPair));
	    SiebelJS.Log(markup);
	    SCTable(pm,recordset);
	    markup="";
		srecordset=pm.Get("GetRecordSet");
		for(var j=0;j<recordset.length;j++){
			$(document).on('dblclick',"#acc-row"+(j+1),function() {
				var str=this.id;
				str=str.split("w");
				str=str[1];
				$("tr#"+str).trigger("click");
				markup=sneakpeek(str-1,srecordset);
				$("#account-details").html(markup);
				/*$("#account-details").modal({
					backdrop: 'static'
				});*/
				$("#account-details").modal("show");
				//on click of account button
				$('#sc-account').unbind('#sc-account').click(function() {				
					$("#account-details").modal('hide');
					pm=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel();
					$("body").trigger('Custom.Start');	
					setTimeout(function(){	
						FieldQueryPair={"Account Name":"[Id]='"+recordset[str-1]["Id"]+"'"};
						SCOUIMethods.ExecuteListAppletFrame(SiebelConstant,FieldQueryPair,pm.Get("GetName"));
						setTimeout(function(){
							pm.ExecuteMethod("OnDrillDown","Name", 1);
							$("body").trigger('Custom.End');
						},500);
					},200);
				});
				
				//on click of salesorder button
				$(document).on('click','#sc-Acc-salesorder',function() {
					if(scAccsalesorder===0){
						scAccsalesorder=1;
						$("body").trigger('Custom.Start');
						$("#account-details").modal('hide');
						setTimeout(function() {
							$("#s_"+AppletSeq+"_l tr#"+str+"").trigger("click");
							//var prim=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp.GetFieldValue('CUT Full Name');
							//Added code for defect 723
							var prim=recordset[str-1]["CUT Full Name"];
							if(prim!=null&&prim!=""&&prim!=undefined&&prim!=" ")
								localStorage.setItem("flowfrom","hasprime");
							else
								localStorage.setItem("flowfrom","noprime");
							localStorage.setItem("isNewSalesOrder","Y");
							localStorage.setItem("isAccNewSalesOrder","Y");
							SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].InvokeMethod("NewOrder");	
						}, 200);
						SiebelJS.Log("In SC Sales end");
					}
				});
				
			});
			}
		
    }//close of bdata
	 
	

    SCSISAccountListAppletPR.prototype.BindEvents = function () {
     
     SiebelAppFacade.SCSISAccountListAppletPR.superclass.BindEvents.apply(this, arguments);
		//on click of recent records
		$(document).unbind('.recent-accsearch-record').on('click',".recent-accsearch-record",function () {
			if(recor==0){
				recor++;
				var recAccID=this.id;
				$('#maskoverlay').show();
				SiebelJS.Log("recent account id"+recAccID);
				setTimeout(function(){
					var Bservice = '',inPS = '', outPS = '';
					inPS  = SiebelApp.S_App.NewPropertySet();
					outPS = SiebelApp.S_App.NewPropertySet();
					inPS.SetProperty("Name","AccountRecentRecordId");
					inPS.SetProperty("Value",recAccID);
					Bservice = SiebelApp.S_App.GetService("SessionAccessService");
					outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].InvokeMethod("AccountRecentRecordDrillDown");
					pm.ExecuteMethod("OnDrillDown", "Name", 1);
					$('#maskoverlay').hide();
				},50);
			}
		});
		
		
		
		
		// enabling search box
		$(".search-accsearch-box").each(function(){
			 if($(this).val().length!=0&&$(this).val()!="*"){
				 $("#sc-acc-search").removeClass('SC-disabled');
				  return false;
			 }else{
				 $("#sc-acc-search").addClass('SC-disabled');
			 }
		});
		
	   //For Sorting the Fields
	   $(document).on("click",".sort-accsearh-by",function(){
			if($(this).attr('id')=="sortaccnumber"){
			if(p==true){SCOUIMethods.SortRecords(pm,"Customer Number","SortAscending");p=false;}
			else{SCOUIMethods.SortRecords(pm,"Customer Number","SortDescending");p=true;}
			}
			else if($(this).attr('id')=="sortaccname"){
			if(b==true){SCOUIMethods.SortRecords(pm,"Name","SortAscending");b=false;}
			else{SCOUIMethods.SortRecords(pm,"Name","SortDescending");b=true;}
			}
			else if($(this).attr('id')=="sortphonenumber"){
			if(c==true){SCOUIMethods.SortRecords(pm,"Main Phone Number","SortAscending");c=false;}
			else{SCOUIMethods.SortRecords(pm,"Main Phone Number","SortDescending");c=true;}
			}
			else if($(this).attr('id')=="sortworkphone"){
			if(d==true){SCOUIMethods.SortRecords(pm,"Work Phone Ext","SortAscending");d=false;}
			else{SCOUIMethods.SortRecords(pm,"Work Phone Ext","SortDescending");d=true;}
			}
			else if($(this).attr('id')=="sorttollfreephone"){
			if(e==true){SCOUIMethods.SortRecords(pm,"SC Toll Free Number","SortAscending");e=false;}
			else{SCOUIMethods.SortRecords(pm,"SC Toll Free Number","SortDescending");e=true;}
			}
			else if($(this).attr('id')=="sortmainfax"){
			if(f==true){SCOUIMethods.SortRecords(pm,"Main Fax Number","SortAscending");f=false;}
			else{SCOUIMethods.SortRecords(pm,"Main Fax Number","SortDescending");f=true;}
			}
			else if($(this).attr('id')=="sortemail"){
			if(g==true){SCOUIMethods.SortRecords(pm,"Main Email Address","SortAscending");g=false;}
			else{SCOUIMethods.SortRecords(pm,"Main Email Address","SortDescending");g=true;}
			
			}
			else if($(this).attr('id')=="sortaddress"){
			if(h==true){SCOUIMethods.SortRecords(pm,"Street Name","SortAscending");h=false;}
			else{SCOUIMethods.SortRecords(pm,"Street Name","SortDescending");h=true;}
			}
			
		    else if($(this).attr('id')=="sortcity"){
		    if(l==true){SCOUIMethods.SortRecords(pm,"City","SortAscending");l=false;}
		    else{SCOUIMethods.SortRecords(pm,"City","SortDescending");l=true;}
			}
			else if($(this).attr('id')=="sortstate"){
			if(m==true){SCOUIMethods.SortRecords(pm,"State","SortAscending");m=false;}
			else{SCOUIMethods.SortRecords(pm,"State","SortDescending");m=true;}
			}
			else if($(this).attr('id')=="sortpostalcode"){
			if(n==true){SCOUIMethods.SortRecords(pm,"Postal Code","SortAscending");n=false;}
			else{SCOUIMethods.SortRecords(pm,"Postal Code","SortDescending");n=true;}
			}
			else if($(this).attr('id')=="sortcountry"){
			if(o==true){SCOUIMethods.SortRecords(pm,"Country","SortAscending");o=false;}
			else{SCOUIMethods.SortRecords(pm,"Country","SortDescending");o=true;}
			}
		});
	
	 
	    //SC-Account Creation Code starts here     
		//Add Account modalopen                         
		var Acc_creation_markup=AccountSearchMarkup.SCAccountCreationMarkup("accounts");
		var customertypevalues = SCOUIDefinitions.customertype();	//for customer type values
		var countryvalues = SCOUIDefinitions.countryLovValues();// for country values
		var payementTermsValue="";
		var payementTerms_Default_Value="";
		var CustomerSubTypeLovvalues={};
		var custsubTypeArray="";
		//Account modal opens here	
		
		// start: custom logic to get default customer type
		var BS_Data_CustType_Default = SCOUIMethods.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='B - Commercial'");
        //end:custom logic to get default customer type
		
		// start: custom logic to get wholesale customer type
		var BS_Data_WholeSale_CustType = SCOUIMethods.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='S - Wholesale'");
       //end:custom logic to get wholesale customer type
		
	    
		
	    //Start:: custom logic to get default value for payement terms
		var BS_Data_payementterms_Default = SCOUIMethods.SCGetOrderLoVs("[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y' and [Name]='30 NET'");
	    //End:: custom logic to get default value for payement terms
		var BS_Data_CusSubType_Default;
	    //Start:: Click on add Account Button		
	    $("#add-acc-account").click(function() {
			$("body").trigger('Custom.Start');
			setTimeout(function(){
			$("#SC-add-account").modal({
			  backdrop: 'static'
			});	
			$('#SC-add-account').html(Acc_creation_markup);// applying account form markup
			//Start: custom logic to get customersubtype default value
			BS_Data_CusSubType_Default = SCOUIMethods.GetLOVs2("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Name]='DME' and [Parent]='"+BS_Data_CustType_Default+"'","Order By");
			//End:custom logic to get customersubtype default value
			// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue +=' <option value="'+BS_Data_CustType_Default+'">'+BS_Data_CustType_Default+'</option>';
			for(var st=0;st<customertypevalues.length;st++)
			{
			if(customertypevalues[st]!=BS_Data_CustType_Default)
			cusTypeValue +=' <option value="'+customertypevalues[st]+'">'+customertypevalues[st]+'</option>';
			}
			$('#CustomerType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
		    //Start:: custom logic to get customsubtype values
			var In_CustSubType = SiebelApp.S_App.NewPropertySet();
			var Out_CustSubType = SiebelApp.S_App.NewPropertySet();
			/*for (var c=0;c<customertypevalues.length;c++)
			{
			    custsubTypeArray = SCOUIMethods.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+customertypevalues[c]+"'","Order By");
				if(custsubTypeArray["0"]!="")
				{
				CustomerSubTypeLovvalues[customertypevalues[c]]=custsubTypeArray;
				}
				else
					CustomerSubTypeLovvalues[customertypevalues[c]]=[];
			}*/
			
			
		   custsubTypeArray = SCOUIMethods.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+BS_Data_CustType_Default+"'","Order By");
			
		    var custsubTypeValue = '';
			custsubTypeValue +=' <option value="'+BS_Data_CusSubType_Default+'">'+BS_Data_CusSubType_Default+'</option>';
			for(var ct=0;ct<custsubTypeArray.length;ct++)
			{
               if(custsubTypeArray[ct]!=BS_Data_CusSubType_Default)
			   custsubTypeValue +=' <option value="'+custsubTypeArray[ct]+'">'+custsubTypeArray[ct]+'</option>';
			}
			$('#CustomerSubtype').html(custsubTypeValue);
			//End: custom logic to get customsubtype values
			
		    //Start:: custom logic to get payement Terms
		    payementTermsArray =SCOUIMethods.SCGetOrderLoVs("[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y'")
			payementTerms_Default_Value +=' <option value="'+BS_Data_payementterms_Default+'">'+BS_Data_payementterms_Default+'</option>';
			for(var pt=0;pt<payementTermsArray.length;pt++)
			{
				payementTermsValue +=' <option value="'+payementTermsArray[pt]+'">'+payementTermsArray[pt]+'</option>';
			}
		    payementTerms_Default_Value+=payementTermsValue;
			payementTerms_Default_Value +=' <option value=""></option>';
			$('#PaymentTerms').html(payementTerms_Default_Value);
			//End:: custom logic to get payement Terms
			
		    //START -- Custom Logic to get State Values							
	        stateArray = SCOUIMethods.SCGetOrderLoVs("[Order By] >= 1 and [Order By] <= 52 and [Type]= 'STATE_ABBREV' and [Active] = 'Y'");
			var stateValue = '';
			stateValue +=' <option></option>';
		    for(var st=0;st<stateArray.length;st++)
			{
				stateValue +=' <option>'+stateArray[st]+'</option>';
			}
			$('#SCAccState').html(stateValue);
		    //END -- Seting State values 
			
		    //start: Custom logic to set country values
			var countryValue = '';
			countryValue +=' <option></option>';						
			for(var ct=0;ct<countryvalues.length;ct++)
			{
			countryValue +=' <option>'+countryvalues[ct]+'</option>';
		    }
			$('#SCAccCountry').html(countryValue);
			//End:Custom logic to set country values
			
		    //Start: custom logic for preferred contact get values
		    preConArray = SCOUIMethods.SCGetOrderLoVs("[Type]= 'COMM_METHOD' and [Active] = 'Y'");
			var preConValue = '';
			preConValue +=' <option></option>';
			for(var pc=0;pc<preConArray.length;pc++)
			{
				preConValue +=' <option value="'+preConArray[pc]+'">'+preConArray[pc]+'</option>';
			}
		    $("#PreferredContactMethod").html(preConValue);
		    //End:custom logic for preferred contact get values
		    $("#CustomerType").parent().addClass("is-active is-completed");
		    $("#CustomerSubtype").parent().addClass("is-active is-completed");
		    $("#PaymentTerms").parent().addClass("is-active is-completed");
			$("body").trigger('Custom.End');
			},500);
    });
    //End:Click on add Account Button
    $("#acc-close-details").click(function() {
		$("#SC-add-account").modal('hide');
	});
	
	//Start :on change of customerType to show CustomerSubtype and PayementTerms
	$(document).on('change',"#CustomerType",function () {
		
		custsubTypeArray = SCOUIMethods.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+this.value+"'","Order By");
		
	   if (custsubTypeArray.length==0 ||(custsubTypeArray.length == 1 && custsubTypeArray[0] == ""))
		{
			$("#CustomerSubtype").prop('disabled', true);
			$('#CustomerSubtype').html('<option></option>');
			$("#CustomerSubtype").parent().removeClass("is-active is-completed"); 
		}
								
		else{
			$("#CustomerSubtype").removeAttr('disabled');
		    }
		if(this.value !=BS_Data_CustType_Default && this.value !=BS_Data_WholeSale_CustType)
		{   
			$('#PaymentTerms').html('<option></option>');
			$('#PaymentTerms').append(payementTermsValue);
			$("#PaymentTerms").parent().removeClass("is-active is-completed");
			$('#CustomerSubtype').html('<option></option>');
			for(var i=0;i<custsubTypeArray.length;i++)
		    $('#CustomerSubtype').append('<option value="'+custsubTypeArray[i]+'">'+custsubTypeArray[i]+'</option>');
			$("#CustomerSubtype").parent().removeClass("is-active is-completed"); 
		}
	   else
		{
			$('#PaymentTerms').html(payementTerms_Default_Value);
			$("#PaymentTerms").parent().addClass("is-active is-completed");
			if(this.value ==BS_Data_CustType_Default){
				$('#CustomerSubtype').html('<option value="'+BS_Data_CusSubType_Default+'" selected>'+BS_Data_CusSubType_Default+'</option>');
				/*else if(this.value !=BS_Data_WholeSale_CustType)
				$('#CustomerSubtype').html('<option value="'+BS_Data_WholeSale_CusSubType+'" selected>'+BS_Data_WholeSale_CusSubType+'</option>');*/
				for(var i=0;i<custsubTypeArray.length;i++){
				if(custsubTypeArray[i]!= BS_Data_CusSubType_Default)
				$('#CustomerSubtype').append('<option value="'+custsubTypeArray[i]+'">'+custsubTypeArray[i]+'</option>');
				}
			}
			else{
				$('#CustomerSubtype').html('<option value="International Partners" selected>International Partners</option>');
				for(var i=0;i<custsubTypeArray.length;i++){
					if(custsubTypeArray[i]!= "International Partners")
				$('#CustomerSubtype').append('<option value="'+custsubTypeArray[i]+'">'+custsubTypeArray[i]+'</option>');
				}
			}
			$("#CustomerSubtype").parent().addClass("is-active is-completed"); 
	    }
	});
   //End:on change of customerType to show CustomerSubtype and PayementTerms
   
   //Start: on change of email checkbox email field is enabled or disabled
	$(document).on('click',"#email",function()
	{
	if($('#email').prop('checked')==true)
	{
        $('#Email').removeAttr('disabled');
		$("#emaillabel").addClass('mandatory');
		$("#Email").attr('name','emailEmpty');
	}
	else{						
		$('#Email').attr('disabled',true);
		$("#Email").removeAttr('name');
		$('#Email').val('');
		$("#emaillabel").removeClass('mandatory');
		$("#Email").parent().removeClass("is-active is-completed"); 
		//$('#Email').tooltip('hide')
	    }
	});
    //End:on change of email checkbox email field is enabled or disabled


    //start:vlidation on city phonenumbers	
	jQuery.validator.addMethod("regex",function(value, element, regexp) 
		{
           if (regexp.constructor != RegExp)
				regexp = new RegExp(regexp);
			else if (regexp.global)
				regexp.lastIndex = 0;
			return this.optional(element) || regexp.test(value);
		},
		""
	);	
    //end:vlidation on city phonenumbers
	
	//Start:Clicks  on next button	
    $(document).ready(function() {
	   var errorCodes = SCErrorCodes.errorcodes();
		$(document).on('click',"#gotoAccountCustomer", function(event) {
		if($('#email').prop('checked')==true)
		 {
		  if( $('#Email').val() != '')
		  $("#Email").attr('name','emailfield');
	     }
		    $("#accountform").validate({
					rules: {
						accountname: { required: true },
						phonenumber: { regex: /\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ },
						tollfreenumber: {regex: /\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/},
						WorkPhoneExt: {regex: /\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/},
						city:{ regex:  /^[a-zA-Z\\w\s\\s-]+$/ },
						postalcode : {regex: /^[a-zA-Z0-9\\w\s\\s-]+$/ },
						emailfield: { email: true },
						emailEmpty: { required: true }
					},
					messages: {
						accountname: errorCodes.SC_ACCOUNT_NAME,
						phonenumber: errorCodes.SC_MOBILE_NUMBER,
						tollfreenumber: errorCodes.SC_MOBILE_NUMBER,
						emailfield: errorCodes.SC_INVALID_EMAIL,
						city: errorCodes.SC_CITY,
						WorkPhoneExt:errorCodes.SC_MOBILE_NUMBER,
						postalcode:errorCodes.SC_ZIPCODE,
						emailEmpty:errorCodes.SC_REQUIRED_EMAIL
					},
					tooltip_options: {
						accountname: { trigger: 'focus', placement: 'bottom', html: true },
						phonenumber: { trigger: 'focus', placement: 'bottom', html: true },
						tollfreenumber: { trigger: 'focus', placement: 'bottom', html: true },
						WorkPhoneExt: { trigger: 'focus', placement: 'bottom', html: true },
						emailfield: { trigger: 'focus', placement: 'bottom', html: true },
						city: { trigger: 'focus', placement: 'bottom', html: true },
						postalcode: { trigger: 'focus', placement: 'bottom', html: true },
						emailEmpty: { trigger: 'focus', placement: 'bottom', html: true }

						},
					submitHandler: function(form) 
					{
					 event.preventDefault();
					$("#SC-account-customer").show();
					$("#SC-account-account").hide();

					$(".SC-account-account img").attr({
						src: 'images/custom/completed-step.PNG'
					});
					$(".SC-account-customer img").attr({
						src: 'images/custom/not-completed.png'
					});

					$(".SC-account-customer").addClass('active');
					$(".SC-account-account").removeClass('active');
							
			       }//submit handler close
			});//account form close
		});	//End:Clicks  on next button
	});	//ready function close
	
    //START:: Click on previous button
	$(document).on('click',"#gotoAccountAccount", function(event) {
				event.preventDefault(); 
				$("#SC-account-account").show();
				$("#SC-account-customer").hide();
			    $(".SC-acc-account img").attr({
					src: 'images/custom/completed-step.PNG'
				});
				$(".SC-acc-customer img").attr({
					src: 'images/custom/completed-step.PNG'
				});
				$(".SC-account-customer").removeClass('active');
				$(".SC-account-account").addClass('active');
			
	});		
	//END::  Click on previous button
	
    //This is for the input box animations. this is required across the app
	$(document).on('focus','.SC-input', function() {
		$(this).parent().addClass("is-active is-completed");
	});
    $(document).on('focusout','.SC-input',function() {
		if ($(this).val() === "")
			$(this).parent().removeClass("is-completed");
		$(this).parent().removeClass("is-active");
	});
   //Start:: Phone Number Conversion					
	$(document).on('focusout','#SCAccPhoneNumber,#SCAccWorkPhoneExt,#SCACCTollFreeNumber',function() {
	  var phNumb = $(this).val();
	  if(phNumb != '' && phNumb.match(/^\d+$/) && phNumb.length == 10)
	   {
		var USFormt_PhNum  = "("+phNumb.substring(0,phNumb.length-7)+") "+phNumb.substring(3,phNumb.length-4)+"-"+phNumb.substring(6,phNumb.length);
	    $(this).val(USFormt_PhNum);
	   }
	  if ($(this).val() === "")
	  {
	   $(this).parent().removeClass("is-completed");
	   $(this).parent().removeClass("is-active");
	  }
	});
	//End:: Phone Number Conversion	
	//On click of Price List
	$(document).on("click","#SC-price-icon",function(){
			SiebelJS.Log("on click");
			var id = this.id;
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"),SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetControls()["Price List"]);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
					var price_list = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetControls()["Price List"]);
					if(price_list != ""){
						SiebelJS.Log("price_list...:"+price_list);
						$("#PriceList").val(price_list);
						$("#PriceList").parent().addClass("is-active is-completed");
					}
				});
	});	
	//end on click of Price List	
	//START::On lick on save button
	$(document).on('click',"#createAccount", function(event) {
		//NGOLLA for 585 defect
       var accerrorCodes = SCErrorCodes.errorcodes();
         if($('#CustomerType').val()== BS_Data_WholeSale_CustType || $('#CustomerType').val()== BS_Data_CustType_Default){
			 $("#SC-account-customer-form").validate({
				 rules:{
                    customsubtype: {required: true}
				 },
                messages:{
                 customsubtype: accerrorCodes.SC_CUSTOMER_SUB_TYPE
			   },
			   tooltip_options:{
               customsubtype: {trigger: 'focus', placement: 'bottom', html: true}
			   
			   },
			    submitHandler: function(form) {
				event.preventDefault();
				   saveAccount();
		      }  
			 });				 
		 }
	     else{
	         saveAccount();
		}
    });
       // End::On lick on save button
     
    }//end of bind events
		
	$("#createAccount").click(function(event) {
		event.preventDefault();
	});

    SCSISAccountListAppletPR.prototype.EndLife = function () {
    SiebelAppFacade.SCSISAccountListAppletPR.superclass.EndLife.apply(this, arguments);
		recor=0;
		Acccreation=0;
		scAccsalesorder=0;
		sFields = ['Account Number','Account Name'];
		next = 1;
		searchCount = 2;
		if(localStorage.getItem('whitescreen')==0){
			$("#_swescrnbar").hide();
			$("#_swethreadbar").hide();
			$("#_sweappmenu").hide();
			$("#s_vctrl_div").hide();
			$(".siebui-button-toolbar").hide();
			$("#_sweview").hide();
			$('#_swecontent').prepend(SCOUIMarkups.CustomWhiteScreenTimer());
			$("#custommaskoverlay").show();
		}
		else if(localStorage.getItem('whitescreen')==1){
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			$("#_sweview").show();
		}
		$(document).unbind('click');
		$(document).unbind('keyup');
    }
      function saveAccount(){
		// logic to save Account.
		event.preventDefault();
		$("#SC-add-account").modal('hide');
		$("body").trigger('Custom.Start');
		if(Acccreation===0){
		Acccreation=1;
		setTimeout(function(){
		//getting the values from account form
	    var AccountName        =   $('#SCAccAccountName').val().toUpperCase();
		var Address            =   $('#SCAccAddress').val();
		var City               =   $('#SCAccCity').val();
		var State              =   $('#SCAccState').val();
		var Country            =   $('#SCAccCountry').val();
		var PostalCode         =   $('#SCAccPostalCode').val();
		var PhoneNumber        =   $('#SCAccPhoneNumber').val();
		var WorkPhoneExt       =   $('#SCAccWorkPhoneExt').val();
		var TollFreeNumber     =   $('#SCACCTollFreeNumber').val();
		var MainFax            =   $('#SCAccMainFax').val();
		var Email              =   $('#Email').val();
		var emailcheckbox      =   $("#email").is(':checked') ? 'Y' : 'N';
		var CustomerType       =   $('#CustomerType').val();
		var CustomerSubtype    =   $('#CustomerSubtype').val();
		var DoNotMail          =   $("#dn").is(':checked') ? 'Y' : 'N';
		var DoNotEmail         =   $("#dne").is(':checked') ? 'Y' : 'N';
		var PaymentTerms       =   $('#PaymentTerms').val();
		var TaxExempt          =   $("#tax").is(':checked') ? 'Y' : 'N';
		var DoNotCall          =   $("#dnt").is(':checked') ? 'Y' : 'N';
		var URL                =   $('#SCAccURL').val();
		var PreferredContactMethod=$('#PreferredContactMethod').val();
		var PriceList          =    $('#PriceList').val();
		var adressProvided     = "Y";
		SiebelJS.Log("AccountName"+AccountName);
		SiebelJS.Log("Address"+Address);
		SiebelJS.Log("City"+City);
		SiebelJS.Log("State"+State);
		SiebelJS.Log("Country"+Country);
		SiebelJS.Log("PostalCode"+PostalCode);
		SiebelJS.Log("PhoneNumber"+PhoneNumber);
		SiebelJS.Log("WorkPhoneExt"+WorkPhoneExt);
		SiebelJS.Log("TollFreeNumber"+TollFreeNumber);
		SiebelJS.Log("MainFax"+MainFax);
		SiebelJS.Log("Email"+Email);
		SiebelJS.Log("emailcheckbox"+emailcheckbox);
		SiebelJS.Log("CustomerType"+CustomerType);
		SiebelJS.Log("CustomerSubtype"+CustomerSubtype);
		SiebelJS.Log("DoNotMail"+DoNotMail);
		SiebelJS.Log("DoNotEmail"+DoNotEmail);
		SiebelJS.Log("PaymentTerms"+PaymentTerms);
		SiebelJS.Log("TaxExempt"+TaxExempt);
		SiebelJS.Log("DoNotCall"+DoNotCall);
		SiebelJS.Log("URL"+URL);
		SiebelJS.Log("PreferredContactMethod"+PreferredContactMethod);
		SiebelJS.Log("PriceList"+PriceList);
		//setting input values to processproperty
		var Bservice = '',inPS = '', outPS = '';
		var Child;
		inPS  = SiebelApp.S_App.NewPropertySet();
		outPS = SiebelApp.S_App.NewPropertySet();
		//Added code for defect 689sssss
		if(Address==""&&City==""){
			adressProvided="N";
		}
		inPS.SetProperty("AccountName",AccountName);
		inPS.SetProperty("Address",Address);
		inPS.SetProperty("City",City);
		inPS.SetProperty("State",State);
		inPS.SetProperty("Country",Country);
		inPS.SetProperty("PostalCode",PostalCode);
		inPS.SetProperty("PhoneNumber",PhoneNumber);
		inPS.SetProperty("WorkPhoneExt",WorkPhoneExt);
		inPS.SetProperty("TollFreeNumber",TollFreeNumber);
		inPS.SetProperty("MainFax",MainFax);
		inPS.SetProperty("Email",Email);
		inPS.SetProperty("CustomerType",CustomerType);
		inPS.SetProperty("CustomerSubtype",CustomerSubtype);
		inPS.SetProperty("DoNotMail",DoNotMail);
		inPS.SetProperty("DoNotEmail",DoNotEmail);
		inPS.SetProperty("PaymentTerms",PaymentTerms);
		inPS.SetProperty("TaxExempt",TaxExempt);
		inPS.SetProperty("DoNotCall",DoNotCall);
		inPS.SetProperty("URL",URL);
		inPS.SetProperty("PreferredContactMethod",PreferredContactMethod);
		inPS.SetProperty("PriceList",PriceList);
		inPS.SetProperty("AddressProvided",adressProvided);
		inPS.SetProperty("ProcessName","SC Create New Account");//set process Name
		SiebelJS.Log("Invoking Workflow");
		Bservice = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
		outPS = Bservice.InvokeMethod("RunProcess",inPS); //invoke the method
		SiebelJS.Log("Workflow invoked1");
		Child = outPS.GetChild(0);
		var BS_Accountid=Child.GetProperty("AccountId");
		SiebelJS.Log("addressid:"+BS_Accountid);
		var Bservice = '',inPS = '', outPS = '';
		inPS  = SiebelApp.S_App.NewPropertySet();
		outPS = SiebelApp.S_App.NewPropertySet();
		inPS.SetProperty("Name","AccountRecentRecordId");
		inPS.SetProperty("Value",BS_Accountid);
		Bservice = SiebelApp.S_App.GetService("SessionAccessService");
		outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
		SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].InvokeMethod("AccountRecentRecordDrillDown");
		pm.ExecuteMethod("OnDrillDown", "Name", 1);
		//navigate to account address view
		$("body").trigger('Custom.End');
		},1000);
	 }
		
	}
    return SCSISAccountListAppletPR;
   }()
  );
  return "SiebelAppFacade.SCSISAccountListAppletPR";
 })
}
