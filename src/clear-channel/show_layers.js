module.exports={

    generate_layers
}


function generate_layers(){
    $.ajax({
        type: "GET",
        url: owsurl + "?SERVICE=WMS&request=getcapabilities",
        dataType: "xml",
        success: parseXml
    });
}
function parseXml(xml)
{
    var layerIndex = 0
    $(xml).find("Layer").find("Layer").each(function()
    {
        var title = $(this).find("Title").first().text();
        var name = $(this).find("Name").first().text();

        //Check for layer groups
        var patt = new RegExp("Group");
        var res = patt.test(title);
        if(!res) {
            featureLayers.push(name)
            featureLayersName.push(title)
            $("#feature-list tbody").append('<tr class="feature-row" id="'+layerIndex+'"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">'+title+'</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
            layerIndex = layerIndex + 1;
        }
    });

  //Check for initial layers.
    var layersString = QueryString.layers;
    if(layersString) {
        var layersList = layersString.split(',')
        for (i = 0; i < layersList.length; i++) {
            addLayer(layersList[i].replace('/',''));
        }
    }

//Ok, got to get the searching working...
    $(document).ready(function () {
        (function ($) {
            $('#layerfilter').keyup(function () {
                var rex = new RegExp($(this).val(), 'i');
                $('.searchable tr').hide();
                $('.searchable tr').filter(function () {
                    return rex.test($(this).text());
                }).show();
            })
        }(jQuery));
    });
    $("#searchclear").click(function(){
        $("#layerfilter").val('');
        $('.searchable tr').show();
    });


}

