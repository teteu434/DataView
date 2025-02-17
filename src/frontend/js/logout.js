import { reqLocal } from "./search.js";
async function logOut(){
    const deslogar = 'deslogado';
    
        if(confirm("deseja realmente fazer logout?")){
          try {
              const response = await fetch(`${reqLocal}/logout`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({deslogar}),
              credentials: 'include'
          });
          const resultado = await response.json();
          if (resultado.deslogado) {
              alert(resultado.message);
              window.location.href = resultado.redirect; // Redireciona para a tela de login
          } else {
            alert(resultado.message);
          }
          } catch (error) {
            alert("Erro interno do servidor");
          }
        }
    
  }