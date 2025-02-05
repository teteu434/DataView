import apps from './src/backend/app.js';
import dotenv from 'dotenv'
dotenv.config();

const {app} = apps;

app.listen(process.env.API_PORT_SITE, '0.0.0.0', function(){
    console.log(`SITE rodando na porta ${process.env.API_PORT_SITE}!`);
});
