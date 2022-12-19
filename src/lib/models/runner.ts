import { get } from 'lodash';
import dayjs from 'dayjs';

interface IEvent {
    id: string;
    name: string;
    time: Date;
}

export class Runner {
    id: string;
    name: string;
    provider: string;
    event: IEvent;
    odds: number;
    ev: number;

    constructor(runner: any) {
        this.id = runner['id'];
        this.name = runner['name'];
        this.provider = runner['provider'];
        const event = runner['event'];
        this.event = {
            id: event['id'],
            name: event['name'],
            time: event['time']
        }
        this.odds = runner['odds'];
        this.ev = runner['ev'];
    }
      
}