// apiHelper.js
async function trackAPIs(page) {
  const requestData = [];
  const responseData = [];

  // Track API requests
  page.on('route', (route) => {
    const request = route.request();
    if (request.url().includes('/api')) {
      console.log('API Request:', request.method(), request.url());
      requestData.push({
        method: request.method(),
        url: request.url(),
        headers: request.headers(),
        postData: request.postData(),
      });
    }
    route.continue();
  });

  // Track API responses
  page.on('response', (response) => {
    if (response.url().includes('/api')) {
      console.log('API Response:', response.status(), response.url());
      responseData.push({
        status: response.status(),
        url: response.url(),
        body: response.body(),
      });
    }
  });

  return { requestData, responseData };
}

module.exports = { trackAPIs };
