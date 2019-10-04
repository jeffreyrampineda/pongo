import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as mongoose from 'mongoose';
import * as bodyParser from 'koa-bodyparser';
import routes from './routes/routes';
const sendfile = require('koa-sendfile')
const path = require("path")

// Create Koa Application
const app = new Koa();
const router = new Router();

routes(router)

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();

} else if (process.env.NODE_ENV === 'production') {
    app.use(require('koa-static')(__dirname + '/../frontend/build'));
    router.get('*', async (ctx) => {
        await sendfile(ctx, (path.join(__dirname, "/../", "frontend/build", "index.html")));
    })
}

const port = process.env.PORT;
const mognodb_uri = process.env.MONGODB_URI;

app.use(bodyParser());
app.use(router.routes());

mongoose.connect(mognodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));

// Start the application
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));