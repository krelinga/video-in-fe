"use client";

import { use } from 'react';

export default function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
    const { project } = use(params);
    return (
        <div>
            <h1>Project: {project}</h1>
        </div>
    );
};