
export async function preencherTabelaDadosCentrais(gerenciaSelecionada, agencia, gex){
    return new Promise (async(resolve) =>{
    const { fetchData } = await import('../extrairData.js');
    const resultado = await fetchData("dadosCentrais");
    const agencias = resultado.map(item => item.unidade);
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
    else if(gex == "meio"){
        inner = `<thead>
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
        <th>Área</th>
    </tr>
    </thead>

    <tbody> `;
        
        dados = resultado.filter(item => item.area == "MEIO")
        .map(item => ({
            matricula: item.matricula,
            servidor: item.servidor,
            situacao: item.situacao,
            srgex: item.srgex,
            unidade: item.unidade,
            ol: item.ol,
            funcao: item.funcao,
            formacao: item.formacao,
            regime: item.regime,
            area: item.area
          }))
    } 

    if(agencias.includes(agencia)) {

        const aux = dados.filter(item => item.unidade == agencia)
        aux.forEach( dado =>{
            
            inner += `<tr>`
            Object.values(dado).forEach( valor => {
            
            if(valor == null) inner += `<td>-</td>`
            else if(valor == false) inner += `<td>NÃO</td>`
            else if(valor == true) inner += `<td>SIM</td>`
            else inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
        })
    } else{
    
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
        
        }
    
    }

    inner += `</tbody>`
    document.getElementById('tabelaDados').innerHTML = inner;
    resolve();
    })
}
  