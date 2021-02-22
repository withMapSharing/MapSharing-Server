module.exports = function(app){
    const user = require('../controllers/userController');

    app.route('/api/kakao-auth').post(user.kakaoAuth);
};