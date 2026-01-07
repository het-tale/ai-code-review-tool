'use client';

import { ReviewResult } from '@/types';

interface ReviewResultsProps {
  result: ReviewResult;
}

const severityConfig = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-300',
    icon: '🔴',
    badge: 'bg-red-500/20 text-red-300',
  },
  high: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-300',
    icon: '🟠',
    badge: 'bg-orange-500/20 text-orange-300',
  },
  medium: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-300',
    icon: '🟡',
    badge: 'bg-yellow-500/20 text-yellow-300',
  },
  low: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    icon: '🔵',
    badge: 'bg-blue-500/20 text-blue-300',
  },
};

export default function ReviewResults({ result }: ReviewResultsProps) {
  const issueCount = result.issues.length;
  const criticalCount = result.issues.filter(i => i.severity === 'critical').length;
  const highCount = result.issues.filter(i => i.severity === 'high').length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Summary Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="text-4xl">📊</span>
              Review Summary
            </h2>
            {issueCount > 0 && (
              <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm font-medium">
                  {issueCount} {issueCount === 1 ? 'Issue' : 'Issues'} Found
                </span>
                {criticalCount > 0 && (
                  <span className="px-3 py-1 bg-red-600/20 border border-red-600/30 rounded-full text-red-300 text-xs font-medium">
                    {criticalCount} Critical
                  </span>
                )}
                {highCount > 0 && (
                  <span className="px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-xs font-medium">
                    {highCount} High
                  </span>
                )}
              </div>
            )}
          </div>
          {issueCount === 0 && (
            <div className="text-5xl">✨</div>
          )}
        </div>
        <p className="text-lg text-gray-300 leading-relaxed">{result.summary}</p>
      </div>

      {/* Issues */}
      {result.issues.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            Issues Detected
          </h2>
          <div className="space-y-4">
            {result.issues.map((issue, index) => {
              const config = severityConfig[issue.severity];
              return (
                <div
                  key={index}
                  className={`${config.bg} backdrop-blur-sm border ${config.border} rounded-xl p-6 transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{config.icon}</span>
                      <h3 className="font-bold text-lg text-white">
                        {issue.title}
                      </h3>
                    </div>
                    <span className={`px-3 py-1 ${config.badge} rounded-full text-xs font-bold uppercase tracking-wide`}>
                      {issue.severity}
                    </span>
                  </div>
                  
                  <p className={`${config.text} mb-3 leading-relaxed`}>
                    {issue.description}
                  </p>
                  
                  {issue.lineNumber && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400 font-mono">
                        Line {issue.lineNumber}
                      </span>
                    </div>
                  )}
                  
                  {issue.suggestion && (
                    <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                      <div className="flex items-start gap-2">
                        <span className="text-xl">💡</span>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                            Suggestion
                          </p>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {issue.suggestion}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">✨</span>
            Strengths
          </h2>
          <div className="space-y-3">
            {result.strengths.map((strength, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-green-500/20 rounded-xl"
              >
                <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-200 leading-relaxed">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">💡</span>
            Recommendations
          </h2>
          <div className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl"
              >
                <span className="text-blue-400 text-xl flex-shrink-0">→</span>
                <span className="text-gray-200 leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Banner */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="text-white font-semibold">Review Complete!</p>
              <p className="text-sm text-gray-400">Ready to improve your code?</p>
            </div>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Review Another
          </button>
        </div>
      </div>
    </div>
  );
}