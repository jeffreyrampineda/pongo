import { ActivitiesRoute } from './activities.routes';

export default (router) => {
    router.use('/api/activities', ActivitiesRoute)
}
