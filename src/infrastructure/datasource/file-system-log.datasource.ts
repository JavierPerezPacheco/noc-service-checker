import fs from 'fs';

import { LogEntity, logSeverityLevel } from '../../domain/entities/log.entity';
import { LogDatasource } from "../../domain/datasources/log.datasource";


export class FileSystemDataSource implements LogDatasource{

    private readonly logsPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';


    constructor(){
        this.createLogsFiles();
    }

    private createLogsFiles = () => {

        if( !fs.existsSync( this.logsPath )){
            fs.mkdirSync( this.logsPath );
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach (path => {
            if( fs.existsSync( path ) )return;
            fs.writeFileSync( path, '' );
        })

    }

    async saveLog( newLog: LogEntity ): Promise<void> {
        const logAsJson = `${ JSON.stringify( newLog ) }\n`;
        fs.appendFileSync( this.allLogsPath, logAsJson );
        if( newLog.level   === logSeverityLevel.low ) return;
        if (  newLog.level === logSeverityLevel.medium  ){
            fs.appendFileSync( this.mediumLogsPath, logAsJson );
        }else {
            fs.appendFileSync (this.highLogsPath, logAsJson);
        }

    }

    private getLogsFromfile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' );
        if (content === '') return [];
        const logs = content.split( '\n' ).map( LogEntity.fromJson );
        return logs;
    }

    async getLog ( severityLevel: logSeverityLevel ): Promise<LogEntity[]> {
        switch( severityLevel ){
            case logSeverityLevel.low:
                return this.getLogsFromfile( this.allLogsPath );
            case logSeverityLevel.medium:
                return this.getLogsFromfile( this.mediumLogsPath );
            case logSeverityLevel.high:
                return this.getLogsFromfile( this.highLogsPath );
            default:
                throw new Error( `${ severityLevel } not implemented` );
        }
    }
    
}