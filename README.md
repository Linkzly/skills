# Linkzly Skills

Two [Agent Skills](https://agentskills.io) that let your AI coding agent add the Linkzly SDK to your project: linkzly-mobile-sdk for iOS, Android, React Native and Flutter apps, and linkzly-web-sdk for websites and web apps.

Each skill carries the same instructions as [docs.linkzly.com](https://docs.linkzly.com), cut to your platform, and rules for the SDK behaviours that are easy to get wrong. Both cover install and configuration, custom events, purchases and refunds, and privacy controls. The mobile skill also covers deep links and deferred deep links, push tokens, affiliate attribution, SKAdNetwork and tracking permission; the web skill also covers page views, smart link and UTM attribution, and consent.

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

The repository holds both skills, and your agent uses the one that fits your project. To install one only, name it:

```
npx skills add Linkzly/skills --skill linkzly-web-sdk
```

For a mobile app, use `--skill linkzly-mobile-sdk`.

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

Then copy the folder of each skill you use, `skills/linkzly-mobile-sdk` or `skills/linkzly-web-sdk`, into your agent's skills folder (for Claude Code, `~/.claude/skills/`).

## Update

The skill does not update itself, unless your agent updates plugins for you. Update it after you update the Linkzly SDK in your app, and whenever a new version is published here.

### Installed with `npx skills add`

```
npx skills update
```

For a project install, run it in the project folder. It asks whether to update the project's skills or your global ones; `-p` or `-g` answers that up front. Running your `npx skills add` command again does the same job; a command without `--skill` now installs both skills.

To add the web skill to an install that has only the mobile one, run the one-skill command above.

### Claude Code plugin

In a session, run `/plugin`, open the **Marketplaces** tab, select `linkzly` and choose **Update marketplace**. Or run these in your shell:

```
claude plugin marketplace update linkzly
claude plugin update linkzly@linkzly
```

Then run `/reload-plugins`, or start a new session. To get later versions without these steps, choose **Enable auto-update** for `linkzly` on the same tab.

### Any other plugin install

Update the plugin in your agent, or remove it and install it again with the steps under [Install](#install).

### By hand

Run `git pull` in your clone and copy the folder of each skill you use, `skills/linkzly-mobile-sdk` or `skills/linkzly-web-sdk`, into your agent's skills folder again.

## Use

Open your app's project with your agent and ask, for example:

- "Add the Linkzly SDK to this app."
- "Track a `signup_completed` event when sign-up finishes."
- "Track purchases and refunds with Linkzly."
- "Set up Linkzly push notifications."
- "Add the Linkzly Web SDK to this site and track a purchase on the order confirmation page."

The agent will ask you for your SDK key and for anything else only you can supply. It never makes up a key. At the end it lists what is left for you to do in the Linkzly console, such as registering the event names it used.

## What it does not do

It changes your app's code and project files. It does not sign in to the Linkzly console, create apps or links there, or change your Linkzly account.

## How this repository is maintained

Everything in the `references/` folder of each skill is generated from the pages on docs.linkzly.com. Please do not send changes to those files. If something there is wrong, the docs page is wrong too: open an issue here and it will be fixed at the source.

## Licence

MIT. See [LICENSE](LICENSE).
