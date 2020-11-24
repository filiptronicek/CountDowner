/* Window width and height constants */
const w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],

width = w.innerWidth||e.clientWidth||g.clientWidth,
height = w.innerHeight||e.clientHeight||g.clientHeight;

/* DOM */
const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");
const timeTo = document.getElementById("time_to");

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

if (urlParams.has("d") && urlParams.has("n")) {

    const toCountDownDate = parseInt(urlParams.get("d")) || urlParams.get("d");
    const countDownDate = new Date(toCountDownDate).getTime();
    const countDownName = urlParams.get("n");

    const confettiEf = urlParams.has("confetti") ? urlParams.get("confetti") === "true" ? true : false : true;
  
    document.title = `${countDownName} | CountDowner`;

    document.getElementById("event_name").innerText = countDownName;

    // Update the count down every 100 miliseconds
    const x = setInterval(() => { 
        // Get today's UNIX time
        const now = new Date().getTime();

        // Time calculations for days, hours, minutes and seconds
        const months = dayjs(countDownDate).diff(now, "month");
        //const years = dayjs(countDownDate).diff(now, "year");

        const daywithoutMdiff = dayjs(countDownDate).subtract(months, 'month');

        // Find the difference between now and the countdown date
        const distance = countDownDate - now;


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

        const confettiOptions = {"target":"confetti-holder","max":"200","size":"1.5","animate":true,"props":["circle","square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"50","rotate":true,"width":width - width / 25,"height":height - height / 10,"start_from_edge":true,"respawn":false};
        const confetti = new ConfettiGenerator(confettiOptions);
        
        if (currentState == "all") {
            if (totaldays > 7) {
                writeOnOut(`
                ${
                    months > 1 ? format("month", months) : ""
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
                confetti.render();
            }, 500);
        }
        }
    }, 100);
} else {
    let redirString;
    switch (month + 1) {
        case 12:
            if (date.getDate() > 24) 
                redirString = "nwyr";
             else 
                redirString = "christmas-eve";
            
            break;
        default: redirString = "nwyr";
    }
    const encoded = encodeURI(`/e/${redirString}`);
    location.href = encoded;
}

// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
  
