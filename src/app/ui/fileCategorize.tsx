"use client";

import { useState, useEffect } from 'react';
import { ProjectDisc } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb';
import Image from 'next/image';

// Custom Select Component for better Safari compatibility
function CustomSelect({ 
    name, 
    defaultValue, 
    options 
}: { 
    id: string; 
    name: string; 
    defaultValue: string; 
    options: { value: string; label: string }[] 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || '';

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <input type="hidden" name={name} value={selectedValue} />
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="mt-1 block w-full px-3 py-2 text-left rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-600"
                style={{
                    backgroundColor: 'var(--select-bg, white)',
                    color: 'var(--select-text, black)',
                    borderColor: 'var(--select-border, rgb(209 213 219))',
                    borderStyle: 'solid',
                    borderWidth: '1px'
                }}
            >
                <span>{selectedLabel}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            {isOpen && (
                <ul 
                    className="absolute z-10 mt-1 w-full rounded border shadow-lg max-h-60 overflow-auto"
                    style={{
                        backgroundColor: 'var(--select-bg, white)',
                        borderColor: 'var(--select-border, rgb(209 213 219))',
                        borderStyle: 'solid',
                        borderWidth: '1px'
                    }}
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            style={{
                                color: 'var(--select-text, black)'
                            }}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

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
            <h1 className="text-2xl font-bold mb-4">Project: {decodeURIComponent(project)}</h1>
            {error && <div className="text-red-500 mb-4">Error: {error}</div>}
            <form onSubmit={onSubmit} className="space-y-6">
            {data && data.map((item) => (
                <div key={item.disc} className="border p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Disc: {item.disc}</h2>
                    <div className="text-700 mb-4">Thumb State: {item.thumbState}</div>
                    {item.discFiles.map((discFile) => (
                        <div key={discFile.file} className="mb-4 border p-4 rounded shadow-md">
                            <div className="text-800 font-medium">File: {discFile.file}</div>
                            <div className="text-600">Size: {discFile.humanSize}</div>
                            <div className="text-600">Duration: {discFile.humanDuration}</div>
                            <div className="text-600">Chapters: {discFile.numChapters}</div>
                            <label className="block mt-2">
                                <span className="text-600">Category:</span>
                                <CustomSelect
                                    id={`${item.disc}/${discFile.file}`}
                                    name={`${item.disc}/${discFile.file}`}
                                    defaultValue={discFile.category}
                                    options={[
                                        { value: "", label: "" },
                                        { value: "main_title", label: "Main Title" },
                                        { value: "extra", label: "Extra" },
                                        { value: "trash", label: "Trash" }
                                    ]}
                                />
                            </label>
                            <Image
                                src={`${imgUrlPrefix}/thumbs/${project}/${item.disc}/${discFile.thumb}`} 
                                alt="Thumbnail" 
                                className="mt-4 w-32 h-32 object-cover border rounded"
                                width={300}
                                height={300}
                                unoptimized
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