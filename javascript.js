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

function changeFirst(evt) {
	andreSelect.style.display = 'block'
}

function changeAndre(evt) {
	const forsteArstall = forsteSelect.value
	evt.target.innerHTML += '<option disabled selected value> -- Velg årstall -- </option>'


}
document.addEventListener('DOMContentLoaded', function () {
	var elems = document.querySelectorAll('.sidenav');
	var instances = M.Sidenav.init(elems, options);
});

var instance = M.Sidenav.getInstance(elem);

instance.open();
