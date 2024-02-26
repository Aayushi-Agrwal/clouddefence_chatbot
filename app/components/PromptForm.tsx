"use client";

import { useState } from "react";

function PromptForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: any;
  isLoading: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  return (
    <form
      className="flex items-center gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (prompt === "") {
          return;
        }
        onSubmit(prompt);
        setPrompt("");
      }}
    >
      <label>Question</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
        placeholder="Type your message..."
      />
      <input
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
      />
    </form>
  );
}

export default PromptForm;
