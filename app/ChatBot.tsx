// "use client";

// import React, { useState } from "react";
// import axios from "axios";
// import PromptForm from "./components/PromptForm";

// interface IChoice {
//   message: { content: string };
// }
// const Chatbot = () => {
//   const [choices, setChoices] = useState<IChoice[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-slate-700">
//       <div className="flex flex-col flex-1 p-4">
//         <h1 className="text-2xl font-bold mb-4">AI-powered Chatbot</h1>

//         <PromptForm
//           isLoading={isLoading}
//           onSubmit={async (prompt: any) => {
//             setIsLoading(true)
//             const response = await fetch("/api/chat", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ prompt }),
//             });
//             setIsLoading(false)
//             const result = await response.json();
//             setChoices(result.choices);
//           }}
//         />

//         <div className="flex flex-col gap-4 mb-4">
//           {/* Render chat messages here */}
//           {choices.map((choice, index) => (
//             <p key={index} className="rounded-lg p-2 bg-blue-500 text-white">
//               {choice.message.content}
//             </p>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
"use client";
import { useChat, Message } from "ai/react";

export default function ChatComponent() {
  const { input, handleInputChange, handleSubmit, isLoading, messages } =
    useChat();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col flex-1 p-4">
        {messages.map((message: Message) => (
          <div key={message.id} className="mb-4">
            {/* Name of person talking */}
            <h3 className="text-lg font-semibold mt-2">
              {message.role === "assistant" ? "GPT-4" : "User"}
            </h3>

            {/* Formatting the message */}
            <div className="bg-white p-3 rounded-lg shadow-md text-slate-700">
              {message.content
                .split("\n")
                .map((currentTextBlock: string, index: number) => (
                  <p key={message.id + index} className="mb-1">
                    {currentTextBlock}
                  </p>
                ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <p className="mb-2">User Message</p>
        <textarea
          className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none text-slate-700"
          placeholder="Ask me anything..."
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
