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

    dadosTabela(){
        return new Promise(async (resolve, reject) => {
            const regioes = [
                'Vitória', 'Belo Horizonte', 'Barbacena', 'Contagem',
                'Divinópolis', 'Governador Valadares', 'Juíz de Fora',
                'Montes Claros', 'Ouro Preto', 'Poços de Caldas', 
                'Uberaba', 'Uberlândia', 'Varginha', 'Diamantina', 
                'Teófilo Otoni'
            ];
    
            const resultados = {};
    
            for (const regiao of regioes) {
                const result = banco.query(
                    `SELECT * FROM pactuacao WHERE Gerencia = $1`, [regiao]
                );
                resultados[regiao] = result.rows;
            }
            return resolve(JSON.parse(JSON.stringify(resultados.rows)));
        })


    }

    usuarios(){
        return new Promise(async (resolve, reject) => {
            const resultados = banco.query(`select * from usuarios`);
            return resolve(JSON.parse(JSON.stringify(resultados.rows)));
        })
        
    }

    logoutTempo(){
        return new Promise(async (resolve, reject) => {
            const [resultado] = await banco.query(`delete from sessions where expiresat > NOW()`);
            return resolve(JSON.parse(JSON.stringify(resultado.rows)))
        })
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

    insereLogin(sessionId, usuario, email, expiresat){
        return consultaSimples(`insert into sessions (id, usuario, email, expiresat) values ($1, $2, $3, $4)`, [sessionId, usuario, email, expiresat], `Erro ao logar`)
    }

    usuarioLogado(id){
        return consultaSimples(`select usuario from sessions where id = $1 and expiresat > NOW()`, id, `Erro ao buscar usuário por ID`)
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