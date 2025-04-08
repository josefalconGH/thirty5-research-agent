#!/usr/bin/env node
import { Command } from 'commander';
import { explainFile } from './commands/explain.js';
import { generateFile } from './commands/generate.js';
import { summarizeFolder } from './commands/summarize.js';

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
  .description('Generate a component folder with index.jsx (GPT-powered)')
  .option('--prompt <prompt>', 'Custom GPT prompt to guide generation')
  .option('--preview', 'Show the GPT response without writing to disk')
  .action((type, name, options) => {
    generateFile(type, name, options);
  });

program
  .command('summarize <folder>')
  .description('Summarizes the contents of a folder using GPT')
  .action((folder) => {
    summarizeFolder(folder);
  });

program.parse(process.argv);