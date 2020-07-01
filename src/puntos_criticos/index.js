//const L = require('leaflet');

//const fullscreen=require('../../public/plugins/Leaflet.fullscreen/dist/Leaflet.fullscreen')
/*Moment*/
const moment = require('moment');
/*Toastr*/
const toastr = require('../../node_modules/toastr/build/toastr.min');
require('../../node_modules/toastr/build/toastr.css');
/*Jasny*/
const jasny = require('../../node_modules/jasny-bootstrap/dist/js/jasny-bootstrap')
require('../../node_modules/jasny-bootstrap/dist/css/jasny-bootstrap.css');

const validarHTML5form = require('../herper/index').validarHTML5;

window.innerHeight;
var map, cm, ll = new L.LatLng(-13.215380777879282, -74.2897367468686);
var corona = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    maxZoom: 18,
    attribution: `<a  href="#">PeopleWorking - PeruFarma</a>`
});

var corona = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
    maxZoom: 18,
    attribution: `<strong class="text-danger">JB </strong> Ingenieros`
});


map = L.map('map',
    {
        fullscreenControl: {
            pseudoFullscreen: true
        },
        center: ll,
        zoom: 16,
        layers: [corona]

    }).setView([-13.16314119680327, -74.21162188053133], 16);

/*Eventos del mapa*/

map.on('dblclick', mostrarCoordenadas);
var marker = null;

function mostrarCoordenadas(e) {
    //layerGroup.clearLayers();
    if (marker == null) {
        $('#latitud').val(e.latlng.lat);
        $('#longitud').val(e.latlng.lng);

        var locateIcon = L.icon({
            iconUrl: window.location.host + '/img/feedback-point.png',
            //iconSize: [38, 95], // size of the icon
        });

        // create marker object, pass custom icon as option, add to map
        marker = L.marker([e.latlng.lat, e.latlng.lng], {
                //   icon: locateIcon,
                draggable: true
            }
        );

        marker.on('drag', function (e) {
            $('#latitud').val(e.latlng.lat);
            $('#longitud').val(e.latlng.lng);
        });


        marker.addTo(map);
    }
    if ($('#latitud').val().trim() !== '' || marker !== null) {
        marker.setLatLng([e.latlng.lat, e.latlng.lng]).update();
        $('#latitud').val(e.latlng.lat);
        $('#longitud').val(e.latlng.lng);
    } else {
        $('#latitud').val(e.latlng.lat);
        $('#longitud').val(e.latlng.lng);

        var locateIcon = L.icon({
            iconUrl: urlApp + '/img/feedback-point.png',
            //iconSize: [38, 95], // size of the icon
        });

        // create marker object, pass custom icon as option, add to map
        marker = L.marker([e.latlng.lat, e.latlng.lng], {
                //   icon: locateIcon,
                draggable: true
            }
        );

        marker.on('drag', function (e) {
            $('#latitud').val(e.latlng.lat);
            $('#longitud').val(e.latlng.lng);
        });


        marker.addTo(map);
    }

    // map.removeLayer(tempMarker);


    map.setView(new L.LatLng(e.latlng.lat, e.latlng.lng), map.getZoom());
}

/*!
 * Author: Erick Escalante Olano
 * Description:
 *      Archivo JS para adminitracion
 !**/

/*
 * Global variables. If you change any of these vars, don't forget
 * to change the values in the less files!
 */
/*
 /* INITIALIZE
 * ------------------------
 */


$.jgrid.defaults.width = 780;
$.jgrid.defaults.styleUI = 'Bootstrap';

$(document).ajaxStart(function () {
    Pace.restart()
})

$(function () {
    // loadfechas();

    crearGrilla();
    previewphoto();
    cargarGrilla();
    add();
    $('#containerGrilla').bind('resize', function () {
        $("#grid").setGridWidth($('#containerGrilla').width());
    }).trigger('resize');


});


function previewphoto() {
    document.getElementById("icono").onchange = function () {
        var reader = new FileReader();

        reader.onload = function (e) {
            // get loaded data and render thumbnail.
            document.getElementById("image").src = e.target.result;
        };
        // read the image file as a data URL.
        reader.readAsDataURL(this.files[0]);
        console.log("tamaño de imagen", this.files[0].size)

        if (this.files[0].size > 20000) {

            alert("La imagen sobre pasa el tamaño permitido")
            setTimeout(function () {
                document.getElementById("image").src = 'http://www.bajoelagua.com/avatares/avatar_g.jpg';
                $('#icono').val('');
            }, 1000)


        }
    };
}

