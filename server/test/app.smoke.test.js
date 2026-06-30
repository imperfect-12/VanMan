import assert from "node:assert/strict";
import test, { after } from "node:test";
import { createApp } from "../app.js";

const app = createApp({ clientUrl: "http://localhost:5173" });
const server = await new Promise((resolve) => {
  const instance = app.listen(0, "127.0.0.1", () => resolve(instance));
});
const { port } = server.address();
const baseUrl = `http://127.0.0.1:${port}`;

after(
  () =>
    new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    }),
);

test("health endpoint reports that the process is alive", async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});

test("readiness endpoint reports unavailable without a database connection", async () => {
  const response = await fetch(`${baseUrl}/ready`);

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { status: "not_ready" });
});
