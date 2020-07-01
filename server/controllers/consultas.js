const sequelize = require('sequelize');
const moment = require('moment');
const puntos_criticos = require('../models').puntos_criticos;
var shell = require('shelljs');
var gdalConfig = require(`${__dirname}/../config/config.json`)["gdalProcess"];
var fs = require('fs');



module.exports = {
    geocoder,
    getTablesGeom,
    generatoGeojson,
    generatoGeojson2,
    campounicos,
    listarProyectos,
    listarProyectos2,
    ObtenerProyecto,
    validarWhere,
    listGeovisores,
    listwms,
    ShapetoDXF,
    GeojsontoDXF,
    GeojsontoDXFUTM,
    GeojsontoDXFUTM2,
    detectarEPGSShape,
    DXFtoGeojson,
    ShapetoGeojson,
    ubicarPuntos,
    layerIntersections,
    layerCorte
};


function geocoder(req, res) {

    puntos_criticos.sequelize.query(`
           select * from gc_geocoder('${req.body.ubigeo}','${req.body.direccion}')
    `, {type: sequelize.QueryTypes.SELECT})
        .then(resultset => {
            res.status(200).json(resultset)
        })
        .catch(error => {
            res.status(400).send(error)
        })

}


function getTablesGeom(req, res) {

    puntos_criticos.sequelize.query(`
   
   select 
   t.f_table_schema,t.f_table_name,capas.nombre,capas.urlwms,capas.color,capas.categoria,capas.entidad,
   (   
        select array_to_json(array_agg(row_to_json(atributes)))
        from(
        select row_to_json(t) from(
        SELECT column_name,data_type FROM information_schema.columns
            where table_name=t.f_table_name
        ) as t
        ) atributes
   ) columnas 
  
   from (
   SELECT distinct  f_table_schema,f_table_name,type  FROM geometry_columns ) t
   
    inner join capas on t.f_table_name=capas.capa

   `, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}


async function generatoGeojson(req, res) {
    console.log(req.body.geometry);
    let geojson = await JSON.stringify(req.body.geometry);
    console.log(geojson)
    let arraycapas = req.body.capas;
    let array_sql = []
    for (let table of arraycapas) {
        let sql = `
        SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
        ) geojson,'${table.name}' capa,'${table.nombre_capa}' nombre_capa
        FROM (
        SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         gid,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs) - 'gid' - 'geom'
        ) AS feature
        FROM (
        
        SELECT a.*,(select color from capas where capa='${table.name}' limit 1) color FROM ${table.name} a inner join (
             SELECT  ST_GeomFromGeoJSON('${geojson}')::geography::geometry geom) b on 
       ST_Intersects(b.geom,a.geom)
       ${table.where ? table.where : ''} 
        ) inputs) features
            `;

        array_sql.push(sql)
    }


    let finalsql = array_sql.join(' union all ')


    console.log(finalsql);

    puntos_criticos.sequelize.query(finalsql, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}

async function generatoGeojson2(req, res) {
    let geojson = await JSON.stringify(req.body.geometry);
    let arraycapas = req.body.capas;
    let array_sql = []
    for (let table of arraycapas) {
        let sql = `
        SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
        ) geojson,'${table.name}' capa,'${table.nombre_capa}' nombre_capa
        FROM (
        SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         gid,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs) - 'geom'
        ) AS feature
        FROM (
        
        SELECT a.*,(

    select row_to_json(t) from(
    select  color, weight, opacity, dasharray, fillopacity, fillcolor,tipo_poligono  from capas where capa='${table.name}' limit 1

        ) as t

        ) color FROM ${table.name} a inner join (
             SELECT  ST_GeomFromGeoJSON('${geojson}')::geography::geometry geom) b on 
       ST_Intersects(b.geom,a.geom)
       ${table.where ? table.where : ''} 
        ) inputs) features
          


            `;
        array_sql.push(sql)
    }


    let finalsql = array_sql.join(' union all ')

    puntos_criticos.sequelize.query(finalsql, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}




function layerIntersections(req, res) {
    
    let sql=`
    
    --Creando la tabla temporal para la crecion filtro
    create temp table tmp_tbl_filtrante as 
    SELECT a.* FROM ${req.body.capasFiltra} a inner join (
    SELECT  ST_GeomFromGeoJSON('${req.body.geometry}')::geography::geometry geom) b on 
    ST_Intersects(b.geom,a.geom);
    
    --Creando la tabla temporal de la tabla destino
    create temp table tmp_tbl_geojson as 
    select a.*,(select row_to_json(t) from(
    select  color, weight, opacity, dasharray, fillopacity, fillcolor,tipo_poligono  from capas where nombre='${req.body.nombre_capa}' limit 1
    ) as t ) color from ${req.body.capaMostrar} a 
    inner join tmp_tbl_filtrante b on ST_Intersects(b.geom,a.geom);

    --Convirtiendo a un geojson la tabla filtrada
    SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(features.feature)
    ) geojson,'${req.body.capaMostrar.replace('"public".','').replace('"','').replace('"','')}' capa,'${req.body.nombre_capa}' nombre_capa
    FROM (
    SELECT jsonb_build_object(
    'type',       'Feature',
    'id',         gid,
    'geometry',   ST_AsGeoJSON(geom)::jsonb,
    'properties', to_jsonb(inputs) - 'geom'
    ) AS feature
    FROM (
    select * from tmp_tbl_geojson
    ) inputs) features;
	   
    --Eliminando las tablas 
    drop table tmp_tbl_filtrante;
    drop table tmp_tbl_geojson;
    `;
    
    console.log(sql)

    puntos_criticos.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}



function layerCorte(req, res) {

    let sql=`
  
  --Creando la tabla temporal para la crecion filtro
    create temp table tmp_tbl_filtrante as 
    SELECT a.*,ST_Intersection(a.geom,b.geom ) geom2 FROM ${req.body.capasFiltra} a inner join (
    SELECT  ST_Force2D(ST_GeomFromGeoJSON('${req.body.geometry}')::geography::geometry) geom) 
    b on 
    ST_Intersects(b.geom,a.geom);
    
    --Creando la tabla temporal de la tabla destino
    create temp table tmp_tbl_geojson as 
  with temp as 
(
  select   b.gid, ST_Intersection(a.geom, b.geom) as geom
  from     tmp_tbl_filtrante   b 
	join ${req.body.capaMostrar}  a on st_intersects(a.geom, b.geom)
  group by b.gid,a.geom, b.geom
) 
select ROW_NUMBER() OVER(order by b.gid) gid
,st_intersection (b.geom,coalesce(t.geom, 'GEOMETRYCOLLECTION EMPTY'::geometry)) as newgeom,
(select row_to_json(t) from(
      select  color, weight, opacity, dasharray, fillopacity, fillcolor,tipo_poligono  from capas where nombre='${req.body.nombre_capa}' limit 1
    ) as t ) color
from tmp_tbl_filtrante b 
left join temp t on b.gid = t.gid;
	

    --Convirtiendo a un geojson la tabla filtrada
    SELECT jsonb_build_object(
    'type',     'FeatureCollection',
    'features', jsonb_agg(features.feature)
    ) geojson,'${req.body.capaMostrar.replace('"public".','').replace('"','').replace('"','')}' capa,'${req.body.nombre_capa}' nombre_capa
    FROM (
    SELECT jsonb_build_object(
    'type',       'Feature',
    'id',         gid,
    'geometry',   ST_AsGeoJSON(newgeom)::jsonb,
    'properties', to_jsonb(inputs) - 'geom' - 'geom2'- 'newgeom'
    ) AS feature
    FROM (
    select * from tmp_tbl_geojson
    ) inputs) features;
	   
    --Eliminando las tablas 
    drop table tmp_tbl_filtrante;
    drop table tmp_tbl_geojson;


              
  
  
    `;

    console.log(sql)

    puntos_criticos.sequelize.query(sql, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}



function campounicos(req, res) {

    puntos_criticos.sequelize.query(`
   
 select distinct ${req.query.campo} from ${req.query.table}

   `, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}

function validarWhere(req, res) {

    puntos_criticos.sequelize.query(`
   
 select true valido from ${req.body.table} where ${req.body.where} limit 1

   `, {type: sequelize.QueryTypes.SELECT})
        .then(listTables => {

            res.status(200).json(listTables[0])
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })

}

function listarProyectos(req, res) {
    puntos_criticos.sequelize.query(` 
select *,ST_X(ST_Centroid(geom)) x,ST_Y(ST_Centroid(geom)) y from public.pmd

        `, {type: sequelize.QueryTypes.SELECT})
        .then(list => {

            res.status(200).json(list)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}



function listarProyectos2(req, res) {
    puntos_criticos.sequelize.query(` 
    
        select pmd.gid,pmd.denominaci,pmd.layer,pmd.ortofoto
        ,pmd.nombreproyecto,pmd.categoria
        ,ST_X(ST_Centroid(geom)) x,ST_Y(ST_Centroid(geom)) y 
        from public.pmd
        order by categoria,gid

        `, {type: sequelize.QueryTypes.SELECT})
        .then(list => {

            res.status(200).json(list)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}

function ObtenerProyecto(req, res) {
    puntos_criticos.sequelize.query(` 

        select 
        pmd.gid
        ,pmd.denominaci
        ,pmd.layer
        ,pmd.ortofoto
        ,pmd.nombreproyecto
        ,pmd.categoria
        ,pmd.geom
        ,ST_X(ST_Centroid(geom)) x
        ,ST_Y(ST_Centroid(geom)) y 
        from public.pmd
        where pmd.gid=${req.body.gid}
        order by categoria,gid

        `, {type: sequelize.QueryTypes.SELECT})
        .then(result => {
            res.status(200).json(result[0])
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}


function listGeovisores(req, res) {
    puntos_criticos.sequelize.query(` 
SELECT * FROM help.geovisores

        `, {type: sequelize.QueryTypes.SELECT})
        .then(list => {

            res.status(200).json(list)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}


function listwms(req, res) {
    puntos_criticos.sequelize.query(` 
select * from capaswms

        `, {type: sequelize.QueryTypes.SELECT})
        .then(list => {

            res.status(200).json(list)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}


var {deleteFolderRecursive, writeFile, deleteFile, createFolder, readFile} = require('../helpers/readFiles')

async function ShapetoDXF(req, res) {

    try {
       // shell.cd(gdalConfig.path_gdal);
        let path_process = req.ExtracPathZip;
        let file_input_name = req.pathshape;
        let file_output_name = req.folderTempExtrac + '/' + req.dxfoupout;
        let epgs_input = req.body.epgrs_input;
        let epgs_output = req.body.epgrs_output;

        let comandogr = `ogr2ogr -f DXF "${file_output_name}" -mapFieldType Integer64=Real "${file_input_name}"  -nlt LINESTRING -s_srs EPSG:${epgs_input} -T_SRS EPSG:${epgs_output}`

        console.log(comandogr);
        if (shell.exec(comandogr).code !== 0) {
            shell.echo('Ocurrio un error');
            shell.exit(1);
        }
        let base64DXF = base64_encode(file_output_name);
        await deleteFile(req.pathZip);
        await deleteFolderRecursive(req.folderTempExtrac);
        return res.status(200).send(base64DXF);
    } catch (e) {
        return res.status(400).send(e);
    }


}


async function DXFtoGeojson(req, res) {

    try {

      //  shell.cd(gdalConfig.path_gdal);

        let epgs_input = req.body.epgrs_input;
        let epgs_output = req.body.epgrs_output;

        let comandogr = `ogr2ogr -f GEOJSON "${req.pathgeojsonsaved}" -mapFieldType Integer64=Real "${req.pathdxfSaved}"   -s_srs EPSG:${epgs_input} -T_SRS EPSG:${epgs_output}`
        console.log(comandogr);
        if (shell.exec(comandogr).code !== 0) {
            shell.echo('Ocurrio un error');
            shell.exit(1);
        }

        let base64DXF = base64_encode(req.pathgeojsonsaved);
        await deleteFile(req.pathdxfSaved);
        await deleteFile(req.pathgeojsonsaved);
        return res.status(200).send(Buffer.from(base64DXF, 'base64').toString('ascii'));

    } catch (e) {
        return res.status(400).send(e);
    }


}


async function detectarEPGSShape(req, res) {

   //  shell.cd(gdalConfig.path_gdal);
    let file_input_name = req.pathshape;

    let comandogr = `ogrinfo -ro -so -al "${file_input_name}" `
    let stdout = shell.exec(comandogr, {silent: true}).stdout;
    console.log(stdout)
    var epgs = ""
    var encontrado = false;
    var tipoGeometria = "";

    if (stdout.includes('4326')) {
        epgs = "EPSG:4326";
        encontrado = true
    }
    if (stdout.includes('32717')) {
        epgs = "EPSG:32717";
        encontrado = true
    }
    if (stdout.includes('32718')) {
        epgs = "EPSG:32718";
        encontrado = true;

    }
    if (stdout.includes('32719')) {
        epgs = "EPSG:32719";
        encontrado = true;
    }
    if (stdout.includes('4248')) {
        epgs = "EPSG:4248";
        encontrado = true;
    }
    if (stdout.includes('24877')) {
        epgs = "EPSG:24877";
        encontrado = true;
    }
    if (stdout.includes('24878')) {
        epgs = "EPSG:24878";
        encontrado = true;
    }
    if (stdout.includes('24879')) {
        epgs = "EPSG:24879";
        encontrado = true
    }


    if (stdout.includes('Polygon')) {
        tipoGeometria = "Polygon";
        encontrado = true
    }

    if (stdout.includes('Line String')) {
        tipoGeometria = "Line String";
        encontrado = true
    }
    if (stdout.includes('Point')) {
        tipoGeometria = "Point";
        encontrado = true
    }


    //let base64DXF = base64_encode(file_output_name);
    await deleteFile(req.pathZip);
    await deleteFolderRecursive(req.folderTempExtrac);
    return res.status(200).send({encontrado, epgs, tipoGeometria});
}


// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return bitmap.toString('base64');
}


async function GeojsontoDXF(req, res) {
    
    //shell.cd(gdalConfig.path_gdal);
    var nameFolder = moment().unix();
    var pathFolderProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder;
    var pathFileProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.geojson';
    var pathoutputDXF = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.dxf';
    await createFolder(pathFolderProcessing);
    await writeFile(pathFileProcessing, JSON.stringify(req.body.geojson));
    // shell.cd(gdalConfig.path_gdal);

    let path_process = pathFolderProcessing;
    let file_input_name = pathFileProcessing;
    let file_output_name = pathoutputDXF;
    let epgs_input = req.body.epgrs_input;
    let epgs_output = req.body.epgrs_output;

    let comandogr = `ogr2ogr -f DXF -skipfailures "${file_output_name}" "${file_input_name}" -nlt LINESTRING -s_srs EPSG:${epgs_input} -T_SRS EPSG:${epgs_output} `;

    console.log(comandogr);
    if (shell.exec(comandogr).code !== 0) {
        shell.echo('Ocurrio un error');
        shell.exit(1);
    }

    let base64DXF = base64_encode(pathoutputDXF);
    setTimeout(function (e) {
        deleteFolderRecursive(pathFolderProcessing);
        console.log('eliminado')
    },5000)
 
    return res.status(200).send(base64DXF);


}


async function GeojsontoDXFUTM(req, res) {
   // shell.cd(gdalConfig.path_gdal);
    var nameFolder = moment().unix();
    var pathFolderProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder;
    var pathFileProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.geojson';
    var pathoutputDXF = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.dxf';
    await createFolder(pathFolderProcessing);
    await writeFile(pathFileProcessing, JSON.stringify(req.body.geojson));
    // shell.cd(gdalConfig.path_gdal);

    let path_process = pathFolderProcessing;
    let file_input_name = pathFileProcessing;
    let file_output_name = pathoutputDXF;
    let utm_output = req.body.utm_output;
    let epgrs_input = req.body.epgrs_input;

    let comandogr = `ogr2ogr -f DXF -skipfailures "${file_output_name}" "${file_input_name}"  -nlt LINESTRING  -s_srs "${epgrs_input}"  -T_SRS "${utm_output}"`;
    console.log(comandogr)
    /*  let base64DXF=null
      if (shell.exec(comandogr).code !== 0) {
          shell.echo('Ocurrio un error');
          shell.exit(1);
      } else {
          base64DXF = base64_encode(pathoutputDXF);
          // deleteFolderRecursive(pathFolderProcessing);
  
      }
      return res.status(200).send(base64DXF);*/

    console.log(comandogr);
    if (shell.exec(comandogr).code !== 0) {
        shell.echo('Ocurrio un error');
        shell.exit(1);
    }

    let base64DXF = base64_encode(pathoutputDXF);
    deleteFolderRecursive(pathFolderProcessing);
    return res.status(200).send(base64DXF);

}


async function GeojsontoDXFUTM2(req, res) {
 //   shell.cd(gdalConfig.path_gdal);
    var nameFolder = moment().unix();
    var pathFolderProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder;
    var pathFileProcessing = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.geojson';
    var pathoutputDXF = __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + nameFolder + '/' + nameFolder + '.dxf';
    await createFolder(pathFolderProcessing);
    await writeFile(pathFileProcessing, JSON.stringify(req.body.geojson));
    // shell.cd(gdalConfig.path_gdal);

    let path_process = pathFolderProcessing;
    let file_input_name = pathFileProcessing;
    let file_output_name = pathoutputDXF;
    let utm_output = req.body.utm_output;
    let epgrs_input = req.body.epgrs_input;

    let comandogr = `ogr2ogr -f DXF -skipfailures "${file_output_name}" "${file_input_name}"  -nlt LINESTRING  -s_srs ${epgrs_input}  -T_SRS ${utm_output} `;
    //console.log(comandogr)
    let base64DXF = null
    if (shell.exec(comandogr).code !== 0) {
        shell.echo('Ocurrio un error');
        // shell.exit(1);
    } else {
        base64DXF = base64_encode(pathoutputDXF);
        // deleteFolderRecursive(pathFolderProcessing);

    }
    return res.status(200).send(base64DXF);
}


/*Convertir un shape a geojson*/
async function ShapetoGeojson(req, res) {

    try {

      //   shell.cd(gdalConfig.path_gdal);
        let path_process = req.ExtracPathZip;
        let file_input_name = req.pathshape;
        let file_output_name = req.folderTempExtrac + '/' + req.dxfoupout;
        let epgs_input = req.body.epgrs_input;
        let epgs_output = req.body.epgrs_output;

        let comandogr = `ogr2ogr -f GEOJSON "${file_output_name}" -mapFieldType Integer64=Real "${file_input_name}"  -s_srs EPSG:${epgs_input} -T_SRS EPSG:${epgs_output}`

        console.log(comandogr);
        if (shell.exec(comandogr).code !== 0) {
            shell.echo('Ocurrio un error');
            shell.exit(1);
        }
        let base64DXF = base64_encode(file_output_name);
        await deleteFile(req.pathZip);
        await deleteFolderRecursive(req.folderTempExtrac);
        return res.status(200).send(Buffer.from(base64DXF, 'base64').toString('ascii'));


    } catch (e) {
        return res.status(400).send(e);
    }


}


function ubicarPuntos(req, res) {
    puntos_criticos.sequelize.query(` 
        SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
        ) geojson,'${req.body.tabla}' capa,'${req.body.tabla}' nombre_capa
        FROM (
        SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         gid,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs) - 'gid' - 'geom'
        ) AS feature
        FROM (
        SELECT ROW_NUMBER() OVER(order by '1') gid,  geom   
        from ${req.body.tabla}  ${req.body.query}
        ) inputs) features
        `, {type: sequelize.QueryTypes.SELECT})
        .then(list => {

            res.status(200).json(list)
        })
        .catch(error => {
            console.log(error)
            res.status(400).send(error)
        })
}
