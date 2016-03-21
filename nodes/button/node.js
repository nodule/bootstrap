state.el = null;
state.clickHandler = function(ev) {
  output({
    event: ev,
    out: $.clone('in', state.in)
  });
};

on.input.element = function() {
  if (state.el) {
    state.el.removeEventListener('click', state.clickHandler);
    state.el.innerHTML = null;
  }
  state.el = document.createElement('button');
  state.el.setAttribute('type', 'button');
  state.el.innerHTML = $.label;
  state.el.className = $.classList;
  Object.keys($.attr).forEach(function(name) {
    state.el.setAttribute(name, $.attr[name]);
  });
  state.el.addEventListener('click', state.clickHandler);
  $.element.appendChild(state.el);
  output({
    element: $.get('element')
  });
};

on.input.in = function () {
  state.in = $.in;
};
