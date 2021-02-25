const express = require("express");
const app = express();
const connectDatabase = require("./config/databaseconnect");
const path = require("path");
connectDatabase();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json({ extended: true }));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  //static file
  app.use(express.static("client/build"));

  //serve the static file

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.htmlh"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
