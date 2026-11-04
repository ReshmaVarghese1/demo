import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart-page';
import { MacBookSearchPage } from '../pages/macbook-search-page';

test('search for MacBook, add it to cart, and remove it from the cart', async ({ page }) => {
  const searchPage = new MacBookSearchPage(page);
  const cartPage = new CartPage(page);

  await searchPage.open();
  await searchPage.searchFor('macbook');
  await expect(page).toHaveURL(/route=product\/search.*search=macbook/);

  await searchPage.addMacBookToCart();
  await expect(searchPage.addToCartConfirmation).toContainText('MacBook');

  await cartPage.open();
  await expect(page).toHaveURL(/route=checkout\/cart/);
  await expect(cartPage.macBookQuantity).toHaveValue('1');

  await cartPage.removeMacBook();
  await expect(cartPage.emptyCartMessage).toBeVisible();
});
