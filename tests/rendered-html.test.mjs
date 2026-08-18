import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/", init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { ...init, headers: { accept: "text/html", ...(init.headers ?? {}) } }),
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
  assert.match(html, /Northline Atelier/);
  assert.match(html, /northline-preview\.png/);
  assert.match(html, /Luma Dental/);
  assert.match(html, /luma-preview\.png/);
  assert.match(html, /Your website could be here/);
  assert.match(html, /Mike \/ Web \| Freelance Web Designer in Ottawa/);
  assert.match(html, /icon\.svg/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /Website design, redesign and development/);
});

test("publishes crawl rules and a sitemap", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Disallow: \/api\//);
  assert.match(robots, /Sitemap: https:\/\/mikekanyatsi\.vercel\.app\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(await sitemapResponse.text(), /https:\/\/mikekanyatsi\.vercel\.app/);
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
  assert.match(html, /\$500–\$1k CAD/);
  assert.match(html, />18:00</);
  assert.match(html, /mikekanyatsi-portfolio\.vercel\.app/);
  assert.match(html, /linkedin\.com\/in\/mikekanyatsi/);
  assert.match(html, /MIKE/);
  assert.match(html, /Send my request/);
  assert.match(html, /sent securely to Mike/i);
});

test("request endpoint fails safely when email delivery is not configured", async () => {
  const response = await render("/api/request", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Test" }),
  });

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "Email delivery is not configured." });
});
