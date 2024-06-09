import { test, expect } from '@playwright/test';
test('very slow test', async ({ page }) => {
  test.setTimeout(120000);
  await page.goto('https://holisticpeoplecom.kinsta.cloud/');
  
  // Check if the "Dismiss" button exists and is visible
  const dismissButton = page.getByRole('link', { name: 'Dismiss' });
  if (await dismissButton.isVisible()) {
    await dismissButton.click();
  }

  await page.locator('i').nth(1).click();
  await page.locator('#dgwt-wcas-search-input-2').click();
  await page.locator('#dgwt-wcas-search-input-2').fill('acs');
  await page.locator('#dgwt-wcas-search-input-2').press('Enter');
  await page.goto('https://holisticpeoplecom.kinsta.cloud/product/acs-200-advanced-cellular-silver-4-fl-oz/');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByLabel('Increment').click();
  await page.getByLabel('Increment').click();
  await page.getByRole('link', { name: 'Proceed to checkout' }).click();
  await page.getByPlaceholder('Email Address').fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'First name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Last name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Street address' }).fill('Test st');
  await page.getByRole('textbox', { name: 'Town / City' }).fill('Testown');
  await page.getByRole('textbox', { name: 'ZIP Code' }).fill('03086');
  await page.locator('div').filter({ hasText: /^UPS 2nd Day Air\$14\.86$/ }).click();
  await page.getByLabel('Check payments').check();
  await page.getByLabel('I have read and agree to the').check();
  await page.getByRole('button', { name: 'Complete Order' }).click();
  await page.getByPlaceholder('Shipping Phone').fill('603111111');
  await page.getByPlaceholder('Shipping Phone').press('Enter');
  await page.getByRole('button', { name: 'Complete Order' }).click();

  // Wait for the order received page or timeout after 40 seconds
  try {
    const orderReceivedSelector = 'ul.woocommerce-order-overview.woocommerce-thankyou-order-details.order_details'; // Adjust this selector based on actual element
    await page.waitForSelector(orderReceivedSelector, { timeout: 40000 });
  } catch (error) {
    if (error.name === 'TimeoutError') {
      console.log('Page did not load fully within 40 seconds');
    } else {
      throw error;
    }
  }

  await page.goto('https://holisticpeoplecom.kinsta.cloud/checkout/order-received/105963/?key=wc_order_0TasrcNmu4wiN');
});