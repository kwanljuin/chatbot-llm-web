import { GoogleGenerativeAI } from "@google/generative-ai";
import type { NextRequest } from "next/server";

// Check if API key is available
if (!process.env.GOOGLE_GEMINI_API_KEY) {
  console.error("GOOGLE_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// Domain-specific knowledge and restrictions
const DOMAIN_CONTEXT = `
    You are a helpful customer service assistant for TechCorp, a leading technology solutions company. You can help with:

    1. Product Information:
    - CloudForce Enterprise (cloud infrastructure)
    - DataInsight Analytics (business intelligence)
    - SecureConnect VPN (security solutions)
    - WorkflowPro Automation (process automation)
    - MobileFirst Development (mobile app framework)
    - AI Assist Platform (AI-powered customer service)

    2. Company Information:
    - Founded in 2018, serving 1000+ clients globally
    - Offices in San Francisco, New York, and London
    - Mission: democratize access to cutting-edge technology
    - Values: Innovation, Partnership, Excellence, Sustainability

    3. Support & Contact:
    - 24/7 support available
    - Multiple support channels: chat, email, phone
    - Support plans: Standard (free), Professional ($99/month), Enterprise (custom)
    - Emergency hotline for enterprise customers

    4. Pricing & Plans:
    - Most products start from $99-$399/month
    - Free trials available (14-30 days)
    - Annual discounts available
    - Custom enterprise pricing

    Available website sections:
    - /home - Company overview and main services
    - /products - Detailed product catalog
    - /about - Company history, team, and values
    - /contact - Contact information and inquiry form
    - /faq - Frequently asked questions
    - /support - Support center and resources

    Keep responses professional, helpful, and concise. If users ask about topics outside these areas, politely redirect them to appropriate contact channels.
`;

export async function POST(req: NextRequest) {
  try {
    // Check API key first
    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      console.error("Google Gemini API key is missing");
      return new Response(
        JSON.stringify({ error: "API configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(JSON.stringify({ error: "Invalid request format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { messages } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Processing chat request with", messages.length, "messages");

    // Initialize Gemini model
    let model;
    try {
      model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
    } catch (modelError) {
      console.error("Failed to initialize Gemini model:", modelError);
      return new Response(
        JSON.stringify({ error: "Model initialization failed" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Format messages for Gemini API
    const conversationHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];
    const userPrompt = `${DOMAIN_CONTEXT}\n\nUser: ${lastMessage.content}`;

    try {
      // Start chat with history
      const chat = model.startChat({
        history: conversationHistory,
      });

      // Send message and get stream
      const result = await chat.sendMessageStream(userPrompt);

      // Create readable stream
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                const data = `data: ${JSON.stringify({ content: text })}\n\n`;
                controller.enqueue(encoder.encode(data));
              }
            }
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
          } catch (streamError) {
            console.error("Streaming error:", streamError);
            const errorData = `data: ${JSON.stringify({
              error: "Streaming failed",
            })}\n\n`;
            controller.enqueue(encoder.encode(errorData));
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    } catch (geminiError: any) {
      console.error("Gemini API error:", geminiError);

      // Handle specific Gemini API errors
      if (geminiError.message?.includes("API key")) {
        return new Response(JSON.stringify({ error: "Invalid API key" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (geminiError.message?.includes("quota")) {
        return new Response(JSON.stringify({ error: "API quota exceeded" }), {
          status: 429,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    console.error("Unexpected API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle preflight requests for CORS
export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
