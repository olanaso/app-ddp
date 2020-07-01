
require('dotenv').config()
const app = require('express')();
var http = require('http').Server(app);
//const socketIoPort = 2222;
//var io = require('socket.io')(process.env.PORT_SOCKETIO);
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./server/routes');
//const realtime = require('./server/realtime');
const session = require('express-session');

/*const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);*/
//var swagger = require('swagger-express');
//websocket : existingSocketIoInstance,



/*Activando el uso de CORS*/
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

/*app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
}));*/

/*Anadiendo web pack a la aplicacion*/
/*app.use(
    require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath
    })
);

app.use(require("webpack-hot-middleware")(compiler));*/


/**/
//realtime(io);

/*Para tener el estado de servidor*/
/*app.use(require('express-status-monitor')({
    title: 'SEGURIDAD CIUDADA MDAACD',
    path: '/estado-servidor',
   
}));*/

/*Uso de las sessiones*/
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));


//app.use(cors());

// Log requests to the console.
app.use(logger('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)


app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))



require('./config').aplicationConfig(app);
/*
app.use(swagger.init(app, {
    apiVersion: '1.0',
    swaggerVersion: '1.0',
    basePath: 'http://localhost:3000',
    swaggerURL: '/documentacion',
    swaggerJSON: '/api-docs.json',
    swaggerUI: './public/swagger/',
    apis: ['./server/routes/gps.js']
}));
*/

/*Direccionamiento de las paginas web*/


/*Direccionamiento de la API*/
router(app);
/*Para el Real Time*/

 let port=3002
http.listen(port,function () {

    console.log('listening on *:'+port);
    console.log('IP run *:'+port);

});
