const express = require("express");
const env = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const app = express();

env.config();
const port = process.env.PORT || 3001;
const URI = process.env.URI;

connectDB(URI);
const authRouter = require("./routes/authRoute");

// Sử dụng middleware
app.use(cors()); // Cho phép các nguồn gốc khác nhau gửi request
app.use(helmet()); // Bảo mật tiêu đề HTTP
app.use(morgan("dev")); // Ghi lại log request cho mục đích debugging
app.use(bodyParser.json()); // Phân tích JSON từ request body
app.use(bodyParser.urlencoded({ extended: true })); // Phân tích các dữ liệu URL-encoded
app.use("/users", authRouter);

app.get("/hello", (req, res) => {
    res.status(201).json({ message: "Hello " });
});

app.listen(port, () => {
    console.log(`Server is living at port: ${port}`);
    console.log(`http://localhost:${port}/hello`);
});
