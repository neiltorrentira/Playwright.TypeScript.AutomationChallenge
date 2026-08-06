import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ChallengeRow } from '../utils/excelReader';

const FIELD_PREFIXES: Record<keyof ChallengeRow, string> = {
  companyName: 'company_name_input_field_',
  address: 'address_input_field_',
  ein: 'ein_input_field_',
  sector: 'sector_input_field_',
  automationTool: 'automation_tool_input_field_',
  annualSaving: 'annual_saving_input_field_',
  date: 'date_input_field_',
};

export class ChallengePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async start(): Promise<void> {
    await this.page.getByRole('button', { name: 'Start' }).click();
  }

  private fieldLocator(key: keyof ChallengeRow) {
    return this.page.locator(`input[id^="${FIELD_PREFIXES[key]}"]:visible`);
  }

  async fillRow(row: ChallengeRow, rowIndex: number): Promise<void> {
    for (const key of Object.keys(FIELD_PREFIXES) as (keyof ChallengeRow)[]) {
      const field = this.fieldLocator(key);
      await expect(field, `Row ${rowIndex}: expected exactly 1 visible input for "${key}"`).toHaveCount(1);
      await field.fill(row[key]);
    }
  }

  async submit(): Promise<void> {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.page.getByRole('button', { name: 'Submit' }).click({ timeout: 10000 });
        return;
      } catch (error) {
        if (attempt === maxAttempts) throw error;
        await this.dismissReCaptchaPresent();
      }
    }
  }

  async isChallengeComplete(): Promise<boolean> {
    return this.page.getByText(/congratulations/i).isVisible({ timeout: 5000 }).catch(() => false);
  }
}