state.el = null;
state.clickHandler = function(ev) {
  output({
    event: ev,
    out: state.in
  });
};

on.input.element = function() {
  if (state.el) {
    state.el.removeEventListener('click', state.clickHandler);
    state.el.innerHTML = null;
  }
  state.el = document.createElement('button');
  state.el.setAttribute('type', 'button');
  state.el.innerHTML = input.label;
  state.el.className = input.classList;
  Object.keys(input.attr).forEach(function(name) {
    state.el.setAttribute(name, input.attr[name]);
  });
  state.el.addEventListener('click', state.clickHandler);
  input.element.appendChild(state.el);
  output({
    element: input.element
  });
};

on.input.in = function () {
  state.in = input.in;
};
