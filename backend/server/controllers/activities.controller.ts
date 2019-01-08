import Activity from '../models/activity';

class ActivitiesController {

    async getAll(ctx) {
        ctx.body = await Activity.find();
    }

    async getById(ctx) {
        ctx.body = await Activity.findOne({ _id: ctx.params.id })
    }

    async create(ctx) {
        ctx.body = await Activity.create(ctx.request.body);
    }

    async update(ctx) {
        ctx.body = await Activity.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body)
    }

    async delete(ctx) {
        ctx.body = await Activity.deleteOne({ _id: ctx.params.id })
    }
}

export default new ActivitiesController();