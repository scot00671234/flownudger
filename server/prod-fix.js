import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for import.meta.dirname not being available in bundled Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Polyfill import.meta.dirname for production
globalThis.import = globalThis.import || {};
globalThis.import.meta = globalThis.import.meta || {};
globalThis.import.meta.dirname = __dirname;

// Now import the main server
import('./index.js');