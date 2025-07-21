import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;
    let status = 200;
    let response;
    try {
        const client = createClient();
        await client.projectAbandon({ project: project });
        response = NextResponse.json({}, { status });
    }
    catch (err) {
        status = 400;
        if (err instanceof ConnectError) {
            response = NextResponse.json({ error: err.message }, { status });
        } else {
            console.log(err);
            response = NextResponse.json({ error: "Unknown error" }, { status });
        }
    }
    console.log(`[API] POST /projects/[project]/abandon status=${status}`);
    return response;
}