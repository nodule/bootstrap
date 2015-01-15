module.exports = {
  name: "select",
  ns: "bootstrap",
  title: "Select",
  description: "Bootstrap - select",
  async: true,
  dependencies: {
    npm: {
      mustache: require('mustache'),
      domify: require('domify')
    }
  },
  ports: {
    input: {
      element: {
        type: "HTMLElement",
        title: "Parent Element",
        async: true,
        fn: function __ELEMENT__(data, x, source, state, input, output, mustache, domify) {
          var r = function() {
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
          }.call(this);
          return {
            state: state,
            return: r
          };
        }
      },
      template: {
        title: "Template",
        type: "string",
        "default": "<div>{{#label}}<label>{{label}}</label>{{/label}}<select id=\"{{id}}\" class=\"form-control\">{{#options}}<option value=\"{{value}}\">{{label}}</option>{{/options}}</select></div>",
        format: "html"
      },
      id: {
        type: "string",
        title: "ID",
        "default": ""
      },
      label: {
        type: "string",
        title: "Label",
        "default": ""
      },
      options: {
        title: "Variables",
        type: "array",
        items: {
          type: "object",
          properties: {
            label: {
              type: "string",
              title: "Label"
            },
            value: {
              type: "string",
              title: "Value"
            },
            additionalProperties: false
          }
        }
      }
    },
    output: {
      element: {
        title: "Element",
        type: "HTMLFragment"
      },
      out: {
        title: "Value",
        type: "object",
        properties: {
          label: {
            type: "string",
            title: "Label"
          },
          value: {
            type: "string",
            title: "Value"
          }
        }
      }
    }
  },
  state: {
    select: null,
    view: {},
    changed: function() {

      var out = {};
      var self = this;

      out[this.value] = state.view.options.filter(function(opt) {
        return opt.value === self.value;
      }).pop();

      output({
        out: out
      });
    }
  }
}