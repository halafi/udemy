const express = require('express');

const app = express();
const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {

  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      postMessage(counter);
    }

  });

  worker.onmessage = function(myCounter) {
    console.log(myCounter, 'result')
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("Fast");
});

app.listen(3000);
