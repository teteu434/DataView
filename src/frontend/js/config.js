
export async function usuario() {
    const { fetchData } = await import('./extrairData.js');
    const sessao = await fetchData("sessao");
    document.getElementById('user').innerHTML = `Olá, ${sessao.usuario}`
}

export async function carregando() {
    document.getElementById("gerenciaSelect").addEventListener("change", function () {
        const spinner = document.getElementById("spinner");
        const tableContainer = document.getElementById("tabela");
    
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
    const { fetchData } = await import('./extrairData.js');
    fetchData("users").then((dados) =>{ 
    
        var inner = "";

            dados.forEach(user =>{
                inner += `<option value = "${user.usuario}"> ${user.email} </option>`;
            });

        agenciaDropdown.innerHTML = inner;
    });

    const username = agenciaDropdown.value
    document.getElementById("nomeUsuario").value = `${username}`;
}

export async function agencias(gerenciaSelecionada){
    const { fetchData } = await import('./extrairData.js');
    const dados = await fetchData("dadosAps");
    const dados2 = await fetchData("sr2");

    var inner = ``;
    if (gerenciaSelecionada == "SUPERINTENDENCIA REGIONAL SUDESTE II"){

        dados2.forEach( setores => {
            inner += `<option value = "${setores.setor}"> ${setores.setor} </option>`;
        })
        inner += `<option value = "total"> Total </option>`
    }
    else if(gerenciaSelecionada != "TOTAL"){
        inner = `<option selected="" disabled>Selecione uma agência</option>`;
        const agencias = dados.filter(item => item.gex == gerenciaSelecionada);
        agencias.forEach(agencia => {
            inner += `<option value = "${agencia.aps}"> ${agencia.aps} </option>`;
        })
        inner += `<option value = "total"> Total </option>`
    }
    
    document.getElementById("srGex").innerHTML = inner; 
    
}

export async function valoresGexGeral(gerenciaSelecionada){

    const ids = ['colaboradores', 'estagiarios', 'servidores', 'integral', 'parcial', 'presencial']
    const { fetchData } = await import('./extrairData.js');
    const dados = await fetchData("gexGeral");
    const resultado = dados.filter(item => item.gex == gerenciaSelecionada).map(item =>
            [
                item.colaboradores, item.estagiarios, item.servidores, item.pgdintegral, item.pgdparcial, item.presencial
            ]
        )[0];
        if(gerenciaSelecionada == "TOTAL") document.getElementById("textoCentral").innerHTML = `Cadastro Geral`;
        else document.getElementById("textoCentral").innerHTML = `Cadastro Geral - ${gerenciaSelecionada}`;
        
    
    ids.forEach((id, i) =>{
        document.getElementById(id).innerText = resultado[i]
    })

}

export async function valoresGexFim(gerenciaSelecionada){

    const ids = ['servidores', 'integral', 'parcial', 'presencial', 'servidorAps', 'servicoSocial', 'terapiaOcupacional',
    'CEAB', 'CEABRID', 'CEABMAN', 'CEABDJ', 'CEABMOB'];
    const { fetchData } = await import('./extrairData.js');
    const dados = await fetchData("gexFim");
    const resultado = dados.filter(item => item.gex == gerenciaSelecionada).map(item =>
            [
                item.servidores, item.pgdintegral, item.pgdparcial, item.presencial, item.atendimentoaps, item.servicosocial,
                item.terapiaocupacional, item.ceab, item.ceabrid, item.ceabman, item.ceabdj, item.ceabmob
            ]
        )[0];
    if(gerenciaSelecionada == "TOTAL") document.getElementById("textoCentral").innerHTML = `Cadastro GEX (Fim)`;
    else document.getElementById("textoCentral").innerHTML = `Cadastro GEX (Fim) - ${gerenciaSelecionada}`;
        
    
    ids.forEach((id, i) =>{
        document.getElementById(id).innerText = resultado[i]
    })

}

export async function preencherTabelaDadosCentrais(gerenciaSelecionada, gex){
    return new Promise (async(resolve) =>{
    const { fetchData } = await import('./extrairData.js');
    const resultado = await fetchData("dadosCentrais");
    var dados;
    var inner = `<thead>
        <tr>
        <th>Matrícula</th>
        <th>Servidor</th>
        <th>Situação</th>
        <th>SR/GEX</th>
        <th>Unidade</th>
        <th>OL</th>
        <th>Função</th>
        <th>Formação</th>
        <th>Regime</th>
        <th>Ingresso</th>
        <th>Área</th>
        <th>CEAB</th>
        <th>Tipo CEAB</th>
        <th>Atendimento APS</th>
    </tr>
    </thead>

    <tbody> `;

    if(gex == "geral") dados = resultado;
    else if(gex == "fim") dados = resultado.filter(item => item.area == "FIM");
    else if(gex == "meio") dados = resultado.filter(item => item.area == "MEIO");

    if(gerenciaSelecionada == "TOTAL"){
        
        dados.forEach( dado =>{
            
            inner += `<tr>`
            Object.values(dado).forEach( valor => {
            
            if(valor == null) inner += `<td>-</td>`
            else if(valor == false) inner += `<td>NÃO</td>`
            else if(valor == true) inner += `<td>SIM</td>`
            else inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
        })
        inner += `</tbody>`
    }else{
        const result = dados.filter(item => item.srgex == gerenciaSelecionada)
        result.forEach( dado =>{
            inner += `<tr>`
            Object.values(dado).forEach( valor => {
            if(valor == null) inner += `<td>-</td>`
            else if(valor == false) inner += `<td>NÃO</td>`
            else if(valor == true) inner += `<td>SIM</td>`
            else inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
        })
        inner += `</tbody>`
    }

    document.getElementById('tabela').innerHTML = inner;
    resolve()
    })
}
  



   