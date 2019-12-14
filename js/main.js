let currentState = "all";

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
  console.log("Changed to: " + currentState);
};

var countDownDate = new Date("Dec 24, 2019 19:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {
  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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
}, 1000);
