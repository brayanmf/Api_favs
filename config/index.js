const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING_URI)
    .then(() =>
      console.log(
        "Successfully connected to DB <{",
        process.env.DB_CONNECTION_STRING_URI,
        "}>"
      )
    )
    .catch((err) =>
      console.log(
        "Couldn't connect to DB <{",
        process.env.DB_CONNECTION_STRING_URI,
        "}>. Error: ",
        err
      )
    );
};
module.exports = connectDatabase;
