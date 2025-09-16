async function loginToCRM(page) {
  const { trackAPIs } = require('../helpers/apiHelper');
  const { requestData, responseData } = await trackAPIs(page);

  await page.goto('https://crm.staging.trillium.health', {
   waitUntil: 'networkidle',  // Wait until there are no more than 2 network connections for at least 500 ms.
  });
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
        // await page.pause();

  } else {
    console.error('❌ Login Failed');
    console.error('Captured URL:', currentUrl);
    console.error('Expected URL:', expectedUrl);

    // Always print tracked APIs
  console.log('--- API Requests Collected ---');
  console.log(requestData);

  console.log('--- API Responses Collected ---');
  console.log(responseData);

  // Return them so tests can use them
  return { requestData, responseData };
  }
  
}

export default loginToCRM
