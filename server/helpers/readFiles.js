const path = require('path');
const extract = require('extract-zip');
const fs = require('fs');

/*Permite crear una carpeta*/
function createFolder(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

//Funcion que descomprime el zip en un ruta determianda
function descomprimirZipShape(pathZip, ExtracPathZip) {
    return new Promise(function(resolve, reject) {
        extract(pathZip, {dir: ExtracPathZip}, function (err) {
            resolve (true);
        })
    });
}

var walkSync = function (dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};


const deleteFolderRecursive = function(pathFolder) {
    if (fs.existsSync(pathFolder)) {
        fs.readdirSync(pathFolder).forEach((file, index) => {
            const curPath = path.join(pathFolder, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(pathFolder);
    }
};

const deleteFile= function(pathFile){
    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }
}


const writeFile= function(pathFilename,contentFile){
   fs.writeFileSync(pathFilename,contentFile,'utf8', function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

   
}

function readFileAsSync(pathFilename){
    new Promise((resolve, reject)=>{
        fs.readFile(pathFilename, "utf8", function(err, data) {
            if (err) throw err;
            resolve(data);
        });
    });
}

const readFile= async function(path,filename){
    path = require('path'),
        filePath = path.join(__dirname, '../middlewares/shape_to_dxf_processing/');

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        } else {
            console.log(err);
        }
    });
}



async function getShapefromDirectori(dirname) {
    var listfiles = [];
    await walkSync(dirname, listfiles);
    return listfiles.find(x => x.split('.').pop().toUpperCase() == 'SHP');
}

module.exports = {getShapefromDirectori, createFolder, descomprimirZipShape,deleteFolderRecursive,writeFile,deleteFile,readFile}
