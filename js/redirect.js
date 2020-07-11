const urlParams = new URLSearchParams(window.location.search);

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

let urlSearch = "";

if(urlParams.has("e")) urlSearch = urlParams.get("e"); 
if(location.href.split("/")[3] == "e") urlSearch = location.href.split("/")[4];


if (urlSearch !== "") {
  eventName = urlSearch;
  console.log(eventName)
  let redir;
  switch(eventName) {
    case "christmas-eve":
      location.href = `../?d=12/24/${year} 19:00&n=🎄 Christmas ${year} 🎄`
      break;
    case "christmas":
      location.href = `../?d=12/25/${year} 8:00&n=🎄 Christmas ${year} 🎄`
      break
    case "new-years":
      location.href = `../?d=1/1/${year + 1} 0:00&n= Year ${year + 1} `
      break;
    case "nwyr":
      location.href = `../?d=1/1/${year + 1} 0:00&n= Year ${year + 1} `
      break;
  }
} else {
  location.href = "../";
}
