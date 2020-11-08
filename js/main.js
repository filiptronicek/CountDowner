let currentState = "all";

const date = new Date();
const month = date.getMonth();
if (month == 11) {
  new Snowflakes({
    count: 20,
    maxSize: 40,
    wind: true,
    speed: 0.5,
    maxOpacity: 0.5,
  });
}

function writeOnOut(text) {
  document.getElementById("time_to").innerHTML = text;
}
function format(text, value, total = false) {
  if (value === 1) return `${value} ${text}`;
  else if (value > 1 || value === 0)
    if (!total) return `${value} ${text}s`;
    else return `${value.toLocaleString()} ${text}s`;
  else if (!total) return `${value} ${text}`;
  else return `${value.toLocaleString()} ${text}`;
}
document.getElementById("time_to").onclick = function () {
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
  const toCountDownDate = parseInt(urlParams.get("d")) || urlParams.get("d");
  const countDownDate = new Date(toCountDownDate).getTime();
  const countDownName = urlParams.get("n");
  console.log(`Countdown date: ${countDownDate}`);
  console.log(`Countdown name: ${urlParams.get("n")}`);
  document.getElementById("event_name").innerHTML = countDownName;
  // Update the count down every 100 miliseconds
  let x = setInterval(function () {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let totaldays = Math.floor(distance / (1000 * 60 * 60 * 24));
    let days = totaldays % 7;
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let weeks = (totaldays - (totaldays % 7)) / 7;
    let totalHours = totaldays * 24 + hours;
    let totalMinutes = totalHours * 60 + minutes;
    let displayTotalSeconds =
      totaldays * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    let displayTotalMinutes = totaldays * 24 * 60 + hours * 60 + minutes;

    if (currentState == "all") {
      if (weeks > 0) {
        writeOnOut(
          `${format("week", weeks)} ${format("day", days)} ${format(
            "hour",
            hours
          )} ${format("minute", minutes)} ${format("second", seconds)}`
        );
      } else {
        if (days > 0) {
          writeOnOut(
            `${format("day", days)} ${format("hour", hours)} ${format(
              "minute",
              minutes
            )} ${format("second", seconds)}`
          );
        } else {
          if (hours > 0) {
            writeOnOut(
              `${format("hour", hours)} ${format("minute", minutes)} ${format(
                "second",
                seconds
              )}`
            );
          } else {
            writeOnOut(
              `${format("minute", minutes)} ${format("second", seconds)}`
            );
            if (minutes > 0) {
              writeOnOut(
                `${format("minute", minutes)} ${format("second", seconds)}`
              );
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
      if (totaldays < 1) currentState = "hours";
      else writeOnOut(`${format("day", totaldays, true)}`);
    } else if (currentState == "hours") {
      if (totalHours < 1) currentState = "minutes";
      else writeOnOut(`${format("hour", totalHours, true)}`);
    } else if (currentState == "minutes") {
      if (totalMinutes < 1) currentState = "seconds";
      else writeOnOut(`${format("minute", displayTotalMinutes, true)}`);
    } else if (currentState == "seconds") {
      writeOnOut(`${format("second", displayTotalSeconds, true)}`);
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
  let redirString;
  switch(month + 1){
    case 12:
      if(date.getDate() > 24) redirString = "nwyr"
      else redirString = "christmas-eve"
      break;
    default:
      redirString = "nwyr"
  }
  const encoded = encodeURI(`/e/${redirString}`);
  location.href = encoded;
}
const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

/* Put code here */

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/js/service-worker.js");
}
