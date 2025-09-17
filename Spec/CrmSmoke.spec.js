import { test, expect } from '@playwright/test';
import loginToCRM from '../tests/helpers/crmStagingLogin';
import createAndDeleteAppointment from '../tests/CRM/ApptRmdr.test';




// test('Smoke: CRM Login + API Tracking', async ({ page }) => {
//  await loginToCRM(page);
 

// });

// test.describe('CRM SMoke Test Flow', () => {
//   test.beforeEach(async ({ page }) => {
//     await loginToCRM(page);
//   });

//   test('Create and delete appointment', async ({ page }) => {
//     // await page.pause();
//     await createAndDeleteAppointment(page);
//   });

// });

test('Login and create appointment', async ({ page }) => {
  await loginToCRM(page);
  await createAndDeleteAppointment(page); 
});
