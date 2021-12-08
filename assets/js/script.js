   
var myTimerObj = (function(document){
   
    var myTimer;
 
    function start() {
      myTimer = setInterval(myClock, 1000);
      var c = 76;
 
      function myClock() {
        document.getElementById("demo").innerHTML = --c;
        if (c == 0) {
          clearInterval(myTimer);
          alert("The game is over");
        }
      }
    }
    
    function end() {
        clearInterval(myTimer)
    }
 
    return {start:start, end:end};
  })(document);