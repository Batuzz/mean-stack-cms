// set up ========================
import express from 'express';
import mongoose from 'mongoose';            // mongoose for mongodb
import morgan from 'morgan';             // log requests to the console (express4)
import bodyParser from 'body-parser';    // pull information from HTML POST (express4)
import methodOverride from 'method-override'; // simulate DELETE and PUT (express4)
import config from './config';
import router from './server/routes/_index.routes';
import session from 'express-session';
import cors from "cors";

const app = express();                               // create our app w/ express

// configuration =================

mongoose.connect(config.database.url, {}, (err) => {
    if(!err) {
        console.log(config.database.connectionEstablishedMessage);
        console.log('[D] Current models list:');
        mongoose.modelNames().forEach((item, index) => {
            console.log('   ' + (index+1) + ' - ' + item);
        })
    }
});

mongoose.connection.on('error', function() {
    console.log(config.database.connectionErrorMessage);
});

app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});

app.use('/', express.static(__dirname + '/public'));

// Body Parser
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.use(morgan('dev'));                                         // log every request to the console

app.use(methodOverride());

app.use('/', router);

app.use(session({
    secret: 'token',
    resave: true,
    saveUninitialized: false
}));




/**
 * Server start
 */
app.listen(config.server.port, function() {
    console.log(config.server.message);
    console.log('[S] Current time: ' + new Date().getHours()+ ":" + new Date().getMinutes())
});