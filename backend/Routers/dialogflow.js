const express = require("express");

const router = express.Router();

router.post("/dialogflow-webhook", (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  let responseText = "Xin lỗi, tôi chưa hiểu ý bạn.";

  switch (intent) {
    case "Chào hỏi":
      responseText =
        "Xin chào! Tôi là trợ lý chi tiêu của bạn. Tôi có thể giúp gì hôm nay?";
      break;
    case "Tôi tiêu tiền vào đâu nhiều nhất":
      responseText = "Theo thống kê, bạn chi nhiều nhất vào mục ăn uống.";
      break;
    case "Tôi đã tiêu bao nhiêu tháng này":
      responseText = "Bạn đã tiêu khoảng 3.200.000 VNĐ trong tháng này.";
      break;
    case "Làm sao để tiết kiệm tiền":
      responseText =
        "Bạn nên đặt ngân sách giới hạn cho từng loại chi tiêu và tránh chi tiêu không cần thiết.";
      break;
    case "Cảnh báo khi chi tiêu quá nhiều":
      responseText =
        "Tôi sẽ gửi cảnh báo khi chi tiêu vượt quá 5.000.000 VNĐ trong tháng.";
      break;
    case "Tôi có thể tiết kiệm bao nhiêu":
      responseText =
        "Nếu bạn giới hạn ăn uống và giải trí, bạn có thể tiết kiệm khoảng 1.000.000 VNĐ mỗi tháng.";
      break;
    case "Nhắc tôi ghi lại chi tiêu hàng ngày":
      responseText = "Tôi sẽ nhắc bạn ghi lại chi tiêu vào lúc 20h mỗi ngày.";
      break;
    case "Thống kê chi tiêu theo tuần":
      responseText =
        "Tuần này bạn đã tiêu 850.000 VNĐ. Mức tiêu cao nhất là vào thứ 6.";
      break;
    case "Gợi ý chi tiêu hợp lý":
      responseText =
        "Hãy ưu tiên các chi tiêu cần thiết như ăn uống, điện nước. Hạn chế mua sắm không cần thiết.";
      break;
    case "Cân bằng chi tiêu và thu nhập":
      responseText =
        "Hãy đảm bảo tổng chi tiêu nhỏ hơn 70% thu nhập hàng tháng.";
      break;
    default:
      responseText = "Tôi chưa có thông tin về yêu cầu đó.";
  }

  res.json({
    fulfillmentText: responseText,
  });
});

module.exports = router;
