// loginHelper.js
async function loginToCRM(page) {
  await page.goto('https://crm.staging.trillium.health');
  await page.getByRole('spinbutton').fill('93722');
  await page.locator('input[name="userName"]').fill('vineeth93722');
  await page.locator('input[name="password"]').fill('vineeth$93722');
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for dashboard
  const dashboardElement = page.locator('text=Scheduler');
  await dashboardElement.waitFor();

  const currentUrl = page.url();
  const expectedUrl = 'https://crm.staging.trillium.health/dashboard';

  if (currentUrl === expectedUrl) {
    console.log('✅ Login Successful to:', currentUrl);
  } else {
    console.error('❌ Login Failed');
    console.error('Captured URL:', currentUrl);
    console.error('Expected URL:', expectedUrl);
  }
}

module.exports = { loginToCRM };
