if (typeof SiebelApp.SC_Pole_Display === "undefined") { 
     SiebelJS.Namespace("SiebelApp.SC_Pole_Display"); 
 
     define("siebel/custom/SelectComfort/SC_Pole_Display", [], function () { 
         SiebelApp.SC_Pole_Display = (function () { 
            var DISA_POLEDISPLAY = "plugin_poledisplay"; 
            var consts = SiebelJS.Dependency("SiebelApp.Constants"); 
            consts.set("WS_" + DISA_POLEDISPLAY.toUpperCase() + "_VERSION", "1.0.0"); 
 		
             function SC_Pole_Display() { 
                 var handler = SiebelApp.WebSocketManager.CreateWSHandler(DISA_POLEDISPLAY); 
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
                        var msgJSON = {}; 
                        //msgJSON["Command"] = "GetSysInfo"; 
			msgJSON = getLines("1-LGD7KYK");

                        handler.SendMessage(msgJSON); 
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
			 SiebelJS.Log("SC_Pole_Display: JSON message received: " + JSON.stringify(msg)); 
                         
            } 
             
			 function getLines(orderId) { 
                 // Adds other error handling logic 
					var inPS  = SiebelApp.S_App.NewPropertySet();
					var outPS = "";
					var bService="";
					inPS.SetProperty("ProcessName","SC Disa Order Lines Details" );
					inPS.SetProperty("Order Id",orderId );
					SiebelJS.Log("Invoking Business Service");
					bService = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
					outPS  = bService.InvokeMethod("RunProcess",inPS);
					SiebelJS.Log("Invoking Business Service"+ outPS);
					var poleInfo = [];
					for(var i = 0; i< outPS.childArray.length ; i++){
						if(outPS.childArray[i].type === "ResultSet" && outPS.childArray[0].childArray.length>0){
							if(outPS.childArray[i].childArray[0].childArray[0].childArray[0].childArray[0].type === "ListOfOrder Entry - Line Items (Simple)"){
								var linesItemCount = outPS.childArray[i].childArray[0].childArray[0].childArray[0].childArray[0].childArray.length;
								for(var j=0 ; j < linesItemCount ; j++){			
										poleInfo.push({ 
												"Command" : "Ready",
												"ProductDesc"  : outPS.childArray[i].childArray[0].childArray[0].childArray[0].childArray[0].childArray[j].propArray["SC Long Description"],
												"Quantity"     : outPS.childArray[i].childArray[0].childArray[0].childArray[0].childArray[0].childArray[j].propArray["Quantity Requested"],
												"Price"       : outPS.childArray[i].childArray[0].childArray[0].childArray[0].childArray[0].childArray[j].propArray["Item Price - Display"]
											});
								}
							}
							break;//loop only for ResultSet
						}

					}
					poleInfo.push({ 
												"Command" : "Ready",
												"SubTotal"  : outPS.childArray[i].childArray[0].childArray[0].childArray[0].propArray["Order Total"],
												"Tax"     : outPS.childArray[i].childArray[0].childArray[0].childArray[0].propArray["Third Party Tax Amount"]												
											});
					poleInfo.push({ 
												"Command" : "Ready",
												"Total"  : outPS.childArray[i].childArray[0].childArray[0].childArray[0].propArray["Order Total"]
												});
					
					SiebelJS.Log(JSON.stringify(poleInfo));
					var poleData = {};
					poleData["PoleDisplay"] = poleInfo;
					SiebelJS.Log(JSON.stringify(poleData));
					//SiebelApp.S_App.LogOff();
					return poleData;
             }
			 // Called by onWSClose or onWSSendFail event handler 
             function handleException(err) { 
                 // Adds other error handling logic 
                 SiebelJS.Log(err); 
		 //  Add Auto Logout logic
		alert("Error :" +err);
		//SiebelApp.S_App.LogOff();
             } 
 
 
             return new SC_Pole_Display(); 
         })(); 
     }); 
} 
