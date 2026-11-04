import { test, expect } from '@playwright/test';
import { MacBookSearchPage } from '../pages/macbook-search-page';

test.describe('MacBook cart flow', () => {
  test('Search for MacBook, add it to the cart, and remove it', async ({ page }) => {
    const searchPage = new MacBookSearchPage(page);

    // 1. Navigate to https://tutorialsninja.com/demo/.
    await searchPage.open();

    // 2. Enter "macbook" in the Search field and submit the search.
    await searchPage.searchFor('macbook');
    await expect(page).toHaveURL(/route=product\/search.*search=macbook/);
    await expect(page.getByRole('heading', { name: 'Search - macbook' })).toBeVisible();

    // 3. On the search results, add the MacBook product to the cart.
    await searchPage.addMacBookToCart();

    // 4. Verify the product was added and the cart count is 1 item.
    await expect(searchPage.addToCartConfirmation).toContainText('Success: You have added');
    await expect(searchPage.addToCartConfirmation).toContainText('MacBook');
    await expect(searchPage.cartSummary).toContainText('1 item(s)');

    // 5. Open the cart and verify the MacBook quantity.
    await searchPage.goToCart();
    await expect(page).toHaveURL(/route=checkout\/cart/);
    await expect(page.getByRole('heading', { name: 'Shopping Cart' })).toBeVisible();
    await expect(searchPage.cartQuantity).toHaveValue('1');

    // 6. Remove the MacBook and verify the cart is empty.
    await searchPage.removeMacBookFromCart();
    await expect(searchPage.emptyCartMessage).toBeVisible();
  });
});
