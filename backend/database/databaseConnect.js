const mongoose = require("mongoose");

const connectDatabase = () => {
  const productDatabaseUrl = process.env.MONGODB_URL;

  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(productDatabaseUrl, connectionParams).then((data) => {
    console.log(`Database Connected: ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
