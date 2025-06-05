export enum logSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high'
}

export interface LogEntityOptions {
    level: logSeverityLevel;
    message: string;
    createdAt: Date;
    origin: string;
}

export class LogEntity {
    public level: logSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor ( options: LogEntityOptions ) {
        const { level, message, origin, createdAt = new Date() } = options;
        this.level = level;
        this.message = message;
        this.createdAt = createdAt;
        this.origin = origin
    }


}