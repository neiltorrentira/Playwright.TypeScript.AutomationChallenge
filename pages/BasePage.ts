import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  
  async pressEscapeAndWait(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

  async dismissOverlayIfPresent(): Promise<void> {
    const greyout = this.page.locator('div.greyout').first();
    const isBlocking = await greyout.isVisible({ timeout: 500 }).catch(() => false);
    if (!isBlocking) return;
    
    //await this.page.screenshot({ path: `test-results/recaptcha-${Date.now()}.png`, fullPage: true });

    const checkbox = this.page.frameLocator('iframe[src*="recaptcha/api2/anchor"]').getByRole('checkbox');
    const checkboxVisible = await checkbox.isVisible({ timeout: 3000 }).catch(() => false);
    if (checkboxVisible) {
      await checkbox.click();
      await this.page.click('button.bubble-element.Button.clickable-element');
      await this.page.waitForTimeout(1500);
    }
  }
}

