import { IProxy } from "../services/browser";

export const _ = (proxyString: string): IProxy => {
    const parts = proxyString.split(':');
    return {
        ip: parts[0],
        port: +parts[1],
        username: parts[2],
        password: parts[3],
    }
}