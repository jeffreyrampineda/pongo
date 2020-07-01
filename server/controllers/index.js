module.exports = (router) => {
    router.use('/api/activities', require('./activities.controller'));
};
