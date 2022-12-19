import chromium from "chrome-aws-lambda";
import { Browser, Page } from "puppeteer";
import { addExtra, VanillaPuppeteer } from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const puppeteerExtra = addExtra(chromium.puppeteer as unknown as VanillaPuppeteer);
puppeteerExtra.use(StealthPlugin());

export interface IProxy {
    ip: string;
    port: number;
    username: string;
    password: string;
}

export class BrowserService {
    private proxy: IProxy;
    public static instance: BrowserService | null = null;
    public static async getInstance(proxy: IProxy): Promise<BrowserService> {
        if (this.instance == null) {
            this.instance = new BrowserService(proxy);
            await this.instance.initialise();
        }
        return this.instance;
    }
    private browser: Browser;
    private numberPages: number = 0;
    constructor(proxy: IProxy) {
        this.proxy = proxy;
     }

    /**
     * Get a browser page.
     */
    public async getPage(): Promise<Page> {
        const page = (await this.browser.pages())[0];
        
        await page.authenticate({
            username: this.proxy.username,
            password: this.proxy.password,
        });

        return page;
    }

    /**
     * Close a page.
     */
    public async closePage(page: Page): Promise<void> {
        if(this.numberPages === 0) {
            await this.browser.close();
            BrowserService.instance = null;
        }
    }

    /**
     * Initialise the instance.
     */
    public async initialise(): Promise<void> {
        let chromePath = await chromium.executablePath;
        let args = chromium.args.filter((x) => x !== "--disable-notifications");
        args.push(`--proxy-server=${this.proxy.ip}:${this.proxy.port}`);
        let windowX = String(Math.floor(Math.random() * 400 + 800));
        let windowY = String(Math.floor(Math.random() * 400 + 600));
    
        this.browser = await puppeteerExtra.launch({
            args: args, //chromium.args,
            defaultViewport: {
                width: Number(windowX),
                height: Number(windowY),
            },
            executablePath: chromePath,
            headless: true,
            ignoreHTTPSErrors: true
        });
    }
}