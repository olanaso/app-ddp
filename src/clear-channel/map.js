module.exports={
    generateMap
}


function generateMap() {

    // Retrieve the object from storage
    /*  var credentialsObject = localStorage.getItem('credentials');
      var user=  JSON.parse(credentialsObject);
      if(user==undefined){
        alert('Los datos del logueo son incorrectos');
        location.href='http://200.121.128.102/loginbbva/';
      }
      if(user.user=='admin' && user.pass=='smart_step'){

      }else{
        alert('Los datos del logueo son incorrectos');
        location.href='http://200.121.128.102/loginbbva/';
      }

    $(document).ajaxSend(function() {

    }), $(document).ajaxComplete(function() {
        $("#loading").hide()
    }) */

    var map, featureLayers = [],
        featureLayersName = [];

//Site specific variables...
//these probably should be abstrated out into an optional local config file and/or local values pulled in from the getcapabilities request

//Native projection from GeoServer WFS
    var src = new Proj4js.Proj('EPSG:4326');
    var dst = new Proj4js.Proj('EPSG:900913');

//Attribution, get from WMS?
    var layerAttribution = 'Data &copy <a href=http://maps.gcc.tas.gov.au>GCC</a>, <a href="https://maps.gcc.tas.gov.au/licensing.html">CC-BY</a>';

//Define base layers


    var CartoDB_DarkMatter = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
        attribution: 'Mapa base dark',
        subdomains: 'abcd',
        maxZoom: 21
    });

    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: 'Mapa base white',
        subdomains: 'abcd',
        maxZoom: 21
    });



    var LISTAerial = new L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Basemap &copy The LIST",
        maxZoom: 21,
        maxNativeZoom: 19
    });

    var newmap = new L.tileLayer("http://geocoder.geodir.co/geocoder.api/tile/v1/{z}/{x}/{y}.png", {
        attribution: "Basemap &copy The LIST",
        maxZoom: 21,
        maxNativeZoom: 19
    });


    var esri = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri'
    });

    var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        maxNativeZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });


    var esta_metro = L.tileLayer.wms("http://opengeosuite.cloudapp.net/geoserver/GPM/wms", {
        layers: 'GPM:9c34df05c57b45a596c35e3d6eb0f010',
        /* Block numbers */
        format: 'image/png',
        transparent: true,
        minZoom: 10,
        maxZoom: 21
    });


    var baseLayers = {
        "Mapa de Calles": googleStreets

    };

    var lOverlays = {
        /*"Estaciones de Metro":esta_metro*/
    };

    var startCenter = new L.LatLng(-12.09606, -77.007637);
    var startZoom = 13;
//var searchBounds = new google.maps.LatLngBounds(
//  new google.maps.LatLng(-42.9063,147.1335),
//new google.maps.LatLng(-42.7167, 147.3444));

//get the url parameters
    var QueryString = function() {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = pair[1];
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [query_string[pair[0]], pair[1]];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(pair[1]);
            }
        }
        return query_string;
    }();

//WMS Base URL
    var owsurl = QueryString.owsurl;

    if (!owsurl) {
        owsurl = "http://200.121.128.102:8080/geoserver/bbva/ows";

    };

    $(document).on("click", ".feature-row", function(e) {

        sidebarClick(parseInt($(this).attr('id')), layerControl);
    });

    $("#full-extent-btn").click(function() {
        map.setView(startCenter, startZoom);
        return false;
    });

    $("#legend-btn").click(function() {
        //TODO: add all the currently added layers here, not just one...

        var text = "";
        for (i = 0; i < intLayers.length; i++) {
            text += "<b>" + intLayers[i] + "</b><br><img src=http://200.121.128.102:8080/geoserver/bbva/ows?service=wms&request=getlegendgraphic&layer=" + intLayers[i] + "&format=image/png><br>";
        }
        $("#legend").html(text);
        $('#legendModal').modal('show');
        return false;
    });

    $('#sidebar').toggle();

    $("#list-btn").click(function() {
        $('#sidebar').toggle();
        map.invalidateSize();
        return false;
    });

    $("#nav-btn").click(function() {
        $(".navbar-collapse").collapse("toggle");
        return false;
    });

    $("#sidebar-toggle-btn").click(function() {
        $("#sidebar").toggle();
        map.invalidateSize();
        return false;
    });

    $("#sidebar-hide-btn").click(function() {
        $('#sidebar').hide();
        map.invalidateSize();
    });
    $('#search-form').submit(function(e) {
        alert("Working....");
    });

