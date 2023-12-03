var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

//import các model, thứ tự rất quan trọng
require("./components/province/ProvinceModel");
require("./components/location/LocationModel");
require("./components/event/EventModel");
require("./components/account/AccountModel");
require("./components/blogs/BlogModel");
require("./components/tour/TourModel");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//API
const provinceAPIRouter = require("./routes/api/ProvinceAPI");
const locationAPIRouter = require("./routes/api/LocationAPI");
const eventAPIRouter = require("./routes/api/EventAPI");
const accountAPIRouter = require("./routes/api/AccountAPI");
const blogAPIRouter = require("./routes/api/BlogAPI");
const tourAPIRouter = require("./routes/api/TourAPI");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
``;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//mongoose
mongoose
  .connect(
    "mongodb+srv://tronglvbd:tronglvbd96@cluster0.lqywgym.mongodb.net/BNBTour?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log(">>>>>>>>>> DB Connected!!!!!!"))
  .catch((err) => console.log(">>>>>>>>> DB Error: ", err));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//API
// http://localhost:3000/api/province
app.use("/api/province", provinceAPIRouter);

// http://localhost:3000/api/location
app.use("/api/location", locationAPIRouter);

// http://localhost:3000/api/event
app.use("/api/event", eventAPIRouter);

// http://localhost:3000/api/account
app.use("/api/account", accountAPIRouter);

// http://localhost:3000/api/blog
app.use("/api/blog", blogAPIRouter);

// http://localhost:3000/api/tour
app.use("/api/tour", tourAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
