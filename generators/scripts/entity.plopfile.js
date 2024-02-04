module.exports = (plop) => {
  plop.setGenerator('entity', {
    description: 'Creates a entity and its repository',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your repository name?',
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'What db does your entity belongs to?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../../src/database/entities/{{camelCase name}}.{{dbName}}.entity.ts',
        templateFile: '../templates/entity.ts.hbs',
      },
      {
        type: 'add',
        path: '../../src/database/repositories/{{camelCase name}}/{{camelCase name}}.repository.ts',
        templateFile: '../templates/repository.ts.hbs',
      },
      {
        type: 'modify',
        pattern: /(\/\/PLOP IMPORT REPOSITORY)/g,
        path: '../../src/database/repositories/common/repositoryCatalog.ts',
        template: `import { {{pascalCase name}}Repository } from "../{{camelCase name}}/{{camelCase name}}.repository";\n$1`,
      },
      {
        type: 'modify',
        pattern: /(\/\/PLOP INSERT REPOSITORY)/g,
        path: '../../src/database/repositories/common/repositoryCatalog.ts',
        template: `get {{name}}(): {{pascalCase name}}Repository {
          return this.getRepo<{{pascalCase name}}Repository>(
            "{{name}}",
            () => new {{pascalCase name}}Repository(),
          );
        }\n$1`,
      },
    ],
  });
};
