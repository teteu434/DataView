
export async function preencherTabelaDadosCentrais(gerenciaSelecionada, gex){
    return new Promise (async(resolve) =>{
    const { fetchData } = await import('../extrairData.js');
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

    document.getElementById('tabelaDados').innerHTML = inner;
    resolve();
    })
}
  