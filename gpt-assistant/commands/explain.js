// Purpose: explain a file using GPT
import fs from 'fs/promises';
import path from 'path';
import { askGPT } from '../utils/gpt.js';
import chalk from 'chalk';

export async function explainFile(filePath) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');

    console.log(chalk.blue(`[EXPLAINING] ${filePath}...\n`));

    const response = await askGPT(
      `Explain the following file in detail:\n\n${content}`
    );

    console.log(chalk.green(response));
  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
  }
}