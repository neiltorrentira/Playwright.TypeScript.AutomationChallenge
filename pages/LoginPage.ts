import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { BASE_URL } from '../utils/environment';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  async openLoginForm(): Promise<void> {
    await this.page.getByRole('button', { name: 'SIGN UP OR LOGIN' }).click();
    await this.page.getByRole('button', { name: 'OR LOGIN', exact: true }).click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.locator('input[type="email"]:visible').fill(username);
    await this.page.locator('input[type="password"]:visible').fill(password);
    await this.page.getByRole('button', { name: 'LOG IN' }).click();
  }
}