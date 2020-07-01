const $=require('jquery')
module.exports= {
    validarHTML5
}

function validarHTML5(pidform, pFunction) {

    var isvalidate = $("#"+pidform)[0].checkValidity();
    if (isvalidate) {
        pFunction()
    }
}