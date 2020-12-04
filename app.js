import "core-js";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
dotenv.config();
import routes from "./routes";
import userRouter from "./routers/userRouter";
import mapRouter from "./routers/mapRouter";
import placeRouter from "./routers/placeRouter";

const PORT = process.env.PORT || 4117;
const sequelize = require('./models').sequelize;

const app = express();
sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes.users, userRouter);
app.use(routes.maps, mapRouter);
app.use(routes.places, placeRouter);

const handleListening = () => console.log(`Listening on: http://localhost in port ${PORT}`);
app.listen(PORT, handleListening);