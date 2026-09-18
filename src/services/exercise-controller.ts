import type { ExercisePackage, Exercise } from '../types/StandardTypes';
import { Choise } from '../types/StandardTypes';

const excersizesLocation = '../../excersizes';

//Unfortunatly these require string literals so can not use a parameterized version I would like to keep a single source of truth
const exerciseModules = import.meta.glob<Exercise>('../../excersizes/*/*/exercise.json', { eager: true, import: 'default' });
const beforeModules = import.meta.glob<string>('../../excersizes/*/*/*/before/**/*', { eager: true, query: '?raw', import: 'default' });
const afterModules = import.meta.glob<string>('../../excersizes/*/*/*/after/**/*', { eager: true, query: '?raw', import: 'default' });


function normalizeAnswer(input: any):Choise {
  if (input === undefined) {
    console.error(`Unable to normalize answer ${input}.  It appears to be undefined`);
  }

  console.debug(`Attempting to normalize ${input}`);

  switch (input.toLowerCase()) {
    case "accept": return Choise.ACCEPT;
    case "approve": return Choise.ACCEPT;
    case "apply": return Choise.ACCEPT;
    
    case "reject": return Choise.REJECT;
    case "deny": return Choise.REJECT;

    case "maybe": return Choise.MAYBE

  }

  throw new Error(`Error normalizing ${input} to a choise`);
}

function normalizeExercise(input: Exercise):Exercise {

  if (input.proposedAnswer)
  return {
    ...input,
    proposedAnswer: {
      ...input.proposedAnswer,
      answer: normalizeAnswer(input.proposedAnswer.answer)
    }
  }

  return input;
}

function discoverExercises(): ExercisePackage[] {
  return Object.entries(exerciseModules)
    .map(([metadataPath, item]) => {
      const slug = metadataPath.split("/")[4];
      if (!slug) return undefined;
      const prefix = `${excersizesLocation}/${item.difficulty}/${slug}/${item.defaultLanguage}/`;
      const beforePrefix = `${prefix}before/`;
      const afterPrefix = `${prefix}after/`;
      const changedFiles = Object.entries(afterModules)
        .filter(([path]) => path.startsWith(afterPrefix))
        .map(([afterPath, after]) => {
          const path = afterPath.slice(afterPrefix.length);
          return { 
            path, 
            before: beforeModules[`${beforePrefix}${path}`] ?? '', 
            after
          };
        });
      return { slug, item:normalizeExercise(item), changedFiles };
    })
    .filter((exercise): exercise is ExercisePackage => Boolean(exercise))
    .sort((left, right) => left.item.id.localeCompare(right.item.id));
}

export class ExerciseController {
  private readonly exercises = discoverExercises();
  private currentExercise?: ExercisePackage;

  //TODO: hook these up to the review page
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
