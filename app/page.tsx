'use client';

import { useState } from 'react';
import CodeInput from '@/components/CodeInput';
import ReviewResults from '@/components/ReviewResults';
import { ReviewResult, ReviewFocus } from '@/types';

export default function Home() {
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = async (
    code: string,
    language: string,
    focus: ReviewFocus
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, focus }),
      });

      if (!response.ok) {
        throw new Error('Failed to review code');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to review code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Powered by Mistral AI
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-gradient">
              AI Code Review
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Get instant, intelligent code reviews with AI-powered analysis
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-sm">
                🔒 Security Analysis
              </span>
              <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-sm">
                ⚡ Performance Tips
              </span>
              <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 text-sm">
                📋 Best Practices
              </span>
            </div>
          </div>

          {/* Main content */}
          <CodeInput onSubmit={handleReview} isLoading={isLoading} />

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/30 text-red-300 rounded-xl max-w-4xl mx-auto animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 animate-fadeIn">
              <ReviewResults result={result} />
            </div>
          )}
        </div>
      </div>

      {/* Add custom CSS animations */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </main>
  );
}