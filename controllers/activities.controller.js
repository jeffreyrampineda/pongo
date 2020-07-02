const Activity = require('../models/activity');
const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = await Activity.find();
});

router.get('/:id', async (ctx) => {
    const { id } = ctx.params;

    ctx.body = await Activity.findOne({ _id: id })
});

router.post('/', async (ctx) => {
    const { title, datetime } = ctx.request.body;

    ctx.body = await Activity.create({ title, datetime });
});

router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { title, datetime } = ctx.request.body;

    ctx.body = await Activity.findOneAndUpdate({ _id: id }, { title, datetime }, { new: true });
});

router.del('/:id', async (ctx) => {
    const { id } = ctx.params;

    ctx.body = await Activity.deleteOne({ _id: id })
});

module.exports = router.routes();
