import request, { Request } from "supertest";
import path from "path";

import app from "../index";
import User from "../models/userModel";
import Auth from "../models/authModel";
import mongoose from "mongoose";
import Store from "../models/storeModel";

describe("Service API Tests", () => {
  const imageFilePath = path.join(__dirname, "chicken_chips.jpg");
  let token: string;
  let storeId: string;
  let productId: string;

  afterAll(async () => {
    // Clear the User and Auth collection before each test
    await User.deleteMany({});
    await Auth.deleteMany({});
    await Store.deleteMany({});

    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  // *********************************************************************************
  it("should signup a new store owner", async () => {
    const data = {
      email: "owner@gmail.com",
      firstName: "owner",
      lastName: "Ade",
      password: "Password@442",
      role: "SHOP_OWNER",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(data);

    expect(response.status).toBe(201);
  });

  it("should signup a new user", async () => {
    const data = {
      email: "user@gmail.com",
      firstName: "user",
      lastName: "Tim",
      password: "Password@442",
      role: "USER",
    };

    const response = await request(app)
      .post("/api/v1/auth/signup")
      .set("Accept", "application/json")
      .send(data);

    expect(response.status).toBe(201);
  });

  it("should signin a store owner", async () => {
    const data = {
      email: "owner@gmail.com",
      password: "Password@442",
    };

    const response = await request(app)
      .post("/api/v1/auth/signin")
      .set("Accept", "application/json")
      .send(data);

    expect(response.status).toBe(200);

    // save data
    token = response.body.data.token;
  });

  // *********************************************************************************
  it("should create a store", async () => {
    const data = {
      name: "Chicken Republic",
      country: "Nigeria",
      state: "Lagos",
      address: "2B Abule Egba street",
    };

    const response = await request(app)
      .post("/api/v1/stores")
      .set("authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data);

    expect(response.status).toBe(201);
    // save data
    storeId = response.body.data._id;
  });

  // *********************************************************************************
  it("get a store details", async () => {
    const response = await request(app)
      .get(`/api/v1/stores/${storeId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("get all stores of a store owner", async () => {
    const response = await request(app)
      .get(`/api/v1/stores`)
      .set("authorization", `Bearer ${token}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("update a store details", async () => {
    const data = {
      one_line_pitch: "Chicken for everyone everyday...",
    };

    const response = await request(app)
      .patch(`/api/v1/stores/${storeId}`)
      .set("authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .send(data);

    expect(response.status).toBe(200);
  });

  it("should add product to a store", async () => {
    const response = await request(app)
      .post(`/api/v1/products/add/${storeId}`)
      .set("authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .field("name", "Chicken and chips")
      .field("price", 4500)
      .field("units", 10)
      .attach("image", imageFilePath);

    expect(response.status).toBe(201);
    // save data
    productId = response.body.data._id;
  });

  it("get a product details", async () => {
    const response = await request(app)
      .get(`/api/v1/products/${productId}`)
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });

  it("should edit a product details", async () => {
    const response = await request(app)
      .patch(`/api/v1/products/${productId}`)
      .set("authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .field("units", 15)
      .field("description", "Fine crunchy chickens...")

    expect(response.status).toBe(200);
  });
});
