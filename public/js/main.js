/* Imports */

/* CSS */
import "/public/css/style.scss";
import "/public/css/dark.scss";

/* JS */
const Snowflakes = require("magic-snowflakes");
import confetti from "canvas-confetti";

import ToastManager from "js-notifications";
const toastManager = new ToastManager({ seconds: 3, });

import dayjs from "dayjs";
const utc = require("dayjs/plugin/utc");

import { getTimeZones } from "@vvo/tzdb";
const uniqby = require("lodash.uniqby");

const timezones = getTimeZones();
dayjs.extend(utc);

const minuteOffsets = [];

for(const tz of timezones) {
    minuteOffsets.push({name: tz.alternativeName , o: tz.currentTimeOffsetInMinutes, cities: tz.mainCities });
}

const reducedOffsets = uniqby(minuteOffsets, "name");

function setClientOffset() {
    const timestamp = Date.now();
    fetch(`https://time.filiptronicek.workers.dev/?ts=${timestamp}`).then(f => f.json()).then(f => {
      const nowstamp = Date.now();
      const adjustedOffset = Math.round(f.result.ms - (nowstamp - timestamp) / 2);
      localStorage.setItem("offset", adjustedOffset);
      localStorage.setItem("offsetUpdate", f.result.unix);
    }).catch(err => {
        console.error(err);
        localStorage.setItem("offset", 0);
        localStorage.setItem("offsetUpdate", timestamp);
    });
}

if (
    !localStorage.getItem("offsetUpdate") ||
    (localStorage.getItem("offsetUpdate") && Math.abs(parseInt(localStorage.getItem("offsetUpdate") - Date.now())) > 1000 * 60 * 60 * 24)) {
    setClientOffset();
}

/* DOM */
const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");
const timeTo = document.getElementById("time_to");
const output = document.getElementById("output");
const timezoneText = document.querySelector(".tzinfo");
const link = document.getElementById("link");

let currentState = "all";

const date = new Date();
const month = date.getMonth();

if (month == 11) {
    new Snowflakes({
        count: 20,
        maxSize: 40,
        wind: true,
        speed: 0.5,
        maxOpacity: 0.5
    });
}

function writeOnOut(text) {
    timeTo.innerHTML = text;
}

function format(text, value, total = false) {
    if (value === 1) 
        return `${value} ${text}`;
     else if (value > 1 || value === 0) 
        if (! total) 
            return `${value} ${text}s`;
        
     else 
        return `${
            value.toLocaleString()
        } ${text}s`;
     else if (! total) 
        return `${value} ${text}`;
     else 
        return `${
            value.toLocaleString()
        } ${text}`;
    
}

document.getElementById("time_to").onclick = () => {
    switch (currentState) {
        case "all":
            currentState = "days";
            break;
        case "days":
            currentState = "hours";
            break;
        case "hours":
            currentState = "minutes";
            break;
        case "minutes":
            currentState = "seconds";
            break;
        case "seconds":
            currentState = "all";
            break;
    }
};

const urlParams = new URLSearchParams(window.location.search);


let desiredDFLTtime;
let desiredDFLTname;

console.log(desiredDFLTtime, desiredDFLTname);

const year = new Date().getFullYear();

switch (month + 1) {
    case 12:
        if (date.getDate() > 24) {
            desiredDFLTtime = new Date(`1/1/${year + 1} 0:00`).getTime();
            desiredDFLTname = `New years 🎊`;
        } else {
            desiredDFLTtime = new Date(`12/24/${year} 19:00`).getTime();
            desiredDFLTname = `🎁 Christmas Eve 🎄`;
        }
        break;
    default: 
        desiredDFLTtime = new Date(`1/1/${year + 1} 0:00`).getTime();
        desiredDFLTname = `New years 🎊`;
}

const toCountDownDate = parseInt(urlParams.get("d")) || urlParams.get("d") || desiredDFLTtime;
const countDownDate = new Date(toCountDownDate).getTime();
const countDownName = urlParams.get("n") || desiredDFLTname;

const confettiEf = urlParams.has("confetti") ? urlParams.get("confetti") === "true" ? true : false : true;

document.title = `${countDownName} | CountDowner`;

document.getElementById("event_name").innerText = countDownName;

