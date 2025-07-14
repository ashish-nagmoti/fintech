// Simple API client for finance backend
export async function addTransaction(data: any) {
  const res = await fetch("/api/finance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getTransactions() {
  const res = await fetch("/api/finance");
  return res.json();
}
