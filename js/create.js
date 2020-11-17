const date = new Date();
const month = date.getMonth();

if (month === 11) {
    new Snowflakes({
        count: 30,
        maxSize: 20,
        speed: 1.5,
        wind: false,
        maxOpacity: 0.3

    });
}

const picker = datepicker(".datepicker", {});

const patt = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g

function outPutInputs() {
    const cntdDate = new Date(document.getElementById("date").value);
    const cntdTime = cntdDate.setHours(document.getElementById("time").value.split(":")[0] || 0, document.getElementById("time").value.split(":")[1] || 0);
    const cntdName = document.getElementById("name").value;

    const cntdEffect = document.getElementById("confetti").checked;

    const unixTo = cntdTime;

    location.href = `/?d=${unixTo}&n=${cntdName}${cntdEffect ? "" : "confetti=false"}`;
    /*
    if (cntdTime != "" && cntdDate != "" && cntdName != "" && patt.test(cntdDate)) {
        location.href = `/?d=${cntdDate + " " + cntdTime}&n=${cntdName}`;
    } else if (!patt.test(cntdDate)) {
        alert("Your date is in an incorrect format");
    }
    */
}