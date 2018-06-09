process.env.UV_THREADPOOL_SIZE = 1;

const express = require('express');
const cluster = require('cluster');
const crypto = require('crypto');
const numCPUs = require('os').cpus().length;
const app = express();

// console.log(cluster.isMaster, 'isMaster');
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.get("/", (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send("Hi there");
    });
    console.log(`Worker ${process.pid} assigned to slow`);
    res.send("Hi there");
  });
  app.get("/fast", (req, res) => {
    console.log(`Worker ${process.pid} assigned to fast`);
    res.send("Fast");
  });
  app.listen(3000);

  console.log(`Worker ${process.pid} started`);
}

