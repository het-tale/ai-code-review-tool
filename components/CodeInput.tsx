'use client';

import { useState } from 'react';
import { ReviewFocus } from '@/types';

interface CodeInputProps {
  onSubmit: (code: string, language: string, focus: ReviewFocus) => void;
  isLoading: boolean;
}

const LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'go',
  'rust',
  'cpp',
  'csharp',
  'php',
  'ruby',
];

export default function CodeInput({ onSubmit, isLoading }: CodeInputProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [focus, setFocus] = useState<ReviewFocus>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code, language, focus);
    }
  };

  const loadSample = () => {
    setCode(`function processUserData(userData) {
  // Fetch user from database
  const user = db.query("SELECT * FROM users WHERE id = " + userData.id);
  
  // Process password
  const hashedPassword = userData.password;
  user.password = hashedPassword;
  
  // Update user
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userData.id) {
      users[i] = user;
    }
  }
  
  return user;
}`);
    setLanguage('javascript');
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-md font-medium text-white-700 mb-2">
            Paste your code here
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="// Paste your code here..."
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white-700 mb-2">
              Review Focus
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value as ReviewFocus)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="all">All (Comprehensive)</option>
              <option value="security">Security</option>
              <option value="performance">Performance</option>
              <option value="best-practices">Best Practices</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading || !code.trim()}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Analyzing...' : 'Review Code'}
          </button>
          
          <button
            type="button"
            onClick={loadSample}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            Load Sample
          </button>
        </div>
      </form>
    </div>
  );
}