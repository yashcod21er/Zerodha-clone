const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");


dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URI || "mongodb+srv://yashhogade6_db_user:[EMAIL_ADDRESS]";

app.use(cors());
app.use(express.json());
mongoose.connect(uri).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.log(error);
})
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("Client connected to Socket.IO:", socket.id);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});