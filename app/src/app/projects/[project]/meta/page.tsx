"use client";

import { use } from 'react';

export default function SetMetadataPage({
    params
}: {
    params: Promise<{
        project: string;
    }>
}) {
    const { project } = use(params);
    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Set Metadata for {project}</h1>
        </main>
    )
}