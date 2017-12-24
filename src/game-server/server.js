const {createServer} = require('http');
const router = require('./router');

const server = createServer(router);

function start() {
  server.listen(4500);

  /* eslint no-console: 0 */
  console.log(`Server listening on port ${server.address().port}`);
}

exports.start = start;
