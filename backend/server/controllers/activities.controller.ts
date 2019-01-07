import Activity from '../models/activity';

class ActivitiesController {

    async getAll(ctx) {
        ctx.body = await Activity.find();
    }

    async create(ctx) {
        ctx.body = await Activity.create(ctx.request.body);
    }
}

export default new ActivitiesController();