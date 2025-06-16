import { LogEntity, logSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {
    constructor(
        private readonly logDatasource: LogDatasource,
    ){}
    saveLog(log: LogEntity): Promise<void> {
        return this.logDatasource.saveLog( log );
    }
    getLog(severityLevel: logSeverityLevel): Promise<LogEntity[]> {
        return this.logDatasource.getLog( severityLevel );
    }
}