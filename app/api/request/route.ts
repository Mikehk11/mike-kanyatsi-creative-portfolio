const RESEND_ENDPOINT = "https://api.resend.com/emails";

type RequestPayload = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  message?: string;
  teams?: boolean;
  date?: string;
  time?: string;
  companyUrl?: string;
};

const clean = (value: unknown, limit = 500) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return Response.json({ error: "Email delivery is not configured." }, { status: 503 });
  }

  let payload: RequestPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (payload.companyUrl) {
    return Response.json({ sent: true });
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 160);
  const company = clean(payload.company, 140);
  const website = clean(payload.website, 240);
  const service = clean(payload.service, 120);
  const budget = clean(payload.budget, 80);
  const message = clean(payload.message, 2500);
  const date = clean(payload.date, 20) || "Flexible";
  const time = clean(payload.time, 20) || "Flexible";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !company || !service || !budget || !message || !emailPattern.test(email)) {
    return Response.json({ error: "Please complete the required fields." }, { status: 400 });
  }

  const rows = [
    ["Name", name],
    ["Email", email],
    ["Business", company],
    ["Current website", website || "Not provided"],
    ["Project type", service],
    ["Budget", budget],
    ["Teams call", payload.teams ? "Requested" : "Not requested"],
    ["Preferred date", date],
    ["Preferred time", time],
  ];

  const emailResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `website-request-${email}-${Date.now()}`,
    },
    body: JSON.stringify({
      from: "MIKE / WEB <onboarding@resend.dev>",
      to: ["mmkanyatsi@gmail.com"],
      reply_to: email,
      subject: `Website request — ${company}`,
      html: `
        <div style="background:#f5f3ee;padding:32px;font-family:Arial,sans-serif;color:#0a1020">
          <div style="max-width:640px;margin:auto;background:white;border:1px solid #0a1020;padding:32px">
            <p style="font-size:11px;letter-spacing:.14em;color:#5c75ff;font-weight:700">NEW WEBSITE REQUEST</p>
            <h1 style="font-size:36px;line-height:1;margin:18px 0 28px">${escapeHtml(company)}</h1>
            ${rows.map(([label, value]) => `<p style="border-top:1px solid #ddd;padding:12px 0;margin:0"><strong>${label}:</strong> ${escapeHtml(value)}</p>`).join("")}
            <h2 style="font-size:18px;margin-top:30px">Project goals</h2>
            <p style="line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>
          </div>
        </div>`,
    }),
  });

  if (!emailResponse.ok) {
    return Response.json({ error: "The request could not be delivered." }, { status: 502 });
  }

  return Response.json({ sent: true });
}
