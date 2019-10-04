import { ActivitiesRoute } from './activities.routes';
const sendfile = require('koa-sendfile')
const path = require("path")

export default (router) => {
    router.use('/api/activities', ActivitiesRoute)
    router.get('*', async (ctx) => {
        await sendfile(ctx, (path.join(__dirname, "/../../", "frontend/build", "index.html")));
    })
}