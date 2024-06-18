// app/api/process/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { data } = await request.json();
  const result = await processData(data);
  return NextResponse.json({ result });
}

async function processData(data: string): Promise<string> {
  // Simulate some processing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Processed data: ${data}`);
    }, 2000); // 2 seconds delay
  });
}
