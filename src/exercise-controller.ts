export type Exercise = {
  id: string;
  difficulty: string;
  ticket: { title: string; description: string; requirements: string[] };
  pr: { title: string; description: string; author: string; sourceBranch: string; targetBranch: string };
  languages: string[];
  defaultLanguage: string;
  aiReview: CachedAiReview;
};

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

export type ChangedFile = { path: string; before: string; after: string };
export type ExercisePackage = { slug: string; item: Exercise; changedFiles: ChangedFile[] };

//TODO: solve the "tutorial" package fixation

const exerciseModules = import.meta.glob<Exercise>('../excersizes/tutorial/*/exercise.json', { eager: true, import: 'default' });
const beforeModules = import.meta.glob<string>('../excersizes/tutorial/*/*/before/**/*', { eager: true, query: '?raw', import: 'default' });
const afterModules = import.meta.glob<string>('../excersizes/tutorial/*/*/after/**/*', { eager: true, query: '?raw', import: 'default' });

function discoverExercises(): ExercisePackage[] {
  return Object.entries(exerciseModules)
    .map(([metadataPath, item]) => {
      const slug = metadataPath.match(/tutorial\/([^/]+)\/exercise\.json$/)?.[1];
      if (!slug) return undefined;
      const prefix = `../excersizes/tutorial/${slug}/${item.defaultLanguage}/`;
      const beforePrefix = `${prefix}before/`;
      const afterPrefix = `${prefix}after/`;
      const changedFiles = Object.entries(afterModules)
        .filter(([path]) => path.startsWith(afterPrefix))
        .map(([afterPath, after]) => {
          const path = afterPath.slice(afterPrefix.length);
          return { path, before: beforeModules[`${beforePrefix}${path}`] ?? '', after };
        });
      return { slug, item, changedFiles };
    })
    .filter((exercise): exercise is ExercisePackage => Boolean(exercise))
    .sort((left, right) => left.item.id.localeCompare(right.item.id));
}

export class ExerciseController {
  private readonly exercises = discoverExercises();
  private currentExercise?: ExercisePackage;
  private completedReviews = 0;
  private correctReviews = 0;

  listExercises(): readonly ExercisePackage[] {
    return this.exercises;
  }

  selectExercise(slug: string): ExercisePackage | undefined {
    this.currentExercise = this.exercises.find((exercise) => exercise.slug === slug);
    return this.currentExercise;
  }

  getScore() {
    return { completedReviews: this.completedReviews, correctReviews: this.correctReviews };
  }
}
