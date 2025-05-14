"use client";

import { use } from 'react';
import { useState, useEffect } from 'react';
import { MovieSearchResponse, MovieSearchResult } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb';

function getFirstId(searchResults: MovieSearchResponse): string | undefined {
    if (searchResults.results.length > 0) {
        return searchResults.results[0].id;
    }
    return undefined;
}

function getReleaseYear(item: MovieSearchResult): string {
    const parts = item.releaseDate.split("-");
    if (parts.length == 0) {
        return "";
    }
    return `(${parts[0]})`;
}

function findById(
    searchResults: MovieSearchResponse,
    id: string
): MovieSearchResult | undefined {
    return searchResults.results.find((item) => item.id === id);
}

export default function SetMetadataPage({
    params
}: {
    params: Promise<{
        project: string;
    }>
}) {
    const [error, setError] = useState<string | null>(null);
    const [searcResults, setSearchResults] = useState<MovieSearchResponse | null>(null);
    const [resultDisplay, setResultDisplay] = useState<MovieSearchResult | null>(null);
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
            const firstId = getFirstId(data);
            if (firstId) {
                const result = findById(data, firstId);
                if (result) {
                    setResultDisplay(result);
                }
            }
            setSearchResults(data);
        }
    }

    const onSetMetadata = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const tmdbId = e.target.value;
        const result = findById(searcResults!, tmdbId);
        if (result) {
            setResultDisplay(result);
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
            <form onSubmit={onSetMetadata}>

            </form>
            {searcResults && (
                <form onSubmit={onSetMetadata}>
                    <select
                        id="tmdbId"
                        name="tmdbId"
                        defaultValue={getFirstId(searcResults)}
                        onChange={onChange}
                    >
                        {searcResults.results.map((result) => (
                            <option key={result.id} value={result.id}>
                                {result.title} {getReleaseYear(result)}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Set Metadata</button>
                    {resultDisplay && (
                        <div>
                            <p>{resultDisplay.overview}</p>
                            <img src={resultDisplay.posterUrl} alt={resultDisplay.title} />
                        </div>
                    )}
                </form>
            )}
        </main>
    )
}