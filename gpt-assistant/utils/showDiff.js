// Purpose: display differences in text files using the 'diff' library
import { diffLines } from 'diff';
import chalk from 'chalk';

export function showDiff(oldContent, newContent) {
  const changes = diffLines(oldContent, newContent);
  for (const part of changes) {
    const color = part.added ? 'green' :
                  part.removed ? 'red' : 'gray';
    process.stdout.write(chalk[color](part.value));
  }
}