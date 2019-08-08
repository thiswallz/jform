module.exports = function(plop) {
  const src = "src/components/";
  const templatesPath = 'plop-templates';

  plop.setHelper('toLowerCase', (txt) => txt.toLowerCase());
  plop.setHelper('toUpperCase', (txt) => txt.toUpperCase());
  
  // controller generator
  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please',
      },
      {
        type: 'input',
        name: 'ctr',
        message: 'controller ext please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.{{ctr}}.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });

  plop.setGenerator('modal', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'modal name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{name}}.modal.ts',
        templateFile: 'plop-templates/modal.hbs',
      },
    ],
  });

  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: `${src}component-{{toLowerCase name}}`,
        stripExtensions: ['hbs'],
        force: true,
        data: {
          extra: 'SimilarC',
        },
        base: `${templatesPath}/component/`,
        templateFiles: `${templatesPath}/component/*.hbs`,
      },
    ],
  });
};
