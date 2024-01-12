const http = require("http");
const connectDb = require("./db/db");
require("dotenv").config();
const app = require("./app/app");

const port = process.env.PORT || 5000;

const server = http.createServer(app);

connectDb("mongodb://127.0.0.1:27017/attendance-db")
  .then(() => {
    console.log(`Database Connected`);
    server.listen(port, () => {
      console.log("Lintening on port ", port);
    });
  })
  .catch((e) => {
    console.log("Error Occured in mongodb ", e);
  });
