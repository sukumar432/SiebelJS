if (typeof (SiebelAppFacade.RapidRepairPR) === "undefined")
{
  //console.log("Inside Rapid Repair");
  SiebelJS.Namespace("SiebelAppFacade.RapidRepairPR");
  define("siebel/custom/SelectComfort/RapidRepairPR", ["siebel/phyrenderer"],
    function ()
    {
      SiebelAppFacade.RapidRepairPR = (function ()
      {
        var ActPm = "";

        function RapidRepairPR(pm)
        {
          //console.log("Inside Rapid Repair Constructor");

          SiebelAppFacade.RapidRepairPR.superclass.constructor.apply(this, arguments);
        }

        SiebelJS.Extend(RapidRepairPR, SiebelAppFacade.PhysicalRenderer);

        RapidRepairPR.prototype.Init = function ()
        {
          //console.log("Inside Rapid Repair INIT");

          SiebelAppFacade.RapidRepairPR.superclass.Init.apply(this, arguments);
          ActPm = this.GetPM();
        }

        RapidRepairPR.prototype.ShowUI = function ()
        {
          SiebelAppFacade.RapidRepairPR.superclass.ShowUI.apply(this, arguments);
          var mainMarkup = "";
          //code for appending the open ui popup
          mainMarkup += ' <div id="applet1">';
          mainMarkup += ' <div class="container-fluid no-margin no-padding">';
          mainMarkup += ' <div class="modal fade sc-create-manual-asset" id="FS-Rapid-Repair-Modal" role="dialog">';
          mainMarkup += ' </div>';

          $("#_sweclient").append(mainMarkup);
        }

        RapidRepairPR.prototype.BindData = function (bRefresh)
        {
          SiebelAppFacade.RapidRepairPR.superclass.BindData.apply(this, arguments);
        }

        RapidRepairPR.prototype.BindEvents = function ()
        {
          SiebelAppFacade.RapidRepairPR.superclass.BindEvents.apply(this, arguments);
		 
          this.GetPM().AttachPostProxyExecuteBinding("NewRepairOrder", function (methodName, inputPS, outputPS)
          {
			   //Route id not null condition
		  var oActRS = SiebelApp.S_App.GetActiveView().GetAppletMap()['SC Field Service Activity List Applet'].GetRecordSet();
            var routeidnull = "true";

			var strRouteId = "";
            for (var i = 0; i < oActRS.length; i++)
            {
              if (oActRS[i]["Type"] == "Delivery")
              {
                strRouteId = oActRS[i]["SC Route Assignment"];
                break;
              }
            }
			if(strRouteId !== "" && strRouteId !== null && strRouteId !== undefined){
			routeidnull = "false";
			strRouteId = strRouteId.replace(/[a-zA-Z]{3}$/, ""); // remove last 3 letters
 			}
			//console.log("strRouteId"+strRouteId+"routeidnull"+routeidnull);
            if (outputPS.GetProperty("Status") != "Error" && routeidnull === "false")
            {
              rapidRepairPopup();
              $("#FS-Rapid-Repair-Modal").show();
              $(".modal-backdrop").show();
              $("#FS-Rapid-Repair-Modal").modal(
              {
                backdrop: 'static'
              });
            }
          });
          $(document).on('change', "#sc-rapid-sale", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-rapid-sale").prop('checked') == true)
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                //$("#sc-manual-asset-parent").addClass("SC-disabled");
                //$("#sc-manual-AO-parent").addClass("SC-disabled");
                if ($("#sc-rapid-warranty-rplcmnt").prop('checked') == true)
                  $("#sc-rapid-warranty-rplcmnt").trigger("click");
                if ($("#sc-rapid-product-rplcmnt").prop('checked') == true)
                  $("#sc-rapid-product-rplcmnt").trigger("click");
                $("#maskoverlay").hide();
              }, 20);
            }
          });
          $(document).on('change', "#sc-rapid-warranty-rplcmnt", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-rapid-warranty-rplcmnt").prop('checked') == true)
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                //$("#sc-manual-asset-parent").addClass("SC-disabled");
                //$("#sc-manual-AO-parent").addClass("SC-disabled");
                if ($("#sc-rapid-sale").prop('checked') == true)
                  $("#sc-rapid-sale").trigger("click");
                if ($("#sc-rapid-product-rplcmnt").prop('checked') == true)
                  $("#sc-rapid-product-rplcmnt").trigger("click");
                $("#maskoverlay").hide();
              }, 20);
            }
          });
          $(document).on('change', "#sc-rapid-product-rplcmnt", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-rapid-product-rplcmnt").prop('checked') == true)
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                //$("#sc-manual-asset-parent").addClass("SC-disabled");
                //$("#sc-manual-AO-parent").addClass("SC-disabled");
                if ($("#sc-rapid-sale").prop('checked') == true)
                  $("#sc-rapid-sale").trigger("click");
                if ($("#sc-rapid-warranty-rplcmnt").prop('checked') == true)
                  $("#sc-rapid-warranty-rplcmnt").trigger("click");
                $("#maskoverlay").hide();
              }, 20);
            }
          });
          $(document).on('click', "#SN-rapid-Ok", function (event)
          {
            var origSRNumber = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet")[0]["SR Number"];
            var origOrderNumber = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet")[0]["SC HD Order Number"];
            var cutomernumber = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet")[0]["SC Contact Customer Number"];
            const selectedCheckbox = $("#SC-Rapid-OA-toggle input[type='checkbox']:checked");
            var hdsrId = SiebelApp.S_App.GetActiveView().GetAppletMap()["SC Field Service Detail Applet"].GetPModel().GetRenderer().GetPM().Get("GetRecordSet")[0]["Id"];
               //Route id not null condition
		    var oActRS = SiebelApp.S_App.GetActiveView().GetAppletMap()['SC Field Service Activity List Applet'].GetRecordSet();
			var strRouteId = "";
            for (var i = 0; i < oActRS.length; i++)
            {
              if (oActRS[i]["Type"] == "Delivery")
              {
                strRouteId = oActRS[i]["SC Route Assignment"];
                break;
              }
            }
			if(strRouteId !== "" && strRouteId !== null && strRouteId !== undefined){
			strRouteId = strRouteId.replace(/[a-zA-Z]{3}$/, ""); // remove last 3 letters
 			}
            //console.log("Rapid Reapir - Route Id: " + strRouteId);
			
            if (selectedCheckbox.length > 0)
            {
              // Get the ID of the selected checkbox
              const selectedId = selectedCheckbox.attr("id");
              //checking type of order to be created
              var ordertype = "";
              if (selectedId === "sc-rapid-sale")
              {
                ordertype = "Sale";
              }
              else if (selectedId === "sc-rapid-warranty-rplcmnt")
              {
                ordertype = "Warranty";
              }
              else if (selectedId === "sc-rapid-product-rplcmnt")
              {
                ordertype = "Product";
              }
              if (cutomernumber === "" || cutomernumber === null || cutomernumber === undefined)
              {
				  
                alert("Customer Number is missing for this Service Request. Please verify the SR details before proceeding.");
              }
              else
              {
                $("#FS-Rapid-Repair-Modal").hide();
                $(".modal-backdrop").hide();
                $("#maskoverlay").show();
                setTimeout(function ()
                {
                  var Custom_Service = SiebelApp.S_App.GetService("SC Field Service SR Service");
                  var Input_BS = SiebelApp.S_App.NewPropertySet();
                  var Out_BS = SiebelApp.S_App.NewPropertySet();
                  Input_BS.SetProperty("origSRNumber", origSRNumber);
                  Input_BS.SetProperty("origOrderNumber", origOrderNumber);
                  Input_BS.SetProperty("orderType", ordertype);
                  Input_BS.SetProperty("cutomernumber", cutomernumber);
                  Input_BS.SetProperty("strRouteId", strRouteId);
                  Input_BS.SetProperty("hdsrId", hdsrId);
                  Out_BS = Custom_Service.InvokeMethod("rapidrepairs", Input_BS);
                  //console.log(Out_BS);
                  var errSR = Out_BS.GetChild(0).GetProperty("Error Message Rapid SR");
				  var errWF = Out_BS.GetChild(0).GetProperty("Error Message Rapid");
                  if (errSR !== "" && errSR !== null && errSR !== undefined)
                  {
					errSR = "";
                    alert("Note : You must have an open SR on the current call activity to proceed");
                  }
				  else if(errWF !== "" && errWF !== null && errWF !== undefined){
					errWF = "";
                    alert("You must have an open SR on the current call activity to proceed");
				  }

                    $("#maskoverlay").hide();
                }, 1000);
              }
            }
            else
            {
              alert("Please select an option before clicking OK.");
            }
          });

          function rapidRepairPopup()
          {
            var RapidRepairMarkup = "";
            RapidRepairMarkup += '<div class="modal-dialog">';
            RapidRepairMarkup += '  <div class="modal-content">';
            RapidRepairMarkup += '    <div class="modal-header">';
            RapidRepairMarkup += '      <button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SN-Rapid-Repair-fr-close">×</button>';
            RapidRepairMarkup += '      <div class="header-content">';
            RapidRepairMarkup += '        <p>Select One:</p>';
            RapidRepairMarkup += '      </div>';
            RapidRepairMarkup += '    </div>';
            RapidRepairMarkup += '    <div class="modal-body clearfix no-padding">';
            RapidRepairMarkup += '      <div class="main-container">';
            RapidRepairMarkup += '							<div class="order-asset-toggle clearfix" id="SC-Rapid-OA-toggle">';
            RapidRepairMarkup += ' <div class="order-toggle">';
            RapidRepairMarkup += '	<p class="highlate">Sale</p>';
            RapidRepairMarkup += '	<div class="SC-checkbox right12" id="sn-rapid-repair-Sale">';
            RapidRepairMarkup += '		<input type="checkbox" name="" id="sc-rapid-sale">';
            RapidRepairMarkup += '		<label for="sc-rapid-sale"></label>';
            RapidRepairMarkup += '   </div>';
            RapidRepairMarkup += ' </div>';
            RapidRepairMarkup += ' <div class="order-toggle">';
            RapidRepairMarkup += '   <p class="highlate">Warranty Rplcmnt</p>';
            RapidRepairMarkup += '	<div class="SC-checkbox right12" id="sn-rapid-repair-warranty-rplcmnt">';
            RapidRepairMarkup += '		<input type="checkbox" name="" id="sc-rapid-warranty-rplcmnt">';
            RapidRepairMarkup += '		<label for="sc-rapid-warranty-rplcmnt"></label>';
            RapidRepairMarkup += '   </div>';
            RapidRepairMarkup += ' </div>';
            RapidRepairMarkup += '  <div class="order-toggle">';
            RapidRepairMarkup += '   <p class="highlate">Product Rplcmnt</p>';
            RapidRepairMarkup += '	<div class="SC-checkbox right12" id="sn-rapid-repair-product-rplcmnt">';
            RapidRepairMarkup += '		<input type="checkbox" name="" id="sc-rapid-product-rplcmnt">';
            RapidRepairMarkup += '		<label for="sc-rapid-product-rplcmnt"></label>';
            RapidRepairMarkup += '   </div>';
            RapidRepairMarkup += ' </div>';
            RapidRepairMarkup += '							</div>';
            RapidRepairMarkup += '						   <div class="SC-single-button-container less-padding">';
            RapidRepairMarkup += '						      <button id="SN-rapid-Ok">OK</button>';
            RapidRepairMarkup += '						   </div>';
            RapidRepairMarkup += '      </div>';
            RapidRepairMarkup += '    </div>';
            RapidRepairMarkup += '  </div>';
            RapidRepairMarkup += '</div>';

            $("#FS-Rapid-Repair-Modal").html(RapidRepairMarkup);
          }

        }
        RapidRepairPR.prototype.EndLife = function ()
        {
          SiebelAppFacade.RapidRepairPR.superclass.EndLife.apply(this, arguments);
			 $(document).off('click', "#SN-rapid-Ok");
			 $(document).off('change', "#sc-rapid-product-rplcmnt");
			$(document).off('change', "#sc-rapid-warranty-rplcmnt");
			$(document).off('change', "#sc-rapid-sale");
        }

        return RapidRepairPR;
      }());
      return "SiebelAppFacade.RapidRepairPR";
    })
}