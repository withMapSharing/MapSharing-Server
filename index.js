const express = require('./config/express');
const {logger} = require('./config/winston');
require('dotenv').config();

const port = process.env.PORT || 7000;
express().listen(port);
logger.info(`${process.env.NODE_ENV} - MapSharing Server Start At Port ${port}`);