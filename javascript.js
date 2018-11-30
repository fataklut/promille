let data = {
  2002: {
    promillekjøring: 9631,
    ulovligHastighet: 9863
  },
  2003: {
    promillekjøring: 8593,
    ulovligHastighet: 12217
  },
  2004: {
    promillekjøring: 8363,
    ulovligHastighet: 14920
  },
  2005: {
    promillekjøring: 8128,
    ulovligHastighet: 14929
  },
  2006: {
    promillekjøring: 8514,
    ulovligHastighet: 15425
  },
  2007: {
    promillekjøring: 8534,
    ulovligHastighet: 18010
  }
};

const container = document.querySelector("#container");
const main = document.querySelector(".main");

let erPaPromille = false; //true -> promillesiden vises, false -> kriminalitetsiden vises

let differanseTall = 0;
let utvikling = "";
let ledeTekst = ""; //brukes til å forklare hva som har skjedd
let andreSelectVerdi = null;

function changeFirst(evt) {
  let andreOutput = "";
  andreSelect.style.display = "block";
  andreSelect.innerHTML = "";

  //setter inn tall i select
  const forsteArstall = Number(evt.target.value);
  for (let i = forsteArstall + 1; i <= 2007; i++) {
    let select = "";
    if (andreSelectVerdi == i) {
      select = "selected";
    }
    andreOutput += `<option value="${i}" ${select}>${i}</option>`;
  }
  if (andreSelectVerdi === null) {
    andreSelect.innerHTML =
      "<option disabled selected value> -- Velg årstall -- </option>" +
      andreOutput;
  } else {
    andreSelect.innerHTML =
      "<option disabled value> -- Velg årstall -- </option>" + andreOutput;
  }

  //regne differanse
  differanseTall = differanse();
}

function changeAndre(evt) {
  //regne differanse
  andreSelectVerdi = evt.target.value;
  differanseTall = differanse();

  //scroll
  const menu = document.querySelector("#menu");
  menu.style.boxShadow = "none";
  container.style["overflow-y"] = "scroll";
  autoScroll();
}

function differanse() {
  if (data[andreSelect.value] === undefined) {
    utvikling = "";
    ledeTekst = "";
    return 0;
  }

  const forskjell =
    data[andreSelect.value].promillekjøring -
    data[forsteSelect.value].promillekjøring;

  //Hvis forskjellen er mindre eller lik null er det negativ utvikling
  if (forskjell >= 0) {
    utvikling = "Negativ utvikling";
    ledeTekst = `<strong>${forskjell}</strong> flere har kjørt med promille`;

    main.innerHTML = `
      <div id="resultat">
      <div id="resultatTittel">
      <h1 class="utvikling">${utvikling}</h1>
      </div>
      <hr>
      <div id="resultatTekst">
			<p class="tekst">${ledeTekst}</p>
      </div>
      </div>
			`;
    return forskjell;
  } else {
    utvikling = "Positiv utvikling";
    ledeTekst = `<strong>${forskjell *
      -1}</strong> færre har kjørt med promille`;

    main.innerHTML = `
      <div id="resultat">
      <h1 class="utvikling">${utvikling}</h1>
      <hr>
      <div id="resultatTekst">
			<p class="tekst">${ledeTekst}</p>
      </div>
      </div>
			`;

    return forskjell * -1;
  }
}

//Endre til promille kjøring - hele
function lastInnPromille() {
  if (erPaPromille) return;
  //resete variabler
  differanseTall = 0;
  utvikling = "";
  ledeTekst = "";
  erPaPromille = true;

  endreUtsende(); //Endre alle elementene

  //på endring av første select
  forsteSelect.addEventListener("change", changeFirst, false);
  andreSelect.addEventListener("change", changeAndre, false);
}

//Graf over kriminelle handlinger - hele
function lastInnKriminell() {
  if (!erPaPromille) return;
  erPaPromille = false;

  endreUtsende(); //Endre alle elementene

  //const kriminellSelect = document.querySelector("#kriminellSelect");
  kriminellSelect.addEventListener("change", onChangeKriminell, false);
}

function onChangeKriminell(evt) {
  let max = null;
  container.style["overflow-y"] = "scroll";

  autoScroll();
  const grafData = Object.keys(data).map((key, i) => {
    let field = data[key][evt.target.value];
    if (field > max) {
      max = field;
    }
    return [key, field];
  });

  let output = drawGraph(grafData, max);
  main.innerHTML =
    '<div class="diagram">' +
    output.x +
    output.y +
    "</div><div id='hover-data'></div>";

  //hover på graf
  document.querySelectorAll(".soyle").forEach(elem => {
    elem.addEventListener("mouseover", graphHover, false);
    elem.addEventListener("mouseleave", notGraphHover, false);
  });
}

function autoScroll() {
  const hero = document.querySelector(".hero");
  container.scrollTop = hero.getBoundingClientRect().top + hero.offsetHeight;
}

