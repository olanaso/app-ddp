module.exports={
    estadistica_horario,
    estadistica_dia,
    estadistica_genero,
    estadistica_grupo_edad,
    estadistica_nivel_socio_economico,
    estadistica_razon_visita,
    estadistica_perfil
}

function estadistica_horario() {


// Create the chart
    Highcharts.chart('e_banda_horaria', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Informacion de banda horaria.  2018'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Cantidad de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> <br/>'
        },

        "series": [
            {
                "name": "Banda Horaria",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "0 - 6",
                        "y": 25000,

                    },
                    {
                        "name": "6 - 9",
                        "y": 75000,

                    },
                    {
                        "name": "9 - 12",
                        "y": 60000
                    },
                    {
                        "name": "12 - 15",
                        "y": 62000
                    },
                    {
                        "name": "15 - 18",
                        "y": 61000
                    },
                    {
                        "name": "18 - 21",
                        "y": 72000
                    },
                    {
                        "name": "21 - 0",
                        "y": 28000
                    }
                ]
            }
        ]

    });
    
}

function estadistica_dia() {



// Create the chart
    Highcharts.chart('e_tipo_dia', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadistica segun día de la semana.  2018'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> K<br/>'
        },

        "series": [
            {
                "name": "Dia de la semana",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "Lunes",
                        "y": 62.74,

                    },
                    {
                        "name": "Martes",
                        "y": 10.57,

                    },
                    {
                        "name": "Miercoles",
                        "y": 7.23
                    },
                    {
                        "name": "Jueves",
                        "y": 5.58
                    },
                    {
                        "name": "Viernes",
                        "y": 70.56
                    },
                    {
                        "name": "Sabado",
                        "y": 90.54
                    },
                    {
                        "name": "Domingo",
                        "y": 7.62
                    }
                ]
            }
        ]

    });

}

function estadistica_genero() {




// Create the chart
    Highcharts.chart('e_genero', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadistica segun Género, 2018'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> K<br/>'
        },

        "series": [
            {
                "name": "Dia de la semana",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "Masculino",
                        "y": 62.74,

                    },
                    {
                        "name": "Femenino",
                        "y": 10.57,

                    }
                ]
            }
        ]

    });

}

function estadistica_grupo_edad() {


// Create the chart
    Highcharts.chart('e_rango_edad', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Informacion de Rango Edad.  2018'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de Grupos de Edad'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> K<br/>'
        },

        "series": [
            {
                "name": "Grupos de Edad",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "15 a 19",
                        "y": 62.74,

                    },
                    {
                        "name": "20 a 24",
                        "y": 10.57,

                    },
                    {
                        "name": "25 a 29",
                        "y": 7.23
                    },
                    {
                        "name": "30 a 34",
                        "y": 5.58
                    },
                    {
                        "name": "35 a 39",
                        "y": 70.56
                    },
                    {
                        "name": "40 a 44",
                        "y": 90.54
                    },
                    {
                        "name": "45 a 49",
                        "y": 7.62
                    }
                    ,
                    {
                        "name": "50 a 54",
                        "y": 7.62
                    }
                    ,
                    {
                        "name": "55 a 59",
                        "y": 7.62
                    }
                    ,
                    {
                        "name": "60 a mas",
                        "y": 7.62
                    }
                ]
            }
        ]

    });

}

function estadistica_nivel_socio_economico() {




// Create the chart
    Highcharts.chart('e_p_nse', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Nivel Socio-económico'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> K<br/>'
        },

        "series": [
            {
                "name": "Dia de la semana",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "A",
                        "y": 30.74,

                    },
                    {
                        "name": "B",
                        "y": 25.57,

                    }
                    ,
                    {
                        "name": "C",
                        "y": 65.57,

                    }
                    ,
                    {
                        "name": "D",
                        "y": 80.57,

                    }
                    ,
                    {
                        "name": "E",
                        "y": 10.57,

                    }
                ]
            }
        ]

    });


}

function estadistica_razon_visita() {



// Create the chart
    Highcharts.chart('e_razon_visita', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadística según Razón de visita, 2018'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> K<br/>'
        },

        "series": [
            {
                "name": "Dia de la semana",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "Trabajador",
                        "y": 55.74,

                    },
                    {
                        "name": "Residente",
                        "y": 25.57,

                    }
                    ,
                    {
                        "name": "Otros",
                        "y": 65.57,

                    }

                ]
            }
        ]

    });



}

function estadistica_perfil() {



// Create the chart
    Highcharts.chart('e_p_perfil', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Estadistica según Perfil'
        },
        subtitle: {
            text: 'Fuente de información: <a href="http://luca-telefonica.pe" target="_blank">Telefonica</a>'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Porcentaje de impactos por panel'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> K<br/>'
        },

        "series": [
            {
                "name": "Dia de la semana",
                "colorByPoint": true,
                "data": [
                    {
                        "name": "Consumista",
                        "y": 80.74,

                    },
                    {
                        "name": "Viajero",
                        "y": 55.57,

                    }
                    ,
                    {
                        "name": "Vida Social",
                        "y": 30.57,

                    }

                ]
            }
        ]

    });


}