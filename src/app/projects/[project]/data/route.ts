import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;
    try {
        const client = createClient();
        const reply = await client.projectGet({project: project});
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

export async function POST(req: Request, { params }: { params: Promise<{ project: string }> }) {
    const data = await req.formData();
    const { project } = await params;
    const files = Array<{disc: string, file: string, category: string}>();
    for (const [key, value] of data.entries()) {
        const [keyDisc, keyFile] = key.split('/', 2);
        files.push({
            disc: keyDisc,
            file: keyFile,
            category: value.toString(),
        });
    }

    try {
        const client = createClient();
        await client.projectCategorizeFiles({ project: project, files: files });
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