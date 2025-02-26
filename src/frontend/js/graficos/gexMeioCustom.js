import { fetchData } from "../extrairData.js";
import { atualizaGraficoPizzaMeio, preencheGEXMeio, preencheTotalMeio } from "./updateGraphic.js";


$(async function() {

    const dadosMeio = await fetchData("gexFim");

    // graficos gex/sr

    var options = {
        series: [{
          name: "Servidores CEAB",
          data: dadosMeio.filter(item => item.gex != "TOTAL").map(item => item.ceab)
        }, {
          name: "Servidores em APS",
          data: dadosMeio.filter(item => item.gex != "TOTAL").map(item => item.atendimentoaps)
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
        categories: dadosMeio.filter(item => item.gex != "TOTAL").map(item => item.gex)
      }
      };
    
    var chart = new ApexCharts(document.querySelector("#gexSR"), options);
    chart.render();

    // grafico pgd

    var options2 = {
      
        series: [dadosMeio.filter(item => item.gex == "TOTAL")[0].pgdparcial, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].pgdintegral, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].presencial],
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
    
    var chart1 = new ApexCharts(document.querySelector("#PGD"), options2);
    chart2.render();

    // grafico servidores gex

    var options2 = {
      
        series: [dadosMeio.filter(item => item.gex == "TOTAL")[0].pgdparcial, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].pgdintegral, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].presencial],
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
    
    var chart2 = new ApexCharts(document.querySelector("#"), options2);
    chart2.render();
    
    
    
        document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
          event.preventDefault();
          const gerenciaSelecionada = event.target.value;
          if(gerenciaSelecionada == "TOTAL") preencheTotalMeio(chart, dadosMeio) 
          else preencheGEXMeio(dadosAps, gerenciaSelecionada, chart)
    
          atualizaGraficoPizzaMeio(dadosMeio, chart1, chart2, gerenciaSelecionada);
        })



});
