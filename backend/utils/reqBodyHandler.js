class RequestBodyHandler {
  constructor(reqBodyStr) {
    this.reqBodyStr = reqBodyStr;
  }

  userFilter() {
    const wantedReqBodyStrKeys = ["name", "email", "avatar"];

    const passedReqBodyStrKeys = Object.keys(this.reqBodyStr);

    passedReqBodyStrKeys.forEach((key) => {
      if (!wantedReqBodyStrKeys.includes(key)) {
        delete this.reqBodyStr[key];
      }
    });

    return this;
  }

  reviewFilter() {
    const wantedReqBodyStrKeys = ["rating", "comment"];

    const passedReqBodyStrKeys = Object.keys(this.reqBodyStr);

    passedReqBodyStrKeys.forEach((key) => {
      if (!wantedReqBodyStrKeys.includes(key)) {
        delete this.reqBodyStr[key];
      }
    });

    return this;
  }

  orderFilter() {
    const wantedReqBodyStrKeys = [
      "cartItems",
      "shippingAddress",
      "paymentMethod",
      "paymentDetails",
      "tax",
      "shippingCost",
      "totalCost",
    ];

    const passedReqBodyStrKeys = Object.keys(this.reqBodyStr);

    passedReqBodyStrKeys.forEach((key) => {
      if (!wantedReqBodyStrKeys.includes(key)) {
        delete this.reqBodyStr[key];
      }
    });

    return this;
  }
}

module.exports = RequestBodyHandler;