//this is where I add the layer.
    function sidebarClick(id) {

        var layer = featureLayers[id];
        var index = $.inArray(layer, intLayers); //intLayers.indexOf(layer);
        //only add the layer if it's not added already...
        if (index == -1) {
            addLayer(layer);
        }
    }

    $("#chart-btn").click(function() {
        $("#chartModal").modal("show");
        /* $(".navbar-collapse.in").collapse("hide"); */
        return false;
    });


    $("#chartModal").on("shown.bs.modal", function(e) {
        drawCharts();
    });




    function addLayer(layer) {
        var id = $.inArray(layer, featureLayers);
        if (id === -1) {
            return;
        }
        var newLayer = new L.TileLayer.WMS(owsurl + "?SERVICE=WMS&", {
            layers: layer,
            format: 'image/png',
            transparent: true,
            maxZoom: 21,
            attribution: layerAttribution
        });
        lOverlays[featureLayersName[id]] = newLayer;
        map.addLayer(newLayer);
        map.removeControl(layerControl);
        updateInteractiveLayers(layer);
        layerControl = L.control.layers(baseLayers, lOverlays, {
            collapsed: isCollapsed
        }).addTo(map);
        /* Hide sidebar and go to the map on small screens */
        if (document.body.clientWidth <= 767) {
            $("#sidebar").hide();
            map.invalidateSize();
        }
    }

//GeoServer Layers


    var intLayers = [];
    var intLayersString = "";

    function updateInteractiveLayers(layer) {
        var index = $.inArray(layer, intLayers); //intLayers.indexOf(layer);
        if (index > -1) {
            intLayers.splice(index, 1);
        } else {
            intLayers.push(layer);
        }
        intLayersString = intLayers.join();
    };





    function convertirtexttoint(array) {
        for (var i = 0; i < array.length; i++) {
            array[i].y = Number(array[i].y)
        };
        return array
    }





    /*mostrando las estaditicas de arca*/



    function handleJson(data) {
        selectedFeature = L.geoJson(data, {
            style: function(feature) {
                return { color: 'yellow' };
            },
            onEachFeature: function(feature, layer) {



                console.log(feature)
                var content = "";
                content = content + "<b><u>" + feature.id.split('.')[0] + "</b></u><br>";
                delete feature.properties.bbox;
                for (var name in feature.properties) { content = content + "<b>" + name + ":</b> " + feature.properties[name] + "<br>" };
                var popup = L.popup()
                    .setLatLng(queryCoordinates)
                    .setContent(content)
                    .openOn(map);


                layer.bindPopup(content);

                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight


                });

            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 5,
                    fillColor: "yellow",
                    color: "#000",
                    weight: 5,
                    opacity: 0.6,
                    fillOpacity: 0.2
                });
            }
        });
        selectedFeature.addTo(map);
    }

//Query layer functionality.
    var selectedFeature;
    var queryCoordinates;

    function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
            fillColor: "yellow",
            color: "yellow",
            weight: 5,
            opacity: 1
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        var layer = e.target;
        layer.setStyle({
            radius: 5,
            fillColor: "yellow",
            color: "yellow",
            weight: 5,
            opacity: 0.6,
            fillOpacity: 0.2
        });
    }

    map = L.map("map", {
        fullscreenControl: {
            pseudoFullscreen: true
        },
        zoom: startZoom,
        center: startCenter,
        layers: [googleStreets],
        //layers: [CartoDB_DarkMatter],
        zoomControl: true,
        attributionControl: true,
        /*context*/
        contextmenu: true,
        contextmenuWidth: 140,
        contextmenuItems: [{
            text: 'Coordenadas',
            callback: showCoordinates
        }, {
            text: 'StreetView ',
            callback: street_view
        }, {
            text: 'Waze Trafico',
            callback: wazer
        }, {
            text: 'Google Trafico',
            callback: googletrafico
        }, {
            text: 'Google Satelite',
            callback: googlesatelite
        }, {
            text: 'Google Maps',
            callback: mapagoogle1
        }, {
            text: 'Centrar Mapa',
            callback: centerMap
        }, '-'
            //,{
            //text: '<i class="fa fa-pie-chart" aria-hidden="true"></i> Generales',
            //callback: ctx_showestadisticasgenerales
            //}
            , {
                text: 'Zoom in',
                icon: 'images/zoom-in.png',
                callback: zoomIn
            }, {
                text: 'Zoom out',
                icon: 'images/zoom-out.png',
                callback: zoomOut
            }
        ]
    });




