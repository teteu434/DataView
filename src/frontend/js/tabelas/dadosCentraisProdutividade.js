import { adicionarEventosPontuacao } from '../config.js';
import { reqLocal } from '../search.js';

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

    if(mes == 'marco') mes = 'março';

    const agencias = resultado.map(item => item.unidade);
    console.log(mes)
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
        <th>Meta mensal</th>
        <th>Pontuação mensal</th>
    </tr>
    </thead>

    <tbody> `;
    console.log(inner)
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
            else if (chave == 'matricula') inner += `<td class="matricula">${valor}</td>`
            else if (chave == `pontuacao_${mes}`) inner += `<td data-bs-toggle="modal" data-bs-target="#exampleExtraLargeModal" class="link-popup">${valor}</td>`
            else inner += `<td>${valor}</td>`
            })
        inner += `</tr>`
    })

    inner += `</tbody>`
    console.log(document.getElementById('tabelaDados'))
    document.getElementById('tabelaDados').innerHTML = inner;
    adicionarEventosPontuacao();
    resolve();
    })
}

export async function tabelaPontuacao(matricula, mes) {
    console.log('teste')
    try{
                   
        const resposta = await fetch(`${reqLocal}/buscaPontuacao?matricula=${matricula}&mes=${mes}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
                                
            const resultado = await resposta.json();
            console.log(resultado)        
            if(resultado.correto){
                var inner = `<thead>
                <tr>
                    <th>Mês de apoio</th>
                    <th>Matrícula</th>
                    <th>Serviço</th>
                    <th>Pontuação do Dia</th>
                    <th>Pontuação do Mês</th>
                    <th>Valor Bruto</th>
                    <th>Valor Líquido</th>
                    <th>Pontuação APS</th
                </tr>
                </thead>
        
                <tbody> `;
                console.log(resultado.resultado)
                resultado.resultado.forEach(dado =>{
                    Object.entries(dado).forEach(([chave, valor]) => {
                        inner += `<td>${valor}</td>`
                    })
                    inner += `</tr>`

                })
                inner += `</tbody>`
                document.getElementById('tabelaPontuacao').innerHTML = inner;
            }
                 
        
    } catch(error){
        console.err(error)
    }
}