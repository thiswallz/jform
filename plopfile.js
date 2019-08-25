module.exports = function(plop) {
  const src = 'src/components/';
  const templatesPath = 'plop-templates';

  plop.setHelper('toLowerCase', txt => txt.toLowerCase());
  plop.setHelper('toUpperCase', txt => txt.toUpperCase());

  plop.setGenerator('modal', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'modal name please'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.modal.ts',
        templateFile: 'plop-templates/modal.hbs'
      }
    ]
  });

  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name'
      },
      {
        type: 'input',
        name: 'where',
        message: 'location path'
      }
    ],
    actions: [
      {
        type: 'addMany',
        destination: `{{where}}/component-{{toLowerCase name}}`,
        stripExtensions: ['hbs'],
        force: true,
        data: {
          extra: 'SimilarC'
        },
        base: `${templatesPath}/component/`,
        templateFiles: `${templatesPath}/component/*.hbs`
      }
    ]
  });
};
