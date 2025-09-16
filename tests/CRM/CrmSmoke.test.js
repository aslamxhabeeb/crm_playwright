import { test, expect } from '@playwright/test';
import loginToCRM from '../helpers/crmStagingLogin';

test('Smoke: CRM Login + API Tracking', async ({ page }) => {
 await loginToCRM(page);
 

});

