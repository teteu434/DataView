import { fetchData } from "../extrairData.js";
import { atualizaGraficoPizzaGeral, preencheGEXGeral, preencheTotalGeral, preencheTotalSR2Geral } from "./updateGraphic.js";


$(async function() {
	"use strict";
  const dados9 = await fetchData("sr2");
  const dados7 = await fetchData("dadosAps");
  const dados10 = await fetchData("gexGeral");

  //grafico de gex/sr

  var options = {
    series: [{
      name: "Servidores",
      data: dados10.filter(item => item.gex != "TOTAL").map(item => item.servidores)
    }, {
      name: "Estagiários",
      data: dados10.filter(item => item.gex != "TOTAL").map(item => item.estagiarios)
    }, {
      name: "Requisitados/Cedidos",
      data: dados10.filter(item => item.gex != "TOTAL").map(item => item.reqced)
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
          columnWidth: "60%",
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
    colors: ["#02c27a", "#0d6efd", "#fc185a"],
    grid: {
      show: true,
      borderColor: 'rgba(0, 0, 0, 0.15)',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  xaxis: {
    categories: dados10.filter(item => item.gex != "TOTAL").map(item => item.gex)
  }
  };

  var chart = new ApexCharts(document.querySelector("#gexSR"), options);
  chart.render();

  // total de servidores, estagiários e requisitados/cedidos

    var options2 = {
        series: [dados10.filter(item => item.gex == "TOTAL")[0].servidores, 
          dados10.filter(item => item.gex == "TOTAL")[0].estagiarios, dados10.filter(item => item.gex == "TOTAL")[0].reqced],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['Servidor', 'Estagiário', 'Requisitados/Cedidos'],
        legend: {
			position: "bottom",
			show: !0
		},
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    var chart1 = new ApexCharts(document.querySelector("#servidorEstagiario"), options2);
    chart1.render();


    //gráfico pgd

    var options2 = {
      
      series: [dados10.filter(item => item.gex == "TOTAL")[0].pgdparcial, dados10.filter(item => item.gex == "TOTAL")[0].pgdintegral, dados10.filter(item => item.gex == "TOTAL")[0].presencial],
      chart: {
          foreColor: "#9ba7b2",
          height: 380,
          type: 'pie',
      },
      labels: ['Parcial', 'Integral', 'Presencial'],
      legend: {
    position: "bottom",
    show: !0
  },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  };

    var chart2 = new ApexCharts(document.querySelector("#PGD"), options2);
    chart2.render();


    //area meio x area fim

    var options2 = {
      series: [dados10.filter(item => item.gex == "TOTAL")[0].meio, dados10.filter(item => item.gex == "TOTAL")[0].fim],
      chart: {
          foreColor: "#9ba7b2",
          height: 380,
          type: 'pie',
      },
      labels: ['Área Meio', 'Área Fim'],
      legend: {
    position: "bottom",
    show: !0
  },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  };
  
    var chart3 = new ApexCharts(document.querySelector("#servidorMeioFim"), options2);
    chart3.render();


    document.getElementById('srGex').addEventListener('change', (event)=> {
      event.preventDefault();
      const selecao = event.target.value;
      const dados1 = dados9.map(item => item.setor)
      if(selecao == "total"){
        const gex = document.getElementById("gerenciaSelect").value;
        if(gex == "SUPERINTENDENCIA REGIONAL SUDESTE II"){
          preencheTotalSR2Geral(dados9, chart)
        } else {
          preencheGEXGeral(dados7, chart, gex)
        }
      }
      else if(dados1.includes(selecao)){
        chart.updateSeries([{
          name: "Servidores",
          data: [dados9.filter(item => item.setor == selecao).map(item => item.servidores)[0]]
        }, {
          name: "Estagiários",
          data: [dados9.filter(item => item.setor == selecao).map(item => item.estagiarios)[0]]
        }, {
          name: "Requisitados/Cedidos",
          data: [dados9.filter(item => item.setor == selecao).map(item => item.reqced)[0]]
        }]);
        
        chart.updateOptions({
          plotOptions : {
            bar: {
              horizontal: !1,
              columnWidth: "30%",
              endingShape: "rounded"
          }
          },
          xaxis:{
            categories: dados9.filter(item => item.setor == selecao).map(item => item.setor)
          }
        })
      }else{
        chart.updateSeries([{
          name: "Servidores",
          data: dados7.filter(item => item.aps == selecao).map(item => item.servidores)
        }, {
          name: "Estagiários",
          data: dados7.filter(item => item.aps == selecao).map(item => item.estagiarios)
        }, {
          name: "Requisitados/Cedidos",
          data: dados7.filter(item => item.aps == selecao).map(item => item.reqced)
        }]);
        
        chart.updateOptions({
          plotOptions : {
            bar: {
              horizontal: !1,
              columnWidth: "30%",
              endingShape: "rounded"
            }
          },
          xaxis:{
            categories: dados7.filter(item => item.aps == selecao).map(item => item.aps)
          }
        })
      }

      
      
    })

    document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
      event.preventDefault();
      const gerenciaSelecionada = event.target.value;
      if(gerenciaSelecionada == "SUPERINTENDENCIA REGIONAL SUDESTE II"){
        preencheTotalSR2Geral(dados9, chart)
      } else if(gerenciaSelecionada == "TOTAL"){
        preencheTotalGeral(dados10, chart)
      } else preencheGEXGeral(dados7, chart, gerenciaSelecionada)


      atualizaGraficoPizzaGeral(dados10, chart1, chart2, chart3, gerenciaSelecionada)
    })


});

