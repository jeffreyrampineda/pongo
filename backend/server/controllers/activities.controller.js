const Activity = require('../models/activity');

async function getAll(ctx) {
    ctx.body = await Activity.find();
}

async function getById(ctx) {
    ctx.body = await Activity.findOne({ _id: ctx.params.id })
}

async function create(ctx) {
    ctx.body = await Activity.create(ctx.request.body);
}

async function update(ctx) {
    ctx.body = await Activity.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
}

async function del(ctx) {
    ctx.body = await Activity.deleteOne({ _id: ctx.params.id })
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    del,
}
