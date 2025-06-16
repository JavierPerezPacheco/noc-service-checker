import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, logSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";


const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prisma.logModel.create({
            data: {
                level: level,
                message: log.message,
                createdAt: log.createdAt,
                origin: log.origin
            }
        });
    }

    async getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel];
        const dbLogs = await prisma.logModel.findMany({
            where: {
                level: level,
            }
        });

        return dbLogs.map( log => LogEntity.fromObject(log));
    }

}