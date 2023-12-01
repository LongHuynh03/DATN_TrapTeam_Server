var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");

//import các model, thứ tự rất quan trọng
require("./components/province/ProvinceModel");
require("./components/location/LocationModel");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//API
const provinceAPIRouter = require("./routes/api/ProvinceAPI");
const locationAPIRouter = require("./routes/api/LocationAPI");

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
