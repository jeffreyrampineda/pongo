import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as mongoose from 'mongoose';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes/routes';

// Create Koa Application
const app = new Koa();
const router = new Router();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

} else if (process.env.NODE_ENV === 'production') {
    app.use(require('koa-static')(__dirname + '/../frontend/build'));
}

const port = process.env.PORT;
const mognodb_uri = process.env.MONGODB_URI;
routes(router)

app.use(bodyParser());
app.use(router.routes());

mongoose.connect(mognodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));

// Start the application
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));