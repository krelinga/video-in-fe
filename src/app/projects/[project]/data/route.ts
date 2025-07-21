import createClient from '@/app/lib/client';
import { ConnectError } from '@connectrpc/connect';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;
    let status = 200;
    let response;
    try {
        const client = createClient();
        const reply = await client.projectGet({project: project});
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
    console.log(`[API] GET /projects/[project]/data status=${status}`);
    return response;
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
    let status = 200;
    let response;
    try {
        const client = createClient();
        await client.projectCategorizeFiles({ project: project, files: files });
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
    console.log(`[API] POST /projects/[project]/data status=${status}`);
    return response;
}