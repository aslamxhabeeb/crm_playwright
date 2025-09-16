import { test, expect } from '@playwright/test';
const { loginToCRM } = require('../helpers/crmStagingLogin');

test('Smoke: CRM Login + API Tracking', async ({ page }) => {
 await loginToCRM(page);

  
});


