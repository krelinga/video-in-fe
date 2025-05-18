"use client";

import { useState, useEffect } from 'react';
import { ProjectDisc } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb';
import Image from 'next/image';

export default function FileCategorize({ project, imgUrlPrefix }: { project: string, imgUrlPrefix: string, }) {
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<ProjectDisc[] | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch('/projects/' + project + '/data', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.error || 'An unexpected error occurred.');
        }
        else {
            setError("Saved successfully");
            setTimeout(() => {
                setError(null);
            }
            , 2000);
        }
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
            <h1 className="text-2xl font-bold mb-4">Project: {project}</h1>
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            <form onSubmit={onSubmit} className="space-y-6">
            {data && data.map((item) => (
                <div key={item.disc} className="border p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Disc: {item.disc}</h2>
                    <div className="text-gray-700 mb-4">Thumb State: {item.thumbState}</div>
                    {item.discFiles.map((discFile) => (
                        <div key={discFile.file} className="mb-4">
                            <div className="text-gray-800 font-medium">File: {discFile.file}</div>
                            <label className="block mt-2">
                                <span className="text-gray-600">Category:</span>
                                <select 
                                    id={`${item.disc}/${discFile.file}`} 
                                    name={`${item.disc}/${discFile.file}`} 
                                    defaultValue={discFile.category}
                                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value=""></option>
                                    <option value="main_title">Main Title</option>
                                    <option value="extra">Extra</option>
                                    <option value="trash">Trash</option>
                                </select>
                            </label>
                            <Image
                                src={`${imgUrlPrefix}/thumbs/${project}/${item.disc}/${discFile.thumb}`} 
                                alt="Thumbnail" 
                                className="mt-4 w-32 h-32 object-cover border rounded"
                            />
                        </div>
                    ))}
                </div>
            ))}
                <button 
                    type="submit" 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save
                </button>

            </form>
        </main>
    );
};