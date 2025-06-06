"use client";

import { ProjectListResponse } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import Link from 'next/link'
import React from 'react';
import { useRouter } from "next/navigation";

export default function ProjectList({ projects }: { projects: ProjectListResponse }) {
    const router = useRouter(); // Initialize the router
    
    const handleAbandonClick = async (project: string) => {
        if (!window.confirm(`Are you sure you want to abandon the project "${project}"?`)) {
            return
        }
        const response = await fetch(`/projects/${project}/abandon`, {
            method: 'POST',
        })
        const data = await response.json();
        if (!response.ok) {
            alert(data.error || 'An unexpected error occurred.');
        }
        else {
            router.push('/'); // Redirect to the home page
        }
    };

    const handlePublishClick = async (project: string) => {
        if (!window.confirm(`Are you sure you want to publish the project "${project}"?`)) {
            return
        }
        const response = await fetch(`/projects/${project}/publish`, {
            method: 'POST',
        })
        const data = await response.json();
        if (!response.ok) {
            alert(data.error || 'An unexpected error occurred.');
        }
        else {
            router.push('/'); // Redirect to the home page
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">Project List</h1>
            <ul className="list-disc">
                {projects.projects.map((name, index) => (
                    <li key={index} className="mb-2">
                        <div className="flex flex-col items-start">
                            <span className="font-semibold">{name}</span>
                            <Link href={`/projects/${name}`} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Categorize
                            </Link>
                            <Link href={`/projects/${name}/claim`} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Claim Discs
                            </Link>
                            <Link href={`/projects/${name}/meta`} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Set Metadata
                            </Link>
                            <button onClick={async () => {handleAbandonClick(name)}} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Abandon
                            </button>
                            <button onClick={async () => {handlePublishClick(name)}} className="mt-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Publish
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            
            <Link href="/new-project" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Add Project
            </Link>
        </div>
    )
}