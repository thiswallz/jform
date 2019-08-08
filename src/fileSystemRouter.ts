import {NextFunction, Request, Response, Router} from 'express';
export const router: Router = Router();
import * as dirTree from 'directory-tree';
import * as fs from 'fs';

function treeBuilder(folder, name, defaultName) {
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
        /.*\.spec.*$/,
      ],
    },
    (item, PATH, stats) => {
      item['title'] = item.name;
      switch (item.extension) {
        case '.html':
          // item['icon'] = 'assets/html.png';
          break;
      }
      //console.log(item);
    },
    (item, PATH, stats) => {
      item['title'] = item.name;
      item['folder'] = true;
      item['icon'] = 'assets/angular.png';
      //console.log(item);
    },
  );
  console.log(defaultName, name);
  tree['title'] = name !== defaultName ? name : `${name} (default)`;
  return tree;
}

router.get('/root', async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    let rawdata = fs.readFileSync(`${req.query.folder}/angular.json`, 'utf8');
    let angularBase = JSON.parse(rawdata);
    let angular = angularBase[angularBase.newProjectRoot];
    let list = {name: 'projects', children: []};

    Object.keys(angular).forEach(pro => {
      if (pro.indexOf('-e2e') === -1) {
        console.log(pro, req.query.folder + angular[pro].sourceRoot);
        list.children.push(
          treeBuilder(
            `${req.query.folder}/${angular[pro].sourceRoot}`,
            pro,
            angularBase.defaultProject,
          ),
        );
      }
    });
    console.log(list);
    res.send(list);
  } catch (err) {
    return next(err);
  }
});
