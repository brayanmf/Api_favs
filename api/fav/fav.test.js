const supertest = require("supertest");
const app = require("../../app");
const server = require("../../index");
const mongoose = require("mongoose");
const Fav = require("./fav.model");
const User = require("./../../auth/user.model");
const { initialFav, initialUser } = require("../../mock/testData");
const api = supertest(app);
describe("test for fav", () => {
  beforeEach(async () => {
    await Fav.deleteMany({});
    await Fav.insertMany(initialFav);
    await User.deleteMany({});
    await User.insertMany(initialUser);
  });
  test("create Fav", async () => {
    const response = await api.post("/api/user/register").send({
      email: "test3",
      password: "test333",
    });
    const token = await response.headers["set-cookie"][0]
      .split(";")[0]
      .slice(6);
    if (!response.body.sucess) {
      const response = await api
        .post("/api/favs")
        .cookies("token", token)
        .send({
          title: "test3",
          link: "test3",
          description: "test3",
          user: "3e9f8f8f8f8f8f8f8f8f8f8",
        })

        .expect(401)
        .expect("Content-Type", /json/);
      expect(response.body.error).toBe("Login to access this resource");
    }
  });
  test("get all Favs", async () => {
    const response = await api.post("/api/user/register").send({
      email: "test6",
      password: "test333",
    });
    const token = await response.headers["set-cookie"][0]
      .split(";")[0]
      .slice(6);
    if (!response.body.sucess) {
      await api
        .get("/api/favs")
        .set("token", token)
        .expect(200)
        .expect(response.body)
        .toHaveLength(initialFav.length);
    }
  });
});

describe("test for fav failed", () => {
  beforeEach(async () => {
    await Fav.deleteMany({});
    await Fav.insertMany(initialFav);
  });
  test("create Fav fail", async () => {
    const response = await api
      .post("/api/favs")
      .send({
        title: "test3",
        link: "test3",
        description: "test3",
        user: "3e9f8f8f8f8f8f8f8f8f8f8",
      })

      .expect(401)
      .expect("Content-Type", /json/);
    expect(response.body.error).toBe("Login to access this resource");
  });
  test("get all Favs fail", async () => {
    await api
      .get("/api/favs")
      .expect(401)
      .expect("Content-Type", /json/)
      .catch((err) => {
        expect(err.response.body.error).toBe("Login to access this resource");
      });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});
