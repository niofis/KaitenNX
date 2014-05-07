

(function () {

	var container = document.getElementsByClassName('kaitennx-container')[0];
	var w = window.innerWidth;
	var h = window.innerHeight;
	console.log(container,container.clientWidth, container.clientHeight,w,h)

	function createFrame () {
		var div = document.createElement('DIV');
		div.className='kaitennx-frame'
		div.innerHTML = 'Muajaj'
		return div;
	}

	var knx = function () {

	}

	knx.prototype.push = function () {
		container.appendChild(createFrame());
	}

	window.KaitenNX = new knx();
})();

console.log(window.KaitenNX)