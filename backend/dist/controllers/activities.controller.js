"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = require("../models/activity");
class ActivitiesController {
    async getAll(ctx) {
        ctx.body = await activity_1.default.find();
    }
    async getById(ctx) {
        ctx.body = await activity_1.default.findOne({ _id: ctx.params.id });
    }
    async create(ctx) {
        ctx.body = await activity_1.default.create(ctx.request.body);
    }
    async update(ctx) {
        ctx.body = await activity_1.default.findOneAndUpdate({ _id: ctx.params.id }, ctx.request.body);
    }
    async delete(ctx) {
        ctx.body = await activity_1.default.deleteOne({ _id: ctx.params.id });
    }
}
exports.default = new ActivitiesController();
//# sourceMappingURL=activities.controller.js.map