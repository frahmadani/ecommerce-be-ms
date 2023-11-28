const UserService = require('../services/user-service');

module.exports = (app) => {

    const service = new UserService();

    app.post('/user/events', (req, res, next) => {

        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log('Received event from Order service');
        console.log('Event content: ', payload );
        return res.status(200).json(payload);
    });

};