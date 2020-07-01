
var express=require('express')

const parameterConfig = {

    port: process.env.PORT|| 8000,
    SECRET_TOKEN:'geosolutions'
}

const aplicationConfig=function (app) {

    app.set('view engine', 'ejs');
    //app.engine('ejs',require('ejs').renderFile)
    app.set('views',__dirname+'/views')
    app.use(express.static(__dirname+'/public/'))
}


module.exports={parameterConfig,aplicationConfig}
