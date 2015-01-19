module.exports = {
  name: "button",
  ns: "bootstrap",
  title: "Button",
  description: "Bootstrap - button",
  async: true,
  ports: {
    input: {
      element: {
        title: "Parent Element",
        type: "HTMLElement",
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
            state.el.className = input.classList;
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
      classList: {
        title: "Class list",
        type: "string",
        "default": "btn btn-default"
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
        type: "object",
        "default": {}
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
      event: {
        title: "Event",
        type: "object"
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