module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Creating new next.js components, pages, providers.',
    prompts: [
      {
        type: 'input',
        name: 'name',
      },
      {
        type: 'list',
        name: 'input',
        message: 'Mit akarsz',
        choices: ['component', 'page', 'provider'],
      },
    ],
    actions: function (data) {
      const actions = []
      if (data.input === 'provider') {
        actions.push({
          type: 'add', //adding file to your propject
          templateFile: '/Users/meszarosdezso/MISC/plop_templates/provider.hbs',
          path: 'client/providers/{{lowerCase name}}.tsx',
        })
      } else if (data.input === 'component') {
        actions.push({
          type: 'add',
          templateFile:
            '/Users/meszarosdezso/MISC/plop_templates/component.hbs',
          path: 'client/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        })
        actions.push({
          type: 'add',
          templateFile: '/Users/meszarosdezso/MISC/plop_templates/styles.hbs',
          path:
            'client/components/{{pascalCase name}}/{{pascalCase name}}.scss',
        })
      } else if (data.input === 'page') {
        actions.push({
          type: 'add',
          templateFile:
            '/Users/meszarosdezso/MISC/plop_templates/component.hbs',
          path: 'client/pages/{{pascalCase name}}/index.tsx',
        })
        actions.push({
          type: 'add',
          templateFile: '/Users/meszarosdezso/MISC/plop_templates/styles.hbs',
          path: 'client/pages/{{pascalCase name}}/{{pascalCase name}}.scss',
        })
      }

      return actions
    },
  })
}
