import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const lista1 = [];

  response1Body.forEach((item) => {
    lista1.push(item.name);
  }, lista1);

  const consulta1 = await database.query({
    text: "select name, run_on from public.pgmigrations where name in ($1)",
    values: lista1,
  });

  expect(consulta1.rows.length).toBe(response1Body.length);
  expect(consulta1.rows[0].name).toBe(response1Body[0].name);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);

  const response2Body = await response2.json();

  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
