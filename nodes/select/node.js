state.select = null;
state.changed = function () {
  output({
    out: this.value
  });
};

on.input.element = function () {

  if (state.select) {
    state.select.removeEventListener('change', state.changed);
  }

  var view = {
    id: input.id,
    label: input.label,
    options: input.options
  };

  var el = domify(mustache.render(input.template, view))

  input.element.appendChild(el);

  state.select = input.element.querySelector('select');
  state.select.addEventListener('change', state.changed);

  output({
    element: input.element
  });

}