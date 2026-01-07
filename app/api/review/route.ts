import { NextRequest, NextResponse } from "next/server";
import { mistral } from "@/lib/mistral";
import { ReviewResult, ReviewFocus } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { code, language, focus } = await request.json();

    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    const prompt = generateReviewPrompt(code, language, focus);

    const response = await mistral.chat.complete({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
      responseFormat: { type: "json_object" },
    });
    const content = response.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from Mistral");
    }

    const reviewResult: ReviewResult = JSON.parse(content);

    return NextResponse.json(reviewResult);
  } catch (error) {
    console.error("Review error:", error);
    return NextResponse.json(
      { error: "Failed to review code" },
      { status: 500 }
    );
  }
}

function generateReviewPrompt(
  code: string,
  language: string,
  focus: ReviewFocus
): string {
  const focusInstructions = {
    security:
      "Focus heavily on security vulnerabilities, injection risks, authentication issues, and data exposure.",
    performance:
      "Focus on performance bottlenecks, algorithmic complexity, memory usage, and optimization opportunities.",
    "best-practices":
      "Focus on code quality, maintainability, design patterns, naming conventions, and architectural issues.",
    all: "Provide a comprehensive review covering security, performance, and best practices.",
  };

  return `You are an expert code reviewer. Analyze the following ${language} code with a focus on ${focus}.

${focusInstructions[focus]}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide your review in JSON format with the following structure:
{
  "summary": "Brief overall assessment (2-3 sentences)",
  "issues": [
    {
      "severity": "critical|high|medium|low",
      "title": "Brief title",
      "description": "Detailed description",
      "lineNumber": 5,
      "suggestion": "How to fix it"
    }
  ],
  "strengths": ["Positive aspects of the code"],
  "recommendations": ["General improvement suggestions"]
}

Be specific, constructive, and provide actionable feedback.`;
}
