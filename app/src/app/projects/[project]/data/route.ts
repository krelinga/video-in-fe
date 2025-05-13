import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { project: string } }) {
    try {
        const client = createClient();
        const reply = await client.projectGet({project: params.project});
        return NextResponse.json(reply);
    }
    catch (err) {
        if (err instanceof ConnectError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        console.log(err);
        return NextResponse.json({ error: "Unknown error" }, { status: 400 });
    }
}