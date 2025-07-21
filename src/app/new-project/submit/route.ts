import { NextRequest, NextResponse } from 'next/server';
import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const name = data.get('name') as string;
  let status = 200;
  let response;
  try {
    const client = createClient();
    await client.projectNew({ name: name });
    response = NextResponse.json({ success: true });
  } catch (err) {
    status = 400;
    if (err instanceof ConnectError) {
      response = NextResponse.json({ error: err.message }, { status });
    } else {
      response = NextResponse.json({ error: "Unknown error" }, { status });
    }
  }
  console.log(`[API] POST /new-project/submit status=${status}`);
  return response;
}
