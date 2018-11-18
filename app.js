var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/upload');
var uploadDetectRouter = require('./routes/uploadDetect');
var visionRouter = require('./routes/vision');
var metaRouter = require('./routes/meta');
var filesRouter = require('./routes/files');
var predictionRouter = require('./routes/prediction');

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:8081',
    'http://google.egith.net',
    'http://markinformation-inc.xyz'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

var app = express();

app.use(cors(corsOptions));

// view engine setup
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vision', visionRouter);
app.use('/meta', metaRouter);
app.use('/files', filesRouter);
app.use('/upload/image', uploadRouter);
app.use('/upload/detect/image', uploadDetectRouter)
app.use('/prediction', predictionRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
