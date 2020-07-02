const Activity = require('../models/activity');
const Router = require('koa-router');

const router = new Router();

/**
 * GET /api/activities
 * Get all activites.
 */
router.get('/', async (ctx) => {
    ctx.body = await Activity.find();
});

/**
 * GET /api/activities/:id
 * Get activity with the specified id.
 */
router.get('/:id', async (ctx) => {
    const { id } = ctx.params;

    ctx.body = await Activity.findOne({ _id: id })
});

/**
 * POST /api/activities
 * Create a new activity.
 */
router.post('/', async (ctx) => {
    const { title, datetime } = ctx.request.body;

    ctx.body = await Activity.create({ title, datetime });
});

/**
 * PUT /api/activities/:id
 * Update an activity with the specified id.
 */
router.put('/:id', async (ctx) => {
    const { id } = ctx.params;
    const { title, datetime } = ctx.request.body;

    ctx.body = await Activity.findOneAndUpdate({ _id: id }, { title, datetime }, { new: true });
});

/**
 * DEL /api/activities/:id
 * Delete an activity with the specified id.
 */
router.del('/:id', async (ctx) => {
    const { id } = ctx.params;

    ctx.body = await Activity.deleteOne({ _id: id })
});

module.exports = router.routes();
