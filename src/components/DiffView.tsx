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
    target.current.innerHTML = '';

    const exerciseDiff = exercise.changedFiles.map((file) => 
      createTwoFilesPatch(file.path, file.path, file.before, file.after, '', '', { context: contextSize }))
    .join('\n');

    new Diff2HtmlUI(target.current, exerciseDiff, { 
      drawFileList: false,  //TODO: show.  Requires getting the links on it to work
      outputFormat: format, 
      matching: 'lines',
      highlight: highlight ?? false
    }).draw();
  }, [exercise, format, contextSize, highlight]);

  return <>
    <div class="diff-toolbar" aria-label="Diff output format">
      <span class="section-label">OUTPUT FORMAT</span>
      <div class="format-switch" role="group">
        <button type="button" aria-pressed={format === 'side-by-side'} onClick={() => onFormatChange('side-by-side')}>Side by side</button>
        <button type="button" aria-pressed={format === 'line-by-line'} onClick={() => onFormatChange('line-by-line')}>Line by line</button>
      </div>
    </div>

    <div class="diff-toolbar" aria-label="Diff context size">
      <span class="section-label">CONTEXT SIZE</span>
      <select value={contextSize} 
      onChange={(e) => {
        const parsed = Number(e.currentTarget.value);
        onContextSizeChange(!Number.isNaN(parsed) ? parsed : 5);
      }}>
        <option value="">Number of Lines</option>
        {possibleContextSizes.map((possibleContextSize) => (
          <option key={possibleContextSize} value={possibleContextSize}>
            {possibleContextSize}
          </option>
        ))}

      </select>
    </div>

    <div class="diff-toolbar" aria-label="Syntax highlighting">
      <span class="section-label">SYNTAX HIGHLIGHTING</span>
      <div class="format-switch" role="group">
        <input type="checkbox" checked={highlight} onChange={(e)=>onHighlightChange(e.currentTarget.checked)}/>
      </div>
    </div>

    <div ref={target} aria-label="Proposed code changes" />
  </>;
}
