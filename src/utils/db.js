const mongoose = require("mongoose");

const dbConnect = mongoose.createConnection(
  "mongodb+srv://prasad:12345@prasad.qao3nk3.mongodb.net/prasad?retryWrites=true&w=majority"
);

dbConnect.on("connected", () => {
  console.log("DB connected");
});
dbConnect.on("error", () => {
  console.log("error");
});
module.exports = dbConnect;
