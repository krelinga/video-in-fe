"use client";

import { use } from 'react';
import { useState, useEffect } from 'react';
import { MovieSearchResponse } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb';

export default function SetMetadataPage({
    params
}: {
    params: Promise<{
        project: string;
    }>
}) {
    const [error, setError] = useState<string | null>(null);
    const [searcResults, setSearchResults] = useState<MovieSearchResponse | null>(null);
    const { project } = use(params);

    const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/data/movie_search', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.error || 'An unexpected error occurred.');
        } else {
            setSearchResults(data);
        }
    }

    return (
        <main>
            <h1 className="text-2xl font-bold mb-4">Set Metadata for {project}</h1>
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            <form onSubmit={onSearch}>
                <input type="text" name="partialTitle" placeholder="Search for a movie..." className="border p-2 rounded" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
            </form>
            {searcResults && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Search Results</h2>
                    {searcResults.results.map((movie) => (
                        <div key={movie.id} className="border p-4 rounded shadow-md mb-4">
                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                            <p>Date: {movie.releaseDate}</p>
                            <p>Overview: {movie.overview}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}