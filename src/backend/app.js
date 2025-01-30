import express from 'express';
import rotas from './routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
dotenv.config({ path: 'C:/Users/MATHEUSHENRIQUECOSTA/Documents/DataViewINSS/.env' });

const app = express()
const {router} = rotas


app.use(cors({
    origin: ['http://localhost:4000', 'https://dataviewinss.onrender.com'],
    credentials: true
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(express.static('src', {
    index: false
}));

export default {app};
