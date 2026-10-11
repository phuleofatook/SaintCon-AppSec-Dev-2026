import type { ComponentType } from 'preact';
import orientationArtUrl from '../assets/story-cutscene-1.png';
import aiReviewerArtUrl from '../assets/story-cutscene-2.png';
import throughputArtUrl from '../assets/story-cutscene-3.png';
import decisionArtUrl from '../assets/story-cutscene-4.png';

/** Story copy and optional artwork references live here, separately from exercise data. */
export type StoryPageContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageLayout?: 'wide' | 'standard';
  imageAction?: { label: string; placement: 'language' | 'queue' | 'ai-review' | 'finish' };
};

export type StoryPageProps = { onContinue: () => void; onFinish: () => void; isLast: boolean };
export type StoryPageDefinition =
  | { type: 'briefing'; content: StoryPageContent }
  | { type: 'component'; Component: ComponentType<StoryPageProps> };

export const storyPages: Record<string, StoryPageDefinition> = {
  orientation: { type: 'briefing', content: {
    eyebrow: 'NEW ASSIGNMENT · SPACEWAYS: FLIGHT 26', title: 'Welcome to the Navigator crew.', image: orientationArtUrl,
    imageAlt: 'A Spaceways onboarding comic welcomes a new Navigator to review pull requests from across the station.',
    imageLayout: 'wide',
    imageAction: { label: 'Begin shift and choose a language', placement: 'language' },
    paragraphs: [
      'Both humans and Ape Input generate a lot of code. That means high throughput—and your review matters.',
      'Review the changes and decide whether they should ship. You own the decision.',
    ],
  } },
  'meet-reviewer': { type: 'briefing', content: {
    eyebrow: 'REVIEW DEPARTMENT · NEW PARTNER', title: 'Meet your AI reviewer.', image: aiReviewerArtUrl,
    imageAlt: 'A comic introduces an AI reviewer that analyzes a pull request while the human remains in charge.',
    imageLayout: 'standard',
    imageAction: { label: 'Continue to the tutorial reviews', placement: 'ai-review' },
    paragraphs: ['Your AI reviewer can summarize changes, flag suspicious code, and suggest where to look. It can recommend; you decide.'],
  } },
  'throughput-crisis': { type: 'briefing', content: {
    eyebrow: 'APE INPUT · PRODUCTION FLOOR', title: 'The throughput crisis.', image: throughputArtUrl,
    imageAlt: 'A comic shows human and robotic code monkeys producing code while the review queue grows dramatically.',
    imageLayout: 'wide',
    imageAction: { label: 'Continue to the review queue', placement: 'queue' },
    paragraphs: [
      'Production has never been better. Development output is up 10,000%—and so is the review queue.',
      'Code from humans and Ape Input reaches the same queue. Use your tools, but keep your judgment.',
    ],
  } },
  'your-decision': { type: 'briefing', content: {
    eyebrow: 'SHIFT COMPLETE · REVIEW DEPARTMENT', title: 'Your decision.', image: decisionArtUrl,
    imageAlt: 'A comic concludes a review shift with the Navigator and AI reviewer sharing responsibility for thoughtful decisions.',
    imageLayout: 'wide',
    imageAction: { label: 'End shift and return to the mission menu', placement: 'finish' },
    paragraphs: [
      'The code keeps coming, and the tools keep getting better. Understand the change, question the answers, and make a decision you can defend.',
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
  { type: 'exercises', group: 'first-queue' },
  { type: 'exercises', group: 'ai-assisted-queue' },
  { type: 'story', pageId: 'your-decision' },
] as const;
