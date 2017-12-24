/**
 * This is the router module that handles incoming requests and respond
 * to it by routing to the appropriate handler.
 */

const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const gamePlay = require('./game-play');

// Handle static file serving using express's express-static module
// so that we don't need to worry about mimetypes and stuff
const staticServe = serveStatic('src/public', {index: ['index.html']});

/**
 * Send response to the client
 *
 * @param {Object} res - the response object
 * @param {number} status - a numeric status code
 * @param {Object} response - an object to be sent in the response
 */
function sendResponse(res, status, response) {
  res.writeHead(status, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(response));
}

/**
 * The router function which decides how to handle the incoming requests
 * based on the request URL
 *
 * @param {*} req - the request object
 * @param {*} res - the response object
 */
function route(req, res) {
  // All API requests are handled here
  if (req.url.startsWith('/api')) {
    // This is the API to handle each game play
    if (req.url === '/api/play') {
      const response = gamePlay.roll();
      sendResponse(res, 200, response);
    }
  } else {
    // Serve static files
    staticServe(req, res, finalhandler(req, res));
  }
}

module.exports = route;
