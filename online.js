window.Online = (function(){

    var obj = {};
    var $ = window.jQuery;
    var testURL = "http://google.com";
    
    var balance = 0;

    var attemptSuccess = function(){

        // Check if we need to stop
        if(obj.enabled == false)
            return;

        // Check if we've reached the threshold
        // 3 might be a better choice
        if(balance < 5){
            balance = balance + 1;
            setTimeout(obj.checkStatus, 1000);
        }else{
            setTimeout(obj.checkStatus, 5000);
        }

    }

    var attemptFailed = function(){
        
        // Check if we need to stop
        if(obj.enabled == false)
            return;

        // Check if we've reached the threshold
        if(balance > -5){
            balance = balance - 1;
            setTimeout(obj.checkStatus, 1000);
        }else{
            setTimeout(obj.checkStatus, 5000);
        }

    }

    obj.checkStatus = function(){
        
        $.ajax({
            url: testURL,
            crossDomain: true,
            success : attemptSuccess,
            error : attemptFailed,
            cache: false
        });

    }

    obj.isOnline = function(){

        if(balance >= 0){
            return true;
        }else{
            return false;
        }

    }

    obj.start = function(url){

        if(typeof url == "string"){
            testURL = url;
        }

        obj.enabled = true;
        obj.checkStatus();

    };

    obj.stop = function(){
        obj.enabled = false;
    }


    return obj;

})