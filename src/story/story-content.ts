import type { ComponentType } from 'preact';
import orientationArtUrl from '../assets/story-cutscene-1.png';
import queueArtUrl from '../assets/story-cutscene-2.png';
import aiReviewerArtUrl from '../assets/story-cutscene-3.png';
import judgmentArtUrl from '../assets/story-cutscene-4.png';

/** Story copy and optional artwork references live here, separately from exercise data. */
export type StoryPageContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
  imageAlt?: string;
  imageAction?: {
    label: string;
    placement: 'tutorial' | 'queue' | 'ai-review' | 'review-decision';
  };
};

export type StoryPageProps = {
  onContinue: () => void;
  onFinish: () => void;
  isLast: boolean;
};

export type StoryPageDefinition =
  | { type: 'briefing'; content: StoryPageContent }
  | { type: 'component'; Component: ComponentType<StoryPageProps> };

export const storyPages: Record<string, StoryPageDefinition> = {
  orientation: { type: 'briefing', content: {
    eyebrow: 'ORIENTATION · REVIEW DEPARTMENT',
    title: 'Welcome aboard, Reviewer.',
    image: orientationArtUrl,
    imageAlt: 'A Spaceways onboarding comic introduces the reviewer to Ape Input and the review tutorial.',
    imageAction: { label: 'Begin tutorial', placement: 'tutorial' },
    paragraphs: [
      'Your predecessor is no longer with the company. Management assures us this was unrelated to the airlock.',
      'Your assignment is simple: review proposed code changes and decide whether they should ship.',
      'You are not being asked to rewrite the code or judge its style. Ask one question: am I comfortable letting this ship?',
      'Approve when the change is acceptable to ship as proposed. Deny when there is a significant issue that should be addressed before this change ships.',
    ],
  } },
  'first-shift': { type: 'briefing', content: {
    eyebrow: 'YOUR FIRST SHIFT · FLIGHT CONTROL',
    title: 'The queue is getting more interesting.',
    image: queueArtUrl,
    imageAlt: 'A comic shows a growing stack of review requests overwhelming the reviewer.',
    imageAction: { label: 'Review the next queue', placement: 'queue' },
    paragraphs: [
      'The tutorials are complete. Engineering has sent over your first batch of changes.',
      'Management assures us that every change has already undergone extensive automated analysis. Which means there is absolutely nothing to worry about. Probably.',
      'Engineering recently adopted APE INPUT™, its revolutionary AI-assisted development platform. The factory got faster. The reviewer did not.',
    ],
  } },
  'throughput-problem': { type: 'briefing', content: {
    eyebrow: 'GOOD NEWS · STRATEGIC INITIATIVE',
    title: 'They bought another AI.',
    paragraphs: [
      'You completed your first batch. Engineering produced another 4,000 changes while you were reviewing it.',
      'More code means more decisions that somebody needs to own. Telling reviewers to work faster is not a review strategy.',
    ],
  } },
  'meet-reviewer': { type: 'briefing', content: {
    eyebrow: 'APE INPUT™ · NEW CAPABILITY',
    title: 'Meet your new reviewer.',
    image: aiReviewerArtUrl,
    imageAlt: 'A comic introduces an AI reviewer that analyzes a pull request while the human remains in charge.',
    imageAction: { label: 'Continue to AI-assisted review', placement: 'ai-review' },
    paragraphs: [
      'Automated Code Review is now available from every pull request in this shift.',
      'Use it when it is helpful. It can summarize a change, identify concerns, and point toward files worth inspecting. It does not make the shipping decision for you.',
    ],
  } },
  'review-strategy': { type: 'briefing', content: {
    eyebrow: 'A STRATEGIC QUESTION · MANAGEMENT OBSERVING',
    title: 'How should review work now?',
    image: judgmentArtUrl,
    imageAlt: 'A comic follows a reviewer through an approved change and emphasizes that code review requires judgment, not just trust in AI.',
    imageAction: { label: 'Continue to the next review', placement: 'review-decision' },
    paragraphs: [
      'Engineering is producing more code than one human can reasonably inspect line by line. Automated review can inspect the queue and help direct attention.',
      'The useful question is how people use that analysis to investigate risk and decide what can ship. Fortunately, management does not make security decisions.',
    ],
  } },
  'attention-problem': { type: 'briefing', content: {
    eyebrow: 'QUEUE EXCEPTION · ATTENTION REQUIRED',
    title: 'Four hundred thirty-eight files changed.',
    paragraphs: [
      'Most of this change is repetitive. A reviewer should not spend their shift proving that hundreds of identical files are identical.',
      'Use automated analysis to find the deviations, then investigate the few changes where human judgment matters.',
    ],
  } },
  'judgment-queue': { type: 'briefing', content: {
    eyebrow: 'REVIEW DEPARTMENT · JUDGMENT REQUIRED',
    title: 'The easy findings are gone.',
    paragraphs: [
      'Some changes look fine until you understand the surrounding behavior. Others contain problems that matter, but do not necessarily decide this pull request on their own.',
      'Automated analysis can give you evidence. You still decide whether there is a security reason to stop the change.',
    ],
  } },
  'final-incident': { type: 'briefing', content: {
    eyebrow: 'INCIDENT REPORT · FINAL REVIEW',
    title: 'This is the change that reassigned your predecessor.',
    paragraphs: [
      'You have seen automation find useful evidence and reduce a large search space. You have also seen that analysis does not own the outcome.',
      'One change remains. Read the ticket, inspect the evidence, and make the call.',
    ],
  } },
  debrief: { type: 'briefing', content: {
    eyebrow: 'SHIFT COMPLETE · REVIEW DEPARTMENT',
    title: 'Somebody still owns the decision.',
    paragraphs: [
      'You were not asked to write the code, inspect every line manually, or find every possible defect. You were asked whether the change was safe enough to ship.',
      'Modern tools can generate and analyze enormous amounts of code. They can summarize changes, identify unusual patterns, and point people toward areas worth investigating.',
      'Use AI. Use two AIs. Use ten AIs. Use AI to review AI-generated code. Just do not confuse automated analysis with somebody owning the decision.',
      'Your throughput is through the roof. Now how do you take ownership of it?',
    ],
  } },
};

/** Ordered Story Mode beats. Conditional groups appear once matching exercise metadata exists. */
export const storyTrack = [
  { type: 'story', pageId: 'orientation' },
  { type: 'exercises', group: 'tutorials' },
  { type: 'story', pageId: 'first-shift' },
  { type: 'exercises', group: 'first-queue' },
  { type: 'story', pageId: 'throughput-problem' },
  { type: 'story', pageId: 'meet-reviewer', enablesAutomatedReview: true },
  { type: 'exercises', group: 'ai-assisted-queue' },
  { type: 'story', pageId: 'review-strategy' },
  { type: 'conditional-exercises', pageId: 'attention-problem', group: 'large-change' },
  { type: 'story', pageId: 'judgment-queue' },
  { type: 'exercises', group: 'judgment-queue' },
  { type: 'conditional-exercises', pageId: 'final-incident', group: 'final-incident' },
  { type: 'story', pageId: 'debrief' },
] as const;
