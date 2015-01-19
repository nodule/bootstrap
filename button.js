module.exports = {
  name: "button",
  ns: "bootstrap",
  title: "Button",
  description: "Bootstrap - button",
  async: true,
  ports: {
    input: {
      element: {
        type: "HTMLElement",
        title: "Parent Element",
        async: true,
        fn: function __ELEMENT__(data, x, source, state, input, output) {
          var r = function() {
            if (state.el) {
              state.el.removeEventListener('click', state.clickHandler);
              state.el.innerHTML = null;
            }
            state.el = document.createElement('button');
            state.el.setAttribute('type', 'button');
            state.el.innerHTML = input.label;
            state.el.classList = input.classList;
            Object.keys(input.attr).forEach(function(name) {
              state.el.setAttribute(name, input.attr[name]);
            });
            state.el.addEventListener('click', state.clickHandler);
            input.element.appendChild(state.el);
            output({
              element: input.element
            });
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      "in": {
        type: "any",
        description: "Input to send to output when clicked",
        title: "Input",
        async: true,
        fn: function __IN__(data, x, source, state, input, output) {
          var r = function() {
            state.in = data;
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      label: {
        type: "string",
        title: "Label",
        "default": "Click!"
      },
      attr: {
        title: "Attributes",
        type: "object"
      }
    },
    output: {
      element: {
        title: "Element",
        type: "HTMLElement"
      },
      error: {
        title: "Error",
        type: "Error"
      },
      out: {
        title: "Output",
        type: "any"
      }
    }
  },
  state: {
    el: null,
    clickHandler: function(ev) {
      output({
        event: ev,
        out: state.in
      });
    }
  }
}