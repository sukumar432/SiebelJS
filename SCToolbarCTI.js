(function(){ //IIFE START

                //Global variables for the IIFE
    var notReadyTimerId = 0;
    var readyTimerId = 0;

    var timerStarted = false;
    var currentState = 'NotReady';
    var previousState = '';
    var timerDisplayVal = ['00', '00', '00'];
    var stateSpanText = '';
    var timerInterval = 1000;
	var sWrapUpTime='00:00:00';
	var sWrapUpState="N";


    var hh = 0;
    var mm = 0;
    var ss = 0;




    function incrementTime(){
                ss++;
                if(ss > 59){
                                ss = 0;
                                timerDisplayVal[2] = '00';
                                mm++;
                }
                else if(ss < 10){
                                timerDisplayVal[2] = '0' + ss;
                }
                else{
                                timerDisplayVal[2] = '' + ss;
                }

                if(mm > 59){
                                mm = 0;
                                timerDisplayVal[1] = '00';
                                hh++;
                }
                else if(hh < 10){
                                timerDisplayVal[1] = '0' + mm;
                }
                else{
                                timerDisplayVal[1] = '' + mm;
                }

                if(hh < 10){
                                timerDisplayVal[0] = '0' + hh;
                }
                else{
                                timerDisplayVal[0] = '' + hh;
                }

        //console.log(timerDisplayVal[0] + ':' + timerDisplayVal[1] + ':' + timerDisplayVal[2]);

        $('#Working_Time').text(timerDisplayVal[0] + ':' + timerDisplayVal[1] + ':' + timerDisplayVal[2]);
		sWrapUpTime=timerDisplayVal[0] + ':' + timerDisplayVal[1] + ':' + timerDisplayVal[2];
		
    }


    function clearAllTimers(){

                                if(notReadyTimerId != 0){
                                                clearInterval(notReadyTimerId);
                                }
                                if(readyTimerId != 0){
                                                clearInterval(readyTimerId);
                                }
                                $('#Working_Time').text('00:00:00');

    }


    //click handler for login button.
    function signOnClickHandler(){
                previousState = currentState;
                                currentState = 'NotReady';
                                clearAllTimers();
                
                //Start the timer.
                                hh = mm = ss = 0;
                notReadyTimerId = setInterval(function(){

                                //console.log('signOnClickHandler timer fired.');
                                stateSpanText = $('#MessageSpan').text();
                                if(stateSpanText === 'Agent state: Voice not ready'){
                                                incrementTime();
                                }
								

                }, timerInterval);
    }

    //click handler for login button.
    function signOffClickHandler(){
                previousState = currentState;
                                currentState = 'LogOff';
								//SPATIBAN:23-SEP-21:#STRY0125263 Updated code for reset the timer for Wrapup state
								clearAllTimers();
								if(sWrapUpState=="Y"){
									sWrapUpState="N";
									$("#Working_Time").show();
									$("#Working_Time1").hide();
									$("#Working_Time").text("00:00:00")
									hh = mm = ss = 0;
								}
    }


    //click handler for 'resy state' button.
    function readyOnClickHandler(){
                previousState = currentState;

                if(currentState === 'Ready'){
                                currentState = 'NotReady';
								clearAllTimers();
                                //return;
                }
                else{
                                currentState = 'Ready';
                                clearAllTimers();
                    }

                //Start the timer.
                                hh = mm = ss = 0;
                readyTimerId = setInterval(function(){

                                //console.log('readyOnClickHandler timer fired.');
                                stateSpanText = $('#MessageSpan').text();
								//SPATIBAN:23-SEP-21:#STRY0125263 Updated code for reset the timer for Wrapup state
								if(stateSpanText!='Agent state: Voice wrapup' && sWrapUpState=="Y"){
									sWrapUpState="N";
									$("#Working_Time").show();
									$("#Working_Time1").hide();
									hh = mm = ss = 0;
								}
                                if(stateSpanText === 'Agent state: Voice ready'){
                                                incrementTime();
                                }
								//SPATIBAN:NOV-1-2019:Added below code increment timer for not ready status
								else if(stateSpanText === 'Agent state: Voice not ready'){
                                                incrementTime();
                                }
								//SPATIBAN:23-SEP-21:#STRY0125263 Updated code for reset the timer for Wrapup state
								else if(stateSpanText==='Agent state: Voice wrapup'){
									sWrapUpState="Y";
									incrementTime();
									$("#Working_Time").hide();
									var markup='<span id="Working_Time1" name="Working Time" tabindex="0" role="timer" aria-label="Working Time" class="commTimerSpan siebui-tb-cti-timer sn-cti-timer-sc">'+sWrapUpTime+'</span>';
									if(!$("#CommTimer_Working_Time").find("#Working_Time1").hasClass("sn-cti-timer-sc"))
										$("#CommTimer_Working_Time").append(markup);
									$("#Working_Time1").text(sWrapUpTime);
									$("#Working_Time1").show();
									
								}
                                else{
                                                hh = mm = ss = 0;
                                }

                }, timerInterval);
    }

    function notReadyOnClickHandler(){

                previousState = currentState;
                clearAllTimers();
                if(currentState === 'LogOff'){
                                currentState = 'NotReady';
                                return
                    }

                                currentState = 'NotReady';

                //Start the timer.
                                hh = mm = ss = 0;
                notReadyTimerId = setInterval(function(){

                                //console.log('notReadyOnClickHandler timer fired.');
                                stateSpanText = $('#MessageSpan').text();
                                if(stateSpanText === 'Agent state: Voice active' || stateSpanText === 'Agent state: Voice wrapup'){
                                                return;
                                }
                                else{
                                                incrementTime();
                                }

                }, timerInterval);				
    }

    function cancelOnClickHandler(){
                currentState = previousState;
                previousState = '';				
    }


    $( document ).ready(function(){

                //Setup click handler for login button.
        $('body').delegate('#SignOn', 'click', signOnClickHandler);

                //Setup click handler for logoff button.
        $('body').delegate('#SignOff', 'click', signOffClickHandler);

                //Setup click handler for 'ready state' button.
        $('body').delegate('#Agent_State_For_Work_Item', 'click', readyOnClickHandler);

                //Setup click handler for 'ready state' button.
        $('body').delegate('#Agent_State_For_Call', 'click', readyOnClickHandler);

                //Setup click handler for 'not ready OK' button.
        $('body').delegate('#s_0_1_1_0_Ctrl', 'click', notReadyOnClickHandler);

                //Setup click handler for 'Cancel' button.
        $('body').delegate('#s_0_1_2_0_Ctrl', 'click', cancelOnClickHandler);
        //return the OK and Cancel button function to Global
		return window.SCCustomCTIFunctions = {
												notReadySignOffOK: notReadyOnClickHandler,
												notReadySignOffCancel: cancelOnClickHandler
											 };

    }); //document.ready END

})(); //IIFE END