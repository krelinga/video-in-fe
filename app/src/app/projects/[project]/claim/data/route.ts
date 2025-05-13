import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = createClient();
        const reply = await client.unclaimedDiscDirList({});
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

export async function POST(req: Request, { params }: { params: { project: string } }) {
    const data = await req.formData();
    const discs = Array<string>();
    for (const [key] of data.entries()) {
        discs.push(key);
    }
    const project = params.project;

    try {
        const client = createClient();
        await client.projectAssignDiskDirs({ project: project, dirs: discs });
        return NextResponse.json({ success: true });
    }
    catch (err) {
        if (err instanceof ConnectError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        console.log(err);
        return NextResponse.json({ error: "Unknown error" }, { status: 400 });
    }
}