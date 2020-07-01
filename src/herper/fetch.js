
module.exports={



}


function fetchCall() {


    document.addEventListener('fetchStart', function() {
        console.log("Show spinner");
    });

    document.addEventListener('fetchEnd', function() {
        console.log("Hide spinner");
    });
}
