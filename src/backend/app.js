import express from 'express';
import rotas from './routes.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import cors from 'cors'
dotenv.config({ path: 'C:/Users/MATHEUSHENRIQUECOSTA/Documents/DataViewINSS/.env' });

const app = express()
const {router} = rotas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: ['http://localhost:4000', 'https://dataviewinss.onrender.com'],
}));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.use(express.static('src'), {
    index: false
});

export default {app};
