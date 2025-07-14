// Gemini API client for chat
export async function askGemini(prompt: string) {
  const res = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!res.ok) throw new Error("Gemini API error");
  return res.json();
}
