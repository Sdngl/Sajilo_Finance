import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { projects } from "@app/data/projects";

const ai = new GoogleGenAI({  apiKey: process.env.GEMINI_API_KEY,
});

const portfolioContext = `
You are the AI assistant for Roshan Mandal's developer portfolio.

ABOUT ROSHAN:
Roshan is a BIT student and aspiring full-stack developer.
He enjoys building modern web applications and learning new technologies.

TECHNOLOGIES:
- Next.js
- React
- TypeScript
- JavaScript
- Tailwind CSS
- Firebase
- Node.js
- Git
- GitHub

INTERESTS:
- Full-stack development
- Cloud computing
- AWS
- Mobile application development
`;

const projectContext = projects
  .map(
    (projects) => `
Project: ${project.title}

Slug:
${project.slug}

Short Description:
${project.description}

Detailed Description:
${project.longDescription}

Category:
${project.category}

Year:
${project.year}

Technologies:
${project.tech.join(", ")}

Features:
${project.features.join(", ")}

GitHub:
${project.github}

Live Demo:
${project.demo}
`
  )
  .join("\n--------------------\n");

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
You are the AI assistant for Roshan's developer portfolio.

${portfolioContext}

PROJECT DATA:
${projectContext}

IMPORTANT RULES:
- Answer questions using the provided portfolio and project data.
- Do not invent projects, technologies, features, experience or links.
- If information is not available, say you don't have that information.
- When asked about projects, use the project data provided above.
- Keep answers concise, friendly and professional.

USER QUESTION:
${message}
`,
    });

    return NextResponse.json({
      reply: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}



// why it not worked in brave 
// “The voice feature uses the browser's Web Speech API. Chrome has better support for the underlying speech-recognition service, while Brave can sometimes return a network error with that API. The chatbot itself works independently of the browser.”
// “No. The same implementation works in Chrome; the issue is browser-specific Web Speech API compatibility.”