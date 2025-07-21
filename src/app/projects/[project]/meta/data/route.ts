import createClient from '@/app/lib/client';
import { NextResponse } from 'next/server';
import { ConnectError } from '@connectrpc/connect';

export async function GET(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const { project } = await params;
    let status = 200;
    let response;
    try {
        const client = createClient();
        const apiResponse = await client.projectGet({ project: project });
        if (apiResponse.searchResult) {
            response = NextResponse.json({results: [apiResponse.searchResult]});
        } else {
            response = NextResponse.json({ results: [] });
        }
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
    console.log(`[API] GET /projects/[project]/meta/data status=${status}`);
    return response;
}

export async function POST(request: Request, { params }: { params: Promise<{ project: string }> }) {
    const data = await request.formData();
    const { project } = await params;
    let status = 200;
    let response;
    try {
        const client = createClient();
        await client.projectSetMetadata({ project: project, id: data.get('tmdbId')?.toString() });
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
    console.log(`[API] POST /projects/[project]/meta/data status=${status}`);
    return response;
}