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
let date = new Date();
let month = date.getMonth();
if (month == 11) {
  let sf = new Snowflakes({
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

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("d") && urlParams.has("n")) {
  const countDownDate = new Date(urlParams.get("d")).getTime();
  const countDownName = urlParams.get("n");
  console.log(`Countdown date: ${urlParams.get("d")}`);
  console.log(`Countdown name: ${urlParams.get("n")}`);
  document.getElementById("event_name").innerHTML = countDownName;
  // Update the count down every 100 miliseconds
  let x = setInterval(function() {
    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let totaldays = Math.floor(distance / (1000 * 60 * 60 * 24));
    let days = totaldays % 7;
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let weeks = (totaldays - totaldays % 7) / 7;
    let totalHours = days * 24 + hours;
    let totalMinutes = totalHours * 60 + minutes;
    let totalSeconds = totalMinutes * 60 + seconds;
      let displayTotalSeconds = (totaldays * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
    
    if (currentState == "all") {
      if (weeks > 0) {
        writeOnOut(
          weeks +
            " weeks " +
            days +
            " days " +
            hours +
            " hours " +
            minutes +
            " minutes " +
            seconds +
            " seconds "
        );
      } else {
        if (days > 0) {
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
        } else {
          if (hours > 0) {
            writeOnOut(
              hours + " hours " + minutes + " minutes " + seconds + " seconds "
            );
          } else {
            writeOnOut(minutes + " minutes " + seconds + " seconds ");
            if (minutes > 0) {
              writeOnOut(minutes + " minutes " + seconds + " seconds ");
            } else if (minutes < 1 && seconds < 20) {
              writeOnOut(
                seconds +
                  "," +
                  Math.floor((distance % 1000) / 100) +
                  " seconds "
              );
            } else {
              writeOnOut(seconds + " seconds ");
            }
          }
        }
      }
    } else if (currentState == "days") {
      writeOnOut(totaldays.toLocaleString() + " days");
    } else if (currentState == "hours") {
      writeOnOut(totalHours.toLocaleString() + " hours");
    } else if (currentState == "minutes") {
      writeOnOut(totalMinutes.toLocaleString() + " minutes");
    } else if (currentState == "seconds") {
      writeOnOut(displayTotalSeconds.toLocaleString() + " seconds");
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
  console.log("original: " + "/e/nwyr");
  let encoded = encodeURI("/e/nwyr");
  console.log("encoded: " + encoded);
  location.href = encoded;
  //alert("This event hasn't been set");
}
