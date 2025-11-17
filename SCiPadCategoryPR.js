if (typeof(SiebelAppFacade.SCiPadCategoryPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCiPadCategoryPR");
 define("siebel/custom/SelectComfort/SCiPadCategoryPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SCiPadSalesOrderMarkup","siebel/custom/SelectComfort/SC_OUI_Markups"],
  function () {
   SiebelAppFacade.SCiPadCategoryPR = (function () {
	var pm, Appletid, ChoosedCatalog, RecordSet, categoryRecords="", subCat1="", subCat2="", subCat3="", selectCategory="", selectSubCat1="", selectSubCat2="", selectSubCat3="", Cat_Parent_Id="", SubCat1_Parent_Id="",SubCat2_Parent_Id="", SubCat3_Parent_Id="", Cat_Parent_Product_Id="", SubCat1_Parent_Product_Id="",SubCat2_Parent_Product_Id="", SubCat3_Parent_Product_Id="", Cat_Product_Id="", SubCat1_Product_Id="", SubCat2_Product_Id="",SubCat3_Product_Id="";
	var Service="", ChildCount,Child,BSData="",BS_Data1="", ProdCatRecordSet,isFirstTime_C, selectedCatalog="";
	var catalogMkp="",FieldQueryPair="", FieldsArray, SearchSpecification="",catalogRecords="",selectedCatalogId,i=0,CatalogIDs="",j=0,PriceList="",ClickOnSearch="",AccountOrder="";
	var RecordSeti,SKUs,selectedtext,searchtext,searchtext1;
	var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
	var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var SC_OUI_Markups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
	var SCSalesCreateMarkup = SiebelJS.Dependency("SiebelApp.SCiPadSalesOrderMarkup");
	var InPS = SiebelApp.S_App.NewPropertySet();
	var OutPS = SiebelApp.S_App.NewPropertySet();

    function SCiPadCategoryPR(pm) {
     SiebelAppFacade.SCiPadCategoryPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCiPadCategoryPR, SiebelAppFacade.JQGridRenderer);

    SCiPadCategoryPR.prototype.Init = function () {
		SiebelAppFacade.SCiPadCategoryPR.superclass.Init.apply(this, arguments);
		localStorage.setItem("addToOrder","N");
		var priceli=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Price List");
		if(priceli==""||priceli==undefined){
			priceli=="STANDARD PRICE LIST";
		}	
		//#590 for B2B price list will be dynamic
		if(priceli!="STANDARD PRICE LIST"){
			SearchSpecification="[Name]='"+priceli+"'";
			InPS.SetProperty("BO","Admin Price List");
			InPS.SetProperty("BC","Price List");
			FieldsArray=["Name","Id"];
			InPS.SetProperty("FieldsArray",FieldsArray);
			InPS.SetProperty("SearchSpecification", SearchSpecification);			
			Service = SiebelApp.S_App.GetService("SC Custom Query");
			OutPS = Service.InvokeMethod("Query",InPS);
			ChildCount =OutPS.GetChildCount();
			Child = OutPS.GetChild(0);
			BSData = Child.GetProperty("OutputRecordSet"); 
			if(BSData!="}"){
				RecordSet=new Array; 
				RecordSet = BSData.split(";");
				RecordSet=JSON.parse(RecordSet);
				PriceList=RecordSet["Id"];
			}
		}
		else{
			/*var loginFirstTime=SC_OUI_Methods.SCGetProfileAttrValue("LoginFirstTimeOUI");
				//if(loginFirstTime=="Y"){
					SearchSpecification="[Name]='"+priceli+"'";
					InPS.SetProperty("BO","Admin Price List");
					InPS.SetProperty("BC","Price List");
					FieldsArray=["Name","Id"];
					InPS.SetProperty("FieldsArray",FieldsArray);
					InPS.SetProperty("SearchSpecification", SearchSpecification);			
					Service = SiebelApp.S_App.GetService("SC Custom Query");
					OutPS = Service.InvokeMethod("Query",InPS);
					ChildCount =OutPS.GetChildCount();
					Child = OutPS.GetChild(0);
					BSData = Child.GetProperty("OutputRecordSet"); 
					if(BSData!="}"){
						RecordSet=new Array; 
						RecordSet = BSData.split(";");
						RecordSet=JSON.parse(RecordSet);
						PriceList=RecordSet["Id"];
					}
					localStorage.setItem("PriceListIdsOUI",PriceList);
					theApplication().SetProfileAttr("LoginFirstTimeOUI","N");
				}
				else{*/
					PriceList=localStorage.getItem("PriceListIdsOUI");
				//}
		}
		localStorage.setItem("go",0);
		localStorage.setItem("dupsku","N");
		isFirstTime_C = 'N';
		pm = this.GetPM();
		$("#SC_Products").html("");
	 
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
    }

    SCiPadCategoryPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCiPadCategoryPR.superclass.ShowUI.apply(this, arguments);
	 	Appletid = pm.Get("GetFullId");//hiding category applet
		
		
		var scCancelReasonfield=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Cancel Reason Read Only");
		//to show edit details or cancel order buttons
		if((scCancelReasonfield=="Y")||(localStorage.getItem('comingfrom')!="revise")){
			$(".cancel-title-head").html('<p id="SC-SO-edit-block">EDIT DETAILS</p>');
		}
		else if((scCancelReasonfield=="N")&&(localStorage.getItem('comingfrom')=="revise")){
			$(".cancel-title-head").html('<button id="SC-SO-cancel-block" class="validate">Cancel Order</button><p id="SC-SO-edit-block">EDIT DETAILS</p>');
			$(".cancel-title-head").attr("style","display:flex !important");
		}
	   else{
				$(".cancel-title-head").html('');
			}
				
		/*
		//to show edit details or cancel order buttons
		var cncl=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM().ExecuteMethod("CanInvokeMethod","BCancelOrder");
		if(cncl==true&&(localStorage.getItem('comingfrom')=="revise")){
			$(".cancel-title-head").html('<button id="SC-SO-cancel-block" class="validate">Cancel Order</button>');
		}
		else{
			$(".cancel-title-head").html('<p id="SC-SO-edit-block">EDIT DETAILS</p>');
		} */
		
		//Default actions
		ChoosedCatalog="No";
		$("#Category").hide(); 
		$("#Category_img").hide(); 
		$("#Sub_Category_1").hide();
		$("#Sub_Category_1_img").hide();
		$("#Sub_Category_2").hide();
		$("#Sub_Category_2_img").hide();
		$("#Sub_Category_3").hide();
		$("#Sub_Category_3_img").hide();
	    
		/*var sccategorysearspec=[],
		    sccategorysortspec=[];
		  
		  sccategorysearspec[0]="[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='DIRECT'";
		  sccategorysortspec[0]="Order By";
		  sccategorysearspec[1]="[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='ECOM'";
		  sccategorysortspec[1]="Order By";
		  
		  SC_OUI_Methods.SCSetLoVs(sccategorysearspec, sccategorysortspec);
		  SC_OUI_Methods.SCGetProfileAttr("SC Primary Division Type");*/
		
		//Get Catalog records
		//SearchSpecification="[Catalog Type] = LookupValue('CTLG_TYPE', 'Buying') AND [Active] = 'Y' AND [Sequence Number]>1 AND [Correct Effective Dates] = 'Y'";
		/*SearchSpecification="[Catalog Type] = LookupValue('CTLG_TYPE', 'Buying') AND [Active] = 'Y' AND [Correct Effective Dates] = 'Y'";
		InPS.SetProperty("BO","Order Entry (Sales)");
		InPS.SetProperty("BC","Quote Catalog");
		FieldsArray=["Name","Id"];
		InPS.SetProperty("FieldsArray",FieldsArray);
		InPS.SetProperty("SearchSpecification", SearchSpecification);			
		Service = SiebelApp.S_App.GetService("SC Custom Query");
		OutPS = Service.InvokeMethod("Query",InPS);
		ChildCount =OutPS.GetChildCount();
		Child = OutPS.GetChild(0);
		BSData = Child.GetProperty("OutputRecordSet"); 
		catalogRecords="";
		if(BSData!="}"){
			RecordSet=new Array; 
			RecordSet = BSData.split(";");*/
			catalogRecords="";
			var RecordSet=new Array; 
			RecordSet=JSON.parse(localStorage.getItem("SCCatalogIdsOUI"));
			for(i=((RecordSet.length)-1);i>=0;i--){
				RecordSet[i]=eval('(' + RecordSet[i] + ')');
				//for retail user
				//if(SiebelApp.S_App.GetProfileAttr("SC Store User")=="Y"&&(RecordSet[i]["Name"]=="Sleep Number - Components"||RecordSet[i]["Name"]=="SC Catalog - Components"||RecordSet[i]["Name"]=="SN Catalog - Components")){
				if(SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Store User")=="Y"&&(RecordSet[i]["Name"]=="Sleep Number - Components"||RecordSet[i]["Name"]=="SC Catalog - Components"||RecordSet[i]["Name"]=="SN Catalog - Components")){
					SiebelJS.Log("Supressed the Sleep Number Components");
				}
				else{
					if(i==(RecordSet.length)-1){
						catalogRecords+='<option value='+RecordSet[i].Id+'>'+RecordSet[i]["Name"]+'</option>';
						CatalogIDs=RecordSet[i].Id;
					}
					else{
						catalogRecords+='<option value='+RecordSet[i].Id+'>'+RecordSet[i]["Name"]+'</option>';
						CatalogIDs=CatalogIDs+" OR "+RecordSet[i]["Id"];
					}
				}	
			}
		//}
		catalogRecords+='<option selected value="'+CatalogIDs+'">Select Catalog</option>';
		 
		//append Catalog records to Catalog dropdown
		$('#Catalog_Name').html(catalogRecords);
		selectedCatalog= $("#Catalog_Name option:selected").text();
		SiebelJS.Log("Selected Catlog is"+selectedCatalog);
		selectedCatalogId = document.getElementById('Catalog_Name').value;
		FieldQueryPair = {"Catalog Id":CatalogIDs, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y"};
		SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
		 
		//on change of catalog
		$("#Catalog_Name").change(function(){ 
/* 			$(document).ready(function(){						
				$('.SC-data-container').scrollTop(0);
			}); */
			$('.SC-SO-noresults-container').hide();
			$("#Category").hide(); 
			$("#Category_img").hide(); 
			$("#Sub_Category_1").hide();
			$("#Sub_Category_1_img").hide();
			$("#Sub_Category_2").hide();
			$("#Sub_Category_2_img").hide();
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			$("#SC_Products").html("");
			ChoosedCatalog="Yes";
			localStorage.setItem("go",0);
			localStorage.setItem("dupsku","N");
			selectedCatalog = $("#Catalog_Name option:selected" ).text();
			selectedCatalogId = document.getElementById('Catalog_Name').value;
			SiebelJS.Log("Selected Catlog is"+selectedCatalog);
			if(selectedCatalogId!="Dummy"){
			//to get only parent categories in below applet and avoid sub categories
				FieldQueryPair = {"Parent Category Id":"IS NULL", "Catalog Name":selectedCatalog};
			}
			else{
				FieldQueryPair = {"Parent Category Id":"IS NULL"};
			}
			SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Sales Order Category List Applet");
			
			FieldQueryPair = {"Catalog Id": selectedCatalogId, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y"};
			SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			
			
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}
		});

		//on change of category
		$("#Category").change(function(){		 
/* 			$(document).ready(function(){						
				 $('.SC-data-container').scrollTop(0);
			}); */
			$("#SC_Products").html("");
			$('.SC-SO-noresults-container').hide();			
			//hide sub categories initially
			$("#Sub_Category_1").hide(); 
			$("#Sub_Category_1_img").hide(); 
			$("#Sub_Category_2").hide();
			$("#Sub_Category_2_img").hide();
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			selectCategory="Yes";
			localStorage.setItem("go",0);
			localStorage.setItem("dupsku","N");
			Cat_Parent_Product_Id= document.getElementById('Category').value;
			Cat_Parent_Product_Id= Cat_Parent_Product_Id.split('|');
			Cat_Parent_Id=Cat_Parent_Product_Id[0];
			Cat_Product_Id=Cat_Parent_Product_Id[1];
			
			if(Cat_Parent_Product_Id=="Dummy"){
				selectCategory="No";
				$("#Sub_Category_1").hide(); 
				$("#Sub_Category_1_img").hide(); 
				$("#Sub_Category_2").hide();
				$("#Sub_Category_2_img").hide();
				$("#Sub_Category_3").hide();
				$("#Sub_Category_3_img").hide();
				//To show all products of selected catalogue
				FieldQueryPair = {"Catalog Id": selectedCatalogId, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y"};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else{
				if(Cat_Product_Id!=""){
					//if category itself has products, search with this category id in products
					BSData = "'"+Cat_Parent_Id+"' OR ";
					SiebelJS.Log("Category search spec---"+BSData);	
				}	
				else
					BSData="";
				
				//to get sub categories
				FieldQueryPair = {"Parent Category Id":Cat_Parent_Id, "Active Flag":"Y", "Correct Effective Dates":"Y"};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Sales Order Category List Applet");
			}
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}			
		});
    
		//on change of sub_Cat1
		$("#Sub_Category_1").change(function(){ 
/* 			$(document).ready(function(){						
				 $('.SC-data-container').scrollTop(0);
			}); */
			$("#SC_Products").html("");
			$('.SC-SO-noresults-container').hide();
			//hide sub categories initially
			$("#Sub_Category_2").hide();
			$("#Sub_Category_2_img").hide();
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			selectSubCat1="Yes";
			localStorage.setItem("go",0);
			localStorage.setItem("dupsku","N");
			SubCat1_Parent_Product_Id= document.getElementById('Sub_Category_1').value;
			SubCat1_Parent_Product_Id= SubCat1_Parent_Product_Id.split('|');
			SubCat1_Parent_Id=SubCat1_Parent_Product_Id[0];
			SubCat1_Product_Id=SubCat1_Parent_Product_Id[1];
			SiebelJS.Log("Parent_Id is in main category---"+SubCat1_Parent_Id);
			if(SubCat1_Parent_Product_Id=="Dummy"){
				selectSubCat1="No";
				$("#Sub_Category_2").hide();
				$("#Sub_Category_2_img").hide();
				$("#Sub_Category_3").hide();
				$("#Sub_Category_3_img").hide();
				if(Cat_Product_Id!=""){
					//if category itself has products, search with this category id in products
					BSData = "'"+Cat_Parent_Id+"' OR ";
					SiebelJS.Log("Category search spec---"+BSData);
					
				}	
				else
					BSData="";
				
				//get all sub categories having products under Category
				InPS.SetProperty("Category Id",Cat_Parent_Id);
				Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
				OutPS = Service.InvokeMethod("GetSubCategories",InPS);
				Child = OutPS.GetChild(0);
				BSData+= Child.GetProperty("Sub Category List Spec"); 
				SiebelJS.Log("On Change of category sub cat records---"+BSData);
				FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products")
			}
			else{
				if(SubCat1_Product_Id!=""){
					///if subcategory itself has products, search with this subcategory id in products
					BSData = "'"+SubCat1_Parent_Id+ "' OR ";
				}
				else
					BSData="";
				
				//to get sub categories
				FieldQueryPair = {"Parent Category Id":SubCat1_Parent_Id, "Active Flag":"Y", "Correct Effective Dates":"Y"};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Sales Order Category List Applet");
			}
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}			
		});
	

		//on change of sub_Cat2
		$("#Sub_Category_2").change(function(){ 
/* 			$(document).ready(function(){						
				 $('.SC-data-container').scrollTop(0);
			}); */
			$("#SC_Products").html("");
			$('.SC-SO-noresults-container').hide();
			//hide sub categories initially
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			selectSubCat2="Yes";
			localStorage.setItem("go",0);
			localStorage.setItem("dupsku","N");
			SubCat2_Parent_Product_Id= document.getElementById('Sub_Category_2').value;
			SubCat2_Parent_Product_Id= SubCat2_Parent_Product_Id.split('|');
			SubCat2_Parent_Id=SubCat2_Parent_Product_Id[0];
			SubCat2_Product_Id=SubCat2_Parent_Product_Id[1];
			localStorage.setItem('DiscProdsCategory',SubCat2_Parent_Id);
			if(SubCat2_Parent_Product_Id=="Dummy"){
				selectSubCat2="No";
				$("#Sub_Category_3").hide();
				$("#Sub_Category_3_img").hide();
				if(SubCat1_Product_Id!=""){
					//if subcategory itself has products, search with this subcategory id in products
					BSData = "'"+SubCat1_Parent_Id+ "' OR ";
				}
				else
					BSData="";
				
					//to get all sub categories of the subcategory
					InPS.SetProperty("Category Id",SubCat1_Parent_Id);
					Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
					OutPS = Service.InvokeMethod("GetSubCategories",InPS);
					Child = OutPS.GetChild(0);
					BSData+= Child.GetProperty("Sub Category List Spec"); 
					SiebelJS.Log("On Change of sub category2 sub cat records---"+BSData);
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else{
				if(SubCat2_Product_Id!=""){
					//if subcategory2  itself has products as it is having primary product id
					BSData = "'"+SubCat2_Parent_Id+ "' OR ";
				}
				else
					BSData="";
				//to get sub categories
				FieldQueryPair = {"Parent Category Id":SubCat2_Parent_Id, "Active Flag":"Y", "Correct Effective Dates":"Y"};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Sales Order Category List Applet");
			}
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}			
		});
		
		//on change of sub_Cat3
		$("#Sub_Category_3").change(function(){
/* 			$(document).ready(function(){						
				 $('.SC-data-container').scrollTop(0);
			});	 */		
			$("#SC_Products").html("");
			$('.SC-SO-noresults-container').hide();
			selectSubCat3="Yes";
			localStorage.setItem("go",0);
			localStorage.setItem("dupsku","N");
			SubCat3_Parent_Product_Id= document.getElementById('Sub_Category_3').value;
			SubCat3_Parent_Product_Id= SubCat3_Parent_Product_Id.split('|');
			SubCat3_Parent_Id=SubCat3_Parent_Product_Id[0];
			SubCat3_Product_Id=SubCat3_Parent_Product_Id[1];
			
			if(SubCat3_Parent_Product_Id=="Dummy"){
				selectSubCat3="No";
				if(SubCat2_Product_Id!=""){
					//if sub category2 itself has products, then search with that in products
					BSData = "'"+SubCat2_Parent_Id+ "' OR ";
				}
				else
					BSData="";
				
					//get all sub categories having products under subCategory2
					InPS.SetProperty("Category Id",SubCat2_Parent_Id);
					Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
					OutPS = Service.InvokeMethod("GetSubCategories",InPS);
					Child = OutPS.GetChild(0);
					BSData+= Child.GetProperty("Sub Category List Spec"); 
					SiebelJS.Log("On Change of sub category3 sub cat records---"+BSData);
					$("#SC_Products").html("");
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else{
				if(SubCat3_Product_Id!=""){
					//if subcategory3 itself has products, then search with that in products
					BSData = "'"+SubCat3_Parent_Id+ "' OR ";
				}
				else
					BSData="";
				FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat3_Parent_Id};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}			
		});
		
	}//close of showui

    SCiPadCategoryPR.prototype.BindData = function (bRefresh) {
		SiebelAppFacade.SCiPadCategoryPR.superclass.BindData.apply(this, arguments);
		
		SiebelJS.Log("In Bind Data of Category");
		if(localStorage.getItem("addcart")!="addcart"){
			if(isFirstTime_C == 'Y'){
				RecordSet="";
				RecordSet= this.GetPM().Get("GetRecordSet");
				
				//check if Category exists
				if(ChoosedCatalog=="Yes" && RecordSet.length!=0){
					ChoosedCatalog="No";
					selectedCatalogId=document.getElementById('Catalog_Name').value;
					SiebelJS.Log("Catalog refresh in of--"+selectedCatalogId);
					if(selectedCatalogId=="Dummy"){
						$("#Category").hide(); 
						$("#Category_img").hide(); 
						FieldQueryPair = {"Catalog Id":CatalogIDs, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y"};
					}
					else{
						$("#Category").show(); 
						$("#Category_img").show(); 
						categoryRecords='<option value="Dummy">Criteria</option>';
						for(i=0;i<RecordSet.length;i++) {
							categoryRecords+='<option value='+RecordSet[i].Id+'|'+RecordSet[i]["Primary Product Id"]+'>'+RecordSet[i]['Display Name']+'</option>';
						}
						SiebelJS.Log("Records in Category as option---"+categoryRecords);
						$('#Category').html(categoryRecords);
						FieldQueryPair = {"Catalog Id":selectedCatalogId, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y"};
					}
					$("#SC_Products").html("");
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
				//if Category doesn't exist
				else if(ChoosedCatalog=="Yes" && RecordSet.length==0){
					ChoosedCatalog="No";
					$("#SC_Products").html("");
				}
					
					
				//check if subCat_1 exists
				if(selectCategory=="Yes" && RecordSet.length!=0){
					selectCategory="No";
					$("#Sub_Category_1").show(); 
					$("#Sub_Category_1_img").show(); 
					subCat1='<option value="Dummy">Criteria</option>';
					for(i=0;i<RecordSet.length;i++){
					   subCat1+='<option value='+RecordSet[i].Id+'|'+RecordSet[i]["Primary Product Id"]+'>'+RecordSet[i]['Display Name']+'</option>';
					}
					//SiebelJS.Log("Records in Category as option selectSubCat1---"+subCat1);
					$('#Sub_Category_1').html(subCat1);
					Cat_Parent_Product_Id= document.getElementById('Category').value;
					Cat_Parent_Product_Id= Cat_Parent_Product_Id.split('|');
					Cat_Parent_Id=Cat_Parent_Product_Id[0];
					Cat_Product_Id=Cat_Parent_Product_Id[1];
						
					//get all sub categories having products under Category
					InPS.SetProperty("Category Id",Cat_Parent_Id);
					Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
					OutPS = Service.InvokeMethod("GetSubCategories",InPS);
					Child = OutPS.GetChild(0);
					BSData+= Child.GetProperty("Sub Category List Spec"); 
					SiebelJS.Log("On Change of category sub cat records---"+BSData);
					$("#SC_Products").html("");
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
				
				//check if subCat_1 does not exists
				if(selectCategory=="Yes" && RecordSet.length==0){
					selectCategory="No";
					$("#SC_Products").html("");
					SiebelJS.Log("On Change of category ---"+Cat_Parent_Id);
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":Cat_Parent_Id};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}	
					
					
				//check if subCat_2 exists
				if(selectSubCat1=="Yes" && RecordSet.length!=0){
					selectSubCat1="No";
					$("#Sub_Category_2").show(); 
					$("#Sub_Category_2_img").show(); 
					subCat2='<option value="Dummy">Criteria</option>';
					for(i=0;i<RecordSet.length;i=i+1) {
					   subCat2+='<option value='+RecordSet[i].Id+'|'+RecordSet[i]["Primary Product Id"]+'>'+RecordSet[i]['Display Name']+'</option>';
					}
					//SiebelJS.Log("Records in Category as option selectSubCat2---"+subCat2);
					$('#Sub_Category_2').html(subCat2);
					
					//get all sub categories having products under Category
					InPS.SetProperty("Category Id",SubCat1_Parent_Id);
					Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
					OutPS = Service.InvokeMethod("GetSubCategories",InPS);
					Child = OutPS.GetChild(0);
					BSData+= Child.GetProperty("Sub Category List Spec"); 
					SiebelJS.Log("On Change of sub category1 sub cat records---"+BSData);
					$("#SC_Products").html("");
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
					
				//check if subCat_2 does not exists		
				if(selectSubCat1=="Yes" && RecordSet.length==0){
				  selectSubCat1="No";
					$("#SC_Products").html("");
					SiebelJS.Log("On Change of  sub category ---"+SubCat1_Parent_Id);
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat1_Parent_Id};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
				
				
				//check if subCat_3 exists			
				if(selectSubCat2=="Yes" && RecordSet.length!=0){
					selectSubCat2="No";
					$("#Sub_Category_3").show(); 
					$("#Sub_Category_3_img").show(); 
					subCat3='<option value="Dummy">Criteria</option>';
					for(i=0;i<RecordSet.length;i=i+1) {
					   subCat3+='<option value='+RecordSet[i].Id+'|'+RecordSet[i]["Primary Product Id"]+'>'+RecordSet[i]['Display Name']+'</option>';
					}
					$('#Sub_Category_3').html(subCat3);
					
					//get all sub categories having products under Category
					InPS.SetProperty("Category Id",SubCat2_Parent_Id);
					Service = SiebelApp.S_App.GetService("SC Fetch All SubCategories");
					OutPS = Service.InvokeMethod("GetSubCategories",InPS);
					Child = OutPS.GetChild(0);
					BSData+= Child.GetProperty("Sub Category List Spec"); 
					SiebelJS.Log("On Change of sub category2 sub cat records---"+BSData);
					$("#SC_Products").html("");
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
					
				//check if subCat_3 does not exists
				if(selectSubCat2=="Yes" && RecordSet.length==0){
					selectSubCat2="No";
					$("#SC_Products").html("");
					SiebelJS.Log("On Change of  sub category2 ---"+SubCat2_Parent_Id);
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat2_Parent_Id};
					SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
				}
				
			}
			isFirstTime_C = 'Y';
		}//addcart
	}//close of bdata

    SCiPadCategoryPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCiPadCategoryPR.superclass.BindEvents.apply(this, arguments);
		
	    //to get selected dropdown option Search
		$(document).on('click','.dropdown-menu li a',function(){
			$(this).addClass('selected');
			$(this).siblings().show();
			$(this).parent().siblings().children('img').hide() 
			$(this).parent().siblings().children('a').removeClass('selected');
		});
		
		
		//on clicking the search box
		$('#sc_searchtext').focus(function() {
			
			//if order details section is open closed it
			if ($('.OrderDetailsclose').hasClass('iconOpen')) {
				$(".OrderDetailsclose").click();
			}
			
			//if line details section is open close it
			if($('.lineitemsopen').hasClass('iconOpen')){
				$('.lineitemsopen').click();
			}
			
			
			//to show dropdown
			$('#SC-prod-dropdown').show();
		});
		
		//on selecting value from drop down hide it
		$(document).on('click','#SC-prod-dropdown',function(){
			$('#SC-prod-dropdown').hide();
		});
		
		
		
		
		//on click of search of products
		$(document).on('click','#SC_searchbutton',function(){
			//for hiding the All Catalog Current Catalog dropdown
			$('#SC-prod-dropdown').hide();
			ClickOnSearch="Y";
			localStorage.setItem("addToOrder","N");
			productsearch();
			
		});
		
		//on click of enter in search box do search operation
		$(".SC-SO-search-box").keyup(function(event) {
			if (event.keyCode === 13) {
				if(document.getElementById('sc_searchtext').value!=""){
					//for hiding the All Catalog Current Catalog dropdown
					$('#SC-prod-dropdown').hide();
					localStorage.setItem("addToOrder","N");
					ClickOnSearch="Y";
					productsearch();
				}
			}
			var search_text=$(this).val();
			if(search_text!="" && search_text!=" ")
			{
				$("#SC_addtoorder_button").removeClass('SC-disabled');
			}
			else
			{
				$("#SC_addtoorder_button").addClass('SC-disabled');
			}
		});
		//on click of Add To Order Button
		$(document).on("click","#SC_addtoorder_button",function() {
			$('#SC-prod-dropdown').hide();
			$('#custommaskoverlay').show();
			localStorage.setItem("addToOrder","Y");
			productsearch();
			
		});
		
    }//bevents
	function productsearch(){
		$("#SC_Products").html("");		
		//Start loader 
		var newRecordSet=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
		$("body").trigger('Custom.Start');
		setTimeout(function(){
		selectedtext = $('.dropdown-menu li .selected').text();
		searchtext1=document.getElementById('sc_searchtext').value;
		searchtext="*"+document.getElementById('sc_searchtext').value+"*";
		if(newRecordSet[0]["SC Sub-Type"]=="Wholesale"||newRecordSet[0]["SC Sub-Type"]=="QVC"||newRecordSet[0]["SC Sub-Type"]=="Commercial" || newRecordSet[0]["SC Sub-Type"] == "Internal" || newRecordSet[0]["SC Sub-Type"] == "HSN"){
		//if(RecordSet[0]["Bill To Account Id"]!=null&&RecordSet[0]["Bill To Account Id"]!=""){
			AccountOrder=true;
		}
		else
			AccountOrder=false;
		
		if(ClickOnSearch=="Y" || AccountOrder) 
			
		{	
		InPS.SetProperty("BO","Internal Product");
		InPS.SetProperty("BC","Internal Product");
		if(AccountOrder)
			FieldsArray=["Part #","Product Line","Description","Id","Product Def Type Code"];
		else
			FieldsArray=["Part #"];	
		InPS.SetProperty("FieldsArray",FieldsArray);
		if(localStorage.getItem("addToOrder")=="Y")
			InPS.SetProperty("SearchSpecification", "([Part #] = '"+searchtext1+"')");
		else
			InPS.SetProperty("SearchSpecification", "([Part #] LIKE '"+searchtext1+"' OR [Detailed Description] LIKE '"+searchtext+"')");	
		Service = SiebelApp.S_App.GetService("SC Custom Query");
		OutPS = Service.InvokeMethod("Query",InPS);
		ChildCount =OutPS.GetChildCount();
		Child = OutPS.GetChild(0);
		BS_Data1 = Child.GetProperty("OutputRecordSet"); 
	    ClickOnSearch="N";
		
		SKUs="";
		if(BS_Data1!="}"){
			BS_Data1 = BS_Data1.split(";");
			j=0;
			for(var i=0;i<BS_Data1.length;i++){
				RecordSeti=BS_Data1[i];
				var str = RecordSeti;
						var found = false;
					str = str.replace(/(".*?")(?!\})/g, function(match) {
					if(found && match.endsWith('"')) return match.substring(0, match.length - 1) + '\\"';
					found = found || match === '"Detailed Description"';

					return match;
					});
				str=str.replace(/\n/g,"");
				RecordSeti = JSON.parse(str);
				localStorage.setItem("notInCatalog",JSON.stringify(RecordSeti));
				if(j==0){
					SKUs+=RecordSeti["Part #"];
					j++;
				}
				else{
				   SKUs+=" OR "+RecordSeti["Part #"]; 
				}
			}
		}
		}
		else
		{
			SKUs='"'+searchtext1+'"';
			//SKUs=searchtext1;
			//SKUs+=' OR '+SKUs;
		}
		SiebelJS.Log("SKU'S IN SEARCH"+SKUs);
		
		if(SKUs==""){
			$("#Category").hide(); 
			$("#Category_img").hide(); 
			$("#Sub_Category_1").hide();
			$("#Sub_Category_1_img").hide();
			$("#Sub_Category_2").hide();
			$("#Sub_Category_2_img").hide();
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			localStorage.setItem("go","Last");
			$("#SC_Products").html("");
			$("#scnore").text("NO RESULTS FOUND for criteria "+searchtext1);
			$("#SC-SO-No-Results-found").modal({
				 backdrop: 'static'
			});
			$("#SC-SO-No-Results-found").css({
				"display": "flex",
				"justify-content": "center",
				"align-items": "center"
			});
			$('#custommaskoverlay').hide();
		}
		else if(selectedtext=="Current Catalog"){
			localStorage.setItem("dupsku","N");
			RecordSet=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Category List Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet");
			if($('#Sub_Category_3').is(":visible")){
				$("#SC_Products").html("");
				 localStorage.setItem("go",0);
				if(SubCat3_Parent_Product_Id=="Dummy")
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData , "SKU#":SKUs};
				else
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat3_Parent_Id , "SKU#":SKUs};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else if($('#Sub_Category_2').is(":visible")){
				$("#SC_Products").html("");
				 localStorage.setItem("go",0);
				if(RecordSet.length!=0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData , "SKU#":SKUs};
				else if(RecordSet.length==0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat2_Parent_Id , "SKU#":SKUs};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else if($('#Sub_Category_1').is(":visible")){
				$("#SC_Products").html("");
				 localStorage.setItem("go",0);
				if(RecordSet.length!=0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData , "SKU#":SKUs};
				else if(RecordSet.length==0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":SubCat1_Parent_Id , "SKU#":SKUs};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else if($('#Category').is(":visible")){
				$("#SC_Products").html("");
				 localStorage.setItem("go",0);
				if(RecordSet.length!=0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":BSData , "SKU#":SKUs};
				else if(RecordSet.length==0)
					FieldQueryPair = {"Price List Id":PriceList, "SC Orderable":"Y", "Category Id":Cat_Parent_Id , "SKU#":SKUs};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
			else if($('#Catalog_Name').is(":visible")){
				$("#SC_Products").html("");
				localStorage.setItem("go",0);
				FieldQueryPair = {"Catalog Id":selectedCatalogId, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y", "SKU#":SKUs};
				SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			}
		}
		else if(selectedtext=="All Catalog"){			
			$("#Category").hide(); 
			$("#Category_img").hide(); 
			$("#Sub_Category_1").hide();
			$("#Sub_Category_1_img").hide();
			$("#Sub_Category_2").hide();
			$("#Sub_Category_2_img").hide();
			$("#Sub_Category_3").hide();
			$("#Sub_Category_3_img").hide();
			var Lov=SC_OUI_Methods.SCGetOrderLoVs("[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='DIRECT'");
			var Lov1=SC_OUI_Methods.SCGetOrderLoVs("[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='ECOM'");
			if(SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Type')==Lov[0]||SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Type')==Lov1[0]){
				//if user is  CS and searching in all catalog  hide all duplicates 
				localStorage.setItem("dupsku","Y");
			}
			$("#SC_Products").html("");
			localStorage.setItem("go",0);
			FieldQueryPair = {"Catalog Id":CatalogIDs, "Category Status":"Y", "Price List Id":PriceList, "SC Orderable":"Y", "SKU#":SKUs};
			SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
			
		}
		//hiding the Loader
		$("body").trigger('Custom.End');
		},1000);
	}//close of function product search
	
	
	
	
    SCiPadCategoryPR.prototype.EndLife = function () {
     SiebelAppFacade.SCiPadCategoryPR.superclass.EndLife.apply(this, arguments);
		$(document).unbind("change");
    }
	
	return SCiPadCategoryPR;
   }()
  );
  return "SiebelAppFacade.SCiPadCategoryPR";
 })
}
