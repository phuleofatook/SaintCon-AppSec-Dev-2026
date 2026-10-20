import { useEffect, useRef } from 'preact/hooks';
import { Diff2HtmlUI } from 'diff2html/lib-esm/ui/js/diff2html-ui-slim';
import { createTwoFilesPatch } from 'diff';
import type { ExercisePackage } from '../types/StandardTypes';

export type DiffOutputFormat = 'side-by-side' | 'line-by-line';

export type DiffViewProps = { 
  exercise: ExercisePackage; 

  format: DiffOutputFormat; 
  onFormatChange: (format: DiffOutputFormat) => void 

  highlight: boolean;
  onHighlightChange: (highlight: boolean) => void 

  contextSize: number; 
  onContextSizeChange: (contextSize: number) => void 

}

export function DiffView(props: DiffViewProps) {
  const {exercise, 
    format, onFormatChange, 
    contextSize, onContextSizeChange, 
    highlight, onHighlightChange
  } = props;

  const target = useRef<HTMLDivElement>(null);

  const possibleContextSizes = [5,10,25,100];
  
  useEffect(() => {
    if (!target.current) return;
    const previousScrollY = window.scrollY;
    const previousHorizontalScroll = Array.from(target.current.querySelectorAll<HTMLElement>('.d2h-file-diff')).map((element) => element.scrollLeft);
    target.current.innerHTML = '';

    const exerciseDiff = exercise.changedFiles.map((file) => 
      createTwoFilesPatch(file.path, file.path, file.before, file.after, '', '', { context: contextSize }))
    .join('\n');

    new Diff2HtmlUI(target.current, exerciseDiff, { 
      drawFileList: false,
      outputFormat: format, 
      matching: 'lines',
      highlight: highlight ?? false
    }).draw();

    const fileDiffs = target.current.querySelectorAll<HTMLElement>('.d2h-file-diff');
    fileDiffs.forEach((element, index) => {
      element.id = `review-file-${index}`;
      element.scrollLeft = previousHorizontalScroll[index] ?? 0;
    });

    requestAnimationFrame(() => window.scrollTo({ top: previousScrollY }));
  }, [exercise, format, contextSize, highlight]);

  return <>
    <details class="diff-options">
      <summary>Display options</summary>
      <div class="diff-options-controls">
        <div class="diff-option">
          <span class="section-label">OUTPUT FORMAT</span>
          <span class="format-switch" role="group" aria-label="Diff output format">
            <button type="button" aria-pressed={format === 'side-by-side'} onClick={() => onFormatChange('side-by-side')}>Side by side</button>
            <button type="button" aria-pressed={format === 'line-by-line'} onClick={() => onFormatChange('line-by-line')}>Line by line</button>
          </span>
        </div>
        <div class="diff-option">
          <span class="section-label">CONTEXT LINES</span>
          <select aria-label="Context lines" value={contextSize} onChange={(e) => {
            const parsed = Number(e.currentTarget.value);
            onContextSizeChange(!Number.isNaN(parsed) ? parsed : 5);
          }}>
            {possibleContextSizes.map((possibleContextSize) => (
              <option key={possibleContextSize} value={possibleContextSize}>{possibleContextSize}</option>
            ))}
          </select>
        </div>
        <label class="diff-option diff-highlight-option">
          <span class="section-label">SYNTAX HIGHLIGHTING</span>
          <input aria-label="Syntax highlighting" type="checkbox" checked={highlight} onChange={(e) => onHighlightChange(e.currentTarget.checked)} />
        </label>
      </div>
    </details>

    <div ref={target} aria-label="Proposed code changes" />
  </>;
}
