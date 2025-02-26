
export function preencheTotalSR2Geral(dados9, chart){
  const servidores = dados9.map(item => item.servidores).slice(0,10)
  const estagiarios = dados9.map(item => item.estagiarios).slice(0,10)
  const setores = dados9.map(item => item.setor).slice(0,10)
  const reqCed = dados9.map(item => item.reqced).slice(0,10)
  chart.updateSeries([{
    name: "Servidores",
    data: servidores
  }, {
    name: "Estagiários",
    data: estagiarios
  }, {
    name: "Requisitados/Cedidos",
    data: reqCed
  }]);
  
  chart.updateOptions({
    plotOptions : {
      bar: {
        horizontal: !1,
        columnWidth: "60%",
        endingShape: "rounded"
    }
    },
    xaxis : {
      categories: setores
    }
  })
}

export function preencheGEXGeral(dados7, chart, gerenciaSelecionada){
  chart.updateSeries([{
    name: "Servidores",
    data: dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.servidores)
  }, {
    name: "Estagiários",
    data: dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.estagiarios)
  }, {
    name: "Requisitados/Cedidos",
    data: dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.reqced)
  }]);
  
  chart.updateOptions({
    plotOptions : {
      bar: {
        horizontal: !1,
        columnWidth: "60%",
        endingShape: "rounded"
    }
    },
    xaxis : {
      categories: dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.aps)
    }
  })
}

export function preencheTotalGeral(dados10, chart){
  chart.updateSeries([{
    name: "Servidores",
    data: dados10.filter(item => item.gex != "TOTAL").map(item => item.servidores)
  }, {
    name: "Estagiários",
    data: dados10.filter(item => item.gex != "TOTAL").map(item => item.estagiarios)
  }, {
    name: "Requisitados/Cedidos",
    data: dados10.filter(item => item.gex != "TOTAL").map(item => item.reqced)
  }]);
  
  chart.updateOptions({
    plotOptions : {
      bar: {
        horizontal: !1,
        columnWidth: "60%",
        endingShape: "rounded"
    }
    },
    xaxis : {
      categories: dados10.filter(item => item.gex != "TOTAL").map(item => item.gex)
    }
  })
}

export async function preencheGEXFim(dadosAps, gerenciaSelecionada, chart) {
  chart.updateSeries([{
    name: "Servidores CEAB",
    data: dadosAps.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceab)
  }, {
    name: "Servidores em APS",
    data: dadosAps.filter(item => item.gex == gerenciaSelecionada).map(item => item.atendimentoaps)
  }]);
  
  chart.updateOptions({
    plotOptions : {
      bar: {
        horizontal: !1,
        columnWidth: "60%",
        endingShape: "rounded"
    }
    },
    xaxis : {
      categories: dadosAps.filter(item => item.gex == gerenciaSelecionada).map(item => item.aps)
    }
  })
}

export async function preencheTotalFim(chart, dadosFim) {
  chart.updateSeries([{
    name: "Servidores CEAB",
    data: dadosFim.filter(item => item.gex != "TOTAL").map(item => item.ceab)
  }, {
    name: "Servidores em APS",
    data: dadosFim.filter(item => item.gex != "TOTAL").map(item => item.atendimentoaps)
  }])
  chart.updateOptions({
    plotOptions : {
      bar: {
        horizontal: !1,
        columnWidth: "60%",
        endingShape: "rounded"
    }
    },
    xaxis : {
      categories: dados10.filter(item => item.gex != "TOTAL").map(item => item.gex)
    }
  })
} 

export async function preencheGEXMeio(dadosMeio, gerenciaSelecionada, chart) {
  
}

export async function preencheTotalMeio(dadosMeio, chart) {
  
}


export async function atualizaGraficoPizzaGeral(dados10, chart1, chart2, chart3, gerenciaSelecionada) {

  chart1.updateSeries([dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.servidores),
    dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.estagiarios),
    dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.reqced)
   ].flat());

  chart2.updateSeries([dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.pgdparcial),
    dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.pgdintegral),
    dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.presencial)
   ].flat());

   chart3.updateSeries([dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.meio),
    dados10.filter(item => item.gex == gerenciaSelecionada).map(item => item.fim)
   ].flat())
}

export async function atualizaGraficoPizzaFim(dadosFim, chart1, chart2, chart3, chart4, gerenciaSelecionada) {

  chart1.updateSeries([dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceab),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.atendimentoaps)
   ].flat());

  chart2.updateSeries([dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.pgdparcial),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.pgdintegral),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.presencial)
   ].flat());

   chart3.updateSeries([dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabparcial),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabintegral),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabpresencial)
   ].flat())

   chart4.updateSeries([dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabrid),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabman),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabdj),
    dadosFim.filter(item => item.gex == gerenciaSelecionada).map(item => item.ceabmob)
   ].flat())
  
}

export async function atualizaGraficoPizzaMeio(dadosMeio, chart1, chart2, gerenciaSelecionada) {
  
}