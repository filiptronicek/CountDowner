(()=>{const e=new URLSearchParams(window.location.search),t=new Date,a=(t.getMonth(),t.getFullYear());let n="";if(e.has("e")&&(n=e.get("e")),"e"===location.href.split("/")[3]&&(n=location.href.split("/")[4]),console.log(e.get("c")),""!==n)switch(n){case"christmas-eve":const e=new Date(`12/24/${a} 19:00`).getTime();location.href=`../?d=${e}&n=🎄 Christmas ${a} 🎄`;break;case"christmas":const t=new Date(`12/25/${a} 8:00`).getTime();location.href=`../?d=${t}&n=🎄 Christmas ${a} 🎄`;break;case"nwyr":const n=new Date(`1/1/${a+1} 0:00`).getTime();location.href=`../?d=${n}&n= Year ${a+1} `}else e.has("c")&&fetch(`/api/get?code=${e.get("c")}`,{}).then((e=>e.json)).then((e=>location.href=e.result))})();