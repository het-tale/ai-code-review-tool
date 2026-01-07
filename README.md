# AI Code Review Tool

An intelligent code review tool powered by Mistral AI that provides comprehensive analysis of your code for security vulnerabilities, performance issues, and best practices.

![AI Code Review Tool](https://img.shields.io/badge/Mistral-AI-orange) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## Features

- 🤖 **AI-Powered Analysis** - Uses Mistral AI's latest models for intelligent code review
- 🔒 **Security Focus** - Identifies SQL injection, XSS, authentication issues, and more
- ⚡ **Performance Review** - Detects algorithmic complexity and optimization opportunities
- 📋 **Best Practices** - Ensures code quality, maintainability, and design patterns
- 🎯 **Multiple Languages** - Supports JavaScript, TypeScript, Python, Java, Go, Rust, and more
- 🎨 **Clean UI** - Modern, responsive interface built with Tailwind CSS
- 📊 **Severity Levels** - Issues categorized as Critical, High, Medium, or Low
- 💡 **Actionable Suggestions** - Each issue includes specific fix recommendations

## Prerequisites

- Node.js 18+ installed
- A Mistral AI API key (get one at [console.mistral.ai](https://console.mistral.ai/))

## 🏃 Quick Start

### Option 1: Use Live Demo (Fastest)
Just visit: **[https://ai-code-review-tool-seven.vercel.app/](https://ai-code-review-tool-seven.vercel.app/)**

### Option 2: Run Locally

1. **Clone the repository**
   ```bash
   git clone git@github.com:het-tale/ai-code-review-tool.git
   cd ai-code-review-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MISTRAL_API_KEY=your_mistral_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste Your Code** - Copy and paste your code into the text area
2. **Select Language** - Choose the programming language from the dropdown
3. **Choose Review Focus** - Select what to focus on:
   - **All** - Comprehensive review (security + performance + best practices)
   - **Security** - Focus on vulnerabilities and security issues
   - **Performance** - Focus on optimization opportunities
   - **Best Practices** - Focus on code quality and maintainability
4. **Click "Review Code"** - Get your AI-powered analysis in seconds
5. **Review Results** - See issues categorized by severity with actionable suggestions

### Quick Test

Click the **"Load Sample"** button to load example code with intentional issues for testing.

## Project Structure

```
code-review-ai/
├── app/
│   ├── api/
│   │   └── review/
│   │       └── route.ts        # API endpoint for code review
│   ├── page.tsx                # Main page component
│   └── layout.tsx              # Root layout
├── components/
│   ├── CodeInput.tsx           # Code input form component
│   └── ReviewResults.tsx       # Results display component
├── lib/
│   └── mistral.ts              # Mistral AI client configuration
├── types/
│   └── index.ts                # TypeScript type definitions
├── .env.local                  # Environment variables (not in git)
└── README.md                   # This file
```

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **AI Model**: Mistral AI SDK
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## API Response Format

The tool returns structured JSON with the following format:

```typescript
{
  "summary": "Brief overall assessment",
  "issues": [
    {
      "severity": "critical" | "high" | "medium" | "low",
      "title": "Issue title",
      "description": "Detailed description",
      "lineNumber": 5,
      "suggestion": "How to fix it"
    }
  ],
  "strengths": ["Positive aspects"],
  "recommendations": ["General improvements"]
}
```

## Development

<!-- ### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
npm start
``` -->

### Code Quality
The project uses:
- TypeScript for type safety
- ESLint for code linting

<!-- ## Limitations

- Maximum code length: ~4000 lines (due to AI model context limits)
- Requires internet connection for AI analysis
- API rate limits apply based on your Mistral AI plan -->

<!-- ## Future Enhancements

- [ ] File upload support
- [ ] Batch review for multiple files
- [ ] Code diff comparison
- [ ] Export reports as PDF/Markdown
- [ ] Integration with GitHub/GitLab
- [ ] Custom rule configuration
- [ ] Team collaboration features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes. -->

## Acknowledgments

- Built with [Mistral AI](https://mistral.ai/)
- Powered by [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

<!-- ## Contact

For questions or feedback, please open an issue on GitHub. -->
