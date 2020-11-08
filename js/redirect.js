const urlParams = new URLSearchParams(window.location.search);

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

let eventName = "";

if(urlParams.has("e")) eventName = urlParams.get("e"); 
if(location.href.split("/")[3] == "e") eventName = location.href.split("/")[4];


if (eventName !== "") {
  let redir;
  switch(eventName) {
    case "christmas-eve":
      location.href = `../?d=12/24/${year} 19:00&n=🎄 Christmas ${year} 🎄`;
      break;
    case "christmas":
      location.href = `../?d=12/25/${year} 8:00&n=🎄 Christmas ${year} 🎄`;
      break;
    case "new-years":
      location.href = `../?d=1/1/${year + 1} 0:00&n= Year ${year + 1} `;
      break;
    case "nwyr":
      location.href = `../?d=1/1/${year + 1} 0:00&n= Year ${year + 1} `;
      break;
  }
} else {
  location.href = "../";
}
