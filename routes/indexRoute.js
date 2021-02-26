module.exports = function(app){
    const index = require('../controllers/indexController');
    const jwtMiddleware = require('../config/jwtMiddleware');

    app.get('/api', jwtMiddleware, index.home);
};