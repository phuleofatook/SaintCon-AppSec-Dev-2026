import { useEffect, useRef } from 'preact/hooks';
import { Diff2HtmlUI } from 'diff2html/lib-esm/ui/js/diff2html-ui-slim';
import { createTwoFilesPatch } from 'diff';
import type { ExercisePackage } from '../exercise-controller';

export type DiffOutputFormat = 'side-by-side' | 'line-by-line';

export function DiffView({ exercise, format, onFormatChange }: { exercise: ExercisePackage; format: DiffOutputFormat; onFormatChange: (format: DiffOutputFormat) => void }) {
  const target = useRef<HTMLDivElement>(null);
  const exerciseDiff = exercise.changedFiles.map((file) => createTwoFilesPatch(file.path, file.path, file.before, file.after, '', '', { context: 3 })).join('\n');
  
  useEffect(() => {
    if (!target.current) return;
    target.current.innerHTML = '';
    new Diff2HtmlUI(target.current, exerciseDiff, { drawFileList: false, outputFormat: format, matching: 'words' }).draw();
  }, [exerciseDiff, format]);

  return <>
    <div class="diff-toolbar" aria-label="Diff output format">
      <span class="section-label">OUTPUT FORMAT</span>
      <div class="format-switch" role="group">
        <button type="button" aria-pressed={format === 'side-by-side'} onClick={() => onFormatChange('side-by-side')}>Side by side</button>
        <button type="button" aria-pressed={format === 'line-by-line'} onClick={() => onFormatChange('line-by-line')}>Line by line</button>
      </div>
    </div>
    <div ref={target} aria-label="Proposed code changes" />
  </>;
}
