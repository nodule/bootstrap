state.select = null;
state.view = {};
state.changed = function () {

  var out = {};
  var self = this;

  out[this.value] = state.view.options.filter(function(opt) {
    return opt.value === self.value;
  }).pop();

  output({out: out});
};

on.input.element = function () {

  if (state.select) {
    state.select.removeEventListener('change', state.changed);
    input.element.innerHTML = null;
  }

  state.view = {
    id: input.id,
    label: input.label,
    options: input.options
  };

  var el = domify(mustache.render(input.template, state.view));

  input.element.appendChild(el);

  state.select = input.element.querySelector('select');
  state.select.addEventListener('change', state.changed);

  output({
    element: input.element
  });

};
