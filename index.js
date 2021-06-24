const express = require("express");

// App setup
const app = express();
const server = app.listen(4000, function () {
  console.log("Listening to Port 4000");
});

// Static files
app.use(express.static("public"));
