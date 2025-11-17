/*********************
Author: Sandeep Patibandla
Created Date: 07-JULY-2018
Purpose: Developing Recommended products Functionality with Open UI
Modified Date:
**********************/
if (typeof(SiebelAppFacade.SCOrderEntryLineItemListAppletPR) === "undefined") {

    SiebelJS.Namespace("SiebelAppFacade.SCOrderEntryLineItemListAppletPR");
    define("siebel/custom/SelectComfort/RecommendedProductsPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SC_OUI_Methods","siebel/custom/SelectComfort/SC_OUI_Markups"],
     function () {
      SiebelAppFacade.SCOrderEntryLineItemListAppletPR = (function () {
       var sorderPM="",sorderBC="",FieldQueryPair,prRecomrcdset,TotalLineItemPrice,scProfileAttr,profileAttrs,PriceList;
       var sP2PEFlag = SiebelApp.S_App.GetProfileAttr("P2PEFlag");														
       var SiebelConstant = SiebelJS.Dependency("SiebelApp.Constants");
       var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
       var SC_OUI_Markups = SiebelJS.Dependency("SiebelApp.SC_OUI_Markups");
       function SCOrderEntryLineItemListAppletPR(pm) {
        SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.constructor.apply(this, arguments);
       }
   
       SiebelJS.Extend(SCOrderEntryLineItemListAppletPR, SiebelAppFacade.JQGridRenderer);
   
       SCOrderEntryLineItemListAppletPR.prototype.Init = function () {
           var profileAttrs=["YourPrice,SCLineId,SCProductId,SC Store User,ListPrice,ProductName,SCSKUNumber"];
        SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.Init.apply(this, arguments);
       // SC_OUI_Methods.SCGetProfileAttr("YourPrice,SCLineId,SCProductId,SC Store User,ListPrice,ProductName,SCSKUNumber");
        var Custom_Service="",Input_BS="",Out_BS="";
                   scProfileAttr=[];
                   Custom_Service = SiebelApp.S_App.GetService("SC Get Profile Attribute BS");
                   Input_BS = SiebelApp.S_App.NewPropertySet();
                   Out_BS = SiebelApp.S_App.NewPropertySet();
                   //scAttrNames = "SC Store User,MachineInfo,Login Name,SC Store Number";
                   Input_BS.SetProperty("ProfileAttrArray", profileAttrs);
                   Out_BS = Custom_Service.InvokeMethod("Query", Input_BS);
                   var Child_BS = Out_BS.GetChild(0);
                   var BS_Data = Child_BS.GetProperty("OutPutArray");
               if(BS_Data!="No Records"){
                       //var ResArray = new Array;
                       //ResArray = BS_Data;
                       BS_Data=BS_Data.replace(/\n/g,"");
                       scProfileAttr = JSON.parse(BS_Data);
               }
                   
       }
   
       SCOrderEntryLineItemListAppletPR.prototype.ShowUI = function () {
        SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.ShowUI.apply(this, arguments);
           
            sorderPM="";
            sorderBC="";
            prRecomrcdset="";
            TotalLineItemPrice="";
           $(".whitescreentimer").remove();
           $("#custommaskoverlay").hide();
           //$("#_sweview").show();
           
           $("#_swescrnbar").hide();
           $("#_swethreadbar").hide();
           $("#_sweappmenu").hide();
           $("#s_vctrl_div").hide();
           $(".siebui-button-toolbar").hide();
           //$("#_sweview").hide();
           $(".siebui-button-toolbar").hide();
           $('#_sweview').css("overflow","auto");
           TotalLineItemPrice=scProfileAttr["YourPrice"];
           TotalLineItemPrice=TotalLineItemPrice!=""?parseFloat(TotalLineItemPrice):0.00;
           var a="",slectedlen,insertlength,skuNumberId,skurecNumber,skauquanId,skuquantity,Rejclick="N";
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Category List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry - Line Items Form Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Order Item List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Order List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Validation Message - Payments List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Report Output List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Contact Shipping List OUI"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["Order Entry - Attachment Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC LOY Member List Applet"].GetPModel().Get("GetFullId");
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Account Contact Shipping List OUI"].GetPModel().Get("GetFullId");		
           $("#"+a).hide();
           a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().Get("GetFullId");
           //$("#"+a).hide();
           //a=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetPModel().Get("GetFullId");
           //$("#"+a).hide();
           $('#s_'+a+'_div').hide();
           mainmarkup=recomemdedProductMarkUp()
           $('#'+a).append(mainmarkup);
           customtimermarkup=SC_OUI_Markups.CustomTimer();
           $('#applet1').append(customtimermarkup);
           var appletseqorderentry = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().Get("GetFullId");;
           //appletseqorderentry = appletseqorderentry[appletseqorderentry.length -1];
           appletseqorderentry=appletseqorderentry.split("_A");
           appletseqorderentry=appletseqorderentry[1];
           //const d = [[1, 2, 3], [2, 3], [1, 3]];
           //const result = _.intersection(...d);
           //console.log(result);
           sorderPM = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetPModel().GetRenderer().GetPM();
           sorderBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp();
           //code for to get the all addons for seleted line item
           var ProInPS = SiebelApp.S_App.NewPropertySet();
           var ProOutPS = SiebelApp.S_App.NewPropertySet();
           var SearchSpecification,ChildCount,Child,BSData,FieldsArray,prodid=[],skuBSData;
           var lineid=scProfileAttr["SCLineId"];
           prodid[0]=scProfileAttr["SCProductId"];
           //SearchSpecification="[Root Order Item Id] = '"+lineid+"' AND [Cfg State Code] ='User Requested Item' AND [Order Header Id]='"+sorderBC.GetFieldValue("Id")+"'";
           SearchSpecification="[Parent Order Item Id] = '"+lineid+"' AND [Order Header Id]='"+sorderBC.GetFieldValue("Id")+"'";
           ProInPS.SetProperty("BO","Order Entry (Sales)");
           ProInPS.SetProperty("BC","Order Entry - Line Items");
           FieldsArray="Product Id";
           ProInPS.SetProperty("FieldsArray",FieldsArray);
           ProInPS.SetProperty("SearchSpecification", SearchSpecification);			
           Service = SiebelApp.S_App.GetService("SC Custom Query");
           ProOutPS = Service.InvokeMethod("Query",ProInPS);
           ChildCount =ProOutPS.GetChildCount();
           Child = ProOutPS.GetChild(0);
           BSData = Child.GetProperty("OutputRecordSet");
           if(BSData!="}"){
               var ResArray = new Array;
               ResArray = BSData.split(";");
               for(var i=1;i<=ResArray.length;i++){
                   jsonRes = JSON.parse(ResArray[i-1]);
                   prodid[i]=jsonRes["Product Id"];
                   SiebelJS.Log("jsonson product id "+jsonRes["Product Id"]);
               }
           }
           SiebelJS.Log("Productids"+prodid);
           //Start:code for to get the all parent recommended Sku Numbers
               var parentskunumber=[];
               var InPS = SiebelApp.S_App.NewPropertySet();
               var OutPS = SiebelApp.S_App.NewPropertySet();
               SearchSpecification="[Parent Product ID]='"+prodid[0]+"' AND [UMS Type]='Cross-Sell Recommendation' AND ([SC Message Visibility]=LookupValue('SC_MSG_VSB', 'Quote/Sales Order Only') OR [SC Message Visibility]=LookupValue('SC_MSG_VSB', 'Both')) AND ([Effective Start Date] IS NULL OR [Effective Start Date]<=today()) AND ([Effective End Date] IS NULL OR [Effective End Date]>=today())";
               InPS.SetProperty("BO","Admin ISS Product Definition");
               InPS.SetProperty("BC","Product Recommendation");
               FieldsArray="Recommeded Product Name";
               InPS.SetProperty("FieldsArray",FieldsArray);
               InPS.SetProperty("SearchSpecification", SearchSpecification);			
               Service = SiebelApp.S_App.GetService("SC Custom Query");
               OutPS = Service.InvokeMethod("Query",InPS);
               ChildCount =OutPS.GetChildCount();
               Child = OutPS.GetChild(0);
               skuBSData = Child.GetProperty("OutputRecordSet");
               //skuJson[prodid[i]]="";
               if(skuBSData!="}"){
                   var ResArray = new Array;
                   ResArray = skuBSData.split(";");
                   for(var j=0;j<ResArray.length;j++){
                       jsonRes = JSON.parse(ResArray[j]);
                       parentskunumber[j]=jsonRes["Recommeded Product Name"];
                       SiebelJS.Log("jsonson product id "+jsonRes["Recommeded Product Name"]);
                   }
               }
               //End:code for to get the all parent recommended Sku Numbers
           if(parentskunumber.length!=0){
           //Start: code for to get all child excludes recommended sku numbers
           var childskunumber=[];
           SearchSpecification="";
           for(var i=1;i<prodid.length;i++){
               if(i==1)
               SearchSpecification="(";
               if(i==(prodid.length)-1){
               SearchSpecification+="[Product Id]='"+prodid[i]+"'";
               SearchSpecification+=")";
               }
               else
               SearchSpecification+="[Product Id]='"+prodid[i]+"' OR";
           }
           
               skuBSData="";
               skunumber=[];
               childskunumber=[];
               if(prodid.length>1){
                   var InPS = SiebelApp.S_App.NewPropertySet();
                   var OutPS = SiebelApp.S_App.NewPropertySet();
                   SearchSpecification+="AND [Type]='Excludes' AND ([Effective Start Date] IS NULL OR [Effective Start Date]<=today()) AND ([Effective End Date] IS NULL OR [Effective End Date]>=today())";
                   InPS.SetProperty("BO","Admin ISS Product Definition");
                   InPS.SetProperty("BC","Product Compatibility - Subject");
                   FieldsArray="Rel Product";
                   InPS.SetProperty("FieldsArray",FieldsArray);
                   InPS.SetProperty("SearchSpecification", SearchSpecification);			
                   Service = SiebelApp.S_App.GetService("SC Custom Query");
                   OutPS = Service.InvokeMethod("Query",InPS);
                   ChildCount =OutPS.GetChildCount();
                   Child = OutPS.GetChild(0);
                   skuBSData = Child.GetProperty("OutputRecordSet");
                   //skuJson[prodid[i]]="";
                   if(skuBSData!="}"){
                       var ResArray = new Array;
                       ResArray = skuBSData.split(";");
                       for(var j=0;j<ResArray.length;j++){
                           jsonRes = JSON.parse(ResArray[j]);
                           childskunumber[j]=jsonRes["Rel Product"];
                           SiebelJS.Log("jsonson product id "+jsonRes["Rel Product"]);
                       }
                   }
               }				
               //childskunumber=childskunumber.concat(skunumber);			
           //}
           //End: code for to get all child excludes recommended sku numbers
       //SiebelJS.Log("SKUJSON"+JSON.stringify(skuJson));
       var SkuNumbersArray=excludeSkus(parentskunumber,childskunumber);
       SiebelJS.Log(SkuNumbersArray);
       //Start:code for to get the dynamic price list id 
           var priceli=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("Price List");
           if(priceli==""||priceli==undefined){
               priceli=="STANDARD PRICE LIST";
           }
           /*PriceList="";
           var InPS_Pr="",OuPS_Pr="",SearchSpecification="",RecordSet="",FieldsArray;
           BSData="";
           InPS_Pr=SiebelApp.S_App.NewPropertySet();
           OuPS_Pr=SiebelApp.S_App.NewPropertySet();
           SearchSpecification="[Name]='"+priceli+"'";
           InPS_Pr.SetProperty("BO","Admin Price List");
           InPS_Pr.SetProperty("BC","Price List");
           FieldsArray=["Name","Id"];
           InPS_Pr.SetProperty("FieldsArray",FieldsArray);
           InPS_Pr.SetProperty("SearchSpecification", SearchSpecification);			
           Service = SiebelApp.S_App.GetService("SC Custom Query");
           OuPS_Pr = Service.InvokeMethod("Query",InPS_Pr);
           ChildCount =OuPS_Pr.GetChildCount();
           Child = OuPS_Pr.GetChild(0);
           BSData = Child.GetProperty("OutputRecordSet"); 
           if(BSData!="}"){
               RecordSet=new Array; 
               RecordSet = BSData.split(";");
               RecordSet=JSON.parse(RecordSet);
               PriceList=RecordSet["Id"];
           }*/
           if(priceli!="STANDARD PRICE LIST"){
               var InPS_Pr="",OuPS_Pr="",SearchSpecification="",RecordSet="",FieldsArray;
               BSData="";
               InPS_Pr=SiebelApp.S_App.NewPropertySet();
               OuPS_Pr=SiebelApp.S_App.NewPropertySet();
               SearchSpecification="[Name]='"+priceli+"'";
               InPS_Pr.SetProperty("BO","Admin Price List");
               InPS_Pr.SetProperty("BC","Price List");
               FieldsArray=["Name","Id"];
               InPS_Pr.SetProperty("FieldsArray",FieldsArray);
               InPS_Pr.SetProperty("SearchSpecification", SearchSpecification);			
               Service = SiebelApp.S_App.GetService("SC Custom Query");
               OuPS_Pr = Service.InvokeMethod("Query",InPS_Pr);
               ChildCount =OuPS_Pr.GetChildCount();
               Child = OuPS_Pr.GetChild(0);
               BSData = Child.GetProperty("OutputRecordSet"); 
               if(BSData!="}"){
                   RecordSet=new Array; 
                   RecordSet = BSData.split(";");
                   RecordSet=JSON.parse(RecordSet);
                   PriceList=RecordSet["Id"];
               }
           }
           else{
               PriceList=localStorage.getItem("PriceListIdsOUI");
           }
           
           //End:code for to get the dynamic price list id 
           
           
           //Start:code to get the catalog ids
           var catSearchSpecification,InPS_Cat,OutPS_Cat,Service,CatalogIDs,SKUs;
           /*InPS_Cat=SiebelApp.S_App.NewPropertySet();
           OutPS_Cat=SiebelApp.S_App.NewPropertySet();
           catSearchSpecification="[Catalog Type] = LookupValue('CTLG_TYPE', 'Buying') AND [Active] = 'Y' AND [Correct Effective Dates] = 'Y'";
           InPS_Cat.SetProperty("BO","Order Entry (Sales)");
           InPS_Cat.SetProperty("BC","Quote Catalog");
           FieldsArray=["Name","Id"];
           InPS_Cat.SetProperty("FieldsArray",FieldsArray);
           InPS_Cat.SetProperty("SearchSpecification", catSearchSpecification);			
           Service = SiebelApp.S_App.GetService("SC Custom Query");
           OutPS_Cat = Service.InvokeMethod("Query",InPS_Cat);
           ChildCount =OutPS_Cat.GetChildCount();
           Child = OutPS_Cat.GetChild(0);
           BSData = Child.GetProperty("OutputRecordSet"); 
           catalogRecords="";
           if(BSData!="}"){*/
               var RecordSet=new Array; 
               RecordSet=JSON.parse(localStorage.getItem("SCCatalogIdsOUI"));
               for(i=((RecordSet.length)-1);i>=0;i--){
                   RecordSet[i]=eval('(' + RecordSet[i] + ')');
                   //for retail user
                   if(scProfileAttr["SC Store User"]=="Y"&&(RecordSet[i]["Name"]=="Sleep Number - Components"||RecordSet[i]["Name"]=="SC Catalog - Components")){
                       SiebelJS.Log("Supressed the Sleep Number Components");
                   }
                   else{
                       if(i==(RecordSet.length)-1){
                           CatalogIDs=RecordSet[i].Id;
                       }
                       else{
                           CatalogIDs=CatalogIDs+" OR "+RecordSet[i]["Id"];
                       }
                   }	
               }
           //}
           //End:code to get the catalog ids
           
           
           //Start:code for query on products applets to get the line items
           
           for(i=((SkuNumbersArray.length)-1);i>=0;i--){
            //fixed to cater non alphanumeric character in the skunumber. peeyush.kumar on Dec 11 2023
               if(i==(SkuNumbersArray.length)-1){
                   SKUs="'"+SkuNumbersArray[i]+"'";
               }
               else{
                   SKUs=SKUs+" OR '"+SkuNumbersArray[i]+"'";
               }
           }
           FieldQueryPair = {"Catalog Id":CatalogIDs, "Category Status":"Y", "Price List Id":PriceList, "Product Status":"Active", "SKU#":SKUs};
           SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Management Products");
           prRecomrcdset=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetBusComp().GetRecordSet();
           SiebelJS.Log("productset::"+JSON.stringify(prRecomrcdset));
           var NextRecRcdSet,nextSet="Y",pm;
           if(prRecomrcdset.length>=10){
               while(nextSet=="Y"){
                   pm=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetPModel();
                   (function(proxied) {
                       window.alert = function() {
                       if(arguments[0].includes("Method GotoNextSet is not allowed here")){
                           SiebelJS.Log("In Last Set");
                           nextSet="N";
                       }
                       else
                       return proxied.apply(this, arguments);
                       };
                   })(window.alert);
                   pm.ExecuteMethod("InvokeMethod","GotoNextSet",null,false);
                   SiebelJS.Log("In Next Set");
                   if(nextSet=="Y"){
                       SiebelJS.Log("concatenate");
                       NextRecRcdSet=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Management Products"].GetBusComp().GetRecordSet();
                       prRecomrcdset = prRecomrcdset.concat(NextRecRcdSet);
                   }
               }
           }
           //End:code for query on products applets to get the line items
           //Start:Removing duplicate line items
           function removeDuplicates(originalArray, prop) {
                var newArray=[];
                var lookupObject  = {};
   
                for(var i=0 ;i<originalArray.length;i++) {
                   lookupObject[originalArray[i][prop]] = originalArray[i];
                }
   
                for(i in lookupObject) {
                    newArray.push(lookupObject[i]);
                }
                 return newArray;
           }
   
           prRecomrcdset = removeDuplicates(prRecomrcdset, "SKU#");
           SiebelJS.Log("productset::"+JSON.stringify(prRecomrcdset));
           //mereging the product Classes
           for(var i=0;i<prRecomrcdset.length;i++){
               if(prRecomrcdset[i]["XA Class Name"]=="MATTRESS PAD"){
                   prRecomrcdset[i]["XA Class Name"]="TOTAL PROTECTION MATTRESS PAD";
               }
               else if(prRecomrcdset[i]["XA Class Name"]=="BED" || prRecomrcdset[i]["XA Class Name"]=="HEAD BOARD"){
                   prRecomrcdset[i]["XA Class Name"]="UPHOLSTERED FURNITURE";
               }
           }
           SiebelJS.Log("concatenatelen"+prRecomrcdset.length);
           var groupBy = function(xs, key) {
               return xs.reduce(function(rv, x) {
               (rv[x[key]] = rv[x[key]] || []).push(x);
                   return rv;
               }, {});
           };
           //Start:Removing duplicate line items
           //code for grouping the line items based on product line
           var productrcdset=groupBy(prRecomrcdset, 'XA Class Name');
           SiebelJS.Log("productset::"+JSON.stringify(productrcdset));
           var keys=Object.keys(productrcdset);
           var SeqOrderKeys=["TOTAL PROTECTION MATTRESS PAD","REMOTE","DUAL TEMP","DISPOSAL","UPHOLSTERED FURNITURE"],position,tempseqKeys=[];
           tempseqKeys=["TOTAL PROTECTION MATTRESS PAD","REMOTE","DUAL TEMP","DISPOSAL","UPHOLSTERED FURNITURE"];
           for(var i=0;i<SeqOrderKeys.length;i++){
               var position = keys.indexOf(SeqOrderKeys[i]);
               if (position >= 0) {
                   keys.splice(position,1);
               }
               else{
                   position = tempseqKeys.indexOf(SeqOrderKeys[i]);
                   if (position >= 0) 
                   tempseqKeys.splice(position,1);
               }
           }
           for(var i=0;i<keys.length;i++){
               tempseqKeys[tempseqKeys.length]=keys[i];
           }
           var recskuMarkup="",skudes,rcdset,id;
               //appending the markup for all line items
               for(var k=0;k<tempseqKeys.length;k++){
                   rcdset=productrcdset[tempseqKeys[k]];
                   recskuMarkup+='                        <p class="options-title">'+tempseqKeys[k]+'</p>';
                   recskuMarkup+='    <div class="addon-options-item">';             
                   recskuMarkup+='    <div class="box-name">';                        
                   recskuMarkup+='    <div>  ';                          
                   recskuMarkup+='    <p style="font-size: 15px !important;font-weight: bold;color: #727780;padding-left: 13px;margin-bottom:0px">QTY</p> </div>  ';          
                   recskuMarkup+='    <div><label class="item-title" style="font-size: 15px !important;font-weight: bold;color: #727780;padding-left: 25px">Item</label></div>';      
                   recskuMarkup+='    </div>';       
                   recskuMarkup+='    <div class="list-your-price"> ';    
                   recskuMarkup+='    <div class="header-item"> ';        
                   recskuMarkup+='    <p class="item-value" style="font-size: 15px !important;font-weight: bold;color: #727780">List Price</p></div></div></div>'; 
                   for(var i=0;i<rcdset.length;i++){
                   id=k+"id"+i;
                   recskuMarkup+='                        <div class="addon-options-item">';
                   recskuMarkup+='                            <div class="box-name">';
                   /*recskuMarkup+='                                <div class="SC-checkbox-square rec-sku-checkbox">';
                   recskuMarkup+='                                    <input type="checkbox" class="sc-rec-checkbox" name="base" id="'+id+'sku" aria-checked="false">';
                   recskuMarkup+='                                    <label for="'+id+'sku"></label>';
                   recskuMarkup+='                                </div>';*/
                   recskuMarkup+='                                <div class="header-item">';
                   recskuMarkup+='                                    <input type="text" value="" name="" class="small-input less-height sc-rec-checkbox" id="'+id+'sku">';
                   recskuMarkup+='                                </div>';
                   skudes=rcdset[i]["SKU#"]+'-'+rcdset[i]["Product Long Description"];
                   recskuMarkup+='                                <span style="display:none" id="'+id+'skuide">'+rcdset[i]["SKU#"]+'$'+rcdset[i]["XA Class Name"]+'</span><label class="item-title" title="'+rcdset[i]["Product Long Description"]+'" id="'+id+'skudesc">'+skudes+'</label>';
                   recskuMarkup+='                            </div>';
                   recskuMarkup+='                            <div class="list-your-price">';
                   
                   recskuMarkup+='                                <div class="header-item">';
                   recskuMarkup+='                                    <p class="item-value" id="'+id+'skuprice">$'+rcdset[i]["List Price"]+'</p>';
                   recskuMarkup+='                                </div>';
                   recskuMarkup+='                            </div>';
                   recskuMarkup+='                        </div>';
               }
               }
               $("#recomended-sku-header").html(recskuMarkup);
           /*$("#rec-scroll-top").click(function(event) {
               $("div#_sweview").animate({
                   scrollTop: 0
               }, 500);
           });*/
           var pm = this.GetPM();
           var LineItemBC = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetBusComp();
           var linItemPM=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Order Entry Line Item List Applet"].GetPModel().GetRenderer().GetPM();
           //Start:on click of Accept button
           $("#sc-accept-sku").click(function(){
               $("#custommaskoverlay").show();
               setTimeout(function() {
                   var Bservice = '',inPS = '', outPS = '',skurecNumber="",prodClass="";
                   inPS  = SiebelApp.S_App.NewPropertySet();
                   outPS = SiebelApp.S_App.NewPropertySet();
                   var slectedlen=$('.sc-rec-checkbox').filter(function(){ return $(this).val(); }).length;
                   insertlength=0;
                   $('.sc-rec-checkbox').each(function(){
                       if($(this).val()!=""){
                           //if(insertlength==0){
                               skuNumberId=$(this).attr('id')+"ide";
                               skurecNumber=$("#"+skuNumberId).text();
                               skurecNumber=skurecNumber.split("$");
                               prodClass=skurecNumber[1];
                               skurecNumber=skurecNumber[0];
                               skauquanId=$(this).attr('id')+"quan";
                               skuquantity=$(this).val();
                               skuquantity=parseInt(skuquantity);
                               if(insertlength==0){
                                   FieldQueryPair={"SKU #": ""};
                                   SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Entry Line Item List Applet");
                               }
                               //$("#s_"+appletseqorderentry+"_l tr#1").trigger("click");
                               var SiebelConstants = SiebelJS.Dependency("SiebelApp.Constants");
                               linItemPM.OnControlEvent(SiebelConstants.get("PHYEVENT_SELECT_ROW"), "0", false, false);
                               linItemPM.ExecuteMethod("InvokeMethod", "NewRecord", null, false);
                               //LineItemBC.SetFieldValue("Part Number",skurecNumber);
                               //LineItemBC.SetFieldValue("Quantity Requested",skuquantity);
                               insertlength=insertlength+1;
                               var selId=linItemPM.Get("GetSelection");
                               selId=parseInt(selId)+1;
                               $("#"+selId+"_s_"+appletseqorderentry+"_l_Part_Number").trigger("click");
                               $("#"+selId+"_Part_Number").trigger("click");
                               $("#"+selId+"_s_"+appletseqorderentry+"_l_Part_Number").focus();
                               $("#"+selId+"_s_"+appletseqorderentry+"_l_Part_Number input:text").val(skurecNumber);
                               $("#"+selId+"_s_"+appletseqorderentry+"_l_SC_Product").trigger("click");
                               /*$("#2_s_"+appletseqorderentry+"_l_Part_Number").trigger("click");
                               $("#2_Part_Number").trigger("click");
                               $("#2_s_"+appletseqorderentry+"_l_Part_Number").focus();
                               $("#2_s_"+appletseqorderentry+"_l_Part_Number input:text").val(skurecNumber);
                               $("#2_s_"+appletseqorderentry+"_l_SC_Product").trigger("click");*/
                               /*$("#2_s_"+appletseqorderentry+"_l_Quantity_Requested").trigger("click");
                               $("#2_s_"+appletseqorderentry+"_l_Quantity_Requested").focus();
                               $("#2_s_"+appletseqorderentry+"_l_Quantity_Requested input:text").val(skuquantity);
                               $("#2_s_"+appletseqorderentry+"_l_SC_Product").trigger("click");*/
                               LineItemBC.SetFieldValue("Quantity Requested",skuquantity);
                               if(prodClass == "REMOTE"){
                                   var OrderChannel =SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Location Type");
                                   var OrderSubChannel=SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Sales Order Entry Form Applet OUI"].GetBusComp().GetFieldValue("SC Location Sub-Channel");
                                   if(OrderChannel=="STORE" &&(OrderSubChannel == "SHOW" || OrderSubChannel == "STORE")){
                                       LineItemBC.SetFieldValue("Ship Method","Home Delivery");
                                   }
                                   else if(OrderChannel == "DIRECT" && (OrderSubChannel== "CSC" || OrderSubChannel == "CS")){
                                       LineItemBC.SetFieldValue("Ship Method","Home Delivery");
                                   }
                               }
                               linItemPM.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
                               if(insertlength==slectedlen){
                                   inPS.SetProperty("Name","RecommendedView");
                                   inPS.SetProperty("Value","N");
                                   Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                                   outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
                                   $("#custommaskoverlay").hide();
                                   SiebelApp.S_App.GotoView("SC Create Sales Order View OUI","","","");
                               }
                               if(localStorage.getItem("InvokepoleDisplay")=="Y" && sP2PEFlag != "Y"){
                                   poleDisplay(LineItemBC.GetFieldValue("SC Calc Long Description"),LineItemBC.GetFieldValue("NRC CxTotal in Header Currency"),skuquantity);
                               }
                               if(localStorage.getItem("InvokepoleDisplay")=="Y" && sP2PEFlag == "Y"){
                                   var sLineDetails = [];
                                   sLineDetails.push(LineItemBC.GetFieldValue("SC Calc Long Description"));
                                   sLineDetails.push("QTY: "+skuquantity+"	PRICE: $"+parseFloat(LineItemBC.GetFieldValue("NRC CxTotal in Header Currency")).toFixed(2));
                                   SiebelJS.Log("Pole Display:"+sLineDetails);
                                   var OrderId = localStorage.getItem('OrderId');
                                   SC_OUI_Methods.P2PEDispalyMultiLineItems(OrderId,sLineDetails);																											  
                                   }
                           }
                   });
                   if(slectedlen==0){
                       inPS.SetProperty("Name","RecommendedView");
                       inPS.SetProperty("Value","N");
                       Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                       outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
                       $("#custommaskoverlay").hide();
                       SiebelApp.S_App.GotoView("SC Create Sales Order View OUI","","","");
                   }
               },50);
           });
           //End:on click of Accept button
           //Start:on click of reject button
           $("#sc-reject-sku").click(function(){
               $("#custommaskoverlay").show();
               setTimeout(function() {
                   if(Rejclick=="N"){
                       Rejclick="Y";
                       var Bservice = '',inPS = '', outPS = '';
                       inPS  = SiebelApp.S_App.NewPropertySet();
                       outPS = SiebelApp.S_App.NewPropertySet();
                       inPS.SetProperty("Name","RecommendedView");
                       inPS.SetProperty("Value","N");
                       Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                       outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
                       //FieldQueryPair={"SKU #": ""};
                       //SC_OUI_Methods.ExecuteListAppletFramesync(SiebelConstant,FieldQueryPair,"SC Order Entry Line Item List Applet");
                       $("#custommaskoverlay").hide();
                       SiebelApp.S_App.GotoView("SC Create Sales Order View OUI","","","");
                   }
               },50);
           });
           //End:on click of reject button
       }
       }
   
       SCOrderEntryLineItemListAppletPR.prototype.BindData = function (bRefresh) {
       SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.BindData.apply(this, arguments);
           
       }
   
       SCOrderEntryLineItemListAppletPR.prototype.BindEvents = function () {
        SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.BindEvents.apply(this, arguments);
           var addonsmarkup="",descId,skudesc,skuPrice,priceId,TotalPrice=0.00,qvalue;
           //Start:on change of quantity
           $(document).on("change",".sc-rec-checkbox",function(){
               qvalue=$(this).val();
               qvalue=qvalue==""?0:parseInt(qvalue);
               if(qvalue==0){
                   $(this).val("");
                       /*$("#SC-qty-zero").modal({
                       backdrop: 'static'
                      });
                   $("#SC-qty-zero").css({
                       "display": "flex",
                       "justify-content": "center",
                       "align-items": "center"
                   });*/
               }
               addonsmarkup="",TotalPrice=TotalLineItemPrice;
               $('.sc-rec-checkbox').each(function(){
                   if($(this).val()!=""){
                       if(addonsmarkup.length==0){
                           addonsmarkup = "<span>Selected Products</span>";
                       }
                       //if($("#"+$(this).attr('id')).hasClass('sc-rec-checkbox')){
                           descId=$(this).attr('id')+"desc";
                           skudesc=$("#"+descId).text()
                           priceId=$(this).attr('id')+"price";
                           skuPrice=$("#"+priceId).text();
                           skuPrice=skuPrice.replace(/[$,]/g,"");
                           //skauquanId=$(this).attr('id')+"quan";
                           skuquantity=$(this).val();
                           skuquantity=skuquantity!=""?parseInt(skuquantity):1;
                           skuPrice=skuPrice!=""?parseFloat(skuPrice):0.00;
                           skuPrice=skuPrice*skuquantity;
                           TotalPrice=TotalPrice+skuPrice;
                           addonsmarkup+='                            <div class="SC-SO-Prod-addon-item">';
                           addonsmarkup+='                                <div class="SC-SO-Prod-addon-item-name">';
                           addonsmarkup+='                                    <img src="images/custom/delete.png" class="sku-delete" id="'+$(this).attr('id')+'_1">';
                           addonsmarkup+='                                    <p title="'+skudesc+'">'+skudesc+'</p>';
                           addonsmarkup+='                                </div>';
                           addonsmarkup+='                                <div class="SC-SO-Prod-addon-item-price" style="display:flex;justify-content: space-around;align-items: flex-start;width: 200px">';
                           addonsmarkup+='                                    <p>'+skuquantity+'</p>';
                           addonsmarkup+='                                    <p>$'+skuPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
                           addonsmarkup+='                                    <p>$'+skuPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
                           addonsmarkup+='                                </div>';
                           addonsmarkup+='                            </div>';
                       //}
                           
                   }
               });
               $("#sc-rec-addons").html(addonsmarkup);
               $("#sc-rec-tot-price").text('$'+TotalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
           });
           //End:on change of quantity
           //Start:on Click of QTY zero popup
           $(document).on("","#sc-Qty-Zero-ok",function(){
               $("#sc-Qty-Zero").modal("hide");
           });
           //Start:delete the line item for summary markup
           $(document).on("click",".sku-delete",function(){
               var clickedid=$(this).attr('id');
               clickedid=clickedid.split('_');
               clickedid=clickedid[0];
               $("#"+clickedid).val("");
               addonsmarkup="",TotalPrice=TotalLineItemPrice;
               $('.sc-rec-checkbox').each(function(){
                   if($(this).val()!=""){
                       if(addonsmarkup.length==0){
                           addonsmarkup = "<span>Selected Products</span>";
                       }
                       //if($("#"+$(this).attr('id')).hasClass('sc-rec-checkbox')){
                           descId=$(this).attr('id')+"desc";
                           skudesc=$("#"+descId).text()
                           priceId=$(this).attr('id')+"price";
                           skuPrice=$("#"+priceId).text();
                           skuPrice=skuPrice.replace(/[$,]/g,"");
                           //skauquanId=$(this).attr('id')+"quan";
                           skuquantity=$(this).val();
                           skuquantity=skuquantity!=""?parseInt(skuquantity):1;
                           skuPrice=skuPrice!=""?parseFloat(skuPrice):0.00;
                           skuPrice=skuPrice*skuquantity;
                           TotalPrice=TotalPrice+skuPrice;
                           addonsmarkup+='                            <div class="SC-SO-Prod-addon-item">';
                           addonsmarkup+='                                <div class="SC-SO-Prod-addon-item-name">';
                           addonsmarkup+='                                    <img src="images/custom/delete.png" class="sku-delete" id="'+$(this).attr('id')+'_1">';
                           addonsmarkup+='                                    <p title="'+skudesc+'">'+skudesc+'</p>';
                           addonsmarkup+='                                </div>';
                           addonsmarkup+='                                <div class="SC-SO-Prod-addon-item-price" style="display:flex;justify-content: space-around;align-items: flex-start;width: 200px">';
                           addonsmarkup+='                                    <p>'+skuquantity+'</p>';
                           addonsmarkup+='                                    <p>$'+skuPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
                           addonsmarkup+='                                    <p>$'+skuPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
                           addonsmarkup+='                                </div>';
                           addonsmarkup+='                            </div>'; 
                       //}
                           
                   }
               });
               $("#sc-rec-addons").html(addonsmarkup);
               $("#sc-rec-tot-price").text('$'+TotalPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
           });
           //End:delete the line item for summary markup
           //start:no recommended products 
           if(prRecomrcdset.length==0){
               
               /*$("#SC-no-Reco-Prod").modal({
                   backdrop: 'static'
               });
               $("#SC-no-Reco-Prod").css({
                   "display": "flex",
                   "justify-content": "center",
                   "align-items": "center"
               });
               setTimeout(function() {
                       $("#SC-no-Reco-Prod").modal("hide");*/
                       var Bservice = '',inPS = '', outPS = '';
                       inPS  = SiebelApp.S_App.NewPropertySet();
                       outPS = SiebelApp.S_App.NewPropertySet();
                       inPS.SetProperty("Name","RecommendedView");
                       inPS.SetProperty("Value","N");
                       Bservice = SiebelApp.S_App.GetService("SessionAccessService");
                       outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
                       SiebelApp.S_App.GotoView("SC Create Sales Order View OUI","","","");
               //},2000);
               
           }
           else
               $("#_sweview").show();
           //End:no recommended products	
       }
   
       SCOrderEntryLineItemListAppletPR.prototype.EndLife = function () {
        SiebelAppFacade.SCOrderEntryLineItemListAppletPR.superclass.EndLife.apply(this, arguments);
           $("#custommaskoverlay").show();
           $("#_sweview").hide();
           
       }
       //code for intersection
       function intersect_all(lists)
       {
               if (lists.length == 0) return [];
               else if (lists.length == 1) return lists[0];
   
               var partialInt = lists[0];
               for (var i = 1; i < lists.length; i++)
               {
                   partialInt = intersection(partialInt, lists[i]);
               }
               return partialInt;
       }
       function intersection(array1,array2){
           return array1.filter(value => -1 !== array2.indexOf(value)); 
       }
       //code for exclude the products
       function excludeSkus(exparentskunumber,exchildskunumber){
           for(var i=0;i<exchildskunumber.length;i++){
               var index = exparentskunumber.indexOf(exchildskunumber[i]);
               if (index >= 0) {
               exparentskunumber.splice( index, 1 );
               }
           }
           return exparentskunumber
       }
       //header markup
       function recomemdedProductMarkUp(){
               var RecprodMarkup="",sproductName,skuNumber;
               var sLisPrice=scProfileAttr["ListPrice"];
               sLisPrice=sLisPrice==""?0.00:parseFloat(sLisPrice);
               sproductName=scProfileAttr["ProductName"];
               skuNumber=scProfileAttr["SCSKUNumber"];
               RecprodMarkup+='<body class="no-margin no-padding">';
               RecprodMarkup+='    <!-- this is the starting point for making markup. -->';
               RecprodMarkup+='    <div id="applet1">';
               RecprodMarkup+='        <div class="container-fluid no-margin no-padding">';
               RecprodMarkup+='            <!-- Header starts here/ make a common function for this header. so you can use anywhere in the app -->';
               RecprodMarkup+='            <div class="main-header-container">';
               RecprodMarkup+='                <div class="nav-header">';
               RecprodMarkup+='                    <div class="apply-for-finance">';
               RecprodMarkup+='                        <img src="images/custom/customize.png" />';
               RecprodMarkup+='                        <div>';
               RecprodMarkup+='                            <p class="no-margin">Customize Product - Other</p>';
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                    </div>';
               RecprodMarkup+='                    <div class="profile-block">';
               RecprodMarkup+='                        <div class="profile margin-right10" id="sc-accept-sku">';
               RecprodMarkup+='                            <div class="image-block finance-cancel-block">';
               /* RecprodMarkup+='                                <span class="SC-Con-button"></span>'; */
               RecprodMarkup+='                                   <button class="SC-Con-next" type="button">Next</button>';
               RecprodMarkup+='                            </div>';
               /* RecprodMarkup+='                            <span>Add To Cart</span>'; */
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                        <div class="profile" id="sc-reject-sku">';
               RecprodMarkup+='                            <div class="image-block finance-cancel-block">';
               /* RecprodMarkup+='                                <img src="images/custom/icon-cancel.png" class="cancel-finance">'; */
               RecprodMarkup+='                                    <button class="SC-Con-next" type="button" style="margin-left: 25px !important;background: #35b9e8;">Cancel</button>';
               RecprodMarkup+='                            </div>';
               /* RecprodMarkup+='                            <span>Cancel</span>'; */
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                    </div>';
               RecprodMarkup+='                </div>';
               RecprodMarkup+='            </div>';
               RecprodMarkup+='            <!-- Header ends here -->';
               RecprodMarkup+='            <div class="container-fluid no-margin sc-main-data-container SC-data-container no-recents white-bg">';
               RecprodMarkup+='                <div class="SC-SO-main-block" id="sc-rec-summary">';
               RecprodMarkup+='                    <div class="SC-SO-Prod-info-main">';
               RecprodMarkup+='                        <div class="SC-SO-Prod-items">';
               RecprodMarkup+='                            <div class="title-sku">';
               RecprodMarkup+='                                <p class="product-title" title="'+sproductName+'">'+sproductName+'</p>';
               RecprodMarkup+='                                <span title="'+skuNumber+'">SKU#'+skuNumber+'</span>';
               RecprodMarkup+='                            </div>';
               RecprodMarkup+='                            <div class="header-items">';
               RecprodMarkup+='                                <div class="header-item">';
               RecprodMarkup+='                                    <p class="item-title">QUANTITY</p>';
               RecprodMarkup+='                                    <p class="item-value">1</p>';
               RecprodMarkup+='                                </div>';
               RecprodMarkup+='                                <div class="header-item">';
               RecprodMarkup+='                                    <p class="item-title">LIST PRICE</p>';
               RecprodMarkup+='                                    <p class="item-value">$'+sLisPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
               RecprodMarkup+='                                </div>';
               RecprodMarkup+='                                <div class="header-item">';
               RecprodMarkup+='                                    <p class="item-title">YOUR PRICE</p>';
               RecprodMarkup+='                                    <p class="item-value">$'+TotalLineItemPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
               RecprodMarkup+='                                </div>';
               RecprodMarkup+='                            </div>';
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                        <div class="SC-SO-Prod-addon-items-block" id="sc-rec-addons">';
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                        <div class="SC-SO-total-block">';
               RecprodMarkup+='                            <div class="total-item">';
               RecprodMarkup+='                                <p>TOTAL :</p>';
               RecprodMarkup+='                                <p class="amount" id="sc-rec-tot-price">$'+TotalLineItemPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')+'</p>';
               RecprodMarkup+='                            </div>';
               RecprodMarkup+='                        </div>';
               RecprodMarkup+='                    </div>';
               RecprodMarkup+='                    <div class="SC-SO-addon-options-panel" id="recomended-sku-header">';
               RecprodMarkup+='                    </div>';
               RecprodMarkup+='                    </div>';
               RecprodMarkup+='                </div>';
               RecprodMarkup+='            </div>';
               RecprodMarkup+='<div class="modal fade SC-SO-add-popup" id="SC-no-Reco-Prod" role="dialog">';
               RecprodMarkup+='    <div class="SC-modal modal-orange-bg">';
               RecprodMarkup+='        <div class="modal-dialog">';
               RecprodMarkup+='            <div class="modal-content less-height">';
               RecprodMarkup+='               <div class="text">';
               RecprodMarkup+='                   <span class="SC-span-width add-margin" style="font-size:20px !important">No Recommended Products found for  selected product/customizations.</span>';
               RecprodMarkup+='                </div>';
               RecprodMarkup+='           </div>';
               RecprodMarkup+='       </div>';
               RecprodMarkup+='    </div>';
               RecprodMarkup+='</div>';
               RecprodMarkup+='<div class="modal fade SC-SO-add-popup" id="SC-qty-zero" role="dialog">';
               RecprodMarkup+='    <div class="SC-modal modal-orange-bg">';
               RecprodMarkup+='        <div class="modal-dialog">';
               RecprodMarkup+='            <div class="modal-content less-height">';
               RecprodMarkup+='               <div class="text">';
               RecprodMarkup+='                   <span class="SC-span-width add-margin" style="font-size:20px !important">QTY Should be Greater Than 0.</span>';
               RecprodMarkup+='                </div>';
               RecprodMarkup+='             <button class="SC-ok-button" id="sc-Qty-Zero-ok">ok</button>';
               RecprodMarkup+='           </div>';
               RecprodMarkup+='       </div>';
               RecprodMarkup+='    </div>';
               RecprodMarkup+='</div>';
               RecprodMarkup+='        </div>';
               RecprodMarkup+='        <div class="scroll-to-top" id="rec-scroll-top">';
               RecprodMarkup+='			<a href="#sc-rec-summary">';
               RecprodMarkup+='            <img src="images/custom/scroll-top.png"></a>';
               RecprodMarkup+='        </div>';
               RecprodMarkup+='        </div>';
               RecprodMarkup+='    </body>';
               return RecprodMarkup;
       }
       //code for pole display
       function poleDisplay(ProductDesc,ProQuantity,ProductPrice){
           var DISA_POLEDISPLAY = "plugin_poledisplay"; 
               var consts = SiebelJS.Dependency("SiebelApp.Constants"); 
               consts.set("WS_" + DISA_POLEDISPLAY.toUpperCase() + "_VERSION", "1.0.0"); 
               var DISAHandler = null;
               callPoleDisplay(ProductDesc,ProQuantity,ProductPrice);
               function callPoleDisplay(ProductDesc,ProQuantity,ProductPrice) {
                   console.log("Calling DISA Pole Display PLUGIN with : ");
                   var poleHandler = getDISAHandler.call(this);
                    // here we create an object containing data which the Java application will read.
                    // Neither "Command", nor "GetSysInfo" are DISA specific.
                    // The shape and content of the message is entirely up to the developer.
                   var msgJSON = {}; 
                   //msgJSON["Command"] = "Ready"; 
                   //msgJSON = getLines(OrderId,subTotal);
                   msgJSON={};
                   msgJSON = getLinedetails(ProductDesc,ProQuantity,ProductPrice);
                   poleHandler.SendMessage(msgJSON); 
                    // the message is sent asychronously, so once the command is sent, nothing further happens
                    // within the PR/PM until a message is received.
               }
               function getDISAHandler() {
                    if (DISAHandler === null) {
                     DISAHandler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_POLEDISPLAY);
                    // communications with DISA are asynchronous. We define handler functions here to deal with
                    // possible responses from DISA, such as a message or communication failure conditions.
                     DISAHandler.OnMessage = onWSMessage.bind(this);
                     DISAHandler.OnFail = onWSSendFail.bind(this);
                     DISAHandler.OnClose = onWSClose.bind(this);
                    }
                    return DISAHandler;
               }
               function getLinedetails(proDesc,proQuant,proPrice) { 
                    // Adds other error handling logic 
                       var poleInfo = [];			
                       poleInfo.push({ 
                           "Command" : "Ready",
                           "ProductDesc"  : proDesc,
                           "Quantity"     : proQuant,
                           "Price"       : proPrice
                       });
                       SiebelJS.Log(JSON.stringify(poleInfo));
                       var poleData = {};
                       poleData["PoleDisplay"] = poleInfo;
                       SiebelJS.Log(JSON.stringify(poleData));
                       //SiebelApp.S_App.LogOff();
                       return poleData;
               }
               function onWSMessage(msg) {
                    // this is the result of callDISAPlugin if all goes well
                     handleMsg.call(this,msg);	 
               }
               // Normally this indicates something wrong with communication attempt to operator at DISA
               // Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
               // Maybe because the version number at two sides are not matched, operator version should be equal or newer
               // Reset state or other variables if necessary
               function onWSSendFail() {
                   handleException("Failed to send message to DISA");
               }
               // This indicates Siebel OpenUI with DISA connection was lost
               // Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons
               // Maybe because DISA exited (by user) or crashed
               // Reset state or other variables if necessary
               function onWSClose() {
                   handleException("Connection to DISA was lost");
               }
   
               // Called by onWSMessage event handler
               function handleMsg(msg) {
                   // Log the message received
                   console.log("JSON message received: " + JSON.stringify(msg) + "");
               }
   
               // Called by onWSClose or onWSSendFail event handler
               function handleException(msg) {
                   //Add other error handling logic
                   console.log("Handle Exception" + msg);
                   //alert("Handle Exception" + msg);
               }
               
       }
       return SCOrderEntryLineItemListAppletPR;
      }()
     );
     return "SiebelAppFacade.SCOrderEntryLineItemListAppletPR";
    })
   }
   