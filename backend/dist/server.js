"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const routes_1 = require("./routes/routes");
// Create Koa Application
const app = new Koa();
const port = process.env.PORT || 3001;
const mognodb_uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pongo';
const API_URL = "http://localhost:3000";
const options = {
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    allowMethods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: API_URL
};
const router = new Router();
routes_1.default(router);
app.use(cors(options));
app.use(bodyParser());
app.use(router.routes());
mongoose.connect(mognodb_uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));
// Start the application
app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));
//# sourceMappingURL=server.js.map