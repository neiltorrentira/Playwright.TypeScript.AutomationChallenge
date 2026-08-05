# The Automation Challenge — Playwright Automation

End-to-end Playwright + TypeScript automation for [The Automation Challenge](https://www.theautomationchallenge.com/). Logs in, starts the timed 50-round challenge, and types every row from `data/challenge.xlsx` into the on-screen form - even though the fields relocate, resize, and get new selectors after every Submit.

## How field matching works

Each field's HTML `id` keeps a stable prefix (e.g. `company_name_input_field_`) even though the numeric suffix, on-screen position, and size all change every round. The automation locates each field with `input[id^="<prefix>"]:visible` rather than reading visual labels — verified robust across dozens of live rounds.

## Getting Started

```bash
npm install
npx playwright install chromium
```

Credentials and the target URL are stored in `data/test-data.json`. Passwords are stored as base64-encoded strings and decoded at runtime using `Buffer.from(encodedPassword, 'base64').toString('utf-8')` by `utils/environment.ts`.

## Running

Headed mode:

```bash
npx playwright test tests/automation-challenge.spec.ts --headed  # bash  # PowerShell
```

For the fastest run (headless), set `HEADLESS=true`:

```bash
HEADLESS=true npx playwright test tests/automation-challenge.spec.ts   # bash
$env:HEADLESS='true'; npx playwright test tests/automation-challenge.spec.ts   # PowerShell
```

## Project Structure

```
.
├── .gitignore
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── data/
│   └── challenge.xlsx               # 50 rows of company data to type in
│   └── test-data.json               # data for the test
├── pages/
│   ├── BasePage.ts                  # base page
│   ├── ChallengePage.ts             # Start, per-round field fill, Submit, completion check
│   └── LoginPage.ts                 # login flow
├── tests/
│   ├── automation-challenge.spec.ts # the full 50-row timed run
└── utils/
    ├── environment.ts               # resolves BASE_URL/USERNAME/PASSWORD from test-data.json
    └── excelReader.ts               # reads data/challenge.xlsx into typed row objects
```

## Known limitation

The automation has not yet completed a full live 50-row run end to end. It runs like 40+ or so rounds correctly, but the site's real Google reCAPTCHA overlay (which the site itself warns is a random pop-up) has appeared and blocked progress around round 40+ of 50.