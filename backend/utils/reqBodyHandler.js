class RequestBodyHandler {
  constructor(reqBodyStr) {
    this.reqBodyStr = reqBodyStr;
  }

  filter() {
    const wantedReqBodyStrKeys = ["name", "email", "avatar"];

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
