import DataViewRepository from "../repository/DataViewRepository.js";

class authenticate {

    async autenticarRotaFront(req, res, next){
        
        try {
            
            const id = req.cookies.sessionId;
            if(id){
                const resultado = await DataViewRepository.usuarioLogado(id)
                if(resultado.correto && resultado.resultado.length != 0) return next();
            }    

            return res.redirect('/login.html')
   
        } catch (error) {
            console.log(error)
        }    

    }    

    async autenticaRotaAdm(req, res, next){
        try {
            const id = req.cookies.sessionId;
            if(id){
                const resultado = await DataViewRepository.usuarioLogado(id)
                if(resultado.resultado[0].adm == true) return next();
            } 

            return res.send('Rota não permitida! Voltar à página anterior.')
            
        } catch (error) {
            console.log(error)
        }
    }
    
    async autenticaRotaUsuario(req, res, next){
        try {
            const id = req.cookies.sessionId;
            if(id){
                const resultado = await DataViewRepository.usuarioLogado(id)
                if(resultado.correto && resultado.resultado.length != 0) return next();
            }
            
            return res.send('Rota não permitida! Voltar à página anterior.')
            
        } catch (error) {
            console.log(error)
        }
    }

}

export default new authenticate();
