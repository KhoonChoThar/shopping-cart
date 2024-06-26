var express = require("express");
var router = express.Router();

var fs = require("fs");

var Cart = require("../models/cart");
var products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Shopping Cart",
    products: products,
  });
});

router.get("/add/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var product = products.filter(function (item) {
    return item.id == productId;
  });
  cart.add(product[0], productId);
  req.session.cart = cart;
  res.redirect("/");
});

router.get("/cart", function (req, res, next) {
  if (!req.session.cart) {
    return res.render("cart", {
      products: null,
    });
  }
  var cart = new Cart(req.session.cart);
  res.render("cart", {
    products: cart.getItems(),
    totalPrice: cart.totalPrice,
  });
});

router.get("/remove/:id", function (req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect("/cart");
});

router.post("/discount", function (req, res, next) {
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  var isMember = req.body.memberCard === "on"; // Convert string value to boolean
  cart.discount(isMember);
  req.session.cart = cart;
  res.redirect("/cart");
});

module.exports = router;
