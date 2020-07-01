require('./styles.css');
const validarHTML5form = require('../herper/index').validarHTML5;

$(document).ajaxStart(function () {
    Pace.restart()
})

$(function () {
    // loadfechas();


    previewphoto();
   // cargarGrilla();


});

$(document).ready(function (e) {
    $('#btnGuardar').on('click', function (event) {

        validarHTML5form('form', function () {

                save($('#btnGuardar'));


        })


    });
})


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


function save(button) {
    //  var $this = $(this);
    button.button('loading');
    // const myHeaders = new Headers();
    // myHeaders.append('authorization', `Bearer ${localStorage.token}`)
    // event.preventDefault();
    $.ajax({
        type: "POST",
        headers: {authorization: `Bearer ${localStorage.token}`},
        url: "/api/perfil",
        data: {
            // idusuario: 0,
            dni: $('#dni').val(),
            clave: $('#clave').val(),
            nombres: $('#nombres').val(),
            apellidos: $('#apellidos').val(),
            direccion: $('#direccion').val(),
            telefono: $('#telefono').val(),
            img: $('#image').attr('src')

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



function blank() {
}