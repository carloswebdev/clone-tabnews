import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

test("environment should be test", () => {
  expect(process.env.NODE_ENV).toBe("test");
});

test("environment variable POSTGRES_HOST should be defined", () => {
  expect(process.env.POSTGRES_HOST).toBeDefined();
});

test("environment variable POSTGRES_PORT should be defined", () => {
  expect(process.env.POSTGRES_PORT).toBeDefined();
});

test("environment variable POSTGRES_USER should be defined", () => {
  expect(process.env.POSTGRES_USER).toBeDefined();
});

test("environment variable POSTGRES_DB should be defined", () => {
  expect(process.env.POSTGRES_DB).toBeDefined();
});

test("environment variable POSTGRES_PASSWORD should be defined", () => {
  expect(process.env.POSTGRES_PASSWORD).toBeDefined();
});

test("environment variable DATABASE_URL should be defined", () => {
  expect(process.env.DATABASE_URL).toBeDefined();
});
