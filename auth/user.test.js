const supertest = require("supertest");
const app = require("../app");
const server = require("../index");
const mongoose = require("mongoose");
const User = require("./user.model");
const api = supertest(app);
const { initialUser } = require("../mock/testData");
describe("test for fav", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUser);
  });
  test("register user", async () => {
    await api
      .post("/api/user/register")
      .send({
        email: "test3",
        password: "test333",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  test("login user", async () => {
    const response = await api.post("/api/user/register").send({
      email: "test3",
      password: "test333",
    });

    if (!response.body.sucess) {
      await api
        .post("/api/user/login")
        .send({
          email: "test3",
          password: "test333",
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .cookies("token");
    }
  });
  test("get all users", async () => {
    const response = await api.post("/api/user/register").send({
      email: "test3",
      password: "test333",
    });
    const token = await response.headers["set-cookie"][0]
      .split(";")[0]
      .slice(6);
    if (!response.body.sucess) {
      await api
        .get("/api/user/all")
        .token("token", token)
        .expect(200)
        .expect(response.body)
        .toHaveLength(initialUser.length + 1);
    }
  });
});

describe("test for fav failed", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUser);
  });
  test("register user fail", async () => {
    await api
      .post("/api/user/register")
      .send({
        email: "test3",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("login user fail", async () => {
    const response = await api.post("/api/user/register").send({
      email: "test3",
      password: "test333",
    });

    if (!response.body.sucess) {
      await api
        .post("/api/user/login")
        .send({
          email: "test3",
          password: "3212212e1",
        })
        .expect(401)
        .expect("Content-Type", /application\/json/);
    }
  });
  test("get all users fail", async () => {
    await api
      .get("/api/user/getAllUsers")
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
