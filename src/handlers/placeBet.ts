import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { logger } from '../lib/logging'
import { Bet } from '../lib/models/bet';
import { Schedule } from '../lib/models/schedule';
import { ProviderClient, ProviderName } from '../lib/services/provider';
import { PaddyPowerClient } from '../lib/providers/paddy-power';

export const handler: DynamoDBStreamHandler = async (
    event: DynamoDBStreamEvent
  ): Promise<void> => {
    var bets = [];
    event.Records.forEach(element => {
      if (element.eventName != "REMOVE") {
        var client: ProviderClient;
        const newImage = element.dynamodb.NewImage;
        const betRecord = unmarshall(newImage as { [key: string]: AttributeValue });
        logger.debug('NEW BET TO PLACE', {bet: betRecord});

        // the bet
        const bet = new Bet(betRecord);

        // the schedule it came from
        const schedule = new Schedule(bet.schedule_id, bet.owner);
        switch (schedule.provider) {
          case ProviderName.PADDY_POWER:
            client = new PaddyPowerClient(schedule.owner);
            break;
        
          default:
            break;
        }
        
        // find each runner

        // add each runner to the betslip

        // select the bet type

        // enter the stakes

      }
    });
  };

