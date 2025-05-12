"use client";

import { useState } from "react";
import { createClient } from "@connectrpc/connect";
import { Service } from '@buf/krelinga_proto.bufbuild_es/krelinga/video/in/v1/service_pb'
import { createConnectTransport } from "@connectrpc/connect-web"; // Ensure you have the correct transport

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const transport = createConnectTransport({
        baseUrl: "http://localhost:25004", // Replace with your server URL
        // Add any additional transport options here
      });
      const client = createClient(Service, transport);

      client
        .helloWorld({ name: inputValue }) // Replace `yourRpcMethod` with the actual RPC method name
        .then((response) => {
          alert(response.message); // Adjust `response.reply` based on your RPC response structure
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
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
        onKeyUp={handleKeyPress}
      />
    </div>
  );
}
