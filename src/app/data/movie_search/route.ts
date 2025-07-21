import createClient from '@/app/lib/client';
import { NextResponse } from 'next/server';
import { ConnectError } from '@connectrpc/connect';

export async function POST(req: Request) {
    const data = await req.formData();
    const partialTitle = data.get('partialTitle') as string;
    let status = 200;
    let response;
    try {
        const client = createClient();
        const reply = await client.movieSearch({ partialTitle: partialTitle });
        response = NextResponse.json(reply);
    } catch (err) {
        status = 400;
        if (err instanceof ConnectError) {
            response = NextResponse.json({ error: err.message }, { status });
        } else {
            response = NextResponse.json({ error: "Unknown error" }, { status });
        }
    }
    console.log(`[API] POST /data/movie_search status=${status}`);
    return response;
}