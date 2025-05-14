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

export async function POST(req: Request, { params }: { params: { project: string } }) {
    const data = await req.formData();
    const files = Array<{disc: string, file: string, category: string}>();
    for (const [key, value] of data.entries()) {
        const [keyDisc, keyFile] = key.split('/', 2);
        files.push({
            disc: keyDisc,
            file: keyFile,
            category: value.toString(),
        });
    }
    const project = params.project;

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