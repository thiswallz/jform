import {NextFunction, Request, Response, Router} from 'express';
import {style as styleOptions, angular as angularOptions} from './data/options';

export const router: Router = Router();

router.get('/general', async function(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.send({
      styleOptions,
      angularOptions,
    });
  } catch (err) {
    return next(err);
  }
});