function add() {

    $('#icono').val('');
    $('#denominacion').val('');
    $('#descripcion').val('');
    $('#direccion').val('');
    $('#referencia').val('');
    $('#latitud').val('');
    $('#longitud').val('');
    document.getElementById("image").src = 'http://www.bajoelagua.com/avatares/avatar_g.jpg'

    $("#btnGuardar").text('Guardar');
}


/*EVENTS
 * ------------------------
 */
$(document).ready(function (e) {
    $('#btnGuardar').on('click', function (event) {

        validarHTML5form('form', function () {
            if ($('#btnGuardar').text() === 'Guardar') {
                save($('#btnGuardar'));
            }
            if ($('#btnGuardar').text() === 'Actualizar') {
                actualizar($('#btnGuardar'));
            }
        })


    });


    $('#btnCancelar').on('click', function (event) {

        add()

    });

    $('#btnagregar').on('click', function (event) {

        $('#rol').val('')
        $('#descripcion').val('')
        $('#rol').val('')
        $('body').data('idrol', undefined)
        $('#estado').prop("checked", false)
        $('#btnNuevo').text('Guardar')


    });

})


function crearGrilla() {


    $("#grid").jqGrid({
        /*datatype: function () {
            cargarGrilla();
        },*/
        datatype: "local",
        height: 400,
        width: 500,
        ignoreCase: true,
        //multiselect: false,
        styleUI: 'Bootstrap',
        colNames: [
            "Acciones",
            "Denominacion",
            "idpuntos_criticos",
            "idusuario",
            "Direccion",
            "Latitud",
            "Longitud",
            "fecha",

            "Descripción",
            "icono",
            "Referencia",

        ],
        colModel: [

            {
                name: 'acciones',
                index: 'acciones',
                editable: false,
                align: "center",
                width: 120,
                search: false,
                hidden: false
            },
            {
                name: 'denominacion',
                index: 'denominacion',
                editable: false,
                align: "left",
                width: 300,

                hidden: false
            },
            {
                name: 'idpuntos_criticos',
                index: 'idpuntos_criticos',
                editable: false,
                align: "center",
                width: 80,
                search: false,
                hidden: true
            },
            {
                name: 'idusuario',
                index: 'idusuario',
                editable: false,
                align: "center",
                width: 80,
                search: true,
                hidden: true
            },
            {
                name: 'direccion',
                index: 'direccion',
                editable: false,
                align: "left",
                width: 300,

                hidden: false
            }

            ,
            {
                name: 'latitud',
                index: 'latitud',
                editable: false,
                align: "right",
                width: 100,
                search: false,
                hidden: false
            }

            ,
            {
                name: 'longitud',
                index: 'longitud',
                editable: false,
                align: "right",
                width: 100,
                search: false,
                hidden: false
            }


            , {
                name: 'fecha',
                index: 'fecha',
                editable: false,
                align: 'center',
                width: 200,
                formatter: function (cellValue, opts, rowObject) {
                    return moment(cellValue).format("YYYY-MM-DD")
                },
                search: false,
                hidden: true
            }

            ,
            {
                name: 'descripcion',
                index: 'descripcion',
                editable: false,
                align: "left",
                width: 300,

                hidden: true
            }
            ,
            {
                name: 'icono',
                index: 'icono',
                editable: false,
                align: "left",
                width: 300,

                hidden: true
            }

            ,
            {
                name: 'referencia',
                index: 'referencia',
                editable: false,
                align: "left",
                width: 200,

                hidden: false
            }


        ],
        pager: '#pager',
        //storname: 'idexpediente',
        loadtext: 'Cargando datos...',
        recordtext: "{0} - {1} de {2} elementos",
        emptyrecords: 'No hay resultados',
        pgtext: 'Pág: {0} de {1}',
        rowNum: "10",
//        rowList: [10, 20, 30],
        //onSelectRow: viewGeometry,
        viewrecords: true,
        rownumbers: true,
        shrinkToFit: false,
        //multiselect: true

        gridComplete: function (pgButton) {
            generateeditdel()
        }
    });
    $("#grid").jqGrid('filterToolbar', {stringResult: true, searchOnEnter: false, defaultSearch: "cn"});


}

function generateeditdel() {
    $("#grid tr").hover(function (e) {

        var rowid = $(this).find('td:nth-child(1)').text()
        var id = $(this).find('td:nth-child(4)').text()
        console.log(id)
        $(this).find('td:nth-child(2)').append($(`<span class='custom-btns'><a class="editar" href="#" onclick='window.edit2("${rowid}","${id}")'> Editar </a> | <a  href="#" onclick='window.eliminar2("${rowid}","${id}")'> Eliminar</a></span>`));

    }, function () {
        $(this).find(".custom-btns").remove();
    });

}

