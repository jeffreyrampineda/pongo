const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

// Create Koa Application
const app = new Koa();
const router = new Router();

app.use(require('koa-static')(__dirname + '/client/build'));
app.use(bodyParser());

// Api routes
require('./controllers')(router);
app.use(router.routes());

mongoose.connect(process.env.MONGODB_URI_development,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));

module.exports = app;
