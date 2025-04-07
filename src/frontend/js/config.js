
export function calculaPorcentagem(mes, aux, controlePorcentagem){
    const resultado = {};

    const organizado = {};
    for (const [nome, valor] of aux) {
    // Extrai o prefixo (ceab, ceabrid, ceabman, etc.)
    const prefixo = nome.replace(/^(meta|pontuacao)/, '').replace(mes, '');
  
    if (!organizado[prefixo]) {
        organizado[prefixo] = {};
    }
  
    if (nome.startsWith('meta')) {
        organizado[prefixo].meta = valor;
    } else if (nome.startsWith('pontuacao')) {
        organizado[prefixo].pontuacao = valor;
    }
}

// Agora calculamos as porcentagens
    for (const [prefixo, valores] of Object.entries(organizado)) {
        if (valores.meta !== undefined && valores.pontuacao !== undefined) {
            // Evita divisão por zero
            if (valores.meta === 0) {
                resultado[prefixo] = 0;
            } else {
                const porcentagem = (valores.pontuacao / valores.meta) * 100;
                resultado[prefixo] = controlePorcentagem
                ? `${porcentagem.toFixed(2)}%`
                : porcentagem.toFixed(2);
            }
        }
    }

    return resultado;
}

export function calcularTipoPorcentagem(gerencias, tipos, mes) {
    const limite = 15;
    const resultados = {};
  
    tipos.forEach(tipo => resultados[tipo] = []);
  
    for (let i = 0; i < limite; i++) {
      tipos.forEach(tipo => {
        const dados = Object.entries(gerencias[i]).filter(([chave]) =>
          chave.includes(`${tipo}${mes}`)
        );
  
        const resultado = calculaPorcentagem(mes, dados, false);
        resultados[tipo][i] = resultado[tipo];
      });
    }
  
    return resultados;
  }
  

export async function usuario() {
    const { fetchData } = await import('./extrairData.js');
    const sessao = await fetchData("sessao");
    document.getElementById('user').innerHTML = `Olá, ${sessao.usuario}`
}

export async function carregando() {
    document.getElementById("gerenciaSelect").addEventListener("change", function () {
        const spinner = document.getElementById("spinner");
        const tableContainer = document.getElementById("tabelaPactuacao");
    
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
        
    }
    else if(gerenciaSelecionada != "TOTAL"){
        inner = `<option selected="" disabled>Selecione uma agência</option>`;
        const agencias = dados.filter(item => item.gex == gerenciaSelecionada);
        agencias.forEach(agencia => {
            inner += `<option value = "${agencia.aps}"> ${agencia.aps} </option>`;
        })
        
    }
    inner += `<option value = "geral"> Total </option>`
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

async function valoresProdutividadeGex(gerenciaSelecionada, mes){
    const ids = ['pontuacaoceab', 'pontuacaoceabrid', 'pontuacaoceabman', 'pontuacaoceabdj',
        'porcentagemceab', 'porcentagemceabrid', 'porcentagemceabman', 'porcentagemceabdj',  
    ]

    const { fetchData } = await import('./extrairData.js');
    const dados = await fetchData("gexFimTeste");
    const teste = dados.filter(item => item.gex == gerenciaSelecionada);
    const aux = Object.entries(teste[0]).filter(([chave]) => chave.includes('ceab') && chave.includes(mes))
    const aux2 = Object.entries(teste[0]).filter(([chave]) => chave.includes('pontuacaoceab') && chave.includes(mes)).map(([, valor]) => valor )
    const aux3 = teste.map(item => ({
        ceab: item.ceab,
        ceabrid: item.ceabrid,
        ceabman: item.ceabman,
        ceabdj: item.ceabdj,
        //ceabmob: item.ceabmob
      }))
    
    const resultados = calculaPorcentagem(mes, aux, true)
    const valores = Object.values(aux3[0])
    

    for (let i = 0; i < aux2.length; i++) {
        var conta = aux2[i]/valores[i];
        aux2[i] = conta.toFixed(2)
    }

    const resultado = Object.values(resultados).concat(aux2)

    if(mes == 'marco') mes = 'março'
    if(gerenciaSelecionada == "TOTAL") document.getElementById("textoCentral").innerHTML = `Produtividade GEX ${mes}`;
    else document.getElementById("textoCentral").innerHTML = `Produtividade GEX ${mes} - ${gerenciaSelecionada}`;
        
    ids.forEach((id, i) =>{
        document.getElementById(id).innerText = resultado[i]
    })
    
}


export async function valoresGexMeio(gerenciaSelecionada){

    const ids = ['servidores', 'integral', 'parcial', 'presencial', 'gex', 'atendimento', 'analise', 'beneficio'];
    const { fetchData } = await import('./extrairData.js');
    const dados = await fetchData("gexMeio");
    const resultado = dados.filter(item => item.gex == gerenciaSelecionada).map(item =>
            [
                item.servidores, item.pgdintegral, item.pgdparcial, item.presencial, 
                item.servidorgex, item.atendimento, item.analise, item.beneficio
            ]
        )[0];
    if(gerenciaSelecionada == "TOTAL") document.getElementById("textoCentral").innerHTML = `Cadastro GEX (Meio)`;
    else document.getElementById("textoCentral").innerHTML = `Cadastro GEX (Meio) - ${gerenciaSelecionada}`;
        
    
    ids.forEach((id, i) =>{
        document.getElementById(id).innerText = resultado[i]
    })

}


export async function atualizarDados(mes, gerenciaSelecionada, agencia) {

    const { preencherTabelaDadosCentraisProdutividade } = await import('./tabelas/dadosCentraisProdutividade.js');
    await valoresProdutividadeGex(gerenciaSelecionada, mes)

    preencherTabelaDadosCentraisProdutividade(gerenciaSelecionada, agencia, mes).then(() => {
        if ($.fn.DataTable.isDataTable('#tabelaDados')) {
        $('#tabelaDados').DataTable().destroy();
        }
        $(document).ready(function() {
			    $('#tabelaDados').DataTable();
		    } );
        
    })

}

   