module.exports = function(plop) {
  plop.setGenerator("component", {
    description: "Creating new react components",
    prompts: [
      {
        type: "input",
        name: "name"
      },
      {
        type: "list",
        name: "input",
        message: "Mit akarsz",
        choices: ["component", "page"]
      }
    ],
    actions: function(data) {
      const actions = []
      if (data.input === "component") {
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "plop_templates/functional-component.hbs",
          path: "src/Components/{{pascalCase name}}/{{pascalCase name}}.tsx"
        })
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "plop_templates/styles.hbs",
          path: "src/Components/{{pascalCase name}}/{{pascalCase name}}.scss"
        })
      } else {
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "plop_templates/functional-component.hbs",
          path: "src/Pages/{{pascalCase name}}/{{pascalCase name}}.tsx"
        })
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "plop_templates/styles.hbs",
          path: "src/Pages/{{pascalCase name}}/{{pascalCase name}}.scss"
        })
      }

      return actions
    }
  })
}
