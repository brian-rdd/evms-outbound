import { throws } from "assert";
import dayjs from "dayjs";
import { Browser, Page } from "puppeteer-core";
import { ProviderClient } from "../services/provider";
import { Runner } from "../models/runner";
import { Schedule } from "../models/schedule";
import { BrowserService, IProxy } from "../services/browser";

export class PaddyPowerClient extends BrowserService {
    
    constructor(schedule: Schedule, proxy: IProxy) {
        super(schedule, proxy);
    }
    
    private getRaceUrl = async (runner: Runner) => {

    }

    // private getRaceUrls = async (runners: any) => {
    //     return await withBrowser(this.proxy, async (browser: any) => {
    //         return Promise.all(runners.map(async (runner: any) => {
    //             return withPage(browser)(async (page) => {
    //                 return await this.findHorse(runner);
    //             });
    //         }))
    //     });
    // }
    // private findHorse = async (runner: any): Promise<void> => {
    //     await this.page.goto(`https://www.paddypower.com/search?q=${encodeURIComponent(runner.name)}`);
    //     try {
    //         await this.page.waitForSelector('abc-list.search-results__list', { visible: true, timeout: 10*1000 });
    //         // await page.screenshot({ path: `./screenshots/${runner.name}-search.jpg`, type: 'jpeg'});
    //         const results = await this.page.evaluate((runner) => Array.from(
    //             document.querySelectorAll<HTMLElement>('a.search-results__list-item'), 
    //             a => {
    //                 return {
    //                     runner: runner,
    //                     event: a.innerText.split('\n'), 
    //                     href: a.getAttribute('href')
    //                 }
    //             }), runner);
            
    //         const filterdResults: any = results.filter(result => {
    //             const linkTextParts = result.event;
    //             // do the venues match?
    //             const foundRaceVenue = linkTextParts && linkTextParts.length > 0 && linkTextParts.shift();
    //             const givenRaceVenue = runner.event.name;
    //             if (foundRaceVenue.substr(0,3).toLowerCase() === givenRaceVenue.substr(0,3).toLowerCase()) {
    //                 // do the times match?
    //                 const foundRaceTime = linkTextParts && linkTextParts.length > 0 && linkTextParts.shift();
    //                 const foundRaceTimeParts = foundRaceTime.split(' ');
    //                 const foundRaceTimeDay = foundRaceTimeParts && foundRaceTimeParts.length > 0 && foundRaceTimeParts.pop();
    //                 if (foundRaceTimeDay === 'Today') {
    //                     const foundRaceTimeTime = foundRaceTimeParts && foundRaceTimeParts.length > 0 && foundRaceTimeParts.shift();
    //                     const foundRaceTimeTimeParts = foundRaceTimeTime.split(':');
    //                     const foundRaceTimeTimePartsHour = foundRaceTimeTimeParts && foundRaceTimeTimeParts.length > 0 && foundRaceTimeTimeParts.shift();
    //                     const hour = +foundRaceTimeTimePartsHour;
    //                     const foundRaceTimeTimePartsMinute = foundRaceTimeTimeParts && foundRaceTimeTimeParts.length > 0 && foundRaceTimeTimeParts.shift();
    //                     const minute = +foundRaceTimeTimePartsMinute;
    //                     const foundRaceTimeParsed = dayjs().set('hour', hour).set('minute', minute).set('second', 0).set('millisecond', 0);
                        
    //                     const givenRaceTime = runner.event.time;
    //                     if (dayjs(givenRaceTime).isSame(foundRaceTimeParsed)) {
    //                         return true;
    //                     }
    //                 }
    //             }
    //             return false;
    //         })
    //         return filterdResults.length == 1 ? filterdResults.shift() : undefined;
    //     } catch {
    //         // runner was not found
    //         throw Error(`Runner ${runner.name} was not found`);
    //     }
    // }



    // addToBetSlip(): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // placeBet(): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // betIsVerified(): boolean {
    //     throw new Error("Method not implemented.");
    // }
    // login = async (page: Page): Promise<void> => {
    //     await page.type('#username', this.credentials.username);
    //     await page.type('#password', this.credentials.password);
    //     await page.click('#login');
    // }
}