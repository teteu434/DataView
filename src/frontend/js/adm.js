import { reqLocal } from "./search.js";

document.getElementById("atualiza").addEventListener('click', async(event) =>{
        const usuario = document.getElementById("nomeUsuario").value;
        event.preventDefault();
        const habilitar = document.getElementById('habilita').checked;
        const desabilitar = document.getElementById('desabilita').checked;
        const excluir = document.getElementById('exclui').checked;
        const habilitado = 1, desabilitado = 0;
        try{
            if(usuario.length == 0){
                alert("Selecione uma conta");

            }
            else{
                    
                if(habilitar){
                    if(confirm(`Confirma a habilitação da conta ${usuario}?`)){
                        const resposta = await fetch(`${reqLocal}/atualiza`,{
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({ usuario, contaHabilitada: habilitado}),
                            credentials: 'include'
                        });
                        if(resposta.ok){
                            const resultado = await resposta.json();
                            alert(resultado.message);
                        document.getElementById("nomeUsuario").value = "";
                        document.getElementById("totalUsuario").value = "";
                        } else {
                            alert("Erro ao mandar para o banco de dados");
                            document.getElementById("nomeUsuario").value = "";
                            document.getElementById("totalUsuario").value = "";
                        } 
                    }

                } else if(desabilitar){
                    if(confirm(`Confirma a desabilitação da conta ${usuario}?`)){
                    
                        const resposta = await fetch(`${reqLocal}/atualiza`, {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({usuario, contaHabilitada: desabilitado}),
                            credentials: 'include'
                        });
                        
                        
                        if(resposta.ok){
                            const resultado = await resposta.json();
                            alert(resultado.message);
                        document.getElementById("nomeUsuario").value = "";
                        document.getElementById("totalUsuario").value = "";
                        } else {
                            alert("Erro ao mandar para o banco de dados");
                            document.getElementById("nomeUsuario").value = "";
                            document.getElementById("totalUsuario").value = "";
                        } 
                    
                    }


                } else if(excluir){
                    if(confirm(`Confirma a exclusão da conta ${usuario}?`)){

                        const resposta = await fetch(`${reqLocal}/exclui`, {
                            method: 'DELETE',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({usuario}),
                            credentials: 'include'
                        });
                        
                        
                        if(resposta.ok){
                            const resultado = await resposta.json();
                            alert(resultado.message);
                        document.getElementById("nomeUsuario").value = "";
                        document.getElementById("totalUsuario").value = "";
                        } else {
                            alert("Erro ao mandar para o banco de dados");
                            document.getElementById("nomeUsuario").value = "";
                            document.getElementById("totalUsuario").value = "";
                        } 

                    }

                } else {
                    alert("Selecione uma opção!")
                    document.getElementById("nomeUsuario").value = "";
                    document.getElementById("totalUsuario").value = "";
                }

                
                

            }     
   
            
            
        } catch (error){
            console.log(error)
        }
    
//})

})