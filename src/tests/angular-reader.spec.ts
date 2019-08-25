import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as sinon from 'sinon';
import * as dirTree from 'directory-tree';
import {treeBuilder} from '../components/angular-reader';
chai.use(sinonChai);
const expect = chai.expect;

describe('Angular project reader', () => {
  it('should return list of modules/folders', () => {
    const result = treeBuilder(
      `${__dirname}/apptest/`,
      'my-dream-app',
      'my-dream-app'
    );
    expect(result.children[0].name).to.equal('src');
    expect(result.children[0].children[0].name).to.equal('app');
    expect(result.children[0].children[0].type).to.equal('directory');
  });
});
