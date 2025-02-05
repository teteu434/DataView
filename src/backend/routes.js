import {Router} from 'express';
import DataViewController from './app/controllers/DataViewController.js';
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', DataViewController.autenticarRota, (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
router.get('/index.html', DataViewController.autenticarRota, (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
router.get('/adm.html', DataViewController.autenticarRota, (req, res) =>{
    res.sendFile(path.join(__dirname, '../adm.html'))
})
router.get('/login.html', (req, res) =>{
    res.sendFile(path.join(__dirname, '../login.html'))
})
router.get('/tabela', DataViewController.gerarTabela)
router.get('/sessao', DataViewController.sessao)
router.get('/users', DataViewController.usuarios)
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