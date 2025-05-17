const request = require("supertest");
const app = require("../app");
const Transaction = require("../models/TransactionModel");
const User = require("../models/UserSchema");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.test" });

describe("Transaction Controller", () => {
  let user;
  let authToken;
  let testTransaction;

  beforeAll(async () => {
    // Kết nối database test
    await mongoose.connect(process.env.MONGO_URI);

    // Tạo test user
    user = await User.create({
      name: "Test User",
      email: "test@transaction.com",
      password: "test123",
    });

    // Tạo transaction mẫu
    testTransaction = await Transaction.create({
      title: "Test Transaction",
      amount: 100,
      description: "Test Description",
      date: new Date(),
      category: "Test",
      user: user._id,
      transactionType: "income",
    });
  });

  afterAll(async () => {
    // Xóa dữ liệu test và ngắt kết nối
    await Transaction.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe("POST /api/v1/addTransaction", () => {
    it("should create a new transaction", async () => {
      const response = await request(app).post("/api/v1/addTransaction").send({
        title: "New Transaction",
        amount: 200,
        description: "Test Description",
        date: new Date(),
        category: "Test",
        userId: user._id,
        transactionType: "expense",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("success", true);
    });

    it("should return error for missing fields", async () => {
      const response = await request(app).post("/api/v1/addTransaction").send({
        title: "Incomplete Transaction",
        amount: 200,
      });

      expect(response.statusCode).toBe(408);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/getTransaction", () => {
    it("should get all transactions", async () => {
      const response = await request(app).post("/api/v1/getTransaction").send({
        userId: user._id,
        type: "all",
      });

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body.transactions)).toBe(true);
    });
  });

  describe("POST /api/v1/deleteTransaction/:id", () => {
    it("should delete a transaction", async () => {
      const response = await request(app)
        .post(`/api/v1/deleteTransaction/${testTransaction._id}`)
        .send({
          userId: user._id,
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
