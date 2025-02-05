import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

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

const banco = new Pool(config)

//testar conexão do banco

try {
    const client = await banco.connect();
    console.log('Conectado ao banco com sucesso!');
    client.release();
} catch (err) {
    console.error('Erro ao conectar ao banco:', err);
}

banco.on('error', (err) =>{
    console.error(err)
    
})
  

export default banco;