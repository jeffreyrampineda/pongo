const sendfile = require('koa-sendfile');

module.exports = (router) => {
    router.use('/api/activities', require('./activities.controller'));
    router.get('(.*)', async (ctx) => {
        await sendfile(ctx, __dirname + `/../client/build/index.html`);
    });
};
