global.__base = __dirname;

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/api.json');
const path = require('path');
const apiV1_0 = require(path.resolve(global.__base, 'routes/v1.0/index'));
// const locations = require(path.resolve(global.__base, 'routes/v1.0/locations');
// const announcements = require('./routes/v1.0/announcements');
// const garbage = require('./routes/v1.0/garbage');

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/v1.0/', apiV1_0);
// app.use('/locations', locations);
// app.use('/announcements', announcements);
// app.use('/garbage', garbage);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500).send(err);
});

module.exports = app;
