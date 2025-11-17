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
    }


    //click handler for 'resy state' button.
    function readyOnClickHandler(){
                previousState = currentState;

                if(currentState === 'Ready'){
                                currentState = 'NotReady';
                                return;
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
                                if(stateSpanText === 'Agent state: Voice ready'){
                                                incrementTime();
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
        $('body').delegate('#SignOn', 'click', signOffClickHandler);

                //Setup click handler for 'ready state' button.
        $('body').delegate('#Agent_State_For_Work_Item', 'click', readyOnClickHandler);

                //Setup click handler for 'ready state' button.
        $('body').delegate('#Agent_State_For_Call', 'click', readyOnClickHandler);

                //Setup click handler for 'not ready OK' button.
        $('body').delegate('#s_0_1_1_0_Ctrl', 'click', notReadyOnClickHandler);

                //Setup click handler for 'Cancel' button.
        $('body').delegate('#s_0_1_2_0_Ctrl', 'click', cancelOnClickHandler);
                             


    }); //document.ready END

})(); //IIFE END