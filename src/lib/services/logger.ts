import * as winston from 'winston';

export class Logger {
  private logger: winston.Logger;
  private stage: string;

  constructor(stage: string) {
    this.stage = stage;
  }

  public initialize(): winston.Logger {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: new winston.transports.Console()
    });

    if (this.stage !== 'production') {
      this.logger.clear();
      this.logger.add(
        new winston.transports.Console({
          level: 'debug'
        })
      );
    }

    return this.logger;
  }
}
