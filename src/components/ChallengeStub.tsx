import { ExercisePackage } from "../types/StandardTypes";

export function ChallengeStub({ exercise }: { exercise: ExercisePackage }) {
  const { item, slug, language } = exercise;
  return <>
    <a href={`#review/${slug}/${language}`} key={`${slug}-${language}`}>
        <b>{item.id}</b>
        <span>{item.pr.title}</span>
        <small>{language}</small>
        <small>{item.difficulty}</small>
    </a>
  </>;
}
