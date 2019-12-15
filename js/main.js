let currentState = "all";
/*
const http = new XMLHttpRequest();
http.open("GET", "https://time-server.now.sh/api/");
http.send();
http.onload = () => {
    console.log("Server time: " + (http.responseText) );
    //now = http.responseText;
};
*/
var date = new Date();
var month = date.getMonth();
if (month == 11) {
  var sf = new Snowflakes({
    count: 20,
    maxSize: 40,
    wind: true,
    speed: 0.5,
    maxOpacity: 0.5
  });
}

function writeOnOut(text) {
  document.getElementById("time_to").innerHTML = text;
}

document.getElementById("time_to").onclick = function() {
  if (currentState == "all") {
    currentState = "days";
  } else if (currentState == "days") {
    currentState = "hours";
  } else if (currentState == "hours") {
    currentState = "minutes";
  } else if (currentState == "minutes") {
    currentState = "seconds";
  } else if (currentState == "seconds") {
    currentState = "all";
  }
  console.log("Layout: " + currentState);
};

var urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("d") && urlParams.has("n")) {
  const countDownDate = new Date(urlParams.get("d")).getTime();
  const countDownName = urlParams.get("n");
  console.log(`Countdown date: ${urlParams.get("d")}`);
  console.log(`Countdown name: ${urlParams.get("n")}`);
  document.getElementById("event_name").innerHTML = countDownName;
  // Update the count down every 100 miliseconds
  var x = setInterval(function() {
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var totalHours = days * 24 + hours;
    var totalMinutes = totalHours * 60 + minutes;
    var totalSeconds = totalMinutes * 60 + seconds;

    if (currentState == "all") {
      writeOnOut(
        days +
          " days " +
          hours +
          " hours " +
          minutes +
          " minutes " +
          seconds +
          " seconds "
      );
    } else if (currentState == "days") {
      writeOnOut(days.toLocaleString() + " days");
    } else if (currentState == "hours") {
      writeOnOut(totalHours.toLocaleString() + " hours");
    } else if (currentState == "minutes") {
      writeOnOut(totalMinutes.toLocaleString() + " minutes");
    } else if (currentState == "seconds") {
      writeOnOut(totalSeconds.toLocaleString() + " seconds");
    }
    // Output the result in an element with id="demo"

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("time_to").innerHTML =
        "This countdown has expired";
    }
  }, 100);
} else {
    console.log("original: " + "/?d=Dec 24, 2019 07:00 PM&n=🎄 Christmas 2019 🎄");
    var encoded = encodeURI("/?d=Dec 24, 2019 07:00 PM&n=🎄 Christmas 2019 🎄")
    console.log("encoded: " + encoded);
    location.href = encoded;
  //alert("This event hasn't been set");
}
