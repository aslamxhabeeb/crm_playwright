import { test, expect } from '@playwright/test';
const { loginToCRM } = require('../helpers/crmStagingLogin');

test('Smoke: CRM Login + API Tracking', async ({ page }) => {
loginToCRM(page);
 
});

test('Create and delete appointment in CRM Scheduler', async ({ page }) => {
  // Navigate to Scheduler
  await page.locator('.appointment__addBtn').click();

  // Fill Appointment Reason
  const reason = page.getByRole('textbox', { name: 'Reason' });
  await reason.fill('Playwright Automation');

  // Create New Patient
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Play');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Wright');

  // Patient Information - DOB
  await page.getByRole('dialog')
    .locator('form div')
    .filter({ hasText: 'Patient InformationFirst Name' })
    .getByLabel('change date')
    .click();
  await page.getByRole('button', { name: 'Today' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  // Contact Info
  await page.getByRole('textbox', { name: 'Phone' }).fill('(833) 965-5755');
  await page.getByRole('button', { name: 'Female' }).click();
  await page.getByRole('option', { name: 'Male', exact: true }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('aslam@tensaw.email');

  // Insurance Selection
  await page.getByRole('button', { name: 'Insurance Patient' }).click();
  await page.getByRole('option', { name: 'Insurance Patient' }).click();

  // Save Patient
  await page.getByRole('button', { name: 'Save' }).click();

  // Confirm Appointment
  await page.getByText('Wright, Play').click();
  await page.getByText('Confirm').click();

  // Handle No-Show + Cancel
  await page.getByText('Cancel').first().click();
  await page.getByRole('button', { name: 'No' }).click();
  await page.getByText('No-Show').click();
  await page.getByText('Confirm').click();

  // Appointment Actions
  await page.getByText('Appt', { exact: true }).click();
  await page.getByRole('button', { name: 'Appointment' }).click();
  await page.getByRole('button', { name: /Appointment - \d{2}\/\d{2}\/\d{4}/ }).click();

  // Check In / Payment / Check Out
  await page.getByRole('button', { name: 'Check In' }).click();
  await page.getByRole('button', { name: /Check In - .*/ }).click();
  await page.getByRole('button', { name: 'Payment' }).click();
  await page.getByRole('button', { name: 'Check Out' }).click();

  // Diagnosis Search + Final Checkout
  await page.getByRole('textbox', { name: 'Search dx1' }).click();
  await page.getByRole('button', { name: 'CheckOut' }).click();
  await page.getByRole('button', { name: /Check Out - .*/ }).click();

  // Notes
  await page.getByRole('button', { name: 'Notes' }).click();
  await page.getByRole('textbox').fill('Playwright Automation Note in CRM Scheduler Note');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();

  // Review Appointment
  await page.getByRole('button', { name: 'Notes' }).click();
  await page.getByText('Review', { exact: true }).click();
  await page.locator('#scrollableDiv').getByText('Wright, Play').click();

  // Delete Appointment
  await page.locator('div')
    .filter({ hasText: /^Wright, Play.*Office Visit$/ })
    .getByRole('button')
    .click();
  await page.getByRole('button', { name: 'delete' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
});


