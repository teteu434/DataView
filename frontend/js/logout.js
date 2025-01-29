
async function logOut(){
    const deslogar = 'deslogado';
    
        if(confirm("deseja realmente fazer logout?")){
          try {
              const response = await fetch('http://localhost:3000/logout', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({deslogar})
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