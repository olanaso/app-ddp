const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
var {createFolder,descomprimirZipShape,getShapefromDirectori}=require('../helpers/readFiles')
var gdalConfig = require(`${__dirname}/../config/config.json`)["gdalProcess"];


function generateFinalName(originalfilename) {
    let momentName = moment().unix()
    let filename = `${momentName}.${originalfilename.split('.').pop()}`;
    let foldername = momentName;
    return {filename, foldername}
}

async function uploadarchivoShptoDXF(req, res, next) {
    /*Busco si existe la carpeta para el procesmiento del shape*/
    var dir = __dirname + gdalConfig.path_shape_to_dxf_processing;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: async function (req, file, cb) {
            
            let fileuploadname = generateFinalName(file.originalname);
            req.filenamesaved = fileuploadname.filename;
            req.originalname = file.originalname;
            req.dxfoupout=fileuploadname.foldername+'.dxf';
            req.pathZip = __dirname + gdalConfig.path_shape_to_dxf_processing +'/' + fileuploadname.filename;
            req.ExtracPathZip =  __dirname + gdalConfig.path_shape_to_dxf_processing + '/' + fileuploadname.foldername;
            /*CREAR CARPETA */
            req.folderTempExtrac=__dirname + gdalConfig.path_shape_to_dxf_processing + '/' + fileuploadname.foldername;
            await createFolder(__dirname + gdalConfig.path_shape_to_dxf_processing + '/' + fileuploadname.foldername);
            /*Descomprimir zip del zipeado subido*/
            cb(null, fileuploadname.filename);
        }
    })

    var upload = multer({storage: storage}).array("myfile", 1)
    await upload(req, res,async function (err) {
        /*Descomprimiendo el archivo del zip subido*/
      await descomprimirZipShape(req.pathZip, req.ExtracPathZip);
       req.pathshape=   await getShapefromDirectori(req.ExtracPathZip+'/');
        req.denominacion = req.body.denominacion;
        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }
        next();
    });
}


async function uploadarchivoDXF(req, res, next) {
    /*Busco si existe la carpeta para el procesmiento del shape*/
    var dir = __dirname + gdalConfig.path_shape_to_dxf_processing;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dir);
        },
        filename: async function (req, file, cb) {
            //genenra el nombre en funcion al momento actual
            let fileuploadname = generateFinalName(file.originalname);
            req.folderDXF= __dirname + gdalConfig.path_shape_to_dxf_processing +'/';
            req.dxfSaved=fileuploadname.foldername+'.dxf';
          
            req.pathdxfSaved = __dirname + gdalConfig.path_shape_to_dxf_processing +'/' + req.dxfSaved;

            req.geojsonsaved=fileuploadname.foldername+'.geojson';
            req.pathgeojsonsaved = __dirname + gdalConfig.path_shape_to_dxf_processing +'/' + req.geojsonsaved;

            cb(null, fileuploadname.filename);
        }
    })
    var upload = multer({storage: storage}).array("myfile", 1)
    
    await upload(req, res,async function (err) {
        req.denominacion = req.body.denominacion;
        if (err) {
            return next({
                error: err,
                message: "OCURRIO UN ERROR LA SUBIR EL ARCHIVO",
                status: 401
            });
        }
        next();
    });
}

module.exports = {
    uploadarchivoShptoDXF,uploadarchivoDXF
}
