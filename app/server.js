const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/endpoints');
const port = (process.env.PORT || 3000);
const publicPath = express.static(path.join(__dirname, '../prod'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.set('port', (process.env.PORT || 3000));
if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.deployment.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))
}

app.use('/prod', publicPath)
app.get('/', (request, response) => response.send(path.join(__dirname, '/index.html')));

app.use('/', routes)

app.listen(port)
console.log(`Server is running on ${port}.`)

module.exports = app
