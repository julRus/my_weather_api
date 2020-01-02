process.env.NODE_ENV = "test";
const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe("/users", () => {
    it("GET:200 - Returns an array of all the users in the database", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).to.be.an("array");
          expect(users.length).to.equal(3);
          expect(users[0]).to.have.keys([
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
            "img_url",
            "joined_at"
          ]);
        });
    });
    it("ERROR:404 - Returns an error message when the given path does not exist", () => {
      const path = "not-a-path";
      return request(app)
        .get(`/api/${path}`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal(`Sorry, path: ${path}, has not been found :(`);
        });
    });
    it("POST:201 - Returns an array of all the users in the database with a newly posted user", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "butter_bridge",
          firstname: "Betty",
          lastname: "Boop",
          email: "bboop24@hotmail.com",
          password: "bBoopBoop$$12",
          img_url: "https://fake_url.com"
        })
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).to.be.an("object");
          expect(user.username).to.equal("butter_bridge");
          expect(user.password).to.equal("bBoopBoop$$12");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET:200 - Returns a user object which matches the given username", () => {
      return request(app)
        .get("/api/users/jessJelly")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).to.be.an("object");
          expect(user).to.have.keys([
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
            "img_url",
            "joined_at"
          ]);
        });
    });
    it("PATCH:201 - Returns a user object with username chnaged to requested username", () => {
      return request(app)
        .patch("/api/users/jessJelly")
        .send()
        .expect(201)
        .then(({ body: { user } }) => {
          expect(user).to.be.an("object");
          expect(user).to.have.keys([
            "username",
            "firstname",
            "lastname",
            "email",
            "password",
            "img_url",
            "joined_at"
          ]);
        });
    });
  });
});
