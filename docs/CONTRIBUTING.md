# Contributing

When forking the repository, make sure to uncheck "Copy the main branch only". You need the `dev` branch as well.

Please create a new branch from `dev` to make changes to on your fork, then create a pr to the `dev` branch on the original repository.

Please name your branches in `kebab-case`.

We will use the `dev` branch for development. At the end of each sprint, changes will be merged into `main`.

## Commit messages

### Commit messages should describe what is in them.

Good:
- update julia's contact info in README.md
- add endpoint for registration
- fix bug that causes registration to fail if username is empty

Bad:
- fixed it
- fix bug
- asdfasdgklasdjgklasjflkjf

### Commit messages should be in [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) and begin with a verb.

Good:
- **update** julia's contact info in README.md
- **add** endpoint for registration
- **fix** bug that causes registration to fail if username is empty

Bad:
- **updated** julia's contact info in README.md
- i **updated** julia's contact info in README.md
- this commit **updates** julia's contact info in README.md

### Commit messages should consistently use the [present tense](https://en.wikipedia.org/wiki/Present_tense).

Good:
- fix bug that **causes** registration to fail if username **is** empty

Bad:
- fix bug that **caused** registration to fail if username **was** empty

## PR Reviews

### Make sure the PR follows style guidelines

See `STYLE_GUIDE.md`.

### Be constructive

Only saying something is bad doesn't help. Give feedback that would be useful to the person recieving it.

### Be nice

Insulting other people or their code doesn't accomplish anything.
