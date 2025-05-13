"use client";

import { use } from 'react';
import { useState, useEffect } from 'react';
import { ProjectDisc } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb';

export default function ProjectPage({ params }: { params: Promise<{ project: string }> }) {
    const { project } = use(params);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ProjectDisc[] | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    useEffect(() => {
        const load = async() => {
            const response = await fetch('/projects/' + project + '/data', {
                method: 'GET',
                cache: 'no-store',
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || 'An unexpected error occurred.');
            }
            else {
                setData(data.discs);
            }
        }
        load();
    }, [project]);

    return (
        <main>
            <h1>Project: {project}</h1>
            {error && <div>Error: {error}</div>}
            <form onSubmit={onSubmit}>
            {data && data.map((item) => (
                <div key={item.disc}>
                    <h2>Disc: {item.disc}</h2>
                    {item.thumbs.map((thumb) => (
                        <div key={thumb}>{thumb}</div>
                    ))}
                </div>
            ))}
            </form>
        </main>
    );
};