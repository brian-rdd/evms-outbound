import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./docClient";
import { logger } from './logging'

export const getSchedule = async (id: string, owner: string): Promise<any> => {
    const params = {
        TableName: process.env.DDB_TABLE_BETTING_SCHEDULES,
        KeyConditionExpression: 'sub = :sub AND schedule_id = :id',
        Key: {
            sub: { S: owner },
            id: { S: id }
        }
    }
    logger.debug(`[DDB] getSchedule (sub: '${owner}', id: '${id}')`, { params: params });
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
}

export const getScheduleCredentials = async (scheduleId: string): Promise<any> => {
    const params = {
        TableName: process.env.DDB_TABLE_BETTING_SCHEDULES,
        KeyConditionExpression: 'schedule_id = :id',
        Key: {
            id: { S: scheduleId }
        }
    }
    logger.debug(`[DDB] getCredentials (scheduleId: '${scheduleId}')`, { params: params });
    const data = await ddbDocClient.send(new GetCommand(params));
    return data.Item;
}