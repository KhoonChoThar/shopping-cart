module.exports = function Cart(cart) {
  this.items = cart.items || {};
  this.totalItems = cart.totalItems || 0;
  this.totalPrice = cart.totalPrice || 0;

  this.add = function (item, id) {
    var cartItem = this.items[id];
    if (!cartItem) {
      cartItem = this.items[id] = { item: item, quantity: 0, price: 0 };
    }
    cartItem.quantity++;
    var originalPrice = cartItem.item.price * cartItem.quantity;
    if (
      cartItem.item.id == "2" ||
      cartItem.item.id == "5" ||
      cartItem.item.id == "7"
    ) {
      if (cartItem.quantity !== 1) {
        if (cartItem.quantity % 2 == 0) {
          cartItem.price = cartItem.item.price * cartItem.quantity * 0.95;
        } else {
          cartItem.price =
            cartItem.item.price * (cartItem.quantity - 1) * 0.95 +
            cartItem.item.price;
        }
      } else {
        cartItem.price = cartItem.item.price;
      }
    } else {
      cartItem.price = cartItem.item.price * cartItem.quantity;
    }
    var minusTotal = originalPrice - cartItem.price;
    this.totalItems++;
    this.totalPrice += cartItem.item.price;
    this.totalPrice -= minusTotal;
  };
  this.remove = function (id) {
    this.totalItems -= this.items[id].quantity;
    this.totalPrice -= this.items[id].price;
    delete this.items[id];
  };

  this.getItems = function () {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
