module.exports = {
  name: "jumbotron",
  ns: "bootstrap",
  title: "Jumbotron",
  description: "Bootstrap - Jumbotron",
  type: "object",
  ports: {
    input: {
      template: {
        title: "Template",
        type: "string",
        "default": "<div class=\"jumbotron\"><div class=\"container\"><h1>{{title}}</h1><p>{{content}}</p><p><a class=\"btn btn-primary btn-lg\">{{button_text}}</a></p></div></div>",
        format: "html"
      },
      vars: {
        title: "Variables",
        type: "object",
        properties: {
          title: {
            type: "string",
            title: "Title",
            "default": "Hello, world!",
            required: "true"
          },
          content: {
            type: "string",
            title: "Content",
            "default": "This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.",
            required: "true"
          },
          button_text: {
            type: "string",
            title: "Button text",
            "default": "Learn More",
            required: "true"
          }
        }
      }
    },
    output: {
      vars: {
        title: "Vars",
        type: "object"
      },
      template: {
        title: "Template",
        type: "string",
        format: "html"
      }
    }
  },
  fn: function jumbotron(input, output, state, done, cb, on) {
    var r = function() {
      output = input;
    }.call(this);
    return {
      output: output,
      state: state,
      on: on,
      return: r
    };
  }
}