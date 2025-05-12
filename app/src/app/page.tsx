"use client";

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      alert(inputValue);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <input
        type="text"
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
        placeholder="Type something and press Enter"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}
