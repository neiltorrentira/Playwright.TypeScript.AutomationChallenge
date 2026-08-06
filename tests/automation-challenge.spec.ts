import { test, expect } from '@playwright/test';
import path from 'path';
import { USERNAME, PASSWORD } from '../utils/environment';
import { readChallengeRows } from '../utils/excelReader';
import { LoginPage } from '../pages/LoginPage';
import { ChallengePage } from '../pages/ChallengePage';

test.describe('The Automation Challenge', () => {
  test('completes all 50 rows with 100% accuracy in minimal time', async ({ page }) => {
    test.setTimeout(300000);
    const rows = readChallengeRows(path.resolve(__dirname, '../data/challenge.xlsx'));
    expect(rows).toHaveLength(50);

    const loginPage = new LoginPage(page);
    const challengePage = new ChallengePage(page);

    await loginPage.goto();
    await loginPage.openLoginForm();
    await loginPage.login(USERNAME, PASSWORD);
    await challengePage.start();

    const startedAt = Date.now();
    for (let i = 0; i < rows.length; i++) {
      await challengePage.fillRow(rows[i], i + 1);
      await challengePage.submit();
      await challengePage.dismissReCaptchaPresent();
    }
    const elapsedMs = Date.now() - startedAt;
    console.log(`Completed ${rows.length} rows in ${elapsedMs}ms`);

    expect(await challengePage.isChallengeComplete()).toBe(true);
  });
});