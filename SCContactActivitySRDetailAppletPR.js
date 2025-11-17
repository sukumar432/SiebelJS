if (typeof (SiebelAppFacade.SCContactActivitySRDetailAppletPR) === "undefined")
{
  SiebelJS.Namespace("SiebelAppFacade.SCContactActivitySRDetailAppletPR");
  define("siebel/custom/SelectComfort/SCContactActivitySRDetailAppletPR", ["siebel/jqgridrenderer", "siebel/custom/SelectComfort/SCErrorCodes", "siebel/custom/SelectComfort/SC_OUI_Methods"],
    function ()
    {
      SiebelAppFacade.SCContactActivitySRDetailAppletPR = (function ()
      {
        var SC_OUI_Methods = SiebelJS.Dependency("SiebelApp.SC_OUI_Methods");
        var ErrorCodesfn = SiebelJS.Dependency("SiebelApp.SCErrorCodes");
        var EmailChanged;
        var ContactFormApplet_PM = "",
          ActBc = "",
          ConFormApp_RS, ActPm, ActId = "",
          NewSRcreated = "N",
          ActIntChanged, refreshAsset = "N",
          isAssetrcd, refreshOrder = "N",
          refreshSR = "N";
        var ExistOrderLen = 0,
          sCTIActivityId, appletSequence, exOrderStartpage, ExistOrderRcdSet = [],
          isOrdercd = "N",
          ExistAssetRcdSet = [],
          SRTypeArray, IntSrcArray, ActCatArray, ActCat1Array, CategoryArray, PriorityArray, ActStatusArray, ActInterActArray;
        var ExistSRLen = 0,
          ExistSRRcdSet = [],
          exSRStartpage = 0,
          ActstatusDone = "N",
          ExistAssetLen = 0,
          exAssetStartpage = 0,
          ActvityFieldsJSON = {},
          ActvityFieldsIdJSON = {},
          ActivitySRJSON = {},
          ActivityControlsJSON = {},
          ActivityFieldsJSON = {},
          ActvitylastFieldsJSON = {},
          ActvityLastFieldsIdJSON = {},
          isvalidationreq;
        var orderProdArray = []; //28Mar25;SL;Added for elementool-SFSTRY0003379

        function SCContactActivitySRDetailAppletPR(pm)
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.constructor.apply(this, arguments);
        }

        SiebelJS.Extend(SCContactActivitySRDetailAppletPR, SiebelAppFacade.JQGridRenderer);

        SCContactActivitySRDetailAppletPR.prototype.Init = function ()
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.Init.apply(this, arguments);
          /*ActvityFieldsJSON = {
            "Administration": [],
            "BBB": ["Interaction Source", "Category", "Description", "Interaction Disposition", "Comments", "Status"],
            "Call - Inbound": ["Interaction Source", "Category (OM Use Only)", "Priority (Specialty Teams Only)"],
            "Call - Outbound": ["Interaction Source"],
            "Chat - Inbound": ["Interaction Source"],
            "Email - Inbound": ["Interaction Source", "Priority (Specialty Teams Only)"],
            "Customer Contact - Planned": ["Planned Start Date"],
            "Customer Contact - Requested": ["Planned Start Date", "Owner"],
            "Internal Collaboration": ["Planned Start Date", "Category (OM Use Only)"],
            "Vendor Collaboration": ["Planned Start Date"],
            "Verify Financial Status": ["Planned Start Date", "Category (OM Use Only)"],
            "Verify Order Status": ["Planned Start Date", "Category (OM Use Only)"],
            "Email - Outbound": ["Interaction Source", "Category (OM Use Only)"],
            "Consumer Privacy Request": ["Planned Start Date", "Category 1", "Category 2", "Comments"],
            "Email Now": ["Confirm Email Address", "Category 1", "Category 2"],
            "Mail - Inbound": ["Interaction Source"],
            "Mail - Outbound": ["Interaction Source"],
            "Other": ["Interaction Source"],
            "Social Media": ["Interaction Source"],
            "Trial Extension": ["Confirm Email Address"],
            "Voicemail - Inbound": ["Interaction Source"],
            "Verify Portal Info": ["Planned Start Date"]
          };
          ActvityFieldsIdJSON = {
            "Administration": [],
            "BBB": ["SC_Act_Int", "Sc_Act_cat", "SC_Act_Desc", "SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Call - Inbound": ["SC_Act_Int", "Sc_Act_cat", "SC_Act_Pr"],
            "Call - Outbound": ["SC_Act_Int"],
            "Chat - Inbound": ["SC_Act_Int"],
            "Email - Inbound": ["SC_Act_Int", "SC_Act_Pr"],
            "Customer Contact - Planned": ["SC_ACT_strtDate"],
            "Customer Contact - Requested": ["SC_ACT_strtDate", "SC_ACt_owner"],
            "Internal Collaboration": ["SC_ACT_strtDate", "Sc_Act_cat"],
            "Vendor Collaboration": ["SC_ACT_strtDate"],
            "Verify Financial Status": ["SC_ACT_strtDate", "Sc_Act_cat"],
            "Verify Order Status": ["SC_ACT_strtDate", "Sc_Act_cat"],
            "Email - Outbound": ["SC_Act_Int", "Sc_Act_cat"],
            "Consumer Privacy Request": ["SC_ACT_strtDate", "SC_Act_Cat1", "SC_Act_Cat2", "SC_Act_Cmt"],
            "Email Now": ["SC-con-Email", "SC_Act_Cat1", "SC_Act_Cat2"],
            "Mail - Inbound": ["SC_Act_Int"],
            "Mail - Outbound": ["SC_Act_Int"],
            "Other": ["SC_Act_Int"],
            "Social Media": ["SC_Act_Int"],
            "Trial Extension": ["SC-con-Email"],
            "Voicemail - Inbound": ["SC_Act_Int"],
            "Verify Portal Info": ["SC_ACT_strtDate"]
          };
          ActivitySRJSON = {
            "Administration": "Y",
            "BBB": "N",
            "Call - Inbound": "Y",
            "Call - Outbound": "Y",
            "Chat - Inbound": "Y",
            "Email - Inbound": "Y",
            "Customer Contact - Planned": "Y",
            "Customer Contact - Requested": "Y",
            "Internal Collaboration": "Y",
            "Vendor Collaboration": "Y",
            "Verify Financial Status": "Y",
            "Verify Order Status": "Y",
            "Email - Outbound": "Y",
            "Consumer Privacy Request": "N",
            "Email Now": "Y",
            "Mail - Inbound": "Y",
            "Mail - Outbound": "Y",
            "Other": "Y",
            "Social Media": "Y",
            "Trial Extension": "Y",
            "Voicemail - Inbound": "Y",
            "Verify Portal Info": "Y"
          };
          ActivityControlsJSON = {
            "SC_Act_Int": "Interaction Disposition",
            "SC_Act_Cmt": "Comment",
            "SC_Act_Desc": "Description",
            "SC_Act_Pr": "Priority",
            "SC_ACT_strtDate": "Planned",
            "Sc_Act_cat": "Class",
            "SC_Act_IntDis": "SC Interaction Disposition",
            "SC_Act_Stat": "Status",
            "SC_Trial_EXDate": "SC Trial End Date",
            "SC_Act_Cat1": "Category 1",
            "SC_Act_Cat2": "Category 2",
            "SC_ACt_owner": "Primary Owned By"
          };
          ActivityFieldsJSON = {
            "SC_Act_Int": "Q7",
            "SC_Act_Cmt": "Comment",
            "SC_Act_Desc": "Description",
            "SC_Act_Pr": "Priority",
            "SC_ACT_strtDate": "Planned",
            "Sc_Act_cat": "Class",
            "SC_Act_IntDis": "SC Interaction Disposition",
            "SC_Act_Stat": "Status",
            "SC_Trial_EXDate": "SC Trial End Date",
            "SC_Act_Cat1": "EmailNow Category One",
            "SC_Act_Cat2": "EmailNow Category Two",
            "SC_ACt_owner": "Primary Owned By"
          };
          ActvitylastFieldsJSON = {
            "Administration": ["Interaction Disposition", "Comments", "Status"],
            "BBB": [],
            "Call - Inbound": ["Interaction Disposition", "Comments", "Status"],
            "Call - Outbound": ["Interaction Disposition", "Comments", "Status"],
            "Chat - Inbound": ["Interaction Disposition", "Comments", "Status"],
            "Email - Inbound": ["Interaction Disposition", "Comments", "Status"],
            "Customer Contact - Planned": ["Comments", "Status"],
            "Customer Contact - Requested": ["Comments"],
            "Internal Collaboration": ["Comments", "Status"],
            "Vendor Collaboration": ["Comments", "Status"],
            "Verify Financial Status": ["Comments", "Status"],
            "Verify Order Status": ["Comments", "Status"],
            "Email - Outbound": ["Interaction Disposition", "Comments", "Status"],
            "Email Now": ["Interaction Disposition", "Comments", "Status"],
            "Mail - Inbound": ["Interaction Disposition", "Comments", "Status"],
            "Mail - Outbound": ["Interaction Disposition", "Status"],
            "Other": ["Interaction Disposition", "Comments", "Status"],
            "Social Media": ["Interaction Disposition", "Comments", "Status"],
            "Trial Extension": ["Trial Extension Date", "Interaction Disposition", "Comments", "Status"],
            "Voicemail - Inbound": ["Interaction Disposition", "Comments", "Status"],
            "Verify Portal Info": ["Comments", "Status"]
          };
          ActvityLastFieldsIdJSON = {
            "Administration": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "BBB": [],
            "Call - Inbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Call - Outbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Chat - Inbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Email - Inbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Customer Contact - Planned": ["SC_Act_Cmt", "SC_Act_Stat"],
            "Customer Contact - Requested": ["SC_Act_Cmt"],
            "Internal Collaboration": ["SC_Act_Cmt", "SC_Act_Stat"],
            "Vendor Collaboration": ["SC_Act_Cmt", "SC_Act_Stat"],
            "Verify Financial Status": ["SC_Act_Cmt", "SC_Act_Stat"],
            "Verify Order Status": ["SC_Act_Cmt", "SC_Act_Stat"],
            "Email - Outbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Email Now": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Mail - Inbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Mail - Outbound": ["SC_Act_IntDis", "SC_Act_Stat"],
            "Other": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Social Media": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Trial Extension": ["SC_Trial_EXDate", "SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Voicemail - Inbound": ["SC_Act_IntDis", "SC_Act_Cmt", "SC_Act_Stat"],
            "Verify Portal Info": ["SC_Act_Cmt", "SC_Act_Stat"]
          };*/
          ContactFormApplet_PM = "";
          ConFormApp_RS = "";
          ActPm = this.GetPM();
          ActId = "";
          NewSRcreated = "N";
          refreshAsset = "N";
          refreshOrder = "N";
          refreshSR = "N";
          ActBc = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetBusComp();
          ExistOrderLen = 0;
          exOrderStartpage;
          ExistOrderRcdSet = [];
          isOrdercd = "N";
          ExistAssetRcdSet = [];
          ExistSRLen = 0;
          ExistSRRcdSet = [];
          exSRStartpage = 0;
          ExistAssetLen = 0;
          exAssetStartpage = 0;
          EmailChanged = "N";
          isAssetrcd = "N";
          isvalidationreq = "N";
          ActstatusDone = "N";
          SRTypeArray = new Array;
          IntSrcArray = new Array;
          CategoryArray = new Array;
          PriorityArray = new Array;
          ActStatusArray = new Array;
          ActInterActArray = new Array;
          ActCatArray = new Array;
          ActCat1Array = new Array;
          ActIntChanged = "";
          orderProdArray = SiebelApp.SC_OUI_Methods.GetLOVs("[Type] = 'SC_SR_PROD_TYPE' AND [Active] = 'Y'", "Order By"); //28Mar25;SL;Added for elementool-SFSTRY0003379
          /*if (SC_OUI_Methods.SCGetProfileAttrValue('SC Store User') == "Y")
          {
            ActvityFieldsJSON["Call - Inbound"] = ["Planned Start Date", "Description", "Comments"];
            ActvityFieldsIdJSON["Call - Inbound"] = ["SC_ACT_strtDate", "SC_Act_Desc", "SC_Act_Cmt"];
            ActvityFieldsJSON["Call - Outbound"] = ["Planned Start Date", "Description", "Comments"];
            ActvityFieldsIdJSON["Call - Outbound"] = ["SC_ACT_strtDate", "SC_Act_Desc", "SC_Act_Cmt"];
            ActvityFieldsJSON["Email - Outbound"] = ["Planned Start Date", "Description", "Comments"];
            ActvityFieldsIdJSON["Email - Outbound"] = ["SC_ACT_strtDate", "SC_Act_Desc", "SC_Act_Cmt"];
            ActvityFieldsJSON["Mail - Outbound"] = ["Planned Start Date", "Description", "Comments"];
            ActvityFieldsIdJSON["Mail - Outbound"] = ["SC_ACT_strtDate", "SC_Act_Desc", "SC_Act_Cmt"];
            ActvityFieldsJSON["Other"] = ["Planned Start Date", "Description", "Comments"];
            ActvityFieldsIdJSON["Other"] = ["SC_ACT_strtDate", "SC_Act_Desc", "SC_Act_Cmt"];
            ActivitySRJSON["Call - Inbound"] = ["N"];
            ActivitySRJSON["Call - Outbound"] = ["N"];
            ActivitySRJSON["Email - Outbound"] = ["N"];
            ActivitySRJSON["Mail - Outbound"] = ["N"];
            ActivitySRJSON["Other"] = ["N"];
          }*/
          var appletId = this.GetPM().Get("GetFullId");
          appletSequence = appletId[appletId.length - 1];

          var inPS = SiebelApp.S_App.NewPropertySet();
          var outPS = SiebelApp.S_App.NewPropertySet();
          var Bservice = "";
          Bservice = SiebelApp.S_App.GetService("Communications Client"); //get service
          outPS = Bservice.InvokeMethod("GetSelectedWorkItemInfo", inPS); //invoke the method
          sCTIActivityId = outPS.GetChild(0).GetProperty("WorkObjectID");
        }

        SCContactActivitySRDetailAppletPR.prototype.ShowUI = function ()
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.ShowUI.apply(this, arguments);
          $("[name=" + ActPm.Get("GetControls")["ActivityId"].GetInputName() + "]").css('visibility', 'hidden');
          var mainMarkup = "";
          //code for appending the open ui popup
          mainMarkup += ' <div id="appletSR">';
          mainMarkup += ' <div class="container-fluid no-margin no-padding">';
          mainMarkup += ' <div class="modal fade sc-create-manual-asset" id="SC-manual-sr-Modal" role="dialog">';
          mainMarkup += ' </div>';
          /*mainMarkup += '<div class="modal fade SC-SO-add-popup" id="SC-SO-ReqCnfrm-Popup" role="dialog">';
          mainMarkup += '      <div class="SC-modal modal-orange-bg">';
          mainMarkup += '      	<div class="modal-dialog">';
          mainMarkup += '              <div class="modal-content less-height">';
          mainMarkup += '                    <div class="text">';
          mainMarkup += '                       <span class="SC-span-width add-margin">Some of the mandatory fields are not filled to complete the email request. Do you want to proceed?</span>';
          mainMarkup += '                        <div class="SC-two-buttons">';
          mainMarkup += '                           <button id="sc-ReqCnfrm-yes">Yes</button>';
          mainMarkup += '                            <button id="sc-ReqCnfrm-no">No</button>';
          mainMarkup += '                       </div>';
          mainMarkup += '                   </div>';
          mainMarkup += '                </div>';
          mainMarkup += '            </div>';
          mainMarkup += '       </div>';
          mainMarkup += '   </div>';*/
          mainMarkup += '</div>';
          mainMarkup += '</div>';
          //$("body").append(mainMarkup);
          $("#_sweclient").append(mainMarkup);
          //$('#SC-manual-sr-Modal').draggable();
          //$('#SC-SO-ReqCnfrm-Popup').draggable();
        }

        SCContactActivitySRDetailAppletPR.prototype.BindData = function (bRefresh)
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.BindData.apply(this, arguments);
          var rowid;
          $("#s_" + appletSequence + "_l tr").click(function (e)
          {
            rowid = $(this).attr("id");
            setTimeout(function ()
            {
              var controls = ActPm.Get("GetControls");
              var sCurrActId = $("[name=" + ActPm.Get("GetControls")["ActivityId"].GetInputName() + "]").val();
              //SiebelJS.Log('sCurrActId'+sCurrActId);
              //SiebelJS.Log('in bind rowid'+rowid);
              //sCTIActivityId="1-C1M0Q41";
              //Spatiban:05/05/21:Updated below code for #STRY0034436
              try
              {
                var sCurrActType = ActPm.ExecuteMethod("GetFieldValue", controls["Type"]);
                if (sCTIActivityId === sCurrActId || sCurrActType == "SMS" || sCurrActType == "Delivery" || sCurrActType == "Time Frame Call")
                {
                  $('#' + rowid + '_Status').attr('readonly', true);
                  $('#' + rowid + '_Status').prop("disabled", true);
                  //SPATIBAN:26-SEP-19:Added below code for to make Activity type readonly of CTI generated activity during CTI session
                  $('#' + rowid + '_Type').attr('readonly', true);
                  $('#' + rowid + '_Type').prop("disabled", true);
                }
              }
              catch (e)
              {}
            }, 0)
          });
        }

        SCContactActivitySRDetailAppletPR.prototype.BindEvents = function ()
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.BindEvents.apply(this, arguments);
          var ActivitySCSortSRJSON = {
            "Status": "Status",
            "Opened Date": "Created",
            "order #": "SC SR Order Number",
            "asset # ": "Asset Number",
            "SR # ": "SR Number"
          };
          var searchExpr = '',
            sortSpec = "";
          var scsubchannel = "";
          var ActTypeArray = new Array;
          scsubchannel = SC_OUI_Methods.SCGetProfileAttrValue('SC Primary Division Sub Type');
          searchExpr = "[Type]= 'SC_TODO_TYPE' AND [Active]='Y' AND [Parent]='" + scsubchannel + "'";
          sortSpec = "Order By";
          ActTypeArray = SC_OUI_Methods.GetLOVs(searchExpr, sortSpec);

          var nowDate = new Date();
          var date = nowDate.getFullYear() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getDate();
          var localStorageDate = localStorage.getItem("ActSessionDate");
          if (localStorageDate == null || localStorageDate != date)
          {
            var scActSrchSpec = [],
              scActSortSpec = [];
            localStorage.setItem("ActSessionDate", date);
            var ActmanualLovArray, ActmanualLovArrayJSOn = {};
            scActSrchSpec[0] = "[Type]= 'SC_ACTIVITY_INTERACTION_SOURCE' AND [Active]='Y'";
            scActSortSpec[0] = "Order By";
            scActSrchSpec[1] = "[Type]='FS_ACTIVITY_CLASS' AND [Active]='Y'";
            scActSortSpec[1] = "";
            scActSrchSpec[2] = "[Type]= 'ACTIVITY_PRIORITY' AND [Active]='Y'";
            scActSortSpec[2] = "";
            scActSrchSpec[3] = "[Type]= 'SR_AREA' AND [Active]='Y' AND [Order By] >=1000 and [Order By] <=1500 AND [Parent]='Incident'";
            scActSortSpec[3] = "Order By";
            scActSrchSpec[4] = "[Type]= 'EVENT_STATUS' AND [Active]='Y'";
            scActSortSpec[4] = "";
            scActSrchSpec[5] = "[Type]= 'SC_EMAILNOW_CATEGORY_ONE' AND [Active]='Y' AND [Parent]='Email Now'";
            scActSortSpec[5] = "Order By";
            scActSrchSpec[6] = "[Type]= 'SC_EMAILNOW_CATEGORY_ONE' AND [Active]='Y' AND [Parent]='Consumer Privacy Request'";
            scActSortSpec[6] = "Order By";

            var Custom_Service = "",
              Input_BS = "",
              Out_BS = "";
            var scActLovValues = [],
              Actlovvalues = "";
            Custom_Service = SiebelApp.S_App.GetService("SC Get Profile Attribute BS");
            Input_BS = SiebelApp.S_App.NewPropertySet();
            Out_BS = SiebelApp.S_App.NewPropertySet();
            Input_BS.SetProperty("LoVSearchSpecArray", scActSrchSpec);
            Input_BS.SetProperty("LoVSortSpecArray", scActSortSpec);
            Out_BS = Custom_Service.InvokeMethod("GetLovs", Input_BS);
            var Child_BS = Out_BS.GetChild(0);
            var BS_Data = Child_BS.GetProperty("OutPutArray");
            if (BS_Data != "No Records")
            {

              scActLovValues = JSON.parse(BS_Data);

            }
            for (var i = 0; i < scActSrchSpec.length; i++)
            {
              Actlovvalues = scActLovValues[scActSrchSpec[i]];
              Actlovvalues = Actlovvalues.split("|");
              scActLovValues[scActSrchSpec[i]] = Actlovvalues;
            }
            localStorage.setItem("SCManualActValues", JSON.stringify(scActLovValues));
          }
          var scActLovValues = localStorage.getItem("SCManualActValues");
          scActLovValues = JSON.parse(scActLovValues);
          IntSrcArray = scActLovValues["[Type]= 'SC_ACTIVITY_INTERACTION_SOURCE' AND [Active]='Y'"];
          CategoryArray = scActLovValues["[Type]='FS_ACTIVITY_CLASS' AND [Active]='Y'"];
          PriorityArray = scActLovValues["[Type]= 'ACTIVITY_PRIORITY' AND [Active]='Y'"];
          SRTypeArray = scActLovValues["[Type]= 'SR_AREA' AND [Active]='Y' AND [Order By] >=1000 and [Order By] <=1500 AND [Parent]='Incident'"];
          ActStatusArray = scActLovValues["[Type]= 'EVENT_STATUS' AND [Active]='Y'"];
          ActCatArray = scActLovValues["[Type]= 'SC_EMAILNOW_CATEGORY_ONE' AND [Active]='Y' AND [Parent]='Email Now'"];
          ActCat1Array = scActLovValues["[Type]= 'SC_EMAILNOW_CATEGORY_ONE' AND [Active]='Y' AND [Parent]='Consumer Privacy Request'"];
          
          //SPATIBAN:21:MAR:2022: Added code for #STRY0159897
          this.GetPM().AttachPostProxyExecuteBinding("PostChanges", function (methodName, inputPS, outputPS)
          {

            if (methodName == "PostChanges" && inputPS.propArray.hasOwnProperty("SWEPOC") && inputPS.propArray["SWEPOC"] == "Type")
            {
              var actBC = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp();;
              var sacttype = actBC.GetFieldValue("Type");
              if (sacttype == "Email Now")
              {
                ContactFormApplet_PM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetPModel().GetRenderer().GetPM();
                ConFormApp_RS = ContactFormApplet_PM.Get("GetRecordSet");
                //jQuery('form#SC-Email-validation').unbind('submit');
                //jQuery('form#SC-NewSR-form-Validate').unbind('submit');
                AppendManualActivityMarkup();
                SRformvalidation();
                var ActTypedrpValue = '';
                ActTypedrpValue += ' <option id="SC-ACTTypeNULLOption"></option>';
                for (var ac = 0; ac < ActTypeArray.length; ac++)
                {
                  ActTypedrpValue += ' <option>' + ActTypeArray[ac] + '</option>';
                }
                $('#SC-ActType').html(ActTypedrpValue);
                Resetmodal();
                isAssetrcd = "N";
                isOrdercd = "N";
                ActIntChanged = "Y";
                exSRStartpage = 0;
                exAssetStartpage = 0;
                exOrderStartpage = 0;
                isvalidationreq = "N";
                if (localStorage.getItem("prevconId") != ConFormApp_RS[0]["Id"])
                {
                  localStorage.setItem("prevconId", ConFormApp_RS[0]["Id"]);
                  refreshAsset = "Y";
                  refreshOrder = "Y";
                  refreshSR = "Y";
                }
                $("#SC-manual-sr-Modal").modal(
                {
                  backdrop: 'static'
                });
                $('#SC-ActType').val("Email Now");
                $('#SC-ActType').trigger("change");
                $('#SC-ActType').parent().addClass("is-active is-completed");
              }
            }
          });
          //Start:code for on click of NewRecord
          this.GetPM().AttachPostProxyExecuteBinding("NewRecord", function (methodName, inputPS, outputPS)
          {
            if (outputPS.GetProperty("Status") != "Error")
            {
              ContactFormApplet_PM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetPModel().GetRenderer().GetPM();
              ConFormApp_RS = ContactFormApplet_PM.Get("GetRecordSet");
              //jQuery('form#SC-Email-validation').unbind('submit');
              //jQuery('form#SC-NewSR-form-Validate').unbind('submit');
              AppendManualActivityMarkup();
              SRformvalidation();
              var ActTypedrpValue = '';
              ActTypedrpValue += ' <option id="SC-ACTTypeNULLOption"></option>';
              for (var ac = 0; ac < ActTypeArray.length; ac++)
              {
                ActTypedrpValue += ' <option>' + ActTypeArray[ac] + '</option>';
              }
              $('#SC-ActType').html(ActTypedrpValue);
              Resetmodal();
              isAssetrcd = "N";
              isOrdercd = "N";
              ActIntChanged = "Y";
              exSRStartpage = 0;
              exAssetStartpage = 0;
              exOrderStartpage = 0;
              isvalidationreq = "N";
              if (localStorage.getItem("prevconId") != ConFormApp_RS[0]["Id"])
              {
                localStorage.setItem("prevconId", ConFormApp_RS[0]["Id"]);
                refreshAsset = "Y";
                refreshOrder = "Y";
                refreshSR = "Y";
              }
              $("#SC-manual-sr-Modal").modal(
              {
                backdrop: 'static'
              });
            }
          });

          function Resetmodal()
          {
            $("#sc-table-OA").hide();
            $("#sc-title-OA").hide();
            $("#sc-pag-OA").hide();
            $("#SC-ExistSR-parent").hide();
            $("#SC-selectSR").hide();
            $("#SC-Create-New-SR").hide();
            $("#SC-after-Activity").hide();
            $("#SC-OA-toggle").hide();
            $("#Submit-Act").hide();
            $("#SC-saveSR").hide();
            $("#SC-saveAct").hide();
            $("#SC-saveSRAct").hide();
            $("#Cancel-Activity-AC").hide();
            $("#Cancel-Activity-SR").hide();
            $("#Cancel-Manual-Activity_order").hide();
            $("#SC-saveSRBack").hide();
            $("#firstrightfields").hide();
            $("#SC-dynamic").hide();
            $("#SC-footer-Fields").hide();
            $("#sc-editAct-text").hide();
            //$("#sc-manual-editContactEmail-text").hide();
            $("#SC-maualSr-button-parent").hide();
          }
          //End:code for on click of NewRecord
          $(document).on('focus', '.SC-input', function ()
          {
            $(this).parent().addClass("is-active is-completed");
            if ($(this).attr("id") == "SC-con-Email")
              $(".SC-email-tooltip").hide();
          });
          $(document).on('focusout', '.SC-input', function ()
          {
            if ($(this).val() === "" && $(this).attr("id") != "SC-con-Email" && $(this).attr("id") != "SC_Trial_EXDate" && $(this).attr("id") != "SC_ACT_strtDate" && $(this).attr("id") != "SC_Act_CampURL")
            {
              $(this).parent().removeClass("is-completed");
              $(this).parent().removeClass("is-active");
            }
            //$("#"+$(this).attr("id")).attr("title",this.value);
          });
          //Code for on click of cancel button
          $(document).on("click", "#Cancel-Manual-Activity", function (event)
          {
            event.stopImmediatePropagation();
            ActPm.ExecuteMethod("InvokeMethod", "UndoRecord", null, false);
            $("#SC-manual-sr-Modal").modal('hide');
          });
          //Start:code for on change of activity type
          $(document).on("change", "#SC-ActType", function (event)
          {
            event.stopImmediatePropagation();
            if (this.value != "")
            {
              ActstatusDone = "N";
              $("#SC-ACTTypeNULLOption").remove();
              EmailChanged = "N";
              isvalidationreq = "N";
              var ActType = this.value,
                ArrayValues = [],
                defaultValueArr, isDropdown = "";
              ContactFormApplet_PM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetPModel().GetRenderer().GetPM();
              ConFormApp_RS = ContactFormApplet_PM.Get("GetRecordSet");
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                $(".scmanualSr").removeClass("SC-disabled");
                $(".scexAssetradio").removeClass("SC-disabled");
                $(".scexorderradio").removeClass("SC-disabled");
                $("#SC-OA-toggle").removeClass("SC-disabled");
                $("#sc-table-OA").hide();
                $("#sc-title-OA").hide();
                $("#sc-pag-OA").hide();
                $("#SC-ExistSR-parent").hide();
                $("#SC-selectSR").hide();
                $("#SC-Create-New-SR").hide();
                $("#SC-after-Activity").hide();
                $("#SC-OA-toggle").hide();

                $("#Cancel-Manual-Activity").hide();

                $("#firstrightfields").html("");
                $("#SC-dynamic").html("");
                $("#firstrightfields").hide();
                $("#SC-saveSRBack").hide();
                $("#SC-saveSR").hide();
                $("#SC-footer-Fields").hide();
                $("#sc-editAct-text").hide();
                //$("#sc-manual-editContactEmail-text").hide();
                $("#Cancel-Activity-SR").hide();
                $("#Cancel-Manual-Activity_order").hide();
                $("#Cancel-Activity-AC").hide();
                $("#SC-saveAct").hide();
                $("#SC-maualSr-button-parent").hide();
                ActIntChanged = "Y";
                if ($("#SC-manual-newsrtoggle").prop('checked') == true)
                  $("#SC-manual-newsrtoggle").trigger("click");
                if ($("#sc-manual-order").prop('checked') == true)
                {
                  $("#sc-manual-order").trigger("click");
                  $("#sc-manual-asset-parent").removeClass("SC-disabled");
                  $("#sc-manual-AO-parent").removeClass("SC-disabled");
                }
                if ($("#sc-manual-asset").prop('checked') == true)
                {
                  $("#sc-manual-asset").trigger("click");
                  $("#sc-manual-order-parent").removeClass("SC-disabled");
                  $("#sc-manual-AO-parent").removeClass("SC-disabled");
                }
                if ($("#sc-manual-AO").prop('checked') == true)
                {
                  $("#sc-manual-AO").trigger("click");
                  $("#sc-manual-asset-parent").removeClass("SC-disabled");
                  $("#sc-manual-order-parent").removeClass("SC-disabled");
                }
                var ActTypeControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetControls()["Type"];
                SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetPModel().ExecuteMethod("SetFormattedValue", ActTypeControl, ActType);
                ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
                ActBc = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetBusComp();
                ActId = ActBc.GetFieldValue("Id");
                console.log(ActId);
                var firstFLmarkup = "";
                if (ActvityFieldsJSON.hasOwnProperty(ActType))
                {
                  if (ActvityFieldsJSON[ActType].length != 0)
                  {
                    $("#SC-saveAct").show();
                    $("#firstrightfields").show();
                    $("#SC-dynamic").show();
                    isDropdown = "N";
                    if (ActvityFieldsJSON[ActType][0] == "Interaction Source")
                    {
                      isDropdown = "Y";
                      ArrayValues = IntSrcArray;
                      defaultValueArr = ActBc.GetFieldValue("Q7");
                    }
                    else if (ActvityFieldsJSON[ActType][0] == "Category" || ActvityFieldsJSON[ActType][0] == "Category (OM Use Only)")
                    {
                      isDropdown = "Y";
                      ArrayValues = CategoryArray;
                      defaultValueArr = "";
                    }
                    else if (ActvityFieldsJSON[ActType][0] == "Priority" || ActvityFieldsJSON[ActType][0] == "Priority (Specialty Teams Only)")
                    {
                      isDropdown = "Y";
                      ArrayValues = PriorityArray;
                      defaultValueArr = "";
                    }
                    else if (ActvityFieldsJSON[ActType][0] == "Status")
                    {
                      isDropdown = "Y";
                      ArrayValues = ActStatusArray;
                      defaultValueArr = ActBc.GetFieldValue("Status");
                    }
                    else if (ActvityFieldsJSON[ActType][0] == "Interaction Disposition")
                    {
                      isDropdown = "Y";
                      if (ActBc.GetFieldValue("Q7") != "")
                        ArrayValues = LastArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_ACTIVITY_INTERACTION_DISP' AND [Active]='Y' AND [Parent]='" + ActBc.GetFieldValue("Q7") + "'", "Order By");
                      else
                        ArrayValues = [];
                      defaultValueArr = "";
                    }
                    firstFLmarkup += '								<label class="SC-label">' + ActvityFieldsJSON[ActType][0] + '</label>';
                    if (isDropdown == "Y")
                    {
                      firstFLmarkup += '<select class="SC-input Sc-manual-AC" name="area" id="' + ActvityFieldsIdJSON[ActType][0] + '">';
                      firstFLmarkup += '<option>' + defaultValueArr + '</option>';
                      for (var ar = 0; ar < ArrayValues.length; ar++)
                        if (ArrayValues[ar] != defaultValueArr)
                          firstFLmarkup += '<option>' + ArrayValues[ar] + '</option>';
                      firstFLmarkup += '</select>';
                    }
                    else
                      firstFLmarkup += '								<input type="text" autocomplete="off" name="' + ActvityFieldsJSON[ActType][0] + '" class="SC-input Sc-manual-AC" id="' + ActvityFieldsIdJSON[ActType][0] + '">';
                    $("#firstrightfields").html(firstFLmarkup);

                    var al = 0;
                    var FieldsMarkup = "";
                    isDropdown = "";
                    for (al = 1; al < ActvityFieldsJSON[ActType].length; al++)
                    {
                      isDropdown = "N";
                      if (ActvityFieldsJSON[ActType][al] == "Interaction Source")
                      {
                        isDropdown = "Y";
                        ArrayValues = IntSrcArray;
                        defaultValueArr = ActBc.GetFieldValue("Q7");
                      }
                      else if (ActvityFieldsJSON[ActType][al] == "Category" || ActvityFieldsJSON[ActType][al] == "Category (OM Use Only)")
                      {
                        isDropdown = "Y";
                        ArrayValues = CategoryArray;
                        defaultValueArr = "";
                      }
                      else if (ActvityFieldsJSON[ActType][al] == "Priority" || ActvityFieldsJSON[ActType][al] == "Priority (Specialty Teams Only)")
                      {
                        isDropdown = "Y";
                        ArrayValues = PriorityArray;
                        defaultValueArr = "";
                      }
                      else if (ActvityFieldsJSON[ActType][al] == "Status")
                      {
                        isDropdown = "Y";
                        ArrayValues = ActStatusArray;
                        defaultValueArr = ActBc.GetFieldValue("Status");
                      }
                      else if (ActvityFieldsJSON[ActType][al] == "Interaction Disposition")
                      {
                        isDropdown = "Y";
                        if (ActBc.GetFieldValue("Q7") != "")
                          ArrayValues = LastArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_ACTIVITY_INTERACTION_DISP' AND [Active]='Y' AND [Parent]='" + ActBc.GetFieldValue("Q7") + "'", "Order By");
                        else
                          ArrayValues = [];
                        defaultValueArr = "";
                      }
                      else if (ActType == "Email Now")
                      {
                        if (ActvityFieldsJSON[ActType][al] == "Category 1")
                        {
                          isDropdown = "Y";
                          ArrayValues = ActCatArray;
                          defaultValueArr = ""
                        }
                        else if (ActvityFieldsJSON[ActType][al] == "Category 2")
                        {
                          isDropdown = "Y";
                          ArrayValues = [];
                          defaultValueArr = "";
                        }
                      }
                      else if (ActType == "Consumer Privacy Request")
                      {
                        if (ActvityFieldsJSON[ActType][al] == "Category 1")
                        {
                          isDropdown = "Y";
                          ArrayValues = ActCat1Array;
                          defaultValueArr = ""
                        }
                        else if (ActvityFieldsJSON[ActType][al] == "Category 2")
                        {
                          isDropdown = "Y";
                          ArrayValues = [];
                          defaultValueArr = "";
                        }
                      }
                      if (al % 2 != 0)
                      {
                        FieldsMarkup += ' 						<div class="SC-input-container height60 floatleft scmaualConActivity">';
                        FieldsMarkup += '								<label class="SC-label">' + ActvityFieldsJSON[ActType][al] + '</label>';
                        if (isDropdown == "Y")
                        {
                          FieldsMarkup += '<select class="SC-input Sc-manual-AC" name="area" id="' + ActvityFieldsIdJSON[ActType][al] + '">';
                          FieldsMarkup += '<option>' + defaultValueArr + '</option>';
                          for (var ar = 0; ar < ArrayValues.length; ar++)
                            if (ArrayValues[ar] != defaultValueArr)
                              FieldsMarkup += '<option>' + ArrayValues[ar] + '</option>';
                          FieldsMarkup += '</select>';
                        }
                        else if (ActvityFieldsJSON[ActType][al] == "Comments" || ActvityFieldsJSON[ActType][al] == "Description")
                          FieldsMarkup += '								<textarea type="text" autocomplete="off" maxlength="1500" name="' + ActvityFieldsJSON[ActType][al] + '" class="SC-input Sc-manual-AC" id="' + ActvityFieldsIdJSON[ActType][al] + '"></textarea>';
                        else
                          FieldsMarkup += '								<input type="text" autocomplete="off" name="' + ActvityFieldsJSON[ActType][al] + '" class="SC-input Sc-manual-AC" id="' + ActvityFieldsIdJSON[ActType][al] + '">';
                        FieldsMarkup += '							</div>';
                      }
                      else
                      {
                        FieldsMarkup += ' 						<div class="SC-input-container height60 floatleft floatright scmaualConActivity">';
                        FieldsMarkup += '								<label class="SC-label">' + ActvityFieldsJSON[ActType][al] + '</label>';
                        if (isDropdown == "Y")
                        {
                          FieldsMarkup += '<select class="SC-input Sc-manual-AC" name="area" id="' + ActvityFieldsIdJSON[ActType][al] + '">';
                          FieldsMarkup += '<option>' + defaultValueArr + '</option>';
                          for (var ar = 0; ar < ArrayValues.length; ar++)
                            FieldsMarkup += '<option>' + ArrayValues[ar] + '</option>';
                          FieldsMarkup += '</select>';
                        }
                        else if (ActvityFieldsJSON[ActType][al] == "Comments" || ActvityFieldsJSON[ActType][al] == "Description")
                          FieldsMarkup += '<textarea type="text" autocomplete="off" maxlength="1500" name="' + ActvityFieldsJSON[ActType][al] + '" class="SC-input Sc-manual-AC" id="' + ActvityFieldsIdJSON[ActType][al] + '"></textarea>';
                        else
                          FieldsMarkup += '								<input type="text" autocomplete="off" name="' + ActvityFieldsJSON[ActType][al] + '" class="SC-input Sc-manual-AC" id="' + ActvityFieldsIdJSON[ActType][al] + '">';
                        FieldsMarkup += '							</div>';
                      }
                    }
                    if (ActType == "Email Now")
                    {
                      FieldsMarkup += '							<div id="sc-camp-url">';
                      FieldsMarkup += '							</div>';
                    }

                    if (ActivitySRJSON[ActType] == "Y")
                    {
                      /* if(al%2==0){
                      	FieldsMarkup+=' 						<div class="SC-input-container height60 floatleft floatright no-border-bottom">';
                      	FieldsMarkup+='							<button class="srbutton" id="SC-maualSr-button">Pick Service Request</button>';
                      	FieldsMarkup+='							</div>';
                      }
                      else{
                      	FieldsMarkup+=' 						<div class="SC-input-container height60 floatleft no-border-bottom">';
                      	FieldsMarkup+='							<button class="srbutton" id="SC-maualSr-button">Pick Service Request</button>';
                      	FieldsMarkup+='							</div>';
                      } */
                      $("#SC-maualSr-button-parent").show();
                      $("#SC-maualSr-button").show();
                    }
                    $("#SC-dynamic").html(FieldsMarkup);
                    var fieldValue = "";
                    for (var mn = 0; mn < ActvityFieldsIdJSON[ActType].length; mn++)
                    {
                      fieldValue = ActvityFieldsIdJSON[ActType][mn];
                      $("#" + fieldValue).val(ActBc.GetFieldValue(ActivityFieldsJSON[fieldValue]));
                      $("#" + fieldValue).attr("title", ActBc.GetFieldValue(ActivityFieldsJSON[fieldValue]));
                      if (fieldValue == "SC_Act_IntDis")
                        $("#SC_Act_IntDis").addClass("sc-lastmanual-Ac");
                      else if (fieldValue == "SC_ACT_strtDate")
                      {
                        if (ActType == "Consumer Privacy Request")
                        {
                          $("#SC_ACT_strtDate").datetimepicker(
                          {
                            changeYear: true,
                            changeMonth: true,
                            dateFormat: 'mm/dd/yy',
                            timeFormat: 'HH:mm:ss',
                            use24hours: true,
                            buttonImageOnly: true,
                            showOn: 'button',
                            buttonText: 'Show Date',
                            buttonImage: 'images/custom/calendar.png',
                            onSelect: function (dateText, inst)
                            {
                              $("#SC_ACT_strtDate").parent().addClass("is-active is-completed");
                            },
                            showButtonPanel: true
                          });
                        }
                        else
                        {
                          $("#SC_ACT_strtDate").datetimepicker(
                          {
                            changeYear: true,
                            changeMonth: true,
                            dateFormat: 'mm/dd/yy',
                            timeFormat: 'HH:mm:ss',
                            use24hours: true,
                            minDate: 0,
                            buttonImageOnly: true,
                            showOn: 'button',
                            buttonText: 'Show Date',
                            buttonImage: 'images/custom/calendar.png',
                            onSelect: function (dateText, inst)
                            {
                              $("#SC_ACT_strtDate").parent().addClass("is-active is-completed");
                            },
                            showButtonPanel: true
                          });
                        }
                        $("#SC_ACT_strtDate").addClass("trialextensiondate");
                        $("#SC_ACT_strtDate").parent().addClass("is-active is-completed");
                      }
                      else if (fieldValue == "SC_Trial_EXDate")
                      {
                        $("#SC_Trial_EXDate").datepicker(
                        {
                          dateFormat: 'mm/dd/yy',
                          minDate: 0,
                          onSelect: function (dateText, inst)
                          {
                            $("#SC_Trial_EXDate").parent().addClass("is-active is-completed");
                          },
                          showButtonPanel: true
                        });
                      }
                      else if (fieldValue == "SC_ACt_owner")
                      {
                        $('<img src="images/custom/search.png" class="pricelist-search-icon" id="SC-manual-Owner">').insertAfter("#SC_ACt_owner");
                        $('#SC_ACt_owner').prop('disabled', true);
                      }
                      else if (fieldValue == "SC-con-Email")
                      {
                        $("#SC-con-Email").val(ConFormApp_RS[0]["Email Address"]);
                        $("#SC-con-Email").attr('name', 'SCconemail');
                        $("#SC-con-Email").siblings().addClass("mandatory");
                        //$("#SC-con-Email").addClass("emailwidth300");
                        $("#SC-con-Email").siblings().attr('id', 'SCconemaillabel');
                        var PopOverMarkup = "";
                        PopOverMarkup += 'Confirm Email Address <img src="images/custom/Info1.png" class="info-icon" id="emailinfo"> ';
                        PopOverMarkup += '<div class="SC-email-tooltip">';
                        PopOverMarkup += '<p>This email address will be updated on the contact</p>';
                        PopOverMarkup += '</div>';
                        $("#SCconemaillabel").html(PopOverMarkup);
                        $(".SC-email-tooltip").show();
                        $("#SC-con-Email").parent().addClass("is-active is-completed");
                        $("#emailinfo").hover(function ()
                        {
                          $(".SC-email-tooltip").show();
                        }, function ()
                        {
                          $(".SC-email-tooltip").hide();
                        });
                      }
                      else if (fieldValue == "SC_Act_Cat1" && ActType == "Email Now")
                      {
                        $("#SC_Act_Cat1").siblings().addClass("mandatory");
                        //$("#SC_Act_Cat1").attr('name','SCemailCat1');
                      }
                      else if (fieldValue == "SC_Act_Cat2" && ActType == "Email Now")
                      {
                        $("#SC_Act_Cat2").siblings().addClass("mandatory");
                        //$("#SC_Act_Cat2").attr('name','SCemailCat2');
                      }
                    }

                    $('.Sc-manual-AC').each(function ()
                    {
                      if ($(this).val() != "")
                        $(this).parent().addClass("is-active is-completed");
                    });
                  }
                  else
                  {
                    if (ActivitySRJSON[ActType] == "Y")
                    {
                      $("#SC-maualSr-button-parent").show();
                      $("#SC-maualSr-button").show();
                    }
                    $("#SC-saveAct").show();
                  }
                }
                else
                {
                  $("#Cancel-Activity-AC").show();
                }
                if (ActvityFieldsJSON.hasOwnProperty(ActType))
                {
                  if (ActType == "Trial Extension" || ActType == "Email Now")
                    $("#SC-saveAct").hide();
                  if (ActType == "BBB")
                  {
                    $("#SC-saveAct").hide();
                    $("#Cancel-Activity-AC").show();
                  }

                }
                $("#maskoverlay").hide();
              }, 50);
            }
          });
          //End:code for on change of activity type
          $(document).on('hover', '#emailinfo', function ()
          {
            $(".SC-email-tooltip").show();
          });

          this.GetPM().AttachPMBinding("FieldChange", function (control, field_value)
          {
            if (control.GetName() == "Primary Owned By")
            {
              $("#SC_ACt_owner").val(field_value);
              $("#SC_ACt_owner").parent().addClass("is-active is-completed");
            }
          });

          //code for invoking the owner pick applet
          $(document).on('click', "#SC-manual-Owner", function (event)
          {
            event.stopImmediatePropagation();
            var rcdline = ActBc.GetSelection() + 1;
            //$("#"+rcdline+"_SR_Number").blur();
            $("#" + rcdline + "_Primary_Owned_By").trigger("click");
            $("#" + rcdline + "_Primary_Owned_By").focus();
            SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetPModel().GetRenderer().GetPM().OnControlEvent(SiebelApp.Constants.get("PHYEVENT_INVOKE_PICK"), SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetControls()["Primary Owned By"]);
          });
          //code for on click of pick service request buttton
          $(document).on('click', "#SC-maualSr-button", function (event)
          {
            event.stopImmediatePropagation();
            $("#maskoverlay").show();
            setTimeout(function ()
            {
              $("#SC-saveAct").hide();
              $("#sc-select-exSR").addClass("SC-disabled");
              GetExistSR();
              $("#SC-ExistSR-parent").show();
              $("#SC-selectSR").show();
              $("#SC-maualSr-button").hide();
              $("#SC-maualSr-button-parent").hide();
              $("#SC-NewSR-toggle").show();

              $("#maskoverlay").hide();
            }, 100);
          });

          // SPATIBAN: Nov 15 2019 start:Code for to get sorted SR details
          $(document).on("click", ".sortSR", function (e)
          {
            e.stopImmediatePropagation();
            var tbtxt = $(this).text();
            var dsplyname = ActivitySCSortSRJSON[tbtxt];
            if ($(this).hasClass("Ascending"))
            {
              $(this).removeClass("Ascending");
              $(this).addClass("decending");
              sortrecords(1, dsplyname);
            }
            else
            {
              $(this).addClass("Ascending");

              sortrecords(0, dsplyname);
              $(this).removeClass("decending");
            }

          });

          //End:Code for to get sorted SR details
          function sortrecords(asc, prop)
          {

            ExistSRRcdSet = ExistSRRcdSet.sort(function (a, b)
            {
              if (prop == "Created")
              {
                var c = new Date(a[prop]).getTime();
                var d = new Date(b[prop]).getTime();
                if (asc)
                {
                  return (c > d) ? 1 : ((c < d) ? -1 : 0);
                }
                else
                {
                  return (d > c) ? 1 : ((d < c) ? -1 : 0);
                }
              }
              else
              {
                if (asc)
                {
                  return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                }
                else
                {
                  return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
              }
            });
            exSRStartpage = 0;
            AppendSRMarkup(exSRStartpage);
          }

          //Start:Code for to get the existing SR details
          function GetExistSR()
          {
            if (ExistSRLen == 0 || NewSRcreated == "Y" || refreshSR == "Y")
            {
              if (NewSRcreated == "Y")
              {
                NewSRcreated = "N";
                SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].InvokeMethod("RefreshBusComp");
              }
              if (refreshSR == "Y")
                refreshSR = "N";
              ExistSRRcdSet = [];
              var Bservice = '',
                inPS_Set = '',
                outPS_Set = '',
                SRSrcSpec = "",
                childobj, childjson, rcdset, value;
              inPS_Set = SiebelApp.S_App.NewPropertySet();
              outPS_Set = SiebelApp.S_App.NewPropertySet();
              SRSrcSpec = "[Contact Id]='" + ConFormApp_RS[0]["Id"] + "' AND [SR Type]='Incident'";
              inPS_Set.SetProperty("SrcSpec", SRSrcSpec);
              Bservice = SiebelApp.S_App.GetService("SC Contact Manual Actvity BS"); //get service
              outPS_Set = Bservice.InvokeMethod("GetSRDetails", inPS_Set);
              ExistSRLen = outPS_Set.GetChild(0).GetChildCount();
              for (var ps = 0; ps < ExistSRLen; ps++)
              {
                childobj = {};
                childjson = [];
                value = "";
                rcdset = outPS_Set.GetChild(0).GetChild(ps);
                property = rcdset.GetFirstProperty();
                while (property != null)
                {
                  value = rcdset.GetProperty(property);
                  childobj[property] = value
                  property = rcdset.GetNextProperty();
                }
                childjson.push(childobj);
                ExistSRRcdSet = ExistSRRcdSet.concat(childjson);
              }
            }
            console.log(ExistSRRcdSet);
            if (ExistSRLen <= 10)
            {
              $("#SC_exist_SR_Pag").hide();
            }
            exSRStartpage = 0;
            AppendSRMarkup(exSRStartpage);

          }
          //End:Code for to get the existing SR details
          //Start:Code for displaying the existing SR details
          function AppendSRMarkup(stpage)
          {
            var exSRMarkup = "",
              Cldate = "",
              opdate = "";
            var rcdlen = stpage + 10;
            for (var ex = stpage; ex < rcdlen && ExistSRLen != ex; ex++)
            {
              exSRMarkup += '<tr>';
              exSRMarkup += '<td class="lesspadding select-width"><input type="radio" name="existsr" id="manual' + ExistSRRcdSet[ex]["SR Number"] + '" class="radio scexSRradio select-width"></td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["Status"] + '">' + ExistSRRcdSet[ex]["Status"] + '</td>';
              if (ExistSRRcdSet[ex]["Closed Date"] != "")
                Cldate = ExistSRRcdSet[ex]["Closed Date"].split(" ")[0];
              else
                Cldate = "";
              exSRMarkup += '<td class="lesspadding" title="' + Cldate + '">' + Cldate + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["INS Product"] + '">' + ExistSRRcdSet[ex]["INS Product"] + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["INS Area"] + '">' + ExistSRRcdSet[ex]["INS Area"] + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["INS Sub-Area"] + '">' + ExistSRRcdSet[ex]["INS Sub-Area"] + '</td>';
              exSRMarkup += '<td title="' + ExistSRRcdSet[ex]["Description"] + '" class="teaxtareatd lesspadding"><textarea class="SC-input height30" readonly>' + ExistSRRcdSet[ex]["Description"] + '</textarea></td>';
              if (ExistSRRcdSet[ex]["Created"] != "")
                opdate = ExistSRRcdSet[ex]["Created"].split(" ")[0];
              else
                opdate = "";
              exSRMarkup += '<td class="lesspadding" title="' + opdate + '">' + opdate + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["SC SR Order Number"] + '">' + ExistSRRcdSet[ex]["SC SR Order Number"] + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["Asset Number"] + '">' + ExistSRRcdSet[ex]["Asset Number"] + '</td>';
              exSRMarkup += '<td class="lesspadding" title="' + ExistSRRcdSet[ex]["SR Number"] + '">' + ExistSRRcdSet[ex]["SR Number"] + '</td>';
              exSRMarkup += '</tr>';
            }
            $("#SC-exist-SR-Tbody").html(exSRMarkup);
            if (ActBc.GetFieldValue("SR Number") != "")
            {
              $("#manual" + ActBc.GetFieldValue("SR Number")).prop("checked", true);
              $("#manual" + ActBc.GetFieldValue("SR Number")).parent().parent().addClass("main-bg");
              $("#sc-select-exSR").removeClass("SC-disabled");
            }
          }
          //End:Code for displaying the existing SR details
          //var ExistAssetLen=0,exAssetStartpage,ExistAssetRcdSet=[];
          //Start:Code for to get the existing Asset details
          function getAssetDeatils()
          {
            if (ExistAssetLen == 0 || refreshAsset == "Y")
            {
              if (refreshAsset == "Y")
                refreshAsset = "N";
              ExistAssetRcdSet = [];
              var Bservice = '',
                inPS_Set = '',
                outPS_Set = '',
                SRSrcSpec = "",
                childobj, childjson, rcdset, value, AssetMarkup;
              inPS_Set = SiebelApp.S_App.NewPropertySet();
              outPS_Set = SiebelApp.S_App.NewPropertySet();
              SRSrcSpec = "([Parent Asset Id] IS NULL OR [Parent Asset Id]=[Root Asset Id]) AND [Status]='Active' AND [Base Price]>0 AND [Owner Contact Id]='" + ConFormApp_RS[0]["Id"] + "'";
              inPS_Set.SetProperty("SrcSpec", SRSrcSpec);
              Bservice = SiebelApp.S_App.GetService("SC Contact Manual Actvity BS"); //get service
              outPS_Set = Bservice.InvokeMethod("GetAssetDetails", inPS_Set);
              ExistAssetLen = outPS_Set.GetChild(0).GetChildCount();
              for (var ps = 0; ps < ExistAssetLen; ps++)
              {
                childobj = {};
                childjson = [];
                value = "";
                rcdset = outPS_Set.GetChild(0).GetChild(ps);
                property = rcdset.GetFirstProperty();
                while (property != null)
                {
                  value = rcdset.GetProperty(property);
                  childobj[property] = value
                  property = rcdset.GetNextProperty();
                }
                childjson.push(childobj);
                ExistAssetRcdSet = ExistAssetRcdSet.concat(childjson);
              }
            }
            console.log(ExistAssetRcdSet);
            AssetMarkup = "";
            AssetMarkup += '                                    <table class="SC-table">';
            AssetMarkup += '                                        <thead>';
            AssetMarkup += '                                            <tr>';
            AssetMarkup += '                                                <th>Select</th>';
            AssetMarkup += '                                                <th>Product Name</th>';
            AssetMarkup += '                                                <th>Product Line</th>';
            AssetMarkup += '                                                <th>Purchased</th>';
            AssetMarkup += '                                                <th>Trial End Date</th>';
            AssetMarkup += '                                                <th>SKU</th>';
            AssetMarkup += '                                                <th>Order Number</th>';
            AssetMarkup += '                                                <th>start Price</th>';
            AssetMarkup += '                                                <th>Current Asset Value</th>';
            AssetMarkup += '                                            </tr>';
            AssetMarkup += '                                        </thead>';
            AssetMarkup += '                                        <tbody id="SC-existAsset-tbody">';
            AssetMarkup += '                                        </tbody>';
            AssetMarkup += '                                    </table>';
            $("#sc-table-OA").html(AssetMarkup);
            $("#sc-pag-OA").show();
            if (ExistAssetLen <= 10)
            {
              $("#sc-pag-OA").hide();
            }
            exAssetStartpage = 0;
            AppendAssetMarkup(exAssetStartpage);

          }
          //End:Code for to get the existing Asset details
          //Start:Code for displaying the existing Asset details
          function AppendAssetMarkup(AststartPage)
          {
            var exAssetMarkup = "",
              prdate = "";
            var rcdlen = AststartPage + 10;
            for (var As = AststartPage; As < rcdlen && ExistAssetLen != As; As++)
            {
              exAssetMarkup += '<tr>';
              exAssetMarkup += '<td><input type="radio" name="existAssetradio" id="manual' + ExistAssetRcdSet[As]["Asset Number"] + '" class="radio scexAssetradio"></td>';
              exAssetMarkup += '<td title="' + ExistAssetRcdSet[As]["SC Calc Long Description"] + '">' + ExistAssetRcdSet[As]["SC Calc Long Description"] + '</td>';
              exAssetMarkup += '<td title="' + ExistAssetRcdSet[As]["Product Primary Product Line"] + '">' + ExistAssetRcdSet[As]["Product Primary Product Line"] + '</td>';
              if (ExistAssetRcdSet[As]["Purchase Date"] != "")
                prdate = ExistAssetRcdSet[As]["Purchase Date"].split(" ")[0];
              else
                prdate = "";
              exAssetMarkup += '<td title="' + prdate + '">' + prdate + '</td>';
              exAssetMarkup += '<td title="' + ExistAssetRcdSet[As]["SC Trial End Date"] + '">' + ExistAssetRcdSet[As]["SC Trial End Date"] + '</td>';
              exAssetMarkup += '<td title="' + ExistAssetRcdSet[As]["Product Name"] + '">' + ExistAssetRcdSet[As]["Product Name"] + '</td>';
              exAssetMarkup += '<td title="' + ExistAssetRcdSet[As]["SC Order Number"] + '">' + ExistAssetRcdSet[As]["SC Order Number"] + '</td>';
              exAssetMarkup += '<td>$' + ExistAssetRcdSet[As]["Base Price"].toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '</td>';
              exAssetMarkup += '<td>$' + ExistAssetRcdSet[As]["Adjusted Value"].toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '</td>';
              exAssetMarkup += '</tr>';
            }
            $("#SC-existAsset-tbody").html(exAssetMarkup);
          }
          //End:Code for displaying the existing Asset details
          //Start:Code for to get the existing Order details
          function getorderDeatils()
          {
            if (ExistOrderLen == 0 || refreshOrder == "Y")
            {
              if (refreshOrder == "Y")
                refreshOrder = "N";
              ExistOrderRcdSet = [];
              var Bservice = '',
                inPS_Set = '',
                outPS_Set = '',
                SRSrcSpec = "",
                childobj, childjson, rcdset, value, OrderMarkup;
              inPS_Set = SiebelApp.S_App.NewPropertySet();
              outPS_Set = SiebelApp.S_App.NewPropertySet();
              var tosysDate = new Date();
              var dd = tosysDate.getDate();
              var mm = tosysDate.getMonth() + 1;
              var yyyy = tosysDate.getFullYear() - 1;
              var formatdate = mm + '/' + dd + '/' + yyyy;
              SRSrcSpec = "[Contact Id]='" + ConFormApp_RS[0]["Id"] + "' AND [Order Date]>'" + formatdate + "'";
              inPS_Set.SetProperty("SrcSpec", SRSrcSpec);
              Bservice = SiebelApp.S_App.GetService("SC Contact Manual Actvity BS"); //get service
              outPS_Set = Bservice.InvokeMethod("GetOrderDetails", inPS_Set);
              ExistOrderLen = outPS_Set.GetChild(0).GetChildCount();
              for (var ps = 0; ps < ExistOrderLen; ps++)
              {
                childobj = {};
                childjson = [];
                value = "";
                rcdset = outPS_Set.GetChild(0).GetChild(ps);
                property = rcdset.GetFirstProperty();
                while (property != null)
                {
                  value = rcdset.GetProperty(property);
                  childobj[property] = value
                  property = rcdset.GetNextProperty();
                }
                childjson.push(childobj);
                ExistOrderRcdSet = ExistOrderRcdSet.concat(childjson);
              }
            }
            console.log(ExistOrderRcdSet);
            OrderMarkup = "";
            OrderMarkup += '                                    <table class="SC-table" id="SC-Manual-existordertable">';
            OrderMarkup += '                                        <thead>';
            OrderMarkup += '                                            <tr>';
            OrderMarkup += '                                                <th>Select</th>';
            OrderMarkup += '                                                <th>Order #</th>';
            OrderMarkup += '                                                <th>Subtype</th>';
            OrderMarkup += '                                                <th>Order Date</th>';
            OrderMarkup += '                                                <th>Status</th>';
            OrderMarkup += '                                            </tr>';
            OrderMarkup += '                                        </thead>';
            OrderMarkup += '                                        <tbody id="SC-existOrder-tbody">';
            OrderMarkup += '                                        </tbody>';
            OrderMarkup += '                                    </table>';
            $("#sc-table-OA").html(OrderMarkup);
            $("#sc-pag-OA").show();
            if (ExistOrderLen <= 10)
            {
              $("#sc-pag-OA").hide();
            }
            exOrderStartpage = 0;
            AppendOrderMarkup(exOrderStartpage);

          }
          //End:Code for to get the existing Order details
          //Start:Code for displaying the existing Order details
          function AppendOrderMarkup(OrtstartPage)
          {
            var exOrderMarkup = "",
              Ordate = "";
            var rcdlen = OrtstartPage + 10;
            for (var or = OrtstartPage; or < rcdlen && ExistOrderLen != or; or++)
            {
              exOrderMarkup += '<tr id="Order' + ExistOrderRcdSet[or]["Id"] + 'main">';
              exOrderMarkup += '<td><div class="radioplus"><input type="radio" name="existOrderradio" id="manual' + ExistOrderRcdSet[or]["Order Number"] + '" class="radio scexorderradio"><span class="glyphicon no-margin glyphicon-plus-sign icon-img add-item ManualgetLineItems" id="Order' + ExistOrderRcdSet[or]["Id"] + '"></span></div></td>';
              exOrderMarkup += '<td title="' + ExistOrderRcdSet[or]["Order Number"] + '">' + ExistOrderRcdSet[or]["Order Number"] + '</td>';
              exOrderMarkup += '<td title="' + ExistOrderRcdSet[or]["SC Sub-Type"] + '">' + ExistOrderRcdSet[or]["SC Sub-Type"] + '</td>';
              if (ExistOrderRcdSet[or]["Order Date"] != "")
                Ordate = ExistOrderRcdSet[or]["Order Date"].split(" ")[0];
              else
                Ordate = "";
              exOrderMarkup += '<td title="' + Ordate + '">' + Ordate + '</td>';
              exOrderMarkup += '<td title="' + ExistOrderRcdSet[or]["Status"] + '">' + ExistOrderRcdSet[or]["Status"] + '</td>';
              exOrderMarkup += '</tr>';
              exOrderMarkup += '<tr class="showhide" id="Order' + ExistOrderRcdSet[or]["Id"] + '_Line">';
              exOrderMarkup += '<td class="assetbc-bg" colspan="5">';
              exOrderMarkup += '	<div class="activity-block">';
              exOrderMarkup += '	  <div class="SC-table-with-scroll-main">';
              exOrderMarkup += '		<table class="SC-table">';
              exOrderMarkup += '			<thead>';
              exOrderMarkup += '				<tr class="backcolor">';
              exOrderMarkup += '				<th class="whitebg">Select</th>'; //25Mar25;SL;Added for elementool-SFSTRY0003379
              exOrderMarkup += '				<th class="whitebg">SKU #</th>';
              exOrderMarkup += '				<th class="whitebg">Product</th>';
              exOrderMarkup += '				<th class="whitebg">Line Total</th>';
              exOrderMarkup += '				</tr>';
              exOrderMarkup += '				</thead>';
              exOrderMarkup += '				<tbody id="Order' + ExistOrderRcdSet[or]["Id"] + '_Line_tbody">';
              exOrderMarkup += '				</tbody>';
              exOrderMarkup += '				</table>';
              exOrderMarkup += '				</div>';
              exOrderMarkup += '	</div>';
              exOrderMarkup += '</td>';
              exOrderMarkup += '</tr>';
            }
            $("#SC-existOrder-tbody").html(exOrderMarkup);
          }
          //End:Code for displaying the existing Order details
          //Start:Code for display the line items related to order
          $(document).on('click', "#SC-Manual-existordertable tbody tr .ManualgetLineItems", function (event)
          {
            event.stopImmediatePropagation();
            var orderrowId = $(this).attr('id')

            var currentId = $(this).parent().parent().parent().attr('id');
            if (!$(this).parent().parent().parent().hasClass("showhide"))
            {
              var hidden = $(this).parent().parent().parent().next('tr.showhide').is(":visible");
              if (hidden)
              {
                $(this).parent().parent().parent().removeClass("showhide");
                $(this).parent().parent().parent().next('tr.showhide').hide('slow');
                $(this).parent().parent().parent().removeClass("main-bg");

              }
              else
              {
                /*$("#SC-Manual-existordertable tbody tr").not(this).siblings().next('tr.showhide').hide('slow');
                if($("#SC-Manual-existordertable tbody tr").not(this).siblings().next('tr.showhide').is(":visible")){
                	 var rowId=$(".expanded").attr("id");
                	$('#' + rowId ).removeClass("expanded");
                 }*/
                $(this).parent().parent().parent().next('tr.showhide').show('slow');
                $(this).parent().parent().parent().addClass("expanded");

                var selected = $(this).parent().parent().parent().hasClass("main-bg");
                $(this).parent().parent().parent().addClass("main-bg");

              }
            }
            if ($("#" + orderrowId).siblings().prop('checked') == true)
            {
              $(this).parent().parent().parent().addClass("main-bg");
            }
            if ($(this).hasClass("glyphicon-plus-sign"))
            {
              $(this).removeClass("glyphicon-plus-sign");
              $(this).addClass("glyphicon-minus-sign");
              if (!$(this).hasClass("firsttime"))
              {
                $(this).addClass("firsttime");
                $("#maskoverlay").show();
                setTimeout(function ()
                {
                  GetLineDeatils(orderrowId);
                  $("#maskoverlay").hide();
                }, 50);
              }
            }
            else
            {
              $(this).addClass("glyphicon-plus-sign");
              $(this).removeClass("glyphicon-minus-sign");
            }
          });

          function GetLineDeatils(Lineid)
          {
            var tdid = Lineid;
            Lineid = Lineid.split("Order");
            var Bservice = '',
              inPS_Set = '',
              outPS_Set = '',
              SRSrcSpec = "",
              childobj, childjson, rcdset, value, LineMarkup, ExistLineLen = 0,
              ExistLineRcdSet = [];
            inPS_Set = SiebelApp.S_App.NewPropertySet();
            outPS_Set = SiebelApp.S_App.NewPropertySet();
            SRSrcSpec = "[Order Header Id]='" + Lineid[1] + "' AND [Request To Cancel]<>'Y' AND [Start Price]>0.00";
            inPS_Set.SetProperty("SrcSpec", SRSrcSpec);
            Bservice = SiebelApp.S_App.GetService("SC Contact Manual Actvity BS"); //get service
            outPS_Set = Bservice.InvokeMethod("GetLineDetails", inPS_Set);
            ExistLineLen = outPS_Set.GetChild(0).GetChildCount();
            for (var ps = 0; ps < ExistLineLen; ps++)
            {
              childobj = {};
              childjson = [];
              value = "";
              rcdset = outPS_Set.GetChild(0).GetChild(ps);
              property = rcdset.GetFirstProperty();
              while (property != null)
              {
                value = rcdset.GetProperty(property);
                childobj[property] = value
                property = rcdset.GetNextProperty();
              }
              childjson.push(childobj);
              ExistLineRcdSet = ExistLineRcdSet.concat(childjson);
            }
            console.log(ExistLineRcdSet);
            LineMarkup = "";
            for (var li = 0; li < ExistLineLen; li++)
            {
              LineMarkup += '<tr>';
              //25Mar25;SL;Added below for elementool-SFSTRY0003379
              LineMarkup += '<td class="orangbg"><input type="radio" name="existorderlineradio" id="' + ExistLineRcdSet[li]["Id"] + '" class="radio scorderlineradio" previousvalue="checked"></td>';
              LineMarkup += '<td class="orangbg" title="' + ExistLineRcdSet[li]["Part Number"] + '">' + ExistLineRcdSet[li]["Part Number"] + '</td>';
              LineMarkup += '<td class="orangbg" title="' + ExistLineRcdSet[li]["SC Calc Long Description"] + '">' + ExistLineRcdSet[li]["SC Calc Long Description"] + '</td>';
              LineMarkup += '<td class="orangbg">$' + ExistLineRcdSet[li]["SC Line Total NRC"].toString().replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + '</td>';
              LineMarkup += '</tr>';
            }
            $("#" + tdid + "_Line_tbody").html(LineMarkup);

          }
          //End:Code for display the line items related to order
          //function for display the footer fields
          function footerActvity()
          {

            var ActFtMarkup = "",
              hasdropdown = "",
              LastArrayValues = [];
            var ftActType = $("#SC-ActType").val();
            ActFtMarkup = "";
            if (ActvitylastFieldsJSON.hasOwnProperty(ftActType))
              for (var ft = 0; ft < ActvitylastFieldsJSON[ftActType].length; ft++)
              {
                hasdropdown = "";
                lastdefaultValueArr = "";
                LastArrayValues = [];
                if (ActvitylastFieldsJSON[ftActType][ft] == "Interaction Disposition")
                {
                  hasdropdown = "Y";
                  lastdefaultValueArr = "";
                  if (ActIntChanged == "Y")
                  {
                    ActIntChanged = "N";
                    LastArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_ACTIVITY_INTERACTION_DISP' AND [Active]='Y' AND [Parent]='" + ActBc.GetFieldValue("Q7") + "'", "Order By");
                    ActInterActArray = LastArrayValues;
                  }
                  else
                    LastArrayValues = ActInterActArray;
                }
                else if (ActvitylastFieldsJSON[ftActType][ft] == "Status")
                {
                  hasdropdown = "Y";
                  lastdefaultValueArr = ActBc.GetFieldValue("Status");
                  LastArrayValues = ActStatusArray;
                }
                ActFtMarkup += '<form id="SC-Footerfields-validator">';
                if (ft % 2 == 0)
                {
                  ActFtMarkup += '<div class="SC-input-container height60 floatleft scmaualConActivity">';
                  ActFtMarkup += '<label class="SC-label">' + ActvitylastFieldsJSON[ftActType][ft] + '</label>';
                  if (hasdropdown == "Y")
                  {
                    ActFtMarkup += '	<select class="SC-input sc-lastmanual-Ac" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '">';
                    ActFtMarkup += '<option>' + lastdefaultValueArr + '</option>';
                    for (var ar = 0; ar < LastArrayValues.length; ar++)
                      if (LastArrayValues[ar] != lastdefaultValueArr)
                        ActFtMarkup += '<option>' + LastArrayValues[ar] + '</option>';
                    ActFtMarkup += '	</select>';
                  }
                  else if (ActvitylastFieldsJSON[ftActType][ft] == "Comments")
                    ActFtMarkup += '	<textarea type="text" maxlength="1500" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" autocomplete="off" class="SC-input sc-lastmanual-Ac" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '"></textarea>';
                  else
                    ActFtMarkup += '	<input type="text" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" autocomplete="off" class="SC-input sc-lastmanual-Ac" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '">';
                  ActFtMarkup += '</div>';
                }
                else
                {
                  ActFtMarkup += '<div class="SC-input-container height60 floatleft floatright scmaualConActivity">';
                  ActFtMarkup += '<label class="SC-label">' + ActvitylastFieldsJSON[ftActType][ft] + '</label>';
                  if (hasdropdown == "Y")
                  {
                    ActFtMarkup += '	<select class="SC-input sc-lastmanual-Ac" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '">';
                    ActFtMarkup += '<option>' + lastdefaultValueArr + '</option>';
                    for (var ar = 0; ar < LastArrayValues.length; ar++)
                      if (LastArrayValues[ar] != lastdefaultValueArr)
                        ActFtMarkup += '<option>' + LastArrayValues[ar] + '</option>';
                    ActFtMarkup += '	</select>';
                  }
                  else if (ActvitylastFieldsJSON[ftActType][ft] == "Comments")
                    ActFtMarkup += '	<textarea type="text" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" maxlength="1500" autocomplete="off" class="SC-input sc-lastmanual-Ac" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '"></textarea>';
                  else
                  {
                    ActFtMarkup += '	<input type="text" name="' + ActvitylastFieldsJSON[ftActType][ft] + '" autocomplete="off" class="SC-input sc-lastmanual-Ac" id="' + ActvityLastFieldsIdJSON[ftActType][ft] + '">';
                  }
                  ActFtMarkup += '</div>';
                }
              }
            if (ActFtMarkup != "")
            {
              ActFtMarkup += '<form>';
              $("#sc-editAct-text").show();
              $("#SC-footer-Fields").show();
            }
            if (ftActType == "Trial Extension" || ftActType == "Email Now")
            {
              //$("#sc-manual-editContactEmail-text").show();
              $("#SC-con-Email").val(ConFormApp_RS[0]["Email Address"]);
              /* if(ConFormApp_RS[0]["Email Address"]!=""){
			  $("#SC-con-Email").attr('name','SCconemail');
		  }
		  else
			   $("#SC-con-Email").attr('name','SCconemailreq'); */
            }
            $("#SC-footer-Fields").html(ActFtMarkup);
            if (ActFtMarkup != "")
            {
              for (var mn = 0; mn < ActvityLastFieldsIdJSON[ftActType].length; mn++)
              {
                fieldValue = ActvityLastFieldsIdJSON[ftActType][mn];
                $("#" + fieldValue).val(ActBc.GetFieldValue(ActivityFieldsJSON[fieldValue]));
                $("#" + fieldValue).attr("title", ActBc.GetFieldValue(ActivityFieldsJSON[fieldValue]));
                if (fieldValue == "SC_Act_IntDis")
                  $("#SC_Act_IntDis").addClass("sc-lastmanual-Ac");
                else if (fieldValue == "SC_Trial_EXDate")
                {
                  $("#SC_Trial_EXDate").datepicker(
                  {
                    dateFormat: 'mm/dd/yy',
                    minDate: 0,
                    changeYear: true,
                    changeMonth: true,
                    buttonImageOnly: true,
                    showOn: 'button',
                    buttonText: 'Show Date',
                    buttonImage: 'images/custom/calendar.png',
                    onSelect: function (dateText, inst)
                    {
                      $("#SC_Trial_EXDate").parent().addClass("is-active is-completed");
                    },
                    showButtonPanel: true
                  });
                  /* $(".ui-datepicker-trigger").css({
                  	    "opacity": "0.5",
                  		"height": "16px",
                  		"width": "16px",
                  		"position": "absolute",
                  		"bottom": "12px",
                  		"left": "0"
                  }); */
                  $("#SC_Trial_EXDate").parent().addClass("is-active is-completed");
                  $("#SC_Trial_EXDate").addClass("trialextensiondate");
                  if (ActBc.GetFieldValue("SC SR Asset Number") == "")
                  {
                    $("#SC_Trial_EXDate").parent().addClass("SC-disabled");
                  }
                  else
                    $("#SC_Trial_EXDate").attr('placeholder', 'MM/DD/YYYY');
                  $("#SC_Trial_EXDate").siblings().addClass("mandatory");
                  $("#SC_Trial_EXDate").attr('name', 'ScTrialExtdate');
                  $("#SC_Trial_EXDate").keyup(function ()
                  {
                    if ($("#SC_Trial_EXDate").parent().hasClass("SC-disabled"))
                      $("#SC_Trial_EXDate").val('');
                  });
                  $("#SC_Trial_EXDate").keypress(function ()
                  {
                    if (!$("#SC_Trial_EXDate").parent().hasClass("SC-disabled"))
                      var dateofbirth = $(this).val();
                    if (dateofbirth != "")
                    {
                      if (dateofbirth.length === 2)
                      {
                        dateofbirth = dateofbirth + "/";
                      }
                      else if (dateofbirth.length === 5)
                      {
                        dateofbirth = dateofbirth + "/";
                      }
                      $(this).val(dateofbirth);
                    }
                  });
                }
                footerformsubmit();
              }
            }
            //SPATIBAN:21:MAR:2022: Added code for #STRY0159897
            if (ftActType == "Email Now")
            {
              $("#SC_Act_IntDis").attr("name", "actintDis");
              $("#SC_Act_Cmt").attr("name", "actcomments");
              $("#SC_Act_IntDis").siblings().addClass("mandatory");
              $("#SC_Act_Cmt").siblings().addClass("mandatory");
              footerformsubmit();
            }
            $('.sc-lastmanual-Ac').each(function ()
            {
              if ($(this).val() != "")
                $(this).parent().addClass("is-active is-completed");
            });
            ActBc = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetBusComp();
            $("#Cancel-Activity-SR").hide();
            $("#Cancel-Manual-Activity_order").hide();
            $("#Cancel-Activity-AC").hide();
            /* if(ActBc.GetFieldValue("SR Number")!="" && ActBc.GetFieldValue("SC SR Asset Number")!="")
            	$("#Cancel-Activity-SR").show();
            else if(ActBc.GetFieldValue("SC Originating Order Number")!="")
            	$("#Cancel-Manual-Activity_order").show();
            else */
            $("#Cancel-Activity-AC").show();

          }
          //SPATIBAN:21:MAR:2022: Added code for #STRY0159897
          function footerformsubmit()
          {
            errorCodes = ErrorCodesfn.errorcodes();
            var errortext = "";
            if (ActBc.GetFieldValue("SC SR Asset Number") == "")
              errortext = errorCodes.SC_ASSET_REQ;
            else
              errortext = errorCodes.SC_TRIALEXTENSION_REQ;
            $("#SC-Footerfields-validator").validate(
            {
              rules:
              {
                ScTrialExtdate:
                {
                  required: true
                },
                actintDis:
                {
                  required: true
                },
                actcomments:
                {
                  required: true,
                  minlength: 5
                }
              },
              messages:
              {
                ScTrialExtdate:
                {
                  required: errortext
                },
                actintDis:
                {
                  required: "Please Select a Interaction Disposition From The list"
                },
                actcomments:
                {
                  required: "Please Enter Comments",
                  minlength: "Minimum of 5 characters required"
                }
              },
              tooltip_options:
              {
                ScTrialExtdate:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                actintDis:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                actcomments:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
              },
              submitHandler: function (form)
              {
                event.preventDefault();
              }
            });
          }
          //Start: code for on change of Interaction Source value
          $(document).on("change", "#SC_Act_Int", function (event)
          {
            event.stopImmediatePropagation();
            var IntrEx = "";
            $('.sc-lastmanual-Ac').each(function ()
            {
              if ($(this).attr("id") == "SC_Act_IntDis")
                IntrEx = "Y";
            });
            if (IntrEx == "Y")
            {
              var ActVal = $("#SC_Act_Int").val();
              var LastIntArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_ACTIVITY_INTERACTION_DISP' AND [Active]='Y' AND [Parent]='" + ActVal + "'", "Order By");
              ActInterActArray = LastIntArrayValues;
              var IntMarkup = "";
              IntMarkup += '<option></option>';
              for (var ar = 0; ar < LastIntArrayValues.length; ar++)
                IntMarkup += '<option>' + LastIntArrayValues[ar] + '</option>';
              $("#SC_Act_IntDis").html(IntMarkup);
            }
            else
              ActIntChanged = "Y";
          });
          //End: code for on change of Interaction Source value
          //Start: code for on change of Email now Category 1
          $(document).on("change", "#SC_Act_Cat1", function (event)
          {
            event.stopImmediatePropagation();
            if (this.value != "")
            {
              var Cat2ArrayValues;
              var cat2Markup = "";
              if ($("#SC-ActType").val() == "Email Now")
              {
                Cat2ArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_EMAILNOW_CATEGORY_TWO' AND [Active]='Y' AND [Parent]='" + this.value + "'", "Order By");
              }
              else if ($("#SC-ActType").val() == "Consumer Privacy Request")
              {
                Cat2ArrayValues = SC_OUI_Methods.GetLOVs("[Type]= 'SC_EMAILNOW_CATEGORY_TWO' AND [Active]='Y' AND [Parent]='" + this.value + "'", "Order By");
              }

              cat2Markup += '<option></option>';
              for (var ct2 = 0; ct2 < Cat2ArrayValues.length; ct2++)
                cat2Markup += '<option>' + Cat2ArrayValues[ct2] + '</option>';
              $("#SC_Act_Cat2").html(cat2Markup);
            }
            $("#SC_Act_CampURL").text("");
            $("#SC_Act_CampURL").attr("href", "");
            $("#SC_Act_CampURL").addClass("SC-disabled");
            $("#SC_Act_CampURL").parent().removeClass("is-active is-completed");
          });
          //End: code for on change of Email now Category 1 
          //Start: code for on click of selected SR button
          $(document).on("click", "#sc-select-exSR", function (event)
          {
            event.stopImmediatePropagation();
            var SrId = "";
            //$("#SC-NewSR-toggle").hide();
            $("#maskoverlay").show();
            setTimeout(function ()
            {
              var existSRButtons = document.getElementsByName("existsr");
              for (var x = 0; x < existSRButtons.length; x++)
              {
                if (existSRButtons[x].checked)
                {
                  SrId = existSRButtons[x].id
                }
              }
              SrId = SrId.split("manual");
              var SRControl = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetControls()["SR Number"];
              SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetPModel().ExecuteMethod("SetFormattedValue", SRControl, SrId[1]);
              var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
              var ActCntrl = "",
                selActType = $("#SC-ActType").val(),
                ActcntrlName = "";
              for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
              {
                if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner")
                {
                  ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                  ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                  if (ActCntrl != undefined)
                    if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                      ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                }
              }
              ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
              SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].InvokeMethod("RefreshBusComp");
              footerActvity();
              $("#SC-NewSR-toggle").hide();
              $("#maskoverlay").hide();
            }, 50);
            //$("#SC-saveAct").hide();
          });
          //End: code for on click of selected SR button
          //Start:code for on select of either Order details or Asset details
          $(document).on('change', "#sc-manual-order", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-manual-order").prop('checked') == true)
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                //$("#sc-manual-asset-parent").addClass("SC-disabled");
                //$("#sc-manual-AO-parent").addClass("SC-disabled");
                if ($("#sc-manual-AO").prop('checked') == true)
                  $("#sc-manual-AO").trigger("click");
                if ($("#sc-manual-asset").prop('checked') == true)
                  $("#sc-manual-asset").trigger("click");
                $("#sc-manual-title-text").text("Orders");
                getorderDeatils();
                $("#sc-table-OA").show();
                $("#sc-title-OA").show();
				if($('#SR-Manual-Order-Prod').parent().parent().css('display') == "none")//28Mar25;SL;Added for elementool-SFSTRY0003379
				{
					$('#SR-Manual-Order-Prod').parent().parent().show();
				}
                $("#sc-manual-title-img").attr("src", "images/custom/orders_selected.png");
                $("#SC-saveSR").addClass("SC-disabled");
                isAssetrcd = "N";
                isOrdercd = "Y";
                $("#maskoverlay").hide();
              }, 50);
            }
            else
            {
              //$("#sc-manual-asset-parent").removeClass("SC-disabled");
              //$("#sc-manual-AO-parent").removeClass("SC-disabled");
              $("#sc-table-OA").hide();
              $("#sc-title-OA").hide();
              isAssetrcd = "N";
              isOrdercd = "N";
            }
          });

          $(document).on('change', "#sc-manual-AO", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-manual-AO").prop('checked') == true)
            {
              //$("#sc-manual-order-parent").addClass("SC-disabled");
              //$("#sc-manual-asset-parent").addClass("SC-disabled");
              if ($("#sc-manual-asset").prop('checked') == true)
                $("#sc-manual-asset").trigger("click");
              if ($("#sc-manual-order").prop('checked') == true)
                $("#sc-manual-order").trigger("click");
              $("#SC-saveSR").removeClass("SC-disabled");
              isAssetrcd = "N";
              isOrdercd = "N";
            }
            else
            {
              //$("#sc-manual-order-parent").removeClass("SC-disabled");
              //$("#sc-manual-asset-parent").removeClass("SC-disabled");
              $("#SC-saveSR").addClass("SC-disabled");
              isAssetrcd = "N";
              isOrdercd = "N";
            }
          });
          $(document).on('change', "#sc-manual-asset", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#sc-manual-asset").prop('checked') == true)
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                //$("#sc-manual-order-parent").addClass("SC-disabled");
                //$("#sc-manual-AO-parent").addClass("SC-disabled");
                if ($("#sc-manual-order").prop('checked') == true)
                  $("#sc-manual-order").trigger("click");
                if ($("#sc-manual-AO").prop('checked') == true)
                  $("#sc-manual-AO").trigger("click");
                $("#sc-manual-title-text").text("Assets");
                getAssetDeatils();
                $("#sc-table-OA").show();
                $("#sc-title-OA").show();
				if($('#SR-Manual-Order-Prod').parent().parent().css('display') != "none")//28Mar25;SL;Added for elementool-SFSTRY0003379
				{
					$('#SR-Manual-Order-Prod').parent().parent().hide();
				}				
                $("#sc-manual-title-img").attr("src", "images/custom/Assets-selected.png");
                $("#SC-saveSR").addClass("SC-disabled");
                isAssetrcd = "Y";
                isOrdercd = "N";
                $("#maskoverlay").hide();
              }, 50);
            }
            else
            {
              //$("#sc-manual-order-parent").removeClass("SC-disabled");
              //$("#sc-manual-AO-parent").removeClass("SC-disabled");
              $("#sc-table-OA").hide();
              $("#sc-title-OA").hide();
              isAssetrcd = "N";
              isOrdercd = "N";
            }
          });
          //End:code for on select of either Order details or Asset details
          //Start:code for email validation
          $(document).on('change', "#SC-con-Email", function (event)
          {
            event.stopImmediatePropagation();
            EmailChanged = "Y";
            $("#sc-manual-Act-Creation").submit();
            if ($("#SC-con-Email").val() == "")
            {
              $("#SC-con-Email").val(SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetBusComp().GetFieldValue("Email Address"));
              $("#SC-con-Email").parent().addClass("is-active is-completed");
            }

          });
          $(document).on('change', "#SC_Act_Stat", function (event)
          {
            event.stopImmediatePropagation();
            ActstatusDone = "N";
            if ((this.value == "Done") && ($("#SC-ActType").val() == "Email Now" || $("#SC-ActType").val() == "Trial Extension"))
            {
              var Emailvalue = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetBusComp().GetFieldValue("Email Address");
              if (Emailvalue == "" || ($("#SC-ActType").val() == "Email Now" && ($("#SC_Act_Cat1").val() == "" || $("#SC_Act_Cat2").val() == "")) || ($("#SC-ActType").val() == "Trial Extension" && $("#SC_Trial_EXDate").val() == ""))
              {
                $("#SC_Act_Stat").val($(this).attr("title"));
                ActstatusDone = "Y";
                if ($("#SC-ActType").val() == "Trial Extension" && $("#SC_Trial_EXDate").val() == "")
                  $("#SC-Footerfields-validator").submit();
                if (Emailvalue == "")
                  $("#sc-manual-Act-Creation").submit();
                else if (Emailvalue != "" && ($("#SC-ActType").val() == "Email Now"))
                {
                  $("#SC_Act_Cat1").attr('name', 'SCemailCat1');
                  $("#SC_Act_Cat2").attr('name', 'SCemailCat2');
                  $("#sc-manual-Act-Creation").submit();
                }
              }
              else
              {
                removeNullOptionTag("SC_Act_Cat1");
                removeNullOptionTag("SC_Act_Cat2");
              }
            }
            $(this).attr("title", $("#SC_Act_Stat").val());
            if ($("#SC-con-Email").val() == "" && Emailvalue != "")
              $("#SC-con-Email").val(Emailvalue);
          });
          //End:code for email validation
          //Start:code for email now and trial extension validation
          $('#SC-manual-sr-Modal').on('shown.bs.modal', function (event)
          {
            event.stopImmediatePropagation();
            if (isvalidationreq == "Y")
            {
              isvalidationreq = "N";
              var SCEmailAd = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetBusComp().GetFieldValue("Email Address");
              if ($("#SC-ActType").val() == "Email Now")
              {
                if (SCEmailAd == "")
                  $("#sc-manual-Act-Creation").submit();
                else if (SCEmailAd != "")
                {
                  $("#SC_Act_Cat1").attr('name', 'SCemailCat1');
                  $("#SC_Act_Cat2").attr('name', 'SCemailCat2');
                  $("#sc-manual-Act-Creation").submit();
                }
              }
              else if ($("#SC-ActType").val() == "Trial Extension")
              {
                if (SCEmailAd != "")
                  $("#SC-Footerfields-validator").submit();
                else
                  $("#sc-manual-Act-Creation").submit();

              }
            }
          });
          //End:code for email now and trial extension validation
          //Start:code for new SR creation
          $(document).on('change', "#SC-manual-newsrtoggle", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#SC-manual-newsrtoggle").prop('checked') == true)
            {
              $('#SC-NewSR-form-Validate')[0].reset();
              var TypeValue = '';
              TypeValue += ' <option></option>';
              for (var sr = 0; sr < SRTypeArray.length; sr++)
              {
                TypeValue += ' <option>' + SRTypeArray[sr] + '</option>';
              }
              //28Mar25;SL;Added below option for elementool-SFSTRY0003379
              var orderProdHtml = '';
              orderProdHtml += ' <option></option>';
              for (var i = 0; i < orderProdArray.length; i++)
              {
                orderProdHtml += ' <option>' + orderProdArray[i] + '</option>';
              }
              $('#SR-Manual-Type').html(TypeValue);
              $('#SR-Manual-Order-Prod').html(orderProdHtml); //28Mar25;SL;Added for elementool-SFSTRY0003379
			  $('#SR-Manual-Order-Prod').parent().parent().show(); //28Mar25;SL;Added for elementool-SFSTRY0003379
              $("#SC-Create-New-SR").show();
              $("#SC-OA-toggle").show();
              $("#SC-ExistSR-parent").hide();
              $("#SC-selectSR").hide();
              $("#SC-saveSR").show();
              $("#SC-saveAct").hide();
              $("#SC-saveSRBack").show();
              $("#SC-maualSr-button").hide();
              $("#SC-maualSr-button-parent").hide();
              $("#SC-saveSR").addClass("SC-disabled");
            }
          });
          $(document).on('change', "#SR-Manual-Type", function (event)
          {
            event.stopImmediatePropagation();
            if (this.value != "")
            {
              var AreaArray = new Array;
              searchExpr = '',
                sortSpec = '',
                searchExpr = "[Type]= 'SR_AREA' AND [Active]='Y' AND  [Parent]='" + this.value + "'";
              sortSpec = "Order By";
              AreaArray = SC_OUI_Methods.GetLOVs(searchExpr, sortSpec);
              var AreaValues = '';
              AreaValues += '<option></option>';
              for (var sr = 0; sr < AreaArray.length; sr++)
              {
                AreaValues += ' <option>' + AreaArray[sr] + '</option>';
              }
              $('#SR-Manual-Area').html(AreaValues);
            }
            else
            {
              $('#SR-Manual-Area').html("<option></option>");
            }
          });
          $(document).on('change', "#SR-Manual-Area", function (event)
          {
            event.stopImmediatePropagation();
            if (this.value != "")
            {
              var In_SubArea = '';
              In_SubArea = SiebelApp.S_App.NewPropertySet();
              var Out_SubArea = '';
              Out_SubArea = SiebelApp.S_App.NewPropertySet();
              var Subtypevalue = $("#SR-Manual-Type").val();
              var parentLOV = ""
              var childLOV = this.value;
              parentLOV = Subtypevalue + " " + childLOV;
              SiebelJS.Log("this.value" + childLOV);

              var SubAreaArray = new Array;
              searchExpr = '',
                sortSpec = '';
              if (childLOV.includes("'"))
              {
                searchExpr = "[Type]= 'SR_AREA' AND [Active]='Y'";
                searchExpr += 'AND  [Parent]=' + '"' + parentLOV + '"';
              }
              else
                searchExpr = "[Type]= 'SR_AREA' AND [Active]='Y' AND  [Parent]='" + parentLOV + "'";
              sortSpec = "Parent";
              SubAreaArray = SC_OUI_Methods.GetLOVs(searchExpr, sortSpec);
              var SubAreaValue = '';
              SubAreaValue += ' <option></option>';
              for (var sr = 0; sr < SubAreaArray.length; sr++)
              {
                SubAreaValue += ' <option>' + SubAreaArray[sr] + '</option>';
              }
              $('#SR-Manual-SubArea').html(SubAreaValue);
            }
            else
            {
              $('#SR-Manual-SubArea').html("<option></option>");
            }
          });
          var errorCodes = '';
          errorCodes = ErrorCodesfn.errorcodes();

          function SRformvalidation()
          {
            errorCodes = ErrorCodesfn.errorcodes();
            $("#sc-manual-Act-Creation").validate(
            {
              rules:
              {
                SCconemail:
                {
                  email: true,
                  required: true
                },
                SCemailCat1:
                {
                  required: true
                },
                SCemailCat2:
                {
                  required: true
                }
              },
              messages:
              {
                SCconemail:
                {
                  email: errorCodes.SC_INVALID_EMAIL,
                  required: errorCodes.SC_REQUIRED_EMAIL
                },
                SCemailCat1:
                {
                  required: errorCodes.SC_EMAILNOW_CATEGORY1
                },
                SCemailCat2:
                {
                  required: errorCodes.SC_EMAILNOW_CATEGORY2
                }


              },
              tooltip_options:
              {
                SCconemail:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                SCemailCat1:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                SCemailCat2:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                }
              },
              submitHandler: function (form)
              {
                event.preventDefault();
                $("#maskoverlay").show();
                setTimeout(function ()
                {
                  EmailChanged = "N";
                  SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetBusComp().SetFieldValue("Email Address", $("#SC-con-Email").val());
                  SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].InvokeMethod("WriteRecord");
                  SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].InvokeMethod("RefreshBusComp");
                  ContactFormApplet_PM = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetPModel().GetRenderer().GetPM();
                  ConFormApp_RS = ContactFormApplet_PM.Get("GetRecordSet");
                  ActBc = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetBusComp();
                  $("#maskoverlay").hide();
                  if ($("#SC-ActType").val() == "Trial Extension" && $("#SC_Trial_EXDate").val() == "" && ActstatusDone == "Y")
                    $("#SC-Footerfields-validator").submit();
                  if ($("#SC-ActType").val() == "Email Now")
                  {
                    $("#SC_Act_Cat1").attr('name', 'SCemailCat1');
                    $("#SC_Act_Cat2").attr('name', 'SCemailCat2');
                    if (($("#SC_Act_Cat1").val() == "" || $("#SC_Act_Cat2").val() == "") && ActstatusDone == "Y")
                      $("#sc-manual-Act-Creation").submit();
                  }
                }, 50);
              }
            });

            $("#SC-NewSR-form-Validate").validate(
            {
              rules:
              {
                manualSRType:
                {
                  required: true
                },
                manualSRArea:
                {
                  required: true
                },
                manualSRSubArea:
                {
                  required: true
                },
                manualSRDesc:
                {
                  required: true
                }
              },
              messages:
              {
                manualSRType: errorCodes.SC_REQUIRED_TYPE,
                manualSRArea: errorCodes.SC_REQUIRED_AREA,
                manualSRSubArea: errorCodes.SC_REQUIRED_SUBAREA,
                manualSRDesc: errorCodes.SC_REQUIRED_DETDES
              },
              tooltip_options:
              {
                manualSRType:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                manualSRArea:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                manualSRSubArea:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                },
                manualSRDesc:
                {
                  trigger: 'focus',
                  placement: 'bottom',
                  html: true
                }
              },
              submitHandler: function (form)
              {
                event.preventDefault();
                $("#maskoverlay").show();
                setTimeout(function ()
                {
                  var contact_Id = ConFormApp_RS[0]["Id"];
                  var SRSubType = $('#SR-Manual-Type').val();
                  var SRManArea = $('#SR-Manual-Area').val();
                  var SRManualSubArea = $('#SR-Manual-SubArea').val();
                  var SRDetailedDescription = $('#SR-manual-DESC').val();
                  var AssetNumber = "",
                    Orgorder = "";

                  //if(isAssetrcd=="Y"){
                  if ($("#sc-manual-asset").prop('checked') == true)
                  {
                    var AsetrId = "";
                    var assetButtons = document.getElementsByName("existAssetradio");
                    for (var x = 0; x < assetButtons.length; x++)
                    {
                      if (assetButtons[x].checked)
                      {
                        AsetrId = assetButtons[x].id
                      }
                    }
                    AsetrId = AsetrId.split("manual");
                    AssetNumber = AsetrId[1];
                  }
                  //if(isOrdercd=="Y"){
                  if ($("#sc-manual-order").prop('checked') == true)
                  {
                    var orderradioId = "";
                    var orgorButtons = document.getElementsByName("existOrderradio");
                    for (var x = 0; x < orgorButtons.length; x++)
                    {
                      if (orgorButtons[x].checked)
                      {
                        orderradioId = orgorButtons[x].id
                      }
                    }
                    orderradioId = orderradioId.split("manual");
                    Orgorder = orderradioId[1];
                    //25Mar25;SL;Start-Added for elementool-SFSTRY0003379
                    var orderProd = $('#SR-Manual-Order-Prod').val();
                    var origLineRadioBtn = document.getElementsByName("existorderlineradio");
                    var strLineId = "";
                    for (var i = 0; i < origLineRadioBtn.length; i++)
                    {
                      if (origLineRadioBtn[i].checked)
                      {
                        strLineId = origLineRadioBtn[i].id;
                        break;
                      }
                    } //25Mar25;SL;End-Added for elementool-SFSTRY0003379
                  }
                  ActId = ActBc.GetFieldValue("Id");
                  var SR_inPS = '',
                    SR_outPS = '',
                    Asset_Service = '';
                  SR_inPS = SiebelApp.S_App.NewPropertySet();
                  Opp_outPS = SiebelApp.S_App.NewPropertySet();
                  SR_inPS.SetProperty("SR Type", SRSubType);
                  SR_inPS.SetProperty("SR Area", SRManArea);
                  SR_inPS.SetProperty("SR SubArea", SRManualSubArea);
                  SR_inPS.SetProperty("Detail Desc", SRDetailedDescription);
                  SR_inPS.SetProperty("AssetNumber", AssetNumber);
                  SR_inPS.SetProperty("Org Order", Orgorder);
                  SR_inPS.SetProperty("Object Id", contact_Id);
                  SR_inPS.SetProperty("Activity Id", ActId);
                  SR_inPS.SetProperty("Org Order Line Id", strLineId); //25Mar25;SL;Added for elementool-SFSTRY0003379
                  SR_inPS.SetProperty("Org Order Prod", orderProd); //28Mar25;SL;Added for elementool-SFSTRY0003379
                  SR_inPS.SetProperty("ProcessName", "SC Create New SR WF");
                  Asset_Service = SiebelApp.S_App.GetService("Workflow Process Manager"); //get service
                  SR_outPS = Asset_Service.InvokeMethod("RunProcess", SR_inPS); //invoke the method 
                  SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].InvokeMethod("RefreshBusComp");
                  var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
                  var ActCntrl = "",
                    selActType = $("#SC-ActType").val(),
                    ActcntrlName = "";
                  for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                  {
                    if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner")
                    {
                      ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                      ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                      if (ActCntrl != undefined)
                        if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                          ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                    }
                  }
                  ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
                  ActBc = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"].GetBusComp();
                  footerActvity();
                  //$("#SC-saveAct").show();
                  $("#SC-saveSR").hide();
                  $("#SC-saveSRBack").hide();
                  $(".scmanualSr").addClass("SC-disabled");
                  $(".scexAssetradio").addClass("SC-disabled");
                  $(".scexorderradio").addClass("SC-disabled");
                  $("#SC-OA-toggle").addClass("SC-disabled");
                  NewSRcreated = "Y";
                  $("#SC-saveSR").hide();
                  //$('#SC-NewSR-form-Validate')[0].reset();
                  $("#maskoverlay").hide();
                }, 50);
              } //closing submit handler
            });
          }
          $(document).on('click', "#SC-saveSR", function (event)
          {
            event.stopImmediatePropagation();
            $("#SC-NewSR-form-Validate").submit();
          });
          //End:code for new SR creation
          //Start:code for on click of save activity button
          $(document).on("click", "#SC-saveAct", function (event)
          {
            event.stopImmediatePropagation();
            $("#maskoverlay").show();
            setTimeout(function ()
            {
              var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
              var ActCntrl = "",
                selActType = $("#SC-ActType").val(),
                ActcntrlName = "",
                isStatusExist = "N";
              if (ActvityFieldsIdJSON.hasOwnProperty(selActType))
              {
                for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                {
                  if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                    isStatusExist = "Y";
                  if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                  {
                    ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                      {
                        ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                      }
                  }
                }
                if (isStatusExist == "Y")
                {
                  if ($("#SC_Act_Stat").val() != "")
                  {
                    ActcntrlName = ActivityControlsJSON["SC_Act_Stat"];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#SC_Act_Stat").val());
                  }
                }

                ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
              }
              $("#SC-saveAct").hide();
              if (SC_OUI_Methods.SCGetProfileAttrValue('SC Store User') != "Y")
              {
                footerActvity();
              }
              else
                $("#SC-manual-sr-Modal").modal('hide');
              $("#maskoverlay").hide();

            }, 50);
          });
          //End:code for on click of save activity button
          //Start:code for on click of go to order button
          $(document).on("click", "#Cancel-Manual-Activity_order", function (event)
          {
            event.stopImmediatePropagation();
            $("#maskoverlay").show();
            var rcdline = ActBc.GetSelection() + 1,
              isStatusExist = "N";
            setTimeout(function ()
            {
              var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
              var ActCntrl = "",
                selActType = $("#SC-ActType").val(),
                ActcntrlName = "";
              if (ActvityFieldsIdJSON.hasOwnProperty(selActType))
              {
                for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                {
                  if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                    isStatusExist = "Y";
                  if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                  {
                    ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                        ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                  }
                }
              }
              if (ActvityLastFieldsIdJSON.hasOwnProperty(selActType))
              {
                var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
                var ActCntrl = "",
                  selActType = $("#SC-ActType").val(),
                  ActcntrlName = "";
                for (var sl = 0; sl < ActvityLastFieldsIdJSON[selActType].length; sl++)
                {
                  if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                    isStatusExist = "Y";
                  if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                  {
                    ActcntrlName = ActivityControlsJSON[ActvityLastFieldsIdJSON[selActType][sl]];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      if ($("#" + ActvityLastFieldsIdJSON[selActType][sl]).val() != "")
                        ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityLastFieldsIdJSON[selActType][sl]).val());
                  }
                }
              }
              if (isStatusExist == "Y")
              {
                if ($("#SC_Act_Stat").val() != "")
                {
                  ActcntrlName = ActivityControlsJSON["SC_Act_Stat"];
                  ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                  if (ActCntrl != undefined)
                    ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#SC_Act_Stat").val());
                }
              }
              $("#SC-manual-sr-Modal").modal('hide');
              $("#maskoverlay").hide();
              ActPm.ExecuteMethod("OnDrillDown", "Originating Order #", rcdline);
            }, 80);
          });
          //End:code for on click of go to order button
          //Start:code for on click of go to SR button
          $(document).on("click", "#Cancel-Activity-SR", function (event)
          {
            event.stopImmediatePropagation();
            $("#maskoverlay").show();
            var rcdline = ActBc.GetSelection() + 1;
            setTimeout(function ()
            {
              var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
              var ActCntrl = "",
                selActType = $("#SC-ActType").val(),
                ActcntrlName = "",
                isStatusExist = "N";
              if (ActvityFieldsIdJSON.hasOwnProperty(selActType))
              {
                for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                {
                  if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                    isStatusExist = "Y";
                  if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                  {
                    ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                        ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                  }
                }
              }
              if (ActvityLastFieldsIdJSON.hasOwnProperty(selActType))
              {
                var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
                var ActCntrl = "",
                  selActType = $("#SC-ActType").val(),
                  ActcntrlName = "";
                for (var sl = 0; sl < ActvityLastFieldsIdJSON[selActType].length; sl++)
                {
                  if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                    isStatusExist = "Y";
                  if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                  {
                    ActcntrlName = ActivityControlsJSON[ActvityLastFieldsIdJSON[selActType][sl]];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      if ($("#" + ActvityLastFieldsIdJSON[selActType][sl]).val() != "")
                        ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityLastFieldsIdJSON[selActType][sl]).val());
                  }

                }
                // ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
              }
              if (isStatusExist == "Y")
              {
                if ($("#SC_Act_Stat").val() != "")
                {
                  ActcntrlName = ActivityControlsJSON["SC_Act_Stat"];
                  ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                  if (ActCntrl != undefined)
                    ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#SC_Act_Stat").val());
                }
              }

              $("#SC-manual-sr-Modal").modal('hide');
              $("#maskoverlay").hide();
              ActPm.ExecuteMethod("OnDrillDown", "SR Number", rcdline);
            }, 80);

          });
          //End : code for on click of goto SR button
          //Start:code for on click of contact Activites button
          $(document).on("click", "#Cancel-Activity-AC", function (event)
          {
            event.stopImmediatePropagation();
            if (EmailChanged == "Y" && $("#SC-ActType").val() == "Email Now")
            {
              $("#sc-manual-Act-Creation").submit();
            }
            //SPATIBAN:21:MAR:2022: Added code for #STRY0159897
            if ($("#SC-ActType").val() == "Email Now" && ($("#SC_Act_IntDis").val().length == 0 || $("#SC_Act_Cmt").val().length < 5))
            {
              $("#SC-Footerfields-validator").submit();
              return false;
            }
            var SCEmailAd = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Form Applet"].GetBusComp().GetFieldValue("Email Address");
            if (($("#SC-ActType").val() == "Email Now" && ($("#SC_Act_Cat1").val() == "" || $("#SC_Act_Cat2").val() == "" || SCEmailAd == "")) || ($("#SC-ActType").val() == "Trial Extension" && ($("#SC_Trial_EXDate").val() == "" || SCEmailAd == "")))
            {
              if (SCEmailAd != "" && $("#SC-ActType").val() == "Email Now")
              {
                $("#SC_Act_Cat1").attr('name', 'SCemailCat1');
                $("#SC_Act_Cat2").attr('name', 'SCemailCat2');
                //$("#sc-manual-Act-Creation").submit();
              }
              ActstatusDone = "N";
              $("#SC-manual-sr-Modal").modal('hide');
              $("#SC-SO-ReqCnfrm-Popup").modal(
              {
                backdrop: 'static'
              });
            }
            else
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
                var ActCntrl = "",
                  selActType = $("#SC-ActType").val(),
                  ActcntrlName = "",
                  isStatusExist = "N";
                if (ActvityFieldsIdJSON.hasOwnProperty(selActType))
                {
                  for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                  {
                    if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                      isStatusExist = "Y";
                    if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                    {
                      ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                      ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                      if (ActCntrl != undefined)
                        if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "")
                          ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                    }
                  }
                }
                if (ActvityLastFieldsIdJSON.hasOwnProperty(selActType))
                {
                  for (var sl = 0; sl < ActvityLastFieldsIdJSON[selActType].length; sl++)
                  {
                    if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                      isStatusExist = "Y";
                    if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                    {
                      ActcntrlName = ActivityControlsJSON[ActvityLastFieldsIdJSON[selActType][sl]];
                      ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                      if (ActCntrl != undefined)
                        if ($("#" + ActvityLastFieldsIdJSON[selActType][sl]).val() != "")
                          ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityLastFieldsIdJSON[selActType][sl]).val());
                    }

                  }
                }
                if (isStatusExist == "Y")
                {
                  if ($("#SC_Act_Stat").val() != "")
                  {
                    ActcntrlName = ActivityControlsJSON["SC_Act_Stat"];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#SC_Act_Stat").val());
                  }
                }
                ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
                $("#SC-manual-sr-Modal").modal('hide');
                $("#maskoverlay").hide();
              }, 80);
            }
          });
          //End:code for on click of contact Activites button
          //Start:code for on click of confirm popup buttons
          $("#sc-ReqCnfrm-no").click(function (event)
          {
            event.stopImmediatePropagation();
            isvalidationreq = "Y";
            $("#SC-SO-ReqCnfrm-Popup").modal('hide');

            $("#SC-manual-sr-Modal").modal(
            {
              backdrop: 'static'
            });
          });
          $(document).on("click", "#sc-ReqCnfrm-yes,#SC-manual-contact-fr-close", function (event)
          {
            event.stopImmediatePropagation();
            var clickid = $(this).attr("id");
            //SPATIBAN:21:MAR:2022: Added code for #STRY0159897
            if (clickid == "SC-manual-contact-fr-close" && $("#SC-ActType").val() == "Email Now")
            {
              if (ActPm.ExecuteMethod("CanInvokeMethod", "UndoRecord"))
                ActPm.ExecuteMethod("InvokeMethod", "UndoRecord", null, false);
              else
              {
                var inPS_BS = "",
                  outPS_BS = "",
                  actrow_id, Bservice_C = "";
                inPS_BS = SiebelApp.S_App.NewPropertySet();
                outPS_BS = SiebelApp.S_App.NewPropertySet();
                actrow_id = SiebelApp.S_App.GetActiveView().GetAppletMap()[SiebelApp.S_App.GetActiveView().GetActiveApplet().GetName()].GetBusComp().GetFieldValue("Id");
                inPS_BS.SetProperty("BusComp", "Action");
                inPS_BS.SetProperty("BusObj", "Action");
                inPS_BS.SetProperty("Id", actrow_id);
                Bservice_C = SiebelApp.S_App.GetService("Inbound E-mail Database Operations"); //get service
                outPS_BS = Bservice_C.InvokeMethod("DeleteRecord", inPS_BS);
                if (ActPm.ExecuteMethod("CanInvokeMethod", "RefreshBusComp"))
                  ActPm.ExecuteMethod("InvokeMethod", "RefreshBusComp", null, false);
              }
              $("#SC-manual-sr-Modal").modal('hide');
            }
            else if ($("#SC-ActType").val() != "")
            {
              $("#maskoverlay").show();
              setTimeout(function ()
              {
                var ActAppletMap = SiebelApp.S_App.GetActiveView().GetAppletMap()["Contact Activity List Applet"];
                var ActCntrl = "",
                  selActType = $("#SC-ActType").val(),
                  ActcntrlName = "",
                  isStatusExist = "N";
                if (ActvityFieldsIdJSON.hasOwnProperty(selActType))
                {
                  for (var sl = 0; sl < ActvityFieldsIdJSON[selActType].length; sl++)
                  {
                    if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                      isStatusExist = "Y";
                    if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                    {
                      ActcntrlName = ActivityControlsJSON[ActvityFieldsIdJSON[selActType][sl]];
                      ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                      if (ActCntrl != undefined)
                        if ($("#" + ActvityFieldsIdJSON[selActType][sl]).val() != "" && $("#" + ActvityFieldsIdJSON[selActType][sl]).val() != undefined)
                          ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityFieldsIdJSON[selActType][sl]).val());
                    }
                  }
                }
                if (ActvityLastFieldsIdJSON.hasOwnProperty(selActType))
                {
                  for (var sl = 0; sl < ActvityLastFieldsIdJSON[selActType].length; sl++)
                  {
                    if (ActvityFieldsIdJSON[selActType][sl] == "SC_Act_Stat")
                      isStatusExist = "Y";
                    if (ActvityFieldsIdJSON[selActType][sl] != "SC_ACt_owner" && ActvityFieldsIdJSON[selActType][sl] != "SC_Act_Stat")
                    {
                      ActcntrlName = ActivityControlsJSON[ActvityLastFieldsIdJSON[selActType][sl]];
                      ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                      if (ActCntrl != undefined)
                        if ($("#" + ActvityLastFieldsIdJSON[selActType][sl]).val() != "" && $("#" + ActvityLastFieldsIdJSON[selActType][sl]).val() != undefined)
                          ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#" + ActvityLastFieldsIdJSON[selActType][sl]).val());
                    }

                  }
                }
                if (isStatusExist == "Y")
                {
                  if ($("#SC_Act_Stat").val() != "")
                  {
                    ActcntrlName = ActivityControlsJSON["SC_Act_Stat"];
                    ActCntrl = ActAppletMap.GetControls()[ActcntrlName];
                    if (ActCntrl != undefined)
                      ActPm.ExecuteMethod("SetFormattedValue", ActCntrl, $("#SC_Act_Stat").val());
                  }
                }
                ActPm.ExecuteMethod("InvokeMethod", "WriteRecord", null, false);
                if (clickid == "sc-ReqCnfrm-yes")
                  $("#SC-SO-ReqCnfrm-Popup").modal('hide');
                else
                  $("#SC-manual-sr-Modal").modal('hide');
                $("#maskoverlay").hide();
              }, 80);
            }
          });
          //End:code for on click of confirm popup buttons
          //Start:code for on click of back button in new SR Creation
          $(document).on("click", "#SC-saveSRBack", function (event)
          {
            event.stopImmediatePropagation();
            if ($("#SC-manual-newsrtoggle").prop('checked') == true)
              $("#SC-manual-newsrtoggle").trigger("click");
            if ($("#sc-manual-order").prop('checked') == true)
            {
              $("#sc-manual-order").trigger("click");
              $("#sc-manual-asset-parent").removeClass("SC-disabled");
              $("#sc-manual-AO-parent").removeClass("SC-disabled");
            }
            if ($("#sc-manual-asset").prop('checked') == true)
            {
              $("#sc-manual-asset").trigger("click");
              $("#sc-manual-order-parent").removeClass("SC-disabled");
              $("#sc-manual-AO-parent").removeClass("SC-disabled");
            }
            if ($("#sc-manual-AO").prop('checked') == true)
            {
              $("#sc-manual-AO").trigger("click");
              $("#sc-manual-asset-parent").removeClass("SC-disabled");
              $("#sc-manual-order-parent").removeClass("SC-disabled");
            }
            $("#SC-Create-New-SR").hide();
            $("#SC-OA-toggle").hide();
            $("#SC-ExistSR-parent").show();
            $("#SC-selectSR").show();
            $("#SC-saveSR").hide();
            //$("#SC-saveAct").show();
            $("#SC-saveSRBack").hide();
            $("#SC-Manual-table-container-OA").hide();
            $("#sc-table-OA").hide();
            $("#sc-pag-OA").hide();
            $("#SC-NewSR-toggle").show();
          });
          //End:code for on click of back button in new SR Creation
          //Start:code for on select of radi buttons in orders or asset or Service request
          $(document).on('click', ".scexorderradio", function (event)
          {
            event.stopImmediatePropagation();
            var previousValue = $(this).attr('previousValue');
            var name = $(this).attr('name');

            if (previousValue == 'checked')
            {
              $(this).prop("checked", false);
              $(this).attr('previousValue', false);
              $("#SC-saveSR").addClass("SC-disabled");
              if (!$("#" + $(this).siblings()[0].id).hasClass("glyphicon-minus-sign"))
                $(this).parent().parent().parent().removeClass("main-bg");
              $('.ManualgetLineItems').each(function ()
              {
                if ((!$("#" + $(this).siblings().context.id).hasClass("glyphicon-minus-sign")) && (!($(this).siblings().prop('checked')) == true))
                  $(this).parent().parent().parent().removeClass("main-bg");
              });
              //$(this).parent().parent().parent().siblings().removeClass("main-bg");
            }
            else
            {
              $("input[name=" + name + "]:radio").attr('previousValue', false);
              $(this).attr('previousValue', 'checked');
              $("#SC-saveSR").removeClass("SC-disabled");
              $(this).parent().parent().parent().addClass("main-bg");
              $('.ManualgetLineItems').each(function ()
              {
                if ((!$("#" + $(this).siblings().context.id).hasClass("glyphicon-minus-sign")) && (!($(this).siblings().prop('checked')) == true))
                  $(this).parent().parent().parent().removeClass("main-bg");
              });
            }
          });
          //25Mar25;SL;On select of radio button under line items for elementool-SFSTRY0003379
          $(document).on('click', ".scorderlineradio", function (event)
          {
            event.stopImmediatePropagation();
            var previousValue = $(this).attr('previousValue');
            var name = $(this).attr('name');

            if (previousValue == 'checked')
            {
              $(this).prop("checked", false);
              $(this).attr('previousValue', false);
            }
            else
            {
              $("input[name=" + name + "]:radio").attr('previousValue', false);
              $(this).attr('previousValue', 'checked');
            }
          });
          $(document).on('click', ".scexAssetradio", function (event)
          {
            event.stopImmediatePropagation();
            var previousValue = $(this).attr('previousValue');
            var name = $(this).attr('name');

            if (previousValue == 'checked')
            {
              $(this).prop("checked", false);
              $(this).attr('previousValue', false);
              $("#SC-saveSR").addClass("SC-disabled");
              $(this).parent().parent().removeClass("main-bg");
              $(this).parent().parent().siblings().removeClass("main-bg");
            }
            else
            {
              $("input[name=" + name + "]:radio").attr('previousValue', false);
              $(this).attr('previousValue', 'checked');
              $("#SC-saveSR").removeClass("SC-disabled");
              $(this).parent().parent().addClass("main-bg");
              $(this).parent().parent().siblings().removeClass("main-bg");
            }
          });
          $(document).on('click', ".scexSRradio", function (event)
          {
            event.stopImmediatePropagation();
            var previousValue = $(this).attr('previousValue');
            var name = $(this).attr('name');

            if (previousValue == 'checked')
            {
              $(this).prop("checked", false);
              $(this).attr('previousValue', false);
              $("#sc-select-exSR").addClass("SC-disabled");
              $(this).parent().parent().removeClass("main-bg");
              $(this).parent().parent().siblings().removeClass("main-bg");
            }
            else
            {
              $("input[name=" + name + "]:radio").attr('previousValue', false);
              $(this).attr('previousValue', 'checked');
              $("#sc-select-exSR").removeClass("SC-disabled");
              $(this).parent().parent().addClass("main-bg");
              $(this).parent().parent().siblings().removeClass("main-bg");
            }
          });
          //End:code for on select of radi buttons in orders or asset or Service request
          //Start:Code for Pagination Logic 
          $(document).on('click', "#exsrprevSet", function (event)
          {
            event.stopImmediatePropagation();
            if (exSRStartpage != 0)
            {
              exSRStartpage = exSRStartpage - 10;
              AppendSRMarkup(exSRStartpage);
            }

          });
          $(document).on('click', "#exsrnextset", function (event)
          {
            event.stopImmediatePropagation();
            if ((exSRStartpage + 10) < ExistSRLen)
            {
              exSRStartpage = exSRStartpage + 10;
              AppendSRMarkup(exSRStartpage);
            }

          });
          $(document).on('click', "#SCprevOA", function (event)
          {
            event.stopImmediatePropagation();
            if (isAssetrcd == "Y")
            {
              if (exAssetStartpage != 0)
              {
                exAssetStartpage = exAssetStartpage - 10;
                AppendAssetMarkup(exAssetStartpage);
              }
            }
            if (isOrdercd == "Y")
            {
              if (exOrderStartpage != 0)
              {
                exOrderStartpage = exOrderStartpage - 10;
                AppendOrderMarkup(exOrderStartpage);
              }
            }
          });
          $(document).on('click', "#SCNextOA", function (event)
          {
            event.stopImmediatePropagation();
            if (isAssetrcd == "Y")
            {
              if ((exAssetStartpage + 10) < ExistAssetLen)
              {
                exAssetStartpage = exAssetStartpage + 10;
                AppendAssetMarkup(exAssetStartpage);
              }
            }
            if (isOrdercd == "Y")
            {
              if ((exOrderStartpage + 10) < ExistOrderLen)
              {
                exOrderStartpage = exOrderStartpage + 10;
                AppendOrderMarkup(exOrderStartpage);
              }
            }
          });
          //End:Code for Pagination Logic
          //function to remove the null option tag
          function removeNullOptionTag(SelectedId)
          {
            var Optionlist = document.getElementById(SelectedId);
            if (Optionlist.options.length > 0)
            {
              for (var op = Optionlist.options.length - 1; op >= 0; op--)
              {
                if (Optionlist.options[op].value == "")
                {
                  Optionlist.remove(op);
                  return false;
                }
              }
            }
          }
          //function refresh the modal
          function AppendManualActivityMarkup()
          {
            var ManualActivityMarkup = "";
            ManualActivityMarkup += '            <div class="modal-dialog">';
            ManualActivityMarkup += '                <!-- Modal content-->';
            ManualActivityMarkup += '                <div class="modal-content">';
            ManualActivityMarkup += '                    <div class="modal-header">';
            ManualActivityMarkup += '                        <button type="button" class="close SC-close-popup blue-bg" data-dismiss="modal" id="SC-manual-contact-fr-close">×</button>';
            ManualActivityMarkup += '                        <div class="header-content">';
            ManualActivityMarkup += '                            <p>Create Activity</p>';
            ManualActivityMarkup += '                        </div>';
            ManualActivityMarkup += '                    </div>';
            ManualActivityMarkup += '                        <div class="modal-body clearfix no-padding">';
            ManualActivityMarkup += '						<div class="main-container">';
            ManualActivityMarkup += '						<!-- Start:first Active Creation Div -->';
            ManualActivityMarkup += '						<div class="fields-container addmargintop clearfix">';
            /*ManualActivityMarkup += '                    <form name="sc-manual-Act-Creation" id="sc-manual-Act-Creation">';
            ManualActivityMarkup += '							<div class="SC-input-container height60 floatleft scmaualConActivity">';
            ManualActivityMarkup += '								<label class="SC-label mandatory">Activity Type</label>';
            ManualActivityMarkup += '								<select class="SC-input" name="area" id="SC-ActType">';
            ManualActivityMarkup += '								</select>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += ' 						<div class="SC-input-container height60 floatleft floatright scmaualConActivity" id="firstrightfields">';
            ManualActivityMarkup += '								<label class="SC-label mandatory">SKU#</label>';
            ManualActivityMarkup += '								<input type="text" name="sku" class="SC-input">';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '							<div id="SC-dynamic">';
            ManualActivityMarkup += '                     </div>'
            ManualActivityMarkup += '                    </form>';*/
            ManualActivityMarkup += '							</div>';
            /*ManualActivityMarkup += '					<div class="SC-single-button-container less-padding" id="SC-maualSr-button-parent">	';
            ManualActivityMarkup += '						<button class="srbutton" id="SC-maualSr-button">Pick Service Request</button>';
            ManualActivityMarkup += '					</div>';*/
            ManualActivityMarkup += '							<!-- End:first Active Creation Div -->';
            ManualActivityMarkup += '							<!-- Start:Desc and SR table-->';
            ManualActivityMarkup += '							<div class="text-table-container clearfix" id="SC-ExistSR-parent">';
            ManualActivityMarkup += '								 <div class="text-container">';
            ManualActivityMarkup += '								   <p class="shortdesc"> Review below Service Requests (SR) for ongoing issue and perform one of the following:</p>';
            // ManualActivityMarkup+='								   <p class="longdesc">Review the Service Requests below to determine if the customer has contact us about their issue before. Reminder, if the customer has contacted us before about their issue but the Service Request is closed, product related Service Requests can be re-opened 60 days from closed date. Order related can always be reopened.</p>';
            ManualActivityMarkup += '									<ul class="longdesc">';
            ManualActivityMarkup += '										<li>Open a Service Request if closed within last 60 days for same product issue.</li>';
            ManualActivityMarkup += '										<li>Pre-delivery order related Service Request can always be reopened.</li>';
            ManualActivityMarkup += '										<li>Create a new Service Request for a new voice or after 60 days from closed Service Request.</li>';
            ManualActivityMarkup += '									</ul>';
            ManualActivityMarkup += '								 </div>';
            ManualActivityMarkup += '								 <div class="table-container" id="SC-ExistSR-parent">';
            ManualActivityMarkup += '								    <div class="SC-title-and-icon">';
            ManualActivityMarkup += '										<div class="icon-and-title">';
            ManualActivityMarkup += '											<img src="images/custom/SR-selected.png" class="contact-icon">';
            ManualActivityMarkup += '											<p class="no-margin">Service Requests</p>';
            ManualActivityMarkup += '										</div>';
            ManualActivityMarkup += '                                    </div>	';
            ManualActivityMarkup += '								    <div class="SC-table-with-scroll-main">';
            ManualActivityMarkup += '                                    <table class="SC-table SC-table-manualAc">';
            ManualActivityMarkup += '                                        <thead>';
            ManualActivityMarkup += '                                            <tr>';
            ManualActivityMarkup += '                                                <th class="select-width">select</th>';
            ManualActivityMarkup += '                                                <th class="sort-by sortSR Acending" id="SRStatus">Status</th>';
            ManualActivityMarkup += '                                                <th id="SRClosed">Closed</th>';
            ManualActivityMarkup += '                                                <th class="sc-table-manualAC-type" >Type</th>';
            ManualActivityMarkup += '                                                <th class="sc-table-manualAC-type">Area</th>';
            ManualActivityMarkup += '                                                <th >Sub Area</th>';
            ManualActivityMarkup += '                                                <th >Detailed Description</th>';
            ManualActivityMarkup += '                                                <th class="sort-by sortSR Acending" style="min-width:115px!important" >Opened Date</th>';
            ManualActivityMarkup += '                                                <th class="sort-by sortSR Acending" >order #</th>';
            ManualActivityMarkup += '                                                <th class="sort-by sortSR Acending" >asset # </th>';
            ManualActivityMarkup += '                                                <th class="sort-by sortSR Acending" >SR # </th>';
            ManualActivityMarkup += '                                            </tr>';
            ManualActivityMarkup += '                                        </thead>';
            ManualActivityMarkup += '                                        <tbody id="SC-exist-SR-Tbody">';
            ManualActivityMarkup += '                                        </tbody>';
            ManualActivityMarkup += '                                    </table>';
            ManualActivityMarkup += '                                </div>';
			GetExistSR();
            ManualActivityMarkup += '								<div class="pagination activity-pagination pull-right" id="SC_exist_SR_Pag">';
            //ManualActivityMarkup+='                                    <li><img src="/Images/custom/previous-set.png" id="exsrfirstSet"></li>';
            ManualActivityMarkup += '                                    <li><img src="images/custom/previous.png" id="exsrprevSet"></li>';
            ManualActivityMarkup += '                                    <li><img src="images/custom/next.png" id="exsrnextset"></li>';
            //ManualActivityMarkup+='                                    <li><img src="/Images/custom/next-set.png" id="exsrlastset"></li>';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '                              </div>';
            ManualActivityMarkup += '						  </div>';
            ManualActivityMarkup += '                           <!-- End:first Active Creation Div -->	';
            ManualActivityMarkup += '						   <!-- Start:ok button and new SR toggle-->';
            ManualActivityMarkup += '						 <div class="button-new-toggle" id="SC-selectSR">';
            ManualActivityMarkup += '						  <div class="Addselected">';
            ManualActivityMarkup += '						   <button class="SC-disabled" id="sc-select-exSR">Add Selected</button>';
            ManualActivityMarkup += '						   </div>';
            ManualActivityMarkup += '						   <div class="new-toggle">';
            ManualActivityMarkup += '							<div id="SC-NewSR-toggle">';
            ManualActivityMarkup += '						   <div class="newsrtext">New Service Request</div>';
            ManualActivityMarkup += '						   <div class="SC-checkbox left80">';
            ManualActivityMarkup += '								<input type="checkbox" name="" id="SC-manual-newsrtoggle">';
            ManualActivityMarkup += '								<label for="SC-manual-newsrtoggle"></label>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '						   </div>';
            ManualActivityMarkup += '						   </div>';
            ManualActivityMarkup += '						  </div>';
            ManualActivityMarkup += '							<!-- End:ok button and new SR toggle-->';
            ManualActivityMarkup += '							 <!-- Start:SR Creation Fields-->';
            ManualActivityMarkup += '							<div class="sr-create-fields clearfix" id="SC-Create-New-SR">';
            ManualActivityMarkup += '							<div class="row no-margin Createsrdiv">';
            ManualActivityMarkup += '							    <p class="labelsr" style="color: #FFFF!important;">Create Service Request</p>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '                         	<form name="SC-NewSR-form-Validate-from" id="SC-NewSR-form-Validate">';
            ManualActivityMarkup += '							  <div class="row no-margin">';
            ManualActivityMarkup += '                                <div class="col-md-6 col-lg-6 col-sm-6 ">';
            ManualActivityMarkup += '                                    <div class="SC-input-container height60">';
            ManualActivityMarkup += '                                        <label class="SC-label mandatory">Type</label>';
            ManualActivityMarkup += '                                        <select class="SC-input scmanualSr" name="manualSRType" id="SR-Manual-Type">';
            ManualActivityMarkup += '                                        </select>';
            ManualActivityMarkup += '                                    </div>';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '                                <div class="col-md-6 col-lg-6 col-sm-6">';
            ManualActivityMarkup += '                                    <div class="SC-input-container height60">';
            ManualActivityMarkup += '                                        <label class="SC-label mandatory">Area</label>';
            ManualActivityMarkup += '                                        <select class="SC-input scmanualSr" name="manualSRArea" id="SR-Manual-Area">';
            ManualActivityMarkup += '                                        </select>';
            ManualActivityMarkup += '                                    </div>';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '                            </div>';
            ManualActivityMarkup += '							<div class="row no-margin">';
            ManualActivityMarkup += '                                <div class="col-md-6 col-lg-6 col-sm-6 ">';
            ManualActivityMarkup += '                                    <div class="SC-input-container height60">';
            ManualActivityMarkup += '                                        <label class="SC-label mandatory">Sub Area</label>';
            ManualActivityMarkup += '                                        <select class="SC-input scmanualSr" name="manualSRSubArea" id="SR-Manual-SubArea">';
            ManualActivityMarkup += '                                        </select>';
            ManualActivityMarkup += '                                    </div>';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '                                <div class="col-md-6 col-lg-6 col-sm-6">';
            ManualActivityMarkup += '                                    <div class="SC-input-container height60">';
            ManualActivityMarkup += '                                        <label class="SC-label mandatory">Detailed Description</label>';
            ManualActivityMarkup += '                                        <textarea type="text" name="manualSRDesc" maxlength="2000" class="SC-input scmanualSr" id="SR-manual-DESC">';
            ManualActivityMarkup += '                                        </textarea>';
            ManualActivityMarkup += '                                    </div>';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '                            </div>';
            ManualActivityMarkup += '             			</form>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '							 <!-- End:SR Creation Fields-->';
            ManualActivityMarkup += '							<!-- Start--After SR Creation,SR INFO -->';
            ManualActivityMarkup += '							<!-- Start: Order-Asset-Toggel -->';
            ManualActivityMarkup += '							<div class="order-asset-toggle clearfix" id="SC-OA-toggle">';
            ManualActivityMarkup += '<div class="order-toggle">';
            ManualActivityMarkup += '<p class="text"><span class="highlate bluebg">Select One:</span></p>';
            ManualActivityMarkup += '</div>';
            ManualActivityMarkup += ' <div class="order-toggle">';
            ManualActivityMarkup += '	<p class="highlate">Order<span class="text"> if Predelivery - order related </span></p>';
            ManualActivityMarkup += '	<div class="SC-checkbox right12" id="sc-manual-order-parent">';
            ManualActivityMarkup += '		<input type="checkbox" name="" id="sc-manual-order">';
            ManualActivityMarkup += '		<label for="sc-manual-order"></label>';
            ManualActivityMarkup += '   </div>';
            ManualActivityMarkup += ' </div>';
            ManualActivityMarkup += ' <div class="order-toggle">';
            ManualActivityMarkup += '   <p class="highlate">Asset<span class="text"> if Postdelivery - asset related </span></p>';
            ManualActivityMarkup += '	<div class="SC-checkbox right12" id="sc-manual-asset-parent">';
            ManualActivityMarkup += '		<input type="checkbox" name="" id="sc-manual-asset">';
            ManualActivityMarkup += '		<label for="sc-manual-asset"></label>';
            ManualActivityMarkup += '   </div>';
            ManualActivityMarkup += ' </div>';
            ManualActivityMarkup += '  <div class="order-toggle">';
            ManualActivityMarkup += '   <p class="text"><span class="highlate">No asset or order on contact file</span></p>';
            ManualActivityMarkup += '	<div class="SC-checkbox right12" id="sc-manual-AO-parent">';
            ManualActivityMarkup += '		<input type="checkbox" name="" id="sc-manual-AO">';
            ManualActivityMarkup += '		<label for="sc-manual-AO"></label>';
            ManualActivityMarkup += '   </div>';
            ManualActivityMarkup += ' </div>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '							<!-- End: Order-Asset-Toggel -->';
            ManualActivityMarkup += '							<!-- Start: Order-Asset-Table -->';
            ManualActivityMarkup += '							<div class="text-table-container clearfix" id="sc-title-OA">';
            ManualActivityMarkup += '								<div class="table-container">';
            ManualActivityMarkup += '								    <div class="SC-title-and-icon" id="SC-Manual-table-container-OA">';
            ManualActivityMarkup += '										<div class="icon-and-title">';
            ManualActivityMarkup += '											<img src="images/custom/SR-selected.png" class="contact-icon" id="sc-manual-title-img">';
            ManualActivityMarkup += '											<p class="no-margin" id="sc-manual-title-text">Orders</p>';
            ManualActivityMarkup += '										</div>';
            ManualActivityMarkup += '                                    </div>	';
            ManualActivityMarkup += '							 <div class="SC-table-with-scroll-main" id="sc-table-OA">';
            ManualActivityMarkup += '                                </div>';
            ManualActivityMarkup += '								<div class="pagination activity-pagination pull-right" id="sc-pag-OA">';
            //ManualActivityMarkup+='                                    <li><img src="/Images/custom/previous-set.png"></li>';
            ManualActivityMarkup += '                                    <li><img src="images/custom/previous.png" id="SCprevOA"></li>';
            ManualActivityMarkup += '                                    <li><img src="images/custom/next.png" id="SCNextOA"></li>';
            //ManualActivityMarkup+='                                    <li><img src="/Images/custom/next-set.png"></li>';
            ManualActivityMarkup += '                                </div>';
            //28Mar25;SL;Added below div for elementool-SFSTRY0003379
            ManualActivityMarkup += '							 	<div class="col-md-6 col-lg-6 col-sm-6 " style="display: none;">';
            ManualActivityMarkup += '                                    <div class="SC-input-container height60">';
            ManualActivityMarkup += '                                    	<label class="SC-label">Originating Order Product</label>';
            ManualActivityMarkup += '                                        <select class="SC-input scmanualSr" name="manualOrderProd" id="SR-Manual-Order-Prod">';
            ManualActivityMarkup += '                                        </select>';
            ManualActivityMarkup += '                                    </div>';
            ManualActivityMarkup += '							 	</div>';
            ManualActivityMarkup += '								</div>';
            ManualActivityMarkup += '							</div>';
            ManualActivityMarkup += '                             <!-- end: Order-Asset-Table -->';
            ManualActivityMarkup += '							 <!-- Start: LAst goto SR -->';
            ManualActivityMarkup += '						   <div class="SC-single-button-container less-padding">';
            //ManualActivityMarkup += '						      <button id="SC-saveAct">Save Activity</button>';
            ManualActivityMarkup += '						      <button id="SC-saveSRBack" class="sc-so-cart">Back</button>';
            ManualActivityMarkup += '						      <button id="SC-saveSR">Add Selected</button>';
            ManualActivityMarkup += '						   </div>';
            ManualActivityMarkup += '						   <!-- end: LAst goto SR -->';

            /* ManualActivityMarkup+='						<div id="sc-manual-editContactEmail-text">';
            ManualActivityMarkup+='						<div class="row no-margin editsrdiv clearfix">	';
            ManualActivityMarkup+='							<p class="labelsr">Verify Contact Email Address</p>';
            ManualActivityMarkup+='						</div>';
            ManualActivityMarkup+='						<div class="fields-container clearfix">';
            ManualActivityMarkup+='	                        <form name="scemailvalidatio" id="SC-Email-validation">';
            ManualActivityMarkup+='							<div class="SC-input-container height60 floatleft">';
            ManualActivityMarkup+='								<label class="SC-label mandatory">Email Address</label>';
            ManualActivityMarkup+='								<input type="text" autocomplete="off" name="SCconemail" class="SC-input sc-lastmanual-Ac" id="SC-con-Email">';
            ManualActivityMarkup+='							</div>';
            ManualActivityMarkup+='							</form>';
            ManualActivityMarkup+='						</div>';
            ManualActivityMarkup+='						</div>'; */

            ManualActivityMarkup += '						<div class="row no-margin editsrdiv clearfix" id="sc-editAct-text">	';
            ManualActivityMarkup += '							<p class="labelsr">Enter activity details</p>';
            ManualActivityMarkup += '						</div>';
            ManualActivityMarkup += '						<div class="fields-container clearfix" id="SC-footer-Fields">';
            ManualActivityMarkup += '						</div>';
            ManualActivityMarkup += '						</div>';
            ManualActivityMarkup += '					  </div>';
            ManualActivityMarkup += '                        <div class="modal-footer">';
            ManualActivityMarkup += '                            <div class="SC-single-button-container no-padding">';
            ManualActivityMarkup += '						      <button class="cancel" type="reset" id="Cancel-Activity-AC">Go to Contact Activities</button>';
            ManualActivityMarkup += '						      <button class="cancel" type="reset" id="Cancel-Activity-SR">Go To Service Request</button>';
            ManualActivityMarkup += '						      <button class="cancel" type="reset" id="Cancel-Manual-Activity_order">Go To Order</button>';
            ManualActivityMarkup += '						      <button class="cancel" type="reset" id="Cancel-Manual-Activity">Cancel</button>';
            ManualActivityMarkup += '						   </div>';
            ManualActivityMarkup += '                        </div>';
            ManualActivityMarkup += '                </div>';
            ManualActivityMarkup += '            </div>';
            $("#SC-manual-sr-Modal").html(ManualActivityMarkup);
          }

          $(document).on("change", "#SC_Act_Cat2", function (event)
          {
            if ($(this).val() != "")
            {
              var actcat2 = $(this).val();
              var actcat1 = $("#SC_Act_Cat1").val();
              var inPS = "";
              var outPS = "";
              inPS = SiebelApp.S_App.NewPropertySet();
              outPS = SiebelApp.S_App.NewPropertySet();
              var fieldnames = "Doc Url";
              var fieldvalues = "";
              var campaignURL = "";
              var searchExpr = "";
              if (actcat1.includes("'"))
              {
                searchExpr = '[Category 1]=' + '"' + actcat1 + '"';
                if (actcat2.includes("'"))
                {
                  searchExpr += ' AND [Category 2]=' + '"' + actcat2 + '"';
                  searchExpr += " AND [Active Flg] = 'Y'";
                }
                else
                  searchExpr += " AND [Category 2]='" + actcat2 + "' AND [Active Flg] = 'Y'";
              }
              else if (actcat2.includes("'"))
              {
                searchExpr = "[Category 1]='" + actcat1 + "'";
                searchExpr += ' AND [Category 2]=' + '"' + actcat2 + '"';
                searchExpr += " AND [Active Flg] = 'Y'";
              }
              else
                searchExpr = "[Category 1]='" + actcat1 + "' AND [Category 2]='" + actcat2 + "' AND [Active Flg] = 'Y'"
              inPS.SetProperty("SrcSpec", searchExpr);
              Bservice = SiebelApp.S_App.GetService("SC Contact Manual Actvity BS"); //get service
              outPS = Bservice.InvokeMethod("GetURLDetails", inPS);
              campaignURL = outPS.GetChild(0).GetProperty("URL");
              var urlMarkup = "";
              urlMarkup += ' 	<div class="SC-input-container height60 floatleft scmaualConActivity flexcolumn">';
              urlMarkup += '								<label class="SC-label">URL</label>';
              urlMarkup += '								<a href="' + campaignURL + '"  class="SC-input Sc-manual-AC" target="_blank" id="SC_Act_CampURL">' + campaignURL + '</a>';
              // urlMarkup+='								<a href="https://'+campaignURL+'"  class="SC-input Sc-manual-AC" target="_blank">'+campaignURL+'</a>';
              //urlMarkup+='								<input type="text" autocomplete="off"  class="SC-input Sc-manual-AC SC-readonly" value="'+campaignURL+'">';
              urlMarkup += '	</div>';
              $("#sc-camp-url").html(urlMarkup);
              if (campaignURL == "")
                $("#SC_Act_CampURL").addClass("SC-disabled");
              else
              {
                $("#SC_Act_CampURL").parent().addClass("is-active is-completed");
              }
            }
          });
        }
        SCContactActivitySRDetailAppletPR.prototype.EndLife = function ()
        {
          SiebelAppFacade.SCContactActivitySRDetailAppletPR.superclass.EndLife.apply(this, arguments);
          if ($("#SC-manual-sr-Modal").hasClass("in"))
          {
            $("#SC-manual-sr-Modal").modal('hide');
            $(".modal-backdrop").hide();
          }
          if ($("#SC-SO-ReqCnfrm-Popup").hasClass("in"))
          {
            $("#SC-SO-ReqCnfrm-Popup").modal('hide');
            $(".modal-backdrop").hide();
          }
          $("#applet1").unbind("click");
          $("#applet1").unbind("change");
          $("#applet1").unbind("focus");
          $("#applet1").unbind("focusout");
          $("#applet1").remove();
          EmailChanged = null;
          SRTypeArray = null, IntSrcArray = null, CategoryArray = null, PriorityArray = null, ActStatusArray = null, ActInterActArray = null, ActCatArray = null, ActCat1Array = null;
          ContactFormApplet_PM = null, ActBc = null, ConFormApp_RS = null, ActPm = null, ActId = null, NewSRcreated = null, refreshAsset = null, isAssetrcd = null, refreshOrder = null, refreshSR = null;
          ExistOrderLen = null, exOrderStartpage = null, ExistOrderRcdSet = null, isOrdercd = null, ExistAssetRcdSet = null, isvalidationreq = null;
          ExistSRLen = null, ExistSRRcdSet = null, exSRStartpage = null, ExistAssetLen = null, exAssetStartpage = null, ActvityFieldsJSON = null, ActvityFieldsIdJSON = null, ActivitySRJSON = null, ActivityControlsJSON = null, ActivityFieldsJSON = null, ActvitylastFieldsJSON = null, ActvityLastFieldsIdJSON = null;
        }

        return SCContactActivitySRDetailAppletPR;
      }());
      return "SiebelAppFacade.SCContactActivitySRDetailAppletPR";
    })
}