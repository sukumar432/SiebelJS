/****************************************************
	CREATED BY SADDALA
	CREATED FOR SC SALES EFFICIENCY OPEN UI
	PURPOSE : THIS PR APPLIED ON THE VIEW FOR ACCOUNT 360
	CREATED ON 10/20/2017
****************************************************/
if (typeof(SiebelAppFacade.SCAccount360DegreeViewPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCAccount360DegreeViewPR");
 define("siebel/custom/SelectComfort/SCAccount360DegreeViewPR", ["siebel/viewpr","siebel/custom/SelectComfort/SCAccountSearchMarkup","siebel/custom/SelectComfort/SC_OUI_Definitions","siebel/custom/SelectComfort/SC_OUI_Definitions","siebel/custom/SelectComfort/SC_OUI_Markups","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/bootstrap.min","siebel/custom/SelectComfort/jquery.validate.min","siebel/custom/SelectComfort/SCErrorCodes"],
  function () {
   SiebelAppFacade.SCAccount360DegreeViewPR = (function () {
	   
	var pm = "";
	var FieldQueryPair="";
	var codes;
	var ConRec='',LoginId="";
	var a=true,b=true,c=true,d=true,e=true,f=true,g=true,h=true,l=true,m=true,n=true,o=true,q=true,r=true,s=true,t=true,u=true;
	var oa=true,ob=true,oc=true,od=true,oe=true,og=true;
	var aa=true,ab=true,ac=true,ad=true,ae=true,af=true;
	var Appletid="",recordset="",Accmarkup="",Conmarkup="",Ordmarkup="",Attmarkup="";
	var SiebelConstants = SiebelJS.Dependency("SiebelApp.Constants");
	var AccountSearchMarkup = SiebelJS.Dependency("SiebelApp.SCAccountSearchMarkup");
	var SC_OUI_Markup = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	var SC_OUI_Method = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
	var SCErrorCodes= SiebelJS.Dependency("SiebelApp.SCErrorCodes");
	var InPS = SiebelApp.S_App.NewPropertySet();
	var OutPS = SiebelApp.S_App.NewPropertySet();
	var InPS1 = SiebelApp.S_App.NewPropertySet();
	var OutPS1 = SiebelApp.S_App.NewPropertySet();
	
	var text_div = {"accountAppletName":"account","accountcontactAppletName":"accountcontact","ordersAppletName":"orders","attatchmentsAppletName":"attatchments"};
	var divisions = {"Acc-Pin":"account","Contacts-Pin":"accountcontact","Orders-Pin":"orders","Attachments-Pin":"attatchments"};
	var appletNames = {"Acc-Pin":"Accounts","Contacts-Pin":"Contacts","Orders-Pin":"Orders","Attachments-Pin":"Attachments"};
	var sections = {"Acc-Pin":"accountsec","Contacts-Pin":"accountcontactsec","Orders-Pin":"orderssec","Attachments-Pin":"attatchmentssec"};
	var positions = {"Acc-Pin":"","Contacts-Pin":"","Orders-Pin":"","Attachments-Pin":""};
	var bt_sections = {"accountsec":"Acc-Pin","accountcontactsec":"Contacts-Pin","orderssec":"Orders-Pin","attatchmentssec":"Attachments-Pin"};
	var appletsList = {};
	var pinids= [],User_pinnedIds_Loc=[],saveAccPinId;
	var con_sort,ordsort,attsort,AccountForm_BC;
	var conappid="",Appletid_Con="",ordappid="",Appletid_Ord="",attappid="",Appletid_Att="",accpm="",Appletidac="";
	var rowvalue_con,rowvalue_ord,rowvalue_att,trid_con="",trid_ord="",trid_att="",tableid_con="",tableid_ord="",tableid_att="";
	var Contact_id="",Order_id="",Attachment_id="",Account_Id="",sLogUserNamePinids,sLogUserNamePos,userPinIds;
	/*var bootstrapTooltip = $.fn.tooltip.noConflict();
    $.fn.bstooltip = bootstrapTooltip;*/

    function SCAccount360DegreeViewPR(pm) {
     SiebelAppFacade.SCAccount360DegreeViewPR.superclass.constructor.call(this, pm);
    }

    SiebelJS.Extend(SCAccount360DegreeViewPR, SiebelAppFacade.ViewPR);

    SCAccount360DegreeViewPR.prototype.Init = function () {
		SiebelAppFacade.SCAccount360DegreeViewPR.superclass.Init.call(this);
		
		pm=this.GetPM();
		//SC_OUI_Method.SCGetProfileAttr("SC Store Number,Login Name,SC Store User,SC Primary Division Type,Last Name,First Name");
		LoginId = SC_OUI_Method.SCGetProfileAttrValue("Login Name");
		$("#_swescrnbar").hide();
		$("#_swethreadbar").hide();
		$("#_sweappmenu").hide();
		$("#s_vctrl_div").hide();
		$(".siebui-button-toolbar").hide();
		$("#_sweview").hide();
		localStorage.setItem('whitescreen', 0);
    }

    SCAccount360DegreeViewPR.prototype.ShowUI = function () {
    SiebelAppFacade.SCAccount360DegreeViewPR.superclass.ShowUI.call(this);
		$(".whitescreentimer").remove();
		$("#custommaskoverlay").hide();
		$("#_sweview").show();
		pinids=[];	
		User_pinnedIds_Loc=[];	
		saveAccPinId="Y";		
	pm=this.GetPM();
	//hiding tooltip
	$('div[title="Account360"]').attr("title","");
	var value = pm.Get("Pin-Unpin");
	var Conmarkuprj = "";
	SiebelJS.Log("Local--Account 360 View PR --ShowUI");
	consort = SiebelApp.S_App.GetActiveView().GetAppletMap()['SC Account Contact List Applet'].GetPModel().GetRenderer().GetPM();
	ordsort = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (All)"].GetPModel().GetRenderer().GetPM();
	attsort = SiebelApp.S_App.GetActiveView().GetAppletMap()['Account Attachment Applet'].GetPModel().GetRenderer().GetPM();
	var ConRecdd=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
	AccountForm_BC =SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp();
	var mainmarkup = AccountSearchMarkup.SCAccount360Markup();
	 //getting header markups and appending it
	  var StoreUser =  SC_OUI_Method.SCGetProfileAttrValue('SC Store User');
		var lastName = SC_OUI_Method.SCGetProfileAttrValue('Last Name');
		var firstName = SC_OUI_Method.SCGetProfileAttrValue('First Name');
		var loginName = SC_OUI_Method.SCGetProfileAttrValue('Login Name');
	 var headermarkup=SC_OUI_Markup.Header_block("Accounts",StoreUser,lastName,firstName,loginName);
	 
	 //getting left module markup to append
	 var leftmarkup=AccountSearchMarkup.Left_block();	
	 
	//getting strore change markup
	var storechangemarkup=SC_OUI_Markup.StoreChange();
	// $(mainmarkup).insertAfter("#_sweview");
	//Start:Hiding the Applets
	var a="";
	a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact List Applet"].GetPModel().Get("GetFullId");
	$("#"+a).hide();
	a=SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().Get("GetFullId");
	$("#"+a).hide();
	a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (All)"].GetPModel().Get("GetFullId");
	$("#"+a).hide();
	a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().Get("GetFullId");
	$("#"+a).hide();
	a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().Get("GetFullId");
	$('#s_'+a+'_div').hide();
	$('#'+a).append(mainmarkup);
	//End:Hiding the Applets
	 $('.nav-header').html(headermarkup);
	 $('#SC-add-storelocation').html(storechangemarkup);
	 $('.SC-360-left-container').html(leftmarkup);
	 SiebelJS.Log("Function Invoked");
		//Adding CustomerMarkup 
		customtimermarkup=SC_OUI_Markup.CustomTimer();
		$('#applet1').append(customtimermarkup);
		
		 //SNARRA:Added code for P2PE customer Info Check
			 var P2peflag = localStorage.getItem("IsP2PECustom");
			  if(P2peflag=="Y"){
					 
					   $("#SC-SO-P2PE-change").modal({
							backdrop: 'static'
						});
						$("#SC-SO-P2PE-change").css({
							"display": "flex",
							"justify-content": "center",
							"align-items": "center"
						}); 
				 }
		
	 //Code for divisions drag and drop starts
	 var $sortable = $('#rightcontainer');
	 SiebelJS.Log("In sortable");
	 //SBOORLA:Added code Applet sequence based on User Preferences
			var Custom_Service="",Input_BS="",Out_BS="",pinnedIds_Loc="";
			Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
			Input_BS = SiebelApp.S_App.NewPropertySet();
			Out_BS = SiebelApp.S_App.NewPropertySet();
			searchfields = "Cosmetics/AccountSequence,Cosmetics/AccountPinUnpin";
			Input_BS.SetProperty("BO", "User Preferences");
			Input_BS.SetProperty("BC", "User Preferences");
			Input_BS.SetProperty("SearchSpecification", "");
			Input_BS.SetProperty("SortSpecification", "");
			Input_BS.SetProperty("ReqNoOfRecords", "");
			Input_BS.SetProperty("FieldsArray", searchfields);
			Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
			var Child_BS = Out_BS.GetChild(0);
			var BS_Data = Child_BS.GetProperty("OutputRecordSet");
			if(BS_Data!="}"){
					var ResArray = new Array;
					ResArray = BS_Data.split(";");
					
						jsonRes = JSON.parse(ResArray[0]);
						pinnedIds_Loc=jsonRes["Cosmetics/AccountSequence"];
						SiebelJS.Log("jsonSK"+jsonRes["Cosmetics/AccountSequence"]);
						pinnedIds_Loc=pinnedIds_Loc.split("_");
						User_pinnedIds_Loc=jsonRes["Cosmetics/AccountPinUnpin"];
						SiebelJS.Log("jsonSK"+jsonRes["Cosmetics/AccountPinUnpin"]);
						User_pinnedIds_Loc=User_pinnedIds_Loc.split("_");
			}
			SiebelJS.Log("userPinIds"+pinnedIds_Loc);
			if (pinnedIds_Loc!="") {
				SiebelJS.Log("In sortable");
				$.each(pinnedIds_Loc, function(i, position) {
				var $target = $sortable.find('#' + position);
				$target.appendTo($sortable); // or prependTo
				});
			}
    $sortable.sortable({
        update: saveNewOrder,
		 items: '.SC-360-card:not(.fixed)'
    });
    function saveNewOrder() {
		SiebelJS.Log("in save new order function");
        //var pos = JSON.stringify($sortable.sortable("toArray"));
        //localStorage.setItem(sLogUserNamePos, pos);
		//SBOORLA:Added code for storing Applet Sequence in User Preference
		var fieldvalues="",inPS="",outPS="",Bservice="";
        var pos = $sortable.sortable("toArray");
		
				for(var i=0;i<pos.length;i++){
					
					if(pos.length!=(i+1))
						fieldvalues+=pos[i]+"_";
					else
						fieldvalues+=pos[i];
				
				}
				var fieldnames="Cosmetics/AccountSequence";
				inPS = SiebelApp.S_App.NewPropertySet();
				outPS = SiebelApp.S_App.NewPropertySet();
				inPS.SetProperty("BO","User Preferences");
				inPS.SetProperty("BC","User Preferences");
				inPS.SetProperty("FieldsArray",fieldnames );
				inPS.SetProperty("ValuesArray",fieldvalues);
				inPS.SetProperty("SearchSpecification","" );
				Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
				outPS = Bservice.InvokeMethod("Insert", inPS);
    }
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
	//division drag and drop ends
		
		$(document).on("click",".sort-by",function(){
			//code for contact list applet
			if($(this).attr('id')=="sortprimary"){
			if(a==true){SiebelJS.Log("In asc number");SC_OUI_Method.SortRecords(consort,"SSA Primary Field","SortAscending");SC_OUI_Markup.Sorting_Contacts();a=false;}
			else{SiebelJS.Log("In dec number");SC_OUI_Method.SortRecords(consort,"SSA Primary Field","SortDescending");SC_OUI_Markup.Sorting_Contacts();a=true;}
			}
			else if($(this).attr('id')=="sortfn"){
			if(b==true){SC_OUI_Method.SortRecords(consort,"First Name","SortAscending");SC_OUI_Markup.Sorting_Contacts();b=false;}
			else{SC_OUI_Method.SortRecords(consort,"First Name","SortDescending");SC_OUI_Markup.Sorting_Contacts();b=true;}
			}
			else if($(this).attr('id')=="sortln"){
			if(c==true){SC_OUI_Method.SortRecords(consort,"Last Name","SortAscending");SC_OUI_Markup.Sorting_Contacts();c=false;}
			else{SC_OUI_Method.SortRecords(consort,"Last Name","SortDescending");SC_OUI_Markup.Sorting_Contacts();c=true;}
			}
			else if($(this).attr('id')=="sortmm"){
			if(d==true){SC_OUI_Method.SortRecords(consort,"M/M","SortAscending");SC_OUI_Markup.Sorting_Contacts();d=false;}
			else{SC_OUI_Method.SortRecords(consort,"M/M","SortDescending");SC_OUI_Markup.Sorting_Contacts();d=true;}
			}
			else if($(this).attr('id')=="sortworkph"){
			if(e==true){SC_OUI_Method.SortRecords(consort,"Work Phone #","SortAscending");SC_OUI_Markup.Sorting_Contacts();e=false;}
			else{SC_OUI_Method.SortRecords(consort,"Work Phone #","SortDescending");SC_OUI_Markup.Sorting_Contacts();e=true;}
			}
			else if($(this).attr('id')=="sortworkfax"){
			if(f==true){SC_OUI_Method.SortRecords(consort,"Fax Phone #","SortAscending");SC_OUI_Markup.Sorting_Contacts();f=false;}
			else{SC_OUI_Method.SortRecords(consort,"Fax Phone #","SortDescending");SC_OUI_Markup.Sorting_Contacts();f=true;}
			}
			else if($(this).attr('id')=="sortemail"){
			if(g==true){SC_OUI_Method.SortRecords(consort,"Email Address","SortAscending");SC_OUI_Markup.Sorting_Contacts();g=false;}
			else{SC_OUI_Method.SortRecords(consort,"Email Address","SortDescending");SC_OUI_Markup.Sorting_Contacts();g=true;}
			}
			else if($(this).attr('id')=="sortcustomernum"){
			if(h==true){SC_OUI_Method.SortRecords(consort,"Account Location","SortAscending");SC_OUI_Markup.Sorting_Contacts();h=false;}
			else{SC_OUI_Method.SortRecords(consort,"Account Location","SortDescending");SC_OUI_Markup.Sorting_Contacts();h=true;}
			}
			else if($(this).attr('id')=="sortmobileph"){
			if(l==true){SC_OUI_Method.SortRecords(consort,"Cellular Phone #","SortAscending");SC_OUI_Markup.Sorting_Contacts();l=false;}
			else{SC_OUI_Method.SortRecords(consort,"Cellular Phone #","SortDescending");SC_OUI_Markup.Sorting_Contacts();l=true;}
			}
			else if($(this).attr('id')=="sortmn"){
			if(m==true){SC_OUI_Method.SortRecords(consort,"Middle Name","SortAscending");SC_OUI_Markup.Sorting_Contacts();m=false;}
			else{SC_OUI_Method.SortRecords(consort,"Middle Name","SortDescending");SC_OUI_Markup.Sorting_Contacts();m=true;}
			}
			else if($(this).attr('id')=="sortadd"){
			if(n==true){SC_OUI_Method.SortRecords(consort,"Personal Street Address","SortAscending");SC_OUI_Markup.Sorting_Contacts();n=false;}
			else{SC_OUI_Method.SortRecords(consort,"Personal Street Address","SortDescending");SC_OUI_Markup.Sorting_Contacts();n=true;}
			}
			else if($(this).attr('id')=="sortcity"){
			if(o==true){SC_OUI_Method.SortRecords(consort,"Personal City","SortAscending");SC_OUI_Markup.Sorting_Contacts();o=false;}
			else{SC_OUI_Method.SortRecords(consort,"Personal City","SortDescending");SC_OUI_Markup.Sorting_Contacts();o=true;}
			}
			else if($(this).attr('id')=="sortstate"){
			if(q==true){SC_OUI_Method.SortRecords(consort,"Personal State","SortAscending");SC_OUI_Markup.Sorting_Contacts();q=false;}
			else{SC_OUI_Method.SortRecords(consort,"Personal State","SortDescending");SC_OUI_Markup.Sorting_Contacts();q=true;}
			}
			else if($(this).attr('id')=="sortpostalcode"){
			if(r==true){SC_OUI_Method.SortRecords(consort,"Postal Code","SortAscending");SC_OUI_Markup.Sorting_Contacts();r=false;}
			else{SC_OUI_Method.SortRecords(consort,"Postal Code","SortDescending");SC_OUI_Markup.Sorting_Contacts();r=true;}
			}
			else if($(this).attr('id')=="sortcountry"){
			if(s==true){SC_OUI_Method.SortRecords(consort,"Personal Country","SortAscending");SC_OUI_Markup.Sorting_Contacts();s=false;}
			else{SC_OUI_Method.SortRecords(consort,"Personal Country","SortDescending");SC_OUI_Markup.Sorting_Contacts();s=true;}
			}
			else if($(this).attr('id')=="sorthomeph"){
			if(t==true){SC_OUI_Method.SortRecords(consort,"Home Phone #","SortAscending");SC_OUI_Markup.Sorting_Contacts();t=false;}
			else{SC_OUI_Method.SortRecords(consort,"Home Phone #","SortDescending");SC_OUI_Markup.Sorting_Contacts();t=true;}
			}
			else if($(this).attr('id')=="sorthouseholds"){
			if(u==true){SC_OUI_Method.SortRecords(consort,"Households","SortAscending");SC_OUI_Markup.Sorting_Contacts();u=false;}
			else{SC_OUI_Method.SortRecords(consort,"Households","SortDescending");SC_OUI_Markup.Sorting_Contacts();u=true;}
			}
			//contact list applet sort code ends
			
			
			//code for orders list applet sort starts
			else if($(this).attr('id')=="sortorder"){
			if(oa==true){SC_OUI_Method.SortRecords(ordsort,"Order Number","SortAscending");SC_OUI_Markup.Sorting_Orders();oa=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"Order Number","SortDescending");SC_OUI_Markup.Sorting_Orders();oa=true;}
			}
			else if($(this).attr('id')=="sorttype"){
			if(ob==true){SC_OUI_Method.SortRecords(ordsort,"Order Type","SortAscending");SC_OUI_Markup.Sorting_Orders();ob=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"Order Type","SortDescending");SC_OUI_Markup.Sorting_Orders();ob=true;}
			}
			else if($(this).attr('id')=="sortsubtype"){
			if(oc==true){SC_OUI_Method.SortRecords(ordsort,"SC Sub-Type","SortAscending");SC_OUI_Markup.Sorting_Orders();oc=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"SC Sub-Type","SortDescending");SC_OUI_Markup.Sorting_Orders();oc=true;}
			}
			else if($(this).attr('id')=="sortstatus"){
			if(od==true){SC_OUI_Method.SortRecords(ordsort,"Status","SortAscending");SC_OUI_Markup.Sorting_Orders();od=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"Status","SortDescending");SC_OUI_Markup.Sorting_Orders();od=true;}
			}
			else if($(this).attr('id')=="sortorderdate"){
			if(oe==true){SC_OUI_Method.SortRecords(ordsort,"Order Date","SortAscending");SC_OUI_Markup.Sorting_Orders();oe=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"Order Date","SortDescending");SC_OUI_Markup.Sorting_Orders();oe=true;}
			}
			else if($(this).attr('id')=="sortsaleloc"){
			if(og==true){SC_OUI_Method.SortRecords(ordsort,"SC Sale Location","SortAscending");SC_OUI_Markup.Sorting_Orders();og=false;}
			else{SC_OUI_Method.SortRecords(ordsort,"SC Sale Location","SortDescending");SC_OUI_Markup.Sorting_Orders();og=true;}
			}
			//orders list applet sort ends
			
			
			//attachments list applet sort code starts
			else if($(this).attr('id')=="sortattname"){
			if(aa==true){SC_OUI_Method.SortRecords(attsort,"AccntFileName","SortAscending");SC_OUI_Markup.Sorting_Attachments();aa=false;}
			else{SC_OUI_Method.SortRecords(attsort,"AccntFileName","SortDescending");SC_OUI_Markup.Sorting_Attachments();aa=true;}
			}
			else if($(this).attr('id')=="sortsize"){
			if(ab==true){SC_OUI_Method.SortRecords(attsort,"AccntFileSize","SortAscending");SC_OUI_Markup.Sorting_Attachments();ab=false;}
			else{SC_OUI_Method.SortRecords(attsort,"AccntFileSize","SortDescending");SC_OUI_Markup.Sorting_Attachments();ab=true;}
			}
			else if($(this).attr('id')=="sorttype"){
			if(ac==true){SC_OUI_Method.SortRecords(attsort,"AccntFileExt","SortAscending");SC_OUI_Markup.Sorting_Attachments();ac=false;}
			else{SC_OUI_Method.SortRecords(attsort,"AccntFileExt","SortDescending");SC_OUI_Markup.Sorting_Attachments();ac=true;}
			}
			else if($(this).attr('id')=="sortmodified"){
			if(ad==true){SC_OUI_Method.SortRecords(attsort,"AccntFileDate","SortAscending");SC_OUI_Markup.Sorting_Attachments();ad=false;}
			else{SC_OUI_Method.SortRecords(attsort,"AccntFileDate","SortDescending");orting_Attachments();ad=true;}
			}
			else if($(this).attr('id')=="sortupdatefile"){
			if(ae==true){SC_OUI_Method.SortRecords(attsort,"AccntFileAutoUpdFlg","SortAscending");SC_OUI_Markup.Sorting_Attachments();ae=false;}
			else{SC_OUI_Method.SortRecords(attsort,"AccntFileAutoUpdFlg","SortDescending");SC_OUI_Markup.Sorting_Attachments();ae=true;}
			}
			else if($(this).attr('id')=="sortcomments"){
			if(af==true){SC_OUI_Method.SortRecords(attsort,"Comment","SortAscending");SC_OUI_Markup.Sorting_Attachments();af=false;}
			else{SC_OUI_Method.SortRecords(attsort,"Comment","SortDescending");SC_OUI_Markup.Sorting_Attachments();af=true;}
			}
			//attachments lsit applet sort ends
		});
		//sort by method ends
		
		//Add store Location modal open
		$("#SC-add-store-location").click(function(){
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
		$("#SC-storelocation tr").click(function() {
			$(this).addClass('cti-active').siblings().removeClass('cti-active');
			selectstoreid=$(this).attr('id');
		});
		
		
		//on click of enter on store search
		$("#SC-Store-Search").keyup(function(event) {
			if (event.keyCode === 13) {
				var value=document.getElementById('SC-Store-Search').value;
				markup=SC_OUI_Markup.StoreChange2(value);
				$("#SC-storelocation").html(markup);
				$("#SC-storelocation tr").click(function() {
					$(this).addClass('cti-active').siblings().removeClass('cti-active');
					selectstoreid=$(this).attr('id');
				});
			}
		});
		
		
		// Getting Store location
		StoreLocation = SC_OUI_Method.StoreName(LoginId);
		
		if(StoreLocation!=""){
			document.getElementById('storename').innerHTML = StoreLocation.substring(0,10);
			$("#SC-add-store-location").attr("title","Change Store Location");
			$("#storename").attr("title",StoreLocation);
		}else{
			$("#SC-add-store-location").attr("title","Add Store Location");
		}
		
		
		//Add store Location modal open
		$("#SC-add-store-location").click(function(){
			//StoreLocation = SC_OUI_Method.StoreName(LoginId);
			StoreLocation = SC_OUI_Method.SCGetProfileAttrValue("SC Store Name OUI");
			$("#SC-add-storelocation").modal({
				backdrop: 'static'
			});
			if(StoreLocation!=""){
				document.getElementById('StoreTitle').innerHTML = StoreLocation;
			}else{
				document.getElementById('StoreTitle').innerHTML = "Add Store Location";
			}
		});
		
		
		//on click of the store
		$(document).on('click','#SC-selectstore',function(){
			$("#SC-Store-Search").val("");
		    selectstoreid=$("#"+selectstoreid+" td:first-child").text();
			if(selectstoreid.length!=0){
				SC_OUI_Method.SetStore(selectstoreid);
				SC_OUI_Method.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
				//StoreLocation = SC_OUI_Method.StoreName(LoginId);
				StoreLocation = SC_OUI_Method.SCGetProfileAttrValue("SC Store Name OUI");
				if(StoreLocation!=""){
					document.getElementById('storename').innerHTML = selectstoreid.substring(0,10);
					$("#SC-add-store-location").attr("title","Change Store");
					$("#storename").attr("title",selectstoreid);
					StoreLocation = selectstoreid;
					$("#storereport").show();
				}else{
					 $("#SC-add-store-location").attr("title","Add Store");
				}
			}
			$("#SC-add-storelocation").modal('hide');
			$("#SC-storelocation").html("");
		});
		//NGollA defect for 663
		$(document).on('click','#SC-Clear-store',function(){
				SC_OUI_Method.SetStore("");
				SC_OUI_Method.SCGetProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP");
				//StoreLocation = SC_OUI_Method.StoreName(LoginId);
				StoreLocation = SC_OUI_Method.SCGetProfileAttrValue("SC Store Name OUI");
				$("#storename").text('Add Store');
				$("#StoreTitle").text('Add Store Location');
		});		
		// nullifying Store markup
		$(".SC-close-popup").click(function() {
			$("#SC-Store-Search").val('');
			$("#SC-storelocation").html("");
		});

		
		
		$("#_swescrnbar").hide();
		$("#_swethreadbar").hide();
		$("#_sweappmenu").hide();
		$("#s_vctrl_div").hide();
		$(".siebui-button-toolbar").hide();
		//$("#_swecontent").css("height","99%");
		$('#_sweview').css("overflow","auto");
		//navigation to store report
		/*var customerType = SiebelApp.S_App.GetProfileAttr('SC Primary Division Type');
		if (customerType == 'STORE' || customerType == 'SHOW') {
			$(document).on('click', '#storereport', function(){
				SC_OUI_Markup.StoreNavigation();
			});
		}
		else{
		$("#storereport").hide();}*/
		  
    }//end of show ui
	
     SCAccount360DegreeViewPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCAccount360DegreeViewPR.superclass.BindData.apply(this, arguments);
	 var accpm = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().GetRenderer().GetPM();
	 var Appletidac = accpm.Get("GetFullId");
	 var AccFormApp_RS = accpm.Get("GetRecordSet");
	 
		 
		 var applets_List_Names=SiebelApp.S_App.GetActiveView().GetAppletMap();
		 
		 var Applets_List_Array = [];
		 for(var prop in applets_List_Names)
		 {
			 Applets_List_Array.push(JSON.stringify(prop));		 
		 }
		 
		 var AccRec='';
		 AccRec=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		 
		 // Start-- profile-name mark up
		 var setProfName='<p class="SC-360-profile-name no-margin" id="prof_name">'+AccRec[0]["Name"]+'</p>';
		 $(".SC-360-profile-name").html(setProfName);
		 // End-- profile-name mark up
		 //setting default checkbox values
			$(document).ready(function () {

				if (AccFormApp_RS[0]["SC Tax Exempt"] == 'Y') {
					$("#cin-dnc").prop("checked", true);
				}

				if (AccFormApp_RS[0]["Dont Call"] == 'Y') {
					$("#cin-dne").prop("checked", true);
				}

				if (AccFormApp_RS[0]["SC Do Not eMail"] == 'Y') {
					$("#cin-dnm").prop("checked", true);
				}
				if (AccFormApp_RS[0]["Disable Mailings"] == 'Y') {
					$("#cin-qvc").prop("checked", true);
				}
			});
		 // start -- Account info mark up
		Accmarkup="";
		Accmarkup+='							<form id="accountinfovalidation">';		 
		Accmarkup+='                            <div class="SC-360-card-header">';
		Accmarkup+='                                <div class="SC-360-title-and-icon">';
		Accmarkup+=' 									<div class="icon-and-title">';
		Accmarkup+='                                    <img src="images/custom/AccountInfo.png" class="contact-icon">';
		Accmarkup+='                                    <p class="no-margin">Account Information</p>';
		Accmarkup+='                                   <img src="images/custom/about_record.png" class="info-icon" id="Button">';
		Accmarkup+='									</div>';
		Accmarkup+='                                    <div class="SC-360-save-container" id="SC-360-ai-save" style="display: none;">';
		Accmarkup+='                                        <p class="no-margin save-changes">Save changes ? </p>';
		Accmarkup+='                                         <input type="image" name="Submit" class="SC-vali-img" src="images/custom/done.png" border="0" alt="Submit" id="SC-ai-save" />';
		Accmarkup+='                                        <img src="images/custom/close.png" id="SC-ai-close">';
		//Accmarkup+='</div>';
		Accmarkup+='                                    </div>';
		Accmarkup+='                                </div>';
		Accmarkup+='                                <span class="SC-360-edit" id="SC-360-account-information-edit">Edit</span>';
		Accmarkup+='                            </div>';
		Accmarkup+='                            <div class="SC-360-card-body clearfix">';
		Accmarkup+='                                <form name="SC-360-contact-info">';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Account Number:</label>';
		if(AccRec[0]["Location"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="Location" value="'+AccRec[0]["Location"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="Location" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item" id="Acc360CustomerType">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Customer Type:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="AccountCustomerType" value="'+AccRec[0]["Account Type Code"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin mandatory" id="AccName">Account Name:</label>';
		if(AccRec[0]["Name"] != null){
		Accmarkup+='                                                <input type="text" name="accountname" class="SC-360-item-value SC-360-ai add-color SC-navigate-account" id="Name" title="'+AccRec[0]["Name"]+'" value="'+AccRec[0]["Name"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="accountname" class="SC-360-item-value SC-360-ai" id="Name" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item" id="Acc360CustomerSubType">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Customer Subtype:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCCustomerSubtype" value="'+AccRec[0]["SC Customer Subtype"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Email:</label>';
		if(AccRec[0]["Main Email Address"] != null){
		Accmarkup+='                                    <input type="text" name="email" class="SC-360-item-value SC-360-ai" id="MainEmailAddress" title="'+AccRec[0]["Main Email Address"]+'" value="'+AccRec[0]["Main Email Address"]+'">';}
		else{Accmarkup+='                                            <input type="text" name="email" class="SC-360-item-value SC-360-ai" id="MainEmailAddress" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item" id="Acc360PaymentTerms">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Payment Terms:</label>';
		if(AccRec[0]["SC Payment Terms"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCPaymentTerms" value="'+AccRec[0]["SC Payment Terms"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCPaymentTerms" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Main Phone #:</label>';
		var ph1 = AccRec[0]["Main Phone Number"];
		if(ph1 != ""){
		var USFormt_ph1  = "("+ph1.substring(0,ph1.length-7)+") "+ph1.substring(3,ph1.length-4)+"-"+ph1.substring(6,ph1.length);
		Accmarkup+='                                      <input type="text" name="mainphone" class="SC-360-item-value SC-360-ai" id="MainPhoneNumber" value="'+USFormt_ph1+'">';}
		else{
		Accmarkup+='                                      <input type="text" name="mainphone" class="SC-360-item-value SC-360-ai" id="MainPhoneNumber" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';

		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item checkbox-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Tax Exempt:</label>';
		Accmarkup+='                                                <div class="SC-360-checkbox">';
		if(AccRec[0]["SC Tax Exempt"] == "Y"){
			Accmarkup+='                                                    <input type="checkbox" name="" id="aste" checked="checked"/>';}
		else{
			Accmarkup+='                                                    <input type="checkbox" name="" id="aste" disabled="disabled"/>';}
		Accmarkup+='                                                    <label for="aste" class="SC-360-ai" ></label>';
		Accmarkup+='                                                </div>';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Toll Free Phone #:</label>';
		var ph3 = AccRec[0]["SC Toll Free Number"];
		if(ph3 != ""){
		var USFormt_ph3  = "("+ph3.substring(0,ph3.length-7)+") "+ph3.substring(3,ph3.length-4)+"-"+ph3.substring(6,ph3.length);
		Accmarkup+='                                <input type="text" name="tollfrephone" class="SC-360-item-value SC-360-ai" id="SCTollFreeNumber" value="'+USFormt_ph3+'">';}
		else{
		Accmarkup+='                                <input type="text" name="tollfrephone" class="SC-360-item-value SC-360-ai" id="SCTollFreeNumber" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Price List:</label>';
		if(AccRec[0]["Price List"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="PriceList360" value="'+AccRec[0]["Price List"]+'">';
		//NGOLLA for 581 defect
		Accmarkup+='												<img src="images/custom/search.png" class="mvg-icon add-pricelist-icon" id="sc-acc-search-icon" style="display: none">';
		}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="PriceList360" value="">';
		    //NGOLLA for 581 defect
			Accmarkup+='												<img src="images/custom/search.png" class="mvg-icon add-contact-icon" id="sc-acc-search-icon" style="display: none">';
		}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Work Phone Ext:</label>';
		if(AccRec[0]["SC Work Phone Ext"] != null){
		Accmarkup+='                                      <input type="text" name="workphone" class="SC-360-item-value SC-360-ai" id="SCWorkPhoneExt" value="'+AccRec[0]["SC Work Phone Ext"]+'">';}
		else{Accmarkup+='                                        <input type="text" name="workphone" class="SC-360-item-value SC-360-ai" id="SCWorkPhoneExt" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item checkbox-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Do Not Mail:</label>';
		Accmarkup+='                                                <div class="SC-360-checkbox">';
		if(AccRec[0]["Disable Mailings"] == "Y"){
			Accmarkup+='                                                    <input type="checkbox" name="" id="adnm" checked="checked"/>';}
		else{
			Accmarkup+='                                                    <input type="checkbox" name="" id="adnm" disabled="disabled"/>';}
		Accmarkup+='                                                    <label for="adnm" class="SC-360-ai" ></label>';
		Accmarkup+='                                                </div>';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Main Fax #:</label>';
		if(AccRec[0]["Main Fax Number"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="MainFaxNumber" value="'+AccRec[0]["Main Fax Number"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="MainFaxNumber" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item checkbox-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Do Not Email:</label>';
		Accmarkup+='                                                <div class="SC-360-checkbox">';
		if(AccRec[0]["SC Do Not eMail"] == "Y"){
			Accmarkup+='                                                    <input type="checkbox" name="" id="adne" checked="checked"/>';}
		else{
			Accmarkup+='                                                    <input type="checkbox" name="" id="adne" disabled="disabled"/>';}
		Accmarkup+='                                                    <label for="adne" class="SC-360-ai" ></label>';
		Accmarkup+='                                                </div>';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Address (Mail To):</label>';
		if(AccRec[0]["Street Address"]!= null){
			Accmarkup+='                    	<input type="text" name="" class="SC-360-item-value SC-360-ai" title="'+AccRec[0]["Street Address"]+'" id="StreetAddress" value="'+AccRec[0]["Street Address"]+'">';
		}
		else{
			Accmarkup+='                  <input type="text" name="" class="SC-360-item-value SC-360-ai" id="Street Address" value="">';
			}
		Accmarkup+='						<img src="images/custom/mvg.png" class="mvg-icon" id="sc-address-mvg" style="display: none">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item checkbox-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Do Not Call:</label>';
		Accmarkup+='                                                <div class="SC-360-checkbox">';
		if(AccRec[0]["Dont Call"] == "Y"){
			Accmarkup+='                                                    <input type="checkbox" name="" id="adnc" checked="checked"/>';}
		else{
			Accmarkup+='                                                    <input type="checkbox" name="" id="adnc" disabled="disabled"/>';}
		Accmarkup+='                                                    <label for="adnc" class="SC-360-ai" ></label>';
		Accmarkup+='                                                </div>';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">City:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="City" value="'+AccRec[0]["City"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">URL:</label>';
		if(AccRec[0]["SC URL"] != null || AccRec[0]["SC URL"] !=undefined){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="url" value="'+AccRec[0]["SC URL"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="url" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">State:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="State" value="'+AccRec[0]["State"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Primary Contact:</label>';
		if(AccRec[0]["CUT Full Name"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="CUT Full Name" title="'+AccRec[0]["CUT Full Name"]+'" value="'+AccRec[0]["CUT Full Name"]+'">';}
		else{
			Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value SC-360-ai" id="CUT Full Name" value="">';}
		Accmarkup+='												<img src="images/custom/add-contact-360.png" class="mvg-icon add-contact-icon" id="sc-primary-con" style="display: none">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Postal Code:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="PostalCode" value="'+AccRec[0]["Postal Code"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">Most Recent Order:</label>';
		if(AccRec[0]["SC Recent Order"] != null){
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="RecentOrder" value="'+AccRec[0]["SC Recent Order"]+'">';}
		else{Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="RecentOrder" value="">';}
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		Accmarkup+='                                    </div>';
		//NTHARRE:Added code for story# -
		Accmarkup+='                                    <div class="row no-margin no-padding clearfix">';
		
		Accmarkup+='                                        <div class="col-md-6 col-lg-6">';
		Accmarkup+='                                            <div class="SC-360-item">';
		Accmarkup+='                                                <label class="SC-360-item-label no-margin">HD Service Level:</label>';
		Accmarkup+='                                                <input type="text" name="" class="SC-360-item-value" id="HDServiceLevel" value="'+AccRec[0]["SC HD Service Level"]+'">';
		Accmarkup+='                                            </div>';
		Accmarkup+='                                        </div>';
		
		Accmarkup+='                                    </div>';
		//NTHARRE:Added code for story# -
		Accmarkup+='                                </form>';
		Accmarkup+='                            </div>';
		Accmarkup+='							</form>';
		Account_Id =AccRec[0]["Id"];
		SiebelJS.Log("Attachment id id"+Attachment_id);
		$('#account').html(Accmarkup);
		$(".SC-360-item-value").prop('readonly', true);
		//account info markup ends

		
		 conappid = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact List Applet"].GetPModel().GetRenderer().GetPM(); 
		 Appletid_Con = conappid.Get("GetFullId");
		 SiebelJS.Log("Contact id:"+Appletid_Con);
		 //contacts list applet markup
		Conmarkup=""; 
		Conmarkup+=' 							<div class="SC-360-card-header">';
		Conmarkup+='                                <div class="SC-360-title-and-icon">';
		Conmarkup+='<div class="icon-and-title">';
		Conmarkup+='                                    <img src="images/custom/Accountcontacts-selected.png" class="contact-icon">';
		Conmarkup+='                                    <p class="no-margin">Contacts</p>';
		Conmarkup+='</div>';
		Conmarkup+='                                </div>';
		Conmarkup+='                            </div>';
		Conmarkup+='                            <div class="SC-360-card-body clearfix">';
		Conmarkup+='                                <div class="SC-table-with-scroll-main">';
		Conmarkup+='                                    <table class="SC-table">';
		Conmarkup+='                                        <thead>';
		Conmarkup+='                                            <tr>';
		Conmarkup+='                                                <th class="sort-by" id="sortprimary">Primary</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortfn">First Name</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortln">Last Name</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortmm">Mr/Ms</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortworkph">Work Phone#</th>';
		Conmarkup+='                                                 <th class="sort-by" id="sortworkfax">Work Fax#</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortemail">Email</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortcustomernum">Customer Number</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortmobileph">Mobile Phone#</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortmn">Middle Name</th>';
		Conmarkup+='                                                 <th class="sort-by" id="sortadd">Address</th>';
		Conmarkup+='                                                 <th class="sort-by" id="sortcity">City</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortstate">State</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortpostalcode">Postal Code</th>';
		Conmarkup+='                                                <th class="sort-by" id="sortcountry">Country</th>';
		Conmarkup+='                                                <th class="sort-by" id="sorthomeph">Home Phone#</th>';
		Conmarkup+='                                                <th class="sort-by" id="sorthouseholds">Households</th>';
		Conmarkup+='                                            </tr>';
		Conmarkup+='                                        </thead>';
		Conmarkup+='                                        <tbody id="contacts-sort-id">';
		Conmarkup+='                                        </tbody>';
		Conmarkup+='                                    </table>';
		Conmarkup+='                                </div>';
		Conmarkup+='                <div class="container">';
		Conmarkup+='                    <div class="pagination sc-pagination" id="conpagination">';
		Conmarkup+='                    </div>';
		Conmarkup+='                </div>';
		Conmarkup+='                            </div>';
		$("#accountcontact").html(Conmarkup);
		SC_OUI_Markup.Sorting_Contacts();
		//contact list applet markup ends
		
		//for pagination of ContactsApplet
		var Contact_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact List Applet"].GetPModel().GetRenderer().GetPM();		 
		SC_OUI_Method.PrimaryButton(Contact_PMinstance,"conpagination");

		
		ordappid = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (All)"].GetPModel().GetRenderer().GetPM();
		Appletid_Ord = ordappid.Get("GetFullId");
		//orders list applet markup starts
		Ordmarkup="";
		Ordmarkup+='<div class="SC-360-card-header">';
		Ordmarkup+='                                <div class="SC-360-title-and-icon">';
		Ordmarkup+='<div class="icon-and-title">';
		Ordmarkup+='                                    <img src="images/custom/orders_selected.png">';
		Ordmarkup+='                                    <p class="no-margin">Orders</p>';
		Ordmarkup+='</div>';
		Ordmarkup+='                                </div>';
		Ordmarkup+='                            </div>';
		Ordmarkup+='                            <div class="SC-360-card-body clearfix">';
		Ordmarkup+='                                <div class="SC-table-with-scroll-main">';
		Ordmarkup+='                                    <table class="SC-table">';
		Ordmarkup+='                                        <thead>';
		Ordmarkup+='                                            <tr>';
		Ordmarkup+='                                                <th class="sort-by" id="sortorder">Order#</th>';
		Ordmarkup+='                                                <th class="sort-by" id="sorttype">Type</th>';
		Ordmarkup+='                                                <th class="sort-by" id="sortsubtype">Sub-Type</th>';
		Ordmarkup+='                                                <th class="sort-by" id="sortstatus">Status</th>';
		Ordmarkup+='                                                <th class="sort-by" id="sortorderdate">Order Date</th>';
		Ordmarkup+='                                                <th class="sort-by" id="sortsaleloc">Sale Location</th>';
		Ordmarkup+='                                                ';
		Ordmarkup+='                                            </tr>';
		Ordmarkup+='                                        </thead>';
		Ordmarkup+='                                        <tbody id="orders_sort_id">';
		Ordmarkup+='                                        </tbody>';
		Ordmarkup+='                                    </table>';
		Ordmarkup+='                                </div>';
		Ordmarkup+='                <div class="clearfix">';
		Ordmarkup+='                    <div class="pagination sc-pagination" id="ordpagination">';
		Ordmarkup+='                    </div>';
		Ordmarkup+='                </div>';
		Ordmarkup+='                            </div>';
		$('#orders').html(Ordmarkup);
		SC_OUI_Markup.Sorting_Orders();
		//orders list applet markup ends
		
		//for pagination of OrdersApplet
		var Order_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (All)"].GetPModel().GetRenderer().GetPM();		 
		SC_OUI_Method.PrimaryButton(Order_PMinstance,"ordpagination");
		
		
		attappid = SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().GetRenderer().GetPM();
		Appletid_Att = attappid.Get("GetFullId");
		//attachments lsit applet markup starts
		Attmarkup="";
		Attmarkup+='				<div class="SC-360-card-header">';
		Attmarkup+='                                <div class="SC-360-title-and-icon">';
		Attmarkup+='									<div class="icon-and-title">';
		Attmarkup+='                                    <img src="images/custom/attachment-selected.png" class="attach-icon">';
		Attmarkup+='                                    <p class="no-margin">Attachments</p>';
		Attmarkup+='									</div>';
		Attmarkup+='                                    <div class="SC-360-save-container search-save" id="SC-360-cn-save">';
		Attmarkup+='                                        <button class="SC-SO-search-button proceed" id="sc-acc-new-attachment">Add Attachment</button>';
		Attmarkup+='                                    </div>';
		Attmarkup+='                                </div>';
		Attmarkup+='                            </div>';
		Attmarkup+='                            <div class="SC-360-card-body clearfix">';
		Attmarkup+='                                <div class="SC-table-with-scroll-main">';
		Attmarkup+='                                    <table class="SC-table" id="accattach-360-table">';
		Attmarkup+='                                        <thead>';
		Attmarkup+='                                            <tr>';
		Attmarkup+='                                                <th class="sort-by" id="sortattname">Attachment Name</th>';
		Attmarkup+='                                                <th class="sort-by" id="sortsize">Size (in Bytes)</th>';
		Attmarkup+='                                                <th class="sort-by" id="sorttype">Type</th>';
		Attmarkup+='                                                <th class="sort-by" id="sortmodified">Modified</th>';
		Attmarkup+='                                                <th class="sort-by" id="sortupdatefile">Update File</th>';
		Attmarkup+='                                                <th class="sort-by" id="sortcomments">Comments</th>';
		Attmarkup+= '                                                <th class="min-width id="deleteaccatt">Delete</th>';
		Attmarkup+='                                            </tr>';
		Attmarkup+='                                        </thead>';
		Attmarkup+='                                        <tbody id="attachments_sort_id">';
		Attmarkup+='                                        </tbody>';
		Attmarkup+='                                    </table>';
		Attmarkup+='                                </div>';
		Attmarkup+='                <div class="container">';
		Attmarkup+='                    <div class="pagination sc-pagination" id="attpagination">';
		Attmarkup+='                    </div>';
		Attmarkup+='                </div>';
		Attmarkup+='                            </div>';
		$('#attatchments').html(Attmarkup);
		SC_OUI_Markup.Sorting_Attachments();
		//attachments list applet markup ends
		
		//for pagination of attatchmentsApplet
		var Att_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().GetRenderer().GetPM();		 
		SC_OUI_Method.PrimaryButton(Att_PMinstance,"attpagination");
		
		
		//Start:: To restore pinned tabs on refresh
		 /*var pinnedIds_Loc=localStorage.getItem(sLogUserNamePinids);
		localStorage.setItem(sLogUserNamePinids,"");
		if(pinnedIds_Loc!=null){
		var pinnedIds = pinnedIds_Loc.split(',');
			  for (var key in appletNames) {
				 SiebelJS.Log("Key is :::"+key);
				  for(var i=0; i<pinnedIds.length; i++)
				  { 
					 if(pinnedIds[i] == key)
							document.getElementById(key).click();
					
				  }
			   }
		 }*/
		
		 
	$( "div#rightcontainer" ).scrollTop( 0 );
		}//end of bdata

     SCAccount360DegreeViewPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCAccount360DegreeViewPR.superclass.BindEvents.apply(this, arguments);
	
	//editing and saving detailed description  field
		/*$(document).on("focusout","#accattach-360-table tr",function() {
			var Appletid_attach=SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().Get("GetFullId");
			SiebelJS.Log("Appletid_attach:"+Appletid_attach);
			var attach_appletSeq=Appletid_attach[Appletid_attach.length -1];
			SiebelJS.Log("attach_appletSeq:"+attach_appletSeq);
			var comments_id = $(this).attr('id');
			SiebelJS.Log("comments_id:"+comments_id);
			comments_id = comments_id.split("w");
			comments_id = comments_id[1];
			SiebelJS.Log("comments_id:"+comments_id);
			$("#s_"+attach_appletSeq+"_l tr#"+comments_id).trigger("click");
			//comments_id = parseInt(comments_id)-1;
			SiebelJS.Log("comments_id:"+comments_id);
			var comment_att = document.getElementById("attachcomment"+comments_id).value;
			SiebelJS.Log("comment_att:"+comment_att);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetBusComp().SetFieldValue("Comment",comment_att);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].InvokeMethod("WriteRecord");
		});*/
		 //SNARRA:27052019 Added code for Close
				   $(document).on('click','#SC-SO-P2PE-ok',function(){
					  localStorage.setItem("IsP2PECustom","N");
					   $("#SC-SO-P2PE-change").modal('hide');
				  });		
	//Start:On drill down of Account  Name Navigate to service request view			
	$(document).on("click",".SC-navigate-account",function(){
		localStorage.setItem('whitescreen', 1);
		//SiebelApp.S_App.GotoView("Service Account List View","","","");
		SiebelApp.S_App.GotoView("Account Detail - Contacts View","","","");
	});		
	//End:On drill down of Account  Name Navigate to service request view				
	//to show about record	
	SC_OUI_Method.AboutRecord("SC Account Entry Applet OUI");
	 
	//code for navigation to views in header part starts
		//Home button click function
		$("#SC_HOME").click(function(){
			localStorage.setItem('whitescreen', 1);
			SiebelJS.Log("In SC HOME");
			$("#_swescrnbar").show();
			$("#_swethreadbar").show();
			$("#_sweappmenu").show();
			$("#s_vctrl_div").show();
			$(".siebui-button-toolbar").show();
			var storeUser =  SC_OUI_Method.SCGetProfileAttrValue("SC Store User");
			if(storeUser=="Y")
			SiebelApp.S_App.GotoView("User Profile Default View");
			else
			SiebelApp.S_App.GotoView("Home Page View (WCC)");
		});
		
		//Contacts button click function
		$("#SC_CONTACTS").click(function(){
			SiebelJS.Log("In SC Contacts");
		
		SiebelApp.S_App.GotoView("SC Contact List View OUI","","","");			  
		});
		
		//SalesOrder button click function
		$("#SC_SALESORDERS").click(function(){
			SiebelApp.S_App.GotoView("SC Sales Order Search View OUI","","","");			  	  
		});
		
		//on button click of Accounts should go to parent view
		$("#SC_ACCOUNTS").click(function(){
		SiebelApp.S_App.GotoView("SC All Accounts List View OUI","","","");
		});
		//navigating to views in the header part ends
		//SBOORLA:on click of open Regiser Button
		$("#sc-cash-draw").click(function(){
			SC_OUI_Method.OpenCashDrawer();
		});
		   //NGOLLA for 585 defect
		 // start: custom logic to get default customer type
		var BS_Data_CustType_Default = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='B - Commercial'");
        //end:custom logic to get default customer type
		 //NGOLLA for 585 defect
		// start: custom logic to get wholesale customer type
		var BS_Data_WholeSale_CustType = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='S - Wholesale'");
        //end:custom logic to get wholesale customer type
		
		//on click of newsalesorder
		$(document).on('click','#salesbutton',function(){
			$("body").trigger('Custom.Start');
			setTimeout(function(){ 
				var prim=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue('CUT Full Name');
				if(prim!=null&&prim!=""&&prim!=undefined&&prim!=" ")
					localStorage.setItem("flowfrom","hasprime");
				else
					localStorage.setItem("flowfrom","noprime");
				localStorage.setItem("isNewSalesOrder","Y");
				localStorage.setItem("isAccNewSalesOrder","Y");
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].InvokeMethod("NewOrder");
			}, 200);
		});
	 
		//code for Account info edit button starts
		$(document).on("click","#SC-360-account-information-edit",function(){ 
			SiebelJS.Log("Welcome");
			document.getElementById("CUT Full Name").disabled = true;
			$("#Name").removeClass("SC-navigate-account");
			$(this).hide();
			//to highlight and copy fields
			$(".SC-360-ai").prop('readonly', false);
			$(".SC-360-ai").addClass('add-pointer-events');
			
			$("#Name").removeAttr('title');
			$("#MainEmailAddress").removeAttr('title');
			$("#Name").css('cursor','text');
			
			$("#SC-360-ai-save").show();
			$("#aste").removeAttr("disabled");
			$("#adnc").removeAttr("disabled");
			$("#adne").removeAttr("disabled");
			$("#adnm").removeAttr("disabled");
			$(document).on('keyup',"#MainPhoneNumber",function(){
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
			$(document).on('keyup',"#SCTollFreeNumber",function(){
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
			$(document).on('keyup',"#SCWorkPhoneExt",function(){
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
			//NGOLLA for 620 Defect
			// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Customer Type:</label>';
			cusTypeValue += '<select class="SC-360-item-value SC-360-ai" id="AccountCustomerType" >';
			cusTypeValue +=' <option value="'+AccountForm_BC.GetFieldValue("Account Type Code")+'">'+AccountForm_BC.GetFieldValue("Account Type Code")+'</option>';
			for(var st=0;st<customertypevalues.length;st++)
			{
			if(customertypevalues[st]!=AccountForm_BC.GetFieldValue("Account Type Code"))
			cusTypeValue +=' <option value="'+customertypevalues[st]+'">'+customertypevalues[st]+'</option>';
			}
			cusTypeValue +='<option></option>';
			$('#Acc360CustomerType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
			
		
		
		    //Start:: custom logic to get payement Terms
		    payementTermsArray =SC_OUI_Method.SCGetOrderLoVs("[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y'");
			payementTerms_Default_Value="";
				payementTerms_Default_Value += '<label class="SC-360-item-label no-margin">Payment Terms:</label>';
			payementTerms_Default_Value += '<select class="SC-360-item-value SC-360-ai"  id="SCPaymentTerms">';
			payementTerms_Default_Value +=' <option value="'+AccountForm_BC.GetFieldValue("SC Payment Terms")+'">'+AccountForm_BC.GetFieldValue("SC Payment Terms")+'</option>';
			for(var pt=0;pt<payementTermsArray.length;pt++)
			{
				payementTermsValue +=' <option value="'+payementTermsArray[pt]+'">'+payementTermsArray[pt]+'</option>';
			}
		    payementTerms_Default_Value+=payementTermsValue;
			payementTerms_Default_Value +=' <option value=""></option>';
			$('#Acc360PaymentTerms').html(payementTerms_Default_Value);
			//End:: custom logic to get payement Terms
			
			/*//Start:: custom logic to get customsubtype values
			var In_CustSubType = SiebelApp.S_App.NewPropertySet();
			var Out_CustSubType = SiebelApp.S_App.NewPropertySet();
			for (var c=0;c<customertypevalues.length;c++)
			{
			    custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+customertypevalues[c]+"'","Order By");
				if(custsubTypeArray["0"]!="")
				{
				CustomerSubTypeLovvalues[customertypevalues[c]]=custsubTypeArray;
				}
				else
					CustomerSubTypeLovvalues[customertypevalues[c]]=[];
			}*/
		    var custsubTypeValue = '';
			custsubTypeValue+='<label class="SC-360-item-label no-margin">Customer Subtype:</label>';
		    custsubTypeValue+='<select class="SC-360-item-value SC-360-ai" id="SCCustomerSubtype" >';
			custsubTypeValue +=' <option value="'+AccountForm_BC.GetFieldValue("SC Customer Subtype")+'" selected>'+AccountForm_BC.GetFieldValue("SC Customer Subtype")+'</option>';
			/*for(var ct=0;ct<CustomerSubTypeLovvalues.length;ct++)
			{
             if(CustomerSubTypeLovvalues[AccountForm_BC.GetFieldValue("Account Type Code")][ct]!=AccountForm_BC.GetFieldValue("SC Customer Subtype"))
			   custsubTypeValue +=' <option value="'+CustomerSubTypeLovvalues[AccountForm_BC.GetFieldValue("Account Type Code")][ct]+'">'+CustomerSubTypeLovvalues[AccountForm_BC.GetFieldValue("Account Type Code")][ct]+'</option>';
			}*/
			//var lovValue ="";
			//	lovValue += ' <option></option>';
			custsubTypeArray="";
				 custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+AccountForm_BC.GetFieldValue("Account Type Code")+"'","Order By");
				for (var i=0;i<custsubTypeArray.length;i++) {
					if (custsubTypeArray[i] != AccountForm_BC.GetFieldValue("SC Customer Subtype"))
					custsubTypeValue += '<option value="'+custsubTypeArray[i]+'">' +custsubTypeArray[i]+ '</option>';
				}
				custsubTypeValue += '</select>';
			$('#Acc360CustomerSubType').html(custsubTypeValue);
			//End: custom logic to get customsubtype values
			$(".SC-360-ai").css({
				"border-bottom": '1px solid #b2b2b2',
				//"pointer-events": "all"
			});
			//to show MVG icon
			document.getElementById("sc-address-mvg").style.display = "block";
			document.getElementById("sc-primary-con").style.display = "block";
			//NGOLLA for 581 defect
			document.getElementById("sc-acc-search-icon").style.display = "block";
			});
			//Start :on change of customerType to show CustomerSubtype and PayementTerms
		/*$(document).on('focusout',"#AccountCustomerType",function () {
		   if (CustomerSubTypeLovvalues[this.value].length==0)
			{
				$("#SCCustomerSubtype").prop('disabled', true);
				$('#SCCustomerSubtype').html('<option></option>');
			}else{
				$('#SCPaymentTerms').html('<option></option>');
				$('#SCPaymentTerms').append(payementTermsValue);
				var lovValue ="";
			//	lovValue += ' <option></option>';
				 custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+this.value+"'","Order By");
				for (var i=0;i<custsubTypeArray.length;i++) {
				lovValue += '<option value="'+custsubTypeArray[i]+'">'+custsubTypeArray[i]+'</option>';
				
			   }
			   lovValue += '</select>';
				$('#SCCustomerSubtype').html(lovValue);
			}
		});
		//End:on change of customerType to show CustomerSubtype and PayementTerms*/
		
		 $(document).on('change',"#AccountCustomerType",function () {
		   var Bservice = '',
			inPS = '',
			outPS = '';
			inPS = SiebelApp.S_App.NewPropertySet();
			outPS = SiebelApp.S_App.NewPropertySet();
			inPS.SetProperty("Name", "SCCustomType");
			inPS.SetProperty("Value", $("#AccountCustomerType").val());
			Bservice = SiebelApp.S_App.GetService("SessionAccessService");
			outPS = Bservice.InvokeMethod("SetProfileAttr", inPS);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().ExecuteMethod("InvokeMethod", "SetCustomType", null, false);
			var CustomType=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Account Type Code");
			custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+CustomType+"'","Order By");
			$("#SCCustomerSubtype").prop('disabled', false);
			if (custsubTypeArray.length==0 || (custsubTypeArray.length==1 &&custsubTypeArray[0]==""))
			{
				$("#SCCustomerSubtype").prop('disabled', true);
				$('#SCCustomerSubtype').html('<option></option>');
			}else{
			   var lovValue ="";
				for (var i=0;i<custsubTypeArray.length;i++) {
				lovValue += '<option value="'+custsubTypeArray[i]+'">'+custsubTypeArray[i]+'</option>';
				
			   }
			   lovValue += '</select>';
				$('#SCCustomerSubtype').html(lovValue);	
				$('#SCPaymentTerms').html(payementTermsValue);
			}
					
           });
		
		$(document).on("click","#SC-ai-save",function(e){
			document.getElementById("CUT Full Name").disabled = false;
			$("#Name").addClass("SC-navigate-account");
			var errorCodes = SCErrorCodes.errorcodes();
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
				//NGOLLA for 620 Defect
				if($("#AccountCustomerType").val()== BS_Data_WholeSale_CustType || $('#AccountCustomerType').val()== BS_Data_CustType_Default){
					$("#SCCustomerSubtype").attr('name','cumsubtype');
				}
			$("#accountinfovalidation").validate({
			rules: {
            accountname: { required: true },
			mainphone: { regex:/\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ },
            workphone: { digits: true, maxlength: 10, minlength: 10  },
            tollfrephone: { regex:/\(?[\d\s]{3}\)[\w\s][\d\s]{3}-[\d\s]{4}$/ },
            email: { email: true },
			cumsubtype:{required:true}
			},
			messages: {
            accountname: errorCodes.SC_ACCOUNT_NAME,
            mainphone: errorCodes.SC_MOBILE_NUMBER,
            workphone: errorCodes.SC_MOBILE_NUMBER,
            tollfrephone: errorCodes.SC_MOBILE_NUMBER,
			mainfax: errorCodes.SC_MOBILE_NUMBER,
            email: errorCodes.SC_INVALID_EMAIL,
			cumsubtype:errorCodes.SC_CUSTOMER_SUB_TYPE
			},
			tooltip_options: {
            accountname: { trigger: 'focus', placement: 'bottom', html: true },
            mainphone: { trigger: 'focus', placement: 'bottom', html: true },
            workphone: { trigger: 'focus', placement: 'bottom', html: true },
            tollfrephone: { trigger: 'focus', placement: 'bottom', html: true },
			mainfax: { trigger: 'focus', placement: 'bottom', html: true },
            email: { trigger: 'focus', placement: 'bottom', html: true },
			 cumsubtype: { trigger: 'focus', placement: 'bottom', html: true }
			},
			submitHandler: function(form) {
				e.preventDefault();
				//SiebelJS.Log("in Submithandler");
				 //Start loader 
				$("body").trigger('Custom.Start');
				setTimeout(function(){
				var location = $("#Location").val();
				var name = $("#Name").val();
				var mainphonenumber = $("#MainPhoneNumber").val();
				var SCworkphoneext = $("#SCWorkPhoneExt").val();
				var SCtollfreenumber = $("#SCTollFreeNumber").val();
				var mainfaxnumber = $("#MainFaxNumber").val();
				var mainemailaddress = $("#MainEmailAddress").val();
				var streetaddress = $("#StreetAddress").val();
				var city = $("#City").val();
				var state = $("#SCState").val();
				var postalcode = $("#PostalCode").val();
				//NGOLLA for 620 Defect
				var CustomerType = $("#AccountCustomerType").val();
				var CustomerSubType = $("#SCCustomerSubtype").val();
				var PaymentTerms = $("#SCPaymentTerms").val();
				var TaxExempt = $("#aste").prop('checked') ? 'Y' : 'N';
				var Dnc = $("#adnc").prop('checked') ? 'Y' : 'N';
				var Dne = $("#adne").prop('checked') ? 'Y' : 'N';
				var Dnm = $("#adnm").prop('checked') ? 'Y' : 'N';
				var Url = $("#url").val();
				SiebelJS.Log("CustomerType"+CustomerType);
				SiebelJS.Log("CustomerSubType"+CustomerSubType);
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Customer Type:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="AccountCustomerType" value="'+CustomerType+'">';
			$('#Acc360CustomerType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
			
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Customer Subtype:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCCustomerSubtype" value="'+CustomerSubType+'">';
			$('#Acc360CustomerSubType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Payment Terms:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCPaymentTerms" value="'+PaymentTerms+'">';
			$('#Acc360PaymentTerms').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
			
				
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Location", location);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Name", name);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Main Phone Number", mainphonenumber);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Work Phone Ext", SCworkphoneext);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Toll Free Number", SCtollfreenumber);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Main Fax Number", mainfaxnumber);
				//NGOLLA for 620 Defect
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Customer Subtype", "");
			    SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Customer Subtype", CustomerSubType);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Account Type Code", CustomerType);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Payment Terms", PaymentTerms);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Tax Exempt", TaxExempt);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Dont Call", Dnc);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC Do Not eMail", Dne);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Disable Mailings", Dnm);
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("SC URL", Url);
				
				if(mainemailaddress!= AccountForm_BC.GetFieldValue("Main Email Address")){
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().SetFieldValue("Main Email Address", mainemailaddress);
				}
				$('#StreetAddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Street Address"));
				$('#City').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("City"));
				$('#State').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("State"));
				$('#PostalCode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Postal Code"));
				//NTHARRE:
				$('#HDServiceLevel').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC HD Service Level"));
				
				document.getElementById('prof_name').innerHTML = name;
				
				SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].InvokeMethod("WriteRecord");
				$("#SC-360-account-information-edit").show();
				//to highlight and copy fields
				$(".SC-360-ai").prop('readonly', true);
				 $(".SC-360-ai").removeClass('add-pointer-events');
				$(".SC-360-ai").css({
					"border-bottom": '1px solid transparent',
					//"pointer-events":"none"
				});
				$('#Name').attr('title',$("#Name").val());
				$('#MainEmailAddress').attr('title',$("#MainEmailAddress").val());
				$('#Name').css('cursor','pointer');
				$("#SC-360-ai-save").hide();
				//hiding the Loader
				$("body").trigger('Custom.End');
			    },50);
			}
			
			
			});
			
			//hide MVG icon
			document.getElementById("sc-address-mvg").style.display = "none";
			document.getElementById("sc-primary-con").style.display = "none";
			//NGOLLA for 581 defect
			document.getElementById("sc-acc-search-icon").style.display = "none";
			$(document).on('keyup',"#MainFaxNumber",function(){
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});
		});
		//Account info editbutton code ends
		
		$(document).on("click","#SC-ai-close",function(){	
			document.getElementById("CUT Full Name").disabled = false;
			$("#Name").addClass("SC-navigate-account");		
				var phn1 = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Main Phone Number");
				var phn2 = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Toll Free Number");
				if(phn1 != ""){
				var USFormt_ph_1 = "("+phn1.substring(0,phn1.length-7)+") "+phn1.substring(3,phn1.length-4)+"-"+phn1.substring(6,phn1.length);}
				else{USFormt_ph_1 = "";}
				if(phn2 != ""){
				var USFormt_ph_2  = "("+phn2.substring(0,phn2.length-7)+") "+phn2.substring(3,phn2.length-4)+"-"+phn2.substring(6,phn2.length); }
				else{USFormt_ph_2 = "";}
				$('#Location').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Location"));
				$('#Name').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Name"));
				$("#MainPhoneNumber").val(USFormt_ph_1);
				$('#SCWorkPhoneExt').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Work Phone Ext"));
				$("#SCTollFreeNumber").val(USFormt_ph_2);
				$('#Main Fax Number').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Main Fax Number"));
				$('#Main Email Address').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Main Email Address"));
				$('#StreetAddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Street Address"));
				$('#City').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("City"));
				$('#State').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("State"));
				$('#PostalCode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Postal Code"));
				//NTHARRE:
				$('#HDServiceLevel').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC HD Service Level"));
				//NGOLLA for 620 Defect
				$('#AccountCustomerType').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Account Type Code"));
				$('#SCCustomerSubtype').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Customer Subtype"));
				$('#SCPaymentTerms').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Payment Terms"));
				$('#url').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC URL"));
				
				if (AccountForm_BC.GetFieldValue("Dont Call") == 'Y') {
				    $("#adnc").prop('checked', true);
                   } else {
				 	$("#adnc").prop('checked', false);
				 	}
					
					if (AccountForm_BC.GetFieldValue("Disable Mailings") == 'Y') {
				    $("#adnm").prop('checked', true);
				 	SiebelJS.Log('do not call -- true');
				 	} else {
				 	$("#adnm").prop('checked', false);
				 	}
					
					if (AccountForm_BC.GetFieldValue("SC Do Not eMail") == 'Y') {
				    $("#adne").prop('checked', true);
				 	SiebelJS.Log('do not call -- true');
				 	} else {
				 	$("#adne").prop('checked', false);
				 	}
					
					if (AccountForm_BC.GetFieldValue("SC Tax Exempt") == 'Y') {
				    $("#aste").prop('checked', true);
				 	SiebelJS.Log('do not call -- true');
				 	} else {
				 	$("#aste").prop('checked', false);
				 	}
				
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Customer Type:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="AccountCustomerType" value="'+SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Account Type Code")+'">';
			$('#Acc360CustomerType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
			
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Customer Subtype:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCCustomerSubtype" value="'+SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Customer Subtype")+'">';
			$('#Acc360CustomerSubType').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
			
				// Start:Custom Logic To set Cutomer Type values
			var cusTypeValue = '';
			cusTypeValue += '<label class="SC-360-item-label no-margin">Payment Terms:</label>';
		    cusTypeValue+='<input type="text" name="" class="SC-360-item-value SC-360-ai" id="SCPaymentTerms" value="'+SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC Payment Terms")+'">';
			$('#Acc360PaymentTerms').html(cusTypeValue);
			//End:Custom Logic To set Cutomer Type values
		
				$("#SC-360-account-information-edit").show();
				//to highlight and copy fields
				$(".SC-360-ai").prop('readonly', true);
				 $(".SC-360-ai").removeClass('add-pointer-events');
				$(".SC-360-ai").css({
					"border-bottom": '1px solid transparent',
					//"pointer-events":"none"
				});
				$("#SC-360-ai-save").hide();
				$('#Name').attr('title',$("#Name").val());
				$('#MainEmailAddress').attr('title',$("#MainEmailAddress").val());
				$('#Name').css('cursor','pointer');
				
				
				//hide mvg icon
				document.getElementById("sc-address-mvg").style.display = "none";
				document.getElementById("sc-primary-con").style.display = "none";
				//NGOLLA for 581 defect
				document.getElementById("sc-acc-search-icon").style.display = "none";
		});

         //On click of Price List NGOllA for 581 defect
			$(document).on("click","#sc-acc-search-icon",function(){
					SiebelJS.Log("on click");
					var id = this.id;
					SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"),SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetControls()["Price List"]);
						SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
							var price_list = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].GetControls()["Price List"]);
							if(price_list != ""){
								SiebelJS.Log("price_list...:"+price_list);
								$("#PriceList360").val(price_list);
							}
						});
			});	
		//end on click of Price List
		//code for pin/unpin and pin to scrolling starts
		$(document).on("click",".SC-Account360-pin",function(){
				var inputPS = CCFMiscUtil_CreatePropSet();
				var value = pm.Get("Pin-Unpin");
				inputPS.SetProperty("Key", "Pin-Unpin");
				
				var id_clicked = ''; id_clicked=this.id;
				
				var respectiveDivId = ''; respectiveDivId=divisions[id_clicked];
				
				var appletName = ''; appletName=appletNames[id_clicked];
				
				var bt_id=id_clicked;
				var sec=sections[bt_id];
				var divid=divisions[bt_id];
				//myfunction(id_clicked);
				if(id_clicked !="Acc-Pin")
				{
					SiebelJS.Log("Pin Clicked is: "+id_clicked);	
					var divElement = ''; divElement = document.getElementById(respectiveDivId);
					if(divElement.style.display == "block")
					{
						SiebelJS.Log("Applet hidden");
						divElement.style.display ="none";
						$("#"+appletName).removeClass("active");	
						$("#"+id_clicked).attr("src","images/custom/Pin.png");
						if(id_clicked == 'Orders-Pin')
						{
							$("#ord_img").attr("src","images/custom/orders.png");
						}
						else if(id_clicked == 'Attachments-Pin')
						{
							$("#att_img").attr("src","images/custom/attachment.png");
						}
						else if(id_clicked == 'Contacts-Pin')
						{
							$("#con_img").attr("src","images/custom/Accountcontacts.png");
						}
						pinids.splice(pinids.indexOf(id_clicked), 1);
						$(this).addClass("inactive");	
					
					}
					else{
						SiebelJS.Log("Applet showed");
						divElement.style.display ='block';
						SiebelJS.Log("appletName:"+appletName);
						$("#"+appletName).addClass("active");					
						$("#"+id_clicked).attr("src","images/custom/Pinned.png");
						if(id_clicked == 'Orders-Pin')
						{
							$("#ord_img").attr("src","images/custom/orders_selected.png");
						}
						else if(id_clicked == 'Attachments-Pin')
						{
							$("#att_img").attr("src","images/custom/attachment-selected.png");
						}
						else if(id_clicked == 'Contacts-Pin')
						{
							$("#con_img").attr("src","images/custom/Accountcontacts-selected.png");
						}
						pinids.push(id_clicked);
						$(this).removeClass("inactive");
					}
				}
				//localStorage.setItem(sLogUserNamePinids,pinids);
				//SBOORLA:Added code for Pin/Unpin UserPreferences
				if(saveAccPinId=="N"){
					var Bservice = '', inPS = '', outPS = '';
					var fieldvalues="";
					for(var i=0;i<pinids.length;i++)
						if(pinids.length!=(i+1))
							fieldvalues+=pinids[i]+"_";
						else
							fieldvalues+=pinids[i]
					var fieldnames="Cosmetics/AccountPinUnpin";
					
					inPS = SiebelApp.S_App.NewPropertySet();
					outPS = SiebelApp.S_App.NewPropertySet();
					inPS.SetProperty("BO","User Preferences");
					inPS.SetProperty("BC","User Preferences");
					inPS.SetProperty("FieldsArray",fieldnames );
					inPS.SetProperty("ValuesArray",fieldvalues);
					inPS.SetProperty("SearchSpecification","" );
					Bservice = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
					outPS = Bservice.InvokeMethod("Insert", inPS);
				}
			});
		//pin/unpin and pin to scroll code ends
				//SBOORLA:added code for Pin/unpin UserPrefernces
				/*var Custom_Service="",Input_BS="",Out_BS="",pinnedIds_Loc;
				Custom_Service = SiebelApp.S_App.GetService("SC Custom Query");
				Input_BS = SiebelApp.S_App.NewPropertySet();
				Out_BS = SiebelApp.S_App.NewPropertySet();
				searchfields = "Cosmetics/AccountPinUnpin";
				Input_BS.SetProperty("BO", "User Preferences");
				Input_BS.SetProperty("BC", "User Preferences");
				Input_BS.SetProperty("SearchSpecification", "");
				Input_BS.SetProperty("SortSpecification", "");
				Input_BS.SetProperty("ReqNoOfRecords", "");
				Input_BS.SetProperty("FieldsArray", searchfields);
				Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
				var Child_BS = Out_BS.GetChild(0);
				var BS_Data = Child_BS.GetProperty("OutputRecordSet");
				if(BS_Data!="}"){
						var ResArray = new Array;
						ResArray = BS_Data.split(";");
						
							jsonRes = JSON.parse(ResArray[0]);
							pinnedIds_Loc=jsonRes["Cosmetics/AccountPinUnpin"];
							SiebelJS.Log("jsonSK"+jsonRes["Cosmetics/AccountPinUnpin"]);
							pinnedIds_Loc=pinnedIds_Loc.split("_");
				}
				SiebelJS.Log("userPinIds"+pinnedIds_Loc);*/
				for (var key in appletNames) {
						 SiebelJS.Log("Key is :::"+key);
						  for(var i=0; i<User_pinnedIds_Loc.length; i++)
						  { 
							 if(User_pinnedIds_Loc[i] == key)
									document.getElementById(key).click();
							
						  }
					   }
					   if(saveAccPinId=="Y"){
						saveAccPinId="N";
					   }
		 //code for profile button click starts
		 $("#SC-profile").click(function() {
			 //navigation to store report
			   var customerName = SC_OUI_Method.SCGetProfileAttrValue('SC Store Number');
			   var customerType = SC_OUI_Method.SCGetProfileAttrValue('SC Primary Division Type');
			   if ((customerType == 'STORE' || customerType == 'SHOW') && customerName!= "") {
				$(document).on('click', '#storereport', function(){
				SC_OUI_Markup.StoreNavigation();
				});
			   }
			   else{
				$("#storereport").hide();}
			 $(".SC-Profile-container").toggle();
		 });
		 
		 //on click of logout
		 $("#logout").click(function() {
			   SiebelApp.S_App.LogOff();
		 });
		 
		 //Code to hide logout popup
          $(document).click(function(e) {
			if (!$(e.target).closest('#SC-profile, .SC-Profile-container').length) {
				$(".SC-Profile-container").hide();
			}
		});
		 
		 //on click of last name  of contacts
		$(document).on("click","#lastnamedrilldown",function(){
			var colIndex = ''; colIndex = $(this).prevAll().length;
			var rowIndex = ''; rowIndex = $(this).parent('tr').prevAll().length;
			var trid = $(this).closest('tr').prop('id');
		    var rowvalue = parseInt(trid.substring(7, 8));
			SiebelJS.Log("contact applet id:"+Appletid_Con);
			var tableid = $("#"+Appletid_Con).find(".ui-jqgrid-bdiv table").attr("id");//new
					SiebelJS.Log(tableid);
					$("#"+tableid+" #"+rowvalue+"").trigger("click");
			var Contact_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact List Applet"].GetPModel().GetRenderer().GetPM();		 
			Contact_PMinstance.ExecuteMethod("OnDrillDown", 'Last Name', rowvalue);
	    });
		
		//on click of order number
	    $(document).on("click","#ordernumdrilldown",function(){
			var colIndex = ''; colIndex = $(this).prevAll().length;
			var rowIndex = ''; rowIndex = $(this).parent('tr').prevAll().length;
			var trid = $(this).closest('tr').prop('id');
		    var rowvalue = parseInt(trid.substring(7, 8));
		    var tableid = $("#"+Appletid_Ord).find(".ui-jqgrid-bdiv table").attr("id");//new
			SiebelJS.Log(tableid);
			$("#"+tableid+" #"+rowvalue+"").trigger("click");
			if(SiebelApp.S_App.GetActiveView().GetAppletMap()['SC Order Entry - Order List Applet (All)'].GetBusComp().GetFieldValue('Order Type Code')=="Service"){
				localStorage.setItem('whitescreen', 1);
			}
            var Order_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Order List Applet (All)"].GetPModel().GetRenderer().GetPM();		 
			
			Order_PMinstance.ExecuteMethod("OnDrillDown", 'Order Number', rowvalue);
		});
		 
		 //on click of file name
	    $(document).on("click","#attfilenamedrilldown",function(){
			var colIndex = ''; colIndex = $(this).prevAll().length;
			var rowIndex = ''; rowIndex = $(this).parent('tr').prevAll().length;
			var trid = $(this).closest('tr').prop('id');
		    var rowvalue = parseInt(trid.substring(7, 8));
			var tableid = $("#"+Appletid_Att).find(".ui-jqgrid-bdiv table").attr("id");//new
				SiebelJS.Log(tableid);
				$("#"+tableid+" #"+rowvalue+"").trigger("click");
			var Att_PMinstance=SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().GetRenderer().GetPM();		 
			Att_PMinstance.ExecuteMethod("OnDrillDown", 'AccntFileName', rowvalue);
		 });
		 
		 //Phone number Formatting
		 $(document).on('focusout','#MainPhoneNumber,#SCTollFreeNumber',function() {			
			var phNumb = $(this).val();
			if(phNumb != '' && phNumb.match(/^\d+$/) && phNumb.length == 10)
			{
				var USFormt_PhNum  = "("+phNumb.substring(0,phNumb.length-7)+") "+phNumb.substring(3,phNumb.length-4)+"-"+phNumb.substring(6,phNumb.length);
				SiebelJS.Log("US Format: "+USFormt_PhNum);
				$(this).val(USFormt_PhNum);
			}
			if ($(this).val() === "")
				$(this).parent().removeClass("is-completed");
			$(this).parent().removeClass("is-active");		
		});
						
		//on click of mvg				
		$(document).on("click","#sc-address-mvg",function(){
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_MVG"),SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetControls()["StreetAddress"]);
			SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().AttachNotificationHandler("g", function(o) {
				var Field_Name = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetPModel().ExecuteMethod("GetFieldValue", SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetControls()["StreetAddress"]);
				SiebelJS.Log("field name value is:"+Field_Name);		
				$('#SiebelField').val(Field_Name);
				
				$('#StreetAddress').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Street Address"));
				$('#City').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("City"));
				$('#State').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("State"));
				$('#PostalCode').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("Postal Code"));
				//NTHARRE:
				$('#HDServiceLevel').val(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Entry Applet OUI"].GetBusComp().GetFieldValue("SC HD Service Level"));
				
			});
			SC_OUI_Method.addAddressMVG();
		});
		
		
		//on click of primary contact
		$(document).on("click","#sc-primary-con",function(){
			localStorage.setItem('whitescreen', 1);
			var InPut = SiebelApp.S_App.NewPropertySet();
			var OutPut = SiebelApp.S_App.NewPropertySet();
			InPut.SetProperty("View","Account Detail - Contacts View");
			InPut.SetProperty("Business Component","Account");
			InPut.SetProperty("Row Id",Account_Id); 
			var BService = SiebelApp.S_App.GetService("CUT eSales Order Entry Toolkit Service");
			OutPut = BService.InvokeMethod("GotoView",InPut);
		});	

		
		
		//SC-Account Creation Code starts here     
		//Add Account modalopen                         
		var Acc_creation_markup=AccountSearchMarkup.SCAccountCreationMarkup();
		var customertypevalues = SCOUIDefinitions.customertype();	//for customer type values
		var countryvalues = SCOUIDefinitions.countryLovValues();// for country values
		var payementTermsValue="";
		var payementTerms_Default_Value="";
		var CustomerSubTypeLovvalues={};
		//Account modal opens here	
		
		// start: custom logic to get default customer type
		var BS_Data_CustType_Default = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='B - Commercial'");
        //end:custom logic to get default customer type
		
	    // start: custom logic to get wholesale customer type
		var BS_Data_WholeSale_CustType = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='S - Wholesale'");
       //end:custom logic to get wholesale customer type
		
	    //Start:: custom logic to get default value for payement terms
		var BS_Data_payementterms_Default = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y' and [Name]='30 NET'");
	    //End:: custom logic to get default value for payement terms
		var BS_Data_CusSubType_Default;
	    //Start:: Click on add Account Button		
	    $("#add-acc-account").click(function() {
			$("body").trigger('Custom.Start');
			setTimeout(function(){
			$("body").trigger('Custom.End');
			  $("#SC-add-account").modal({
			  backdrop: 'static'
			});	
			$('#SC-add-account').html(Acc_creation_markup);// applying account form markup
			// Start:Custom Logic To set Cutomer Type values
			//Start: custom logic to get customersubtype default value
			BS_Data_CusSubType_Default = SC_OUI_Method.GetLOVs2("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Name]='DME' and [Parent]='"+BS_Data_CustType_Default+"'","Order By");
			//End:custom logic to get customersubtype default value
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
			
			
		   custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+BS_Data_CustType_Default+"'","Order By");
			
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
		    payementTermsArray =SC_OUI_Method.SCGetOrderLoVs("[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y'");
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
	        stateArray = SC_OUI_Method.SCGetOrderLoVs("[Order By] >= 1 and [Order By] <= 52 and [Type]= 'STATE_ABBREV' and [Active] = 'Y'");
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
		    preConArray = SC_OUI_Method.SCGetOrderLoVs("[Type]= 'COMM_METHOD' and [Active] = 'Y'");
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
			},100);
    });
    //End:Click on add Account Button
    $("#acc-close-details").click(function() {
		$("#SC-add-account").modal('hide');
	});
	
	//Start :on change of customerType to show CustomerSubtype and PayementTerms
	$(document).on('change',"#CustomerType",function () {
		
		custsubTypeArray = SC_OUI_Method.GetLOVs("[Type]= 'SC_CUST_SUB_TYPE' and [Active] = 'Y' and [Parent]='"+this.value+"'","Order By");
		
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
	//on click of Price List
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
	//On click of Price List  //NGOLLA for 585 defect
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
	//START::On click of save button
	$(document).on('click',"#createAccount360", function(event) {			
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
				   saveAccount360();
		      }  
			 });				 
		 }
	     else{
	         saveAccount360();
		  }
		});
       // End::On click of save button
    }//end of bind events
	
	SCAccount360DegreeViewPR.prototype.EndLife = function () {
	 SiebelJS.Log("In End life function");
     SiebelAppFacade.SCAccount360DegreeViewPR.superclass.EndLife.apply(this, arguments);
	 
		pinids=[];
		$(document).unbind('click');
		if(localStorage.getItem('whitescreen')==0){
			$("#_swescrnbar").hide();
			$("#_swethreadbar").hide();
			$("#_sweappmenu").hide();
			$("#s_vctrl_div").hide();
			$(".siebui-button-toolbar").hide();
			$("#_sweview").hide();
			$('#_swecontent').prepend(SC_OUI_Markup.CustomWhiteScreenTimer());
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
     }//end of endlife
     //NGOLLA for 585 defect
	 function saveAccount360(){
		 // logic to save Account.
		event.preventDefault();
		$("#SC-add-account").modal('hide');
		$("body").trigger('Custom.Start');
		//getting the values from account form
		setTimeout(function(){
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
		if(Address==""&&City==""){
			adressProvided="N";
		}
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
		//FieldQueryPair={"Account":BS_Accountid};
		//SC_OUI_Method.ExecuteListAppletFrame(SiebelConstants,FieldQueryPair,"SC Account List Applet OUI");
		var Bservice = '',inPS = '', outPS = '';
		inPS  = SiebelApp.S_App.NewPropertySet();
		outPS = SiebelApp.S_App.NewPropertySet();
		inPS.SetProperty("Name","AccountRecentRecordId");
		inPS.SetProperty("Value",BS_Accountid);
		Bservice = SiebelApp.S_App.GetService("SessionAccessService");
		outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
		SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account List Applet OUI"].InvokeMethod("AccountRecentRecordDrillDown");
		SiebelApp.S_App.GotoView("SC Account 360 View OUI");			  
        $("body").trigger('Custom.End');
		},100); 
	 }
	 
    return SCAccount360DegreeViewPR;
   }()
  );
  return "SiebelAppFacade.SCAccount360DegreeViewPR";
 })
}
