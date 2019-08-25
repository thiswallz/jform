import {NextFunction, Request, Response, Router} from 'express';
export const router: Router = Router();
import * as fs from 'fs';
import {exec} from 'child_process';
import {treeBuilder} from './components/angular-reader';

router.get('/generate', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    exec(
      `npm run plop component exammmm "${req.query.folder}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.log(`Error trying to execute command, ${err}`);
          return;
        }

        res.send(stdout);
      }
    );
  } catch (err) {
    return next(err);
  }
});

router.get('/root', async function(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const rawdata = fs.readFileSync(`${req.query.folder}/angular.json`, 'utf8');
    const angularBase = JSON.parse(rawdata);
    const angular = angularBase[angularBase.newProjectRoot];
    const list = {name: 'projects', children: []};

    Object.keys(angular).forEach(pro => {
      if (pro.indexOf('-e2e') === -1) {
        console.log(pro, req.query.folder + angular[pro].sourceRoot);
        list.children.push(
          treeBuilder(
            `${req.query.folder}/${angular[pro].sourceRoot}`,
            pro,
            angularBase.defaultProject
          )
        );
      }
    });
    res.send(list);
  } catch (err) {
    return next(err);
  }
});
