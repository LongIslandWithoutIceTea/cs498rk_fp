/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api', require('./userRoute.js')(router));
    app.use('/api', require('./servantRoute.js')(router));
};
