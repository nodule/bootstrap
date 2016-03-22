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
            state.in = $.in;
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
        type: "MouseEvent"
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
        out: $.clone('in', state.in)
      });
    }
  }
}