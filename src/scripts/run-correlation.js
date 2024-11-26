import { spawn } from 'child_process';

import { CITY_NAME, CORRELATION_FIELD1, CORRELATION_FIELD2 } from './init.js';

/**
 * @fileoverview This script spawns a Python process to run a specific Python script with given arguments.
 *
 * @constant {ChildProcess} pythonProcess
 */
const pythonProcess = spawn('python', [
  'src/scripts/correlation.py',
  CITY_NAME,
  CORRELATION_FIELD1,
  CORRELATION_FIELD2,
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
