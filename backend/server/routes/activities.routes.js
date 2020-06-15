const Router = require('koa-router');
const ActivitiesController = require('../controllers/activities.controller');

const router = new Router();

router.get('/', ActivitiesController.getAll);
router.get('/:id', ActivitiesController.getById);
router.post('/', ActivitiesController.create);
router.put('/:id', ActivitiesController.update);
router.del('/:id', ActivitiesController.del);

module.exports = router.routes();
