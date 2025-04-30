'use client';

export async function apiRequest(endpoint: string, method: string, data?: Record<string, unknown>) {
  const res = await fetch(`http://localhost:8080/api/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Something went wrong");
  }

  return await res.json();
}
