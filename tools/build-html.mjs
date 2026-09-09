// Compatibility entrypoint for the playlist-only edition.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const script = fileURLToPath(new URL('./build-playlist.py', import.meta.url));
const result = spawnSync('python3', [script], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
