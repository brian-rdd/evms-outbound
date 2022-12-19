import dayjs from 'dayjs';
import { getSchedule } from '../services/database';
import { Bet, BetType } from './bet';

interface IMinMax { min: number, max: number };
interface IWindow { open: Date, close: Date };

export interface ICredentials {
    name: string;
    password: string;
    username: string;
}

interface IScheduleMetrics {
    bets: number;
    runners: Map<string, number>;
    races: Map<string, number>;
}

interface ILimits {
    races: number;
    runners: number;
    bets: number;
}
export class Schedule {
    owner: string;
    id: string;
    provider: string;
    timestamp: Date;
    ev: IMinMax;
    odds: IMinMax;
    betType: BetType;
    bets: Array<Bet>;
    refreshTime: number;
    stake: number;
    window: IWindow;
    limits: ILimits;
    credentials: ICredentials;
    private counts: IScheduleMetrics;


    constructor(scheduleId: string, owner: string) {
        const scheduleObject = getSchedule(scheduleId, owner);
        this.parseSchedule(scheduleObject);
    }

    private parseSchedule = (schedule: any) => {
        this.owner = schedule['owner'];
        this.id = schedule['id'];
        this.provider = schedule['provider'];
        this.timestamp = dayjs.unix(schedule['provider']).toDate();
        this.ev = { min: schedule['minEv'], max: schedule['maxEv']};
        this.odds = { min: schedule['minOdd'], max: schedule['maxOdd']};
        this.betType = BetType.find(schedule['betType']);
        this.stake = schedule['stake'];
        this.refreshTime = schedule['refreshTime'];

        // window
        const [startHour, startMin] = schedule['startTime'].split(':');
        const [endHour, endMin] = schedule['endTime'].split(':');
        const open = dayjs().set('h', parseInt(startHour)).set('m', parseInt(startMin)).set('s', 0).set('ms', 0);
        const close = dayjs().set('h', parseInt(endHour)).set('m', parseInt(endMin)).set('s', 0).set('ms', 0);
        this.window = { open: open.toDate(), close: close.toDate() };

        this.limits = { races: schedule['oneRaceCount'], bets: schedule['maxBetCount'], runners: schedule['oneHorseCount'] };
        this.counts = { bets: 0, races: new Map<string, number>(), runners: new Map<string, number>()};
    }    
}