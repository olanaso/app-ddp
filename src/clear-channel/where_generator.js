module.exports = {
    filter
}

function filter() {

    window.clearFilters = function () {
        window.filtros = {
            anio_espe: $('#drpanio_especif option:selected').val(),
            mes_espe: $('#drpmes_especif option:selected').val(),
            /*Filtrps de perfil*/
            horarios: [],
            tipodia: [],
            genero: [],
            redad: [],
            nivelSE: [],
            rvisita: [],
            perfil: [],
        }
    }

    window.clearFilters()


    /*Funcion para la generacion de los where*/
    /*==============Eventos para la captura de los filtros============*/

    $('#drpanio_especif').change(function (e) {
        window.filtros.anio_espe=$('#drpanio_especif option:selected').val()
    })

    $('#drpmes_especif').change(function (e) {
        window.filtros.mes_espe=$('#drpmes_especif option:selected').val()
    })

    /*Banda horario*/
    $('.f-horario').click(function (e) {
        if ($(this).is(':checked')) {
            window.filtros.horarios.push($(this).attr('val-filter'))
        }
        else {
            window.filtros.horarios = $.eliminarelementoarray(window.filtros.horarios, $(this).attr('val-filter'))
        }

    });
    /*Tipo de dia */
    $('.f-tipodia').click(function (e) {

        if ($(this).is(':checked')) {
            window.filtros.tipodia.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            filtros.tipodia = $.eliminarelementoarray(window.filtros.tipodia, $(this).attr('val-filter'))
        }

    });
    /* Genero */
    $('.f-genero').click(function (e) {

        if ($(this).is(':checked')) {
            window.filtros.genero.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            window.filtros.genero = $.eliminarelementoarray(window.filtros.genero, $(this).attr('val-filter'))
        }

    })
    /* Grupo Edad*/

    $('.f-redad').click(function (e) {

        if ($(this).is(':checked')) {
            window.filtros.redad.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            window.filtros.redad = $.eliminarelementoarray(window.filtros.redad, $(this).attr('val-filter'))
        }

    })
    /*Nivel Socio Economico*/
    $('.f-nivelSE').click(function (e) {
        if ($(this).is(':checked')) {
            window.filtros.nivelSE.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            window.filtros.nivelSE = $.eliminarelementoarray(window.filtros.nivelSE, $(this).attr('val-filter'))
        }
    })

    /*Razonde Visita*/
    $('.f-motivo').click(function (e) {

        if ($(this).is(':checked')) {
            window.filtros.rvisita.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            window.filtros.rvisita = $.eliminarelementoarray(window.filtros.rvisita, $(this).attr('val-filter'))
        }

    })

    $('.f-perfil').click(function (e) {

        if ($(this).is(':checked')) {
            window.filtros.perfil.push($(this).attr('val-filter'))
        } else {
            $(this).attr('val-filter')
            window.filtros.perfil = $.eliminarelementoarray(window.filtros.motivoviaje, $(this).attr('val-filter'))
        }

    })


    /*==============Inicio de filtros============*/

    window.generatewhere = () => {

        var CQL = new Array();

        /*SQL periodo*/

        if (window.filtros.anio_espe !== '') {
            if(window.filtros.anio_espe !== '0'){
                CQL.push(" ano = ''" + window.filtros.anio_espe + "'' ")
            }else{
                CQL.push(" 1 = 1 ")
            }

        }

        if (window.filtros.mes_espe !== '') {
            if(window.filtros.mes_espe !== '0'){
                CQL.push(" mes=''" + window.filtros.mes_espe + "'' ")
            }else{
                CQL.push(" 1 = 1 ")
            }
        }

        /*SQL origen*/
        if (window.filtros.horarios.length > 0) {
            CQL.push("banda_horaria IN (''" + window.filtros.horarios.join('\'\',\'\'') + "'')")
        }
        if (window.filtros.tipodia.length > 0) {
            CQL.push("dia IN (''" + window.filtros.tipodia.join('\'\',\'\'') + "'')")
        }

        if (window.filtros.genero.length > 0) {
            CQL.push("genero IN (''" + window.filtros.genero.join('\'\',\'\'') + "'')")
        }

        if (window.filtros.redad.length > 0) {
            CQL.push("grupos_edad IN (''" + window.filtros.redad.join('\'\',\'\'') + "'')")
        }
        if (window.filtros.nivelSE.length > 0) {
            CQL.push("nse IN (''" + window.filtros.nivelSE.join('\'\',\'\'') + "'')")
        }

        if (window.filtros.rvisita.length > 0) {
            CQL.push("razon_visita IN (''" + window.filtros.rvisita.join('\'\',\'\'') + "'')")
        }

        if (window.filtros.perfil.length > 0) {
            CQL.push("perfil IN (''" + window.filtros.perfil.join('\'\',\'\'') + "'')")
        }

        return CQL.join(' AND ')


    }


    /*Para limpiar los formularios*/
    jQuery.LimpiarForm = function (t) {
        $.each($(t), function (index, element) {
            if ($(element).attr('type') == 'checkbox') {
                $(this).val(""), $(this).prop("checked", !1)
            }
            if ($(element).prop('type') == 'select-one') {
                $(this).val(0)
            }
        })
    }


    jQuery.eliminarelementoarray = function (array, elementoeliminar) {
        return array.filter(function (elemento) {
            return elemento != elementoeliminar;
        });
    }


    jQuery.redondeo = function (numero) {
        return jQuery.formato_numero(numero, 0, '.', ',');
    }


    jQuery.formato_numero = function (numero, decimales, separador_decimal, separador_miles) { // v2007-08-06
        numero = parseFloat(numero);
        if (isNaN(numero)) {
            return "";
        }

        if (decimales !== undefined) {
            // Redondeamos
            numero = numero.toFixed(decimales);
        }

        // Convertimos el punto en separador_decimal
        numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");
        if (separador_miles) {
            // A�adimos los separadores de miles
            var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
            while (miles.test(numero)) {
                numero = numero.replace(miles, "$1" + separador_miles + "$2");
            }
        }

        return numero;
    }

}