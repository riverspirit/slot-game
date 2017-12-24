const {expect} = require('chai');
const {start} = require('./index');
const {promisify} = require('util');
const request = promisify(require('request'));

describe('router', () => {
  describe('/api/play', () => {
    const server = start();

    it('should return game play response', () => {
      /* eslint  no-unused-expressions: 0 */
      request('http://localhost:4500/api/play', 'post', (err, response) => {
        expect(err).to.be.null;
        expect(() => {
          JSON.parse(response.body);
        }).to.not.throw();

        const result = JSON.parse(response.body);
        expect(result).to.have.all.keys('slots', 'win', 'bonus');
      });
    });

    after(() => {
      server.close();
    });
  });
});
