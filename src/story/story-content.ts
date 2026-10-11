import type { ComponentType } from 'preact';
import orientationArtUrl from '../assets/story-cutscene-1.png';
import aiReviewerArtUrl from '../assets/story-cutscene-2.png';
import throughputArtUrl from '../assets/story-cutscene-3.png';
import judgmentArtUrl from '../assets/story-cutscene-4.png';
import debriefArtUrl from '../assets/story-cutscene-6.png';

/** Story copy and optional artwork references live here, separately from exercise data. */
export type StoryPageContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageAction?: { label: string; placement: 'language' | 'queue' | 'ai-review' | 'judgment' | 'finish' };
};

export type StoryPageProps = { onContinue: () => void; onFinish: () => void; isLast: boolean };
export type StoryPageDefinition =
  | { type: 'briefing'; content: StoryPageContent }
  | { type: 'component'; Component: ComponentType<StoryPageProps> };

export const storyPages: Record<string, StoryPageDefinition> = {
  orientation: { type: 'briefing', content: {
    eyebrow: 'NEW ASSIGNMENT · REVIEW DEPARTMENT', title: 'Welcome aboard, Reviewer.', image: orientationArtUrl,
    imageAlt: "A Spaceways onboarding comic assigns a new reviewer after Dave's airlock incident.",
    imageAction: { label: 'Begin shift and choose a language', placement: 'language' },
    paragraphs: [
      'Your predecessor, Dave, is no longer with the company. Management assures us this was unrelated to the airlock.',
      'You now own the review queue. Review proposed changes and decide whether they should ship. Approve acceptable changes; deny changes with a significant issue to address first.',
    ],
  } },
  'meet-reviewer': { type: 'briefing', content: {
    eyebrow: 'APE INPUT · NEW CAPABILITY', title: 'Meet your new reviewer.', image: aiReviewerArtUrl,
    imageAlt: 'A comic introduces an AI reviewer that analyzes a pull request while the human remains in charge.',
    imageAction: { label: 'Start review', placement: 'ai-review' },
    paragraphs: ['Automated Code Review can summarize a change, identify concerns, and point toward files worth inspecting. It does not make the shipping decision for you.'],
  } },
  'throughput-crisis': { type: 'briefing', content: {
    eyebrow: 'YOUR FIRST SHIFT · FLIGHT CONTROL', title: 'The queue is getting more interesting.', image: throughputArtUrl,
    imageAlt: 'A comic shows development throughput and the review queue increasing by 10,000 percent.',
    imageAction: { label: 'Start the next review', placement: 'queue' },
    paragraphs: [
      'The tutorials are complete. Engineering recently adopted APE INPUT, its revolutionary AI-assisted development platform.',
      'The factory got faster. The reviewer did not. AI can help analyze the queue, but it cannot own the decision to ship.',
    ],
  } },
  'judgment-queue': { type: 'briefing', content: {
    eyebrow: 'REVIEW DEPARTMENT · JUDGMENT REQUIRED', title: 'The easy findings are gone.', image: judgmentArtUrl,
    imageAlt: 'A reviewer considers an improved database query and continues to the next review.',
    imageAction: { label: 'Review the pull request', placement: 'judgment' },
    paragraphs: [
      'This smaller change improves the code, but it does not fix every pre-existing issue around it. Do not confuse approval with certifying the entire system as secure.',
      'Automated analysis can give you evidence. You still decide whether this pull request should ship in its risk and policy context.',
    ],
  } },
  debrief: { type: 'briefing', content: {
    eyebrow: 'SHIFT COMPLETE · REVIEW DEPARTMENT', title: 'Somebody still owns the decision.', image: debriefArtUrl,
    imageAlt: 'A comic concludes that automated tools help, but somebody still has to own the decision of what ships.',
    imageAction: { label: 'Finish shift and return to the mission menu', placement: 'finish' },
    paragraphs: [
      'Your throughput is through the roof. Now can you take ownership of it?',
      'Use AI to summarize, analyze, and narrow the search space—but do not confuse automated analysis with somebody owning the decision.',
    ],
  } },
};

/** Ordered Story Mode beats. Exercises are mapped to their existing scenario slugs. */
export const storyTrack = [
  { type: 'story', pageId: 'orientation' },
  { type: 'language-selection' },
  { type: 'story', pageId: 'meet-reviewer' },
  { type: 'exercises', group: 'tutorials' },
  { type: 'story', pageId: 'throughput-crisis' },
  { type: 'exercise', slug: 'noise' },
  { type: 'story', pageId: 'judgment-queue' },
  { type: 'exercise', slug: 'sus' },
  { type: 'story', pageId: 'debrief' },
] as const;
