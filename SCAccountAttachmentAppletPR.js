//Regenerate using:http://fiddle.jshell.net/dford/f1foLs2c/light/?prpm=PR&object=DesktopList&name=SCAccountAttachmentApplet&userprops=&comments=No&logging=No
if (typeof(SiebelAppFacade.SCAccountAttachmentAppletPR) === "undefined") {

 SiebelJS.Namespace("SiebelAppFacade.SCAccountAttachmentAppletPR");
 define("siebel/custom/SelectComfort/SCAccountAttachmentAppletPR", ["siebel/jqgridrenderer","siebel/custom/SelectComfort/SCAccountSearchMarkup","siebel/custom/SelectComfort/SC_OUI_Markups",],
  function () {
   SiebelAppFacade.SCAccountAttachmentAppletPR = (function () {
	var view,Appletid_Att,Att_appletSeq;
    function SCAccountAttachmentAppletPR(pm) {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.constructor.apply(this, arguments);
    }

    SiebelJS.Extend(SCAccountAttachmentAppletPR, SiebelAppFacade.JQGridRenderer);

    SCAccountAttachmentAppletPR.prototype.Init = function () {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.Init.apply(this, arguments);
    }

    SCAccountAttachmentAppletPR.prototype.ShowUI = function () {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.ShowUI.apply(this, arguments);
	  var pm=this.GetPM();
	 Appletid_Att=SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetPModel().Get("GetFullId");
	 Att_appletSeq=Appletid_Att[Appletid_Att.length -1];
	 var recordset=pm.Get("GetRecordSet");
	 $(document).on("click",".acc_attachment_del_360",function(){
		 SiebelJS.Log("on click of delete button");
		$("#SC-SO-Delete-att").modal({
			backdrop: 'static'
		})
		$("#SC-SO-Delete-att").css({
			"display": "flex",
			"justify-content": "center",
			"align-items": "center"
		})
		$(".modal-backdrop").css('background', '#ffffff');
		clickedid=this.id;
		//if(view=="SC Sales Order 360 Degree View OUI")
		//clickedid=clickedid.split("l");
	 //else if(view=="SC Create Sales Order View OUI"||view=="SC Order Entry - Payment View Sales OUI")
		// clickedid=clickedid.split("s");
	 //else if(view=="SC Account 360 View OUI")
		 clickedid=clickedid.split("e");
		clickedid=clickedid[1];
	});
	//});
	//start:on click of yes button in delete order
	$(document).on("click","#SC-delete-yes-att",function() {
		$("#SC-SO-Delete-att").modal('hide');
		$("#SC-SO-Delete-att").css({
			"display": "",
			"justify-content": "",
			"align-items": ""
		});
		//Start loader 
			 $("body").trigger('Custom.Start');
			   setTimeout(function(){
				(function(proxied) {
						window.confirm = function() {
						if(arguments[0].includes("Are you sure you want to delete the"))
							{
							  return true;
							  SiebelJS.Log("supressed");
							}
						  else
						  return proxied.apply(this, arguments);
						  };
			   })(window.confirm);
			
			$("#s_"+Att_appletSeq+"_l tr#"+clickedid+"").trigger("click");
			SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].InvokeMethod("DeleteRecord");
			//$("#list_item").trigger("click");	
			//hiding the Loader
				  $("body").trigger('Custom.End');
				  },500);
		});
		//end:on click of yes button in delete order
		//start:click on no button in delete order
		 $(document).on("click","#SC-delete-no-att",function(){
			 //Start loader 
			 $("body").trigger('Custom.Start');
			   setTimeout(function(){
			$("#SC-SO-Delete-att").modal('hide');
			$(".SC-SO-add-popup").css({
				"display": "",
				"justify-content": "",
				"align-items": ""
			});    
		  (function(proxied) {
			  window.confirm = function() {
			  if(arguments[0].includes("Are you sure you want to delete the"))
				{
				  return false;
				  SiebelJS.Log("supressed");
				}
				else
				return proxied.apply(this, arguments);
			   };
			})(window.confirm);
			//hiding the Loader
				  $("body").trigger('Custom.End');
				  },1000);
		});
		//end:click on no button in delete order
		//Start:on click of new attachment
	$(document).on("click","#sc-acc-new-attachment",function(){
		SiebelJS.Log("on click of new attachment");
		var clicked_id=this.id;
		var tableid = $("#"+Appletid_Att).find(".siebui-applet-buttons").find("input").attr("id");
		SiebelJS.Log(tableid);
		$("#"+tableid).trigger("click");
		//if(clicked_id=="SC-add-new-Attach")
		//$("#list_item").trigger("click");
	});	
//End:on click of new attachment
    }

    SCAccountAttachmentAppletPR.prototype.BindData = function (bRefresh) {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.BindData.apply(this, arguments);
	 SiebelJS.Log("Bind Data");
	 var pm=this.GetPM();
	 var recordset=pm.Get("GetRecordSet");
	 getAttachments(recordset);
	 //editing and saving comment field
	$(document).on("focusout","#accattach-360-table tr",function() {
		var comments_id = $(this).attr('id');
		comments_id = comments_id.split("w");
		comments_id = comments_id[1];
		$("#s_"+Att_appletSeq+"_l tr#"+comments_id+"").trigger("click");
		var comment_att = document.getElementById("attachcomment"+comments_id).value;
		SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].GetBusComp().SetFieldValue("Comment",comment_att);
		SiebelApp.S_App.GetActiveView().GetAppletMap()["Account Attachment Applet"].InvokeMethod("WriteRecord");
	});
    }

    SCAccountAttachmentAppletPR.prototype.BindEvents = function () {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.BindEvents.apply(this, arguments);
    }

    SCAccountAttachmentAppletPR.prototype.EndLife = function () {
     SiebelAppFacade.SCAccountAttachmentAppletPR.superclass.EndLife.apply(this, arguments);
    }
	function getAttachments(attrecords)
	{
		var Attachments_Markup_New="";
		for(i = 0; i < attrecords.length; i++){
			var j="att-row"+(i+1);
			Attachments_Markup_New+='<tr id='+j+'>';
			if(attrecords[i]["AccntFileName"] != null){Attachments_Markup_New+='<td title="'+attrecords[i]["AccntFileName"]+'"><a href="javascript:void(0)" id="attfilenamedrilldown">'+attrecords[i]["AccntFileName"]+'</a></td>';}
			else{Attachments_Markup_New+='<td></td>';}
			if(attrecords[i]["AccntFileSize"] != null){Attachments_Markup_New+='<td>'+attrecords[i]["AccntFileSize"]+'</td>';}
			else{Attachments_Markup_New+='<td></td>';}
			if(attrecords[i]["AccntFileExt"] != null){Attachments_Markup_New+='<td>'+attrecords[i]["AccntFileExt"]+'</td>';}
			else{Attachments_Markup_New+='<td></td>';}
			if(attrecords[i]["AccntFileDate"] != null){Attachments_Markup_New+='<td>'+attrecords[i]["AccntFileDate"]+'</td>';}
			else{Attachments_Markup_New+='<td></td>';}
			if(attrecords[i]["AccntFileAutoUpdFlg"] != null){Attachments_Markup_New+='<td>'+attrecords[i]["AccntFileAutoUpdFlg"]+'</td>';}
			else{Attachments_Markup_New+='<td></td>';}
			if(attrecords[i]["Comment"] != null){
				Attachments_Markup_New+='<td title="'+attrecords[i]["Comment"]+'" class="comments-col"><textarea name="detdes" class="SC-input no-padding" id="attachcomment'+(i+1)+'">'+attrecords[i]["Comment"]+'</textarea></td>';
			}
			else{Attachments_Markup_New+='<td title="'+attrecords[i]["Comment"]+'" class="comments-col"><textarea name="detdes" class="SC-input no-padding" id="attachcomment'+(i+1)+'"></textarea></td>';}
			Attachments_Markup_New+='<td><img src="images/custom/delete-red.png" class="so-add-cart acc_attachment_del_360" id="accattachmentdelete'+(i+1)+'"></td>';
			Attachments_Markup_New+='</tr>';
		}
			$('#attachments_sort_id').html(Attachments_Markup_New);
	}

    return SCAccountAttachmentAppletPR;
   }()
  );
  return "SiebelAppFacade.SCAccountAttachmentAppletPR";
 })
}
