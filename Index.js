const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require('socket.io')(http);
const path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

const users = {};

io.on("connection", (socket) => {
    console.log("Hello");
    socket.on("join", (name) => {
        users[socket.id] = name;
        console.log(`${name} has joined`);
        socket.broadcast.emit("userJoined", name);
    });
    socket.on("send", (data) => {
        socket.broadcast.emit("recv", { names: users[socket.id], mess: data });
    });
});

const port = process.env.PORT || 5000;

http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
