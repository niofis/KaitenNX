

(function () {

	var container = document.getElementsByClassName('knx-container')[0];
	var w = window.innerWidth;
	var h = window.innerHeight;
	//console.log(container,container.clientWidth, container.clientHeight,w,h)

	var DOMElement = (function () {
		var dh = function (element) {
			var self = this;
			
			self.element = document.createElement(element);

			self.style = {};
		}

		dh.prototype.addClass = function (name) {
			var self = this;

			self.element.className += ' ' + name;
		}

		dh.prototype.removeClass = function (name) {
			 var self = this;

			 self.swapClass(name, '');
		}

		dh.prototype.clearClass = function () {
			var self = this;

			self.element.className = '';
		}

		dh.prototype.swapClass = function (old_class, new_class) {
			var self = this;

			self.element.className = self.element.className.replace(old_class, new_class);
		}

		dh.prototype.css = function (opts) {
			var self = this;

			if(opts) {
				for(var key in opts) {
					self.style[key] = opts[key];
				}
			}

			self.element.style.cssText = styleToString(self.style);
			return self.element.style.cssText;
		}

		dh.prototype.appendChild = function (dom_element) {
			var self = this;

			self.element.appendChild(dom_element.element);
		}

		dh.prototype.html = function (html) {
			var self = this;

			self.element.innerHTML = html;

			return self.element.innerHTML;
		}

		dh.prototype.attr = function (attrs) {
			var self= this;

			if(attrs) {
				for(var key in attrs) {
					self.element[key] = attrs[key];
				}
			}
		}

		dh.prototype.dom = function () {
			var self = this;

			return self.element;
		}


		function styleToString (style) {
			var str = '';
			
			for(var key in style) {
				str += key + ':' + style[key] + ';'
			}

			return str;
		}

		return dh;
	})();

	var Frame = (function () {

		function createElement (title, onclose) {
			var element = {};

			var body = new DOMElement('DIV');
			body.addClass('frame');

			var title_bar = new DOMElement('DIV');
			title_bar.addClass('title');
			title_bar.css({height:'25px'});
			body.appendChild(title_bar);

			var title_text = new DOMElement('SPAN');
			title_text.html(title);
			title_bar.appendChild(title_text);

			var a_close = new DOMElement('A');
			a_close.addClass('close');
			a_close.html('X');
			a_close.css({float:'right'});
			a_close.attr({
				href:'javascript:;',
				onclick: function () {
					onclose();
				}
			});
			title_bar.appendChild(a_close);

			element.body = body;
			element.title_bar = title_bar;
			element.close = a_close;

			return element;
		}

		var frm = function (opts) {
			var self = this;

			self.focused = false;

			var op = opts || {};

			self.element = createElement(op.title, self.close.bind(self));

			self.listeners = {
				close: []
			}


		}

		frm.prototype.dom = function () {
			var self = this;

			return self.element.body.dom();
		}

		frm.prototype.focus = function () {
			var self = this;

			var pos = container.scrollLeft;
			container.scrollLeft = 0;

			var max_left = container.scrollWidth - container.clientWidth;

			var rect = self.dom().getBoundingClientRect();
			container.scrollLeft = pos;

			var scroll =  (rect.left + rect.width) - container.clientWidth;

			scroll = scroll < 0 ? 0 : scroll;

			container.scrollLeft = scroll;




			KaitenNX.unfocusAll();

			self.focused = true;

			self.element.title_bar.addClass('title-focus');

		}

		frm.prototype.unfocus = function () {
			var self = this;

			self.focused = false;
			self.element.title_bar.removeClass('title-focus');
		}

		frm.prototype.close = function () {
			var self = this;
			var allow_close = true;

			if(self.listeners) {
				self.listeners.close.forEach(function (fn) {
					allow_close = allow_close && fn(this);
				});
			}

			if(allow_close == true && container.contains(self.dom())) {
				container.removeChild(self.dom());
				if(self.focused == true) {
					KaitenNX.focusPrevious(self);
					self.focused = false;
				}
				KaitenNX.remove(self);
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
		var self = this;
		self.frames = [];
	}

	knx.prototype.push = function (opts) {
		var self = this;
		var frame = new Frame(opts);

		container.appendChild(frame.dom());
		frame.focus();
		self.frames.push(frame);

		return frame;
	}

	knx.prototype.unfocusAll = function () {
		var self = this;

		self.frames.forEach(function (f) {
			f.unfocus();
		});
	}

	knx.prototype.focusPrevious = function (frame) {
		var self = this;
		var idx = self.frames.indexOf(frame) - 1;

		if(idx >= 0 && self.frames[idx]) {
			self.frames[idx].focus();
		}
	}

	knx.prototype.remove = function (frame) {
		var self = this;
		var idx = self.frames.indexOf(frame);

		if(idx >= 0 && self.frames[idx]) {
			self.frames.splice(idx,1);
		}
	}

	window.KaitenNX = new knx();
})();