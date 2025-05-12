"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function NewProject() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize the router

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch('/new-project/submit', {
      method: 'POST',
      body: formData,
    });
    console.log(response)

    const data = await response.json();
    if (!response.ok) {
      setError(data.error || 'An unexpected error occurred.');
    } else {
      router.push('/'); // Redirect to the home page
    }
  }
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">New Project</h1>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
          </div>
          {error && (
            <div className="mt-4 text-red-500">
              {error}
            </div>
          )}
        </form>
      </div>
    </main>
  )
}