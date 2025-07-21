import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function GET() {
    let status = 200;
    let response;
    try {
        const client = createClient();
        const reply = await client.unclaimedDiscDirList({});
        response = NextResponse.json(reply);
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
    console.log(`[API] GET /projects/[project]/claim/data status=${status}`);
    return response;
}

export async function POST(req: Request, { params }: { params: Promise<{ project: string }> }) {
    const data = await req.formData();
    const { project } = await params;
    const discs = Array<string>();
    for (const [key] of data.entries()) {
        discs.push(key);
    }
    let status = 200;
    let response;
    try {
        const client = createClient();
        await client.projectAssignDiskDirs({ project: project, dirs: discs });
        response = NextResponse.json({ success: true });
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
    console.log(`[API] POST /projects/[project]/claim/data status=${status}`);
    return response;
}