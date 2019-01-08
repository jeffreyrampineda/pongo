import { ActivitiesRoute } from './activities.routes';

export default (router) => {
    router.prefix('/api');
    router.use('/activities', ActivitiesRoute)
}