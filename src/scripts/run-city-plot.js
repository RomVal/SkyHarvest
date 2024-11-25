import { spawn } from 'child_process';

import { CITY_NAME } from './init.js';

/**
 * @fileoverview This script spawns a Python process to run a specific Python script with given arguments.
 *
 * @constant {ChildProcess} pythonProcess - The spawned Python process running the 'visual-city.py' script with 'berlin' as an argument.
 */
const pythonProcess = spawn('python', [
  'src/scripts/show-city-plot.py',
  CITY_NAME,
]);

pythonProcess.stdout.on('data', (data) => {
  // eslint-disable-next-line no-console
  console.log(`Output: ${data.toString()}`);
});

pythonProcess.stderr.on('data', (data) => {
  // eslint-disable-next-line no-console
  console.error(`Error: ${data.toString()}`);
});

pythonProcess.on('close', (code) => {
  // eslint-disable-next-line no-console
  console.log(`Python script exited with code ${code}`);
});
