import { fetchData } from "../extrairData.js";
import { atualizaGraficoPizzaFim, preencheGEXFim, preencheTotalFim } from "./updateGraphic.js";


$(async function() {
    "use strict";
  const dadosAps = await fetchData("dadosAps");
  const dadosFim = await fetchData("gexFim");

  //grafico de gex/sr

  var options = {
    series: [{
      name: "Servidores CEAB",
      data: dadosFim.filter(item => item.gex != "TOTAL").map(item => item.ceab)
    }, {
      name: "Servidores em APS",
      data: dadosFim.filter(item => item.gex != "TOTAL").map(item => item.atendimentoaps)
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
    categories: dadosFim.filter(item => item.gex != "TOTAL").map(item => item.gex)
  }
  };

  var chart = new ApexCharts(document.querySelector("#gexSR"), options);
  chart.render();

  // ceab x aps 

    var options2 = {
        series: [dadosFim.filter(item => item.gex == "TOTAL")[0].ceab, 
          dadosFim.filter(item => item.gex == "TOTAL")[0].atendimentoaps],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['CEAB', 'Atendimento APS'],
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

    var chart1 = new ApexCharts(document.querySelector("#APSCEAB"), options2);
    chart1.render();


    //gráfico pgd

    var options2 = {
      
      series: [dadosFim.filter(item => item.gex == "TOTAL")[0].pgdparcial, 
      dadosFim.filter(item => item.gex == "TOTAL")[0].pgdintegral, 
      dadosFim.filter(item => item.gex == "TOTAL")[0].presencial],
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


    //tipos de ceab pgd

    var options2 = {
      series: [dadosFim.filter(item => item.gex == "TOTAL")[0].ceabintegral, 
      dadosFim.filter(item => item.gex == "TOTAL")[0].ceabparcial, 
      dadosFim.filter(item => item.gex == "TOTAL")[0].ceabpresencial],
      chart: {
          foreColor: "#9ba7b2",
          height: 380,
          type: 'pie',
      },
      labels: ['CEAB Integral', 'CEAB Parcial', 'CEAB Presencial'],
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
  
    var chart3 = new ApexCharts(document.querySelector("#CEABPGD"), options2);
    chart3.render();


    // tipos de ceab

    var options2 = {
        series: [dadosFim.filter(item => item.gex == "TOTAL")[0].ceabrid, dadosFim.filter(item => item.gex == "TOTAL")[0].ceabman,
        dadosFim.filter(item => item.gex == "TOTAL")[0].ceabdj, dadosFim.filter(item => item.gex == "TOTAL")[0].ceabmob],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['CEAB RID', 'CEAB MAN', 'CEAB DJ', 'CEAB MOB'],
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
    
    var chart4 = new ApexCharts(document.querySelector("#CEABTipo"), options2);
    chart4.render();


    document.getElementById('srGex').addEventListener('change', (event)=> {
      event.preventDefault();
      const selecao = event.target.value;
      if(selecao == "total"){
        const gex = document.getElementById("gerenciaSelect").value;
        preencheGEXFim(dadosAps, gex, chart)
      }else{
        chart.updateSeries([{
          name: "Servidores CEAB",
          data: dadosAps.filter(item => item.aps == selecao).map(item => item.ceab)
        }, {
          name: "Servidores em APS",
          data: dadosAps.filter(item => item.aps == selecao).map(item => item.atendimentoaps)
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
            categories: dadosAps.filter(item => item.aps == selecao).map(item => item.aps)
          }
        })
      }

      
      
    })

    document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
      event.preventDefault();
      const gerenciaSelecionada = event.target.value;
      if(gerenciaSelecionada == "TOTAL") preencheTotalFim(chart, dadosFim) 
      else preencheGEXFim(dadosAps, gerenciaSelecionada, chart)

      atualizaGraficoPizzaFim(dadosFim, chart1, chart2, chart3, chart4, gerenciaSelecionada);
    })


});

