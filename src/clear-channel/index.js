window.innerHeight;
require('./css/clearchannel.css')


require('./map').generateMap()
require('./busquedas').busquedas()
require('./where_generator').filter()




$(function () {
    // loadfechas();
    switchView("map");
    crearGrilla();

    //cargarGrilla();

    $('#table-container').on('resize', function (e) {

        $("#grid").setGridWidth($('#table-container').width());
    }).trigger('resize');


});

$("[name='view']").click(function() {
    $(".in,.open").removeClass("in open");
    if (this.id === "map-graph") {
        switchView("split");
        return false;
    } else if (this.id === "map-only") {
        switchView("map");
        return false;
    } else if (this.id === "graph-only") {
        switchView("table");
        return false;
    }
});



function switchView(view) {
    if (view == "split") {
        $("#view").html("Split View");
        location.hash = "#split";
        $("#table-container").show();
        $("#table-container").css("height", "55%");
        $("#map-container").show();
        $("#map-container").css("height", "45%");
        $("#grid").jqGrid("setGridHeight",$("#table-container").height()-150);
        $("#grid").jqGrid("setGridWidth",$("#table-container").width());
        $(window).resize();
        if (map) {
            map.invalidateSize();
        }
    } else if (view == "map") {
        $("#view").html("Map View");
        location.hash = "#map";
        $("#map-container").show();
        $("#map-container").css("height", "100%");
        $("#map").css("height", "100%");
        $("#table-container").hide();
        if (window.map) {
            window.map.invalidateSize();
        }
    } else if (view == "table") {
        $("#view").html("Table View");
        location.hash = "#table";
        $("#table-container").show();
        $("#table-container").css("height", "100%");
        $("#grid").jqGrid("setGridHeight",$("#table-container").height()-150);
        $("#grid").jqGrid("setGridWidth",$("#table-container").width());
        $("#map-container").hide();
        $(window).resize();

    }
}



var gradientNumberFormat = function (cellvalue, gradientClass, minDataValue, maxDataValue, minDisplayValue, maxDisplayValue) {

    var dataAsNumber = parseFloat(cellvalue); /* parseInt(cellvalue, 10);*/
    if (dataAsNumber > maxDataValue) {
        dataAsNumber = maxDataValue;
    }
    if (dataAsNumber < minDataValue) {
        dataAsNumber = minDataValue;
    }
    let porcent=parseInt(cellvalue)*100/window.max_impacto;
    var prozentVal = minDisplayValue+(dataAsNumber-minDataValue)*(maxDisplayValue-
        minDisplayValue)/(maxDataValue-minDataValue);
    return '<div class="cellDiv"><div class="'+gradientClass+'" style="width:'+
        porcent+'%;"></div>' +
        '<div class="cellTextRight"><b>'+$.redondeo(cellvalue) +
        '</b></div>' +

        '</div>';




};


function crearGrilla() {


    $("#grid").jqGrid({
        /*datatype: function () {
            cargarGrilla();
        },*/
        datatype: "local",
        height:$("#table-container").height()-150,
        ignoreCase: true,
        multiselect: true,
        styleUI: 'Bootstrap',
        colNames: [
            "Acciones",
            "Panel",

            "Impacto",
            "Alcance",
            "Frecuencia",
            "Afinidad",
            "Direcci&oacute;n"

        ],
        colModel: [

            {
                name: 'acciones',
                index: 'acciones',
                editable: false,
                align: "center",
                width: 60,
                search: false,
                hidden: false
            },
            {
                name: 'panel',
                index: 'panel',
                editable: false,
                align: "center",
                width: 60,
                search: false,
                hidden: false
            },
            {
                name: 'impacto',
                index: 'impacto',
                editable: false,
                align: "center",
                width: 400,
                search: false,
                hidden: false,
                formatter: function (cellValue, opts, rowObject) {
                    return gradientNumberFormat(cellValue,'gradient1')
                }

            }
            ,
            {
                name: 'alcance',
                index: 'alcance',
                editable: false,
                align: "center",
                width: 120,
                search: false,
                hidden: false,
                formatter: function (cellvalue, opts, rowObject) {
                     return $.redondeo(cellvalue)
                }
            }
            ,
            {
                name: 'frecuencia',
                index: 'frecuencia',
                editable: false,
                align: "center",
                width: 120,
                search: false,
                hidden: false
            }
            ,
            {
                name: 'afinidad',
                index: 'afinidad',
                editable: false,
                align: "center",
                width: 120,
                search: false,
                hidden: false
            }
            ,
            {
                name: 'direccion',
                index: 'direccion',
                editable: false,
                align: "left",
                width: 400,
                search: false,
                hidden: false

            }


        ],
      //  pager: '#pager',
        //storname: 'idexpediente',
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: "55",
//        rowList: [10, 20, 30],
        //onSelectRow: viewGeometry,
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: true,
        //multiselect: true


    });
    $("#grid").jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch: "cn"});


}

