import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function POST(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;
    try {
        const client = createClient();
        await client.projectAbandon({ project: project });
        return NextResponse.json({}, { status: 200 });
    }
    catch (err) {
        if (err instanceof ConnectError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        console.log(err);
        return NextResponse.json({ error: "Unknown error" }, { status: 400 });
    }
}