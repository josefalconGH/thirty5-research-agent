#!/usr/bin/env node
import { Command } from 'commander';
import { explainFile } from './commands/explain.js';
import { generateFile } from './commands/generate.js';
import { summarizeFolder } from './commands/summarize.js';
import { injectCode } from './commands/inject.js';
import { modifyFile } from './commands/modify.js';

const program = new Command();
program.version('1.1.0').description('GPT Dev Assistant');

program
  .command('explain <file>')
  .description('Explains the code in a file using GPT')
  .action((file) => {
    explainFile(file);
  });

program
  .command('generate <type> <name>')
  .description('Generates a file of the given type (component, route, etc.) using GPT')
  .action((type, name) => {
    generateFile(type, name);
  });

program
  .command('summarize <folder>')
  .description('Summarizes the contents of a folder using GPT')
  .action((folder) => {
    summarizeFolder(folder);
  });

program
  .command('inject <file> <task>')
  .description('Inject new code into a file based on a prompt')
  .option('--preview', 'Preview the output without saving')
  .option('--diff', 'Show a diff between old and new content')
  .action((file, task, options) => {
    injectCode(file, task, options);
  });

program
  .command('modify <file> <goal>')
  .description('Modify or refactor a file based on a goal')
  .option('--preview', 'Preview the output without saving')
  .option('--diff', 'Show a diff between old and new content')
  .action((file, goal, options) => {
    modifyFile(file, goal, options);
  });

program.parse(process.argv);