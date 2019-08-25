import * as dirTree from 'directory-tree';

export const treeBuilder = (folder, name, defaultName) => {
  const tree = dirTree(
    folder,
    {
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
        /.*\.spec.*$/
      ]
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
    }
  );
  // default app name, title is the tree js library property
  if (tree) {
    tree['title'] = name !== defaultName ? name : `${name} (default)`;
  }
  return tree;
};
