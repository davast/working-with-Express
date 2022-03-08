const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const errorController = require("./controllers/error.js");
const User = require("./models/user");

const root = require("./helper/path.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin.js");
const shopRoutes = require("./routes/shop.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(root, "public")));

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
app.use("/admin", adminRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://davast:<PASSWORD>@cluster0.muw3f.mongodb.net/Shop?retryWrites=true&w=majority"
  )
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
