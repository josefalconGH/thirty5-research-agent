// Purpose: generate a file using GPT
import fs from 'fs/promises';
import path from 'path';
import { askGPT } from '../utils/gpt.js';
import chalk from 'chalk';

export async function generateFile(type, name) {
  const prompt = `Create a ${type} named "${name}". Only return the code, no explanation.`;

  try {
    const response = await askGPT(prompt);
    const outputDir = type === 'component' ? `../client/components/${name}` : `./generated`;
    const fileName = type === 'component' ? `${name}.jsx` : `${name}.js`;

    await fs.mkdir(path.resolve(outputDir), { recursive: true });
    await fs.writeFile(path.resolve(outputDir, fileName), response);

    console.log(chalk.green(`✅ [GENERATED] ${fileName} in ${outputDir}`));
  } catch (error) {
    console.error(chalk.red(`❌ [ERROR]: ${error.message}`));
  }
}