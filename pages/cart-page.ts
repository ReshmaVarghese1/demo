import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly emptyCartMessage: Locator;
  readonly macBookQuantity: Locator;
  private readonly macBookRow: Locator;

  constructor(private readonly page: Page) {
    this.macBookRow = page
      .locator('#content')
      .getByRole('row')
      .filter({ has: page.getByRole('link', { name: 'MacBook', exact: true }) });
    this.macBookQuantity = this.macBookRow.getByRole('textbox');
    this.emptyCartMessage = page
      .locator('#content')
      .getByText('Your shopping cart is empty!', { exact: true });
  }

  async open(): Promise<void> {
    await this.page.locator('#cart-total').click();
    await this.page.getByRole('link', { name: /View Cart/ }).click();
  }

  async removeMacBook(): Promise<void> {
    await this.macBookRow.getByRole('button').last().click();
  }
}
