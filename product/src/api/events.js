module.exports = (app) => {

    app.get('/events', async (req, res, next) => {

        const { payload } = req.body;

        console.log('Product service receiving event');
        return res.status(200).json(payload);
    });
    
};