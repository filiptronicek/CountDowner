const urlParams = new URLSearchParams(window.location.search);

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

let redirect,
  eventName = "";

if (location.href.split("/")[3] === "e")
  eventName = location.href.split("/")[4];

if (location.href.split("/")[3] === "c") redirect = location.href.split("/")[4];

if (eventName !== "") {
  switch (eventName) {
    case "christmas-eve":
      const cdate = new Date(`12/24/${year} 19:00`).getTime();
      location.href = `../?d=${cdate}&n=🎄 Christmas ${year} 🎄`;
      break;
    case "christmas":
      const xdate = new Date(`12/25/${year} 8:00`).getTime();
      location.href = `../?d=${xdate}&n=🎄 Christmas ${year} 🎄`;
      break;
    case "nwyr":
      const nwyrdate = new Date(`1/1/${year + 1} 0:00`).getTime();
      location.href = `../?d=${nwyrdate}&n= Year ${year + 1} `;
      break;
  }
} else if (redirect !== "") {
  fetch(`/api/get?code=${redirect}`, {})
    .then((r) => r.json())
    .then((res) => (location.href = res.result));
} else {
  location.href = "../";
}