//Set up trigger functions for adding layers to interactivity.
    map.on('overlayadd', function(e) {
        updateInteractiveLayers(e.layer.options.layers);
    });
    map.on('overlayremove', function(e) {
        updateInteractiveLayers(e.layer.options.layers);
    });

    map.on('click', function(e) {

        if (intLayers.length === 0) {
            return;
        }
        if (selectedFeature) {
            map.removeLayer(selectedFeature);
        };

        var p = new Proj4js.Point(e.latlng.lng, e.latlng.lat);
        //alert("punto" + p);
        Proj4js.transform(src, src, p);
        queryCoordinates = e.latlng;

        var defaultParameters = {
            service: 'WFS',
            version: '1.0.0',
            request: 'GetFeature',
            typeName: intLayersString,
            maxFeatures: 1,
            outputFormat: 'text/javascript',
            format_options: 'callback:getJson',
            SrsName: 'EPSG:4326'
        };


        /*  0.0001, kilometers (valor anterior)    */

        var customParams = {
            cql_filter: 'DWithin(geom, POINT(' + p.x + ' ' + p.y + '), 0.0001, kilometers)'
        };

        //alert( p.x + "  " + p.y);

        var parameters = L.Util.extend(defaultParameters, customParams);

        var url = owsurl + L.Util.getParamString(parameters)

        $.ajax({
            url: owsurl + L.Util.getParamString(parameters),
            dataType: 'jsonp',
            jsonpCallback: 'getJson',
            success: handleJson
        });
    });

    /* Attribution control */
    function updateAttribution(e) {
        var attributiontext = "";
        var attributions = []
        $.each(map._layers, function(index, layer) {
            if (layer.getAttribution) {
                if ($.inArray(layer.getAttribution(), attributions) === -1) {
                    attributiontext = attributiontext + layer.getAttribution() + '<br>'
                    attributions.push(layer.getAttribution())
                }
            }
        });
        $("#attribution").html((attributiontext));
    }
    map.on("layeradd", updateAttribution);
    map.on("layerremove", updateAttribution);


    $.ajax({
        type: "GET",
        url: owsurl + "?SERVICE=WMS&request=getcapabilities",
        dataType: "xml",
        success: parseXml
    });

    function parseXml(xml) {

        debugger
        var layerIndex = 0
        $(xml).find("Layer").find("Layer").each(function() {
            var title = $(this).find("Title").first().text();
            var name = $(this).find("Name").first().text();

            //Check for layer groups
            var patt = new RegExp("Group");
            var res = patt.test(title);
            if (!res) {
                featureLayers.push(name)
                featureLayersName.push(title)
                $("#feature-list").append(`
                    
                <li>
                <a href="#" id="${layerIndex}" class="feature-row">
                <span class="menu-icon">
                 <img src="img/capas.svg"
                                             style="height:20px;">
                </span>
                <span class="text"> ${title}</span>
                <span class="menu-hover"></span>
                </a>
                </li>

                `);
                layerIndex = layerIndex + 1;
            }
        });

        //Check for initial layers.
        var layersString = QueryString.layers;
        if (layersString) {
            var layersList = layersString.split(',')
            for (i = 0; i < layersList.length; i++) {
                addLayer(layersList[i].replace('/', ''));
            }
        }

        //Ok, got to get the searching working...
        $(document).ready(function() {
            (function($) {
                $('#layerfilter').keyup(function() {
                    var rex = new RegExp($(this).val(), 'i');
                    $('.searchable tr').hide();
                    $('.searchable tr').filter(function() {
                        return rex.test($(this).text());
                    }).show();
                })
            }(jQuery));
        });
        $("#searchclear").click(function() {
            $("#layerfilter").val('');
            $('.searchable tr').show();
        });

        //var options = {
        //bounds: searchBounds
        //};
        /*var searchinput = document.getElementById("searchbox");
        var autocomplete = new google.maps.places.Autocomplete(searchinput, options);
        var leafMarker;
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
              input.className = 'notfound';
              return;
            }
            if(leafMarker){
                map.removeLayer(leafMarker);
            }
            var leafLocation = new L.LatLng(place.geometry.location.lat(),place.geometry.location.lng())
            leafMarker = L.marker(leafLocation, {title: place.formatted_address}).bindPopup(place.formatted_address).addTo(map);
            map.setView(leafLocation, 18)
        }); */
    }

    /* Larger screens get expanded layer control and visible sidebar */
    /*  El bottom del menu se expande automaticamente si el valor es Collapsed = false, si es True es por default  */
    if (document.body.clientWidth <= 767) {
        var isCollapsed = true;
    } else {
        var isCollapsed = true; // antes fue false, se cambio a True para que se oculte
    }



    var layerControl = L.control.layers(baseLayers, {}, {
        collapsed: isCollapsed
    }).addTo(map);




    /* añadir capas de movimiento migration layer */


    /* fin de capas de movimiento migration layer */

    /*Creación de ToolBar y EasyButton en el mapa */


    /* Fin de Creación de ToolBar y Easy Button


    /* Highlight search box text on click */
    $("#searchbox").click(function() {
        $(this).select();
    });
    $("#loading").hide();



    function showCoordinates (e) {
        alert( e.latlng );
    }

    function centerMap (e) {
        map.panTo(e.latlng);
    }

    function zoomIn (e) {
        map.zoomIn();
    }

    function zoomOut (e) {
        map.zoomOut();
    }


    function street_view(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;


        window.open('https://www.google.com/maps?q&layer=c&cbll='+lat+','+lng+'&cbp=12,0,0,0,0&z=18','','width=430,height=650,left=0,top=0,location=no');
    }

    function googlesatelite(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        map.panTo(e.latlng);
        window.open('https://www.google.com.pe/maps/@'+lat+','+lng+',376m/data=!3m1!1e3','','width=430,height=650,left=0,top=0');

    }


    function wazer(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        map.panTo(e.latlng);
        window.open ('https://www.waze.com/es-419/livemap?zoom=18&lat='+lat+'&lon='+lng+'','','width=800,height=650,left=0,top=0');

    }


    function mapagoogle1(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        map.panTo(e.latlng);
        window.open('https://www.google.com.pe/maps/@'+lat+','+lng+',18z','','width=430,height=650,left=0,top=0');
    }

    function googletrafico(e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        window.open('https://www.google.com.pe/maps/@'+lat+','+lng+',18z/data=!5m1!1e1','','width=550,height=650,left=0,top=0');
    }


/*Agregando Overlay*/
    /*generando los graficos*/
   var paneles = L.tileLayer('http://200.121.128.47:8080/geoserver/gwc/service/tms/1.0.0/cchannel:paneles@EPSG:900913@png/{z}/{x}/{y}.png8',{

        tms: true,
        minZoom:1,
        maxZoom: 22
    });
 var poligonos = L.tileLayer('http://200.121.128.47:8080/geoserver/gwc/service/tms/1.0.0/cchannel:poligonos@EPSG:900913@png/{z}/{x}/{y}.png8',{

        tms: true,
        minZoom:1,
        maxZoom: 22
    });

    var overlays = {

        "Cobertura":poligonos,
        "Paneles": paneles
    };

    L.control.layers({}, overlays, {  collapsed: false }).addTo(map);

    map.addLayer(paneles)
    window.map=map;

}



