// Purpose: summarize contents of a folder using GPT
import fs from 'fs/promises';
import path from 'path';
import { askGPT } from '../utils/gpt.js';
import chalk from 'chalk';

export async function summarizeFolder(folderPath) {
  try {
    const absolutePath = path.resolve(process.cwd(), folderPath);
    const files = await fs.readdir(absolutePath);

    let summaryPrompt = `Give a summary of what this folder contains and what each file does:\n\n`;

    for (const file of files) {
      const filePath = path.join(absolutePath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile() && ['.js', '.jsx'].includes(path.extname(file))) {
        const content = await fs.readFile(filePath, 'utf-8');
        summaryPrompt += `---\nFilename: ${file}\n${content.slice(0, 1500)}\n\n`;
      }
    }

    const response = await askGPT(summaryPrompt);
    console.log(chalk.cyan(`📁 [SUMMARY] ${folderPath}:\n\n`));
    console.log(chalk.green(response));
  } catch (error) {
    console.error(chalk.red(`❌ [ERROR]: ${error.message}`));
  }
}