module.exports = function(plop) {
  plop.setGenerator("component", {
    description: "Creating new react components",
    prompts: [
      {
        type: "list",
        name: "input",
        message: "Mit akarsz",
        choices: ["component", "page"]
      },
      {
        type: "input",
        name: "name"
      }
    ],
    actions: function(data) {
      const actions = []
      if (data.input === "component") {
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "client/plop_templates/functional_component.hbs",
          path:
            "client/src/Components/{{pascalCase name}}/{{pascalCase name}}.tsx"
        })
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "client/plop_templates/styles.hbs",
          path:
            "client/src/Components/{{pascalCase name}}/{{pascalCase name}}.scss"
        })
      } else {
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "client/plop_templates/functional_component.hbs",
          path: "client/src/Pages/{{pascalCase name}}/{{pascalCase name}}.tsx"
        })
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "client/plop_templates/styles.hbs",
          path: "client/src/Pages/{{pascalCase name}}/{{pascalCase name}}.scss"
        })
      }

      return actions
    }
  })
}
