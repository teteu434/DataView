export function preencheTotalSR2(dados9, chart){
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

export function preencheGEX(dados7, chart, gerenciaSelecionada){
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

export function preencheTotal(dados10, chart){
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