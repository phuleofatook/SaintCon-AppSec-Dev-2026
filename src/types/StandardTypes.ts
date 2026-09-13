//TODO: break this up?

export type Exercise = {
  id: string;
  difficulty: string;
  ticket: { 
    title: string; 
    description: string; 
    requirements: string[] ,
  };
  pr: { 
    title: string; 
    description: string; 
    author: string; 
    sourceBranch: string; 
    targetBranch: string 
  };
  languages: string[];
  defaultLanguage: string;
  aiReview: CachedAiReview;
  proposedAnswer: ProposedAnswer;
};

export enum Choise {
  ACCEPT,
  REJECT,
  MAYBE,
}

export type ProposedAnswer = {
  answer: Choise;
  reason: string;
}

export type CachedAiReview = {
  verdict: 'approve' | 'deny';
  summary: string;
  findings: Array<{
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    title: string;
    detail: string;
    file?: string;
  }>;
};

export type ChangedFile = { 
  path: string; 
  before: string; 
  after: string 
};

export type ExercisePackage = { 
  slug: string; 
  item: Exercise; 
  changedFiles: ChangedFile[] 
};