// Update the count down every 100 miliseconds
const x = setInterval(() => { 
    // Get today's UNIX time
    const now = new Date().getTime() - localStorage.getItem("offset");

    // Time calculations for days, hours, minutes and seconds
    const months = dayjs(countDownDate).diff(now, "month");
    //const years = dayjs(countDownDate).diff(now, "year");

    const daywithoutMdiff = dayjs(countDownDate).subtract(months, "month");

    // Find the difference between now and the countdown date
    const distance = countDownDate - now;
    if (distance < 86400 * 1000 && output.innerHTML === "") {
        //output.innerHTML += `Your countdown has been hit in:`;
        for (const offset of reducedOffsets) {
            const offsetedDate = dayjs().add(offset.o, "minute");
            const desiredDate = dayjs(countDownDate).add(dayjs(countDownDate).utcOffset(), "minute");

            if (offsetedDate.format("MM/DD") === desiredDate.format("MM/DD") && offsetedDate.format("hh:mm:ss") === desiredDate.format("hh:mm:ss")) {
                timezoneText.innerHTML = "You just hit your countdown in these timezones:";
                output.style.display = "block";
                output.innerHTML += `<li>${offset.name}</li> <br>`;
                setTimeout(() => { output.innerHTML = ""; output.style.display = "none"; timezoneText.innerHTML = ""; }, 15000);
            }
        }
    }

    const correctedToWithoutMonthDistance = Math.floor((daywithoutMdiff - now) / (1000 * 60 * 60 * 24));

    const totaldays = Math.floor(distance / (1000 * 60 * 60 * 24));
    const days =  correctedToWithoutMonthDistance % 7;
    const hours = Math.floor(((daywithoutMdiff - now) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor(((daywithoutMdiff - now) % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor(((daywithoutMdiff - now) % (1000 * 60)) / 1000);

    const weeks = (correctedToWithoutMonthDistance - (correctedToWithoutMonthDistance % 7)) / 7;

    const totalHours = totaldays * 24 + hours;
    const totalMinutes = totalHours * 60 + minutes;
    const displayTotalSeconds = totaldays * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
    const displayTotalMinutes = totaldays * 24 * 60 + hours * 60 + minutes;
    
    if (currentState == "all") {
        if (totaldays >= 7) {
            writeOnOut(`
            ${
                months > 0 ? format("month", months) : ""
            } ${ 
                weeks > 0 ? format("week", weeks) : ""
            } ${
                format("day", days)
            } ${
                format("hour", hours)
            } ${
                format("minute", minutes)
            } ${
                format("second", seconds)
            }`);
        } else {
            if (days > 0) {
                writeOnOut(`${
                    format("day", days)
                } ${
                    format("hour", hours)
                } ${
                    format("minute", minutes)
                } ${
                    format("second", seconds)
                }`);
            } else {
                if (hours > 0) {
                    writeOnOut(`${
                        format("hour", hours)
                    } ${
                        format("minute", minutes)
                    } ${
                        format("second", seconds)
                    }`);
                } else {
                    writeOnOut(`${
                        format("minute", minutes)
                    } ${
                        format("second", seconds)
                    }`);
                    if (minutes > 0) {
                        writeOnOut(`${
                            format("minute", minutes)
                        } ${
                            format("second", seconds)
                        }`);
                    } else if (minutes < 1 && seconds < 20) {
                        writeOnOut(seconds + "," + Math.floor((distance % 1000) / 100) + " seconds ");
                    } else {
                        writeOnOut(seconds + " seconds ");
                    }
                }
            }
        }
    } else if (currentState == "days") {
        if (totaldays < 1) 
            currentState = "hours";
            else 
            writeOnOut(`${
                format("day", totaldays, true)
            }`);
        
    } else if (currentState == "hours") {
        if (totalHours < 1) 
            currentState = "minutes";
            else 
            writeOnOut(`${
                format("hour", totalHours, true)
            }`);
        
    } else if (currentState == "minutes") {
        if (totalMinutes < 1) 
            currentState = "seconds";
            else 
            writeOnOut(`${
                format("minute", displayTotalMinutes, true)
            }`);
        
    } else if (currentState == "seconds") {
        writeOnOut(`${
            format("second", displayTotalSeconds, true)
        }`);
    }
    // Output the result in an element with id="demo"
    // If the count down is over, write some text, render some confetti
    if (distance < 0) {
        clearInterval(x);
        writeOnOut("This countdown is over");
        if (Math.abs(distance) < 60 * 1000 && confettiEf) {
        setTimeout(() => {
            const endConfetti = Date.now() + (5 * 1000);
            const colors = ["#ff0000", "#FCCA4D"];
    
            (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });
    
            if (Date.now() < endConfetti) {
                requestAnimationFrame(frame);
            }
            }());
        }, 500);
    }
    }
}, 100);


function copyLink() {

    function encodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(_match, p1) {
                return String.fromCharCode("0x" + p1);
        }));
    }

    const docLoc = encodeUnicode(location.href.split("/").pop());
    fetch(`/api/shorten?url=${docLoc}`).then(r => r.json()).then(res => {
        navigator.clipboard.writeText(`https://cntd.now.sh/c/${res.result}`).then(() => {
            toastManager.notify({className: "toast", title: "Copied to clipboard!", content: ""});
            document.querySelector(".fa-window-close").classList.add("fa");
        }, (err) => {
            console.error("Async: Could not copy text: ", err);
        });
    });
}


link.addEventListener("click", copyLink); 


// Check that service workers are supported
if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js");
    });
}
