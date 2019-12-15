document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems);
});
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".timepicker");
  var instances = M.Timepicker.init(elems);
});

function outPutInputs() {
    let cntdDate = document.getElementById("date").value;
    let cntdTime = document.getElementById("time").value;
    let cntdName = document.getElementById("name").value;

    console.log(cntdDate);
    console.log(cntdTime);
    if(cntdTime != "" && cntdDate != "" && cntdName != "") {
    location.href = `/?d=${cntdDate +" "+cntdTime}&n=${cntdName}`;
    }
}