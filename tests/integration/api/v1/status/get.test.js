test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  if (process.env.NODE_ENV == "development" || "test") {
    expect(responseBody.dependencies.database.version).toEqual("16.0");
  }

  if (process.env.NODE_ENV == "production") {
    expect(responseBody.dependencies.database.version).toEqual("16.6");
  }

  expect(responseBody.dependencies.database.max_connections).toEqual(100);

  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
