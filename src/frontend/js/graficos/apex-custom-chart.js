import { fetchData, fetchData7, fetchData8, fetchData9, fetchData10 } from "../extrairData.js";

$(async function() {
	"use strict";
  const dados = await fetchData();
  const dados7 = await fetchData7();
  const dados10 = await fetchData10();

  //grafico de gex/sr

  var options = {
    series: [{
      name: "Servidores",
      data: dados10.map(item => item.servidores)
    }, {
      name: "Estagiários",
      data: dados10.map(item => item.estagiarios)
    }, {
      name: "Requisitados/Cedidos",
      data: dados10.map(item => item.reqced)
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
    categories: dados10.map(item => item.gex)
  }
  };

  var chart = new ApexCharts(document.querySelector("#gexSR"), options);
  chart.render();

  // total de servidores, estagiários e requisitados/cedidos

    var options2 = {
        series: [dados[0].servidores, dados[0].estagiarios, dados[0].reqced],
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
      
      series: [dados[0].pgdparcial, dados[0].pgdintegral, dados[0].presencial],
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
      series: [dados[0].meio, dados[0].fim],
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
          xaxis:{
            categories: dados7.filter(item => item.aps == selecao).map(item => item.aps)
          }
        })
      
      
    })

    document.getElementById('gerenciaSelect').addEventListener('change', (event)=> {
      event.preventDefault();
      const gerenciaSelecionada = event.target.value;
      chart.updateSeries([{
        name: "Servidores",
        data: [dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.servidores)[0]]
      }, {
        name: "Estagiários",
        data: [dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.estagiarios)[0]]
      }, {
        name: "Requisitados/Cedidos",
        data: [dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.reqced)[0]]
      }]);
      
      chart.updateOptions({
        plotOptions : {
          bar: {
            horizontal: !1,
            columnWidth: "30%",
            endingShape: "rounded"
        }
        },
        xaxis : {
          categories: [dados7.filter(item => item.gex == gerenciaSelecionada).map(item => item.aps)[0]]
        }
      })

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
    })


});

