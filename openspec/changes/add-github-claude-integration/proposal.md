# Change: Add GitHub Claude Integration
## Why
Enable automated development workflow where Claude can be tagged in GitHub issues and PRs to automatically implement changes, create PRs, and integrate with CI/CD pipeline.
## What Changes
- Add Claude Code GitHub Action workflow (`.github/workflows/claude.yml`)
- Add CI/CD workflow for build and lint (`.github/workflows/ci.yml`)
- Configure Claude to respond to @claude mentions in issues and PRs
- Set up automated PR creation capabilities
## Impact
- Affected specs: `github-integration` (new capability)
- Affected code:
  - `.github/workflows/claude.yml` - Claude Code Action
  - `.github/workflows/ci.yml` - Build and lint pipeline
- Required secrets:
  - `ANTHROPIC_API_KEY` - Claude API key (user must add manually)
