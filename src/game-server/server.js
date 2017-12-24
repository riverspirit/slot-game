/**
 * Express.js isn't used in the back-end, following the spirit of not using
 * a framework in the front-end
 */

const {createServer} = require('http');
const router = require('./router');

const server = createServer(router);

function start() {
  server.listen(4500);

  /* eslint no-console: 0 */
  console.log(`Server listening on port ${server.address().port}`);

  // Returning reference so that it can stopped in the specs after test execution
  return server;
}

exports.start = start;
