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

const container = document.querySelector('#container')
const main = document.querySelector('.main')

let erPaPromille = true; //true -> promillesiden vises, false -> kriminalitetsiden vises

let differanseTall = 0;
let utvikling = "";
let ledeTekst = ""; //brukes til å forklare hva som har skjedd
let andreSelectVerdi = null

function changeFirst(evt) {
	let andreOutput = ''
	andreSelect.style.display = "block";
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

	//scroll
	container.style['overflow-y'] = 'scroll'
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
			<h1 class="utvikling">${utvikling}</h1>
			<p class="tekst">${ledeTekst}</p>
			<hr>
			`
		return forskjell;
	} else {
		utvikling = "Positiv utvikling";
		ledeTekst = `<strong>${forskjell *
	  -1}</strong> færre har kjørt med promille`;

		main.innerHTML = `
			<h1 class="utvikling">${utvikling}</h1>
			<p class="tekst">${ledeTekst}</p>
			<hr>
			`

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
	let max = null
	container.style['overflow-y'] = 'scroll'
	const grafData = Object.keys(data).map((key, i) => {
		let field = data[key][evt.target.value]
		if (field > max) {
			max = field
		}
		return [
			key,
			field
		];
	});

	let output = drawGraph(grafData, max)
	main.innerHTML = '<div class="diagram">' + output.x + output.y + '</div>'
}

//retunerer en søyle
function drawGraph(array, max) {
	/* 
		array[0] = år 2002
		array[1] = sum 902193
	*/
	let x = ''
	let y = ''
	array.forEach(elem => {
		const prosent = (elem[1] / max) * 100 + '%'
		y += `
			<div class="soyle" style="width: ${prosent}" data-antall="${elem[1]}"></div>
		`
		x += `
			<div class="soyleX">${elem[0]}</div>
		`
	})

	x = `
		<div class="x">
			${x}
		</div>
	`

	y = `
		<div class="y">
			${y}
		</div>
	`

	return {
		x,
		y
	}
}


//Endring av utseende
function endreUtsende() {
	endreHero();
}

//Endre banner og setter inn nytt bilde
function endreHero() {
	const hero = document.querySelector(".hero");
	const innhold = hero.querySelector('.innhold')
	const img = hero.querySelector('.bg-img')

	container.style['overflow-y'] = 'hidden'
	innhold.innerHTML = ""; //Fiks senere

	//if (erPaPromille) {} else {}

	endreSelect(innhold);
	endreImg(img)
}

//endrer bilde i hero
function endreImg(img) {
	if (erPaPromille) {
		img.src = 'https://thoughtcatalog.files.wordpress.com/2018/02/toine-garnier-396670.jpg?w=1140&h=655'
	} else {
		img.src = 'https://www.wallpaperup.com/uploads/wallpapers/2013/06/10/100581/37c22fc7b9797236026bf6bd3208b929-700.jpg'
	}
}

//Endre hvilke(n) selecter som skal visses
function endreSelect(boks) {
	if (erPaPromille) {
		boks.innerHTML += `
        <h1 id = "tittel"> Promille kjøring </h1>
        	<select name = "" id = "forsteSelect">
			<option disabled selected value > -Velg årstall - </option>
			<option value = "2002"> 2002 </option> 
			<option value = "2003"> 2003 </option> 
			<option value = "2004"> 2004 </option> 
			<option value = "2005"> 2005 </option> 
			<option value = "2006"> 2006 </option> 
			</select> <select name = "" id = "andreSelect"> </select>
        `;
	} else {
		boks.innerHTML += `
		<h1 id = "tittel" > Statestikk over kriminalitet </h1>
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
	let content = document.getElementById("content");
	const menu = document.querySelector('#menu')

	content.style.display = "none";
	//fade.style.left = '-100vw'
	fade.style.opacity = "0";
	sidenav.style.transition = "width 0.3s"
	sidenav.style.width = "0vw";
	sidenav.style.height = "0vh";
	closeSymbol.style.display = "none";
	setTimeout(() => {
		fade.style['z-index'] = -2
		menu.style['z-index'] = 3
	}, 1000);
}

// åpne sidemeny
function sidenavOpen() {
	let fade = document.getElementById("fade");
	let sidenav = document.getElementById("sidenav");
	let closeSymbol = document.getElementById("closeSymbol");
	let content = document.getElementById("content");
	const menu = document.querySelector('#menu')

	menu.style['z-index'] = 1
	content.style.display = "block";
	closeSymbol.style.display = "block";
	//fade.style.left = 0;
	fade.style['z-index'] = 2
	fade.style.opacity = "0.5";
	fade.style.width = "100vw";
	fade.style.height = "100vh";
	sidenav.style.width = "30vw";
	sidenav.style.height = "100vh";
}
//starter hele scriptet
lastInnPromille()