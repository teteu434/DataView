import banco from '../database/conexao.js'

function consultaSimples(sql, valor, mensagem){
        return new Promise(async (resolve, reject) =>{
            try {
                const valores = Array.isArray(valor) ? valor : [valor];
                const result = await banco.query(sql, valores)
                resolve({update: result.rowCount, resultado: result.rows, correto: true})
            } catch (error) {
                reject({erro: error, message: mensagem, correto: false})
            }


    })
}

class DataViewRepository {

    async dadosTabela() {
        try {
            const regioes = [
                'Vitória', 'Belo Horizonte', 'Barbacena', 'Contagem',
                'Divinópolis', 'Governador Valadares', 'Juíz de Fora',
                'Montes Claros', 'Ouro Preto', 'Poços de Caldas', 
                'Uberaba', 'Uberlândia', 'Varginha', 'Diamantina', 
                'Teófilo Otoni'
            ];

            const resultados = {};

            for (const regiao of regioes) {
                const result = await banco.query(
                    `SELECT * FROM pactuacao WHERE Gerencia = $1 ORDER BY id`, [regiao]
                );
                resultados[regiao] = result.rows;
            }

            return resultados;

        } catch (error) {
            throw new Error('Erro ao buscar tabela: ' + error.message);
        }
    }

    async dadosUsuarios(){
        return new Promise(async (resolve, reject) => {
            const resultado = await banco.query(`select * from usuarios`);
            return resolve(JSON.parse(JSON.stringify(resultado.rows)))
        })
        
    }

    dadosCentrais(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select * from dadoscentrais `);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    gexGeral(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select gex, colaboradores, servidores, estagiarios, requisitados + cedidos AS reqced, pgdintegral, pgdparcial, presencial, meio, fim from gexgeral`);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    gexFim(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select gex, servidores, pgdintegral, pgdparcial, presencial, atendimentoaps, servicosocial, terapiaocupacional, ceab, ceabrid, ceabman, ceabdj, ceabmob, ceabintegral, ceabparcial, ceabpresencial from gexfim`);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    gexFimTeste(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query('select * from gexfim')
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    gexMeio(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select gex, servidores, pgdintegral, pgdparcial, presencial, servidorGex, sgrec + sarec as atendimento, sard + samb + sadj + samc as analise, sgben + sais + sestrd + sestman as beneficio, sgrec, sarec, sard, samb, sadj, samc, sgben, sais, sestrd, sestman from gexmeio`);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    sr2(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select setor, servidores, estagiarios, requisitados + cedidos as reqced from dadossr2`);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })
    }

    dadosAps(){
        return new Promise(async (resolve, reject) => {
            try {
                const resultado = await banco.query(`select gex, aps, servidores, estagiarios, ceab, atendimentoaps, requisitados + cedidos as reqced from dadosaps`);
                return resolve(JSON.parse(JSON.stringify(resultado.rows)))
            } catch (error) {
                return reject(error)
            }
        })    }

    buscaPontuacao(matricula, mes){
        return consultaSimples(`select mes, matricula, servico, "pontuacaoDia", "pontuacaoMes", "valorBruto", "valorLiquido", "pontuacaoAPS" from "dadosPontuacao" where matricula = $1 and "mesApoio" = $2`, [matricula, mes], `Erro ao buscar dados.`)
    }


    insertUser(usuario, email, pass, adm, contaHabilitada){
        return consultaSimples(`insert into usuarios(usuario, email, senha, adm, contaHabilitada) values ($1, $2, $3, $4, $5)`, [usuario, email, pass, adm, contaHabilitada], `Erro ao adicionar usuário.`
        )
    }

    confereEmail(email){
        return consultaSimples(`select usuario from usuarios where email = $1`, email, `Erro ao buscar email.`)
    }
    
    confereDadosLogin(email){
        return consultaSimples(`select usuario, senha, adm, emailConfirmado, contaHabilitada from usuarios where email = $1`, email, 'Erro ao buscar usuário.')
    }

    confereLogin(email){
        return consultaSimples(`select * from sessions where usuario = $1 and expiresat > NOW()`, email, `Erro ao buscar usuario`)
    }

    insereLogin(sessionId, usuario, email, expiresat, adm){
        return consultaSimples(`insert into sessions (id, usuario, email, expiresat, adm) values ($1, $2, $3, $4, $5)`, [sessionId, usuario, email, expiresat, adm], `Erro ao logar`)
    }

    usuarioLogado(id){
        return consultaSimples(`select usuario, adm from sessions where id = $1 and expiresat > NOW()`, id, `Erro ao buscar usuário por ID`)
    }

    logoutUsuario(id){
        return consultaSimples(`delete from sessions where id = $1`, id, `Erro ao deslogar`)
    }

    atualizaConta(usuario, contaHabilitada){
        return consultaSimples(`update usuarios set contaHabilitada = $1 where usuario = $2`, [contaHabilitada, usuario],`Erro ao atualizar conta.`)
    }

    deleteUser(usuario){
        return consultaSimples(`delete from usuarios where usuario = $1`, usuario, 'Erro ao deletar usuário.')
    }

    updatePass(pass, token){
        return consultaSimples(`update usuarios set senha = $1 where token = $2`, [pass, token], `Erro ao alterar senha.`);
    }

    updateToken(token, timerexpirar, email){
        return consultaSimples(`update usuarios set token = $1, timerexpirar = $2 where email = $3`, [token, timerexpirar, email], `Erro ao atualizar token.`)
    }

    confereTokenESenha(token){
        return consultaSimples(`select senha from usuarios where token = $1 and timerexpirar > NOW()`, token, `Erro ao buscar dados.`);
    }

    confirmaEmail(token){
        return consultaSimples(`update usuarios set emailConfirmado = true where token = $1 and timerexpirar > NOW()`, token, `Erro ao confirmar email.`);
    }



}

export default new DataViewRepository();
