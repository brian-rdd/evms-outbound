import { Logger } from "./logger";

const logger = new Logger(process.env.STAGE).initialize();
export { logger };