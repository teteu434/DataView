import DataViewRepository from '../repository/DataViewRepository.js'
import { enviarEmail } from '../config/sendgrid.js'
import { dataTimerExpirar } from '../config/date.js';
import { reqLocal } from '../../../frontend/js/search.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

dotenv.config();


class DataViewController {

    async tabela(req, res){
        const resultado = await DataViewRepository.dadosTabela();
        res.json(resultado);
    }

    async gexGeral(req,res){
        try {
            const resultado = await DataViewRepository.gexGeral();
            res.json(resultado);
        } catch (error) {
            res.json(error)
        }
    }

    async gexGeralTotal(req,res){
        try {
            const resultado = await DataViewRepository.gexGeralTotal();
            res.json(resultado);
        } catch (error) {
            res.json(error)
        }
    }
    
    async dadosCentrais(req,res){
        try {
            const resultado = await DataViewRepository.dadosCentrais();
            res.json(resultado);
        } catch (error) {
            res.json(error)
        }
    }

    async sr2(req,res){
        try {
            const resultado = await DataViewRepository.sr2();
            res.json(resultado);
        } catch (error) {
            res.json(error)
        }
    }

    async dadosAps(req,res){
        try {
            
            const resultado = await DataViewRepository.dadosAps();
            res.json(resultado);
        } catch (error) {
            res.json(error)
        }
    }

    async users(req,res){
        const resultado = await DataViewRepository.dadosUsuarios();
        res.json(resultado);
    }

    async sessao(req, res){
        try{
            const id = req.cookies.sessionId;
            if(id){
                const resultado = await DataViewRepository.usuarioLogado(id)
                if(resultado.correto){
                    if(resultado.resultado.length != 0) res.json({usuario: resultado.resultado[0].usuario, logado: true, 
                        adm: resultado.resultado[0].adm})
                    else res.json({message: 'Sem sessão para esse ID', logado: false})
                } else res.json({message: "Erro ao buscar sessão", logado: false})
    
            } else res.json({message: "Nenhum ID registrado", logado: false})
        }catch(error){
            console.log(error)
        }


    }

    async confereSenha(req, res){
        try {
            const {email, senha} = req.body;
            const xixi = await bcrypt.hash(senha, 10)
            const resultado = await DataViewRepository.confereDadosLogin(email)
            if(resultado.resultado.length == 0){
                res.status(404).json({ 
                    correto: false,
                    message: "Usuario não encontrado."
                })
            } 
            else{
                
                if(await bcrypt.compare(senha, resultado.resultado[0].senha)) res.status(200).json({ 
                    correto: true,
                    usuario: resultado.resultado[0].usuario,
                    message: "senha valida",
                    adm: resultado.resultado[0].adm,
                    contaHabilitada: resultado.resultado[0].contahabilitada,
                    emailConfirmado: resultado.resultado[0].emailconfirmado
                })
                else res.status(400).json({ 
                    correto: false,
                    message: "Usuário e/ou senha inválidos.",
                    pass: senha,
                    crypto: xixi})
            }
        } catch (error) {
            console.log(error)
        }

    }

    async insertUser(req, res){
        const {usuario, email, senha, adm, contaHabilitada} = req.body;
        try {
            const pass = await bcrypt.hash(senha, 10);
            const resultado = await DataViewRepository.insertUser(usuario, email, pass, adm, contaHabilitada)
            if(resultado.correto)
            {
                const token = crypto.randomBytes(16).toString('hex');
                const timerexpirar = dataTimerExpirar();
                const mensagem = `
                    <h1>Confirme seu e-mail</h1>
                    <p>Clique no botão abaixo para confirmar seu e-mail:</p>
                    <a href= "${reqLocal}/confirmar-email?token=${token}">
                        <button  type="button" class="btn btn-success px-5">Clique aqui</button>
                    </a>
                    `
                    const result = await DataViewRepository.updateToken(token, timerexpirar, email);
                    
                    if(result.correto){
                        if(result.update == 0){
                            res.json(JSON.parse(JSON.stringify({ message: "Erro ao achar email",
                                enviado: false
                                })))
                            
                        } else{
                            await enviarEmail(email, 'Confirmação de Email DataView', mensagem);
                            res.json(JSON.parse(JSON.stringify({ enviado: true,
                                message: 'Email enviado com sucesso! Conferir na caixa de mensagens.'
                            })))
                        }
            
                    } else res.json(JSON.parse(JSON.stringify({ resultado: result, message: result.message,
                        enviado: false
                    })))
                
            } else res.status(500).json({"correto": false, "mensagem": "Erro ao criar usuário"})
        } catch (error) {
            console.log(error)
        }

    }

    async reenviarEmail(req, res){
        const {destinatario} = req.body;
        try {
            const token = crypto.randomBytes(16).toString('hex');
            const timerexpirar = dataTimerExpirar();
            const mensagem = `
                <h1>Confirme seu e-mail</h1>
                <p>Clique no botão abaixo para confirmar seu e-mail:</p>
                <a href= "${reqLocal}/confirmar-email?token=${token}">
                    <button  type="button" class="btn btn-success px-5">Clique aqui</button>
                </a>
                `
                const result = await DataViewRepository.updateToken(token, timerexpirar, destinatario);
                
                if(result.correto){
                    if(result.update == 0){
                        res.json(JSON.parse(JSON.stringify({ message: "Erro ao achar email",
                            enviado: false
                            })))
                        
                    } else{
                        await enviarEmail(destinatario, 'Reset de Senha', mensagem);
                        res.json(JSON.parse(JSON.stringify({ enviado: true,
                            message: 'Email enviado com sucesso! Conferir na caixa de mensagens.'
                        })))
                    }
        
                } else res.json(JSON.parse(JSON.stringify({ resultado: result, message: result.message,
                    enviado: false
                })))
        } catch (error) {
            console.log(error)
        }
    }



