const consultas = require('../controllers').consultas;
const {uploadarchivoShptoDXF,uploadarchivoDXF} = require('../middlewares/uploads');

module.exports = (app) => {
    /*==========GET=========*/
	app.get('/api/capasddp', consultas.getTablesGeom);
	app.get('/api/campounicos', consultas.campounicos);
	app.get('/api/listaProyectos', consultas.listarProyectos);
	app.get('/api/listarProyectos2', consultas.listarProyectos2);
	app.get('/api/listGeovisores', consultas.listGeovisores);
	app.get('/api/listwms', consultas.listwms);

    /*==========POST=========*/
	app.post('/api/geocoder', consultas.geocoder);
	app.post('/api/generategeojson', consultas.generatoGeojson);
    app.post('/api/generategeojson2', consultas.generatoGeojson2);
    app.post('/api/layerIntersections', consultas.layerIntersections);
    app.post('/api/layerCorte', consultas.layerCorte);
    app.post('/api/ObtenerProyecto', consultas.ObtenerProyecto);
	app.post('/api/validarwhere', consultas.validarWhere);
    app.post('/api/ShapetoDXF',uploadarchivoShptoDXF, consultas.ShapetoDXF);
   // app.post('/api/DXFtoGeojson',uploadarchivoShptoDXF, consultas.ShapetoDXF);
    app.post('/api/GeojsontoDXF', consultas.GeojsontoDXF);
    app.post('/api/GeojsontoDXFUTM', consultas.GeojsontoDXFUTM);
    app.post('/api/GeojsontoDXFUTM2', consultas.GeojsontoDXFUTM2);
    app.post('/api/detectarEPGSShape',uploadarchivoShptoDXF, consultas.detectarEPGSShape);
    app.post('/api/DXFtoGeojson',uploadarchivoDXF, consultas.DXFtoGeojson);
    app.post('/api/SHPtoGeojson',uploadarchivoShptoDXF, consultas.ShapetoGeojson);
    app.post('/api/ubicarPuntos',consultas.ubicarPuntos);
    /*==========PUT=========*/

    /*==========DELETE=========*/

};