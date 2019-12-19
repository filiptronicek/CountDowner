let urlParams = new URLSearchParams(window.location.search);

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

console.log(`Lol e is ${urlParams.get("e")}`);
if (urlParams.has("e")) {
  eventName = urlParams.get("e");
  if (eventName == "christmas-eve") {
    location.href = `/?d=12/24/${year} 19:00&n=🎄 Christmas ${year} 🎄`;
  } else if (eventName == "christmas") {
    location.href = `/?d=12/25/${year} 8:00&n=🎄 Christmas ${year} 🎄`;
  } else if (eventName == "new-years") {
    location.href = `/?d=1/1/${year + 1} 0:00&n= Year ${year + 1} `;
  }
} else {
  location.href = "./";
}
