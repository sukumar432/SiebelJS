/****************************************************
	CREATED BY SCHERKU
	CREATED FOR SC SALES EFFICIENCY OPEN UI
	CREATED ON 10/10/2017

****************************************************/
if (typeof(SiebelApp.SCSalesOrderSearchMarkup) === "undefined") {
 SiebelJS.Namespace("SiebelApp.SCSalesOrderSearchMarkup");
 define("siebel/custom/SelectComfort/SCSalesOrderSearchMarkup", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Definitions"],
  function () {
	 var recordSet;
     SiebelApp.SCSalesOrderSearchMarkup = (function ()  {
	 var SalesOrder=new SCSalesOrderSearchMarkup();
	 var markup="";
	 var SCOUIDefinitions = SiebelJS.Dependency("SiebelApp.SC_OUI_Definitions");
   function SCSalesOrderSearchMarkup(pm) {}
	  //Method returning Search Markup
	  SCSalesOrderSearchMarkup.prototype.SCSalesOrderSearchMarkup=function(){
		markup="";
		markup+='      <html>';
		markup+='         <body class="no-margin no-padding">';
		markup+='           <div id="applet1">';
		markup+='             <div class="container-fluid no-margin no-padding">';
		markup+='               <div class="main-header-container">';
		markup+='                  <div class="nav-header">';
		markup+='                    </div>';
		markup+='                     </div>';
		markup+='                            <div class="container-fluid no-margin sc-main-data-container SC-data-container no-padding">';
		markup+='               </div>';
		markup+='              </div>';
		markup+='                           <div class="modal fade SC-add-storelocation" id="SC-add-storelocation" role="dialog">';
		markup+='           </div>';
		markup+='         </div>';
		markup+='</body>';
		markup+='</html>';
	    return(markup);
	 }
	 return SalesOrder;
    }()
  );
 return "SiebelApp.SCSalesOrderMarkup";
 })
}
