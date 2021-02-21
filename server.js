var express = require('express');
var path = require('path');
var request = require('request');
var app = express();

const port = process.env.PORT || 5000;

//Uncomment to allow CORS on this proxy. Not recommended as server might get flooded
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*');
//   next();
// });

app.get('/api/:url(*)', (req, res) => {
  request(req.params.url).pipe(res);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port);
