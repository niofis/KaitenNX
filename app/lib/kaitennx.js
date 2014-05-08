

(function () {

	var container = document.getElementsByClassName('knx-container')[0];
	var w = window.innerWidth;
	var h = window.innerHeight;
	//console.log(container,container.clientWidth, container.clientHeight,w,h)

	var Frame = (function () {

		function createElement (onclose) {
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
				onclose();
			}
			title.appendChild(a_close);
			return main;
		}

		var frm = function () {
			var self = this;

			self.element = createElement(self.close.bind(self));

			self.listeners = {
				close: []
			}

		}

		frm.prototype.focus = function () {
			var self = this;
			var rect = self.element.getBoundingClientRect();
/*
			$(container).animate({
		        scrollLeft: rect.left + rect.width + $(container).scrollLeft()
		    }, 300);*/
		    self.element.scrollIntoView();
		}

		frm.prototype.close = function () {
			var self = this;
			var allow_close = true;

			if(self.listeners) {
				self.listeners.close.forEach(function (fn) {
					allow_close = allow_close && fn(this);
				});
			}

			if(allow_close == true && container.contains(self.element)) {
				container.removeChild(self.element);
			}
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
		frame.focus();
		return frame;
	}

	window.KaitenNX = new knx();
})();