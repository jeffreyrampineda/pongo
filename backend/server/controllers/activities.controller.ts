import Activity from '../models/activity';

class ActivitiesController {

    async getActivities(ctx) {
        ctx.body = await Activity.find();
    }
}

export default new ActivitiesController();