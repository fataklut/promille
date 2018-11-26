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

function menu() { }

let erPaPromille = true; //true -> promillesiden vises, false -> kriminalitetsiden vises

let differanseTall = 0;
let utvikling = "";
let ledeTekst = ""; //brukes til å forklare hva som har skjedd
let andreSelectVerdi = null

function changeFirst(evt) {
	let andreOutput = ''
	andreSelect.style.display = "block";
	andreSelect.style.textAlign = "center";
	andreSelect.style.margin = "auto";
	andreSelect.innerHTML = "";

	//setter inn tall i select
	const forsteArstall = Number(evt.target.value);
	for (let i = forsteArstall + 1; i <= 2007; i++) {
		let select = ''
		if (andreSelectVerdi == i) {
			select = 'selected'
		}
		andreOutput += `<option value="${i}" ${select}>${i}</option>`;
	}
	if (andreSelectVerdi === null) {
		andreSelect.innerHTML = "<option disabled selected value> -- Velg årstall -- </option>" +
			andreOutput
	} else {
		andreSelect.innerHTML = "<option disabled value> -- Velg årstall -- </option>" +
			andreOutput
	}


	//regne differanse
	differanseTall = differanse();
}

function changeAndre(evt) {
	//regne differanse
	andreSelectVerdi = evt.target.value
	differanseTall = differanse();
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
		return forskjell;
	} else {
		utvikling = "Positiv utvikling";
		ledeTekst = `<strong>${forskjell *
			-1}</strong> flærre har kjørt med promille`;
		return forskjell * -1;
	}
}

//Endre til promille kjøring - hele
function lastInnPromille() {
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
	erPaPromille = false;

	endreUtsende(); //Endre alle elementene

	//const kriminellSelect = document.querySelector("#kriminellSelect");
	kriminellSelect.addEventListener("change", onChangeKriminell, false);
}

function onChangeKriminell(evt) {
	const grafData = Object.keys(data).map((key, i) => {
		return { [key]: data[key][evt.target.value] };
	});

	console.log(grafData);
}

//Endring av utseende
function endreUtsende() {
	endreHero();
}

//Endre banner og setter inn nytt bilde
function endreHero() {
	const hero = document.querySelector(".hero");
	hero.innerHTML = ""; //Fiks senere

	if (erPaPromille) {
	} else {
	}

	endreSelect(hero);
}

//Endre hvilke(n) selecter som skal visses
function endreSelect(hero) {
	if (erPaPromille) {
		hero.innerHTML += `
        <select name="" id="forsteSelect">
          <option disabled selected value> - Velg årstall - </option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
          <option value="2004">2004</option>
          <option value="2005">2005</option>
          <option value="2006">2006</option>
        </select>
        <select name="" id="andreSelect"></select>
        `;
	} else {
		hero.innerHTML += `
        <select name="" id="kriminellSelect">
          <option disabled selected value> - Velg kriminalitet - </option>
          <option value="promillekjøring">Promille Kjøring</option>
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
	fade.style.width = "0vw";
	fade.style.height = "0vh";
	sidenav.style.width = "0vw";
	sidenav.style.height = "0vh";
	closeSymbol.style.display = "none";
}

// åpne sidemeny
function sidenavOpen() {
	let fade = document.getElementById("fade");
	let sidenav = document.getElementById("sidenav");
	let closeSymbol = document.getElementById("closeSymbol");
	closeSymbol.style.display = "block";
	fade.style.width = "100vw";
	fade.style.height = "100vh";
	sidenav.style.width = "30vw";
	sidenav.style.height = "100vh";
}