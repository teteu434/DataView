import { fetchData } from "../extrairData.js";
import { atualizaGraficoPizzaFim, atualizaGraficoPizzaMeio, preencheGEXFim, preencheGEXMeio, preencheTotalFim, preencheTotalMeio } from "./updateGraphic.js";


$(async function() {

    const dadosMeio = await fetchData("gexMeio");

    // graficos gex/sr

    var options = {
        series: [{
          name: "Servidores Gex",
          data: dadosMeio.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II" ).map(item => item.servidorgex)
        }, {
          name: "Atendimento",
          data: dadosMeio.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II").map(item => item.atendimento)
        }, {
          name: "Central de Análise",
          data: dadosMeio.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II").map(item => item.analise)
        }, {
          name: "Benefício",
          data: dadosMeio.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II").map(item => item.beneficio)
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
      colors: ["#02c27a", "#0d6efd", "#9ba7b2", "#c2c202", "#fd0d15"],
        grid: {
          show: true,
          borderColor: 'rgba(0, 0, 0, 0.15)',
          strokeDashArray: 4,
        },
        tooltip: {
          theme: "dark",
        },
      xaxis: {
        categories: dadosMeio.filter(item => item.gex != "TOTAL" && item.gex != "SUPERINTENDENCIA REGIONAL SUDESTE II").map(item => item.gex)
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
    chart1.render();

    // grafico servidores gex

    var options2 = {
      
        series: [dadosMeio.filter(item => item.gex == "TOTAL")[0].sgrec, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sarec, 
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sard,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].samb,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sadj,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].samc,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sgben,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sais,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sestrd,
        dadosMeio.filter(item => item.gex == "TOTAL")[0].sestman],
        chart: {
            foreColor: "#9ba7b2",
            height: 380,
            type: 'pie',
        },
        labels: ['SGREC', 'SAREC', 'SARD', 'SAMB', 'SADJ', 'SAMC', 'SGBEN', 'SAIS', 'SESTRD', 'SestMAN'],
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
    
    var chart2 = new ApexCharts(document.querySelector("#servidorGex"), options2);
    chart2.render();
    
    // ATUALIZA GRÁFICO DE ACORDO COM DROPDOWN
    
        document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
          event.preventDefault();
          const gerenciaSelecionada = event.target.value;
          if(gerenciaSelecionada == "TOTAL") preencheTotalMeio(dadosMeio, chart) 
          else preencheGEXMeio(dadosMeio, gerenciaSelecionada, chart)
    
          atualizaGraficoPizzaMeio(dadosMeio, chart2, chart1, gerenciaSelecionada);
        })



});
