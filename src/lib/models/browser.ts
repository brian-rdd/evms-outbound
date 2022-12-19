// import chromium from "chrome-aws-lambda";
// import { addExtra, VanillaPuppeteer } from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";

// const puppeteerExtra = addExtra(chromium.puppeteer as unknown as VanillaPuppeteer);
// puppeteerExtra.use(StealthPlugin());

// export interface IProxy {
//     ip: string;
//     port: number;
//     username: string;
//     password: string;
// }

// export const withBrowser = async (proxy: IProxy, fn: any) => {
//     let chromePath = await chromium.executablePath;
//     let args = chromium.args.filter((x) => x !== "--disable-notifications");
//     args.push(`--proxy-server=${proxy.ip}:${proxy.port}`);
//     let windowX = String(Math.floor(Math.random() * 400 + 800));
//     let windowY = String(Math.floor(Math.random() * 400 + 600));

//     const browser = await puppeteerExtra.launch({
//         args: args, //chromium.args,
//         defaultViewport: {
//             width: Number(windowX),
//             height: Number(windowY),
//         },
//         executablePath: chromePath,
//         headless: true,
//         ignoreHTTPSErrors: true
//     });

// 	try {
// 		return await fn(browser, proxy);
// 	} finally {
// 		await browser.close();
// 	}
// }

// export const withPage = (browser: { newPage: () => any; }) => async (fn: (arg0: any) => any) => {
// 	const page = await browser.newPage();

//     await page.authenticate({
//         username: proxy.username,
//         password: proxy.password,
//     });
    
// 	try {
// 		return await fn(page);
// 	} finally {
// 		await page.close();
// 	}
// }

