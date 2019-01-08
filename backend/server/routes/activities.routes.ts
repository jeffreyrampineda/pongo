import * as Router from 'koa-router';
import ActivitiesController from '../controllers/activities.controller';

const router = new Router();

router.get('/', ActivitiesController.getAll)
router.post('/', ActivitiesController.create)

export const ActivitiesRoute = router.routes();