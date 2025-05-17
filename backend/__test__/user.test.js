const request = require("supertest");
const app = require("../app");
const User = require("../models/UserSchema");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: ".env.test" });

describe("User Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@user.com",
        password: "test123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).toHaveProperty("_id");
    });

    it("should return error for duplicate email", async () => {
      const response = await request(app).post("/api/auth/register").send({
        name: "Test User",
        email: "test@user.com",
        password: "test123",
      });

      expect(response.statusCode).toBe(409);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      // Tạo user test
      const password = await bcrypt.hash("test123", 10);
      await User.create({
        name: "Login Test",
        email: "login@test.com",
        password: password,
      });

      const response = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "test123",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.user).not.toHaveProperty("password");
    });

    it("should return error for invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "login@test.com",
        password: "wrongpassword",
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe("POST /api/auth/setAvatar/:id", () => {
    it("should set user avatar", async () => {
      const user = await User.create({
        name: "Avatar Test",
        email: "avatar@test.com",
        password: "test123",
      });

      const response = await request(app)
        .post(`/api/auth/setAvatar/${user._id}`)
        .send({
          image: "avatar-image-url",
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.isSet).toBe(true);
    });
  });
});
