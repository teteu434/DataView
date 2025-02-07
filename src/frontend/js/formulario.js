
import { fetchData2 } from './extrairData.js';

    document.getElementById("telaEntrada").addEventListener('submit', async(event) =>{
            
                var userIgual = false
                const email = document.getElementById('email').value.trim();
                const senha = document.getElementById('senha').value.trim();
                const usuario = document.getElementById('usuario').value.trim();
                const contaHabilitada = 0; //conta começa desabilitada
                const adm = 0; // conta começa só como usuário
                event.preventDefault();
                const dados = await fetchData2();    
                for (const user of dados){
                    if(user.email == email || user.usuario == usuario){
                        userIgual = true;
                        break;
                    } 

                }
                if(userIgual) alert('Usuário já existente')
                else if(usuario.length == 0 || email.length == 0 || senha.length == 0) alert('Preencha todos os campos!')
                //else if(!email.endsWith('@inss.gov.br') && (senha.length < 8 || senha.lentgh > 20)) alert('Email e senha inválidos');
                //else if(!email.endsWith('@inss.gov.br')) alert('Email inválido');
                else if(senha.length < 8 || senha.length > 20) alert('Senha inválida');
                else{
                    
                    
                    try{
                        console.log('teste');
                        
                        
                        const resposta = await fetch('https://dataviewinss.onrender.com/insertUser', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({usuario, email, senha, adm, contaHabilitada}),
                            credentials: 'include'
                        });
                        

                        await resposta.json();
                        
                        if(resposta.ok){
                            
                            alert('Conta criada com sucesso! Favor confirmar o seu email na caixa de mensagens. Redirecionando para Login');
                            window.location.href = 'login.html';
                        } else {
                            alert(resposta.message);

                            document.getElementById("email").value = "";
                            document.getElementById("senha").value = "";
                            document.getElementById("usuario").value = "";
                        }
                    } catch (error){
                        console.log(error)
                    }
                }
            
 
        })

