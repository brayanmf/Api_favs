const supertest = require("supertest");
const app = require("../app");
const server = require("../index");
const mongoose = require("mongoose");
const User = require("./user.model");
const api = supertest(app);
const { initialUser } = require("../helpers/testData");
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
    if (!response.body.sucess) {
      await api
        .get("/api/user/all")
        .expect(200)
        .expect(response.body)
        .toHaveLength(initialUser.length + 1);
    }
  });
});
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
