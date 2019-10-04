import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as mongoose from 'mongoose';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes/routes';

// Create Koa Application
const app = new Koa();
const port = process.env.PORT || 3001
const mognodb_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pongo';
const API_URL = "http://localhost:3000"
const options:cors.CorsOptions = {
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    allowMethods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: API_URL
};
const router = new Router();

app.use(require('koa-static')(__dirname + '/../frontend/build'));

routes(router)

app.use(cors(options));
app.use(bodyParser());
app.use(router.routes());

mongoose.connect(mognodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));

// Start the application
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));