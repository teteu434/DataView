import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config({ path: 'C:/Users/MATHEUSHENRIQUECOSTA/Documents/DataViewINSS/.env' });

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB,
    ssl: {
        rejectUnauthorized: false
    },
}

const banco = new Client(config)

banco.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco:', err);
    } else {
      console.log('Conectado ao banco com sucesso!');
    }
  });

banco.on('error', (err) =>{
    console.error(err)
    
})
  

export default banco;