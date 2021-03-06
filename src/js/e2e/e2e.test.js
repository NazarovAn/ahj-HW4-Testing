import puppetteer from 'puppeteer';

jest.setTimeout(30000);
describe('Validate Widget ', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: true,
      slowMo: 100,
      devtools: false,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Validate Widget ', () => {
    test('should add "valid" class for valid card number', async () => {
      await page.goto(baseUrl);
      const input = await page.$('.input');
      await input.type('4111111111111111');
      const submit = await page.$('.button');
      submit.click();
      await page.waitForSelector('.valid');
    });

    test('should add "invalid" class for valid card number', async () => {
      await page.goto(baseUrl);
      const input = await page.$('.input');
      await input.type('4111111111111112');
      const submit = await page.$('.button');
      submit.click();
      await page.waitForSelector('.invalid');
    });
  });
});
