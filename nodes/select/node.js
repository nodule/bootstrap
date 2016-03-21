state.select = null;
state.view = {};
state.changed = function () {
  var out = {};
  var self = this;

  out[this.value] = state.view.options.filter(function(opt) {
    return opt.value === self.value;
  }).pop();

  output({out: $.create(out)});
};

on.input.element = function () {

  if (state.select) {
    state.select.removeEventListener('change', state.changed);
    $.element.innerHTML = null;
  }

  state.view = {
    id: $.id,
    label: $.label,
    options: $.options
  };

  var el = domify(mustache.render($.template, state.view));

  $.element.appendChild(el);

  state.select = $.element.querySelector('select');
  state.select.addEventListener('change', state.changed);

  output({
    element: $.get('element')
  });

};
