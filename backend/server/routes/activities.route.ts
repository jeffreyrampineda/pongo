import * as Router from 'koa-router';
import ActivitiesController from '../controllers/activities.controller';

const router = new Router();

router.prefix('/api/activities');

// GET /api/activity
router.get('/', ActivitiesController.getActivities)

router.post('/', ActivitiesController.create)

export const ActivitiesRoute = router.routes();