process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");

let gummies = { name: "gummybears", price: 1.99 };

beforeEach(function () {
  items.push(gummies);
});

afterEach(function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of shopping list items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual([gummies]);
  });
});

describe("GET /items/:name", function () {
  test("Get a certain shopping list item", async function () {
    const resp = await request(app).get(`/items/${gummies.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual(gummies);
  });
});

describe("/POST /items", function () {
  test("Add a shopping list item to the list", async function () {
    let bananas = { name: "banana", price: 0.79 };
    const resp = await request(app).post("/items").send(bananas);
    expect(resp.statusCode).toBe(201);

    expect(resp.body).toEqual(bananas);
  });
});

describe("/PATCH /items/:name", function () {
  test("Change a shopping list item", async function () {
    const resp = await request(app)
      .patch(`/items/${gummies.name}`)
      .send({ name: "chocolate", price: 5.99 });
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ name: "chocolate", price: 5.99 });
  });
  test("Error for shopping list item cannot be found", async function () {
    const res = await request(app).patch(`/items/skittles`);
    expect(res.statusCode).toBe(404);
  });
});

describe("/DELETE /items/:name", function () {
  test("Delete a shopping list item", async function () {
    const resp = await request(app).delete(`/items/${gummies.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ message: "deleted" });
  });
});
