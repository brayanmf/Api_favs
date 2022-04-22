const supertest = require("supertest");
const app = require("../app");
const server = require("../index");
const mongoose = require("mongoose");
const User = require("./user.model");
const api = supertest(app);
const initialUser = [
  { email: "test1", password: "test11" },
  {
    email: "test2",
    password: "test222",
  },
];

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
  if (!response) {
    await api
      .post("/api/user/login")
      .send({
        email: "test3",
        password: "test333",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }
});
afterAll(() => {
  mongoose.connection.close();
  server.close();
});
