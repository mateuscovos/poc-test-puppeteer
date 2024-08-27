import puppeteer, { Browser, ElementHandle, Page } from "puppeteer";
import { sleep } from "./timeout";

export const makeBrowser = async (lang: 'en-US' | 'pt-BR'): Promise<Browser> => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [`--lang=${lang}`]
    })


    return browser
}