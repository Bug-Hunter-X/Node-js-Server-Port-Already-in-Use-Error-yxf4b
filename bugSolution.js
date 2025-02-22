const http = require('http');
const net = require('net');

const checkPort = (port) => {
  return new Promise((resolve, reject) => {
    const tester = net.createServer()
      .once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          reject(new Error(`Port ${port} is already in use.`));
        } else {
          reject(err);
        }
      })
      .once('listening', () => {
        tester.once('close', () => resolve(true))
        .close();
      })
      .listen(port);
  });
};

const requestListener = (request, response) => {
  response.writeHead(200);
  response.end('Hello, World!');
};

const port = 8080;

checkPort(port)
  .then(() => {
    const server = http.createServer(requestListener);
    server.listen(port);
    console.log(`Server is running on port ${port}`);
  })
  .catch((error) => {
    console.error(error.message);
  });