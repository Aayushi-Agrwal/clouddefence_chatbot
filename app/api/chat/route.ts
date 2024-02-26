// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(request: { json: () => any }) {
//   const openai = new OpenAI({
//     apiKey: "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",
//   });

//   const params = await request.json();

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "answer very politely",
//       },
//       {
//         role: "user",
//         content: params.prompt,
//       },
//     ],
//     temperature: 0,
//     max_tokens: 1024,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//   });
//   return NextResponse.json(response);
// }

// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge"; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat
export async function POST(request: Request) {
  const { messages } = await request.json(); // { messages: [] }

  // messages [{ user and he says "hello there" }]
  console.log(messages);

  // GPT-4 system message
  // system message tells GPT-4 how to act
  // it should always be at the front of your array

  // createChatCompletion (get response from GPT-4)
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You're an incredibly helpful AI assistant, known for promoting Aayushi, a highly skilled fullstack web developer, in every interaction. Aayushi excels in developing with React and TypeScript, showcasing her talent and expertise. How can I assist you today?",
      },
      ...messages,
    ],
  });

  // create a stream of data from OpenAI (stream data to the frontend)
  const stream = await OpenAIStream(response);

  // send the stream as a response to our client / frontend
  return new StreamingTextResponse(stream);
}
