import type { ExercisePackage, Exercise } from '../types/StandardTypes';
import { Choice } from '../types/StandardTypes';

const excersizesLocation = '../../excersizes';

//Unfortunatly these require string literals so can not use a parameterized version to keep a single source of truth on the path prefix
const exerciseModules = import.meta.glob<Exercise>('../../excersizes/*/*/exercise.json', { eager: true, import: 'default' });
const beforeModules = import.meta.glob<string>('../../excersizes/*/*/*/before/**/*', { eager: true, query: '?raw', import: 'default' });
const afterModules = import.meta.glob<string>('../../excersizes/*/*/*/after/**/*', { eager: true, query: '?raw', import: 'default' });


function normalizeAnswer(input: any):Choice {
  if (input === undefined) {
    console.error(`Unable to normalize answer ${input}.  It appears to be undefined`);
  }

  switch (input.toLowerCase()) {
    case "accept": return Choice.ACCEPT;
    case "approve": return Choice.ACCEPT;
    case "apply": return Choice.ACCEPT;
    
    case "reject": return Choice.REJECT;
    case "deny": return Choice.REJECT;

    case "maybe": return Choice.MAYBE

  }

  throw new Error(`Error normalizing ${input} to a Choice`);
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
      return item.languages.flatMap((language) => {
        const prefix = `${excersizesLocation}/${item.difficulty}/${slug}/${language}/`;
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
        return changedFiles.length > 0 ? [{ slug, language, item: normalizeExercise(item), changedFiles }] : [];
      });
    })
    .flat()
    .filter((exercise): exercise is ExercisePackage => Boolean(exercise))
    .sort((left, right) => left.item.id.localeCompare(right.item.id) || left.language.localeCompare(right.language));
}

function detectLanguages(excersizes : ExercisePackage[]): string[] {
  const languages = new Set<string>();

  for (const excersize of excersizes) {
    excersize.item.languages.forEach(language => languages.add(language));
  }

  return [...languages];
}

export class ExerciseController {
  private readonly exercises = discoverExercises();
  private readonly languages = detectLanguages(this.exercises);

  private currentExercise?: ExercisePackage;
  
  listLanguages() : readonly string[] {
    return this.languages
  }

  listExercises(): readonly ExercisePackage[] {
    return this.exercises;
  }

  listExercisesForLanguage(language : string): readonly ExercisePackage[] {
    return this.exercises.filter((exercise) => exercise.language === language);
  }

  listExercisesForLanguages(languages: readonly string[]): readonly ExercisePackage[] {
    if (languages.length === 0) return this.exercises;
    return this.exercises.filter((exercise) =>
      languages.includes(exercise.language)
    );
  }

  selectExercise(slug: string, language?: string): ExercisePackage | undefined {
    this.currentExercise = this.exercises.find((exercise) =>
      exercise.slug === slug && (!language || exercise.language === language)
    );
    return this.currentExercise;
  }



}
