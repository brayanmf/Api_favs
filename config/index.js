const mongoose = require("mongoose");
const { DB_CONNECTION_STRING_URI, DB_CONNECTION_STRING_URI_TEST, NODE_ENV } =
  process.env;
const connectionString =
  NODE_ENV === "test"
    ? DB_CONNECTION_STRING_URI_TEST
    : DB_CONNECTION_STRING_URI;
const connectDatabase = () => {
  mongoose
    .connect(connectionString)
    .then(() =>
      console.log("Successfully connected to DB <{", connectionString, "}>")
    )
    .catch((err) =>
      console.log(
        "Couldn't connect to DB <{",
        connectionString,
        "}>. Error: ",
        err
      )
    );
};
module.exports = connectDatabase;
