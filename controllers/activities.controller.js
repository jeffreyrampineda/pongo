const Activity = require('../models/activity');
const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = await Activity.find();
});

router.get('/:id', async (ctx) => {
    ctx.body = await Activity.findOne({ _id: ctx.params.id })
});

router.post('/', async (ctx) => {
    ctx.body = await Activity.create(ctx.request.body);
});

router.put('/:id', async (ctx) => {
    ctx.body = await Activity.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
});

router.del('/:id', async (ctx) => {
    ctx.body = await Activity.deleteOne({ _id: ctx.params.id })
});

module.exports = router.routes();
