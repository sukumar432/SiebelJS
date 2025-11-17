/*********************************************************************************************************
Purpose: Added this following code Contains the Contact List Applet Markup
Author: Siva ADDALA (SADDALA) : Created on 10 OCT 2017.
**********************************************************************************************************/

if (typeof(SiebelApp.SCContactSearchMarkup) === "undefined") {
 SiebelJS.Namespace("SiebelApp.SCContactSearchMarkup");
 define("siebel/custom/SelectComfort/SCContactSearchMarkup", ["siebel/phyrenderer","siebel/custom/SelectComfort/SC_OUI_Markups"],
  function () {
   SiebelApp.SCContactSearchMarkup = (function ()  {
	var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
	var ContactMarkup=new SCContactSearchMarkup();
    function SCContactSearchMarkup(pm) {}
	
	//Method returning Markup
	SCContactSearchMarkup.prototype.SCContactMarkup=function(){
	var markup="";
	markup+='<html>';
	markup+='<body class="no-margin no-padding">';
	markup+='    <!-- this is the starting point for making markup. -->';
	markup+='    <div id="applet1">';
	markup+='        <div class="container-fluid no-margin no-padding">';
	markup+='            <div class="main-header-container">';
	markup+='                <div class="nav-header">';
	markup+='				</div>';
	markup+='                <div class="recents-header" style="border-bottom-style: solid; border-width: 1px;" id="recents-header">';
	markup+='                </div>';
	markup+='                <div class="recents-header" id="ifit-recents-header">';
	markup+='                </div>';
	markup+='            </div>';
	markup+='            <!-- Header ends here -->';
	markup+='            <div class="container-fluid no-margin sc-main-data-container SC-data-container no-padding" style="padding-bottom:150px !important">';
	markup+='			<!--list-->';
	markup+='            </div>';
	markup+='        </div>';
	markup+='        <div class="modal fade SC-S-sneakpeak" id="contact-details" role="dialog">';
	markup+='        </div>';
	markup+='        <!-- Contact sneakpeak ends here -->';
	markup+='        <!-- Add Store Change Location Starts here-->';
	markup+='        <div class="modal fade SC-add-storelocation" id="SC-add-storelocation" role="dialog">';
	markup+='        </div>';
	markup+='        <!-- Add Store Change Location ends here-->';
	markup+='        <!-- Add contact modal starts here. There is JS snippet for this modal please dont miss that.-->';
	markup+='        <div class="modal fade SC-create-entity" id="SC-add-contact">';
	markup+='        <!--add con-->';
	markup+='		</div>';
	markup+='        <!-- Add contact modal ends here -->';
	markup+='    </div>';
	markup+='</body>';
	markup+='</html>';
	return markup;
	};	
	
	return ContactMarkup;
   }()
  );
 return "SiebelApp.SCContactSearchMarkup";
 })
}
