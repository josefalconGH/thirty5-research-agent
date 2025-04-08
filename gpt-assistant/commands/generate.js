// Purpose: generate a React component using GPT
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import readline from 'readline';
import { askGPT } from '../utils/gpt.js';

async function confirmPrompt(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer === '');
    });
  });
}

export async function generateFile(type, name, options = {}) {
  const generators = {
    component: generateComponent,
    // (FUTURE) hook: generateHook, utility: generateUtility, etc.
  };

  const generator = generators[type];
  if (!generator) {
    console.log(chalk.red(`❌ [Error] Unsupported generate type: '${type}'`));
    return;
  }

  await generator(name, options);
}

async function generateComponent(fullPath, options) {
  if (!options.prompt) {
    console.log(
      chalk.red(`❌ [Error] A prompt is required. Use --prompt "..." to describe your component.`)
    );
    return;
  }

  if (!fullPath || fullPath.trim() === '.') {
    console.log(
      chalk.red(`❌ [Error] You must provide a valid output path (e.g., ../dir/dir/folderName).`)
    );
    return;
  }

  const componentName = path.basename(fullPath); // e.g., "folderName"
  const basePath = path.resolve(process.cwd(), fullPath);
  const filePath = path.join(basePath, 'index.jsx');

  try {
    console.log(chalk.yellowBright(`\n🧠 [PROMPT] Generating '${componentName}' with your prompt...`));
    const componentCode = await askGPT(options.prompt);

    console.log(chalk.yellow(`\n🚧 [PREVIEW]:`));
    console.log(chalk.gray(`\n📄 ${filePath}`));
    console.log(`\n${componentCode}`);

    const confirm = await confirmPrompt(
      chalk.blue(`\n💾 Save this to ${filePath}? (Y/n): `)
    );

    if (!confirm) {
      console.log(chalk.gray(`🚫 [CANCELLED] No file written.`));
      return;
    }

    await fs.mkdir(basePath, { recursive: true });
    await fs.writeFile(filePath, componentCode);

    console.log(chalk.green(`\n✅ [SUCCESS] Component saved to:`));
    console.log(chalk.green(`📄 ${filePath}`));
  } catch (error) {
    console.error(chalk.red(`❌ [ERROR]: ${error.message}`));
  }
}