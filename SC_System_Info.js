if (typeof SiebelApp.SC_System_Info === "undefined") { 
     SiebelJS.Namespace("SiebelApp.SC_System_Info"); 
 
     define("siebel/custom/SelectComfort/SC_System_Info", ["siebel/custom/SelectComfort/bootstrap.min","siebel/custom/SelectComfort/jquery.validate.min"], 
	 function () { 
         SiebelApp.SC_System_Info = (function () { 
            var DISA_SYSINFOHANDLER = "plugin_sysinfo"; 
			var bootstrapTooltip = $.fn.tooltip.noConflict();
			$.fn.bstooltip = bootstrapTooltip;
            var consts = SiebelJS.Dependency("SiebelApp.Constants"); 
			consts.set("WS_" + DISA_SYSINFOHANDLER.toUpperCase() + "_VERSION", "1.0.0"); 
			
            function SC_System_Info() { 
			var sccreateorderSrchSpec = [],sccreateorderSortSpec = [];
			sccreateorderSrchSpec[0] = "[Type]= 'SC_SUB_TYPE' and [Active] = 'Y' and [Parent]='Sales Order'";
			sccreateorderSortSpec[0] = "Order By";
			sccreateorderSrchSpec[1] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y'";
			sccreateorderSortSpec[1] = "Order By";
			sccreateorderSrchSpec[2] = "[Type]= 'SAP_SO_HEADER_DELIV_BLOCK' and [Active] = 'Y'";
			sccreateorderSortSpec[2] = "Order By";
			sccreateorderSrchSpec[3] = "[Type]= 'SC_CUSTOMER_CATEGORY' and [Active] = 'Y' and [Name]='Insider'";
			sccreateorderSortSpec[3] = "Order By";
			sccreateorderSrchSpec[4] = "[Type]= 'SC_MANUAL_DISCOUNT_REASON' and [Active] = 'Y'";
			sccreateorderSortSpec[4] = "Order By";
			sccreateorderSrchSpec[5] = "[Type]= 'DISCNT_PERCENT' and [Active] = 'Y'";
			sccreateorderSortSpec[5] = "Order By";
			sccreateorderSrchSpec[6] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='In Progress'";
			sccreateorderSortSpec[6] = "";
			sccreateorderSrchSpec[7] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Siebel Error'";
			sccreateorderSortSpec[7] = "";
			sccreateorderSrchSpec[8]="[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='DIRECT'";
			sccreateorderSortSpec[8]="Order By";
			sccreateorderSrchSpec[9]="[Type]= 'DIVISION_TYPE' and [Active] = 'Y' and [Name]='ECOM'";
			sccreateorderSortSpec[9]="Order By";
			sccreateorderSrchSpec[10]="[Type]= 'PROD_CD' and [Active] = 'Y' and [Name]='Promotion'";
			sccreateorderSortSpec[10]="Order By";
			sccreateorderSrchSpec[11]="[Type]= 'SC_DISA_ENABLE_FLAG' and [Active] = 'Y' and [Name]='Enable Disa Flag'";
			sccreateorderSortSpec[11]="Order By";
			sccreateorderSrchSpec[12]="[Active]='Y' AND [Type]='CANCEL_REASON_TYPE'";
			sccreateorderSortSpec[12]="";
			sccreateorderSrchSpec[13]="[Type]= 'MR_MS' AND [Active]='Y'";
			sccreateorderSortSpec[13]="";
			sccreateorderSrchSpec[14]="[Type]= 'FINS_SUFFIX_MLOV' AND [Active]='Y'";
			sccreateorderSortSpec[14]="";
			sccreateorderSrchSpec[15]="[Parent]= 'Package' AND [Active]='Y' AND [Type]='OFFER_MEDIA'";
			sccreateorderSortSpec[15]="";
			sccreateorderSrchSpec[16]="[Type]= 'SC_SLEEP_NUM' AND [Active]='Y'";
			sccreateorderSortSpec[16]="Order By";
			sccreateorderSrchSpec[17]="[Type]= 'SC_BLKLSTD_RSN' AND [Active]='Y'";
			sccreateorderSortSpec[17]="";
			sccreateorderSrchSpec[18]="[Type]= 'SC_LEAD_RANK' AND [Active]='Y'";
			sccreateorderSortSpec[18]="";
			sccreateorderSrchSpec[19]="[Type]= 'SC_SERIES_BED' AND [Active]='Y'";
			sccreateorderSortSpec[19]="";
			sccreateorderSrchSpec[20]="[Type]= 'SC_BASE' AND [Active]='Y'";
			sccreateorderSortSpec[20]="";
			sccreateorderSrchSpec[21]="[Type]= 'SC_CON_SIZE' AND [Active]='Y'";
			sccreateorderSortSpec[21]="";
			sccreateorderSrchSpec[22]="[Type]= 'SC_BEDNG_COL' AND [Active]='Y'";
			sccreateorderSortSpec[22]="";
			sccreateorderSrchSpec[23]="[Type]= 'SC_PERSNLTY_TYPE' AND [Active]='Y'";
			sccreateorderSortSpec[23]="";
			sccreateorderSrchSpec[24]="[Type]= 'SC_HOT_BUTTON' AND [Active]='Y'";
			sccreateorderSortSpec[24]="";
			sccreateorderSrchSpec[25]="[Type]= 'SC_SPL_GRP' AND [Active]='Y'";
			sccreateorderSortSpec[25]="";
			sccreateorderSrchSpec[26]="[Type]= 'SC_OPTY_PROB' AND [Active]='Y'";
			sccreateorderSortSpec[26]="";
			sccreateorderSrchSpec[27]="[Type]= 'OPTY_CHANNEL_TYPE' AND [Active]='Y'";
			sccreateorderSortSpec[27]="";
			sccreateorderSrchSpec[28]="[Type]= 'SR_TYPE' AND [Active]='Y' AND [Name]='Incident'";
			sccreateorderSortSpec[28]="";
			sccreateorderSrchSpec[29]="[Type]= 'SC_ASSET_QTY'";
			sccreateorderSortSpec[29]="Order By";
			  
			sccreateorderSrchSpec[30] = "[Type]= 'SC_PAYMENT_YEAR' and [Active] = 'Y'";
			sccreateorderSortSpec[30] = "";
			sccreateorderSrchSpec[31] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Submitted'";
			sccreateorderSortSpec[31] = "";
			sccreateorderSrchSpec[32] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Closed'";
			sccreateorderSortSpec[32] = "";
			sccreateorderSrchSpec[33] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Cancelled'";
			sccreateorderSortSpec[33] = "";
			sccreateorderSrchSpec[34] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Complete'";
			sccreateorderSortSpec[34] = "";
			sccreateorderSrchSpec[35] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Booked'";
			sccreateorderSortSpec[35] = "";
			sccreateorderSrchSpec[36] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Payment In Progress'";
			sccreateorderSortSpec[36] = "";
			sccreateorderSrchSpec[37] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Oracle Error'";
			sccreateorderSortSpec[37] = "";
			sccreateorderSrchSpec[38] = "[Type]= 'FS_ORDER_STATUS' and [Active] = 'Y' and [Name]='Hold'";
			sccreateorderSortSpec[38] = "";
			sccreateorderSrchSpec[39] = "[Type]= 'FUNDRQ_STATUS' and [Active] = 'Y'";
			sccreateorderSortSpec[39] = "";
			sccreateorderSrchSpec[40] = "[Order By] >= 1 and [Order By] <= 52 and [Type]= 'SC_DRIVER_LICENCE_STATE' and [Active] = 'Y'";
			sccreateorderSortSpec[40] = "";
			sccreateorderSrchSpec[41] = "[Type]= 'PAYMENT_METHOD_CODE' and [Active] = 'Y'";
			sccreateorderSortSpec[41] = "Order By";
			sccreateorderSrchSpec[42] = "[Type]= 'SC_PAYMENT_MONTH_NUMBER' and [Active] = 'Y'";
			sccreateorderSortSpec[42] = "";
			sccreateorderSrchSpec[43] = "[Order By] >= 1 and [Order By] <= 52 and [Type]= 'STATE_ABBREV' and [Active] = 'Y'";
			sccreateorderSortSpec[43] = 'Order By';
			sccreateorderSrchSpec[44] = "[Type]= 'COUNTRY' AND [Low] IS NOT NULL AND [Active]='Y'";
			sccreateorderSortSpec[44] = 'Order By';
			sccreateorderSrchSpec[45] = "[Type]= 'SC_REASON_VISIT' AND [Active]='Y'";
			sccreateorderSortSpec[45] = 'Order By';
			sccreateorderSrchSpec[46] =	"[Type]= 'SC_CA_APP_STATUS' AND [Active]='Y'";
			sccreateorderSortSpec[46] = "";
			sccreateorderSrchSpec[47] = "[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='B - Commercial'";
			sccreateorderSortSpec[47] = "Order By";
			sccreateorderSrchSpec[48] = "[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y' and [Name]='S - Wholesale'";
			sccreateorderSortSpec[48] = "Order By";
			sccreateorderSrchSpec[49] = "[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y' and [Name]='30 NET'";
			sccreateorderSortSpec[49] = "Order By";
			sccreateorderSrchSpec[50] = "[Type]= 'SC_PYMNT_TERM' and [Active] = 'Y'";
			sccreateorderSortSpec[50] = "Order By";
			sccreateorderSrchSpec[51] = "[Type]= 'COMM_METHOD' and [Active] = 'Y'";
			sccreateorderSortSpec[51] = "Order By";
			sccreateorderSrchSpec[52] = "[Type]= 'CUT_ACCOUNT_TYPE' and [Active] = 'Y'";
			sccreateorderSortSpec[52] = "Order By";
			sccreateorderSrchSpec[53] = "[Type]= 'SC_MANUAL_ORDER_REASON' and [Active] = 'Y'";
			sccreateorderSortSpec[53] = "Order By";
			sccreateorderSrchSpec[54] = "[Type]= 'SC_EVENT_TYPE_REASON1' and [Active] = 'Y' AND [Parent]='Revision'";
			sccreateorderSortSpec[54] = "Order By";
			sccreateorderSrchSpec[55] = "[Type]= 'SC_SETTIMEOUT_RECEIPT' and [Active] = 'Y' AND [Name]='TimeOut'";
			sccreateorderSortSpec[55] = "Order By";
			sccreateorderSrchSpec[56] = "[Type]= 'FIN_DISPOSITION' and [Active] = 'Y'";
			sccreateorderSortSpec[56] = "Order By";
			sccreateorderSrchSpec[57] = "[Type]= 'X_SC_CONTROLBOX_SKU' and [Active] = 'Y'";
			sccreateorderSortSpec[57] = "Order By";
			sccreateorderSrchSpec[58] = "[Type]= 'IPAD_FINANCE' AND [Name] = 'Store Password' AND [Active] = 'Y'";
			sccreateorderSortSpec[58] = "Order By";
			sccreateorderSrchSpec[59] = "[Type] = 'IPAD_FINANCE' AND [Name] = 'ENABLED' AND [Active] = 'Y'";
			sccreateorderSortSpec[59] = "Order By";
			sccreateorderSrchSpec[60] = "[Type] = 'SC_EVENT_TYPE_REASON1' AND [Name] = 'Internally Initiated' AND [Active] = 'Y'";
			sccreateorderSortSpec[60] = "Order By";
			sccreateorderSrchSpec[61] = "[Type] = 'EVENT_STATUS' AND [Active] = 'Y'";
			sccreateorderSortSpec[61] = "Order By";
			sccreateorderSrchSpec[62] = "[Type] = 'SC_SYNCHRONY_REFRESH_DAYS' AND [Name] = 'Number Of Days' AND [Active] = 'Y'";
			sccreateorderSortSpec[62] = "";
			sccreateorderSrchSpec[63] = "[Type] = 'SC_BIP_TACOS_REPORTS' AND [Name] = 'IsSignatureEnabled' AND [Active] = 'Y'";
			sccreateorderSortSpec[63] = ""; 
			sccreateorderSrchSpec[64] = "[Type] = 'SC_OPTY_STATUS' AND [Active] = 'Y'";
			sccreateorderSortSpec[64] = "Order By"; 
			sccreateorderSrchSpec[65] = "[Type] = 'SC_IS_STORE_LEAD' AND [Active] = 'Y'";
			sccreateorderSortSpec[65] = "Order By";
			sccreateorderSrchSpec[66] = "[Type] = 'MANUAL_ORDER_REASON' AND [Active] = 'Y'";
			sccreateorderSortSpec[66] = "Order By";
			sccreateorderSrchSpec[67] = "[Type] = 'MANUAL_ORDER_SUB_REASON' AND [Active] = 'Y' AND [Parent] = 'Customer Appeasement'";
			sccreateorderSortSpec[67] = "Order By";
			sccreateorderSrchSpec[68] = "[Type] = 'MANUAL_ORDER_SUB_REASON' AND [Active] = 'Y' AND [Parent] = 'System Issue'";
			sccreateorderSortSpec[68] = "Order By";
			sccreateorderSrchSpec[69] = "[Type] = 'MANUAL_ORDER_SUB_REASON' AND [Active] = 'Y' AND [Parent] = 'Other'";
			sccreateorderSortSpec[69] = "Order By";
			sccreateorderSrchSpec[70] = "[Type]= 'SC_IFIT_RECENT' and [Active] = 'Y'"; //Added by APRAKASH FOR SFSTRY0001330
			sccreateorderSortSpec[70] = "Order By";
			sccreateorderSrchSpec[71] = "[Type]= 'X_SC_SECURE_PAYMENT' and [Active] = 'Y' and [Name]='TURN_ON'";
			sccreateorderSortSpec[71] = "";
			
				//SC_OUI_Methods.SCSetOrderLoVs(sccreateorderSrchSpec, sccreateorderSortSpec);
				//SC_OUI_Methods.SCGetOrderProfileAttr("SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI");
                
				var handler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_SYSINFOHANDLER); 
                 // Communications with DISA are asynchronous. 
                 // We define handler functions here to deal with responses from DISA, 
                 // such as a message or communication failure conditions. 
                 handler.OnClose = onWSClose.bind(this); 
                 handler.OnFail = onWSSendFail.bind(this); 
                 handler.OnMessage = onWSMessage.bind(this); 

                 // Tell DISA plugin that OpenUI handler is ready 
                 // "Command" and "Ready" are custom message protocol. 
                 // The shape and content of the message is entirely up to the developer. 
                 SiebelApp.EventManager.addListner("AppInit", function () { 
                     var userType =  SiebelApp.S_App.GetProfileAttr("SC Store User");
                     var machineInfo = "";
                     var ip = "";
                     machineInfo = SiebelApp.S_App.GetProfileAttr("MachineInfo");
                     ip = SiebelApp.S_App.GetProfileAttr("IP");
					 SiebelJS.Log("machineInfo : " + machineInfo ); 
					 SiebelJS.Log("ip : " + ip ); 
					 SiebelJS.Log("userType : " + userType );
					//Get the login user has SC Sales Efficiency Open UI Responsibilty Exists or not
					var Custom_Service = SiebelApp.S_App.GetService("SC CTI UI Service");
					var InputArg = SiebelApp.S_App.NewPropertySet();
					var OutputArg = SiebelApp.S_App.NewPropertySet();
					OutputArg = Custom_Service.InvokeMethod("IsCustomUI", InputArg);
					var Child_OutArg = OutputArg.GetChild(0);
					var BS_Data_Res="";
					BS_Data_Res= Child_OutArg.GetProperty("Result");
					SiebelJS.Log("BS_Data_Responsibility--" +BS_Data_Res);
					//Added code for Hide the alert Message
						(function(proxied) {
						  window.alert = function() {
							if(arguments[0].includes("Failed to connect to Desktop Integration Siebel Agent on your machine"))
							{
							}
							else
							return proxied.apply(this, arguments);
						  };
						})(window.alert); 
                     if( userType === 'Y' && machineInfo === "" && ip === ""&&BS_Data_Res == 1){
						SiebelJS.Log("calling DISA");
                        var msgJSON = {}; 
                        msgJSON["Command"] = "GetSysInfo"; 		    
                        handler.SendMessage(msgJSON); 
                     }
					
						 //Start:Code for to get the Profile Attributes 
						var Custom_Service="",Input_BS="",Out_BS="";
						var scOrderProfileAttr=[],profileAttrs=["SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP,P2PEFlag,EnableUPT"];
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
								scOrderProfileAttr = JSON.parse(BS_Data);
								localStorage.setItem("ProfileAttr",JSON.stringify(scOrderProfileAttr));
								localStorage.setItem("EnableUPT",scOrderProfileAttr["EnableUPT"]);
								
						
						}
						//End:Code for to get the Profile Attributes
						
						var isSafariInIdevice = function(){
						   if (/Safari[\/\s](\d+\.\d+)/.test(windows.navigator.userAgent)) {
							  return 'ontouchstart' in window && detectOs() === "mac";      
						   }
						   return false;
						};
						
						if( (/iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) ) {
						//if(isSafariInIdevice){
							var Bservice = '',inPS = '', outPS = '';
							inPS  = SiebelApp.S_App.NewPropertySet();
							outPS = SiebelApp.S_App.NewPropertySet();
							inPS.SetProperty("Name","Device");
							inPS.SetProperty("Value","Tablet");
							Bservice = SiebelApp.S_App.GetService("SessionAccessService");
							outPS = Bservice.InvokeMethod("SetProfileAttr",inPS);
						};
					
					 //Added code for LocalStorage TimeStamp
				var nowDate = new Date(); 
				var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
				var localStorageDate=localStorage.getItem("SessionDate");
				if(localStorageDate==null ||localStorageDate != date){
				//Start:Code for to get the Lov Vales
				var Custom_Service="",Input_BS="",Out_BS="",scAttrNames="";
				var scOrderLovValues=[],lovvalues="";
				Custom_Service = SiebelApp.S_App.GetService("SC Get Profile Attribute BS");
				Input_BS = SiebelApp.S_App.NewPropertySet();
				Out_BS = SiebelApp.S_App.NewPropertySet();
				Input_BS.SetProperty("LoVSearchSpecArray", sccreateorderSrchSpec);
				Input_BS.SetProperty("LoVSortSpecArray", sccreateorderSortSpec);
				Out_BS = Custom_Service.InvokeMethod("GetLovs", Input_BS);
				var Child_BS = Out_BS.GetChild(0);
				var BS_Data = Child_BS.GetProperty("OutPutArray");
				if(BS_Data!="No Records"){
						
						scOrderLovValues = JSON.parse(BS_Data);
						
				}
				for(var i=0;i<sccreateorderSrchSpec.length;i++){
					lovvalues=scOrderLovValues[sccreateorderSrchSpec[i]];
					lovvalues=lovvalues.split("|");
					scOrderLovValues[sccreateorderSrchSpec[i]]=lovvalues;
				}
				localStorage.setItem("SCLOVSOUI",JSON.stringify(scOrderLovValues));
				//End:Code for to get the Lov Vales
				
				//Start:code for to get the Catalog ids
				var SearchSpecification="",InPS="",FieldsArray="",Service="",PriceList="",OutPS="",ChildCount="",Child="",BSData="",RecordSet="";
				InPS=SiebelApp.S_App.NewPropertySet();
				OutPS=SiebelApp.S_App.NewPropertySet();
				SearchSpecification="[Catalog Type] = LookupValue('CTLG_TYPE', 'Buying') AND [Active] = 'Y' AND [Correct Effective Dates] = 'Y'";
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
				if(BSData!="}"){
					RecordSet=new Array; 
					RecordSet = BSData.split(";");
					localStorage.setItem("SCCatalogIdsOUI",JSON.stringify(RecordSet));
				}
				//End:code for to get the Catalog ids
				//Start: Code for to get the PriceList Ids
					InPS=SiebelApp.S_App.NewPropertySet();
					OutPS=SiebelApp.S_App.NewPropertySet();
					InPS.SetProperty("BO","Admin Price List");
					InPS.SetProperty("BC","Price List");
					FieldsArray=["Name","Id"];
					InPS.SetProperty("FieldsArray",FieldsArray);
					InPS.SetProperty("SearchSpecification", "[Name]='STANDARD PRICE LIST'");			
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
				//End:code for to get the PriceList Ids
				localStorage.setItem("SessionDate",date);
			}
                 }, this); 
 
 
                 return handler; 
             } 

             // This indicates Siebel OpenUI with DISA connection was lost 
             // Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons 
             // Maybe because DISA exited (by user) or crashed 
             // Reset state or other variables if necessary 
             function onWSClose() { 
                 handleException("Connection to DISA was lost"); 
             } 
 
 
             // Normally this indicates something wrong with communication attempt to operator at DISA 
             // Maybe because Siebel OpenUI never establishes connection with DISA due to various reasons 
             // Maybe because the version number at two sides are not matched, operator version should be equal or newer 
             // Reset state or other variables if necessary 
             function onWSSendFail() { 
                 handleException("Failed to send message to DISA"); 
             } 
 
 
             function onWSMessage(msg, fileName) { 
                 handleMsg.call(this, msg); 
             } 
 		
 
             // Called by onWSMessage event handler 
             function handleMsg(msg) { 
			 SiebelJS.Log("SC_System_Info: JSON message received: " + JSON.stringify(msg)); 
                         // HERE add your own business logic when receiving messages from DISA, like phone number 
			 var machineInfo = msg["MachineInfo"];
			 var ip = msg["HostAddress"];
			 var locationId = msg["LocationId"];
			 var register = msg["RegisterId"];
			 //03062019: VALLA : Added for Prompt Conformation
			 var promptConfirmFlag = msg["PromptConfirmFlag"];
			 localStorage.setItem("promptConfirmFlag",promptConfirmFlag);
			 
			 var P2PEFlag = null;
			 P2PEFlag = msg["P2PE_Flag"];
		     if(P2PEFlag === null || P2PEFlag === ""){
				P2PEFlag = msg["CUP2PE_Flag"];
	         }	
			 var machineName = msg["HostName"];
			 var teminalName = msg["TerminalName"];						 
			 if(ip === null || ip ==="" || locationId === null || locationId ===""){
				handleException("Please check Registry");
			 }
			 else{
			 	var registerId = "R" + register;
		         	// set profile Attribute	
			 	var inPS  = SiebelApp.S_App.NewPropertySet();
			 	var outPS = SiebelApp.S_App.NewPropertySet();
		 	 	var bService="";
		 	 	inPS.SetProperty("MachineInfo",locationId +"_"+ registerId );
			 	inPS.SetProperty("IP",ip);
				inPS.SetProperty("P2PEFlag",P2PEFlag);
				inPS.SetProperty("MachineName",machineName);
				inPS.SetProperty("TerminalName",teminalName);
				inPS.SetProperty("PromptConfirmFlag",promptConfirmFlag);
			 	SiebelJS.Log("Invoking Business Service");
			 	bService = SiebelApp.S_App.GetService("SC Custom Query Simplified"); //get service
			 	outPS = bService.InvokeMethod("GetMachineInfo",inPS); 
				//SPATIBAN:added code for update the user location with DISA Location
				//VENKATESH-17AUG2024-Added for Adyen Payment Transformation Program
				var sBservice1 = '';
				var inPS1 = '';
				var outPS1 = '';
				inPS1 = SiebelApp.S_App.NewPropertySet();
				outPS1 = SiebelApp.S_App.NewPropertySet();
				inPS1.SetProperty("Name", "Terminal_Register");
				inPS1.SetProperty("Value",teminalName);
				sBservice1 = SiebelApp.S_App.GetService("SessionAccessService");
				if(sBservice1){
				outPS1 = sBservice1.InvokeMethod("SetProfileAttr", inPS1);
				}
				//VENKATESH-17AUG2024-End of Code for Adyen Payment Transformation Program
				
				var scdisaloc="";
				scdisaloc=theApplication().GetProfileAttr("SCStoreName");
				if(scdisaloc!="" && scdisaloc!="undefined" && scdisaloc !=undefined){
					var InPS = SiebelApp.S_App.NewPropertySet();
					var OutPS = SiebelApp.S_App.NewPropertySet();
					var Service = SiebelApp.S_App.GetService("SC UpdateStores");
					OutPS=Service.InvokeMethod("SetDisaStores", InPS);
					var BS_Child=OutPS.GetChild(0);
					if(BS_Child.GetFirstProperty()=="LocationName"){
						$("#SC-add-store-location").addClass("SC-readonly");
						var scStoreName=BS_Child.GetProperty("LocationName");
						$("#storename").attr("title",scStoreName);
						$("#StoreTitle").attr("title",scStoreName);
						scStoreName=scStoreName.substring(0,10);
						$("#storename").text(scStoreName);
					}
				}
				
			}				  
					//Start:Code for to get the Profile Attributes 
						var Custom_Service="",Input_BS="",Out_BS="";
						var scOrderProfileAttr=[],profileAttrs=["P2PEFlag,SC Primary Division Type,SC Store Number,MachineInfo,SC Store User,LoginFirstTimeOUI,PoleDisplayOUI,SC Store Name OUI,Login Name,Last Name,First Name,SC Primary Division Sub Type,DISALocFound,Primary responsibility Name,SC Primary Division Name,SCHCMerchantId,SCGEMerchantId,SC Primary Division Id,IP,EnableUPT"];
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
								scOrderProfileAttr = JSON.parse(BS_Data);
								localStorage.setItem("ProfileAttr",JSON.stringify(scOrderProfileAttr));
						
						}
						//End:Code for to get the Profile Attributes
            } 
             // Called by onWSClose or onWSSendFail event handler 
             function handleException(err) { 
                 // Adds other error handling logic 
                 SiebelJS.Log("Exception" +err); 
			//  Add Auto Logout logic
			//alert("Error :" +err);
				//SiebelApp.S_App.LogOff();
             } 
 
 
             return new SC_System_Info(); 
         })(); 
     }); 
}
if (typeof (SiebelAppFacade.SC_View_PostLoad) == "undefined") {
		SiebelJS.Namespace("SiebelApp.SC_View_PostLoad");
		define("siebel/custom/SelectComfort/SC_System_Info.js", [],
		(function(){
		SiebelApp.EventManager.addListner( "preload", sNPostload, this );
		function sNPostload(){
				try{
					var sViewName=SiebelApp.S_App.GetActiveView().GetName();
					if(document.getElementById("_sweview").style.display=="none" && !sViewName.includes("OUI")){
						$("#_swescrnbar").show();
						$("#_swethreadbar").show();
						$("#_sweappmenu").show();
						$("#s_vctrl_div").show();
						$(".siebui-button-toolbar").show();
						$("#_sweview").show();
						$("#custommaskoverlay").hide();
						$('#CommunicationPanelContainer').css("padding-top","0px");
					}
				}
				catch(error)
				{
				//No-Op
				}
		}
		}())
		);
}
