import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the portfolio and live project previews", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Mike Kanyatsi/);
  assert.match(html, /Clear websites/);
  assert.match(html, /EmpowerGen Africa/);
  assert.match(html, /empowergen-preview\.png/);
  assert.match(html, /Professional portfolio/);
  assert.match(html, /pro-portfolio-preview\.png/);
  assert.match(html, /Your website could be here/);
});

test("renders the complete project request and Teams preference flow", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /mailto:mmkanyatsi@gmail\.com/);
  assert.match(html, /name="service"/);
  assert.match(html, /name="budget"/);
  assert.match(html, /name="message"/);
  assert.match(html, /name="teams"/);
  assert.match(html, /name="date"/);
  assert.match(html, /name="time"/);
  assert.match(html, /Microsoft Teams discovery call/);
  assert.match(html, /preferred call time is confirmed/i);
});
