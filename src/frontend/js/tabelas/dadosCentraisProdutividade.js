export async function preencherTabelaDadosCentraisProdutividade(gerenciaSelecionada, agencia, mes){
    return new Promise (async(resolve) =>{
    const { fetchData } = await import('../extrairData.js');
    const result = await fetchData("dadosCentrais");
    var dadosTabela;
    const chavesPermitidas = [
        'matricula', 'servidor', 'situacao', 'srgex', 'unidade', 'ol',
        'funcao', 'formacao', 'regime', 'area', 'ceab', 'tipoceab',
        `meta_${mes}`, `pontuacao_${mes}`
    ];
    
    const resultado = result.filter(item => item.ceab === 'SIM')
    .map(item => {
        const filtrado = {};
        chavesPermitidas.forEach(chave => {
            if (item.hasOwnProperty(chave)) {
                filtrado[chave] = item[chave];
            }
        });
        return filtrado;
    });


    const agencias = resultado.map(item => item.unidade);
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
        <th>Área</th>
        <th>CEAB</th>
        <th>Tipo CEAB</th>
        <th>Meta ${mes}</th>
        <th>Pontuação ${mes}</th>
    </tr>
    </thead>

    <tbody> `;

    if(agencias.includes(agencia)) dadosTabela = resultado.filter(item => item.unidade == agencia)

    else{
        if(gerenciaSelecionada == "TOTAL") dadosTabela = resultado
        else dadosTabela = resultado.filter(item => item.srgex == gerenciaSelecionada)  
    }

    dadosTabela.forEach( dado =>{
            
        inner += `<tr>`
        
        Object.entries(dado).forEach(([chave, valor]) => {
            if(valor == null) inner += `<td>-</td>`
            else if(valor == true) inner += `<td>SIM</td>`
            else if (chave == `pontuacao_${mes}`) inner += `<td data-bs-toggle="modal" data-bs-target="#exampleExtraLargeModal" class="link-popup">${valor}</td>`
            else inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
    })

    inner += `</tbody>`
    document.getElementById('tabelaDados').innerHTML = inner;
    resolve();
    })
}