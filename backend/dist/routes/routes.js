"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activities_routes_1 = require("./activities.routes");
exports.default = (router) => {
    router.prefix('/api');
    router.use('/activities', activities_routes_1.ActivitiesRoute);
};
//# sourceMappingURL=routes.js.map