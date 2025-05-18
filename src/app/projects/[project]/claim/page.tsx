"use client";

import { use } from 'react';
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from 'react';

async function load(
    project: string,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setData: React.Dispatch<React.SetStateAction<string[] | null>>) {
    const response = await fetch('/projects/' + project + '/claim/data', {
        method: 'GET',
        cache: 'no-store',
    });
    const data = await response.json();
    if (!response.ok) {
        setError(data.error || 'An unexpected error occurred.');
    } else {
        setData(data.dirs);
    }
}

export default function ClaimDiscs({
    params
}: {
    params: Promise<{
        project: string;
}>}) {
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string[] | null >(null);
    const router = useRouter(); // Initialize the router

    const { project } = use(params);
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData)
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        const response = await fetch('/projects/' + project + '/claim/data', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.error || 'An unexpected error occurred.');
        } else {
            router.push('/'); // Redirect to the home page
        }
    }
    useEffect(() => {
        load(project, setError, setData);
    }, [project]);
    return (
        <main>
            <div>{project}</div>
            <form onSubmit={submit}>
                {data && data.map((item) => (
                    <div key={item}>
                        <input type="checkbox" id={item} name={item} value={item} />
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))}
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Claim</button>
            </form>
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </main>
    )
}