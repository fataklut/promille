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

function menu() {

}

//på endring av første select
forsteSelect.addEventListener('change', changeFirst, false)
andreSelect.addEventListener('change', changeAndre, false)
let differanseTall = 0

function changeFirst(evt) {
	andreSelect.style.display = 'block'
	andreSelect.innerHTML = ''
	andreSelect.innerHTML += '<option disabled selected value> -- Velg årstall -- </option>'

	//setter inn tall i select
	const forsteArstall = Number(evt.target.value)
	for (let i = forsteArstall + 1; i <= 2007; i++) {
		andreSelect.innerHTML += `<option value="${i}">${i}</option>`
	}

	//regne differanse
	console.log(differanse())
}

function changeAndre() {

	//regne differanse
	differanse()
}

function differanse() {
	return data[andreSelect.value].promillekjøring - data[forsteSelect.value].promillekjøring
}