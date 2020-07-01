module.exports={
    busquedas
}

document.addEventListener('fetchStart', function() {
    console.log("Show spinner");
});

document.addEventListener('fetchEnd', function() {
    console.log("Hide spinner");
});

function busquedas() {

    $("#ejecutar_filtro").click(function() {

        var btn = $(this);

        ejecutarfiltro(btn)
    });

    $("#limpiar_filtro").click(function() {

        $.LimpiarForm('.filters');

    });


}

function ejecutarfiltro(btn) {

    btn.button('loading');

    var url = '/api/consulta_where';
    let data = {
        where:window.generatewhere()
    }
    let config = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, config)
        .then(response => {
            return response.json();
        })
        .then(response => {

           window.max_impacto= getmax(response)
           // alert(1)

            $('#grid').jqGrid('clearGridData');
            jQuery("#grid").jqGrid('setGridParam', {data: response}).trigger('reloadGrid');

            fin_de_llamada()

            btn.button('reset');


        }).catch(error => {
           console.log(error)
           btn.button('reset');
        })
}


function fin_de_llamada() {
    $('#formModal').modal('hide')
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $("#grid").jqGrid("setGridHeight",$("#table-container").height()-150);
    $("#grid").jqGrid("setGridWidth",$("#table-container").width());
    $(window).resize();
    if (window.map) {
        window.map.invalidateSize();
    }
}


function getmax(result) {
    var array_values=[]
    result.map(value=>{
        array_values.push(Number(value.impacto) )

    })
    return Math.max(...array_values);
}




