import express from 'express';
import rotas from './routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { reqLocal } from '../frontend/js/search.js';
dotenv.config();

const app = express()
const {router} = rotas


app.use(cors({
    origin: reqLocal,
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(express.static('src'));

export default {app};
