const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const configData=require("./config.js");
const users = [
  {
    username: "hai",
    password: "123",
    role: "admin",
  },
  {
    username: "vinh",
    password: "123",
    role: "member",
  },
];
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;
  // Filter user from the users array by username and password
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      configData.accessTokenSecret
    );

    res.json({
      accessToken,
    });
  } else {
    res.send("Username or password incorrect");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
