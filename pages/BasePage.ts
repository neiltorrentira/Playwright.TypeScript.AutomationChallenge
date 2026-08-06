import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}
  
  async pressEscapeAndWait(): Promise<void> {
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
  }

async dismissReCaptchaIfPresent(): Promise<void> {
    const popupHeading = this.page.getByText('Get through this reCAPTCHA to continue');
    const isBlocking = await popupHeading.isVisible({ timeout: 500 }).catch(() => false);
    if (!isBlocking) return;

    await this.page.waitForTimeout(500);
    await this.page.screenshot({ path: `test-results/recaptcha-${Date.now()}.png`, fullPage: true });

    const popupContainer = this.page.locator('div.bubble-element.Popup', {
      hasText: 'Get through this reCAPTCHA to continue',
    });
    const recaptchaButton = popupContainer.locator('button.clickable-element');

    for (let attempt = 1; attempt <= 2; attempt++) {
      const buttonVisible = await recaptchaButton.isVisible({ timeout: 3000 }).catch(() => false);
      if (buttonVisible) {
        await recaptchaButton.click({ force: true }).catch(() => {});
      }
      await this.page.waitForTimeout(1500);

      const stillBlocking = await popupHeading.isVisible({ timeout: 1000 }).catch(() => false);
      if (!stillBlocking) return;
    }

    throw new Error(
      "reCAPTCHA pop-up could not be dismissed after click attempts on the popup's " +
      'checkbox button. See the screenshot in test-results/.'
    );
  }

}

