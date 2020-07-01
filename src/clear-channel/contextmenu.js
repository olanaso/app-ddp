module.exports= {
    showCoordinates,
    centerMap,
    zoomIn,
    zoomOut,
    street_view,
    googlesatelite,
    wazer,
    mapagoogle1,
    googletrafico,
    showestadisticas


}
function showestadisticas() {

}
function showCoordinates(e,map) {
    alert(e.latlng);
}

function centerMap(e,map) {
    map.panTo(e.latlng);
}

function zoomIn(e,map) {
    map.zoomIn();
}

function zoomOut(e,map) {
    map.zoomOut();
}

function street_view(e,map) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;


    window.open('https://www.google.com/maps?q&layer=c&cbll=' + lat + ',' + lng + '&cbp=12,0,0,0,0&z=18', '', 'width=430,height=650,left=0,top=0,location=no');
}

function googlesatelite(e,map) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    map.panTo(e.latlng);
    window.open('https://www.google.com.pe/maps/@' + lat + ',' + lng + ',376m/data=!3m1!1e3', '', 'width=430,height=650,left=0,top=0');

}

function wazer(e,map) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
 //   map.panTo(e.latlng);
    window.open('https://www.waze.com/es-419/livemap?zoom=18&lat=' + lat + '&lon=' + lng + '', '', 'width=800,height=650,left=0,top=0');

}

function mapagoogle1(e,map) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
   // map.panTo(e.latlng);
    window.open('https://www.google.com.pe/maps/@' + lat + ',' + lng + ',18z', '', 'width=430,height=650,left=0,top=0');
}

function googletrafico(e,map) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    window.open('https://www.google.com.pe/maps/@' + lat + ',' + lng + ',18z/data=!5m1!1e1', '', 'width=550,height=650,left=0,top=0');
}


