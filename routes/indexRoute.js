module.exports = function(app){
    const index = require('../controllers/indexController');
    const jwtMiddleware = require('../config/jwtMiddleware');

    app.get('/api', jwtMiddleware, index.home);
    app.get('/api/list', jwtMiddleware, index.showPlaceList);
    app.get('/api/list/:placeListIdx', jwtMiddleware, index.showPlaceInList);
    app.post('/api/list', jwtMiddleware, index.addPlaceList)
};