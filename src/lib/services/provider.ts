import { Page } from "puppeteer-core";
import { ICredentials, Schedule } from "../models/schedule";
import { BrowserService, IProxy } from "./browser";

export enum ProviderName {
    PADDY_POWER = "Paddy Power"
}

export abstract class ProviderClient {
    name: string;
    credentials: ICredentials;
    browser: BrowserService;
    proxy: IProxy;

    abstract login(page: Page): void;
    // abstract findHorse(page: Page, runner: any): void;
    abstract addToBetSlip(): void;
    abstract placeBet(): void;
    abstract betIsVerified(): boolean;

    constructor(schedule: Schedule, proxy: IProxy) {
        this.name = schedule.provider;
        this.proxy = proxy;
        //
        this.credentials = schedule.credentials
    }

    public async initialise(): Promise<void> {
        this.browser = await BrowserService.getInstance(this.proxy);
    }

}
