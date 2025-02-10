import {Router} from 'express';
import DataViewController from './app/controllers/DataViewController.js';
import authenticate from './app/config/authenticate.js';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', authenticate.autenticarRotaFront, (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
router.get('/index.html', authenticate.autenticarRotaFront, (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
router.get('/adm.html', authenticate.autenticarRotaFront, (req, res) =>{
    res.sendFile(path.join(__dirname, '../adm.html'))
})
router.get('/login.html', (req, res) =>{
    res.sendFile(path.join(__dirname, '../login.html'))
})

router.get('/sessao', DataViewController.sessao)
router.get('/tabela', authenticate.autenticaRotaTabela, DataViewController.tabela)
router.get('/users', authenticate.autenticaRotaUsuario, DataViewController.users)
router.get('/confirmar-email', DataViewController.confirmaEmail)
router.post('/confereSenha', DataViewController.confereSenha)
router.post('/insertUser', DataViewController.insertUser)
router.post('/recovery', DataViewController.confereEmail)
router.post('/login', DataViewController.login)
router.post('/logout', DataViewController.logout)
router.put('/reconfirmaEmail', DataViewController.reenviarEmail)
router.put('/reset', DataViewController.reset)
router.put('/atualiza', DataViewController.update)
router.delete('/exclui', DataViewController.excluir)

export default {router}