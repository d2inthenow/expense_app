const mongoose = require("mongoose");

// Tắt các cảnh báo không cần thiết
mongoose.set("strictQuery", true);

// Xử lý kết nối MongoDB cho test
module.exports = async () => {
  await mongoose.disconnect();
};
