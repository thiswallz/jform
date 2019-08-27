import * as fs from 'fs';
import * as dirTree from 'directory-tree';

const treeBuilder = (folder, name, defaultName, options = {}) => {
  const tree = dirTree(
    folder,
    {
      ...options,
    },
    (item, PATH, stats) => {
      item['title'] = item.name;
      // in case you want to replace the icon
      switch (item.extension) {
        case '.scss':
          item['icon'] = 'assets/scss.png';
          break;
      }
    },
    (item, PATH, stats) => {
      item['title'] = item.name;
      item['folder'] = true;
      item['icon'] = 'assets/angular.png';
    },
  );
  // default app name, title is the tree js library property
  if (tree) {
    tree['title'] = name !== defaultName ? name : `${name} (default)`;
  }
  return tree;
};

export const buildDiscover = (folder: string) => {
  return {
    components: () => {
      const options = {
        exclude: [
          /\.git/,
          /node_modules/,
          /dist/,
          /.vscode/,
          /coverage/,
          /e2e/,
          /.json/,
          /^\./,
          /_.*/,
          /.*\.spec.*$/,
        ],
      };
      const rawdata = fs.readFileSync(`${folder}/angular.json`, 'utf8');
      const angularBase = JSON.parse(rawdata);
      const angular = angularBase[angularBase.newProjectRoot];
      const list = {name: 'projects', children: []};

      Object.keys(angular).forEach(pro => {
        if (pro.indexOf('-e2e') === -1) {
          console.log(pro, folder + angular[pro].sourceRoot);
          list.children.push(
            treeBuilder(
              `${folder}/${angular[pro].sourceRoot}`,
              pro,
              angularBase.defaultProject,
              options,
            ),
          );
        }
      });
      return list;
    },
  };
};
