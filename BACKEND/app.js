const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const app = express();

const routes = require("./app/routes");
const ApiError = require("./app/api-error");
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// Routes init;
routes(app);

// Xử lý phản hồi 404
app.use((req, res, next) => {
  //Code ở đây sẽ chạy khi không có route nào được định nghĩa khớp với yêu cầu.
  // Gọi next() để chuyển sang middleware xử lý lỗi
  return next(new ApiError(404, "Resourse not found"));
});

// Xác định middleware xử lý lỗi cuối cùng, sau các lời gọi app.use() và routes khác
app.use((err, req, res, next) => {
  // Middleware xử lý lỗi tập trung
  // Trong các đoạn code xử lý lỗi ở các route. Gọi next(err) sẽ chuyển về middleware xử lý lỗi này
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});


app.use("/", (req, res) => {
  res.json({ message: "Welcome to technology product store" });
});


module.exports = app;
