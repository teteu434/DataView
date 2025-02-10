
export async function usuario() {
    const { fetchData3 } = await import('./extrairData.js');
    const sessao = await fetchData3();
    document.getElementById('user').innerHTML = `Olá, ${sessao.usuario}`
}

export async function carregando() {
    document.getElementById("gerenciaSelect").addEventListener("change", function () {
        const spinner = document.getElementById("spinner");
        const tableContainer = document.getElementById("pactuacao");
    
        spinner.classList.remove("d-none");
        tableContainer.classList.add("blur"); 

        setTimeout(() => {
            spinner.classList.add("d-none"); 
            tableContainer.classList.remove("blur"); 
        }, 2000); 
    });
}

export async function contas(){
    const agenciaDropdown = document.getElementById("totalUsuario");
    const { fetchData2 } = await import('./extrairData.js');
    fetchData2().then((dados) =>{ 
    
        var inner = "";

            dados.forEach(user =>{
                inner += `<option value = "${user.usuario}"> ${user.email} </option>`;
            });

        agenciaDropdown.innerHTML = inner;
    });

    const username = agenciaDropdown.value
    document.getElementById("nomeUsuario").value = `${username}`;
}

export async function preencherTabela() {
    const table = document.querySelector("#pactuacao");
    const { fetchData4 } = await import('./extrairData.js');
    document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
        event.preventDefault();
        const gerenciaSelecionada = event.target.value
        fetchData4().then((dado) => {
            const dados = JSON.parse(JSON.stringify(dado))
            
            const vetor = dados[gerenciaSelecionada]
            const nomes = Object.keys(dados[gerenciaSelecionada][0])
            
            let inner = `<thead>
                            <tr>`;
            nomes.forEach(nome => {
                if (nome !== 'id'){
                    if(nome !== 'gerencia'){
                        inner += `<th>${nome}</th>\n`;
                    }
                } 
            });
    
            inner += `</tr>
                      </thead>
                      <tbody>`;

            if(gerenciaSelecionada != null){

                    var cont = null;
                    vetor.forEach((vetor2) => {
                        inner += `<tr>`;
                        const vetor3 = Object.entries(vetor2).filter(([key]) => key !== 'id' && key != 'gerencia').
                        map(([key, value]) => (value))
                        Object.values(vetor3).forEach(valor =>{
                                    
                                    if(valor.toString().startsWith('%')){
                                        cont = 0;
                                        inner += `<td>${valor}</td>`;
                                       
                                    } else if (cont > 1){
                                        valor = parseInt(valor*100)

                                            inner += `<td>${valor}%</td>`;
                                    } else inner += `<td>${valor}</td>`;

                            if (cont != null) cont++
                            if(cont == 14) cont = null;
                        });
                        inner += `</tr>`;
                        })

                
        
                inner += `</tbody>`;
            }
            
            table.innerHTML = inner;

        });
            
            const tabela = document.getElementById('pactuacao');
            const observerCallback = () => {
                
                    mesclaCelula();
                    colorirTabela();
                    observer.disconnect();

            };
        
            const observer = new MutationObserver(observerCallback);
            observer.observe(tabela, { childList: true, subtree: true });
        
            
        

    })
    
}

function colorirTabela(){

   
    const tabela = document.getElementById('pactuacao');

    for (let i = 1; i < tabela.rows.length - 1; i++) {
        const linhaMeta = tabela.rows[i]; 
        const linhaResultado = tabela.rows[i + 1]; 


        if (!linhaResultado) break;


        if(linhaResultado != undefined){
            for (let j = 1; j < linhaMeta.cells.length - 3; j++) {
                if(linhaResultado.cells[j].innerText != '-'){     
                    const meta = parseFloat(linhaMeta.cells[j+3].innerText);
                    const resultado = parseFloat(linhaResultado.cells[j].innerText);
                
                    
                    if (resultado < meta){
                        linhaResultado.cells[j].style.color = 'black';
                        linhaResultado.cells[j].style.backgroundColor = '#ba2727'
                    } 
                    else if (resultado == meta) linhaResultado.cells[j].style.backgroundColor = 'yellow'
                    else{
                        linhaResultado.cells[j].style.color = 'black';
                        linhaResultado.cells[j].style.backgroundColor = '#2f822f'
                    } 
                }
            }
    
            i++;
        }

    }
    
} 

function mesclaCelula(){
    const tabela = document.getElementById('pactuacao');
    
    
    
        for (let i = 1; i < tabela.rows.length; i+=2) {
            const linhaAtual = tabela.rows[i];
            const linhaSeguinte = tabela.rows[i + 1];
            
            if(linhaSeguinte != undefined){
                if (linhaAtual.cells[0].innerText === linhaSeguinte.cells[0].innerText ||
                    linhaSeguinte.cells[2].innerText == 0
                ) {
                    linhaAtual.cells[0].rowSpan = 2;
                    linhaSeguinte.deleteCell(0); 
                }
        
                if (linhaAtual.cells[1].textContent.trim() === "Meta" && 
                    linhaSeguinte.cells[0].textContent.trim() === "Resultado"){
                        
                        linhaAtual.cells[2].rowSpan = 2;
                        linhaAtual.cells[3].rowSpan = 2;

                        linhaSeguinte.deleteCell(1); 
                        linhaSeguinte.deleteCell(2);
                    }
            

                
                if(linhaSeguinte.cells[0].textContent.trim() === "Resultado" ){
                    
                    
                    for(let j = 1; j < tabela.rows[0].cells.length - 3; j++){
                        

                        if(tabela.rows[i+1].cells[j].innerText == 0 || tabela.rows[i+1].cells[j].textContent.trim() == '0%'){
                            
                            tabela.rows[i+1].cells[j].innerText = '-'
                        } 
                        
                    }
                }
            }    
    }
        
    

}


   