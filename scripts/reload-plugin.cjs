const { spawnSync } = require('child_process');
const { readFileSync } = require('fs');

function runCommand(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf8',
    shell: process.platform === 'win32',
    timeout: 10000,
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const combined = `${result.stdout || ''}\n${result.stderr || ''}`.toLowerCase();
  const hasUsageError = combined.includes('missing required parameter') || combined.includes('usage:');
  return result.status === 0 && !hasUsageError;
}

function runShellCommand(commandString) {
  const result = spawnSync(commandString, {
    stdio: 'inherit',
    shell: true,
    timeout: 10000,
  });

  return result.status === 0;
}

const manifest = JSON.parse(readFileSync('manifest.json', 'utf8'));
const pluginId = manifest.id;

const override = process.env.OBSIDIAN_RELOAD_CMD;
if (override) {
  const ok = runShellCommand(override);
  if (ok) {
    console.log(`Reloaded plugin via OBSIDIAN_RELOAD_CMD for ${pluginId}.`);
  } else {
    console.warn('OBSIDIAN_RELOAD_CMD failed. Build completed, but plugin reload was not confirmed.');
  }
  process.exit(0);
}

const candidates = [
  ['obsidian', ['plugin', 'reload', `id=${pluginId}`]],
  ['obsidian', ['plugins', 'reload', `id=${pluginId}`]],
  ['obsidian', ['reload-plugin', pluginId]],
];

for (const [command, args] of candidates) {
  if (runCommand(command, args)) {
    console.log(`Reloaded plugin ${pluginId} using: ${command} ${args.join(' ')}`);
    process.exit(0);
  }
}

console.warn(
  'Obsidian reload command was not detected. Build artifacts were synced, but plugin reload was not confirmed. ' +
  'Set OBSIDIAN_RELOAD_CMD to your working command to enable automatic reload.'
);
process.exit(1);
