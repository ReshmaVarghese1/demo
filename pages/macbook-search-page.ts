import { type Locator, type Page } from '@playwright/test';

export class MacBookSearchPage {
  readonly addToCartConfirmation: Locator;
  readonly cartSummary: Locator;
  readonly cartQuantity: Locator;
  readonly emptyCartMessage: Locator;
  private readonly macBookCartRow: Locator;
  private readonly macBookProduct: Locator;
  private readonly searchField: Locator;

  constructor(private readonly page: Page) {
    this.searchField = page.getByRole('textbox', { name: 'Search' });
    this.macBookProduct = page
      .locator('#content .product-layout')
      .filter({ has: page.getByRole('heading', { name: 'MacBook', exact: true }) });
    this.addToCartConfirmation = page.locator('.alert-success');
    this.cartSummary = page.locator('#cart-total');
    this.macBookCartRow = page
      .getByRole('row')
      .filter({ has: page.getByRole('link', { name: 'MacBook', exact: true }) });
    this.cartQuantity = this.macBookCartRow.getByRole('textbox');
    this.emptyCartMessage = page
      .locator('#content')
      .getByText('Your shopping cart is empty!', { exact: true });
  }

  async open(): Promise<void> {
    await this.page.goto('https://tutorialsninja.com/demo/');
  }

  async searchFor(product: string): Promise<void> {
    await this.searchField.fill(product);
    await this.searchField.press('Enter');
  }

  async addMacBookToCart(): Promise<void> {
    await this.macBookProduct.getByRole('button', { name: /Add to Cart/ }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartSummary.click();
    await this.page.getByRole('link', { name: /View Cart/ }).click();
  }

  async removeMacBookFromCart(): Promise<void> {
    await this.macBookCartRow.getByRole('button').last().click();
  }
}
