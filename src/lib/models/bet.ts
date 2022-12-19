import { Runner } from "./runner";

export abstract class BetType {
    name: string;
    selectionCount: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.selectionCount = count;
    }

    static find = <T extends typeof BetType>(name: string): InstanceType<T> => {
        switch (name) {
            case "Single":
                return new Single() as InstanceType<T>;
            case "Double":
                return new Double() as InstanceType<T>;
            case "Treble":
                return new Treble() as InstanceType<T>;
            case "Trixie":
                return new Trixie() as InstanceType<T>;
            case "Patent":
                return new Patent() as InstanceType<T>;
            case "Four Fold":
                return new FourFold() as InstanceType<T>;
            case "Yankee":
                return new Yankee() as InstanceType<T>;
            case "Lucky 15":
                return new Lucky15() as InstanceType<T>;
            case "Five Fold":
                return new FiveFold() as InstanceType<T>;
            case "Lucky 31":
                return new Lucky31() as InstanceType<T>;
            case "Six Fold":
                return new SixFold() as InstanceType<T>;
            case "Heinz":
                return new Heinz() as InstanceType<T>;
            case "Lucky 63":
                return new Lucky63() as InstanceType<T>;
            case "Super Heinz":
                return new SuperHeinz() as InstanceType<T>;
            default:
                return undefined as InstanceType<T>;
        }
    }
}

class Single extends BetType { constructor() { super("Single", 1); } }
class Double extends BetType { constructor() { super("Double", 2); } }
class Treble extends BetType { constructor() { super("Treble", 3); } }
class Trixie extends BetType { constructor() { super("Trixie", 3); } }
class Patent extends BetType { constructor() { super("Patent", 3); } }
class FourFold extends BetType { constructor() { super("Four Fold", 4); } }
class Yankee extends BetType { constructor() { super("Yankee", 4); } }
class Lucky15 extends BetType { constructor() { super("Lucky 15", 4); } }
class FiveFold extends BetType { constructor() { super("Five Fold", 5); } }
class Lucky31 extends BetType { constructor() { super("Lucky 31", 5); } }
class SixFold extends BetType { constructor() { super("Six Fold", 6); } }
class Heinz extends BetType { constructor() { super("Heinz", 6); } }
class Lucky63 extends BetType { constructor() { super("Lucky 63", 6); } }
class SuperHeinz extends BetType { constructor() { super("Super Heinz", 7); } }

export enum BetStatus {
    PENDING = 'PENDING',
    FAILED = 'FAILED',
    SUCCESSFUL = 'SUCCESSFUL'
}

export class Bet {
    id: string;
    owner: string;
    schedule_id: string;
    runners: Array<Runner>;
    type: BetType;
    ts: number;
    status: BetStatus;

    constructor(record: any) {
        this.id = record['id'];
        this.owner = record['owner'];
        this.schedule_id = record['schedule_id'];
        this.ts = record['ts'];
        this.status = BetStatus[status];
        this.type = BetType.find(record['type']);
        this.runners = record['runners'].map((runner: any) => {
            return new Runner(runner);
        });
    }
}