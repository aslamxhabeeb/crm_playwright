// const { test, expect, chromium } = require('@playwright/test');
// const loginData = require('./logins.json');

// test('Login test for multiple users with one browser', async () => {
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();

//   for (const user of loginData) {
//     const page = await context.newPage();

//     console.log(` Trying login for: ${user.username}`);
//     await page.goto('https://crm.staging.trillium.health/login');

//     await page.getByRole('spinbutton').fill(user.code);
//     await page.locator('input[name="userName"]').fill(user.username);
//     await page.locator('input[name="password"]').fill(user.password);
//     await page.getByRole('button', { name: 'Login' }).click();

//     page.once('dialog', async dialog => {
//       console.log(` Dialog: ${dialog.message()}`);
//       await dialog.dismiss();
//     });

//     const scheduler = page.getByText('Scheduler');
//     const loginError = page.getByText('Invalid credentials');

//     if (await loginError.isVisible()) {
//       console.warn(`Login failed for ${user.username}`);
//       await page.close();
//       continue;
//     }

//     await expect(scheduler).toBeVisible();
//     console.log(` Login successful for ${user.username}`);

//     await page.getByText('Logout').click();
//     console.log(` Logged out: ${user.username}`);
//     await page.close();
//   }

//   await context.close();
//   await browser.close();
// });

const { test, expect, chromium } = require('@playwright/test');
const loginData = require('./logins.json');

test('Login test for multiple users with one browser', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  for (const user of loginData) {
    const page = await context.newPage();

    console.log(`🔐 Trying login for: ${user.username}`);
    await page.goto('https://crm.staging.trillium.health/login');

    await page.getByRole('spinbutton').fill(user.code);
    await page.locator('input[name="userName"]').fill(user.username);
    await page.locator('input[name="password"]').fill(user.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    console.log('Current URL:', page.url());



    page.once('dialog', async dialog => {
      console.log(`⚠️ Dialog: ${dialog.message()}`);
      await dialog.dismiss();
    });

    const scheduler = page.getByText('Scheduler');
    const loginError = page.getByText('Invalid credentials');

    if (await loginError.isVisible()) {
      console.warn(`❌ Login failed for ${user.username}`);
      await page.close();
      continue;
    }

    await expect(scheduler).toBeVisible();
    console.log(`✅ Login successful for ${user.username}`);

    await page.getByText('Logout').click();
    console.log(`🚪 Logged out: ${user.username}`);
    await page.close();
  }

  await context.close();
  await browser.close();
});

