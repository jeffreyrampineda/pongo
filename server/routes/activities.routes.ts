import * as Router from 'koa-router';
import ActivitiesController from '../controllers/activities.controller';

const router = new Router();

router.get('/', ActivitiesController.getAll)
router.get('/:id', ActivitiesController.getById)
router.post('/', ActivitiesController.create)
router.put('/:id', ActivitiesController.update)
router.del('/:id', ActivitiesController.delete)

export const ActivitiesRoute = router.routes();