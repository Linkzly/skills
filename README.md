# Linkzly Skills

An [Agent Skill](https://agentskills.io) that lets your AI coding agent add a Linkzly mobile SDK to your app: iOS, Android, React Native and Flutter.

The skill carries the same instructions as [docs.linkzly.com](https://docs.linkzly.com), cut to your platform, and rules for the SDK behaviours that are easy to get wrong. It covers install and configuration, custom events, purchases and refunds, deep links and deferred deep links, push tokens, affiliate attribution, SKAdNetwork and tracking permission, and privacy controls.

## Install

### Any agent that supports Agent Skills

```
npx skills add Linkzly/skills
```

The installer asks which of your agents to install for.

The full address of the repository works the same way:

```
npx skills add https://github.com/Linkzly/skills
```

### Claude Code

```
/plugin marketplace add Linkzly/skills
/plugin install linkzly@linkzly
```

### Codex

```
codex plugin marketplace add Linkzly/skills
codex plugin add linkzly@linkzly
```

Start a new Codex session after installing.

### Cursor

Add it under **Settings > Rules > Add Rule > Remote Rule (GitHub)** with `Linkzly/skills`, or run `npx skills add Linkzly/skills -a cursor`.

### GitHub Copilot in VS Code

1. Turn on `chat.plugins.enabled` in VS Code settings.
2. Open the Command Palette and run **Chat: Install Plugin From Source**.
3. Enter `https://github.com/Linkzly/skills`.

Or run `npx skills add Linkzly/skills -a github-copilot`.

### Antigravity

Run this in your project folder:

```
npx skills add Linkzly/skills -a antigravity
```

It puts the skill in the project's `.agents/skills/` folder.

### Other agents

Agents that take no skills can read the docs directly: <https://docs.linkzly.com/llms.txt> lists every page, and each page has a markdown copy at `https://docs.linkzly.com/docs/<page>.md`.

### By hand

Clone the repository:

```
git clone https://github.com/Linkzly/skills.git
```

Then copy its folder `skills/linkzly-mobile-sdk` into your agent's skills folder (for Claude Code, `~/.claude/skills/`).

## Use

Open your app's project with your agent and ask, for example:

- "Add the Linkzly SDK to this app."
- "Track a `signup_completed` event when sign-up finishes."
- "Track purchases and refunds with Linkzly."
- "Set up Linkzly push notifications."

The agent will ask you for your SDK key and for anything else only you can supply. It never makes up a key. At the end it lists what is left for you to do in the Linkzly console, such as registering the event names it used.

## What it does not do

It changes your app's code and project files. It does not sign in to the Linkzly console, create apps or links there, or change your Linkzly account.

## How this repository is maintained

Everything under `skills/linkzly-mobile-sdk/references/` is generated from the pages on docs.linkzly.com. Please do not send changes to those files. If something there is wrong, the docs page is wrong too: open an issue here and it will be fixed at the source.

## Licence

MIT. See [LICENSE](LICENSE).
