import {NextFunction, Request, Response, Router} from 'express';
import {buildDiscover} from './components/angular-reader';
import {execute} from './components/generator';

export const router: Router = Router();

router.get('/generate', async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const exec = execute(req.query.folder);
    const result = exec.component('ejempl');
    res.send(result);
  } catch (err) {
    return next(err);
  }
});

router.get('/root', async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const discover = buildDiscover(req.query.folder);
    res.send(discover.components());
  } catch (err) {
    return next(err);
  }
});
