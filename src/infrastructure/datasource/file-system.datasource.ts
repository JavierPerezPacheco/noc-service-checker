import { LogEntity, logSeverityLevel } from "../../domain/entities/log.entity";
import { LogDatasource } from "../../domain/log.datasource.ts/log.datasource";

import fs from 'fs';


export class FileSystemDatasource implements LogDatasource{

    private readonly logsPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';



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
        
    }


    
}