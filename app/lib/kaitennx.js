

(function () {

	var container = document.getElementsByClassName('kaitennx-container')[0];
	var w = window.innerWidth;
	var h = window.innerHeight;
	//console.log(container,container.clientWidth, container.clientHeight,w,h)

	var Frame = (function () {

		function createElement () {
			var main = document.createElement('DIV');
			main.className = 'frame';

			var title = document.createElement('DIV');
			title.className = 'title';
			title.style.cssText = 'height:25px;';
			main.appendChild(title);

			var a_close = document.createElement('A');
			a_close.className = 'close';
			a_close.innerHTML = 'X';
			a_close.style.cssText = "float:right;";
			a_close.href = "javascript:;";
			a_close.onclick = function () {
				container.removeChild(main);
			}
			title.appendChild(a_close);
			return main;
		}

		var frm = function () {
			var self = this;

			self.element = createElement();
			self.listeners = {
				close: []
			}
		}

		frm.prototype.close = function () {

		}

		frm.prototype.on = function (event, fn) {
			var self = this;

			if(self.listeners[event]) {
				self.listeners[event].push(fn);
			}
		}

		return frm;
	})();

	var knx = function () {

	}

	knx.prototype.push = function () {
		var frame = new Frame();
		container.appendChild(frame.element);
		return frame;
	}

	window.KaitenNX = new knx();
})();