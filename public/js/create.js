/* Imports */

/* CSS */
import "/public/css/create.scss";
import "/public/css/dark.scss";

/* JS */
import datepicker from "js-datepicker";
import "magic-snowflakes";
import confetti from "canvas-confetti";

const checkbox = document.querySelector("#confetti");

const date = new Date();
const month = date.getMonth();

if (month === 11) {
    new Snowflakes({
        count: 30,
        maxSize: 20,
        speed: 1.5,
        wind: false,
        maxOpacity: 0.3,
    });
}

datepicker(".datepicker", {
    minDate: new Date()
});

function outPutInputs() {
    const cntdDate = new Date(document.getElementById("date").value);
    const cntdTime = cntdDate.setHours(document.getElementById("time").value.split(":")[0] || 0, document.getElementById("time").value.split(":")[1] || 0);
    const cntdName = document.getElementById("name").value;

    const cntdEffect = document.getElementById("confetti").checked;

    const unixTo = cntdTime;

    location.href = `/?d=${unixTo}&n=${cntdName}${
        cntdEffect ? "" : "confetti=false"
    }`;
    /*
    if (cntdTime != "" && cntdDate != "" && cntdName != "" && patt.test(cntdDate)) {
        location.href = `/?d=${cntdDate + " " + cntdTime}&n=${cntdName}`;
    } else if (!patt.test(cntdDate)) {
        alert("Your date is in an incorrect format");
    }
    */
}

checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        const count = 100;
        const defaults = {
            origin: {
                y: 0.8
            }
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55
        });
        fire(0.2, {spread: 60});
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }
});

document.getElementById("create-countdown").addEventListener("click", outPutInputs);
