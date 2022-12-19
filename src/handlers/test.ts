import { withBrowser, withPage } from "../lib/models/browser";

const getProxy = async () => {
    return '185.253.24.30:5432:pn3vy:5zna75s0';
}

(async function main() {
    const proxy = await getProxy();
    await withBrowser(proxy, async (browser) => {
        await withPage(browser)(async (page) => {
            await page.goto('https://www.whatismyip.net/', { waitUntil: 'networkidle2', timeout: 0 });
            await page.goto('https://httpbin.org/ip');
            const element = await page.$('pre');
            const text = await page.evaluate((element: { textContent: any; }) => element.textContent, element);
            console.log(text);
        })
    })
})();