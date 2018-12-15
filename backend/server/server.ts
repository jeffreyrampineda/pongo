import * as Koa from 'koa';
import { ActivitiesRoute } from './routes/activities.route';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/pongo-log', { useNewUrlParser: true });

mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => console.log('Connection to mongodb established'));


// Create Koa Application
const app = new Koa();

app.use(ActivitiesRoute);

// Start the application
app.listen(3000, () => console.log('The server is running at http://localhost:3000/'));