"use client";

import React, { useState, useEffect } from 'react';

export default function ClaimDiscs({
    params
}: {
    params: {
        project: string;
}}) {
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<string[] | null >(null);

    const load = async () => {
        const response = await fetch('/projects/' + params.project + '/claim/data', {
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
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData)
    }
    useEffect(() => {
        load()
    }, []);
    return (
        <main>
            <div>{params.project}</div>
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