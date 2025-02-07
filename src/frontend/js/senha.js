

import { fetchData3 } from './extrairData.js';

const sessao = await fetchData3();

if(sessao.logado){
    alert(`Você já está logado como ${sessao.usuario}. Para fazer novo Login, favor fazer Logout no site.
    Redirecionando para a página principal.`)
    window.location.href = 'index.html';
} else{

    document.getElementById("login").addEventListener('click', async(event) =>{    
        event.preventDefault();
        var adm = null;
        const tipo = document.getElementById('tipoDeUsuario').value;
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const result = ({"email" : email, "senha": senha})
        if(email.length == 0 || senha.length == 0 || (tipo.length == 0) ){
            alert("Preencha todos os campos!");
            
        } else {
            const resposta = await fetch('https://dataviewinss.onrender.com/confereSenha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(result),
                credentials: 'include'
                });
                const resultado = await resposta.json();
                
                if (resposta.ok) {
 
                    if (resultado.correto){ 
                        if(resultado.emailConfirmado){
                            if(resultado.contaHabilitada){
                                if(resultado.adm == 0 && tipo == 'adm')
                                    alert("Você não tem acesso ao terminal de administrador");
                                else{
                                    const usuario = JSON.stringify( {
                                        "usuario": resultado.usuario,
                                        "email": email
                                    })

                                    const login = await fetch('https://dataviewinss.onrender.com/login', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: usuario,
                                        credentials: 'include'
                                    });

                                    const result = await login.json()

                                    if(result.logado){
                                        
                                        if(resultado.adm == 1 && tipo == 'adm'){
                                            alert('Redirecionando para a pagina de administrador')
                                            window.location.href = 'adm.html';
                                        } else 
                                        window.location.href = 'index.html';

                                    }else alert('Erro interno do servidor ao fazer login')
                                }

                            } else alert("Sua conta não está habilitada!")
                        } else alert("Confirmar email primeiro! Confira sua caixa de emails.")
                    } else  
                        alert(resultado.message);
                } else {
                    
                        
                    console.log(resultado)
                    alert(resultado.message)
                    
                }
        }
    
                document.getElementById("email").value = "";
                document.getElementById("senha").value = "";
                document.getElementById("tipoDeUsuario").value = "";       
    
    })


}          
            
            

   


       
    
        

