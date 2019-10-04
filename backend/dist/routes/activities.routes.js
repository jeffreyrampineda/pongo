"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const activities_controller_1 = require("../controllers/activities.controller");
const router = new Router();
router.get('/', activities_controller_1.default.getAll);
router.get('/:id', activities_controller_1.default.getById);
router.post('/', activities_controller_1.default.create);
router.put('/:id', activities_controller_1.default.update);
router.del('/:id', activities_controller_1.default.delete);
exports.ActivitiesRoute = router.routes();
//# sourceMappingURL=activities.routes.js.map