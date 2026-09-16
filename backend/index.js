const express = require("express");
const http = require("http");
const cors = require("cors");
const socketio = require("socket.io");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const dns = require("dns");

const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGODB_URI || "mongodb+srv://yashhogade6_db_user:[EMAIL_ADDRESS]";

// Security headers
app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false,
}));

// CORS with credentials support
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost:")) {
            callback(null, true);
        } else {
            callback(null, true);
        }
    },
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// Authentication routes
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

// Twelve Data Real-time Market Routes
const marketRoutes = require("./routes/marketRoutes");
const marketService = require("./services/marketService");
app.use("/market", marketRoutes);
app.use("/api/market", marketRoutes);

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

io.on("connection", (socket) => {
    console.log("Client connected to Socket.IO:", socket.id);
});

// Periodic broadcast of live indices to connected clients
setInterval(async () => {
    try {
        const indices = await marketService.getIndices();
        io.emit("indicesUpdate", indices);
    } catch (e) {
        // ignore periodic broadcast errors
    }
}, 30000);


// app.get('/addHolding', async (req, res) => {
//         let tempHolding=[{
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//     },
//     {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//     },
//     {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//     },
//     {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//     },
//     {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//     },
//     {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//     },
//     {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//     },
//     {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//     },
//     {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//     },
//     {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//     },
//     {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//     },
//     {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//     },
//     {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//     }   
//     ]
//     tempHolding.forEach(element => {
//         let newHoldings = new HoldingsModel(element);
//         newHoldings.save().catch((error) => {
//             console.log(error);
//         });
//         res.send("Done!")
//     });
//     res.json({ message: "Holdings added successfully" });
// })

// app.get(['/addPositions', '/addPosition'], async (req, res) => {
//     let tempPositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];

//     tempPositions.forEach((item) => {
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });
//         newPosition.save().catch((error) => {
//             console.log(error);
//         });
//     });

//     res.send("Done!");
// });
app.get('/allHoldings', async (req, res) => {
    try {
        const holdings = await HoldingsModel.find();
        res.json(holdings);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching holdings" });
    }
})
app.get('/allPositions', async (req, res) => {
    try {
        const positions = await PositionsModel.find();
        res.json(positions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching positions" });
    }   
})
app.post('/newOrder', async (req, res) => {
    try {
        const { name, qty, price, mode, product, orderType, userid } = req.body;
        const quantity = Number(qty);
        const stockPrice = Number(price);

        if (mode === "SELL") {
            // Check whether the stock is bought and exists in holdings
            const holding = await HoldingsModel.findOne({ name });

            if (!holding || holding.qty < quantity) {
                const availableQty = holding ? holding.qty : 0;
                return res.status(400).json({
                    success: false,
                    message: `Cannot sell ${name}: You have not bought this stock or have insufficient quantity (Holdings: ${availableQty}, Selling: ${quantity}).`
                });
            }

            // Deduct sold quantity from holdings
            holding.qty -= quantity;
            if (holding.qty <= 0) {
                await HoldingsModel.findByIdAndDelete(holding._id);
            } else {
                await holding.save();
            }
        } else if (mode === "BUY") {
            // If buying, update or add to holdings
            const existingHolding = await HoldingsModel.findOne({ name });
            if (existingHolding) {
                const totalCost = (existingHolding.avg * existingHolding.qty) + (stockPrice * quantity);
                existingHolding.qty += quantity;
                existingHolding.avg = totalCost / existingHolding.qty;
                existingHolding.price = stockPrice;
                await existingHolding.save();
            } else {
                const newHolding = new HoldingsModel({
                    name,
                    qty: quantity,
                    avg: stockPrice,
                    price: stockPrice,
                    net: "+0.00%",
                    day: "+0.00%",
                });
                await newHolding.save();
            }
        }

        let newOrder = new OrdersModel({
            name,
            qty: quantity,
            price: stockPrice,
            mode: mode || "BUY",
            product: product || "CNC",
            orderType: orderType || "MARKET",
            userid,
        });

        await newOrder.save();
        res.status(201).json({
            success: true,
            message: `${mode || "BUY"} order confirmed for ${name}!`,
            order: newOrder
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error processing order", error });
    }
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(uri)
        .then(() => {
            console.log("Database connected");
        })
        .catch((error) => {
            console.log(error);
        });
});