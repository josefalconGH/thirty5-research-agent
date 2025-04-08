// Purpose: modify a file using GPT
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import { askGPT } from '../utils/gpt.js';
import { showDiff } from '../utils/showDiff.js';
import { backupFile } from '../utils/backup.js';

export async function modifyFile(filePath, goal, options = {}) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const fileContent = await fs.readFile(absolutePath, 'utf-8');

  const prompt = `Here is a file:\n\n${fileContent}\n\nYour goal is: ${goal}\n\nRefactor or update the code accordingly. Return the full modified file only.`;

  const newContent = await askGPT(prompt);

  if (options.preview) {
    console.log(chalk.yellow(`\n🚧 [PREVIEW] :\n\n`));
    console.log(newContent);
    return;
  }

  if (options.diff) {
    console.log(chalk.cyan(`\n🔍 [DIFF] :\n`));
    showDiff(fileContent, newContent);
    return;
  }

  await backupFile(absolutePath);
  await fs.writeFile(absolutePath, newContent);
  console.log(chalk.green(`✅ [MODIFIED] ${filePath}`));
}