    async confereEmail(req,res){
        
        const {destinatario} = req.body;

        try {
            const resultado = await DataViewRepository.confereEmail(destinatario)
            if(resultado.correto){
                if(resultado.resultado.length == 0){
                    res.status(404).json({ message: "Email não encontrado em nossa base de dados",
                        enviado: false
                    })
                } else{
                    const token = crypto.randomBytes(16).toString('hex');
                    
                    const timerexpirar = dataTimerExpirar();
                    const mensagem = `
                    <h1>Resetar Senha</h1>
                    <p>Clique no botão abaixo para ser redirecionado para resetar sua senha</p>
                    <a href= "${reqLocal}/resetPass.html?token=${token}">
                        <button  type="button" class="btn btn-success px-5">Clique aqui</button>
                    </a>
                `
                    const result = await DataViewRepository.updateToken(token, timerexpirar, destinatario);
                    if(result.correto){
                        await enviarEmail(destinatario, 'Reset de Senha', mensagem);
                        res.status(200).json({ message: "email enviado",
                            enviado: true
                        })
                    } else res.status(500).json({ message: result.message,
                        enviado: false
                    })
    
        
                }
            } else res.status(500).json({ message: "Erro ao achar usuário",
                enviado: false
            })
        } catch (error) {
            console.log(error)
        }

    }

    async confirmaEmail(req,res){
        
        try {
            const {token} = req.query;
            const resultado = await DataViewRepository.confirmaEmail(token);
            if(resultado.correto) res.redirect('/login.html')
            else res.status(400).json(resultado)
        } catch (error) {
            console.log(error)
        }
        
    }

    async login(req,res){
        const sessionId = Math.random().toString(36).substring(2);
        const{email, usuario, adm} = req.body;

        try {
            const resultado = await DataViewRepository.confereLogin(email)
            if(resultado.correto){
                if(resultado.resultado.length == 0){
    
                    const expiresat = dataTimerExpirar();
                    const result = await DataViewRepository.insereLogin(sessionId, usuario, email, expiresat, adm)
                    if(result.correto){
                        res.cookie('sessionId', sessionId, { 
                            httpOnly: true, 
                            secure: true, 
                            sameSite: 'None',
                            Domain: reqLocal
                        });
                        res.status(200).json({message: "Logado com sucesso", logado: true})
                    } 
                    else res.status(500).json({message: "Erro ao iniciar sessão", logado: false})
    
                } else res.status(401).json({message: "Usuário já logado", logado: true})
    
                
            } else res.status(500).json({message: "Erro ao buscar usuario", logado: false})
        } catch (error) {
            console.log(error)
        }

    }

    async logout(req,res){
        try {
            const id = req.cookies.sessionId;
            if(id){
                const resultado = await DataViewRepository.logoutUsuario(id)
                if(resultado.correto){
                    res.clearCookie('sessionId')
                    res.status(200).json({ message: 'Logout realizado com sucesso', redirect: 'login.html', deslogado: true });
                } else res.status(500).json({ message: 'Erro ao encerrar a sessão', deslogado: false});
    
            } else res.json({message: "nenhuma id registrado", logado: false})  
        } catch (error) {
            console.log(error)
        }
  
        
    }

    async reset(req,res){
        try {
            const {token, senha} = req.body;
            const resultado = await DataViewRepository.confereTokenESenha(token);
            if(resultado.correto){
                if(resultado.resultado.length == 0){
                    res.status(404).json({ 
                        reset: false,
                        message: "Token inválido/expirado. Solicite novamente o reset da senha."
                    })
                }
                else{
                    if(await bcrypt.compare(senha, resultado.resultado[0].senha)) res.status(400).json({ 
                        reset: false,
                        message: "A senha não pode ser a mesma da anterior."
                    })
                    else{
                        const pass = await bcrypt.hash(senha, 10)
                        const result = await DataViewRepository.updatePass(pass, token)
                        if(result.update != 0){
                            res.status(result.correto ? 202 : 500).json(result.correto ? 
                                {
                                    reset: true,
                                    message: "Senha atualizada com sucesso, redirecionando para a página de Login!",
                                    redirect: 'login.html'
                                } 
                                :
                                {
                                    reset: false,
                                    message: result.message
                                }
                            )
                        } else res.status(404).json({reset: false, message: "Não foi encontrado este usuário"})
    
    
                    } 
                }
    
                
            } else res.status(500).json({ message: resultado.message,
                reset: false
            })
        } catch (error) {
            console.log(error)
        }

    }

    async update(req,res){
        try {
            const {usuario, contaHabilitada} = req.body;
            const message1 = "Conta habilitada com sucesso!", message2 = "Conta desabilitada com sucesso!"
            const resultado = await DataViewRepository.atualizaConta(usuario, contaHabilitada);
                res.status(resultado.correto ? 202 : 500).json(resultado.correto ? 
                {
                    message: contaHabilitada ? message1 : message2,
                    atualizado: true
                } 
                :
                {
                    message: 'Conta não encontrada',
                    atualizado: false
                }
            )
        } catch (error) {
            console.log(error)
        }
        
    }

    async excluir(req, res){
        try {
            const {usuario} = req.body;
            const resultado = await DataViewRepository.deleteUser(usuario)
            res.status(resultado.correto ? 202 : 404).json({
                message: resultado.correto ? "Deletado com sucesso" : resultado.message
            })
        } catch (error) {
            console.log(error)
        }
 
    }


}

export default new DataViewController();
