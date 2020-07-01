
const validarHTML5form=require('../herper/index').validarHTML5;
const moment = require('moment');
const jasny = require('../../node_modules/jasny-bootstrap/dist/js/jasny-bootstrap')
require('../../node_modules/jasny-bootstrap/dist/css/jasny-bootstrap.css');
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
            },1000)


        }
    };
}

function add(){
    $('#idusuario').val('');
    $('#idrol').val(0);

    $('#idcargo').val(0);
    $('#dni').val('');
    $('#clave').val('');
    $('#nombres').val('');
    $('#apellidos').val('');
    $('#direccion').val('');
    $('#telefono').val('');
    $('#fecha_fin_vigencia').val('');

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



    $('#btnagregar').on('click', function (event) {

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
            "idusuario",
            "idrol",
            "idcargo",
            "idposicion",
            "DNI",
            "clave",
            "Nombres",
            "Apellidos",
            "direccion",
            "telefono",
            "fecha_registro",
            "img",
            "Fecha Vigencia",
            "Acciones"
        ],
        colModel: [
            {
                name: 'idusuario',
                index: 'idusuario',
                editable: false,
                align: "center",
                width: 80,
                search: false,
                hidden: true
            },
            {
                name: 'idrol',
                index: 'idrol',
                editable: false,
                align: "center",
                width: 80,
                search: true,
                hidden: true
            },
            {
                name: 'idcargo',
                index: 'idcargo',
                editable: false,
                align: "left",
                width: 300,

                hidden: true
            }
            , {
                name: 'idposicion',
                index: 'idposicion',
                editable: false,
                width: 400,

                hidden: true
            }
            , {
                name: 'dni',
                index: 'dni',
                editable: false,
                width: 90,

                hidden: false
            }
            , {
                name: 'clave',
                index: 'clave',
                editable: false,
                width: 400,

                hidden: true
            }
            , {
                name: 'nombres',
                index: 'nombres',
                editable: false,
                width: 250,

                hidden: false
            }
            , {
                name: 'apellidos',
                index: 'apellidos',
                editable: false,
                width: 300,

                hidden: false
            }
            , {
                name: 'direccion',
                index: 'direccion',
                editable: false,
                width: 400,

                hidden: true
            }
            , {
                name: 'telefono',
                index: 'telefono',
                editable: false,
                width: 400,

                hidden: true
            }
            , {
                name: 'fecha_registro',
                index: 'fecha_registro',
                editable: false,
                width: 400,

                hidden: true
            }
            , {
                name: 'img',
                index: 'img',
                editable: false,
                width: 100,

                hidden: true
            }
            , {
                name: 'fecha_fin_vigencia',
                index: 'fecha_fin_vigencia',
                editable: false,
                align: 'center',
                width: 200,
                formatter: function (cellValue, opts, rowObject) {
                    return moment(cellValue).format("YYYY-MM-DD")
                },
                search: false,
                hidden: false
            }
            , {
                name: 'acciones',
                index: 'acciones',
                editable: false,
                width: 150,
                search: false,
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
        var id = $(this).find('td:nth-child(2)').text()
        console.log(id)
        $(this).find('td:last').append($(`<span class='custom-btns'><a class="editar" href="#" onclick='window.edit2("${rowid}","${id}")'> Editar </a> | <a  href="#" onclick='window.eliminar2("${rowid}","${id}")'> Eliminar</a></span>`));

    }, function () {
        $(this).find(".custom-btns").remove();
    });

}

function cargarGrilla() {

    $.ajax({
        type: 'get',
        url: '/api/usuarios',
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
            alert("Ocurrio un Error !!!");
        }
    });
}

window.edit2=function (rowid,id) {

//alert(rowid)
    $('#formModal').modal('show');
    //$('#container').data('idedit', id);
    debugger
    var rowIds = $('#grid').jqGrid('getDataIDs');

    for (var i = 1; i <= rowIds.length; i++) {
        rowData = $('#grid').jqGrid('getRowData', i);
        if (rowData.idusuario === id.toString()) {

            $('body').data("id",id)
            $('#idusuario').val(rowData.idusuario);
            $('#idrol').val(rowData.idrol);

            $('#idcargo').val(rowData.idcargo);
            $('#dni').val(rowData.dni);
            $('#clave').val(rowData.clave);
            $('#nombres').val(rowData.nombres);
            $('#apellidos').val(rowData.apellidos);
            $('#direccion').val(rowData.direccion);
            $('#telefono').val(rowData.telefono);

            $('#fecha_fin_vigencia').val(rowData.fecha_fin_vigencia);
            document.getElementById("image").src = rowData.img;

            $("#btnGuardar").text('Actualizar');

        } //if


    } //for

}

window.eliminar2=function (rowid,id) {
    var r = confirm("¿Desea eliminar este Usuario?");

    if (r == true) {
        $.ajax({
            type: "DELETE",
            url: "/api/usuario",
            headers: {
                authorization: `Bearer ${localStorage.token}`
            },
            data: {
                idusuario: id
            },
            success: function(response) {
                console.log(response)
                cargarGrilla()
                $('#modal-default').modal('hide');

            },
            error(xhr, ajaxOptions, thrownError) {
                console.log(xhr)
                console.log(ajaxOptions)
                console.log(thrownError)

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
        url: "/api/usuario",
        data: {
            idusuario: $('#idusuario').val(),
            idrol: $('#idrol').val(),
            idposicion:0,
            idcargo: $('#idcargo').val(),
            dni: $('#dni').val(),
            clave: $('#clave').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            direccion: $('#direccion').val(),
            telefono: $('#telefono').val(),
            fecha_fin_vigencia: $('#fecha_fin_vigencia').val(),
            img: $('#image').attr('src')

        },
        success: function (response) {
            console.log(response)
            cargarGrilla()
            button.button('reset');
            $('#formModal').modal('hide');

        }
        , error(xhr, ajaxOptions, thrownError) {
            console.log(xhr)
            console.log(ajaxOptions)
            console.log(thrownError)

            alert(xhr.responseText);
          //  alert(thrownError);
            button.button('reset');
            $('#modal-default').modal('hide');
        }
    });

}


function actualizar(button) {
    button.button('loading');


    $.ajax({
        type: "PUT",
        headers: {authorization: `Bearer ${localStorage.token}`},
        url: "/api/usuario",
        data: {
            idusuario: $('body').data("id"),
            idrol: $('#idrol').val(),
            idposicion:0,
            idcargo: $('#idcargo').val(),
            dni: $('#dni').val(),
            clave: $('#clave').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            direccion: $('#direccion').val(),
            telefono: $('#telefono').val(),
            fecha_fin_vigencia: $('#fecha_fin_vigencia').val(),
            img: $('#image').attr('src')

        },
        success: function (response) {
            console.log(response)
            cargarGrilla()
            button.button('reset');
            $('#formModal').modal('hide');

        }
        , error(xhr, ajaxOptions, thrownError) {
            console.log(xhr)
            console.log(ajaxOptions)
            console.log(thrownError)

            alert(xhr.responseText);
            //  alert(thrownError);
            button.button('reset');
            $('#modal-default').modal('hide');
        }
    });


}

function blank() {
}
