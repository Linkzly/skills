#!/usr/bin/env node
// Installs the Linkzly skills from this package's own folder with the `skills` tool.
// Everything after the command name is passed on to `skills add`, for example `-a cursor -y`.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// cmd.exe reports a missing command with these codes instead of an error object
const NOT_STARTED = { win32: [9009, 127] };

const quoteForCmd = (arg) => (/^[\w@%+=:,./\\-]+$/.test(arg) ? arg : `"${arg.replace(/"/g, '\\"')}"`);

/**
 * Decides what to run. On Windows npx is a .cmd file that only a shell can start, and Node joins an
 * argument array for cmd.exe without quoting, so there the whole line is built here with quotes.
 * Elsewhere no shell is used and the arguments stay an array.
 * @param {{ platform: string, root: string, args: string[] }} input
 * @returns {{ command: string, args: string[], options: { shell: boolean } }}
 */
export function buildInvocation({ platform, root, args }) {
  // --package=skills: when this file itself runs under npx, a bare `npx skills` looks for a command named
  // skills inside this package and finds none.
  // --copy: the default links to this folder, which is npx's temporary one and does not last
  const parts = ["--yes", "--package=skills", "--", "skills", "add", root, "--copy", ...args];
  if (platform === "win32") return { command: ["npx", ...parts.map(quoteForCmd)].join(" "), args: [], options: { shell: true } };
  return { command: "npx", args: parts, options: { shell: false } };
}

/**
 * @param {string} platform
 * @param {number | null | undefined} status
 */
export function notStarted(platform, status) {
  return (NOT_STARTED[/** @type {"win32"} */ (platform)] ?? []).includes(status ?? -1);
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { command, args, options } = buildInvocation({ platform: process.platform, root, args: process.argv.slice(2) });
  const result = spawnSync(command, args, { stdio: "inherit", ...options });
  if (result.error || notStarted(process.platform, result.status)) {
    console.error(`Could not start the skills installer${result.error ? `: ${result.error.message}` : " (npx was not found)"}`);
    console.error("Install from GitHub instead: npx skills add Linkzly/skills");
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

// npx starts this file through a link, so compare real paths
if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) main();
