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
        choices: ["component", "page", "provider"]
      }
    ],
    actions: function(data) {
      const actions = []
      if (data.input === "provider") {
        actions.push({
          type: "add", //adding file to your propject
          templateFile: "client/plop_templates/provider.hbs",
          path: "client/src/Providers/{{lowerCase name}}_provider.tsx"
        })
      } else if (data.input === "component") {
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
