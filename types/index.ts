export interface ReviewResult {
    summary: string;
    issues: Issue[];
    strengths: string[];
    recommendations: string[];
  }
  
  export interface Issue {
    severity: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    lineNumber?: number;
    suggestion?: string;
  }
  
  export type ReviewFocus = 'security' | 'performance' | 'best-practices' | 'all';