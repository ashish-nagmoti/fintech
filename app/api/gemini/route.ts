import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  // Example usage of GEMINI_API_KEY:
  // const response = await fetch('https://api.gemini.com/v1/chat', { headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }, ... })
  // For now, return a mock response
  return NextResponse.json({
    reply: `Gemini says: ${prompt.split('').reverse().join('')}` // mock: reverse prompt
  });
}
