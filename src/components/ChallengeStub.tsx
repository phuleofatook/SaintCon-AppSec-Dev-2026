import type { ExercisePackage } from '../exercise-controller';

export function ChallengeStub({ exercise }: { exercise: ExercisePackage }) {
  const { item, slug } = exercise;
  return <>
    <a href={`#review/${slug}`} key={slug}>
        <b>{item.id}</b>
        <span>{item.pr.title}</span>
        <small>{item.difficulty}</small>
    </a>
  </>;
}
