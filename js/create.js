const date = new Date();
const month = date.getMonth();

if (month == 11) {
    const sf = new Snowflakes({
        count: 30,
        maxSize: 20,
        speed: 1.5,
        wind: false,
        maxOpacity: 0.3

    });
}

const instance = M.Timepicker.getInstance(document.querySelectorAll(".timepicker"));

document.addEventListener("DOMContentLoaded", () => {
        options = {
            format: "mm/dd/yyyy"
        };
    });
document.addEventListener("DOMContentLoaded", () => {
        options = {
            twelveHour: false
        };
        var elems = document.querySelectorAll(".timepicker");
    });

const patt = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g

function outPutInputs() {
    const cntdDate = document.getElementById("date").value;
    const cntdTime = document.getElementById("time").value;
    const cntdName = document.getElementById("name").value;

    if (cntdTime != "" && cntdDate != "" && cntdName != "" && patt.test(cntdDate)) {
        location.href = `/?d=${cntdDate + " " + cntdTime}&n=${cntdName}`;
    } else if (!patt.test(cntdDate)) {
        alert("Your date is in an incorrect format");
    }
}