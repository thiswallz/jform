import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import {router as routerFile} from './router.file';
import {router as routerOptions} from './router.options';

const publicPath = path.join(__dirname, 'public');

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use('/file', routerFile)
  .use('/options', routerOptions)
  .use(express.static(__dirname + '/public'));

app.use('/', express.static(publicPath));

app.listen(4201, err => {
  if (err) {
    return console.log(err);
  }
  return console.log('My Node App listening on port 4201');
});
