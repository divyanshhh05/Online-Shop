const path = require("path");

const express = require("express");

const csrf = require("csurf");
const expressSession = require("express-session");

const createSessionConfig = require("./config/session");

const db = require("./data/database");

const addcsrftokenmiddleware = require("./middlewares/csrf-token");
const errorhandlermiddleware = require("./middlewares/error-handler");
const checkAuthenticationMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const updateCartItemsMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");

const authRoutes = require("./routes/auth.routes");
const productroutes = require("./routes/products.routes");
const baseroutes = require("./routes/base.route");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.set("view engine", "ejs"); //telling ejs that we want to use ejs for our views
app.set("views", path.join(__dirname, "views")); //folder name for views and path to that folder, dirname is the address of this project in the directory

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false })); //handling data coming to us via forms, i.e. we can work with the incoming data.
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartItemsMiddleware);

app.use(addcsrftokenmiddleware);
app.use(checkAuthenticationMiddleware);

app.use(baseroutes);
app.use(authRoutes);
app.use(productroutes);
app.use("/cart", cartRoutes);
app.use("/orders", protectRoutesMiddleware, ordersRoutes);
app.use("/admin", protectRoutesMiddleware, adminRoutes);

app.use(notFoundMiddleware);

app.use(errorhandlermiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connection failed!");
    console.log(error);
  });