/*funcion paramostrarel mapa*/
 window.ubicacion=function(lat ,lon) {




     window.map.setView([lat, lon], 16)


     L.marker([lat, lon]).addTo(mymap)
         .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
}

 window.informacion=function(panel,direccion) {

 //   alert(panel)

     $('#i_panel').text(panel)
     $('#i_direccion').text(direccion)
     $('#chartModal').modal('show')

     let estadistica=require('./estadisticas')
     estadistica.estadistica_horario()
     estadistica.estadistica_dia()
     estadistica.estadistica_genero()
     estadistica.estadistica_grupo_edad()
     estadistica.estadistica_nivel_socio_economico()
     estadistica.estadistica_razon_visita()
     estadistica.estadistica_perfil()

     //$('#imgpanel').attr('src',`http://200.121.128.47/cchanel/${panel}.JPG`)
}

window.foto=function(panel,direccion) {

    //   alert(panel)

    $('#panel').text(panel)
    $('#direccion').text(direccion)
    $('#information_modal').modal('show')

    $('#imgpanel').attr('src',`http://200.121.128.47/cchanel/${panel}.JPG`)
}

var max_estadistica=0
function cargarGrilla() {

   /* $.ajax({
        type: 'get',
        url: '/api/puntos_criticos',
        //  headers:{ authorization: `Bearer ${localStorage.token}`},
        data: {
            //'usuario': $('#loginname').val(),
            //'password':  $('#loginpass').val()
        },
        success: function (response) {
            $('#grid').jqGrid('clearGridData');
            jQuery("#grid").jqGrid('setGridParam', {data: response}).trigger('reloadGrid');
        },
        error: function () {
            toastr["error"]("Ocurrio un error.")
            alert("Ocurrio un Error !!!");
        }
    });*/

   var carga=
       [{"codigo":"PD03","direccion":" JAVIER PRADO 5250 LA FONTANA","estadistica":200,"alcance":100,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD04","direccion":"UNIVERSITARIA / AV. LA MARINA","estadistica":200,"alcance":100,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD05","direccion":"PANAMERICANA SUR KM 6","estadistica":2000,"alcance":500,"frecuencia":4,"afinidad":0.7},
           {"codigo":"PD06","direccion":"AV LA MARINA CDRA4/JR.LIBERTAD","estadistica":200,"alcance":200,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD07","direccion":"AV. PERSHING 411","estadistica":1200,"alcance":400,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD11","direccion":"AV. BENAVIDES / CERRO VERDE","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.7},
           {"codigo":"PD12","direccion":"AV. P. DE LA REPUBLICA / ALARCON - TRANSITO LIMA","estadistica":450,"alcance":150,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD14","direccion":"AV. NICOLAS AYLLON 3010","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD15","direccion":"AV. FAUCETT / COLONIAL","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD16","direccion":"AV. JAVIER PRADO 3610","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD17","direccion":"CA. HERNADEZ 1390 / AV. LA MARINA","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.7},
           {"codigo":"PD21","direccion":"AV. ALAMEDA DEL CORREGIDOR N° 1195 (GRIFO PRIMAX)","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD22","direccion":"AV. JAVIER PRADO 1417","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD25","direccion":"AV. GERARDO UN GER 337 MZ A! LT. 14 URB. INGENIERÍA","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD26","direccion":"AV. JAVIER PRADO 3340","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD28","direccion":"AV. MIGUEL GRAU / AV. EL SOL BARRANCO","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD34","direccion":"MZ. H LT. 14 URB. ENTEL PERU / LOS HEROES 122","estadistica":600,"alcance":200,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD37","direccion":"AV. LA MOLINA / AV. ELIAS APARICIO ( AZOTEA CC ARENA MOLL )","estadistica":1500,"alcance":500,"frecuencia":3,"afinidad":0.5},
           {"codigo":"PD38","direccion":"AV. JAVIER PRADO 2965","estadistica":500,"alcance":500,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD39","direccion":"JR. HIPÓLITO UNANUE NO. 100 / AV. PASEO DE LA REPÚBLICA","estadistica":500,"alcance":500,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD40","direccion":"AV. NICOLAS AYLLON 3010","estadistica":500,"alcance":500,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD41","direccion":"AV. LOS FRUTALES MZ. C LT. 07 / AV. JAVIER PRADO ESTE CDRA. 5","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD43","direccion":"AV. PRIMAVERA 1000 - 1012/ESQ. AV. DEL SUR 115 - 121 SURCO","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD44","direccion":"AV. PASEO DE LA REPUBLICA S/N (VILLA MILITAR MATELLINI)-CHORRILLOS","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD48","direccion":"AV. JAVIER PRADO 1475","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD50","direccion":"CALLE. LOS HUERTOS /AV. PRÓC. DE LA INDEP. CDRA. 16 – SAN JUAN DE LURIGANCHO","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD51","direccion":"AV. FAUCETT CDRA.7 - COLEGIO POLITECNICO - BELLAVISTA - EL CALLAO","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD52","direccion":"AV. BENAVIDES 4521 – MZ. A LT. 20 URB. LA ARBOLADA - SURCO","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD53","direccion":"JR. JULIAN PIÑEIRO 594 - RIMAC","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD54","direccion":"AV. EJERCITO N° 1360 MZ 5 LOTE 04. URB. ORRANTIA DEL MAR – MAGDALENA","estadistica":300,"alcance":300,"frecuencia":1,"afinidad":0.5},
           {"codigo":"PD55","direccion":"AV. BRASIL 3296 - MAGDALENA","estadistica":600,"alcance":300,"frecuencia":2,"afinidad":0.5},
           {"codigo":"PD58","direccion":"AV. RAÚL FERRERO CDRA.5 (FRENTE A U. AGRARIA) – LA MOLINA","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":0.5},
           {"codigo":"PD61","direccion":"AV. SALAVERRY 1810 / AV. SAN FELIPE – JESUS MARIA","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":0.5},
           {"codigo":"PD62","direccion":"AV. TOMAS MARSANO 890 -SURQUILLO","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD63","direccion":"AV. TOMAS MARSANO 890 -SURQUILLO","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD64","direccion":"PASAJE LA SOLIDARIDAD / AV. JAVIER PRADO– LA VICTORIA","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD65","direccion":"PASAJE LA SOLIDARIDAD / AV. JAVIER PRADO– LA VICTORIA","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD66","direccion":"AV. PANAMERICA NORTE KM. 16.00 ENTRE EL SENATI Y PLAZA NORTE","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD67","direccion":"AV. PANAMERICA NORTE KM. 16.00 ENTRE EL SENATI Y PLAZA NORTE","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD68","direccion":"AV. PASEO DE LA REPÚBLICA / LAS LILAS","estadistica":1000,"alcance":500,"frecuencia":2,"afinidad":1},
           {"codigo":"PD69","direccion":"AV. PASEO DE LA REPÚBLICA / LAS LILAS","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1},
           {"codigo":"PD70","direccion":"AV. ANGAMOS CDRA. 8 / PASAJE LA ENSENADA","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1},
           {"codigo":"PD71","direccion":"AV. ANGAMOS CDRA. 8 / PASAJE ENSENADA","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1},
           {"codigo":"PD72","direccion":"Jr. Scipion Llona / Av. Paseo de la República","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1},
           {"codigo":"PD73","direccion":"Jr. Scipion Llona / Av. Paseo de la República","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD74","direccion":"Av. Del Ejercito","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD75","direccion":"Av. Del Ejercito","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD76","direccion":"Malecón Armendariz / Av. La Paz","estadistica":300,"alcance":150,"frecuencia":2,"afinidad":1.4},
           {"codigo":"PD77","direccion":"Malecón Armendariz / Av. La Paz","estadistica":150,"alcance":150,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD78","direccion":"Ca. Gral. Pershing cdra. 02 / Ca. Gonzales Prada","estadistica":150,"alcance":150,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD79","direccion":"Ca. Gral. Pershing cdra. 02 / Ca. Gonzales Prada","estadistica":450,"alcance":450,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD80","direccion":"Av. Jorge Chavez / Av. Pardo","estadistica":450,"alcance":450,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD81","direccion":"Av. Jorge Chavez / Av. Pardo","estadistica":450,"alcance":450,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD82","direccion":"Plaza Piura / Av. Comandante Espinar","estadistica":450,"alcance":450,"frecuencia":1,"afinidad":1.4},
           {"codigo":"PD83","direccion":"Plaza Piura / Av. Comandante Espinar","estadistica":450,"alcance":450,"frecuencia":1,"afinidad":1.4}]

    max_estadistica=getmax(carga)



    $('#grid').jqGrid('clearGridData');
    jQuery("#grid").jqGrid('setGridParam', {data: carga}).trigger('reloadGrid');
}

function getmax(result) {
    var array_values=[]
    result.map(value=>{
        array_values.push(parseInt(value.estadistica) )

    })
    return Math.max(...array_values);
}