function cargarGrilla() {

    $.ajax({
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
    });
}

window.eliminar2 = function (rowid, id) {
    var r = confirm("¿Desea eliminar este Usuario?");

    if (r == true) {
        $.ajax({
            type: "DELETE",
            url: "/api/puntos_criticos",
            headers: {
                authorization: `Bearer ${localStorage.token}`
            },
            data: {
                idpuntos_criticos: id
            },
            success: function (response) {
                console.log(response)
                toastr["success"]("Se elimino correctamente el registro")
                cargarGrilla()


            },
            error(xhr, ajaxOptions, thrownError) {
                console.log(xhr)
                console.log(ajaxOptions)
                console.log(thrownError)
                toastr["error"]("Ocurrio un error.")

                alert(xhr.responseText);
                //button.button('reset');
                $('#modal-default').modal('hide');
            }
        });
    }

}


function save(button) {
    //  var $this = $(this);
    button.button('loading');
    // const myHeaders = new Headers();
    // myHeaders.append('authorization', `Bearer ${localStorage.token}`)
    // event.preventDefault();
    $.ajax({
        type: "POST",
        headers: {authorization: `Bearer ${localStorage.token}`},
        url: "/api/puntos_criticos",
        data: {
           // idusuario: 0,
            direccion: $('#direccion').val(),
            latitud: $('#latitud').val(),
            longitud: $('#longitud').val(),
            denominacion: $('#denominacion').val(),
            descripcion: $('#descripcion').val(),
            referencia: $('#referencia').val(),
            icono: $('#image').attr('src')

        },
        success: function (response) {
            console.log(response)
            toastr["success"]("Se registro correctamente el registro")
            add()
            cargarGrilla()
            button.button('reset');
            $('#formModal').modal('hide');

        }
        , error(xhr, ajaxOptions, thrownError) {
            console.log(xhr)
            console.log(ajaxOptions)
            console.log(thrownError)
            toastr["error"]("Ocurrio un error.")
            alert(xhr.responseText);
            //  alert(thrownError);
            button.button('reset');
            $('#modal-default').modal('hide');
        }
    });

}


window.edit2 = function (rowid, id) {

    // alert(id)
    //  $('#formModal').modal('show');
   // $('#container').data('idedit', id);

    var rowIds = $('#grid').jqGrid('getDataIDs');
    var e = new Object();
    e.latlng = {};

    for (var i = 1; i <= rowIds.length; i++) {
        rowData = $('#grid').jqGrid('getRowData', i);
        if (rowData.idpuntos_criticos === id.toString()) {

            $('body').data("id", id)
            $('#direccion').val(rowData.direccion),
                $('#latitud').val(rowData.latitud),
                $('#longitud').val(rowData.longitud),
                $('#denominacion').val(rowData.denominacion),
                $('#descripcion').val(rowData.descripcion),
                $('#referencia').val(rowData.referencia),

                e.latlng.lat = rowData.latitud;
            e.latlng.lng = rowData.longitud;
            document.getElementById("image").src = rowData.icono;
            mostrarCoordenadas(e)
            $("#btnGuardar").text('Actualizar');

        } //if


    } //for

}

function actualizar(button) {
    button.button('loading');


    $.ajax({
        type: "PUT",
        headers: {authorization: `Bearer ${localStorage.token}`},
        url: "/api/puntos_criticos",
        data: {
            idpuntos_criticos:$('body').data("id"),
            idusuario: $('#idusuario').val(),
            direccion: $('#direccion').val(),
            latitud: $('#latitud').val(),
            longitud: $('#longitud').val(),
            denominacion: $('#denominacion').val(),
            descripcion: $('#descripcion').val(),
            referencia: $('#referencia').val(),
            icono: $('#image').attr('src')

        },
        success: function (response) {
            toastr["success"]("Se actualizo correctamente el registro")
            cargarGrilla()
            button.button('reset');
           add()



        }
        , error(xhr, ajaxOptions, thrownError) {
            console.log(xhr)
            console.log(ajaxOptions)
            console.log(thrownError)
            toastr["error"]("Ocurrio un error.")
            alert(xhr.responseText);
            //  alert(thrownError);
            button.button('reset');
            $('#modal-default').modal('hide');
        }
    });


}

function blank() {
}

