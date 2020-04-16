let currentState = "all";

let date = new Date();
let month = date.getMonth();
if (month == 11) {
  let sf = new Snowflakes({
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
function format(text, value) {
  if (value === 1) return `${value} ${text}`;
  else if (value > 1 || value === 0) return `${value} ${text}s`;
  else return `${value} ${text}`;
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
  const countDownDate = new Date(urlParams.get("d")).getTime();
  const countDownName = urlParams.get("n");
  console.log(`Countdown date: ${urlParams.get("d")}`);
  console.log(`Countdown name: ${urlParams.get("n")}`);
  document.getElementById("event_name").innerHTML = countDownName;
  // Update the count down every 100 miliseconds
  let x = setInterval(function () {
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

    let weeks = (totaldays - (totaldays % 7)) / 7;
    let totalHours = days * 24 + hours;
    let totalMinutes = totalHours * 60 + minutes;
    let totalSeconds = totalMinutes * 60 + seconds;
    let displayTotalSeconds =
      totaldays * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    let displayTotalMinutes = totaldays * 24 * 60 + hours * 60 + minutes;
    let displayTotalHours = totaldays * 24 + hours;

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
      else writeOnOut(totaldays.toLocaleString() + " days");
    } else if (currentState == "hours") {
      if (totalHours < 1) currentState = "minutes";
      else writeOnOut(displayTotalHours.toLocaleString() + " hours");
    } else if (currentState == "minutes") {
      if (totalMinutes < 1) currentState = "seconds";
      else writeOnOut(displayTotalMinutes.toLocaleString() + " minutes");
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
const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

/* Put code here */

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/js/service-worker.js");
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === "http:") {
  const link = requireHTTPS.querySelector("a");
  link.href = window.location.href.replace("http://", "https://");
}
