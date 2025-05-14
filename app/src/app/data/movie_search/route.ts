import createClient from '@/app/lib/client';
import { NextResponse } from 'next/server';
import { ConnectError } from '@connectrpc/connect';

export async function POST(req: Request) {
    const data = await req.formData();
    const partialTitle = data.get('partialTitle') as string;
    try {
        const client = createClient();
        const reply = await client.movieSearch({ partialTitle: partialTitle });
        return NextResponse.json(reply);
    } catch (err) {
        if (err instanceof ConnectError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Unknown error" }, { status: 400 });
    }
}