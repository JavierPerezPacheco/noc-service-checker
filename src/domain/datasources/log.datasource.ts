import { LogEntity, logSeverityLevel } from "../entities/log.entity";


export abstract class LogDatasource{
    abstract saveLog( log: LogEntity ): Promise<void>;
    abstract getLog( severityLevel: logSeverityLevel ): Promise<LogEntity[]>;
}