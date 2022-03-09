const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const errorController = require("./controllers/error.js");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://davast:DAV_ast645830@cluster0.muw3f.mongodb.net/Shop?retryWrites=true&w=majority";

const root = require("./helper/path.js");

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  User.findById("62249ffd84336f61ea0ad1a3")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(shopRoutes);
app.use(authRoutes);
app.use("/admin", adminRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "David",
          email: "davidastyan@gmail.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