//retunerer en søyle
function drawGraph(array, max) {
  /* 
		array[0] = år 2002
		array[1] = sum 902193
	*/
  let x = "";
  let y = "";
  array.forEach(elem => {
    const prosent = (elem[1] / max) * 100 + "%";
    y += `
			<div class="soyle" data-prosent="${prosent}" data-antall="${elem[1]}"></div>
		`;
    x += `
			<div class="soyleX">${elem[0]}</div>
		`;
  });

  x = `
		<div class="x">
			${x}
		</div>
	`;

  y = `
		<div class="y">
			${y}
		</div>
	`;

  return {
    x,
    y
  };
}

//kalles når mouseover graf
function graphHover(evt) {
  const hoverData = document.querySelector("#hover-data");
  const antall = evt.target.getAttribute("data-antall");
  const offset = main.getBoundingClientRect();

  hoverData.innerHTML = antall;
  hoverData.style.display = "block";
  hoverData.style.left = evt.screenX + "px";
  hoverData.style.top = evt.pageY - offset.top + "px";
}

//fjerner hover
function notGraphHover(evt) {
  const hoverData = document.querySelector("#hover-data");
  hoverData.style.display = "none";
}

function animertGraf() {
  const hero = document.querySelector(".hero");
  if (
    container.scrollTop <
    hero.getBoundingClientRect().top + hero.offsetHeight
  ) {
    return;
  }
  setSoyle();
}

function setSoyle() {
  const soyle = document.querySelectorAll(".soyle");
  soyle.forEach(elem => {
    let prosent = elem.getAttribute("data-prosent");
    elem.style.width = prosent;
  });
}

//Endring av utseende
function endreUtsende() {
  endreHero();
}

//Endre banner og setter inn nytt bilde
function endreHero() {
  const hero = document.querySelector(".hero");
  const innhold = hero.querySelector(".innhold");
  // const img = hero.querySelector(".bg-img");

  container.scrollTop = 0;

  container.style["overflow-y"] = "hidden";
  innhold.innerHTML = ""; //Fiks senere

  //if (erPaPromille) {} else {}
  sidenavClose();

  endreSelect(innhold);
  // endreImg(img);
}

//endrer bilde i hero
function endreImg(img) {
  if (erPaPromille) {
    img.src = "speed.mp4";
  } else {
    img.src = "drift.mp4";
  }
}

//Endre hvilke(n) selecter som skal visses
function endreSelect(boks) {
  if (erPaPromille) {
    boks.innerHTML += `
        <h1 id = "tittel"> Promillekjøring </h1>
        	<select name = "" id = "forsteSelect">
			<option disabled selected value style=""> -Velg årstall - </option>
			<option value = "2002"> 2002 </option> 
			<option value = "2003"> 2003 </option> 
			<option value = "2004"> 2004 </option> 
			<option value = "2005"> 2005 </option> 
			<option value = "2006"> 2006 </option> 
			</select> <select name = "" id = "andreSelect"> </select>
        `;
  } else {
    boks.innerHTML += `
		<h1 id = "tittel" > Statistikk over kriminalitet </h1>
        <select name="" id="kriminellSelect">
          <option disabled selected value> - Velg kriminalitet - </option>
          <option value="promillekjøring">Promillekjøring</option>
          <option value="ulovligHastighet">Ulovlig Hastighet</option>
		</select>
      `;
  }
}

// lukk-knapp fade
function closeSymbolFade() {
  let closeSymbol = document.getElementById("closeSymbol");
  closeSymbol.style.opacity = "0.6";
}

function closeSymbolBack() {
  let closeSymbol = document.getElementById("closeSymbol");
  closeSymbol.style.opacity = "1";
}

// lukke sidemeny
function sidenavClose() {
  let fade = document.getElementById("fade");
  let sidenav = document.getElementById("sidenav");
  let closeSymbol = document.getElementById("closeSymbol");
  let content = document.getElementById("content");
  const menu = document.querySelector("#menu");

  content.style.display = "none";
  closeSymbol.style.display = "none";
  setTimeout(() => {
    fade.style["z-index"] = -2;
    menu.style["z-index"] = 3;
  }, 1000);

  sidenav.classList.remove("sidenav-open");
  fade.classList.remove("fade-open");
}

// åpne sidemeny
function sidenavOpen() {
  let fade = document.getElementById("fade");
  let sidenav = document.getElementById("sidenav");
  let closeSymbol = document.getElementById("closeSymbol");
  let content = document.getElementById("content");
  const menu = document.querySelector("#menu");

  menu.style["z-index"] = 1;
  content.style.display = "block";
  closeSymbol.style.display = "block";
  fade.style["z-index"] = 2;

  sidenav.classList.add("sidenav-open");
  fade.classList.add("fade-open");
}
//starter hele scriptet
lastInnPromille();

//scroll
container.addEventListener("scroll", animertGraf, false);
