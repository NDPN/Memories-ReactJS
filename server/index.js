const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const env = require("dotenv");
const path = require("path");
const socket = require("socket.io");

// Route
const authRoute = require("./router/auth");
const Post = require("./router/post");
const Img = require("./router/img");
const Message = require("./router/message");

const app = express();
// Setup environment
env.config();

const URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gxa4b.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "300mb" }));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api", authRoute);
app.use("/api", Post);
app.use("/api", Img);
app.use("/api", Message);

// Header
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Setup db
const server = app.listen(process.env.PORT);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db");
    server;
  })
  .catch((err) => console.log("err", err));

// Setup socket io
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    if (data.to !== "") {
      socket
        .to(onlineUsers.get(data.users[1]))
        .emit("msg-receive", data.users);
    }
  });
});

