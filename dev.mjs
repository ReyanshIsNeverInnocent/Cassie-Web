import { spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const cwd = dirname(fileURLToPath(import.meta.url));
const processes = [
  { name: 'API', args: ['--env-file=.env', 'api-server.mjs'] },
  { name: 'Vite', args: ['node_modules/vite/bin/vite.js'] },
];

let shuttingDown = false;
let exitCode = 0;
const children = processes.map(({ name, args }) => {
  const child = spawn(process.execPath, args, { cwd, stdio: 'inherit' });

  child.on('error', (error) => {
    console.error(`[${name}] Failed to start: ${error.message}`);
    stop(1);
  });

  child.on('exit', (code) => {
    if (!shuttingDown) {
      console.error(`[${name}] exited; stopping the other development process.`);
      stop(code ?? 1);
    }
  });

  return child;
});

function stop(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  exitCode = code;
  for (const child of children) {
    if (child.exitCode === null && !child.killed) child.kill();
  }
}

process.on('SIGINT', () => stop(0));
process.on('SIGTERM', () => stop(0));

for (const child of children) {
  child.on('exit', () => {
    if (shuttingDown && children.every((process) => process.exitCode !== null)) {
      process.exitCode = exitCode;
    }
  });
}
