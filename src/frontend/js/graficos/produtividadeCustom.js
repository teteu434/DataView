import { fetchData } from "../extrairData.js";
import { atualizaGraficoBarraCeab } from "./updateGraphic.js";
import { calcularTipoPorcentagem } from "../config.js";

$(async function() {
	"use strict";
  const dados7 = await fetchData("dadosAps");
  const dados = await fetchData("gexFimTeste");
  const teste = dados.filter(item => item.gex == "TOTAL");
  const gerencias = dados.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II")

  // grafico ceab rid

  var options = {
    series: [{
      name: "Pontuação",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'pontuacaoceabridmarco').map(([, valor]) => valor )
    }, {
      name: "Meta",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'metaceabridmarco').map(([, valor]) => valor )
    }],
    chart: {
      foreColor: "#9ba7b2",
      height: 380,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
          show: !1,
      }
    },
    plotOptions: {
      bar: {
          horizontal: 1,
          columnWidth: "35%",
          endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: !0,
      width: 4,
      colors: ["transparent"]
  },
    colors: ["#02c27a", "#0d6efd"],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: ['Março']
  }
  };

  var chartRid = new ApexCharts(document.querySelector("#CEABRID"), options);
  chartRid.render();

  //grafico de ceab mob

  var options = {
    series: [{
      name: "Pontuação",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'pontuacaoceabmobmarco').map(([, valor]) => valor )
    }, {
      name: "Meta",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'metaceabmobmarco').map(([, valor]) => valor )
    }],
    chart: {
      foreColor: "#9ba7b2",
      height: 380,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
          show: !1,
      }
    },
    plotOptions: {
      bar: {
          horizontal: 1,
          columnWidth: "35%",
          endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: !0,
      width: 4,
      colors: ["transparent"]
  },
    colors: ["#02c27a", "#0d6efd"],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: ['Março']
  }
  };

  var chartMob = new ApexCharts(document.querySelector("#CEABMOB"), options);
  chartMob.render();

  //grafico ceab man

  var options = {
    series: [{
      name: "Pontuação",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'pontuacaoceabmanmarco').map(([, valor]) => valor )
    }, {
      name: "Meta",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'metaceabmanmarco').map(([, valor]) => valor )
    }],
    chart: {
      foreColor: "#9ba7b2",
      height: 380,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
          show: !1,
      }
    },
    plotOptions: {
      bar: {
          horizontal: 1,
          columnWidth: "35%",
          endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: !0,
      width: 4,
      colors: ["transparent"]
  },
    colors: ["#02c27a", "#0d6efd"],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: ['Março']
  }
  };

  var chartMan = new ApexCharts(document.querySelector("#CEABMAN"), options);
  chartMan.render();

  //grafico ceab dj

  var options = {
    series: [{
      name: "Pontuação",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'pontuacaoceabdjmarco').map(([, valor]) => valor )
    }, {
      name: "Meta",
      data: Object.entries(teste[0]).filter(([chave]) => chave == 'metaceabdjmarco').map(([, valor]) => valor )
    }],
    chart: {
      foreColor: "#9ba7b2",
      height: 380,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
          show: !1,
      }
    },
    plotOptions: {
      bar: {
          horizontal: 1,
          columnWidth: "35%",
          endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: !0,
      width: 4,
      colors: ["transparent"]
  },
    colors: ["#02c27a", "#0d6efd"],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: ['Março']
  }
  };

  var chartDj = new ApexCharts(document.querySelector("#CEABDJ"), options);
  chartDj.render();
  
const {ceabrid, ceabman, ceabdj} = calcularTipoPorcentagem(gerencias, ['ceabrid', 'ceabman', 'ceabdj'], 'marco')

  var options = {
    series: [{
      name: "CEAB RID",
      data: Object.values(ceabrid)
    }, {
      name: "CEAB DJ",
      data: Object.values(ceabdj)
    }, {
      name: "CEAB MAN",
      data: Object.values(ceabman)
    }],
    chart: {
      foreColor: "#9ba7b2",
      height: 380,
      type: 'bar',
      zoom: {
        enabled: false
      },
      toolbar: {
          show: !1,
      }
    },
    plotOptions: {
      bar: {
          horizontal: !1,
          columnWidth: "35%",
          endingShape: "rounded"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: !0,
      width: 4,
      colors: ["transparent"]
  },
    colors: ["#02c27a", "#0d6efd", '#ebe834'],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: gerencias.map(item => item.gex)
  }
};

  var gexsr = new ApexCharts(document.querySelector("#gexSR"), options);
  gexsr.render();

  // atualiza o gráfico

  document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
    event.preventDefault();
    const gerenciaSelecionada = event.target.value;
    const mes = document.getElementById("mesSelect").value;
    const data = dados.filter(item => item.gex == gerenciaSelecionada);
    atualizaGraficoBarraCeab(chartRid, 'rid', data, mes)
    atualizaGraficoBarraCeab(chartMob, 'mob', data, mes)
    atualizaGraficoBarraCeab(chartMan, 'man', data, mes)
    atualizaGraficoBarraCeab(chartDj, 'dj', data, mes)
  })

  document.getElementById('mesSelect').addEventListener('change', (event)=> {
    event.preventDefault();
    const mes = event.target.value;
    const gerenciaSelecionada = document.getElementById("gerenciaSelect").value;
    console.log(gerenciaSelecionada)
    const data = dados.filter(item => item.gex == gerenciaSelecionada);
    atualizaGraficoBarraCeab(chartRid, 'rid', data, mes)
    atualizaGraficoBarraCeab(chartMob, 'mob', data, mes)
    atualizaGraficoBarraCeab(chartMan, 'man', data, mes)
    atualizaGraficoBarraCeab(chartDj, 'dj', data, mes)
  })

  /*document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
    event.preventDefault();
    const agencia = event.target.value;
    const gerenciaSelecionada = document.getElementById("gerenciaSelect").value;
    const mes = document.getElementById("mesSelect").value;
    const data = dados.filter(item => item.gex == gerenciaSelecionada);
    atualizaGraficoGexSr(chartRid, 'rid', data, mes, agencia)
  })*/


})