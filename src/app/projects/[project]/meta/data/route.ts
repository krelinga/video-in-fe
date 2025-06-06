import createClient from '@/app/lib/client';
import { NextResponse } from 'next/server';
import { ConnectError } from '@connectrpc/connect';

export async function GET(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;

    try {
        const client = createClient();
        const response = await client.projectGet({ project: project });
        if (response.searchResult) {
            return NextResponse.json({results: [response.searchResult]});
        }
        return NextResponse.json({ results: [] });
    }
    catch (err) {
        if (err instanceof ConnectError) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        }
        console.log(err);
        return NextResponse.json({ error: "Unknown error" }, { status: 400 });
    }
}

export async function POST(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const data = await request.formData();
    const { project } = await params;

    try {
        const client = createClient();
        await client.projectSetMetadata({ project: project, id: data.get('tmdbId')?.toString() });
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