import { Browser, Page } from 'puppeteer';
import { makeBrowser } from '../../utils/browser';
import { Urls } from '../../utils/consts';
import tokens from './tokens';
import { sleep } from '../../utils/timeout';

describe.skip('Google Search', () => {

  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await makeBrowser('pt-BR');
    page = await browser.newPage();
  })

  afterAll(async () => {
    if (!browser)
      return

    await browser.close()
  })

  it('should display "Google" text on page title', async () => {
    await page.goto(Urls.base)
    const title = await page.title()
    expect(title).toBe('Google');
  })

  it('Should enter a search term and click on Search.', async () => {

    const textarea = await page.$('textarea')
    expect(textarea).not.toBeNull()

    await textarea!.type(tokens.TYPE_Search)
    const value = await page.evaluate(element => element!.value, textarea)
    await sleep(1000)

    expect(value).toBe('Qual o maior banco de investimentos do brasil?');

    const searchButton = await page.$(tokens.BTN_Search)
    await page.hover(tokens.BTN_Search)
    await searchButton?.click()
    await page.waitForNavigation()

    const title = await page.title()

    expect(title).toBe('Qual o maior banco de investimentos do brasil? - Pesquisa Google');
  })

  it('The first link should be BTG Pactual.', async () => {
    const firstLink = await page.$('h3')

    await firstLink!.click()

    await page.waitForNavigation()

    const title = await page.title()
    expect(title.toLocaleLowerCase()).toContain("btg pactual")
  })
})