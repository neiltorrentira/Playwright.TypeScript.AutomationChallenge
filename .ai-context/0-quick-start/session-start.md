# Session Start - Playwright Automation Challenge

This brief is tailored to this repository (Playwright + TypeScript automation for The Automation Challenge). Keep entries concise and use the checklist to validate results.

## Objective
- Current goal: (e.g., reproduce a failing run, implement a fix, add a small feature, or run the full 50-row challenge)
- Expected outcome: Clear, verifiable result (tests pass / bug reproduced and fixed / local run completes)
- Definition of done: The requested behavior is implemented and validated with the smallest relevant command or test; changes are limited to related files and documented when behavior changes.

## Project summary (from README)
- Purpose: End-to-end Playwright + TypeScript automation for The Automation Challenge. The test logs in, starts the timed 50-round challenge, and types rows from `data/challenge.xlsx` into the on-screen form even as fields change position, size, and selectors.
- Field-matching approach: Inputs keep a stable id prefix (e.g. `company_name_input_field_`). The code locates fields using selectors like `input[id^="<prefix>"]:visible` rather than relying on visual labels.
- Credentials & config: `data/test-data.json` stores BASE_URL, USERNAME, and PASSWORD (username/password are base64-encoded). `utils/environment.ts` decodes the values at runtime using Buffer.from(..., 'base64').toString('utf-8').
- Known intermittent issue: Occasionally a "Try Again" error may appear after a full 50-row run; this may be timing-related. Consider asserting a final SUCCESS! or adding a retry on the final completion check when investigating flakiness.

## Prerequisites
- Node.js 18+ (npm bundled)
- Git

## Quick setup (run in repo root)
- npm install
- npx playwright install chromium

## How to run (examples)
- Headed (PowerShell):
  $env:HEADLESS='false'; npx playwright test tests/automation-challenge.spec.ts --headed

- Headless (fastest):
  PowerShell:
  $env:HEADLESS='true'; npx playwright test tests/automation-challenge.spec.ts

- Run the specific test file instead of the whole suite when validating small changes.

## Relevant files / areas
- data/challenge.xlsx — 50 rows of company data
- data/test-data.json — credentials and environment settings
- pages/BasePage.ts, ChallengePage.ts, LoginPage.ts — page objects
- tests/automation-challenge.spec.ts — the full 50-row timed run
- utils/environment.ts — decodes credentials and exposes BASE_URL/USERNAME/PASSWORD
- utils/excelReader.ts — reads the Excel file into typed objects

## Immediate plan (concrete steps)
1. Reproduce the issue or run the scenario locally using the commands above.
2. Read the relevant page object(s) and `utils/environment.ts` or `excelReader.ts` depending on the task.
3. Implement the smallest change required (selector tweak, timing adjust, or logic fix).
4. Run the targeted test file or a narrow check to validate.
5. Commit changes with a clear message and include follow-up notes here if needed.

## Validation checklist
- [ ] npm install + browser binary installed (npx playwright install chromium)
- [ ] Targeted test(s) executed (headed or headless as appropriate)
- [ ] Behavior matches expected outcome (no regressions in related flows)
- [ ] No unrelated files modified
- [ ] Notes added for any intermittent or non-deterministic behavior


