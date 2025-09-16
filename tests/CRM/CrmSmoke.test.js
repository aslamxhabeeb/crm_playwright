import { test, expect } from '@playwright/test';

test ('Login', async ({page}) => {

 await page.goto('https://crm.staging.trillium.health');
 await page.getByRole('spinbutton').fill('93722');
 await page.locator('input[name="userName"]').fill('vineeth93722');
 await page.locator('input[name="password"]').fill('vineeth$93722');
 await page.getByRole('button', {name: 'Login'}).click();

  const dashboardElement = page.locator('text=Scheduler');
  await dashboardElement.waitFor(); // Wait for dashboard to appear

  const currentUrl = page.url(); 

  let expectedUrl = "https://crm.staging.trillium.health/dashboard";
  
  if (currentUrl === expectedUrl){
    console.log('Login Sucessfull to :', currentUrl);
  }
 else {
   // Step 5: Output the captured URL (optional)
    console.error('Login Failed Unexpectedly');
    console.error('Captured URL After Login:', currentUrl);
    console.log('Expected Url After Login:', expectedUrl );

     }
});
