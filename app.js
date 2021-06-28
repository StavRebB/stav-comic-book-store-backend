var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser')

var db = require('./config/mongodb.config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var publishersRouter = require('./routes/publishersRoutes');
var rolesRouter = require('./routes/roleRoutes')
var languageRouter = require('./routes/languageRoutes')
var formatRouter = require('./routes/formatRoutes')
var productRouter = require('./routes/productRoutes')
var productImageRouter = require('./routes/productImageRoutes')
var memberRouter = require('./routes/memberRoutes')
var orderRouter = require('./routes/orderRoutes')
var statusRouter = require('./routes/statusRoutes')
var deliveryRouter = require('./routes/deliveryRoutes')
var couponRouter = require('./routes/couponRoutes')
var blogPostRouter = require('./routes/blogPostRoutes')
var commentRouter = require('./routes/commentRoutes')
var storeDetailsRouter = require('./routes/storeDetailsRoutes')
var photoRouter = require('./routes/photoSrcRoutes')
var mailRouter = require('./routes/mailRoutes')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range')
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Range", "*");
  // res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/publishers', publishersRouter);
app.use('/roles', rolesRouter);
app.use('/languages', languageRouter);
app.use('/formats', formatRouter);
app.use('/products', productRouter);
app.use('/productimages', productImageRouter);
app.use('/members', memberRouter);
app.use('/orders', orderRouter);
app.use('/status', statusRouter);
app.use('/deliveries', deliveryRouter);
app.use('/coupons', couponRouter);
app.use('/blogposts', blogPostRouter);
app.use('/comments', commentRouter);
app.use('/storedetails', storeDetailsRouter);
app.use('/photos', photoRouter)
app.use('/mail', mailRouter)

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
