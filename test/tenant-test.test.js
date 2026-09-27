import supertest from "supertest";
import web from "../src/application/web.js";
import bcrypt from "bcrypt";
import { createTestUser, removeTestUser, getTestUser } from "./test-util.js";

describe("POST /auth/register/tenant", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new tenant", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "0817551122",
      password: "rahasia",
      confirmPassword: "rahasia",
    });
    expect(result.status).toBe(201);
    expect(result.body.tenant.user.name).toBe("test");
    expect(result.body.tenant.user.password).toBeUndefined();
  });

  it("Should reject if tenant name is invalid", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "",
      email: "test@gmail.com",
      phone: "0817551122",
      password: "rahasia",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Tenant name is required");
  });

  it("Should reject if email is empty", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "",
      phone: "0817551122",
      password: "rahasia",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Tenant email is required");
  });

  it("Should reject if phone is empty", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "",
      password: "rahasia",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Tenant phone number is required");
  });

  it("Should reject if password is empty", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "08179222",
      password: "",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Tenant password is required");
  });

  it("Should reject if confirm password did not match", async () => {
    const result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "08179222",
      password: "rahasia",
      confirmPassword: "bukanrahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Password didn't match");
  });

  it("Should reject if email already used", async () => {
    let result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "08179222",
      password: "rahasia",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(201);
    expect(result.body.tenant.user.name).toBe("test");
    expect(result.body.tenant.user.password).toBeUndefined();

    result = await supertest(web).post("/auth/register/tenant").send({
      name: "test2",
      email: "test@gmail.com",
      phone: "08179122",
      password: "bukanrahasia",
      confirmPassword: "bukanrahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Email is already registered");
  });

  it("Should reject if phone already used", async () => {
    let result = await supertest(web).post("/auth/register/tenant").send({
      name: "test",
      email: "test@gmail.com",
      phone: "08179222",
      password: "rahasia",
      confirmPassword: "rahasia",
    });

    expect(result.status).toBe(201);
    expect(result.body.tenant.user.name).toBe("test");
    expect(result.body.tenant.user.password).toBeUndefined();

    result = await supertest(web).post("/auth/register/tenant").send({
      name: "test2",
      email: "test2@gmail.com",
      phone: "08179222",
      password: "bukanrahasia",
      confirmPassword: "bukanrahasia",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBe("Phone number already used");
  });
});
