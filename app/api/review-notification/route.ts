type ReviewNotification = {
  companyName: string;
  role: string;
  employmentStatus: "Current employee" | "Former employee";
  rating: number;
  pros: string;
  cons: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isReviewNotification(value: unknown): value is ReviewNotification {
  if (!isRecord(value)) return false;

  return (
    typeof value.companyName === "string" &&
    value.companyName.trim().length > 0 &&
    value.companyName.length <= 100 &&
    typeof value.role === "string" &&
    value.role.trim().length > 0 &&
    value.role.length <= 80 &&
    (value.employmentStatus === "Current employee" ||
      value.employmentStatus === "Former employee") &&
    typeof value.rating === "number" &&
    Number.isInteger(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5 &&
    typeof value.pros === "string" &&
    value.pros.trim().length >= 10 &&
    value.pros.length <= 800 &&
    typeof value.cons === "string" &&
    value.cons.trim().length >= 10 &&
    value.cons.length <= 800
  );
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: "Invalid JSON request body." },
      { status: 400 },
    );
  }

  if (!isReviewNotification(payload)) {
    return Response.json({ error: "Invalid review details." }, { status: 400 });
  }

  const apiKey = process.env.SEND_LIB;
  if (!apiKey) {
    console.error(
      "SEND_LIB is not configured; review notification was not sent.",
    );
    return Response.json(
      { error: "Review notification email is not configured." },
      { status: 503 },
    );
  }

  const html = [
    "<h1>New workplace review submitted</h1>",
    `<p><strong>Company:</strong> ${escapeHtml(payload.companyName)}</p>`,
    `<p><strong>Role:</strong> ${escapeHtml(payload.role)}</p>`,
    `<p><strong>Employment status:</strong> ${escapeHtml(payload.employmentStatus)}</p>`,
    `<p><strong>Rating:</strong> ${payload.rating} out of 5</p>`,
    `<p><strong>What worked well?</strong><br>${escapeHtml(payload.pros).replace(/\r?\n/g, "<br>")}</p>`,
    `<p><strong>What could have been better?</strong><br>${escapeHtml(payload.cons).replace(/\r?\n/g, "<br>")}</p>`,
  ].join("\n");

  try {
    const response = await fetch("https://sendliberty.com/api/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "gisthq.team@gmail.com",
        to: "oluwamayowadan@gmail.com",
        subject: "New workplace review submitted",
        html,
      }),
    });

    if (!response.ok) {
      const providerError = (await response.text()).slice(0, 500);
      console.error(
        "SendLiberty rejected review notification.",
        response.status,
        providerError,
      );
      return Response.json(
        { error: "Review notification email could not be sent." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Could not send review notification email.", error);
    return Response.json(
      { error: "Review notification email could not be sent." },
      { status: 502 },
    );
  }

  return Response.json({ sent: true });
}
