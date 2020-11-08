var date = new Date();
var month = date.getMonth();
if (month == 11) {
  var sf = new Snowflakes({
    count: 30,
    maxSize: 20,
    speed: 1.5,
    wind: false,
    maxOpacity: 0.3

  });
}

const instance = M.Timepicker.getInstance(document.querySelectorAll(".timepicker"));

document.addEventListener("DOMContentLoaded", function() {
  options = {
    format: "mm/dd/yyyy"
  };
});
document.addEventListener("DOMContentLoaded", function() {
  options = {
    twelveHour: false
  };
  var elems = document.querySelectorAll(".timepicker");
});
var patt = /^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g

function outPutInputs() {
    let cntdDate = document.getElementById("date").value;
    let cntdTime = document.getElementById("time").value;
    let cntdName = document.getElementById("name").value;

    console.log(cntdDate);
    console.log(cntdTime);
    if(cntdTime != "" && cntdDate != "" && cntdName != "" && patt.test(cntdDate)) {
      console.log(patt.test(cntdDate));
      location.href = `/?d=${cntdDate +" "+cntdTime}&n=${cntdName}`;
    } else if (!patt.test(cntdDate)) {
      alert("Your date is in an incorrect format");
    }
}