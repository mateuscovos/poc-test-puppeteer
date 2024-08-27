import { makeBrowser } from '../../utils/browser';
import { Urls } from '../../utils/consts';
import tokens from './tokens';

describe('Languages', () => {
  it('The button name should be "Pesquisa Google".', async () => {
    const browser = await makeBrowser('pt-BR')
    const page = await browser.newPage()

    await page.setExtraHTTPHeaders({
        'Accept-Language': 'pt-BR'
    })
    await page.goto(Urls.base)
    const title = await page.title()
    expect(title).toBe('Google');

    const searchButton = await page.$(tokens.BTN_Search)
    expect(searchButton).not.toBeNull()

    const buttonLabel = await page.evaluate(el => el!.value, searchButton);

    expect(buttonLabel).toContain("Pesquisa Google")
    await browser.close()
  })

  it('The button name should be "Search Google".', async () => {
    const browser = await makeBrowser('en-US')
    const page = await browser.newPage()
    

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US'
  })
    await page.goto(Urls.base)
    const title = await page.title()
    expect(title).toBe('Google');

    const searchButton = await page.$(tokens.BTN_Search)
    expect(searchButton).not.toBeNull()

    const buttonLabel = await page.evaluate(el => el!.value, searchButton);
    expect(buttonLabel).toContain("Google Search")
    await browser.close()
  })
})