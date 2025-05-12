import { NextRequest, NextResponse } from 'next/server';
import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const name = data.get('name') as string;
  console.log("got here")

  try {
    const client = createClient();
    await client.projectNew({ name: name });
    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof ConnectError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 400 });
  }
}
