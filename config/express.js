const express = require('express');
const compression = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
var cors = require('cors');

module.exports = function () {
    const app = express();

    app.use(compression());

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    app.use(methodOverride());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(cors());

    require('../src/app/routes/userRoute')(app);

    return app;
};